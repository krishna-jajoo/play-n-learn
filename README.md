# Save the Empire — learn Python and data science by playing

A free browser game that teaches you, from zero, the skills a data scientist needs.
The sorcerer Malvex has conquered the eight realms of the Empire and locked each ruler in a tower.
Each realm is one subject, each floor of its tower is one topic, and each mission is a seal you break by writing
real code (or answering a trial) before the candle burns out.

## Run it

```
node tools/serve.cjs
```
Then open http://localhost:8080. You can also just double-click `index.html`. If the Python engine
doesn't load that way, use the server instead. You need an internet connection because Python
(Pyodide) and the editor load from a CDN.

## The realms

| Realm | Subject | Status | Opens at 70% of |
|---|---|---|---|
| 🐍 The Serpent Kingdom | Python | **playable** · 16 floors · 94 missions | — |
| 🧮 The Iron Citadel | NumPy | **playable** · 8 floors · 40 missions | Python |
| 🗄️ The Archive Fortress | SQL | **playable** · 8 floors · 39 missions | Python |
| 🐼 The Bamboo Kingdom | pandas | **playable** · 12 floors · 59 missions | NumPy |
| 🎲 The Oracle's Realm | Statistics | **playable** · 10 floors · 50 missions | NumPy |
| 🎨 The Painted Isles | Visualization | **playable** · 6 floors · 30 missions | pandas |
| 🤖 The Automaton Empire | Machine learning | **playable** · 12 floors · 59 missions | pandas + Statistics |
| 👑 The Imperial Capital | Capstone projects | **playable** · 4 floors · 20 missions | SQL + Visualization + ML |

All eight realms are playable: 391 missions in all. A realm opens once every realm it builds on is at least 70% done
(e.g. 66 of the 94 Python missions open NumPy and SQL), and it stays open after that. A ruler is freed at 100%, and
freeing every ruler ends the story: the Empire is saved. The threshold is `UNLOCK_PCT` in `js/app.js`.

### Capstone: 4 floors

Projects that need everything at once: SQL from Python (`sqlite3` + `pd.read_sql_query`), pandas, matplotlib and
scikit-learn, on three generated datasets: a messy census (`census.csv`), the merchant guild's database of shops and
three years of monthly sales (`empire.sql`) and the physician's patient records (`patients.csv`).

| # | Floor | Topic |
|---|-------|-------|
| 1 | The Census | inspect a messy table, a reusable cleaning function, a province summary, a two-panel report and headline |
| 2 | The Merchant's Forecast | SQL from Python, trend chart with a rolling mean, time features and a time-based split, beating a seasonal baseline |
| 3 | The Royal Physician | sick rates, a full preprocessing pipeline, explaining coefficients as odds, choosing a model and a threshold |
| 4 | The Emperor's Council | growth by province (SQL pivot + coloured chart), a confounded promotion effect, a 2 × 2 dashboard, the final decision |

### Machine Learning: 12 floors

Missions use scikit-learn in the browser (loaded the first time the realm opens), its built-in datasets (iris, wine,
breast cancer, diabetes, digits) and two generated tables: adventurers (with missing values and categories) and
houses. Tests rebuild the reference model on the same split and compare scores, predictions and chosen settings; a
few missions (kNN, the perceptron, a neuron, a 2-layer network with backpropagation) must be built with NumPy only.

| # | Floor | Topic |
|---|-------|-------|
| 1 | The Learning Machine | features and labels, train/test split, fit/predict/score, baselines |
| 2 | The Straight Path | linear regression, MAE/RMSE/R², polynomial features and overfitting |
| 3 | The Yes-or-No Gate | logistic regression, probabilities, thresholds, the sigmoid by hand |
| 4 | The Judge's Scales | confusion matrix, precision/recall/F1 by hand, ROC-AUC, imbalanced classes |
| 5 | The Neighbours | k-nearest neighbours (also from scratch), choosing k, feature scaling |
| 6 | The Forest of Trees | decision trees, depth and overfitting, random forests, feature importance |
| 7 | The Unlabelled Lands | k-means, inertia and silhouette, adjusted Rand index, customer segments |
| 8 | The Shrinking Spell | PCA, explained variance, choosing components, compress-then-classify |
| 9 | The Feature Forge | one-hot encoding, imputation, ColumnTransformer and pipelines |
| 10 | The Fair Trial | cross-validation, GridSearchCV, data leakage |
| 11 | The Thinking Engine | perceptron, gradient descent, MLPClassifier, a neural network with backprop on XOR |
| 12 | The Automaton's Trial | four end-to-end projects (house prices, tuned forest, threshold for 98% recall, model card) |

### Visualization: 6 floors

Charts are drawn with matplotlib (off-screen, in the worker) and shown as images in the output panel; seaborn is
installed from PyPI with micropip the first time a seaborn mission opens. Tests inspect the chart itself: bar
heights, line data, titles, labels, colours, legends, scales and layouts.

| # | Floor | Topic |
|---|---|---|
| 1 | The First Canvas | figure and axes, line plots, legends, styles, rolling-mean trend line |
| 2 | The Gallery of Forms | bar charts, histograms, scatter plots, bar labels and reference lines |
| 3 | The Labelled Map | ticks, annotations, colour with meaning, a finished report chart |
| 4 | Many Windows | subplots, small multiples with shared axes, twin axes, a 2 × 2 dashboard |
| 5 | The Seaborn Sea | seaborn bar/scatter/box/count plots, hue, correlation heatmaps |
| 6 | The Honest Painter | zero baselines, sorting, log scales, misleading charts, a final one-page summary |

### Statistics: 10 floors

Most statistics are computed **by hand with NumPy** first (so the formulas make sense), then checked against
`scipy.stats` on the hypothesis-testing floors. SciPy is large (about 47 MB), so it downloads only when a player opens a
mission that needs it (`packages` on the mission), once; the browser caches it after that.

| # | Floor | Topic |
|---|---|---|
| 1 | The Centre and the Spread | mean, median, mode, variance (n vs n − 1), quartiles, Tukey outliers, skew |
| 2 | The Laws of Chance | counting, the birthday problem, Monte Carlo simulation, conditional probability, expected value |
| 3 | The Shapes of Fate | binomial, normal (via erf) and Poisson distributions, normal approximation |
| 4 | The Sampling Well | sampling distributions, standard error, the central limit theorem, polling |
| 5 | The Range of Belief | z and t confidence intervals, the bootstrap |
| 6 | The Trial Chamber | z-tests, p-values, permutation tests, t-tests with SciPy, effect size |
| 7 | The Two Potions | A/B testing: two-proportion z-test, chi-square, lift, sample size and power |
| 8 | The Bonds Between | covariance, Pearson vs Spearman, Simpson's paradox, partial correlation |
| 9 | The Line of Best Fit | regression by formula, R², RMSE, multiple regression, train/test evaluation |
| 10 | Bayes' Mirror | Bayes' theorem, base rates, natural frequencies, naive Bayes spam filter, Beta updating |

### SQL: 8 floors

You write real SQL (SQLite) against a kingdom database (guilds, heroes, quests, quest_log, sales). **Run** shows the
result as a table; **Submit** compares your result with the reference query's, on the kingdom database **and** on two
hidden variants of it, so a query has to be right, not just match one answer.

| # | Floor | Topic |
|---|---|---|
| 1 | The First Query | SELECT, FROM, WHERE, calculated columns, AND/OR precedence |
| 2 | Order in the Archive | ORDER BY, LIMIT/OFFSET, DISTINCT, IN, BETWEEN, LIKE, NULL & COALESCE |
| 3 | The Tally Room | COUNT, SUM, AVG, MIN, MAX, ROUND, COUNT(DISTINCT), CASE |
| 4 | Grouped Scrolls | GROUP BY, HAVING, grouping by calculated keys |
| 5 | The Joining Bridge | INNER/LEFT JOIN, aliases, three-table joins, anti-joins |
| 6 | Queries Within | subqueries, IN/EXISTS (and the NOT IN + NULL trap), CTEs |
| 7 | The Window Tower | RANK, DENSE_RANK, ROW_NUMBER, PARTITION BY, running totals, LAG |
| 8 | The Keeper's Trial | CREATE/INSERT/UPDATE/DELETE, and three full analysis queries |

### pandas: 12 floors

| # | Floor | Topic |
|---|---|---|
| 1 | The Series Scroll | Series, labels vs positions, alignment, value_counts |
| 2 | The Great Table | DataFrame, read_csv, describe, new columns |
| 3 | Choosing Wisely | loc, iloc, set_index, safe edits (SettingWithCopy) |
| 4 | The Filter Gate | boolean filters, query, isin, string matching |
| 5 | The Sorting Hall | sorting, ranking, calculated columns, pd.cut |
| 6 | Missing Pieces | finding, filling, dropping and interpolating NaN |
| 7 | Clean Ink | type fixes, text cleaning, duplicates, a messy census |
| 8 | The Calendar Room | dates, time index, resample, rolling, streaks |
| 9 | The Grouping Garden | groupby, named agg, transform, filter |
| 10 | The Joining Bridge | merge, left/outer joins, anti-joins, concat |
| 11 | The Reshaping Loom | pivot_table, melt, crosstab, unstack |
| 12 | The Empress's Trial | four end-to-end projects (KPIs, cleaning pipeline, customer tiers, weather trends) |

The realm ships small, reproducible datasets (sales, heroes, weather, customers/orders and a deliberately messy census)
that are written into Python's file system before each run, so missions use `pd.read_csv("sales.csv")` like real work.

### NumPy: 8 floors

| # | Floor | Topic |
|---|---|---|
| 1 | Forging Arrays | creating arrays, shape, dtype, arange, linspace |
| 2 | The Slicing Blades | indexing, slicing, views vs copies, sliding windows |
| 3 | The Mask of Truth | boolean masks, `np.where`, fancy indexing, outlier detection |
| 4 | The Swift Engines | vectorization, ufuncs, sigmoid/softmax, NaN and float precision |
| 5 | Broadcasting Towers | broadcasting, distance matrices, standardization |
| 6 | The Counting House | reductions along axes, cumsum, drawdown, histograms, percentiles |
| 7 | Shape Shifters | reshape, transpose, stack, split, tile, image processing |
| 8 | The Matrix Vault | dot products, solving systems, random generators, linear regression, gradient descent |

### Python: 16 floors

| # | Floor | Topic |
|---|---|---|
| 1 | The Gate of Words | print, variables, data types |
| 2 | The Bridge of Numbers | operators, precedence, input, conversion, min/max/round |
| 3 | The Library of Scrolls | strings, slicing, methods, f-string formatting |
| 4 | The Hall of Choices | if / elif / else, truthiness, conditional expressions |
| 5 | The Stairs of Repetition | for, while, range, break/continue, loop-else, primes |
| 6 | The Armory of Lists | lists, aliasing and copies, tuples, grids, merging |
| 7 | The Vault of Keys | dictionaries, sets, grouping, anagrams |
| 8 | The Spell Workshop | functions, defaults, `*args`/`**kwargs`, scope, closures, recursion, memoization |
| 9 | The Trap Room | exceptions, custom exceptions, files, a ledger parser |
| 10 | The Garden of Shortcuts | comprehensions, lambda, map/filter, zip, enumerate, any/all, lists of dicts |
| 11 | The Hall of Knights | classes, inheritance, properties, special methods (`__add__`, `__eq__`…) |
| 12 | The Sorcerer's Study | modules, generators, decorators, `collections` |
| 13 | The Merchant's Ledger | `datetime`, JSON, CSV, a sales-report pipeline |
| 14 | The Cipher Chamber | regular expressions, a log analyser |
| 15 | The Clockwork Workshop | iterators, `itertools`, context managers, dataclasses, type hints, generator pipelines |
| 16 | The Throne Room | five final projects |

Each floor mixes four kinds of mission:
- **Code missions**: a lesson, an example, then a task checked by hidden tests.
- **Fix-the-bug missions**: broken code to repair.
- **Quizzes** (🔮): "what does this print?" questions about common traps. Each wrong answer costs 30 s.
- **Floor bosses** (🐉): longer problems combining the floor's topics, with more time.

## How it works

- **Python in the browser:** [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly) runs inside a
  Web Worker. If code loops forever, the worker is killed after 5 s (8 s on Submit) and restarted.
  A realm can list extra packages (NumPy is about 7 MB). They download when the player opens that realm, the
  candle can't be lit until they're ready, and they're reloaded automatically after a restart.
- **Judging:** `js/harness.js` runs the learner's code with fake `input()`, captures the output, then runs
  hidden checks:
  - output and value checks: `expect_output`, `expect_equal`, `expect_close`, `expect_array` (shape, dtype and values),
    `expect_frame` / `expect_series` (pandas), and for charts `expect_fig`, `bars_of`, `lines_of`, `points_of`,
    `legend_of`, `ticklabels_of`, `hexcolor`, `expect_text`
  - structure checks: `must_use("for")`, `must_not_use("for", "while")` for vectorization missions, `is_recursive(...)`
  - `rerun(...)`, which re-runs the program with other values so hard-coded answers fail

  Errors come with a beginner-friendly explanation, and the line is highlighted.
- **Game:** the timer starts only when you press Start. Finishing with ≥50% of the time left gives ★★★,
  ≥25% gives ★★, otherwise ★. Each hint costs 30 s. If time runs out you can retry, switch to practice
  (no timer, max ★), or reveal the solution (0 ★).
- **Players & progress:** when the game runs through `node tools/serve.cjs`, it asks *Who's playing?* Each player
  logs in with a username and password and gets their own stars, unlocked missions and code. Everything is kept in
  the git-ignored `save/` folder:
  - `users.json`: passwords, hashed with scrypt
  - `sessions.json`: keeps players logged in
  - `progress/<name>.json`: each player's progress

  The server only listens on this computer. Without the server, the game runs in **guest mode** and saves in that
  browser only.
- **Manage players from the terminal:**
  ```
  node tools/users.cjs list
  node tools/users.cjs add <name> <password> [--from <progress.json>]
  node tools/users.cjs passwd <name> <new-password>
  node tools/users.cjs remove <name>
  ```
- **Backup:** the footer has *Export progress* (downloads a `.json` file) and *Import progress* (combines a
  backup with your current progress).

## Project layout

```
index.html           the page
css/style.css        all styles
js/quest.js          the registry every realm plugs into (and the d`` dedent helper)
js/empires/*.js      the content: python.js, numpy.js, sql.js, pandas.js, stats.js, viz.js, ml.js, capstone.js; upcoming.js (for future planned realms, empty now)
js/harness.js        the Python judge (shared by the browser and the validator)
js/runner.js         runs Pyodide in a Web Worker
js/app.js            game logic: accounts, world map, towers, missions, quizzes, timer
tools/serve.cjs      local server + accounts API
tools/accounts.cjs   accounts and progress storage
tools/users.cjs      player management from the terminal
tools/validate.cjs   checks every mission
```

## Adding or editing missions

A realm is a file in `js/empires/` that calls `QUEST.empire({ id, name, realm, tower, ruler, …, worlds })`.
Optional: `packages: ["numpy"]` (Pyodide packages to load) and `runMs` / `submitMs` (time limits for heavier code).
A single mission can add its own `packages` (e.g. `["scipy"]`); they're loaded only when that mission is opened.
`"micropip:name"` installs a pure-Python package from PyPI (used for seaborn).
A mission can also have `files: { "name.csv": text }`: data files written before every run, test and example.
SQL realm missions use `solution` (a reference query), and optionally `ordered`, `checkNames`, `mustUse`,
`extraSolutions`/`wrongSolutions` and `verify` (for statements that change data: the query whose result is compared).
Warnings raised by the player's code (e.g. pandas' SettingWithCopyWarning) appear in the output panel.
Each floor (`world`) has missions:

- **code**: `lesson`, `example`, `task`, `starter`, `solution`, `hints`, `tests`, and optionally `boss: true` and a
  `time` in seconds
- **quiz**: `type: "quiz"` and `questions: [{ q, code, choices, answer, explain, predict }]`. With
  `predict: true`, the validator runs `code` and checks that it really prints the correct choice.

Mission ids are the keys of saved progress: never rename one. Floors are numbered by position, so new floors can be
inserted anywhere. To build a planned realm, move it from `upcoming.js` into its own file with `worlds`, and add it to
`tools/validate.cjs` and `index.html`.

After changing missions, check that every solution passes, every starter fails, and every quiz answer is right:

```
npm install pyodide@0.26.4
node tools/validate.cjs            # or: node tools/validate.cjs python
```
