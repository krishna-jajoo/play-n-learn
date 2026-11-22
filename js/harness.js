// Python "judge" that runs inside Pyodide. It executes the learner's code,
// captures output, feeds input(), and runs the hidden checks for a mission.
// Shared by the browser worker (js/runner.js) and the Node validator (tools/validate.mjs).
(function (root) {
  const PY_HARNESS = String.raw`
import sys, io, ast, json, traceback, numbers, warnings, os, base64
os.environ.setdefault("MPLBACKEND", "Agg")  # charts are drawn off-screen and sent to the page as images

_FRIENDLY = {
    "NameError": "Python doesn't know this name. Check the spelling (Python is case-sensitive) or create the variable/function before you use it.",
    "SyntaxError": "Python couldn't understand this line. Look for a missing colon ':', bracket, or quote.",
    "IndentationError": "The spaces at the start of a line are wrong. Code inside if / for / while / def / class must be indented (4 spaces).",
    "TabError": "Tabs and spaces are mixed. Use 4 spaces for indentation.",
    "TypeError": "Two values of types that don't fit together (e.g. text + number), or a function got the wrong number of arguments. Try int() / str().",
    "ValueError": "The value has the right type but the wrong content, e.g. int('abc').",
    "IndexError": "You asked for a position that doesn't exist. Remember: the first index is 0 and the last is len(x) - 1.",
    "KeyError": "That key isn't in the dictionary. Use .get(key) or check with 'key in d' first.",
    "ZeroDivisionError": "You divided by zero.",
    "AttributeError": "This value doesn't have that method or attribute. Check the spelling, and check the value's type.",
    "EOFError": "Your program called input() more times than there are input lines.",
    "RecursionError": "A function kept calling itself forever. Make sure it has a base case that stops.",
    "UnboundLocalError": "You used a variable inside a function before giving it a value there.",
    "ModuleNotFoundError": "That module doesn't exist (or isn't available here). Check the name.",
    "ImportError": "Python couldn't import that name. Check the spelling.",
    "FileNotFoundError": "That file doesn't exist yet. Check the filename, or write it first.",
}

_MISSING = object()

def _fmt_error(e):
    name = type(e).__name__
    line = None
    if isinstance(e, SyntaxError):
        line = e.lineno
        msg = e.msg
    else:
        frames = [f for f in traceback.extract_tb(e.__traceback__) if f.filename == "<your code>"]
        if frames:
            line = frames[-1].lineno
        msg = str(e)
    return {"type": name, "message": msg, "line": line,
            "friendly": _FRIENDLY.get(name, "Something went wrong while running your code.")}

class _Tee:
    def __init__(self, check, display):
        self.check, self.display = check, display
    def write(self, s):
        self.check.write(s); self.display.write(s); return len(s)
    def flush(self):
        pass

def __prepare_plots():
    # Start every run with no figures, and make plt.show() harmless (there's no screen in the worker).
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is not None:
        plt.close("all")
        plt.show = lambda *a, **k: None

def _grab_figures(limit=4):
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is None:
        return []
    images = []
    for n in plt.get_fignums()[:limit]:
        try:
            buf = io.BytesIO()
            plt.figure(n).savefig(buf, format="png", dpi=72, bbox_inches="tight")
            images.append(base64.b64encode(buf.getvalue()).decode("ascii"))
        except Exception:
            pass
    plt.close("all")
    return images

def _exec_user(code, inputs):
    check, display = io.StringIO(), io.StringIO()
    queue = [str(x) for x in (inputs or [])]
    def _input(prompt=""):
        display.write(str(prompt))
        if not queue:
            raise EOFError("input() was called but there is no more input")
        v = queue.pop(0)
        display.write(v + "\n")
        return v
    ns = {"__name__": "__main__", "input": _input}
    __prepare_plots()
    old = sys.stdout
    sys.stdout = _Tee(check, display)
    err = None
    # Warnings (e.g. pandas' SettingWithCopyWarning) are shown in the output panel, but never count as output.
    def _warn(message, category, filename, lineno, file=None, line=None):
        if "non-GUI backend" in str(message) or "non-interactive" in str(message):
            return
        where = " (line " + str(lineno) + ")" if filename == "<your code>" else ""
        display.write("⚠ " + category.__name__ + where + ": " + str(message).strip().split("\n")[0] + "\n")
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("always")
            warnings.filterwarnings("ignore", category=DeprecationWarning)
            warnings.showwarning = _warn
            exec(compile(code, "<your code>", "exec"), ns)
    except BaseException as e:
        err = _fmt_error(e)
    finally:
        sys.stdout = old
    return ns, check.getvalue(), display.getvalue(), err

def _norm(s):
    lines = [l.rstrip() for l in str(s).replace("\r\n", "\n").split("\n")]
    while lines and lines[-1] == "":
        lines.pop()
    while lines and lines[0] == "":
        lines.pop(0)
    return "\n".join(lines)

class _Fail(AssertionError):
    pass

def _make_helpers(ns, out, code):
    tree = ast.parse(code)
    nodes = list(ast.walk(tree))

    KINDS = {
        "for": (ast.For,), "while": (ast.While,), "if": (ast.If,),
        "def": (ast.FunctionDef,), "class": (ast.ClassDef,), "return": (ast.Return,),
        "listcomp": (ast.ListComp,), "dictcomp": (ast.DictComp,), "setcomp": (ast.SetComp,),
        "lambda": (ast.Lambda,), "yield": (ast.Yield, ast.YieldFrom), "try": (ast.Try,),
        "with": (ast.With,), "fstring": (ast.JoinedStr,), "raise": (ast.Raise,),
        "import": (ast.Import, ast.ImportFrom), "break": (ast.Break,), "continue": (ast.Continue,),
        "tuple": (ast.Tuple,), "dict": (ast.Dict,), "list": (ast.List,),
    }
    OPS = {"//": ast.FloorDiv, "%": ast.Mod, "**": ast.Pow}
    LABEL = {"listcomp": "a list comprehension", "dictcomp": "a dict comprehension",
             "fstring": "an f-string", "def": "a function (def)", "class": "a class",
             "yield": "yield", "lambda": "a lambda", "with": "a with block",
             "try": "try / except", "raise": "raise"}

    def _has(kind):
        if kind in OPS:
            return any(isinstance(n, ast.BinOp) and isinstance(n.op, OPS[kind]) or
                       isinstance(n, ast.AugAssign) and isinstance(n.op, OPS[kind]) for n in nodes)
        return any(isinstance(n, KINDS[kind]) for n in nodes)

    def _calls(name):
        for n in nodes:
            if isinstance(n, ast.Call):
                f = n.func
                if isinstance(f, ast.Name) and f.id == name: return True
                if isinstance(f, ast.Attribute) and f.attr == name: return True
        return False

    def must_use(*kinds):
        for k in kinds:
            if not _has(k):
                raise _Fail("Your code must use " + LABEL.get(k, repr(k) if k in OPS else "a " + k) + " for this mission.")

    def must_use_any(*kinds):
        if not any(_has(k) for k in kinds):
            raise _Fail("Your code must use one of: " + ", ".join(kinds) + ".")

    def must_call(name):
        if not _calls(name):
            raise _Fail("Your code must use " + name + "() for this mission.")

    def must_not_call(name):
        if _calls(name):
            raise _Fail("For this mission, solve it without using " + name + "().")

    def code_contains(text, msg=None):
        if text not in code:
            raise _Fail(msg or ("Your code should contain " + repr(text) + "."))

    def is_recursive(fname):
        for n in nodes:
            if isinstance(n, ast.FunctionDef) and n.name == fname:
                for m in ast.walk(n):
                    if isinstance(m, ast.Call) and isinstance(m.func, ast.Name) and m.func.id == fname:
                        return
        raise _Fail(fname + "() must be recursive - it should call itself.")

    def expect_output(expected):
        if _norm(out) != _norm(expected):
            raise _Fail("Expected output:\n" + _norm(expected) + "\n\nYour output:\n" + (_norm(out) or "(nothing was printed)"))

    def expect_equal(actual, expected, label="Result"):
        if type(actual).__module__ == "numpy" and hasattr(actual, "item") and getattr(actual, "ndim", 0) == 0:
            actual = actual.item()  # NumPy scalar (np.int64, np.float64, np.bool_) -> plain Python value
        if hasattr(actual, "shape") and type(actual).__module__ == "numpy":
            raise _Fail(label + "\n  expected: " + repr(expected) + "\n  got a NumPy array: " + repr(actual))
        num = lambda x: isinstance(x, numbers.Number) and not isinstance(x, bool)
        same_kind = type(actual) is type(expected) or (num(actual) and num(expected))
        if actual != expected or not same_kind:
            raise _Fail(label + "\n  expected: " + repr(expected) + "\n  got:      " + repr(actual))

    def must_not_use(*kinds):
        for k in kinds:
            if _has(k):
                raise _Fail("Solve this without " + LABEL.get(k, "a " + k + " loop" if k in ("for", "while") else k) +
                            ": use NumPy's whole-array operations instead.")

    def expect_array(actual, expected, label="Result", tol=1e-6, kind=None):
        # kind: allowed dtype kinds, e.g. "i" (int), "f" (float), "b" (bool), "U" (text), "iu"
        import numpy as np
        if not isinstance(actual, np.ndarray):
            raise _Fail(label + "\n  expected a NumPy array, but got " + type(actual).__name__ + ": " + repr(actual)[:200] +
                        "\n  (wrap it with np.array(...) or use NumPy functions)")
        exp = np.asarray(expected)
        if actual.shape != exp.shape:
            raise _Fail(label + "\n  expected shape: " + str(exp.shape) + "\n  got shape:      " + str(actual.shape) +
                        "\n  expected:\n" + np.array2string(exp) + "\n  got:\n" + np.array2string(actual))
        if kind and actual.dtype.kind not in kind:
            names = {"i": "int", "u": "unsigned int", "f": "float", "b": "bool", "U": "str"}
            raise _Fail(label + "\n  expected dtype " + "/".join(names.get(k, k) for k in kind) + ", got " + str(actual.dtype))
        numeric = actual.dtype.kind in "biuf" and exp.dtype.kind in "biuf"
        ok = np.allclose(actual, exp, rtol=tol, atol=tol, equal_nan=True) if numeric else np.array_equal(actual, exp)
        if not ok:
            raise _Fail(label + "\n  expected:\n" + np.array2string(exp, precision=4) + "\n  got:\n" + np.array2string(actual, precision=4))
        return actual

    def expect_var(name, value=_MISSING, type_=None):
        if name not in ns:
            raise _Fail("Create a variable called '" + name + "'.")
        v = ns[name]
        if type_ is not None and type(v) is not type_:
            raise _Fail("'" + name + "' should be of type " + type_.__name__ + ", but it is " + type(v).__name__ + ".")
        if value is not _MISSING and v != value:
            raise _Fail("'" + name + "' should be " + repr(value) + ", but it is " + repr(v) + ".")
        return v

    def expect_func(name):
        f = ns.get(name)
        if f is None:
            raise _Fail("Define a function called '" + name + "'.")
        if not callable(f):
            raise _Fail("'" + name + "' should be a function.")
        return f

    def expect_class(name):
        c = ns.get(name)
        if not isinstance(c, type):
            raise _Fail("Define a class called '" + name + "'.")
        return c

    def expect_raises(exc, fn, *args, match=None, **kwargs):
        try:
            fn(*args, **kwargs)
        except exc as e:
            if match is not None and match not in str(e):
                raise _Fail("Raised " + exc.__name__ + " but the message should contain " + repr(match) + " (got " + repr(str(e)) + ").")
            return
        except Exception as e:
            raise _Fail("Expected " + exc.__name__ + " but got " + type(e).__name__ + ": " + str(e))
        raise _Fail("Expected " + exc.__name__ + " to be raised, but nothing was raised.")

    def rerun(src, inputs=None):
        # Run a variant of the learner's program (e.g. with other starting values); return what it prints.
        ns2, out2, disp2, err2 = _exec_user(src, inputs)
        if err2:
            raise _Fail("With other values your program fails: " + err2["type"] + ": " + err2["message"])
        return out2

    def expect_close(actual, expected, label="Result", tol=1e-6):
        def close(a, b):
            if hasattr(a, "shape") and hasattr(a, "tolist"):
                a = a.tolist()  # NumPy array or scalar -> Python values
            if hasattr(b, "shape") and hasattr(b, "tolist"):
                b = b.tolist()
            if isinstance(b, (list, tuple)):
                return isinstance(a, (list, tuple)) and len(a) == len(b) and all(close(x, y) for x, y in zip(a, b))
            if isinstance(b, dict):
                return isinstance(a, dict) and a.keys() == b.keys() and all(close(a[k], b[k]) for k in b)
            try:
                return abs(float(a) - float(b)) <= tol * max(1.0, abs(float(b)))
            except (TypeError, ValueError):
                return a == b
        if not close(actual, expected):
            raise _Fail(label + "\n  expected: " + repr(expected) + "\n  got:      " + repr(actual))

    def _show(obj):
        try:
            return obj.head(15).to_string() + ("\n  ..." if len(obj) > 15 else "")
        except Exception:
            return repr(obj)[:600]

    def _diff(label, e, a, why=""):
        return _Fail(label + ("\n  " + why if why else "") + "\n  expected:\n" + _show(e) + "\n  got:\n" + _show(a))

    def expect_frame(actual, expected, label="Result", check_index=True, check_dtype=False, tol=1e-6):
        import pandas as pd
        if not isinstance(actual, pd.DataFrame):
            raise _Fail(label + "\n  expected a DataFrame, but got " + type(actual).__name__ + ": " + repr(actual)[:300])
        e = expected if isinstance(expected, pd.DataFrame) else pd.DataFrame(expected)
        a = actual
        if not check_index:
            a, e = a.reset_index(drop=True), e.reset_index(drop=True)
        if [str(c) for c in a.columns] != [str(c) for c in e.columns]:
            raise _Fail(label + "\n  expected columns: " + str(list(e.columns)) + "\n  got columns:      " + str(list(a.columns)))
        if a.shape != e.shape:
            raise _diff(label, e, a, "expected " + str(e.shape[0]) + " rows, got " + str(a.shape[0]))
        try:
            pd.testing.assert_frame_equal(a, e, check_dtype=check_dtype, check_exact=False, rtol=tol, atol=tol,
                                          check_index_type=False, check_column_type=False, check_names=False)
        except AssertionError as err:
            raise _diff(label, e, a, str(err).strip().split("\n")[0])
        return actual

    def expect_series(actual, expected, label="Result", check_index=True, check_dtype=False, tol=1e-6):
        import pandas as pd
        if not isinstance(actual, pd.Series):
            raise _Fail(label + "\n  expected a Series, but got " + type(actual).__name__ + ": " + repr(actual)[:300])
        e = expected if isinstance(expected, pd.Series) else pd.Series(expected)
        a = actual
        if not check_index:
            a, e = a.reset_index(drop=True), e.reset_index(drop=True)
        if len(a) != len(e):
            raise _diff(label, e, a, "expected " + str(len(e)) + " values, got " + str(len(a)))
        try:
            pd.testing.assert_series_equal(a, e, check_dtype=check_dtype, check_exact=False, rtol=tol, atol=tol,
                                           check_index_type=False, check_names=False)
        except AssertionError as err:
            raise _diff(label, e, a, str(err).strip().split("\n")[0])
        return actual

    # ───── chart inspection (matplotlib / seaborn)
    def expect_fig(n_axes=None):
        plt = sys.modules.get("matplotlib.pyplot")
        if plt is None or not plt.get_fignums():
            raise _Fail("No chart was drawn. Create one with fig, ax = plt.subplots() and plot something on it.")
        fig = plt.figure(plt.get_fignums()[-1])
        if n_axes is not None and len(fig.axes) != n_axes:
            raise _Fail("Your figure should have " + str(n_axes) + " chart" + ("" if n_axes == 1 else "s") + " (axes), but it has " + str(len(fig.axes)) + ".")
        fig.canvas.draw()
        return fig

    def bars_of(ax, horizontal=False):
        from matplotlib.patches import Rectangle
        rects = [p for p in ax.patches if isinstance(p, Rectangle)]
        return [float(r.get_width() if horizontal else r.get_height()) for r in rects]

    def lines_of(ax):
        # every Line2D on the axes (plotted lines, axhline/axvline reference lines); grid lines aren't included
        return list(ax.get_lines())

    def points_of(ax, i=0):
        import numpy as np
        if len(ax.collections) <= i:
            raise _Fail("No scatter points were found on the chart. Use ax.scatter(x, y).")
        return np.asarray(ax.collections[i].get_offsets())

    def legend_of(ax):
        leg = ax.get_legend()
        if leg is None:
            raise _Fail("The chart needs a legend: give each series a label=… and call ax.legend().")
        return [t.get_text() for t in leg.get_texts()]

    def ticklabels_of(ax, axis="x"):
        ax.figure.canvas.draw()
        labels = ax.get_xticklabels() if axis == "x" else ax.get_yticklabels()
        return [t.get_text() for t in labels]

    def hexcolor(c):
        from matplotlib.colors import to_hex
        return to_hex(c)

    def expect_text(actual, label, contains=None, exact=None):
        if not actual:
            raise _Fail("Your chart is missing its " + label + ".")
        if exact is not None and actual != exact:
            raise _Fail("The chart's " + label + " should be " + repr(exact) + ", not " + repr(actual) + ".")
        if contains is not None and contains.lower() not in actual.lower():
            raise _Fail("The chart's " + label + " should mention " + repr(contains) + " (it is " + repr(actual) + ").")
        return actual

    return {k: v for k, v in locals().items() if not k.startswith("_") and callable(v)}

def _check(code, test):
    ns, out, disp, err = _exec_user(code, test.get("input"))
    base = {"display": disp, "input": test.get("input") or []}
    if err:
        return dict(base, ok=False, kind="error", error=err)
    tns = dict(ns)
    tns.update(_make_helpers(ns, out, code))
    tns["__out__"] = out
    tns["__code__"] = code
    old = sys.stdout
    sys.stdout = io.StringIO()
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            exec(test.get("code") or "", tns)
    except AssertionError as e:
        return dict(base, ok=False, kind="fail", message=str(e) or "A check failed.", images=_grab_figures())
    except BaseException as e:
        return dict(base, ok=False, kind="error", error=_fmt_error(e), images=_grab_figures())
    finally:
        sys.stdout = old
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is not None:
        plt.close("all")
    return dict(base, ok=True)

# ───────────── SQL missions: the learner writes SQL, checked against a reference query on real SQLite databases
_SQL_FRIENDLY = [
    ("no such column", "There's no column with that name. Check the spelling, and which table it lives in (open the Tables panel). When joining, write table.column."),
    ("no such table", "There's no table with that name. Check the spelling in the Tables panel."),
    ("ambiguous column name", "Two of the joined tables have a column with this name. Say which one you mean: table.column (or alias.column)."),
    ("misuse of aggregate", "Aggregates like SUM, COUNT or AVG can't go in WHERE. Filter groups with HAVING, or compute the aggregate in a subquery."),
    ("only execute one statement", "Write just one query here (one SELECT … statement)."),
    ("incomplete input", "The query ends too early. Is a bracket or quote not closed?"),
    ("syntax error", "SQLite couldn't read the query near that word. Check the order: SELECT … FROM … JOIN … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT, commas between columns, and quotes around text values ('like this')."),
    ("unrecognized token", "There's a stray character. Text values use single quotes: 'Mage'."),
    ("wrong number of arguments", "A function got the wrong number of values inside its brackets."),
    ("datatype mismatch", "A value has the wrong type for that column."),
    ("unique constraint", "That would create a duplicate where values must be unique (e.g. an id that already exists)."),
    ("not null constraint", "A required column was left empty."),
]

def _sql_error(e):
    msg = str(e)
    friendly = "Something went wrong while running your query."
    for key, text in _SQL_FRIENDLY:
        if key in msg.lower():
            friendly = text
            break
    return {"type": "SQL error", "message": msg, "line": None, "friendly": friendly}

def _sql_db(setup):
    import sqlite3
    conn = sqlite3.connect(":memory:")
    conn.executescript(setup or "")
    return conn

def _sql_query(conn, sql):
    cur = conn.execute(sql.strip())
    cols = [d[0] for d in (cur.description or [])]
    return cols, cur.fetchall()

def _sql_result(setup, sql, verify=None):
    # Returns (columns, rows). With verify, sql is a script that changes the database, then verify is queried.
    conn = _sql_db(setup)
    try:
        if verify:
            conn.executescript(sql)
            return _sql_query(conn, verify)
        return _sql_query(conn, sql)
    finally:
        conn.close()

def _sql_cell(v):
    if v is None:
        return "NULL"
    if isinstance(v, float):
        return ("%.6f" % v).rstrip("0").rstrip(".") if v != int(v) or abs(v) >= 1e15 else str(int(v)) + ".0"
    return str(v)

def _sql_table(cols, rows, limit=40):
    if not cols:
        return "(the query ran, but returned no columns)"
    cells = [[_sql_cell(v) for v in r] for r in rows[:limit]]
    w = [max([len(str(c))] + [len(r[i]) for r in cells]) for i, c in enumerate(cols)]
    line = lambda vals: " | ".join(str(v).ljust(w[i]) for i, v in enumerate(vals)).rstrip()
    out = [line(cols), "-+-".join("-" * x for x in w)] + [line(r) for r in cells]
    if len(rows) > limit:
        out.append("… " + str(len(rows) - limit) + " more rows")
    out.append("(" + str(len(rows)) + " row" + ("" if len(rows) == 1 else "s") + ")")
    return "\n".join(out)

def _sql_compact(rows):
    return "\n".join(", ".join(_sql_cell(v) for v in r) for r in rows) if rows else "(no rows)"

def _sql_norm(rows):
    def fix(v):
        if isinstance(v, bool):
            return int(v)
        if isinstance(v, (int, float)):
            return round(float(v), 6)
        return v
    return [tuple(fix(v) for v in r) for r in rows]

def _sql_strip(sql):
    import re
    s = re.sub(r"--[^\n]*", " ", sql)
    s = re.sub(r"/\*.*?\*/", " ", s, flags=re.S)
    s = re.sub(r"'(?:[^']|'')*'", "''", s)
    return " ".join(s.upper().split())

def _sql_judge(p):
    import re
    sql = p.get("sql") or ""
    setup = p.get("setup") or ""
    verify = p.get("verify")
    if p.get("run"):
        try:
            cols, rows = _sql_result(setup, sql, verify)
        except Exception as e:
            return {"ok": False, "display": "", "error": _sql_error(e)}
        return {"ok": True, "display": _sql_table(cols, rows), "compact": _sql_compact(rows), "error": None}
    if not _sql_strip(sql).strip(" ;"):
        return {"ok": False, "kind": "fail", "message": "Write a query first.", "display": "", "input": [], "index": 0, "total": 1}
    plain = _sql_strip(sql)
    for word in p.get("mustUse") or []:
        if not re.search(r"\b" + re.escape(word.upper()) + r"\b", plain):
            return {"ok": False, "kind": "fail", "message": "This mission must use " + word.upper() + ".", "display": "", "input": [], "index": 0, "total": 1}
    for word in p.get("mustNotUse") or []:
        if re.search(r"\b" + re.escape(word.upper()) + r"\b", plain):
            return {"ok": False, "kind": "fail", "message": "Solve this one without " + word.upper() + ".", "display": "", "input": [], "index": 0, "total": 1}
    dbs = [("the kingdom database", setup)] + [("a hidden test database", setup + "\n" + v) for v in (p.get("variants") or [])]
    for i, (label, db) in enumerate(dbs):
        exp_cols, exp_rows = _sql_result(db, p.get("solution") or "", verify)
        try:
            cols, rows = _sql_result(db, sql, verify)
        except Exception as e:
            return {"ok": False, "kind": "error", "error": _sql_error(e), "display": "", "input": [], "index": i, "total": len(dbs)}
        shown = _sql_table(cols, rows, limit=15)
        def fail(msg):
            return {"ok": False, "kind": "fail", "message": msg + "\n\nExpected (on " + label + "):\n" + _sql_table(exp_cols, exp_rows, limit=15) + "\n\nYour result:\n" + shown,
                    "display": "", "input": [], "index": i, "total": len(dbs)}
        if len(cols) != len(exp_cols):
            return fail("Your query returns " + str(len(cols)) + " column" + ("" if len(cols) == 1 else "s") + ", but " + str(len(exp_cols)) + " are expected.")
        if p.get("checkNames") and [c.lower() for c in cols] != [c.lower() for c in exp_cols]:
            return fail("Name the columns exactly: " + ", ".join(exp_cols) + " (use AS to rename).")
        if len(rows) != len(exp_rows):
            return fail("Your query returns " + str(len(rows)) + " row" + ("" if len(rows) == 1 else "s") + ", but " + str(len(exp_rows)) + " are expected.")
        a, b = _sql_norm(rows), _sql_norm(exp_rows)
        if p.get("ordered"):
            if a != b:
                same = sorted(a, key=repr) == sorted(b, key=repr)
                return fail("The rows are right but in the wrong order: check your ORDER BY." if same else "Some values are different.")
        elif sorted(a, key=repr) != sorted(b, key=repr):
            return fail("Some values are different.")
    return {"ok": True, "total": len(dbs)}

def __judge(payload):
    p = json.loads(payload)
    code = p.get("code", "")
    if p.get("mode") == "sql":
        return json.dumps(_sql_judge(p))
    # data files the mission provides (e.g. CSVs for pandas): written fresh before every run
    for name, content in (p.get("files") or {}).items():
        with open(name, "w", encoding="utf-8") as f:
            f.write(content)
    if p.get("mode") == "run":
        ns, out, disp, err = _exec_user(code, p.get("inputs"))
        return json.dumps({"ok": err is None, "display": disp, "error": err, "images": _grab_figures()})
    try:
        compile(code, "<your code>", "exec")
    except SyntaxError as e:
        return json.dumps({"ok": False, "kind": "error", "error": _fmt_error(e), "display": "", "input": []})
    tests = p.get("tests") or []
    for i, t in enumerate(tests):
        r = _check(code, t)
        if not r["ok"]:
            r["index"] = i
            r["total"] = len(tests)
            return json.dumps(r)
    return json.dumps({"ok": True, "total": len(tests)})
`;
  if (typeof module !== "undefined" && module.exports) module.exports = PY_HARNESS;
  else root.PY_HARNESS = PY_HARNESS;
})(typeof window !== "undefined" ? window : globalThis);
