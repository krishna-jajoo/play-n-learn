// Manage players from the terminal.
//   node tools/users.cjs list
//   node tools/users.cjs add <name> <password> [--from <progress.json>]
//   node tools/users.cjs passwd <name> <new-password>
//   node tools/users.cjs remove <name>
const A = require("./accounts.cjs");

const [cmd, name, pw, ...rest] = process.argv.slice(2);
try {
  if (cmd === "list") {
    const users = A.listUsers();
    if (!users.length) console.log("No players yet.");
    for (const u of users) {
      const p = A.readProgress(u) || { missions: {} };
      const done = Object.values(p.missions).filter((m) => m.done);
      console.log(`${u.padEnd(20)} ${String(done.length).padStart(2)} missions  ★ ${done.reduce((s, m) => s + (m.stars || 0), 0)}`);
    }
  } else if (cmd === "add" && name && pw) {
    const u = A.createUser(name, pw);
    const i = rest.indexOf("--from");
    if (i >= 0) {
      const data = A.readJSON(rest[i + 1], null);
      if (!data || !data.missions) throw new Error("Couldn't read progress from " + rest[i + 1]);
      A.writeProgress(u, data);
      console.log(`Imported ${Object.values(data.missions).filter((m) => m.done).length} finished missions.`);
    }
    console.log(`Player '${u}' created.`);
  } else if (cmd === "passwd" && name && pw) {
    A.setPassword(name, pw);
    console.log(`Password changed for '${A.normName(name)}' (logged out everywhere).`);
  } else if (cmd === "remove" && name) {
    A.deleteUser(name);
    console.log(`Player '${A.normName(name)}' and their progress were removed.`);
  } else {
    console.log("Usage:\n  node tools/users.cjs list\n  node tools/users.cjs add <name> <password> [--from <progress.json>]\n  node tools/users.cjs passwd <name> <new-password>\n  node tools/users.cjs remove <name>");
    process.exitCode = cmd ? 1 : 0;
  }
} catch (e) {
  console.error("Error: " + e.message);
  process.exitCode = 1;
}
