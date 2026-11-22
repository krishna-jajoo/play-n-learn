// Save the Empire: the registry that every empire file (js/empires/*.js) plugs into.
// An empire is a realm with its own tower of floors; each floor has missions.
//
// Mission types
//   code (default): lesson, example, task, starter, solution, hints, tests (judged by js/harness.js)
//   quiz          : questions: [{ q, code?, choices, answer, explain?, predict? }]
//                   predict: true means `code` really prints choices[answer]; the validator runs it to make sure.
//
// Mission ids must be unique across the whole game (they are the keys of saved progress), so never rename one.
(function (root) {
  // Tag: raw string (backslashes kept) + remove common indentation.
  function d(strings, ...vals) {
    let s = String.raw({ raw: strings.raw }, ...vals);
    const startsOnOwnLine = s.startsWith("\n");
    s = s.replace(/^\n/, "").replace(/\n[ \t]*$/, "");
    const lines = s.split("\n");
    // If text starts right after the backtick, the first line has no indent: dedent the rest on their own.
    const body = startsOnOwnLine ? lines : lines.slice(1);
    const nonBlank = body.filter((l) => l.trim());
    const ind = nonBlank.length ? Math.min(...nonBlank.map((l) => l.match(/^ */)[0].length)) : 0;
    const out = lines.map((l, i) => (!startsOnOwnLine && i === 0 ? l.trim() : l.slice(ind)));
    return out.join("\n") + "\n";
  }

  // The order realms appear on the world map.
  const ORDER = ["python", "numpy", "sql", "pandas", "stats", "viz", "ml", "capstone"];
  const byId = {};

  const QUEST = {
    d,
    // Register (or replace) an empire. Fields: id, name, realm, tower, ruler, rulerIcon, icon, color,
    // requires: [empire ids], blurb, worlds: [...] (playable) or plan: [{ name, topic }] (coming soon).
    empire(e) {
      byId[e.id] = e;
      return e;
    },
    get empires() {
      const list = ORDER.filter((id) => byId[id]).map((id) => byId[id]);
      Object.keys(byId).forEach((id) => { if (!ORDER.includes(id)) list.push(byId[id]); });
      return list;
    },
    // Link every floor/mission back to its empire; number floors by position (ids stay stable).
    build() {
      const seen = new Set();
      QUEST.empires.forEach((e) => {
        e.worlds = e.worlds || [];
        e.missions = [];
        e.worlds.forEach((w, i) => {
          w.num = i + 1;
          w.empire = e;
          w.missions.forEach((m) => {
            if (seen.has(m.id)) throw new Error("Duplicate mission id " + m.id);
            seen.add(m.id);
            m.world = w;
            m.empire = e;
            m.type = m.type || "code";
            e.missions.push(m);
          });
        });
        e.playable = e.missions.length > 0;
      });
      return QUEST.empires;
    },
  };

  root.QUEST = QUEST;
  if (typeof module !== "undefined" && module.exports) module.exports = QUEST;
})(typeof window !== "undefined" ? window : globalThis);
