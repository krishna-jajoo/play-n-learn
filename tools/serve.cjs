// Minimal static server: node tools/serve.cjs  → http://localhost:8080
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 8080;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".ico": "image/x-icon" };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const file = path.normalize(path.join(ROOT, urlPath === "/" ? "index.html" : urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": (TYPES[path.extname(file)] || "application/octet-stream") + "; charset=utf-8" });
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

server.listen(PORT, () => console.log(`Save the Queen running at http://localhost:${PORT}  (Ctrl+C to stop)`));
