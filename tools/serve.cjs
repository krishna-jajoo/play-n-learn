// Local game server: node tools/serve.cjs  → http://localhost:8080
// Serves the game and stores player accounts + progress in the save/ folder (see accounts.cjs).
const http = require("http");
const fs = require("fs");
const path = require("path");
const A = require("./accounts.cjs");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 8080;
const MAX_BODY = 5 * 1024 * 1024;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain" };

// ── protection (see js/guard.js for the in-page part)
// ALLOW_DEVTOOLS=1 turns the in-page guard off for development; AI fetchers and download tools are always refused.
const ALLOW_DEVTOOLS = process.env.ALLOW_DEVTOOLS === "1";
// AI assistants fetching a shared link, AI crawlers/scrapers, search crawlers, and command-line or script downloaders.
const BLOCKED_AGENTS = new RegExp([
  "GPTBot", "ChatGPT", "OAI-SearchBot", "OpenAI", "Claude", "anthropic", "Perplexity", "Google-Extended", "GoogleOther",
  "Applebot", "meta-external", "FacebookBot", "facebookexternalhit", "Amazonbot", "CCBot", "Bytespider", "cohere",
  "MistralAI", "DuckAssist", "YouBot", "Diffbot", "Omgili", "Imagesift", "Timpibot", "PetalBot", "Kangaroo",
  "HeadlessChrome", "Headless", "PhantomJS", "Selenium", "Playwright", "Puppeteer", "Scrapy", "HTTrack",
  "curl", "Wget", "python-requests", "python-urllib", "aiohttp", "httpx", "axios", "node-fetch", "undici", "Go-http-client",
  "Java/", "okhttp", "libwww", "lwp-", "Apache-HttpClient", "PostmanRuntime", "insomnia",
  "bot\\b", "crawl", "spider", "scrap", "fetcher", "agent\\b",
].join("|"), "i");
const isBlockedAgent = (req) => { const ua = req.headers["user-agent"] || ""; return !ua.trim() || BLOCKED_AGENTS.test(ua); };
const NO_INDEX = { "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai" };

// "*" lets the double-clicked file:// page talk to this server too. The server only listens on this computer,
// and logins use a token header (no cookies).
const API_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Expose-Headers": "X-Play-Save",
  "X-Play-Save": "1",
  "Cache-Control": "no-store",
};
const send = (res, status, obj) => { res.writeHead(status, Object.assign({}, API_HEADERS, NO_INDEX)); res.end(JSON.stringify(obj)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > MAX_BODY) { reject(new Error("too large")); req.destroy(); }
    });
    req.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error("bad json")); } });
    req.on("error", reject);
  });
}
const tokenOf = (req) => (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

async function handleApi(req, res, route) {
  if (req.method === "OPTIONS") { res.writeHead(204, API_HEADERS); return res.end(); }
  try {
    if (route === "ping") return send(res, 200, { ok: true, accounts: true });

    if (route === "signup" && req.method === "POST") {
      const { username, password } = await readBody(req);
      const name = A.normName(username);
      const err = A.checkName(name) || A.checkPassword(password);
      if (err) return send(res, 400, { error: err });
      if (A.userExists(name)) return send(res, 409, { error: "That username is already taken." });
      A.createUser(name, password);
      return send(res, 200, { username: name, token: A.createSession(name) });
    }

    if (route === "login" && req.method === "POST") {
      const { username, password } = await readBody(req);
      const name = A.verifyUser(username, password);
      if (!name) { await wait(600); return send(res, 401, { error: "Wrong username or password." }); }
      return send(res, 200, { username: name, token: A.createSession(name) });
    }

    const user = A.sessionUser(tokenOf(req));
    if (!user) return send(res, 401, { error: "Please log in." });

    if (route === "logout" && req.method === "POST") { A.deleteSession(tokenOf(req)); return send(res, 200, { ok: true }); }
    if (route === "me") return send(res, 200, { username: user });
    if (route === "progress" && req.method === "GET") return send(res, 200, A.readProgress(user) || {});
    if (route === "progress" && req.method === "PUT") {
      const data = await readBody(req);
      if (!data || typeof data.missions !== "object") return send(res, 400, { error: "Not a progress file." });
      A.writeProgress(user, data);
      return send(res, 200, { ok: true });
    }
    return send(res, 404, { error: "Unknown request." });
  } catch (e) {
    return send(res, 400, { error: e.message });
  }
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  // robots.txt stays readable so well-behaved crawlers learn they are not welcome; everything else is refused to bots
  if (urlPath !== "/robots.txt" && isBlockedAgent(req)) {
    res.writeHead(403, Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, NO_INDEX));
    return res.end("Access denied: automated clients, crawlers and AI agents are not allowed on this site.");
  }
  if (urlPath.startsWith("/api/")) return handleApi(req, res, urlPath.slice(5));
  const file = path.normalize(path.join(ROOT, urlPath === "/" ? "index.html" : urlPath));
  if (!file.startsWith(ROOT) || file.startsWith(A.SAVE_DIR)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    const headers = Object.assign({ "Content-Type": (TYPES[path.extname(file)] || "application/octet-stream") + "; charset=utf-8" }, NO_INDEX);
    if (file.endsWith("index.html")) {
      headers["Cache-Control"] = "no-store";
      if (ALLOW_DEVTOOLS) data = Buffer.from(String(data).replace('<meta name="pnl-guard" content="on">', '<meta name="pnl-guard" content="off">'));
    }
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\nPort ${PORT} is already in use — probably the game server is already running.`);
    console.error(`  • Just open http://localhost:${PORT} in your browser, or`);
    console.error(`  • use another port:  PORT=3000 node tools/serve.cjs   (PowerShell: $env:PORT=3000; node tools/serve.cjs)`);
    console.error(`  • or stop the old one: find it with  netstat -ano | findstr :${PORT}  then  taskkill /PID <pid> /F\n`);
  } else {
    console.error("Server error:", err.message);
  }
  process.exit(1);
});

// Only reachable from this computer.
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Save the Empire running at http://localhost:${PORT}  (Ctrl+C to stop)`);
  console.log(ALLOW_DEVTOOLS ? "Page protection: OFF (ALLOW_DEVTOOLS=1, for development)" : "Page protection: on (start with ALLOW_DEVTOOLS=1 to debug)");
  const users = A.listUsers();
  console.log(users.length ? `Players: ${users.join(", ")}` : "No players yet — create one on the login screen.");
});
