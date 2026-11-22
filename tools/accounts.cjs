// Player accounts stored on this computer, used by serve.cjs and users.cjs.
//   save/users.json          username -> { salt, hash }   (passwords are hashed with scrypt, never stored)
//   save/sessions.json       login token -> username       (keeps you logged in)
//   save/progress/<name>.json  each player's progress
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SAVE_DIR = path.join(__dirname, "..", "save");
const USERS_FILE = path.join(SAVE_DIR, "users.json");
const SESSIONS_FILE = path.join(SAVE_DIR, "sessions.json");
const PROGRESS_DIR = path.join(SAVE_DIR, "progress");
const NAME_RE = /^[a-z0-9_-]{3,20}$/;

function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}
function writeJSON(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 1));
  fs.renameSync(tmp, file);
}

const normName = (n) => String(n || "").trim().toLowerCase();
function checkName(name) {
  if (!NAME_RE.test(name)) return "Username must be 3–20 characters: letters, numbers, _ or -.";
  return null;
}
function checkPassword(pw) {
  if (typeof pw !== "string" || pw.length < 4) return "Password must be at least 4 characters.";
  if (pw.length > 200) return "Password is too long.";
  return null;
}

const hash = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString("hex");
const loadUsers = () => readJSON(USERS_FILE, { users: {} });

function listUsers() {
  return Object.keys(loadUsers().users).sort();
}
function userExists(name) {
  return !!loadUsers().users[normName(name)];
}
function createUser(name, pw) {
  name = normName(name);
  const err = checkName(name) || checkPassword(pw);
  if (err) throw new Error(err);
  const db = loadUsers();
  if (db.users[name]) throw new Error("That username is already taken.");
  const salt = crypto.randomBytes(16).toString("hex");
  db.users[name] = { salt, hash: hash(pw, salt), created: new Date().toISOString() };
  writeJSON(USERS_FILE, db);
  return name;
}
function verifyUser(name, pw) {
  name = normName(name);
  const u = loadUsers().users[name];
  // Hash even for unknown users so both cases take the same time.
  const salt = u ? u.salt : "0".repeat(32);
  const got = Buffer.from(hash(String(pw || ""), salt), "hex");
  const want = Buffer.from(u ? u.hash : "0".repeat(128), "hex");
  return !!u && crypto.timingSafeEqual(got, want) ? name : null;
}
function setPassword(name, pw) {
  name = normName(name);
  const err = checkPassword(pw);
  if (err) throw new Error(err);
  const db = loadUsers();
  if (!db.users[name]) throw new Error("No such user.");
  const salt = crypto.randomBytes(16).toString("hex");
  Object.assign(db.users[name], { salt, hash: hash(pw, salt) });
  writeJSON(USERS_FILE, db);
  logoutEverywhere(name);
}
function deleteUser(name) {
  name = normName(name);
  const db = loadUsers();
  if (!db.users[name]) throw new Error("No such user.");
  delete db.users[name];
  writeJSON(USERS_FILE, db);
  logoutEverywhere(name);
  try { fs.unlinkSync(progressFile(name)); } catch { /* no progress yet */ }
}

function createSession(name) {
  const token = crypto.randomBytes(32).toString("hex");
  const s = readJSON(SESSIONS_FILE, {});
  s[token] = { user: name, created: new Date().toISOString() };
  writeJSON(SESSIONS_FILE, s);
  return token;
}
function sessionUser(token) {
  if (!token) return null;
  const s = readJSON(SESSIONS_FILE, {})[token];
  return s && userExists(s.user) ? s.user : null;
}
function deleteSession(token) {
  const s = readJSON(SESSIONS_FILE, {});
  if (s[token]) { delete s[token]; writeJSON(SESSIONS_FILE, s); }
}
function logoutEverywhere(name) {
  const s = readJSON(SESSIONS_FILE, {});
  for (const t of Object.keys(s)) if (s[t].user === name) delete s[t];
  writeJSON(SESSIONS_FILE, s);
}

const progressFile = (name) => path.join(PROGRESS_DIR, normName(name) + ".json");
const readProgress = (name) => readJSON(progressFile(name), null);
const writeProgress = (name, data) => writeJSON(progressFile(name), data);

module.exports = {
  SAVE_DIR, normName, checkName, checkPassword, listUsers, userExists, createUser, verifyUser,
  setPassword, deleteUser, createSession, sessionUser, deleteSession, readProgress, writeProgress, readJSON,
};
