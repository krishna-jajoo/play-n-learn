// Runs Python (Pyodide) inside a Web Worker so that an infinite loop can be stopped
// by killing the worker and starting a fresh one.
(function () {
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

  const WORKER_SRC = `
    let judge = null;
    self.onmessage = async (e) => {
      const m = e.data;
      if (m.type === "init") {
        try {
          importScripts(${JSON.stringify(PYODIDE_URL)});
          const py = await loadPyodide();
          py.runPython(m.harness);
          judge = py.globals.get("__judge");
          self.postMessage({ type: "ready" });
        } catch (err) {
          self.postMessage({ type: "loaderror", error: String(err) });
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

  class PyRunner {
    constructor(onStatus) {
      this.onStatus = onStatus || (() => {});
      this.seq = 0;
      this.workerUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      this._spawn();
    }

    _spawn() {
      this.ready = false;
      this.pending = null;
      this.readyPromise = new Promise((res) => (this._resolveReady = res));
      this.worker = new Worker(this.workerUrl);
      this.worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === "ready") {
          this.ready = true;
          this.onStatus("ready");
          this._resolveReady();
        } else if (m.type === "loaderror") {
          this.onStatus("error", m.error);
        } else if (m.type === "result" && this.pending && m.id === this.pending.id) {
          clearTimeout(this.pending.timer);
          const p = this.pending;
          this.pending = null;
          p.resolve(m.result);
        }
      };
      this.worker.onerror = (e) => this.onStatus("error", e.message || "Worker failed to start");
      this.onStatus("loading");
      this.worker.postMessage({ type: "init", harness: window.PY_HARNESS });
    }

    get busy() {
      return !!this.pending;
    }

    async exec(payload, timeoutMs = 5000) {
      await this.readyPromise;
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
