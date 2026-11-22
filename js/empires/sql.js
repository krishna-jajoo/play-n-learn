// The SQL empire: the Archive Fortress. Keeper Codd is locked in the Hall of Records.
// Players write real SQL. Run shows the result table; Submit compares it with the reference query's result
// on the kingdom database AND on hidden variants of it (so hard-coded answers fail). See _sql_judge in harness.js.
(function (root) {
  const { d } = root.QUEST;

  // ───────────────────────────── the kingdom database (generated once, deterministic)
  const KINGDOM = `CREATE TABLE guilds (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT, founded INTEGER);
INSERT INTO guilds VALUES (1, 'Dawn', 'Oakvale', 1203), (2, 'Ember', 'Stonebridge', 1187), (3, 'Frost', 'Fernhill', 1210), (4, 'Tide', 'Oakvale', 1225), (5, 'Thorn', 'Stonebridge', 1240);
CREATE TABLE heroes (id INTEGER PRIMARY KEY, name TEXT NOT NULL, class TEXT, level INTEGER, gold INTEGER, guild_id INTEGER REFERENCES guilds(id), joined TEXT);
INSERT INTO heroes VALUES (1, 'Lyra', 'Mage', 21, 1941, 2, '2021-07-21'),
  (2, 'Orin', 'Mage', 5, 1681, 1, '2021-06-19'),
  (3, 'Mira', 'Healer', 33, 439, 1, '2022-02-14'),
  (4, 'Zed', 'Mage', 5, NULL, 1, '2021-09-14'),
  (5, 'Anna', 'Mage', 37, 253, 2, '2021-11-21'),
  (6, 'Bo', 'Mage', 37, 1199, NULL, '2022-01-08'),
  (7, 'Cass', 'Knight', 36, 1758, 2, '2021-05-14'),
  (8, 'Dren', 'Knight', 35, 241, 3, '2021-09-27'),
  (9, 'Elk', 'Mage', 7, 1191, 2, '2022-06-04'),
  (10, 'Fay', 'Healer', 37, 122, 2, '2021-08-22'),
  (11, 'Gus', 'Knight', 21, 953, 4, '2021-06-10'),
  (12, 'Hale', 'Archer', 12, NULL, 2, '2022-02-19'),
  (13, 'Ivy', 'Archer', 34, 1013, 3, '2021-12-15'),
  (14, 'Jax', 'Knight', 39, 149, 1, '2021-09-14'),
  (15, 'Kai', 'Mage', 22, 311, NULL, '2022-07-02'),
  (16, 'Luz', 'Archer', 36, 1173, 3, '2021-06-23'),
  (17, 'Moe', 'Mage', 39, 1017, 4, '2021-02-27'),
  (18, 'Nia', 'Archer', 18, 970, 1, '2022-01-24'),
  (19, 'Ode', 'Healer', 37, 1395, 4, '2021-05-23'),
  (20, 'Pip', 'Mage', 23, 46, 4, '2021-06-06');
CREATE TABLE quests (id INTEGER PRIMARY KEY, title TEXT NOT NULL, region TEXT, reward INTEGER, difficulty TEXT);
INSERT INTO quests VALUES (1, 'Rats in the Cellar', 'Oakvale', 20, 'easy'),
  (2, 'The Lost Ring', 'Fernhill', 75, 'medium'),
  (3, 'Bandit Camp', 'Stonebridge', 150, 'hard'),
  (4, 'Herb Gathering', 'Fernhill', 15, 'easy'),
  (5, 'Bridge Troll', 'Stonebridge', 120, 'hard'),
  (6, 'Escort the Merchant', 'Oakvale', 60, 'medium'),
  (7, 'Haunted Mill', 'Fernhill', 90, 'medium'),
  (8, 'Dragon''s Shadow', 'Stonebridge', 400, 'hard'),
  (9, 'Lost Sheep', 'Oakvale', 10, 'easy'),
  (10, 'The Sealed Vault', 'Oakvale', 250, 'hard');
CREATE TABLE quest_log (id INTEGER PRIMARY KEY, hero_id INTEGER REFERENCES heroes(id), quest_id INTEGER REFERENCES quests(id), completed_on TEXT, stars INTEGER);
INSERT INTO quest_log VALUES (1, 18, 1, '2024-01-25', 3),
  (2, 5, 9, '2024-01-13', 4),
  (3, 18, 1, '2024-01-15', 4),
  (4, 20, 4, '2024-01-27', 4),
  (5, 20, 4, '2024-03-14', 3),
  (6, 14, 3, '2024-01-03', 2),
  (7, 5, 3, '2024-03-08', 1),
  (8, 18, 8, '2024-01-09', 3),
  (9, 1, 2, '2024-02-18', 3),
  (10, 12, 2, '2024-03-28', 5),
  (11, 2, 6, '2024-03-26', 5),
  (12, 14, 5, '2024-02-13', 1),
  (13, 18, 9, '2024-02-02', 2),
  (14, 3, 3, '2024-02-06', 1),
  (15, 12, 8, '2024-01-04', 1),
  (16, 5, 7, '2024-01-12', 5),
  (17, 1, 1, '2024-01-20', 4),
  (18, 5, 9, '2024-02-12', 5),
  (19, 13, 6, '2024-01-04', 4),
  (20, 16, 6, '2024-02-10', 1),
  (21, 5, 1, '2024-03-11', 3),
  (22, 18, 9, '2024-01-17', 1),
  (23, 7, 7, '2024-02-05', 5),
  (24, 1, 7, '2024-02-21', 1),
  (25, 10, 7, '2024-02-06', 3),
  (26, 8, 7, '2024-03-25', 5),
  (27, 12, 9, '2024-01-20', 2),
  (28, 8, 5, '2024-03-26', 2),
  (29, 7, 7, '2024-02-12', 1),
  (30, 1, 4, '2024-02-09', 2),
  (31, 13, 6, '2024-03-12', 3),
  (32, 3, 3, '2024-01-08', 4),
  (33, 7, 4, '2024-01-16', 5),
  (34, 1, 6, '2024-03-12', 1),
  (35, 4, 5, '2024-03-25', 2),
  (36, 18, 2, '2024-02-26', 3),
  (37, 3, 9, '2024-02-15', 4),
  (38, 3, 9, '2024-01-06', 2),
  (39, 1, 2, '2024-03-15', 2),
  (40, 18, 9, '2024-02-05', 5);
CREATE TABLE sales (id INTEGER PRIMARY KEY, date TEXT, region TEXT, product TEXT, units INTEGER, price INTEGER);
INSERT INTO sales VALUES (1, '2024-01-01', 'South', 'Shield', 16, 85),
  (2, '2024-01-07', 'East', 'Potion', 17, 15),
  (3, '2024-01-08', 'East', 'Shield', 12, 85),
  (4, '2024-01-08', 'South', 'Bow', 8, 60),
  (5, '2024-01-09', 'East', 'Shield', 6, 85),
  (6, '2024-01-10', 'South', 'Shield', 9, 85),
  (7, '2024-01-13', 'West', 'Bow', 16, 60),
  (8, '2024-01-16', 'West', 'Shield', 12, 85),
  (9, '2024-01-16', 'East', 'Shield', 4, 85),
  (10, '2024-01-17', 'North', 'Sword', 6, 120),
  (11, '2024-01-19', 'South', 'Potion', 4, 15),
  (12, '2024-01-20', 'South', 'Shield', 9, 85),
  (13, '2024-01-22', 'East', 'Bow', 6, 60),
  (14, '2024-01-25', 'East', 'Shield', 3, 85),
  (15, '2024-01-29', 'North', 'Potion', 13, 15),
  (16, '2024-01-29', 'East', 'Potion', 15, 15),
  (17, '2024-01-30', 'North', 'Potion', 7, 15),
  (18, '2024-02-01', 'North', 'Bow', 3, 60),
  (19, '2024-02-02', 'North', 'Bow', 9, 60),
  (20, '2024-02-11', 'North', 'Sword', 6, 120),
  (21, '2024-02-12', 'West', 'Shield', 8, 85),
  (22, '2024-02-14', 'North', 'Sword', 5, 120),
  (23, '2024-02-16', 'East', 'Bow', 1, 60),
  (24, '2024-02-21', 'North', 'Potion', 3, 15),
  (25, '2024-02-23', 'North', 'Shield', 17, 85),
  (26, '2024-02-24', 'South', 'Bow', 11, 60),
  (27, '2024-02-26', 'North', 'Shield', 11, 85),
  (28, '2024-02-28', 'South', 'Potion', 4, 15),
  (29, '2024-03-02', 'North', 'Shield', 14, 85),
  (30, '2024-03-03', 'West', 'Sword', 16, 120),
  (31, '2024-03-13', 'South', 'Potion', 19, 15),
  (32, '2024-03-13', 'North', 'Shield', 6, 85),
  (33, '2024-03-13', 'North', 'Shield', 1, 85),
  (34, '2024-03-19', 'East', 'Shield', 20, 85),
  (35, '2024-03-23', 'South', 'Shield', 18, 85),
  (36, '2024-03-24', 'South', 'Potion', 12, 15),
  (37, '2024-03-24', 'East', 'Shield', 20, 85),
  (38, '2024-03-29', 'East', 'Potion', 2, 15),
  (39, '2024-03-30', 'East', 'Shield', 12, 85),
  (40, '2024-03-31', 'North', 'Potion', 13, 15);
`;

  // Hidden test databases: the kingdom plus these changes. Every query is checked on all of them.
  const VARIANTS = [
    `INSERT INTO guilds VALUES (6, 'Gale', 'Fernhill', 1250);
INSERT INTO heroes VALUES (101, 'Quill', 'Archer', 44, 3000, 6, '2021-04-05'), (102, 'Rook', 'Knight', 2, NULL, NULL, '2022-02-11'),
  (103, 'Sage', 'Healer', 19, 520, 3, '2021-12-01'), (104, 'Tamsin', 'Mage', 39, 75, 4, '2022-08-30');
INSERT INTO quests VALUES (11, 'Wolf Den', 'Fernhill', 80, 'medium');
INSERT INTO quest_log VALUES (101, 101, 10, '2024-03-30', 5), (102, 103, 2, '2024-02-02', 2), (103, 101, 8, '2024-01-15', 4), (104, 104, 11, '2024-02-20', 3);
INSERT INTO sales VALUES (101, '2024-03-31', 'North', 'Bow', 25, 60), (102, '2024-01-02', 'South', 'Sword', 3, 120), (103, '2024-02-29', 'West', 'Potion', 40, 15);`,
    `UPDATE heroes SET gold = gold + 37 WHERE id % 2 = 0;
UPDATE heroes SET level = level + 3 WHERE class = 'Knight';
UPDATE heroes SET guild_id = 5 WHERE id = 20;
DELETE FROM quest_log WHERE id % 4 = 0;
UPDATE quest_log SET stars = 6 - stars WHERE id % 3 = 0;
UPDATE sales SET units = units + 2 WHERE region = 'East';
UPDATE quests SET reward = reward * 2 WHERE difficulty = 'easy';`,
  ];

  const col = (name, note) => `<span>${name}${note ? ` <i>${note}</i>` : ""}</span>`;
  const SCHEMA = [
    ["guilds", [col("id", "number, unique"), col("name"), col("city"), col("founded", "year")]],
    ["heroes", [col("id", "number, unique"), col("name"), col("class", "Mage, Knight, Archer, Healer"), col("level"), col("gold", "may be NULL"), col("guild_id", "→ guilds.id, may be NULL"), col("joined", "'YYYY-MM-DD'")]],
    ["quests", [col("id", "number, unique"), col("title"), col("region"), col("reward"), col("difficulty", "easy, medium, hard")]],
    ["quest_log", [col("id"), col("hero_id", "→ heroes.id"), col("quest_id", "→ quests.id"), col("completed_on", "'YYYY-MM-DD'"), col("stars", "1–5")]],
    ["sales", [col("id"), col("date", "'YYYY-MM-DD'"), col("region"), col("product"), col("units"), col("price")]],
  ].map(([t, cols]) => `<div class="schema-table"><b>${t}</b>${cols.join("")}</div>`).join("");

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The First Query", topic: "SELECT, FROM, WHERE & calculated columns", time: 360, icon: "📖",
      intro: "The Archive Fortress keeps every record of the realm in tables. To read them, you must speak their language: SQL.",
      missions: [
        {
          id: "sq1-1", title: "Open the Archive",
          story: "Keeper Codd hands you the first ledger: the list of every hero in the realm.",
          lesson: `<p><b>SQL</b> (Structured Query Language) is how you ask questions of a database. Almost every company stores its data in one, so data scientists write SQL every day.</p>
            <p>A database holds <b>tables</b> (open the 📋 <i>Tables</i> panel below to see this one's). A query names the columns you want and the table they come from:</p>
            <p><code>SELECT name, level FROM heroes;</code></p>
            <ul><li><code>SELECT *</code> means "all columns"</li><li>Keywords aren't case-sensitive (<code>select</code> works too), but writing them in capitals makes queries easier to read</li>
            <li>Press <b>Run</b> to see your result as a table</li></ul>`,
          example: d`
            SELECT * FROM guilds;`,
          task: `Show every hero's <code>name</code>, <code>class</code> and <code>level</code> (in that column order).`,
          starter: d`
            SELECT * FROM heroes;`,
          solution: d`
            SELECT name, class, level FROM heroes;`,
          hints: ["List the columns after SELECT, separated by commas.", "SELECT name, class, level FROM heroes;"],
        },
        {
          id: "sq1-2", title: "Ask a Question",
          story: "\"Which of our Mages are strong enough for the northern campaign?\" asks the Keeper.",
          lesson: `<p><code>WHERE</code> keeps only the rows that match a condition:</p>
            <ul><li>Comparisons: <code>=</code>, <code>&lt;&gt;</code> (not equal, also <code>!=</code>), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
            <li>Text goes in <b>single quotes</b>: <code>class = 'Mage'</code>. Text comparisons are case-sensitive</li>
            <li>Combine conditions with <code>AND</code>, <code>OR</code>, <code>NOT</code></li></ul>`,
          example: d`
            SELECT title, reward FROM quests WHERE difficulty = 'hard' AND reward > 130;`,
          task: `Show the <code>name</code> and <code>level</code> of the Mages whose level is above 20.`,
          starter: d`
            SELECT name, level FROM heroes;`,
          solution: d`
            SELECT name, level FROM heroes WHERE class = 'Mage' AND level > 20;`,
          hints: ["Add a WHERE clause with two conditions joined by AND.", "Text needs single quotes: class = 'Mage'"],
        },
        {
          id: "sq1-3", title: "Calculated Columns",
          story: "The treasurer wants to see how much money each northern sale made, not just units and prices.",
          lesson: `<p>A <code>SELECT</code> can calculate new values: <code>units * price</code>, <code>gold / 2</code>, <code>name || ' the Brave'</code> (<code>||</code> joins text).</p>
            <p>Give a calculated column a name with <code>AS</code>: <code>units * price AS revenue</code>. Without it, the column is named after the formula.</p>
            <p>Careful: dividing two whole numbers gives a whole number in SQLite (<code>7 / 2</code> → <code>3</code>). Write <code>7 / 2.0</code> or <code>7 * 1.0 / 2</code> to get 3.5.</p>`,
          example: d`
            SELECT name, level, level * 100 AS xp_needed, name || ' of ' || class AS title
            FROM heroes
            WHERE level < 10;`,
          task: `For every sale in the <code>'North'</code> region, show <code>id</code>, <code>product</code> and <code>revenue</code> (units × price). The last column must be called <code>revenue</code>.`,
          starter: d`
            SELECT id, product FROM sales;`,
          solution: d`
            SELECT id, product, units * price AS revenue
            FROM sales
            WHERE region = 'North';`,
          checkNames: true,
          hints: ["units * price AS revenue", "Filter with WHERE region = 'North'"],
        },
        {
          id: "sq1-4", type: "quiz", title: "Riddles of the Archive",
          story: "The archivists test every newcomer. Predict what each query returns.",
          lesson: `<p>Results are shown as rows, with values separated by commas. <code>(no rows)</code> means the query found nothing. Remember SQLite's whole-number division and case-sensitive text.</p>`,
          questions: [
            { q: "What does this return?", predict: true, code: "SELECT name, class FROM heroes WHERE id = 3;",
              choices: ["Mira, Healer", "Mira", "Zed, Mage", "(no rows)"], answer: 0,
              explain: "The row whose id is 3 is Mira, a Healer. You get exactly the two columns you asked for." },
            { q: "What does this return?", predict: true, code: "SELECT 7 / 2, 7 / 2.0, 7 % 3;",
              choices: ["3, 3.5, 1", "3.5, 3.5, 1", "3, 3, 1", "4, 3.5, 2"], answer: 0,
              explain: "Two whole numbers divide to a whole number (3). One decimal makes the result decimal (3.5). <code>%</code> is the remainder." },
            { q: "What does this return?", predict: true, code: "SELECT 'Lyra' || ' the ' || 'Brave';",
              choices: ["Lyra the Brave", "LyratheBrave", "0", "Lyra || the || Brave"], answer: 0,
              explain: "<code>||</code> joins pieces of text together." },
            { q: "What does this return?", predict: true, code: "SELECT name FROM heroes WHERE class = 'mage';",
              choices: ["(no rows)", "all nine Mages", "Lyra", "an error"], answer: 0,
              explain: "Text comparison with <code>=</code> is case-sensitive: the classes are stored as 'Mage', not 'mage'." },
            { q: "In which order must these clauses appear?",
              choices: ["SELECT … FROM … WHERE …", "FROM … SELECT … WHERE …", "SELECT … WHERE … FROM …", "WHERE … SELECT … FROM …"], answer: 0,
              explain: "Always SELECT, then FROM, then WHERE (and later GROUP BY, HAVING, ORDER BY, LIMIT)." },
          ],
        },
        {
          id: "sq1-5", boss: true, time: 540, title: "The Recruiter's List",
          story: "The army needs seasoned fighters with gold for equipment. The recruiter's query has a sneaky bug.",
          lesson: `<p><code>AND</code> is evaluated before <code>OR</code>, just like × before + in maths. So</p>
            <p><code>WHERE class = 'Knight' OR class = 'Archer' AND level &gt;= 15</code></p>
            <p>means "every Knight, plus Archers of level 15+". Use <b>parentheses</b> to say what you mean: <code>WHERE (class = 'Knight' OR class = 'Archer') AND level &gt;= 15</code>.</p>`,
          example: d`
            SELECT name, class, level FROM heroes
            WHERE (class = 'Healer' OR class = 'Archer') AND level > 30;`,
          task: `List the Knights and Archers with a level of at least 15 <b>and</b> more than 500 gold. Show <code>name</code>, <code>class</code>, <code>level</code> and <code>war_chest</code> (their gold × 2).<br>
            The starter query has the bug described in the lesson: fix it.`,
          starter: d`
            SELECT name, class, level, gold * 2 AS war_chest
            FROM heroes
            WHERE class = 'Knight' OR class = 'Archer' AND level >= 15 AND gold > 500;`,
          solution: d`
            SELECT name, class, level, gold * 2 AS war_chest
            FROM heroes
            WHERE (class = 'Knight' OR class = 'Archer') AND level >= 15 AND gold > 500;`,
          checkNames: true,
          hints: ["AND binds tighter than OR.", "Wrap the two class conditions in parentheses."],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "Order in the Archive", topic: "ORDER BY, LIMIT, DISTINCT, IN, BETWEEN, LIKE & NULL", time: 420, icon: "🗂️",
      intro: "A good archivist can sort any ledger, pick the top entries, and knows the difference between \"zero\" and \"unknown\".",
      missions: [
        {
          id: "sq2-1", title: "Line Them Up",
          story: "The Keeper wants the realm's five richest heroes, richest first.",
          lesson: `<ul><li><code>ORDER BY gold DESC</code> → largest first (<code>ASC</code>, the default, is smallest first)</li>
            <li>Several keys: <code>ORDER BY gold DESC, name</code> → richest first, ties alphabetically</li>
            <li><code>LIMIT 5</code> → only the first 5 rows; <code>LIMIT 5 OFFSET 5</code> → the next 5</li></ul>
            <p>Without <code>ORDER BY</code>, a database may return rows in <b>any</b> order. Never rely on it.</p>`,
          example: d`
            SELECT title, reward FROM quests ORDER BY reward DESC, title LIMIT 3;`,
          task: `Show the <code>name</code> and <code>gold</code> of the 5 richest heroes, richest first (on equal gold, by name A–Z).`,
          starter: d`
            SELECT name, gold FROM heroes LIMIT 5;`,
          solution: d`
            SELECT name, gold FROM heroes ORDER BY gold DESC, name LIMIT 5;`,
          ordered: true,
          hints: ["ORDER BY gold DESC, name", "LIMIT 5 goes at the very end."],
        },
        {
          id: "sq2-2", title: "Only the Unique",
          story: "Which regions offer medium-sized rewards? The Keeper wants each region once.",
          lesson: `<ul><li><code>SELECT DISTINCT region</code> → each different value once</li>
            <li><code>reward BETWEEN 50 AND 200</code> → from 50 to 200, both included</li>
            <li><code>class IN ('Mage', 'Healer')</code> → any value in the list</li>
            <li><code>title LIKE 'The%'</code> → text patterns: <code>%</code> = any characters, <code>_</code> = exactly one. In SQLite, LIKE ignores upper/lower case</li></ul>`,
          example: d`
            SELECT DISTINCT class FROM heroes WHERE name LIKE '%a%' ORDER BY class;`,
          task: `Which regions have at least one quest with a reward from 50 to 200 (inclusive)? Show each <code>region</code> once, sorted A–Z.`,
          starter: d`
            SELECT region FROM quests;`,
          solution: d`
            SELECT DISTINCT region FROM quests WHERE reward BETWEEN 50 AND 200 ORDER BY region;`,
          ordered: true,
          hints: ["SELECT DISTINCT region", "WHERE reward BETWEEN 50 AND 200", "ORDER BY region"],
        },
        {
          id: "sq2-3", title: "The Empty Pages",
          story: "Some records have blank entries: a hero with no guild, a purse nobody counted. These blanks are NULL.",
          lesson: `<p><code>NULL</code> means <b>unknown</b>: not zero, not empty text. Any comparison with NULL is unknown too, so <code>gold = NULL</code> is never true!</p>
            <ul><li>Test with <code>gold IS NULL</code> / <code>gold IS NOT NULL</code></li>
            <li><code>COALESCE(gold, 0)</code> → the first value that isn't NULL: here, 0 for unknown gold</li>
            <li>Arithmetic with NULL gives NULL: <code>NULL + 5</code> is NULL</li></ul>`,
          example: d`
            SELECT name, gold, COALESCE(gold, 0) AS gold_or_zero, gold + 10 AS plus_ten
            FROM heroes WHERE id IN (3, 4);`,
          task: `List the heroes who have <b>no guild</b> or <b>unknown gold</b>. Show <code>name</code>, <code>guild_id</code> and <code>gold</code>, with unknown gold shown as 0 (still called <code>gold</code>). Sort by name.`,
          starter: d`
            SELECT name, guild_id, gold
            FROM heroes
            WHERE guild_id = NULL OR gold = NULL
            ORDER BY name;`,
          solution: d`
            SELECT name, guild_id, COALESCE(gold, 0) AS gold
            FROM heroes
            WHERE guild_id IS NULL OR gold IS NULL
            ORDER BY name;`,
          ordered: true, checkNames: true,
          hints: ["= NULL never matches: use IS NULL.", "COALESCE(gold, 0) AS gold"],
        },
        {
          id: "sq2-4", type: "quiz", title: "Riddles of Order and Emptiness",
          story: "The archivists love riddles about NULL. Most newcomers fail them.",
          lesson: `<p>NULL is "unknown": comparisons with it are unknown, so rows never match <code>= NULL</code>. <code>LIKE</code> ignores case in SQLite; <code>=</code> doesn't. Comparisons return 1 (true) or 0 (false).</p>`,
          questions: [
            { q: "What does this return?", predict: true, code: "SELECT name FROM heroes WHERE gold = NULL;",
              choices: ["(no rows)", "Hale\nZed", "Zed", "an error"], answer: 0,
              explain: "Nothing is ever <i>equal</i> to an unknown value, not even another unknown. Use <code>IS NULL</code>." },
            { q: "What does this return?", predict: true, code: "SELECT name FROM heroes WHERE gold IS NULL ORDER BY name;",
              choices: ["Hale\nZed", "Zed\nHale", "(no rows)", "Bo\nKai"], answer: 0,
              explain: "Two heroes have unknown gold. Bo and Kai have no <i>guild</i>, which is a different column." },
            { q: "What does this return?", predict: true, code: "SELECT NULL + 5, COALESCE(NULL, 'x'), NULL = NULL;",
              choices: ["NULL, x, NULL", "5, x, 1", "NULL, NULL, 1", "5, x, NULL"], answer: 0,
              explain: "Anything combined with unknown is unknown. COALESCE skips NULLs. Even NULL = NULL is unknown." },
            { q: "What does this return?", predict: true, code: "SELECT 'Mira' LIKE 'm%', 'Mira' = 'mira';",
              choices: ["1, 0", "0, 0", "1, 1", "0, 1"], answer: 0,
              explain: "True is 1 and false is 0. LIKE ignores case; = doesn't." },
            { q: "What does this return?", predict: true, code: "SELECT DISTINCT difficulty FROM quests ORDER BY difficulty;",
              choices: ["easy\nhard\nmedium", "easy\nmedium\nhard", "easy\neasy\neasy\nhard", "hard\nmedium\neasy"], answer: 0,
              explain: "Text is sorted alphabetically, not by meaning: h comes before m." },
            { q: "What does this return?", predict: true, code: "SELECT title FROM quests ORDER BY reward DESC LIMIT 1 OFFSET 1;",
              choices: ["The Sealed Vault", "Dragon's Shadow", "Bandit Camp", "Lost Sheep"], answer: 0,
              explain: "Sorted by reward, Dragon's Shadow (400) is first; OFFSET 1 skips it, giving the second: The Sealed Vault (250)." },
          ],
        },
        {
          id: "sq2-5", boss: true, time: 630, title: "The Archive Index",
          story: "The Keeper is building an index of veteran spellcasters: those who joined in 2021 and have a known fortune.",
          lesson: `<p>Dates stored as text <code>'YYYY-MM-DD'</code> sort correctly, and can be matched with patterns: <code>joined LIKE '2021-%'</code> or compared: <code>joined BETWEEN '2021-01-01' AND '2021-12-31'</code>.</p>
            <p>Combine everything: a filter with several conditions, a sort with a tie-break, and a limit.</p>`,
          example: d`
            SELECT name, joined FROM heroes WHERE joined LIKE '2022-%' ORDER BY joined LIMIT 3;`,
          task: `List the Mages and Healers who joined in 2021 and whose gold is known. Show <code>name</code>, <code>class</code>, <code>joined</code>, most recently joined first (on the same date, by name), and only the first 5.`,
          starter: d`
            SELECT name, class, joined FROM heroes;`,
          solution: d`
            SELECT name, class, joined
            FROM heroes
            WHERE class IN ('Mage', 'Healer') AND joined LIKE '2021-%' AND gold IS NOT NULL
            ORDER BY joined DESC, name
            LIMIT 5;`,
          ordered: true,
          hints: ["class IN ('Mage', 'Healer')", "joined LIKE '2021-%' and gold IS NOT NULL", "ORDER BY joined DESC, name LIMIT 5"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Tally Room", topic: "COUNT, SUM, AVG, MIN, MAX, ROUND & CASE", time: 480, icon: "🧮",
      intro: "In the Tally Room, whole tables are summed up into single numbers: how many, how much, how big on average.",
      missions: [
        {
          id: "sq3-1", title: "Count the Coins",
          story: "The treasurer needs the headline numbers about the realm's heroes.",
          lesson: `<p><b>Aggregate functions</b> turn many rows into one value:</p>
            <ul><li><code>COUNT(*)</code> → number of rows; <code>COUNT(gold)</code> → number of rows where gold is <b>not NULL</b></li>
            <li><code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code> (they all skip NULLs)</li>
            <li><code>ROUND(x, 1)</code> → round to 1 decimal</li></ul>`,
          example: d`
            SELECT COUNT(*) AS quests, MIN(reward) AS smallest, MAX(reward) AS biggest, ROUND(AVG(reward), 2) AS average
            FROM quests;`,
          task: `Return one row with: <code>heroes</code> (how many heroes), <code>with_gold</code> (how many have known gold), <code>total_gold</code> and <code>avg_level</code> (rounded to 1).`,
          starter: d`
            SELECT COUNT(*) AS heroes FROM heroes;`,
          solution: d`
            SELECT COUNT(*) AS heroes, COUNT(gold) AS with_gold, SUM(gold) AS total_gold, ROUND(AVG(level), 1) AS avg_level
            FROM heroes;`,
          checkNames: true,
          hints: ["COUNT(*) counts rows, COUNT(gold) only known values.", "ROUND(AVG(level), 1) AS avg_level"],
        },
        {
          id: "sq3-2", title: "Counting Kinds",
          story: "How busy was February? The quest-master wants to know how many quests were completed, by how many different heroes.",
          lesson: `<p><code>COUNT(DISTINCT hero_id)</code> counts <b>different</b> values. A hero who completed 3 quests counts once.</p>
            <p>Aggregates work after <code>WHERE</code>: filter the rows first, then summarise what's left.</p>`,
          example: d`
            SELECT COUNT(*) AS entries, COUNT(DISTINCT hero_id) AS heroes
            FROM quest_log WHERE stars = 5;`,
          task: `For the quests completed in <b>February 2024</b> (dates like <code>'2024-02-…'</code>), return one row: <code>entries</code>, <code>heroes</code> (different heroes), <code>quests</code> (different quests), <code>avg_stars</code> (rounded to 2).`,
          starter: d`
            SELECT COUNT(*) AS entries FROM quest_log;`,
          solution: d`
            SELECT COUNT(*) AS entries, COUNT(DISTINCT hero_id) AS heroes, COUNT(DISTINCT quest_id) AS quests, ROUND(AVG(stars), 2) AS avg_stars
            FROM quest_log
            WHERE completed_on LIKE '2024-02-%';`,
          checkNames: true,
          hints: ["WHERE completed_on LIKE '2024-02-%'", "COUNT(DISTINCT hero_id) AS heroes"],
        },
        {
          id: "sq3-3", title: "The Choosing Case",
          story: "One report, many questions: total money, northern money, potions sold, big orders.",
          lesson: `<p><code>CASE</code> is SQL's if/else:</p>
            <p><code>CASE WHEN units &gt;= 15 THEN 'big' WHEN units &gt;= 5 THEN 'medium' ELSE 'small' END</code></p>
            <p>Inside an aggregate it gives <b>conditional totals</b> in a single pass: <code>SUM(CASE WHEN region = 'North' THEN units * price ELSE 0 END)</code> adds only the northern revenue.</p>`,
          example: d`
            SELECT name, level,
                   CASE WHEN level >= 30 THEN 'legend' WHEN level >= 10 THEN 'veteran' ELSE 'novice' END AS band
            FROM heroes LIMIT 5;`,
          task: `From <code>sales</code>, return one row: <code>revenue</code> (total units × price), <code>north_revenue</code> (North only), <code>potion_units</code> (units of Potions sold) and <code>big_orders</code> (orders with at least 15 units). Use <code>CASE</code>.`,
          starter: d`
            SELECT SUM(units * price) AS revenue FROM sales;`,
          solution: d`
            SELECT SUM(units * price) AS revenue,
                   SUM(CASE WHEN region = 'North' THEN units * price ELSE 0 END) AS north_revenue,
                   SUM(CASE WHEN product = 'Potion' THEN units ELSE 0 END) AS potion_units,
                   SUM(CASE WHEN units >= 15 THEN 1 ELSE 0 END) AS big_orders
            FROM sales;`,
          checkNames: true, mustUse: ["CASE"],
          hints: ["SUM(CASE WHEN region = 'North' THEN units * price ELSE 0 END)", "Counting with CASE: SUM(CASE WHEN units >= 15 THEN 1 ELSE 0 END)"],
        },
        {
          id: "sq3-4", type: "quiz", title: "Riddles of the Tally",
          story: "The tally-keepers' riddles: what counts, what's skipped, and what's unknown.",
          lesson: `<p>Aggregates skip NULLs (except <code>COUNT(*)</code>). The sum of no rows at all is NULL, not 0. A CASE condition that's NULL counts as false.</p>`,
          questions: [
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*), COUNT(gold), COUNT(DISTINCT class) FROM heroes;",
              choices: ["20, 18, 4", "20, 20, 4", "18, 18, 4", "20, 18, 20"], answer: 0,
              explain: "20 heroes, 2 with unknown gold, 4 different classes." },
            { q: "What does this return?", predict: true, code: "SELECT AVG(x) FROM (SELECT 10 AS x UNION ALL SELECT NULL UNION ALL SELECT 20);",
              choices: ["15.0", "10.0", "NULL", "30.0"], answer: 0,
              explain: "AVG ignores the NULL: (10 + 20) / 2 = 15." },
            { q: "What does this return?", predict: true, code: "SELECT SUM(gold) FROM heroes WHERE level > 100;",
              choices: ["NULL", "0", "(no rows)", "an error"], answer: 0,
              explain: "No row matches, and the sum of nothing is NULL. Use <code>COALESCE(SUM(gold), 0)</code> when you need 0." },
            { q: "What does this return?", predict: true, code: "SELECT ROUND(2.567, 1), ROUND(7 / 2), 7 * 1.0 / 2;",
              choices: ["2.6, 3.0, 3.5", "2.5, 3.5, 3.5", "2.6, 4.0, 3.5", "2.6, 3.0, 3.0"], answer: 0,
              explain: "7 / 2 is already 3 (whole-number division) before ROUND sees it. Multiplying by 1.0 first gives 3.5." },
            { q: "What does this return?", predict: true, code: "SELECT CASE WHEN 5 > 3 THEN 'yes' ELSE 'no' END, CASE WHEN NULL THEN 'a' ELSE 'b' END;",
              choices: ["yes, b", "yes, a", "no, b", "yes, NULL"], answer: 0,
              explain: "An unknown (NULL) condition isn't true, so the ELSE branch is used." },
          ],
        },
        {
          id: "sq3-5", boss: true, time: 720, title: "The Treasury Ledger",
          story: "The quarterly treasury report must fit on one line of parchment. Every number must be exact.",
          lesson: `<p>Percentages need decimal division: <code>100.0 * part / total</code>. Writing <code>100 * part / total</code> with whole numbers rounds down silently.</p>
            <p>You can aggregate a calculation, e.g. <code>MAX(units * price)</code> is the biggest single order.</p>`,
          example: d`
            SELECT ROUND(100.0 * SUM(CASE WHEN difficulty = 'hard' THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct_hard
            FROM quests;`,
          task: `From <code>sales</code>, one row with: <code>orders</code>, <code>units</code> (total), <code>revenue</code>, <code>avg_order</code> (average revenue per order, rounded to 2), <code>biggest_order</code> (the largest units × price of one order) and <code>sword_share</code> (percent of the revenue that came from Swords, rounded to 1).`,
          starter: d`
            SELECT COUNT(*) AS orders, SUM(units) AS units FROM sales;`,
          solution: d`
            SELECT COUNT(*) AS orders,
                   SUM(units) AS units,
                   SUM(units * price) AS revenue,
                   ROUND(AVG(units * price), 2) AS avg_order,
                   MAX(units * price) AS biggest_order,
                   ROUND(100.0 * SUM(CASE WHEN product = 'Sword' THEN units * price ELSE 0 END) / SUM(units * price), 1) AS sword_share
            FROM sales;`,
          checkNames: true,
          hints: ["avg_order: ROUND(AVG(units * price), 2)", "biggest_order: MAX(units * price)", "sword_share: ROUND(100.0 * SUM(CASE WHEN product = 'Sword' THEN units * price ELSE 0 END) / SUM(units * price), 1)"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "Grouped Scrolls", topic: "GROUP BY & HAVING", time: 540, icon: "📚",
      intro: "Instead of one total for everything, one total per class, per region, per month: the Archive groups its scrolls.",
      missions: [
        {
          id: "sq4-1", title: "Group the Heroes",
          story: "How does each class compare? The Keeper wants one line per class.",
          lesson: `<p><code>GROUP BY class</code> splits the rows into groups, and each aggregate is computed <b>per group</b>: one result row per class.</p>
            <p>Every column in <code>SELECT</code> should be either a grouping column or an aggregate. (SQLite allows other columns but picks an arbitrary row's value; most databases give an error.)</p>`,
          example: d`
            SELECT difficulty, COUNT(*) AS quests, SUM(reward) AS total_reward
            FROM quests
            GROUP BY difficulty
            ORDER BY total_reward DESC;`,
          task: `For each class: <code>class</code>, <code>heroes</code> (how many), <code>avg_level</code> (rounded to 1) and <code>richest</code> (the most gold anyone in the class has). Sort by class.`,
          starter: d`
            SELECT class, COUNT(*) FROM heroes;`,
          solution: d`
            SELECT class, COUNT(*) AS heroes, ROUND(AVG(level), 1) AS avg_level, MAX(gold) AS richest
            FROM heroes
            GROUP BY class
            ORDER BY class;`,
          ordered: true, checkNames: true,
          hints: ["GROUP BY class goes after FROM (and after WHERE, if any).", "ORDER BY class at the end."],
        },
        {
          id: "sq4-2", title: "The High Table",
          story: "Only the busiest regions get a seat at the trade council.",
          lesson: `<p><code>WHERE</code> filters <b>rows</b> before grouping. <code>HAVING</code> filters <b>groups</b> after the aggregates are computed, so it can use them:</p>
            <p><code>GROUP BY region HAVING COUNT(*) &gt;= 10</code></p>
            <p>The full order is: SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT.</p>`,
          example: d`
            SELECT product, SUM(units) AS units
            FROM sales
            GROUP BY product
            HAVING SUM(units) > 100;`,
          task: `For the regions with at least 10 orders: <code>region</code>, <code>orders</code> and <code>revenue</code> (units × price). Highest revenue first.`,
          starter: d`
            SELECT region, COUNT(*) AS orders, SUM(units * price) AS revenue
            FROM sales
            WHERE COUNT(*) >= 10
            GROUP BY region;`,
          solution: d`
            SELECT region, COUNT(*) AS orders, SUM(units * price) AS revenue
            FROM sales
            GROUP BY region
            HAVING COUNT(*) >= 10
            ORDER BY revenue DESC;`,
          ordered: true, checkNames: true,
          hints: ["Aggregates can't go in WHERE: move the condition to HAVING, after GROUP BY.", "ORDER BY revenue DESC"],
        },
        {
          id: "sq4-3", title: "Two Keys",
          story: "The trade council wants the money per month and per product, in one table.",
          lesson: `<p>Group by several columns: <code>GROUP BY month, product</code> makes one group for each combination.</p>
            <p>You can group by a calculated value. <code>substr(date, 1, 7)</code> takes the first 7 characters of <code>'2024-02-14'</code> → <code>'2024-02'</code>. (SQLite also has <code>strftime('%Y-%m', date)</code>.)</p>`,
          example: d`
            SELECT substr(completed_on, 1, 7) AS month, COUNT(*) AS completed
            FROM quest_log
            GROUP BY month
            ORDER BY month;`,
          task: `Revenue per month and product: <code>month</code> (<code>'YYYY-MM'</code>), <code>product</code>, <code>revenue</code>. Sort by month, then product.`,
          starter: d`
            SELECT product, SUM(units * price) AS revenue FROM sales GROUP BY product;`,
          solution: d`
            SELECT substr(date, 1, 7) AS month, product, SUM(units * price) AS revenue
            FROM sales
            GROUP BY month, product
            ORDER BY month, product;`,
          ordered: true, checkNames: true,
          hints: ["substr(date, 1, 7) AS month", "GROUP BY month, product", "ORDER BY month, product"],
        },
        {
          id: "sq4-4", type: "quiz", title: "Riddles of the Groups",
          story: "The scroll-keepers ask what happens when scrolls are grouped.",
          lesson: `<p>NULL values form their own group. Aggregates are not allowed in WHERE. A grouped query returns one row per group.</p>`,
          questions: [
            { q: "What does this return?", predict: true, code: "SELECT guild_id, COUNT(*) FROM heroes GROUP BY guild_id ORDER BY guild_id;",
              choices: ["NULL, 2\n1, 5\n2, 6\n3, 3\n4, 4", "1, 5\n2, 6\n3, 3\n4, 4", "1, 5\n2, 6\n3, 3\n4, 4\n5, 0", "NULL, 2\n1, 5\n2, 6\n3, 3\n4, 4\n5, 0"], answer: 0,
              explain: "The heroes without a guild form a NULL group (sorted first). Guild 5 has no heroes, so it doesn't appear: grouping only sees rows that exist." },
            { q: "What does this return?", predict: true, allowError: true, code: "SELECT class FROM heroes WHERE COUNT(*) > 3 GROUP BY class;",
              choices: ["SQL error", "Archer\nKnight\nMage", "Mage", "(no rows)"], answer: 0,
              explain: "WHERE runs before grouping, so COUNT doesn't exist yet. That's what HAVING is for." },
            { q: "What does this return?", predict: true, code: "SELECT class FROM heroes GROUP BY class HAVING COUNT(*) > 3 ORDER BY class;",
              choices: ["Archer\nKnight\nMage", "Mage", "Archer\nHealer\nKnight\nMage", "Healer"], answer: 0,
              explain: "Archer and Knight have 4 heroes, Mage 9, Healer only 3." },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM (SELECT class FROM heroes GROUP BY class);",
              choices: ["4", "20", "1", "9"], answer: 0,
              explain: "The inner query returns one row per class: 4 rows." },
            { q: "You want the classes whose <b>average level</b> is above 30, counting only heroes with known gold. Where does each condition go?",
              choices: ["gold IS NOT NULL in WHERE, AVG(level) &gt; 30 in HAVING", "both in WHERE", "both in HAVING", "gold IS NOT NULL in HAVING, AVG(level) &gt; 30 in WHERE"], answer: 0,
              explain: "Row conditions go in WHERE (before grouping); conditions on aggregates go in HAVING (after)." },
          ],
        },
        {
          id: "sq4-5", boss: true, time: 810, title: "The Guild Census",
          story: "The Keeper counts the guilds' strength. Unaffiliated heroes count as a guild of their own, guild 0.",
          lesson: `<p>Combine everything: <code>COALESCE</code> inside and outside aggregates, <code>GROUP BY</code>, <code>HAVING</code>, a sort with a tie-break.</p>
            <ul><li><code>SUM(COALESCE(gold, 0))</code> → unknown gold counts as 0</li>
            <li><code>COALESCE(guild_id, 0) AS guild</code> → show the NULL group as 0</li></ul>`,
          example: d`
            SELECT COALESCE(guild_id, 0) AS guild, COUNT(*) AS members
            FROM heroes GROUP BY guild_id ORDER BY guild;`,
          task: `For each <code>guild_id</code> (heroes without a guild form one group, shown as <code>0</code>): <code>guild</code>, <code>members</code>, <code>total_gold</code> (unknown gold counts as 0) and <code>top_level</code>. Only groups with at least 3 members; richest first (on a tie, by guild).`,
          starter: d`
            SELECT guild_id AS guild, COUNT(*) AS members, SUM(gold) AS total_gold, MAX(level) AS top_level
            FROM heroes
            GROUP BY guild_id;`,
          solution: d`
            SELECT COALESCE(guild_id, 0) AS guild, COUNT(*) AS members, SUM(COALESCE(gold, 0)) AS total_gold, MAX(level) AS top_level
            FROM heroes
            GROUP BY guild_id
            HAVING COUNT(*) >= 3
            ORDER BY total_gold DESC, guild;`,
          ordered: true, checkNames: true,
          hints: ["COALESCE(guild_id, 0) AS guild", "SUM(COALESCE(gold, 0)) AS total_gold", "HAVING COUNT(*) >= 3 ORDER BY total_gold DESC, guild"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Joining Bridge", topic: "INNER JOIN, LEFT JOIN & multiple joins", time: 600, icon: "🌉",
      intro: "The Archive keeps each kind of record in its own table, linked by ids. Joins cross the bridges between them.",
      missions: [
        {
          id: "sq5-1", title: "Cross the Bridge",
          story: "The hero ledger only says \"guild 2\". The Keeper wants guild names and cities.",
          lesson: `<p><code>heroes.guild_id</code> points to <code>guilds.id</code>. A <b>JOIN</b> puts the matching rows side by side:</p>
            <p><code>SELECT h.name, g.name FROM heroes h JOIN guilds g ON h.guild_id = g.id</code></p>
            <ul><li><code>h</code> and <code>g</code> are <b>aliases</b>: short names for the tables</li>
            <li>Both tables have a <code>name</code> column, so say which one: <code>h.name</code>, <code>g.name</code></li>
            <li><code>JOIN</code> (= <code>INNER JOIN</code>) keeps only rows that have a match: heroes without a guild disappear</li></ul>`,
          example: d`
            SELECT l.id, l.completed_on, q.title
            FROM quest_log l
            JOIN quests q ON l.quest_id = q.id
            ORDER BY l.id LIMIT 5;`,
          task: `For every hero who belongs to a guild: <code>hero</code> (their name), <code>guild</code> (the guild's name) and <code>city</code>. Sort by hero name.`,
          starter: d`
            SELECT name AS hero, guild_id AS guild FROM heroes ORDER BY name;`,
          solution: d`
            SELECT h.name AS hero, g.name AS guild, g.city
            FROM heroes h
            JOIN guilds g ON h.guild_id = g.id
            ORDER BY h.name;`,
          ordered: true, checkNames: true,
          hints: ["FROM heroes h JOIN guilds g ON h.guild_id = g.id", "h.name AS hero, g.name AS guild, g.city"],
        },
        {
          id: "sq5-2", title: "Leave No One Behind",
          story: "Every guild must appear on the roll, even the one nobody has joined yet.",
          lesson: `<p><code>LEFT JOIN</code> keeps <b>every</b> row of the left table. When there's no match, the right side's columns are NULL.</p>
            <p>To count matches, count a column from the right table: <code>COUNT(h.id)</code> skips the NULLs, so a guild without heroes gets 0. (<code>COUNT(*)</code> would give 1, because the row itself exists!)</p>`,
          example: d`
            SELECT q.title, COUNT(l.id) AS times_done
            FROM quests q
            LEFT JOIN quest_log l ON l.quest_id = q.id
            GROUP BY q.id
            ORDER BY times_done, q.title;`,
          task: `Every guild with how many members it has: <code>guild</code> (its name) and <code>members</code> (0 if none). Sort by members, most first, then by guild name.`,
          starter: d`
            SELECT g.name AS guild, COUNT(*) AS members
            FROM guilds g
            JOIN heroes h ON h.guild_id = g.id
            GROUP BY g.id;`,
          solution: d`
            SELECT g.name AS guild, COUNT(h.id) AS members
            FROM guilds g
            LEFT JOIN heroes h ON h.guild_id = g.id
            GROUP BY g.id
            ORDER BY members DESC, g.name;`,
          ordered: true, checkNames: true,
          hints: ["Start FROM guilds and LEFT JOIN heroes.", "COUNT(h.id), not COUNT(*)", "ORDER BY members DESC, g.name"],
        },
        {
          id: "sq5-3", title: "Three Tables",
          story: "The quest log only has ids. Turn it into a readable chronicle of the hard quests.",
          lesson: `<p>Join as many tables as you need, one <code>JOIN … ON …</code> after another:</p>
            <p><code>FROM quest_log l JOIN heroes h ON l.hero_id = h.id JOIN quests q ON l.quest_id = q.id</code></p>
            <p>Then filter, sort and select columns from any of them.</p>`,
          example: d`
            SELECT h.name, q.title, l.stars
            FROM quest_log l
            JOIN heroes h ON l.hero_id = h.id
            JOIN quests q ON l.quest_id = q.id
            WHERE l.stars = 5;`,
          task: `Every completed <b>hard</b> quest: <code>hero</code>, <code>quest</code> (title), <code>reward</code>, <code>stars</code>, <code>completed_on</code>. Sort by completed_on, then hero, then quest.`,
          starter: d`
            SELECT hero_id, quest_id, stars, completed_on FROM quest_log;`,
          solution: d`
            SELECT h.name AS hero, q.title AS quest, q.reward, l.stars, l.completed_on
            FROM quest_log l
            JOIN heroes h ON l.hero_id = h.id
            JOIN quests q ON l.quest_id = q.id
            WHERE q.difficulty = 'hard'
            ORDER BY l.completed_on, hero, quest;`,
          ordered: true, checkNames: true,
          hints: ["Two JOINs: heroes on l.hero_id = h.id, quests on l.quest_id = q.id", "WHERE q.difficulty = 'hard'", "ORDER BY l.completed_on, hero, quest"],
        },
        {
          id: "sq5-4", type: "quiz", title: "Riddles of the Bridge",
          story: "The bridge-keeper asks: how many rows cross, and which fall into the river?",
          lesson: `<p>An inner join drops unmatched rows; a left join keeps all rows of the left table (one per match, or one with NULLs). An "anti-join" (LEFT JOIN … WHERE right.id IS NULL) finds rows with <b>no</b> match.</p>`,
          questions: [
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM heroes h JOIN guilds g ON h.guild_id = g.id;",
              choices: ["18", "20", "19", "5"], answer: 0,
              explain: "The 2 heroes without a guild have no match, so an inner join drops them." },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM heroes h LEFT JOIN guilds g ON h.guild_id = g.id;",
              choices: ["20", "18", "19", "25"], answer: 0,
              explain: "LEFT JOIN keeps every hero; each has at most one guild." },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM guilds g LEFT JOIN heroes h ON h.guild_id = g.id;",
              choices: ["19", "18", "20", "5"], answer: 0,
              explain: "18 heroes match a guild, plus one row for Thorn, which has nobody (heroes columns NULL)." },
            { q: "What does this return?", predict: true, code: "SELECT g.name FROM guilds g LEFT JOIN heroes h ON h.guild_id = g.id WHERE h.id IS NULL;",
              choices: ["Thorn", "(no rows)", "Bo\nKai", "Dawn"], answer: 0,
              explain: "The anti-join: guilds whose LEFT JOIN found no hero." },
            { q: "What does this return?", predict: true, allowError: true, code: "SELECT name FROM heroes JOIN guilds ON heroes.guild_id = guilds.id LIMIT 1;",
              choices: ["SQL error", "Lyra", "Ember", "(no rows)"], answer: 0,
              explain: "Both tables have a <code>name</code> column: it's ambiguous. Write heroes.name or guilds.name." },
          ],
        },
        {
          id: "sq5-5", boss: true, time: 900, title: "The Bounty Board",
          story: "The bounty board ranks every hero who has completed quests: their guild, their tally, their earnings.",
          lesson: `<p>Mix join types: an inner join to the quest log keeps only heroes who completed something, while a <b>left</b> join to guilds keeps heroes without one. <code>COALESCE(g.name, 'Unaffiliated')</code> fills the gap.</p>
            <p>When you GROUP BY after joins, group by the hero's id (names could repeat in a real database).</p>`,
          example: d`
            SELECT h.name, COALESCE(g.name, 'Unaffiliated') AS guild
            FROM heroes h LEFT JOIN guilds g ON h.guild_id = g.id
            WHERE h.guild_id IS NULL;`,
          task: `For every hero who completed at least one quest: <code>hero</code>, <code>guild</code> (guild name, or <code>'Unaffiliated'</code>), <code>quests_done</code>, <code>total_reward</code> and <code>avg_stars</code> (rounded to 2). Highest total_reward first, then by hero name.`,
          starter: d`
            SELECT h.name AS hero, COUNT(*) AS quests_done
            FROM heroes h
            JOIN quest_log l ON l.hero_id = h.id
            GROUP BY h.id;`,
          solution: d`
            SELECT h.name AS hero,
                   COALESCE(g.name, 'Unaffiliated') AS guild,
                   COUNT(*) AS quests_done,
                   SUM(q.reward) AS total_reward,
                   ROUND(AVG(l.stars), 2) AS avg_stars
            FROM quest_log l
            JOIN heroes h ON l.hero_id = h.id
            JOIN quests q ON l.quest_id = q.id
            LEFT JOIN guilds g ON h.guild_id = g.id
            GROUP BY h.id
            ORDER BY total_reward DESC, hero;`,
          ordered: true, checkNames: true,
          hints: ["FROM quest_log l JOIN heroes h … JOIN quests q … LEFT JOIN guilds g …", "COALESCE(g.name, 'Unaffiliated') AS guild", "GROUP BY h.id, then ORDER BY total_reward DESC, hero"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "Queries Within", topic: "subqueries, IN, EXISTS & WITH (CTEs)", time: 600, icon: "🪆",
      intro: "Some questions need another question answered first. In SQL, a query can hold a query inside it.",
      missions: [
        {
          id: "sq6-1", title: "The Inner Question",
          story: "\"Who is richer than the average hero?\" To answer, you first need the average.",
          lesson: `<p>A <b>subquery</b> is a query in brackets inside another query. One that returns a single value can be used like a number:</p>
            <p><code>WHERE gold &gt; (SELECT AVG(gold) FROM heroes)</code></p>
            <p>The inner query runs first; its answer is plugged into the outer one.</p>`,
          example: d`
            SELECT title, reward FROM quests
            WHERE reward = (SELECT MAX(reward) FROM quests);`,
          task: `Heroes with more gold than the average hero: <code>name</code> and <code>gold</code>, richest first (ties by name).`,
          starter: d`
            SELECT name, gold FROM heroes WHERE gold > AVG(gold);`,
          solution: d`
            SELECT name, gold FROM heroes
            WHERE gold > (SELECT AVG(gold) FROM heroes)
            ORDER BY gold DESC, name;`,
          ordered: true,
          hints: ["Compute the average in brackets: (SELECT AVG(gold) FROM heroes)", "ORDER BY gold DESC, name"],
        },
        {
          id: "sq6-2", title: "Lists Within",
          story: "Some heroes have never completed a single quest. The Keeper wants their names.",
          lesson: `<ul><li><code>WHERE id IN (SELECT hero_id FROM quest_log)</code> → ids that appear in the other table</li>
            <li><code>NOT IN</code> → ids that don't. <b>Trap:</b> if the list contains a NULL, <code>NOT IN</code> matches nothing at all!</li>
            <li><code>WHERE NOT EXISTS (SELECT 1 FROM quest_log l WHERE l.hero_id = h.id)</code> → the safe way. This is a <b>correlated</b> subquery: it refers to the outer row (<code>h.id</code>) and runs for each hero</li></ul>`,
          example: d`
            SELECT title FROM quests q
            WHERE NOT EXISTS (SELECT 1 FROM quest_log l WHERE l.quest_id = q.id);`,
          task: `The heroes who have never completed a quest: <code>name</code>, sorted A–Z.`,
          starter: d`
            SELECT name FROM heroes ORDER BY name;`,
          solution: d`
            SELECT name FROM heroes h
            WHERE NOT EXISTS (SELECT 1 FROM quest_log l WHERE l.hero_id = h.id)
            ORDER BY name;`,
          ordered: true,
          extraSolutions: ["SELECT name FROM heroes WHERE id NOT IN (SELECT hero_id FROM quest_log) ORDER BY name;",
            "SELECT h.name FROM heroes h LEFT JOIN quest_log l ON l.hero_id = h.id WHERE l.id IS NULL ORDER BY h.name;"],
          hints: ["NOT EXISTS (SELECT 1 FROM quest_log l WHERE l.hero_id = h.id)", "or: WHERE id NOT IN (SELECT hero_id FROM quest_log)"],
        },
        {
          id: "sq6-3", title: "Name Your Steps",
          story: "Long questions become readable when you break them into named steps.",
          lesson: `<p>A <b>CTE</b> (common table expression) names a subquery at the top, so the main query reads like a story:</p>
            <pre class="out">WITH totals AS (
  SELECT hero_id, SUM(reward) AS total
  FROM quest_log JOIN quests ON quest_id = quests.id
  GROUP BY hero_id
)
SELECT * FROM totals WHERE total &gt; 300;</pre>
            <p>Several steps: <code>WITH a AS (…), b AS (… FROM a …) SELECT …</code>. Data teams use CTEs everywhere because they're easy to read and test step by step.</p>`,
          example: d`
            WITH per_class AS (
              SELECT class, AVG(level) AS avg_level FROM heroes GROUP BY class
            )
            SELECT class, ROUND(avg_level, 1) AS avg_level FROM per_class WHERE avg_level > 25;`,
          task: `Using <code>WITH</code>: work out each hero's total quest reward, then return the heroes whose total is <b>above the average of those totals</b>: <code>name</code> and <code>total</code>, highest first (ties by name).`,
          starter: d`
            WITH totals AS (
              SELECT hero_id, SUM(reward) AS total
              FROM quest_log JOIN quests ON quest_log.quest_id = quests.id
              GROUP BY hero_id
            )
            SELECT * FROM totals;`,
          solution: d`
            WITH totals AS (
              SELECT hero_id, SUM(reward) AS total
              FROM quest_log JOIN quests ON quest_log.quest_id = quests.id
              GROUP BY hero_id
            )
            SELECT h.name, t.total
            FROM totals t JOIN heroes h ON h.id = t.hero_id
            WHERE t.total > (SELECT AVG(total) FROM totals)
            ORDER BY t.total DESC, h.name;`,
          ordered: true, checkNames: true, mustUse: ["WITH"],
          hints: ["Join the CTE to heroes for the names.", "WHERE t.total > (SELECT AVG(total) FROM totals)", "ORDER BY t.total DESC, h.name"],
        },
        {
          id: "sq6-4", type: "quiz", title: "Riddles Within",
          story: "The Keeper's riddles hide one question inside another.",
          lesson: `<p><code>x NOT IN (list)</code> is unknown (not true) when the list contains NULL, because x might equal that unknown value. Use <code>NOT EXISTS</code>, or filter the NULLs out of the list.</p>`,
          questions: [
            { q: "Guild 5 (Thorn) has no members. What does this return?", predict: true, code: "SELECT COUNT(*) FROM guilds WHERE id NOT IN (SELECT guild_id FROM heroes);",
              choices: ["0", "1", "5", "an error"], answer: 0,
              explain: "Two heroes have guild_id NULL, so the list contains NULL and NOT IN can never be true. A famous SQL trap!" },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM guilds WHERE id NOT IN (SELECT guild_id FROM heroes WHERE guild_id IS NOT NULL);",
              choices: ["1", "0", "5", "4"], answer: 0,
              explain: "Without the NULLs in the list, Thorn is correctly found." },
            { q: "What does this return?", predict: true, code: "SELECT name FROM heroes WHERE level = (SELECT MAX(level) FROM heroes) ORDER BY name;",
              choices: ["Jax\nMoe", "Jax", "39", "Moe"], answer: 0,
              explain: "Two heroes share the top level, 39." },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM quests q WHERE EXISTS (SELECT 1 FROM quest_log l WHERE l.quest_id = q.id);",
              choices: ["9", "10", "40", "1"], answer: 0,
              explain: "Every quest except The Sealed Vault has been completed at least once." },
            { q: "What does this return?", predict: true, code: "WITH t AS (SELECT class, COUNT(*) AS n FROM heroes GROUP BY class) SELECT MAX(n) FROM t;",
              choices: ["9", "4", "20", "Mage"], answer: 0,
              explain: "The CTE counts heroes per class; the biggest class (Mage) has 9." },
          ],
        },
        {
          id: "sq6-5", boss: true, time: 900, title: "The Champions' Hall",
          story: "Each class has a champion: its highest-level hero. Their portraits hang in the hall, and ties share the honour.",
          lesson: `<p>"The best row of each group" is a classic SQL problem. Two ways without window functions:</p>
            <ul><li>A <b>correlated subquery</b>: <code>WHERE h.level = (SELECT MAX(level) FROM heroes x WHERE x.class = h.class)</code></li>
            <li>A <b>CTE</b> of the maximum per class, joined back on class and level</li></ul>`,
          example: d`
            SELECT q.difficulty, q.title, q.reward
            FROM quests q
            WHERE q.reward = (SELECT MAX(reward) FROM quests x WHERE x.difficulty = q.difficulty);`,
          task: `For every class, the hero(es) with the highest level in that class: <code>class</code>, <code>name</code>, <code>level</code>. Sort by class, then name.`,
          starter: d`
            SELECT class, name, MAX(level) AS level FROM heroes GROUP BY class;`,
          solution: d`
            SELECT h.class, h.name, h.level
            FROM heroes h
            WHERE h.level = (SELECT MAX(level) FROM heroes x WHERE x.class = h.class)
            ORDER BY h.class, h.name;`,
          ordered: true, checkNames: true,
          wrongSolutions: ["SELECT class, name, MAX(level) AS level FROM heroes GROUP BY class ORDER BY class, name;"],
          hints: ["A correlated subquery: (SELECT MAX(level) FROM heroes x WHERE x.class = h.class)", "Ties must all appear, so compare with =", "ORDER BY h.class, h.name"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "The Window Tower", topic: "window functions: RANK, ROW_NUMBER, PARTITION BY, running totals, LAG", time: 660, icon: "🪟",
      intro: "From the Window Tower you see every row and the rows around it at once: ranks, running totals, yesterday's value.",
      missions: [
        {
          id: "sq7-1", title: "Number the Ranks",
          story: "The Keeper wants every hero ranked by level, with ties sharing their place.",
          lesson: `<p>A <b>window function</b> computes a value for each row using other rows, <b>without</b> collapsing them like GROUP BY:</p>
            <p><code>RANK() OVER (ORDER BY level DESC)</code></p>
            <ul><li><code>ROW_NUMBER()</code> → 1, 2, 3, 4 (every row different)</li>
            <li><code>RANK()</code> → 1, 2, 2, 4 (ties share, then a gap)</li>
            <li><code>DENSE_RANK()</code> → 1, 2, 2, 3 (ties share, no gap)</li></ul>`,
          example: d`
            SELECT title, reward,
                   ROW_NUMBER() OVER (ORDER BY reward DESC) AS row_num,
                   RANK() OVER (ORDER BY reward DESC) AS rnk
            FROM quests;`,
          task: `Every hero's <code>name</code>, <code>level</code> and <code>place</code>: their <code>RANK</code> by level (highest = 1). Sort by place, then name.`,
          starter: d`
            SELECT name, level FROM heroes ORDER BY level DESC;`,
          solution: d`
            SELECT name, level, RANK() OVER (ORDER BY level DESC) AS place
            FROM heroes
            ORDER BY place, name;`,
          ordered: true, checkNames: true, mustUse: ["OVER"],
          hints: ["RANK() OVER (ORDER BY level DESC) AS place", "ORDER BY place, name"],
        },
        {
          id: "sq7-2", title: "Within Each Group",
          story: "Each class sends its two best heroes to the tournament.",
          lesson: `<p><code>PARTITION BY</code> restarts the window for each group:</p>
            <p><code>ROW_NUMBER() OVER (PARTITION BY class ORDER BY level DESC, name)</code> → 1, 2, 3… inside each class.</p>
            <p>You can't filter on a window function in WHERE (it's computed later), so put it in a CTE, then filter: <code>WHERE pos &lt;= 2</code>. This "top N per group" pattern is extremely common.</p>`,
          example: d`
            WITH ranked AS (
              SELECT difficulty, title, reward,
                     ROW_NUMBER() OVER (PARTITION BY difficulty ORDER BY reward DESC) AS pos
              FROM quests
            )
            SELECT * FROM ranked WHERE pos = 1;`,
          task: `The top 2 heroes of each class by level (ties broken by name A–Z): <code>class</code>, <code>name</code>, <code>level</code>, <code>pos</code> (1 or 2). Sort by class, then pos.`,
          starter: d`
            SELECT class, name, level FROM heroes ORDER BY class, level DESC;`,
          solution: d`
            WITH ranked AS (
              SELECT class, name, level,
                     ROW_NUMBER() OVER (PARTITION BY class ORDER BY level DESC, name) AS pos
              FROM heroes
            )
            SELECT class, name, level, pos FROM ranked
            WHERE pos <= 2
            ORDER BY class, pos;`,
          ordered: true, checkNames: true, mustUse: ["PARTITION"],
          hints: ["ROW_NUMBER() OVER (PARTITION BY class ORDER BY level DESC, name) AS pos", "Put it in a CTE, then WHERE pos <= 2"],
        },
        {
          id: "sq7-3", title: "Running Totals",
          story: "The treasurer wants to watch the money pile up, day by day.",
          lesson: `<p>An aggregate with <code>OVER (ORDER BY …)</code> becomes <b>running</b>: <code>SUM(revenue) OVER (ORDER BY date)</code> adds up everything up to the current row.</p>
            <p>First make one row per day (a CTE with GROUP BY), then run the window over those rows.</p>
            <p><code>LAG(x) OVER (ORDER BY date)</code> gives the previous row's value; <code>LEAD</code> the next one's.</p>`,
          example: d`
            WITH daily AS (
              SELECT completed_on AS day, COUNT(*) AS done FROM quest_log GROUP BY completed_on
            )
            SELECT day, done, SUM(done) OVER (ORDER BY day) AS so_far, LAG(done) OVER (ORDER BY day) AS prev
            FROM daily LIMIT 6;`,
          task: `Revenue per day with a running total: <code>date</code>, <code>revenue</code> (that day's total), <code>running_total</code>. Sort by date.`,
          starter: d`
            SELECT date, units * price AS revenue FROM sales ORDER BY date;`,
          solution: d`
            WITH daily AS (
              SELECT date, SUM(units * price) AS revenue FROM sales GROUP BY date
            )
            SELECT date, revenue, SUM(revenue) OVER (ORDER BY date) AS running_total
            FROM daily
            ORDER BY date;`,
          ordered: true, checkNames: true,
          hints: ["Daily totals first: GROUP BY date in a CTE", "SUM(revenue) OVER (ORDER BY date) AS running_total"],
        },
        {
          id: "sq7-4", type: "quiz", title: "Riddles of the Window",
          story: "Through each window, the tower shows a different view. Predict what you'll see.",
          lesson: `<p>Window functions never remove rows. <code>OVER ()</code> with nothing inside uses the whole table as the window. <code>LAG</code> on the first row has nothing before it: NULL.</p>`,
          questions: [
            { q: "What does this return?", predict: true,
              code: "WITH t(v) AS (VALUES (10), (20), (20), (30))\nSELECT v, RANK() OVER (ORDER BY v DESC), DENSE_RANK() OVER (ORDER BY v DESC)\nFROM t ORDER BY v DESC;",
              choices: ["30, 1, 1\n20, 2, 2\n20, 2, 2\n10, 4, 3", "30, 1, 1\n20, 2, 2\n20, 3, 3\n10, 4, 4", "30, 1, 1\n20, 2, 2\n20, 2, 2\n10, 3, 3", "30, 1, 1\n20, 2, 2\n10, 4, 3"], answer: 0,
              explain: "Both 20s share place 2. RANK then skips to 4; DENSE_RANK continues with 3." },
            { q: "What does this return?", predict: true, code: "WITH t(v) AS (VALUES (3), (5), (9))\nSELECT v, LAG(v) OVER (ORDER BY v) FROM t;",
              choices: ["3, NULL\n5, 3\n9, 5", "3, 5\n5, 9\n9, NULL", "3, 0\n5, 3\n9, 5", "5, 3\n9, 5"], answer: 0,
              explain: "LAG looks one row back; the first row has nothing before it." },
            { q: "What does this return?", predict: true, code: "SELECT COUNT(*) FROM (SELECT name, COUNT(*) OVER () AS n FROM heroes);",
              choices: ["20", "1", "4", "400"], answer: 0,
              explain: "A window function adds a column but keeps all 20 rows (each gets n = 20)." },
            { q: "What does this return?", predict: true, code: "WITH t(g, v) AS (VALUES ('a', 1), ('a', 2), ('b', 5))\nSELECT g, v, SUM(v) OVER (PARTITION BY g) FROM t ORDER BY g, v;",
              choices: ["a, 1, 3\na, 2, 3\nb, 5, 5", "a, 3\nb, 5", "a, 1, 1\na, 2, 3\nb, 5, 5", "a, 1, 8\na, 2, 8\nb, 5, 8"], answer: 0,
              explain: "Each row gets the total of its own group, and no rows are removed." },
            { q: "What does this return?", predict: true, code: "WITH t(v) AS (VALUES (1), (2), (3))\nSELECT v, SUM(v) OVER (ORDER BY v) FROM t;",
              choices: ["1, 1\n2, 3\n3, 6", "1, 6\n2, 6\n3, 6", "1, 1\n2, 2\n3, 3", "6"], answer: 0,
              explain: "With ORDER BY inside OVER, SUM becomes a running total." },
          ],
        },
        {
          id: "sq7-5", boss: true, time: 990, title: "The Leaderboard",
          story: "Each month, the tower's leaderboard shows the three heroes who earned the most stars.",
          lesson: `<p>Chain the steps: group to one row per (month, hero), rank inside each month with <code>DENSE_RANK() OVER (PARTITION BY month ORDER BY stars DESC)</code>, then keep the top ranks.</p>
            <p>With DENSE_RANK, ties share a place, so "top 3 places" can include more than 3 heroes. That's fair.</p>`,
          example: d`
            WITH m AS (
              SELECT substr(completed_on, 1, 7) AS month, COUNT(*) AS done
              FROM quest_log GROUP BY month
            )
            SELECT month, done, DENSE_RANK() OVER (ORDER BY done DESC) AS busiest FROM m;`,
          task: `For each month (<code>'YYYY-MM'</code> of completed_on), every hero's total stars that month, ranked with <code>DENSE_RANK</code> (most stars = 1). Keep places 1 to 3. Show <code>month</code>, <code>hero</code>, <code>stars</code>, <code>place</code>, sorted by month, place, then hero.`,
          starter: d`
            SELECT substr(completed_on, 1, 7) AS month, hero_id, SUM(stars) AS stars
            FROM quest_log
            GROUP BY month, hero_id;`,
          solution: d`
            WITH monthly AS (
              SELECT substr(l.completed_on, 1, 7) AS month, h.name AS hero, SUM(l.stars) AS stars
              FROM quest_log l JOIN heroes h ON l.hero_id = h.id
              GROUP BY month, h.id
            ),
            ranked AS (
              SELECT month, hero, stars, DENSE_RANK() OVER (PARTITION BY month ORDER BY stars DESC) AS place
              FROM monthly
            )
            SELECT month, hero, stars, place FROM ranked
            WHERE place <= 3
            ORDER BY month, place, hero;`,
          ordered: true, checkNames: true, mustUse: ["DENSE_RANK"],
          hints: ["Step 1 (CTE): month, hero name, SUM(stars) grouped by month and hero", "Step 2: DENSE_RANK() OVER (PARTITION BY month ORDER BY stars DESC) AS place", "Finally WHERE place <= 3 ORDER BY month, place, hero"],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 8, name: "The Keeper's Trial", topic: "changing data & full analysis queries", time: 900, icon: "🗝️",
      intro: "At the top of the Hall of Records, Keeper Codd sets four final trials. Pass them, and the Archive Fortress is free.",
      missions: [
        {
          id: "sq8-1", boss: true, time: 1080, title: "The Scribe's Duties",
          story: "Before analysing data, someone has to write it. The Keeper asks you to create and maintain a bounty register.",
          verify: "SELECT hero_id, amount FROM bounties;",
          lesson: `<p>SQL also <b>changes</b> data:</p>
            <ul><li><code>CREATE TABLE bounties (hero_id INTEGER, amount INTEGER);</code></li>
            <li><code>INSERT INTO t (a, b) VALUES (1, 2);</code>, or insert a query's result: <code>INSERT INTO bounties SELECT id, level * 10 FROM heroes WHERE …;</code></li>
            <li><code>UPDATE bounties SET amount = amount + 50 WHERE …;</code></li>
            <li><code>DELETE FROM bounties WHERE amount &lt; 350;</code></li></ul>
            <p>Always write the <code>WHERE</code> of an UPDATE or DELETE carefully: without it, <b>every row</b> is changed. In this mission you write several statements, each ending with <code>;</code>. Run shows the <code>bounties</code> table afterwards.</p>`,
          example: d`
            SELECT id, level * 10 AS bounty FROM heroes WHERE level >= 30 ORDER BY id;`,
          task: `Write statements that:<br>1. create a table <code>bounties</code> with columns <code>hero_id</code> and <code>amount</code> (both INTEGER)<br>
            2. insert one bounty for every hero with level 30 or more: their id, and amount = level × 10<br>
            3. add 50 to the bounties of Knights<br>4. delete the bounties below 350`,
          starter: d`
            CREATE TABLE bounties (hero_id INTEGER, amount INTEGER);
            `,
          solution: d`
            CREATE TABLE bounties (hero_id INTEGER, amount INTEGER);
            INSERT INTO bounties SELECT id, level * 10 FROM heroes WHERE level >= 30;
            UPDATE bounties SET amount = amount + 50
              WHERE hero_id IN (SELECT id FROM heroes WHERE class = 'Knight');
            DELETE FROM bounties WHERE amount < 350;`,
          hints: ["INSERT INTO bounties SELECT id, level * 10 FROM heroes WHERE level >= 30;", "UPDATE bounties SET amount = amount + 50 WHERE hero_id IN (SELECT id FROM heroes WHERE class = 'Knight');", "DELETE FROM bounties WHERE amount < 350;"],
        },
        {
          id: "sq8-2", boss: true, time: 1080, title: "The Kingdom Report",
          story: "The Keeper's report to the Emperor: each region's money, its share of the realm, and its best product.",
          lesson: `<p>Combine CTEs, grouping, joins and window functions in one readable query:</p>
            <ol><li>revenue per (region, product)</li><li>the best product per region with <code>ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC, product)</code></li>
            <li>totals per region, and the share with <code>SUM(revenue) OVER ()</code> (the grand total, on every row)</li></ol>`,
          example: d`
            SELECT region, SUM(units * price) AS revenue,
                   ROUND(100.0 * SUM(units * price) / SUM(SUM(units * price)) OVER (), 1) AS share
            FROM sales GROUP BY region;`,
          task: `One row per region: <code>region</code>, <code>revenue</code>, <code>orders</code>, <code>share</code> (percent of all revenue, rounded to 1) and <code>best_product</code> (the product with the highest revenue in that region; on a tie, the alphabetically first). Highest revenue first, then by region.`,
          starter: d`
            SELECT region, SUM(units * price) AS revenue, COUNT(*) AS orders
            FROM sales GROUP BY region;`,
          solution: d`
            WITH by_product AS (
              SELECT region, product, SUM(units * price) AS revenue
              FROM sales GROUP BY region, product
            ),
            best AS (
              SELECT region, product,
                     ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC, product) AS pos
              FROM by_product
            ),
            totals AS (
              SELECT region, SUM(units * price) AS revenue, COUNT(*) AS orders
              FROM sales GROUP BY region
            )
            SELECT t.region, t.revenue, t.orders,
                   ROUND(100.0 * t.revenue / SUM(t.revenue) OVER (), 1) AS share,
                   b.product AS best_product
            FROM totals t
            JOIN best b ON b.region = t.region AND b.pos = 1
            ORDER BY t.revenue DESC, t.region;`,
          ordered: true, checkNames: true,
          hints: ["One CTE for revenue per (region, product), one ranking them, one for totals per region", "share: ROUND(100.0 * t.revenue / SUM(t.revenue) OVER (), 1)", "Join the totals to the best products WHERE pos = 1"],
        },
        {
          id: "sq8-3", boss: true, time: 1080, title: "The Loyal and the Lost",
          story: "Which guilds actually send their members on quests? Every guild is judged, even the empty one.",
          lesson: `<p>"Active members" = members who appear in the quest log. Count them with <code>COUNT(DISTINCT …)</code> over a LEFT JOIN, or with a CTE of active heroes.</p>
            <p>Guard divisions: a guild with 0 members would divide by zero (SQLite returns NULL). <code>COALESCE(…, 0)</code> turns that into 0.</p>`,
          example: d`
            SELECT g.name, COUNT(h.id) AS members
            FROM guilds g LEFT JOIN heroes h ON h.guild_id = g.id
            GROUP BY g.id ORDER BY g.name;`,
          task: `For every guild: <code>guild</code> (name), <code>members</code>, <code>active</code> (members who completed at least one quest) and <code>activity_rate</code> (percent of members who are active, rounded to 1, or 0 for a guild with no members). Highest rate first, then by guild name.`,
          starter: d`
            SELECT g.name AS guild, COUNT(h.id) AS members
            FROM guilds g LEFT JOIN heroes h ON h.guild_id = g.id
            GROUP BY g.id;`,
          solution: d`
            WITH active_heroes AS (
              SELECT DISTINCT hero_id FROM quest_log
            )
            SELECT g.name AS guild,
                   COUNT(h.id) AS members,
                   COUNT(a.hero_id) AS active,
                   COALESCE(ROUND(100.0 * COUNT(a.hero_id) / COUNT(h.id), 1), 0) AS activity_rate
            FROM guilds g
            LEFT JOIN heroes h ON h.guild_id = g.id
            LEFT JOIN active_heroes a ON a.hero_id = h.id
            GROUP BY g.id
            ORDER BY activity_rate DESC, guild;`,
          ordered: true, checkNames: true,
          hints: ["A CTE of active heroes: SELECT DISTINCT hero_id FROM quest_log", "LEFT JOIN heroes, then LEFT JOIN the CTE; COUNT(a.hero_id) counts active members", "COALESCE(ROUND(100.0 * active / members, 1), 0)"],
        },
        {
          id: "sq8-4", boss: true, time: 1080, title: "The Keeper's Riddle",
          story: "The final riddle: is the realm's trade growing? Month by month, measure the change.",
          lesson: `<p>Growth compares each period with the one before: <code>LAG(revenue) OVER (ORDER BY month)</code>, then <code>100.0 * (revenue - prev) / prev</code>. The first month has no previous month, so its growth is NULL, which is honest.</p>`,
          example: d`
            WITH m AS (SELECT substr(date, 1, 7) AS month, SUM(units) AS units FROM sales GROUP BY month)
            SELECT month, units, LAG(units) OVER (ORDER BY month) AS prev FROM m;`,
          task: `Monthly revenue growth: <code>month</code> (<code>'YYYY-MM'</code>), <code>revenue</code>, <code>prev_revenue</code> (the month before, NULL for the first), <code>growth_pct</code> (percent change, rounded to 1; NULL for the first month). Sort by month.`,
          starter: d`
            SELECT substr(date, 1, 7) AS month, SUM(units * price) AS revenue
            FROM sales GROUP BY month;`,
          solution: d`
            WITH m AS (
              SELECT substr(date, 1, 7) AS month, SUM(units * price) AS revenue
              FROM sales GROUP BY month
            ),
            w AS (
              SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_revenue FROM m
            )
            SELECT month, revenue, prev_revenue,
                   ROUND(100.0 * (revenue - prev_revenue) / prev_revenue, 1) AS growth_pct
            FROM w
            ORDER BY month;`,
          ordered: true, checkNames: true, mustUse: ["LAG"],
          hints: ["CTE 1: revenue per month", "CTE 2: LAG(revenue) OVER (ORDER BY month) AS prev_revenue", "growth_pct: ROUND(100.0 * (revenue - prev_revenue) / prev_revenue, 1)"],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "sql", name: "SQL", realm: "The Archive Fortress", tower: "The Hall of Records",
    ruler: "Keeper Codd", rulerIcon: "🧙", icon: "🗄️", color: "#3fd49a", requires: ["python"],
    packages: ["sqlite3"], runMs: 8000, submitMs: 12000,
    db: KINGDOM, variants: VARIANTS, schema: SCHEMA,
    blurb: "Ask questions of databases: the language every data team uses every day.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
