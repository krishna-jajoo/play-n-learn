// Checks every mission of every empire.
//   code missions: the reference solution must pass, the starter code must fail, the example must run.
//   quiz missions: answers must be valid; for "predict the output" questions the code is really run and
//                  must print exactly the correct choice (and none of the wrong ones).
// Usage: npm install pyodide@0.26.4   (once, anywhere on NODE_PATH)  then  node tools/validate.cjs [empire-id]
const path = require("path");
const { loadPyodide } = require("pyodide");
const JS = (f) => path.join(__dirname, "..", "js", f);
const HARNESS = require(JS("harness.js"));
const QUEST = require(JS("quest.js"));
require(JS("empires/python.js"));
require(JS("empires/numpy.js"));
require(JS("empires/pandas.js"));
require(JS("empires/sql.js"));
require(JS("empires/stats.js"));
require(JS("empires/viz.js"));
require(JS("empires/ml.js"));
require(JS("empires/capstone.js"));
require(JS("empires/upcoming.js"));

const norm = (s) => String(s).replace(/\r/g, "").split("\n").map((l) => l.trimEnd()).join("\n").trim();

async function loadPkgs(py, list) {
  // same rules as the browser worker: "micropip:name" installs a pure-Python package from PyPI
  const pip = list.filter((p) => p.startsWith("micropip:")).map((p) => p.slice(9));
  const native = list.filter((p) => !p.startsWith("micropip:"));
  if (pip.length) native.push("micropip");
  await py.loadPackage(native, { messageCallback: () => {} });
  if (pip.length) await py.runPythonAsync("import micropip\nawait micropip.install(" + JSON.stringify(pip) + ")");
}

(async () => {
  const only = process.argv[2];
  const py = await loadPyodide();
  py.runPython(HARNESS);
  const judge = py.globals.get("__judge");
  const run = (payload) => JSON.parse(judge(JSON.stringify(payload)));
  let bad = 0, count = 0;
  for (const e of QUEST.build()) {
    if (only && e.id !== only) continue;
    if (!e.playable) continue;
    console.log(`\n${e.icon}  ${e.name}: ${e.worlds.length} floors, ${e.missions.length} missions`);
    if (e.packages && e.packages.length) await loadPkgs(py, e.packages);
    for (const m of e.missions) {
      count++;
      // clean data files left by earlier missions, so a mission that forgets to declare its files fails here too
      py.runPython("import os\nfor _f in os.listdir('.'):\n    if _f.endswith(('.csv', '.json', '.txt')) and os.path.isfile(_f): os.remove(_f)");
      if (m.packages && m.packages.length) await loadPkgs(py, m.packages);
      const problems = [];
      const sqlRealm = e.id === "sql";
      const setup = m.db || e.db || "";
      const sqlCheck = (sql) => run({ mode: "sql", sql, setup, verify: m.verify, solution: m.solution, variants: m.variants || e.variants || [],
        ordered: !!m.ordered, checkNames: !!m.checkNames, mustUse: m.mustUse, mustNotUse: m.mustNotUse });
      if (m.type === "quiz" && sqlRealm) {
        (m.questions || []).forEach((q, k) => {
          const tag = `Q${k + 1}: `;
          if (!(q.answer >= 0 && q.answer < q.choices.length)) problems.push(tag + "answer index out of range");
          if (new Set(q.choices.map(norm)).size !== q.choices.length) problems.push(tag + "duplicate choices");
          if (!q.code) return;
          const r = run({ mode: "sql", run: true, sql: q.code, setup });
          if (r.error && !q.allowError) problems.push(tag + "query failed: " + r.error.message);
          if (q.predict) {
            const out = r.error ? "SQL error" : norm(r.compact);
            if (out !== norm(q.choices[q.answer])) problems.push(tag + `correct choice ${JSON.stringify(q.choices[q.answer])} but the query returns ${JSON.stringify(out)}`);
            q.choices.forEach((c, i) => { if (i !== q.answer && norm(c) === out) problems.push(tag + `wrong choice ${i} equals the real result`); });
          }
        });
      } else if (sqlRealm) {
        const sol = sqlCheck(m.solution);
        if (!sol.ok) problems.push("SOLUTION FAILS: " + JSON.stringify(sol.error || sol.message));
        const start = sqlCheck(m.starter);
        if (start.ok) problems.push("starter passes (tests too weak)");
        if (m.example) {
          const ex = run({ mode: "sql", run: true, sql: m.example, setup });
          if (!ex.ok) problems.push("example errors: " + JSON.stringify(ex.error));
        }
        (m.extraSolutions || []).forEach((alt, i) => { const r = sqlCheck(alt); if (!r.ok) problems.push(`alternative solution ${i + 1} is rejected: ` + (r.message || JSON.stringify(r.error)).split("\n")[0]); });
        (m.wrongSolutions || []).forEach((wr, i) => { const r = sqlCheck(wr); if (r.ok) problems.push(`wrong solution ${i + 1} is accepted (tests too weak)`); });
      } else if (m.type === "quiz") {
        if (!m.questions || !m.questions.length) problems.push("quiz has no questions");
        (m.questions || []).forEach((q, k) => {
          const tag = `Q${k + 1}: `;
          if (!q.q || !Array.isArray(q.choices) || q.choices.length < 2) problems.push(tag + "needs q and at least 2 choices");
          if (!(q.answer >= 0 && q.answer < q.choices.length)) problems.push(tag + "answer index out of range");
          if (new Set(q.choices.map(norm)).size !== q.choices.length) problems.push(tag + "duplicate choices");
          if (q.predict) {
            const r = run({ mode: "run", code: q.code, inputs: [], files: m.files });
            const out = norm(r.display + (r.error ? `\n${r.error.type}` : ""));
            if (r.error && !q.allowError) problems.push(tag + "code raised " + r.error.type + ": " + r.error.message);
            if (out !== norm(q.choices[q.answer])) problems.push(tag + `correct choice ${JSON.stringify(q.choices[q.answer])} but code prints ${JSON.stringify(out)}`);
            q.choices.forEach((c, i) => { if (i !== q.answer && norm(c) === out) problems.push(tag + `wrong choice ${i} equals the real output`); });
          } else if (q.code) {
            const r = run({ mode: "run", code: q.code, inputs: [], files: m.files });
            if (r.error && !q.allowError) problems.push(tag + "code raised " + r.error.type + ": " + r.error.message);
          }
        });
      } else {
        const sol = run({ mode: "submit", code: m.solution, tests: m.tests, files: m.files });
        const start = run({ mode: "submit", code: m.starter, tests: m.tests, files: m.files });
        const sample = m.sampleInput !== undefined
          ? run({ mode: "run", code: m.solution, inputs: m.sampleInput.split("\n"), files: m.files }) : { ok: true };
        if (!sol.ok) problems.push("SOLUTION FAILS: " + JSON.stringify(Object.assign({}, sol, { images: sol.images ? sol.images.length + " chart(s)" : undefined }), null, 1));
        if (start.ok) problems.push("starter passes (tests too weak)");
        if (!sample.ok) problems.push("sample input breaks solution: " + JSON.stringify(sample.error));
        if (m.example) {
          const ex = run({ mode: "run", code: m.example, inputs: (m.exampleInput || "").split("\n"), files: m.files });
          if (!ex.ok) problems.push("example errors: " + JSON.stringify(ex.error));
        }
        (m.extraSolutions || []).forEach((alt, k) => {
          const r = run({ mode: "submit", code: alt, tests: m.tests, files: m.files });
          if (!r.ok) problems.push(`alternative solution ${k + 1} is rejected: ` + JSON.stringify(r.message || r.error));
        });
        (m.wrongSolutions || []).forEach((wr, k) => {
          const r = run({ mode: "submit", code: wr, tests: m.tests, files: m.files });
          if (r.ok) problems.push(`wrong solution ${k + 1} is accepted (tests too weak)`);
        });
      }
      if (!m.title || (m.type === "code" && (!m.task || !m.hints || !m.hints.length))) problems.push("missing title/task/hints");
      if (problems.length) { bad++; console.log(`✗ ${m.id} [${m.type}] ${m.title}\n   ` + problems.join("\n   ")); }
      else console.log(`✓ ${m.id} [${m.type}] ${m.title}`);
    }
  }
  console.log(`\n${count - bad}/${count} missions OK`);
  process.exit(bad ? 1 : 0);
})();
