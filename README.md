# Save the Queen — learn Python by playing

A free browser game that teaches Python from zero to writing real programs.
The Queen is locked at the top of a 13-floor tower; every floor is a Python topic,
and every mission is a seal you break by writing real code before the candle burns out.

## Run it

```
node tools/serve.cjs
```
Then open http://localhost:8080. You can also just double-click `index.html`. If the Python engine
doesn't load that way, use the server instead. You need an internet connection because Python
(Pyodide) and the editor load from a CDN.

## How it works

- **Python in the browser:** [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly) runs inside a
  Web Worker. If code loops forever, the worker is killed after 5 s (8 s on Submit) and restarted.
- **Judging:** `js/harness.js` runs the learner's code with fake `input()`, captures the output, then runs
  hidden checks (`expect_output`, `expect_equal`, `must_use("for")`, `is_recursive(...)`…). Errors come
  with a beginner-friendly explanation and the line is highlighted.
- **Game:** you start each mission with a lesson and an example. The timer starts only when you press
  Start. Finishing with ≥50% of the time left gives ★★★, ≥25% gives ★★, otherwise ★. Each hint costs 30 s.
  If time runs out you can retry, switch to practice (no timer, max ★), or reveal the solution (0 ★).
- **Players & progress:** when the game runs through `node tools/serve.cjs`, it asks *Who's playing?* Each player
  logs in with a username and password and gets their own stars, unlocked missions and code. Everything is kept in
  the git-ignored `save/` folder: `users.json` (passwords hashed with scrypt), `sessions.json` (stay logged in),
  and `progress/<name>.json`. The server only listens on this computer. The double-clicked `index.html` uses the
  same accounts while the server is running on port 8080. Without the server, for example on a static host, the
  game runs in **guest mode** and saves in that browser only.
- **Manage players from the terminal:**
  ```
  node tools/users.cjs list
  node tools/users.cjs add <name> <password> [--from <progress.json>]
  node tools/users.cjs passwd <name> <new-password>
  node tools/users.cjs remove <name>
  ```
- **Backup:** the footer has *Export progress* (downloads a `.json` file) and *Import progress* (combines a
  backup with your current progress). Use these to move progress to another browser or computer.

## Curriculum (13 floors · 46 missions)

| Floor | Topic | Time per mission |
|---|---|---|
| 1 The Gate of Words | print, variables, data types | 3:00 |
| 2 The Bridge of Numbers | operators, input, type conversion, booleans | 4:00 |
| 3 The Library of Scrolls | strings, indexing, slicing, methods, f-strings | 5:00 |
| 4 The Hall of Choices | if / elif / else, logic | 5:00 |
| 5 The Stairs of Repetition | for, while, range, break/continue, nested loops | 6:00 |
| 6 The Armory of Lists | lists, list methods, slicing, tuples, unpacking | 7:00 |
| 7 The Vault of Keys | dictionaries, counting, sets | 8:00 |
| 8 The Spell Workshop | functions, return, defaults, scope, recursion | 9:00 |
| 9 The Trap Room | exceptions, raise, try/except/else/finally, files | 10:00 |
| 10 The Garden of Shortcuts | comprehensions, lambda, sorted key, zip, enumerate, any/all | 10:00 |
| 11 The Hall of Knights | classes, objects, class attributes, `__str__`, inheritance, `@property` | 12:00 |
| 12 The Sorcerer's Study | modules / standard library, generators, decorators | 15:00 |
| 13 The Throne Room | 3 final projects combining everything | 20:00 |

## Adding or editing missions

Missions live in `js/levels.js`. Each one has a `lesson`, `example`, `task`, `starter`, `solution`,
`hints` and `tests`. After changing them, check that every solution passes and every starter fails:

```
npm install pyodide@0.26.4
node tools/validate.cjs
```
