// The curriculum: 13 floors of the Tower, each a Python topic, each with missions.
// Every mission: lesson -> task -> hidden tests. Time limits grow with difficulty.
(function (root) {
  // Tag: raw string (backslashes kept) + remove common indentation.
  function d(strings, ...vals) {
    let s = String.raw({ raw: strings.raw }, ...vals);
    const startsOnOwnLine = s.startsWith("\n");
    s = s.replace(/^\n/, "").replace(/\n[ \t]*$/, "");
    const lines = s.split("\n");
    // If text starts right after the backtick, the first line has no indent: dedent the rest on their own.
    const body = startsOnOwnLine ? lines : lines.slice(1);
    const nonBlank = body.filter((l) => l.trim());
    const ind = nonBlank.length ? Math.min(...nonBlank.map((l) => l.match(/^ */)[0].length)) : 0;
    const out = lines.map((l, i) => (!startsOnOwnLine && i === 0 ? l.trim() : l.slice(ind)));
    return out.join("\n") + "\n";
  }

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
      ],
    },

    // ───────────────────────────── FLOOR 8
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
      ],
    },

    // ───────────────────────────── FLOOR 9
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
      ],
    },

    // ───────────────────────────── FLOOR 13
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
      ],
    },
  ];

  if (typeof module !== "undefined" && module.exports) module.exports = WORLDS;
  else root.WORLDS = WORLDS;
})(typeof window !== "undefined" ? window : globalThis);
