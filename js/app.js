// Save the Queen — game logic: progress, tower map, missions, timer, judging.
(function () {
  "use strict";

  const WORLDS = window.WORLDS;
  const ALL = WORLDS.flatMap((w) => w.missions.map((m) => Object.assign(m, { world: w })));
  const TOTAL_STARS = ALL.length * 3;
  const HINT_PENALTY = 30; // seconds
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
    if (!$("screen-map").hidden) renderMap();
  }
  const rec = (id) => progress.missions[id] || {};
  const isDone = (id) => !!rec(id).done;
  const starsOf = (id) => rec(id).stars || 0;
  const isUnlocked = (m) => {
    const i = ALL.indexOf(m);
    return i === 0 || isDone(ALL[i - 1].id) || isDone(m.id);
  };
  const totalStars = () => ALL.reduce((s, m) => s + starsOf(m.id), 0);
  const doneCount = () => ALL.filter((m) => isDone(m.id)).length;
  const nextMission = () => ALL.find((m) => !isDone(m.id)) || ALL[ALL.length - 1];

  // ───────────────────────── Python engine
  const engineEl = $("engine-status");
  const runner = new window.PyRunner((state, msg) => {
    engineEl.className = "engine " + state;
    engineEl.querySelector("span").textContent =
      state === "ready" ? "Python ready" : state === "loading" ? "Loading Python…" : "Python failed to load";
    if (state === "error") engineEl.title = msg || "";
    setTimeout(updateRunButtons, 0); // may fire during construction, before `runner` exists
  });

  // ───────────────────────── screens
  const screens = ["login", "home", "map", "mission"];
  function show(name) {
    if (serverMode && !auth) return showLogin();
    document.body.classList.remove("logged-out");
    if (name !== "mission") stopTimer();
    screens.forEach((s) => ($("screen-" + s).hidden = s !== name));
    if (name === "home") renderHome();
    if (name === "map") renderMap();
    window.scrollTo(0, 0);
  }
  document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => show(b.dataset.go)));

  function renderHeader() {
    $("star-count").textContent = `★ ${totalStars()} / ${TOTAL_STARS}`;
    $("practice-toggle").checked = !!progress.practice;
  }

  function renderHome() {
    renderHeader();
    const done = doneCount();
    $("btn-begin").textContent = done === 0 ? "Begin the quest" : done === ALL.length ? "Replay the quest" : "Continue the quest";
    $("home-progress").textContent = done ? `${done} of ${ALL.length} seals broken · ★ ${totalStars()} stars` : "";
    $("syllabus").innerHTML = WORLDS.map((w) => {
      const d = w.missions.filter((m) => isDone(m.id)).length;
      return `<li class="${d === w.missions.length ? "cleared" : ""}">
        <span class="syl-icon">${w.icon}</span>
        <div><b>Floor ${w.id} · ${esc(w.name)}</b><span>${esc(w.topic)}</span>
        <span class="syl-meta">${w.missions.length} missions · ⏱ ${fmt(w.time)} each${d ? ` · ${d}/${w.missions.length} done` : ""}</span></div>
      </li>`;
    }).join("");
  }
  $("btn-begin").addEventListener("click", () => openMission(nextMission()));

  function starHtml(n, max = 3) {
    let s = "";
    for (let i = 0; i < max; i++) s += `<i class="${i < n ? "on" : ""}">★</i>`;
    return `<span class="stars">${s}</span>`;
  }

  function renderMap() {
    renderHeader();
    const floors = [...WORLDS].reverse();
    const allDone = doneCount() === ALL.length;
    let html = `<div class="summit ${allDone ? "freed" : ""}">
        <div class="queen">${allDone ? "👸" : "♛"}</div>
        <div><b>${allDone ? "Queen Ada is free!" : "Queen Ada waits at the top"}</b>
        <span>${doneCount()} / ${ALL.length} seals broken</span></div>
      </div>`;
    html += floors.map((w) => {
      const floorUnlocked = isUnlocked(w.missions[0]);
      const st = w.missions.reduce((s, m) => s + starsOf(m.id), 0);
      const nodes = w.missions.map((m, i) => {
        const un = isUnlocked(m);
        const dn = isDone(m.id);
        const cur = un && !dn;
        return `<button class="node ${dn ? "done" : ""} ${cur ? "current" : ""}" ${un ? "" : "disabled"} data-mission="${m.id}" title="${esc(m.title)}">
            <span class="node-num">${un ? i + 1 : "🔒"}</span>
            <span class="node-title">${esc(m.title)}</span>
            ${starHtml(starsOf(m.id))}
          </button>`;
      }).join("");
      return `<section class="floor ${floorUnlocked ? "" : "locked"}">
          <div class="floor-head">
            <span class="floor-icon">${w.icon}</span>
            <div class="floor-info"><span class="floor-num">Floor ${w.id}</span><h3>${esc(w.name)}</h3><p>${esc(w.topic)}</p></div>
            <div class="floor-meta"><span>⏱ ${fmt(w.time)} each</span><span>★ ${st}/${w.missions.length * 3}</span></div>
          </div>
          <p class="floor-intro">${esc(w.intro)}</p>
          <div class="nodes">${nodes}</div>
        </section>`;
    }).join("");
    $("tower").innerHTML = html;
    $("tower").querySelectorAll("[data-mission]").forEach((b) =>
      b.addEventListener("click", () => openMission(ALL.find((m) => m.id === b.dataset.mission))));
    // Floor 1 is at the bottom of the tower: bring the learner's current mission into view.
    const cur = $("tower").querySelector(".node.current");
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

  function highlight(el, code) {
    if (window.CodeMirror && CodeMirror.runMode) { el.textContent = ""; CodeMirror.runMode(code, "python", el); }
    else el.textContent = code;
  }

  // ───────────────────────── mission
  let current = null;
  let mode = "timed"; // "timed" | "practice"
  let started = false;
  let hintsShown = 0;
  let revealed = false;

  function openMission(m) {
    if (!m || !isUnlocked(m)) return;
    stopTimer();
    current = m;
    mode = progress.practice ? "practice" : "timed";
    started = false;
    hintsShown = 0;
    revealed = false;
    const w = m.world;

    $("m-crumb").innerHTML = `Floor ${w.id} · ${esc(w.name)} <b>› ${esc(m.id)} ${esc(m.title)}</b>`;
    $("m-story").textContent = m.story;
    $("m-title").textContent = m.title;
    $("m-lesson").innerHTML = m.lesson;
    highlight($("m-example"), m.example.replace(/\n$/, ""));
    $("m-task").innerHTML = m.task;
    $("m-hints").innerHTML = "";
    updateHintButton();

    editor.setValue(progress.code[m.id] != null ? progress.code[m.id] : m.starter);
    $("stdin").value = m.sampleInput || "";
    $("input-box").open = m.sampleInput !== undefined;
    setConsole(`<span class="muted">Your program's output will appear here.</span>`);

    $("briefing-floor").textContent = `Floor ${w.id} · Mission ${m.id}`;
    $("briefing-title").textContent = m.title;
    $("briefing-time").textContent = fmt(w.time);
    show("mission");
    $("lesson-panel").scrollTop = 0;

    if (mode === "practice") startMission("practice");
    else { $("briefing").hidden = false; renderCandle(w.time, w.time); }
    setTimeout(() => editor.refresh(), 0);
  }

  function startMission(asMode) {
    mode = asMode;
    started = true;
    $("briefing").hidden = true;
    if (mode === "timed") startTimer(current.world.time);
    else { stopTimer(); $("candle").classList.add("practice"); $("candle-time").textContent = "Practice"; $("candle-fill").style.width = "100%"; }
    editor.focus();
    updateRunButtons();
    updateHintButton();
  }
  $("btn-start").addEventListener("click", () => startMission("timed"));
  $("btn-practice-once").addEventListener("click", () => startMission("practice"));

  $("btn-reset").addEventListener("click", () => {
    if (!current) return;
    if (editor.getValue() !== current.starter && !confirm("Replace your code with the starting code?")) return;
    editor.setValue(current.starter);
  });

  // hints
  function updateHintButton() {
    const left = current ? current.hints.length - hintsShown : 0;
    const b = $("btn-hint");
    b.disabled = left <= 0 || !started;
    b.textContent = !started ? "Hints unlock when you start"
      : left <= 0 ? "No more hints"
      : mode === "timed" && !revealed ? `Reveal a hint (−${HINT_PENALTY}s)` : "Reveal a hint";
  }
  $("btn-hint").addEventListener("click", () => {
    if (!current || hintsShown >= current.hints.length) return;
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
    modal({
      icon: "🕯️", title: "The candle burned out…",
      body: `<p>Malvex's seal holds — for now. Don't worry: every great programmer gets stuck. Your code is still here.</p>
             <p class="muted">Try again with a fresh candle, keep working without a timer, or study the solution and learn from it.</p>`,
      actions: [
        { label: "Try again", primary: true, fn: () => startMission("timed") },
        { label: "Keep going (practice)", fn: () => startMission("practice") },
        { label: "Show solution", fn: revealSolution },
      ],
    });
  }

  function revealSolution() {
    if (!confirm("Show the solution? Your current code will be replaced, and this mission will give 0 stars until you replay it.")) return;
    revealed = true;
    updateHintButton();
    editor.setValue(current.solution);
    if (!started || !timer.running) startMission("practice");
    setConsole(`<div class="msg info">📜 This is one correct solution. Read it line by line, run it, change things and see what happens. Then press <b>Submit</b> to continue up the tower.</div>`);
  }

  // ───────────────────────── run / submit
  function updateRunButtons() {
    const canCode = runner.ready && current && started && !(mode === "timed" && !timer.running);
    $("btn-run").disabled = !canCode || runner.busy;
    $("btn-submit").disabled = !canCode || runner.busy;
    $("btn-run-example").disabled = !runner.ready || runner.busy;
  }
  setInterval(updateRunButtons, 500);

  function setConsole(html) { $("console").innerHTML = html; }

  function errorHtml(err) {
    const where = err.line ? ` on line ${err.line}` : "";
    return `<div class="msg error"><b>${esc(err.type)}${where}:</b> ${esc(err.message)}</div>
      <div class="msg tip">💡 ${esc(err.friendly)}</div>`;
  }
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
    const inputs = $("stdin").value === "" ? [] : $("stdin").value.replace(/\r/g, "").split("\n");
    const r = await runner.exec({ mode: "run", code: editor.getValue(), inputs }, 5000);
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    if (r.kind === "busy") return;
    let html = outputHtml(r.display);
    if (r.error) { html += errorHtml(r.error); markErrorLine(r.error.line); }
    else html += `<div class="msg ok-soft">✔ Ran without errors. Press <b>Submit</b> when you think it's right.</div>`;
    setConsole(html);
  }

  async function doSubmit() {
    if ($("btn-submit").disabled) return;
    const m = current;
    clearErrorLine();
    setConsole(`<div class="muted">Testing your spell against the seal…</div>`);
    const r = await runner.exec({ mode: "submit", code: editor.getValue(), tests: m.tests }, 8000);
    if (m !== current) return;
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    if (r.kind === "busy") return;
    if (r.ok) return win(m, r);

    const label = r.total > 1 ? `Test ${r.index + 1} of ${r.total} failed` : "The seal didn't break";
    let html = `<div class="msg error"><b>✘ ${label}</b></div>`;
    if (r.input && r.input.length) html += `<div class="kv"><span>Input given</span><pre class="out">${esc(r.input.join("\n"))}</pre></div>`;
    if (r.kind === "fail") html += `<pre class="out fail">${esc(r.message)}</pre>`;
    if (r.kind === "error") { html += errorHtml(r.error); markErrorLine(r.error.line); }
    if (r.kind === "error" && r.display) html += `<div class="kv"><span>Output before the error</span>${outputHtml(r.display)}</div>`;
    setConsole(html);
  }

  $("btn-run").addEventListener("click", doRun);
  $("btn-submit").addEventListener("click", doSubmit);
  $("btn-run-example").addEventListener("click", async () => {
    if (!current || !runner.ready) return;
    const inputs = (current.exampleInput || "").split("\n");
    setConsole(`<div class="muted">Running the example…</div>`);
    const r = await runner.exec({ mode: "run", code: current.example, inputs }, 5000);
    if (r.kind === "timeout") return setConsole(timeoutHtml(r));
    let html = `<div class="muted small">Example output${current.exampleInput ? ` (input: ${esc(current.exampleInput.replace(/\n/g, ", "))})` : ""}:</div>` + outputHtml(r.display);
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
    save();
    renderHeader();
    setConsole(`<div class="msg ok">✔ All ${r.total} test${r.total > 1 ? "s" : ""} passed. The seal is broken!</div>`);

    const idx = ALL.indexOf(m);
    const next = ALL[idx + 1];
    const floorDone = m.world.missions.every((x) => isDone(x.id));
    const lastOfFloor = m.world.missions[m.world.missions.length - 1] === m;

    if (!next) return victory();

    const note = revealed ? "You studied the solution — replay with the timer to earn stars."
      : !wasTimed ? "Practice clear! Replay with the timer for up to ★★★."
      : stars === 3 ? "Flawless! The candle had plenty left." : stars === 2 ? "Well done — a little faster next time for ★★★." : "Just in time!";
    modal({
      icon: floorDone && lastOfFloor ? m.world.icon : "🔓",
      title: floorDone && lastOfFloor && firstClear ? `Floor ${m.world.id} cleared!` : "Seal broken!",
      body: `<div class="big-stars">${starHtml(stars)}</div>
        <p>${note}</p>
        ${used != null ? `<p class="muted">Time used: ${fmt(used)} of ${fmt(timer.total)}</p>` : ""}
        ${floorDone && lastOfFloor && firstClear ? `<p>You climb to <b>Floor ${next.world.id}: ${esc(next.world.name)}</b> — ${esc(next.world.topic)}.</p>` : ""}`,
      actions: [
        { label: `Next: ${next.title} →`, primary: true, fn: () => openMission(next) },
        { label: "Back to the tower", fn: () => show("map") },
        { label: "Stay here", fn: () => {} },
      ],
    });
  }

  function victory() {
    modal({
      icon: "👸", title: "You saved the Queen!",
      body: `<p>Every seal of the Obsidian Tower is broken. Queen Ada is free — and <b>you can program in Python</b>.</p>
        <div class="big-stars">★ ${totalStars()} / ${TOTAL_STARS}</div>
        <p><b>Where to go next:</b></p>
        <ul class="next-steps">
          <li>Install Python from python.org and code in an editor like VS Code</li>
          <li>Build small projects: a to-do app, a quiz game, a file organizer</li>
          <li>Learn <b>Git</b> and virtual environments (<code>python -m venv</code>, <code>pip</code>)</li>
          <li>Pick a path: web (<b>Flask</b>, <b>Django</b>), data (<b>pandas</b>, <b>matplotlib</b>), automation, or games (<b>pygame</b>)</li>
          <li>Replay floors with the timer to collect every star</li>
        </ul>`,
      actions: [{ label: "Back to the tower", primary: true, fn: () => show("map") }],
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
    a.download = `play-n-learn-progress-${day}.json`;
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
