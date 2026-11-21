// Checks every mission: the reference solution must pass, the starter code must fail.
// Usage: npm install pyodide@0.26.4   (once, anywhere on NODE_PATH)  then  node tools/validate.cjs
const path = require("path");
const { loadPyodide } = require("pyodide");
const HARNESS = require(path.join(__dirname, "..", "js", "harness.js"));
const WORLDS = require(path.join(__dirname, "..", "js", "levels.js"));

(async () => {
  const py = await loadPyodide();
  py.runPython(HARNESS);
  const judge = py.globals.get("__judge");
  const run = (payload) => JSON.parse(judge(JSON.stringify(payload)));
  let bad = 0, count = 0;
  for (const w of WORLDS) {
    for (const m of w.missions) {
      count++;
      const sol = run({ mode: "submit", code: m.solution, tests: m.tests });
      const start = run({ mode: "submit", code: m.starter, tests: m.tests });
      const sample = m.sampleInput !== undefined
        ? run({ mode: "run", code: m.solution, inputs: m.sampleInput.split("\n") }) : { ok: true };
      const ex = run({ mode: "run", code: m.example, inputs: (m.exampleInput || "").split("\n") });
      const problems = [];
      if (!sol.ok) problems.push("SOLUTION FAILS: " + JSON.stringify(sol, null, 1));
      if (start.ok) problems.push("starter passes (tests too weak)");
      if (!sample.ok) problems.push("sample input breaks solution: " + JSON.stringify(sample.error));
      if (!ex.ok) problems.push("example errors: " + JSON.stringify(ex.error));
      if (problems.length) { bad++; console.log(`✗ ${m.id} ${m.title}\n   ` + problems.join("\n   ")); }
      else console.log(`✓ ${m.id} ${m.title}`);
    }
  }
  console.log(`\n${count - bad}/${count} missions OK`);
  process.exit(bad ? 1 : 0);
})();
