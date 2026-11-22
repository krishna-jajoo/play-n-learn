// The NumPy empire: the Iron Citadel. King Gauss is locked at the top of the Citadel of Arrays.
// Every mission runs real NumPy in the browser (Pyodide loads it when the player enters the realm).
(function (root) {
  const { d } = root.QUEST;
  const NP = "import numpy as np\n";

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "Forging Arrays", topic: "creating arrays, shape & dtype", time: 360, icon: "⚒️",
      intro: "In the Citadel's forge, plain Python lists are melted down and recast as NumPy arrays: faster, stronger, and made for numbers.",
      missions: [
        {
          id: "np1-1", title: "The First Ingot",
          story: "The forge-master hands you a list of numbers. \"Lists are for shopping,\" he says. \"Arrays are for sorcery.\"",
          lesson: `<p><b>NumPy</b> is the library almost all data science in Python is built on (pandas, scikit-learn and many more use it inside). Its core is the <b>array</b>: a grid of numbers that all have the same type.</p>
            <p>By convention it's imported as <code>np</code>: <code>import numpy as np</code>. Make an array from a list with <code>np.array([...])</code>.</p>
            <ul><li>Arithmetic works on <b>every element at once</b>: <code>a * 2</code> doubles each number (a list would repeat itself instead!).</li>
            <li><code>a.shape</code> is the size along each dimension, as a tuple: <code>(5,)</code> for 5 numbers, <code>(2, 3)</code> for 2 rows × 3 columns.</li>
            <li><code>a.ndim</code> is the number of dimensions; <code>a.size</code> the total number of elements; <code>a.dtype</code> the element type.</li></ul>`,
          example: d`
            import numpy as np

            prices = [3, 5, 8]
            print(prices * 2)          # a list repeats itself
            a = np.array(prices)
            print(a * 2)               # an array doubles every element
            print(a + a, a.shape)
            grid = np.array([[1, 2], [3, 4], [5, 6]])
            print(grid)
            print(grid.shape, grid.ndim, grid.size)`,
          task: `Create:<br>• <code>temps</code>: an array of <code>12, 15, 11, 18, 21</code><br>
            • <code>warmer</code>: every temperature 2 degrees higher, <b>calculated</b> from <code>temps</code><br>
            • <code>grid</code>: a 2 × 3 array with rows <code>1 2 3</code> and <code>4 5 6</code><br>
            Then print, each on its own line: <code>temps.shape</code>, <code>grid.shape</code>, <code>grid.ndim</code> and <code>grid.size</code>.`,
          starter: NP,
          solution: d`
            import numpy as np

            temps = np.array([12, 15, 11, 18, 21])
            warmer = temps + 2
            grid = np.array([[1, 2, 3], [4, 5, 6]])
            print(temps.shape)
            print(grid.shape)
            print(grid.ndim)
            print(grid.size)`,
          hints: ["temps = np.array([12, 15, 11, 18, 21])", "warmer = temps + 2 adds 2 to every element.", "A 2-D array is made from a list of lists: np.array([[1, 2, 3], [4, 5, 6]])"],
          tests: [{ code: d`
            expect_array(expect_var("temps"), [12, 15, 11, 18, 21], "temps", kind="i")
            expect_array(expect_var("warmer"), [14, 17, 13, 20, 23], "warmer")
            assert "14" not in __code__ and "23" not in __code__, "Calculate warmer from temps (temps + 2) instead of typing the numbers."
            expect_array(expect_var("grid"), [[1, 2, 3], [4, 5, 6]], "grid")
            expect_output("""(5,)
            (2, 3)
            2
            6""")` }],
        },
        {
          id: "np1-2", title: "Forge by Pattern",
          story: "Nobody types a thousand numbers by hand. The forge has moulds that produce whole arrays at once.",
          lesson: `<p>Functions that create arrays:</p>
            <ul><li><code>np.arange(start, stop, step)</code>: like <code>range</code> (stop excluded), but steps can be decimals</li>
            <li><code>np.linspace(start, stop, num)</code>: <code>num</code> evenly spaced values, <b>stop included</b></li>
            <li><code>np.zeros(shape)</code>, <code>np.ones(shape)</code>, <code>np.full(shape, value)</code>: filled arrays; a shape like <code>(3, 4)</code> means 3 rows × 4 columns</li>
            <li><code>np.eye(n)</code>: the identity matrix (1s on the diagonal)</li>
            <li>Add <code>dtype=int</code> or <code>dtype=float</code> to choose the element type; <code>zeros</code> and <code>ones</code> make floats by default</li></ul>`,
          example: d`
            import numpy as np

            print(np.arange(5), np.arange(1, 2, 0.25))
            print(np.linspace(0, 10, 5))
            print(np.zeros((2, 3)))
            print(np.ones(4, dtype=int), np.full(3, 9))
            print(np.eye(2))`,
          task: `Create, each with one NumPy function call:<br>
            • <code>evens</code>: 0, 2, 4, …, 18<br>• <code>steps</code>: 0, 0.25, 0.5, 0.75, 1 (with <code>linspace</code>)<br>
            • <code>board</code>: a 3 × 4 array of zeros<br>• <code>marks</code>: five 1s as <b>integers</b><br>
            • <code>sevens</code>: a 2 × 2 array full of 7s<br>• <code>ident</code>: the 3 × 3 identity matrix`,
          starter: NP,
          solution: d`
            import numpy as np

            evens = np.arange(0, 20, 2)
            steps = np.linspace(0, 1, 5)
            board = np.zeros((3, 4))
            marks = np.ones(5, dtype=int)
            sevens = np.full((2, 2), 7)
            ident = np.eye(3)`,
          hints: ["np.arange(0, 20, 2): the stop value 20 is not included.", "np.linspace(0, 1, 5) gives 5 values including both ends.", "Shapes are tuples: np.zeros((3, 4)), np.full((2, 2), 7)", "np.ones(5, dtype=int)"],
          tests: [{ code: d`
            for f in ("arange", "linspace", "zeros", "ones", "full", "eye"):
                must_call(f)
            expect_array(expect_var("evens"), list(range(0, 20, 2)), "evens")
            expect_array(expect_var("steps"), [0, 0.25, 0.5, 0.75, 1], "steps")
            expect_array(expect_var("board"), [[0] * 4] * 3, "board")
            expect_array(expect_var("marks"), [1] * 5, "marks", kind="iu")
            expect_array(expect_var("sevens"), [[7, 7], [7, 7]], "sevens")
            expect_array(expect_var("ident"), [[1, 0, 0], [0, 1, 0], [0, 0, 1]], "ident")` }],
        },
        {
          id: "np1-3", title: "The Metal Types",
          story: "Iron, steel, gold: the forge must know what each ingot is made of. Arrays are the same: every element shares one type.",
          lesson: `<p>All elements of an array share one <b>dtype</b>. NumPy picks one that fits everything:</p>
            <ul><li>ints and floats mixed → everything becomes float: <code>np.array([1, 2.5])</code> → <code>[1. , 2.5]</code></li>
            <li>strings stay strings: <code>np.array(["3", "4"])</code> can't do maths until converted</li></ul>
            <p><code>a.astype(float)</code> / <code>a.astype(int)</code> returns a converted copy. Careful: converting floats to int <b>cuts off</b> the decimals (<code>2.9 → 2</code>, <code>-2.9 → -2</code>), so use <code>np.round(a)</code> first when you want rounding.</p>`,
          example: d`
            import numpy as np

            print(np.array([1, 2.5]), np.array([1, 2.5]).dtype)
            raw = np.array(["3.5", "4", "10.25"])
            nums = raw.astype(float)
            print(nums * 2)
            print(np.array([2.9, -2.9]).astype(int))
            print(np.round(np.array([2.9, -2.9])).astype(int))`,
          task: `Write:<br>• <code>parse_readings(raw)</code>: a list of number strings like <code>["3.5", "2", "7.25"]</code> → a <b>float</b> array<br>
            • <code>to_percent(fractions)</code>: a list/array of fractions → an <b>int</b> array of percentages, rounded to the nearest whole number: <code>[0.256, 0.5, 0.999]</code> → <code>[26, 50, 100]</code><br>
            • <code>int_grid(rows)</code>: a list of lists of whole-number strings → a 2-D <b>int</b> array`,
          starter: d`
            import numpy as np

            def parse_readings(raw):
                return np.array(raw)

            def to_percent(fractions):
                pass

            def int_grid(rows):
                pass
            `,
          solution: d`
            import numpy as np

            def parse_readings(raw):
                return np.array(raw).astype(float)

            def to_percent(fractions):
                return np.round(np.array(fractions) * 100).astype(int)

            def int_grid(rows):
                return np.array(rows).astype(int)`,
          hints: ["np.array(raw).astype(float)", "Multiply by 100, then np.round(...), then .astype(int).", "np.array(rows) of strings is a 2-D string array; .astype(int) converts it."],
          tests: [{ code: d`
            pr = expect_func("parse_readings"); tp = expect_func("to_percent"); ig = expect_func("int_grid")
            expect_array(pr(["3.5", "2", "7.25"]), [3.5, 2.0, 7.25], 'parse_readings(["3.5", "2", "7.25"])', kind="f")
            expect_array(pr(["-1"]), [-1.0], 'parse_readings(["-1"])', kind="f")
            expect_array(tp([0.256, 0.5, 0.999]), [26, 50, 100], "to_percent([0.256, 0.5, 0.999])", kind="iu")
            expect_array(tp([0.004, 0.996, 0.0]), [0, 100, 0], "to_percent([0.004, 0.996, 0.0]) (round, don't cut off)", kind="iu")
            expect_array(ig([["1", "2"], ["30", "-4"]]), [[1, 2], [30, -4]], 'int_grid([["1", "2"], ["30", "-4"]])', kind="iu")` }],
        },
        {
          id: "np1-4", type: "quiz", title: "Riddles of the Forge",
          story: "The forge-master's apprentices test you before you may touch the hammer.",
          lesson: `<p>Remember how NumPy prints arrays: no commas between elements, and floats like <code>1.</code> mean <code>1.0</code>. Arrays do maths element by element; lists don't.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = [1, 2, 3]
                print(a * 2)
                print(np.array(a) * 2)`,
              choices: ["[1, 2, 3, 1, 2, 3]\n[2 4 6]", "[2, 4, 6]\n[2 4 6]", "[1, 2, 3, 1, 2, 3]\n[1 2 3 1 2 3]", "[2 4 6]\n[2, 4, 6]"], answer: 0,
              explain: "A list times 2 repeats the list. An array times 2 multiplies every element." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.array([1, 2.5, 3]))`,
              choices: ["[1.  2.5 3. ]", "[1 2.5 3]", "[1, 2.5, 3]", "[1 2 3]"], answer: 0,
              explain: "One float makes the whole array float, so 1 becomes <code>1.</code> and 3 becomes <code>3.</code>" },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.arange(2, 11, 3))`,
              choices: ["[2 5 8]", "[ 2  5  8 11]", "[3 6 9]", "[2 5 8 11]"], answer: 0,
              explain: "Like <code>range</code>, the stop value (11) is never included." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.linspace(0, 1, 3))`,
              choices: ["[0.  0.5 1. ]", "[0.   0.33 0.67]", "[0 1 2]", "[0.5 1.  1.5]"], answer: 0,
              explain: "<code>linspace</code> includes both ends: 3 points from 0 to 1." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                z = np.zeros((2, 3))
                print(z.shape, z.size, z.ndim)`,
              choices: ["(2, 3) 6 2", "(3, 2) 6 2", "(2, 3) 5 2", "6 (2, 3) 2"], answer: 0,
              explain: "2 rows × 3 columns: 6 elements in 2 dimensions." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.array([1.9, -1.9]).astype(int))`,
              choices: ["[ 1 -1]", "[ 2 -2]", "[ 1 -2]", "[ 2 -1]"], answer: 0,
              explain: "<code>astype(int)</code> cuts off the decimals (towards zero). Use <code>np.round</code> first if you want rounding." },
          ],
        },
        {
          id: "np1-5", boss: true, time: 540, title: "The Temperature Ledger",
          story: "The Citadel's furnaces must be logged in Celsius and Fahrenheit. King Gauss's old scribe did it by hand, one number at a time.",
          lesson: `<p>Because array maths works on every element, a whole conversion table is one line: <code>f = c * 9 / 5 + 32</code>.</p>
            <p><code>np.array([row1, row2])</code> stacks two equal-length arrays into a 2-row table.</p>
            <p>A classic trap: <code>np.arange(0, 30, 10)</code> stops <b>before</b> 30. To include the end, go a little past it: <code>np.arange(start, stop + step / 2, step)</code>.</p>`,
          example: d`
            import numpy as np

            c = np.arange(0, 100 + 25 / 2, 25)
            print(c)
            print(np.array([c, c / 10]))`,
          task: `Write, without any loops:<br>
            • <code>celsius_table(start, stop, step)</code> → a 2-row float array: row 0 holds Celsius values from <code>start</code> to <code>stop</code> <b>inclusive</b>, row 1 the same temperatures in Fahrenheit (<code>c × 9 / 5 + 32</code>)<br>
            • <code>fahrenheit_scale(n)</code> → <code>n</code> evenly spaced values from 32 to 212, both included<br>
            • <code>whole_degrees(t)</code> → the temperatures rounded to the nearest whole degree, as an <b>int</b> array`,
          starter: d`
            import numpy as np

            def celsius_table(start, stop, step):
                c = np.arange(start, stop, step)

            def fahrenheit_scale(n):
                pass

            def whole_degrees(t):
                pass
            `,
          solution: d`
            import numpy as np

            def celsius_table(start, stop, step):
                c = np.arange(start, stop + step / 2, step)
                return np.array([c, c * 9 / 5 + 32])

            def fahrenheit_scale(n):
                return np.linspace(32, 212, n)

            def whole_degrees(t):
                return np.round(np.array(t)).astype(int)`,
          hints: ["Include the stop value: np.arange(start, stop + step / 2, step)", "return np.array([c, c * 9 / 5 + 32])", "np.linspace(32, 212, n)", "np.round(t).astype(int)"],
          tests: [{ code: d`
            must_not_use("for", "while", "listcomp")
            ct = expect_func("celsius_table"); fs = expect_func("fahrenheit_scale"); wd = expect_func("whole_degrees")
            expect_array(ct(0, 30, 10), [[0, 10, 20, 30], [32, 50, 68, 86]], "celsius_table(0, 30, 10)", kind="f")
            expect_array(ct(-5, 5, 2.5), [[-5, -2.5, 0, 2.5, 5], [23, 27.5, 32, 36.5, 41]], "celsius_table(-5, 5, 2.5)")
            expect_array(ct(100, 100, 1), [[100], [212]], "celsius_table(100, 100, 1)")
            expect_array(fs(5), [32, 77, 122, 167, 212], "fahrenheit_scale(5)")
            expect_array(fs(2), [32, 212], "fahrenheit_scale(2)")
            expect_array(wd([20.4, 20.6, -3.7]), [20, 21, -4], "whole_degrees([20.4, 20.6, -3.7])", kind="iu")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Slicing Blades", topic: "indexing, slicing & views", time: 420, icon: "🗡️",
      intro: "The Citadel's blade-smiths cut arrays into exactly the pieces they need: rows, columns, corners, every other element.",
      missions: [
        {
          id: "np2-1", title: "Cut the Line",
          story: "A long iron bar of numbers must be cut: the ends, the middle, every second link.",
          lesson: `<p>1-D arrays index and slice like lists: <code>a[0]</code>, <code>a[-1]</code>, <code>a[2:5]</code>, <code>a[::2]</code>, <code>a[::-1]</code>.</p>
            <p>One <b>huge</b> difference: a slice of an array is a <b>view</b>, a window onto the same memory, not a copy. Changing the slice changes the original! This makes NumPy fast, but can surprise you. Use <code>.copy()</code> when you need an independent array.</p>`,
          example: d`
            import numpy as np

            a = np.arange(10, 20)
            print(a[0], a[-1], a[2:5], a[::3], a[::-1])
            part = a[:3]
            part[0] = 99          # changes a too!
            print(a)
            safe = a[:3].copy()
            safe[0] = -1          # a is untouched
            print(a[:3], safe)`,
          task: `Write (for 1-D arrays):<br>
            • <code>ends(a)</code> → an array of the first and last element<br>
            • <code>middle(a)</code> → everything except the first and last element<br>
            • <code>even_positions(a)</code> → the elements at index 0, 2, 4, …<br>
            • <code>reversed_copy(a)</code> → the array reversed, as an <b>independent copy</b> (changing it must not change <code>a</code>)`,
          starter: d`
            import numpy as np

            def ends(a):
                pass

            def middle(a):
                pass

            def even_positions(a):
                pass

            def reversed_copy(a):
                return a[::-1]
            `,
          solution: d`
            import numpy as np

            def ends(a):
                return np.array([a[0], a[-1]])

            def middle(a):
                return a[1:-1]

            def even_positions(a):
                return a[::2]

            def reversed_copy(a):
                return a[::-1].copy()`,
          hints: ["np.array([a[0], a[-1]])", "a[1:-1] skips the first and last.", "a[::2] takes every second element.", "a[::-1] is a view: add .copy()"],
          tests: [{ code: d`
            import numpy as np
            en = expect_func("ends"); mi = expect_func("middle"); ev = expect_func("even_positions"); rc = expect_func("reversed_copy")
            a = np.array([5, 8, 1, 9, 4, 7])
            expect_array(en(a), [5, 7], "ends([5 8 1 9 4 7])")
            expect_array(mi(a), [8, 1, 9, 4], "middle([5 8 1 9 4 7])")
            expect_array(ev(a), [5, 1, 4], "even_positions([5 8 1 9 4 7])")
            expect_array(ev(np.arange(5)), [0, 2, 4], "even_positions([0 1 2 3 4])")
            r = rc(a)
            expect_array(r, [7, 4, 9, 1, 8, 5], "reversed_copy([5 8 1 9 4 7])")
            r[0] = 100
            expect_array(a, [5, 8, 1, 9, 4, 7], "the original array after changing the reversed copy (it must not change)")` }],
        },
        {
          id: "np2-2", title: "The Grid of Blades",
          story: "The Citadel's map is a grid. The generals keep asking for a row here, a column there, a corner of the map.",
          lesson: `<p>2-D arrays take <b>one index per dimension</b>, separated by a comma: <code>a[row, col]</code>.</p>
            <ul><li><code>a[1]</code> or <code>a[1, :]</code> → row 1</li>
            <li><code>a[:, 2]</code> → column 2 (<code>:</code> means "all rows")</li>
            <li><code>a[0:2, 1:3]</code> → rows 0–1, columns 1–2: a smaller block</li>
            <li><code>a[1:-1, 1:-1]</code> → everything except the outer ring</li></ul>
            <p><code>a.sum()</code> adds up every element. (<code>np.arange(12).reshape(3, 4)</code> turns 12 numbers into 3 rows of 4; you'll learn <code>reshape</code> properly on Floor 7.)</p>`,
          example: d`
            import numpy as np

            m = np.arange(12).reshape(3, 4)
            print(m)
            print(m[1, 2], m[2], m[:, 0])
            print(m[0:2, 1:3])
            print(m[1:-1, 1:-1], m.sum())`,
          task: `Write (for 2-D arrays):<br>
            • <code>row(a, r)</code> → row <code>r</code><br>• <code>column(a, c)</code> → column <code>c</code><br>
            • <code>corner(a, k)</code> → the top-left <code>k × k</code> block<br>
            • <code>border_sum(a)</code> → the sum of all elements on the outer edge (first/last row and first/last column), each counted once`,
          starter: d`
            import numpy as np

            def row(a, r):
                pass

            def column(a, c):
                pass

            def corner(a, k):
                pass

            def border_sum(a):
                pass
            `,
          solution: d`
            import numpy as np

            def row(a, r):
                return a[r]

            def column(a, c):
                return a[:, c]

            def corner(a, k):
                return a[:k, :k]

            def border_sum(a):
                return a.sum() - a[1:-1, 1:-1].sum()`,
          hints: ["Column: a[:, c]", "Corner: a[:k, :k]", "Border = everything minus the inside: a.sum() - a[1:-1, 1:-1].sum()"],
          tests: [{ code: d`
            import numpy as np
            rw = expect_func("row"); co = expect_func("column"); cr = expect_func("corner"); bs = expect_func("border_sum")
            b = np.arange(1, 21).reshape(4, 5)
            expect_array(rw(b, 2), [11, 12, 13, 14, 15], "row(board, 2)")
            expect_array(rw(b, -1), [16, 17, 18, 19, 20], "row(board, -1)")
            expect_array(co(b, 1), [2, 7, 12, 17], "column(board, 1)")
            expect_array(cr(b, 2), [[1, 2], [6, 7]], "corner(board, 2)")
            expect_array(cr(b, 3), [[1, 2, 3], [6, 7, 8], [11, 12, 13]], "corner(board, 3)")
            expect_equal(bs(b), 147, "border_sum(board 4x5 of 1..20)")
            expect_equal(bs(np.ones((2, 2), dtype=int)), 4, "border_sum(2x2 of ones): everything is border")
            expect_equal(bs(np.ones((3, 3), dtype=int)), 8, "border_sum(3x3 of ones)")` }],
        },
        {
          id: "np2-3", title: "The Shared Blade",
          story: "Two smiths share one blade. When one sharpens it, the other's blade is sharper too. Know when you're sharing.",
          lesson: `<p>Because slices are views, you can change part of an array <b>in place</b> by assigning to a slice:</p>
            <p><code>a[1:-1, 1:-1] = 0</code> sets the whole inside block to 0; <code>a[:, 0] = [7, 8, 9]</code> replaces column 0.</p>
            <p>A function that changes an array in place usually returns <code>None</code> (like <code>list.sort()</code>). A function that must <b>not</b> touch its input should start with <code>b = a.copy()</code>.</p>`,
          example: d`
            import numpy as np

            m = np.zeros((3, 4), dtype=int)
            m[0] = 1                 # whole row
            m[:, -1] = [7, 8, 9]     # whole column
            m[1:, 1:3] = 5           # a block
            print(m)

            def doubled(a):
                b = a.copy()
                b *= 2
                return b
            print(doubled(m)[0], m[0])`,
          task: `Write:<br>• <code>fill_center(a, value)</code>: <b>in place</b>, set everything except the outer ring of the 2-D array <code>a</code> to <code>value</code> (return nothing)<br>
            • <code>with_zero_edges(a)</code> → a <b>new</b> array like <code>a</code> but with the first and last rows and columns set to 0. <code>a</code> must not change<br>
            • <code>swap_halves(a)</code> → a new 1-D array (even length) with its first and second halves swapped: <code>[1 2 3 4 5 6]</code> → <code>[4 5 6 1 2 3]</code>`,
          starter: d`
            import numpy as np

            def fill_center(a, value):
                pass

            def with_zero_edges(a):
                a[0] = 0
                return a

            def swap_halves(a):
                pass
            `,
          solution: d`
            import numpy as np

            def fill_center(a, value):
                a[1:-1, 1:-1] = value

            def with_zero_edges(a):
                b = a.copy()
                b[0] = 0
                b[-1] = 0
                b[:, 0] = 0
                b[:, -1] = 0
                return b

            def swap_halves(a):
                h = len(a) // 2
                b = a.copy()
                b[:h] = a[h:]
                b[h:] = a[:h]
                return b`,
          hints: ["fill_center: a[1:-1, 1:-1] = value", "with_zero_edges: b = a.copy(), then set b[0], b[-1], b[:, 0], b[:, -1] to 0", "swap_halves: h = len(a) // 2; b = a.copy(); b[:h] = a[h:]; b[h:] = a[:h]"],
          tests: [{ code: d`
            import numpy as np
            fc = expect_func("fill_center"); wz = expect_func("with_zero_edges"); sh = expect_func("swap_halves")
            m = np.ones((4, 5), dtype=int)
            r = fc(m, 7)
            expect_equal(r, None, "fill_center returns")
            expect_array(m, [[1, 1, 1, 1, 1], [1, 7, 7, 7, 1], [1, 7, 7, 7, 1], [1, 1, 1, 1, 1]], "the array after fill_center(ones 4x5, 7)")
            a = np.arange(1, 13).reshape(3, 4)
            z = wz(a)
            expect_array(z, [[0, 0, 0, 0], [0, 6, 7, 0], [0, 0, 0, 0]], "with_zero_edges(3x4 of 1..12)")
            expect_array(a, np.arange(1, 13).reshape(3, 4), "the original after with_zero_edges (must not change)")
            s = np.array([1, 2, 3, 4, 5, 6])
            expect_array(sh(s), [4, 5, 6, 1, 2, 3], "swap_halves([1 2 3 4 5 6])")
            expect_array(s, [1, 2, 3, 4, 5, 6], "the original after swap_halves (must not change)")
            expect_array(sh(np.array([9, 8])), [8, 9], "swap_halves([9 8])")` }],
        },
        {
          id: "np2-4", type: "quiz", title: "Riddles of the Blades",
          story: "The blade-master asks which cuts share their steel, and which are new metal.",
          lesson: `<p>Slices of arrays are <b>views</b> (shared memory). Slices of <b>lists</b> are copies. <code>a[:, 1]</code> gives a 1-D result, while <code>a[:, 1:2]</code> keeps 2 dimensions.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.arange(10)
                print(a[2:8:2], a[-3:])`,
              choices: ["[2 4 6] [7 8 9]", "[2 4 6 8] [7 8 9]", "[3 5 7] [8 9]", "[2 4 6] [9]"], answer: 0,
              explain: "Start 2, stop before 8, step 2 → 2, 4, 6. <code>[-3:]</code> is the last three." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.arange(5)
                b = a[1:3]
                b[0] = 99
                print(a)`,
              choices: ["[ 0 99  2  3  4]", "[0 1 2 3 4]", "[99  2]", "[ 0 99 99  3  4]"], answer: 0,
              explain: "<code>b</code> is a view of <code>a</code>, so writing into <code>b</code> writes into <code>a</code>." },
            { q: "What does this print?", predict: true, code: d`
                lst = [0, 1, 2, 3]
                s = lst[1:3]
                s[0] = 99
                print(lst)`,
              choices: ["[0, 1, 2, 3]", "[0, 99, 2, 3]", "[99, 2]", "[0 1 2 3]"], answer: 0,
              explain: "Plain Python <b>lists</b> copy when sliced. Only NumPy arrays give views." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                m = np.arange(12).reshape(3, 4)
                print(m[1, 2], m[:, 1])`,
              choices: ["6 [1 5 9]", "9 [4 5 6 7]", "6 [4 5 6 7]", "[1 2] [1 5 9]"], answer: 0,
              explain: "Row 1 is 4 5 6 7, so column 2 there is 6. <code>m[:, 1]</code> is column 1 of every row." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                m = np.arange(12).reshape(3, 4)
                print(m[:, 1].shape, m[:, 1:2].shape)`,
              choices: ["(3,) (3, 1)", "(3, 1) (3, 1)", "(3,) (3,)", "(1, 3) (3, 1)"], answer: 0,
              explain: "A single index removes that dimension; a slice (even of length 1) keeps it." },
          ],
        },
        {
          id: "np2-5", boss: true, time: 630, title: "The Sliding Window",
          story: "The Citadel's watchtower records a reading every hour. The king wants smoothed trends, not noisy spikes.",
          lesson: `<p>A <b>sliding window</b> of size <code>k</code> looks at <code>a[0:k]</code>, then <code>a[1:k+1]</code>, and so on: <code>len(a) - k + 1</code> windows in total. Averaging each window gives a <b>moving average</b>, the standard way to smooth noisy data like prices or temperatures.</p>
            <p>Stack the windows into a 2-D array (one window per row); then <code>w.mean(axis=1)</code> averages each row. (More about <code>axis</code> on Floor 6.)</p>
            <p>Step slicing can also <b>paint patterns</b>: <code>b[::2, 1::2] = 1</code> sets every second column of every second row.</p>`,
          example: d`
            import numpy as np

            a = np.array([4, 8, 6, 2])
            w = np.array([a[i:i + 2] for i in range(len(a) - 1)])
            print(w)
            print(w.mean(axis=1))
            b = np.zeros((3, 6), dtype=int)
            b[:, ::3] = 1
            print(b)`,
          task: `Write:<br>• <code>windows(a, k)</code> → a 2-D array whose row <code>i</code> is <code>a[i:i+k]</code> (shape <code>(len(a)-k+1, k)</code>)<br>
            • <code>moving_average(a, k)</code> → the mean of each window, as a float array<br>
            • <code>checkerboard(n)</code> → an <code>n × n</code> int array with <code>1</code> where row + column is odd and <code>0</code> elsewhere. Paint it with step slicing, no loops`,
          starter: d`
            import numpy as np

            def windows(a, k):
                pass

            def moving_average(a, k):
                pass

            def checkerboard(n):
                b = np.zeros((n, n), dtype=int)
                return b
            `,
          solution: d`
            import numpy as np

            def windows(a, k):
                return np.array([a[i:i + k] for i in range(len(a) - k + 1)])

            def moving_average(a, k):
                return windows(a, k).mean(axis=1)

            def checkerboard(n):
                b = np.zeros((n, n), dtype=int)
                b[::2, 1::2] = 1
                b[1::2, ::2] = 1
                return b`,
          hints: ["windows: np.array([a[i:i + k] for i in range(len(a) - k + 1)])", "moving_average: windows(a, k).mean(axis=1)", "checkerboard: even rows get 1 in odd columns (b[::2, 1::2]); odd rows in even columns (b[1::2, ::2])."],
          tests: [{ code: d`
            import numpy as np
            wi = expect_func("windows"); ma = expect_func("moving_average"); cb = expect_func("checkerboard")
            a = np.array([4, 8, 6, 2, 10])
            expect_array(wi(a, 2), [[4, 8], [8, 6], [6, 2], [2, 10]], "windows([4 8 6 2 10], 2)")
            expect_array(wi(a, 5), [[4, 8, 6, 2, 10]], "windows(a, 5)")
            expect_array(ma(a, 3), [6, 16 / 3, 6], "moving_average([4 8 6 2 10], 3)", kind="f")
            expect_array(ma(np.array([1, 2, 3]), 1), [1, 2, 3], "moving_average([1 2 3], 1)")
            expect_array(cb(4), [[0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0]], "checkerboard(4)", kind="iu")
            expect_array(cb(1), [[0]], "checkerboard(1)")
            expect_array(cb(3), [[0, 1, 0], [1, 0, 1], [0, 1, 0]], "checkerboard(3)")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Mask of Truth", topic: "boolean masks, where & fancy indexing", time: 480, icon: "🎭",
      intro: "In the Hall of Masks, every value is asked a question. Those that answer True are revealed.",
      missions: [
        {
          id: "np3-1", title: "Reveal the Hidden",
          story: "The hall's guards wear masks of True and False. Only the values whose mask says True may pass.",
          lesson: `<p>Comparing an array gives a <b>boolean array</b> (a mask): <code>a &gt; 3</code> → <code>[False True …]</code>.</p>
            <ul><li><code>a[mask]</code> keeps only the elements where the mask is True. This is called <b>boolean indexing</b> or filtering</li>
            <li>Combine conditions with <code>&amp;</code> (and), <code>|</code> (or), <code>~</code> (not), and <b>always wrap each condition in parentheses</b>: <code>(a &gt; 1) &amp; (a &lt; 5)</code></li>
            <li>Python's <code>and</code>/<code>or</code> don't work on arrays (they raise <code>ValueError</code>)</li>
            <li>True counts as 1, so <code>mask.sum()</code> counts the matches; <code>mask.any()</code> / <code>mask.all()</code> ask "is any / every element True?"</li></ul>`,
          example: d`
            import numpy as np

            a = np.array([3, -1, 8, 0, 5, -6])
            print(a > 2)
            print(a[a > 2])
            print(a[(a > -2) & (a < 5)])
            print((a < 0).sum(), (a == 0).any(), (a > -10).all())`,
          task: `Write, <b>without loops</b>:<br>• <code>above(a, t)</code> → the values greater than <code>t</code><br>
            • <code>between(a, lo, hi)</code> → the values from <code>lo</code> to <code>hi</code>, both included<br>
            • <code>count_negative(a)</code> → how many values are below 0<br>
            • <code>has_zero(a)</code> → <code>True</code> if any value is 0`,
          starter: d`
            import numpy as np

            def above(a, t):
                return [x for x in a if x > t]

            def between(a, lo, hi):
                pass

            def count_negative(a):
                pass

            def has_zero(a):
                pass
            `,
          solution: d`
            import numpy as np

            def above(a, t):
                return a[a > t]

            def between(a, lo, hi):
                return a[(a >= lo) & (a <= hi)]

            def count_negative(a):
                return int((a < 0).sum())

            def has_zero(a):
                return bool((a == 0).any())`,
          hints: ["above: a[a > t]", "between: a[(a >= lo) & (a <= hi)] (parentheses matter!)", "count_negative: (a < 0).sum()", "has_zero: (a == 0).any()"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            ab = expect_func("above"); bt = expect_func("between"); cn = expect_func("count_negative"); hz = expect_func("has_zero")
            a = np.array([3, -1, 8, 0, 5, -6, 5])
            expect_array(ab(a, 3), [8, 5, 5], "above(a, 3)")
            expect_array(ab(a, 100), np.array([], dtype=int), "above(a, 100)")
            expect_array(bt(a, 0, 5), [3, 0, 5, 5], "between(a, 0, 5)")
            expect_array(bt(np.array([1.5, 2.5, 3.5]), 2, 3), [2.5], "between([1.5 2.5 3.5], 2, 3)")
            expect_equal(cn(a), 2, "count_negative(a)")
            expect_equal(cn(np.array([1, 2])), 0, "count_negative([1 2])")
            expect_equal(hz(a), True, "has_zero(a)")
            expect_equal(hz(np.array([1, -1])), False, "has_zero([1 -1])")` }],
        },
        {
          id: "np3-2", title: "The Choosing Spell",
          story: "A spell that decides, for every value at once, which of two fates it receives.",
          lesson: `<ul><li><code>np.where(cond, x, y)</code> → for each element, <code>x</code> where the condition is True, otherwise <code>y</code>. It's an if/else for whole arrays</li>
            <li><b>Masked assignment</b> changes the array in place: <code>a[a &lt; 0] = 0</code></li>
            <li><code>np.clip(a, lo, hi)</code> limits every value to the range <code>lo</code>…<code>hi</code></li>
            <li><code>a[mask].mean()</code> averages only the selected values</li></ul>`,
          example: d`
            import numpy as np

            t = np.array([18, 25, 31, 12])
            print(np.where(t >= 25, "hot", "cold"))
            print(np.where(t > 20, t - 20, 0))
            print(np.clip(t, 15, 30))
            t[t > 30] = 30
            print(t, t[t < 20].mean())`,
          task: `Write, <b>without loops</b>:<br>• <code>relu(a)</code> → a new array where negative values become 0 (others unchanged)<br>
            • <code>label(temps, t)</code> → an array of strings: <code>"hot"</code> where the temperature is at least <code>t</code>, otherwise <code>"cold"</code><br>
            • <code>cap_inplace(a, hi)</code> → <b>in place</b>, lower every value above <code>hi</code> to <code>hi</code> (return nothing)<br>
            • <code>fill_negatives(a)</code> → a new float array where each negative value is replaced by the mean of the non-negative values`,
          starter: d`
            import numpy as np

            def relu(a):
                pass

            def label(temps, t):
                pass

            def cap_inplace(a, hi):
                pass

            def fill_negatives(a):
                pass
            `,
          solution: d`
            import numpy as np

            def relu(a):
                return np.where(a > 0, a, 0)

            def label(temps, t):
                return np.where(temps >= t, "hot", "cold")

            def cap_inplace(a, hi):
                a[a > hi] = hi

            def fill_negatives(a):
                b = a.astype(float)
                b[b < 0] = b[b >= 0].mean()
                return b`,
          hints: ["relu: np.where(a > 0, a, 0) (or np.maximum(a, 0))", "label: np.where(temps >= t, \"hot\", \"cold\")", "cap_inplace: a[a > hi] = hi", "fill_negatives: b = a.astype(float); b[b < 0] = b[b >= 0].mean()"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            re_ = expect_func("relu"); lb = expect_func("label"); cp = expect_func("cap_inplace"); fn = expect_func("fill_negatives")
            a = np.array([-2, 3, 0, -7, 5])
            expect_array(re_(a), [0, 3, 0, 0, 5], "relu([-2 3 0 -7 5])")
            expect_array(a, [-2, 3, 0, -7, 5], "the original after relu (must not change)")
            expect_array(lb(np.array([18, 25, 31, 24]), 25), ["cold", "hot", "hot", "cold"], "label([18 25 31 24], 25)", kind="U")
            b = np.array([5, 12, 30, 9])
            expect_equal(cp(b, 10), None, "cap_inplace returns")
            expect_array(b, [5, 10, 10, 9], "the array after cap_inplace([5 12 30 9], 10)")
            expect_array(fn(np.array([4, -1, 8, -5, 0])), [4, 4, 8, 4, 0], "fill_negatives([4 -1 8 -5 0]) (mean of 4, 8, 0 is 4)", kind="f")
            expect_array(fn(np.array([1, 2])), [1, 2], "fill_negatives([1 2])", kind="f")` }],
        },
        {
          id: "np3-3", title: "Pick by Number",
          story: "The quartermaster calls soldiers by number: \"Third, seventh and first, step forward!\"",
          lesson: `<ul><li><b>Fancy indexing</b>: index with a list or array of positions: <code>a[[3, 0, 0]]</code> → elements 3, 0 and 0 again (always a copy)</li>
            <li><code>np.argsort(a)</code> → the positions that would sort <code>a</code>; <code>a[np.argsort(a)]</code> is sorted. Reverse with <code>[::-1]</code> for largest first</li>
            <li><code>np.flatnonzero(mask)</code> → the positions where a mask is True</li>
            <li><code>np.unique(a)</code> → the distinct values, sorted</li></ul>`,
          example: d`
            import numpy as np

            power = np.array([40, 95, 60, 95, 10])
            print(power[[1, 4]])
            order = np.argsort(power)
            print(order, power[order])
            print(power[order[::-1][:2]])
            print(np.flatnonzero(power == power.max()), np.unique(power))`,
          task: `Write, <b>without loops</b>:<br>• <code>pick(a, idx)</code> → the elements at the positions in the list <code>idx</code>, in that order<br>
            • <code>positions_of_max(a)</code> → an array of every position where the maximum value appears<br>
            • <code>top_k(a, k)</code> → the <code>k</code> largest values, largest first<br>
            • <code>unique_sorted(a)</code> → the distinct values in ascending order`,
          starter: d`
            import numpy as np

            def pick(a, idx):
                pass

            def positions_of_max(a):
                return np.argmax(a)

            def top_k(a, k):
                pass

            def unique_sorted(a):
                pass
            `,
          solution: d`
            import numpy as np

            def pick(a, idx):
                return a[idx]

            def positions_of_max(a):
                return np.flatnonzero(a == a.max())

            def top_k(a, k):
                return a[np.argsort(a)[::-1][:k]]

            def unique_sorted(a):
                return np.unique(a)`,
          hints: ["pick: a[idx] works with a list of positions.", "positions_of_max: np.flatnonzero(a == a.max())", "top_k: a[np.argsort(a)[::-1][:k]]", "np.unique(a)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            pk = expect_func("pick"); pm = expect_func("positions_of_max"); tk = expect_func("top_k"); us = expect_func("unique_sorted")
            p = np.array([40, 95, 60, 95, 10])
            expect_array(pk(p, [3, 0, 0]), [95, 40, 40], "pick(power, [3, 0, 0])")
            expect_array(pm(p), [1, 3], "positions_of_max(power)")
            expect_array(pm(np.array([7])), [0], "positions_of_max([7])")
            expect_array(tk(p, 3), [95, 95, 60], "top_k(power, 3)")
            expect_array(tk(np.array([2.5, -1.0, 9.0]), 1), [9.0], "top_k([2.5 -1 9], 1)")
            expect_array(us(np.array([3, 1, 3, 2, 1])), [1, 2, 3], "unique_sorted([3 1 3 2 1])")` }],
        },
        {
          id: "np3-4", type: "quiz", title: "Riddles of the Masks",
          story: "The masked judges whisper riddles. Every answer is either True or False, and so is your fate.",
          lesson: `<p>Masks select a <b>copy</b> of the data (unlike slices). Use <code>&amp; | ~</code> with parentheses, never <code>and</code>/<code>or</code>. <code>np.where</code> builds a new array from two choices.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                print(a > 4, a[a > 4])`,
              choices: ["[False  True False  True] [8 9]", "[8 9] [8 9]", "[False True False True] [1 3]", "2 [8 9]"], answer: 0,
              explain: "The comparison gives a mask; indexing with the mask keeps the True positions." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                print(((a > 2) & (a < 9)).sum())`,
              choices: ["2", "3", "4", "[3 8]"], answer: 0,
              explain: "Only 3 and 8 are both above 2 and below 9; summing the mask counts the Trues." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                print(a > 2 and a < 9)`,
              choices: ["ValueError", "[ True  True False False]", "False", "[3 8]"], answer: 0,
              explain: "<code>and</code> needs one True/False for the whole array, which is ambiguous. Use <code>(a &gt; 2) &amp; (a &lt; 9)</code>." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                print(np.where(a > 4, a, 0))`,
              choices: ["[0 8 0 9]", "[8 9]", "[1 3]", "[3 0 1 0]"], answer: 0,
              explain: "Where the condition holds keep <code>a</code>, elsewhere use 0." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                b = a[a > 4]
                b[0] = 100
                print(a)`,
              choices: ["[3 8 1 9]", "[  3 100   1   9]", "[100   9]", "[100 8 1 9]"], answer: 0,
              explain: "Boolean (and fancy) indexing makes a <b>copy</b>, so <code>a</code> is untouched. Only plain slices are views." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3, 8, 1, 9])
                print(a[[3, 0, 0]], np.argsort(a))`,
              choices: ["[9 3 3] [2 0 1 3]", "[9 3 3] [1 3 8 9]", "[3 9 9] [2 0 1 3]", "[9 3] [2 0 1 3]"], answer: 0,
              explain: "Fancy indexing may repeat positions. <code>argsort</code> gives positions: the smallest (1) is at index 2, then 3 at index 0…" },
          ],
        },
        {
          id: "np3-5", boss: true, time: 720, title: "The Outlier Hunt",
          story: "Malvex's spies hid false readings among the Citadel's measurements. Find the values that don't belong.",
          lesson: `<p>An <b>outlier</b> is a value far from the rest. A common test is the <b>z-score</b>: how many standard deviations a value is from the mean:</p>
            <p><code>z = (a - a.mean()) / a.std()</code></p>
            <p>Values with <code>|z|</code> above a threshold (often 2 or 3) are flagged. Use <code>np.abs(z)</code>. The <b>median</b> (<code>np.median</code>) is a safer "typical value" than the mean, because outliers barely move it.</p>
            <p>Watch out: one huge outlier inflates the standard deviation so much that a <i>second</i> outlier can hide behind it (its z-score shrinks). This is called <b>masking</b>, and it's why analysts often repeat the check, or use the median-based methods you'll meet in the Statistics realm.</p>`,
          example: d`
            import numpy as np

            a = np.array([10.0, 11, 9, 10, 50])
            z = (a - a.mean()) / a.std()
            print(np.round(z, 2))
            print(np.abs(z) > 1.5, np.median(a), a.mean())`,
          task: `Write, <b>without loops</b>:<br>• <code>zscores(a)</code> → the z-score of every value (use <code>a.std()</code>)<br>
            • <code>remove_outliers(a, z=2.0)</code> → only the values whose |z-score| is at most <code>z</code><br>
            • <code>replace_outliers(a, z=2.0)</code> → a new float array where every outlier is replaced by the <b>median of the non-outliers</b><br>
            • <code>outlier_positions(a, z=2.0)</code> → an array of the positions of the outliers`,
          starter: d`
            import numpy as np

            def zscores(a):
                pass

            def remove_outliers(a, z=2.0):
                pass

            def replace_outliers(a, z=2.0):
                pass

            def outlier_positions(a, z=2.0):
                pass
            `,
          solution: d`
            import numpy as np

            def zscores(a):
                return (a - a.mean()) / a.std()

            def remove_outliers(a, z=2.0):
                return a[np.abs(zscores(a)) <= z]

            def replace_outliers(a, z=2.0):
                bad = np.abs(zscores(a)) > z
                b = a.astype(float)
                b[bad] = np.median(a[~bad])
                return b

            def outlier_positions(a, z=2.0):
                return np.flatnonzero(np.abs(zscores(a)) > z)`,
          hints: ["zscores: (a - a.mean()) / a.std()", "A mask of outliers: np.abs(zscores(a)) > z. Its opposite is ~mask.", "replace: b = a.astype(float); b[bad] = np.median(a[~bad])", "positions: np.flatnonzero(mask)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            zs = expect_func("zscores"); ro = expect_func("remove_outliers"); rp = expect_func("replace_outliers"); op = expect_func("outlier_positions")
            a = np.array([10, 12, 11, 13, 12, 95, 11, -40, 12, 10, 11, 12])
            ref = (a - a.mean()) / a.std()
            expect_array(zs(a), ref, "zscores(readings)")
            expect_array(ro(a), a[np.abs(ref) <= 2], "remove_outliers(readings)")
            expect_array(ro(a, z=0.5), a[np.abs(ref) <= 0.5], "remove_outliers(readings, z=0.5)")
            want = a.astype(float); bad = np.abs(ref) > 2; want[bad] = np.median(a[~bad])
            expect_array(rp(a), want, "replace_outliers(readings)", kind="f")
            expect_array(a, [10, 12, 11, 13, 12, 95, 11, -40, 12, 10, 11, 12], "the original after replace_outliers (must not change)")
            expect_array(op(a), np.flatnonzero(np.abs(ref) > 2), "outlier_positions(readings)")
            expect_array(op(a, z=1.5), np.flatnonzero(np.abs(ref) > 1.5), "outlier_positions(readings, z=1.5)")
            expect_array(op(np.array([1.0, 2, 3])), np.array([], dtype=int), "outlier_positions([1 2 3])")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Swift Engines", topic: "vectorization, ufuncs, NaN & precision", time: 480, icon: "🚂",
      intro: "The Citadel's engines don't pedal one wheel at a time. They push every wheel at once. That's vectorization.",
      missions: [
        {
          id: "np4-1", title: "Spells for Every Element",
          story: "The engine-master's spells act on every gear at the same instant. Learn the universal spells.",
          lesson: `<p>NumPy's <b>universal functions</b> (ufuncs) work element by element on whole arrays, at C speed:</p>
            <ul><li><code>np.sqrt</code>, <code>np.exp</code>, <code>np.log</code>, <code>np.abs</code>, <code>np.round(a, 2)</code>, <code>np.sin</code>…</li>
            <li><code>np.maximum(a, b)</code> / <code>np.minimum(a, b)</code> → element-wise bigger/smaller (different from <code>a.max()</code>, which gives one number)</li>
            <li>All operators (<code>+ - * / ** // %</code>) work the same way</li></ul>
            <p>Writing maths as whole-array expressions instead of loops is called <b>vectorization</b>. It's shorter and often 10–100× faster.</p>`,
          example: d`
            import numpy as np

            x = np.array([1.0, 4, 9])
            print(np.sqrt(x), np.log(x), np.round(np.exp(x), 1))
            print(np.maximum(x, 5), x.max())
            years = np.arange(4)
            print(100 * 1.5 ** years)`,
          task: `Write, <b>without loops</b>:<br>• <code>distance(x, y)</code> → the distance of each point <code>(x[i], y[i])</code> from the origin: √(x² + y²)<br>
            • <code>compound(principal, rate, years)</code> → the value after each number of years in the array <code>years</code>: principal × (1 + rate)^years<br>
            • <code>normalize(a)</code> → rescale so the minimum becomes 0 and the maximum 1: (a − min) / (max − min)`,
          starter: d`
            import numpy as np

            def distance(x, y):
                result = []
                for i in range(len(x)):
                    result.append((x[i] ** 2 + y[i] ** 2) ** 0.5)
                return np.array(result)

            def compound(principal, rate, years):
                pass

            def normalize(a):
                pass
            `,
          solution: d`
            import numpy as np

            def distance(x, y):
                return np.sqrt(x ** 2 + y ** 2)

            def compound(principal, rate, years):
                return principal * (1 + rate) ** years

            def normalize(a):
                return (a - a.min()) / (a.max() - a.min())`,
          hints: ["distance: np.sqrt(x ** 2 + y ** 2)", "compound: principal * (1 + rate) ** years works for a whole array of years", "normalize: (a - a.min()) / (a.max() - a.min())"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            ds = expect_func("distance"); cp = expect_func("compound"); nz = expect_func("normalize")
            expect_array(ds(np.array([3, 0, -6]), np.array([4, 2, 8])), [5, 2, 10], "distance([3 0 -6], [4 2 8])")
            expect_array(cp(1000, 0.1, np.array([0, 1, 2, 10])), [1000, 1100, 1210, 1000 * 1.1 ** 10], "compound(1000, 0.1, [0 1 2 10])")
            expect_array(nz(np.array([10, 20, 15, 30])), [0, 0.5, 0.25, 1], "normalize([10 20 15 30])")
            expect_array(nz(np.array([-1.0, 1.0])), [0, 1], "normalize([-1 1])")` }],
        },
        {
          id: "np4-2", title: "Race of the Engines",
          story: "The old engine turns its wheels one by one. Rebuild it to turn them all at once, and win the race.",
          lesson: `<p>Two functions you'll meet again in machine learning:</p>
            <ul><li><b>Sigmoid</b>: <code>1 / (1 + e^(−x))</code> squashes any number into 0…1 (a probability)</li>
            <li><b>Softmax</b>: <code>e^x / sum(e^x)</code> turns a list of scores into probabilities that add up to 1. Subtract the max first (<code>x - x.max()</code>): it gives the same result but avoids overflow for big numbers like 1000</li></ul>
            <p>The starter code uses loops. Replace them with vectorized NumPy: no <code>for</code>, no <code>while</code>, no list comprehensions.</p>`,
          example: d`
            import numpy as np
            import time

            x = np.random.default_rng(0).normal(size=200_000)
            t = time.perf_counter()
            slow = np.array([v * 2 + 1 for v in x])
            t1 = time.perf_counter()
            fast = x * 2 + 1
            t2 = time.perf_counter()
            print(f"loop {t1 - t:.4f}s, vectorized {t2 - t1:.4f}s, same: {np.allclose(slow, fast)}")`,
          task: `Rewrite all three functions <b>without loops</b>:<br>• <code>sigmoid(x)</code> → <code>1 / (1 + e^(−x))</code> for every element<br>
            • <code>softmax(x)</code> → <code>e^(x − max) / sum(e^(x − max))</code>; must work for huge values like <code>[1000, 1001]</code><br>
            • <code>safe_log(x)</code> → the natural log of every element, but values below <code>1e-9</code> are first raised to <code>1e-9</code> (so 0 doesn't give −infinity)`,
          starter: d`
            import numpy as np
            import math

            def sigmoid(x):
                return np.array([1 / (1 + math.exp(-v)) for v in x])

            def softmax(x):
                exps = [math.exp(v) for v in x]
                total = sum(exps)
                return np.array([e / total for e in exps])

            def safe_log(x):
                out = []
                for v in x:
                    out.append(math.log(max(v, 1e-9)))
                return np.array(out)
            `,
          solution: d`
            import numpy as np

            def sigmoid(x):
                return 1 / (1 + np.exp(-x))

            def softmax(x):
                e = np.exp(x - x.max())
                return e / e.sum()

            def safe_log(x):
                return np.log(np.maximum(x, 1e-9))`,
          hints: ["sigmoid: 1 / (1 + np.exp(-x))", "softmax: e = np.exp(x - x.max()); return e / e.sum()", "safe_log: np.log(np.maximum(x, 1e-9))"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            sg = expect_func("sigmoid"); sm = expect_func("softmax"); sl = expect_func("safe_log")
            expect_array(sg(np.array([0.0, 2.0, -2.0])), [0.5, 1 / (1 + np.exp(-2)), 1 / (1 + np.exp(2))], "sigmoid([0 2 -2])")
            expect_array(sm(np.array([1.0, 2.0, 3.0])), np.exp([1, 2, 3]) / np.exp([1, 2, 3]).sum(), "softmax([1 2 3])")
            r = sm(np.array([1000.0, 1001.0]))
            expect_array(r, [1 / (1 + np.e), np.e / (1 + np.e)], "softmax([1000 1001]) (subtract the max to avoid overflow)")
            expect_array(sl(np.array([1.0, np.e, 0.0])), [0, 1, np.log(1e-9)], "safe_log([1 e 0])")` }],
        },
        {
          id: "np4-3", title: "The Precision Trap",
          story: "Some gauges in the engine room are broken and read NaN: \"not a number\". One NaN can poison every calculation.",
          lesson: `<p>Real data has <b>missing values</b>. In NumPy they are <code>np.nan</code> (a special float). NaN spreads: <code>np.mean([1, nan])</code> is <code>nan</code>.</p>
            <ul><li><code>np.isnan(a)</code> → mask of missing values (<code>a == np.nan</code> is <b>always False</b>!)</li>
            <li><code>np.nanmean</code>, <code>np.nansum</code>, <code>np.nanmax</code>… ignore NaN</li>
            <li><code>np.isclose(a, b)</code> / <code>np.allclose(a, b)</code> compare floats with a tolerance</li>
            <li>Dividing by zero gives <code>inf</code> or <code>nan</code> with a warning. <code>np.divide(a, b, out=np.zeros_like(a, dtype=float), where=b != 0)</code> only divides where it's safe</li></ul>`,
          example: d`
            import numpy as np

            g = np.array([3.0, np.nan, 5.0, np.nan])
            print(np.isnan(g), np.isnan(g).sum())
            print(g.mean(), np.nanmean(g))
            print(np.where(np.isnan(g), 0, g))
            a, b = np.array([1.0, 4.0]), np.array([0.0, 2.0])
            print(np.divide(a, b, out=np.zeros_like(a), where=b != 0))`,
          task: `Write, <b>without loops</b>:<br>• <code>count_missing(a)</code> → how many values are NaN<br>
            • <code>fill_missing(a, value)</code> → a new array with every NaN replaced by <code>value</code><br>
            • <code>safe_mean(a)</code> → the mean of the values that aren't NaN<br>
            • <code>safe_divide(a, b)</code> → <code>a / b</code> element-wise, but <code>0.0</code> wherever <code>b</code> is 0 (no warnings, no inf)`,
          starter: d`
            import numpy as np

            def count_missing(a):
                return (a == np.nan).sum()

            def fill_missing(a, value):
                pass

            def safe_mean(a):
                return a.mean()

            def safe_divide(a, b):
                return a / b
            `,
          solution: d`
            import numpy as np

            def count_missing(a):
                return int(np.isnan(a).sum())

            def fill_missing(a, value):
                return np.where(np.isnan(a), value, a)

            def safe_mean(a):
                return float(np.nanmean(a))

            def safe_divide(a, b):
                a = np.asarray(a, dtype=float)
                return np.divide(a, b, out=np.zeros_like(a), where=b != 0)`,
          hints: ["count_missing: np.isnan(a).sum() (comparing with == np.nan never works)", "fill_missing: np.where(np.isnan(a), value, a)", "safe_mean: np.nanmean(a)", "safe_divide: np.divide(a, b, out=np.zeros_like(a, dtype=float), where=b != 0)"],
          tests: [{ code: d`
            import numpy as np, warnings
            must_not_use("for", "while", "listcomp")
            cm = expect_func("count_missing"); fm = expect_func("fill_missing"); sm = expect_func("safe_mean"); sd = expect_func("safe_divide")
            g = np.array([3.0, np.nan, 5.0, np.nan, 1.0])
            expect_equal(cm(g), 2, "count_missing([3 nan 5 nan 1])")
            expect_equal(cm(np.array([1.0])), 0, "count_missing([1])")
            expect_array(fm(g, 0), [3, 0, 5, 0, 1], "fill_missing(g, 0)")
            expect_array(g[[0, 2, 4]], [3, 5, 1], "the original after fill_missing (must not change)")
            expect_close(sm(g), 3.0, "safe_mean([3 nan 5 nan 1])")
            with warnings.catch_warnings():
                warnings.simplefilter("error")
                try:
                    r = sd(np.array([1.0, 4.0, 9.0]), np.array([0.0, 2.0, 3.0]))
                except RuntimeWarning as w:
                    raise AssertionError("safe_divide still divides by zero (" + str(w) + "). Only divide where b != 0.")
            expect_array(r, [0, 2, 3], "safe_divide([1 4 9], [0 2 3])", kind="f")` }],
        },
        {
          id: "np4-4", type: "quiz", title: "Riddles of the Engines",
          story: "The engine room's dials show strange numbers. Explain each one, or the engines stall.",
          lesson: `<p>Floats are approximate; NaN is never equal to anything (not even itself); integer dtypes have a fixed size and <b>wrap around</b> when they overflow; <code>/</code> always gives floats.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                s = np.array([0.1, 0.2]).sum()
                print(s == 0.3, np.isclose(s, 0.3))`,
              choices: ["False True", "True True", "False False", "True False"], answer: 0,
              explain: "0.1 + 0.2 isn't exactly 0.3 in binary. <code>isclose</code> allows a tiny tolerance." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.nan == np.nan, np.isnan(np.nan))`,
              choices: ["False True", "True True", "True False", "nan True"], answer: 0,
              explain: "NaN is not equal to anything, even itself. Always test with <code>np.isnan</code>." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.mean([1, np.nan, 3]), np.nanmean([1, np.nan, 3]))`,
              choices: ["nan 2.0", "2.0 2.0", "1.33 2.0", "nan nan"], answer: 0,
              explain: "One NaN makes the ordinary mean NaN; <code>nanmean</code> skips it." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.array([1, 2, 3]) / 2, np.array([1, 2, 3]) // 2)`,
              choices: ["[0.5 1.  1.5] [0 1 1]", "[0 1 1] [0 1 1]", "[0.5 1.  1.5] [0.5 1.  1.5]", "[1 1 2] [0 1 1]"], answer: 0,
              explain: "<code>/</code> always gives floats; <code>//</code> keeps ints and rounds down." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([250], dtype=np.uint8)
                print(a + np.uint8(10))`,
              choices: ["[4]", "[260]", "[255]", "OverflowError"], answer: 0,
              explain: "<code>uint8</code> holds 0–255. 260 wraps around to 260 − 256 = 4, silently. (This is why image maths often converts to float first.)" },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.maximum(np.array([1, 5, 2]), 3), np.array([1, 5, 2]).max())`,
              choices: ["[3 5 3] 5", "5 5", "[1 5 2] 5", "[3 5 3] [3 5 3]"], answer: 0,
              explain: "<code>np.maximum</code> compares element by element; <code>.max()</code> reduces the whole array to one number." },
          ],
        },
        {
          id: "np4-5", boss: true, time: 720, title: "The Loan Engine",
          story: "The Citadel's bank lends gold to rebuild the realm. Merchants want to compare hundreds of loans at once.",
          lesson: `<p>The monthly payment of a loan of <code>P</code> over <code>n</code> months with a monthly rate <code>r</code> (the yearly rate ÷ 12) is:</p>
            <p><code>payment = P × r / (1 − (1 + r)^(−n))</code></p>
            <p>When the rate is 0 this divides by zero, and the payment is simply <code>P / n</code>. Handle both cases for a whole array with <code>np.where</code>. Because <code>np.where</code> computes <b>both</b> choices, silence the harmless warnings with <code>with np.errstate(divide="ignore", invalid="ignore"):</code>.</p>
            <p>If every input can be an array (or a single number), one function answers hundreds of "what if" questions at once.</p>`,
          example: d`
            import numpy as np

            r = np.array([0.0, 0.01])
            with np.errstate(divide="ignore", invalid="ignore"):
                ratio = np.where(r == 0, 0.5, 1 / r)
            print(ratio)`,
          task: `Write, <b>without loops</b> (every argument may be a number or an array):<br>
            • <code>monthly_payment(principal, annual_rate, months)</code> → the payment from the formula above (and <code>principal / months</code> when the rate is 0)<br>
            • <code>total_interest(principal, annual_rate, months)</code> → payment × months − principal<br>
            • <code>affordable(principals, annual_rate, months, budget)</code> → the principals (from the array) whose monthly payment is at most <code>budget</code>`,
          starter: d`
            import numpy as np

            def monthly_payment(principal, annual_rate, months):
                r = annual_rate / 12
                return principal * r / (1 - (1 + r) ** -months)

            def total_interest(principal, annual_rate, months):
                pass

            def affordable(principals, annual_rate, months, budget):
                pass
            `,
          solution: d`
            import numpy as np

            def monthly_payment(principal, annual_rate, months):
                p = np.asarray(principal, dtype=float)
                r = np.asarray(annual_rate, dtype=float) / 12
                n = np.asarray(months, dtype=float)
                with np.errstate(divide="ignore", invalid="ignore"):
                    pay = np.where(r == 0, p / n, p * r / (1 - (1 + r) ** -n))
                return pay

            def total_interest(principal, annual_rate, months):
                return monthly_payment(principal, annual_rate, months) * months - principal

            def affordable(principals, annual_rate, months, budget):
                principals = np.asarray(principals)
                return principals[monthly_payment(principals, annual_rate, months) <= budget]`,
          hints: ["Turn inputs into float arrays with np.asarray(x, dtype=float) so r == 0 works for numbers and arrays.", "with np.errstate(divide=\"ignore\", invalid=\"ignore\"): pay = np.where(r == 0, p / n, p * r / (1 - (1 + r) ** -n))", "affordable: principals[monthly_payment(principals, annual_rate, months) <= budget]"],
          tests: [{ code: d`
            import numpy as np, warnings
            must_not_use("for", "while", "listcomp")
            mp = expect_func("monthly_payment"); ti = expect_func("total_interest"); af = expect_func("affordable")
            def ref(P, rate, n):
                r = rate / 12
                return P / n if r == 0 else P * r / (1 - (1 + r) ** -n)
            expect_close(mp(10000, 0.06, 36), ref(10000, 0.06, 36), "monthly_payment(10000, 0.06, 36)")
            expect_close(mp(1200, 0.0, 12), 100.0, "monthly_payment(1200, 0.0, 12) (zero rate)")
            with warnings.catch_warnings():
                warnings.simplefilter("error")
                try:
                    got = mp(10000, np.array([0.0, 0.05, 0.10]), 24)
                except RuntimeWarning as w:
                    raise AssertionError("monthly_payment shows a warning for a zero rate (" + str(w) + "). Wrap the maths in np.errstate(divide=\"ignore\", invalid=\"ignore\").")
            expect_array(np.asarray(got), [ref(10000, r, 24) for r in (0.0, 0.05, 0.10)], "monthly_payment(10000, [0 0.05 0.10], 24)")
            expect_array(np.asarray(mp(np.array([1000, 2000]), 0.12, np.array([10, 20]))), [ref(1000, 0.12, 10), ref(2000, 0.12, 20)], "monthly_payment([1000 2000], 0.12, [10 20])")
            expect_close(ti(10000, 0.06, 36), ref(10000, 0.06, 36) * 36 - 10000, "total_interest(10000, 0.06, 36)")
            expect_close(ti(1200, 0.0, 12), 0.0, "total_interest with a zero rate")
            expect_array(af(np.array([5000, 10000, 15000, 20000]), 0.06, 36, 400), [5000, 10000], "affordable([5000 10000 15000 20000], 0.06, 36, budget 400)")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "Broadcasting Towers", topic: "broadcasting rules & shapes", time: 540, icon: "📡",
      intro: "The towers broadcast one signal to many receivers. NumPy stretches small arrays across big ones the same way.",
      missions: [
        {
          id: "np5-1", title: "Stretching Spells",
          story: "One bonus for each test, applied to every student at once: the towers stretch the spell across the whole class.",
          lesson: `<p><b>Broadcasting</b> lets arrays of different shapes work together. NumPy compares shapes <b>from the right</b>; two sizes fit if they're <b>equal</b> or one of them is <b>1</b> (or missing). The size-1 side is stretched (without copying).</p>
            <ul><li><code>(4, 3) + (3,)</code> → each row gets the same 3 values added</li>
            <li><code>(4, 3) * (4, 1)</code> → each row multiplied by its own number</li>
            <li><code>(3, 1) + (4,)</code> → a full <code>(3, 4)</code> table</li></ul>
            <p>Turn a 1-D array into a column with <code>v[:, None]</code> (or <code>v.reshape(-1, 1)</code>). <code>a.mean(axis=0)</code> gives one mean per <b>column</b>.</p>`,
          example: d`
            import numpy as np

            scores = np.array([[70, 80, 90], [60, 65, 70]])
            print(scores + np.array([5, 0, -5]))       # per column
            print(scores * np.array([1, 2])[:, None])  # per row
            print(np.arange(3)[:, None] + np.arange(4)) # (3,1) + (4,) -> (3,4)
            print(scores - scores.mean(axis=0))`,
          task: `Write, <b>without loops</b>:<br>• <code>add_bonus(scores, bonus)</code> → <code>scores</code> (students × tests) plus <code>bonus</code> (one value per test)<br>
            • <code>scale_rows(a, factors)</code> → each row of <code>a</code> multiplied by its own factor (<code>factors</code> has one value per row)<br>
            • <code>center_columns(a)</code> → <code>a</code> minus each column's mean<br>
            • <code>times_table(n)</code> → the <code>n × n</code> multiplication table (row <code>i</code>, column <code>j</code> holds (i+1)·(j+1))`,
          starter: d`
            import numpy as np

            def add_bonus(scores, bonus):
                pass

            def scale_rows(a, factors):
                return a * factors

            def center_columns(a):
                pass

            def times_table(n):
                pass
            `,
          solution: d`
            import numpy as np

            def add_bonus(scores, bonus):
                return scores + bonus

            def scale_rows(a, factors):
                return a * factors[:, None]

            def center_columns(a):
                return a - a.mean(axis=0)

            def times_table(n):
                k = np.arange(1, n + 1)
                return k[:, None] * k`,
          hints: ["add_bonus: scores + bonus already broadcasts (n, t) + (t,)", "scale_rows: turn factors into a column: factors[:, None]", "center_columns: a - a.mean(axis=0)", "times_table: k = np.arange(1, n + 1); k[:, None] * k"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            ab = expect_func("add_bonus"); sr = expect_func("scale_rows"); cc = expect_func("center_columns"); tt = expect_func("times_table")
            s = np.array([[70, 80, 90], [60, 65, 70]])
            expect_array(ab(s, np.array([5, 0, -5])), [[75, 80, 85], [65, 65, 65]], "add_bonus(scores, [5 0 -5])")
            expect_array(sr(s, np.array([1, 2])), [[70, 80, 90], [120, 130, 140]], "scale_rows(scores, [1 2])")
            expect_array(sr(np.ones((3, 3)), np.array([1, 2, 3])), [[1, 1, 1], [2, 2, 2], [3, 3, 3]], "scale_rows(ones 3x3, [1 2 3]) (rows, not columns!)")
            expect_array(cc(s), [[5, 7.5, 10], [-5, -7.5, -10]], "center_columns(scores)")
            expect_array(tt(3), [[1, 2, 3], [2, 4, 6], [3, 6, 9]], "times_table(3)")
            expect_array(tt(1), [[1]], "times_table(1)")` }],
        },
        {
          id: "np5-2", title: "The Distance Map",
          story: "The towers must know how far each one is from every other, to relay signals along the shortest paths.",
          lesson: `<p>Broadcasting can compare <b>every pair</b> of items at once. For points <code>p</code> of shape <code>(n, 2)</code>:</p>
            <ul><li><code>p[:, None, :]</code> has shape <code>(n, 1, 2)</code> and <code>p[None, :, :]</code> has shape <code>(1, n, 2)</code></li>
            <li>their difference has shape <code>(n, n, 2)</code>: every point minus every point</li>
            <li>square, sum over the last axis (<code>axis=-1</code>), square-root → an <code>(n, n)</code> distance matrix</li></ul>
            <p><code>np.fill_diagonal(d, np.inf)</code> hides each point's zero distance to itself; then <code>d.argmin(axis=1)</code> finds each point's nearest neighbour. This is exactly how the k-nearest-neighbours algorithm starts.</p>`,
          example: d`
            import numpy as np

            p = np.array([[0, 0], [3, 4], [6, 8]])
            diff = p[:, None, :] - p[None, :, :]
            print(diff.shape)
            d = np.sqrt((diff ** 2).sum(axis=-1))
            print(d)`,
          task: `Points are an array of shape <code>(n, 2)</code>. Write, <b>without loops</b>:<br>
            • <code>pairwise_distances(p)</code> → the <code>(n, n)</code> matrix of distances between every pair of points<br>
            • <code>nearest_other(p)</code> → for each point, the index of the nearest <b>other</b> point<br>
            • <code>within(p, center, radius)</code> → a boolean mask: which points are at most <code>radius</code> away from the point <code>center</code>`,
          starter: d`
            import numpy as np

            def pairwise_distances(p):
                pass

            def nearest_other(p):
                pass

            def within(p, center, radius):
                pass
            `,
          solution: d`
            import numpy as np

            def pairwise_distances(p):
                diff = p[:, None, :] - p[None, :, :]
                return np.sqrt((diff ** 2).sum(axis=-1))

            def nearest_other(p):
                d = pairwise_distances(p)
                np.fill_diagonal(d, np.inf)
                return d.argmin(axis=1)

            def within(p, center, radius):
                return np.sqrt(((p - center) ** 2).sum(axis=1)) <= radius`,
          hints: ["diff = p[:, None, :] - p[None, :, :] has shape (n, n, 2)", "np.sqrt((diff ** 2).sum(axis=-1))", "nearest_other: fill the diagonal with np.inf, then d.argmin(axis=1)", "within: p - center broadcasts (n, 2) - (2,)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            pd_ = expect_func("pairwise_distances"); no = expect_func("nearest_other"); wi = expect_func("within")
            p = np.array([[0.0, 0], [3, 4], [6, 8], [0, 1]])
            ref = np.sqrt(((p[:, None] - p[None]) ** 2).sum(-1))
            expect_array(pd_(p), ref, "pairwise_distances(points)")
            expect_array(pd_(np.array([[1.0, 1.0]])), [[0]], "pairwise_distances of a single point")
            expect_array(no(p), [3, 3, 1, 0], "nearest_other(points)")
            expect_array(wi(p, np.array([0, 0]), 5), [True, True, False, True], "within(points, [0 0], 5)")
            expect_array(wi(p, np.array([6, 8]), 0.5), [False, False, True, False], "within(points, [6 8], 0.5)")` }],
        },
        {
          id: "np5-3", title: "The Scaling Ritual",
          story: "Before the towers can compare signals, every signal must be brought to the same scale.",
          lesson: `<p>Machine-learning models often need features on the same scale. Two common recipes, applied <b>per column</b>:</p>
            <ul><li><b>Standardize</b>: <code>(X - X.mean(axis=0)) / X.std(axis=0)</code> → each column gets mean 0 and standard deviation 1</li>
            <li><b>Min-max scale</b>: <code>(X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))</code> → each column runs from 0 to 1</li></ul>
            <p>For <b>per-row</b> maths, keep the reduced axis with <code>keepdims=True</code>: <code>X.sum(axis=1, keepdims=True)</code> has shape <code>(n, 1)</code>, which broadcasts back across each row.</p>`,
          example: d`
            import numpy as np

            X = np.array([[1.0, 200], [2, 400], [3, 600]])
            print(X.mean(axis=0), X.std(axis=0))
            print(X.sum(axis=1).shape, X.sum(axis=1, keepdims=True).shape)
            print(X / X.sum(axis=1, keepdims=True))`,
          task: `<code>X</code> is a 2-D table (rows = samples, columns = features). Write, <b>without loops</b>:<br>
            • <code>standardize(X)</code> → each column scaled to mean 0, standard deviation 1<br>
            • <code>min_max_columns(X)</code> → each column scaled to run from 0 to 1<br>
            • <code>row_proportions(X)</code> → each row divided by its own total (every row then sums to 1)`,
          starter: d`
            import numpy as np

            def standardize(X):
                return (X - X.mean()) / X.std()

            def min_max_columns(X):
                pass

            def row_proportions(X):
                return X / X.sum(axis=1)
            `,
          solution: d`
            import numpy as np

            def standardize(X):
                return (X - X.mean(axis=0)) / X.std(axis=0)

            def min_max_columns(X):
                lo, hi = X.min(axis=0), X.max(axis=0)
                return (X - lo) / (hi - lo)

            def row_proportions(X):
                return X / X.sum(axis=1, keepdims=True)`,
          hints: ["standardize per column: axis=0 for both mean and std", "min_max_columns: lo = X.min(axis=0), hi = X.max(axis=0)", "row_proportions: X / X.sum(axis=1, keepdims=True)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            st = expect_func("standardize"); mm = expect_func("min_max_columns"); rp = expect_func("row_proportions")
            X = np.array([[1.0, 200, 5], [2, 400, 5.5], [3, 600, 7], [6, 300, 4]])
            r = st(X)
            expect_array(r, (X - X.mean(0)) / X.std(0), "standardize(X)")
            expect_array(r.mean(axis=0), [0, 0, 0], "column means after standardize")
            expect_array(mm(X), (X - X.min(0)) / (X.max(0) - X.min(0)), "min_max_columns(X)")
            Y = np.array([[1.0, 3], [2, 2], [0, 5]])
            expect_array(rp(Y), [[0.25, 0.75], [0.5, 0.5], [0, 1]], "row_proportions([[1 3] [2 2] [0 5]])")` }],
        },
        {
          id: "np5-4", type: "quiz", title: "Riddles of the Towers",
          story: "Each tower broadcasts a riddle about shapes. Answer with the shape of the result, or the error it causes.",
          lesson: `<p>Line the shapes up on the right. Each pair of sizes must be equal or contain a 1. The result takes the larger size in each position. If a pair doesn't fit, you get <code>ValueError: operands could not be broadcast together</code>.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print((np.ones((2, 3)) + np.arange(3)).shape)`,
              choices: ["(2, 3)", "(3,)", "(2, 3, 3)", "ValueError"], answer: 0,
              explain: "(2, 3) and (3,): the 3s match, and the missing dimension is stretched to 2." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import numpy as np
                print((np.ones((2, 3)) + np.arange(2)).shape)`,
              choices: ["ValueError", "(2, 3)", "(2, 2)", "(2,)"], answer: 0,
              explain: "Compared from the right, 3 and 2 don't match and neither is 1. To add per row, use <code>np.arange(2)[:, None]</code>." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print((np.arange(3)[:, None] + np.arange(4)).shape)`,
              choices: ["(3, 4)", "(4, 3)", "(3,)", "ValueError"], answer: 0,
              explain: "(3, 1) and (4,) → (3, 4): a column plus a row makes a full table." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.arange(3)[:, None] * np.arange(3))`,
              choices: ["[[0 0 0]\n [0 1 2]\n [0 2 4]]", "[0 1 4]", "[[0 1 2]\n [0 1 2]\n [0 1 2]]", "[[0]\n [1]\n [4]]"], answer: 0,
              explain: "Every row value times every column value: a small multiplication table." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([[1, 2], [3, 4]])
                print(a - a.mean(axis=0))`,
              choices: ["[[-1. -1.]\n [ 1.  1.]]", "[[-0.5  0.5]\n [-0.5  0.5]]", "[[-1.5 -0.5]\n [ 0.5  1.5]]", "[[0 0]\n [2 2]]"], answer: 0,
              explain: "The column means are 2 and 3; each is subtracted from its own column." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.ones((2, 5))
                print(a.sum(axis=1).shape, a.sum(axis=1, keepdims=True).shape)`,
              choices: ["(2,) (2, 1)", "(5,) (1, 5)", "(2,) (2,)", "(2, 1) (2,)"], answer: 0,
              explain: "Summing along axis 1 removes it; <code>keepdims=True</code> keeps it with size 1, ready to broadcast back." },
          ],
        },
        {
          id: "np5-5", boss: true, time: 810, title: "The Grade Curve",
          story: "The Citadel's academy held four exams. Some were too hard. King Gauss wants fair final grades.",
          lesson: `<p>Bring it together: weights per column, shifts per column, conditions per element.</p>
            <ul><li>A <b>weighted average</b> per row: <code>(scores * weights).sum(axis=1) / weights.sum()</code></li>
            <li><code>np.clip(a, 0, 100)</code> keeps values in range</li>
            <li><code>np.select([cond1, cond2, …], [value1, value2, …], default=…)</code> is like an if/elif chain for arrays: the first true condition wins</li></ul>`,
          example: d`
            import numpy as np

            t = np.array([95, 72, 40, 88])
            print(np.select([t >= 90, t >= 70], ["top", "ok"], default="low"))
            print(np.clip(np.array([-5, 50, 120]), 0, 100))`,
          task: `<code>scores</code> has one row per student and one column per exam. Write, <b>without loops</b>:<br>
            • <code>weighted_totals(scores, weights)</code> → each student's weighted average (<code>weights</code>: one per exam)<br>
            • <code>curve(scores, target)</code> → shift each exam's column so its mean becomes <code>target</code>, then clip everything to 0–100<br>
            • <code>letter_grades(totals)</code> → <code>"A"</code> for 90+, <code>"B"</code> for 80+, <code>"C"</code> for 70+, otherwise <code>"F"</code><br>
            • <code>class_report(scores, weights)</code> → a dict: <code>"best_student"</code> (index of the highest weighted total), <code>"hardest_exam"</code> (index of the exam with the lowest mean) and <code>"pass_rate"</code> (fraction of students with a weighted total of 70 or more)`,
          starter: d`
            import numpy as np

            def weighted_totals(scores, weights):
                pass

            def curve(scores, target):
                pass

            def letter_grades(totals):
                pass

            def class_report(scores, weights):
                pass
            `,
          solution: d`
            import numpy as np

            def weighted_totals(scores, weights):
                return (scores * weights).sum(axis=1) / weights.sum()

            def curve(scores, target):
                return np.clip(scores + (target - scores.mean(axis=0)), 0, 100)

            def letter_grades(totals):
                return np.select([totals >= 90, totals >= 80, totals >= 70], ["A", "B", "C"], default="F")

            def class_report(scores, weights):
                t = weighted_totals(scores, weights)
                return {
                    "best_student": int(t.argmax()),
                    "hardest_exam": int(scores.mean(axis=0).argmin()),
                    "pass_rate": float((t >= 70).mean()),
                }`,
          hints: ["weighted_totals: (scores * weights).sum(axis=1) / weights.sum()", "curve: scores + (target - scores.mean(axis=0)), then np.clip(..., 0, 100)", "np.select([t >= 90, t >= 80, t >= 70], [\"A\", \"B\", \"C\"], default=\"F\")", "pass_rate: (t >= 70).mean() (the mean of a mask is the fraction of Trues)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            wt = expect_func("weighted_totals"); cv = expect_func("curve"); lg = expect_func("letter_grades"); cr = expect_func("class_report")
            S = np.array([[90, 60, 85, 70], [75, 40, 95, 88], [55, 35, 60, 65], [98, 72, 99, 91]])
            W = np.array([1, 2, 1, 1])
            ref_t = (S * W).sum(1) / W.sum()
            expect_array(wt(S, W), ref_t, "weighted_totals(scores, [1 2 1 1])")
            ref_c = np.clip(S + (70 - S.mean(0)), 0, 100)
            expect_array(cv(S, 70), ref_c, "curve(scores, 70)")
            expect_array(cv(np.array([[100.0, 0], [100, 10]]), 95), [[95, 90], [95, 100]], "curve with clipping")
            expect_array(lg(np.array([95, 90, 89.9, 80, 75, 70, 69.9, 0])), ["A", "A", "B", "B", "C", "C", "F", "F"], "letter_grades(...)", kind="U")
            rep = cr(S, W)
            expect_equal(rep.get("best_student"), int(ref_t.argmax()), "class_report best_student")
            expect_equal(rep.get("hardest_exam"), 1, "class_report hardest_exam")
            expect_close(rep.get("pass_rate"), float((ref_t >= 70).mean()), "class_report pass_rate")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "The Counting House", topic: "sum, mean, std, axis, argmax, cumsum & histograms", time: 600, icon: "🏦",
      intro: "The Citadel's treasurers summarise mountains of numbers into a few that matter: totals, averages, extremes and trends.",
      missions: [
        {
          id: "np6-1", title: "Count the Treasure",
          story: "Every shop in the Citadel reports its takings each day. The treasurer wants totals in every direction.",
          lesson: `<p>Reductions like <code>sum</code>, <code>mean</code>, <code>min</code>, <code>max</code>, <code>std</code>, <code>argmax</code> work on the whole array, or along one <b>axis</b>:</p>
            <ul><li><code>axis=0</code> collapses the <b>rows</b> → one result per <b>column</b></li>
            <li><code>axis=1</code> collapses the <b>columns</b> → one result per <b>row</b></li></ul>
            <p>Tip: the axis you name is the one that <b>disappears</b>. <code>argmax</code> gives the <b>position</b> of the maximum rather than the value.</p>`,
          example: d`
            import numpy as np

            sales = np.array([[5, 3, 9],     # day 0: shops 0, 1, 2
                              [7, 1, 4],     # day 1
                              [2, 8, 6]])    # day 2
            print(sales.sum(), sales.sum(axis=0), sales.sum(axis=1))
            print(sales.max(axis=0), sales.argmax(axis=0))
            print(sales.mean(axis=1).round(2))`,
          task: `<code>sales</code> has one row per day and one column per shop. Write, <b>without loops</b>:<br>
            • <code>shop_totals(sales)</code> → the total of each shop<br>• <code>day_totals(sales)</code> → the total of each day<br>
            • <code>best_shop(sales)</code> → the index of the shop with the largest total (an int)<br>
            • <code>best_day_per_shop(sales)</code> → for each shop, the index of its best day`,
          starter: d`
            import numpy as np

            def shop_totals(sales):
                return sales.sum()

            def day_totals(sales):
                pass

            def best_shop(sales):
                pass

            def best_day_per_shop(sales):
                pass
            `,
          solution: d`
            import numpy as np

            def shop_totals(sales):
                return sales.sum(axis=0)

            def day_totals(sales):
                return sales.sum(axis=1)

            def best_shop(sales):
                return int(shop_totals(sales).argmax())

            def best_day_per_shop(sales):
                return sales.argmax(axis=0)`,
          hints: ["Shops are columns: collapse the rows with axis=0.", "Days are rows: sum(axis=1).", "best_shop: shop_totals(sales).argmax()", "best_day_per_shop: sales.argmax(axis=0)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            stt = expect_func("shop_totals"); dt = expect_func("day_totals"); bs = expect_func("best_shop"); bd = expect_func("best_day_per_shop")
            s = np.array([[5, 3, 9, 1], [7, 1, 4, 2], [2, 8, 6, 3]])
            expect_array(stt(s), [14, 12, 19, 6], "shop_totals(sales)")
            expect_array(dt(s), [18, 14, 19], "day_totals(sales)")
            expect_equal(bs(s), 2, "best_shop(sales)")
            expect_array(bd(s), [1, 2, 0, 2], "best_day_per_shop(sales)")` }],
        },
        {
          id: "np6-2", title: "Running Tallies",
          story: "The bank's ledger must show the balance after every transaction, and the worst losing streak of the gold price.",
          lesson: `<ul><li><code>np.cumsum(a)</code> → running total: <code>[1, 2, 3]</code> → <code>[1, 3, 6]</code></li>
            <li><code>np.diff(a)</code> → change from each element to the next (one shorter)</li>
            <li><code>np.maximum.accumulate(a)</code> → the highest value seen so far at each point (a "running max")</li>
            <li>Percentage change: <code>np.diff(p) / p[:-1] * 100</code></li></ul>
            <p>The <b>drawdown</b> is how far the price has fallen below its previous peak: <code>running_max - price</code>. Its maximum measures the worst loss an investor could have suffered.</p>`,
          example: d`
            import numpy as np

            p = np.array([10, 12, 9, 15, 11, 16])
            print(np.cumsum(p), np.diff(p))
            peak = np.maximum.accumulate(p)
            print(peak, peak - p)
            print(np.round(np.diff(p) / p[:-1] * 100, 1))`,
          task: `Write, <b>without loops</b>:<br>• <code>running_balance(transactions, start)</code> → the balance after each transaction<br>
            • <code>biggest_rise_day(prices)</code> → the index of the day whose price rose the most compared with the day before (an int)<br>
            • <code>max_drawdown(prices)</code> → the largest fall from a previous peak (0 if prices never fall)<br>
            • <code>percent_change(prices)</code> → the day-to-day change in percent`,
          starter: d`
            import numpy as np

            def running_balance(transactions, start):
                pass

            def biggest_rise_day(prices):
                return int(np.diff(prices).argmax())

            def max_drawdown(prices):
                return prices.max() - prices.min()

            def percent_change(prices):
                pass
            `,
          solution: d`
            import numpy as np

            def running_balance(transactions, start):
                return start + np.cumsum(transactions)

            def biggest_rise_day(prices):
                return int(np.diff(prices).argmax()) + 1

            def max_drawdown(prices):
                return (np.maximum.accumulate(prices) - prices).max()

            def percent_change(prices):
                return np.diff(prices) / prices[:-1] * 100`,
          hints: ["running_balance: start + np.cumsum(transactions)", "np.diff(prices)[i] is the change from day i to day i + 1, so add 1 to the argmax.", "max_drawdown: (np.maximum.accumulate(prices) - prices).max()", "percent_change: np.diff(prices) / prices[:-1] * 100"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            rb = expect_func("running_balance"); br = expect_func("biggest_rise_day"); md = expect_func("max_drawdown"); pc = expect_func("percent_change")
            expect_array(rb(np.array([50, -20, -45, 100]), 100), [150, 130, 85, 185], "running_balance([50 -20 -45 100], 100)")
            p = np.array([10, 12, 9, 15, 11, 16, 5, 7])
            expect_equal(br(p), 3, "biggest_rise_day(prices) (9 -> 15 on day 3)")
            expect_equal(md(p), 11, "max_drawdown(prices) (16 -> 5)")
            expect_equal(md(np.array([1, 2, 3])), 0, "max_drawdown of rising prices")
            expect_equal(md(np.array([20, 5, 30, 25])), 15, "max_drawdown([20 5 30 25]) (the big fall comes before the highest peak)")
            expect_array(pc(np.array([100.0, 110, 99])), [10, -10], "percent_change([100 110 99])")` }],
        },
        {
          id: "np6-3", title: "The Census of Values",
          story: "The census-takers want to know which values are common, which are rare, and how they spread out.",
          lesson: `<ul><li><code>np.unique(a, return_counts=True)</code> → the distinct values <b>and</b> how often each appears</li>
            <li><code>np.histogram(a, bins=edges)</code> → counts of values falling in each bin; returns <code>(counts, edges)</code>. Each bin includes its left edge; the last bin also includes its right edge</li>
            <li><code>np.percentile(a, q)</code> → the value below which <code>q</code>% of the data lies; the 50th percentile is the median</li>
            <li>The <b>interquartile range</b> (IQR) = 75th − 25th percentile: the spread of the middle half of the data, which isn't fooled by outliers</li></ul>`,
          example: d`
            import numpy as np

            a = np.array([3, 1, 3, 2, 3, 1, 9])
            vals, counts = np.unique(a, return_counts=True)
            print(vals, counts, vals[counts.argmax()])
            print(np.histogram(a, bins=[0, 2, 4, 10]))
            print(np.percentile(a, [25, 50, 75]))`,
          task: `Write, <b>without loops</b> (except to build the dict):<br>• <code>most_common(a)</code> → the most frequent value (the smallest one on a tie)<br>
            • <code>value_counts(a)</code> → a dict <code>{value: count}</code> with plain Python ints<br>
            • <code>bin_counts(a, edges)</code> → an array: how many values fall in each bin defined by <code>edges</code><br>
            • <code>iqr(a)</code> → the interquartile range`,
          starter: d`
            import numpy as np

            def most_common(a):
                pass

            def value_counts(a):
                pass

            def bin_counts(a, edges):
                pass

            def iqr(a):
                pass
            `,
          solution: d`
            import numpy as np

            def most_common(a):
                vals, counts = np.unique(a, return_counts=True)
                return vals[counts.argmax()]

            def value_counts(a):
                vals, counts = np.unique(a, return_counts=True)
                return {int(v): int(c) for v, c in zip(vals, counts)}

            def bin_counts(a, edges):
                return np.histogram(a, bins=edges)[0]

            def iqr(a):
                return np.percentile(a, 75) - np.percentile(a, 25)`,
          hints: ["vals, counts = np.unique(a, return_counts=True); counts.argmax() returns the first (smallest) on a tie", "value_counts: {int(v): int(c) for v, c in zip(vals, counts)}", "np.histogram(a, bins=edges)[0]", "np.percentile(a, 75) - np.percentile(a, 25)"],
          tests: [{ code: d`
            import numpy as np
            mc = expect_func("most_common"); vc = expect_func("value_counts"); bc = expect_func("bin_counts"); iq = expect_func("iqr")
            a = np.array([3, 1, 3, 2, 3, 1, 9, 1])
            expect_equal(mc(a), 1, "most_common([3 1 3 2 3 1 9 1]) (1 and 3 tie: the smaller wins)")
            expect_equal(mc(np.array([7, 7, 2])), 7, "most_common([7 7 2])")
            r = vc(a)
            expect_equal(r, {1: 3, 2: 1, 3: 3, 9: 1}, "value_counts(a)")
            assert all(type(k) is int and type(v) is int for k, v in r.items()), "value_counts should use plain Python ints (int(v), int(c))."
            expect_array(bc(a, [0, 2, 4, 10]), [3, 4, 1], "bin_counts(a, [0, 2, 4, 10])")
            expect_close(iq(np.arange(1, 10)), 4.0, "iqr(1..9)")
            expect_close(iq(np.array([1, 2, 3, 4, 100])), 2.0, "iqr([1 2 3 4 100]) (the outlier doesn't matter)")` }],
        },
        {
          id: "np6-4", type: "quiz", title: "Riddles of the Counting House",
          story: "The chief treasurer's riddles are all about which way you count.",
          lesson: `<p><code>axis=0</code> → one result per column; <code>axis=1</code> → one per row. <code>argmax()</code> without an axis gives a position in the <b>flattened</b> array. <code>np.std</code> divides by <code>n</code> by default; <code>ddof=1</code> divides by <code>n − 1</code> (the "sample" standard deviation statisticians often use).</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([[1, 2], [3, 4]])
                print(a.sum(axis=0), a.sum(axis=1), a.sum())`,
              choices: ["[4 6] [3 7] 10", "[3 7] [4 6] 10", "[4 6] [3 7] [10]", "10 10 10"], answer: 0,
              explain: "axis=0 adds down the columns (1+3, 2+4); axis=1 adds across the rows (1+2, 3+4)." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.array([[1, 9], [8, 2]]).argmax())`,
              choices: ["1", "(0, 1)", "9", "[1 0]"], answer: 0,
              explain: "Without an axis, the array is treated as flat: [1, 9, 8, 2], and 9 is at position 1." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.median([4, 1, 3, 2]), np.mean([1, 2]))`,
              choices: ["2.5 1.5", "3.0 1.5", "2 1", "2.5 1"], answer: 0,
              explain: "With an even count, the median is the mean of the two middle values (2 and 3)." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.std([2, 4]), np.std([2, 4], ddof=1))`,
              choices: ["1.0 1.4142135623730951", "1.4142135623730951 1.0", "1.0 1.0", "2.0 1.4142135623730951"], answer: 0,
              explain: "Divide the squared deviations (1 + 1) by n = 2 → √1, or by n − 1 = 1 → √2." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.cumsum([1, 2, 3]), np.diff([1, 4, 9]))`,
              choices: ["[1 3 6] [3 5]", "6 [3 5]", "[1 3 6] [0 3 5]", "[1 2 3] [3 5]"], answer: 0,
              explain: "Running totals 1, 3, 6; differences 4−1 and 9−4." },
          ],
        },
        {
          id: "np6-5", boss: true, time: 900, title: "The Weather Station",
          story: "The Citadel's weather station logs the temperature every hour. The king's astronomers want a full report.",
          lesson: `<p>A 2-D array with one row per day and 24 columns (hours) is a natural layout for this kind of data. Every question becomes a reduction along the right axis.</p>
            <ul><li>Several per-row results side by side: <code>np.column_stack([a, b, c])</code> makes them the columns of one table</li>
            <li>To flag unusual days, compute each day's mean, then compare it with the mean and standard deviation <b>of those daily means</b></li></ul>`,
          example: d`
            import numpy as np

            t = np.array([[10, 14, 12], [8, 20, 11]])
            print(np.column_stack([t.min(axis=1), t.max(axis=1)]))
            print(t.mean(axis=0).argmax())`,
          task: `<code>t</code> has one row per day and 24 columns (hour 0 to 23). Write, <b>without loops</b>:<br>
            • <code>daily_stats(t)</code> → an array of shape <code>(days, 3)</code> with each day's min, mean and max<br>
            • <code>hottest_hour(t)</code> → the hour (0–23) with the highest average temperature over all days<br>
            • <code>heat_days(t, threshold)</code> → how many days reached a maximum above <code>threshold</code><br>
            • <code>anomalies(t)</code> → the indexes of days whose mean differs from the average daily mean by more than 2 standard deviations of the daily means`,
          starter: d`
            import numpy as np

            def daily_stats(t):
                pass

            def hottest_hour(t):
                pass

            def heat_days(t, threshold):
                pass

            def anomalies(t):
                pass
            `,
          solution: d`
            import numpy as np

            def daily_stats(t):
                return np.column_stack([t.min(axis=1), t.mean(axis=1), t.max(axis=1)])

            def hottest_hour(t):
                return int(t.mean(axis=0).argmax())

            def heat_days(t, threshold):
                return int((t.max(axis=1) > threshold).sum())

            def anomalies(t):
                m = t.mean(axis=1)
                return np.flatnonzero(np.abs(m - m.mean()) > 2 * m.std())`,
          hints: ["daily_stats: np.column_stack([t.min(axis=1), t.mean(axis=1), t.max(axis=1)])", "hottest_hour: average over days (axis=0), then argmax", "heat_days: (t.max(axis=1) > threshold).sum()", "anomalies: m = t.mean(axis=1); np.flatnonzero(np.abs(m - m.mean()) > 2 * m.std())"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            ds = expect_func("daily_stats"); hh = expect_func("hottest_hour"); hd = expect_func("heat_days"); an = expect_func("anomalies")
            rng = np.random.default_rng(7)
            hours = np.arange(24)
            t = 15 + 8 * np.sin((hours - 9) / 24 * 2 * np.pi) + rng.normal(0, 1.5, size=(30, 24))
            t[12] += 9
            t[25] -= 8
            expect_array(ds(t), np.column_stack([t.min(1), t.mean(1), t.max(1)]), "daily_stats(30 days)")
            expect_equal(hh(t), int(t.mean(0).argmax()), "hottest_hour")
            expect_equal(hd(t, 26), int((t.max(1) > 26).sum()), "heat_days(t, 26)")
            m = t.mean(1)
            expect_array(an(t), np.flatnonzero(np.abs(m - m.mean()) > 2 * m.std()), "anomalies(t) (days 12 and 25 were tampered with)")
            small = np.array([[10.0] * 24, [20.0] * 24])
            expect_array(ds(small), [[10, 10, 10], [20, 20, 20]], "daily_stats of two flat days")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "Shape Shifters", topic: "reshape, transpose, stack, split & tile", time: 600, icon: "🧊",
      intro: "The shape-shifters fold, stack and slice arrays into any form, without changing a single number.",
      missions: [
        {
          id: "np7-1", title: "Reshape the Metal",
          story: "A long chain of numbers must be folded into a grid, and the grid turned on its side.",
          lesson: `<ul><li><code>a.reshape(rows, cols)</code> → the same numbers in a new shape (the total size must match). Use <code>-1</code> for "work it out": <code>a.reshape(-1, 4)</code></li>
            <li><code>a.T</code> → the <b>transpose</b>: rows become columns</li>
            <li><code>a.ravel()</code> → flat 1-D (a view when possible); <code>a.flatten()</code> → flat 1-D <b>copy</b></li>
            <li><code>v.reshape(-1, 1)</code> or <code>v[:, None]</code> → turn a 1-D array into a column (shape <code>(n, 1)</code>); scikit-learn expects features in this form</li></ul>`,
          example: d`
            import numpy as np

            a = np.arange(1, 7)
            g = a.reshape(2, 3)
            print(g)
            print(g.T, g.T.shape)
            print(a.reshape(-1, 2).shape, g.flatten(), a.reshape(-1, 1).shape)`,
          task: `Write, <b>without loops</b>:<br>• <code>to_grid(a, cols)</code> → the 1-D array folded into rows of <code>cols</code> numbers<br>
            • <code>rows_to_columns(a)</code> → the transpose<br>
            • <code>flat_copy(a)</code> → a 1-D <b>copy</b> (changing it must not change <code>a</code>)<br>
            • <code>as_column(v)</code> → the 1-D array as a column of shape <code>(n, 1)</code>`,
          starter: d`
            import numpy as np

            def to_grid(a, cols):
                pass

            def rows_to_columns(a):
                pass

            def flat_copy(a):
                return a.ravel()

            def as_column(v):
                pass
            `,
          solution: d`
            import numpy as np

            def to_grid(a, cols):
                return a.reshape(-1, cols)

            def rows_to_columns(a):
                return a.T

            def flat_copy(a):
                return a.flatten()

            def as_column(v):
                return v.reshape(-1, 1)`,
          hints: ["to_grid: a.reshape(-1, cols)", "rows_to_columns: a.T", "flat_copy: a.flatten() always copies (ravel may not)", "as_column: v.reshape(-1, 1)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            tg = expect_func("to_grid"); rc = expect_func("rows_to_columns"); fc = expect_func("flat_copy"); ac = expect_func("as_column")
            expect_array(tg(np.arange(1, 9), 4), [[1, 2, 3, 4], [5, 6, 7, 8]], "to_grid(1..8, 4)")
            expect_array(tg(np.arange(6), 1), [[0], [1], [2], [3], [4], [5]], "to_grid(0..5, 1)")
            g = np.arange(6).reshape(2, 3)
            expect_array(rc(g), [[0, 3], [1, 4], [2, 5]], "rows_to_columns(2x3)")
            f = fc(g)
            expect_array(f, [0, 1, 2, 3, 4, 5], "flat_copy(2x3)")
            f[0] = 99
            expect_array(g, [[0, 1, 2], [3, 4, 5]], "the original after changing flat_copy's result (must not change)")
            expect_array(ac(np.array([7, 8, 9])), [[7], [8], [9]], "as_column([7 8 9])")` }],
        },
        {
          id: "np7-2", title: "Join the Plates",
          story: "Armour plates from different smiths must be joined: side by side, one on top of another, or in layers.",
          lesson: `<ul><li><code>np.concatenate([a, b], axis=0)</code> → join along an existing axis</li>
            <li><code>np.vstack([a, b])</code> → on top of each other (more rows); <code>np.hstack([a, b])</code> → side by side (more columns)</li>
            <li><code>np.column_stack([x, y])</code> → 1-D arrays become the columns of a table</li>
            <li><code>np.stack([a, b])</code> → a <b>new</b> axis: two <code>(3, 4)</code> arrays become one <code>(2, 3, 4)</code></li></ul>`,
          example: d`
            import numpy as np

            a = np.array([[1, 2], [3, 4]])
            b = np.array([[5, 6]])
            print(np.vstack([a, b]))
            print(np.hstack([a, a * 10]))
            print(np.column_stack([np.array([1, 2]), np.array([3, 4])]))
            print(np.stack([a, a]).shape)`,
          task: `Write, <b>without loops</b>:<br>• <code>add_total_column(X)</code> → <code>X</code> with an extra last column holding each row's total<br>
            • <code>append_row(X, r)</code> → <code>X</code> with the 1-D row <code>r</code> added at the bottom<br>
            • <code>pair_up(a, b)</code> → a 2-column table: <code>a</code> as column 0, <code>b</code> as column 1<br>
            • <code>stack_days(days)</code> → a list of equally-shaped 2-D arrays stacked into one 3-D array (day, row, column)`,
          starter: d`
            import numpy as np

            def add_total_column(X):
                pass

            def append_row(X, r):
                return np.concatenate([X, r])

            def pair_up(a, b):
                pass

            def stack_days(days):
                pass
            `,
          solution: d`
            import numpy as np

            def add_total_column(X):
                return np.hstack([X, X.sum(axis=1, keepdims=True)])

            def append_row(X, r):
                return np.vstack([X, r])

            def pair_up(a, b):
                return np.column_stack([a, b])

            def stack_days(days):
                return np.stack(days)`,
          hints: ["add_total_column: np.hstack([X, X.sum(axis=1, keepdims=True)]) (the totals must be a column)", "append_row: np.vstack([X, r])", "pair_up: np.column_stack([a, b])", "stack_days: np.stack(days)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            at = expect_func("add_total_column"); ar = expect_func("append_row"); pu = expect_func("pair_up"); sd = expect_func("stack_days")
            X = np.array([[1, 2, 3], [4, 5, 6]])
            expect_array(at(X), [[1, 2, 3, 6], [4, 5, 6, 15]], "add_total_column(X)")
            expect_array(ar(X, np.array([7, 8, 9])), [[1, 2, 3], [4, 5, 6], [7, 8, 9]], "append_row(X, [7 8 9])")
            expect_array(pu(np.array([1, 2, 3]), np.array([10, 20, 30])), [[1, 10], [2, 20], [3, 30]], "pair_up([1 2 3], [10 20 30])")
            s = sd([X, X * 10, X * 100])
            expect_array(s, np.array([X, X * 10, X * 100]), "stack_days([X, X*10, X*100])")
            expect_equal(s.shape, (3, 2, 3), "stack_days(...).shape")` }],
        },
        {
          id: "np7-3", title: "Split and Tile",
          story: "The quartermaster splits supplies into equal crates, and repeats patterns on banners across the walls.",
          lesson: `<ul><li><code>np.array_split(a, n)</code> → a list of <code>n</code> nearly equal pieces (sizes differ by at most 1)</li>
            <li><code>np.split(a, [k])</code> → cut at position <code>k</code>: <code>[a[:k], a[k:]]</code></li>
            <li><code>np.repeat(a, k)</code> → each element <code>k</code> times: <code>[1 1 2 2]</code></li>
            <li><code>np.tile(a, k)</code> → the whole array <code>k</code> times: <code>[1 2 1 2]</code></li></ul>
            <p>Splitting data into a training part and a test part is the first step of every machine-learning project.</p>`,
          example: d`
            import numpy as np

            a = np.arange(10)
            print(np.array_split(a, 3))
            print(np.split(a, [7]))
            print(np.repeat([1, 2], 3), np.tile([1, 2], 3))
            print(np.tile(np.array([[0, 1]]), (2, 2)))`,
          task: `Write, <b>without loops</b>:<br>• <code>batches(a, n)</code> → a list of <code>n</code> nearly equal pieces<br>
            • <code>repeat_each(a, k)</code> → each element repeated <code>k</code> times in a row<br>
            • <code>tile_pattern(p, times)</code> → the whole pattern repeated <code>times</code> times<br>
            • <code>train_test(a, frac)</code> → a tuple <code>(train, test)</code>: the first <code>int(len(a) * frac)</code> elements and the rest`,
          starter: d`
            import numpy as np

            def batches(a, n):
                pass

            def repeat_each(a, k):
                return np.tile(a, k)

            def tile_pattern(p, times):
                pass

            def train_test(a, frac):
                pass
            `,
          solution: d`
            import numpy as np

            def batches(a, n):
                return np.array_split(a, n)

            def repeat_each(a, k):
                return np.repeat(a, k)

            def tile_pattern(p, times):
                return np.tile(p, times)

            def train_test(a, frac):
                train, test = np.split(a, [int(len(a) * frac)])
                return train, test`,
          hints: ["batches: np.array_split(a, n)", "repeat_each: np.repeat(a, k); tile_pattern: np.tile(p, times)", "train_test: np.split(a, [int(len(a) * frac)]) returns the two pieces"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            bt = expect_func("batches"); re_ = expect_func("repeat_each"); tp = expect_func("tile_pattern"); tt = expect_func("train_test")
            parts = bt(np.arange(10), 3)
            expect_equal(len(parts), 3, "len(batches(0..9, 3))")
            for got, want in zip(parts, [[0, 1, 2, 3], [4, 5, 6], [7, 8, 9]]):
                expect_array(got, want, "a piece of batches(0..9, 3)")
            expect_array(re_(np.array([1, 2, 3]), 2), [1, 1, 2, 2, 3, 3], "repeat_each([1 2 3], 2)")
            expect_array(tp(np.array([0, 1]), 3), [0, 1, 0, 1, 0, 1], "tile_pattern([0 1], 3)")
            tr, te = tt(np.arange(10), 0.8)
            expect_array(tr, list(range(8)), "train part of train_test(0..9, 0.8)")
            expect_array(te, [8, 9], "test part of train_test(0..9, 0.8)")
            tr, te = tt(np.arange(5), 0.5)
            expect_array(tr, [0, 1], "train part of train_test(0..4, 0.5)")` }],
        },
        {
          id: "np7-4", type: "quiz", title: "Riddles of the Shape Shifters",
          story: "The shape-shifters change form with every question. Can you follow?",
          lesson: `<p>Reshaping never changes the numbers or their order (row by row); only the shape. The total size must match, or you get a <code>ValueError</code>. A 1-D array has no rows or columns, so <code>.T</code> does nothing to it.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.arange(12)
                print(a.reshape(3, -1).shape, a.reshape(-1, 6).shape)`,
              choices: ["(3, 4) (2, 6)", "(3, 12) (12, 6)", "(4, 3) (6, 2)", "(3, 4) (6, 2)"], answer: 0,
              explain: "<code>-1</code> is filled in so the total stays 12: 12 / 3 = 4 and 12 / 6 = 2." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import numpy as np
                print(np.arange(10).reshape(3, 4))`,
              choices: ["ValueError", "a 3×4 array padded with zeros", "[[0 1 2 3]\n [4 5 6 7]\n [8 9]]", "a 3×4 array that wraps around"], answer: 0,
              explain: "10 numbers can't fill 3 × 4 = 12 places, so NumPy refuses." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.arange(6).reshape(2, 3).T)`,
              choices: ["[[0 3]\n [1 4]\n [2 5]]", "[[0 1]\n [2 3]\n [4 5]]", "[[5 4 3]\n [2 1 0]]", "[[0 1 2]\n [3 4 5]]"], answer: 0,
              explain: "Transposing makes row 0 (0 1 2) into column 0." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a, b = np.array([1, 2]), np.array([3, 4])
                print(np.vstack([a, b]).tolist(), np.column_stack([a, b]).tolist())`,
              choices: ["[[1, 2], [3, 4]] [[1, 3], [2, 4]]", "[[1, 3], [2, 4]] [[1, 2], [3, 4]]", "[1, 2, 3, 4] [[1, 3], [2, 4]]", "[[1, 2], [3, 4]] [[1, 2], [3, 4]]"], answer: 0,
              explain: "<code>vstack</code> uses the arrays as rows; <code>column_stack</code> uses them as columns." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                v = np.arange(3)
                print(v.T.shape, v[None].T.shape)`,
              choices: ["(3,) (3, 1)", "(1, 3) (3, 1)", "(3, 1) (3, 1)", "(3,) (1, 3)"], answer: 0,
              explain: "A 1-D array has only one axis, so <code>.T</code> changes nothing. Give it a second axis first." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.repeat([1, 2], 2), np.tile([1, 2], 2))`,
              choices: ["[1 1 2 2] [1 2 1 2]", "[1 2 1 2] [1 1 2 2]", "[2 4] [1 2 1 2]", "[1 1 2 2] [1 1 2 2]"], answer: 0,
              explain: "<code>repeat</code> repeats each element; <code>tile</code> repeats the whole array." },
          ],
        },
        {
          id: "np7-5", boss: true, time: 900, title: "The Image Forge",
          story: "The Citadel's painters store every portrait as a NumPy array. They need tools to edit them.",
          lesson: `<p>A colour image is a 3-D array of shape <code>(height, width, 3)</code>: for every pixel, red, green and blue values from 0 to 255 (dtype <code>uint8</code>).</p>
            <ul><li><b>Greyscale</b> = a weighted sum of the channels: <code>0.299·R + 0.587·G + 0.114·B</code> → <code>img @ weights</code> multiplies along the last axis</li>
            <li>Flip left–right: reverse the width axis, <code>img[:, ::-1]</code></li>
            <li><b>Thumbnail</b> by averaging <code>k × k</code> blocks: reshape <code>(H, W, 3)</code> → <code>(H/k, k, W/k, k, 3)</code>, then <code>.mean(axis=(1, 3))</code></li>
            <li>Brightening: uint8 wraps around at 255 (remember 250 + 10 = 4?). Convert to int first, clip to 0–255, then back to <code>np.uint8</code></li></ul>`,
          example: d`
            import numpy as np

            img = np.zeros((4, 6, 3), dtype=np.uint8)
            img[:, :3] = [255, 0, 0]      # left half red
            print(img.shape, img[0, 0], img[0, 5])
            print(img[:, ::-1][0, 0])     # flipped: now blue-black on the left
            print((img @ np.array([0.299, 0.587, 0.114]))[0])`,
          task: `<code>img</code> is a <code>(H, W, 3)</code> uint8 array. Write, <b>without loops</b>:<br>
            • <code>to_grayscale(img)</code> → a float <code>(H, W)</code> array: 0.299·R + 0.587·G + 0.114·B<br>
            • <code>flip_horizontal(img)</code> → the mirror image (left ↔ right)<br>
            • <code>crop_center(img, h, w)</code> → the centred <code>h × w</code> part (top = (H − h) // 2, left = (W − w) // 2)<br>
            • <code>thumbnail(img, k)</code> → each <code>k × k</code> block averaged into one pixel (H and W are multiples of <code>k</code>); float result<br>
            • <code>brighten(img, amount)</code> → every value plus <code>amount</code>, kept within 0–255, as <code>uint8</code>`,
          starter: d`
            import numpy as np

            def to_grayscale(img):
                pass

            def flip_horizontal(img):
                pass

            def crop_center(img, h, w):
                pass

            def thumbnail(img, k):
                pass

            def brighten(img, amount):
                return img + amount
            `,
          solution: d`
            import numpy as np

            def to_grayscale(img):
                return img @ np.array([0.299, 0.587, 0.114])

            def flip_horizontal(img):
                return img[:, ::-1]

            def crop_center(img, h, w):
                top = (img.shape[0] - h) // 2
                left = (img.shape[1] - w) // 2
                return img[top:top + h, left:left + w]

            def thumbnail(img, k):
                H, W, C = img.shape
                return img.reshape(H // k, k, W // k, k, C).mean(axis=(1, 3))

            def brighten(img, amount):
                return np.clip(img.astype(int) + amount, 0, 255).astype(np.uint8)`,
          hints: ["to_grayscale: img @ np.array([0.299, 0.587, 0.114])", "crop_center: compute top and left, then img[top:top + h, left:left + w]", "thumbnail: img.reshape(H // k, k, W // k, k, C).mean(axis=(1, 3))", "brighten: np.clip(img.astype(int) + amount, 0, 255).astype(np.uint8)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            gs = expect_func("to_grayscale"); fh = expect_func("flip_horizontal"); cc = expect_func("crop_center"); th = expect_func("thumbnail"); br = expect_func("brighten")
            rng = np.random.default_rng(3)
            img = rng.integers(0, 256, size=(6, 8, 3)).astype(np.uint8)
            expect_array(gs(img), img[..., 0] * 0.299 + img[..., 1] * 0.587 + img[..., 2] * 0.114, "to_grayscale(img)", kind="f")
            expect_array(fh(img), img[:, ::-1], "flip_horizontal(img)")
            expect_array(cc(img, 2, 4), img[2:4, 2:6], "crop_center(img 6x8, 2, 4)")
            expect_array(cc(img, 5, 3), img[0:5, 2:5], "crop_center(img 6x8, 5, 3)")
            ref = np.array([[img[r:r + 2, c:c + 2].reshape(-1, 3).mean(0) for c in range(0, 8, 2)] for r in range(0, 6, 2)])
            expect_array(th(img, 2), ref, "thumbnail(img, 2)")
            b = br(np.array([[[250, 10, 128]]], dtype=np.uint8), 10)
            expect_array(b, [[[255, 20, 138]]], "brighten([250 10 128], 10)", kind="u")
            expect_array(br(np.array([[[5, 200, 0]]], dtype=np.uint8), -10), [[[0, 190, 0]]], "brighten([5 200 0], -10)", kind="u")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 8, name: "The Matrix Vault", topic: "dot products, linear algebra, random numbers & regression", time: 720, icon: "🔐",
      intro: "At the top of the Citadel, King Gauss is sealed in a vault whose locks are matrices. Linear algebra is the key.",
      missions: [
        {
          id: "np8-1", title: "The Dot of Power",
          story: "The vault's first lock measures how alike two spells are, and turns maps with a twist of a matrix.",
          lesson: `<ul><li>The <b>dot product</b> <code>a @ b</code> (or <code>np.dot(a, b)</code>) multiplies matching elements and adds them up: <code>[1, 2] @ [3, 4] = 1·3 + 2·4 = 11</code></li>
            <li><b>Matrix multiplication</b> <code>A @ B</code>: each result element is the dot product of a row of <code>A</code> with a column of <code>B</code>. Shapes must line up: <code>(m, n) @ (n, p)</code> → <code>(m, p)</code></li>
            <li><code>*</code> is element-wise multiplication. That is <b>not</b> matrix multiplication!</li>
            <li><code>np.linalg.norm(v)</code> → the length of a vector</li></ul>
            <p><b>Cosine similarity</b> <code>(a @ b) / (|a| · |b|)</code> measures how similar two directions are (1 = same, 0 = unrelated, −1 = opposite). Search engines and recommendation systems rely on it.</p>`,
          example: d`
            import numpy as np

            a, b = np.array([1, 2]), np.array([3, 4])
            print(a @ b, a * b, np.linalg.norm(b))
            A = np.array([[1, 2], [3, 4]])
            print(A @ np.array([1, 0]))       # first column
            orders = np.array([[2, 1, 0], [0, 3, 1]])   # 2 customers, 3 items
            prices = np.array([5.0, 2.0, 10.0])
            print(orders @ prices)            # each customer's bill`,
          task: `Write, <b>without loops</b>:<br>• <code>cosine_similarity(a, b)</code> → the cosine similarity of two vectors<br>
            • <code>rotation(theta)</code> → the 2 × 2 matrix <code>[[cos θ, −sin θ], [sin θ, cos θ]]</code><br>
            • <code>transform(points, M)</code> → every point (row of <code>points</code>, shape <code>(n, 2)</code>) multiplied by the matrix <code>M</code> (i.e. <code>M @ p</code> for each point)<br>
            • <code>bills(quantities, prices)</code> → each customer's total (<code>quantities</code>: customers × items)`,
          starter: d`
            import numpy as np

            def cosine_similarity(a, b):
                pass

            def rotation(theta):
                pass

            def transform(points, M):
                return points * M

            def bills(quantities, prices):
                pass
            `,
          solution: d`
            import numpy as np

            def cosine_similarity(a, b):
                return (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))

            def rotation(theta):
                c, s = np.cos(theta), np.sin(theta)
                return np.array([[c, -s], [s, c]])

            def transform(points, M):
                return points @ M.T

            def bills(quantities, prices):
                return quantities @ prices`,
          hints: ["cosine: (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))", "rotation: np.array([[c, -s], [s, c]]) with c = np.cos(theta), s = np.sin(theta)", "transform: with points as rows, M @ p for every p is points @ M.T", "bills: quantities @ prices"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            cs = expect_func("cosine_similarity"); ro = expect_func("rotation"); tf = expect_func("transform"); bl = expect_func("bills")
            expect_close(cs(np.array([1.0, 0]), np.array([0.0, 5])), 0.0, "cosine_similarity of perpendicular vectors")
            expect_close(cs(np.array([1.0, 2]), np.array([2.0, 4])), 1.0, "cosine_similarity of parallel vectors")
            expect_close(cs(np.array([1.0, 2, 3]), np.array([-1.0, 0, 1])), 2 / (np.sqrt(14) * np.sqrt(2)), "cosine_similarity([1 2 3], [-1 0 1])")
            expect_array(ro(np.pi / 2), [[0, -1], [1, 0]], "rotation(pi / 2)")
            expect_array(ro(0), [[1, 0], [0, 1]], "rotation(0)")
            pts = np.array([[1.0, 0], [0, 2], [3, 4]])
            expect_array(tf(pts, ro(np.pi / 2)), [[0, 1], [-2, 0], [-4, 3]], "transform(points, rotation(pi/2)) (a quarter turn)")
            M = np.array([[2.0, 1], [0, 3]])
            expect_array(tf(pts, M), np.array([M @ p for p in pts]), "transform(points, [[2 1] [0 3]])")
            expect_array(bl(np.array([[2, 1, 0], [0, 3, 1]]), np.array([5.0, 2, 10])), [12, 16], "bills(...)")` }],
        },
        {
          id: "np8-2", title: "Solve the Seals",
          story: "The second lock is a set of equations. Solve them all at once, and the bolts slide open.",
          lesson: `<p>A system of linear equations like <code>2x + y = 5</code>, <code>x − y = 1</code> is <code>A @ v = b</code> with <code>A = [[2, 1], [1, −1]]</code> and <code>b = [5, 1]</code>.</p>
            <ul><li><code>np.linalg.solve(A, b)</code> → the solution <code>v</code> (needs a square matrix with a solution)</li>
            <li><code>np.linalg.det(A)</code> → the determinant; (almost) 0 means there's no unique solution</li>
            <li><code>np.linalg.lstsq(X, y, rcond=None)[0]</code> → the <b>best fit</b> when there are more equations than unknowns. This is <b>linear regression</b>!</li></ul>
            <p>To fit a line <code>y ≈ m·x + c</code>, make a table with columns <code>[x, 1]</code> and solve for <code>[m, c]</code> with least squares.</p>`,
          example: d`
            import numpy as np

            A = np.array([[2.0, 1], [1, -1]])
            print(np.linalg.solve(A, np.array([5.0, 1])), np.linalg.det(A))
            x = np.array([0.0, 1, 2, 3])
            y = np.array([1.1, 2.9, 5.2, 6.8])
            X = np.column_stack([x, np.ones_like(x)])
            print(np.linalg.lstsq(X, y, rcond=None)[0])   # slope, intercept`,
          task: `Write, <b>without loops</b>:<br>• <code>solve_system(A, b)</code> → the solution of <code>A @ v = b</code><br>
            • <code>is_invertible(A)</code> → <code>True</code> if the absolute value of the determinant is above <code>1e-9</code><br>
            • <code>fit_line(x, y)</code> → a tuple <code>(slope, intercept)</code> of the least-squares line, as floats<br>
            • <code>predict_line(x, slope, intercept)</code> → the predicted <code>y</code> for every <code>x</code>`,
          starter: d`
            import numpy as np

            def solve_system(A, b):
                pass

            def is_invertible(A):
                pass

            def fit_line(x, y):
                pass

            def predict_line(x, slope, intercept):
                pass
            `,
          solution: d`
            import numpy as np

            def solve_system(A, b):
                return np.linalg.solve(A, b)

            def is_invertible(A):
                return bool(abs(np.linalg.det(A)) > 1e-9)

            def fit_line(x, y):
                X = np.column_stack([x, np.ones_like(x, dtype=float)])
                slope, intercept = np.linalg.lstsq(X, y, rcond=None)[0]
                return float(slope), float(intercept)

            def predict_line(x, slope, intercept):
                return slope * x + intercept`,
          hints: ["np.linalg.solve(A, b)", "is_invertible: abs(np.linalg.det(A)) > 1e-9", "fit_line: X = np.column_stack([x, np.ones_like(x, dtype=float)]); np.linalg.lstsq(X, y, rcond=None)[0]", "predict_line: slope * x + intercept"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            ss = expect_func("solve_system"); ii = expect_func("is_invertible"); fl = expect_func("fit_line"); pl = expect_func("predict_line")
            expect_array(ss(np.array([[2.0, 1], [1, -1]]), np.array([5.0, 1])), [2, 1], "solve_system for 2x + y = 5, x - y = 1")
            A3 = np.array([[3.0, 2, -1], [2, -2, 4], [-1, 0.5, -1]])
            expect_array(ss(A3, np.array([1.0, -2, 0])), [1, -2, -2], "solve_system (3 equations)")
            expect_equal(ii(np.array([[1.0, 2], [3, 4]])), True, "is_invertible([[1 2] [3 4]])")
            expect_equal(ii(np.array([[1.0, 2], [2, 4]])), False, "is_invertible([[1 2] [2 4]]) (rows are multiples)")
            x = np.array([0.0, 1, 2, 3, 4])
            r = fl(x, 3 * x - 2)
            expect_close(r, (3.0, -2.0), "fit_line on points exactly on y = 3x - 2")
            y = np.array([1.1, 2.9, 5.2, 6.8, 9.1])
            m, c = np.polyfit(x, y, 1)
            expect_close(fl(x, y), (m, c), "fit_line on noisy points")
            expect_array(pl(np.array([0.0, 10]), 2, 1), [1, 21], "predict_line([0 10], 2, 1)")` }],
        },
        {
          id: "np8-3", title: "Dice of Fate",
          story: "The third lock is ruled by chance. But Gauss knows a secret: chance you can repeat is chance you can test.",
          lesson: `<p>Modern NumPy makes random numbers with a <b>generator</b>: <code>rng = np.random.default_rng(seed)</code>. The same seed always gives the same numbers, so results can be reproduced.</p>
            <ul><li><code>rng.integers(low, high, size=n)</code> → whole numbers from <code>low</code> up to <b>but not including</b> <code>high</code></li>
            <li><code>rng.random(size)</code> → floats in [0, 1); <code>rng.normal(mean, std, size)</code> → bell-curve values</li>
            <li><code>rng.permutation(n)</code> → the numbers 0…n−1 in random order (handy for shuffling rows)</li>
            <li><code>rng.choice(a, size, replace=True)</code> → random picks from <code>a</code></li></ul>
            <p><b>Simulation</b> (the Monte Carlo method) answers questions by trying something many times at random, e.g. estimating π by throwing random points at a square and counting how many land inside the quarter circle.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(42)
            print(rng.integers(1, 7, size=10))
            print(np.random.default_rng(42).integers(1, 7, size=10))   # same seed, same rolls
            print(rng.permutation(5), rng.random(3).round(3))
            pts = np.random.default_rng(0).random((10000, 2))
            print(4 * ((pts ** 2).sum(axis=1) <= 1).mean())`,
          task: `Each function makes its own <code>rng = np.random.default_rng(seed)</code> and uses <b>exactly</b> the calls named here (so results can be checked):<br>
            • <code>roll_dice(n, seed)</code> → <code>n</code> rolls of a six-sided die, with <code>rng.integers(1, 7, size=n)</code><br>
            • <code>estimate_pi(n, seed)</code> → draw <code>rng.random((n, 2))</code>; return 4 × the fraction of points with x² + y² ≤ 1<br>
            • <code>shuffle_split(X, test_frac, seed)</code> → <code>idx = rng.permutation(len(X))</code>, <code>k = round(len(X) * test_frac)</code>; return <code>(X[idx[k:]], X[idx[:k]])</code> (train, test)<br>
            • <code>bootstrap_means(a, n_samples, seed)</code> → <code>rng.choice(a, size=(n_samples, len(a)), replace=True)</code>, then the mean of each row`,
          starter: d`
            import numpy as np

            def roll_dice(n, seed):
                rng = np.random.default_rng(seed)
                return rng.integers(1, 6, size=n)

            def estimate_pi(n, seed):
                pass

            def shuffle_split(X, test_frac, seed):
                pass

            def bootstrap_means(a, n_samples, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def roll_dice(n, seed):
                rng = np.random.default_rng(seed)
                return rng.integers(1, 7, size=n)

            def estimate_pi(n, seed):
                rng = np.random.default_rng(seed)
                p = rng.random((n, 2))
                return float(4 * ((p ** 2).sum(axis=1) <= 1).mean())

            def shuffle_split(X, test_frac, seed):
                rng = np.random.default_rng(seed)
                idx = rng.permutation(len(X))
                k = round(len(X) * test_frac)
                return X[idx[k:]], X[idx[:k]]

            def bootstrap_means(a, n_samples, seed):
                rng = np.random.default_rng(seed)
                return rng.choice(a, size=(n_samples, len(a)), replace=True).mean(axis=1)`,
          hints: ["integers(1, 7) gives 1–6: the high end is excluded.", "estimate_pi: inside = (p ** 2).sum(axis=1) <= 1; return 4 * inside.mean()", "shuffle_split: X[idx[k:]] is the training part, X[idx[:k]] the test part", "bootstrap: rng.choice(a, size=(n_samples, len(a)), replace=True).mean(axis=1)"],
          tests: [{ code: d`
            import numpy as np
            must_not_use("for", "while", "listcomp")
            rd = expect_func("roll_dice"); ep = expect_func("estimate_pi"); sp = expect_func("shuffle_split"); bm = expect_func("bootstrap_means")
            r = rd(600, 1)
            expect_array(r, np.random.default_rng(1).integers(1, 7, size=600), "roll_dice(600, seed 1)")
            assert r.min() == 1 and r.max() == 6, "Dice rolls must go from 1 to 6."
            expect_array(rd(5, 9), np.random.default_rng(9).integers(1, 7, size=5), "roll_dice(5, seed 9)")
            p = np.random.default_rng(0).random((20000, 2))
            expect_close(ep(20000, 0), 4 * ((p ** 2).sum(1) <= 1).mean(), "estimate_pi(20000, seed 0)")
            assert abs(ep(20000, 0) - np.pi) < 0.05, "estimate_pi should be close to 3.14"
            X = np.arange(20).reshape(10, 2)
            tr, te = sp(X, 0.3, 5)
            idx = np.random.default_rng(5).permutation(10)
            expect_array(tr, X[idx[3:]], "train part of shuffle_split(X, 0.3, seed 5)")
            expect_array(te, X[idx[:3]], "test part of shuffle_split(X, 0.3, seed 5)")
            a = np.array([2.0, 4, 6, 8, 10])
            expect_array(bm(a, 4, 2), np.random.default_rng(2).choice(a, size=(4, 5), replace=True).mean(1), "bootstrap_means(a, 4, seed 2)")` }],
        },
        {
          id: "np8-4", type: "quiz", title: "Riddles of the Vault",
          story: "The vault door asks its final riddles in the language of matrices.",
          lesson: `<p><code>*</code> multiplies element by element; <code>@</code> is matrix multiplication. Matrix multiplication needs the inner sizes to match, and <code>A @ B</code> is usually different from <code>B @ A</code>. Same seed → same random numbers.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                A = np.array([[1, 2], [3, 4]])
                print(A * A)
                print(A @ A)`,
              choices: ["[[ 1  4]\n [ 9 16]]\n[[ 7 10]\n [15 22]]", "[[ 7 10]\n [15 22]]\n[[ 1  4]\n [ 9 16]]", "[[ 1  4]\n [ 9 16]]\n[[ 1  4]\n [ 9 16]]", "[[2 4]\n [6 8]]\n[[ 7 10]\n [15 22]]"], answer: 0,
              explain: "<code>*</code> squares each element. <code>@</code>: top-left is row (1, 2) · column (1, 3) = 1 + 6 = 7." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print((np.ones((2, 3)) @ np.ones(3)).shape)`,
              choices: ["(2,)", "(3,)", "(2, 3)", "(2, 1)"], answer: 0,
              explain: "(2, 3) @ (3,) → one dot product per row → shape (2,)." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import numpy as np
                print(np.ones((2, 3)) @ np.ones((2, 3)))`,
              choices: ["ValueError", "[[3. 3. 3.]\n [3. 3. 3.]]", "[[1. 1. 1.]\n [1. 1. 1.]]", "(2, 3)"], answer: 0,
              explain: "(2, 3) @ (2, 3): the inner sizes 3 and 2 don't match. Use <code>B.T</code> to get (2, 3) @ (3, 2)." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                r1 = np.random.default_rng(5).integers(0, 100, 3)
                r2 = np.random.default_rng(5).integers(0, 100, 3)
                print((r1 == r2).all())`,
              choices: ["True", "False", "It depends on the computer", "Error"], answer: 0,
              explain: "Two generators with the same seed produce exactly the same sequence." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.random.default_rng(0).integers(1, 6, size=1000).max())`,
              choices: ["5", "6", "1000", "It's random"], answer: 0,
              explain: "The high end is <b>excluded</b>: <code>integers(1, 6)</code> never gives 6. Use <code>integers(1, 7)</code> for a die." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(np.linalg.inv(np.array([[2.0, 0], [0, 4]])))`,
              choices: ["[[0.5  0.  ]\n [0.   0.25]]", "[[-2. -0.]\n [-0. -4.]]", "[[4. 0.]\n [0. 2.]]", "[[0.25 0.  ]\n [0.   0.5 ]]"], answer: 0,
              explain: "The inverse of a diagonal matrix just inverts each diagonal number: 1/2 and 1/4." },
          ],
        },
        {
          id: "np8-5", boss: true, time: 1080, title: "King Gauss's Forecast",
          story: "The last seal. King Gauss left a riddle: \"Predict the harvest from the rain and the sun, and I shall be free.\"",
          lesson: `<p><b>Linear regression</b> predicts a number from features: <code>y ≈ b0 + b1·x1 + b2·x2 + …</code></p>
            <ul><li>Add a column of 1s to the features (for <code>b0</code>, the intercept), then least squares finds all the <code>b</code>s at once</li>
            <li>Predictions: <code>X_with_ones @ coef</code></li>
            <li><b>R²</b> = 1 − (sum of squared errors) / (sum of squared differences from the mean of y). 1 is perfect; 0 is no better than always guessing the mean</li></ul>
            <p><b>Gradient descent</b> finds the same line another way: start with any slope and intercept, and repeatedly nudge them against the gradient of the mean squared error:</p>
            <p><code>err = (m·x + c) − y</code>; <code>m -= lr · 2·mean(err·x)</code>; <code>c -= lr · 2·mean(err)</code></p>
            <p>This is the algorithm that trains neural networks. You'll use it again in the Machine Learning realm.</p>`,
          example: d`
            import numpy as np

            X = np.array([[1.0, 2], [2, 1], [3, 4]])
            print(np.column_stack([np.ones(len(X)), X]))
            x = np.array([0.0, 1, 2])
            y = np.array([1.0, 3, 5])
            m = c = 0.0
            for _ in range(2000):
                err = m * x + c - y
                m -= 0.05 * 2 * (err * x).mean()
                c -= 0.05 * 2 * err.mean()
            print(round(m, 3), round(c, 3))`,
          task: `Write:<br>• <code>add_intercept(X)</code> → <code>X</code> (1-D or 2-D) as a 2-D table with a column of 1s added at the <b>front</b><br>
            • <code>fit_linear(X, y)</code> → the coefficients <code>[b0, b1, …]</code> found by least squares on <code>add_intercept(X)</code><br>
            • <code>predict(coef, X)</code> → the predictions for <code>X</code><br>
            • <code>r2_score(y, y_pred)</code> → R² as a float<br>
            • <code>gradient_descent(x, y, lr=0.05, steps=3000)</code> → <code>(slope, intercept)</code> for one feature, starting from 0 and 0 and applying the update rule <code>steps</code> times (a loop over the steps is fine)`,
          starter: d`
            import numpy as np

            def add_intercept(X):
                pass

            def fit_linear(X, y):
                pass

            def predict(coef, X):
                pass

            def r2_score(y, y_pred):
                pass

            def gradient_descent(x, y, lr=0.05, steps=3000):
                m, c = 0.0, 0.0
                return m, c
            `,
          solution: d`
            import numpy as np

            def add_intercept(X):
                return np.column_stack([np.ones(len(X)), X])

            def fit_linear(X, y):
                return np.linalg.lstsq(add_intercept(X), y, rcond=None)[0]

            def predict(coef, X):
                return add_intercept(X) @ coef

            def r2_score(y, y_pred):
                ss_res = ((y - y_pred) ** 2).sum()
                ss_tot = ((y - y.mean()) ** 2).sum()
                return float(1 - ss_res / ss_tot)

            def gradient_descent(x, y, lr=0.05, steps=3000):
                m, c = 0.0, 0.0
                for _ in range(steps):
                    err = m * x + c - y
                    m -= lr * 2 * (err * x).mean()
                    c -= lr * 2 * err.mean()
                return float(m), float(c)`,
          hints: ["add_intercept: np.column_stack([np.ones(len(X)), X]) works for 1-D and 2-D X", "fit_linear: np.linalg.lstsq(add_intercept(X), y, rcond=None)[0]", "r2: 1 - ((y - y_pred) ** 2).sum() / ((y - y.mean()) ** 2).sum()", "gradient_descent: in each step compute err = m * x + c - y, then update m and c"],
          tests: [{ code: d`
            import numpy as np
            ai = expect_func("add_intercept"); fl = expect_func("fit_linear"); pr = expect_func("predict"); r2 = expect_func("r2_score"); gd = expect_func("gradient_descent")
            expect_array(ai(np.array([5.0, 6])), [[1, 5], [1, 6]], "add_intercept([5 6])")
            expect_array(ai(np.array([[2.0, 3], [4, 5]])), [[1, 2, 3], [1, 4, 5]], "add_intercept([[2 3] [4 5]])")
            rng = np.random.default_rng(11)
            rain = rng.uniform(0, 10, 60); sun = rng.uniform(0, 12, 60)
            X = np.column_stack([rain, sun])
            harvest = 4 + 2.5 * rain + 1.2 * sun + rng.normal(0, 0.5, 60)
            ref = np.linalg.lstsq(np.column_stack([np.ones(60), X]), harvest, rcond=None)[0]
            coef = fl(X, harvest)
            expect_array(np.asarray(coef), ref, "fit_linear(rain & sun, harvest)")
            expect_close(list(np.asarray(coef)), [4, 2.5, 1.2], "fit_linear should recover roughly b0=4, b1=2.5, b2=1.2", tol=0.15)
            expect_array(pr(ref, X[:3]), np.column_stack([np.ones(3), X[:3]]) @ ref, "predict(coef, first 3 rows)")
            y = np.array([3.0, 5, 7, 9])
            expect_close(r2(y, y), 1.0, "r2_score of perfect predictions")
            expect_close(r2(y, np.full(4, y.mean())), 0.0, "r2_score when always predicting the mean")
            expect_close(r2(y, np.array([2.0, 5, 8, 9])), 1 - 2 / 20, "r2_score([3 5 7 9], [2 5 8 9])")
            x = np.linspace(0, 1, 20)
            yy = 3 * x + 0.5 + np.random.default_rng(4).normal(0, 0.05, 20)
            m, c = np.polyfit(x, yy, 1)
            expect_close(gd(x, yy), (m, c), "gradient_descent(x, y) should approach the least-squares line", tol=1e-3)
            expect_close(gd(np.array([0.0, 1]), np.array([1.0, 3]), lr=0.1, steps=1), (0.3, 0.4), "one gradient step from (0, 0) on points (0,1), (1,3) with lr=0.1")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "numpy", name: "NumPy", realm: "The Iron Citadel", tower: "The Citadel of Arrays",
    ruler: "King Gauss", rulerIcon: "🤴", icon: "🧮", color: "#7aa7ff", requires: ["python"],
    packages: ["numpy"], runMs: 10000, submitMs: 15000,
    blurb: "Fast arrays and the maths under all of data science: vectorization, broadcasting, masks and linear algebra.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
