// Runs Python (Pyodide) inside a Web Worker so that an infinite loop can be stopped
// by killing the worker and starting a fresh one. Extra packages (e.g. NumPy) are loaded
// on demand and reloaded automatically whenever the worker is restarted.
(function () {
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

  const WORKER_SRC = `
    let py = null, judge = null;
    // "numpy" = a Pyodide package; "micropip:seaborn" = a pure-Python package installed from PyPI.
    const IMPORTS = { "scikit-learn": "sklearn", matplotlib: "matplotlib.pyplot" };
    async function loadPkgs(list) {
      if (!list || !list.length) return;
      const pip = list.filter((p) => p.startsWith("micropip:")).map((p) => p.slice(9));
      const native = list.filter((p) => !p.startsWith("micropip:"));
      if (pip.length) native.push("micropip");
      await py.loadPackage(native);
      if (pip.length) await py.runPythonAsync("import micropip\\nawait micropip.install(" + JSON.stringify(pip) + ")");
      const mods = native.filter((p) => p !== "micropip").map((p) => IMPORTS[p] || p).concat(pip);
      py.runPython(mods.map((m) => "import " + m).join("\\n")); // warm up the import cache
      py.runPython("__prepare_plots()");
    }
    self.onmessage = async (e) => {
      const m = e.data;
      if (m.type === "init") {
        try {
          importScripts(${JSON.stringify(PYODIDE_URL)});
          py = await loadPyodide();
          py.runPython(m.harness);
          judge = py.globals.get("__judge");
          await loadPkgs(m.packages);
          self.postMessage({ type: "ready" });
        } catch (err) {
          self.postMessage({ type: "loaderror", error: String(err) });
        }
      } else if (m.type === "packages") {
        try {
          await loadPkgs(m.list);
          self.postMessage({ type: "packages", id: m.id, ok: true });
        } catch (err) {
          self.postMessage({ type: "packages", id: m.id, ok: false, error: String(err) });
        }
      } else if (m.type === "run") {
        let result;
        try {
          result = JSON.parse(judge(m.payload));
        } catch (err) {
          result = { ok: false, kind: "error", error: { type: "EngineError", message: String(err),
            friendly: "The game's Python engine hit a problem. Try again." } };
        }
        self.postMessage({ type: "result", id: m.id, result });
      }
    };
  `;

  const LABEL = { numpy: "NumPy", pandas: "pandas", matplotlib: "matplotlib", "scikit-learn": "scikit-learn (a big download, first time only)", scipy: "SciPy (a big download, first time only)",
    sqlite3: "SQLite", "micropip:seaborn": "seaborn" };

  class PyRunner {
    constructor(onStatus) {
      this.onStatus = onStatus || (() => {});
      this.seq = 0;
      this.loaded = new Set(); // packages loaded in the current worker
      this.wanted = new Set(); // packages to load again after a restart
      this.loadingPackages = null; // promise while packages are loading
      this.workerUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      this._spawn();
    }

    _spawn() {
      this.ready = false;
      this.pending = null;
      this.loaded = new Set();
      this.readyPromise = new Promise((res) => (this._resolveReady = res));
      this.worker = new Worker(this.workerUrl);
      const pkgs = [...this.wanted];
      this.worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === "ready") {
          pkgs.forEach((p) => this.loaded.add(p));
          this.ready = true;
          this.onStatus("ready");
          this._resolveReady();
        } else if (m.type === "loaderror") {
          this.onStatus("error", m.error);
        } else if (m.type === "packages" && this._pkgWait && m.id === this._pkgWait.id) {
          const w = this._pkgWait;
          this._pkgWait = null;
          w.resolve(m);
        } else if (m.type === "result" && this.pending && m.id === this.pending.id) {
          clearTimeout(this.pending.timer);
          const p = this.pending;
          this.pending = null;
          p.resolve(m.result);
        }
      };
      this.worker.onerror = (e) => this.onStatus("error", e.message || "Worker failed to start");
      this.onStatus("loading", pkgs.length ? "Loading Python + " + pkgs.map((p) => LABEL[p] || p).join(", ") + "…" : "Loading Python…");
      this.worker.postMessage({ type: "init", harness: window.PY_HARNESS, packages: pkgs });
    }

    get busy() {
      return !!this.pending || !!this.loadingPackages;
    }

    // Make sure these packages are importable. Resolves to true when they are.
    async ensurePackages(list) {
      (list || []).forEach((p) => this.wanted.add(p));
      if (this.loadingPackages) await this.loadingPackages;
      await this.readyPromise;
      const missing = (list || []).filter((p) => !this.loaded.has(p));
      if (!missing.length) return true;
      const id = ++this.seq;
      this.onStatus("loading", "Loading " + missing.map((p) => LABEL[p] || p).join(", ") + "…");
      this.loadingPackages = new Promise((resolve) => {
        this._pkgWait = { id, resolve };
        this.worker.postMessage({ type: "packages", id, list: missing });
      }).then((m) => {
        this.loadingPackages = null;
        if (m.ok) {
          missing.forEach((p) => this.loaded.add(p));
          this.onStatus("ready");
          return true;
        }
        this.onStatus("error", "Couldn't load " + missing.join(", ") + ": " + m.error);
        return false;
      });
      return this.loadingPackages;
    }

    async exec(payload, timeoutMs = 5000) {
      await this.readyPromise;
      if (this.loadingPackages) await this.loadingPackages;
      if (this.pending) return { ok: false, kind: "busy" };
      const id = ++this.seq;
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          // Infinite loop (or very slow code): kill the worker and boot a new one.
          this.pending = null;
          this.worker.terminate();
          this._spawn();
          resolve({ ok: false, kind: "timeout", seconds: timeoutMs / 1000 });
        }, timeoutMs);
        this.pending = { id, resolve, timer };
        this.worker.postMessage({ type: "run", id, payload: JSON.stringify(payload) });
      });
    }
  }

  window.PyRunner = PyRunner;
})();
