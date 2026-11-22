// Save the Empire — game logic: accounts, progress, world map, towers, missions, timer, judging.
(function () {
  "use strict";

  const EMPIRES = window.QUEST.build();
  const EMP = Object.fromEntries(EMPIRES.map((e) => [e.id, e]));
  const ALL = EMPIRES.flatMap((e) => e.missions);
  const TOTAL_STARS = ALL.length * 3;
  const HINT_PENALTY = 30; // seconds (also the cost of a wrong quiz answer)
  const timeOf = (m) => m.time || (m.type === "quiz" ? Math.max(90, 60 * m.questions.length) : m.world.time);
  const LEGACY_KEY = "save-the-queen-python-v1"; // browser save from before accounts (also used in guest mode)
  const AUTH_KEY = "pnl-auth";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (sec) => {
    sec = Math.max(0, Math.ceil(sec));
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  };

  // ───────────────────────── storage helpers
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } },
  };
  const emptyProgress = () => ({ missions: {}, code: {}, practice: false });

  // ───────────────────────── accounts
  // With tools/serve.cjs running, each player logs in and their progress lives in save/progress/<name>.json.
  // Without the server (e.g. a plain static host) the game runs in guest mode, saving in this browser only.
  let serverMode = false;
  let auth = store.get(AUTH_KEY); // { username, token } | null
  const storeKey = () => (auth ? "pnl-progress:" + auth.username : LEGACY_KEY);

  // ───────────────────────── progress
  function loadProgress() {
    const p = store.get(storeKey());
    return p && p.missions ? p : emptyProgress();
  }
  let progress = emptyProgress();
  function saveLocal() {
    store.set(storeKey(), progress);
  }
  function save() {
    progress.updated = Date.now();
    saveLocal();
    pushSoon();
  }

  // Combine two saves without losing anything: a mission done in either is done, best stars win.
  function mergeProgress(a, b) {
    const newer = (a.updated || 0) >= (b.updated || 0) ? a : b;
    const older = newer === a ? b : a;
    const out = {
      missions: {},
      code: Object.assign({}, older.code || {}, newer.code || {}),
      practice: !!newer.practice,
      empire: newer.empire || older.empire,
      opened: Object.assign({}, older.opened || {}, newer.opened || {}),
      updated: Math.max(a.updated || 0, b.updated || 0),
    };
    const ids = new Set([...Object.keys(a.missions || {}), ...Object.keys(b.missions || {})]);
    ids.forEach((id) => {
      const x = (a.missions || {})[id] || {}, y = (b.missions || {})[id] || {};
      const bests = [x.best, y.best].filter((v) => typeof v === "number");
      out.missions[id] = { done: !!(x.done || y.done), stars: Math.max(x.stars || 0, y.stars || 0) };
      if (bests.length) out.missions[id].best = Math.min(...bests);
    });
    return out;
  }

  // ───────────────────────── server API (tools/serve.cjs)
  const API_BASE = location.protocol === "file:" ? "http://localhost:8080/api/" : "api/";
  function api(route, { method = "GET", body } = {}) {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (auth) headers.Authorization = "Bearer " + auth.token;
    return fetch(API_BASE + route, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined, cache: "no-store", keepalive: method === "PUT" });
  }
  let pushTimer = null;
  function pushSoon() { clearTimeout(pushTimer); pushTimer = setTimeout(pushNow, 600); }
  function pushNow() {
    if (!serverMode || !auth) return Promise.resolve();
    const who = auth.username;
    return api("progress", { method: "PUT", body: progress })
      .then((r) => {
        if (r.status === 401 && auth && auth.username === who) return sessionExpired();
        setSaveStatus(r.ok);
      })
      .catch(() => setSaveStatus(false));
  }
  function setSaveStatus(ok) {
    const el = $("save-status");
    el.textContent = !serverMode ? "Guest mode: progress is saved in this browser only. Use Export to keep a backup."
      : ok === false ? "⚠ Couldn't reach the game server — progress is kept in this browser for now."
      : `✓ ${auth.username}'s progress is saved (save/progress/${auth.username}.json)`;
  }

  async function boot() {
    try {
      const r = await fetch(API_BASE + "ping", { cache: "no-store" });
      serverMode = r.headers.get("X-Play-Save") === "1";
    } catch (e) { serverMode = false; }

    if (!serverMode) { // guest mode: no accounts available
      auth = null;
      progress = loadProgress();
      renderUserChip();
      setSaveStatus();
      return show("home");
    }
    if (auth) {
      try {
        const r = await api("me");
        if (r.ok) return enterAs(auth);
      } catch (e) { /* fall through to login */ }
      auth = null;
      store.del(AUTH_KEY);
    }
    showLogin();
  }

  async function enterAs(a) {
    auth = a;
    store.set(AUTH_KEY, auth);
    progress = loadProgress(); // this browser's copy for this player
    try {
      const r = await api("progress");
      if (r.ok) {
        const remote = await r.json();
        if (remote && remote.missions) progress = mergeProgress(progress, remote);
      }
    } catch (e) { /* offline: keep the browser copy */ }
    offerLegacyProgress();
    saveLocal();
    pushNow();
    renderUserChip();
    setSaveStatus();
    show("home");
  }

  // Progress saved in this browser before accounts existed: offer it to the player once.
  function offerLegacyProgress() {
    const legacy = store.get(LEGACY_KEY);
    if (!legacy || !legacy.missions) return;
    const n = Object.values(legacy.missions).filter((m) => m.done).length;
    const skipKey = "pnl-legacy-skip:" + auth.username;
    if (!n || store.get(skipKey)) return;
    if (confirm(`This browser has progress saved before accounts existed (${n} missions finished).\n\nAdd it to ${auth.username}'s account?`)) {
      progress = mergeProgress(progress, legacy);
      store.del(LEGACY_KEY);
    } else {
      store.set(skipKey, true);
    }
  }

  async function logout() {
    stopTimer();
    clearTimeout(pushTimer);
    clearTimeout(saveTimer);
    await pushNow(); // make sure the latest progress is on disk before the session ends
    try { await api("logout", { method: "POST" }); } catch (e) { /* ignore */ }
    auth = null;
    store.del(AUTH_KEY);
    progress = emptyProgress();
    current = null;
    showLogin();
  }
  function sessionExpired() {
    auth = null;
    store.del(AUTH_KEY);
    showLogin("You were logged out. Please log in again.");
  }

  function renderUserChip() {
    $("user-chip").hidden = !auth;
    if (auth) $("user-name").textContent = auth.username;
  }

  // ───────────────────────── login screen
  let loginMode = "login"; // "login" | "signup"
  function showLogin(message) {
    renderUserChip();
    setLoginMode(loginMode);
    $("login-error").textContent = message || "";
    document.body.classList.add("logged-out");
    $("save-status").textContent = "";
    screens.forEach((s) => ($("screen-" + s).hidden = s !== "login"));
    $("login-user").focus();
  }
  function setLoginMode(m) {
    loginMode = m;
    const signup = m === "signup";
    $("tab-login").classList.toggle("active", !signup);
    $("tab-signup").classList.toggle("active", signup);
    $("tab-login").setAttribute("aria-selected", String(!signup));
    $("tab-signup").setAttribute("aria-selected", String(signup));
    $("login-confirm-row").hidden = !signup;
    $("login-pass").autocomplete = signup ? "new-password" : "current-password";
    $("login-submit").textContent = signup ? "Create player & start" : "Log in";
    $("login-error").textContent = "";
  }
  $("tab-login").addEventListener("click", () => setLoginMode("login"));
  $("tab-signup").addEventListener("click", () => setLoginMode("signup"));
  $("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = $("login-user").value.trim();
    const password = $("login-pass").value;
    const err = $("login-error");
    if (loginMode === "signup" && password !== $("login-confirm").value) { err.textContent = "The two passwords don't match."; return; }
    const btn = $("login-submit");
    btn.disabled = true;
    err.textContent = "";
    try {
      const r = await api(loginMode, { method: "POST", body: { username, password } });
      const data = await r.json();
      if (!r.ok) { err.textContent = data.error || "Something went wrong."; return; }
      $("login-pass").value = "";
      $("login-confirm").value = "";
      await enterAs({ username: data.username, token: data.token });
    } catch (ex) {
      err.textContent = "Couldn't reach the game server. Is `node tools/serve.cjs` running?";
    } finally {
      btn.disabled = false;
    }
  });

  function refreshVisible() {
    renderHeader();
    if (!$("screen-home").hidden) renderHome();
    if (!$("screen-map").hidden) renderMap(activeEmpire());
  }
  const rec = (id) => progress.missions[id] || {};
  const isDone = (id) => !!rec(id).done;
  const starsOf = (id) => rec(id).stars || 0;
  const starsIn = (list) => list.reduce((s, m) => s + starsOf(m.id), 0);
  const doneIn = (list) => list.filter((m) => isDone(m.id)).length;
  const totalStars = () => starsIn(ALL);
  const doneCount = () => doneIn(ALL);

  // A realm is freed when every seal is broken. The next realm opens once every realm it builds on is
  // at least UNLOCK_PCT % done. Once open it stays open, even if new missions are later added to an earlier realm.
  const UNLOCK_PCT = 70;
  const empireFreed = (e) => e.playable && e.missions.every((m) => isDone(m.id));
  const unlockNeed = (e) => Math.ceil((e.missions.length * UNLOCK_PCT) / 100);
  const empireReady = (e) => e.playable && doneIn(e.missions) >= unlockNeed(e);
  const requiresMet = (e) => e.requires.every((id) => EMP[id] && empireReady(EMP[id]));
  // what a locked realm still needs, e.g. "28 of the 40 NumPy seals (you have 21)"
  const stillNeeded = (e) => e.requires.map((id) => EMP[id]).filter((x) => !empireReady(x))
    .map((x) => `${unlockNeed(x)} of the ${x.missions.length} ${esc(x.name)} seals (you have ${doneIn(x.missions)})`);
  // realms this one will open at the 70% mark that aren’t open yet, e.g. "NumPy & SQL"
  const opensNext = (e) => EMPIRES.filter((x) => x.playable && x.requires.includes(e.id) && !empireOpen(x) && !empireReady(e)).map((x) => esc(x.name));
  const empireOpen = (e) => e.playable && (!e.requires.length || !!(progress.opened || {})[e.id] || requiresMet(e));
  function rememberOpened() {
    progress.opened = progress.opened || {};
    let changed = false;
    EMPIRES.forEach((e) => { if (e.playable && e.requires.length && !progress.opened[e.id] && requiresMet(e)) { progress.opened[e.id] = true; changed = true; } });
    return changed;
  }
  const isUnlocked = (m) => {
    if (isDone(m.id)) return true;
    if (!empireOpen(m.empire)) return false;
    const list = m.empire.missions;
    const i = list.indexOf(m);
    return i === 0 || isDone(list[i - 1].id);
  };
  // Continue where the player is furthest along; earlier gaps (e.g. newly added missions) stay open on the map.
  function nextMission(e) {
    const list = e.missions;
    let last = -1;
    list.forEach((m, i) => { if (isDone(m.id)) last = i; });
    return list.slice(last + 1).find((m) => !isDone(m.id)) || list.find((m) => !isDone(m.id)) || list[list.length - 1];
  }
  const activeEmpire = () => {
    const e = EMP[progress.empire];
    return e && empireOpen(e) ? e : EMPIRES[0];
  };

  // ───────────────────────── Python engine
  const engineEl = $("engine-status");
  let runnerRef = null; // the callback below can fire during construction, before `runner` exists
  const runner = new window.PyRunner((state, msg) => {
    engineEl.className = "engine " + state;
    const extras = runnerRef ? [...runnerRef.loaded].map((p) => ({ numpy: "NumPy", pandas: "pandas", sqlite3: "SQLite", scipy: "SciPy", matplotlib: "matplotlib", "micropip:seaborn": "seaborn", "scikit-learn": "scikit-learn" }[p] || p)) : [];
    engineEl.querySelector("span").textContent =
      state === "ready" ? ["Python", ...extras].join(" + ") + " ready" : state === "loading" ? msg || "Loading Python…" : "Python failed to load";
    engineEl.title = state === "error" ? msg || "" : "Python engine status";
    setTimeout(updateRunButtons, 0);
  });
  runnerRef = runner;
  // Run code and refresh the Run/Submit buttons right away (not only on the 500 ms timer), so a quick click isn't lost.
  async function execRun(payload, ms) {
    setTimeout(updateRunButtons, 0);
    try { return await runner.exec(payload, ms); } finally { updateRunButtons(); }
  }
  // Each realm says which Python packages it needs (e.g. NumPy); load them as soon as the player heads there.
  const needPackages = (e) => { if (e && e.packages && e.packages.length) runner.ensurePackages(e.packages); };
  // Heavier libraries need more time per run.
  const runMs = () => (current && current.empire.runMs) || 5000;
  const submitMs = () => (current && current.empire.submitMs) || 8000;

  // ───────────────────────── screens
  const screens = ["login", "home", "map", "mission"];
  function show(name) {
    if (serverMode && !auth) return showLogin();
    document.body.classList.remove("logged-out");
    if (name !== "mission") stopTimer();
    screens.forEach((s) => ($("screen-" + s).hidden = s !== name));
    if (name === "home") renderHome();
    if (name === "map") renderMap(activeEmpire());
    window.scrollTo(0, 0);
  }
  document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => show(b.dataset.go)));

  function renderHeader() {
    $("star-count").innerHTML = `★ ${totalStars()}<span class="star-total"> / ${TOTAL_STARS}</span>`;
    $("practice-toggle").checked = !!progress.practice;
    $("btn-tower").innerHTML = `<span class="tower-icon">${activeEmpire().icon} </span>Tower`;
  }

  // ───────────────────────── home: the world map of realms
  // Depth = how many realms stand before this one; realms of the same depth share a row.
  const depthOf = (e) => (e.requires.length ? 1 + Math.max(...e.requires.map((id) => depthOf(EMP[id]))) : 0);
  function realmState(e) {
    if (!e.playable) return "soon";
    if (empireFreed(e)) return "freed";
    return empireOpen(e) ? "open" : "locked";
  }
  const floorsOf = (e) => (e.playable ? e.worlds : e.plan || []);

  function renderHome() {
    if (rememberOpened()) save();
    renderHeader();
    const done = doneCount();
    const e = activeEmpire();
    $("btn-begin").textContent = done === 0 ? "Begin the quest" : `Continue in ${e.name} ${e.icon}`;
    const freed = EMPIRES.filter(empireFreed).length;
    $("home-progress").textContent = done ? `${done} seals broken · ★ ${totalStars()} stars · ${freed} of ${EMPIRES.length} realms freed` : "";

    const rows = [];
    EMPIRES.forEach((x) => (rows[depthOf(x)] = rows[depthOf(x)] || []).push(x));
    $("realm-map").innerHTML = rows.map((row) => `<div class="realm-row">${row.map((x) => {
      const st = realmState(x);
      const n = x.missions.length, dn = doneIn(x.missions);
      const pct = n ? Math.round((dn / n) * 100) : 0;
      const meta = st === "freed" ? `${x.rulerIcon} ${esc(x.ruler)} is free · ★ ${starsIn(x.missions)}/${n * 3}`
        : st === "open" ? `${dn} / ${n} seals · ★ ${starsIn(x.missions)}/${n * 3}${opensNext(x).length ? `<br>${unlockNeed(x)} seals open ${opensNext(x).join(" & ")}` : ""}`
        : st === "locked" ? `🔒 Opens with ${stillNeeded(x).join(" & ")}`
        : `Coming soon · ${floorsOf(x).length} floors planned`;
      return `<button class="realm ${st}" data-realm="${x.id}" style="--realm:${x.color}">
          <span class="realm-icon">${x.icon}</span>
          <span class="realm-name">${esc(x.name)}</span>
          <span class="realm-sub">${esc(x.realm)}</span>
          <span class="realm-bar"><i style="width:${pct}%"></i></span>
          <span class="realm-meta">${meta}</span>
        </button>`;
    }).join("")}</div>`).join("");
    $("realm-map").querySelectorAll("[data-realm]").forEach((b) => b.addEventListener("click", () => openRealm(EMP[b.dataset.realm])));
  }
  $("btn-begin").addEventListener("click", () => openMission(nextMission(activeEmpire())));

  function openRealm(e) {
    const st = realmState(e);
    if (st === "open" || st === "freed") { progress.empire = e.id; saveLocal(); return show("map"); }
    const floors = floorsOf(e).map((f) => `<li><b>${esc(f.name)}</b> <span class="muted">· ${esc(f.topic)}</span></li>`).join("");
    modal({
      icon: e.icon, title: `${e.name} · ${e.realm}`,
      body: `<p>${esc(e.blurb)}</p>
        <p class="muted">${st === "soon" ? "This realm is still being built." : `Break ${UNLOCK_PCT}% of the seals in ${e.requires.map((id) => `<b>${esc(EMP[id].name)}</b>`).join(" and ")} to open it. Still needed: ${stillNeeded(e).join(", ")}.`}
        ${esc(e.ruler)} waits in ${esc(e.tower)}.</p>
        <ol class="plan-list">${floors}</ol>`,
      actions: [{ label: "Close", primary: true, fn: () => {} }],
    });
  }

  function starHtml(n, max = 3) {
    let s = "";
    for (let i = 0; i < max; i++) s += `<i class="${i < n ? "on" : ""}">★</i>`;
    return `<span class="stars">${s}</span>`;
  }

  function renderMap(e) {
    renderHeader();
    needPackages(e);
    progress.empire = e.id;
    document.documentElement.style.setProperty("--realm", e.color);
    $("map-realm").textContent = `${e.icon} ${e.name} · ${e.realm}`;
    $("map-title").textContent = e.tower;
    const floors = [...e.worlds].reverse();
    const allDone = empireFreed(e);
    const dn = doneIn(e.missions);
    let html = `<div class="summit ${allDone ? "freed" : ""}">
        <div class="queen">${allDone ? e.rulerIcon : "♛"}</div>
        <div><b>${allDone ? `${esc(e.ruler)} is free!` : `${esc(e.ruler)} waits at the top`}</b>
        <span>${dn} / ${e.missions.length} seals broken</span></div>
      </div>`;
    html += floors.map((w) => {
      const floorUnlocked = w.missions.some(isUnlocked);
      const st = starsIn(w.missions);
      const quizzes = w.missions.filter((m) => m.type === "quiz").length;
      const nodes = w.missions.map((m, i) => {
        const un = isUnlocked(m);
        const dn = isDone(m.id);
        const cur = un && !dn;
        return `<button class="node ${m.type} ${dn ? "done" : ""} ${cur ? "current" : ""}" ${un ? "" : "disabled"} data-mission="${m.id}" title="${esc(m.title)}">
            <span class="node-num">${un ? i + 1 : "🔒"}${m.type === "quiz" ? " · quiz" : m.boss ? " · boss" : ""}</span>
            <span class="node-title">${esc(m.title)}</span>
            ${starHtml(starsOf(m.id))}
          </button>`;
      }).join("");
      return `<section class="floor ${floorUnlocked ? "" : "locked"}">
          <div class="floor-head">
            <span class="floor-icon">${w.icon}</span>
            <div class="floor-info"><span class="floor-num">Floor ${w.num}</span><h3>${esc(w.name)}</h3><p>${esc(w.topic)}</p></div>
            <div class="floor-meta"><span>⏱ ${fmt(w.time)} per mission${quizzes ? " · quizzes shorter" : ""}</span><span>★ ${st}/${w.missions.length * 3}</span></div>
          </div>
          <p class="floor-intro">${esc(w.intro)}</p>
          <div class="nodes">${nodes}</div>
        </section>`;
    }).join("");
    $("tower").innerHTML = html;
    $("tower").querySelectorAll("[data-mission]").forEach((b) =>
      b.addEventListener("click", () => openMission(ALL.find((m) => m.id === b.dataset.mission))));
    // Floor 1 is at the bottom of the tower: bring the learner's furthest mission into view.
    const nx = nextMission(e);
    const cur = $("tower").querySelector(`.node.current[data-mission="${nx.id}"]`) || $("tower").querySelector(".node.current");
    if (cur) setTimeout(() => cur.scrollIntoView({ block: "center" }), 0);
  }

  // ───────────────────────── editor
  let editor = null;
  const host = $("editor-host");
  if (window.CodeMirror) {
    editor = CodeMirror(host, {
      mode: "python", theme: "quest", lineNumbers: true, indentUnit: 4, tabSize: 4,
      matchBrackets: true, autoCloseBrackets: true, viewportMargin: Infinity,
      extraKeys: {
        Tab: (cm) => (cm.somethingSelected() ? cm.indentSelection("add") : cm.replaceSelection("    ", "end")),
        "Shift-Tab": (cm) => cm.indentSelection("subtract"),
        "Ctrl-Enter": () => doRun(), "Cmd-Enter": () => doRun(),
        "Shift-Ctrl-Enter": () => doSubmit(), "Shift-Cmd-Enter": () => doSubmit(),
      },
    });
    editor.on("change", () => { if (current) { progress.code[current.id] = editor.getValue(); saveSoon(); } clearErrorLine(); });
  } else {
    const ta = document.createElement("textarea");
    ta.className = "fallback-editor";
    ta.spellcheck = false;
    host.appendChild(ta);
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText("    ", s, ta.selectionEnd, "end"); }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); e.shiftKey ? doSubmit() : doRun(); }
    });
    ta.addEventListener("input", () => { if (current) { progress.code[current.id] = ta.value; saveSoon(); } });
    editor = { getValue: () => ta.value, setValue: (v) => (ta.value = v), refresh() {}, focus: () => ta.focus(), setOption() {} };
  }
  let saveTimer = null;
  const saveSoon = () => { clearTimeout(saveTimer); saveTimer = setTimeout(save, 400); };

  let errorLine = null;
  function markErrorLine(line) {
    clearErrorLine();
    if (!line || !editor.addLineClass) return;
    errorLine = editor.addLineClass(line - 1, "background", "cm-error-line");
  }
  function clearErrorLine() {
    if (errorLine != null && editor.removeLineClass) editor.removeLineClass(errorLine, "background", "cm-error-line");
    errorLine = null;
  }

  function highlight(el, code, lang = "python") {
    if (window.CodeMirror && CodeMirror.runMode) { el.textContent = ""; CodeMirror.runMode(code, lang, el); }
    else el.textContent = code;
  }
  // SQL realm: the player writes queries, which run against the realm's SQLite database.
  const isSql = (m) => !!m && m.empire.id === "sql";
  const langOf = (m) => (isSql(m) ? "text/x-sqlite" : "python");
  const setupOf = (m) => m.db || m.empire.db || "";
  const sqlPayload = (m, sql, extra) => Object.assign({ mode: "sql", sql, setup: setupOf(m), verify: m.verify }, extra);

  // ───────────────────────── mission
  let current = null;
  let mode = "timed"; // "timed" | "practice"
  let started = false;
  let hintsShown = 0;
  let revealed = false;

  function openMission(m) {
    if (!m || !isUnlocked(m)) return;
    needPackages({ packages: [...(m.empire.packages || []), ...(m.packages || [])] }); // some missions need extra libraries (e.g. SciPy)
    stopTimer();
    current = m;
    mode = progress.practice ? "practice" : "timed";
    started = false;
    hintsShown = 0;
    revealed = false;
    const w = m.world, e = m.empire, isQuiz = m.type === "quiz";
    const pos = w.missions.indexOf(m) + 1;
    progress.empire = e.id;
    document.documentElement.style.setProperty("--realm", e.color);

    $("m-crumb").innerHTML = `${e.icon} Floor ${w.num} · ${esc(w.name)} <b>› ${pos}. ${esc(m.title)}</b>`;
    $("m-story").textContent = m.story || "";
    $("m-title").textContent = m.title;
    $("m-lesson").innerHTML = m.lesson || "";
    $("m-example-box").hidden = !m.example;
    if (m.example) highlight($("m-example"), m.example.replace(/\n$/, ""), langOf(m));
    $("m-schema").hidden = !(isSql(m) && e.schema);
    if (isSql(m) && e.schema) $("m-schema-body").innerHTML = e.schema;
    $("m-task-head").textContent = isQuiz ? "🔮 Your trial" : m.boss ? "🐉 Floor boss" : "⚔ Your mission";
    $("m-task").innerHTML = isQuiz ? (m.task || `Answer all ${m.questions.length} questions correctly. Read each one carefully, because every wrong answer burns ${HINT_PENALTY} seconds of the candle.`) : m.task;
    $("m-hints-box").hidden = isQuiz;
    $("m-hints").innerHTML = "";
    updateHintButton();

    // quiz missions swap the editor for the question panel
    $("quiz-panel").hidden = !isQuiz;
    ["editor-wrap", "input-box", "run-row", "console-box"].forEach((id) => ($(id).hidden = isQuiz));
    $("code-panel").classList.toggle("quiz-mode", isQuiz);
    if (isQuiz) { quiz.i = 0; renderQuestion(); }
    else {
      editor.setOption("mode", langOf(m));
      $("file-tab").textContent = isSql(m) ? "query.sql" : "main.py";
      editor.setValue(progress.code[m.id] != null ? progress.code[m.id] : m.starter);
      $("stdin").value = m.sampleInput || "";
      $("input-box").open = m.sampleInput !== undefined;
      $("input-box").hidden = isSql(m);
      setConsole(isSql(m) ? `<span class="muted">Your query's result will appear here as a table.</span>` : `<span class="muted">Your program's output will appear here.</span>`);
    }

    const t = timeOf(m);
    $("briefing-floor").textContent = `${e.name} · Floor ${w.num} · ${isQuiz ? "Quiz" : m.boss ? "Boss" : "Mission"} ${pos}`;
    $("briefing-title").textContent = m.title;
    $("briefing-lead").textContent = isQuiz ? `${m.questions.length} questions. When you press start, you'll have` : "Read the lesson on the left. When you press start, you'll have";
    $("briefing-time").textContent = fmt(t);
    show("mission");
    $("lesson-panel").scrollTop = 0;

    if (mode === "practice") startMission("practice");
    else { $("briefing").hidden = false; renderCandle(t, t); }
    if (!isQuiz) setTimeout(() => editor.refresh(), 0);
    updateRunButtons();
  }

  function startMission(asMode) {
    mode = asMode;
    started = true;
    $("briefing").hidden = true;
    if (mode === "timed") startTimer(timeOf(current));
    else { stopTimer(); $("candle").classList.add("practice"); $("candle-time").textContent = "Practice"; $("candle-fill").style.width = "100%"; }
    if (current.type === "quiz") { if (mode === "timed") quiz.i = 0; renderQuestion(); } // a fresh candle restarts the quiz
    else editor.focus();
    updateRunButtons();
    updateHintButton();
  }

  // ───────────────────────── quiz missions
  const quiz = { i: 0 };
  const canAnswer = () => started && !(mode === "timed" && !timer.running);
  function renderQuestion() {
    const qs = current.questions, q = qs[quiz.i];
    $("q-progress").textContent = `Question ${quiz.i + 1} of ${qs.length}`;
    $("q-text").innerHTML = q.q;
    $("q-code").hidden = !q.code;
    if (q.code) highlight($("q-code"), q.code.replace(/\n$/, ""), langOf(current));
    $("q-feedback").innerHTML = "";
    $("q-next").hidden = true;
    $("q-run").hidden = true;
    const box = $("q-choices");
    box.innerHTML = "";
    box.classList.toggle("mono", !!q.predict);
    q.choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "choice";
      b.innerHTML = `<span class="choice-key">${"ABCDEF"[i]}</span><span class="choice-text">${q.predict ? `<pre>${esc(c)}</pre>` : c}</span>`;
      b.addEventListener("click", () => answer(i, b));
      box.appendChild(b);
    });
  }
  function answer(i, btn) {
    if (!canAnswer() || btn.disabled) return;
    const q = current.questions[quiz.i];
    const last = quiz.i === current.questions.length - 1;
    if (i !== q.answer) {
      btn.classList.add("wrong");
      btn.disabled = true;
      let msg = `<div class="msg error">✘ Not quite. Look again${q.code ? " and trace the code line by line" : ""}.</div>`;
      if (mode === "timed" && timer.running) { timer.penalty += HINT_PENALTY; flashPenalty(); msg = msg.replace("</div>", ` (−${HINT_PENALTY}s)</div>`); }
      $("q-feedback").innerHTML = msg;
      return;
    }
    $("q-choices").querySelectorAll(".choice").forEach((b, k) => { b.disabled = true; if (k === i) b.classList.add("right"); });
    $("q-feedback").innerHTML = `<div class="msg ok">✔ Correct!</div>${q.explain ? `<div class="msg info">${q.explain}</div>` : ""}`;
    $("q-run").hidden = !q.code;
    if (last) return win(current, { total: current.questions.length });
    $("q-next").hidden = false;
    $("q-next").focus();
  }
  $("q-next").addEventListener("click", () => { quiz.i++; renderQuestion(); });
  $("q-run").addEventListener("click", async () => {
    const q = current && current.type === "quiz" && current.questions[quiz.i];
    if (!q || !q.code || !runner.ready) return;
    const r = isSql(current)
      ? await execRun(sqlPayload(current, q.code, { run: true, verify: undefined }), runMs())
      : await execRun({ mode: "run", code: q.code, inputs: [], files: current.files }, runMs());
    if (r.kind === "timeout" || r.kind === "busy") return;
    const out = document.createElement("div");
    out.className = "kv";
    out.innerHTML = `<span>${isSql(current) ? "Real result" : "Real output"}</span>${resultHtml(r)}${r.error ? errorHtml(r.error) : ""}`;
    $("q-feedback").appendChild(out);
    $("q-run").hidden = true;
  });
  $("btn-start").addEventListener("click", () => startMission("timed"));
  $("btn-practice-once").addEventListener("click", () => startMission("practice"));

  $("btn-reset").addEventListener("click", () => {
    if (!current) return;
    if (editor.getValue() !== current.starter && !confirm("Replace your code with the starting code?")) return;
    editor.setValue(current.starter);
  });

  // hints
  function updateHintButton() {
    const left = current && current.hints ? current.hints.length - hintsShown : 0;
    const b = $("btn-hint");
    b.disabled = left <= 0 || !started;
    b.textContent = !started ? "Hints unlock when you start"
      : left <= 0 ? "No more hints"
      : mode === "timed" && !revealed ? `Reveal a hint (−${HINT_PENALTY}s)` : "Reveal a hint";
  }
  $("btn-hint").addEventListener("click", () => {
    if (!current || !current.hints || hintsShown >= current.hints.length) return;
    const li = document.createElement("li");
    li.textContent = current.hints[hintsShown++];
    $("m-hints").appendChild(li);
    if (mode === "timed" && timer.running) {
      timer.penalty += HINT_PENALTY;
      flashPenalty();
    }
    updateHintButton();
  });

  // ───────────────────────── timer (the candle)
  const timer = { running: false, start: 0, total: 0, penalty: 0, id: null };
  function startTimer(total) {
    stopTimer();
    Object.assign(timer, { running: true, start: performance.now(), total, penalty: 0 });
    $("candle").classList.remove("practice", "out");
    timer.id = setInterval(tick, 200);
    tick();
  }
  function stopTimer() {
    timer.running = false;
    clearInterval(timer.id);
  }
  const elapsed = () => (performance.now() - timer.start) / 1000 + timer.penalty;
  const remaining = () => timer.total - elapsed();
  function tick() {
    const left = remaining();
    renderCandle(left, timer.total);
    if (left <= 0) timeUp();
  }
  function renderCandle(left, total) {
    const pct = Math.max(0, Math.min(1, left / total));
    const fill = $("candle-fill");
    fill.style.width = pct * 100 + "%";
    const c = $("candle");
    c.classList.remove("practice");
    c.classList.toggle("warn", pct <= 0.5 && pct > 0.25);
    c.classList.toggle("danger", pct <= 0.25);
    c.classList.toggle("urgent", left <= 10 && left > 0 && timer.running);
    $("candle-time").textContent = fmt(left);
  }
  function flashPenalty() {
    const c = $("candle");
    const tag = document.createElement("span");
    tag.className = "penalty";
    tag.textContent = `−${HINT_PENALTY}s`;
    c.appendChild(tag);
    setTimeout(() => tag.remove(), 1200);
    tick();
  }
  function timeUp() {
    stopTimer();
    $("candle").classList.add("out");
    updateRunButtons();
    const isQuiz = current.type === "quiz";
    modal({
      icon: "🕯️", title: "The candle burned out…",
      body: `<p>Malvex's seal holds — for now. Don't worry: every great programmer gets stuck.${isQuiz ? "" : " Your code is still here."}</p>
             <p class="muted">Try again with a fresh candle, keep working without a timer, or ${isQuiz ? "see the answer to this question" : "study the solution"} and learn from it.</p>`,
      actions: [
        { label: "Try again", primary: true, fn: () => startMission("timed") },
        { label: "Keep going (practice)", fn: () => startMission("practice") },
        { label: isQuiz ? "Show the answer" : "Show solution", fn: revealSolution },
      ],
    });
  }

  function revealSolution() {
    if (current.type === "quiz") {
      if (!confirm("Show the right answer? This quiz will give 0 stars until you replay it.")) return;
      revealed = true;
      startMission("practice");
      const q = current.questions[quiz.i];
      $("q-choices").children[q.answer].classList.add("reveal");
      $("q-feedback").innerHTML = `<div class="msg info">📜 The highlighted answer is correct.${q.explain ? " " + q.explain : ""} Pick it to continue.</div>`;
      return;
    }
    if (!confirm("Show the solution? Your current code will be replaced, and this mission will give 0 stars until you replay it.")) return;
    revealed = true;
    updateHintButton();
    editor.setValue(current.solution);
    if (!started || !timer.running) startMission("practice");
    setConsole(`<div class="msg info">📜 This is one correct solution. Read it line by line, run it, change things and see what happens. Then press <b>Submit</b> to continue up the tower.</div>`);
  }

  // ───────────────────────── run / submit
  function updateRunButtons() {
    const canCode = runner.ready && current && current.type !== "quiz" && started && !(mode === "timed" && !timer.running);
    $("btn-run").disabled = !canCode || runner.busy;
    $("btn-submit").disabled = !canCode || runner.busy;
    $("btn-run-example").disabled = !runner.ready || runner.busy;
    // don't let the candle burn while Python (or a library like NumPy) is still downloading
    const waiting = current && current.type !== "quiz" && (!runner.ready || !!runner.loadingPackages);
    const start = $("btn-start");
    if (start.disabled !== !!waiting) {
      start.disabled = !!waiting;
      start.textContent = waiting ? "Waiting for the Python engine…" : "Light the candle & start";
    }
  }
  setInterval(updateRunButtons, 500);

  function setConsole(html) { $("console").innerHTML = html; }

  function errorHtml(err) {
    const where = err.line ? ` on line ${err.line}` : "";
    return `<div class="msg error"><b>${esc(err.type)}${where}:</b> ${esc(err.message)}</div>
      <div class="msg tip">💡 ${esc(err.friendly)}</div>`;
  }
  function imagesHtml(images) {
    return (images || []).map((b64) => `<img class="plot" alt="your chart" src="data:image/png;base64,${b64}">`).join("");
  }
  // printed output and/or charts; "(nothing was printed)" only when there's neither
  const resultHtml = (r) => (r.display || !(r.images && r.images.length) ? outputHtml(r.display) : "") + imagesHtml(r.images);
  function outputHtml(text) {
    return text ? `<pre class="out">${esc(text)}</pre>` : `<div class="muted">(nothing was printed)</div>`;
  }
  const timeoutHtml = (r) => `<div class="msg error"><b>⏱ Your code ran for more than ${r.seconds} seconds and was stopped.</b></div>
    <div class="msg tip">💡 Is there an infinite loop? A <code>while</code> loop needs something inside it that eventually makes its condition False (or a <code>break</code>).</div>
    <div class="muted small">Restarting the Python engine…</div>`;

  async function doRun() {
    if ($("btn-run").disabled) return;
    clearErrorLine();
    setConsole(`<div class="muted">Running…</div>`);
    if (isSql(current)) {
      const r = await execRun(sqlPayload(current, editor.getValue(), { run: true }), runMs());
      if (r.kind === "timeout") return setConsole(timeoutHtml(r));
      if (r.kind === "busy") return;
      if (r.error) return setConsole(errorHtml(r.error));
      return setConsole(`${current.verify ? '<div class="muted small">The database after your statements:</div>' : ""}<pre class="out sql-table">${esc(r.display)}</pre><div class="msg ok-soft">✔ The query ran. Press <b>Submit</b> when you think the result is right.</div>`);
    }
    const inputs = $("stdin").value === "" ? [] : $("stdin").value.replace(/\r/g, "").split("\n");
    const r = await execRun({ mode: "run", code: editor.getValue(), inputs, files: current.files }, runMs());
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    if (r.kind === "busy") return;
    let html = resultHtml(r);
    if (r.error) { html += errorHtml(r.error); markErrorLine(r.error.line); }
    else html += `<div class="msg ok-soft">✔ Ran without errors. Press <b>Submit</b> when you think it's right.</div>`;
    setConsole(html);
  }

  async function doSubmit() {
    if ($("btn-submit").disabled) return;
    const m = current;
    clearErrorLine();
    setConsole(`<div class="muted">Testing your spell against the seal…</div>`);
    const r = isSql(m)
      ? await execRun(sqlPayload(m, editor.getValue(), { solution: m.solution, variants: m.variants || m.empire.variants || [],
          ordered: !!m.ordered, checkNames: !!m.checkNames, mustUse: m.mustUse, mustNotUse: m.mustNotUse }), submitMs())
      : await execRun({ mode: "submit", code: editor.getValue(), tests: m.tests, files: m.files }, submitMs());
    if (m !== current) return;
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    if (r.kind === "busy") return;
    if (r.ok) return win(m, r);

    const label = isSql(m) && r.total > 1 ? (r.index === 0 ? "Wrong result on the kingdom database" : `Right on the kingdom database, but wrong on hidden test database ${r.index} of ${r.total - 1}`)
      : r.total > 1 ? `Test ${r.index + 1} of ${r.total} failed` : "The seal didn't break";
    let html = `<div class="msg error"><b>✘ ${label}</b></div>`;
    if (r.input && r.input.length) html += `<div class="kv"><span>Input given</span><pre class="out">${esc(r.input.join("\n"))}</pre></div>`;
    if (r.kind === "fail") html += `<pre class="out fail">${esc(r.message)}</pre>`;
    if (r.kind === "error") { html += errorHtml(r.error); markErrorLine(r.error.line); }
    if (r.kind === "error" && r.display) html += `<div class="kv"><span>Output before the error</span>${outputHtml(r.display)}</div>`;
    if (r.images && r.images.length) html += `<div class="kv"><span>Your chart</span>${imagesHtml(r.images)}</div>`;
    setConsole(html);
  }

  $("btn-run").addEventListener("click", doRun);
  $("btn-submit").addEventListener("click", doSubmit);
  $("btn-run-example").addEventListener("click", async () => {
    if (!current || !runner.ready) return;
    const inputs = (current.exampleInput || "").split("\n");
    setConsole(`<div class="muted">Running the example…</div>`);
    const r = isSql(current)
      ? await execRun(sqlPayload(current, current.example, { run: true, verify: undefined }), runMs())
      : await execRun({ mode: "run", code: current.example, inputs, files: current.files }, runMs());
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    let html = `<div class="muted small">Example output${current.exampleInput ? ` (input: ${esc(current.exampleInput.replace(/\n/g, ", "))})` : ""}:</div>` + resultHtml(r);
    if (r.error) html += errorHtml(r.error);
    setConsole(html);
  });
  document.addEventListener("keydown", (e) => {
    if ($("screen-mission").hidden || !$("modal").hidden) return;
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !(e.target.closest && e.target.closest(".CodeMirror"))) {
      e.preventDefault(); e.shiftKey ? doSubmit() : doRun();
    }
  });

  // ───────────────────────── winning
  function win(m, r) {
    const wasTimed = mode === "timed" && timer.running;
    const used = wasTimed ? elapsed() : null;
    stopTimer();
    let stars;
    if (revealed) stars = 0;
    else if (!wasTimed) stars = 1;
    else {
      const frac = remaining() / timer.total;
      stars = frac >= 0.5 ? 3 : frac >= 0.25 ? 2 : 1;
    }
    const prev = rec(m.id);
    const firstClear = !prev.done;
    progress.missions[m.id] = {
      done: true,
      stars: Math.max(prev.stars || 0, stars),
      best: used != null ? Math.min(prev.best || Infinity, Math.round(used)) : prev.best,
    };
    const isQuiz = m.type === "quiz";
    const e = m.empire;
    const wasOpen = Object.assign({}, progress.opened);
    rememberOpened();
    const newlyOpened = EMPIRES.filter((x) => x.playable && x.requires.length && !wasOpen[x.id] && empireOpen(x));
    save();
    renderHeader();
    if (!isQuiz) setConsole(`<div class="msg ok">✔ All ${r.total} test${r.total > 1 ? "s" : ""} passed. The seal is broken!</div>`);

    const list = e.missions;
    const idx = list.indexOf(m);
    // after the last mission, carry on with anything still unfinished in this realm
    const next = list[idx + 1] || list.find((x) => !isDone(x.id));
    const floorDone = m.world.missions.every((x) => isDone(x.id));
    const lastOfFloor = m.world.missions[m.world.missions.length - 1] === m;

    if (empireFreed(e) && firstClear) return victory(e, newlyOpened);
    if (!next) return victory(e, []);
    const nextWorld = list[idx + 1] ? next.world : null;
    const explain = isQuiz && m.questions[m.questions.length - 1].explain;

    const note = revealed ? "You studied the solution — replay with the timer to earn stars."
      : !wasTimed ? "Practice clear! Replay with the timer for up to ★★★."
      : stars === 3 ? "Flawless! The candle had plenty left." : stars === 2 ? "Well done — a little faster next time for ★★★." : "Just in time!";
    modal({
      icon: floorDone && lastOfFloor ? m.world.icon : "🔓",
      title: floorDone && lastOfFloor && firstClear ? `Floor ${m.world.num} cleared!` : isQuiz ? "Trial passed!" : "Seal broken!",
      body: `<div class="big-stars">${starHtml(stars)}</div>
        <p>${note}</p>
        ${explain ? `<div class="msg info modal-explain">${explain}</div>` : ""}
        ${used != null ? `<p class="muted">Time used: ${fmt(used)} of ${fmt(timer.total)}</p>` : ""}
        ${newlyOpened.map((x) => `<div class="msg ok">${x.icon} <b>A new realm is open: ${esc(x.name)}</b> · ${esc(x.realm)}. You can keep climbing here, or begin it from the realms map.</div>`).join("")}
        ${floorDone && lastOfFloor && firstClear && nextWorld ? `<p>You climb to <b>Floor ${nextWorld.num}: ${esc(nextWorld.name)}</b> — ${esc(nextWorld.topic)}.</p>` : ""}`,
      actions: [
        { label: `Next: ${next.title} →`, primary: true, fn: () => openMission(next) },
        { label: "Back to the tower", fn: () => show("map") },
        { label: "Stay here", fn: () => {} },
      ],
    });
  }

  function victory(e, opened) {
    const after = EMPIRES.filter((x) => x.requires.includes(e.id));
    const nextList = after.map((x) => `<li>${x.icon} <b>${esc(x.name)}</b> · ${esc(x.realm)} — ${
      !x.playable ? "coming soon" : opened.includes(x) || empireOpen(x) ? "<b>now open!</b>" : `also needs ${stillNeeded(x).join(" & ")}`}</li>`).join("");
    const allFreed = EMPIRES.every(empireFreed);
    modal({
      icon: e.rulerIcon, title: allFreed ? "You saved the Empire!" : `You freed ${e.ruler}!`,
      body: `${allFreed
        ? `<p>The last seal is broken. ${esc(e.ruler)} and every ruler are free, and <b>the Empire is saved</b>.</p>
          <p>You learned ${EMPIRES.filter((x) => x !== e).map((x) => esc(x.name)).join(", ").replace(/, ([^,]*)$/, " and $1")}, then put them all to work on real projects. That is the work of a data scientist.</p>`
        : `<p>Every seal of ${esc(e.tower)} is broken. ${esc(e.ruler)} is free — and <b>you know ${esc(e.name)}</b>.</p>`}
        <div class="big-stars">★ ${starsIn(e.missions)} / ${e.missions.length * 3}</div>
        ${nextList ? `<p><b>The road ahead:</b></p><ul class="next-steps">${nextList}</ul>` : ""}
        <p class="muted">Replay floors with the timer to collect every star.</p>`,
      actions: [
        { label: "Back to the realms", primary: true, fn: () => show("home") },
        { label: "Stay in this tower", fn: () => show("map") },
      ],
    });
  }

  // ───────────────────────── modal
  function modal({ icon, title, body, actions }) {
    $("modal-icon").textContent = icon || "";
    $("modal-title").textContent = title;
    $("modal-body").innerHTML = body;
    const box = $("modal-actions");
    box.innerHTML = "";
    actions.forEach((a) => {
      const b = document.createElement("button");
      b.className = "btn " + (a.primary ? "primary" : "ghost");
      b.textContent = a.label;
      b.addEventListener("click", () => { $("modal").hidden = true; a.fn(); });
      box.appendChild(b);
    });
    $("modal").hidden = false;
    setTimeout(() => box.querySelector("button")?.focus(), 30);
  }

  // ───────────────────────── settings
  $("practice-toggle").addEventListener("change", (e) => {
    progress.practice = e.target.checked;
    save();
    if (current && !$("screen-mission").hidden && progress.practice && !(mode === "timed" && timer.running)) startMission("practice");
  });
  $("btn-reset-progress").addEventListener("click", () => {
    const who = auth ? `${auth.username}'s` : "all";
    if (!confirm(`Erase ${who} stars, progress and saved code? This cannot be undone.`)) return;
    progress = emptyProgress();
    save();
    show("home");
  });

  // Export / import a backup file (works anywhere: other browser, other computer).
  $("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(progress, null, 1)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const now = new Date();
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    a.download = `save-the-empire-progress-${day}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  });
  $("btn-import").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data.missions !== "object") throw new Error("not a progress file");
      const before = doneCount();
      progress = mergeProgress(progress, data);
      save();
      show("home");
      alert(`Progress imported. Seals broken: ${before} → ${doneCount()}.`);
    } catch (err) {
      alert("That file isn't a valid progress backup.");
    }
  });

  $("btn-logout").addEventListener("click", logout);

  boot();
})();
