// Python "judge" that runs inside Pyodide. It executes the learner's code,
// captures output, feeds input(), and runs the hidden checks for a mission.
// Shared by the browser worker (js/runner.js) and the Node validator (tools/validate.mjs).
(function (root) {
  const PY_HARNESS = String.raw`
import sys, io, ast, json, traceback

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
    old = sys.stdout
    sys.stdout = _Tee(check, display)
    err = None
    try:
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
        num = lambda x: isinstance(x, (int, float)) and not isinstance(x, bool)
        same_kind = type(actual) is type(expected) or (num(actual) and num(expected))
        if actual != expected or not same_kind:
            raise _Fail(label + "\n  expected: " + repr(expected) + "\n  got:      " + repr(actual))

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
        exec(test.get("code") or "", tns)
    except AssertionError as e:
        return dict(base, ok=False, kind="fail", message=str(e) or "A check failed.")
    except BaseException as e:
        return dict(base, ok=False, kind="error", error=_fmt_error(e))
    finally:
        sys.stdout = old
    return dict(base, ok=True)

def __judge(payload):
    p = json.loads(payload)
    code = p.get("code", "")
    if p.get("mode") == "run":
        ns, out, disp, err = _exec_user(code, p.get("inputs"))
        return json.dumps({"ok": err is None, "display": disp, "error": err})
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
