// Page protection (inspired by the bills app). Runs first, before anything else on the page:
//  • headless / automated browsers (scrapers, AI agents driving a browser) get "Access denied"
//  • developer-tools, view-source and save-page shortcuts are blocked, and so is right-click (except in the editor)
//  • if developer tools are opened anyway, disable-devtool detects it and the page locks
// For development, start the server with ALLOW_DEVTOOLS=1 (node tools/serve.cjs): it marks the page and this guard is off.
// Note: anything a browser can show can, with enough effort, be copied. This keeps casual inspection and bots out;
// the server (tools/serve.cjs) is what turns away AI fetchers and download tools.
(function () {
  var meta = document.querySelector('meta[name="pnl-guard"]');
  if (meta && meta.content === "off") return;

  function lockPage(title, text) {
    try { window.dispatchEvent(new Event("pagehide")); } catch (e) { /* bank the mission time first */ }
    var html = '<head><meta charset="utf-8"><title>Save the Empire</title></head>' +
      '<body style="margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'background:#0b0e22;color:#ebe8f5;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;box-sizing:border-box">' +
      '<div style="font-size:56px">🛡️</div><h1 style="margin:12px 0 8px">' + title + "</h1>" +
      '<p style="max-width:460px;color:#a9a3c7;line-height:1.5">' + text + "</p></body>";
    document.documentElement.innerHTML = html;
    try { window.stop(); } catch (e) { /* ignore */ }
  }

  // 1) bots and automated browsers
  var ua = navigator.userAgent || "";
  var automated = navigator.webdriver ||
    /HeadlessChrome|Headless|PhantomJS|Selenium|Playwright|Puppeteer|scrap|crawl|spider|(bot|agent)\b|GPT|Claude|anthropic|Perplexity|ChatGPT|OpenAI/i.test(ua) ||
    window.__playwright || window.__puppeteer || window.__phantom_stub__ || window.callPhantom || window._phantom || window.__nightmare;
  if (automated) {
    lockPage("Access denied", "Automated browsers, crawlers and AI agents are not allowed on this site.");
    return;
  }

  // 2) a small toast for blocked actions
  var toastTimer = null;
  function warn(msg) {
    var t = document.getElementById("guard-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "guard-toast";
      t.setAttribute("role", "status");
      t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;background:#2a1f45;" +
        "color:#ffdf8a;border:1px solid #6b55a8;border-radius:10px;padding:10px 16px;font:600 14px Inter,system-ui,sans-serif;" +
        "box-shadow:0 8px 30px rgba(0,0,0,.4);pointer-events:none;transition:opacity .2s";
      (document.body || document.documentElement).appendChild(t);
    }
    t.textContent = "🛡️ " + (msg || "That action is disabled in the Empire.");
    t.style.opacity = "1";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.style.opacity = "0"; }, 1800);
  }

  // 3) shortcuts: developer tools, view source, save page
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    var mod = e.ctrlKey || e.metaKey;
    var blocked =
      e.key === "F12" || e.keyCode === 123 ||
      (mod && e.shiftKey && ["i", "j", "c", "k"].indexOf(k) >= 0) ||   // inspect / console / picker (Firefox: K)
      (e.metaKey && e.altKey && ["i", "j", "c", "u"].indexOf(k) >= 0) || // macOS: Cmd+Option+I/J/C/U
      (mod && !e.shiftKey && (k === "u" || k === "s"));                  // view source / save page
    if (blocked) { e.preventDefault(); e.stopPropagation(); warn("Inspecting the page is disabled."); }
  }, true);

  // 4) right-click: allowed inside the code editor and text boxes (players paste code), blocked elsewhere
  document.addEventListener("contextmenu", function (e) {
    var el = e.target;
    if (el && el.closest && el.closest(".CodeMirror, input, textarea")) return;
    e.preventDefault();
    warn("Right-click is disabled here.");
  }, true);

  // 5) developer tools opened another way (browser menu, already docked…): lock the page
  if (window.DisableDevtool) {
    window.DisableDevtool({
      disableMenu: false,   // handled above, so the editor keeps its menu
      clearLog: true,
      disableSelect: false, // players select and copy their own code
      disableCopy: false,
      disableCut: false,
      disablePaste: false,
      ondevtoolopen: function () {
        lockPage("Developer tools are not allowed", "Close the developer tools, then reload the page to keep playing. Your progress is saved.");
      },
    });
  }
})();
