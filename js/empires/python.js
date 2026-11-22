// The Python empire: the Serpent Kingdom. Queen Ada is locked at the top of the Obsidian Tower.
// Every floor is a Python topic; every mission is lesson -> task -> hidden tests. Time limits grow with difficulty.
(function (root) {
  const { d } = root.QUEST;

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The Gate of Words", topic: "print, variables & data types", time: 180, icon: "🚪",
      intro: "The tower gate listens only to those who speak Python. Learn your first words.",
      missions: [
        {
          id: "1-1", title: "The First Word",
          story: "The great gate is sealed. It opens only when spoken to — in Python.",
          lesson: `<p><code>print()</code> shows something on the screen. Text (called a <b>string</b>) goes inside quotes: <code>"like this"</code> or <code>'like this'</code>.</p>
            <p>Each <code>print()</code> writes a new line. Lines starting with <code>#</code> are <b>comments</b> — notes for humans that Python ignores.</p>`,
          example: d`
            # This is a comment - Python ignores it
            print("Hello, world!")
            print("Python is fun")
            print(7)`,
          task: `Print exactly two lines:<br><code>Open the gate!</code><br><code>I come to save the Queen.</code>`,
          starter: d`
            # Write your code below
            `,
          solution: d`
            print("Open the gate!")
            print("I come to save the Queen.")`,
          hints: ["Use print() twice — once per line.", 'Text needs quotes: print("Open the gate!")', "Capital letters and the full stop must match exactly."],
          tests: [{ code: d`
            expect_output("""Open the gate!
            I come to save the Queen.""")` }],
        },
        {
          id: "1-2", title: "Name Your Hero",
          story: "The gatekeeper asks: who are you, and what do you carry?",
          lesson: `<p>A <b>variable</b> is a named box that stores a value. <code>hero = "Arin"</code> means “put "Arin" in the box called hero”. The <code>=</code> means <i>store</i>, not <i>equals</i>.</p>
            <p>You can change a variable later: <code>gold = gold + 10</code> takes the old value, adds 10 and stores it back.</p>
            <p>Names may use letters, digits and <code>_</code>, can’t start with a digit, and are case-sensitive (<code>Gold</code> ≠ <code>gold</code>).</p>
            <p><code>print(a, b, c)</code> prints several values with spaces between them.</p>`,
          example: d`
            hero = "Arin"
            gold = 50
            print(hero, "has", gold, "gold")
            gold = gold + 10
            print(hero, "now has", gold, "gold")`,
          task: `Create a variable <code>hero</code> holding <code>"Lyra"</code> and a variable <code>arrows</code> holding <code>12</code>.<br>
            Lyra shoots 5 arrows: <b>subtract 5 from <code>arrows</code></b> (update the variable).<br>
            Then print <code>Lyra has 7 arrows</code> using the variables.`,
          starter: d`
            hero =
            arrows =
            `,
          solution: d`
            hero = "Lyra"
            arrows = 12
            arrows = arrows - 5
            print(hero, "has", arrows, "arrows")`,
          hints: ["Start with arrows = 12, then write arrows = arrows - 5", 'print(hero, "has", arrows, "arrows")'],
          tests: [{ code: d`
            expect_var("hero", "Lyra")
            code_contains("12", "Start arrows at 12, then subtract 5 in code.")
            expect_var("arrows", 7)
            expect_output("Lyra has 7 arrows")` }],
        },
        {
          id: "1-3", title: "Know Your Supplies",
          story: "Before entering, the guard checks every item in your bag — and what kind of thing it is.",
          lesson: `<p>Every value has a <b>type</b>:</p>
            <ul><li><code>int</code> — whole numbers: <code>3</code>, <code>-40</code></li>
            <li><code>float</code> — decimal numbers: <code>2.5</code></li>
            <li><code>str</code> — text: <code>"Lumos"</code></li>
            <li><code>bool</code> — <code>True</code> or <code>False</code></li></ul>
            <p><code>type(x)</code> tells you the type. Convert with <code>int()</code>, <code>float()</code>, <code>str()</code>. You can join strings with <code>+</code>, but not a string and a number — convert first.</p>`,
          example: d`
            age = 14          # int
            height = 1.62     # float
            name = "Arin"     # str
            is_brave = True   # bool
            print(type(height))
            print(int("40") + 2)
            print("Level " + str(3))`,
          task: `Create <code>potions = 3</code> (int), <code>weight = 2.5</code> (float), <code>spell = "Lumos"</code> (str), <code>ready = True</code> (bool).<br>
            Print <code>type(weight)</code>, then on the next line print <code>Lumos x3</code> by joining <code>spell</code>, <code>" x"</code> and <code>potions</code> with <code>+</code>.`,
          starter: d`
            # create the four variables

            # print the type of weight

            # print spell + " x" + ... (convert potions to a string!)
            `,
          solution: d`
            potions = 3
            weight = 2.5
            spell = "Lumos"
            ready = True
            print(type(weight))
            print(spell + " x" + str(potions))`,
          hints: ["print(type(weight)) shows <class 'float'>", "You can't add a str and an int — use str(potions)."],
          tests: [{ code: d`
            expect_var("potions", 3, int)
            expect_var("weight", 2.5, float)
            expect_var("spell", "Lumos", str)
            expect_var("ready", True, bool)
            must_call("str")
            expect_output("""<class 'float'>
            Lumos x3""")` }],
        },
        {
          id: "1-4", type: "quiz", title: "The Gatekeeper's Riddles",
          story: "The gatekeeper won't let you pass until you can read Python as well as write it.",
          lesson: `<p>Reading code and predicting what it does is half of programming. Some new tricks first:</p>
            <ul><li><code>print(a, b, sep="-")</code> puts <code>-</code> between the values instead of a space.</li>
            <li><code>print(x, end="")</code> doesn't start a new line at the end, so the next print continues on the same line.</li>
            <li>A variable holds only its <b>latest</b> value. <code>y = x</code> copies the value <i>now</i>; changing <code>x</code> later doesn't change <code>y</code>.</li></ul>`,
          example: d`
            print("a", "b", "c", sep="-")
            print("no newline", end="")
            print(" ... same line!")
            x = 5
            y = x
            x = 9
            print(x, y)`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                print("A", "B", "C", sep="-")
                print("D", end="")
                print("E")`,
              choices: ["A-B-C\nDE", "A B C\nD\nE", "A-B-C-\nD E", "ABC\nDE"], answer: 0,
              explain: "<code>sep</code> goes <i>between</i> values, and <code>end=\"\"</code> keeps the cursor on the same line." },
            { q: "What does this print?", predict: true, code: d`
                x = 5
                y = x
                x = 10
                print(x, y)`,
              choices: ["10 10", "10 5", "5 10", "5 5"], answer: 1,
              explain: "<code>y = x</code> copied the value 5. Giving <code>x</code> a new value later doesn't touch <code>y</code>." },
            { q: "What does this print?", predict: true, code: d`
                gold = 3
                gold = gold * 2 + 1
                # gold = 100
                print(gold)`,
              choices: ["7", "8", "100", "9"], answer: 0,
              explain: "Multiplication happens before addition: 3 × 2 + 1 = 7. The line starting with <code>#</code> is a comment, so it never runs." },
            { q: "What does this print?", predict: true, code: d`
                print(type(7 / 7))`,
              choices: ["<class 'int'>", "<class 'float'>", "1", "<class 'str'>"], answer: 1,
              explain: "<code>/</code> always gives a float, even when the result is a whole number: <code>7 / 7</code> is <code>1.0</code>." },
            { q: "Which of these is <b>not</b> a valid variable name?",
              choices: ["<code>my_gold</code>", "<code>_secret</code>", "<code>2nd_place</code>", "<code>Level3</code>"], answer: 2,
              explain: "Names may contain letters, digits and <code>_</code>, but can't <b>start</b> with a digit." },
          ],
        },
        {
          id: "1-5", title: "The Broken Sign",
          story: "The gate's welcome sign was carved by a clumsy apprentice. It has three mistakes.",
          lesson: `<p>Real programmers spend a lot of time <b>debugging</b>: reading an error, finding the line, fixing it. Python's error messages tell you the <b>type</b> of error and the <b>line</b>.</p>
            <ul><li><code>SyntaxError</code> — Python can't read the line (missing quote or bracket).</li>
            <li><code>NameError</code> — a name that doesn't exist. Remember <code>Name</code> ≠ <code>name</code>.</li>
            <li><code>TypeError</code> — values that don't fit together, like <code>"text" + 5</code>.</li></ul>
            <p>Fix one error, press Run, read the next error. Repeat.</p>`,
          example: d`
            level = 4
            # print("Level " + level)    <- TypeError: can't add str and int
            print("Level " + str(level))  # fixed
            print("Level", level)         # also fine: print adds the space`,
          task: `The program in the editor should print:<br><code>Welcome, Lyra!</code><br><code>You are visitor number 42</code><br>
            Find and fix its <b>three</b> bugs. Keep the calculation: the number must come from <code>visitors</code>, not be typed in.`,
          starter: d`
            name = "Lyra
            visitors = 41
            visitors = visitors + 1
            print("Welcome, " + Name + "!")
            print("You are visitor number " + visitors)`,
          solution: d`
            name = "Lyra"
            visitors = 41
            visitors = visitors + 1
            print("Welcome, " + name + "!")
            print("You are visitor number " + str(visitors))`,
          hints: ["Press Run and read the first error: which line, which type?", "A string needs a closing quote.", "Python is case-sensitive: name is not Name.", "You can't join a string and an int with + — use str(visitors)."],
          tests: [{ code: d`
            expect_var("visitors", 42)
            assert "42" not in __code__, "Don't type 42 yourself: let the program add 1 to visitors."
            expect_output("""Welcome, Lyra!
            You are visitor number 42""")` }],
        },
        {
          id: "1-6", boss: true, time: 300, title: "The Character Sheet",
          story: "The gate opens. A herald asks for your character sheet before announcing you to the tower.",
          lesson: `<p>Python can assign several variables in <b>one line</b>:</p>
            <p><code>name, level = "Arin", 2</code> puts <code>"Arin"</code> in <code>name</code> and <code>2</code> in <code>level</code>.</p>
            <p>Use variables in calculations instead of typing results yourself. Then the same program works for any hero.</p>`,
          example: d`
            name, hp, max_hp = "Arin", 35, 50
            print("===", name, "===")
            print("HP:", hp, "/", max_hp)
            print("Missing:", max_hp - hp)`,
          task: `In <b>one line</b>, create <code>name, level, xp = "Lyra", 3, 250</code>.<br>
            Reaching the next level needs <code>(level + 1) × 100</code> xp in total. Print exactly:<br>
            <code>=== Lyra ===</code><br><code>Level: 3 -> 4</code><br><code>XP needed: 150</code><br>
            Everything must be calculated from the variables: the herald will test your sheet with other heroes.`,
          starter: d`
            name, level, xp = "Lyra", 3, 250
            `,
          solution: d`
            name, level, xp = "Lyra", 3, 250
            print("===", name, "===")
            print("Level:", level, "->", level + 1)
            print("XP needed:", (level + 1) * 100 - xp)`,
          hints: ["print(\"===\", name, \"===\") — print puts spaces between values.", "The next level is level + 1.", "XP needed: (level + 1) * 100 - xp"],
          tests: [{ code: d`
            import re
            expect_output("""=== Lyra ===
            Level: 3 -> 4
            XP needed: 150""")
            line = re.compile(r'^\s*name\s*,\s*level\s*,\s*xp\s*=.*$', re.M)
            assert line.search(__code__), "Create the three variables in one line: name, level, xp = \"Lyra\", 3, 250"
            other = line.sub('name, level, xp = "Orin", 7, 420', __code__, count=1)
            got = rerun(other)
            if got.strip() != "=== Orin ===\nLevel: 7 -> 8\nXP needed: 380":
                raise AssertionError('With name, level, xp = "Orin", 7, 420 your sheet should say:\n=== Orin ===\nLevel: 7 -> 8\nXP needed: 380\n\nYours says:\n' + got.strip())` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Bridge of Numbers", topic: "operators, input & conversion", time: 240, icon: "🌉",
      intro: "A rickety bridge whose planks only hold if your arithmetic is right.",
      missions: [
        {
          id: "2-1", title: "Share the Gold",
          story: "A troll guards the bridge and demands the treasure be split fairly.",
          lesson: `<p>Arithmetic operators:</p>
            <ul><li><code>+ - *</code> add, subtract, multiply</li>
            <li><code>/</code> divide — always gives a float (<code>7 / 2 → 3.5</code>)</li>
            <li><code>//</code> floor division — whole times it fits (<code>7 // 2 → 3</code>)</li>
            <li><code>%</code> remainder / modulo (<code>7 % 2 → 1</code>)</li>
            <li><code>**</code> power (<code>2 ** 3 → 8</code>)</li></ul>
            <p>Normal maths order applies; use parentheses <code>( )</code> to control it.</p>`,
          example: d`
            print(7 + 2)    # 9
            print(7 / 2)    # 3.5
            print(7 // 2)   # 3
            print(7 % 2)    # 1
            print(2 ** 3)   # 8
            print((1 + 2) * 3)  # 9`,
          task: `<code>gold = 47</code> coins are shared equally between <code>knights = 5</code>.<br>
            Print the whole coins each knight gets (use <code>//</code>), then the coins left over (use <code>%</code>).<br>
            Finally the bridge is a square of side <code>9</code>: print its area using <code>**</code>.`,
          starter: d`
            gold = 47
            knights = 5
            side = 9
            `,
          solution: d`
            gold = 47
            knights = 5
            side = 9
            print(gold // knights)
            print(gold % knights)
            print(side ** 2)`,
          hints: ["gold // knights gives 9", "gold % knights gives what's left: 2", "side ** 2"],
          tests: [{ code: d`
            must_use("//", "%", "**")
            expect_output("9\n2\n81")` }],
        },
        {
          id: "2-2", title: "Ask the Guard",
          story: "The guard whispers two numbers. Only their sum and product will lower the bridge.",
          lesson: `<p><code>input()</code> reads one line typed by the user. <b>It always returns a string</b>, even if they type a number!</p>
            <p>Convert with <code>int(...)</code> or <code>float(...)</code> before doing maths: <code>age = int(input())</code>.</p>
            <p>In this game, the input lines come from the <b>Input</b> box under the editor (one value per line). The hidden tests use their own inputs.</p>`,
          example: d`
            name = input("What is your name? ")
            age = int(input("Age? "))
            print("Hello", name)
            print("Next year you will be", age + 1)`,
          exampleInput: "Arin\n14",
          sampleInput: "3\n4",
          task: `Read two whole numbers (each on its own line) with <code>input()</code>.<br>Print their <b>sum</b>, then on the next line their <b>product</b>.`,
          starter: d`
            a = input()
            b = input()
            `,
          solution: d`
            a = int(input())
            b = int(input())
            print(a + b)
            print(a * b)`,
          hints: ['If you see 34 instead of 7, you joined two strings! Convert with int().', "a = int(input())"],
          tests: [
            { input: ["3", "4"], code: d`expect_output("7\n12")` },
            { input: ["10", "-2"], code: d`expect_output("8\n-20")` },
            { input: ["0", "99"], code: d`expect_output("99\n0")` },
          ],
        },
        {
          id: "2-3", title: "The True Path",
          story: "Three paths. Each is safe only if a statement is True.",
          lesson: `<p>Comparisons give a <code>bool</code>: <code>==</code> (equal), <code>!=</code> (not equal), <code>&lt; &gt; &lt;= &gt;=</code>.</p>
            <p>Combine them with <code>and</code> (both true), <code>or</code> (at least one), <code>not</code> (flip).</p>
            <p>Python allows chains: <code>1 &lt;= x &lt;= 100</code>. Don’t confuse <code>=</code> (store) with <code>==</code> (compare).</p>`,
          example: d`
            x = 15
            print(x > 10)             # True
            print(x == 20)            # False
            print(x > 10 and x < 20)  # True
            print(not x > 10)         # False
            print(10 <= x <= 20)      # True`,
          sampleInput: "50",
          task: `Read a whole number <code>n</code>. Print three lines (True/False):<br>
            1. is <code>n</code> between 1 and 100 (inclusive)?<br>
            2. is <code>n</code> even?<br>
            3. is <code>n</code> negative <b>or</b> greater than 1000?`,
          starter: d`
            n = int(input())
            `,
          solution: d`
            n = int(input())
            print(1 <= n <= 100)
            print(n % 2 == 0)
            print(n < 0 or n > 1000)`,
          hints: ["Even means the remainder after dividing by 2 is 0: n % 2 == 0", "print(n < 0 or n > 1000)"],
          tests: [
            { input: ["50"], code: d`expect_output("True\nTrue\nFalse")` },
            { input: ["7"], code: d`expect_output("True\nFalse\nFalse")` },
            { input: ["-4"], code: d`expect_output("False\nTrue\nTrue")` },
            { input: ["2001"], code: d`expect_output("False\nFalse\nTrue")` },
            { input: ["100"], code: d`expect_output("True\nTrue\nFalse")` },
          ],
        },
        {
          id: "2-4", type: "quiz", title: "Riddles of the Bridge",
          story: "Halfway across, the bridge troll stops you with number riddles. Get them wrong and the planks creak.",
          lesson: `<p>Python follows an order of operations:</p>
            <ol><li><code>( )</code> parentheses</li><li><code>**</code> power (right to left: <code>2 ** 3 ** 2</code> is <code>2 ** 9</code>)</li>
            <li><code>* / // %</code> left to right</li><li><code>+ -</code> left to right</li></ol>
            <p>Some surprises worth knowing:</p>
            <ul><li><code>//</code> rounds <b>down</b> (towards minus infinity): <code>-7 // 2</code> is <code>-4</code>.</li>
            <li><code>int(3.9)</code> just cuts off the decimals → <code>3</code>.</li>
            <li><code>round()</code> rounds halves to the nearest <b>even</b> number: <code>round(2.5)</code> → <code>2</code>, <code>round(3.5)</code> → <code>4</code>.</li>
            <li>Floats are stored in binary, so <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>. Never compare floats with <code>==</code>.</li>
            <li><code>True</code> counts as 1 and <code>False</code> as 0 in arithmetic.</li></ul>`,
          example: d`
            print(2 ** 3 ** 2)     # 512
            print(-7 // 2)         # -4
            print(round(2.5), round(3.5))
            print(0.1 + 0.2)
            print(abs(0.1 + 0.2 - 0.3) < 1e-9)   # the safe way to compare floats`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                print(2 + 3 * 4 ** 2)`,
              choices: ["50", "80", "146", "400"], answer: 0,
              explain: "<code>**</code> first (4² = 16), then <code>*</code> (3 × 16 = 48), then <code>+</code> (2 + 48 = 50)." },
            { q: "What does this print?", predict: true, code: d`
                print(-7 // 2, -7 % 2)`,
              choices: ["-3 -1", "-4 1", "-3 1", "-4 -1"], answer: 1,
              explain: "<code>//</code> rounds down to −4, and Python's <code>%</code> then gives −7 − (−4 × 2) = 1." },
            { q: "What does this print?", predict: true, code: d`
                print(int(3.99), round(3.5), round(2.5))`,
              choices: ["4 4 3", "3 4 3", "3 4 2", "3 3 2"], answer: 2,
              explain: "<code>int()</code> cuts off decimals. <code>round()</code> sends halves to the even neighbour: 3.5 → 4, 2.5 → 2." },
            { q: "What does this print?", predict: true, code: d`
                print(0.1 + 0.2 == 0.3)`,
              choices: ["True", "False", "0.3", "Error"], answer: 1,
              explain: "0.1 + 0.2 is really 0.30000000000000004 in binary floating point. Compare floats with a tolerance instead." },
            { q: "What does this print?", predict: true, code: d`
                print(True + True, 10 / 5)`,
              choices: ["2 2", "2 2.0", "TrueTrue 2.0", "1 2.0"], answer: 1,
              explain: "<code>True</code> counts as 1, and <code>/</code> always returns a float." },
          ],
        },
        {
          id: "2-5", title: "The Toll Keeper",
          story: "Carts crossing the bridge pay a toll. The toll keeper wants a program so he stops arguing with merchants.",
          lesson: `<p>Useful built-in functions for numbers:</p>
            <ul><li><code>float("3.2")</code> → <code>3.2</code> (read decimals from input)</li>
            <li><code>round(x, 2)</code> → round to 2 decimals</li>
            <li><code>max(a, b)</code> / <code>min(a, b)</code> → the bigger / smaller value</li>
            <li><code>abs(x)</code> → distance from zero (<code>abs(-4)</code> is <code>4</code>)</li></ul>
            <p>A neat trick: <code>min(max(x, low), high)</code> keeps <code>x</code> between <code>low</code> and <code>high</code>. This is called <b>clamping</b>.</p>`,
          example: d`
            speed = float("7.8")
            print(round(speed * 1.6, 2))
            print(max(3, 9), min(3, 9), abs(-12))
            print(min(max(250, 0), 100))   # clamped to 100`,
          exampleInput: "",
          task: `Read a <b>distance</b> in km (a decimal number) and the number of <b>carts</b> (a whole number).<br>
            The toll is <code>2.5 × distance × carts</code>, but never less than <code>10</code> and never more than <code>200</code>.<br>
            Print the toll rounded to 2 decimals. Use <code>min()</code> and <code>max()</code> rather than <code>if</code>.`,
          starter: d`
            distance = float(input())
            carts = int(input())
            `,
          sampleInput: "3.2\n2",
          solution: d`
            distance = float(input())
            carts = int(input())
            toll = 2.5 * distance * carts
            toll = min(max(toll, 10), 200)
            print(round(toll, 2))`,
          hints: ["First compute the raw toll: 2.5 * distance * carts", "max(toll, 10) makes sure it's at least 10; min(..., 200) caps it at 200.", "print(round(toll, 2))"],
          tests: [
            ...[["3.2", "2", 16.0], ["1", "1", 10], ["30", "4", 200], ["1.25", "7", 21.88], ["0.5", "3", 10], ["39.99", "2", 199.95]].map(([km, n, want]) => ({
              input: [km, n], code: d`
                must_call("min")
                must_call("max")
                try:
                    got = float(__out__.strip().splitlines()[-1])
                except (ValueError, IndexError):
                    raise AssertionError("Print the toll as a number. You printed:\n" + __out__)
                expect_close(got, ${want}, "Toll for distance ${km} km and ${n} carts", tol=1e-9)`,
            })),
          ],
        },
        {
          id: "2-6", boss: true, time: 360, title: "The Broken Clock",
          story: "The bridge clock shows nonsense. Its mechanism (the program) has several bugs.",
          lesson: `<p>Converting a number of seconds into hours, minutes and seconds uses <code>//</code> and <code>%</code> together:</p>
            <ul><li><code>total // 3600</code> → whole hours</li>
            <li><code>total % 3600</code> → seconds left over after the hours</li>
            <li>do the same with 60 for minutes and seconds</li></ul>
            <p>And remember: <code>input()</code> always gives a <b>string</b>. Convert before doing maths.</p>`,
          example: d`
            total = 200            # seconds
            print(total // 60, "min")
            print(total % 60, "s")`,
          task: `Read a number of seconds and print the hours, minutes and seconds, for <code>7509</code>:<br>
            <code>2 h</code><br><code>5 min</code><br><code>9 s</code><br>
            The program in the editor tries, but it's full of bugs. Fix it.`,
          starter: d`
            total = input()
            hours = total / 3600
            minutes = total % 3600 / 60
            seconds = total // 60
            print(hours, "h")
            print(minutes, "min")
            print(seconds, "s")`,
          sampleInput: "7509",
          solution: d`
            total = int(input())
            hours = total // 3600
            minutes = total % 3600 // 60
            seconds = total % 60
            print(hours, "h")
            print(minutes, "min")
            print(seconds, "s")`,
          hints: ["input() gives text: convert with int().", "/ gives decimals like 2.0858; you want // for whole hours.", "Seconds are what's left after removing whole minutes: total % 60"],
          tests: [["7509", "2 h\n5 min\n9 s"], ["59", "0 h\n0 min\n59 s"], ["3600", "1 h\n0 min\n0 s"], ["86399", "23 h\n59 min\n59 s"], ["3661", "1 h\n1 min\n1 s"]]
            .map(([sec, want]) => ({ input: [sec], code: `expect_output("""${want}""")\n` })),
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Library of Scrolls", topic: "strings, slicing & f-strings", time: 300, icon: "📜",
      intro: "Ancient scrolls hide the path upward. Read them, clean them, write them.",
      missions: [
        {
          id: "3-1", title: "Read the Rune",
          story: "A rune is carved on the wall. Decode it letter by letter.",
          lesson: `<p>A string is a sequence of characters. Each has an <b>index</b> starting at <b>0</b>. Negative indexes count from the end: <code>-1</code> is the last.</p>
            <p><b>Slicing</b> <code>s[a:b]</code> takes characters from <code>a</code> up to (not including) <code>b</code>. <code>s[::-1]</code> reverses. <code>len(s)</code> is the length.</p>`,
          example: d`
            word = "PYTHON"
            print(word[0])     # P
            print(word[-1])    # N
            print(word[1:4])   # YTH
            print(word[:2])    # PY
            print(word[::-1])  # NOHTYP
            print(len(word))   # 6`,
          sampleInput: "dragon",
          task: `Read a word. Print on separate lines: its <b>first letter</b>, its <b>last letter</b>, its <b>length</b>, and the word <b>reversed</b>.`,
          starter: d`
            word = input()
            `,
          solution: d`
            word = input()
            print(word[0])
            print(word[-1])
            print(len(word))
            print(word[::-1])`,
          hints: ["word[0] and word[-1]", "len(word)", "word[::-1] reverses"],
          tests: [
            { input: ["dragon"], code: d`expect_output("d\nn\n6\nnogard")` },
            { input: ["Queen"], code: d`expect_output("Q\nn\n5\nneeuQ")` },
            { input: ["a"], code: d`expect_output("a\na\n1\na")` },
          ],
        },
        {
          id: "3-2", title: "Clean the Scroll",
          story: "The sorcerer smudged the scroll with spaces and curses. Clean it up.",
          lesson: `<p>Strings have <b>methods</b> — actions you call with a dot:</p>
            <ul><li><code>.strip()</code> removes spaces at both ends</li>
            <li><code>.upper() .lower() .title() .capitalize()</code> change case</li>
            <li><code>.replace(old, new)</code> swaps text</li>
            <li><code>.split()</code> breaks into a list of words; <code>" ".join(list)</code> glues them back</li>
            <li><code>.count(x)</code>, <code>.startswith(x)</code>, <code>.find(x)</code></li></ul>
            <p>Strings are <b>immutable</b>: methods return a <i>new</i> string, so store the result: <code>s = s.strip()</code>.</p>`,
          example: d`
            msg = "  hello brave knight  "
            print(msg.strip())                  # hello brave knight
            print(msg.strip().title())          # Hello Brave Knight
            print(msg.replace("brave", "bold"))
            print("a-b-c".split("-"))           # ['a', 'b', 'c']
            print(len("one two three".split())) # 3`,
          sampleInput: "   the EVIL king falls  ",
          task: `Read a messy line. Print:<br>
            1. the line with outer spaces removed, in <b>Title Case</b><br>
            2. the <b>number of words</b><br>
            3. the stripped line in <b>lowercase</b> with every <code>evil</code> replaced by <code>good</code>`,
          starter: d`
            line = input()
            `,
          solution: d`
            line = input().strip()
            print(line.title())
            print(len(line.split()))
            print(line.lower().replace("evil", "good"))`,
          hints: ["Strip first: line = input().strip()", "len(line.split()) counts words", "Lowercase first, then replace: line.lower().replace(...)"],
          tests: [
            { input: ["   the EVIL king falls  "], code: d`expect_output("The Evil King Falls\n4\nthe good king falls")` },
            { input: ["evil evil Eye"], code: d`expect_output("Evil Evil Eye\n3\ngood good eye")` },
            { input: ["kind"], code: d`expect_output("Kind\n1\nkind")` },
          ],
        },
        {
          id: "3-3", title: "Sign the Letter",
          story: "The blacksmith will forge your sword — if you write a proper order.",
          lesson: `<p><b>f-strings</b> put values right inside text. Write <code>f</code> before the quote and put expressions in <code>{ }</code>:</p>
            <p><code>f"{name} has {gold} gold"</code></p>
            <p>Formatting: <code>{price:.2f}</code> shows 2 decimal places. Any expression works inside: <code>{gold * 2}</code>, <code>{name.upper()}</code>.</p>`,
          example: d`
            name = "Arin"
            gold = 7.5
            print(f"{name} has {gold} gold")
            print(f"Price: {gold:.2f}")        # Price: 7.50
            print(f"{name.upper()} x2 = {gold * 2}")`,
          sampleInput: "Lyra\n12",
          task: `Read a <b>name</b> and a <b>price</b> (a decimal number). Using f-strings, print:<br>
            <code>Dear Lyra, your sword costs 12.00 coins.</code><br>
            <code>With tax: 13.20</code> &nbsp;(price × 1.1, 2 decimals)`,
          starter: d`
            name = input()
            price = float(input())
            `,
          solution: d`
            name = input()
            price = float(input())
            print(f"Dear {name}, your sword costs {price:.2f} coins.")
            print(f"With tax: {price * 1.1:.2f}")`,
          hints: ['f"Dear {name}, ..."', "{price:.2f} gives two decimals", "{price * 1.1:.2f}"],
          tests: [
            { input: ["Lyra", "12"], code: d`
              must_use("fstring")
              expect_output("Dear Lyra, your sword costs 12.00 coins.\nWith tax: 13.20")` },
            { input: ["Bo", "3.333"], code: d`expect_output("Dear Bo, your sword costs 3.33 coins.\nWith tax: 3.67")` },
          ],
        },
        {
          id: "3-4", type: "quiz", title: "Riddles of the Scrolls",
          story: "The librarian tests every visitor: can you read a string's fate before Python does?",
          lesson: `<p>Slices are <code>text[start:stop:step]</code>. <code>start</code> is included, <code>stop</code> is <b>not</b>. Negative numbers count from the end.</p>
            <p>Strings are <b>immutable</b>: methods like <code>.upper()</code> return a <i>new</i> string and never change the original. Store the result: <code>s = s.upper()</code>.</p>
            <p>f-strings can format values: <code>{x:.2f}</code> (2 decimals), <code>{n:03d}</code> (pad with zeros to width 3), <code>{n:>5}</code> (right-align in width 5).</p>`,
          example: d`
            w = "python"
            print(w[1:4], w[-3:], w[::-1])
            s = "hi"
            s.upper()        # result thrown away!
            print(s)
            s = s.upper()    # stored
            print(s)
            print(f"[{3.14159:.2f}] [{7:03d}] [{7:>3}]")`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                w = "dragon"
                print(w[1:4], w[-2:], w[::2])`,
              choices: ["rag on dao", "rag on don", "dra on dao", "ragon on dao"], answer: 0,
              explain: "<code>[1:4]</code> takes indexes 1, 2, 3 (stop is excluded). <code>[::2]</code> takes every second letter: d, a, o." },
            { q: "What does this print?", predict: true, code: d`
                print("a,b,,c".split(","))`,
              choices: ["['a', 'b', 'c']", "['a', 'b', '', 'c']", "['a,b,,c']", "['a', 'b', ',', 'c']"], answer: 1,
              explain: "Two commas in a row mean there's an empty string between them. (<code>split()</code> with no argument would treat runs of spaces as one.)" },
            { q: "What does this print?", predict: true, code: d`
                s = "Queen"
                s.upper()
                print(s)`,
              choices: ["QUEEN", "Queen", "None", "queen"], answer: 1,
              explain: "Strings never change. <code>s.upper()</code> made a new string, but nobody stored it." },
            { q: "What does this print?", predict: true, code: d`
                price = 3.14159
                n = 7
                print(f"{price:.2f}|{n:03d}|{n:>3}|")`,
              choices: ["3.14|007|  7|", "3.14|7|7  |", "3.15|007|7|", "3.14159|007|  7|"], answer: 0,
              explain: "<code>.2f</code> rounds to 2 decimals, <code>03d</code> pads with zeros to width 3, <code>&gt;3</code> right-aligns in width 3." },
            { q: "What does this print?", predict: true, code: d`
                word = "banana"
                print(word.count("an"), word.find("n"), word.find("z"))`,
              choices: ["2 2 -1", "2 3 -1", "3 2 0", "2 2 None"], answer: 0,
              explain: "\"an\" appears twice. <code>find</code> returns the first index (2), or <b>−1</b> when the text isn't there." },
          ],
        },
        {
          id: "3-5", title: "The Royal Email",
          story: "The castle's messenger birds need clean addresses. Messy ones get lost over the sea.",
          lesson: `<p>More string tools:</p>
            <ul><li><code>text.split("@")</code> → list of parts; <code>parts[0]</code> is the first</li>
            <li><code>text.find("@")</code> → the index of the first <code>@</code> (−1 if none), useful for slicing</li>
            <li><code>text.endswith(".com")</code>, <code>text.startswith("x")</code> → <code>True</code>/<code>False</code></li>
            <li><code>text.count(".")</code> → how many times</li></ul>
            <p>Methods can be <b>chained</b>: <code>raw.strip().lower()</code> strips first, then lowercases the result.</p>`,
          example: d`
            raw = "  Hello World  "
            clean = raw.strip().lower()
            print(clean)
            at = clean.find(" ")
            print(clean[:at], "|", clean[at + 1:])
            print(clean.endswith("world"), clean.count("o"))`,
          task: `Read an email address. First remove the outer spaces and make it lowercase. Then print, each on its own line:<br>
            1. the <b>username</b> (before the <code>@</code>)<br>2. the <b>domain</b> (after the <code>@</code>)<br>
            3. whether the address ends with <code>.com</code> (True/False)<br>4. how many dots the whole address has<br>
            For <code>  Lyra.Stone@Castle.COM </code> → <code>lyra.stone</code>, <code>castle.com</code>, <code>True</code>, <code>2</code>`,
          starter: d`
            email = input()
            `,
          sampleInput: "  Lyra.Stone@Castle.COM ",
          solution: d`
            email = input().strip().lower()
            at = email.find("@")
            print(email[:at])
            print(email[at + 1:])
            print(email.endswith(".com"))
            print(email.count("."))`,
          hints: ["email = input().strip().lower()", "Either split(\"@\") and take [0] and [1], or find the @ and slice around it.", "email.endswith(\".com\") gives True or False directly."],
          tests: [["  Lyra.Stone@Castle.COM ", "lyra.stone\ncastle.com\nTrue\n2"], ["MAGE@tower.org", "mage\ntower.org\nFalse\n1"], ["a.b.c@d.e.com  ", "a.b.c\nd.e.com\nTrue\n4"]]
            .map(([e, want]) => ({ input: [e], code: `expect_output("""${want}""")\n` })),
        },
        {
          id: "3-6", boss: true, time: 450, title: "The Herald's Banner",
          story: "The herald needs a perfectly aligned banner announcing each hero, or the crowd won't be impressed.",
          lesson: `<p>f-strings can line text up in columns. After the <code>:</code> you choose the width and alignment:</p>
            <ul><li><code>{name:&lt;10}</code> left-align in 10 characters, <code>{name:&gt;10}</code> right-align, <code>{name:^10}</code> centre</li>
            <li><code>{title:*^20}</code> centre and fill the gap with <code>*</code></li>
            <li><code>{n:,}</code> thousands separators → <code>1,234,567</code></li>
            <li><code>{r:.1%}</code> as a percentage with 1 decimal → <code>0.875</code> becomes <code>87.5%</code></li>
            <li>Combine them: <code>{n:&gt;12,}</code> or <code>{r:&gt;8.1%}</code></li></ul>`,
          example: d`
            print(f"[{'left':<8}]")
            print(f"[{'right':>8}]")
            print(f"[{'mid':^9}]")
            print(f"{' MENU ':=^20}")
            print(f"{9876543:,} | {0.4567:.1%} | {42:>6,}")`,
          task: `Read a <b>name</b>, an amount of <b>gold</b> (whole number) and a <b>win rate</b> (decimal between 0 and 1). Print a 30-character-wide banner:<br>
            line 1: <code> ROYAL REPORT </code> (with one space each side) centred in 30 characters, filled with <code>*</code><br>
            lines 2–4: a label left-aligned in 10 characters, then the value right-aligned in 20 characters:<br>
            <code>Hero</code> → the name, <code>Gold</code> → gold with thousands separators, <code>Win rate</code> → the rate as a percentage with 1 decimal.<br>
            For <code>Lyra</code>, <code>1234567</code>, <code>0.8768</code>:<pre class="out">******** ROYAL REPORT ********
Hero                      Lyra
Gold                 1,234,567
Win rate                 87.7%</pre>`,
          starter: d`
            name = input()
            gold = int(input())
            rate = float(input())
            `,
          sampleInput: "Lyra\n1234567\n0.8768",
          solution: d`
            name = input()
            gold = int(input())
            rate = float(input())
            print(f"{' ROYAL REPORT ':*^30}")
            print(f"{'Hero':<10}{name:>20}")
            print(f"{'Gold':<10}{gold:>20,}")
            print(f"{'Win rate':<10}{rate:>20.1%}")`,
          hints: ["Line 1: f\"{' ROYAL REPORT ':*^30}\"", "Line 2: f\"{'Hero':<10}{name:>20}\"", "Gold: {gold:>20,} — width first, then the comma.", "Rate: {rate:>20.1%}"],
          tests: [
            { input: ["Lyra", "1234567", "0.8768"], code: d`
              must_use("fstring")
              expect_output("""******** ROYAL REPORT ********
              Hero                      Lyra
              Gold                 1,234,567
              Win rate                 87.7%""")` },
            { input: ["Sir Bartholomew", "50", "0.05"], code: d`
              expect_output("""******** ROYAL REPORT ********
              Hero           Sir Bartholomew
              Gold                        50
              Win rate                  5.0%""")` },
          ],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Hall of Choices", topic: "if / elif / else", time: 300, icon: "🔀",
      intro: "Every door leads somewhere different. Your code must decide.",
      missions: [
        {
          id: "4-1", title: "Two Doors",
          story: "Left door for even numbers, right door for odd. Choose wrong and the floor drops.",
          lesson: `<p><code>if</code> runs a block only when a condition is True; <code>else</code> runs otherwise.</p>
            <p>The line ends with a colon <code>:</code> and the block is <b>indented</b> (4 spaces). Indentation is how Python knows what's inside the <code>if</code>.</p>`,
          example: d`
            hp = 30
            if hp > 0:
                print("Still standing!")
                print("Keep fighting.")
            else:
                print("Game over")
            print("This always runs")`,
          sampleInput: "4",
          task: `Read a whole number. Print <code>Even</code> if it is even, otherwise <code>Odd</code>.`,
          starter: d`
            n = int(input())
            `,
          solution: d`
            n = int(input())
            if n % 2 == 0:
                print("Even")
            else:
                print("Odd")`,
          hints: ["n % 2 == 0 means even", "Don't forget the colons and the indentation."],
          tests: [
            { input: ["4"], code: d`must_use("if")
              expect_output("Even")` },
            { input: ["7"], code: d`expect_output("Odd")` },
            { input: ["0"], code: d`expect_output("Even")` },
            { input: ["-3"], code: d`expect_output("Odd")` },
          ],
        },
        {
          id: "4-2", title: "The Judge's Verdict",
          story: "The stone judge grades every trial. Build its verdict.",
          lesson: `<p><code>elif</code> ("else if") checks more conditions in order. Python runs the <b>first</b> block whose condition is True and skips the rest.</p>
            <p>Order matters — put the most specific/highest checks first.</p>`,
          example: d`
            temp = 25
            if temp > 30:
                print("Hot")
            elif temp > 15:
                print("Warm")      # this one runs
            elif temp > 0:
                print("Cold")
            else:
                print("Freezing")`,
          sampleInput: "95",
          task: `Read a score. Print:<br><code>Invalid</code> if below 0 or above 100,<br><code>A</code> if 90+, <code>B</code> if 75–89, <code>C</code> if 50–74, otherwise <code>F</code>.`,
          starter: d`
            score = int(input())
            `,
          solution: d`
            score = int(input())
            if score < 0 or score > 100:
                print("Invalid")
            elif score >= 90:
                print("A")
            elif score >= 75:
                print("B")
            elif score >= 50:
                print("C")
            else:
                print("F")`,
          hints: ["Check Invalid first.", "Then go from highest to lowest: >= 90, >= 75, >= 50, else."],
          tests: [
            ["95", "A"], ["90", "A"], ["89", "B"], ["75", "B"], ["74", "C"], ["50", "C"], ["49", "F"], ["0", "F"], ["101", "Invalid"], ["-5", "Invalid"],
          ].map(([i, o]) => ({ input: [i], code: `expect_output(${JSON.stringify(o)})\n` })),
        },
        {
          id: "4-3", title: "Leap of Faith",
          story: "The calendar door opens only on leap years.",
          lesson: `<p>Conditions can be combined with <code>and</code> / <code>or</code> and grouped with parentheses, or you can <b>nest</b> an <code>if</code> inside another.</p>
            <p>A year is a <b>leap year</b> if it is divisible by 4, <b>except</b> years divisible by 100 — <b>unless</b> they are also divisible by 400.</p>`,
          example: d`
            age = 15
            has_ticket = True
            if age >= 12 and has_ticket:
                print("Enter")
            if age < 18:
                if has_ticket:
                    print("Child ticket accepted")`,
          sampleInput: "2024",
          task: `Read a year. Print <code>Leap</code> if it is a leap year, otherwise <code>Common</code>.`,
          starter: d`
            year = int(input())
            `,
          solution: d`
            year = int(input())
            if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):
                print("Leap")
            else:
                print("Common")`,
          hints: ["Divisible by 4: year % 4 == 0", "year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)"],
          tests: [["2024", "Leap"], ["1900", "Common"], ["2000", "Leap"], ["2023", "Common"], ["2100", "Common"], ["1600", "Leap"]]
            .map(([i, o]) => ({ input: [i], code: `expect_output(${JSON.stringify(o)})\n` })),
        },
        {
          id: "4-4", type: "quiz", title: "Riddles of Choice",
          story: "Three statues guard the hall. Each asks a question about choices, and lies to those who guess.",
          lesson: `<p><b>Truthiness:</b> <code>if</code> accepts any value. <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>{}</code> and <code>None</code> count as <b>False</b>; almost everything else counts as <b>True</b> (even <code>"0"</code> and <code>" "</code>).</p>
            <p><b>Chained comparisons:</b> <code>1 &lt; x &lt; 10</code> means <code>1 &lt; x and x &lt; 10</code>.</p>
            <p><b><code>and</code> / <code>or</code> return one of their values:</b> <code>a or b</code> gives <code>a</code> if it's truthy, otherwise <code>b</code>. <code>a and b</code> gives <code>a</code> if it's falsy, otherwise <code>b</code>. Handy for defaults: <code>name = typed or "guest"</code>.</p>
            <p><b>Conditional expression:</b> <code>label = "adult" if age &gt;= 18 else "child"</code>.</p>
            <p>In an <code>if / elif</code> chain only the <b>first</b> true branch runs.</p>`,
          example: d`
            typed = ""
            name = typed or "guest"
            print(name)
            x = 7
            print(1 < x < 10)
            print("even" if x % 2 == 0 else "odd")
            if "0":
                print('"0" is truthy!')`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                x = 15
                if x > 10:
                    print("big")
                elif x > 5:
                    print("medium")
                else:
                    print("small")`,
              choices: ["big", "big\nmedium", "medium", "small"], answer: 0,
              explain: "15 &gt; 5 is also true, but only the <b>first</b> true branch of an if/elif chain runs." },
            { q: "What does this print?", predict: true, code: d`
                print(bool(0), bool(""), bool("0"), bool([]))`,
              choices: ["False False False False", "False False True False", "False True True False", "True False True True"], answer: 1,
              explain: "<code>\"0\"</code> is a non-empty string, so it's truthy. Zero, the empty string and the empty list are falsy." },
            { q: "What does this print?", predict: true, code: d`
                print(0 or "guest", 5 and 7)`,
              choices: ["guest 7", "False True", "guest 5", "0 7"], answer: 0,
              explain: "<code>0 or \"guest\"</code>: 0 is falsy, so you get \"guest\". <code>5 and 7</code>: 5 is truthy, so you get the second value, 7." },
            { q: "What does this print?", predict: true, code: d`
                x = 7
                print(1 < x < 5, x == 7.0, x != "7")`,
              choices: ["True True False", "False True True", "False False True", "False True False"], answer: 1,
              explain: "7 is not below 5. <code>7 == 7.0</code> is True (same number). An int is never equal to a string, so <code>!=</code> is True." },
            { q: "This program prints <code>C</code> for a score of 95. Why?", code: d`
                score = 95
                if score >= 50:
                    print("C")
                elif score >= 75:
                    print("B")
                elif score >= 90:
                    print("A")`,
              choices: ["The first true condition wins, so the checks must go from the highest score to the lowest",
                "<code>elif</code> only works with <code>==</code>", "<code>score</code> must be a string", "Python checks the last <code>elif</code> first"], answer: 0,
              explain: "95 ≥ 50 is true, so the first branch runs and the rest are skipped. Put <code>score &gt;= 90</code> first." },
          ],
        },
        {
          id: "4-5", title: "The Ticket Booth",
          story: "The hall holds a tournament. The ticket seller needs a program to work out prices.",
          lesson: `<p>Conditions can be combined and nested. Keep each rule simple and order them carefully.</p>
            <p>A <b>conditional expression</b> picks one of two values in a single line:</p>
            <p><code>status = "Member" if member == "yes" else "Guest"</code></p>
            <p>Use it for small either-or choices; use a full <code>if</code> for anything longer.</p>`,
          example: d`
            hour = 20
            greeting = "Good evening" if hour >= 18 else "Good day"
            print(greeting)
            light = "on" if hour >= 20 or hour < 6 else "off"
            print("Lamps:", light)`,
          task: `Read an <b>age</b> (whole number) and whether the visitor is a <b>member</b> (<code>yes</code> or <code>no</code>).<br>
            Prices: under 5 → <code>0</code>; under 18 → <code>5</code>; 65 or older → <code>6</code>; everyone else → <code>10</code>.<br>
            Members get <code>2</code> off, but a price can never go below 0.<br>
            Print <code>Price: X</code>, then on the next line <code>Member</code> or <code>Guest</code>, chosen with a <b>conditional expression</b>.`,
          starter: d`
            age = int(input())
            member = input()
            `,
          sampleInput: "10\nyes",
          solution: d`
            age = int(input())
            member = input()
            if age < 5:
                price = 0
            elif age < 18:
                price = 5
            elif age >= 65:
                price = 6
            else:
                price = 10
            if member == "yes":
                price = max(price - 2, 0)
            print("Price:", price)
            print("Member" if member == "yes" else "Guest")`,
          hints: ["Check under 5 before under 18.", "After choosing the price: if member == \"yes\": price = max(price - 2, 0)", "print(\"Member\" if member == \"yes\" else \"Guest\")"],
          tests: [["3", "no", 0, "Guest"], ["3", "yes", 0, "Member"], ["10", "yes", 3, "Member"], ["30", "no", 10, "Guest"], ["70", "yes", 4, "Member"], ["18", "no", 10, "Guest"], ["65", "no", 6, "Guest"], ["17", "no", 5, "Guest"], ["64", "yes", 8, "Member"]]
            .map(([age, mem, price, label]) => ({ input: [age, mem], code: d`
              import ast
              assert any(isinstance(n, ast.IfExp) for n in ast.walk(ast.parse(__code__))), "Choose Member/Guest with a conditional expression: x if condition else y"
              expect_output("""Price: ${price}
              ${label}""")` })),
        },
        {
          id: "4-6", boss: true, time: 450, title: "The Triangle Oracle",
          story: "The last statue holds three rods. Tell it what shape they make, or the hall stays sealed.",
          lesson: `<p>Three lengths make a triangle only if they are all positive and <b>each pair adds up to more than the third</b> (1, 2, 3 is just a flat line).</p>
            <ul><li><b>Equilateral</b>: all three sides equal</li><li><b>Isosceles</b>: exactly two sides equal</li><li><b>Scalene</b>: all different</li></ul>
            <p>A triangle is <b>right-angled</b> when the two shorter sides satisfy <code>a² + b² = c²</code> (c is the longest). You don't know which input is the longest, but <code>max()</code> does, and the sum of all three squares minus the longest square gives the other two.</p>`,
          example: d`
            a, b, c = 6, 8, 10
            longest = max(a, b, c)
            others = a**2 + b**2 + c**2 - longest**2
            print(others == longest**2)`,
          task: `Read three whole numbers (one per line). If they can't form a triangle, print <code>Not a triangle</code>.<br>
            Otherwise print two lines: <code>Equilateral</code>, <code>Isosceles</code> or <code>Scalene</code>, then <code>Right-angled</code> or <code>Not right-angled</code>.<br>
            For <code>3 4 5</code> → <code>Scalene</code> / <code>Right-angled</code>.`,
          starter: d`
            a = int(input())
            b = int(input())
            c = int(input())
            `,
          sampleInput: "3\n4\n5",
          solution: d`
            a = int(input())
            b = int(input())
            c = int(input())
            if a <= 0 or b <= 0 or c <= 0 or a + b <= c or a + c <= b or b + c <= a:
                print("Not a triangle")
            else:
                if a == b == c:
                    print("Equilateral")
                elif a == b or b == c or a == c:
                    print("Isosceles")
                else:
                    print("Scalene")
                longest = max(a, b, c)
                if a**2 + b**2 + c**2 - longest**2 == longest**2:
                    print("Right-angled")
                else:
                    print("Not right-angled")`,
          hints: ["Check 'Not a triangle' first: any side ≤ 0, or any two sides adding up to ≤ the third.", "a == b == c is a chained comparison.", "longest = max(a, b, c); the other two squared = a**2 + b**2 + c**2 - longest**2"],
          tests: [[3, 4, 5, "Scalene\nRight-angled"], [2, 2, 2, "Equilateral\nNot right-angled"], [5, 5, 8, "Isosceles\nNot right-angled"], [1, 2, 3, "Not a triangle"],
            [0, 1, 1, "Not a triangle"], [5, 3, 4, "Scalene\nRight-angled"], [-3, 4, 5, "Not a triangle"], [13, 5, 12, "Scalene\nRight-angled"], [4, 9, 4, "Not a triangle"], [7, 4, 7, "Isosceles\nNot right-angled"]]
            .map(([a, b, c, want]) => ({ input: [String(a), String(b), String(c)], code: `expect_output("""${want}""")\n` })),
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Stairs of Repetition", topic: "for, while, range, break & continue", time: 360, icon: "🌀",
      intro: "A spiral staircase of a thousand steps. Only loops will carry you up.",
      missions: [
        {
          id: "5-1", title: "Count the Steps",
          story: "Count every step out loud, or the stairs reset.",
          lesson: `<p>A <code>for</code> loop repeats a block for each item in a sequence. <code>range()</code> makes number sequences:</p>
            <ul><li><code>range(5)</code> → 0, 1, 2, 3, 4</li>
            <li><code>range(1, 6)</code> → 1 … 5 (end is <b>not</b> included)</li>
            <li><code>range(0, 10, 2)</code> → 0, 2, 4, 6, 8</li></ul>`,
          example: d`
            for i in range(3):
                print("Step", i)

            for letter in "abc":
                print(letter)`,
          sampleInput: "5",
          task: `Read <code>n</code> and print the numbers <b>1 to n</b>, one per line, using a <code>for</code> loop.`,
          starter: d`
            n = int(input())
            `,
          solution: d`
            n = int(input())
            for i in range(1, n + 1):
                print(i)`,
          hints: ["range(1, n + 1) — the end is not included!"],
          tests: [
            { input: ["5"], code: d`must_use("for")
              expect_output("1\n2\n3\n4\n5")` },
            { input: ["1"], code: d`expect_output("1")` },
            { input: ["3"], code: d`expect_output("1\n2\n3")` },
          ],
        },
        {
          id: "5-2", title: "Countdown to Dawn",
          story: "The sorcerer's night ends at zero. Count it down.",
          lesson: `<p>A <code>while</code> loop repeats <b>as long as</b> its condition is True. Something inside must change so it eventually stops — otherwise it loops forever!</p>`,
          example: d`
            energy = 3
            while energy > 0:
                print("Running, energy", energy)
                energy -= 1      # same as energy = energy - 1
            print("Tired!")`,
          sampleInput: "3",
          task: `Read <code>n</code>. Using a <code>while</code> loop print <code>n, n-1, … 1</code> (one per line), then print <code>Dawn!</code>`,
          starter: d`
            n = int(input())
            `,
          solution: d`
            n = int(input())
            while n > 0:
                print(n)
                n -= 1
            print("Dawn!")`,
          hints: ["while n > 0:", "Decrease n inside the loop: n -= 1", "Print Dawn! after the loop (not indented)."],
          tests: [
            { input: ["3"], code: d`must_use("while")
              expect_output("3\n2\n1\nDawn!")` },
            { input: ["1"], code: d`expect_output("1\nDawn!")` },
            { input: ["0"], code: d`expect_output("Dawn!")` },
          ],
        },
        {
          id: "5-3", title: "Collect the Gems",
          story: "Gems lie on every 3rd and 5th step. Gather their total value.",
          lesson: `<p>The <b>accumulator</b> pattern: start a variable at 0 before the loop, and add to it inside the loop.</p>`,
          example: d`
            total = 0
            for i in range(1, 5):
                total += i       # total = total + i
            print(total)         # 10`,
          sampleInput: "10",
          task: `Read <code>n</code>. Print the <b>sum of all numbers from 1 to n</b> that are divisible by 3 <b>or</b> 5.<br>(For 10: 3+5+6+9+10 = 33)`,
          starter: d`
            n = int(input())
            total = 0
            `,
          solution: d`
            n = int(input())
            total = 0
            for i in range(1, n + 1):
                if i % 3 == 0 or i % 5 == 0:
                    total += i
            print(total)`,
          hints: ["Loop i from 1 to n", "if i % 3 == 0 or i % 5 == 0:", "Print total after the loop."],
          tests: [
            { input: ["10"], code: d`must_use_any("for", "while")
              expect_output("33")` },
            { input: ["15"], code: d`expect_output("60")` },
            { input: ["1"], code: d`expect_output("0")` },
            { input: ["100"], code: d`expect_output("2418")` },
          ],
        },
        {
          id: "5-4", title: "The Endless Corridor",
          story: "Voices shout numbers at you until someone says 'stop'. Ignore the lies (negatives).",
          lesson: `<p><code>break</code> exits a loop immediately. <code>continue</code> skips to the next round.</p>
            <p><code>while True:</code> loops forever — so it needs a <code>break</code> inside.</p>`,
          example: d`
            for i in range(10):
                if i == 2:
                    continue    # skip 2
                if i == 5:
                    break       # stop at 5
                print(i)        # 0 1 3 4`,
          sampleInput: "5\n-2\n10\nstop",
          task: `Keep reading lines until you read <code>stop</code>. Each other line is a whole number: <b>skip negatives</b> (use <code>continue</code>) and add the rest. Print the total.`,
          starter: d`
            total = 0
            while True:
                line = input()
            `,
          solution: d`
            total = 0
            while True:
                line = input()
                if line == "stop":
                    break
                n = int(line)
                if n < 0:
                    continue
                total += n
            print(total)`,
          hints: ['if line == "stop": break', "Convert with int(line) after checking for stop.", "if n < 0: continue"],
          tests: [
            { input: ["5", "-2", "10", "stop"], code: d`must_use("while", "break")
              expect_output("15")` },
            { input: ["stop"], code: d`expect_output("0")` },
            { input: ["1", "2", "3", "-100", "stop"], code: d`expect_output("6")` },
          ],
        },
        {
          id: "5-5", title: "Build the Wall",
          story: "Rebuild the broken wall stone by stone — row by row.",
          lesson: `<p>A loop inside a loop is a <b>nested loop</b>. The inner loop runs completely for each round of the outer loop — perfect for grids and tables.</p>
            <p><code>print(x, end=" ")</code> prints without a newline. An empty <code>print()</code> ends the line.</p>`,
          example: d`
            for row in range(2):
                for col in range(3):
                    print(row, col, end=" | ")
                print()`,
          sampleInput: "3",
          task: `Read <code>n</code> and print an <code>n × n</code> multiplication grid. Numbers in a row are separated by a single space.<br>For 3:<br><code>1 2 3<br>2 4 6<br>3 6 9</code>`,
          starter: d`
            n = int(input())
            `,
          solution: d`
            n = int(input())
            for r in range(1, n + 1):
                row = []
                for c in range(1, n + 1):
                    row.append(str(r * c))
                print(" ".join(row))`,
          hints: ["Outer loop for rows (1..n), inner loop for columns (1..n).", 'Use print(r * c, end=" ") then print() — trailing spaces are OK.'],
          tests: [
            { input: ["3"], code: d`must_use("for")
              expect_output("1 2 3\n2 4 6\n3 6 9")` },
            { input: ["1"], code: d`expect_output("1")` },
            { input: ["4"], code: d`expect_output("1 2 3 4\n2 4 6 8\n3 6 9 12\n4 8 12 16")` },
          ],
        },
        {
          id: "5-6", type: "quiz", title: "Riddles of the Stairs",
          story: "The stairs twist back on themselves. Only someone who can trace a loop in their head will find the top.",
          lesson: `<p>To predict a loop, <b>trace</b> it: write down each variable's value after every pass.</p>
            <ul><li><code>range(start, stop, step)</code> stops <b>before</b> <code>stop</code>; a negative step counts down: <code>range(5, 0, -2)</code> → 5, 3, 1.</li>
            <li><code>break</code> leaves only the <b>innermost</b> loop.</li>
            <li>A loop can have an <code>else</code>: it runs when the loop finishes <b>without</b> hitting <code>break</code>. Perfect for "search, and say if nothing was found".</li></ul>`,
          example: d`
            for n in range(2, 7):
                if n % 5 == 0:
                    print("found a multiple of 5:", n)
                    break
            else:
                print("no multiple of 5")

            for i in range(10, 0, -3):
                print(i, end=" ")`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                for i in range(2, 10, 3):
                    print(i, end=" ")`,
              choices: ["2 5 8", "2 5 8 11", "2 3 4 5 6 7 8 9", "3 6 9"], answer: 0,
              explain: "Start at 2, add 3 each time, stop before reaching 10: 2, 5, 8." },
            { q: "What does this print?", predict: true, code: d`
                for i in range(5, 0, -2):
                    print(i)`,
              choices: ["5\n3\n1", "5\n3\n1\n-1", "5\n4\n3\n2\n1", "4\n2\n0"], answer: 0,
              explain: "Counting down by 2 from 5, stopping before 0: 5, 3, 1." },
            { q: "What does this print?", predict: true, code: d`
                for n in range(3, 10, 2):
                    if n % 4 == 0:
                        print("found", n)
                        break
                else:
                    print("none")`,
              choices: ["none", "found 9", "found 3", "found 3\nnone"], answer: 0,
              explain: "The loop checks 3, 5, 7, 9: none is divisible by 4, so <code>break</code> never runs and the <code>else</code> block does." },
            { q: "What does this print?", predict: true, code: d`
                for i in range(3):
                    for j in range(3):
                        if j == 1:
                            break
                        print(i, j)`,
              choices: ["0 0\n1 0\n2 0", "0 0", "0 0\n0 1", "0 0\n1 0\n1 1\n2 0"], answer: 0,
              explain: "<code>break</code> only stops the inner loop. The outer loop carries on with the next <code>i</code>." },
            { q: "What does this print?", predict: true, code: d`
                n = 10
                count = 0
                while n > 1:
                    n = n // 2
                    count += 1
                print(count, n)`,
              choices: ["3 1", "4 0", "3 0", "5 1"], answer: 0,
              explain: "10 → 5 → 2 → 1: three halvings, then <code>n &gt; 1</code> is false." },
          ],
        },
        {
          id: "5-7", boss: true, time: 540, title: "The Prime Gate",
          story: "The top of the stairs is sealed by the Prime Gate. It opens only for someone who can find every prime number.",
          lesson: `<p>A <b>prime</b> is a whole number greater than 1 whose only divisors are 1 and itself: 2, 3, 5, 7, 11, 13…</p>
            <p>To test a number <code>n</code>, try dividing it by every <code>d</code> from 2 upwards. If any <code>n % d == 0</code>, it's not prime. You can stop at the square root: if <code>d * d &gt; n</code>, no divisor is left to find.</p>
            <p>Loop <code>else</code> fits perfectly: <code>break</code> when you find a divisor; the <code>else</code> runs only when none was found.</p>`,
          example: d`
            n = 91
            for d in range(2, n):
                if d * d > n:
                    print(n, "is prime")
                    break
                if n % d == 0:
                    print(n, "is not prime: divisible by", d)
                    break`,
          task: `Read a whole number <code>n</code>. Print every prime from 2 to <code>n</code> on <b>one line</b>, separated by spaces, then <code>Count: K</code> on the next line.<br>
            If there are none, print <code>No primes</code> and <code>Count: 0</code>.<br>For <code>10</code>: <code>2 3 5 7</code> / <code>Count: 4</code>.`,
          starter: d`
            n = int(input())
            `,
          sampleInput: "10",
          solution: d`
            n = int(input())
            line = ""
            count = 0
            for k in range(2, n + 1):
                is_prime = True
                d = 2
                while d * d <= k:
                    if k % d == 0:
                        is_prime = False
                        break
                    d += 1
                if is_prime:
                    line += str(k) + " "
                    count += 1
            if count == 0:
                print("No primes")
            else:
                print(line.strip())
            print("Count:", count)`,
          hints: ["Outer loop: for k in range(2, n + 1). Inner loop: try divisors d.", "Use a variable is_prime = True, set it to False (and break) when k % d == 0.", "Build the line with a string, or print(k, end=\" \") and then print() at the end."],
          tests: [[10, "2 3 5 7\nCount: 4"], [1, "No primes\nCount: 0"], [2, "2\nCount: 1"], [30, "2 3 5 7 11 13 17 19 23 29\nCount: 10"],
            [100, "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97\nCount: 25"], [0, "No primes\nCount: 0"], [49, "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47\nCount: 15"]]
            .map(([n, want]) => ({ input: [String(n)], code: `must_use("for")\nexpect_output("""${want}""")\n` })),
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "The Armory of Lists", topic: "lists & tuples", time: 420, icon: "🗡️",
      intro: "Racks of weapons in perfect order. Learn to store many things at once.",
      missions: [
        {
          id: "6-1", title: "Pack the Bag",
          story: "Three items lie on the armory table. Pack them in order.",
          lesson: `<p>A <b>list</b> holds many values in order: <code>bag = ["sword", "map"]</code>. Lists can change (they're <b>mutable</b>).</p>
            <ul><li><code>bag.append(x)</code> adds to the end</li>
            <li><code>bag[0]</code> first item, <code>bag[-1]</code> last</li>
            <li><code>len(bag)</code> how many; <code>"map" in bag</code> → True/False</li>
            <li><code>bag[1] = "axe"</code> replaces an item</li></ul>`,
          example: d`
            bag = []
            bag.append("rope")
            bag.append("torch")
            print(bag)        # ['rope', 'torch']
            print(len(bag))   # 2
            print(bag[-1])    # torch`,
          sampleInput: "sword\nshield\nmap",
          task: `Start with an empty list <code>bag</code>. Read 3 lines and <code>append</code> each to it. Print the list, then its length, then the first item.`,
          starter: d`
            bag = []
            `,
          solution: d`
            bag = []
            for i in range(3):
                bag.append(input())
            print(bag)
            print(len(bag))
            print(bag[0])`,
          hints: ["bag.append(input()) three times — or in a for loop", "print(bag) shows the brackets and quotes for you."],
          tests: [
            { input: ["sword", "shield", "map"], code: d`must_call("append")
              expect_var("bag", ["sword", "shield", "map"])
              expect_output("['sword', 'shield', 'map']\n3\nsword")` },
            { input: ["a", "b", "c"], code: d`expect_output("['a', 'b', 'c']\n3\na")` },
          ],
        },
        {
          id: "6-2", title: "Rank the Warriors",
          story: "The warriors' strengths are shouted in one breath. Rank them.",
          lesson: `<p>Turn a line like <code>"4 9 1"</code> into numbers: split it, then convert each part.</p>
            <p>Built-ins for lists of numbers: <code>max()</code>, <code>min()</code>, <code>sum()</code>, <code>sorted()</code> (returns a new sorted list). Methods: <code>.sort()</code> (sorts in place), <code>.reverse()</code>, <code>.pop()</code>, <code>.remove(x)</code>.</p>`,
          example: d`
            parts = "4 9 1".split()   # ['4', '9', '1']
            nums = []
            for p in parts:
                nums.append(int(p))
            print(nums, sum(nums), sorted(nums, reverse=True))`,
          sampleInput: "4 9 1 7",
          task: `Read one line of whole numbers separated by spaces. Print the <b>highest</b>, the <b>lowest</b>, the <b>sum</b>, and the list <b>sorted</b> ascending — each on its own line.`,
          starter: d`
            parts = input().split()
            nums = []
            `,
          solution: d`
            parts = input().split()
            nums = []
            for p in parts:
                nums.append(int(p))
            print(max(nums))
            print(min(nums))
            print(sum(nums))
            print(sorted(nums))`,
          hints: ["Convert each part with int() and append to nums.", "max(nums), min(nums), sum(nums), sorted(nums)"],
          tests: [
            { input: ["4 9 1 7"], code: d`expect_output("9\n1\n21\n[1, 4, 7, 9]")` },
            { input: ["-3 10 10 0"], code: d`expect_output("10\n-3\n17\n[-3, 0, 10, 10]")` },
            { input: ["5"], code: d`expect_output("5\n5\n5\n[5]")` },
          ],
        },
        {
          id: "6-3", title: "Mirror Spell",
          story: "A magic mirror reverses everything said before it.",
          lesson: `<p>Slicing works on lists too: <code>items[1:3]</code>, <code>items[:2]</code>, <code>items[::-1]</code> (reversed copy).</p>
            <p><code>" ".join(words)</code> glues a list of strings into one string.</p>`,
          example: d`
            words = ["a", "b", "c", "d"]
            print(words[:2])          # ['a', 'b']
            print(words[::-1])        # ['d', 'c', 'b', 'a']
            print("-".join(words))    # a-b-c-d
            print("c" in words)       # True`,
          sampleInput: "save the queen now",
          task: `Read a line of words. Print:<br>1. the words in <b>reverse order</b>, joined by spaces<br>2. the <b>first two words</b>, joined by a space<br>3. whether <code>queen</code> is one of the words (True/False)`,
          starter: d`
            words = input().split()
            `,
          solution: d`
            words = input().split()
            print(" ".join(words[::-1]))
            print(" ".join(words[:2]))
            print("queen" in words)`,
          hints: ['" ".join(words[::-1])', "words[:2] gives the first two", '"queen" in words'],
          tests: [
            { input: ["save the queen now"], code: d`expect_output("now queen the save\nsave the\nTrue")` },
            { input: ["kings and queens"], code: d`expect_output("queens and kings\nkings and\nFalse")` },
          ],
        },
        {
          id: "6-4", title: "Swap the Guards",
          story: "Two guards stand at (x, y). Swap them without anyone noticing.",
          lesson: `<p>A <b>tuple</b> is like a list but <b>cannot change</b> (immutable): <code>pos = (3, 4)</code>. Great for fixed pairs like coordinates.</p>
            <p><b>Unpacking</b> pulls values out: <code>x, y = pos</code>. Swap two variables in one line: <code>a, b = b, a</code>.</p>`,
          example: d`
            pos = (3, 4)
            x, y = pos
            print(x)          # 3
            a, b = 1, 2
            a, b = b, a
            print(a, b)       # 2 1`,
          sampleInput: "3 4",
          task: `Read a line with two whole numbers <code>x y</code>. Create a tuple <code>pos = (x, y)</code> and print it.<br>Then swap x and y with <code>x, y = y, x</code> and print the new tuple <code>(x, y)</code>.`,
          starter: d`
            parts = input().split()
            x = int(parts[0])
            y = int(parts[1])
            `,
          solution: d`
            parts = input().split()
            x = int(parts[0])
            y = int(parts[1])
            pos = (x, y)
            print(pos)
            x, y = y, x
            print((x, y))`,
          hints: ["pos = (x, y)", "x, y = y, x then print((x, y))"],
          tests: [
            { input: ["3 4"], code: d`expect_var("pos", (3, 4), tuple)
              expect_output("(3, 4)\n(4, 3)")` },
            { input: ["-1 9"], code: d`expect_output("(-1, 9)\n(9, -1)")` },
          ],
        },
        {
          id: "6-5", type: "quiz", title: "Riddles of the Armory",
          story: "The armorer hands you two swords that look identical. Are they two swords, or one sword with two names?",
          lesson: `<p>A variable doesn't hold a list. It <b>points to</b> one. After <code>b = a</code>, both names point to the <b>same</b> list, so changing <code>b</code> changes <code>a</code> too. This is called <b>aliasing</b>.</p>
            <p>To get an independent copy: <code>b = a[:]</code>, <code>b = a.copy()</code> or <code>b = list(a)</code>.</p>
            <ul><li><code>nums.sort()</code> sorts <b>in place</b> and returns <code>None</code>; <code>sorted(nums)</code> returns a <b>new</b> sorted list.</li>
            <li><code>[[0] * 2] * 2</code> repeats the <b>same</b> inner list twice. Build grids with a loop instead.</li>
            <li>Tuples are <b>immutable</b>: you can't change an item after creating one.</li></ul>`,
          example: d`
            a = [1, 2]
            b = a          # same list, two names
            c = a[:]       # a real copy
            b.append(3)
            print(a, b, c)
            print(sorted([3, 1, 2]), [3, 1, 2].sort())`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                a = [1, 2]
                b = a
                b.append(3)
                print(a)`,
              choices: ["[1, 2]", "[1, 2, 3]", "[3]", "None"], answer: 1,
              explain: "<code>a</code> and <code>b</code> are two names for the same list." },
            { q: "What does this print?", predict: true, code: d`
                a = [1, 2]
                b = a[:]
                b.append(3)
                print(a, b)`,
              choices: ["[1, 2, 3] [1, 2, 3]", "[1, 2] [1, 2, 3]", "[1, 2] [3]", "[1, 2, 3] [1, 2]"], answer: 1,
              explain: "<code>a[:]</code> made a separate copy, so only <code>b</code> changes." },
            { q: "What does this print?", predict: true, code: d`
                nums = [3, 1, 2]
                result = nums.sort()
                print(result, nums)`,
              choices: ["[1, 2, 3] [1, 2, 3]", "None [1, 2, 3]", "[1, 2, 3] [3, 1, 2]", "None [3, 1, 2]"], answer: 1,
              explain: "<code>.sort()</code> changes the list itself and returns <code>None</code>." },
            { q: "What does this print?", predict: true, code: d`
                grid = [[0] * 2] * 2
                grid[0][0] = 9
                print(grid)`,
              choices: ["[[9, 0], [0, 0]]", "[[9, 0], [9, 0]]", "[[9, 9], [0, 0]]", "[[9, 9], [9, 9]]"], answer: 1,
              explain: "The outer <code>* 2</code> repeated a reference to the same inner list, so both rows are one list." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                pos = (3, 4)
                pos[0] = 5
                print(pos)`,
              choices: ["(5, 4)", "(3, 4)", "TypeError", "[5, 4]"], answer: 2,
              explain: "Tuples are immutable: <code>'tuple' object does not support item assignment</code>." },
            { q: "What does this print?", predict: true, code: d`
                items = ["a", "b", "c", "b"]
                items.remove("b")
                last = items.pop()
                print(items, last)`,
              choices: ["['a', 'c'] b", "['a', 'c', 'b'] b", "['a', 'b'] c", "['a'] c"], answer: 0,
              explain: "<code>remove</code> deletes the <b>first</b> \"b\"; <code>pop()</code> removes and returns the <b>last</b> item." },
          ],
        },
        {
          id: "6-6", title: "The Battle Grid",
          story: "The war table is a grid of squares, each holding troops. The general wants totals by row, column and diagonal.",
          lesson: `<p>A list can hold other lists: a <b>grid</b> (or matrix). <code>grid[r][c]</code> is row <code>r</code>, column <code>c</code>.</p>
            <ul><li><code>len(grid)</code> = number of rows, <code>len(grid[0])</code> = number of columns</li>
            <li>A row's total: <code>sum(grid[r])</code></li>
            <li>A column's total needs a loop over rows: add <code>grid[r][c]</code> for every <code>r</code></li>
            <li>The main diagonal is <code>grid[0][0]</code>, <code>grid[1][1]</code>, <code>grid[2][2]</code>, …</li></ul>
            <p>Grids like this are exactly what NumPy and pandas handle later, so it's worth understanding them by hand first.</p>`,
          example: d`
            grid = []
            for line in ["1 2", "3 4"]:
                row = []
                for x in line.split():
                    row.append(int(x))
                grid.append(row)
            print(grid)
            print(grid[1][0])          # row 1, column 0 -> 3
            for row in grid:
                print(row, "total", sum(row))`,
          task: `Read <code>n</code>, then <code>n</code> lines, each with <code>n</code> whole numbers separated by spaces. Store them in a list of lists called <code>grid</code>.<br>
            Then print three lines:<br><code>Rows: </code>each row's total, separated by spaces<br><code>Columns: </code>each column's total<br><code>Diagonal: </code>the sum from the top-left to the bottom-right<br>
            For <code>1 2 3 / 4 5 6 / 7 8 9</code>: <code>Rows: 6 15 24</code>, <code>Columns: 12 15 18</code>, <code>Diagonal: 15</code>`,
          starter: d`
            n = int(input())
            grid = []
            `,
          sampleInput: "3\n1 2 3\n4 5 6\n7 8 9",
          solution: d`
            n = int(input())
            grid = []
            for _ in range(n):
                row = []
                for x in input().split():
                    row.append(int(x))
                grid.append(row)
            rows = []
            for row in grid:
                rows.append(str(sum(row)))
            cols = []
            for c in range(n):
                total = 0
                for r in range(n):
                    total += grid[r][c]
                cols.append(str(total))
            diag = 0
            for i in range(n):
                diag += grid[i][i]
            print("Rows:", " ".join(rows))
            print("Columns:", " ".join(cols))
            print("Diagonal:", diag)`,
          hints: ["For each of the n lines: split it, turn each piece into int, append that row list to grid.", "Column c total: loop r over range(n) and add grid[r][c].", "\" \".join() needs strings: convert totals with str()."],
          tests: [
            { input: ["3", "1 2 3", "4 5 6", "7 8 9"], code: d`
              expect_var("grid", [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
              expect_output("""Rows: 6 15 24
              Columns: 12 15 18
              Diagonal: 15""")` },
            { input: ["2", "5 -1", "0 3"], code: d`
              expect_var("grid", [[5, -1], [0, 3]])
              expect_output("""Rows: 4 3
              Columns: 5 2
              Diagonal: 8""")` },
            { input: ["4", "1 0 0 0", "2 2 0 0", "3 3 3 0", "4 4 4 4"], code: d`
              expect_output("""Rows: 1 4 9 16
              Columns: 10 9 7 4
              Diagonal: 10""")` },
          ],
        },
        {
          id: "6-7", boss: true, time: 630, title: "Merge the Ranks",
          story: "Two sorted columns of soldiers must merge into one sorted column, fast, without reshuffling everyone.",
          lesson: `<p>Merging two <b>already sorted</b> lists is a classic algorithm (it's the heart of <i>merge sort</i>). Keep one index for each list:</p>
            <ol><li>Compare <code>a[i]</code> and <code>b[j]</code>; append the smaller one and move <b>that</b> index forward.</li>
            <li>When one list runs out, append everything left in the other.</li></ol>
            <p>This takes one pass through the lists, which is much faster than sorting again when the lists are long.</p>`,
          example: d`
            a = [1, 4]
            b = [2, 3, 9]
            i = j = 0
            out = []
            while i < len(a) and j < len(b):
                if a[i] <= b[j]:
                    out.append(a[i]); i += 1
                else:
                    out.append(b[j]); j += 1
            print(out, "left over:", a[i:], b[j:])`,
          task: `Read two lines, each holding whole numbers in <b>ascending</b> order separated by spaces (a line may be empty).<br>
            Print all the numbers merged in ascending order, separated by spaces.<br>
            Don't use <code>sort()</code> or <code>sorted()</code>: use the two-index method.`,
          starter: d`
            a = []
            for x in input().split():
                a.append(int(x))
            b = []
            for x in input().split():
                b.append(int(x))
            `,
          sampleInput: "1 4 9\n2 3 10 11",
          solution: d`
            a = []
            for x in input().split():
                a.append(int(x))
            b = []
            for x in input().split():
                b.append(int(x))
            merged = []
            i = j = 0
            while i < len(a) and j < len(b):
                if a[i] <= b[j]:
                    merged.append(a[i])
                    i += 1
                else:
                    merged.append(b[j])
                    j += 1
            merged += a[i:] + b[j:]
            words = []
            for x in merged:
                words.append(str(x))
            print(" ".join(words))`,
          hints: ["i = j = 0, merged = []", "while i < len(a) and j < len(b): compare and append the smaller.", "After the loop: merged += a[i:] + b[j:]"],
          tests: [[["1 4 9", "2 3 10 11"], "1 2 3 4 9 10 11"], [["", "5 6"], "5 6"], [["1 1 2", "1 3"], "1 1 1 2 3"], [["-5 0 7", ""], "-5 0 7"], [["10 20 30", "1 2 3"], "1 2 3 10 20 30"]]
            .map(([inp, want]) => ({ input: inp, code: `must_not_call("sorted")\nmust_not_call("sort")\nexpect_output("""${want}""")\n` })),
        },
      ],
    },

    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "The Vault of Keys", topic: "dictionaries & sets", time: 480, icon: "🗝️",
      intro: "Every key opens exactly one lock. Learn to map keys to values.",
      missions: [
        {
          id: "7-1", title: "The Inventory",
          story: "The quartermaster's ledger maps every item to how many you have.",
          lesson: `<p>A <b>dictionary</b> maps <b>keys</b> to <b>values</b>: <code>inv = {"sword": 1, "potion": 3}</code>.</p>
            <ul><li><code>inv["potion"]</code> → 3 (error if the key is missing)</li>
            <li><code>inv.get("bow", 0)</code> → 0 if missing (safe)</li>
            <li><code>inv["bow"] = 2</code> adds or updates</li>
            <li><code>"bow" in inv</code>, <code>len(inv)</code>, <code>del inv["bow"]</code></li></ul>`,
          example: d`
            inv = {"sword": 1, "potion": 3}
            print(inv["potion"])        # 3
            print(inv.get("bow", 0))    # 0
            inv["bow"] = 1
            print(inv)`,
          sampleInput: "potion",
          task: `Using the given dictionary, read an item name and print how many there are (<b>0</b> if missing — use <code>.get</code>).<br>Then add <code>"shield"</code> with value <code>1</code> and print how many <b>different</b> items there are.`,
          starter: d`
            inventory = {"sword": 1, "potion": 3, "arrow": 20}
            item = input()
            `,
          solution: d`
            inventory = {"sword": 1, "potion": 3, "arrow": 20}
            item = input()
            print(inventory.get(item, 0))
            inventory["shield"] = 1
            print(len(inventory))`,
          hints: ["inventory.get(item, 0)", 'inventory["shield"] = 1', "len(inventory) counts keys"],
          tests: [
            { input: ["potion"], code: d`must_call("get")
              expect_output("3\n4")` },
            { input: ["dragon"], code: d`expect_output("0\n4")` },
            { input: ["arrow"], code: d`expect_output("20\n4")` },
          ],
        },
        {
          id: "7-2", title: "Count the Words",
          story: "The sorcerer's spell repeats some words. Count each to find its weakness.",
          lesson: `<p>Counting pattern: <code>counts[w] = counts.get(w, 0) + 1</code>.</p>
            <p>Loop over a dictionary: <code>for key, value in d.items():</code>. <code>sorted(d)</code> gives the keys in alphabetical order.</p>`,
          example: d`
            counts = {}
            for ch in "banana":
                counts[ch] = counts.get(ch, 0) + 1
            print(counts)                 # {'b': 1, 'a': 3, 'n': 2}
            for k in sorted(counts):
                print(k, counts[k])`,
          sampleInput: "the queen and the king and the knight",
          task: `Read a sentence. Count how many times each word appears. Print <code>word: count</code> for each word in <b>alphabetical order</b>.`,
          starter: d`
            words = input().split()
            counts = {}
            `,
          solution: d`
            words = input().split()
            counts = {}
            for w in words:
                counts[w] = counts.get(w, 0) + 1
            for w in sorted(counts):
                print(f"{w}: {counts[w]}")`,
          hints: ["counts[w] = counts.get(w, 0) + 1", 'for w in sorted(counts): print(f"{w}: {counts[w]}")'],
          tests: [
            { input: ["the queen and the king and the knight"], code: d`must_use("for")
              expect_output("and: 2\nking: 1\nknight: 1\nqueen: 1\nthe: 3")` },
            { input: ["go go go"], code: d`expect_output("go: 3")` },
          ],
        },
        {
          id: "7-3", title: "Common Allies",
          story: "Two rebel camps sent lists of fighters. Who belongs to both?",
          lesson: `<p>A <b>set</b> is an unordered collection with <b>no duplicates</b>: <code>s = {"a", "b"}</code> or <code>set(list)</code>.</p>
            <ul><li><code>a &amp; b</code> intersection (in both)</li><li><code>a | b</code> union (in either)</li><li><code>a - b</code> difference (in a, not b)</li></ul>`,
          example: d`
            a = set(["ann", "bo", "cy", "bo"])
            b = {"cy", "dee", "ann"}
            print(len(a))           # 3 (duplicate removed)
            print(sorted(a & b))    # ['ann', 'cy']
            print(sorted(a - b))    # ['bo']`,
          sampleInput: "ann bo cy dee\ncy eve ann",
          task: `Read two lines of names (space-separated). Print the names in <b>both</b> lines, sorted alphabetically and joined by <code>", "</code>. If there are none, print <code>No allies</code>.`,
          starter: d`
            camp1 = set(input().split())
            camp2 = set(input().split())
            `,
          solution: d`
            camp1 = set(input().split())
            camp2 = set(input().split())
            both = camp1 & camp2
            if both:
                print(", ".join(sorted(both)))
            else:
                print("No allies")`,
          hints: ["both = camp1 & camp2", '", ".join(sorted(both))', "An empty set counts as False in an if."],
          tests: [
            { input: ["ann bo cy dee", "cy eve ann"], code: d`expect_output("ann, cy")` },
            { input: ["x y", "z"], code: d`expect_output("No allies")` },
            { input: ["mo mo li", "li mo mo"], code: d`expect_output("li, mo")` },
          ],
        },
        {
          id: "7-4", type: "quiz", title: "Riddles of the Vault",
          story: "The vault's lock asks questions about keys. Answer wrong and it shuffles its tumblers.",
          lesson: `<ul><li>Dictionary keys are <b>unique</b>: assigning to an existing key replaces its value.</li>
            <li><code>key in d</code> checks the <b>keys</b>, not the values.</li>
            <li><code>d.get(key, default)</code> never raises an error.</li>
            <li><code>{}</code> is an empty <b>dict</b>. An empty set is written <code>set()</code>.</li>
            <li>Sets keep only unique items and have <b>no order</b>. Set maths: <code>a | b</code> union, <code>a &amp; b</code> intersection, <code>a - b</code> difference.</li>
            <li>Keys must be <b>immutable</b> (strings, numbers, tuples). A list can't be a key.</li></ul>`,
          example: d`
            d = {"gold": 5}
            d["gold"] = 7          # replaces
            d["gems"] = d.get("gems", 0) + 1
            print(d, "gold" in d, 7 in d)
            a, b = {1, 2, 3}, {3, 4}
            print(a | b, a & b, a - b)`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                d = {"a": 1, "b": 2, "a": 3}
                print(d, len(d))`,
              choices: ["{'a': 3, 'b': 2} 2", "{'a': 1, 'b': 2, 'a': 3} 3", "{'a': 1, 'b': 2} 2", "{'b': 2, 'a': 3} 2"], answer: 0,
              explain: "A repeated key keeps its first position but takes the last value." },
            { q: "What does this print?", predict: true, code: d`
                d = {"gold": 5}
                print("gold" in d, 5 in d, d.get("silver", 0))`,
              choices: ["True True 0", "True False 0", "True False None", "False False 0"], answer: 1,
              explain: "<code>in</code> looks at keys only, and <code>get</code> returns the default for a missing key." },
            { q: "What does this print?", predict: true, code: d`
                print(type({}), len({1, 1, 2, 2, 3}))`,
              choices: ["<class 'set'> 3", "<class 'dict'> 5", "<class 'dict'> 3", "<class 'set'> 5"], answer: 2,
              explain: "<code>{}</code> is an empty dict. The set drops the duplicates, keeping 1, 2, 3." },
            { q: "What does this print?", predict: true, code: d`
                a = {1, 2, 3}
                b = {2, 3, 4}
                print(sorted(a | b), sorted(a & b), sorted(a - b))`,
              choices: ["[1, 2, 3, 4] [2, 3] [1]", "[1, 2, 3, 4] [2, 3] [1, 4]", "[2, 3] [1, 2, 3, 4] [1]", "[1, 2, 3, 2, 3, 4] [2, 3] [1]"], answer: 0,
              explain: "<code>|</code> is everything, <code>&amp;</code> is what both share, <code>a - b</code> is what only <code>a</code> has." },
            { q: "What does this print?", predict: true, code: d`
                stock = {"apple": 2}
                stock["apple"] += 3
                stock["pear"] = stock.get("pear", 0) + 1
                print(stock)`,
              choices: ["{'apple': 5, 'pear': 1}", "{'apple': 23, 'pear': 1}", "{'apple': 5}", "KeyError"], answer: 0,
              explain: "<code>+=</code> works on an existing key; <code>get(..., 0)</code> safely starts a new counter." },
            { q: "Which of these can <b>not</b> be a dictionary key?",
              choices: ["<code>\"name\"</code>", "<code>42</code>", "<code>(1, 2)</code>", "<code>[1, 2]</code>"], answer: 3,
              explain: "Keys must be immutable (hashable). Lists can change, so they can't be keys. Use a tuple instead." },
          ],
        },
        {
          id: "7-5", title: "The Grade Book",
          story: "The knights' academy keeps every test score in one long scroll. The headmaster wants a summary per student.",
          lesson: `<p>A dictionary's values can be <b>lists</b>: one list of scores per name. This is called <b>grouping</b>, and you'll do it all the time with data.</p>
            <ul><li>Start a list the first time you see a key: <code>if name not in book: book[name] = []</code></li>
            <li>Or in one step: <code>book.setdefault(name, []).append(score)</code></li>
            <li><code>for name in sorted(book):</code> goes through the keys alphabetically</li></ul>`,
          example: d`
            book = {}
            for line in ["ann 3", "bob 5", "ann 9"]:
                name, score = line.split()
                book.setdefault(name, []).append(int(score))
            print(book)
            for name in sorted(book):
                scores = book[name]
                print(name, sum(scores) / len(scores), max(scores))`,
          task: `Read lines like <code>lyra 80</code> until a line that is <code>end</code>.<br>
            For every student, in alphabetical order, print <code>name: avg A, best B, tests N</code> with the average to <b>1 decimal</b>.<br>
            Example: <code>lyra: avg 87.5, best 95, tests 2</code>`,
          starter: d`
            book = {}
            `,
          sampleInput: "lyra 80\norin 72\nlyra 95\norin 64\nmira 100\nend",
          solution: d`
            book = {}
            line = input()
            while line != "end":
                name, score = line.split()
                book.setdefault(name, []).append(int(score))
                line = input()
            for name in sorted(book):
                scores = book[name]
                print(f"{name}: avg {sum(scores) / len(scores):.1f}, best {max(scores)}, tests {len(scores)}")`,
          hints: ["Loop: line = input(); while line != \"end\": ...; line = input()", "name, score = line.split() then convert score with int().", "f\"{name}: avg {avg:.1f}, best {max(scores)}, tests {len(scores)}\""],
          tests: [
            { input: ["lyra 80", "orin 72", "lyra 95", "orin 64", "mira 100", "end"], code: d`
              expect_output("""lyra: avg 87.5, best 95, tests 2
              mira: avg 100.0, best 100, tests 1
              orin: avg 68.0, best 72, tests 2""")` },
            { input: ["zed 1", "zed 2", "zed 4", "amy 50", "end"], code: d`
              expect_output("""amy: avg 50.0, best 50, tests 1
              zed: avg 2.3, best 4, tests 3""")` },
            { input: ["end"], code: `expect_output("")\n` },
          ],
        },
        {
          id: "7-6", boss: true, time: 720, title: "The Anagram Council",
          story: "Spies hide their names by shuffling letters. Group every name that uses the same letters, and the spy rings are exposed.",
          lesson: `<p>Two words are <b>anagrams</b> when they use exactly the same letters: <i>listen</i> and <i>silent</i>.</p>
            <p>The trick is a <b>signature</b> that's identical for all anagrams: the letters in sorted order. <code>"".join(sorted("silent"))</code> → <code>"eilnst"</code>.</p>
            <p>Use the signature as a dictionary key and collect the words in a list. Dictionaries remember the order keys were first added, so groups come out in order of first appearance.</p>`,
          example: d`
            groups = {}
            for w in ["tea", "bat", "eat", "tab", "ate"]:
                key = "".join(sorted(w))
                groups.setdefault(key, []).append(w)
            print(groups)`,
          task: `Read a line of words separated by spaces (each word appears once). Group the anagrams, ignoring upper/lower case, and print the words in <b>lowercase</b>.<br>
            Print each group of <b>2 or more</b> words on its own line, words in the order they appeared, joined by <code>", "</code>. Groups appear in order of their first word.<br>
            If there are no groups, print <code>No anagrams</code>.`,
          starter: d`
            words = input().split()
            `,
          sampleInput: "Listen silent enlist google tinsel banana inlets gogole",
          solution: d`
            words = input().split()
            groups = {}
            for w in words:
                w = w.lower()
                key = "".join(sorted(w))
                groups.setdefault(key, []).append(w)
            found = False
            for members in groups.values():
                if len(members) >= 2:
                    print(", ".join(members))
                    found = True
            if not found:
                print("No anagrams")`,
          hints: ["key = \"\".join(sorted(word.lower()))", "groups.setdefault(key, []).append(word.lower())", "Loop over groups.values() and only print lists with len >= 2."],
          tests: [
            { input: ["Listen silent enlist google tinsel banana inlets gogole"], code: d`
              expect_output("""listen, silent, enlist, tinsel, inlets
              google, gogole""")` },
            { input: ["one two three"], code: `expect_output("No anagrams")\n` },
            { input: ["Stop pots arc car tops CAR2 Opts rac"], code: d`
              expect_output("""stop, pots, tops, opts
              arc, car, rac""")` },
          ],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 17, name: "The Hall of Many Paths", topic: "iterables, walking dictionaries, unpacking & one-way iterators", time: 480, icon: "🛤️",
      intro: "Every loop you've written walked down a path: a string, a list, a range. In this hall you learn what a path really is, and the tricks for walking it.",
      missions: [
        {
          id: "17-1", title: "Anything Can Be Walked",
          story: "The hall has many paths: paths of letters, of words, of numbers. One kind of loop walks them all.",
          lesson: `<p>An <b>iterable</b> is anything a <code>for</code> loop can walk through, one item at a time:</p>
            <ul><li>a <b>string</b> gives its letters: <code>for ch in "abc"</code></li>
            <li>a <b>list</b> or <b>tuple</b> gives its items, in order</li>
            <li>a <b>set</b> gives its items in no particular order</li>
            <li>a <b>dictionary</b> gives its <b>keys</b></li>
            <li><code>range(5)</code> gives 0, 1, 2, 3, 4</li></ul>
            <p>Many built-ins accept <b>any</b> iterable: <code>list()</code>, <code>set()</code>, <code>sorted()</code>, <code>sum()</code>, <code>min()</code>, <code>max()</code>, <code>reversed()</code>, <code>"-".join()</code>, and the <code>in</code> test. An <code>int</code> is <b>not</b> iterable: <code>for x in 42</code> is a TypeError.</p>`,
          example: d`
            print(list("cat"))              # ['c', 'a', 't']
            print(sorted({3, 1, 2}))         # [1, 2, 3]
            print("-".join("abc"))           # a-b-c   (join walks the string)
            print(list(reversed([1, 2, 3]))) # [3, 2, 1]
            print("a" in "banana", 4 in range(5))`,
          sampleInput: "Dragon cave gold",
          task: `Read a line of words. Print four lines:<br>
            1. the letters of the <b>first</b> word joined by <code>-</code><br>
            2. the words in <b>reverse</b> order, joined by spaces<br>
            3. all the <b>distinct</b> letters used in the whole line, lowercased, sorted, joined with nothing between them<br>
            4. the total number of letters (spaces don't count)`,
          starter: d`
            words = input().split()
            `,
          solution: d`
            words = input().split()
            print("-".join(words[0]))
            print(" ".join(reversed(words)))
            letters = "".join(words)
            print("".join(sorted(set(letters.lower()))))
            print(len(letters))`,
          hints: ["\"-\".join(word) walks the word letter by letter", "\" \".join(reversed(words))", "\"\".join(words) glues the words; set(...) keeps each letter once; sorted(...) orders them"],
          tests: [
            { input: ["Dragon cave gold"], code: d`expect_output("D-r-a-g-o-n\ngold cave Dragon\nacdeglnorv\n14")` },
            { input: ["Hi"], code: d`expect_output("H-i\nHi\nhi\n2")` },
            { input: ["aa AB ba"], code: d`expect_output("a-a\nba AB aa\nab\n6")` },
          ],
        },
        {
          id: "17-2", title: "Walking the Treasury",
          story: "The treasurer keeps a dictionary of who holds how much gold. Walk it three ways: by keys, by values, and by pairs.",
          lesson: `<p>Walking a dictionary:</p>
            <ul><li><code>for name in chest:</code> walks the <b>keys</b> (same as <code>chest.keys()</code>)</li>
            <li><code>for gold in chest.values():</code> walks the <b>values</b></li>
            <li><code>for name, gold in chest.items():</code> walks <b>(key, value) pairs</b>, unpacked into two names</li></ul>
            <p>Dictionaries keep the order in which keys were added. <code>sum(chest.values())</code> adds all the values.</p>`,
          example: d`
            chest = {"ann": 30, "bo": 12}
            for name in chest:
                print(name)
            print(sum(chest.values()))
            for name, gold in chest.items():
                print(name, "has", gold)`,
          sampleInput: "ann:30 bo:12 cy:30 dee:5",
          task: `Read a line of <code>name:gold</code> entries. Build a dictionary (gold as an int), then print:<br>
            <code>Names: ann, bo, cy, dee</code> (in the order given)<br>
            <code>Total: 77</code><br>
            <code>Richest: ann</code> (the first one with the most gold)<br>
            <code>Above average: ann, cy</code> (gold strictly above the average, in order; or <code>Above average: none</code>)<br>
            Walk the dictionary with <code>.items()</code> or <code>.values()</code> somewhere.`,
          starter: d`
            chest = {}
            for entry in input().split():
                name, gold = entry.split(":")
                chest[name] = int(gold)
            `,
          solution: d`
            chest = {}
            for entry in input().split():
                name, gold = entry.split(":")
                chest[name] = int(gold)
            print("Names: " + ", ".join(chest))
            total = sum(chest.values())
            print("Total:", total)
            richest = None
            for name, gold in chest.items():
                if richest is None or gold > chest[richest]:
                    richest = name
            print("Richest:", richest)
            average = total / len(chest)
            above = []
            for name, gold in chest.items():
                if gold > average:
                    above.append(name)
            print("Above average: " + (", ".join(above) if above else "none"))`,
          hints: ["\", \".join(chest) walks the keys", "sum(chest.values())", "for name, gold in chest.items(): keep the name whose gold is biggest (use > so the first one wins a tie)", "average = total / len(chest)"],
          tests: [
            { input: ["ann:30 bo:12 cy:30 dee:5"], code: d`
              assert ".items()" in __code__ or ".values()" in __code__, "Walk the dictionary with .items() or .values()."
              expect_output("Names: ann, bo, cy, dee\nTotal: 77\nRichest: ann\nAbove average: ann, cy")` },
            { input: ["kit:7"], code: d`expect_output("Names: kit\nTotal: 7\nRichest: kit\nAbove average: none")` },
            { input: ["a:1 b:9 c:9 d:1"], code: d`expect_output("Names: a, b, c, d\nTotal: 20\nRichest: b\nAbove average: b, c")` },
          ],
        },
        {
          id: "17-3", title: "Unpack the Bundle",
          story: "The race results arrive as one long line. Unpack it: the winner, the last runner, and everyone in between.",
          lesson: `<p><b>Unpacking</b> spreads an iterable over several names:</p>
            <ul><li><code>a, b = (3, 4)</code> · swap: <code>a, b = b, a</code></li>
            <li>in loops: <code>for name, score in [("ann", 3), ("bo", 5)]:</code></li>
            <li>a <b>star</b> collects "the rest" into a list: <code>first, *rest = items</code>, <code>*init, last = items</code>, <code>first, *middle, last = items</code></li>
            <li>a star in a call spreads items as arguments: <code>print(*items, sep=", ")</code></li></ul>
            <p>The number of names must match, unless one of them has a star.</p>`,
          example: d`
            first, *rest = "abcd"
            print(first, rest)               # a ['b', 'c', 'd']
            head, *middle, tail = [1, 2, 3, 4]
            print(head, middle, tail)        # 1 [2, 3] 4
            print(*[1, 2, 3], sep=" > ")     # 1 > 2 > 3`,
          sampleInput: "Mara Bo Kit Elsa Tam",
          task: `Read the runners' names in finishing order (at least 2). Using star unpacking, print:<br>
            <code>Winner: Mara</code><br><code>Last: Tam</code><br>
            <code>Middle: Bo, Kit, Elsa</code> (or <code>Middle: none</code>)<br>
            and finally all the names joined by <code> &gt; </code>, using <code>print(*names, sep=" > ")</code>.`,
          starter: d`
            names = input().split()
            `,
          solution: d`
            names = input().split()
            winner, *middle, last = names
            print("Winner:", winner)
            print("Last:", last)
            print("Middle: " + (", ".join(middle) if middle else "none"))
            print(*names, sep=" > ")`,
          hints: ["winner, *middle, last = names", "middle is always a list (maybe empty)", "print(*names, sep=\" > \")"],
          tests: [
            { input: ["Mara Bo Kit Elsa Tam"], code: d`
              import ast
              assert any(isinstance(n, ast.Starred) for n in ast.walk(ast.parse(__code__))), "Use star unpacking, like winner, *middle, last = names."
              expect_output("Winner: Mara\nLast: Tam\nMiddle: Bo, Kit, Elsa\nMara > Bo > Kit > Elsa > Tam")` },
            { input: ["Ann Bo"], code: d`expect_output("Winner: Ann\nLast: Bo\nMiddle: none\nAnn > Bo")` },
            { input: ["X Y Z"], code: d`expect_output("Winner: X\nLast: Z\nMiddle: Y\nX > Y > Z")` },
          ],
        },
        {
          id: "17-4", title: "The One-Way Path",
          story: "Some paths crumble behind you: walk them once and they're gone. The scouts must read the heading first, then the rest.",
          lesson: `<p><code>iter(x)</code> turns any iterable into an <b>iterator</b>: a one-way path that remembers where it is. <code>next(it)</code> takes the next item; <code>next(it, default)</code> returns the default instead of crashing when the path is empty. A <code>for</code> loop over the iterator carries on from where <code>next</code> stopped.</p>
            <p>Iterators can be walked <b>only once</b>. <code>reversed()</code>, <code>zip()</code>, <code>enumerate()</code> and file lines all behave like this: a second loop finds nothing. If you need the items twice, make a list first: <code>items = list(it)</code>.</p>`,
          example: d`
            it = iter(["title", 4, 5])
            print(next(it))        # title
            for x in it:
                print(x)           # 4, then 5
            print(next(it, "empty"))
            r = reversed([1, 2, 3])
            print(list(r), list(r))   # [3, 2, 1] []`,
          sampleInput: "harvest 4 7 1 8",
          task: `Read a line: the first word is a heading, the rest are whole numbers. With <code>it = iter(words)</code>, take the heading with <code>next</code>, then loop over the <b>rest of the same iterator</b>. Print the heading in capitals, then <code>Count: n</code>, <code>Total: t</code> and <code>Largest: m</code> (or <code>Largest: none</code> when there are no numbers).`,
          starter: d`
            words = input().split()
            it = iter(words)
            `,
          solution: d`
            words = input().split()
            it = iter(words)
            heading = next(it)
            count, total, largest = 0, 0, None
            for w in it:
                n = int(w)
                count += 1
                total += n
                if largest is None or n > largest:
                    largest = n
            print(heading.upper())
            print("Count:", count)
            print("Total:", total)
            print("Largest:", "none" if largest is None else largest)`,
          hints: ["heading = next(it)", "for w in it: continues after the heading", "Keep count, total and largest as you go; largest starts as None"],
          tests: [
            { input: ["harvest 4 7 1 8"], code: d`
              assert "next(" in __code__, "Take the heading with next(it)."
              expect_output("HARVEST\nCount: 4\nTotal: 20\nLargest: 8")` },
            { input: ["empty"], code: d`expect_output("EMPTY\nCount: 0\nTotal: 0\nLargest: none")` },
            { input: ["debts -5 -2 -9"], code: d`expect_output("DEBTS\nCount: 3\nTotal: -16\nLargest: -2")` },
          ],
        },
        {
          id: "17-5", type: "quiz", title: "Riddles of the Paths",
          story: "The pathfinders' riddles about iterables.",
          lesson: `<p>Know what each iterable gives you (letters, items, keys), what unpacking does with the leftovers, and which paths can be walked only once.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                d = {"a": 1, "b": 2}
                print(list(d), sum(d.values()))`,
              choices: ["['a', 'b'] 3", "[1, 2] 3", "[('a', 1), ('b', 2)] 3", "['a', 'b'] ab"], answer: 0,
              explain: "Walking a dictionary gives its keys; .values() gives the values." },
            { q: "What does this print?", predict: true, code: d`
                first, *rest = "abc"
                print(first, rest)`,
              choices: ["a ['b', 'c']", "a bc", "['a'] ['b', 'c']", "a ('b', 'c')"], answer: 0,
              explain: "The starred name always collects a list." },
            { q: "What does this print?", predict: true, code: d`
                r = reversed([1, 2, 3])
                print(list(r), list(r))`,
              choices: ["[3, 2, 1] []", "[3, 2, 1] [3, 2, 1]", "[3, 2, 1] [1, 2, 3]", "[] []"], answer: 0,
              explain: "reversed() returns an iterator: once walked, it's empty." },
            { q: "Which of these is <b>not</b> iterable?",
              choices: ["42", "\"42\"", "[42]", "range(42)"], answer: 0,
              explain: "An int is a single value. for x in 42 raises TypeError: 'int' object is not iterable." },
            { q: "What does this print?", predict: true, code: d`
                a, b = 1, 2
                a, b = b, a + b
                print(a, b)`,
              choices: ["2 3", "2 4", "1 3", "3 3"], answer: 0,
              explain: "The right side is computed first (2 and 3), then both names are assigned at once." },
            { q: "What does this print?", predict: true, code: d`
                it = iter([10, 20])
                print(next(it), next(it), next(it, "done"))`,
              choices: ["10 20 done", "10 10 10", "10 20 20", "an error"], answer: 0,
              explain: "next with a default returns the default when the iterator is used up." },
          ],
        },
        {
          id: "17-6", boss: true, time: 720, title: "The Treasure Map",
          story: "An old map lists places and the coins buried in each. Read it line by line, total each place, and trace the route.",
          lesson: `<p>Everything from this hall at once: walk the lines, <b>unpack</b> each one into a place and the rest (<code>place, *coins = line.split()</code>), walk a dictionary's <b>items</b>, and spread a list into <code>print</code> with a star.</p>`,
          example: d`
            line = "cave 5 10 3"
            place, *coins = line.split()
            print(place, coins)        # cave ['5', '10', '3']
            total = 0
            for c in coins:
                total += int(c)
            print(total)`,
          sampleInput: "Old Pirate Map\ncave 5 10 3\nriver\ntower 7 11\nend",
          task: `The first line is the map's name. Each following line is a place followed by its coins (maybe none), until a line <code>end</code>. Print:<br>
            <code>== Old Pirate Map ==</code><br>
            one line per place, in order: <code>cave: 18</code><br>
            <code>Best: tower (18)</code>: the place with the most coins (the <b>last</b> one wins a tie, so ties go to deeper places)<br>
            <code>Route: cave &gt; river &gt; tower</code><br>
            If there are no places, print <code>No treasure</code> after the title instead.`,
          starter: d`
            title = input()
            places = {}
            `,
          solution: d`
            title = input()
            places = {}
            while True:
                line = input()
                if line == "end":
                    break
                place, *coins = line.split()
                total = 0
                for c in coins:
                    total += int(c)
                places[place] = total
            print(f"== {title} ==")
            if not places:
                print("No treasure")
            else:
                best = None
                for place, total in places.items():
                    print(f"{place}: {total}")
                    if best is None or total >= places[best]:
                        best = place
                print(f"Best: {best} ({places[best]})")
                print("Route: " + " > ".join(places))`,
          hints: ["while True: line = input(); stop at \"end\"", "place, *coins = line.split(); coins is a list of strings", "Use >= when comparing so the last place wins a tie", "print(\"Route: \" + \" > \".join(places)) or print with a star"],
          tests: [
            { input: ["Old Pirate Map", "cave 5 10 3", "river", "tower 7 11", "end"], code: d`expect_output("== Old Pirate Map ==\ncave: 18\nriver: 0\ntower: 18\nBest: tower (18)\nRoute: cave > river > tower")` },
            { input: ["Blank", "end"], code: d`expect_output("== Blank ==\nNo treasure")` },
            { input: ["Isle", "beach 1", "hill 9 9", "dock 2 2 2", "end"], code: d`expect_output("== Isle ==\nbeach: 1\nhill: 18\ndock: 6\nBest: hill (18)\nRoute: beach > hill > dock")` },
          ],
        },
      ],
    },
    {
      id: 8, name: "The Spell Workshop", topic: "functions, parameters, return & recursion", time: 540, icon: "🪄",
      intro: "Write a spell once, cast it forever. Functions are reusable magic.",
      missions: [
        {
          id: "8-1", title: "Your First Spell",
          story: "The workshop master asks you to write two simple, reusable spells.",
          lesson: `<p>A <b>function</b> is a named, reusable block: <code>def name(parameters):</code>. Call it with <code>name(arguments)</code>.</p>
            <p><code>return</code> sends a value <b>back</b> to the caller — different from <code>print</code>, which only shows it. A function without <code>return</code> returns <code>None</code>.</p>`,
          example: d`
            def add(a, b):
                return a + b

            result = add(2, 3)
            print(result)          # 5
            print(add(10, -1))     # 9`,
          task: `Write <code>double(n)</code> that <b>returns</b> n × 2, and <code>greet(name)</code> that <b>returns</b> <code>"Hello, NAME!"</code> (e.g. <code>greet("Ada")</code> → <code>"Hello, Ada!"</code>).`,
          starter: d`
            def double(n):
                pass

            def greet(name):
                pass

            print(double(4))
            print(greet("Ada"))`,
          solution: d`
            def double(n):
                return n * 2

            def greet(name):
                return f"Hello, {name}!"

            print(double(4))
            print(greet("Ada"))`,
          hints: ["Replace pass with return n * 2", 'return f"Hello, {name}!"', "Use return, not print, inside the function."],
          tests: [{ code: d`
            double = expect_func("double")
            greet = expect_func("greet")
            expect_equal(double(4), 8, "double(4)")
            expect_equal(double(-3), -6, "double(-3)")
            expect_equal(double(0), 0, "double(0)")
            expect_equal(greet("Ada"), "Hello, Ada!", 'greet("Ada")')
            expect_equal(greet("Lyra"), "Hello, Lyra!", 'greet("Lyra")')` }],
        },
        {
          id: "8-2", title: "Default Powers",
          story: "Some spells have a usual strength unless you say otherwise.",
          lesson: `<p>Parameters can have <b>default values</b>: <code>def f(x, times=2):</code> — callers may skip <code>times</code>.</p>
            <p>You can pass arguments by name (<b>keyword arguments</b>): <code>f(5, times=3)</code>.</p>`,
          example: d`
            def repeat(word, times=2, sep=" "):
                return sep.join([word] * times)

            print(repeat("hi"))              # hi hi
            print(repeat("ho", 3))           # ho ho ho
            print(repeat("ha", sep="-"))     # ha-ha`,
          task: `Write <code>make_title(name, rank="Knight")</code> returning <code>"RANK NAME"</code> (e.g. <code>"Knight Arin"</code>),<br>and <code>power(base, exp=2)</code> returning <code>base ** exp</code>.`,
          starter: d`
            def make_title(name, rank="Knight"):
                pass

            def power(base, exp=2):
                pass
            `,
          solution: d`
            def make_title(name, rank="Knight"):
                return f"{rank} {name}"

            def power(base, exp=2):
                return base ** exp`,
          hints: ['return f"{rank} {name}"', "return base ** exp"],
          tests: [{ code: d`
            mt = expect_func("make_title")
            pw = expect_func("power")
            expect_equal(mt("Arin"), "Knight Arin", 'make_title("Arin")')
            expect_equal(mt("Lyra", "Queen"), "Queen Lyra", 'make_title("Lyra", "Queen")')
            expect_equal(mt("Bo", rank="Squire"), "Squire Bo", 'make_title("Bo", rank="Squire")')
            expect_equal(pw(5), 25, "power(5)")
            expect_equal(pw(2, 10), 1024, "power(2, 10)")
            expect_equal(pw(3, exp=3), 27, "power(3, exp=3)")` }],
        },
        {
          id: "8-3", title: "The Scout's Report",
          story: "A scout must report the weakest, strongest, and average enemy — without magic shortcuts.",
          lesson: `<p>A function can return several values as a <b>tuple</b>: <code>return a, b</code> → unpack with <code>x, y = f()</code>.</p>
            <p>Variables created inside a function are <b>local</b> — they disappear when it returns. <code>round(x, 2)</code> rounds to 2 decimals.</p>`,
          example: d`
            def first_last(items):
                if not items:
                    return None
                return items[0], items[-1]

            a, b = first_last([4, 5, 6])
            print(a, b)              # 4 6
            print(first_last([]))    # None`,
          task: `Write <code>scout(nums)</code> returning a tuple <code>(smallest, largest, average)</code> with the average rounded to 2 decimals.<br>Return <code>None</code> for an empty list. <b>Do not use <code>min()</code> or <code>max()</code></b> — find them with a loop.`,
          starter: d`
            def scout(nums):
                pass
            `,
          solution: d`
            def scout(nums):
                if not nums:
                    return None
                low = high = nums[0]
                total = 0
                for n in nums:
                    if n < low:
                        low = n
                    if n > high:
                        high = n
                    total += n
                return low, high, round(total / len(nums), 2)`,
          hints: ["Start low and high at nums[0].", "Loop and update low/high when you find a smaller/larger number.", "return low, high, round(total / len(nums), 2)"],
          tests: [{ code: d`
            must_not_call("min")
            must_not_call("max")
            s = expect_func("scout")
            expect_equal(s([3, 9, 1, 4]), (1, 9, 4.25), "scout([3, 9, 1, 4])")
            expect_equal(s([5]), (5, 5, 5.0), "scout([5])")
            expect_equal(s([-2, -8, 1]), (-8, 1, -3.0), "scout([-2, -8, 1])")
            expect_equal(s([1, 2]), (1, 2, 1.5), "scout([1, 2])")
            expect_equal(s([]), None, "scout([])")` }],
        },
        {
          id: "8-4", title: "Echoes",
          story: "In the echo chamber, every spell calls a smaller copy of itself.",
          lesson: `<p>A <b>recursive</b> function calls itself on a smaller problem. It needs:</p>
            <ol><li>a <b>base case</b> that stops (e.g. <code>n == 0</code>)</li><li>a <b>recursive case</b> that moves toward it</li></ol>`,
          example: d`
            def count_down(n):
                if n == 0:          # base case
                    print("Go!")
                    return
                print(n)
                count_down(n - 1)   # smaller problem

            count_down(3)`,
          task: `Write recursive <code>factorial(n)</code> (<code>factorial(0) = 1</code>, <code>factorial(n) = n × factorial(n-1)</code>)<br>and recursive <code>sum_digits(n)</code> for n ≥ 0 (e.g. <code>sum_digits(472) = 13</code>).`,
          starter: d`
            def factorial(n):
                pass

            def sum_digits(n):
                pass
            `,
          solution: d`
            def factorial(n):
                if n == 0:
                    return 1
                return n * factorial(n - 1)

            def sum_digits(n):
                if n < 10:
                    return n
                return n % 10 + sum_digits(n // 10)`,
          hints: ["Base case for factorial: if n == 0: return 1", "Last digit: n % 10, the rest: n // 10", "return n % 10 + sum_digits(n // 10)"],
          tests: [{ code: d`
            is_recursive("factorial")
            is_recursive("sum_digits")
            f = expect_func("factorial")
            sd = expect_func("sum_digits")
            expect_equal(f(0), 1, "factorial(0)")
            expect_equal(f(5), 120, "factorial(5)")
            expect_equal(f(10), 3628800, "factorial(10)")
            expect_equal(sd(472), 13, "sum_digits(472)")
            expect_equal(sd(0), 0, "sum_digits(0)")
            expect_equal(sd(99999), 45, "sum_digits(99999)")` }],
        },
        {
          id: "8-5", title: "Spells of Many Arguments",
          story: "Some spells take one ingredient, some take twenty. The workshop needs spells that accept any number.",
          lesson: `<ul><li><code>def f(*args)</code> collects any number of <b>positional</b> arguments into a <b>tuple</b> called <code>args</code>.</li>
            <li><code>def f(**kwargs)</code> collects any number of <b>keyword</b> arguments into a <b>dict</b> (in the order they were given).</li>
            <li>Parameters after a lone <code>*</code> are <b>keyword-only</b>: <code>def f(name, *, level=1)</code> must be called as <code>f("A", level=3)</code>. <code>f("A", 3)</code> raises <code>TypeError</code>. Keyword-only parameters make calls easier to read.</li>
            <li>The stars also work when <b>calling</b>: <code>f(*my_list)</code> spreads a list into separate arguments, <code>f(**my_dict)</code> spreads a dict into keyword arguments.</li></ul>`,
          example: d`
            def show(*args, **kwargs):
                print("args:", args)
                print("kwargs:", kwargs)

            show(1, 2, color="red", size=3)
            nums = [4, 5]
            show(*nums)
            def tag(text, *, bold=False):
                return f"<b>{text}</b>" if bold else text
            print(tag("hi", bold=True))`,
          task: `Write three functions:<br>
            • <code>total(*nums)</code> → the sum of all its arguments (<code>0</code> when called with none)<br>
            • <code>describe(name, **traits)</code> → each trait written as <code>key=value</code>, in the order given, separated by <code>", "</code> and in brackets after the name: <code>describe("Lyra", age=19, job="archer")</code> → <code>"Lyra (age=19, job=archer)"</code>. With no traits, return just the name.<br>
            • <code>make_hero(name, *, level=1)</code> → <code>"NAME (level L)"</code>, where <code>level</code> is <b>keyword-only</b>.`,
          starter: d`
            def total(*nums):
                pass

            def describe(name, **traits):
                pass

            def make_hero(name, level=1):
                pass
            `,
          solution: d`
            def total(*nums):
                result = 0
                for n in nums:
                    result += n
                return result

            def describe(name, **traits):
                if not traits:
                    return name
                parts = []
                for k, v in traits.items():
                    parts.append(f"{k}={v}")
                return f"{name} ({', '.join(parts)})"

            def make_hero(name, *, level=1):
                return f"{name} (level {level})"`,
          hints: ["Inside total, nums is a tuple: loop over it or use sum(nums).", "traits is a dict: build \"key=value\" strings from traits.items().", "Put a lone * before level: def make_hero(name, *, level=1)"],
          tests: [{ code: d`
            total = expect_func("total"); describe = expect_func("describe"); make_hero = expect_func("make_hero")
            expect_equal(total(), 0, "total()")
            expect_equal(total(5), 5, "total(5)")
            expect_equal(total(1, 2, 3, 4), 10, "total(1, 2, 3, 4)")
            expect_equal(total(*[10, 20]), 30, "total(*[10, 20])")
            expect_equal(describe("Lyra", age=19, job="archer"), "Lyra (age=19, job=archer)", 'describe("Lyra", age=19, job="archer")')
            expect_equal(describe("Orin"), "Orin", 'describe("Orin")')
            expect_equal(describe("Mira", hp=5), "Mira (hp=5)", 'describe("Mira", hp=5)')
            expect_equal(describe(**{"name": "Zed", "speed": 9}), "Zed (speed=9)", 'describe(**{"name": "Zed", "speed": 9})')
            expect_equal(make_hero("Arin"), "Arin (level 1)", 'make_hero("Arin")')
            expect_equal(make_hero("Arin", level=4), "Arin (level 4)", 'make_hero("Arin", level=4)')
            expect_raises(TypeError, make_hero, "Arin", 4)` }],
        },
        {
          id: "8-6", type: "quiz", title: "Riddles of Scope",
          story: "The workshop's old spellbook is full of tricky spells. Predict what each one does before you cast it.",
          lesson: `<ul><li>Variables created inside a function are <b>local</b>: they disappear when the function ends and never change a global variable with the same name (unless you write <code>global x</code>, which is best avoided).</li>
            <li>A function without <code>return</code> returns <code>None</code>.</li>
            <li><code>return</code> ends the function immediately, even in the middle of a loop.</li>
            <li><b>Default values are created once</b>, when the function is defined. A mutable default like <code>bag=[]</code> is shared between calls! Use <code>bag=None</code> and create the list inside.</li>
            <li>A function can create and return another function that remembers the variables around it. This is called a <b>closure</b>.</li></ul>`,
          example: d`
            def add_item(item, bag=None):
                if bag is None:
                    bag = []          # a fresh list every call
                bag.append(item)
                return bag

            print(add_item("a"), add_item("b"))

            def make_adder(k):
                def add(x):
                    return x + k      # remembers k
                return add

            plus5 = make_adder(5)
            print(plus5(10))`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                x = 10
                def change():
                    x = 99
                change()
                print(x)`,
              choices: ["10", "99", "None", "NameError"], answer: 0,
              explain: "The <code>x</code> inside the function is a new local variable. The global <code>x</code> is untouched." },
            { q: "What does this print?", predict: true, code: d`
                def add_item(item, bag=[]):
                    bag.append(item)
                    return bag
                print(add_item("sword"))
                print(add_item("shield"))`,
              choices: ["['sword']\n['shield']", "['sword']\n['sword', 'shield']", "['sword', 'shield']\n['sword', 'shield']", "None\nNone"], answer: 1,
              explain: "The default list is created only once and reused, so it remembers \"sword\". Use <code>bag=None</code> instead." },
            { q: "What does this print?", predict: true, code: d`
                def greet(name):
                    print("Hi", name)
                result = greet("Ada")
                print(result)`,
              choices: ["Hi Ada\nHi Ada", "Hi Ada\nNone", "None", "Hi Ada"], answer: 1,
              explain: "The function prints, but returns nothing, so <code>result</code> is <code>None</code>." },
            { q: "What does this print?", predict: true, code: d`
                def first_even(nums):
                    for n in nums:
                        if n % 2 == 0:
                            return n
                    return -1
                print(first_even([3, 8, 5, 6]), first_even([1, 3]))`,
              choices: ["8 -1", "6 -1", "8 None", "[8, 6] -1"], answer: 0,
              explain: "<code>return</code> leaves the function at the first even number. If the loop ends without one, <code>-1</code> is returned." },
            { q: "What does this print?", predict: true, code: d`
                def power(base, exp=2):
                    return base ** exp
                print(power(3), power(2, 3), power(exp=1, base=5))`,
              choices: ["9 8 5", "9 9 5", "6 8 5", "9 8 1"], answer: 0,
              explain: "3² = 9, 2³ = 8, and keyword arguments can come in any order: 5¹ = 5." },
            { q: "What does this print?", predict: true, code: d`
                def make_multiplier(k):
                    def multiply(x):
                        return x * k
                    return multiply
                triple = make_multiplier(3)
                print(triple(5), make_multiplier(2)(10))`,
              choices: ["15 20", "15 10", "8 12", "multiply 20"], answer: 0,
              explain: "Each inner function remembers its own <code>k</code>: 5 × 3 and 10 × 2." },
          ],
        },
        {
          id: "8-7", boss: true, time: 810, title: "The Memory Spell",
          story: "Malvex's recursive curse repeats the same work millions of times. Give your spells a memory, and they'll finish instantly.",
          lesson: `<p>Plain recursive Fibonacci (<code>fib(n) = fib(n-1) + fib(n-2)</code>) recomputes the same values again and again: <code>fib(40)</code> makes over 300 million calls!</p>
            <p><b>Memoization</b> fixes this: store each answer in a dictionary the first time, and look it up next time.</p>
            <p>Recursion is also natural for <b>nested</b> data, like lists inside lists inside lists: handle the simple case (a plain item) directly, and call yourself for each inner list.</p>`,
          example: d`
            memo = {}
            def steps(n):
                # ways to climb n stairs taking 1 or 2 at a time
                if n <= 1:
                    return 1
                if n not in memo:
                    memo[n] = steps(n - 1) + steps(n - 2)
                return memo[n]
            print(steps(50))

            def depth(x):
                if not isinstance(x, list):
                    return 0
                deepest = 0
                for item in x:
                    deepest = max(deepest, depth(item))
                return 1 + deepest
            print(depth([1, [2, [3]]]))`,
          task: `Write two <b>recursive</b> functions:<br>
            • <code>fib(n)</code>: <code>fib(0) = 0</code>, <code>fib(1) = 1</code>, then each is the sum of the two before. It must be fast: <code>fib(90)</code> has to finish instantly, so use memoization.<br>
            • <code>flatten(items)</code>: takes a list that may contain lists (to any depth) and returns one flat list of all the non-list items, in order.<br>
            <code>flatten([1, [2, [3, [4]], 5], []])</code> → <code>[1, 2, 3, 4, 5]</code>`,
          starter: d`
            def fib(n):
                if n < 2:
                    return n
                return fib(n - 1) + fib(n - 2)

            def flatten(items):
                pass
            `,
          solution: d`
            memo = {}
            def fib(n):
                if n < 2:
                    return n
                if n not in memo:
                    memo[n] = fib(n - 1) + fib(n - 2)
                return memo[n]

            def flatten(items):
                result = []
                for x in items:
                    if isinstance(x, list):
                        result += flatten(x)
                    else:
                        result.append(x)
                return result`,
          hints: ["Create memo = {} outside fib. Before computing, check if n in memo.", "flatten: loop over items; if isinstance(x, list), extend the result with flatten(x), else append x.", "result += flatten(x) adds all items of the returned list."],
          tests: [{ code: d`
            fib = expect_func("fib"); flatten = expect_func("flatten")
            is_recursive("fib")
            is_recursive("flatten")
            expect_equal(fib(0), 0, "fib(0)")
            expect_equal(fib(1), 1, "fib(1)")
            expect_equal(fib(10), 55, "fib(10)")
            # count calls: without memoization fib(90) would take longer than the age of the universe
            orig, calls = fib, [0]
            def counting(n):
                calls[0] += 1
                if calls[0] > 5000:
                    raise AssertionError("fib(90) makes far too many calls: it recomputes the same values again and again. Store each answer in a dict (memoization).")
                return orig(n)
            orig.__globals__["fib"] = counting
            try:
                expect_equal(counting(90), 2880067194370816120, "fib(90)")
            finally:
                orig.__globals__["fib"] = orig
            expect_equal(flatten([1, [2, [3, [4]], 5], []]), [1, 2, 3, 4, 5], "flatten([1, [2, [3, [4]], 5], []])")
            expect_equal(flatten([]), [], "flatten([])")
            expect_equal(flatten([[["a"]], "b", [["c", ["d"]]]]), ["a", "b", "c", "d"], 'flatten([[["a"]], "b", [["c", ["d"]]]])')
            expect_equal(flatten([1, 2, 3]), [1, 2, 3], "flatten([1, 2, 3])")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 9
    {
      id: 18, name: "The Hall of Small Secrets", topic: "match/case, short-circuits & None, copies & list methods, divmod, nonlocal, frozenset", time: 600, icon: "🕯️",
      intro: "Small spells win big battles. This hall hides the little tools that experienced Python wizards use every day.",
      missions: [
        {
          id: "18-1", title: "Many Doors, One Key",
          story: "The castle's talking door understands commands: go, take, say, quit. Teach it to recognise each shape of command.",
          lesson: `<p><code>match</code> compares a value against <b>patterns</b>, top to bottom, and runs the first that fits:</p>
            <pre class="out">match words:
    case ["go", direction]:        # exactly 2 items; captures the 2nd
        ...
    case ["take", *items]:         # "take" then any number of items
        ...
    case ["quit"] | ["exit"]:      # either pattern
        ...
    case ["go", d] if d == "up":   # a guard: an extra condition
        ...
    case _:                        # anything else
        ...</pre>
            <p>Order matters: put specific patterns before general ones. Patterns can match lists, tuples, numbers and strings.</p>`,
          example: d`
            def describe(point):
                match point:
                    case (0, 0):
                        return "origin"
                    case (0, y):
                        return f"on the y axis at {y}"
                    case (x, y) if x == y:
                        return "on the diagonal"
                    case _:
                        return "somewhere else"

            for p in [(0, 0), (0, 5), (3, 3), (1, 2)]:
                print(p, describe(p))`,
          task: `Write <code>command(text)</code> using <code>match</code> on <code>text.split()</code>, returning:<br>
            • <code>go &lt;dir&gt;</code> with dir north, south, east or west → <code>"You walk north."</code>; any other <code>go &lt;x&gt;</code> → <code>"You can't go that way."</code><br>
            • <code>take</code> alone → <code>"Take what?"</code>; <code>take &lt;item&gt;</code> → <code>"You take the sword."</code>; <code>take a b c</code> → <code>"You take a, b, c."</code><br>
            • <code>say &lt;words…&gt;</code> → <code>'You shout: "HELLO THERE"'</code> (the words in capitals)<br>
            • <code>quit</code> or <code>exit</code> → <code>"Goodbye."</code>; anything else → <code>"I don't understand."</code>`,
          starter: d`
            def command(text):
                match text.split():
                    case _:
                        return "I don't understand."

            print(command("go north"))
            `,
          solution: d`
            def command(text):
                match text.split():
                    case ["go", direction] if direction in ("north", "south", "east", "west"):
                        return f"You walk {direction}."
                    case ["go", _]:
                        return "You can't go that way."
                    case ["take"]:
                        return "Take what?"
                    case ["take", item]:
                        return f"You take the {item}."
                    case ["take", *items]:
                        return "You take " + ", ".join(items) + "."
                    case ["say", *words] if words:
                        return 'You shout: "' + " ".join(words).upper() + '"'
                    case ["quit"] | ["exit"]:
                        return "Goodbye."
                    case _:
                        return "I don't understand."

            print(command("go north"))`,
          hints: ["case [\"go\", direction] if direction in (...): comes before case [\"go\", _]", "case [\"take\"], then case [\"take\", item], then case [\"take\", *items]", "case [\"quit\"] | [\"exit\"]:"],
          tests: [{ code: d`
            import ast
            cmd = expect_func("command")
            assert any(isinstance(n, ast.Match) for n in ast.walk(ast.parse(__code__))), "Use a match statement."
            cases = {"go north": "You walk north.", "go west": "You walk west.", "go up": "You can't go that way.",
                     "take": "Take what?", "take sword": "You take the sword.", "take a b c": "You take a, b, c.",
                     "say hello there": 'You shout: "HELLO THERE"', "quit": "Goodbye.", "exit": "Goodbye.",
                     "dance": "I don't understand.", "go": "I don't understand.", "": "I don't understand."}
            for text, want in cases.items():
                expect_equal(cmd(text), want, "command(" + repr(text) + ")")` }],
        },
        {
          id: "18-2", title: "Lazy Guards",
          story: "The gate guards are lazy: they stop checking as soon as they know the answer. Learn how, and when it tricks you.",
          lesson: `<ul><li><b>Short-circuit</b>: <code>a and b</code> stops at the first falsy value; <code>a or b</code> stops at the first truthy one. They return that <b>value</b>, not just True/False: <code>"" or "guest"</code> → <code>"guest"</code></li>
            <li><code>name or "stranger"</code> is a quick default, but it also replaces <code>0</code>, <code>""</code> and <code>[]</code>, which are falsy</li>
            <li>To test for "no value", use <code>x is None</code> (not <code>== None</code>): only <code>None</code> matches</li>
            <li><b>Chained comparisons</b>: <code>1 &lt;= x &lt;= 10</code> means <code>1 &lt;= x and x &lt;= 10</code></li></ul>`,
          example: d`
            print(0 or 5, "" or "guest", "ann" or "guest")   # 5 guest ann
            print([] and "x", [1] and "x")                     # [] x
            x = 0
            print(x is None, x == 0, 1 <= x <= 10)`,
          task: `Write:<br>• <code>greet(name)</code> → <code>"Welcome, Ann!"</code>, or <code>"Welcome, stranger!"</code> when name is empty or None<br>
            • <code>pick(value, default)</code> → the value, unless it is <code>None</code> (so <code>0</code> and <code>""</code> are kept)<br>
            • <code>in_range(x, lo, hi)</code> → True when lo ≤ x ≤ hi (use a chained comparison)<br>
            • <code>first_or_none(items)</code> → the first item, or None when items is empty or None`,
          starter: d`
            def greet(name):
                pass

            def pick(value, default):
                pass

            def in_range(x, lo, hi):
                pass

            def first_or_none(items):
                pass
            `,
          solution: d`
            def greet(name):
                return f"Welcome, {name or 'stranger'}!"

            def pick(value, default):
                return default if value is None else value

            def in_range(x, lo, hi):
                return lo <= x <= hi

            def first_or_none(items):
                return items[0] if items else None`,
          hints: ["greet: name or \"stranger\"", "pick: value or default would lose 0 and \"\"; test value is None instead", "in_range: return lo <= x <= hi", "first_or_none: items[0] if items else None (None and [] are both falsy)"],
          tests: [{ code: d`
            g = expect_func("greet"); p = expect_func("pick"); r = expect_func("in_range"); f = expect_func("first_or_none")
            expect_equal(g("Ann"), "Welcome, Ann!", "greet('Ann')"); expect_equal(g(""), "Welcome, stranger!", "greet('')"); expect_equal(g(None), "Welcome, stranger!", "greet(None)")
            expect_equal(p(None, 5), 5, "pick(None, 5)")
            expect_equal(p(0, 5), 0, "pick(0, 5): 0 is a real value, not a missing one")
            expect_equal(p("", "x"), "", "pick('', 'x')"); expect_equal(p([], [1]), [], "pick([], [1])"); expect_equal(p(7, 5), 7, "pick(7, 5)")
            expect_equal([r(x, 1, 10) for x in (0, 1, 5, 10, 11)], [False, True, True, True, False], "in_range for 0, 1, 5, 10, 11")
            expect_equal(f([4, 5]), 4, "first_or_none([4, 5])"); expect_equal(f([]), None, "first_or_none([])"); expect_equal(f(None), None, "first_or_none(None)")
            expect_equal(f([0]), 0, "first_or_none([0])")
            import ast
            assert any(isinstance(n, ast.Compare) and len(n.ops) >= 2 for n in ast.walk(ast.parse(__code__))), "Use a chained comparison in in_range, like lo <= x <= hi."` }],
        },
        {
          id: "18-3", title: "Copies of the Map",
          story: "The general copies the battle map to plan a trick, and the original map changes too! Learn which copies are real.",
          lesson: `<p><code>b = a</code> makes no copy: both names point at the same list. <code>a.copy()</code> or <code>a[:]</code> copies the <b>outer</b> list only (a <b>shallow</b> copy): inner lists are still shared. For nested lists use <code>copy.deepcopy(a)</code> (after <code>import copy</code>), which copies everything inside too.</p>
            <p>Handy list methods (they change the list in place and return <code>None</code>): <code>insert(i, x)</code>, <code>extend(other)</code>, <code>remove(x)</code> (first match), <code>pop(i)</code> (removes and returns), and <code>index(x)</code> finds a position.</p>`,
          example: d`
            import copy
            board = [[0, 0], [0, 0]]
            shallow = board.copy()
            deep = copy.deepcopy(board)
            shallow[0][0] = 9
            print(board, deep)       # board changed through the shallow copy!
            items = ["a", "c"]
            items.insert(1, "b"); items.extend(["d", "e"])
            print(items, items.index("c"))`,
          task: `Write:<br>• <code>clone_board(board)</code> → a <b>fully independent</b> copy of a list of lists<br>
            • <code>insert_sorted(items, x)</code> → insert x into the sorted list <code>items</code> <b>in place</b>, keeping it sorted (put it before the first item that's bigger)<br>
            • <code>move_to_front(items, x)</code> → in place: if x is in the list, move its first occurrence to position 0; otherwise do nothing<br>
            • <code>combine(a, b)</code> → a <b>new</b> list with a's items then b's, without changing a`,
          starter: d`
            import copy

            def clone_board(board):
                pass

            def insert_sorted(items, x):
                pass

            def move_to_front(items, x):
                pass

            def combine(a, b):
                pass
            `,
          solution: d`
            import copy

            def clone_board(board):
                return copy.deepcopy(board)

            def insert_sorted(items, x):
                i = 0
                while i < len(items) and items[i] <= x:
                    i += 1
                items.insert(i, x)

            def move_to_front(items, x):
                if x in items:
                    items.remove(x)
                    items.insert(0, x)

            def combine(a, b):
                result = a.copy()
                result.extend(b)
                return result`,
          hints: ["clone_board: copy.deepcopy(board)", "insert_sorted: move i forward while items[i] <= x, then items.insert(i, x) (inserting at len(items) adds at the end)", "move_to_front: items.remove(x) then items.insert(0, x)", "combine: result = a.copy(); result.extend(b)"],
          tests: [{ code: d`
            cb = expect_func("clone_board"); ins = expect_func("insert_sorted"); mv = expect_func("move_to_front"); co = expect_func("combine")
            board = [[1, 2], [3, 4]]; c = cb(board)
            expect_equal(c, [[1, 2], [3, 4]], "clone_board copies the values")
            c[0][0] = 99; c.append([5])
            expect_equal(board, [[1, 2], [3, 4]], "the original board after changing the clone (it must not change)")
            for start, x, want in (([1, 3, 5], 4, [1, 3, 4, 5]), ([1, 3, 5], 0, [0, 1, 3, 5]), ([1, 3, 5], 9, [1, 3, 5, 9]), ([], 2, [2]), ([2, 2], 2, [2, 2, 2])):
                lst = list(start); out = ins(lst, x)
                expect_equal(lst, want, "insert_sorted(" + str(start) + ", " + str(x) + ") changes the list to")
                expect_equal(out, None, "insert_sorted returns None (it changes the list in place)")
            lst = ["a", "b", "c", "b"]; mv(lst, "b"); expect_equal(lst, ["b", "a", "c", "b"], "move_to_front(['a', 'b', 'c', 'b'], 'b')")
            lst = ["a", "b"]; mv(lst, "z"); expect_equal(lst, ["a", "b"], "move_to_front with a missing item")
            a = [1, 2]; r = co(a, (3, 4))
            expect_equal(r, [1, 2, 3, 4], "combine([1, 2], (3, 4))"); expect_equal(a, [1, 2], "combine must not change a")` }],
        },
        {
          id: "18-4", title: "Tricks of Number and Memory",
          story: "The clockmaker counts seconds, the herald counts calls, and the matchmaker counts meetings. Each has a small trick.",
          lesson: `<ul><li><code>divmod(a, b)</code> returns <code>(a // b, a % b)</code> in one go: <code>divmod(125, 60)</code> → <code>(2, 5)</code></li>
            <li><code>nonlocal</code> lets an inner function <b>change</b> a variable of the function around it (reading works without it; assigning needs it)</li>
            <li>A <code>frozenset</code> is a set that can't change, so it can be a dictionary key. <code>frozenset({"ann", "bo"}) == frozenset({"bo", "ann"})</code>: order doesn't matter</li></ul>`,
          example: d`
            print(divmod(125, 60))

            def make_bell():
                rings = 0
                def ring():
                    nonlocal rings
                    rings += 1
                    return "ding " * rings
                return ring

            bell = make_bell()
            print(bell()); print(bell())
            meetings = {frozenset({"ann", "bo"}): 1}
            print(meetings[frozenset({"bo", "ann"})])`,
          task: `Write:<br>• <code>to_clock(seconds)</code> → <code>"H:MM:SS"</code> using <code>divmod</code> (3725 → <code>"1:02:05"</code>)<br>
            • <code>make_counter(start=0)</code> → a function that returns start + 1, start + 2, … on each call (use <code>nonlocal</code>)<br>
            • <code>count_meetings(pairs)</code> → a dict mapping <code>frozenset({a, b})</code> to how many times a and b met, in either order`,
          starter: d`
            def to_clock(seconds):
                pass

            def make_counter(start=0):
                pass

            def count_meetings(pairs):
                pass
            `,
          solution: d`
            def to_clock(seconds):
                minutes, s = divmod(seconds, 60)
                h, m = divmod(minutes, 60)
                return f"{h}:{m:02d}:{s:02d}"

            def make_counter(start=0):
                n = start
                def count():
                    nonlocal n
                    n += 1
                    return n
                return count

            def count_meetings(pairs):
                counts = {}
                for a, b in pairs:
                    key = frozenset({a, b})
                    counts[key] = counts.get(key, 0) + 1
                return counts`,
          hints: ["minutes, s = divmod(seconds, 60); h, m = divmod(minutes, 60)", "f\"{h}:{m:02d}:{s:02d}\" pads with zeros", "make_counter: an inner function with nonlocal n", "key = frozenset({a, b}); counts[key] = counts.get(key, 0) + 1"],
          tests: [{ code: d`
            tc = expect_func("to_clock"); mc = expect_func("make_counter"); cm = expect_func("count_meetings")
            assert "divmod" in __code__, "Use divmod in to_clock."
            for s, want in ((3725, "1:02:05"), (0, "0:00:00"), (59, "0:00:59"), (36000, "10:00:00")):
                expect_equal(tc(s), want, "to_clock(" + str(s) + ")")
            c = mc(); expect_equal([c(), c(), c()], [1, 2, 3], "a counter's first three calls")
            d = mc(10); expect_equal([d(), d()], [11, 12], "make_counter(10)"); expect_equal(c(), 4, "the first counter is separate")
            got = cm([("ann", "bo"), ("bo", "ann"), ("ann", "cy")])
            expect_equal(got, {frozenset({"ann", "bo"}): 2, frozenset({"ann", "cy"}): 1}, "count_meetings")` }],
        },
        {
          id: "18-5", type: "quiz", title: "Riddles of the Small Secrets",
          story: "The hall's keeper whispers riddles about the little tools.",
          lesson: `<p>Short-circuits return values, shallow copies share their insides, <code>//</code> rounds towards minus infinity, and <code>round()</code> rounds halves to the even neighbour.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                print(0 or "x", [] and 5, 3 or 4)`,
              choices: ["x [] 3", "x 5 3", "True False True", "x [] 4"], answer: 0,
              explain: "or returns the first truthy value; and returns the first falsy one (or the last value)." },
            { q: "What does this print?", predict: true, code: d`
                b = [[0, 0]] * 2
                b[0][0] = 9
                print(b)`,
              choices: ["[[9, 0], [9, 0]]", "[[9, 0], [0, 0]]", "[[9, 9], [0, 0]]", "an error"], answer: 0,
              explain: "[[0, 0]] * 2 repeats the same inner list twice. Build each row as a new list, for example by appending [0, 0] inside a loop." },
            { q: "What does this print?", predict: true, code: d`
                print(-7 // 2, -7 % 2, divmod(7, 2))`,
              choices: ["-4 1 (3, 1)", "-3 -1 (3, 1)", "-3 1 (3, 1)", "-4 -1 (3, 1)"], answer: 0,
              explain: "// rounds down (towards minus infinity), so -7 // 2 is -4, and then -7 % 2 is 1." },
            { q: "What does this print?", predict: true, code: d`
                print(round(2.5), round(3.5), round(2.675, 2))`,
              choices: ["2 4 2.67", "3 4 2.68", "2 3 2.67", "3 4 2.67"], answer: 0,
              explain: "Halves round to the even neighbour (banker's rounding), and 2.675 is stored as 2.67499999…" },
            { q: "What does this print?", predict: true, code: d`
                match (1, 2):
                    case (x, 0):
                        print("flat")
                    case (x, y) if x < y:
                        print("up", y)
                    case _:
                        print("other")`,
              choices: ["up 2", "flat", "other", "up 1"], answer: 0,
              explain: "(x, 0) needs a 0 in second place; (x, y) matches with the guard 1 < 2 true." },
            { q: "Why write <code>if value is None:</code> rather than <code>if not value:</code>?",
              choices: ["not value is also true for 0, \"\" and [], which may be real values", "is None is faster to type", "not value raises an error on None", "they are always the same"], answer: 0,
              explain: "Only None is None. Falsy is a much bigger group." },
          ],
        },
        {
          id: "18-6", boss: true, time: 840, title: "The Quartermaster's Orders",
          story: "The quartermaster shouts orders all day. Build the clerk who answers every one, keeps the stores, and can undo a bad day.",
          lesson: `<p>Combine the hall's secrets: <code>match</code> with guards for the commands, <code>.get(item, 0)</code> for missing items, a <b>copy</b> of the stores for the save/undo feature (a plain <code>dict(stores)</code> is enough here: the values are numbers, which can't change in place), and sorted dictionary walking for the list.</p>`,
          example: d`
            stores = {"rope": 2}
            saved = dict(stores)
            stores["rope"] = 0
            print(stores, saved)`,
          task: `Write <code>run_orders(orders)</code>: it takes a list of order strings and returns a list of replies, one per order. The stores start empty.<br>
            • <code>add ITEM N</code> (N whole digits) → add N; reply <code>"Added 3 rope."</code><br>
            • <code>use ITEM N</code> → if there are at least N, take them away (delete the item when it reaches 0) and reply <code>"Used 2 rope."</code>; otherwise <code>"Not enough rope."</code><br>
            • <code>count ITEM</code> → <code>"rope: 1"</code> (0 if none)<br>
            • <code>list</code> → items sorted by name as <code>"bread x4, rope x1"</code>, or <code>"Empty."</code><br>
            • <code>save</code> → remember a copy of the stores, reply <code>"Saved."</code>; <code>undo</code> → go back to the saved copy (<code>"Restored."</code>), or <code>"Nothing to restore."</code> if nothing was saved<br>
            • anything else → <code>"Unknown order: &lt;the order&gt;"</code>`,
          starter: d`
            def run_orders(orders):
                stores = {}
                saved = None
                replies = []
                for order in orders:
                    match order.split():
                        case _:
                            replies.append("Unknown order: " + order)
                return replies
            `,
          solution: d`
            def run_orders(orders):
                stores = {}
                saved = None
                replies = []
                for order in orders:
                    match order.split():
                        case ["add", item, n] if n.isdigit():
                            stores[item] = stores.get(item, 0) + int(n)
                            replies.append(f"Added {n} {item}.")
                        case ["use", item, n] if n.isdigit():
                            if stores.get(item, 0) >= int(n):
                                stores[item] -= int(n)
                                if stores[item] == 0:
                                    del stores[item]
                                replies.append(f"Used {n} {item}.")
                            else:
                                replies.append(f"Not enough {item}.")
                        case ["count", item]:
                            replies.append(f"{item}: {stores.get(item, 0)}")
                        case ["list"]:
                            parts = []
                            for name in sorted(stores):
                                parts.append(f"{name} x{stores[name]}")
                            replies.append(", ".join(parts) or "Empty.")
                        case ["save"]:
                            saved = dict(stores)
                            replies.append("Saved.")
                        case ["undo"]:
                            if saved is None:
                                replies.append("Nothing to restore.")
                            else:
                                stores = dict(saved)
                                replies.append("Restored.")
                        case _:
                            replies.append("Unknown order: " + order)
                return replies`,
          hints: ["case [\"add\", item, n] if n.isdigit():", "stores.get(item, 0) handles missing items", "list: \", \".join(parts) or \"Empty.\" (an empty string is falsy)", "save: saved = dict(stores); undo: stores = dict(saved), so later changes don't touch the saved copy"],
          tests: [{ code: d`
            import ast
            ro = expect_func("run_orders")
            assert any(isinstance(n, ast.Match) for n in ast.walk(ast.parse(__code__))), "Use a match statement for the orders."
            orders = ["list", "add rope 3", "add bread 4", "use rope 2", "count rope", "use rope 5", "list", "save",
                      "use rope 1", "count rope", "list", "undo", "list", "dance", "add sword", "use sword 1", "count shield"]
            want = ["Empty.", "Added 3 rope.", "Added 4 bread.", "Used 2 rope.", "rope: 1", "Not enough rope.", "bread x4, rope x1", "Saved.",
                    "Used 1 rope.", "rope: 0", "bread x4", "Restored.", "bread x4, rope x1", "Unknown order: dance", "Unknown order: add sword",
                    "Not enough sword.", "shield: 0"]
            got = ro(orders)
            expect_equal(len(got), len(want), "number of replies")
            for o, g, w in zip(orders, got, want):
                expect_equal(g, w, "reply to " + repr(o))
            expect_equal(ro(["undo"]), ["Nothing to restore."], "undo before any save")
            expect_equal(ro(["save", "add a 1", "undo", "add a 2", "undo", "list"]), ["Saved.", "Added 1 a.", "Restored.", "Added 2 a.", "Restored.", "Empty."], "undo twice goes back to the same save")` }],
        },
      ],
    },
    {
      id: 9, name: "The Trap Room", topic: "errors, exceptions & files", time: 600, icon: "⚠️",
      intro: "Traps everywhere. Good code expects things to go wrong — and handles it.",
      missions: [
        {
          id: "9-1", title: "Disarm the Trap",
          story: "The trap asks for a number. Give it nonsense and it explodes — unless you catch it.",
          lesson: `<p>When something goes wrong Python raises an <b>exception</b> and stops. <code>try / except</code> catches it so your program can react.</p>
            <p>Catch specific errors, like <code>except ValueError:</code> — not everything.</p>`,
          example: d`
            try:
                n = int("abc")
                print("never printed")
            except ValueError:
                print("That wasn't a number")
            print("Program continues")`,
          sampleInput: "21",
          task: `Read a line. If it is a whole number, print it <b>doubled</b>. Otherwise print <code>That's not a number!</code></b>`,
          starter: d`
            text = input()
            `,
          solution: d`
            text = input()
            try:
                n = int(text)
                print(n * 2)
            except ValueError:
                print("That's not a number!")`,
          hints: ["Put int(text) inside try:", "except ValueError:"],
          tests: [
            { input: ["21"], code: d`must_use("try")
              expect_output("42")` },
            { input: ["abc"], code: d`expect_output("That's not a number!")` },
            { input: ["3.5"], code: d`expect_output("That's not a number!")` },
            { input: ["-4"], code: d`expect_output("-8")` },
          ],
        },
        {
          id: "9-2", title: "Raise the Alarm",
          story: "The royal treasury must refuse bad withdrawals loudly.",
          lesson: `<p>Your own code can signal problems with <code>raise</code>: <code>raise ValueError("message")</code>. The caller can catch it with <code>try / except</code>, and <code>except ValueError as e:</code> gives you the message via <code>str(e)</code>.</p>`,
          example: d`
            def set_age(age):
                if age < 0:
                    raise ValueError("Age can't be negative")
                return age

            try:
                set_age(-1)
            except ValueError as e:
                print("Error:", e)`,
          task: `Write <code>withdraw(balance, amount)</code> that returns the new balance.<br>
            If <code>amount &lt;= 0</code> raise <code>ValueError("Amount must be positive")</code>.<br>
            If <code>amount &gt; balance</code> raise <code>ValueError("Not enough gold")</code>.`,
          starter: d`
            def withdraw(balance, amount):
                pass
            `,
          solution: d`
            def withdraw(balance, amount):
                if amount <= 0:
                    raise ValueError("Amount must be positive")
                if amount > balance:
                    raise ValueError("Not enough gold")
                return balance - amount`,
          hints: ['raise ValueError("Amount must be positive")', "Check amount <= 0 first, then amount > balance."],
          tests: [{ code: d`
            w = expect_func("withdraw")
            expect_equal(w(100, 30), 70, "withdraw(100, 30)")
            expect_equal(w(50, 50), 0, "withdraw(50, 50)")
            expect_raises(ValueError, w, 100, 0, match="Amount must be positive")
            expect_raises(ValueError, w, 100, -5, match="Amount must be positive")
            expect_raises(ValueError, w, 10, 11, match="Not enough gold")` }],
        },
        {
          id: "9-3", title: "Safe Division",
          story: "Divide the rations safely, whatever the scouts bring back.",
          lesson: `<p>You can have several <code>except</code> blocks for different errors. Also:</p>
            <ul><li><code>else:</code> runs if <b>no</b> error happened</li><li><code>finally:</code> runs <b>always</b> (cleanup)</li></ul>`,
          example: d`
            try:
                x = 10 / 0
            except ZeroDivisionError:
                print("No dividing by zero!")
            except TypeError:
                print("Numbers only")
            else:
                print("All good:", x)
            finally:
                print("Done")`,
          task: `Write <code>safe_divide(a, b)</code> that returns <code>a / b</code>.<br>
            On <code>ZeroDivisionError</code> return <code>"Cannot divide by zero"</code>; on <code>TypeError</code> return <code>"Numbers only"</code>. Use try/except.`,
          starter: d`
            def safe_divide(a, b):
                pass
            `,
          solution: d`
            def safe_divide(a, b):
                try:
                    return a / b
                except ZeroDivisionError:
                    return "Cannot divide by zero"
                except TypeError:
                    return "Numbers only"`,
          hints: ["try: return a / b", "Two except blocks, one per error type."],
          tests: [{ code: d`
            must_use("try")
            sd = expect_func("safe_divide")
            expect_equal(sd(10, 4), 2.5, "safe_divide(10, 4)")
            expect_equal(sd(9, 3), 3.0, "safe_divide(9, 3)")
            expect_equal(sd(1, 0), "Cannot divide by zero", "safe_divide(1, 0)")
            expect_equal(sd("6", 2), "Numbers only", 'safe_divide("6", 2)')` }],
        },
        {
          id: "9-4", title: "The Queen's Diary",
          story: "The Queen left notes on her escape plan. Save them and read them back.",
          lesson: `<p>Open files with <code>with open(name, mode) as f:</code> — the <code>with</code> block closes the file automatically.</p>
            <ul><li><code>"w"</code> write (replaces), <code>"a"</code> append, <code>"r"</code> read</li>
            <li><code>f.write(text)</code> — add <code>"\\n"</code> yourself for new lines</li>
            <li><code>f.read()</code> whole text, <code>f.readlines()</code> list of lines, or <code>for line in f:</code></li></ul>
            <p>(Files here live in your browser's memory.)</p>`,
          example: d`
            with open("hello.txt", "w") as f:
                f.write("first line\n")
                f.write("second line\n")

            with open("hello.txt") as f:
                for line in f:
                    print(line.strip())`,
          task: `Write three functions:<br>
            <code>save_notes(filename, notes)</code> — writes each note in the list on its own line.<br>
            <code>read_notes(filename)</code> — returns a list of the lines (without the newline).<br>
            <code>count_lines(filename)</code> — returns the number of lines.`,
          starter: d`
            def save_notes(filename, notes):
                pass

            def read_notes(filename):
                pass

            def count_lines(filename):
                pass
            `,
          solution: d`
            def save_notes(filename, notes):
                with open(filename, "w") as f:
                    for note in notes:
                        f.write(note + "\n")

            def read_notes(filename):
                with open(filename) as f:
                    return [line.strip() for line in f]

            def count_lines(filename):
                return len(read_notes(filename))`,
          hints: ['with open(filename, "w") as f: then f.write(note + "\\n")', "line.strip() removes the newline", "count_lines can reuse read_notes!"],
          tests: [{ code: d`
            must_use("with")
            sv = expect_func("save_notes"); rd = expect_func("read_notes"); ct = expect_func("count_lines")
            sv("plan.txt", ["east tower", "midnight", "bring rope"])
            expect_equal(rd("plan.txt"), ["east tower", "midnight", "bring rope"], "read_notes after saving 3 notes")
            expect_equal(ct("plan.txt"), 3, "count_lines")
            sv("plan.txt", ["only one"])
            expect_equal(rd("plan.txt"), ["only one"], "saving again should replace the file")
            expect_equal(ct("plan.txt"), 1, "count_lines after replacing")` }],
        },
        {
          id: "9-5", type: "quiz", title: "Riddles of the Traps",
          story: "Every trap in this room fires in a particular order. Know the order, and you walk through unharmed.",
          lesson: `<p>How <code>try</code> flows:</p>
            <ul><li>As soon as an error happens inside <code>try</code>, the rest of the <code>try</code> block is <b>skipped</b>.</li>
            <li>The <b>first</b> matching <code>except</code> runs, so put specific exceptions before general ones like <code>Exception</code>.</li>
            <li><code>else</code> runs only if <b>no</b> error happened.</li>
            <li><code>finally</code> <b>always</b> runs, even when the function returns or an error escapes. Use it for cleanup.</li></ul>`,
          example: d`
            for text in ["42", "4.2"]:
                try:
                    n = int(text)
                except ValueError:
                    print(text, "-> not a whole number")
                else:
                    print(text, "-> ok:", n)
                finally:
                    print("   (checked", text + ")")`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                try:
                    print("A")
                    x = int("3.5")
                    print("B")
                except ValueError:
                    print("C")
                else:
                    print("D")
                finally:
                    print("E")`,
              choices: ["A\nC\nE", "A\nB\nC\nE", "A\nC\nD\nE", "A\nB\nD\nE"], answer: 0,
              explain: "<code>int(\"3.5\")</code> fails, so B is skipped, C runs, D (<code>else</code>) is skipped, and E (<code>finally</code>) always runs." },
            { q: "What does this print?", predict: true, code: d`
                data = {"a": 1}
                try:
                    print(data["b"])
                except IndexError:
                    print("index")
                except KeyError:
                    print("key")
                except Exception:
                    print("other")`,
              choices: ["index", "key", "other", "key\nother"], answer: 1,
              explain: "A missing dictionary key raises <code>KeyError</code>. Only one <code>except</code> block runs." },
            { q: "What does this print?", predict: true, code: d`
                try:
                    print(10 / 0)
                except Exception:
                    print("general")
                except ZeroDivisionError:
                    print("zero")`,
              choices: ["zero", "general", "general\nzero", "ZeroDivisionError"], answer: 1,
              explain: "<code>ZeroDivisionError</code> is a kind of <code>Exception</code>, and the first matching block wins. Specific ones must come first." },
            { q: "What does this print?", predict: true, code: d`
                def check():
                    try:
                        return "try"
                    finally:
                        print("cleanup")
                print(check())`,
              choices: ["try", "cleanup", "cleanup\ntry", "try\ncleanup"], answer: 2,
              explain: "<code>finally</code> runs on the way out of the function, before the caller receives (and prints) the returned value." },
            { q: "What does this print?", predict: true, code: d`
                def withdraw(balance, amount):
                    if amount > balance:
                        raise ValueError("Not enough gold")
                    return balance - amount
                try:
                    print(withdraw(50, 20))
                    print(withdraw(50, 80))
                    print("done")
                except ValueError as e:
                    print("Error:", e)`,
              choices: ["30\nError: Not enough gold", "30\n-30\ndone", "Error: Not enough gold", "30\nError: Not enough gold\ndone"], answer: 0,
              explain: "The second call raises, so \"done\" is skipped and the <code>except</code> block prints the error message." },
          ],
        },
        {
          id: "9-6", boss: true, time: 900, title: "The Ledger Parser",
          story: "The treasury's ledger file is half-ruined: some lines are fine, some are nonsense. Read what you can, and count the damage.",
          lesson: `<p>You can create your own exception type by making a class based on <code>Exception</code> (you'll learn classes properly on Floor 11; this one-liner is all you need now):</p>
            <p><code>class InvalidRecord(Exception): pass</code></p>
            <p>Raise it with a message: <code>raise InvalidRecord("bad amount")</code>, and catch it like any other: <code>except InvalidRecord:</code>.</p>
            <p>A very common pattern with real data: <b>process each line, skip and count the broken ones</b>, instead of crashing on the first bad line. Put the <code>try</code> <b>inside</b> the loop.</p>`,
          example: d`
            class TooHeavy(Exception):
                pass

            def check(weight):
                if weight > 50:
                    raise TooHeavy(f"{weight} kg is too heavy")
                return weight

            ok, bad = 0, 0
            for w in [10, 70, 20, 99]:
                try:
                    check(w)
                    ok += 1
                except TooHeavy as e:
                    print("skipped:", e)
                    bad += 1
            print(ok, "ok,", bad, "skipped")`,
          task: `Create:<br>• an exception class <code>InvalidRecord</code><br>
            • <code>parse_line(line)</code>: a line looks like <code>"Lyra, 120"</code> (spaces around the parts are allowed). Return the tuple <code>("Lyra", 120)</code>.
            Raise <code>InvalidRecord("bad format")</code> if the line doesn't have exactly two parts or the name is empty, and <code>InvalidRecord("bad amount")</code> if the amount isn't a whole number.<br>
            • <code>load_ledger(filename)</code>: read the file, ignore blank lines, and return a tuple <code>(records, bad)</code>: the list of parsed tuples, and how many lines were invalid.`,
          starter: d`
            class InvalidRecord(Exception):
                pass

            def parse_line(line):
                name, amount = line.split(",")
                return (name, int(amount))

            def load_ledger(filename):
                pass
            `,
          solution: d`
            class InvalidRecord(Exception):
                pass

            def parse_line(line):
                parts = line.split(",")
                if len(parts) != 2 or not parts[0].strip():
                    raise InvalidRecord("bad format")
                try:
                    amount = int(parts[1])
                except ValueError:
                    raise InvalidRecord("bad amount")
                return (parts[0].strip(), amount)

            def load_ledger(filename):
                records, bad = [], 0
                with open(filename) as f:
                    for line in f:
                        if not line.strip():
                            continue
                        try:
                            records.append(parse_line(line))
                        except InvalidRecord:
                            bad += 1
                return (records, bad)`,
          hints: ["parts = line.split(\",\"), then check len(parts) and parts[0].strip()", "Wrap int(parts[1]) in try/except ValueError and raise InvalidRecord(\"bad amount\") instead. (int() already ignores surrounding spaces.)", "In load_ledger: for line in f: skip blank lines; try parse_line, except InvalidRecord: bad += 1"],
          tests: [{ code: d`
            InvalidRecord = expect_class("InvalidRecord")
            assert issubclass(InvalidRecord, Exception), "InvalidRecord must be based on Exception: class InvalidRecord(Exception)"
            parse_line = expect_func("parse_line"); load_ledger = expect_func("load_ledger")
            expect_equal(parse_line("Lyra, 120"), ("Lyra", 120), 'parse_line("Lyra, 120")')
            expect_equal(parse_line("  Orin ,-5 "), ("Orin", -5), 'parse_line("  Orin ,-5 ")')
            expect_raises(InvalidRecord, parse_line, "Lyra 120", match="bad format")
            expect_raises(InvalidRecord, parse_line, "a, 1, 2", match="bad format")
            expect_raises(InvalidRecord, parse_line, " , 5", match="bad format")
            expect_raises(InvalidRecord, parse_line, "Mira, lots", match="bad amount")
            expect_raises(InvalidRecord, parse_line, "Mira, 2.5", match="bad amount")
            with open("ledger.txt", "w") as f:
                f.write("Lyra, 120\nnonsense\n\nOrin, 40\nMira, ten\n  \nZed,7\n")
            expect_equal(load_ledger("ledger.txt"), ([("Lyra", 120), ("Orin", 40), ("Zed", 7)], 2), "load_ledger on a file with 3 good lines, 2 broken and 2 blank")
            with open("empty.txt", "w") as f:
                f.write("")
            expect_equal(load_ledger("empty.txt"), ([], 0), "load_ledger on an empty file")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 10
    {
      id: 10, name: "The Garden of Shortcuts", topic: "comprehensions, lambda, zip & enumerate", time: 600, icon: "🌿",
      intro: "Pythonistas write less and say more. Learn the elegant shortcuts.",
      missions: [
        {
          id: "10-1", title: "One-Line Harvest",
          story: "Harvest only the ripe (even) fruit — in a single line.",
          lesson: `<p>A <b>list comprehension</b> builds a list in one line:</p>
            <p><code>[expression for item in items if condition]</code></p>`,
          example: d`
            nums = [1, 2, 3, 4, 5]
            squares = [n * n for n in nums]          # [1, 4, 9, 16, 25]
            odds = [n for n in nums if n % 2 == 1]   # [1, 3, 5]
            names = [w.title() for w in ["ann", "bo"]]
            print(squares, odds, names)`,
          task: `Write <code>even_squares(nums)</code> returning the squares of the <b>even</b> numbers, using a list comprehension.<br>Write <code>long_words(words, n)</code> returning words longer than <code>n</code> letters, in UPPERCASE.`,
          starter: d`
            def even_squares(nums):
                pass

            def long_words(words, n):
                pass
            `,
          solution: d`
            def even_squares(nums):
                return [x * x for x in nums if x % 2 == 0]

            def long_words(words, n):
                return [w.upper() for w in words if len(w) > n]`,
          hints: ["[x * x for x in nums if x % 2 == 0]", "[w.upper() for w in words if len(w) > n]"],
          tests: [{ code: d`
            must_use("listcomp")
            es = expect_func("even_squares"); lw = expect_func("long_words")
            expect_equal(es([1, 2, 3, 4]), [4, 16], "even_squares([1, 2, 3, 4])")
            expect_equal(es([1, 3]), [], "even_squares([1, 3])")
            expect_equal(es([-2, 0]), [4, 0], "even_squares([-2, 0])")
            expect_equal(lw(["sun", "dragon", "sky", "castle"], 3), ["DRAGON", "CASTLE"], 'long_words([...], 3)')` }],
        },
        {
          id: "10-2", title: "The Scoreboard",
          story: "The tournament herald needs a numbered scoreboard.",
          lesson: `<p><code>enumerate(items, start=1)</code> gives <code>(number, item)</code> pairs.</p>
            <p><code>zip(a, b)</code> walks two lists side by side, giving <code>(a_item, b_item)</code> pairs.</p>`,
          example: d`
            for i, name in enumerate(["ann", "bo"], start=1):
                print(i, name)

            for name, age in zip(["ann", "bo"], [12, 15]):
                print(name, "is", age)`,
          task: `Write <code>scoreboard(names, scores)</code> returning a list of strings like <code>"1. Arin: 50"</code>, numbered from 1, using <code>zip</code> and <code>enumerate</code>.`,
          starter: d`
            def scoreboard(names, scores):
                pass
            `,
          solution: d`
            def scoreboard(names, scores):
                return [f"{i}. {n}: {s}" for i, (n, s) in enumerate(zip(names, scores), start=1)]`,
          hints: ["for i, (name, score) in enumerate(zip(names, scores), start=1):", 'f"{i}. {name}: {score}"'],
          tests: [{ code: d`
            must_call("zip"); must_call("enumerate")
            sb = expect_func("scoreboard")
            expect_equal(sb(["Arin", "Lyra"], [50, 75]), ["1. Arin: 50", "2. Lyra: 75"], 'scoreboard(["Arin", "Lyra"], [50, 75])')
            expect_equal(sb([], []), [], "scoreboard([], [])")` }],
        },
        {
          id: "10-3", title: "Rank the Heroes",
          story: "The strongest heroes march first. Ties? Alphabetical.",
          lesson: `<p>A <b>lambda</b> is a tiny unnamed function: <code>lambda x: x * 2</code>.</p>
            <p>Use it as a <code>key</code> to sort by anything: <code>sorted(items, key=lambda h: h[1])</code>. Return a tuple to sort by several things; use a minus sign to reverse a number.</p>
            <p>Also: <code>map(f, items)</code> and <code>filter(f, items)</code>.</p>`,
          example: d`
            pets = [("rex", 5), ("tom", 2), ("ace", 5)]
            print(sorted(pets, key=lambda p: p[1]))
            print(sorted(pets, key=lambda p: (-p[1], p[0])))
            print(list(map(lambda p: p[0], pets)))`,
          task: `Write <code>rank_heroes(heroes)</code>: given a list of <code>(name, power)</code> tuples, return the <b>names</b> sorted by power (highest first); equal power → alphabetical. Use a <code>lambda</code>.`,
          starter: d`
            def rank_heroes(heroes):
                pass
            `,
          solution: d`
            def rank_heroes(heroes):
                ordered = sorted(heroes, key=lambda h: (-h[1], h[0]))
                return [name for name, power in ordered]`,
          hints: ["key=lambda h: (-h[1], h[0])", "Then take just the names: [name for name, power in ordered]"],
          tests: [{ code: d`
            must_use("lambda")
            rh = expect_func("rank_heroes")
            expect_equal(rh([("Bo", 5), ("Arin", 9), ("Cy", 5)]), ["Arin", "Bo", "Cy"], "rank_heroes example")
            expect_equal(rh([("Zed", 1), ("Amy", 1)]), ["Amy", "Zed"], "tie -> alphabetical")
            expect_equal(rh([]), [], "rank_heroes([])")` }],
        },
        {
          id: "10-4", title: "Map of Lengths",
          story: "Measure every password to find the forged one.",
          lesson: `<p><b>Dict comprehension</b>: <code>{key: value for item in items}</code>.</p>
            <p><code>any(...)</code> is True if at least one item is true; <code>all(...)</code> if every item is true. They work great with generator expressions: <code>all(n &gt; 0 for n in nums)</code>.</p>`,
          example: d`
            words = ["sun", "moon"]
            print({w: len(w) for w in words})       # {'sun': 3, 'moon': 4}
            print(any(n < 0 for n in [1, -2, 3]))   # True
            print(all(n > 0 for n in [1, -2, 3]))   # False`,
          task: `Write <code>word_lengths(words)</code> returning a dict <code>{word: length}</code> using a dict comprehension,<br>and <code>all_positive(nums)</code> returning True if every number is &gt; 0 (use <code>all</code>).`,
          starter: d`
            def word_lengths(words):
                pass

            def all_positive(nums):
                pass
            `,
          solution: d`
            def word_lengths(words):
                return {w: len(w) for w in words}

            def all_positive(nums):
                return all(n > 0 for n in nums)`,
          hints: ["{w: len(w) for w in words}", "return all(n > 0 for n in nums)"],
          tests: [{ code: d`
            must_use("dictcomp"); must_call("all")
            wl = expect_func("word_lengths"); ap = expect_func("all_positive")
            expect_equal(wl(["sun", "moon"]), {"sun": 3, "moon": 4}, 'word_lengths(["sun", "moon"])')
            expect_equal(wl([]), {}, "word_lengths([])")
            expect_equal(ap([1, 2, 3]), True, "all_positive([1, 2, 3])")
            expect_equal(ap([1, 0, 3]), False, "all_positive([1, 0, 3])")` }],
        },
        {
          id: "10-5", type: "quiz", title: "Riddles of the Garden",
          story: "The garden's paths fold into one another like comprehensions. Read them right, or wander forever.",
          lesson: `<ul><li>A comprehension with two <code>for</code>s runs like nested loops, <b>outer one first</b>: <code>[(x, y) for x in A for y in B]</code>.</li>
            <li>A dict comprehension with a repeated key keeps the last value.</li>
            <li><code>zip</code> stops at the <b>shortest</b> input.</li>
            <li><code>any([])</code> is <code>False</code> (nothing is true) but <code>all([])</code> is <code>True</code> (nothing is false).</li>
            <li><code>sorted(..., key=...)</code> is <b>stable</b>: items with equal keys keep their original order.</li>
            <li><code>map(f, items)</code> applies <code>f</code> to every item; <code>filter(f, items)</code> keeps the items where <code>f</code> is true. Both are lazy: wrap them in <code>list()</code> to see the results.</li></ul>`,
          example: d`
            print([(x, y) for x in [1, 2] for y in "ab"])
            print(list(zip([1, 2, 3], ["a", "b"])))
            print(sorted(["bb", "a", "cc"], key=len))
            print(list(map(str.upper, ["x", "y"])), list(filter(lambda n: n % 2, range(6))))`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                print([x * 2 for x in range(5) if x % 2 == 1])`,
              choices: ["[2, 6]", "[0, 4, 8]", "[1, 3]", "[2, 6, 10]"], answer: 0,
              explain: "Odd x in 0–4 are 1 and 3; doubled → 2 and 6." },
            { q: "What does this print?", predict: true, code: d`
                print([(x, y) for x in range(2) for y in "ab"])`,
              choices: ["[(0, 'a'), (0, 'b'), (1, 'a'), (1, 'b')]", "[(0, 'a'), (1, 'b')]", "[(0, 'a'), (1, 'a'), (0, 'b'), (1, 'b')]", "[[(0, 'a'), (0, 'b')], [(1, 'a'), (1, 'b')]]"], answer: 0,
              explain: "Like nested loops: for each x, all the y values." },
            { q: "What does this print?", predict: true, code: d`
                print({w: len(w) for w in ["hi", "sun", "hi"]})`,
              choices: ["{'hi': 2, 'sun': 3}", "{'hi': 2, 'sun': 3, 'hi': 2}", "{'hi': 4, 'sun': 3}", "[2, 3, 2]"], answer: 0,
              explain: "Keys are unique, so the second \"hi\" just overwrites the first." },
            { q: "What does this print?", predict: true, code: d`
                print(list(zip([1, 2, 3], "ab")))`,
              choices: ["[(1, 'a'), (2, 'b')]", "[(1, 'a'), (2, 'b'), (3, None)]", "[(1, 2, 3), ('a', 'b')]", "[1, 'a', 2, 'b', 3]"], answer: 0,
              explain: "<code>zip</code> stops when the shortest input runs out." },
            { q: "What does this print?", predict: true, code: d`
                print(any([]), all([]))`,
              choices: ["False True", "False False", "True True", "True False"], answer: 0,
              explain: "<code>any</code> needs at least one true item. <code>all</code> only fails if some item is false, and an empty list has none." },
            { q: "What does this print?", predict: true, code: d`
                print(sorted(["bb", "a", "ccc", "dd"], key=len))`,
              choices: ["['a', 'bb', 'dd', 'ccc']", "['a', 'dd', 'bb', 'ccc']", "['a', 'bb', 'ccc', 'dd']", "['ccc', 'bb', 'dd', 'a']"], answer: 0,
              explain: "\"bb\" and \"dd\" have the same length, so they keep their original order: sorting is stable." },
            { q: "What does this print?", predict: true, code: d`
                words = list(map(lambda s: s.upper(), ["a", "b"]))
                big = list(filter(lambda n: n > 1, [0, 1, 2, 3]))
                print(words, big)`,
              choices: ["['A', 'B'] [2, 3]", "['A', 'B'] [False, False, True, True]", "<map object> <filter object>", "['a', 'b'] [2, 3]"], answer: 0,
              explain: "<code>map</code> transforms every item; <code>filter</code> keeps those that pass the test." },
          ],
        },
        {
          id: "10-6", boss: true, time: 900, title: "The Royal Census",
          story: "The Queen's clerks counted every citizen. Answer the council's questions about the census, fast.",
          lesson: `<p>Real data often arrives as a <b>list of dictionaries</b>: one dict per row, the same keys in each. (This is exactly what a pandas table looks like on the inside.)</p>
            <ul><li>Select: <code>[p["name"] for p in people if p["age"] &gt;= 18]</code></li>
            <li>Count per group: <code>counts[p["city"]] = counts.get(p["city"], 0) + 1</code></li>
            <li>Best per group: keep the current best for each key, and replace it when you find a better one</li>
            <li>Averages: <code>sum(ages) / len(ages)</code>, but check for an empty list first</li></ul>`,
          example: d`
            people = [{"name": "Ann", "age": 31, "city": "Oak"}, {"name": "Bo", "age": 12, "city": "Elm"}]
            print([p["name"] for p in people if p["age"] >= 18])
            ages = [p["age"] for p in people]
            print(round(sum(ages) / len(ages), 1))
            print(max(people, key=lambda p: p["age"])["name"])`,
          task: `Each person is a dict like <code>{"name": "Lyra", "age": 19, "city": "Oakvale"}</code>. Write:<br>
            • <code>adults(people)</code> → names of everyone aged 18 or more, sorted alphabetically<br>
            • <code>count_by_city(people)</code> → <code>{city: number of people}</code>, cities in order of first appearance<br>
            • <code>oldest_by_city(people)</code> → <code>{city: name of the oldest person there}</code> (on a tie, the first one listed)<br>
            • <code>average_age(people, city=None)</code> → the average age rounded to 1 decimal, of everyone or only of that city; <code>None</code> if nobody matches<br>
            Use at least one comprehension.`,
          starter: d`
            def adults(people):
                pass

            def count_by_city(people):
                pass

            def oldest_by_city(people):
                pass

            def average_age(people, city=None):
                pass
            `,
          solution: d`
            def adults(people):
                return sorted(p["name"] for p in people if p["age"] >= 18)

            def count_by_city(people):
                counts = {}
                for p in people:
                    counts[p["city"]] = counts.get(p["city"], 0) + 1
                return counts

            def oldest_by_city(people):
                best = {}
                for p in people:
                    c = p["city"]
                    if c not in best or p["age"] > best[c]["age"]:
                        best[c] = p
                return {c: p["name"] for c, p in best.items()}

            def average_age(people, city=None):
                ages = [p["age"] for p in people if city is None or p["city"] == city]
                if not ages:
                    return None
                return round(sum(ages) / len(ages), 1)`,
          hints: ["adults: sorted([... for p in people if p[\"age\"] >= 18])", "oldest_by_city: keep a dict city → the oldest person dict so far; use > (not >=) so ties keep the first.", "average_age: ages = [p[\"age\"] for p in people if city is None or p[\"city\"] == city]"],
          tests: [{ code: d`
            must_use_any("listcomp", "dictcomp", "setcomp")
            P = [
                {"name": "Lyra", "age": 19, "city": "Oakvale"},
                {"name": "Orin", "age": 15, "city": "Stonebridge"},
                {"name": "Mira", "age": 42, "city": "Oakvale"},
                {"name": "Zed", "age": 42, "city": "Oakvale"},
                {"name": "Anna", "age": 67, "city": "Stonebridge"},
                {"name": "Bo", "age": 8, "city": "Fernhill"},
            ]
            adults = expect_func("adults"); cbc = expect_func("count_by_city"); obc = expect_func("oldest_by_city"); avg = expect_func("average_age")
            expect_equal(adults(P), ["Anna", "Lyra", "Mira", "Zed"], "adults(census)")
            expect_equal(adults([]), [], "adults([])")
            r = cbc(P)
            expect_equal(r, {"Oakvale": 3, "Stonebridge": 2, "Fernhill": 1}, "count_by_city(census)")
            expect_equal(list(r), ["Oakvale", "Stonebridge", "Fernhill"], "count_by_city keys (order of first appearance)")
            expect_equal(obc(P), {"Oakvale": "Mira", "Stonebridge": "Anna", "Fernhill": "Bo"}, "oldest_by_city(census) (Mira and Zed are both 42: Mira is listed first)")
            expect_equal(avg(P), 32.2, "average_age(census)")
            expect_equal(avg(P, "Oakvale"), 34.3, 'average_age(census, "Oakvale")')
            expect_equal(avg(P, city="Fernhill"), 8.0, 'average_age(census, city="Fernhill")')
            expect_equal(avg(P, "Atlantis"), None, 'average_age(census, "Atlantis")')
            expect_equal(avg([]), None, "average_age([])")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 11
    {
      id: 11, name: "The Hall of Knights", topic: "classes & objects (OOP)", time: 720, icon: "🛡️",
      intro: "Every knight is unique, yet all follow one blueprint. Welcome to objects.",
      missions: [
        {
          id: "11-1", title: "Forge a Knight",
          story: "Forge a new knight with health that rises and falls in battle.",
          lesson: `<p>A <b>class</b> is a blueprint; an <b>object</b> is one thing built from it.</p>
            <ul><li><code>__init__(self, ...)</code> runs when an object is created; store data on <code>self</code>: <code>self.hp = 100</code></li>
            <li><b>Methods</b> are functions inside the class; their first parameter is <code>self</code> (the object itself)</li></ul>`,
          example: d`
            class Dog:
                def __init__(self, name):
                    self.name = name
                    self.energy = 10

                def play(self):
                    self.energy -= 3
                    return f"{self.name} plays!"

            rex = Dog("Rex")
            print(rex.play(), rex.energy)   # Rex plays! 7`,
          task: `Create class <code>Knight</code>:<br>
            • <code>Knight(name, hp=100)</code> stores <code>name</code> and <code>hp</code><br>
            • <code>take_damage(amount)</code> lowers hp, but never below 0<br>
            • <code>heal(amount)</code> raises hp, but never above 100<br>
            • <code>is_alive()</code> returns True if hp &gt; 0`,
          starter: d`
            class Knight:
                def __init__(self, name, hp=100):
                    pass
            `,
          solution: d`
            class Knight:
                def __init__(self, name, hp=100):
                    self.name = name
                    self.hp = hp

                def take_damage(self, amount):
                    self.hp = max(0, self.hp - amount)

                def heal(self, amount):
                    self.hp = min(100, self.hp + amount)

                def is_alive(self):
                    return self.hp > 0`,
          hints: ["self.name = name and self.hp = hp in __init__", "self.hp = max(0, self.hp - amount)", "def is_alive(self): return self.hp > 0"],
          tests: [{ code: d`
            K = expect_class("Knight")
            k = K("Arin")
            expect_equal(k.name, "Arin", "k.name")
            expect_equal(k.hp, 100, "default hp")
            k.take_damage(30); expect_equal(k.hp, 70, "hp after take_damage(30)")
            k.heal(50); expect_equal(k.hp, 100, "hp after heal(50) (max 100)")
            k.take_damage(500); expect_equal(k.hp, 0, "hp after take_damage(500) (min 0)")
            expect_equal(k.is_alive(), False, "is_alive() at 0 hp")
            k2 = K("Bo", 20)
            expect_equal(k2.hp, 20, "Knight('Bo', 20).hp")
            expect_equal(k2.is_alive(), True, "is_alive() at 20 hp")` }],
        },
        {
          id: "11-2", title: "Speak Your Name",
          story: "The alchemist counts every potion ever brewed, and labels each one.",
          lesson: `<p><b>Class attributes</b> are shared by all objects: defined directly in the class, accessed as <code>ClassName.attr</code>.</p>
            <p><b>Special methods</b> customize behaviour: <code>__str__</code> decides what <code>print(obj)</code> / <code>str(obj)</code> shows.</p>`,
          example: d`
            class Coin:
                minted = 0               # class attribute

                def __init__(self, value):
                    self.value = value   # instance attribute
                    Coin.minted += 1

                def __str__(self):
                    return f"Coin({self.value})"

            print(Coin(5), Coin(10), Coin.minted)   # Coin(5) Coin(10) 2`,
          task: `Create class <code>Potion</code>:<br>
            • class attribute <code>total_made = 0</code>, increased by 1 for every new potion<br>
            • <code>Potion(heal)</code> stores <code>heal</code><br>
            • <code>str(Potion(20))</code> → <code>"Potion(+20)"</code>`,
          starter: d`
            class Potion:
                pass
            `,
          solution: d`
            class Potion:
                total_made = 0

                def __init__(self, heal):
                    self.heal = heal
                    Potion.total_made += 1

                def __str__(self):
                    return f"Potion(+{self.heal})"`,
          hints: ["total_made = 0 goes directly inside the class", "Potion.total_made += 1 in __init__", 'def __str__(self): return f"Potion(+{self.heal})"'],
          tests: [{ code: d`
            P = expect_class("Potion")
            start = P.total_made
            a = P(20); b = P(5)
            expect_equal(str(a), "Potion(+20)", "str(Potion(20))")
            expect_equal(str(b), "Potion(+5)", "str(Potion(5))")
            expect_equal(a.heal, 20, "Potion(20).heal")
            expect_equal(P.total_made - start, 2, "total_made should grow by 1 per potion")` }],
        },
        {
          id: "11-3", title: "Family of Heroes",
          story: "Mages and archers are heroes too — but each fights in their own way.",
          lesson: `<p><b>Inheritance</b>: <code>class Mage(Hero):</code> gets everything <code>Hero</code> has. It can <b>override</b> methods with its own version.</p>
            <p><code>super().__init__(...)</code> calls the parent's <code>__init__</code> so you don't repeat code. Different classes answering the same method differently is called <b>polymorphism</b>.</p>`,
          example: d`
            class Animal:
                sound = "..."
                def __init__(self, name):
                    self.name = name
                def speak(self):
                    return f"{self.name} says {self.sound}"

            class Cat(Animal):
                sound = "meow"

            class Bird(Animal):
                def __init__(self, name, can_fly):
                    super().__init__(name)
                    self.can_fly = can_fly

            print(Cat("Tom").speak())`,
          task: `Create:<br>
            • <code>Hero(name)</code> with class attribute <code>role = "Hero"</code>, <code>attack()</code> returning 10, and <code>describe()</code> returning <code>"NAME the ROLE"</code><br>
            • <code>Mage(Hero)</code>: <code>role = "Mage"</code>, <code>Mage(name, mana)</code> (use <code>super()</code>); <code>attack()</code> returns 25 and uses 10 mana if mana ≥ 10, otherwise returns 5<br>
            • <code>Archer(Hero)</code>: <code>role = "Archer"</code>, <code>attack()</code> returns 15`,
          starter: d`
            class Hero:
                role = "Hero"

                def __init__(self, name):
                    self.name = name
            `,
          solution: d`
            class Hero:
                role = "Hero"

                def __init__(self, name):
                    self.name = name

                def attack(self):
                    return 10

                def describe(self):
                    return f"{self.name} the {self.role}"

            class Mage(Hero):
                role = "Mage"

                def __init__(self, name, mana):
                    super().__init__(name)
                    self.mana = mana

                def attack(self):
                    if self.mana >= 10:
                        self.mana -= 10
                        return 25
                    return 5

            class Archer(Hero):
                role = "Archer"

                def attack(self):
                    return 15`,
          hints: ['describe uses self.role: f"{self.name} the {self.role}"', "Mage.__init__: super().__init__(name) then self.mana = mana", "Archer only needs role and attack()"],
          tests: [{ code: d`
            H = expect_class("Hero"); M = expect_class("Mage"); A = expect_class("Archer")
            if not issubclass(M, H) or not issubclass(A, H):
                raise AssertionError("Mage and Archer must inherit from Hero: class Mage(Hero):")
            code_contains("super()", "Use super().__init__(name) inside Mage.__init__")
            h = H("Bo"); expect_equal(h.attack(), 10, "Hero.attack()")
            expect_equal(h.describe(), "Bo the Hero", "Hero.describe()")
            m = M("Ivy", 15)
            expect_equal(m.describe(), "Ivy the Mage", "Mage.describe()")
            expect_equal(m.attack(), 25, "first Mage attack (mana 15)")
            expect_equal(m.mana, 5, "mana after one attack")
            expect_equal(m.attack(), 5, "Mage attack with mana 5")
            a = A("Rin"); expect_equal(a.attack(), 15, "Archer.attack()")
            expect_equal(a.describe(), "Rin the Archer", "Archer.describe()")` }],
        },
        {
          id: "11-4", title: "The Royal Vault",
          story: "No one may change the vault's gold directly — only through proper deposits.",
          lesson: `<p><b>Encapsulation</b>: hide internal data and expose safe methods. By convention, a leading underscore (<code>self._balance</code>) means “internal, don't touch”.</p>
            <p><code>@property</code> makes a method readable like an attribute — and without a setter, it's <b>read-only</b>.</p>`,
          example: d`
            class Thermometer:
                def __init__(self):
                    self._celsius = 20

                @property
                def celsius(self):
                    return self._celsius

            t = Thermometer()
            print(t.celsius)     # 20
            # t.celsius = 5      # AttributeError - read-only!`,
          task: `Create class <code>Vault(owner)</code>:<br>
            • starts with <code>_balance = 0</code> and an empty list <code>history</code><br>
            • read-only property <code>balance</code><br>
            • <code>deposit(amount)</code>: raise <code>ValueError</code> if amount ≤ 0; else add it and append <code>("deposit", amount)</code> to history<br>
            • <code>withdraw(amount)</code>: raise <code>ValueError</code> if amount ≤ 0 or more than balance; else subtract and append <code>("withdraw", amount)</code>`,
          starter: d`
            class Vault:
                def __init__(self, owner):
                    self.owner = owner
            `,
          solution: d`
            class Vault:
                def __init__(self, owner):
                    self.owner = owner
                    self._balance = 0
                    self.history = []

                @property
                def balance(self):
                    return self._balance

                def deposit(self, amount):
                    if amount <= 0:
                        raise ValueError("Amount must be positive")
                    self._balance += amount
                    self.history.append(("deposit", amount))

                def withdraw(self, amount):
                    if amount <= 0 or amount > self._balance:
                        raise ValueError("Invalid amount")
                    self._balance -= amount
                    self.history.append(("withdraw", amount))`,
          hints: ["@property above def balance(self): return self._balance", "Each method validates first, then changes _balance and history."],
          tests: [{ code: d`
            V = expect_class("Vault")
            v = V("Queen")
            expect_equal(v.balance, 0, "starting balance")
            v.deposit(100); v.withdraw(30)
            expect_equal(v.balance, 70, "balance after deposit 100, withdraw 30")
            expect_equal(v.history, [("deposit", 100), ("withdraw", 30)], "history")
            expect_raises(ValueError, v.deposit, 0)
            expect_raises(ValueError, v.withdraw, 1000)
            expect_raises(ValueError, v.withdraw, -1)
            def _set(): v.balance = 5
            expect_raises(AttributeError, _set)
            expect_equal(v.balance, 70, "balance must not change after failed operations")` }],
        },
        {
          id: "11-5", type: "quiz", title: "Riddles of the Knights",
          story: "The knights test every newcomer with riddles about objects. Fail, and you polish armour for a week.",
          lesson: `<ul><li>A <b>class attribute</b> is shared by all objects. Assigning <code>obj.attr = ...</code> creates an <b>instance</b> attribute that hides the shared one for that object only.</li>
            <li>But <b>mutating</b> a shared mutable class attribute (like <code>self.members.append(...)</code> on a class-level list) changes it for everyone. Create lists in <code>__init__</code> instead.</li>
            <li><code>__str__</code> is used by <code>print()</code>; <code>__repr__</code> is used inside lists, in the console, and as a fallback.</li>
            <li><code>isinstance(obj, Parent)</code> is <code>True</code> for objects of child classes too.</li>
            <li>Without <code>__eq__</code>, <code>==</code> compares <b>identity</b>: two separate objects are never equal, even with the same data.</li></ul>`,
          example: d`
            class Coin:
                def __init__(self, value):
                    self.value = value
                def __eq__(self, other):
                    return self.value == other.value
                def __repr__(self):
                    return f"Coin({self.value})"

            print(Coin(5) == Coin(5), [Coin(1), Coin(2)])`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                class Knight:
                    title = "Sir"
                k1 = Knight()
                k2 = Knight()
                k1.title = "Dame"
                print(k1.title, k2.title, Knight.title)`,
              choices: ["Dame Sir Sir", "Dame Dame Dame", "Dame Dame Sir", "Sir Sir Sir"], answer: 0,
              explain: "<code>k1.title = ...</code> creates an attribute on <code>k1</code> only. <code>k2</code> and the class still see \"Sir\"." },
            { q: "What does this print?", predict: true, code: d`
                class Team:
                    members = []
                    def add(self, name):
                        self.members.append(name)
                a = Team()
                b = Team()
                a.add("Lyra")
                print(b.members)`,
              choices: ["[]", "['Lyra']", "None", "AttributeError"], answer: 1,
              explain: "There is only one <code>members</code> list, on the class, and both teams share it. Create <code>self.members = []</code> in <code>__init__</code>." },
            { q: "What does this print?", predict: true, code: d`
                class Potion:
                    def __init__(self, heal):
                        self.heal = heal
                    def __str__(self):
                        return f"Potion +{self.heal}"
                    def __repr__(self):
                        return f"P{self.heal}"
                p = Potion(5)
                print(p, [p])`,
              choices: ["Potion +5 [Potion +5]", "Potion +5 [P5]", "P5 [P5]", "P5 [Potion +5]"], answer: 1,
              explain: "<code>print</code> uses <code>__str__</code>, but a list shows its items with <code>__repr__</code>." },
            { q: "What does this print?", predict: true, code: d`
                class Animal:
                    def speak(self):
                        return "..."
                class Dog(Animal):
                    def speak(self):
                        return "Woof " + super().speak()
                d = Dog()
                print(d.speak(), isinstance(d, Animal), isinstance(Animal(), Dog))`,
              choices: ["Woof ... True False", "Woof True True", "... True False", "Woof ... False False"], answer: 0,
              explain: "<code>super().speak()</code> calls the parent's version. A Dog is an Animal, but not every Animal is a Dog." },
            { q: "What does this print?", predict: true, code: d`
                class Coin:
                    def __init__(self, value):
                        self.value = value
                print(Coin(5) == Coin(5), Coin(5).value == Coin(5).value)`,
              choices: ["True True", "False True", "False False", "True False"], answer: 1,
              explain: "Without <code>__eq__</code>, <code>==</code> asks \"is this the very same object?\". The values are equal numbers, though." },
          ],
        },
        {
          id: "11-6", boss: true, time: 1080, title: "The Arrow Vectors",
          story: "The castle archers aim with vectors. Teach Python to add, scale and measure them as easily as numbers.",
          lesson: `<p><b>Special methods</b> (also called dunder methods, for "double underscore") let your objects work with Python's operators:</p>
            <ul><li><code>__add__(self, other)</code> → <code>a + b</code>; <code>__sub__</code> → <code>a - b</code></li>
            <li><code>__mul__(self, k)</code> → <code>v * 3</code>; <code>__rmul__(self, k)</code> → <code>3 * v</code> (Python tries the right-hand side when the left one doesn't know how)</li>
            <li><code>__eq__</code> → <code>==</code>; <code>__abs__</code> → <code>abs(v)</code>; <code>__repr__</code> → how it looks</li></ul>
            <p>Return a <b>new</b> object from arithmetic methods instead of changing <code>self</code>, just like numbers do. NumPy arrays work exactly this way.</p>`,
          example: d`
            class Money:
                def __init__(self, cents):
                    self.cents = cents
                def __add__(self, other):
                    return Money(self.cents + other.cents)
                def __mul__(self, k):
                    return Money(self.cents * k)
                __rmul__ = __mul__
                def __repr__(self):
                    return f"Money({self.cents})"

            print(Money(150) + Money(75), Money(20) * 3, 2 * Money(5))`,
          task: `Create class <code>Vector</code> with <code>Vector(x, y)</code> storing <code>x</code> and <code>y</code>, and:<br>
            • <code>repr(Vector(1, 2))</code> → <code>"Vector(1, 2)"</code><br>
            • <code>v + w</code> and <code>v - w</code> → new vectors<br>
            • <code>v * 3</code> <b>and</b> <code>3 * v</code> → a new vector with both parts multiplied<br>
            • <code>v == w</code> → True when both parts are equal<br>
            • <code>abs(v)</code> → the length √(x² + y²) as a float<br>
            • <code>v.dot(w)</code> → x₁·x₂ + y₁·y₂`,
          starter: d`
            class Vector:
                def __init__(self, x, y):
                    self.x = x
                    self.y = y
            `,
          solution: d`
            import math

            class Vector:
                def __init__(self, x, y):
                    self.x = x
                    self.y = y

                def __repr__(self):
                    return f"Vector({self.x}, {self.y})"

                def __add__(self, other):
                    return Vector(self.x + other.x, self.y + other.y)

                def __sub__(self, other):
                    return Vector(self.x - other.x, self.y - other.y)

                def __mul__(self, k):
                    return Vector(self.x * k, self.y * k)

                def __rmul__(self, k):
                    return self * k

                def __eq__(self, other):
                    return isinstance(other, Vector) and self.x == other.x and self.y == other.y

                def __abs__(self):
                    return math.sqrt(self.x ** 2 + self.y ** 2)

                def dot(self, other):
                    return self.x * other.x + self.y * other.y`,
          hints: ["__repr__ returns f\"Vector({self.x}, {self.y})\"", "__add__ returns Vector(self.x + other.x, self.y + other.y)", "__rmul__(self, k) can simply return self * k", "abs: (self.x ** 2 + self.y ** 2) ** 0.5"],
          tests: [{ code: d`
            V = expect_class("Vector")
            a, b = V(1, 2), V(3, -4)
            expect_equal(repr(a), "Vector(1, 2)", "repr(Vector(1, 2))")
            expect_equal(repr(a + b), "Vector(4, -2)", "Vector(1, 2) + Vector(3, -4)")
            expect_equal(repr(b - a), "Vector(2, -6)", "Vector(3, -4) - Vector(1, 2)")
            expect_equal(repr(a * 3), "Vector(3, 6)", "Vector(1, 2) * 3")
            expect_equal(repr(3 * a), "Vector(3, 6)", "3 * Vector(1, 2)")
            expect_equal(repr(a), "Vector(1, 2)", "the original vector after a + b and a * 3 (it must not change)")
            expect_equal(a == V(1, 2), True, "Vector(1, 2) == Vector(1, 2)")
            expect_equal(a == b, False, "Vector(1, 2) == Vector(3, -4)")
            expect_equal(abs(b), 5.0, "abs(Vector(3, -4))")
            expect_close(abs(a), 5 ** 0.5, "abs(Vector(1, 2))")
            expect_equal(a.dot(b), -5, "Vector(1, 2).dot(Vector(3, -4))")
            expect_equal(V(0, 0) + V(0, 0) == V(0, 0), True, "Vector(0, 0) + Vector(0, 0) == Vector(0, 0)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 12
    {
      id: 12, name: "The Sorcerer's Study", topic: "modules, generators & decorators", time: 900, icon: "🔮",
      intro: "Deep magic: borrow power from libraries, create endless sequences, and enchant functions.",
      missions: [
        {
          id: "12-1", title: "Borrowed Magic",
          story: "The study's shelves hold Python's standard library. Borrow wisely.",
          lesson: `<p><b>Modules</b> are files of ready-made code. Python ships with a huge <b>standard library</b>:</p>
            <ul><li><code>import math</code> → <code>math.pi</code>, <code>math.sqrt()</code></li>
            <li><code>from collections import Counter</code> → counts things for you</li>
            <li>also <code>random</code>, <code>datetime</code>, <code>json</code>, <code>os</code>, <code>itertools</code>…</li></ul>
            <p>Outside this game you install extra packages with <code>pip install name</code>.</p>`,
          example: d`
            import math
            from collections import Counter

            print(math.sqrt(16))                  # 4.0
            print(round(math.pi, 3))              # 3.142
            c = Counter("hello")
            print(c["l"], c.most_common(1))       # 2 [('l', 2)]`,
          task: `Write <code>circle_area(r)</code> returning π·r² rounded to 2 decimals (use <code>math.pi</code>),<br>
            and <code>top_letter(text)</code> returning the most common <b>letter</b> (ignore case and non-letters, use <code>Counter</code>). On a tie, return the alphabetically first.`,
          starter: d`
            import math
            from collections import Counter

            def circle_area(r):
                pass

            def top_letter(text):
                pass
            `,
          solution: d`
            import math
            from collections import Counter

            def circle_area(r):
                return round(math.pi * r ** 2, 2)

            def top_letter(text):
                c = Counter(ch for ch in text.lower() if ch.isalpha())
                best = max(c.values())
                return min(ch for ch in c if c[ch] == best)`,
          hints: ["round(math.pi * r ** 2, 2)", "Counter(ch for ch in text.lower() if ch.isalpha())", "Find the highest count, then the smallest letter with that count."],
          tests: [{ code: d`
            must_use("import"); must_call("Counter")
            ca = expect_func("circle_area"); tl = expect_func("top_letter")
            expect_equal(ca(1), 3.14, "circle_area(1)")
            expect_equal(ca(2.5), 19.63, "circle_area(2.5)")
            expect_equal(tl("Hello World"), "l", 'top_letter("Hello World")')
            expect_equal(tl("ba ba"), "a", 'top_letter("ba ba") (tie)')
            expect_equal(tl("Zz! yY? x"), "y", 'top_letter("Zz! yY? x")')` }],
        },
        {
          id: "12-2", title: "The Endless Stairs",
          story: "A staircase that creates each step only when you need it.",
          lesson: `<p>A <b>generator</b> function uses <code>yield</code> instead of <code>return</code>. It produces values <b>one at a time</b>, pausing in between — so it can even be infinite without using lots of memory.</p>
            <p>Get values with a <code>for</code> loop, <code>list(...)</code> or <code>next(gen)</code>.</p>`,
          example: d`
            def squares(n):
                for i in range(n):
                    yield i * i

            print(list(squares(4)))   # [0, 1, 4, 9]
            g = squares(3)
            print(next(g), next(g))   # 0 1`,
          task: `Write generator <code>countdown(n)</code> yielding n, n-1, …, 1,<br>and an <b>infinite</b> generator <code>evens()</code> yielding 0, 2, 4, 6, …`,
          starter: d`
            def countdown(n):
                pass

            def evens():
                pass
            `,
          solution: d`
            def countdown(n):
                while n > 0:
                    yield n
                    n -= 1

            def evens():
                n = 0
                while True:
                    yield n
                    n += 2`,
          hints: ["Use yield inside a while loop", "Infinite: while True: yield n; n += 2"],
          tests: [{ code: d`
            must_use("yield")
            from itertools import islice
            cd = expect_func("countdown"); ev = expect_func("evens")
            expect_equal(list(cd(4)), [4, 3, 2, 1], "list(countdown(4))")
            expect_equal(list(cd(0)), [], "list(countdown(0))")
            expect_equal(list(islice(ev(), 5)), [0, 2, 4, 6, 8], "first 5 of evens()")
            g = ev(); next(g); expect_equal(next(g), 2, "second value of evens()")` }],
        },
        {
          id: "12-3", title: "Enchant the Spell",
          story: "Wrap any spell in an enchantment that makes it LOUDER.",
          lesson: `<p>Functions are values: you can pass them to other functions and return them. A <b>decorator</b> takes a function and returns a new, enhanced function.</p>
            <p><code>@shout</code> above a <code>def</code> means <code>f = shout(f)</code>. Use <code>*args, **kwargs</code> to accept any arguments.</p>`,
          example: d`
            def twice(func):
                def wrapper(*args, **kwargs):
                    func(*args, **kwargs)
                    return func(*args, **kwargs)
                return wrapper

            @twice
            def hello(name):
                print("hi", name)

            hello("Ann")   # prints twice`,
          task: `Write decorator <code>shout(func)</code>: the wrapped function returns the original result in UPPERCASE plus <code>"!"</code>.<br>
            Example: <code>@shout def greet(n): return f"hi {n}"</code> → <code>greet("bo")</code> returns <code>"HI BO!"</code>`,
          starter: d`
            def shout(func):
                pass

            @shout
            def greet(name):
                return f"hi {name}"

            print(greet("bo"))`,
          solution: d`
            def shout(func):
                def wrapper(*args, **kwargs):
                    return func(*args, **kwargs).upper() + "!"
                return wrapper

            @shout
            def greet(name):
                return f"hi {name}"

            print(greet("bo"))`,
          hints: ["Define def wrapper(*args, **kwargs): inside shout", "return func(*args, **kwargs).upper() + \"!\"", "shout must return wrapper (not call it)."],
          tests: [{ code: d`
            sh = expect_func("shout")
            @sh
            def f(a, b="x"):
                return a + " " + b
            expect_equal(f("hey"), "HEY X!", "decorated f('hey')")
            expect_equal(f("yo", b="there"), "YO THERE!", "decorated f('yo', b='there')")
            expect_output("HI BO!")` }],
        },
        {
          id: "12-4", type: "quiz", title: "Riddles of the Study",
          story: "The sorcerer's books are enchanted: they only work when you know exactly when each spell runs.",
          lesson: `<ul><li>Calling a generator function runs <b>none</b> of its code. Each <code>next()</code> runs it up to the next <code>yield</code>.</li>
            <li>A generator can be used <b>once</b>. After it's exhausted, it gives nothing more.</li>
            <li>Stacked decorators apply from the <b>bottom up</b>: <code>@a</code> above <code>@b</code> means <code>f = a(b(f))</code>.</li>
            <li><code>import math as m</code> gives the module a short name; <code>from math import sqrt</code> imports one name directly.</li>
            <li>Every file has a <code>__name__</code>. It is <code>"__main__"</code> when the file is run directly, so <code>if __name__ == "__main__":</code> marks code that should run only then (not when the file is imported).</li></ul>`,
          example: d`
            def numbers():
                print("  (generator starts)")
                yield 1
                yield 2

            g = numbers()
            print("made the generator")
            print(next(g), next(g))
            print(list(g))      # already used up

            if __name__ == "__main__":
                print("running as the main program")`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                def gen():
                    print("start")
                    yield 1
                    print("middle")
                    yield 2
                g = gen()
                print("created")
                print(next(g))`,
              choices: ["created\nstart\n1", "start\ncreated\n1", "start\nmiddle\ncreated\n1", "created\nstart\n1\nmiddle"], answer: 0,
              explain: "Creating the generator runs nothing. <code>next(g)</code> runs up to the first <code>yield</code>." },
            { q: "What does this print?", predict: true, code: d`
                squares = (x * x for x in range(3))
                print(list(squares))
                print(list(squares))`,
              choices: ["[0, 1, 4]\n[0, 1, 4]", "[0, 1, 4]\n[]", "[1, 4, 9]\n[]", "<generator>\n[0, 1, 4]"], answer: 1,
              explain: "A generator expression can only be consumed once." },
            { q: "What does this print?", predict: true, code: d`
                def twice(f):
                    def wrapper():
                        return f() * 2
                    return wrapper
                def exclaim(f):
                    def wrapper():
                        return f() + "!"
                    return wrapper
                @exclaim
                @twice
                def hi():
                    return "hi"
                print(hi())`,
              choices: ["hihi!", "hi!hi!", "hi!", "hihi"], answer: 0,
              explain: "<code>hi = exclaim(twice(hi))</code>: first doubled to \"hihi\", then \"!\" is added." },
            { q: "What does this print?", predict: true, code: d`
                import math as m
                from math import sqrt
                print(m.floor(2.7), sqrt(16))`,
              choices: ["2 4.0", "3 4", "2 4", "2.0 4.0"], answer: 0,
              explain: "<code>floor</code> rounds down to an int; <code>sqrt</code> always returns a float." },
            { q: "What does this print when the file is run directly?", predict: true, code: d`
                print(__name__)`,
              choices: ["__main__", "main", "<your code>", "None"], answer: 0,
              explain: "Run directly, a file's <code>__name__</code> is <code>\"__main__\"</code>. Imported, it's the module's name." },
          ],
        },
        {
          id: "12-5", title: "The Toolsmith's Belt",
          story: "The sorcerer's apprentice keeps a belt of handy tools. The collections module is the best belt in Python.",
          lesson: `<p>The <code>collections</code> module has containers for common jobs:</p>
            <ul><li><code>namedtuple("Point", ["x", "y"])</code> → a tuple type whose items have names: <code>p.x</code>, <code>p.y</code></li>
            <li><code>defaultdict(list)</code> → a dict that creates an empty list for a missing key, so you can just <code>d[k].append(v)</code></li>
            <li><code>Counter(items)</code> → counts things; <code>.most_common(n)</code> gives the top <code>n</code> as <code>(item, count)</code> pairs</li>
            <li><code>deque(maxlen=n)</code> → a list-like queue that keeps only the last <code>n</code> items (fast at both ends)</li></ul>`,
          example: d`
            from collections import namedtuple, defaultdict, Counter, deque

            Card = namedtuple("Card", ["rank", "suit"])
            c = Card("Q", "hearts")
            print(c.rank, c[1], c)

            by_len = defaultdict(list)
            for w in ["a", "bb", "cc", "d"]:
                by_len[len(w)].append(w)
            print(dict(by_len))

            print(Counter("abracadabra").most_common(2))
            last3 = deque([1, 2, 3, 4, 5], maxlen=3)
            print(list(last3))`,
          task: `Using the <code>collections</code> module, write:<br>
            • <code>Point</code>: a namedtuple with fields <code>x</code> and <code>y</code>, and <code>distance(p, q)</code> → the straight-line distance between two Points<br>
            • <code>group_by_letter(words)</code> → a dict mapping each word's first letter (lowercase) to the list of words starting with it, in order (use <code>defaultdict</code>)<br>
            • <code>top_words(text, n)</code> → the <code>n</code> most common words (lowercased, split on spaces) as <code>(word, count)</code> tuples (use <code>Counter</code>)<br>
            • <code>recent(events, n)</code> → a list of the last <code>n</code> events (use <code>deque</code> with <code>maxlen</code>)`,
          starter: d`
            from collections import namedtuple, defaultdict, Counter, deque

            def distance(p, q):
                pass

            def group_by_letter(words):
                pass

            def top_words(text, n):
                pass

            def recent(events, n):
                pass
            `,
          solution: d`
            from collections import namedtuple, defaultdict, Counter, deque
            import math

            Point = namedtuple("Point", ["x", "y"])

            def distance(p, q):
                return math.hypot(p.x - q.x, p.y - q.y)

            def group_by_letter(words):
                groups = defaultdict(list)
                for w in words:
                    groups[w[0].lower()].append(w)
                return dict(groups)

            def top_words(text, n):
                return Counter(text.lower().split()).most_common(n)

            def recent(events, n):
                return list(deque(events, maxlen=n))`,
          hints: ["Point = namedtuple(\"Point\", [\"x\", \"y\"]) at the top level.", "distance: ((p.x - q.x) ** 2 + (p.y - q.y) ** 2) ** 0.5", "Counter(text.lower().split()).most_common(n)", "list(deque(events, maxlen=n))"],
          tests: [{ code: d`
            for name in ("namedtuple", "defaultdict", "Counter", "deque"):
                must_call(name)
            Point = expect_var("Point")
            assert issubclass(Point, tuple) and getattr(Point, "_fields", None) == ("x", "y"), "Point must be a namedtuple with fields x and y"
            distance = expect_func("distance"); gbl = expect_func("group_by_letter"); top = expect_func("top_words"); recent = expect_func("recent")
            expect_close(distance(Point(0, 0), Point(3, 4)), 5.0, "distance(Point(0, 0), Point(3, 4))")
            expect_close(distance(Point(1, 1), Point(1, 1)), 0.0, "distance between the same point")
            expect_equal(dict(gbl(["Apple", "bear", "axe", "Bat", "cat"])), {"a": ["Apple", "axe"], "b": ["bear", "Bat"], "c": ["cat"]}, 'group_by_letter(["Apple", "bear", "axe", "Bat", "cat"])')
            expect_equal(dict(gbl([])), {}, "group_by_letter([])")
            expect_equal(top("the cat and The dog and THE bird", 2), [("the", 3), ("and", 2)], 'top_words("the cat and The dog and THE bird", 2)')
            expect_equal(top("one", 5), [("one", 1)], 'top_words("one", 5)')
            expect_equal(recent(["a", "b", "c", "d", "e"], 3), ["c", "d", "e"], "recent([a..e], 3)")
            expect_equal(recent(["a"], 3), ["a"], "recent([a], 3)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR: THE MERCHANT'S LEDGER
    {
      id: 14, name: "The Merchant's Ledger", topic: "dates, JSON & CSV files", time: 900, icon: "📒",
      intro: "The tower's merchants keep their records as dates, JSON and CSV. Every data scientist reads these formats every day.",
      missions: [
        {
          id: "14-1", title: "Days of the Realm",
          story: "The merchant's contracts are full of dates. Late deliveries cost gold, so the dates must be exactly right.",
          lesson: `<p>The <code>datetime</code> module handles dates properly (leap years, month lengths…):</p>
            <ul><li><code>date(2024, 3, 15)</code> or <code>date.fromisoformat("2024-03-15")</code> create a date</li>
            <li><code>datetime.strptime("15/03/2024", "%d/%m/%Y")</code> <b>parses</b> text in any format; add <code>.date()</code> to keep only the date</li>
            <li><code>d.strftime("%A %d %B %Y")</code> <b>formats</b> a date as text → <code>Friday 15 March 2024</code></li>
            <li>Subtracting two dates gives a <code>timedelta</code>; its <code>.days</code> is the number of days</li>
            <li><code>d + timedelta(days=30)</code> moves a date forward</li></ul>
            <p>Common codes: <code>%Y</code> year, <code>%m</code> month number, <code>%d</code> day, <code>%A</code> weekday name, <code>%B</code> month name, <code>%H:%M</code> time.</p>`,
          example: d`
            from datetime import date, datetime, timedelta

            d = date.fromisoformat("2024-02-27")
            print(d + timedelta(days=3))          # leap year handled
            print(d.strftime("%A %d %B %Y"))
            t = datetime.strptime("05/01/2025 14:30", "%d/%m/%Y %H:%M")
            print(t, t.date())
            print((date(2025, 1, 1) - d).days, "days until new year")`,
          task: `Write:<br>
            • <code>parse_date(text)</code>: text like <code>"15/03/2024"</code> (day/month/year) → a <code>date</code> object<br>
            • <code>days_between(a, b)</code>: two <code>"YYYY-MM-DD"</code> strings → the number of days between them (never negative)<br>
            • <code>due_date(start, days)</code>: a <code>"YYYY-MM-DD"</code> string and a number of days → the due date as a <code>"YYYY-MM-DD"</code> string<br>
            • <code>day_name(text)</code>: a <code>"YYYY-MM-DD"</code> string → the weekday name, e.g. <code>"Friday"</code>`,
          starter: d`
            from datetime import date, datetime, timedelta

            def parse_date(text):
                pass

            def days_between(a, b):
                pass

            def due_date(start, days):
                pass

            def day_name(text):
                pass
            `,
          solution: d`
            from datetime import date, datetime, timedelta

            def parse_date(text):
                return datetime.strptime(text, "%d/%m/%Y").date()

            def days_between(a, b):
                return abs((date.fromisoformat(b) - date.fromisoformat(a)).days)

            def due_date(start, days):
                return (date.fromisoformat(start) + timedelta(days=days)).isoformat()

            def day_name(text):
                return date.fromisoformat(text).strftime("%A")`,
          hints: ["datetime.strptime(text, \"%d/%m/%Y\").date()", "(date.fromisoformat(b) - date.fromisoformat(a)).days, then abs()", "str(some_date) and some_date.isoformat() both give \"YYYY-MM-DD\""],
          tests: [{ code: d`
            from datetime import date
            pd = expect_func("parse_date"); db = expect_func("days_between"); dd = expect_func("due_date"); dn = expect_func("day_name")
            expect_equal(pd("15/03/2024"), date(2024, 3, 15), 'parse_date("15/03/2024")')
            expect_equal(pd("01/12/1999"), date(1999, 12, 1), 'parse_date("01/12/1999")')
            expect_equal(db("2024-01-01", "2024-03-01"), 60, 'days_between("2024-01-01", "2024-03-01") (2024 is a leap year)')
            expect_equal(db("2023-03-01", "2023-01-01"), 59, 'days_between("2023-03-01", "2023-01-01")')
            expect_equal(db("2024-05-05", "2024-05-05"), 0, "days_between the same day")
            expect_equal(dd("2024-02-27", 3), "2024-03-01", 'due_date("2024-02-27", 3)')
            expect_equal(dd("2024-12-30", 5), "2025-01-04", 'due_date("2024-12-30", 5)')
            expect_equal(dn("2024-03-15"), "Friday", 'day_name("2024-03-15")')
            expect_equal(dn("2000-01-01"), "Saturday", 'day_name("2000-01-01")')` }],
        },
        {
          id: "14-2", title: "The Sealed Letter",
          story: "Messages between towers travel as JSON: plain text that any program, in any language, can read.",
          lesson: `<p><b>JSON</b> is the most common format for sending data between programs and storing settings. The <code>json</code> module converts between Python and JSON text:</p>
            <ul><li><code>json.dumps(obj)</code> → a JSON string; <code>json.loads(text)</code> → Python objects</li>
            <li><code>json.dump(obj, f, indent=2)</code> / <code>json.load(f)</code> → the same, straight to/from a file</li>
            <li><code>sort_keys=True</code> sorts dict keys; <code>indent=2</code> makes it readable</li></ul>
            <p>Types change on the way: dict → object, list <b>and tuple</b> → array, <code>True</code> → <code>true</code>, <code>None</code> → <code>null</code>, and dict keys always become strings.</p>`,
          example: d`
            import json

            hero = {"name": "Lyra", "level": 3, "items": ("bow", "rope"), "cursed": False, "pet": None}
            text = json.dumps(hero, sort_keys=True)
            print(text)
            back = json.loads(text)
            print(back["items"], type(back["items"]).__name__)

            with open("hero.json", "w") as f:
                json.dump(hero, f, indent=2)
            with open("hero.json") as f:
                print(json.load(f)["name"])`,
          task: `Write:<br>
            • <code>to_json(record)</code> → the record as a JSON string with <b>sorted keys</b><br>
            • <code>save_heroes(filename, heroes)</code> → writes the list of hero dicts to the file as JSON (indent 2)<br>
            • <code>load_heroes(filename)</code> → reads the list back from the file<br>
            • <code>strongest(filename)</code> → the name of the hero with the highest <code>"power"</code> in the file (<code>None</code> if the list is empty)`,
          starter: d`
            import json

            def to_json(record):
                pass

            def save_heroes(filename, heroes):
                pass

            def load_heroes(filename):
                pass

            def strongest(filename):
                pass
            `,
          solution: d`
            import json

            def to_json(record):
                return json.dumps(record, sort_keys=True)

            def save_heroes(filename, heroes):
                with open(filename, "w") as f:
                    json.dump(heroes, f, indent=2)

            def load_heroes(filename):
                with open(filename) as f:
                    return json.load(f)

            def strongest(filename):
                heroes = load_heroes(filename)
                if not heroes:
                    return None
                return max(heroes, key=lambda h: h["power"])["name"]`,
          hints: ["json.dumps(record, sort_keys=True)", "with open(filename, \"w\") as f: json.dump(heroes, f, indent=2)", "strongest: max(heroes, key=lambda h: h[\"power\"])[\"name\"]"],
          tests: [{ code: d`
            import json
            tj = expect_func("to_json"); sh = expect_func("save_heroes"); lh = expect_func("load_heroes"); st = expect_func("strongest")
            expect_equal(tj({"b": 1, "a": [1, 2], "c": None}), '{"a": [1, 2], "b": 1, "c": null}', 'to_json({"b": 1, "a": [1, 2], "c": None})')
            expect_equal(tj({"ok": True, "pos": (1, 2)}), '{"ok": true, "pos": [1, 2]}', 'to_json({"ok": True, "pos": (1, 2)})')
            heroes = [{"name": "Lyra", "power": 40}, {"name": "Orin", "power": 75}, {"name": "Mira", "power": 60}]
            sh("heroes.json", heroes)
            with open("heroes.json") as f:
                raw = f.read()
            try:
                expect_equal(json.loads(raw), heroes, "the file written by save_heroes")
            except json.JSONDecodeError:
                raise AssertionError("heroes.json isn't valid JSON. Use json.dump(heroes, f, indent=2).")
            assert "\n  " in raw, "Write the file with indent=2 so people can read it."
            expect_equal(lh("heroes.json"), heroes, 'load_heroes("heroes.json")')
            expect_equal(st("heroes.json"), "Orin", 'strongest("heroes.json")')
            sh("none.json", [])
            expect_equal(st("none.json"), None, "strongest on an empty list")` }],
        },
        {
          id: "14-3", title: "The Merchant's Books",
          story: "The merchant's account book is a CSV file. Some item names even contain commas, so splitting by hand won't do.",
          lesson: `<p><b>CSV</b> (comma-separated values) is the simplest table format: one row per line, a header line with column names. Spreadsheets and databases all export it.</p>
            <ul><li><code>csv.DictReader(f)</code> gives each row as a dict keyed by the header: <code>row["price"]</code></li>
            <li>Every value is a <b>string</b>: convert with <code>int()</code> / <code>float()</code></li>
            <li>Values containing commas are wrapped in quotes: <code>"Bread, rye",3</code>. The csv module handles this; <code>line.split(",")</code> does not</li>
            <li>Write with <code>csv.writer(f)</code> and <code>.writerow([...])</code>, or <code>csv.DictWriter</code>. Open files for CSV with <code>newline=""</code></li></ul>`,
          example: d`
            import csv

            with open("shop.csv", "w", newline="") as f:
                w = csv.writer(f)
                w.writerow(["item", "price"])
                w.writerow(["Bread, rye", 2.5])
                w.writerow(["Milk", 1.2])

            with open("shop.csv", newline="") as f:
                for row in csv.DictReader(f):
                    print(row["item"], "costs", float(row["price"]))`,
          task: `A CSV file has the header <code>item,category,qty,price</code>. Write:<br>
            • <code>total_by_category(filename)</code> → a dict <code>{category: total}</code> where total is the sum of <code>qty × price</code>, rounded to 2 decimals<br>
            • <code>write_summary(filename, totals)</code> → writes a CSV with the header <code>category,total</code> and one row per category, sorted by category name`,
          starter: d`
            import csv

            def total_by_category(filename):
                totals = {}
                with open(filename) as f:
                    for line in f:
                        item, category, qty, price = line.split(",")
                return totals

            def write_summary(filename, totals):
                pass
            `,
          solution: d`
            import csv

            def total_by_category(filename):
                totals = {}
                with open(filename, newline="") as f:
                    for row in csv.DictReader(f):
                        value = int(row["qty"]) * float(row["price"])
                        totals[row["category"]] = totals.get(row["category"], 0) + value
                return {k: round(v, 2) for k, v in totals.items()}

            def write_summary(filename, totals):
                with open(filename, "w", newline="") as f:
                    w = csv.writer(f)
                    w.writerow(["category", "total"])
                    for cat in sorted(totals):
                        w.writerow([cat, totals[cat]])`,
          hints: ["for row in csv.DictReader(f): row[\"qty\"] is a string", "Accumulate with totals.get(cat, 0) + value, then round each total at the end.", "write_summary: csv.writer(f), writerow([\"category\", \"total\"]), then one row per sorted category."],
          tests: [{ code: d`
            import csv
            tbc = expect_func("total_by_category"); ws = expect_func("write_summary")
            with open("books.csv", "w", newline="") as f:
                f.write('item,category,qty,price\n"Bread, rye",food,3,2.5\nSword,weapons,1,120\nApple,food,10,0.35\n"Bow, long",weapons,2,80.1\nRope,tools,4,1.15\n')
            got = tbc("books.csv")
            expect_close(got, {"food": 11.0, "weapons": 280.2, "tools": 4.6}, "total_by_category(books.csv)")
            ws("summary.csv", {"weapons": 280.2, "food": 11.0, "tools": 4.6})
            with open("summary.csv", newline="") as f:
                rows = list(csv.reader(f))
            expect_equal(rows[0], ["category", "total"], "header of summary.csv")
            expect_equal([r[0] for r in rows[1:]], ["food", "tools", "weapons"], "categories in summary.csv (sorted)")
            expect_close([float(r[1]) for r in rows[1:]], [11.0, 4.6, 280.2], "totals in summary.csv")` }],
        },
        {
          id: "14-4", type: "quiz", title: "Riddles of the Ledger",
          story: "The head merchant checks that you really understand his formats before trusting you with the books.",
          lesson: `<p>A quick review: JSON turns tuples into lists and every key into a string; <code>true</code>/<code>null</code> are JSON's spelling of <code>True</code>/<code>None</code>. CSV values are always read as strings. Date arithmetic knows about leap years. <code>weekday()</code> counts Monday as 0.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import json
                print(json.dumps({"b": 1, "a": True, "c": None}))`,
              choices: ['{"b": 1, "a": true, "c": null}', "{'b': 1, 'a': True, 'c': None}", '{"a": true, "b": 1, "c": null}', '{"b": 1, "a": "True", "c": "None"}'], answer: 0,
              explain: "Without <code>sort_keys</code>, keys keep their order. JSON writes <code>true</code> and <code>null</code>, with double quotes." },
            { q: "What does this print?", predict: true, code: d`
                import json
                print(json.dumps((1, 2)), json.loads(json.dumps({1: "a"})))`,
              choices: ["[1, 2] {'1': 'a'}", "(1, 2) {1: 'a'}", "[1, 2] {1: 'a'}", '"(1, 2)" {"1": "a"}'], answer: 0,
              explain: "JSON has no tuples (they become arrays) and its keys must be strings, so <code>1</code> came back as <code>'1'</code>." },
            { q: "What does this print?", predict: true, code: d`
                from datetime import date, timedelta
                d = date(2024, 2, 28) + timedelta(days=2)
                print(d, d.weekday())`,
              choices: ["2024-03-01 4", "2024-03-02 5", "2024-02-30 4", "2024-03-01 5"], answer: 0,
              explain: "2024 is a leap year: Feb 28 → Feb 29 → Mar 1, which was a Friday (Monday = 0, so Friday = 4)." },
            { q: "What does this print?", predict: true, code: d`
                import csv, io
                text = 'name,qty\n"Rye, bread",3\n'
                rows = list(csv.reader(io.StringIO(text)))
                print(rows[1], type(rows[1][1]).__name__)`,
              choices: ["['Rye, bread', '3'] str", "['\"Rye', ' bread\"', '3'] str", "['Rye, bread', 3] int", "['Rye', 'bread', '3'] str"], answer: 0,
              explain: "The csv module understands quotes, and gives every value as a string." },
            { q: "What does this print?", predict: true, code: d`
                from datetime import date
                print((date(2024, 12, 25) - date(2024, 12, 1)).days)`,
              choices: ["24", "25", "23", "-24"], answer: 0,
              explain: "Subtracting dates gives a timedelta; Dec 1 to Dec 25 is 24 days." },
          ],
        },
        {
          id: "14-5", boss: true, time: 1350, title: "The Sales Report",
          story: "The merchant guild wants a yearly report: totals by region, the best month, and how many records were damaged.",
          lesson: `<p>This is a small but complete <b>data pipeline</b>, the kind data scientists build every week:</p>
            <ol><li><b>Read</b> raw data (CSV)</li><li><b>Clean</b>: skip rows that can't be parsed, and count them</li>
            <li><b>Aggregate</b>: totals per group</li><li><b>Write</b> the result (JSON) for other programs</li></ol>
            <p>Tip: the month of <code>"2024-03-15"</code> is just <code>date_text[:7]</code> → <code>"2024-03"</code>.</p>`,
          task: `A CSV file has the header <code>date,region,amount</code> (dates are <code>YYYY-MM-DD</code>). Write <code>sales_report(csv_file, json_file)</code> that returns (and also writes to <code>json_file</code> as JSON) a dict with:<br>
            • <code>"total"</code>: the sum of all valid amounts, rounded to 2 decimals<br>
            • <code>"by_region"</code>: <code>{region: total}</code>, each rounded to 2 decimals<br>
            • <code>"best_month"</code>: the <code>"YYYY-MM"</code> with the highest total (<code>None</code> if no valid rows)<br>
            • <code>"bad_rows"</code>: how many rows had an amount that isn't a number<br>`,
          starter: d`
            import csv, json

            def sales_report(csv_file, json_file):
                pass
            `,
          solution: d`
            import csv, json

            def sales_report(csv_file, json_file):
                by_region, by_month, bad = {}, {}, 0
                with open(csv_file, newline="") as f:
                    for row in csv.DictReader(f):
                        try:
                            amount = float(row["amount"])
                        except ValueError:
                            bad += 1
                            continue
                        by_region[row["region"]] = by_region.get(row["region"], 0) + amount
                        month = row["date"][:7]
                        by_month[month] = by_month.get(month, 0) + amount
                report = {
                    "total": round(sum(by_region.values()), 2),
                    "by_region": {r: round(v, 2) for r, v in by_region.items()},
                    "best_month": max(by_month, key=by_month.get) if by_month else None,
                    "bad_rows": bad,
                }
                with open(json_file, "w") as f:
                    json.dump(report, f, indent=2)
                return report`,
          hints: ["Wrap float(row[\"amount\"]) in try/except ValueError: count the bad row and continue.", "Keep two dicts of running totals: one per region, one per month (row[\"date\"][:7]).", "best_month = max(by_month, key=by_month.get)", "Finish with json.dump(report, f, indent=2) and return report."],
          tests: [{ code: d`
            import json
            sr = expect_func("sales_report")
            with open("sales.csv", "w", newline="") as f:
                f.write("date,region,amount\n2024-01-05,North,100.50\n2024-01-20,South,80\n2024-02-02,North,n/a\n2024-02-14,South,300.25\n2024-03-01,East,50\n2024-03-09,North,99.99\n2024-03-30,East,\n")
            got = sr("sales.csv", "report.json")
            expect_close(got.get("total"), 630.74, "total")
            expect_close(got.get("by_region"), {"North": 200.49, "South": 380.25, "East": 50.0}, "by_region")
            expect_equal(got.get("best_month"), "2024-02", "best_month (Feb has 300.25)")
            expect_equal(got.get("bad_rows"), 2, "bad_rows ('n/a' and an empty amount)")
            with open("report.json") as f:
                expect_equal(json.load(f), got, "report.json should contain the same report that is returned")
            with open("empty.csv", "w", newline="") as f:
                f.write("date,region,amount\n2024-01-01,North,oops\n")
            e = sr("empty.csv", "empty.json")
            expect_equal((e.get("total"), e.get("by_region"), e.get("best_month"), e.get("bad_rows")), (0, {}, None, 1), "report for a file with only a bad row (total, by_region, best_month, bad_rows)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR: THE CIPHER CHAMBER
    {
      id: 15, name: "The Cipher Chamber", topic: "regular expressions & text processing", time: 900, icon: "🔣",
      intro: "Malvex hides his secrets in mountains of text. Regular expressions find any pattern in seconds.",
      missions: [
        {
          id: "15-1", title: "Patterns in the Runes",
          story: "The chamber walls are covered in runes, numbers and codes. You need to pull out only the parts that matter.",
          lesson: `<p>A <b>regular expression</b> (regex) describes a text pattern. Python's <code>re</code> module uses them. Always write patterns as raw strings: <code>r"..."</code>.</p>
            <ul><li><code>\\d</code> a digit, <code>\\w</code> a letter/digit/underscore, <code>\\s</code> whitespace, <code>.</code> any character</li>
            <li><code>[A-Z]</code> one character from a set, <code>[^0-9]</code> anything <i>except</i> those</li>
            <li><code>+</code> one or more, <code>*</code> zero or more, <code>?</code> optional, <code>{4}</code> exactly 4, <code>{2,5}</code> between 2 and 5</li>
            <li><code>\\b</code> a word boundary (the edge of a word)</li></ul>
            <p><code>re.findall(pattern, text)</code> returns a list of every match.</p>`,
          example: d`
            import re

            text = "Room 12 has 3 doors, room 7 has -2 keys. Call 555-0199!"
            print(re.findall(r"\d+", text))
            print(re.findall(r"-?\d+", text))
            print(re.findall(r"\b[Rr]oom \d+", text))
            print(re.findall(r"\d{3}-\d{4}", text))`,
          task: `Write:<br>
            • <code>find_numbers(text)</code> → a list of every whole number in the text as <b>ints</b>, including negative ones (<code>-4</code>)<br>
            • <code>find_hashtags(text)</code> → every hashtag's word, without the <code>#</code>: <code>"#python rocks #code2"</code> → <code>["python", "code2"]</code><br>
            • <code>find_codes(text)</code> → every code made of exactly 2 capital letters, a dash and 4 digits, as a whole word: <code>"AB-1234"</code> (but not <code>"ABC-1234"</code> or <code>"AB-12345"</code>)`,
          starter: d`
            import re

            def find_numbers(text):
                pass

            def find_hashtags(text):
                pass

            def find_codes(text):
                pass
            `,
          solution: d`
            import re

            def find_numbers(text):
                return [int(n) for n in re.findall(r"-?\d+", text)]

            def find_hashtags(text):
                return re.findall(r"#(\w+)", text)

            def find_codes(text):
                return re.findall(r"\b[A-Z]{2}-\d{4}\b", text)`,
          hints: ["Numbers: r\"-?\\d+\" then convert each with int().", "If a pattern contains a group ( ), findall returns just the group: r\"#(\\w+)\"", "Codes: r\"\\b[A-Z]{2}-\\d{4}\\b\""],
          tests: [{ code: d`
            must_call("findall")
            fn = expect_func("find_numbers"); fh = expect_func("find_hashtags"); fc = expect_func("find_codes")
            expect_equal(fn("Room 12 has 3 doors and -4 keys"), [12, 3, -4], 'find_numbers("Room 12 has 3 doors and -4 keys")')
            expect_equal(fn("no numbers here"), [], 'find_numbers("no numbers here")')
            expect_equal(fn("x1y22z333"), [1, 22, 333], 'find_numbers("x1y22z333")')
            expect_equal(fh("#python rocks #code2 and #data_science!"), ["python", "code2", "data_science"], 'find_hashtags("#python rocks #code2 and #data_science!")')
            expect_equal(fh("no tags"), [], 'find_hashtags("no tags")')
            expect_equal(fc("AB-1234 ok, ABC-1234 no, XY-9876, AB-12345 no, ab-1234 no, QZ-0001."), ["AB-1234", "XY-9876", "QZ-0001"], "find_codes on a mix of valid and invalid codes")` }],
        },
        {
          id: "15-2", title: "The Gate Validator",
          story: "The chamber's inner gate checks every visitor's name, email and arrival time. Fake ones are turned away.",
          lesson: `<ul><li><code>re.fullmatch(p, s)</code> succeeds only if the <b>whole</b> string matches (use it for validation)</li>
            <li><code>re.search(p, s)</code> finds the first match <b>anywhere</b>; <code>re.match</code> only at the start</li>
            <li>They return a <b>match object</b> (truthy) or <code>None</code></li>
            <li>Parentheses make <b>groups</b>: <code>m.group(1)</code>, <code>m.group(2)</code>, or all at once with <code>m.groups()</code></li>
            <li><code>a|b</code> means a <b>or</b> b; e.g. <code>(0[0-9]|1[0-2])</code> matches 00–12</li></ul>`,
          example: d`
            import re

            print(bool(re.fullmatch(r"[a-z]+", "hello")), bool(re.fullmatch(r"[a-z]+", "hello!")))
            m = re.fullmatch(r"(\d{4})-(\d{2})-(\d{2})", "2024-03-15")
            if m:
                print(m.groups(), int(m.group(2)))
            print(re.search(r"\d+", "abc 42 xyz").group())`,
          task: `Write:<br>
            • <code>is_valid_username(s)</code> → True if it is 3–16 characters, starts with a letter, and contains only letters, digits and <code>_</code><br>
            • <code>is_valid_email(s)</code> → True for a simple email: one or more of letters/digits/<code>. _ + -</code>, then <code>@</code>, then a domain made of parts (letters/digits/<code>-</code>) separated by dots, with at least one dot: <code>ada.l+news@math-club.co.uk</code><br>
            • <code>parse_time(s)</code> → for a 24-hour time <code>"HH:MM"</code> (00–23 and 00–59) return the tuple <code>(hours, minutes)</code> as ints; otherwise <code>None</code>`,
          starter: d`
            import re

            def is_valid_username(s):
                pass

            def is_valid_email(s):
                pass

            def parse_time(s):
                pass
            `,
          solution: d`
            import re

            def is_valid_username(s):
                return re.fullmatch(r"[A-Za-z]\w{2,15}", s) is not None

            def is_valid_email(s):
                return re.fullmatch(r"[\w.+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+", s) is not None

            def parse_time(s):
                m = re.fullmatch(r"([01]\d|2[0-3]):([0-5]\d)", s)
                if not m:
                    return None
                return (int(m.group(1)), int(m.group(2)))`,
          hints: ["Username: one letter, then 2 to 15 more \\w characters: r\"[A-Za-z]\\w{2,15}\"", "Email domain: r\"[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+\" (at least one dot-part)", "Hours 00–23: ([01]\\d|2[0-3]); minutes: ([0-5]\\d)", "Return a real bool: re.fullmatch(...) is not None"],
          tests: [{ code: d`
            must_call("fullmatch")
            u = expect_func("is_valid_username"); e = expect_func("is_valid_email"); t = expect_func("parse_time")
            for s, want in [("lyra", True), ("Lyra_99", True), ("ab", False), ("9lives", False), ("a" * 16, True), ("a" * 17, False), ("bad name", False), ("x-ray", False), ("_hidden", False)]:
                expect_equal(u(s), want, "is_valid_username(" + repr(s) + ")")
            for s, want in [("ada@lovelace.com", True), ("ada.l+news@math-club.co.uk", True), ("ada@lovelace", False), ("@x.com", False), ("ada@@x.com", False), ("ada x@y.com", False), ("ada@x..com", False), ("ada@x.com.", False)]:
                expect_equal(e(s), want, "is_valid_email(" + repr(s) + ")")
            for s, want in [("09:30", (9, 30)), ("23:59", (23, 59)), ("00:00", (0, 0)), ("24:00", None), ("12:60", None), ("7:30", None), ("12:30pm", None), ("ab:cd", None)]:
                expect_equal(t(s), want, "parse_time(" + repr(s) + ")")` }],
        },
        {
          id: "15-3", title: "The Scribe's Cleanup",
          story: "The scribes' copies are messy: odd spacing, private phone numbers, fields split in different ways. Clean them up.",
          lesson: `<ul><li><code>re.sub(pattern, replacement, text)</code> replaces every match</li>
            <li>In the replacement, <code>\\1</code>, <code>\\2</code> insert the text of group 1, 2 (use a raw string: <code>r"\\1"</code>)</li>
            <li><code>re.split(pattern, text)</code> splits wherever the pattern matches, e.g. on several different separators</li>
            <li><code>\\s+</code> matches any run of spaces, tabs and newlines</li></ul>`,
          example: d`
            import re

            print(re.sub(r"\s+", " ", "too    many \t spaces"))
            print(re.sub(r"(\w+)@(\w+)", r"\2 at \1", "mail ada@home"))
            print(re.split(r"\s*[,;]\s*", "red ,green;blue ;  gold"))
            print(re.sub(r"\d", "#", "pin 1234"))`,
          task: `Write:<br>
            • <code>squash_spaces(text)</code> → every run of whitespace becomes a single space, with no spaces at the start or end<br>
            • <code>redact_phones(text)</code> → phone numbers like <code>555-123-4567</code> become <code>XXX-XXX-4567</code> (keep the last 4 digits, use a group)<br>
            • <code>split_fields(line)</code> → split the line on commas <b>or</b> semicolons, removing spaces around each field: <code>"a, b;c ; d"</code> → <code>["a", "b", "c", "d"]</code>`,
          starter: d`
            import re

            def squash_spaces(text):
                return text.replace("  ", " ")

            def redact_phones(text):
                pass

            def split_fields(line):
                return line.split(",")
            `,
          solution: d`
            import re

            def squash_spaces(text):
                return re.sub(r"\s+", " ", text).strip()

            def redact_phones(text):
                return re.sub(r"\b\d{3}-\d{3}-(\d{4})\b", r"XXX-XXX-\1", text)

            def split_fields(line):
                return re.split(r"\s*[,;]\s*", line.strip())`,
          hints: ["re.sub(r\"\\s+\", \" \", text).strip()", "Phones: r\"\\b\\d{3}-\\d{3}-(\\d{4})\\b\" → r\"XXX-XXX-\\1\"", "re.split(r\"\\s*[,;]\\s*\", line.strip())"],
          tests: [{ code: d`
            must_call("sub")
            sq = expect_func("squash_spaces"); rp = expect_func("redact_phones"); sf = expect_func("split_fields")
            expect_equal(sq("  too    many \t spaces\n here "), "too many spaces here", "squash_spaces with spaces, a tab and a newline")
            expect_equal(sq("fine"), "fine", 'squash_spaces("fine")')
            expect_equal(rp("Call 555-123-4567 or 555-987-0000."), "Call XXX-XXX-4567 or XXX-XXX-0000.", "redact_phones with two numbers")
            expect_equal(rp("Order 12-345-6789 and 1234-567-8901 stay"), "Order 12-345-6789 and 1234-567-8901 stay", "redact_phones leaves numbers of other shapes alone")
            expect_equal(sf("a, b;c ; d"), ["a", "b", "c", "d"], 'split_fields("a, b;c ; d")')
            expect_equal(sf("  name ;age,  city  "), ["name", "age", "city"], 'split_fields("  name ;age,  city  ")')
            expect_equal(sf("solo"), ["solo"], 'split_fields("solo")')` }],
        },
        {
          id: "15-4", type: "quiz", title: "Riddles of the Cipher",
          story: "The cipher master speaks only in patterns. Decode what each one matches.",
          lesson: `<ul><li><code>+</code> and <code>*</code> are <b>greedy</b>: they grab as much as possible. Add <code>?</code> (<code>+?</code>, <code>*?</code>) to make them <b>lazy</b> and grab as little as possible.</li>
            <li><code>re.match</code> only checks the <b>start</b> of the string; <code>re.search</code> looks everywhere; <code>re.fullmatch</code> needs the whole string.</li>
            <li><code>group(0)</code> is the whole match; <code>group(1)</code> the first parentheses.</li></ul>`,
          example: d`
            import re
            print(re.findall(r"<.+>", "<b>hi</b>"))
            print(re.findall(r"<.+?>", "<b>hi</b>"))`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import re
                print(re.findall(r"\d+", "a1b22c333"))`,
              choices: ["['1', '22', '333']", "[1, 22, 333]", "['1', '2', '2', '3', '3', '3']", "['122333']"], answer: 0,
              explain: "<code>\\d+</code> matches each run of digits, and <code>findall</code> always returns strings." },
            { q: "What does this print?", predict: true, code: d`
                import re
                print(re.findall(r"<.+>", "<b>hi</b>"), re.findall(r"<.+?>", "<b>hi</b>"))`,
              choices: ["['<b>hi</b>'] ['<b>', '</b>']", "['<b>', '</b>'] ['<b>hi</b>']", "['<b>', '</b>'] ['<b>', '</b>']", "['b', '/b'] ['b', '/b']"], answer: 0,
              explain: "Greedy <code>.+</code> runs to the <b>last</b> <code>&gt;</code>; lazy <code>.+?</code> stops at the first one." },
            { q: "What does this print?", predict: true, code: d`
                import re
                print(re.match(r"\d+", "abc123"), re.search(r"\d+", "abc123").group())`,
              choices: ["None 123", "123 123", "None None", "abc 123"], answer: 0,
              explain: "<code>match</code> only looks at the start, where there are letters. <code>search</code> finds 123 further on." },
            { q: "What does this print?", predict: true, code: d`
                import re
                m = re.search(r"(\w+)@(\w+)\.com", "mail: ada@lovelace.com")
                print(m.group(1), m.group(2), m.group(0))`,
              choices: ["ada lovelace ada@lovelace.com", "ada@lovelace.com ada lovelace", "mail ada lovelace", "ada lovelace com"], answer: 0,
              explain: "Groups are numbered from 1 by their opening parenthesis; group 0 is the whole match." },
            { q: "What does this print?", predict: true, code: d`
                import re
                print(re.sub(r"(\w+) (\w+)", r"\2 \1", "hello world"))`,
              choices: ["world hello", "hello world", "\\2 \\1", "dlrow olleh"], answer: 0,
              explain: "<code>\\2 \\1</code> writes group 2, a space, then group 1: the words swap." },
            { q: "What does this print?", predict: true, code: d`
                import re
                print(bool(re.fullmatch(r"[a-z]+", "abc1")), bool(re.search(r"[a-z]+", "abc1")))`,
              choices: ["False True", "True True", "False False", "True False"], answer: 0,
              explain: "The whole of \"abc1\" isn't lowercase letters (the 1), but a search does find \"abc\" inside it." },
          ],
        },
        {
          id: "15-5", boss: true, time: 1350, title: "The Log Reader",
          story: "Malvex's machines write thousands of log lines. Somewhere in them is the proof of who broke in.",
          lesson: `<p><b>Named groups</b> make patterns readable: <code>(?P&lt;level&gt;[A-Z]+)</code> captures into the name <code>level</code>. Then <code>m.groupdict()</code> returns all named groups as a dict.</p>
            <p>Server logs, app logs and sensor logs are a huge source of data. Turning each line into a dict is the first step of analysing them.</p>`,
          example: d`
            import re

            LINE = re.compile(r"(?P<user>\w+) bought (?P<qty>\d+) (?P<item>\w+)")
            m = LINE.fullmatch("lyra bought 3 arrows")
            print(m.groupdict())
            print(LINE.fullmatch("nonsense"))`,
          task: `Log lines look like: <code>2024-05-01 12:00:03 ERROR [auth] Invalid password for user 'lyra'</code><br>
            (date, time, level in capitals, module in square brackets, then a message). Write:<br>
            • <code>parse_log_line(line)</code> → a dict with keys <code>date, time, level, module, message</code>, or <code>None</code> if the line doesn't have this shape<br>
            • <code>summarize(lines)</code> → a dict with:<br>
            &nbsp;&nbsp;<code>"levels"</code>: <code>{level: count}</code><br>
            &nbsp;&nbsp;<code>"top_error_module"</code>: the module with the most <code>ERROR</code> lines (alphabetically first on a tie), or <code>None</code><br>
            &nbsp;&nbsp;<code>"users"</code>: sorted list of the unique names that appear as <code>user 'name'</code> in messages<br>
            &nbsp;&nbsp;<code>"bad_lines"</code>: how many lines couldn't be parsed`,
          starter: d`
            import re

            def parse_log_line(line):
                pass

            def summarize(lines):
                pass
            `,
          solution: d`
            import re

            LINE = re.compile(r"(?P<date>\d{4}-\d{2}-\d{2}) (?P<time>\d{2}:\d{2}:\d{2}) (?P<level>[A-Z]+) \[(?P<module>\w+)\] (?P<message>.*)")
            USER = re.compile(r"user '(\w+)'")

            def parse_log_line(line):
                m = LINE.fullmatch(line.strip())
                return m.groupdict() if m else None

            def summarize(lines):
                levels, errors, users, bad = {}, {}, set(), 0
                for line in lines:
                    rec = parse_log_line(line)
                    if rec is None:
                        bad += 1
                        continue
                    levels[rec["level"]] = levels.get(rec["level"], 0) + 1
                    if rec["level"] == "ERROR":
                        errors[rec["module"]] = errors.get(rec["module"], 0) + 1
                    users.update(USER.findall(rec["message"]))
                top = min(errors, key=lambda k: (-errors[k], k)) if errors else None
                return {"levels": levels, "top_error_module": top, "users": sorted(users), "bad_lines": bad}`,
          hints: ["One compiled pattern with named groups: (?P<date>\\d{4}-\\d{2}-\\d{2}) (?P<time>...) (?P<level>[A-Z]+) \\[(?P<module>\\w+)\\] (?P<message>.*)", "Square brackets are special in regex: escape them as \\[ and \\]", "Users: re.findall(r\"user '(\\w+)'\", message)", "Top module with alphabetical tie-break: min(errors, key=lambda k: (-errors[k], k))"],
          tests: [{ code: d`
            p = expect_func("parse_log_line"); s = expect_func("summarize")
            expect_equal(p("2024-05-01 12:00:03 ERROR [auth] Invalid password for user 'lyra'"),
                {"date": "2024-05-01", "time": "12:00:03", "level": "ERROR", "module": "auth", "message": "Invalid password for user 'lyra'"}, "parse_log_line(an ERROR line)")
            expect_equal(p("2024-05-01 12:00:04 INFO [db] Connected"), {"date": "2024-05-01", "time": "12:00:04", "level": "INFO", "module": "db", "message": "Connected"}, "parse_log_line(an INFO line)")
            for bad in ["hello world", "2024-05-01 ERROR [auth] no time", "2024-05-01 12:00:03 error [auth] lowercase level", "2024-05-01 12:00:03 WARN auth missing brackets"]:
                expect_equal(p(bad), None, "parse_log_line(" + repr(bad) + ")")
            logs = [
                "2024-05-01 12:00:03 ERROR [auth] Invalid password for user 'lyra'",
                "2024-05-01 12:00:04 INFO [db] Connected",
                "2024-05-01 12:01:00 ERROR [db] Timeout",
                "garbage line",
                "2024-05-01 12:02:00 ERROR [auth] Locked out user 'malvex'",
                "2024-05-01 12:03:00 WARN [auth] Many attempts by user 'malvex' and user 'zed'",
                "2024-05-01 12:04:00 ERROR [db] Timeout again",
                "",
            ]
            expect_equal(s(logs), {"levels": {"ERROR": 4, "INFO": 1, "WARN": 1}, "top_error_module": "auth", "users": ["lyra", "malvex", "zed"], "bad_lines": 2},
                "summarize(sample logs): auth and db both have 2 errors, so auth wins alphabetically")
            expect_equal(s([]), {"levels": {}, "top_error_module": None, "users": [], "bad_lines": 0}, "summarize([])")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR: THE CLOCKWORK WORKSHOP
    {
      id: 16, name: "The Clockwork Workshop", topic: "iterators, context managers, dataclasses & type hints", time: 1080, icon: "⚙️",
      intro: "The workshop's machines turn data through gears and pipelines. Learn the tools professional Python code is built from.",
      missions: [
        {
          id: "16-1", title: "The Turning Gears",
          story: "Each gear turns only when the one before it pushes. That's how Python's iterators work.",
          lesson: `<p>A <code>for</code> loop works on anything <b>iterable</b>. Behind the scenes it calls <code>iter(obj)</code> to get an <b>iterator</b>, then <code>next(it)</code> again and again until <code>StopIteration</code> is raised.</p>
            <p>Your own class becomes iterable with two methods: <code>__iter__(self)</code> (usually <code>return self</code>) and <code>__next__(self)</code> (return the next item, or <code>raise StopIteration</code>).</p>
            <p>The <code>itertools</code> module has ready-made iterator tools: <code>islice(it, n)</code> takes the first <code>n</code> items (even from an endless iterator), <code>count(start)</code> counts forever, <code>chain(a, b)</code> joins iterables, <code>pairwise(x)</code> gives neighbouring pairs.</p>`,
          example: d`
            from itertools import islice, count, chain, pairwise

            class Countdown:
                def __init__(self, start):
                    self.n = start
                def __iter__(self):
                    return self
                def __next__(self):
                    if self.n <= 0:
                        raise StopIteration
                    self.n -= 1
                    return self.n + 1

            print(list(Countdown(3)))
            print(list(islice(count(10), 4)))
            print(list(chain("ab", [1, 2])), list(pairwise([1, 2, 3])))`,
          task: `Write:<br>
            • class <code>Cycle(items, times)</code>: an iterator (with <code>__iter__</code> and <code>__next__</code>) that goes through <code>items</code> <code>times</code> times: <code>list(Cycle("ab", 2))</code> → <code>["a", "b", "a", "b"]</code><br>
            • <code>take(iterable, n)</code> → a list of the first <code>n</code> items. It must work on endless iterators too (use <code>islice</code>)<br>
            • <code>pairs(items)</code> → a list of tuples of neighbouring items: <code>pairs([1, 2, 3])</code> → <code>[(1, 2), (2, 3)]</code>`,
          starter: d`
            from itertools import islice

            class Cycle:
                def __init__(self, items, times):
                    self.items = list(items)
                    self.times = times

            def take(iterable, n):
                return list(iterable)[:n]

            def pairs(items):
                pass
            `,
          solution: d`
            from itertools import islice, pairwise

            class Cycle:
                def __init__(self, items, times):
                    self.items = list(items)
                    self.times = times
                    self.pos = 0

                def __iter__(self):
                    return self

                def __next__(self):
                    if not self.items or self.pos >= len(self.items) * self.times:
                        raise StopIteration
                    item = self.items[self.pos % len(self.items)]
                    self.pos += 1
                    return item

            def take(iterable, n):
                return list(islice(iterable, n))

            def pairs(items):
                return list(pairwise(items))`,
          hints: ["Keep a position counter. Stop when pos reaches len(items) * times.", "The item at position pos is items[pos % len(items)].", "take: list(islice(iterable, n))", "pairs: list(zip(items, items[1:])) or list(pairwise(items))"],
          tests: [{ code: d`
            from itertools import count
            Cycle = expect_class("Cycle")
            assert hasattr(Cycle, "__next__") and hasattr(Cycle, "__iter__"), "Cycle needs both __iter__ and __next__ methods."
            take = expect_func("take"); pairs = expect_func("pairs")
            expect_equal(list(Cycle("ab", 2)), ["a", "b", "a", "b"], 'list(Cycle("ab", 2))')
            expect_equal(list(Cycle([1, 2, 3], 1)), [1, 2, 3], "list(Cycle([1, 2, 3], 1))")
            expect_equal(list(Cycle([7], 0)), [], "list(Cycle([7], 0))")
            expect_equal(list(Cycle([], 5)), [], "list(Cycle([], 5))")
            c = Cycle("xy", 1)
            expect_equal((next(c), next(c)), ("x", "y"), "next() twice on Cycle('xy', 1)")
            expect_raises(StopIteration, next, c)
            expect_equal(take(count(5), 3), [5, 6, 7], "take(count(5), 3): an endless iterator")
            expect_equal(take("hello", 2), ["h", "e"], 'take("hello", 2)')
            expect_equal(take([1], 5), [1], "take([1], 5)")
            expect_equal(pairs([1, 2, 3]), [(1, 2), (2, 3)], "pairs([1, 2, 3])")
            expect_equal(pairs([1]), [], "pairs([1])")` }],
        },
        {
          id: "16-2", title: "The Guarded Door",
          story: "Some doors must always be closed behind you, even if a monster chases you out. Context managers guarantee it.",
          lesson: `<p>You've used <code>with open(...) as f:</code>: the file is closed when the block ends, <b>even if an error happens</b>. Any object can do this. It's called a <b>context manager</b>:</p>
            <ul><li><code>__enter__(self)</code> runs at the start; what it returns goes after <code>as</code></li>
            <li><code>__exit__(self, exc_type, exc, tb)</code> always runs at the end. If an error happened, <code>exc_type</code> is its class (otherwise <code>None</code>). Returning <code>True</code> <b>swallows</b> the error.</li></ul>
            <p>Shortcut: <code>@contextmanager</code> from <code>contextlib</code> turns a generator into a context manager: code before <code>yield</code> is the "enter", code after is the "exit". Put the <code>yield</code> in <code>try/finally</code> so the exit always runs.</p>`,
          example: d`
            from contextlib import contextmanager

            class Lamp:
                def __enter__(self):
                    print("lamp on")
                    return self
                def __exit__(self, exc_type, exc, tb):
                    print("lamp off", "(after error)" if exc_type else "")
                    return False         # don't hide errors

            with Lamp():
                print("reading")

            @contextmanager
            def section(title):
                print(f"== {title} ==")
                try:
                    yield
                finally:
                    print("== end ==")

            with section("Spells"):
                print("fireball")`,
          task: `Write:<br>
            • class <code>Door(name, log)</code>: on enter append <code>"open NAME"</code> to the list <code>log</code> and return the door; on exit append <code>"close NAME"</code>, also when an error happened (and don't hide the error)<br>
            • <code>tag(name, out)</code>: a <code>@contextmanager</code> that appends <code>"&lt;name&gt;"</code> to the list <code>out</code> before the block and <code>"&lt;/name&gt;"</code> after it, even on errors<br>
            • class <code>Suppress(*exc_types)</code>: silences errors of the given types inside the block (others still escape)`,
          starter: d`
            from contextlib import contextmanager

            class Door:
                def __init__(self, name, log):
                    self.name = name
                    self.log = log

            def tag(name, out):
                pass

            class Suppress:
                def __init__(self, *exc_types):
                    self.exc_types = exc_types
            `,
          solution: d`
            from contextlib import contextmanager

            class Door:
                def __init__(self, name, log):
                    self.name = name
                    self.log = log

                def __enter__(self):
                    self.log.append(f"open {self.name}")
                    return self

                def __exit__(self, exc_type, exc, tb):
                    self.log.append(f"close {self.name}")
                    return False

            @contextmanager
            def tag(name, out):
                out.append(f"<{name}>")
                try:
                    yield
                finally:
                    out.append(f"</{name}>")

            class Suppress:
                def __init__(self, *exc_types):
                    self.exc_types = exc_types

                def __enter__(self):
                    return self

                def __exit__(self, exc_type, exc, tb):
                    return exc_type is not None and issubclass(exc_type, self.exc_types)`,
          hints: ["Door.__enter__ appends and returns self; __exit__ appends and returns False.", "tag: append, then try: yield, finally: append the closing tag.", "Suppress.__exit__: return exc_type is not None and issubclass(exc_type, self.exc_types)"],
          tests: [{ code: d`
            Door = expect_class("Door"); tag = expect_func("tag"); Suppress = expect_class("Suppress")
            log = []
            with Door("north", log) as dd:
                log.append("inside")
            expect_equal(log, ["open north", "inside", "close north"], "log after a normal with-block")
            assert isinstance(dd, Door), "__enter__ should return the door itself (with Door(...) as d)."
            log = []
            try:
                with Door("east", log):
                    raise KeyError("monster")
            except KeyError:
                pass
            else:
                raise AssertionError("Door must not hide errors: the KeyError should still come out of the with-block.")
            expect_equal(log, ["open east", "close east"], "log when an error happens inside the door")
            out = []
            with tag("b", out):
                out.append("bold")
                with tag("i", out):
                    out.append("both")
            expect_equal(out, ["<b>", "bold", "<i>", "both", "</i>", "</b>"], "nested tags")
            out = []
            try:
                with tag("p", out):
                    raise ValueError("oops")
            except ValueError:
                pass
            expect_equal(out, ["<p>", "</p>"], "tag closes even after an error")
            with Suppress(ZeroDivisionError, KeyError):
                1 / 0
            with Suppress(KeyError):
                {}["missing"]
            try:
                with Suppress(KeyError):
                    int("bad")
            except ValueError:
                pass
            else:
                raise AssertionError("Suppress(KeyError) must let a ValueError escape.")` }],
        },
        {
          id: "16-3", title: "The Blueprint",
          story: "The workshop's machines are built from blueprints: short descriptions that Python turns into full classes.",
          lesson: `<p><b>Type hints</b> describe what a value should be: <code>def area(w: float, h: float) -&gt; float:</code>. Python doesn't enforce them, but editors and tools use them to catch mistakes, and they make code easier to read.</p>
            <p>A <b>dataclass</b> writes the boring parts of a class for you (<code>__init__</code>, <code>__repr__</code>, <code>__eq__</code>) from type-hinted fields:</p>
            <ul><li><code>@dataclass</code> above the class; fields like <code>name: str</code> and <code>qty: int = 1</code> (fields with defaults come last)</li>
            <li>For a mutable default use <code>field(default_factory=list)</code>; never <code>= []</code></li>
            <li><code>@dataclass(order=True)</code> adds <code>&lt; &gt;</code> comparisons (field by field, in order); <code>frozen=True</code> makes objects read-only</li>
            <li>A <code>@classmethod</code> receives the class itself (<code>cls</code>): perfect for alternative constructors like <code>Version.parse("1.2.3")</code></li></ul>`,
          example: d`
            from dataclasses import dataclass, field

            @dataclass
            class Hero:
                name: str
                hp: int = 100
                items: list[str] = field(default_factory=list)

                def is_hurt(self) -> bool:
                    return self.hp < 100

            a = Hero("Lyra")
            b = Hero("Orin", 40, ["rope"])
            print(a, b.is_hurt())
            print(a == Hero("Lyra"))`,
          task: `Using <code>dataclasses</code> and type hints, write:<br>
            • <code>Item</code> with fields <code>name: str</code>, <code>price: float</code>, <code>qty: int = 1</code>, <code>tags: list[str]</code> (default: a new empty list), and a method <code>total() -&gt; float</code> = price × qty<br>
            • <code>Version</code>: <b>ordered and frozen</b>, with fields <code>major</code>, <code>minor</code>, <code>patch</code> (ints, patch defaults to 0), and a classmethod <code>parse(text)</code>: <code>Version.parse("1.10.2")</code> → <code>Version(1, 10, 2)</code><br>
            • <code>newest(versions: list[str]) -&gt; str</code> → the highest version string, compared as versions (so <code>"1.10.0"</code> beats <code>"1.9.9"</code>)`,
          starter: d`
            from dataclasses import dataclass, field

            class Item:
                pass

            class Version:
                pass

            def newest(versions):
                return max(versions)
            `,
          solution: d`
            from dataclasses import dataclass, field

            @dataclass
            class Item:
                name: str
                price: float
                qty: int = 1
                tags: list[str] = field(default_factory=list)

                def total(self) -> float:
                    return self.price * self.qty

            @dataclass(order=True, frozen=True)
            class Version:
                major: int
                minor: int
                patch: int = 0

                @classmethod
                def parse(cls, text: str) -> "Version":
                    return cls(*(int(p) for p in text.split(".")))

            def newest(versions: list[str]) -> str:
                return max(versions, key=Version.parse)`,
          hints: ["tags: list[str] = field(default_factory=list)", "@dataclass(order=True, frozen=True) above class Version", "parse: major, minor, patch = map(int, text.split(\".\")); return cls(major, minor, patch)", "newest: max(versions, key=Version.parse)"],
          tests: [{ code: d`
            import dataclasses
            Item = expect_class("Item"); Version = expect_class("Version"); newest = expect_func("newest")
            assert dataclasses.is_dataclass(Item) and dataclasses.is_dataclass(Version), "Item and Version must be dataclasses (@dataclass)."
            a = Item("rope", 2.5, 4)
            expect_close(a.total(), 10.0, 'Item("rope", 2.5, 4).total()')
            b, c = Item("ale", 3.0), Item("bread", 1.0)
            expect_equal((b.qty, b.tags), (1, []), "default qty and tags")
            b.tags.append("drink")
            expect_equal(c.tags, [], "tags of another Item after changing b.tags (each Item needs its own list)")
            expect_equal(Item("x", 1.0) == Item("x", 1.0), True, "two equal Items compare equal")
            v = Version.parse("1.10.2")
            expect_equal((v.major, v.minor, v.patch), (1, 10, 2), 'Version.parse("1.10.2")')
            expect_equal(Version(1, 10) > Version(1, 9, 9), True, "Version(1, 10) > Version(1, 9, 9)")
            expect_equal(Version(2, 0) < Version(10, 0), True, "Version(2, 0) < Version(10, 0)")
            expect_equal(Version(1, 2), Version(1, 2, 0), "Version(1, 2) == Version(1, 2, 0)")
            expect_raises(dataclasses.FrozenInstanceError, setattr, v, "major", 9)
            expect_equal(newest(["1.2.0", "1.10.1", "1.9.9"]), "1.10.1", 'newest(["1.2.0", "1.10.1", "1.9.9"])')
            expect_equal(newest(["0.0.1"]), "0.0.1", 'newest(["0.0.1"])')` }],
        },
        {
          id: "16-4", type: "quiz", title: "Riddles of the Workshop",
          story: "The master clockmaker checks your understanding before handing you the keys to the big machines.",
          lesson: `<p>Review: <code>next(it, default)</code> returns the default instead of raising <code>StopIteration</code>. <code>__exit__</code> runs after the block even if it returns early. Dataclasses write <code>__eq__</code> and <code>__repr__</code> for you. Type hints are <b>not checked</b> when the code runs.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                it = iter([10, 20])
                print(next(it), next(it), next(it, "done"))`,
              choices: ["10 20 done", "10 20 None", "10 10 20", "StopIteration"], answer: 0,
              explain: "After two items the iterator is empty, so <code>next</code> returns the default you gave it." },
            { q: "What does this print?", predict: true, code: d`
                class Door:
                    def __enter__(self):
                        print("open")
                        return self
                    def __exit__(self, *exc):
                        print("close")
                        return False
                with Door():
                    print("inside")
                print("after")`,
              choices: ["open\ninside\nclose\nafter", "inside\nopen\nclose\nafter", "open\nclose\ninside\nafter", "open\ninside\nafter\nclose"], answer: 0,
              explain: "<code>__enter__</code> runs first, then the block, then <code>__exit__</code>, then the code after the <code>with</code>." },
            { q: "What does this print?", predict: true, code: d`
                from dataclasses import dataclass

                @dataclass
                class P:
                    x: int
                    y: int = 0

                print(P(1) == P(1, 0), P(2))`,
              choices: ["True P(x=2, y=0)", "False P(x=2, y=0)", "True <P object>", "True P(2, 0)"], answer: 0,
              explain: "The dataclass wrote <code>__eq__</code> (compares fields) and a readable <code>__repr__</code>." },
            { q: "What does this print?", predict: true, code: d`
                def double(n: int) -> int:
                    return n * 2
                print(double("ab"))`,
              choices: ["abab", "TypeError", "None", "ab2"], answer: 0,
              explain: "Type hints are only documentation for people and tools. Python runs the code anyway, and a string times 2 repeats it." },
            { q: "What does this print?", predict: true, code: d`
                from itertools import chain, islice, count
                print(list(chain([1, 2], "ab")), list(islice(count(5), 3)))`,
              choices: ["[1, 2, 'a', 'b'] [5, 6, 7]", "[1, 2, 'ab'] [5, 6, 7]", "[[1, 2], 'ab'] [0, 1, 2]", "[1, 2, 'a', 'b'] [5, 5, 5]"], answer: 0,
              explain: "<code>chain</code> goes through each iterable in turn (a string gives its letters); <code>count(5)</code> counts 5, 6, 7, … forever." },
          ],
        },
        {
          id: "16-5", boss: true, time: 1350, title: "The Caravan Pipeline",
          story: "Endless caravans arrive at the workshop. Process them as they come, without waiting for the last one (which never comes).",
          lesson: `<p>Generators can be chained into a <b>pipeline</b>: each stage takes an iterable and yields results one by one. Nothing is computed until someone asks for the next item, so pipelines work on huge, even endless, streams using almost no memory.</p>
            <p><code>read → filter → group</code> is the same shape as real data pipelines (and pandas, Spark, …).</p>`,
          example: d`
            def numbers(lines):
                for line in lines:
                    if line.strip().isdigit():
                        yield int(line)

            def evens(nums):
                for n in nums:
                    if n % 2 == 0:
                        yield n

            stream = evens(numbers(["4", "x", "7", "10", " 12 "]))
            print(next(stream), list(stream))`,
          task: `Write:<br>
            • a dataclass <code>Shipment</code> with <code>id: int</code>, <code>city: str</code>, <code>weight: float</code><br>
            • generator <code>read_shipments(lines)</code>: each line is <code>"id,city,weight"</code>; yield a <code>Shipment</code> for each valid line and skip lines that can't be parsed<br>
            • generator <code>heavy(shipments, limit)</code>: yield only the shipments with weight <b>over</b> <code>limit</code><br>
            • generator <code>batched(items, size)</code>: yield lists of <code>size</code> items (the last list may be shorter)<br>
            • <code>plan(lines, limit, size)</code> → a list of batches of shipment <b>ids</b>, chaining the three generators<br>
            All three must be generators (use <code>yield</code>), so they work on endless streams.`,
          starter: d`
            from dataclasses import dataclass

            def read_shipments(lines):
                result = []
                for line in lines:
                    result.append(line.split(","))
                return result
            `,
          solution: d`
            from dataclasses import dataclass

            @dataclass
            class Shipment:
                id: int
                city: str
                weight: float

            def read_shipments(lines):
                for line in lines:
                    try:
                        sid, city, weight = line.strip().split(",")
                        yield Shipment(int(sid), city.strip(), float(weight))
                    except ValueError:
                        continue

            def heavy(shipments, limit):
                for s in shipments:
                    if s.weight > limit:
                        yield s

            def batched(items, size):
                batch = []
                for item in items:
                    batch.append(item)
                    if len(batch) == size:
                        yield batch
                        batch = []
                if batch:
                    yield batch

            def plan(lines, limit, size):
                return [[s.id for s in b] for b in batched(heavy(read_shipments(lines), limit), size)]`,
          hints: ["read_shipments: try: unpack line.split(\",\") into three parts, convert, yield; except ValueError: continue", "batched: build a list; when it reaches size, yield it and start a new one; yield the leftover at the end.", "plan: [[s.id for s in batch] for batch in batched(heavy(read_shipments(lines), limit), size)]"],
          tests: [{ code: d`
            import inspect, dataclasses
            from itertools import count, islice
            Shipment = expect_class("Shipment")
            assert dataclasses.is_dataclass(Shipment), "Shipment must be a dataclass."
            rs = expect_func("read_shipments"); hv = expect_func("heavy"); bt = expect_func("batched"); pl = expect_func("plan")
            for f in (rs, hv, bt):
                assert inspect.isgeneratorfunction(f), f.__name__ + " must be a generator (use yield)."
            lines = ["1,Oakvale,12.5", "oops", "2,Fernhill,3", "3,Stonebridge,40", "4,Oakvale,x", "5,Fernhill,8.25", "6,Oakvale,99", "7,Elm,7,extra"]
            got = list(rs(lines))
            expect_equal([(s.id, s.city, s.weight) for s in got], [(1, "Oakvale", 12.5), (2, "Fernhill", 3.0), (3, "Stonebridge", 40.0), (5, "Fernhill", 8.25), (6, "Oakvale", 99.0)], "read_shipments(sample lines)")
            expect_equal([s.id for s in hv(got, 8.25)], [1, 3, 6], "heavy(shipments, 8.25) (over the limit, not equal)")
            expect_equal(list(bt(range(7), 3)), [[0, 1, 2], [3, 4, 5], [6]], "batched(range(7), 3)")
            expect_equal(list(bt([], 3)), [], "batched([], 3)")
            expect_equal(pl(lines, 5, 2), [[1, 3], [5, 6]], "plan(sample lines, limit 5, size 2)")
            endless = (f"{i},City{i % 3},{i % 10}" for i in count(1))
            first = next(bt(hv(rs(endless), 7), 3))
            expect_equal([s.id for s in first], [8, 9, 18], "the first batch from an endless stream of shipments")` }],
        },
      ],
    },

    // ───────────────────────────── FINAL FLOOR: THE THRONE ROOM
    {
      id: 13, name: "The Throne Room", topic: "final projects: everything together", time: 1200, icon: "👑",
      intro: "The Queen is behind the final three seals. Use everything you've learned.",
      missions: [
        {
          id: "13-1", title: "The Quartermaster",
          story: "First seal: manage the castle's supplies without a single mistake.",
          lesson: `<p>Final project 1 combines <b>classes, dictionaries, exceptions and sorting</b>.</p>
            <p>Plan before you code: what data does the object keep? (a dict of item → quantity). What can go wrong in each method? Raise clear errors.</p>`,
          example: d`
            # Plan:
            # self.items = {}            item -> quantity
            # add:    validate, then self.items[item] = self.items.get(item, 0) + qty
            # remove: check exists, check enough, subtract, delete if 0
            # report: sorted lines "item: qty"`,
          task: `Create class <code>Inventory</code>:<br>
            • <code>add(item, qty=1)</code> — <code>ValueError</code> if qty ≤ 0<br>
            • <code>remove(item, qty=1)</code> — <code>KeyError</code> if item missing, <code>ValueError</code> if not enough; remove the item completely when it reaches 0<br>
            • <code>count(item)</code> — quantity, 0 if missing<br>
            • <code>total()</code> — sum of all quantities<br>
            • <code>report()</code> — list of <code>"item: qty"</code> sorted by item name`,
          starter: d`
            class Inventory:
                def __init__(self):
                    self.items = {}
            `,
          solution: d`
            class Inventory:
                def __init__(self):
                    self.items = {}

                def add(self, item, qty=1):
                    if qty <= 0:
                        raise ValueError("qty must be positive")
                    self.items[item] = self.items.get(item, 0) + qty

                def remove(self, item, qty=1):
                    if item not in self.items:
                        raise KeyError(item)
                    if qty > self.items[item]:
                        raise ValueError("not enough")
                    self.items[item] -= qty
                    if self.items[item] == 0:
                        del self.items[item]

                def count(self, item):
                    return self.items.get(item, 0)

                def total(self):
                    return sum(self.items.values())

                def report(self):
                    return [f"{k}: {v}" for k, v in sorted(self.items.items())]`,
          hints: ["Use a dict self.items", "remove: check 'item not in self.items' first → raise KeyError(item)", "report: sorted(self.items.items())"],
          tests: [{ code: d`
            I = expect_class("Inventory")
            inv = I()
            inv.add("rope"); inv.add("apple", 5); inv.add("rope", 2)
            expect_equal(inv.count("rope"), 3, "count('rope')")
            expect_equal(inv.count("gold"), 0, "count('gold')")
            expect_equal(inv.total(), 8, "total()")
            expect_equal(inv.report(), ["apple: 5", "rope: 3"], "report()")
            inv.remove("apple", 5)
            expect_equal(inv.report(), ["rope: 3"], "report() after removing all apples")
            expect_raises(KeyError, inv.remove, "apple")
            expect_raises(ValueError, inv.remove, "rope", 10)
            expect_raises(ValueError, inv.add, "rope", 0)
            expect_equal(inv.count("rope"), 3, "count unchanged after failed operations")` }],
        },
        {
          id: "13-2", title: "The Secret Message",
          story: "Second seal: the Queen's message is encrypted with a Caesar cipher.",
          lesson: `<p>Final project 2: <b>strings, loops and character codes</b>.</p>
            <p><code>ord("a")</code> → 97 and <code>chr(97)</code> → <code>"a"</code>. To shift a lowercase letter: <code>chr((ord(ch) - ord("a") + shift) % 26 + ord("a"))</code>. The <code>% 26</code> wraps z back to a — and also handles negative shifts.</p>`,
          example: d`
            ch = "y"
            shifted = chr((ord(ch) - ord("a") + 3) % 26 + ord("a"))
            print(shifted)                 # b
            print("A".isupper(), "!".isalpha())`,
          task: `Write <code>encrypt(text, shift)</code>: shift every letter by <code>shift</code> places (keep upper/lower case, leave other characters unchanged; shift may be negative or larger than 26).<br>
            Write <code>decrypt(text, shift)</code> that reverses it.`,
          starter: d`
            def encrypt(text, shift):
                pass

            def decrypt(text, shift):
                pass
            `,
          solution: d`
            def encrypt(text, shift):
                result = []
                for ch in text:
                    if ch.islower():
                        result.append(chr((ord(ch) - ord("a") + shift) % 26 + ord("a")))
                    elif ch.isupper():
                        result.append(chr((ord(ch) - ord("A") + shift) % 26 + ord("A")))
                    else:
                        result.append(ch)
                return "".join(result)

            def decrypt(text, shift):
                return encrypt(text, -shift)`,
          hints: ["Handle lowercase with base ord('a'), uppercase with ord('A')", "Non-letters: append unchanged", "decrypt(text, shift) is just encrypt(text, -shift)"],
          tests: [{ code: d`
            en = expect_func("encrypt"); de = expect_func("decrypt")
            expect_equal(en("abc", 1), "bcd", 'encrypt("abc", 1)')
            expect_equal(en("xyz", 3), "abc", 'encrypt("xyz", 3)')
            expect_equal(en("Hello, World!", 5), "Mjqqt, Btwqi!", 'encrypt("Hello, World!", 5)')
            expect_equal(en("abc", 27), "bcd", 'encrypt("abc", 27)')
            expect_equal(en("abc", -1), "zab", 'encrypt("abc", -1)')
            expect_equal(de("Mjqqt, Btwqi!", 5), "Hello, World!", "decrypt")
            expect_equal(de(en("Save the Queen at 9!", 13), 13), "Save the Queen at 9!", "decrypt(encrypt(x))")` }],
        },
        {
          id: "13-3", title: "The Final Seal",
          story: "Last seal: guide the Queen out of the labyrinth. Find where her path first crosses itself — that's the hidden door.",
          lesson: `<p>Final project 3: <b>parsing, tuples, sets, loops and exceptions</b> together.</p>
            <p>Break the problem down: parse each command → move one step at a time → remember visited positions in a <b>set</b> → stop at the first repeat.</p>`,
          example: d`
            DIRS = {"UP": (0, 1), "DOWN": (0, -1), "LEFT": (-1, 0), "RIGHT": (1, 0)}
            word, num = "UP 3".split()
            dx, dy = DIRS[word]
            print(dx, dy, int(num))       # 0 1 3`,
          task: `Commands look like <code>"UP 3"</code>, <code>"LEFT 2"</code> (directions UP, DOWN, LEFT, RIGHT; UP increases y). Start at <code>(0, 0)</code>.<br>
            • <code>final_position(commands)</code> → the final <code>(x, y)</code> tuple. Raise <code>ValueError</code> for an unknown direction or a bad number.<br>
            • <code>first_revisit(commands)</code> → walking <b>one step at a time</b>, the first position visited twice (start counts as visited), or <code>None</code>.`,
          starter: d`
            DIRS = {"UP": (0, 1), "DOWN": (0, -1), "LEFT": (-1, 0), "RIGHT": (1, 0)}

            def final_position(commands):
                pass

            def first_revisit(commands):
                pass
            `,
          solution: d`
            DIRS = {"UP": (0, 1), "DOWN": (0, -1), "LEFT": (-1, 0), "RIGHT": (1, 0)}

            def parse(cmd):
                parts = cmd.split()
                if len(parts) != 2 or parts[0] not in DIRS:
                    raise ValueError(f"Bad command: {cmd}")
                return DIRS[parts[0]], int(parts[1])

            def steps(commands):
                x, y = 0, 0
                for cmd in commands:
                    (dx, dy), n = parse(cmd)
                    for _ in range(n):
                        x, y = x + dx, y + dy
                        yield (x, y)

            def final_position(commands):
                pos = (0, 0)
                for pos in steps(commands):
                    pass
                return pos

            def first_revisit(commands):
                seen = {(0, 0)}
                for pos in steps(commands):
                    if pos in seen:
                        return pos
                    seen.add(pos)
                return None`,
          hints: ["Write a helper parse(cmd) that returns ((dx, dy), n) and raises ValueError.", "int('abc') already raises ValueError for bad numbers.", "For first_revisit keep seen = {(0, 0)} and move one step at a time."],
          tests: [{ code: d`
            fp = expect_func("final_position"); fr = expect_func("first_revisit")
            expect_equal(fp(["UP 3", "RIGHT 2", "DOWN 1"]), (2, 2), "final_position([UP 3, RIGHT 2, DOWN 1])")
            expect_equal(fp([]), (0, 0), "final_position([])")
            expect_equal(fp(["LEFT 4", "DOWN 2"]), (-4, -2), "final_position([LEFT 4, DOWN 2])")
            expect_raises(ValueError, fp, ["JUMP 2"])
            expect_raises(ValueError, fp, ["UP x"])
            expect_equal(fr(["RIGHT 8", "UP 4", "LEFT 4", "DOWN 8"]), (4, 0), "first_revisit (crossing path)")
            expect_equal(fr(["UP 1", "DOWN 1"]), (0, 0), "first_revisit back to start")
            expect_equal(fr(["UP 2", "RIGHT 2"]), None, "first_revisit with no crossing")` }],
        },
        {
          id: "13-4", title: "The Word Detective",
          story: "Malvex's diary was found. Before reading it, the Queen's spymaster wants statistics about the text itself.",
          lesson: `<p>This project combines regex, <code>Counter</code>, sorting with keys and careful edge cases. Text analysis like this is the first step of natural language processing (NLP).</p>
            <ul><li>Words: <code>re.findall(r"[a-z]+(?:'[a-z]+)?", text.lower())</code> (letters, optionally one apostrophe inside, like <i>don't</i>). <code>(?:...)</code> is a group that isn't captured.</li>
            <li><b>Stopwords</b> (the, a, and…) are so common they say nothing about a text, so they're usually ignored when looking for the top words.</li>
            <li>Sorting by "count high to low, then alphabetically": <code>key=lambda kv: (-kv[1], kv[0])</code></li></ul>`,
          example: d`
            import re
            from collections import Counter

            text = "It's late. The cat sat; the cat slept!"
            words = re.findall(r"[a-z]+(?:'[a-z]+)?", text.lower())
            print(words)
            print(sorted(Counter(words).items(), key=lambda kv: (-kv[1], kv[0]))[:2])
            print([s.strip() for s in re.split(r"[.!?]+", text) if s.strip()])`,
          task: `Write <code>analyze(text)</code> returning a dict:<br>
            • <code>"words"</code>: number of words; <code>"unique"</code>: number of different words (lowercased)<br>
            • <code>"top"</code>: the 3 most common words that are <b>not</b> in <code>STOP</code>, as <code>(word, count)</code> tuples, most common first, ties alphabetical<br>
            • <code>"longest"</code>: the longest word (the first one on a tie), or <code>None</code><br>
            • <code>"avg_len"</code>: the average word length rounded to 2 decimals (<code>0.0</code> for no words)<br>
            • <code>"sentences"</code>: the number of non-empty pieces when splitting on <code>.</code>, <code>!</code> and <code>?</code> (runs like <code>?!</code> count once)`,
          starter: d`
            import re
            from collections import Counter

            STOP = {"the", "a", "an", "and", "of", "to", "in", "is", "it", "was"}

            def analyze(text):
                words = text.split()
                return {"words": len(words)}
            `,
          solution: d`
            import re
            from collections import Counter

            STOP = {"the", "a", "an", "and", "of", "to", "in", "is", "it", "was"}

            def analyze(text):
                words = re.findall(r"[a-z]+(?:'[a-z]+)?", text.lower())
                counts = Counter(w for w in words if w not in STOP)
                top = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:3]
                longest = max(words, key=len) if words else None
                avg = round(sum(len(w) for w in words) / len(words), 2) if words else 0.0
                sentences = len([s for s in re.split(r"[.!?]+", text) if s.strip()])
                return {"words": len(words), "unique": len(set(words)), "top": top,
                        "longest": longest, "avg_len": avg, "sentences": sentences}`,
          hints: ["Get the words with the regex from the lesson; count non-stopwords with Counter.", "top: sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:3]", "max(words, key=len) returns the first longest word.", "Sentences: len([s for s in re.split(r\"[.!?]+\", text) if s.strip()])"],
          tests: [{ code: d`
            analyze = expect_func("analyze")
            T = "The queen was locked in the tower. The tower was tall, and the queen was brave! Don't give up?? The knight didn't stop: the knight climbed."
            r = analyze(T)
            for key, want in [("words", 26), ("unique", 16), ("top", [("knight", 2), ("queen", 2), ("tower", 2)]), ("longest", "climbed"), ("avg_len", 4.12), ("sentences", 4)]:
                expect_equal(r.get(key), want, "analyze(diary)[" + repr(key) + "]")
            expect_equal(analyze("Hi."), {"words": 1, "unique": 1, "top": [("hi", 1)], "longest": "hi", "avg_len": 2.0, "sentences": 1}, 'analyze("Hi.")')
            expect_equal(analyze(""), {"words": 0, "unique": 0, "top": [], "longest": None, "avg_len": 0.0, "sentences": 0}, 'analyze("")')
            expect_equal(analyze("the THE a")["top"], [], "top ignores stopwords in any case")` }],
        },
        {
          id: "13-5", title: "The Tournament",
          story: "To celebrate, the kingdom holds a tournament. The Queen wants the league table, and it must be exactly right.",
          lesson: `<p>Sports tables are a classic programming exercise because the rules are precise:</p>
            <ul><li>A win gives 3 points, a draw 1, a loss 0</li>
            <li>Rank by points, then <b>goal difference</b> (scored − conceded), then goals scored, then name</li></ul>
            <p>Sort on several keys at once with a tuple: <code>key=lambda r: (-points, -diff, -scored, name)</code>. The minus signs make numbers sort high-to-low while names still sort A to Z.</p>
            <p>Team names can contain spaces, so parse each result with a regex rather than <code>split()</code>.</p>`,
          example: d`
            import re
            m = re.fullmatch(r"(.+?) (\d+)-(\d+) (.+)", "Red Dragons 2-1 Iron Wolves")
            print(m.groups())
            rows = [("B", 4, 2), ("A", 4, 2), ("C", 6, -1)]
            print(sorted(rows, key=lambda r: (-r[1], -r[2], r[0])))`,
          task: `Results look like <code>"Red Dragons 2-1 Iron Wolves"</code>. Write:<br>
            • <code>league_table(results)</code> → a list of tuples <code>(team, played, won, drawn, lost, goals_for, goals_against, points)</code>, ranked by points, goal difference, goals for (all high to low) and then name (A to Z). Raise <code>ValueError</code> for a result that doesn't have this shape.<br>
            • <code>champion(results)</code> → the name of the top team, or <code>None</code> when there are no results`,
          starter: d`
            import re

            def league_table(results):
                table = {}
                for r in results:
                    home, score, away = r.split()
                return []

            def champion(results):
                pass
            `,
          solution: d`
            import re

            RESULT = re.compile(r"\s*(.+?)\s+(\d+)-(\d+)\s+(.+?)\s*")

            def league_table(results):
                stats = {}
                for r in results:
                    m = RESULT.fullmatch(r)
                    if not m:
                        raise ValueError("bad result: " + r)
                    a, ga, gb, b = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
                    for team, scored, conceded in ((a, ga, gb), (b, gb, ga)):
                        s = stats.setdefault(team, {"p": 0, "w": 0, "d": 0, "l": 0, "f": 0, "a": 0})
                        s["p"] += 1
                        s["f"] += scored
                        s["a"] += conceded
                        if scored > conceded:
                            s["w"] += 1
                        elif scored == conceded:
                            s["d"] += 1
                        else:
                            s["l"] += 1
                rows = [(t, s["p"], s["w"], s["d"], s["l"], s["f"], s["a"], 3 * s["w"] + s["d"]) for t, s in stats.items()]
                rows.sort(key=lambda r: (-r[7], -(r[5] - r[6]), -r[5], r[0]))
                return rows

            def champion(results):
                table = league_table(results)
                return table[0][0] if table else None`,
          hints: ["Regex: r\"\\s*(.+?)\\s+(\\d+)-(\\d+)\\s+(.+?)\\s*\" with fullmatch; raise ValueError if it fails.", "Update both teams from each result: once from the home side's view, once from the away side's.", "rows.sort(key=lambda r: (-r[7], -(r[5] - r[6]), -r[5], r[0]))"],
          tests: [{ code: d`
            lt = expect_func("league_table"); ch = expect_func("champion")
            R = ["Lions 3-1 Tigers", "Red Dragons 2-2 Iron Wolves", "Tigers 0-0 Lions", "Iron Wolves 4-1 Lions", "Red Dragons 1-0 Tigers", "Tigers 2-1 Iron Wolves"]
            expect_equal(lt(R), [("Iron Wolves", 3, 1, 1, 1, 7, 5, 4), ("Red Dragons", 2, 1, 1, 0, 3, 2, 4), ("Lions", 3, 1, 1, 1, 4, 5, 4), ("Tigers", 4, 1, 1, 2, 3, 5, 4)],
                "league_table(tournament): everyone has 4 points, so goal difference decides")
            expect_equal([r[0] for r in lt(["A 1-0 B", "C 2-1 D"])], ["C", "A", "D", "B"], "ranking when points and goal difference tie (goals scored decides)")
            expect_equal([r[0] for r in lt(["Beta 1-1 Alpha"])], ["Alpha", "Beta"], "ranking when everything ties (name decides)")
            expect_equal(lt([]), [], "league_table([])")
            expect_raises(ValueError, lt, ["Lions three-one Tigers"])
            expect_raises(ValueError, lt, ["Lions 3:1 Tigers"])
            expect_equal(ch(R), "Iron Wolves", "champion(tournament)")
            expect_equal(ch([]), None, "champion([])")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "python", name: "Python", realm: "The Serpent Kingdom", tower: "The Obsidian Tower",
    ruler: "Queen Ada", rulerIcon: "👸", icon: "🐍", color: "#f5c451", requires: [],
    blurb: "The language everything else is built on: variables, loops, functions, data structures, classes and the standard library.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
