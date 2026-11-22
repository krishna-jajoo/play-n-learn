// The Statistics empire: the Oracle's Realm. Oracle Laplace waits at the top of the Temple of Chance.
// Most floors compute statistics by hand with NumPy; the hypothesis-testing floors also load SciPy (mission.packages).
(function (root) {
  const { d } = root.QUEST;
  const SCIPY = ["scipy"];

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The Centre and the Spread", topic: "mean, median, mode, variance, std, quartiles & z-scores", time: 480, icon: "⚖️",
      intro: "Before the Oracle reveals anything, you must learn to describe data: where its centre lies, and how widely it spreads.",
      missions: [
        {
          id: "st1-1", title: "The Typical Value",
          story: "The Oracle asks: what is a typical hero's gold? There are three honest answers.",
          lesson: `<p>Three ways to describe the <b>centre</b> of data:</p>
            <ul><li><b>Mean</b> (average): the sum divided by the count</li>
            <li><b>Median</b>: the middle value after sorting (with an even count, the mean of the two middle values). Outliers barely move it</li>
            <li><b>Mode</b>: the most frequent value</li></ul>
            <p>Libraries compute these for you, but writing them once yourself is the best way to understand what they mean.</p>`,
          example: d`
            data = [3, 7, 7, 2, 9]
            s = sorted(data)
            print("sorted:", s)
            print("mean:", sum(data) / len(data))
            print("median:", s[len(s) // 2])
            print("counts:", {x: data.count(x) for x in set(data)})`,
          task: `Write, <b>without</b> NumPy or the <code>statistics</code> module (no <code>mean</code>, <code>median</code>, <code>mode</code> functions):<br>
            • <code>mean(xs)</code> → the average<br>• <code>median(xs)</code> → the middle value (the mean of the two middle values for an even count)<br>
            • <code>mode(xs)</code> → the most frequent value (the smallest one on a tie)`,
          starter: d`
            def mean(xs):
                pass

            def median(xs):
                pass

            def mode(xs):
                pass
            `,
          solution: d`
            def mean(xs):
                return sum(xs) / len(xs)

            def median(xs):
                s = sorted(xs)
                n = len(s)
                mid = n // 2
                return s[mid] if n % 2 == 1 else (s[mid - 1] + s[mid]) / 2

            def mode(xs):
                counts = {}
                for x in xs:
                    counts[x] = counts.get(x, 0) + 1
                best = max(counts.values())
                return min(x for x, c in counts.items() if c == best)`,
          hints: ["mean: sum(xs) / len(xs)", "median: sort, then n // 2 is the middle index; for an even n average s[mid - 1] and s[mid]", "mode: count with a dict, find the highest count, return the smallest value with that count"],
          tests: [{ code: d`
            assert "statistics" not in __code__ and "numpy" not in __code__, "Write these yourself, without numpy or the statistics module."
            mean = expect_func("mean"); median = expect_func("median"); mode = expect_func("mode")
            expect_close(mean([3, 7, 7, 2, 9]), 5.6, "mean([3, 7, 7, 2, 9])")
            expect_close(mean([-1, 1]), 0.0, "mean([-1, 1])")
            expect_close(median([3, 7, 7, 2, 9]), 7, "median([3, 7, 7, 2, 9])")
            expect_close(median([4, 1, 3, 2]), 2.5, "median([4, 1, 3, 2])")
            expect_close(median([10]), 10, "median([10])")
            expect_equal(mode([3, 7, 7, 2, 9]), 7, "mode([3, 7, 7, 2, 9])")
            expect_equal(mode([5, 1, 5, 1, 3]), 1, "mode([5, 1, 5, 1, 3]) (tie: the smallest)")
            data = [12, 15, 11, 18, 21, 15, 300]
            expect_close(mean(data), sum(data) / 7, "mean with an outlier")
            expect_close(median(data), 15, "median with an outlier (barely moves)")` }],
        },
        {
          id: "st1-2", title: "How Spread Out?",
          story: "Two villages have the same average height, but one has giants and dwarves. The average alone hides this.",
          lesson: `<p>The <b>spread</b> says how far values wander from the centre:</p>
            <ul><li><b>Range</b> = max − min (one extreme value changes it a lot)</li>
            <li><b>Variance</b> = the average squared distance from the mean: <code>Σ(x − mean)² / n</code></li>
            <li><b>Standard deviation</b> (std) = √variance, in the same units as the data</li></ul>
            <p><b>Population vs sample:</b> if your data is only a <i>sample</i> of a bigger population, divide by <code>n − 1</code> instead of <code>n</code> (Bessel's correction). A sample's spread tends to underestimate the population's, and this corrects it. NumPy's <code>np.std</code> uses <code>n</code> by default; pass <code>ddof=1</code> for <code>n − 1</code>.</p>`,
          example: d`
            import numpy as np

            a = np.array([2, 4, 4, 4, 5, 5, 7, 9])
            dev = a - a.mean()
            print(dev)
            print((dev ** 2).sum() / len(a), np.var(a))
            print((dev ** 2).sum() / (len(a) - 1), np.var(a, ddof=1))
            print(np.std(a), np.std(a, ddof=1))`,
          task: `Write (any tools allowed, but understand the formulas):<br>• <code>data_range(xs)</code> → max − min<br>
            • <code>variance(xs, sample=False)</code> → divide by <code>n</code>, or by <code>n − 1</code> when <code>sample=True</code><br>
            • <code>std(xs, sample=False)</code> → the square root of that variance`,
          starter: d`
            import numpy as np

            def data_range(xs):
                pass

            def variance(xs, sample=False):
                pass

            def std(xs, sample=False):
                pass
            `,
          solution: d`
            import numpy as np

            def data_range(xs):
                return max(xs) - min(xs)

            def variance(xs, sample=False):
                xs = np.asarray(xs, dtype=float)
                n = len(xs) - 1 if sample else len(xs)
                return float(((xs - xs.mean()) ** 2).sum() / n)

            def std(xs, sample=False):
                return variance(xs, sample) ** 0.5`,
          hints: ["Deviations: x - mean for every value; square them and add up", "Divide by n, or by n - 1 when sample=True", "std is the square root of the variance"],
          tests: [{ code: d`
            import numpy as np
            dr = expect_func("data_range"); va = expect_func("variance"); sd = expect_func("std")
            a = [2, 4, 4, 4, 5, 5, 7, 9]
            expect_close(dr(a), 7, "data_range(a)")
            expect_close(va(a), 4.0, "variance(a)")
            expect_close(va(a, sample=True), 32 / 7, "variance(a, sample=True)")
            expect_close(sd(a), 2.0, "std(a)")
            expect_close(sd(a, sample=True), (32 / 7) ** 0.5, "std(a, sample=True)")
            b = np.random.default_rng(5).normal(50, 8, 40)
            expect_close(sd(b, True), np.std(b, ddof=1), "std of a random sample (sample=True)")
            expect_close(va([7, 7, 7]), 0.0, "variance of identical values")` }],
        },
        {
          id: "st1-3", title: "Quartiles and Outliers",
          story: "The Oracle's scribes describe any dataset with five numbers, and flag the values that don't belong.",
          lesson: `<p>The <b>five-number summary</b>: minimum, Q1 (25th percentile), median, Q3 (75th percentile), maximum. It's what a box plot draws.</p>
            <p>The <b>interquartile range</b> IQR = Q3 − Q1 is the spread of the middle half. <b>Tukey's rule</b> calls a value an outlier if it's below <code>Q1 − 1.5·IQR</code> or above <code>Q3 + 1.5·IQR</code>. Unlike z-scores, this isn't fooled by the outliers themselves.</p>
            <p><code>np.percentile(a, [25, 50, 75])</code> computes quartiles.</p>`,
          example: d`
            import numpy as np

            a = np.array([12, 15, 11, 18, 21, 15, 14, 60])
            q1, med, q3 = np.percentile(a, [25, 50, 75])
            iqr = q3 - q1
            print(q1, med, q3, iqr)
            print("fences:", q1 - 1.5 * iqr, q3 + 1.5 * iqr)
            print(a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)])`,
          task: `Write:<br>• <code>five_numbers(a)</code> → a tuple <code>(min, q1, median, q3, max)</code> of floats<br>
            • <code>tukey_outliers(a)</code> → an array of the values outside the Tukey fences, in their original order<br>
            • <code>zscore(a, x)</code> → how many (population) standard deviations <code>x</code> is from the mean of <code>a</code>`,
          starter: d`
            import numpy as np

            def five_numbers(a):
                pass

            def tukey_outliers(a):
                pass

            def zscore(a, x):
                pass
            `,
          solution: d`
            import numpy as np

            def five_numbers(a):
                a = np.asarray(a, dtype=float)
                q1, med, q3 = np.percentile(a, [25, 50, 75])
                return (float(a.min()), float(q1), float(med), float(q3), float(a.max()))

            def tukey_outliers(a):
                a = np.asarray(a)
                q1, q3 = np.percentile(a, [25, 75])
                iqr = q3 - q1
                return a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)]

            def zscore(a, x):
                a = np.asarray(a, dtype=float)
                return float((x - a.mean()) / a.std())`,
          hints: ["np.percentile(a, [25, 50, 75]) gives q1, median and q3", "Fences: q1 - 1.5 * iqr and q3 + 1.5 * iqr", "zscore: (x - a.mean()) / a.std()"],
          tests: [{ code: d`
            import numpy as np
            fn = expect_func("five_numbers"); to = expect_func("tukey_outliers"); zs = expect_func("zscore")
            a = np.array([12, 15, 11, 18, 21, 15, 14, 60])
            q = np.percentile(a, [25, 50, 75])
            expect_close(fn(a), (11.0, q[0], q[1], q[2], 60.0), "five_numbers(a)")
            expect_array(np.asarray(to(a)), [60], "tukey_outliers(a)")
            b = np.array([-50, 1, 2, 3, 4, 5, 6, 7, 99])
            expect_array(np.asarray(to(b)), [-50, 99], "tukey_outliers with outliers on both sides")
            expect_array(np.asarray(to(np.arange(10))), np.array([], dtype=int), "tukey_outliers with none")
            expect_close(zs([2, 4, 4, 4, 5, 5, 7, 9], 9), 2.0, "zscore([2 4 4 4 5 5 7 9], 9)")` }],
        },
        {
          id: "st1-4", type: "quiz", title: "Riddles of the Centre",
          story: "The Oracle's first riddles: which measure tells the truth, and which is fooled?",
          lesson: `<p>The mean is pulled by extreme values; the median isn't. Adding a constant to every value moves the centre but not the spread; multiplying every value scales the spread by the same factor.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([1, 2, 3, 4, 100])
                print(a.mean(), np.median(a))`,
              choices: ["22.0 3.0", "3.0 22.0", "22.0 22.0", "20.0 3.0"], answer: 0,
              explain: "One extreme value drags the mean to 22, while the median stays at the middle value, 3." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = [2, 4, 4, 4, 5, 5, 7, 9]
                print(np.std(a), round(np.std(a, ddof=1), 3))`,
              choices: ["2.0 2.138", "2.138 2.0", "2.0 2.0", "4.0 4.571"], answer: 0,
              explain: "Dividing by n − 1 instead of n makes the sample estimate a little larger." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a = np.array([3.0, 5, 7])
                print(np.std(a + 10) == np.std(a), np.std(a * 2) / np.std(a))`,
              choices: ["True 2.0", "False 2.0", "True 4.0", "False 1.0"], answer: 0,
              explain: "Shifting all values doesn't change their spread; doubling them doubles it (and quadruples the variance)." },
            { q: "A few billionaires move into a small town. Which changes the most?",
              choices: ["the mean income", "the median income", "both by the same amount", "neither"], answer: 0,
              explain: "The mean jumps; the median (the middle person) barely moves. That's why reports usually quote <i>median</i> income." },
            { q: "Your data is a sample of 50 customers from a city of 2 million. Which variance formula should you use?",
              choices: ["divide by n − 1 (sample)", "divide by n (population)", "divide by 2 million", "it makes no difference at all"], answer: 0,
              explain: "Estimating a population's spread from a sample: use n − 1 (<code>ddof=1</code>)." },
          ],
        },
        {
          id: "st1-5", boss: true, time: 720, title: "The Census of Heights",
          story: "The Oracle's census lists the heights of a whole village. Describe it completely, and say whether it leans to one side.",
          lesson: `<p>A full description combines the centre, the spread, the quartiles and the <b>shape</b>.</p>
            <p><b>Skew</b>: when a long tail stretches to the right (a few very large values), the mean is pulled above the median: <b>right-skewed</b>. Left-skewed is the opposite. In a symmetric distribution they're close.</p>`,
          example: d`
            import numpy as np

            incomes = np.array([20, 22, 25, 27, 30, 31, 35, 90, 150])
            print(incomes.mean(), np.median(incomes))   # mean far above the median: right skew`,
          task: `Write <code>describe(a)</code> returning a dict with: <code>"n"</code>, <code>"mean"</code>, <code>"median"</code>, <code>"std"</code> (sample, <code>ddof=1</code>), <code>"min"</code>, <code>"max"</code>, <code>"q1"</code>, <code>"q3"</code>, <code>"iqr"</code>, <code>"outliers"</code> (a list of the Tukey outliers, in original order) and <code>"skew"</code>:<br>
            <code>"right"</code> if mean &gt; median + 0.1 × std, <code>"left"</code> if mean &lt; median − 0.1 × std, otherwise <code>"symmetric"</code>.`,
          starter: d`
            import numpy as np

            def describe(a):
                a = np.asarray(a, dtype=float)
                return {"n": len(a), "mean": a.mean()}
            `,
          solution: d`
            import numpy as np

            def describe(a):
                a = np.asarray(a, dtype=float)
                q1, med, q3 = np.percentile(a, [25, 50, 75])
                iqr = q3 - q1
                mean, sd = a.mean(), a.std(ddof=1)
                outliers = a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)]
                skew = "right" if mean > med + 0.1 * sd else "left" if mean < med - 0.1 * sd else "symmetric"
                return {"n": len(a), "mean": float(mean), "median": float(med), "std": float(sd),
                        "min": float(a.min()), "max": float(a.max()), "q1": float(q1), "q3": float(q3),
                        "iqr": float(iqr), "outliers": outliers.tolist(), "skew": skew}`,
          hints: ["q1, med, q3 = np.percentile(a, [25, 50, 75])", "std with ddof=1", "outliers: Tukey fences, then .tolist()", "skew: compare the mean with median ± 0.1 × std"],
          tests: [{ code: d`
            import numpy as np
            de = expect_func("describe")
            def ref(a):
                a = np.asarray(a, dtype=float)
                q1, med, q3 = np.percentile(a, [25, 50, 75]); iqr = q3 - q1; m, s = a.mean(), a.std(ddof=1)
                return {"n": len(a), "mean": m, "median": med, "std": s, "min": a.min(), "max": a.max(), "q1": q1, "q3": q3, "iqr": iqr,
                        "outliers": a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)].tolist(),
                        "skew": "right" if m > med + 0.1 * s else "left" if m < med - 0.1 * s else "symmetric"}
            rng = np.random.default_rng(1)
            for label, data in [("village heights", rng.normal(170, 8, 60).round(1)),
                                ("incomes (right-skewed)", np.concatenate([rng.normal(30, 4, 40), [95, 120, 150]]).round(1)),
                                ("exam scores (left-skewed)", np.concatenate([rng.normal(85, 4, 40), [20, 35, 41]]).round(1))]:
                got, want = de(data), ref(data)
                for k in ("n", "outliers", "skew"):
                    expect_equal(got.get(k), want[k], label + ": " + k)
                expect_close({k: got.get(k) for k in ("mean", "median", "std", "min", "max", "q1", "q3", "iqr")},
                             {k: want[k] for k in ("mean", "median", "std", "min", "max", "q1", "q3", "iqr")}, label + ": numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Laws of Chance", topic: "probability, counting, simulation, conditional probability & expected value", time: 480, icon: "🎲",
      intro: "In the Temple of Chance, every outcome has its probability. Count them, simulate them, and learn how one event changes another.",
      missions: [
        {
          id: "st2-1", title: "Count the Ways",
          story: "The temple's dice priests ask: how likely is each throw? Count the ways, and you'll know.",
          lesson: `<p>When all outcomes are equally likely: <b>P(event) = favourable outcomes ÷ all outcomes</b>.</p>
            <ul><li>Two dice have 6 × 6 = 36 outcomes; a sum of 7 happens in 6 of them → 6/36</li>
            <li>The <b>complement</b>: P(at least one six in n throws) = 1 − P(no six) = 1 − (5/6)ⁿ</li>
            <li><code>math.comb(n, k)</code> → the number of ways to choose k items from n</li></ul>
            <p>The <b>birthday problem</b>: P(at least two of n people share a birthday) = 1 − (365/365 × 364/365 × … × (365−n+1)/365). With just 23 people it's over 50%!</p>`,
          example: d`
            from math import comb

            outcomes = [(a, b) for a in range(1, 7) for b in range(1, 7)]
            print(len(outcomes), sum(1 for a, b in outcomes if a + b == 7) / 36)
            print(1 - (5 / 6) ** 4)
            print(comb(5, 2), "ways to pick 2 of 5")`,
          task: `Write (exact probabilities, as floats):<br>• <code>p_dice_sum(s)</code> → the probability that two fair dice add up to <code>s</code><br>
            • <code>p_at_least_one_six(n)</code> → the probability of at least one six in <code>n</code> throws<br>
            • <code>p_shared_birthday(n)</code> → the probability that at least two of <code>n</code> people share a birthday (365 days, all equally likely)`,
          starter: d`
            from math import comb

            def p_dice_sum(s):
                pass

            def p_at_least_one_six(n):
                return n / 6

            def p_shared_birthday(n):
                pass
            `,
          solution: d`
            from math import comb

            def p_dice_sum(s):
                ways = sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == s)
                return ways / 36

            def p_at_least_one_six(n):
                return 1 - (5 / 6) ** n

            def p_shared_birthday(n):
                p_all_different = 1.0
                for i in range(n):
                    p_all_different *= (365 - i) / 365
                return 1 - p_all_different`,
          hints: ["p_dice_sum: count the (a, b) pairs with a + b == s, divide by 36", "At least one = 1 - none: 1 - (5/6) ** n", "Birthdays: multiply (365 - i) / 365 for i in range(n), then 1 minus that"],
          tests: [{ code: d`
            ds = expect_func("p_dice_sum"); s6 = expect_func("p_at_least_one_six"); bd = expect_func("p_shared_birthday")
            expect_close(ds(7), 6 / 36, "p_dice_sum(7)")
            expect_close(ds(2), 1 / 36, "p_dice_sum(2)")
            expect_close(ds(13), 0.0, "p_dice_sum(13)")
            expect_close(s6(1), 1 / 6, "p_at_least_one_six(1)")
            expect_close(s6(4), 1 - (5 / 6) ** 4, "p_at_least_one_six(4)")
            expect_close(bd(23), 0.5072972343239854, "p_shared_birthday(23)")
            expect_close(bd(1), 0.0, "p_shared_birthday(1)")
            expect_close(bd(366), 1.0, "p_shared_birthday(366)")` }],
        },
        {
          id: "st2-2", title: "Simulate the Dice",
          story: "Some questions are too tangled to count. The priests just throw the dice a hundred thousand times.",
          lesson: `<p><b>Monte Carlo simulation</b>: repeat a random experiment many times and count how often the event happens. The estimate gets closer to the true probability as the number of trials grows (the <b>law of large numbers</b>).</p>
            <p>With NumPy, simulate all trials at once: <code>rng.integers(1, 7, size=(n, 2))</code> is <code>n</code> throws of two dice, one row per throw. Using a <b>seed</b> makes the result reproducible.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(0)
            throws = rng.integers(1, 7, size=(100_000, 2))
            sums = throws.sum(axis=1)
            print((sums == 7).mean(), 6 / 36)
            bdays = rng.integers(0, 365, size=(20_000, 23))
            s = np.sort(bdays, axis=1)
            print((np.diff(s, axis=1) == 0).any(axis=1).mean())`,
          task: `Each function creates <code>rng = np.random.default_rng(seed)</code> and uses exactly the calls named here:<br>
            • <code>sim_dice_sum(s, n, seed)</code> → draw <code>rng.integers(1, 7, size=(n, 2))</code>; return the fraction of rows that add up to <code>s</code><br>
            • <code>sim_birthday(k, n, seed)</code> → draw <code>rng.integers(0, 365, size=(n, k))</code> (n groups of k people); return the fraction of groups with at least one shared birthday<br>
            • <code>running_estimate(n, seed)</code> → draw <code>rng.integers(1, 7, size=n)</code> (one die); return an array: after each throw, the fraction of sixes so far`,
          starter: d`
            import numpy as np

            def sim_dice_sum(s, n, seed):
                pass

            def sim_birthday(k, n, seed):
                pass

            def running_estimate(n, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def sim_dice_sum(s, n, seed):
                rng = np.random.default_rng(seed)
                throws = rng.integers(1, 7, size=(n, 2))
                return float((throws.sum(axis=1) == s).mean())

            def sim_birthday(k, n, seed):
                rng = np.random.default_rng(seed)
                b = np.sort(rng.integers(0, 365, size=(n, k)), axis=1)
                return float((np.diff(b, axis=1) == 0).any(axis=1).mean())

            def running_estimate(n, seed):
                rng = np.random.default_rng(seed)
                sixes = rng.integers(1, 7, size=n) == 6
                return np.cumsum(sixes) / np.arange(1, n + 1)`,
          hints: ["sim_dice_sum: (throws.sum(axis=1) == s).mean()", "sim_birthday: sort each row; a shared birthday makes two neighbours equal: np.diff(...) == 0", "running_estimate: np.cumsum(is_six) / np.arange(1, n + 1)"],
          tests: [{ code: d`
            import numpy as np
            sd = expect_func("sim_dice_sum"); sb = expect_func("sim_birthday"); re_ = expect_func("running_estimate")
            r = np.random.default_rng(3).integers(1, 7, size=(50000, 2)).sum(1)
            expect_close(sd(7, 50000, 3), (r == 7).mean(), "sim_dice_sum(7, 50000, seed 3)")
            assert abs(sd(7, 50000, 3) - 1 / 6) < 0.01, "With 50,000 throws the estimate should be close to 1/6."
            b = np.sort(np.random.default_rng(4).integers(0, 365, size=(5000, 23)), axis=1)
            expect_close(sb(23, 5000, 4), (np.diff(b, axis=1) == 0).any(axis=1).mean(), "sim_birthday(23, 5000, seed 4)")
            est = re_(10000, 8)
            ref = np.cumsum(np.random.default_rng(8).integers(1, 7, size=10000) == 6) / np.arange(1, 10001)
            expect_array(np.asarray(est), ref, "running_estimate(10000, seed 8)")
            assert abs(est[-1] - 1 / 6) < abs(est[9] - 1 / 6) or abs(est[-1] - 1 / 6) < 0.01, "The estimate should settle near 1/6."` }],
        },
        {
          id: "st2-3", title: "If This, Then That",
          story: "Do the temple's champions win more often in the rain? The priests' records hold the answer.",
          lesson: `<p><b>Conditional probability</b>: the probability of A <i>given</i> that B happened:</p>
            <p><code>P(A | B) = P(A and B) / P(B)</code>, or with counts: (count of A and B) ÷ (count of B).</p>
            <p>A and B are <b>independent</b> if knowing B doesn't change A: <code>P(A | B) = P(A)</code>. Then <code>P(A and B) = P(A) × P(B)</code>.</p>
            <p>The <b>expected value</b> of a random amount is the probability-weighted average: <code>Σ value × probability</code>.</p>`,
          example: d`
            import numpy as np

            # rows: sunny, rainy   columns: win, loss
            t = np.array([[30, 20],
                          [10, 40]])
            total = t.sum()
            p_win = t[:, 0].sum() / total
            p_win_rain = t[1, 0] / t[1].sum()
            print(p_win, p_win_rain)
            print(np.dot([10, 0, -5], [0.2, 0.5, 0.3]))   # expected value`,
          task: `<code>t</code> is a 2 × 2 array of counts: rows = weather (row 0 sunny, row 1 rainy), columns = result (column 0 win, column 1 loss). Write:<br>
            • <code>p_win(t)</code> → P(win)<br>• <code>p_win_given_rain(t)</code> → P(win | rainy)<br>
            • <code>independent(t, tol=0.01)</code> → <code>True</code> if |P(win | rainy) − P(win)| &lt; <code>tol</code><br>
            • <code>expected_value(values, probs)</code> → Σ value × probability`,
          starter: d`
            import numpy as np

            def p_win(t):
                pass

            def p_win_given_rain(t):
                return t[1, 0] / t.sum()

            def independent(t, tol=0.01):
                pass

            def expected_value(values, probs):
                pass
            `,
          solution: d`
            import numpy as np

            def p_win(t):
                return float(t[:, 0].sum() / t.sum())

            def p_win_given_rain(t):
                return float(t[1, 0] / t[1].sum())

            def independent(t, tol=0.01):
                return bool(abs(p_win_given_rain(t) - p_win(t)) < tol)

            def expected_value(values, probs):
                return float(np.dot(values, probs))`,
          hints: ["p_win: all wins (column 0) divided by the grand total", "Given rain: only look at row 1: t[1, 0] / t[1].sum()", "expected_value: np.dot(values, probs)"],
          tests: [{ code: d`
            import numpy as np
            pw = expect_func("p_win"); pr = expect_func("p_win_given_rain"); ind = expect_func("independent"); ev = expect_func("expected_value")
            t = np.array([[30, 20], [10, 40]])
            expect_close(pw(t), 0.4, "p_win(t)")
            expect_close(pr(t), 0.2, "p_win_given_rain(t)")
            expect_equal(ind(t), False, "independent(t)")
            u = np.array([[40, 60], [20, 30]])
            expect_equal(ind(u), True, "independent([[40 60] [20 30]])")
            expect_close(ev([10, 0, -5], [0.2, 0.5, 0.3]), 0.5, "expected_value([10, 0, -5], [0.2, 0.5, 0.3])")
            expect_close(ev(range(1, 7), [1 / 6] * 6), 3.5, "expected value of one die")` }],
        },
        {
          id: "st2-4", type: "quiz", title: "Riddles of Chance",
          story: "The temple's oldest riddles have tricked gamblers for centuries.",
          lesson: `<p>Independent events have no memory. "At least one" is easiest through the complement. P(A or B) = P(A) + P(B) − P(A and B), because the overlap would otherwise be counted twice.</p>`,
          questions: [
            { q: "A fair coin landed heads 5 times in a row. What's the probability the next flip is heads?",
              choices: ["0.5", "less than 0.5: tails is \"due\"", "more than 0.5: heads is \"hot\"", "1/64"], answer: 0,
              explain: "The coin has no memory. Believing otherwise is the <b>gambler's fallacy</b>." },
            { q: "What does this print?", predict: true, code: d`
                from math import comb
                print(comb(5, 2), comb(52, 5))`,
              choices: ["10 2598960", "20 311875200", "10 311875200", "25 2598960"], answer: 0,
              explain: "There are 10 ways to choose 2 of 5, and 2,598,960 possible 5-card poker hands." },
            { q: "P(A) = 0.5, P(B) = 0.4 and P(A and B) = 0.2. What is P(A or B)?",
              choices: ["0.7", "0.9", "0.2", "0.1"], answer: 0,
              explain: "0.5 + 0.4 − 0.2: subtract the overlap, which was counted twice." },
            { q: "What does this print?", predict: true, code: d`
                print(round(1 - (5 / 6) ** 4, 3))`,
              choices: ["0.518", "0.667", "0.482", "0.167"], answer: 0,
              explain: "The chance of at least one six in four throws is just over a half (this puzzled 17th-century gamblers)." },
            { q: "P(rain) = 0.3 and P(the carriage is late) = 0.2, and they're independent. What is P(rain and late)?",
              choices: ["0.06", "0.5", "0.1", "0.2"], answer: 0,
              explain: "For independent events, multiply: 0.3 × 0.2." },
          ],
        },
        {
          id: "st2-5", boss: true, time: 720, title: "The Gambler's Table",
          story: "A stranger offers a game at the temple gates. Should you play? Mathematics, not luck, will decide.",
          lesson: `<p>A game is worth playing (in the long run) when its <b>expected value</b> is positive. Its <b>variance</b> <code>Σ p·(x − EV)²</code> tells you how bumpy the ride is.</p>
            <p>Simulation checks the maths: <code>rng.choice(values, size=n, p=probs)</code> plays <code>n</code> rounds; the average winnings approach the expected value.</p>`,
          example: d`
            import numpy as np

            values, probs = np.array([100, -10]), np.array([0.05, 0.95])
            ev = np.dot(values, probs)
            print(ev)
            rng = np.random.default_rng(0)
            print(rng.choice(values, size=10_000, p=probs).mean())`,
          task: `A game pays <code>values[i]</code> with probability <code>probs[i]</code>. Write:<br>
            • <code>game_ev(values, probs)</code> → the expected value<br>• <code>game_var(values, probs)</code> → the variance Σ p·(x − EV)²<br>
            • <code>should_play(values, probs)</code> → <code>True</code> if the expected value is positive<br>
            • <code>simulate(values, probs, n, seed)</code> → with <code>rng = np.random.default_rng(seed)</code>, the mean of <code>rng.choice(values, size=n, p=probs)</code><br>
            • <code>rounds_to_lose(values, probs, budget)</code> → for a game with a <b>negative</b> expected value, about how many rounds until the expected loss equals <code>budget</code>: <code>budget ÷ |EV|</code>, rounded up (careful: float division can give 370.0000000004, which would round up to 371)`,
          starter: d`
            import numpy as np

            def game_ev(values, probs):
                return sum(values) / len(values)

            def game_var(values, probs):
                pass

            def should_play(values, probs):
                pass

            def simulate(values, probs, n, seed):
                pass

            def rounds_to_lose(values, probs, budget):
                pass
            `,
          solution: d`
            import numpy as np
            import math

            def game_ev(values, probs):
                return float(np.dot(values, probs))

            def game_var(values, probs):
                v, p = np.asarray(values, dtype=float), np.asarray(probs, dtype=float)
                return float((p * (v - game_ev(v, p)) ** 2).sum())

            def should_play(values, probs):
                return game_ev(values, probs) > 0

            def simulate(values, probs, n, seed):
                rng = np.random.default_rng(seed)
                return float(rng.choice(values, size=n, p=probs).mean())

            def rounds_to_lose(values, probs, budget):
                return math.ceil(round(budget / abs(game_ev(values, probs)), 9))  # round away float noise like 370.0000000004`,
          hints: ["EV: np.dot(values, probs) (not a plain average: outcomes have different probabilities)", "variance: (p * (v - ev) ** 2).sum()", "rounds_to_lose: math.ceil(budget / abs(ev)), but floats can give 370.0000000004: round(x, 9) first"],
          tests: [{ code: d`
            import numpy as np, math
            ge = expect_func("game_ev"); gv = expect_func("game_var"); sp = expect_func("should_play"); si = expect_func("simulate"); rl = expect_func("rounds_to_lose")
            v, p = [100, -10], [0.05, 0.95]
            expect_close(ge(v, p), -4.5, "game_ev(stranger's game)")
            expect_close(gv(v, p), 0.05 * 104.5 ** 2 + 0.95 * 5.5 ** 2, "game_var(stranger's game)")
            expect_equal(sp(v, p), False, "should_play(stranger's game)")
            expect_equal(sp([50, -1], [0.1, 0.9]), True, "should_play([50, -1], [0.1, 0.9])")
            expect_close(si(v, p, 20000, 2), np.random.default_rng(2).choice(v, size=20000, p=p).mean(), "simulate(..., 20000, seed 2)")
            expect_equal(rl(v, p, 100), 23, "rounds_to_lose(stranger's game, 100)")
            roulette = [35, -1]; pr = [1 / 37, 36 / 37]
            expect_close(ge(roulette, pr), -1 / 37, "EV of a single-number roulette bet")
            expect_equal(rl(roulette, pr, 10), 370, "rounds_to_lose(roulette, 10)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Shapes of Fate", topic: "binomial, normal & Poisson distributions", time: 540, icon: "🔔",
      intro: "Random outcomes follow patterns: the count of successes, the bell curve, the rare events. Learn their shapes and you can predict fate itself.",
      missions: [
        {
          id: "st3-1", title: "The Binomial Road",
          story: "An archer hits the target 70% of the time. In 10 shots, how likely is each number of hits?",
          lesson: `<p>The <b>binomial distribution</b> counts successes in <code>n</code> independent tries, each succeeding with probability <code>p</code>:</p>
            <p><code>P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ</code></p>
            <ul><li><code>C(n, k)</code> = <code>math.comb(n, k)</code>: the number of ways to place the k successes</li>
            <li>Mean = <code>n·p</code>; variance = <code>n·p·(1 − p)</code></li>
            <li>The <b>CDF</b> P(X ≤ k) adds up the probabilities from 0 to k</li></ul>`,
          example: d`
            from math import comb

            n, p = 10, 0.7
            for k in (5, 7, 10):
                print(k, round(comb(n, k) * p**k * (1 - p)**(n - k), 4))
            print("mean", n * p, "variance", n * p * (1 - p))`,
          task: `Write:<br>• <code>binom_pmf(k, n, p)</code> → P(X = k)<br>• <code>binom_cdf(k, n, p)</code> → P(X ≤ k)<br>
            • <code>at_least(k, n, p)</code> → P(X ≥ k)<br>• <code>binom_mean_var(n, p)</code> → a tuple (mean, variance)`,
          starter: d`
            from math import comb

            def binom_pmf(k, n, p):
                pass

            def binom_cdf(k, n, p):
                pass

            def at_least(k, n, p):
                return 1 - binom_cdf(k, n, p)

            def binom_mean_var(n, p):
                pass
            `,
          solution: d`
            from math import comb

            def binom_pmf(k, n, p):
                return comb(n, k) * p ** k * (1 - p) ** (n - k)

            def binom_cdf(k, n, p):
                return sum(binom_pmf(i, n, p) for i in range(0, k + 1))

            def at_least(k, n, p):
                return 1 - binom_cdf(k - 1, n, p)

            def binom_mean_var(n, p):
                return (n * p, n * p * (1 - p))`,
          hints: ["pmf: comb(n, k) * p ** k * (1 - p) ** (n - k)", "cdf: add the pmf for i in range(0, k + 1)", "At least k = 1 - P(X ≤ k - 1). The starter has an off-by-one bug!"],
          tests: [{ code: d`
            pm = expect_func("binom_pmf"); cd = expect_func("binom_cdf"); al = expect_func("at_least"); mv = expect_func("binom_mean_var")
            expect_close(pm(7, 10, 0.7), 0.26682793200000005, "binom_pmf(7, 10, 0.7)")
            expect_close(pm(0, 5, 0.5), 1 / 32, "binom_pmf(0, 5, 0.5)")
            expect_close(cd(2, 4, 0.5), 11 / 16, "binom_cdf(2, 4, 0.5)")
            expect_close(cd(10, 10, 0.3), 1.0, "binom_cdf(10, 10, 0.3)")
            expect_close(al(8, 10, 0.7), pm(8, 10, 0.7) + pm(9, 10, 0.7) + pm(10, 10, 0.7), "at_least(8, 10, 0.7)")
            expect_close(al(0, 6, 0.2), 1.0, "at_least(0, 6, 0.2)")
            expect_close(mv(10, 0.7), (7.0, 2.1), "binom_mean_var(10, 0.7)")` }],
        },
        {
          id: "st3-2", title: "The Bell Curve",
          story: "Heights, measurement errors, exam scores: so many things pile up into the same bell-shaped curve.",
          lesson: `<p>The <b>normal distribution</b> with mean μ and standard deviation σ has the density</p>
            <p><code>f(x) = e^(−(x−μ)² / (2σ²)) / (σ·√(2π))</code></p>
            <p>Probabilities are areas under the curve. The <b>CDF</b> (the area to the left of x) can be computed with the error function:</p>
            <p><code>Φ(x) = 0.5 · (1 + erf((x − μ) / (σ·√2)))</code> → <code>math.erf</code></p>
            <p>The <b>68–95–99.7 rule</b>: about 68% of values lie within 1σ of the mean, 95% within 2σ, 99.7% within 3σ.</p>`,
          example: d`
            import math

            def cdf(x, mu=0, sigma=1):
                return 0.5 * (1 + math.erf((x - mu) / (sigma * math.sqrt(2))))

            print(round(cdf(1.96), 4))
            print(round(cdf(1) - cdf(-1), 4), round(cdf(2) - cdf(-2), 4))`,
          task: `Write:<br>• <code>normal_pdf(x, mu, sigma)</code> → the density at <code>x</code><br>• <code>normal_cdf(x, mu, sigma)</code> → P(X ≤ x)<br>
            • <code>prob_between(a, b, mu, sigma)</code> → P(a ≤ X ≤ b)<br>
            • <code>share_taller(height, mu, sigma)</code> → the fraction of people taller than <code>height</code>`,
          starter: d`
            import math

            def normal_pdf(x, mu, sigma):
                pass

            def normal_cdf(x, mu, sigma):
                pass

            def prob_between(a, b, mu, sigma):
                pass

            def share_taller(height, mu, sigma):
                pass
            `,
          solution: d`
            import math

            def normal_pdf(x, mu, sigma):
                return math.exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (sigma * math.sqrt(2 * math.pi))

            def normal_cdf(x, mu, sigma):
                return 0.5 * (1 + math.erf((x - mu) / (sigma * math.sqrt(2))))

            def prob_between(a, b, mu, sigma):
                return normal_cdf(b, mu, sigma) - normal_cdf(a, mu, sigma)

            def share_taller(height, mu, sigma):
                return 1 - normal_cdf(height, mu, sigma)`,
          hints: ["pdf: math.exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (sigma * math.sqrt(2 * math.pi))", "cdf: 0.5 * (1 + math.erf((x - mu) / (sigma * math.sqrt(2))))", "between = cdf(b) - cdf(a); taller = 1 - cdf(height)"],
          tests: [{ code: d`
            import math
            pdf = expect_func("normal_pdf"); cdf = expect_func("normal_cdf"); pb = expect_func("prob_between"); st = expect_func("share_taller")
            expect_close(pdf(0, 0, 1), 1 / math.sqrt(2 * math.pi), "normal_pdf(0, 0, 1)")
            expect_close(pdf(180, 170, 10), math.exp(-0.5) / (10 * math.sqrt(2 * math.pi)), "normal_pdf(180, 170, 10)")
            expect_close(cdf(1.96, 0, 1), 0.9750021048517795, "normal_cdf(1.96, 0, 1)")
            expect_close(cdf(170, 170, 8), 0.5, "normal_cdf at the mean")
            expect_close(pb(-1, 1, 0, 1), 0.6826894921370859, "prob_between(-1, 1, 0, 1) (the 68% rule)")
            expect_close(pb(150, 190, 170, 10), 0.9544997361036416, "prob_between(150, 190, 170, 10) (within 2 sigma)")
            expect_close(st(190, 170, 10), 1 - cdf(190, 170, 10), "share_taller(190, 170, 10)")` }],
        },
        {
          id: "st3-3", title: "Rare Events",
          story: "Dragons are sighted about 2 times a month. How likely is a month with none? With five?",
          lesson: `<p>The <b>Poisson distribution</b> counts events that happen independently at an average rate λ per period: customers per hour, typos per page, sightings per month.</p>
            <p><code>P(X = k) = λᵏ · e^(−λ) / k!</code></p>
            <p>Its mean <b>and</b> its variance are both λ. <code>rng.poisson(lam, size)</code> simulates it.</p>`,
          example: d`
            import math
            import numpy as np

            lam = 2
            print([round(lam**k * math.exp(-lam) / math.factorial(k), 3) for k in range(6)])
            sims = np.random.default_rng(0).poisson(lam, 100_000)
            print(sims.mean(), sims.var())`,
          task: `Write:<br>• <code>poisson_pmf(k, lam)</code> → P(X = k)<br>• <code>poisson_at_least(k, lam)</code> → P(X ≥ k)<br>
            • <code>simulate_poisson(lam, n, seed)</code> → with <code>rng = np.random.default_rng(seed)</code> and <code>rng.poisson(lam, n)</code>, a dict <code>{"mean": …, "var": …}</code> of the simulated values (population variance)`,
          starter: d`
            import math
            import numpy as np

            def poisson_pmf(k, lam):
                pass

            def poisson_at_least(k, lam):
                pass

            def simulate_poisson(lam, n, seed):
                pass
            `,
          solution: d`
            import math
            import numpy as np

            def poisson_pmf(k, lam):
                return lam ** k * math.exp(-lam) / math.factorial(k)

            def poisson_at_least(k, lam):
                return 1 - sum(poisson_pmf(i, lam) for i in range(k))

            def simulate_poisson(lam, n, seed):
                x = np.random.default_rng(seed).poisson(lam, n)
                return {"mean": float(x.mean()), "var": float(x.var())}`,
          hints: ["pmf: lam ** k * math.exp(-lam) / math.factorial(k)", "At least k = 1 - P(0) - P(1) - … - P(k-1)", "simulate: x = rng.poisson(lam, n); x.mean(), x.var()"],
          tests: [{ code: d`
            import math, numpy as np
            pp = expect_func("poisson_pmf"); pa = expect_func("poisson_at_least"); sp = expect_func("simulate_poisson")
            expect_close(pp(0, 2), math.exp(-2), "poisson_pmf(0, 2)")
            expect_close(pp(5, 2), 32 * math.exp(-2) / 120, "poisson_pmf(5, 2)")
            expect_close(pa(1, 2), 1 - math.exp(-2), "poisson_at_least(1, 2)")
            expect_close(pa(0, 3.5), 1.0, "poisson_at_least(0, 3.5)")
            x = np.random.default_rng(6).poisson(4, 30000)
            r = sp(4, 30000, 6)
            expect_close([r.get("mean"), r.get("var")], [x.mean(), x.var()], "simulate_poisson(4, 30000, seed 6)")
            assert abs(r["mean"] - r["var"]) < 0.2, "For a Poisson distribution the mean and the variance should be about equal."` }],
        },
        {
          id: "st3-4", type: "quiz", title: "Riddles of the Shapes",
          story: "The temple's statues each hold a different curve. Match the curve to the question.",
          lesson: `<p>Binomial: number of successes in a fixed number of tries. Poisson: number of events in a period at a steady rate. Normal: continuous measurements made of many small effects.</p>`,
          questions: [
            { q: "The number of customers entering a shop in one hour (about 12 on average). Which distribution fits best?",
              choices: ["Poisson", "Binomial", "Normal", "Uniform"], answer: 0,
              explain: "Independent events at a steady rate in a fixed period: Poisson." },
            { q: "The number of heads in 20 coin flips. Which distribution?",
              choices: ["Binomial", "Poisson", "Normal", "Uniform"], answer: 0,
              explain: "A fixed number of tries (20), each succeeding with the same probability: binomial." },
            { q: "What does this print?", predict: true, code: d`
                import math
                cdf = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
                print(round(cdf(1.96), 3), round(cdf(0), 3))`,
              choices: ["0.975 0.5", "0.95 0.5", "0.975 0.0", "0.5 0.975"], answer: 0,
              explain: "97.5% of a standard normal lies below 1.96 (so 95% lies between −1.96 and 1.96), and half lies below the mean." },
            { q: "Adult heights: mean 170 cm, standard deviation 10 cm, roughly normal. About what share is between 150 and 190 cm?",
              choices: ["95%", "68%", "99.7%", "50%"], answer: 0,
              explain: "150 to 190 is the mean ± 2 standard deviations: about 95%." },
            { q: "What does this print?", predict: true, code: d`
                n, p = 100, 0.3
                print(n * p, round(n * p * (1 - p), 1))`,
              choices: ["30.0 21.0", "30 0.21", "0.3 21.0", "30.0 70.0"], answer: 0,
              explain: "A binomial's mean is n·p and its variance n·p·(1 − p)." },
          ],
        },
        {
          id: "st3-5", boss: true, time: 810, title: "The Quality Inspector",
          story: "The royal armoury rejects a crate of 50 arrows if more than 3 are crooked. About 4% of arrows are crooked. How many crates will be rejected?",
          lesson: `<p>Exact answers come from the binomial distribution. For large <code>n</code>, the binomial looks like a normal curve with μ = n·p and σ = √(n·p·(1−p)): the <b>normal approximation</b>.</p>
            <p>A count of "at most k" covers up to k + 0.5 on the continuous curve. This <b>continuity correction</b> improves the approximation: <code>P(X ≤ k) ≈ Φ((k + 0.5 − μ) / σ)</code>.</p>
            <p><code>rng.binomial(n, p, size)</code> simulates many crates at once.</p>`,
          example: d`
            import numpy as np

            crates = np.random.default_rng(0).binomial(50, 0.04, size=10)
            print(crates, (crates > 3).sum(), "rejected")`,
          task: `A crate of <code>n</code> items is rejected when it has more than <code>max_bad</code> defective items; each item is defective with probability <code>p</code>. Write:<br>
            • <code>p_reject(n, p, max_bad)</code> → the exact probability (binomial)<br>
            • <code>p_reject_normal(n, p, max_bad)</code> → the normal approximation with continuity correction<br>
            • <code>expected_rejections(crates, n, p, max_bad)</code> → expected number of rejected crates out of <code>crates</code><br>
            • <code>simulate_rejections(crates, n, p, max_bad, seed)</code> → with <code>rng = np.random.default_rng(seed)</code>, draw <code>rng.binomial(n, p, size=crates)</code> and count the rejected crates`,
          starter: d`
            import math
            import numpy as np

            def p_reject(n, p, max_bad):
                pass

            def p_reject_normal(n, p, max_bad):
                pass

            def expected_rejections(crates, n, p, max_bad):
                pass

            def simulate_rejections(crates, n, p, max_bad, seed):
                pass
            `,
          solution: d`
            import math
            import numpy as np

            def p_reject(n, p, max_bad):
                ok = sum(math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(max_bad + 1))
                return 1 - ok

            def p_reject_normal(n, p, max_bad):
                mu, sigma = n * p, math.sqrt(n * p * (1 - p))
                z = (max_bad + 0.5 - mu) / sigma
                return 1 - 0.5 * (1 + math.erf(z / math.sqrt(2)))

            def expected_rejections(crates, n, p, max_bad):
                return crates * p_reject(n, p, max_bad)

            def simulate_rejections(crates, n, p, max_bad, seed):
                bad = np.random.default_rng(seed).binomial(n, p, size=crates)
                return int((bad > max_bad).sum())`,
          hints: ["Exact: 1 - (sum of binomial probabilities for k = 0 … max_bad)", "Normal: μ = n·p, σ = √(n·p·(1−p)), z = (max_bad + 0.5 − μ) / σ, reject = 1 − Φ(z)", "simulate: (rng.binomial(n, p, size=crates) > max_bad).sum()"],
          tests: [{ code: d`
            import math, numpy as np
            pr = expect_func("p_reject"); pn = expect_func("p_reject_normal"); er = expect_func("expected_rejections"); sr = expect_func("simulate_rejections")
            exact = 1 - sum(math.comb(50, k) * 0.04 ** k * 0.96 ** (50 - k) for k in range(4))
            expect_close(pr(50, 0.04, 3), exact, "p_reject(50, 0.04, 3)")
            expect_close(pr(10, 0.5, 10), 0.0, "p_reject when max_bad = n")
            mu, s = 2.0, math.sqrt(50 * 0.04 * 0.96)
            expect_close(pn(50, 0.04, 3), 1 - 0.5 * (1 + math.erf((3.5 - mu) / s / math.sqrt(2))), "p_reject_normal(50, 0.04, 3)")
            expect_close(pn(1000, 0.5, 520), pr(1000, 0.5, 520), "for large n the approximation is close to the exact answer", tol=0.02)
            expect_close(er(200, 50, 0.04, 3), 200 * exact, "expected_rejections(200, 50, 0.04, 3)")
            expect_equal(sr(5000, 50, 0.04, 3, 9), int((np.random.default_rng(9).binomial(50, 0.04, size=5000) > 3).sum()), "simulate_rejections(5000, 50, 0.04, 3, seed 9)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Sampling Well", topic: "samples, standard error, law of large numbers & the central limit theorem", time: 540, icon: "🪣",
      intro: "Nobody can measure everyone. From the Sampling Well you draw a few, and learn how far those few can be trusted.",
      missions: [
        {
          id: "st4-1", title: "Draw from the Well",
          story: "The kingdom has 10,000 farms. Measuring them all would take years; measuring 50 takes a week. But how good is a sample of 50?",
          lesson: `<p>A <b>population</b> is everyone; a <b>sample</b> is the part you actually measure. A <b>statistic</b> (like the sample mean) estimates a <b>parameter</b> (the population mean).</p>
            <p>Different samples give different estimates. That's <b>sampling variability</b>. Drawing many samples and looking at all their means shows the <b>sampling distribution</b>: how much a single estimate can miss by.</p>
            <p><code>rng.choice(pop, size=n, replace=False)</code> draws a random sample without repeats.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(0)
            pop = rng.gamma(2, 15, 10_000)          # farm sizes: skewed
            print("true mean", pop.mean().round(2))
            for _ in range(3):
                print("sample mean", rng.choice(pop, size=50, replace=False).mean().round(2))`,
          task: `Write (each makes <b>one</b> <code>rng = np.random.default_rng(seed)</code>):<br>
            • <code>sample_mean(pop, n, seed)</code> → the mean of <code>rng.choice(pop, size=n, replace=False)</code><br>
            • <code>sample_means(pop, n, reps, seed)</code> → an array of <code>reps</code> sample means, drawing <code>rng.choice(pop, size=n, replace=False)</code> each time (in a loop)<br>
            • <code>sampling_error(pop, n, reps, seed)</code> → the standard deviation (population formula) of those <code>reps</code> sample means`,
          starter: d`
            import numpy as np

            def sample_mean(pop, n, seed):
                pass

            def sample_means(pop, n, reps, seed):
                pass

            def sampling_error(pop, n, reps, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def sample_mean(pop, n, seed):
                rng = np.random.default_rng(seed)
                return float(rng.choice(pop, size=n, replace=False).mean())

            def sample_means(pop, n, reps, seed):
                rng = np.random.default_rng(seed)
                return np.array([rng.choice(pop, size=n, replace=False).mean() for _ in range(reps)])

            def sampling_error(pop, n, reps, seed):
                return float(sample_means(pop, n, reps, seed).std())`,
          hints: ["Create rng once, at the start of each function", "sample_means: np.array([rng.choice(pop, size=n, replace=False).mean() for _ in range(reps)])", "sampling_error: sample_means(...).std()"],
          tests: [{ code: d`
            import numpy as np
            sm = expect_func("sample_mean"); sms = expect_func("sample_means"); se = expect_func("sampling_error")
            pop = np.random.default_rng(0).gamma(2, 15, 5000)
            expect_close(sm(pop, 50, 1), np.random.default_rng(1).choice(pop, size=50, replace=False).mean(), "sample_mean(pop, 50, seed 1)")
            r = np.random.default_rng(2)
            ref = np.array([r.choice(pop, size=40, replace=False).mean() for _ in range(300)])
            expect_array(np.asarray(sms(pop, 40, 300, 2)), ref, "sample_means(pop, 40, 300, seed 2)")
            expect_close(se(pop, 40, 300, 2), ref.std(), "sampling_error(pop, 40, 300, seed 2)")
            assert se(pop, 160, 300, 3) < se(pop, 10, 300, 3), "Bigger samples should give a smaller sampling error."` }],
        },
        {
          id: "st4-2", title: "The Standard Error",
          story: "The Oracle doesn't need a thousand samples to know how uncertain one sample is. There's a formula.",
          lesson: `<p>The standard deviation of the sample mean is called the <b>standard error</b>:</p>
            <p><code>SE = σ / √n</code></p>
            <p>In practice σ is unknown, so it's estimated from the sample: <code>s / √n</code> with <code>s</code> the sample standard deviation (<code>ddof=1</code>).</p>
            <p>The <code>√n</code> matters: to halve the error you need <b>four times</b> as many observations. To reach a margin of error <code>m</code> at 95% confidence: <code>n = (1.96 · σ / m)²</code>, rounded up.</p>`,
          example: d`
            import numpy as np

            sample = np.array([52.0, 47, 55, 49, 51, 58, 46, 50])
            print(sample.std(ddof=1) / np.sqrt(len(sample)))
            for n in (25, 100, 400):
                print(n, 10 / np.sqrt(n))`,
          task: `Write:<br>• <code>standard_error(sigma, n)</code> → σ ÷ √n<br>
            • <code>se_from_sample(a)</code> → the estimated standard error of the mean of sample <code>a</code> (use <code>ddof=1</code>)<br>
            • <code>n_for_margin(sigma, margin, z=1.96)</code> → the smallest whole <code>n</code> so that <code>z · σ / √n ≤ margin</code>`,
          starter: d`
            import math
            import numpy as np

            def standard_error(sigma, n):
                return sigma / n

            def se_from_sample(a):
                pass

            def n_for_margin(sigma, margin, z=1.96):
                pass
            `,
          solution: d`
            import math
            import numpy as np

            def standard_error(sigma, n):
                return sigma / math.sqrt(n)

            def se_from_sample(a):
                a = np.asarray(a, dtype=float)
                return float(a.std(ddof=1) / math.sqrt(len(a)))

            def n_for_margin(sigma, margin, z=1.96):
                return math.ceil((z * sigma / margin) ** 2)`,
          hints: ["standard_error: sigma / math.sqrt(n)", "se_from_sample: a.std(ddof=1) / math.sqrt(len(a))", "n_for_margin: math.ceil((z * sigma / margin) ** 2)"],
          tests: [{ code: d`
            import math, numpy as np
            se = expect_func("standard_error"); ss = expect_func("se_from_sample"); nm = expect_func("n_for_margin")
            expect_close(se(10, 25), 2.0, "standard_error(10, 25)")
            expect_close(se(10, 100), 1.0, "standard_error(10, 100)")
            a = [52.0, 47, 55, 49, 51, 58, 46, 50]
            expect_close(ss(a), np.std(a, ddof=1) / math.sqrt(8), "se_from_sample(a)")
            expect_equal(nm(10, 2), 97, "n_for_margin(10, 2)")
            expect_equal(nm(15, 1, z=2.576), 1494, "n_for_margin(15, 1, z=2.576)")
            pop = np.random.default_rng(1).normal(100, 20, 200000)
            r = np.random.default_rng(2)
            means = np.array([r.choice(pop, 64).mean() for _ in range(2000)])
            expect_close(means.std(), se(20, 64), "the formula should match a simulation", tol=0.08)` }],
        },
        {
          id: "st4-3", title: "The Central Limit",
          story: "The farm sizes are lopsided: many small farms, a few enormous ones. Yet the averages of samples form a perfect bell. Why?",
          lesson: `<p>The <b>central limit theorem</b> (CLT): whatever the shape of the population (as long as its spread is finite), the <b>means</b> of samples of size n are approximately <b>normal</b> when n is large enough (often 30 is plenty). This is why the normal distribution appears everywhere in statistics.</p>
            <p><b>Skewness</b> measures lopsidedness: <code>mean(((x − mean) / std)³)</code>. 0 for a symmetric shape, positive for a long right tail.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(0)
            raw = rng.exponential(10, 50_000)
            means = rng.exponential(10, size=(5_000, 30)).mean(axis=1)
            skew = lambda x: (((x - x.mean()) / x.std()) ** 3).mean()
            print(round(skew(raw), 2), round(skew(means), 2))`,
          task: `Write:<br>• <code>skewness(a)</code> → mean of ((x − mean) / std)³, using the population std<br>
            • <code>clt_means(scale, n, reps, seed)</code> → with <code>rng = np.random.default_rng(seed)</code>, draw <code>rng.exponential(scale, size=(reps, n))</code> and return the mean of each row<br>
            • <code>within_2se(scale, n, reps, seed)</code> → the fraction of those sample means that lie within 2 standard errors (<code>scale / √n</code>, because an exponential's std equals its scale) of the true mean <code>scale</code>`,
          starter: d`
            import numpy as np

            def skewness(a):
                pass

            def clt_means(scale, n, reps, seed):
                pass

            def within_2se(scale, n, reps, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def skewness(a):
                a = np.asarray(a, dtype=float)
                return float((((a - a.mean()) / a.std()) ** 3).mean())

            def clt_means(scale, n, reps, seed):
                rng = np.random.default_rng(seed)
                return rng.exponential(scale, size=(reps, n)).mean(axis=1)

            def within_2se(scale, n, reps, seed):
                m = clt_means(scale, n, reps, seed)
                se = scale / np.sqrt(n)
                return float((np.abs(m - scale) <= 2 * se).mean())`,
          hints: ["skewness: (((a - a.mean()) / a.std()) ** 3).mean()", "clt_means: rng.exponential(scale, size=(reps, n)).mean(axis=1)", "within_2se: (np.abs(m - scale) <= 2 * scale / np.sqrt(n)).mean()"],
          tests: [{ code: d`
            import numpy as np
            sk = expect_func("skewness"); cm = expect_func("clt_means"); w2 = expect_func("within_2se")
            expect_close(sk([1, 2, 3]), 0.0, "skewness of a symmetric list")
            x = np.array([1.0, 1, 1, 2, 10])
            expect_close(sk(x), (((x - x.mean()) / x.std()) ** 3).mean(), "skewness([1 1 1 2 10])")
            m = cm(10, 30, 4000, 5)
            expect_array(np.asarray(m), np.random.default_rng(5).exponential(10, size=(4000, 30)).mean(1), "clt_means(10, 30, 4000, seed 5)")
            raw = np.random.default_rng(6).exponential(10, 40000)
            assert sk(m) < sk(raw) / 3, "The sample means should be much less skewed than the raw data."
            v = w2(10, 40, 5000, 7)
            mm = np.random.default_rng(7).exponential(10, size=(5000, 40)).mean(1)
            expect_close(v, (np.abs(mm - 10) <= 2 * 10 / np.sqrt(40)).mean(), "within_2se(10, 40, 5000, seed 7)")
            assert 0.93 < v < 0.97, "About 95% of sample means should be within 2 standard errors."` }],
        },
        {
          id: "st4-4", type: "quiz", title: "Riddles of the Well",
          story: "The well-keeper's riddles: what does a sample really tell you?",
          lesson: `<p>Bigger samples reduce random error (by √n), but no sample size fixes a <b>biased</b> way of choosing who's in the sample. The CLT is about <b>averages</b>, not individual values.</p>`,
          questions: [
            { q: "You quadruple your sample size (from 100 to 400). What happens to the standard error of the mean?",
              choices: ["it halves", "it quarters", "it doubles", "it stays the same"], answer: 0,
              explain: "SE = σ/√n and √4 = 2, so the SE is divided by 2." },
            { q: "To estimate how popular the Queen is, a pollster asks 10,000 people at the royal palace's gates. What's the main problem?",
              choices: ["the sample is biased: palace visitors aren't typical", "10,000 is too small", "the standard error is too large", "nothing, it's a big sample"], answer: 0,
              explain: "A huge but biased sample is still wrong. Random selection matters more than size." },
            { q: "Farm sizes are strongly right-skewed. You take many samples of 100 farms. What do the <b>sample means</b> look like?",
              choices: ["approximately normal (bell-shaped)", "just as skewed as the farms", "uniform", "always exactly the population mean"], answer: 0,
              explain: "That's the central limit theorem." },
            { q: "What does this print?", predict: true, code: d`
                import math
                print(round(15 / math.sqrt(100), 2), round(15 / math.sqrt(400), 2))`,
              choices: ["1.5 0.75", "0.15 0.0375", "1.5 0.375", "15.0 7.5"], answer: 0,
              explain: "SE = σ / √n: 15 / 10 and 15 / 20." },
            { q: "You flip a coin 10 times and get 7 heads (70%). After 10,000 flips you'd expect the share of heads to be…",
              choices: ["very close to 50%", "still around 70%", "below 50% to balance out the early heads", "exactly 50%"], answer: 0,
              explain: "The law of large numbers: the <i>proportion</i> settles towards 0.5. Not by compensating, but because the early streak gets diluted." },
          ],
        },
        {
          id: "st4-5", boss: true, time: 900, title: "The Pollster",
          story: "Election season in the Empire. The royal pollster must report a percentage AND how far off it might be.",
          lesson: `<p>For a <b>proportion</b> p̂ from a sample of n, the standard error is <code>√(p̂(1 − p̂) / n)</code>, and the 95% <b>margin of error</b> is <code>1.96 × SE</code>.</p>
            <p>The margin is largest at p̂ = 0.5, so planners use 0.5 to be safe: <code>n = p(1 − p)(z / margin)²</code>.</p>
            <p><b>Coverage</b>: if you repeat the poll many times, about 95% of the intervals p̂ ± margin should contain the true value. Simulation checks this.</p>`,
          example: d`
            import numpy as np

            pop = np.random.default_rng(0).random(100_000) < 0.42      # 42% support the Queen
            s = np.random.default_rng(1).choice(pop, size=1000, replace=False)
            p = s.mean()
            moe = 1.96 * np.sqrt(p * (1 - p) / 1000)
            print(p, round(moe, 4))`,
          task: `<code>pop</code> is a boolean array (True = supports the Queen). Write:<br>
            • <code>poll(pop, n, seed)</code> → the proportion of True in <code>rng.choice(pop, size=n, replace=False)</code>, with <code>rng = np.random.default_rng(seed)</code><br>
            • <code>margin_of_error(p, n, z=1.96)</code> → z × √(p(1 − p) / n)<br>
            • <code>sample_size_needed(margin, p=0.5, z=1.96)</code> → the smallest whole n giving at most that margin<br>
            • <code>coverage(pop, n, reps, seed)</code> → one <code>rng</code>; for each of <code>reps</code> polls draw <code>rng.choice(pop, size=n, replace=False)</code>, build p̂ ± margin_of_error(p̂, n), and return the fraction of intervals that contain the true proportion <code>pop.mean()</code>`,
          starter: d`
            import math
            import numpy as np

            def poll(pop, n, seed):
                pass

            def margin_of_error(p, n, z=1.96):
                pass

            def sample_size_needed(margin, p=0.5, z=1.96):
                pass

            def coverage(pop, n, reps, seed):
                pass
            `,
          solution: d`
            import math
            import numpy as np

            def poll(pop, n, seed):
                rng = np.random.default_rng(seed)
                return float(rng.choice(pop, size=n, replace=False).mean())

            def margin_of_error(p, n, z=1.96):
                return z * math.sqrt(p * (1 - p) / n)

            def sample_size_needed(margin, p=0.5, z=1.96):
                return math.ceil(p * (1 - p) * (z / margin) ** 2)

            def coverage(pop, n, reps, seed):
                rng = np.random.default_rng(seed)
                truth = pop.mean()
                hits = 0
                for _ in range(reps):
                    p = rng.choice(pop, size=n, replace=False).mean()
                    m = margin_of_error(p, n)
                    hits += (p - m <= truth <= p + m)
                return hits / reps`,
          hints: ["poll: rng.choice(pop, size=n, replace=False).mean()", "margin: z * math.sqrt(p * (1 - p) / n)", "sample size: math.ceil(p * (1 - p) * (z / margin) ** 2)", "coverage: count how often p - m <= truth <= p + m"],
          tests: [{ code: d`
            import math, numpy as np
            po = expect_func("poll"); mo = expect_func("margin_of_error"); sn = expect_func("sample_size_needed"); co = expect_func("coverage")
            pop = np.random.default_rng(0).random(20000) < 0.42
            expect_close(po(pop, 1000, 1), np.random.default_rng(1).choice(pop, size=1000, replace=False).mean(), "poll(pop, 1000, seed 1)")
            expect_close(mo(0.5, 1000), 1.96 * math.sqrt(0.25 / 1000), "margin_of_error(0.5, 1000)")
            expect_close(mo(0.42, 400, z=2.576), 2.576 * math.sqrt(0.42 * 0.58 / 400), "margin_of_error(0.42, 400, z=2.576)")
            expect_equal(sn(0.03), 1068, "sample_size_needed(0.03)")
            expect_equal(sn(0.01, p=0.1), 3458, "sample_size_needed(0.01, p=0.1)")
            r = np.random.default_rng(5); t = pop.mean(); hits = 0
            for _ in range(400):
                p = r.choice(pop, size=300, replace=False).mean(); m = 1.96 * math.sqrt(p * (1 - p) / 300); hits += (p - m <= t <= p + m)
            c = co(pop, 300, 400, 5)
            expect_close(c, hits / 400, "coverage(pop, 300, 400, seed 5)")
            assert 0.9 < c < 0.99, "Roughly 95% of the intervals should contain the truth."` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Range of Belief", topic: "confidence intervals: z, t & bootstrap", time: 600, icon: "🎯",
      intro: "The Oracle never gives a single number. She gives a range, and says how confident she is that the truth lies inside it.",
      missions: [
        {
          id: "st5-1", title: "The Interval of Trust",
          story: "The royal miller wants the average weight of his flour sacks: not one number, but a range he can trust.",
          lesson: `<p>A <b>confidence interval</b> for a mean: <code>estimate ± z × SE</code>. For 95% confidence, z = 1.96:</p>
            <p><code>mean ± 1.96 × s / √n</code></p>
            <p>For a proportion: <code>p̂ ± 1.96 × √(p̂(1 − p̂) / n)</code>.</p>
            <p>Meaning: if you repeated the whole study many times, 95% of the intervals built this way would contain the true value. It's a statement about the <b>method</b>, not about any one interval.</p>`,
          example: d`
            import numpy as np

            sacks = np.random.default_rng(0).normal(25, 0.8, 60)
            m, se = sacks.mean(), sacks.std(ddof=1) / np.sqrt(len(sacks))
            print(round(m - 1.96 * se, 3), round(m + 1.96 * se, 3))`,
          task: `Write (each returns a tuple <code>(low, high)</code>):<br>• <code>ci_mean(a, z=1.96)</code> → mean ± z × s/√n (sample std, <code>ddof=1</code>)<br>
            • <code>ci_proportion(successes, n, z=1.96)</code> → p̂ ± z × √(p̂(1 − p̂)/n)<br>
            • <code>ci_width(a, z=1.96)</code> → the width (high − low) of <code>ci_mean</code>`,
          starter: d`
            import numpy as np

            def ci_mean(a, z=1.96):
                pass

            def ci_proportion(successes, n, z=1.96):
                pass

            def ci_width(a, z=1.96):
                pass
            `,
          solution: d`
            import numpy as np

            def ci_mean(a, z=1.96):
                a = np.asarray(a, dtype=float)
                se = a.std(ddof=1) / np.sqrt(len(a))
                return (float(a.mean() - z * se), float(a.mean() + z * se))

            def ci_proportion(successes, n, z=1.96):
                p = successes / n
                m = z * np.sqrt(p * (1 - p) / n)
                return (float(p - m), float(p + m))

            def ci_width(a, z=1.96):
                low, high = ci_mean(a, z)
                return high - low`,
          hints: ["se = a.std(ddof=1) / np.sqrt(len(a))", "(mean - z * se, mean + z * se)", "proportion: p = successes / n, margin z * sqrt(p * (1 - p) / n)"],
          tests: [{ code: d`
            import numpy as np
            cm = expect_func("ci_mean"); cp = expect_func("ci_proportion"); cw = expect_func("ci_width")
            a = np.random.default_rng(0).normal(25, 0.8, 60)
            se = a.std(ddof=1) / np.sqrt(60)
            expect_close(cm(a), (a.mean() - 1.96 * se, a.mean() + 1.96 * se), "ci_mean(sacks)")
            expect_close(cm(a, z=2.576), (a.mean() - 2.576 * se, a.mean() + 2.576 * se), "ci_mean(sacks, z=2.576)")
            expect_close(cp(420, 1000), (0.42 - 1.96 * np.sqrt(0.42 * 0.58 / 1000), 0.42 + 1.96 * np.sqrt(0.42 * 0.58 / 1000)), "ci_proportion(420, 1000)")
            expect_close(cw(a), 2 * 1.96 * se, "ci_width(sacks)")
            assert cw(a, z=2.576) > cw(a), "More confidence should mean a wider interval."` }],
        },
        {
          id: "st5-2", title: "Student's Secret",
          story: "A brewer named Student had only a few barrels to test. He discovered that small samples need wider intervals.",
          lesson: `<p>With a <b>small</b> sample, <code>s</code> itself is uncertain, so 1.96 is too optimistic. Use the <b>t-distribution</b> with <code>n − 1</code> degrees of freedom: its critical values are larger (for n = 5, about 2.776 instead of 1.96), and shrink towards 1.96 as n grows.</p>
            <p><code>mean ± t* × s / √n</code></p>
            <p>t* values come from a table (or <code>scipy.stats.t.ppf(0.975, df)</code>). The starter code includes a 95% table.</p>`,
          example: d`
            T95 = {1: 12.706, 4: 2.776, 9: 2.262, 29: 2.045}
            for df, t in T95.items():
                print(df, t, "vs 1.96")`,
          task: `Using the <code>T95</code> table in the starter, write:<br>• <code>t_critical(df)</code> → the table value for <code>df</code>; for df above 30 use 1.96<br>
            • <code>ci_mean_t(a)</code> → a 95% interval <code>(low, high)</code>: mean ± t* × s/√n with df = n − 1<br>
            • <code>t_vs_z_ratio(n)</code> → how much wider the t-interval is than the z-interval for samples of size n: t*(n − 1) ÷ 1.96`,
          starter: d`
            import numpy as np

            T95 = {1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
                   11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
                   21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060, 26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042}

            def t_critical(df):
                pass

            def ci_mean_t(a):
                a = np.asarray(a, dtype=float)
                se = a.std(ddof=1) / np.sqrt(len(a))
                return (a.mean() - 1.96 * se, a.mean() + 1.96 * se)

            def t_vs_z_ratio(n):
                pass
            `,
          solution: d`
            import numpy as np

            T95 = {1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
                   11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
                   21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060, 26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042}

            def t_critical(df):
                return T95.get(df, 1.96)

            def ci_mean_t(a):
                a = np.asarray(a, dtype=float)
                se = a.std(ddof=1) / np.sqrt(len(a))
                t = t_critical(len(a) - 1)
                return (float(a.mean() - t * se), float(a.mean() + t * se))

            def t_vs_z_ratio(n):
                return t_critical(n - 1) / 1.96`,
          hints: ["t_critical: T95.get(df, 1.96)", "ci_mean_t: replace 1.96 with t_critical(len(a) - 1)", "t_vs_z_ratio: t_critical(n - 1) / 1.96"],
          tests: [{ code: d`
            import numpy as np
            tc = expect_func("t_critical"); ct = expect_func("ci_mean_t"); tr = expect_func("t_vs_z_ratio")
            expect_close(tc(4), 2.776, "t_critical(4)"); expect_close(tc(29), 2.045, "t_critical(29)"); expect_close(tc(200), 1.96, "t_critical(200)")
            a = np.array([12.1, 11.8, 12.6, 12.0, 11.5])
            se = a.std(ddof=1) / np.sqrt(5)
            expect_close(ct(a), (a.mean() - 2.776 * se, a.mean() + 2.776 * se), "ci_mean_t(5 barrels)")
            b = np.random.default_rng(1).normal(10, 2, 50)
            sb = b.std(ddof=1) / np.sqrt(50)
            expect_close(ct(b), (b.mean() - 1.96 * sb, b.mean() + 1.96 * sb), "ci_mean_t(50 values) (df 49 → 1.96)")
            expect_close(tr(5), 2.776 / 1.96, "t_vs_z_ratio(5)")
            assert tr(3) > tr(10) > tr(31), "The t-interval should be much wider for tiny samples."` }],
        },
        {
          id: "st5-3", title: "Pull Yourself Up",
          story: "There's no formula for the uncertainty of a median. The Oracle's trick: resample the data itself.",
          lesson: `<p>The <b>bootstrap</b> estimates uncertainty for <b>any</b> statistic without a formula:</p>
            <ol><li>Draw a sample of the same size from your data <b>with replacement</b> (some values appear twice, some not at all)</li>
            <li>Compute the statistic on it</li><li>Repeat thousands of times</li>
            <li>The 2.5th and 97.5th percentiles of those statistics form a 95% interval</li></ol>
            <p>With NumPy, all resamples at once: <code>rng.choice(a, size=(B, len(a)), replace=True)</code>, then the statistic along <code>axis=1</code>.</p>`,
          example: d`
            import numpy as np

            a = np.array([3.1, 4.7, 2.2, 8.9, 5.0, 4.1, 3.8, 12.5, 4.4, 3.0])
            rng = np.random.default_rng(0)
            boots = rng.choice(a, size=(5000, len(a)), replace=True)
            meds = np.median(boots, axis=1)
            print(np.median(a), np.percentile(meds, [2.5, 97.5]))`,
          task: `Write <code>bootstrap_ci(a, stat, B, seed)</code>: with <code>rng = np.random.default_rng(seed)</code>, draw <code>rng.choice(a, size=(B, len(a)), replace=True)</code>, apply <code>stat</code> along <code>axis=1</code> (e.g. <code>stat=np.median</code>, called as <code>stat(samples, axis=1)</code>) and return <code>(low, high)</code>: the 2.5th and 97.5th percentiles.<br>
            Also write <code>bootstrap_se(a, stat, B, seed)</code> → the standard deviation of the same bootstrap statistics (same draws).`,
          starter: d`
            import numpy as np

            def bootstrap_ci(a, stat, B, seed):
                pass

            def bootstrap_se(a, stat, B, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def _boot(a, stat, B, seed):
                rng = np.random.default_rng(seed)
                samples = rng.choice(np.asarray(a), size=(B, len(a)), replace=True)
                return stat(samples, axis=1)

            def bootstrap_ci(a, stat, B, seed):
                low, high = np.percentile(_boot(a, stat, B, seed), [2.5, 97.5])
                return (float(low), float(high))

            def bootstrap_se(a, stat, B, seed):
                return float(_boot(a, stat, B, seed).std())`,
          hints: ["samples = rng.choice(a, size=(B, len(a)), replace=True)", "stats = stat(samples, axis=1)", "np.percentile(stats, [2.5, 97.5])"],
          tests: [{ code: d`
            import numpy as np
            bc = expect_func("bootstrap_ci"); bs = expect_func("bootstrap_se")
            a = np.array([3.1, 4.7, 2.2, 8.9, 5.0, 4.1, 3.8, 12.5, 4.4, 3.0])
            ref = np.median(np.random.default_rng(0).choice(a, size=(4000, 10), replace=True), axis=1)
            expect_close(bc(a, np.median, 4000, 0), tuple(np.percentile(ref, [2.5, 97.5])), "bootstrap_ci(a, np.median, 4000, seed 0)")
            expect_close(bs(a, np.median, 4000, 0), ref.std(), "bootstrap_se(a, np.median, 4000, seed 0)")
            b = np.random.default_rng(2).normal(50, 10, 100)
            refm = np.random.default_rng(3).choice(b, size=(3000, 100), replace=True).mean(1)
            expect_close(bc(b, np.mean, 3000, 3), tuple(np.percentile(refm, [2.5, 97.5])), "bootstrap_ci(b, np.mean, 3000, seed 3)")
            se_formula = b.std(ddof=1) / 10
            expect_close(bs(b, np.mean, 3000, 3), se_formula, "for the mean, the bootstrap SE should be close to s/√n", tol=0.1)` }],
        },
        {
          id: "st5-4", type: "quiz", title: "Riddles of Belief",
          story: "The Oracle's riddles about intervals: most people misread them.",
          lesson: `<p>A 95% confidence interval is produced by a method that captures the true value 95% of the time. More data → narrower; more confidence → wider.</p>`,
          questions: [
            { q: "A 95% confidence interval for the mean sack weight is (24.8, 25.2) kg. Which statement is correct?",
              choices: ["If we repeated the study many times, about 95% of the intervals made this way would contain the true mean",
                "95% of the sacks weigh between 24.8 and 25.2 kg", "There's a 95% chance the sample mean is in this interval", "The true mean is exactly 25.0 kg"], answer: 0,
              explain: "The interval is about the <b>mean</b>, not individual sacks, and the 95% describes the method's long-run success rate." },
            { q: "You go from a 95% to a 99% confidence interval (same data). The interval becomes…",
              choices: ["wider", "narrower", "the same width", "shifted to the right"], answer: 0,
              explain: "To be more certain to catch the truth, you need a bigger net (z goes from 1.96 to 2.576)." },
            { q: "What does this print?", predict: true, code: d`
                import math
                p, n = 0.5, 400
                print(round(1.96 * math.sqrt(p * (1 - p) / n), 3))`,
              choices: ["0.049", "0.025", "0.098", "0.0012"], answer: 0,
              explain: "About ±4.9 percentage points: that's the \"margin of error\" newspapers quote for a 400-person poll." },
            { q: "Why do small samples use a t-value (like 2.776 for n = 5) instead of 1.96?",
              choices: ["the sample standard deviation is itself uncertain, so the interval must be wider", "small samples are always biased", "t-values are smaller, making intervals narrower", "1.96 only works for proportions"], answer: 0,
              explain: "Estimating σ from only a few values adds extra uncertainty, so the t-distribution has heavier tails." },
            { q: "The bootstrap draws samples from your data…",
              choices: ["with replacement, the same size as the data", "without replacement, the same size as the data", "with replacement, half the size", "from a normal distribution with the same mean"], answer: 0,
              explain: "With replacement, so each resample differs; the same size, so its variability matches the real study." },
          ],
        },
        {
          id: "st5-5", boss: true, time: 900, title: "The Royal Survey",
          story: "The royal survey measured how many hours 40 citizens work each week. The Emperor wants every kind of interval, side by side.",
          lesson: `<p>Comparing methods is a good habit: for well-behaved data with n = 40, the z-interval, the t-interval and the bootstrap interval should roughly agree. When they don't, look closer at the data.</p>`,
          example: d`
            import numpy as np

            hours = np.random.default_rng(0).normal(42, 6, 40).round(1)
            print(hours.mean().round(2), hours.std(ddof=1).round(2))`,
          task: `Write <code>survey_report(a)</code> returning a dict with: <code>"n"</code>, <code>"mean"</code>, <code>"sd"</code> (ddof=1), <code>"se"</code>, <code>"ci_z"</code> (mean ± 1.96·se), <code>"ci_t"</code> (mean ± t*·se with the T95 table in the starter, 1.96 for df &gt; 30), <code>"ci_boot"</code> (bootstrap of the mean: <code>rng = np.random.default_rng(0)</code>, <code>B = 2000</code>, percentiles 2.5 and 97.5) and <code>"agree"</code>: <code>True</code> if the three lower ends are all within 0.5 × se of each other.<br>All intervals are tuples <code>(low, high)</code>.`,
          starter: d`
            import numpy as np

            T95 = {1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
                   11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
                   21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060, 26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042}

            def survey_report(a):
                a = np.asarray(a, dtype=float)
                return {"n": len(a), "mean": a.mean()}
            `,
          solution: d`
            import numpy as np

            T95 = {1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
                   11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
                   21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060, 26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042}

            def survey_report(a):
                a = np.asarray(a, dtype=float)
                n, m, sd = len(a), a.mean(), a.std(ddof=1)
                se = sd / np.sqrt(n)
                t = T95.get(n - 1, 1.96)
                rng = np.random.default_rng(0)
                boots = rng.choice(a, size=(2000, n), replace=True).mean(axis=1)
                lo, hi = np.percentile(boots, [2.5, 97.5])
                lows = [m - 1.96 * se, m - t * se, lo]
                return {"n": n, "mean": float(m), "sd": float(sd), "se": float(se),
                        "ci_z": (float(m - 1.96 * se), float(m + 1.96 * se)),
                        "ci_t": (float(m - t * se), float(m + t * se)),
                        "ci_boot": (float(lo), float(hi)),
                        "agree": bool(max(lows) - min(lows) <= 0.5 * se)}`,
          hints: ["se = sd / np.sqrt(n); t = T95.get(n - 1, 1.96)", "bootstrap: rng.choice(a, size=(2000, n), replace=True).mean(axis=1), then np.percentile(..., [2.5, 97.5])", "agree: max(lows) - min(lows) <= 0.5 * se"],
          tests: [{ code: d`
            import numpy as np
            sr = expect_func("survey_report")
            def ref(a):
                a = np.asarray(a, dtype=float); n = len(a); m = a.mean(); sd = a.std(ddof=1); se = sd / np.sqrt(n)
                t = {9: 2.262, 14: 2.145}.get(n - 1, 1.96)
                b = np.random.default_rng(0).choice(a, size=(2000, n), replace=True).mean(1); lo, hi = np.percentile(b, [2.5, 97.5])
                lows = [m - 1.96 * se, m - t * se, lo]
                return {"n": n, "mean": m, "sd": sd, "se": se, "ci_z": (m - 1.96 * se, m + 1.96 * se), "ci_t": (m - t * se, m + t * se), "ci_boot": (lo, hi), "agree": bool(max(lows) - min(lows) <= 0.5 * se)}
            for label, a in [("40 citizens", np.random.default_rng(0).normal(42, 6, 40).round(1)), ("10 citizens", np.random.default_rng(1).normal(38, 9, 10).round(1)),
                             ("15 skewed values", np.random.default_rng(2).exponential(5, 15).round(2))]:
                got, want = sr(a), ref(a)
                expect_equal(got.get("n"), want["n"], label + ": n")
                expect_equal(got.get("agree"), want["agree"], label + ": agree")
                expect_close({k: got.get(k) for k in ("mean", "sd", "se", "ci_z", "ci_t", "ci_boot")}, {k: want[k] for k in ("mean", "sd", "se", "ci_z", "ci_t", "ci_boot")}, label + ": values")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "The Trial Chamber", topic: "hypothesis tests, p-values, permutation tests & t-tests", time: 660, icon: "⚖️",
      intro: "In the Trial Chamber every claim stands accused of being luck. Only strong evidence can convict it of being real.",
      missions: [
        {
          id: "st6-1", title: "Innocent Until Proven",
          story: "The miller claims his sacks weigh 25 kg on average. A sample says 24.6. Is the miller lying, or was the sample just unlucky?",
          lesson: `<p>A <b>hypothesis test</b> works like a trial:</p>
            <ul><li>The <b>null hypothesis</b> H₀ ("nothing special is going on": the mean really is 25) is assumed innocent</li>
            <li>Measure how surprising the data would be <i>if</i> H₀ were true: the <b>test statistic</b> <code>z = (mean − μ₀) / (s / √n)</code></li>
            <li>The <b>p-value</b> is the probability of a result at least this extreme if H₀ is true. Two-sided: <code>p = 2 × (1 − Φ(|z|))</code></li>
            <li>If p &lt; α (usually 0.05), <b>reject H₀</b>; otherwise there isn't enough evidence (which is <i>not</i> proof that H₀ is true)</li></ul>`,
          example: d`
            import math
            import numpy as np

            phi = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
            sacks = np.random.default_rng(0).normal(24.6, 1.2, 50)
            z = (sacks.mean() - 25) / (sacks.std(ddof=1) / math.sqrt(50))
            print(round(z, 3), round(2 * (1 - phi(abs(z))), 4))`,
          task: `Write:<br>• <code>z_stat(a, mu0)</code> → (mean − mu0) / (s/√n), with s the sample std (<code>ddof=1</code>)<br>
            • <code>p_two_sided(z)</code> → 2 × (1 − Φ(|z|))<br>• <code>decide(p, alpha=0.05)</code> → <code>"reject H0"</code> if p &lt; alpha, else <code>"keep H0"</code><br>
            • <code>test_mean(a, mu0, alpha=0.05)</code> → a tuple <code>(z, p, decision)</code>`,
          starter: d`
            import math
            import numpy as np

            def z_stat(a, mu0):
                pass

            def p_two_sided(z):
                pass

            def decide(p, alpha=0.05):
                pass

            def test_mean(a, mu0, alpha=0.05):
                pass
            `,
          solution: d`
            import math
            import numpy as np

            def z_stat(a, mu0):
                a = np.asarray(a, dtype=float)
                return float((a.mean() - mu0) / (a.std(ddof=1) / math.sqrt(len(a))))

            def p_two_sided(z):
                phi = 0.5 * (1 + math.erf(abs(z) / math.sqrt(2)))
                return 2 * (1 - phi)

            def decide(p, alpha=0.05):
                return "reject H0" if p < alpha else "keep H0"

            def test_mean(a, mu0, alpha=0.05):
                z = z_stat(a, mu0)
                p = p_two_sided(z)
                return (z, p, decide(p, alpha))`,
          hints: ["z = (mean - mu0) / (a.std(ddof=1) / sqrt(n))", "Φ(x) = 0.5 * (1 + math.erf(x / math.sqrt(2))); p = 2 * (1 - Φ(|z|))", "test_mean just combines the three"],
          tests: [{ code: d`
            import math, numpy as np
            zs = expect_func("z_stat"); pt = expect_func("p_two_sided"); de = expect_func("decide"); tm = expect_func("test_mean")
            a = np.random.default_rng(0).normal(24.6, 1.2, 50)
            z = (a.mean() - 25) / (a.std(ddof=1) / math.sqrt(50))
            expect_close(zs(a, 25), z, "z_stat(sacks, 25)")
            expect_close(pt(1.96), 0.04999579029644097, "p_two_sided(1.96)")
            expect_close(pt(-1.96), 0.04999579029644097, "p_two_sided(-1.96)")
            expect_close(pt(0), 1.0, "p_two_sided(0)")
            expect_equal(de(0.03), "reject H0", "decide(0.03)"); expect_equal(de(0.07), "keep H0", "decide(0.07)"); expect_equal(de(0.03, alpha=0.01), "keep H0", "decide(0.03, alpha=0.01)")
            r = tm(a, 25)
            expect_close(r[:2], (z, 2 * (1 - 0.5 * (1 + math.erf(abs(z) / math.sqrt(2))))), "test_mean(sacks, 25) z and p")
            expect_equal(r[2], "reject H0" if r[1] < 0.05 else "keep H0", "test_mean decision")` }],
        },
        {
          id: "st6-2", title: "Shuffle the Labels",
          story: "Do heroes who trained with the new master hit harder? If the training didn't matter, the labels \"trained\" and \"untrained\" could be shuffled freely.",
          lesson: `<p>The <b>permutation test</b> needs no formula and no normal curve:</p>
            <ol><li>Compute the observed difference between the groups</li>
            <li>If H₀ is true (the group doesn't matter), every way of splitting the values into groups was equally likely. So pool the values, shuffle, split, and compute the difference again</li>
            <li>Repeat thousands of times. The p-value is the fraction of shuffles whose difference is at least as extreme as the observed one</li></ol>
            <p>Simple, honest and very general. Computers made it practical.</p>`,
          example: d`
            import numpy as np

            a = np.array([12.0, 15, 14, 16, 13])
            b = np.array([11.0, 12, 10, 13, 11])
            pooled = np.concatenate([a, b])
            rng = np.random.default_rng(0)
            perm = rng.permutation(pooled)
            print(a.mean() - b.mean(), perm[:5].mean() - perm[5:].mean())`,
          task: `Write:<br>• <code>observed_diff(a, b)</code> → mean of <code>a</code> − mean of <code>b</code><br>
            • <code>perm_test(a, b, B, seed)</code> → the two-sided p-value: <code>rng = np.random.default_rng(seed)</code>, <code>pooled = np.concatenate([a, b])</code>; <code>B</code> times: <code>perm = rng.permutation(pooled)</code>, diff = mean of the first <code>len(a)</code> values − mean of the rest; p = fraction of diffs with |diff| ≥ |observed|`,
          starter: d`
            import numpy as np

            def observed_diff(a, b):
                pass

            def perm_test(a, b, B, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def observed_diff(a, b):
                return float(np.mean(a) - np.mean(b))

            def perm_test(a, b, B, seed):
                rng = np.random.default_rng(seed)
                pooled = np.concatenate([a, b])
                obs = abs(observed_diff(a, b))
                k = len(a)
                hits = 0
                for _ in range(B):
                    perm = rng.permutation(pooled)
                    if abs(perm[:k].mean() - perm[k:].mean()) >= obs - 1e-12:
                        hits += 1
                return hits / B`,
          hints: ["pooled = np.concatenate([a, b]); k = len(a)", "Each time: perm = rng.permutation(pooled); diff = perm[:k].mean() - perm[k:].mean()", "Count abs(diff) >= abs(observed) (allow a tiny tolerance for float ties)"],
          tests: [{ code: d`
            import numpy as np
            od = expect_func("observed_diff"); pt = expect_func("perm_test")
            a = np.array([12.0, 15, 14, 16, 13, 17, 15]); b = np.array([11.0, 12, 10, 13, 11, 14])
            expect_close(od(a, b), a.mean() - b.mean(), "observed_diff(a, b)")
            def ref(a, b, B, seed):
                r = np.random.default_rng(seed); pooled = np.concatenate([a, b]); obs = abs(a.mean() - b.mean()); k = len(a); h = 0
                for _ in range(B):
                    p = r.permutation(pooled)
                    h += abs(p[:k].mean() - p[k:].mean()) >= obs - 1e-12
                return h / B
            expect_close(pt(a, b, 3000, 0), ref(a, b, 3000, 0), "perm_test(trained, untrained, 3000, seed 0)")
            same = np.random.default_rng(4).normal(10, 2, 20)
            p_same = pt(same[:10], same[10:], 2000, 1)
            expect_close(p_same, ref(same[:10], same[10:], 2000, 1), "perm_test on two groups from the same source")
            assert p_same > 0.05, "Groups from the same source should usually not look significant."` }],
        },
        {
          id: "st6-3", title: "The Scholar's Tools", packages: ["scipy"],
          story: "The temple's scholars use SciPy, the toolkit behind most scientific Python, to run tests in one line.",
          lesson: `<p>You now understand what a test does inside. In real work, use <code>scipy.stats</code>:</p>
            <ul><li><code>stats.ttest_1samp(a, mu0)</code> → is the mean of <code>a</code> different from <code>mu0</code>?</li>
            <li><code>stats.ttest_ind(a, b, equal_var=False)</code> → do two independent groups differ? (<b>Welch's</b> t-test: doesn't assume equal spreads, a safe default)</li>
            <li><code>stats.ttest_rel(before, after)</code> → <b>paired</b> data: the same subjects measured twice</li></ul>
            <p>Each returns a result with <code>.statistic</code> and <code>.pvalue</code>. (This mission loads SciPy: a large download the first time.)</p>`,
          example: d`
            from scipy import stats
            import numpy as np

            a = np.array([12.0, 15, 14, 16, 13])
            r = stats.ttest_1samp(a, 12)
            print(round(r.statistic, 3), round(r.pvalue, 4))`,
          task: `Using <code>scipy.stats</code>, write (each returns a tuple <code>(statistic, pvalue)</code> of floats):<br>
            • <code>one_sample(a, mu0)</code> → one-sample t-test<br>• <code>welch(a, b)</code> → Welch's two-sample t-test<br>
            • <code>paired(before, after)</code> → paired t-test of <code>after</code> vs <code>before</code> (call <code>ttest_rel(after, before)</code>)`,
          starter: d`
            from scipy import stats
            import numpy as np

            def one_sample(a, mu0):
                pass

            def welch(a, b):
                r = stats.ttest_ind(a, b)
                return (float(r.statistic), float(r.pvalue))

            def paired(before, after):
                pass
            `,
          solution: d`
            from scipy import stats
            import numpy as np

            def one_sample(a, mu0):
                r = stats.ttest_1samp(a, mu0)
                return (float(r.statistic), float(r.pvalue))

            def welch(a, b):
                r = stats.ttest_ind(a, b, equal_var=False)
                return (float(r.statistic), float(r.pvalue))

            def paired(before, after):
                r = stats.ttest_rel(after, before)
                return (float(r.statistic), float(r.pvalue))`,
          hints: ["r = stats.ttest_1samp(a, mu0); (r.statistic, r.pvalue)", "Welch: stats.ttest_ind(a, b, equal_var=False)", "paired: stats.ttest_rel(after, before)"],
          tests: [{ code: d`
            from scipy import stats
            import numpy as np
            os_ = expect_func("one_sample"); we = expect_func("welch"); pa = expect_func("paired")
            rng = np.random.default_rng(0)
            a = rng.normal(24.6, 1.2, 30); b = rng.normal(25.3, 2.5, 25)
            r = stats.ttest_1samp(a, 25); expect_close(os_(a, 25), (r.statistic, r.pvalue), "one_sample(a, 25)")
            r = stats.ttest_ind(a, b, equal_var=False); expect_close(we(a, b), (r.statistic, r.pvalue), "welch(a, b)")
            before = rng.normal(70, 8, 15); after = before - rng.normal(2, 1.5, 15)
            r = stats.ttest_rel(after, before); expect_close(pa(before, after), (r.statistic, r.pvalue), "paired(before, after)")` }],
        },
        {
          id: "st6-4", type: "quiz", title: "Riddles of the Trial",
          story: "The judges of the Trial Chamber ask what a p-value really means. Most people, even scientists, get these wrong.",
          lesson: `<p>A p-value is the probability of data at least this extreme <b>assuming H₀ is true</b>. It is <b>not</b> the probability that H₀ is true. A <b>type I error</b> rejects a true H₀ (a false alarm); a <b>type II error</b> keeps a false H₀ (a missed effect).</p>`,
          questions: [
            { q: "A test gives p = 0.03. Which statement is correct?",
              choices: ["If H₀ were true, data at least this extreme would appear about 3% of the time",
                "There's a 3% chance that H₀ is true", "There's a 97% chance the effect is real", "The effect is large"], answer: 0,
              explain: "The p-value is computed assuming H₀; it can't tell you the probability that H₀ itself is true." },
            { q: "What does this print?", predict: true, code: d`
                import math
                phi = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
                print(round(2 * (1 - phi(1.96)), 3), round(2 * (1 - phi(3)), 4))`,
              choices: ["0.05 0.0027", "0.025 0.0013", "0.95 0.9973", "0.05 0.003"], answer: 0,
              explain: "z = 1.96 sits exactly at the 5% threshold; z = 3 is much rarer." },
            { q: "A new potion truly works, but your small test gives p = 0.4 and you conclude \"no effect\". What kind of error is that?",
              choices: ["type II (a missed real effect)", "type I (a false alarm)", "no error: p &gt; 0.05", "a sampling bias"], answer: 0,
              explain: "Keeping a false H₀ is a type II error; small samples make it likely (low <b>power</b>)." },
            { q: "You test 20 useless potions, each at α = 0.05. About how many will look \"significant\" just by luck?",
              choices: ["about 1", "none", "about 5", "about 10"], answer: 0,
              explain: "20 × 0.05 = 1. Testing many things inflates false alarms: the <b>multiple comparisons</b> problem." },
            { q: "With a million customers, a change raises average spending by 0.01 gold, with p = 0.0001. What's the best conclusion?",
              choices: ["the effect is real but probably too small to matter", "it's a huge success", "the test must be wrong", "p is too small to trust"], answer: 0,
              explain: "Statistical significance isn't practical importance. Huge samples detect tiny effects. Always look at the effect size too." },
          ],
        },
        {
          id: "st6-5", boss: true, time: 990, title: "The Potion Trial", packages: ["scipy"],
          story: "The Oracle tests a new healing potion against the old one. The verdict must be complete: significance AND size of the effect.",
          lesson: `<p>A full report states:</p>
            <ul><li>the <b>difference</b> in means, and a <b>p-value</b> (Welch's t-test)</li>
            <li>an <b>effect size</b>: Cohen's d = difference ÷ pooled standard deviation, where <code>pooled = √(((n₁−1)s₁² + (n₂−1)s₂²) / (n₁+n₂−2))</code>. Rough guide: 0.2 small, 0.5 medium, 0.8 large</li>
            <li>a second opinion from a method with fewer assumptions (a permutation test)</li></ul>`,
          example: d`
            import numpy as np

            old = np.array([20.0, 22, 19, 24, 21]); new = np.array([24.0, 25, 23, 27, 22])
            pooled = np.sqrt(((len(old) - 1) * old.var(ddof=1) + (len(new) - 1) * new.var(ddof=1)) / (len(old) + len(new) - 2))
            print((new.mean() - old.mean()) / pooled)`,
          task: `Write <code>trial_report(old, new, alpha=0.05, B=2000)</code> returning a dict:<br>
            • <code>"mean_diff"</code> (new − old) • <code>"t"</code>, <code>"p"</code> from Welch's test <code>ttest_ind(new, old, equal_var=False)</code><br>
            • <code>"significant"</code> (p &lt; alpha) • <code>"cohen_d"</code> (mean_diff ÷ pooled std)<br>
            • <code>"effect"</code>: <code>"small"</code> if |d| &lt; 0.5, <code>"medium"</code> if &lt; 0.8, else <code>"large"</code><br>
            • <code>"perm_p"</code>: a permutation test exactly as in <i>Shuffle the Labels</i>, with <code>a = new</code>, <code>b = old</code>, seed 0 and <code>B</code> shuffles`,
          starter: d`
            from scipy import stats
            import numpy as np

            def trial_report(old, new, alpha=0.05, B=2000):
                old, new = np.asarray(old, dtype=float), np.asarray(new, dtype=float)
                return {"mean_diff": new.mean() - old.mean()}
            `,
          solution: d`
            from scipy import stats
            import numpy as np

            def perm_test(a, b, B, seed):
                rng = np.random.default_rng(seed)
                pooled = np.concatenate([a, b])
                obs, k, hits = abs(a.mean() - b.mean()), len(a), 0
                for _ in range(B):
                    p = rng.permutation(pooled)
                    hits += abs(p[:k].mean() - p[k:].mean()) >= obs - 1e-12
                return hits / B

            def trial_report(old, new, alpha=0.05, B=2000):
                old, new = np.asarray(old, dtype=float), np.asarray(new, dtype=float)
                diff = new.mean() - old.mean()
                r = stats.ttest_ind(new, old, equal_var=False)
                n1, n2 = len(new), len(old)
                pooled = np.sqrt(((n1 - 1) * new.var(ddof=1) + (n2 - 1) * old.var(ddof=1)) / (n1 + n2 - 2))
                d = diff / pooled
                return {
                    "mean_diff": float(diff), "t": float(r.statistic), "p": float(r.pvalue),
                    "significant": bool(r.pvalue < alpha), "cohen_d": float(d),
                    "effect": "small" if abs(d) < 0.5 else "medium" if abs(d) < 0.8 else "large",
                    "perm_p": perm_test(new, old, B, 0),
                }`,
          hints: ["Welch: stats.ttest_ind(new, old, equal_var=False)", "pooled = sqrt(((n1 - 1) * s1² + (n2 - 1) * s2²) / (n1 + n2 - 2)) with var(ddof=1)", "Reuse your permutation test from the previous mission (copy it in)"],
          tests: [{ code: d`
            from scipy import stats
            import numpy as np
            tr = expect_func("trial_report")
            def ref(old, new, alpha=0.05, B=2000):
                diff = new.mean() - old.mean(); r = stats.ttest_ind(new, old, equal_var=False); n1, n2 = len(new), len(old)
                pooled = np.sqrt(((n1 - 1) * new.var(ddof=1) + (n2 - 1) * old.var(ddof=1)) / (n1 + n2 - 2)); d = diff / pooled
                rng = np.random.default_rng(0); pool = np.concatenate([new, old]); obs = abs(diff); h = 0
                for _ in range(B):
                    p = rng.permutation(pool); h += abs(p[:n1].mean() - p[n1:].mean()) >= obs - 1e-12
                return {"mean_diff": diff, "t": r.statistic, "p": r.pvalue, "significant": bool(r.pvalue < alpha), "cohen_d": d,
                        "effect": "small" if abs(d) < 0.5 else "medium" if abs(d) < 0.8 else "large", "perm_p": h / B}
            rng = np.random.default_rng(5)
            cases = [("a strong potion", rng.normal(20, 3, 25), rng.normal(23, 3, 25)),
                     ("a useless potion", rng.normal(20, 3, 20), rng.normal(20.3, 3, 20)),
                     ("a modest potion", rng.normal(20, 4, 40), rng.normal(22, 4, 40))]
            for label, old, new in cases:
                got, want = tr(old, new, B=800), ref(old, new, B=800)
                expect_equal((got.get("significant"), got.get("effect")), (want["significant"], want["effect"]), label + ": significant, effect")
                expect_close({k: got.get(k) for k in ("mean_diff", "t", "p", "cohen_d", "perm_p")}, {k: want[k] for k in ("mean_diff", "t", "p", "cohen_d", "perm_p")}, label + ": numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "The Two Potions", topic: "A/B testing: two proportions, chi-square, lift & sample size", time: 660, icon: "🧪",
      intro: "Two versions of a potion, two versions of a shop sign, two versions of a web page: which one works better? This is A/B testing, statistics' busiest job.",
      missions: [
        {
          id: "st7-1", title: "Two Proportions",
          story: "Shop sign A brought 120 buyers from 2,400 passers-by; sign B brought 156 from 2,400. Is B really better?",
          lesson: `<p>Compare two <b>conversion rates</b> pA = xA/nA and pB = xB/nB with a <b>two-proportion z-test</b>:</p>
            <ol><li>Under H₀ (no difference), both share one rate: the pooled <code>p = (xA + xB) / (nA + nB)</code></li>
            <li><code>SE = √(p(1 − p)(1/nA + 1/nB))</code></li>
            <li><code>z = (pB − pA) / SE</code>; two-sided p-value = 2 × (1 − Φ(|z|))</li></ol>`,
          example: d`
            import math

            xa, na, xb, nb = 120, 2400, 156, 2400
            p = (xa + xb) / (na + nb)
            se = math.sqrt(p * (1 - p) * (1 / na + 1 / nb))
            print(xa / na, xb / nb, round((xb / nb - xa / na) / se, 3))`,
          task: `Write <code>ab_test(xa, na, xb, nb)</code> returning a dict: <code>"pa"</code>, <code>"pb"</code>, <code>"diff"</code> (pb − pa), <code>"z"</code> and <code>"p"</code> (two-sided), using the pooled standard error.`,
          starter: d`
            import math

            def ab_test(xa, na, xb, nb):
                pa, pb = xa / na, xb / nb
                return {"pa": pa, "pb": pb}
            `,
          solution: d`
            import math

            def ab_test(xa, na, xb, nb):
                pa, pb = xa / na, xb / nb
                p = (xa + xb) / (na + nb)
                se = math.sqrt(p * (1 - p) * (1 / na + 1 / nb))
                z = (pb - pa) / se
                phi = 0.5 * (1 + math.erf(abs(z) / math.sqrt(2)))
                return {"pa": pa, "pb": pb, "diff": pb - pa, "z": z, "p": 2 * (1 - phi)}`,
          hints: ["Pooled p = (xa + xb) / (na + nb)", "se = sqrt(p * (1 - p) * (1 / na + 1 / nb)); z = (pb - pa) / se", "p = 2 * (1 - Φ(|z|))"],
          tests: [{ code: d`
            import math
            ab = expect_func("ab_test")
            def ref(xa, na, xb, nb):
                pa, pb = xa / na, xb / nb; p = (xa + xb) / (na + nb); se = math.sqrt(p * (1 - p) * (1 / na + 1 / nb)); z = (pb - pa) / se
                return {"pa": pa, "pb": pb, "diff": pb - pa, "z": z, "p": 2 * (1 - 0.5 * (1 + math.erf(abs(z) / math.sqrt(2))))}
            for args in [(120, 2400, 156, 2400), (50, 1000, 48, 1000), (300, 5000, 240, 4000)]:
                expect_close(ab(*args), ref(*args), "ab_test" + str(args))` }],
        },
        {
          id: "st7-2", title: "The Chi-Square Table", packages: ["scipy"],
          story: "With three shop signs, or more outcomes than buy/don't buy, the potion-sellers need a test for whole tables.",
          lesson: `<p>The <b>chi-square test of independence</b> asks whether the rows and columns of a count table are related.</p>
            <ol><li><b>Expected</b> count of each cell if there's no relation: <code>row total × column total ÷ grand total</code></li>
            <li><code>χ² = Σ (observed − expected)² / expected</code></li>
            <li>Compare with the chi-square distribution with <code>(rows − 1)(cols − 1)</code> degrees of freedom</li></ol>
            <p><code>scipy.stats.chi2_contingency(table, correction=False)</code> returns <code>(chi2, p, dof, expected)</code>. For a 2 × 2 table, χ² equals the two-proportion z²!</p>`,
          example: d`
            import numpy as np

            t = np.array([[120, 2280], [156, 2244]])
            expected = t.sum(axis=1, keepdims=True) * t.sum(axis=0) / t.sum()
            print(expected)
            print(((t - expected) ** 2 / expected).sum())`,
          task: `<code>table</code> is a 2-D NumPy array of counts. Write:<br>• <code>expected_counts(table)</code> → the expected counts (same shape)<br>
            • <code>chi2_stat(table)</code> → χ² computed by hand<br>• <code>dof(table)</code> → (rows − 1) × (cols − 1)<br>
            • <code>chi2_p(table)</code> → the p-value from <code>scipy.stats.chi2_contingency(table, correction=False)</code>`,
          starter: d`
            import numpy as np
            from scipy import stats

            def expected_counts(table):
                pass

            def chi2_stat(table):
                pass

            def dof(table):
                pass

            def chi2_p(table):
                pass
            `,
          solution: d`
            import numpy as np
            from scipy import stats

            def expected_counts(table):
                t = np.asarray(table, dtype=float)
                return t.sum(axis=1, keepdims=True) * t.sum(axis=0) / t.sum()

            def chi2_stat(table):
                t = np.asarray(table, dtype=float)
                e = expected_counts(t)
                return float(((t - e) ** 2 / e).sum())

            def dof(table):
                r, c = np.asarray(table).shape
                return (r - 1) * (c - 1)

            def chi2_p(table):
                return float(stats.chi2_contingency(table, correction=False)[1])`,
          hints: ["expected: t.sum(axis=1, keepdims=True) * t.sum(axis=0) / t.sum() (broadcasting!)", "chi2: ((t - e) ** 2 / e).sum()", "chi2_p: stats.chi2_contingency(table, correction=False)[1]"],
          tests: [{ code: d`
            import numpy as np, math
            from scipy import stats
            ec = expect_func("expected_counts"); cs = expect_func("chi2_stat"); df_ = expect_func("dof"); cp = expect_func("chi2_p")
            t = np.array([[120, 2280], [156, 2244]])
            r = stats.chi2_contingency(t, correction=False)
            expect_array(ec(t), r[3], "expected_counts(2x2)")
            expect_close(cs(t), r[0], "chi2_stat(2x2)")
            expect_equal(df_(t), 1, "dof(2x2)")
            expect_close(cp(t), r[1], "chi2_p(2x2)")
            u = np.array([[30, 45, 25], [20, 30, 50]])
            r = stats.chi2_contingency(u, correction=False)
            expect_close(cs(u), r[0], "chi2_stat(2x3)"); expect_equal(df_(u), 2, "dof(2x3)"); expect_close(cp(u), r[1], "chi2_p(2x3)")
            pa, pb = 120 / 2400, 156 / 2400; p = 276 / 4800; z = (pb - pa) / math.sqrt(p * (1 - p) * (2 / 2400))
            expect_close(cs(t), z ** 2, "for a 2x2 table, chi-square equals z squared")` }],
        },
        {
          id: "st7-3", title: "How Many Visitors?",
          story: "Before testing a new sign, the merchant asks: how many passers-by do we need, and how many days will it take?",
          lesson: `<p>Planning an A/B test:</p>
            <ul><li><b>Lift</b>: the relative improvement, <code>(pB − pA) / pA × 100</code>%</li>
            <li><b>Sample size per group</b> to detect a change from p₁ to p₂ with 95% confidence and 80% <b>power</b> (an 80% chance of noticing a real effect):<br>
            <code>n = (z_α/2 + z_β)² × (p₁(1 − p₁) + p₂(1 − p₂)) / (p₁ − p₂)²</code> with z_α/2 = 1.96 and z_β = 0.8416, rounded up</li>
            <li>Small effects need <b>huge</b> samples: halving the effect roughly quadruples n</li></ul>`,
          example: d`
            import math

            p1, p2 = 0.05, 0.06
            n = (1.96 + 0.8416) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (p1 - p2) ** 2
            print(math.ceil(n), "visitors per sign")`,
          task: `Write:<br>• <code>lift(pa, pb)</code> → the relative lift in percent<br>
            • <code>sample_size(p1, p2, z_alpha=1.96, z_beta=0.8416)</code> → visitors needed <b>per group</b> (rounded up)<br>
            • <code>days_needed(p1, p2, daily_visitors)</code> → days to collect both groups (2 × sample_size) at <code>daily_visitors</code> per day, rounded up`,
          starter: d`
            import math

            def lift(pa, pb):
                return pb - pa

            def sample_size(p1, p2, z_alpha=1.96, z_beta=0.8416):
                pass

            def days_needed(p1, p2, daily_visitors):
                pass
            `,
          solution: d`
            import math

            def lift(pa, pb):
                return (pb - pa) / pa * 100

            def sample_size(p1, p2, z_alpha=1.96, z_beta=0.8416):
                n = (z_alpha + z_beta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (p1 - p2) ** 2
                return math.ceil(n)

            def days_needed(p1, p2, daily_visitors):
                return math.ceil(2 * sample_size(p1, p2) / daily_visitors)`,
          hints: ["lift: (pb - pa) / pa * 100", "sample_size: the formula from the lesson, then math.ceil", "days: math.ceil(2 * n / daily_visitors)"],
          tests: [{ code: d`
            import math
            li = expect_func("lift"); ss = expect_func("sample_size"); dn = expect_func("days_needed")
            expect_close(li(0.05, 0.065), 30.0, "lift(0.05, 0.065)")
            expect_close(li(0.2, 0.18), -10.0, "lift(0.2, 0.18)")
            def n_ref(p1, p2, za=1.96, zb=0.8416):
                return math.ceil((za + zb) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (p1 - p2) ** 2)
            expect_equal(ss(0.05, 0.06), n_ref(0.05, 0.06), "sample_size(0.05, 0.06)")
            expect_equal(ss(0.05, 0.10), n_ref(0.05, 0.10), "sample_size(0.05, 0.10)")
            expect_equal(ss(0.3, 0.35, z_alpha=2.576), n_ref(0.3, 0.35, 2.576), "sample_size(0.3, 0.35, z_alpha=2.576)")
            expect_equal(dn(0.05, 0.06, 1000), math.ceil(2 * n_ref(0.05, 0.06) / 1000), "days_needed(0.05, 0.06, 1000)")
            assert ss(0.05, 0.055) > 3 * ss(0.05, 0.06), "Halving the effect should need several times more visitors."` }],
        },
        {
          id: "st7-4", type: "quiz", title: "Riddles of the Experiment",
          story: "The merchant guild's riddles about experiments: the mistakes that cost real gold.",
          lesson: `<p>Good A/B tests: decide the sample size in advance, randomise who sees what, don't stop early just because the result looks good ("peeking"), and judge both statistical and practical significance.</p>`,
          questions: [
            { q: "A merchant checks his A/B test every morning and stops it the first day p &lt; 0.05. What's the problem?",
              choices: ["checking repeatedly makes a false \"win\" much more likely than 5%", "nothing: stopping early saves money", "p-values can't be computed daily", "the test would need fewer visitors"], answer: 0,
              explain: "Every peek is another chance for luck to cross the line. This \"peeking\" inflates false positives; fix the sample size in advance." },
            { q: "Sign B is shown only in the rich district, sign A in the poor one. B sells more. Can we conclude B is the better sign?",
              choices: ["no: the district is a confounder; visitors must be assigned randomly", "yes, the numbers prove it", "yes, if p &lt; 0.05", "only if the lift is above 10%"], answer: 0,
              explain: "Randomisation is what makes the groups comparable. Without it, any difference could come from the districts." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                t = np.array([[10, 30], [20, 40]])
                print(t.sum(axis=1, keepdims=True) * t.sum(axis=0) / t.sum())`,
              choices: ["[[12. 28.]\n [18. 42.]]", "[[10. 30.]\n [20. 40.]]", "[[15. 35.]\n [15. 35.]]", "[[30. 70.]\n [30. 70.]]"], answer: 0,
              explain: "Row 0 has 40 of the 100 items and column 0 has 30, so the expected count is 40 × 30 / 100 = 12." },
            { q: "A new layout lifts sales by 0.1% with p = 0.001, but costs 5,000 gold to build. What should you check before shipping it?",
              choices: ["whether the gain is worth the cost (practical significance)", "nothing: p &lt; 0.05", "the chi-square statistic", "whether p is below 0.0001"], answer: 0,
              explain: "Significance says the effect is probably real, not that it's worth it." },
            { q: "Your test needs 8,000 visitors per sign but you only get 500 a day in total. What happens if you run it for just 3 days?",
              choices: ["it's underpowered: likely to miss a real effect", "it's still fine", "it gives more false positives", "the lift becomes larger"], answer: 0,
              explain: "Too small a sample means low power: real improvements look like noise (type II errors)." },
          ],
        },
        {
          id: "st7-5", boss: true, time: 990, title: "The Merchant's Experiment", packages: ["scipy"],
          story: "The merchant ran his experiment properly: random visitors, fixed size. Now he wants a decision he can bet his shop on.",
          lesson: `<p>Real experiment data often arrives as one row per visitor: did they buy (0/1), and how much did they spend? Count conversions with <code>clicks.sum()</code>.</p>
            <p>Check a result two ways (z-test and chi-square should agree), and look at a second metric (revenue per visitor, with Welch's t-test) before deciding.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(0)
            a = rng.random(1000) < 0.05
            print(a.sum(), a.mean())`,
          task: `<code>clicks_a</code>, <code>clicks_b</code> are 0/1 arrays (one per visitor); <code>rev_a</code>, <code>rev_b</code> are each visitor's spending. Write <code>experiment_report(clicks_a, clicks_b, rev_a, rev_b)</code> returning a dict:<br>
            <code>"conv_a"</code>, <code>"conv_b"</code> (conversion rates), <code>"lift_pct"</code>, <code>"z"</code>, <code>"p_z"</code> (pooled two-proportion test), <code>"p_chi2"</code> (from <code>chi2_contingency</code> on the 2 × 2 table [[buyers A, non-buyers A], [buyers B, non-buyers B]], <code>correction=False</code>), <code>"p_revenue"</code> (Welch's t-test of rev_b vs rev_a) and <code>"decision"</code>:
            <code>"ship B"</code> if p_z &lt; 0.05 and B converts better, <code>"keep A"</code> if p_z &lt; 0.05 and A is better, otherwise <code>"keep testing"</code>.`,
          starter: d`
            import math
            import numpy as np
            from scipy import stats

            def experiment_report(clicks_a, clicks_b, rev_a, rev_b):
                pass
            `,
          solution: d`
            import math
            import numpy as np
            from scipy import stats

            def experiment_report(clicks_a, clicks_b, rev_a, rev_b):
                ca, cb = np.asarray(clicks_a), np.asarray(clicks_b)
                xa, na, xb, nb = int(ca.sum()), len(ca), int(cb.sum()), len(cb)
                pa, pb = xa / na, xb / nb
                p = (xa + xb) / (na + nb)
                z = (pb - pa) / math.sqrt(p * (1 - p) * (1 / na + 1 / nb))
                p_z = 2 * (1 - 0.5 * (1 + math.erf(abs(z) / math.sqrt(2))))
                table = np.array([[xa, na - xa], [xb, nb - xb]])
                p_chi2 = float(stats.chi2_contingency(table, correction=False)[1])
                p_rev = float(stats.ttest_ind(rev_b, rev_a, equal_var=False).pvalue)
                decision = "keep testing" if p_z >= 0.05 else ("ship B" if pb > pa else "keep A")
                return {"conv_a": pa, "conv_b": pb, "lift_pct": (pb - pa) / pa * 100, "z": z, "p_z": p_z,
                        "p_chi2": p_chi2, "p_revenue": p_rev, "decision": decision}`,
          hints: ["Buyers: clicks.sum(); visitors: len(clicks)", "z-test as in Two Proportions; the table is [[xa, na - xa], [xb, nb - xb]]", "revenue: stats.ttest_ind(rev_b, rev_a, equal_var=False).pvalue", "p_z and p_chi2 should be (almost) equal: a good self-check"],
          tests: [{ code: d`
            import math, numpy as np
            from scipy import stats
            er = expect_func("experiment_report")
            def ref(ca, cb, ra, rb):
                xa, na, xb, nb = int(ca.sum()), len(ca), int(cb.sum()), len(cb); pa, pb = xa / na, xb / nb; p = (xa + xb) / (na + nb)
                z = (pb - pa) / math.sqrt(p * (1 - p) * (1 / na + 1 / nb)); pz = 2 * (1 - 0.5 * (1 + math.erf(abs(z) / math.sqrt(2))))
                pc = stats.chi2_contingency(np.array([[xa, na - xa], [xb, nb - xb]]), correction=False)[1]
                pr = stats.ttest_ind(rb, ra, equal_var=False).pvalue
                return {"conv_a": pa, "conv_b": pb, "lift_pct": (pb - pa) / pa * 100, "z": z, "p_z": pz, "p_chi2": pc, "p_revenue": pr,
                        "decision": "keep testing" if pz >= 0.05 else ("ship B" if pb > pa else "keep A")}
            rng = np.random.default_rng(11)
            for label, (ra_, rb_) in [("B much better", (0.05, 0.075)), ("no real difference", (0.06, 0.061)), ("B worse", (0.08, 0.055))]:
                ca = (rng.random(4000) < ra_).astype(int); cb = (rng.random(4000) < rb_).astype(int)
                va = ca * rng.gamma(2, 15, 4000); vb = cb * rng.gamma(2, 16, 4000)
                got, want = er(ca, cb, va, vb), ref(ca, cb, va, vb)
                expect_equal(got.get("decision"), want["decision"], label + ": decision")
                expect_close({k: got.get(k) for k in want if k != "decision"}, {k: v for k, v in want.items() if k != "decision"}, label + ": numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 8, name: "The Bonds Between", topic: "covariance, correlation, Spearman, Simpson's paradox & confounders", time: 600, icon: "🔗",
      intro: "Some things rise and fall together. The Oracle can measure the bond, but she warns: a bond is not a cause.",
      missions: [
        {
          id: "st8-1", title: "Moving Together",
          story: "Do heroes who train longer win more duels? Measure how strongly the two move together.",
          lesson: `<ul><li><b>Covariance</b>: <code>Σ(x − x̄)(y − ȳ) / (n − 1)</code>. Positive when x and y tend to be above (or below) their means together. Its size depends on the units</li>
            <li><b>Pearson correlation</b> r = covariance ÷ (s_x × s_y): always between −1 and 1, unitless. ±1 = a perfect straight line; 0 = no straight-line relation</li>
            <li><b>r²</b> is the share of the variation in y that a straight line on x can explain</li></ul>`,
          example: d`
            import numpy as np

            hours = np.array([2.0, 4, 5, 7, 9]); wins = np.array([1.0, 3, 3, 6, 8])
            cov = ((hours - hours.mean()) * (wins - wins.mean())).sum() / (len(hours) - 1)
            r = cov / (hours.std(ddof=1) * wins.std(ddof=1))
            print(cov, r, np.corrcoef(hours, wins)[0, 1])`,
          task: `Write, without <code>np.corrcoef</code> or <code>np.cov</code>:<br>• <code>covariance(x, y)</code> → the sample covariance (n − 1)<br>
            • <code>pearson(x, y)</code> → the correlation r<br>• <code>r_squared(x, y)</code> → r²`,
          starter: d`
            import numpy as np

            def covariance(x, y):
                pass

            def pearson(x, y):
                return float(np.corrcoef(x, y)[0, 1])

            def r_squared(x, y):
                pass
            `,
          solution: d`
            import numpy as np

            def covariance(x, y):
                x, y = np.asarray(x, dtype=float), np.asarray(y, dtype=float)
                return float(((x - x.mean()) * (y - y.mean())).sum() / (len(x) - 1))

            def pearson(x, y):
                x, y = np.asarray(x, dtype=float), np.asarray(y, dtype=float)
                return covariance(x, y) / (x.std(ddof=1) * y.std(ddof=1))

            def r_squared(x, y):
                return pearson(x, y) ** 2`,
          hints: ["covariance: ((x - x.mean()) * (y - y.mean())).sum() / (n - 1)", "pearson: covariance / (x.std(ddof=1) * y.std(ddof=1))", "r_squared = pearson ** 2"],
          tests: [{ code: d`
            import numpy as np
            must_not_call("corrcoef"); must_not_call("cov")
            cv = expect_func("covariance"); pe = expect_func("pearson"); r2 = expect_func("r_squared")
            rng = np.random.default_rng(0)
            x = rng.normal(5, 2, 50); y = 2 * x + rng.normal(0, 3, 50)
            expect_close(cv(x, y), ((x - x.mean()) * (y - y.mean())).sum() / 49, "covariance(x, y)")
            ref = ((x - x.mean()) * (y - y.mean())).sum() / np.sqrt(((x - x.mean()) ** 2).sum() * ((y - y.mean()) ** 2).sum())
            expect_close(pe(x, y), ref, "pearson(x, y)")
            expect_close(pe([1, 2, 3], [3, 2, 1]), -1.0, "pearson of a perfect downward line")
            expect_close(r2(x, y), ref ** 2, "r_squared(x, y)")` }],
        },
        {
          id: "st8-2", title: "Ranks Tell the Truth",
          story: "One giant hero with absurd numbers ruins the Pearson correlation. The Oracle trusts ranks instead.",
          lesson: `<p><b>Spearman's correlation</b> is Pearson's correlation computed on the <b>ranks</b> (1 = smallest) instead of the values. It measures any <b>monotonic</b> relation (always rising or always falling, not necessarily a straight line) and resists outliers.</p>
            <p>Beware: a <b>single</b> extreme point can make the Pearson correlation look strong even when every other point goes the opposite way. Spearman is not fooled. Always plot your data!</p>
            <p><b>Ties</b> share the average of their ranks: values [10, 20, 20, 30] get ranks [1, 2.5, 2.5, 4].</p>`,
          example: d`
            import numpy as np

            a = np.array([10, 30, 20, 20])
            order = np.argsort(a, kind="stable")
            r = np.empty(len(a)); r[order] = np.arange(1, len(a) + 1)
            print(r)           # ties not averaged yet: 1, 4, 2, 3
            vals, inv = np.unique(a, return_inverse=True)
            print((np.bincount(inv, weights=r) / np.bincount(inv))[inv])`,
          task: `Write:<br>• <code>ranks(a)</code> → a float array of ranks starting at 1, ties getting their average rank<br>
            • <code>spearman(x, y)</code> → Pearson's correlation of the ranks (you may use <code>np.corrcoef</code> here)<br>
            • <code>outlier_effect(x, y)</code> → a tuple <code>(pearson, spearman)</code> for the raw data`,
          starter: d`
            import numpy as np

            def ranks(a):
                return np.argsort(a) + 1

            def spearman(x, y):
                pass

            def outlier_effect(x, y):
                pass
            `,
          solution: d`
            import numpy as np

            def ranks(a):
                a = np.asarray(a)
                order = np.argsort(a, kind="stable")
                r = np.empty(len(a))
                r[order] = np.arange(1, len(a) + 1)
                vals, inv = np.unique(a, return_inverse=True)
                return (np.bincount(inv, weights=r) / np.bincount(inv))[inv]

            def spearman(x, y):
                return float(np.corrcoef(ranks(x), ranks(y))[0, 1])

            def outlier_effect(x, y):
                return (float(np.corrcoef(x, y)[0, 1]), spearman(x, y))`,
          hints: ["Position-based ranks: r[np.argsort(a)] = 1, 2, 3, …", "Average ties: vals, inv = np.unique(a, return_inverse=True); (np.bincount(inv, weights=r) / np.bincount(inv))[inv]", "spearman: np.corrcoef(ranks(x), ranks(y))[0, 1]"],
          tests: [{ code: d`
            import numpy as np
            rk = expect_func("ranks"); sp = expect_func("spearman"); oe = expect_func("outlier_effect")
            expect_array(np.asarray(rk([10, 20, 20, 30]), dtype=float), [1, 2.5, 2.5, 4], "ranks([10 20 20 30])")
            expect_array(np.asarray(rk([3.5, 1.0, 2.2]), dtype=float), [3, 1, 2], "ranks([3.5 1.0 2.2])")
            expect_array(np.asarray(rk([5, 5, 5]), dtype=float), [2, 2, 2], "ranks of identical values")
            x = np.arange(1, 11, dtype=float); y = x ** 3
            expect_close(sp(x, y), 1.0, "spearman of a curved but always-rising relation")
            xo = np.array([1.0, 2, 3, 4, 5, 6, 7, 8, 9, 50]); yo = np.array([9.0, 8, 7, 6, 5, 4, 3, 2, 1, 60])
            p, s = oe(xo, yo)
            expect_close((p, s), (np.corrcoef(xo, yo)[0, 1], np.corrcoef(rk(xo), rk(yo))[0, 1]), "outlier_effect: nine falling points plus one extreme point")
            assert p > 0.9 and s < 0, "One extreme point makes Pearson look strongly positive, while Spearman still sees the downward trend."` }],
        },
        {
          id: "st8-3", title: "Simpson's Riddle",
          story: "Healer A cures more patients than healer B in easy cases AND in hard cases. Yet overall, B cures more. How can both be true?",
          lesson: `<p><b>Simpson's paradox</b>: a trend that appears in every group can reverse when the groups are combined. It happens when the groups have very different sizes. Here, healer A takes most of the hard cases, which drags A's overall rate down.</p>
            <p>Lesson: always ask whether a <b>third variable</b> (case difficulty) is hiding behind a comparison.</p>`,
          example: d`
            import numpy as np

            healer = np.array(["A", "A", "B", "B", "B"])
            hard = np.array([True, True, False, False, True])
            cured = np.array([1, 0, 1, 1, 0])
            print(cured[healer == "A"].mean(), cured[(healer == "A") & hard].mean())`,
          task: `<code>group</code>, <code>healer</code> and <code>cured</code> are equal-length arrays (one entry per patient; cured is 0/1). Write:<br>
            • <code>overall_rate(healer, cured, h)</code> → healer <code>h</code>'s cure rate over all patients<br>
            • <code>group_rate(group, healer, cured, g, h)</code> → healer <code>h</code>'s cure rate within group <code>g</code><br>
            • <code>is_simpson(group, healer, cured, h1, h2)</code> → <code>True</code> if <code>h1</code> has a higher rate than <code>h2</code> in <b>every</b> group but a lower rate overall`,
          starter: d`
            import numpy as np

            def overall_rate(healer, cured, h):
                pass

            def group_rate(group, healer, cured, g, h):
                pass

            def is_simpson(group, healer, cured, h1, h2):
                pass
            `,
          solution: d`
            import numpy as np

            def overall_rate(healer, cured, h):
                return float(np.asarray(cured)[np.asarray(healer) == h].mean())

            def group_rate(group, healer, cured, g, h):
                m = (np.asarray(group) == g) & (np.asarray(healer) == h)
                return float(np.asarray(cured)[m].mean())

            def is_simpson(group, healer, cured, h1, h2):
                groups = np.unique(group)
                better_everywhere = all(group_rate(group, healer, cured, g, h1) > group_rate(group, healer, cured, g, h2) for g in groups)
                return bool(better_everywhere and overall_rate(healer, cured, h1) < overall_rate(healer, cured, h2))`,
          hints: ["overall_rate: cured[healer == h].mean()", "group_rate: combine two masks with &", "is_simpson: h1 wins in every group (np.unique(group)), but loses overall"],
          tests: [{ code: d`
            import numpy as np
            orr = expect_func("overall_rate"); gr = expect_func("group_rate"); si = expect_func("is_simpson")
            def make(rows):
                g, h, c = [], [], []
                for grp, hl, n_cured, n_total in rows:
                    g += [grp] * n_total; h += [hl] * n_total; c += [1] * n_cured + [0] * (n_total - n_cured)
                return np.array(g), np.array(h), np.array(c)
            g, h, c = make([("easy", "A", 81, 87), ("hard", "A", 192, 263), ("easy", "B", 234, 270), ("hard", "B", 55, 80)])
            expect_close(orr(h, c, "A"), 273 / 350, "overall_rate(A)")
            expect_close(orr(h, c, "B"), 289 / 350, "overall_rate(B)")
            expect_close(gr(g, h, c, "hard", "A"), 192 / 263, "group_rate(hard, A)")
            expect_equal(si(g, h, c, "A", "B"), True, "is_simpson(A, B) for the kidney-stone numbers")
            expect_equal(si(g, h, c, "B", "A"), False, "is_simpson(B, A)")
            g2, h2, c2 = make([("easy", "A", 90, 100), ("hard", "A", 60, 100), ("easy", "B", 80, 100), ("hard", "B", 50, 100)])
            expect_equal(si(g2, h2, c2, "A", "B"), False, "is_simpson when A is better everywhere AND overall")` }],
        },
        {
          id: "st8-4", type: "quiz", title: "Riddles of the Bonds",
          story: "The Oracle's riddles about correlation: the most misunderstood number in statistics.",
          lesson: `<p>Correlation measures how well a <b>straight line</b> describes the relation. Correlation is not causation; zero correlation doesn't mean "no relation" (only "no straight-line relation").</p>`,
          questions: [
            { q: "Towns with more temples have more crime. Which explanation is most likely?",
              choices: ["a third variable (population) drives both", "temples cause crime", "crime causes temple building", "it must be a coincidence"], answer: 0,
              explain: "Bigger towns have more of everything. This is a <b>confounder</b>." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                x = np.array([-3, -2, -1, 0, 1, 2, 3])
                print(round(np.corrcoef(x, x ** 2)[0, 1], 3), round(np.corrcoef(x, 2 * x + 1)[0, 1], 3))`,
              choices: ["0.0 1.0", "1.0 1.0", "0.5 1.0", "0.0 2.0"], answer: 0,
              explain: "y = x² is perfectly related to x but not in a straight line, so r = 0. Any straight line gives r = 1." },
            { q: "Which value is impossible for a correlation coefficient r?",
              choices: ["1.3", "−1", "0", "−0.02"], answer: 0,
              explain: "r always lies between −1 and 1." },
            { q: "r = 0.6 between study hours and exam scores. What share of the variation in scores does a straight line on hours explain?",
              choices: ["36%", "60%", "6%", "0.6%"], answer: 0,
              explain: "r² = 0.36." },
            { q: "Ice-cream sales and drownings are strongly correlated. What should you do before concluding anything?",
              choices: ["look for a confounder, like hot weather, and control for it", "ban ice cream", "compute Spearman instead", "collect fewer data points"], answer: 0,
              explain: "Heat drives both. Controlling for temperature makes the link (almost) disappear: that's the next trial." },
          ],
        },
        {
          id: "st8-5", boss: true, time: 900, title: "The Ice Cream Mystery",
          story: "The coastal town's records show ice-cream sales and drownings rising together. The Oracle suspects the summer heat.",
          lesson: `<p>The <b>partial correlation</b> between x and y, controlling for z, measures what's left of their bond once z's influence is removed:</p>
            <p><code>r_xy·z = (r_xy − r_xz · r_yz) / √((1 − r_xz²)(1 − r_yz²))</code></p>
            <p>If a strong correlation drops close to 0 after controlling for z, z was probably a <b>confounder</b>.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(0)
            heat = rng.normal(25, 5, 100)
            a = heat + rng.normal(0, 2, 100); b = heat + rng.normal(0, 2, 100)
            r = lambda u, v: np.corrcoef(u, v)[0, 1]
            print(round(r(a, b), 2))`,
          task: `Write:<br>• <code>partial_corr(x, y, z)</code> → the partial correlation of x and y controlling for z<br>
            • <code>confounder_report(ice, drown, temp)</code> → a dict: <code>"r"</code> (Pearson r of ice and drown), <code>"r_partial"</code> (controlling for temp), <code>"r_ice_temp"</code>, <code>"r_drown_temp"</code> and <code>"verdict"</code>: <code>"confounded"</code> if |r| &gt; 0.5 and |r_partial| &lt; 0.3, <code>"real link"</code> if |r_partial| ≥ 0.3, otherwise <code>"weak"</code>`,
          starter: d`
            import numpy as np

            def partial_corr(x, y, z):
                pass

            def confounder_report(ice, drown, temp):
                pass
            `,
          solution: d`
            import numpy as np

            def _r(u, v):
                return float(np.corrcoef(u, v)[0, 1])

            def partial_corr(x, y, z):
                rxy, rxz, ryz = _r(x, y), _r(x, z), _r(y, z)
                return (rxy - rxz * ryz) / np.sqrt((1 - rxz ** 2) * (1 - ryz ** 2))

            def confounder_report(ice, drown, temp):
                r, rp = _r(ice, drown), float(partial_corr(ice, drown, temp))
                if abs(rp) >= 0.3:
                    verdict = "real link"
                elif abs(r) > 0.5:
                    verdict = "confounded"
                else:
                    verdict = "weak"
                return {"r": r, "r_partial": rp, "r_ice_temp": _r(ice, temp), "r_drown_temp": _r(drown, temp), "verdict": verdict}`,
          hints: ["A helper r(u, v) = np.corrcoef(u, v)[0, 1]", "partial: (rxy - rxz * ryz) / sqrt((1 - rxz²)(1 - ryz²))", "Check |r_partial| >= 0.3 first, then the confounded case"],
          tests: [{ code: d`
            import numpy as np
            pc = expect_func("partial_corr"); cr = expect_func("confounder_report")
            r = lambda u, v: np.corrcoef(u, v)[0, 1]
            def ref(x, y, z):
                rxy, rxz, ryz = r(x, y), r(x, z), r(y, z); rp = (rxy - rxz * ryz) / np.sqrt((1 - rxz ** 2) * (1 - ryz ** 2))
                v = "real link" if abs(rp) >= 0.3 else "confounded" if abs(rxy) > 0.5 else "weak"
                return {"r": rxy, "r_partial": rp, "r_ice_temp": rxz, "r_drown_temp": ryz, "verdict": v}
            rng = np.random.default_rng(3)
            temp = rng.normal(24, 6, 120)
            ice = 50 + 8 * temp + rng.normal(0, 20, 120)
            drown = 1 + 0.2 * temp + rng.normal(0, 0.6, 120)
            expect_close(pc(ice, drown, temp), ref(ice, drown, temp)["r_partial"], "partial_corr(ice, drown, temp)")
            for label, (x, y, z) in [("ice cream & drownings", (ice, drown, temp)),
                                     ("swimmers & drownings (a real link)", (temp * 3 + rng.normal(0, 4, 120), None, temp))]:
                if y is None:
                    y = 0.5 * x + rng.normal(0, 3, 120)
                got, want = cr(x, y, z), ref(x, y, z)
                expect_equal(got.get("verdict"), want["verdict"], label + ": verdict")
                expect_close({k: got.get(k) for k in ("r", "r_partial", "r_ice_temp", "r_drown_temp")}, {k: want[k] for k in ("r", "r_partial", "r_ice_temp", "r_drown_temp")}, label + ": numbers")
            expect_equal(cr(ice, drown, temp)["verdict"], "confounded", "the ice cream verdict")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 9
    {
      id: 9, name: "The Line of Best Fit", topic: "simple & multiple regression, residuals, R² & RMSE", time: 660, icon: "📈",
      intro: "Through any cloud of points the Oracle can draw one best line, and use it to predict what hasn't happened yet.",
      missions: [
        {
          id: "st9-1", title: "Draw the Line",
          story: "The harvest grows with the rain. Find the line that best predicts the harvest from the rainfall.",
          lesson: `<p><b>Simple linear regression</b> finds the line <code>ŷ = a + b·x</code> that minimises the sum of squared errors (<b>least squares</b>). The formulas:</p>
            <p><code>b = cov(x, y) / var(x)</code> and <code>a = ȳ − b·x̄</code></p>
            <p>The <b>slope</b> b: how much y changes, on average, when x increases by 1. The <b>residuals</b> <code>y − ŷ</code> are what the line doesn't explain; they always add up to 0.</p>`,
          example: d`
            import numpy as np

            rain = np.array([10.0, 20, 30, 40, 50]); harvest = np.array([25.0, 31, 42, 48, 61])
            b = ((rain - rain.mean()) * (harvest - harvest.mean())).sum() / ((rain - rain.mean()) ** 2).sum()
            a = harvest.mean() - b * rain.mean()
            print(round(a, 3), round(b, 3), np.polyfit(rain, harvest, 1))`,
          task: `Write, without <code>np.polyfit</code> or <code>lstsq</code>:<br>• <code>fit_line(x, y)</code> → a tuple <code>(intercept, slope)</code><br>
            • <code>predict(x, intercept, slope)</code> → the predicted values<br>• <code>residuals(x, y)</code> → y minus the predictions of the fitted line`,
          starter: d`
            import numpy as np

            def fit_line(x, y):
                return tuple(np.polyfit(x, y, 1)[::-1])

            def predict(x, intercept, slope):
                pass

            def residuals(x, y):
                pass
            `,
          solution: d`
            import numpy as np

            def fit_line(x, y):
                x, y = np.asarray(x, dtype=float), np.asarray(y, dtype=float)
                slope = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean()) ** 2).sum()
                return (float(y.mean() - slope * x.mean()), float(slope))

            def predict(x, intercept, slope):
                return intercept + slope * np.asarray(x, dtype=float)

            def residuals(x, y):
                a, b = fit_line(x, y)
                return np.asarray(y, dtype=float) - predict(x, a, b)`,
          hints: ["slope = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)²", "intercept = ȳ − slope · x̄", "residuals = y - predict(x, a, b)"],
          tests: [{ code: d`
            import numpy as np
            must_not_call("polyfit"); must_not_call("lstsq")
            fl = expect_func("fit_line"); pr = expect_func("predict"); rs = expect_func("residuals")
            rng = np.random.default_rng(0)
            x = rng.uniform(5, 60, 40); y = 18 + 0.8 * x + rng.normal(0, 4, 40)
            b = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean()) ** 2).sum(); a = y.mean() - b * x.mean()
            expect_close(fl(x, y), (a, b), "fit_line(rain, harvest)")
            expect_close(fl([0, 1, 2], [1, 3, 5]), (1.0, 2.0), "fit_line on a perfect line y = 1 + 2x")
            expect_array(np.asarray(pr(np.array([0.0, 10]), 2, 3)), [2, 32], "predict([0 10], 2, 3)")
            r = rs(x, y)
            expect_array(np.asarray(r), y - (a + b * x), "residuals(rain, harvest)")
            expect_close(float(np.sum(r)), 0.0, "residuals add up to (almost) zero", tol=1e-6)` }],
        },
        {
          id: "st9-2", title: "How Good Is the Fit?",
          story: "A line can always be drawn. The question is whether it's any good.",
          lesson: `<ul><li><b>R²</b> = 1 − SS_res / SS_tot, where SS_res = Σ(y − ŷ)² and SS_tot = Σ(y − ȳ)²: the share of the variation in y that the model explains (1 = perfect, 0 = no better than always predicting the mean)</li>
            <li><b>RMSE</b> = √(mean of squared errors): a typical prediction error, in y's units</li>
            <li><b>MAE</b> = mean of |errors|: less sensitive to a few big misses</li></ul>
            <p>For simple regression, R² equals Pearson's r².</p>`,
          example: d`
            import numpy as np

            y = np.array([3.0, 5, 7, 9]); yhat = np.array([2.5, 5.5, 7, 8.5])
            print(1 - ((y - yhat) ** 2).sum() / ((y - y.mean()) ** 2).sum())
            print(np.sqrt(((y - yhat) ** 2).mean()), np.abs(y - yhat).mean())`,
          task: `Write:<br>• <code>r2(y, yhat)</code> • <code>rmse(y, yhat)</code> • <code>mae(y, yhat)</code><br>
            • <code>fit_quality(x, y)</code> → fit a line with <code>np.polyfit(x, y, 1)</code> and return a dict <code>{"r2": …, "rmse": …, "mae": …}</code> of its predictions on the same data`,
          starter: d`
            import numpy as np

            def r2(y, yhat):
                pass

            def rmse(y, yhat):
                pass

            def mae(y, yhat):
                pass

            def fit_quality(x, y):
                pass
            `,
          solution: d`
            import numpy as np

            def r2(y, yhat):
                y, yhat = np.asarray(y, dtype=float), np.asarray(yhat, dtype=float)
                return float(1 - ((y - yhat) ** 2).sum() / ((y - y.mean()) ** 2).sum())

            def rmse(y, yhat):
                return float(np.sqrt(((np.asarray(y) - np.asarray(yhat)) ** 2).mean()))

            def mae(y, yhat):
                return float(np.abs(np.asarray(y) - np.asarray(yhat)).mean())

            def fit_quality(x, y):
                slope, intercept = np.polyfit(x, y, 1)
                yhat = intercept + slope * np.asarray(x)
                return {"r2": r2(y, yhat), "rmse": rmse(y, yhat), "mae": mae(y, yhat)}`,
          hints: ["r2: 1 - SS_res / SS_tot", "rmse: sqrt(mean((y - yhat) ** 2))", "np.polyfit(x, y, 1) returns (slope, intercept)"],
          tests: [{ code: d`
            import numpy as np
            R2 = expect_func("r2"); RM = expect_func("rmse"); MA = expect_func("mae"); fq = expect_func("fit_quality")
            y = np.array([3.0, 5, 7, 9]); yh = np.array([2.5, 5.5, 7, 8.5])
            expect_close(R2(y, yh), 1 - 0.75 / 20, "r2(y, yhat)"); expect_close(RM(y, yh), np.sqrt(0.75 / 4), "rmse(y, yhat)"); expect_close(MA(y, yh), 0.375, "mae(y, yhat)")
            expect_close(R2(y, np.full(4, 6.0)), 0.0, "r2 when always predicting the mean")
            rng = np.random.default_rng(2); x = rng.uniform(0, 10, 50); yy = 3 + 2 * x + rng.normal(0, 2, 50)
            q = fq(x, yy)
            expect_close(q.get("r2"), np.corrcoef(x, yy)[0, 1] ** 2, "for simple regression R² equals r²")
            s, i = np.polyfit(x, yy, 1)
            expect_close([q.get("rmse"), q.get("mae")], [np.sqrt(((yy - i - s * x) ** 2).mean()), np.abs(yy - i - s * x).mean()], "fit_quality rmse and mae")` }],
        },
        {
          id: "st9-3", title: "Many Causes",
          story: "The harvest depends on rain AND sun AND the soil. One line can't hold them all; a model with several inputs can.",
          lesson: `<p><b>Multiple regression</b>: <code>ŷ = b₀ + b₁x₁ + b₂x₂ + …</code>. Solve it with least squares on a table whose first column is all 1s (for b₀):</p>
            <p><code>np.linalg.lstsq(X1, y, rcond=None)[0]</code></p>
            <p>Each coefficient bᵢ is the expected change in y when xᵢ rises by 1 <b>and the other inputs stay the same</b>. That "holding the others fixed" is what makes multiple regression powerful, and what simple correlation can't do.</p>`,
          example: d`
            import numpy as np

            X = np.array([[1.0, 5], [2, 3], [3, 8], [4, 6]])
            y = np.array([10.0, 9, 18, 17])
            X1 = np.column_stack([np.ones(len(X)), X])
            print(np.linalg.lstsq(X1, y, rcond=None)[0])`,
          task: `Write:<br>• <code>fit_multi(X, y)</code> → the coefficient array <code>[b0, b1, …]</code> (intercept first) using least squares<br>
            • <code>predict_multi(coef, X)</code> → the predictions for the rows of X<br>
            • <code>effect_of(coef, names, name)</code> → the coefficient of the feature called <code>name</code> (<code>names</code> lists X's columns in order)`,
          starter: d`
            import numpy as np

            def fit_multi(X, y):
                pass

            def predict_multi(coef, X):
                pass

            def effect_of(coef, names, name):
                pass
            `,
          solution: d`
            import numpy as np

            def fit_multi(X, y):
                X1 = np.column_stack([np.ones(len(X)), X])
                return np.linalg.lstsq(X1, y, rcond=None)[0]

            def predict_multi(coef, X):
                return coef[0] + np.asarray(X) @ coef[1:]

            def effect_of(coef, names, name):
                return float(coef[1 + list(names).index(name)])`,
          hints: ["X1 = np.column_stack([np.ones(len(X)), X])", "predict: coef[0] + X @ coef[1:]", "effect_of: coef[1 + names.index(name)] (skip the intercept)"],
          tests: [{ code: d`
            import numpy as np
            fm = expect_func("fit_multi"); pm = expect_func("predict_multi"); eo = expect_func("effect_of")
            rng = np.random.default_rng(4)
            X = np.column_stack([rng.uniform(0, 100, 80), rng.uniform(0, 12, 80), rng.uniform(1, 5, 80)])
            y = 5 + 0.4 * X[:, 0] + 2.5 * X[:, 1] + 6 * X[:, 2] + rng.normal(0, 3, 80)
            ref = np.linalg.lstsq(np.column_stack([np.ones(80), X]), y, rcond=None)[0]
            c = fm(X, y)
            expect_array(np.asarray(c), ref, "fit_multi(rain, sun, soil)")
            expect_close(list(c)[1:], [0.4, 2.5, 6], "the slopes should be near the true ones (0.4, 2.5, 6)", tol=0.25)
            expect_array(np.asarray(pm(ref, X[:4])), ref[0] + X[:4] @ ref[1:], "predict_multi(coef, first 4 rows)")
            expect_close(eo(ref, ["rain", "sun", "soil"], "sun"), ref[2], 'effect_of(coef, names, "sun")')` }],
        },
        {
          id: "st9-4", type: "quiz", title: "Riddles of the Line",
          story: "The Oracle's riddles about lines: what they can say, and what they can't.",
          lesson: `<p>A regression slope is an average rate of change within the data you saw. Predicting far outside that range (<b>extrapolation</b>) is risky. A high R² shows a good fit, not a cause.</p>`,
          questions: [
            { q: "harvest = 18 + 0.8 × rain (rain in mm, harvest in sacks). What does 0.8 mean?",
              choices: ["each extra mm of rain goes with 0.8 more sacks on average", "80% of the harvest is caused by rain", "the correlation is 0.8", "the harvest is 0.8 sacks when there's no rain"], answer: 0,
              explain: "The slope is the average change in y per unit of x." },
            { q: "The model was fitted on rainfall between 10 and 60 mm. Someone uses it to predict the harvest at 400 mm. The problem?",
              choices: ["extrapolation: the straight-line pattern may not hold that far out (floods!)", "nothing, the formula works for any value", "the R² will drop", "the slope becomes negative"], answer: 0,
              explain: "A model only knows the range it has seen." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                x = np.array([0.0, 1, 2, 3]); y = np.array([1.0, 3, 5, 7])
                print(np.polyfit(x, y, 1).round(3))`,
              choices: ["[2. 1.]", "[1. 2.]", "[2. 0.]", "[0.5 1. ]"], answer: 0,
              explain: "y = 1 + 2x exactly; polyfit lists the slope first, then the intercept." },
            { q: "A model has R² = 0.92 for predicting crime from the number of temples. What can you conclude?",
              choices: ["temples predict crime well in this data, but that doesn't show that temples cause crime", "temples cause 92% of crime", "the model is useless", "building temples will reduce crime"], answer: 0,
              explain: "Prediction is not causation; town size is still lurking." },
            { q: "In a multiple regression of harvest on rain and sun, the rain coefficient is 0.4. What does it mean?",
              choices: ["+1 mm of rain → +0.4 sacks on average, with sunshine held fixed", "rain explains 40% of the harvest", "rain and sun are correlated at 0.4", "the harvest is 0.4 without rain"], answer: 0,
              explain: "Multiple-regression coefficients hold the other inputs constant." },
          ],
        },
        {
          id: "st9-5", boss: true, time: 990, title: "The Harvest Model",
          story: "The Oracle's harvest model must be tested honestly: trained on the past, judged on years it has never seen.",
          lesson: `<p>Measuring a model on the data it was fitted to is too optimistic. Hold back a <b>test set</b>: fit on the training rows, then judge R² and RMSE on the test rows. (This is the heart of machine learning, coming in the next realm.)</p>
            <p>Comparing a simple model (rain only) with a richer one (rain, sun, soil) on the <b>test</b> set shows whether the extra inputs really help.</p>`,
          example: d`
            import numpy as np

            n = 10
            k = int(n * 0.8)
            idx = np.arange(n)
            print(idx[:k], idx[k:])`,
          task: `<code>X</code> has columns rain, sun, soil; <code>y</code> is the harvest. Write <code>harvest_report(X, y)</code>:<br>
            the first 80% of rows (<code>k = int(len(y) * 0.8)</code>) are the training set, the rest the test set. Fit two least-squares models with intercepts on the training set: <b>simple</b> (rain only) and <b>full</b> (all three). Return a dict:<br>
            <code>"simple_r2"</code>, <code>"full_r2"</code>, <code>"simple_rmse"</code>, <code>"full_rmse"</code> (all on the <b>test</b> set), <code>"coef"</code> (the full model's coefficients as a list) and <code>"better"</code> (<code>"full"</code> if its test RMSE is lower, else <code>"simple"</code>).`,
          starter: d`
            import numpy as np

            def harvest_report(X, y):
                pass
            `,
          solution: d`
            import numpy as np

            def _fit(X, y):
                return np.linalg.lstsq(np.column_stack([np.ones(len(X)), X]), y, rcond=None)[0]

            def _pred(c, X):
                return c[0] + np.asarray(X) @ c[1:]

            def _scores(y, yhat):
                r2 = 1 - ((y - yhat) ** 2).sum() / ((y - y.mean()) ** 2).sum()
                return float(r2), float(np.sqrt(((y - yhat) ** 2).mean()))

            def harvest_report(X, y):
                X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
                k = int(len(y) * 0.8)
                Xtr, Xte, ytr, yte = X[:k], X[k:], y[:k], y[k:]
                cs = _fit(Xtr[:, :1], ytr)
                cf = _fit(Xtr, ytr)
                s_r2, s_rmse = _scores(yte, _pred(cs, Xte[:, :1]))
                f_r2, f_rmse = _scores(yte, _pred(cf, Xte))
                return {"simple_r2": s_r2, "full_r2": f_r2, "simple_rmse": s_rmse, "full_rmse": f_rmse,
                        "coef": cf.tolist(), "better": "full" if f_rmse < s_rmse else "simple"}`,
          hints: ["Split: X[:k], X[k:], y[:k], y[k:]", "Simple model: use X[:, :1] (rain only, still 2-D)", "Fit on the training part, score on the test part", "R² and RMSE as in How Good Is the Fit?"],
          tests: [{ code: d`
            import numpy as np
            hr = expect_func("harvest_report")
            def fit(X, y): return np.linalg.lstsq(np.column_stack([np.ones(len(X)), X]), y, rcond=None)[0]
            def sc(y, yh): return 1 - ((y - yh) ** 2).sum() / ((y - y.mean()) ** 2).sum(), np.sqrt(((y - yh) ** 2).mean())
            def ref(X, y):
                k = int(len(y) * 0.8); cs, cf = fit(X[:k, :1], y[:k]), fit(X[:k], y[:k])
                s = sc(y[k:], cs[0] + X[k:, :1] @ cs[1:]); f = sc(y[k:], cf[0] + X[k:] @ cf[1:])
                return {"simple_r2": s[0], "full_r2": f[0], "simple_rmse": s[1], "full_rmse": f[1], "coef": cf.tolist(), "better": "full" if f[1] < s[1] else "simple"}
            rng = np.random.default_rng(9)
            X = np.column_stack([rng.uniform(0, 100, 100), rng.uniform(0, 12, 100), rng.uniform(1, 5, 100)])
            for label, y in [("harvest depends on all three", 5 + 0.4 * X[:, 0] + 2.5 * X[:, 1] + 6 * X[:, 2] + rng.normal(0, 3, 100)),
                             ("harvest depends on rain only", 5 + 0.4 * X[:, 0] + rng.normal(0, 3, 100))]:
                got, want = hr(X, y), ref(X, y)
                expect_equal(got.get("better"), want["better"], label + ": better")
                expect_close({k: got.get(k) for k in want if k != "better"}, {k: v for k, v in want.items() if k != "better"}, label + ": numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 10
    {
      id: 10, name: "Bayes' Mirror", topic: "Bayes' theorem, base rates, naive Bayes & Bayesian updating", time: 660, icon: "🪞",
      intro: "At the top of the Temple hangs Bayes' Mirror. It shows how belief should change when evidence arrives, and frees the Oracle.",
      missions: [
        {
          id: "st10-1", title: "The Mirror's Rule",
          story: "A test for the grey plague is 99% accurate. A traveller tests positive. The guards want to lock him away. Should they?",
          lesson: `<p><b>Bayes' theorem</b> turns "how likely is the evidence if the hypothesis is true" into "how likely is the hypothesis given the evidence":</p>
            <p><code>P(sick | +) = P(+ | sick) × P(sick) / P(+)</code>, with <code>P(+) = P(+ | sick)·P(sick) + P(+ | healthy)·P(healthy)</code></p>
            <ul><li><b>Prior</b> P(sick): how common the plague is (the <b>base rate</b>)</li>
            <li><b>Sensitivity</b> P(+ | sick); <b>specificity</b> P(− | healthy), so P(+ | healthy) = 1 − specificity</li>
            <li><b>Posterior</b> P(sick | +): the updated belief. After a second positive test, today's posterior becomes the new prior</li></ul>`,
          example: d`
            prior, sens, spec = 0.001, 0.99, 0.99
            p_pos = sens * prior + (1 - spec) * (1 - prior)
            print(round(sens * prior / p_pos, 4))`,
          task: `Write:<br>• <code>posterior(prior, sens, spec)</code> → P(sick | one positive test)<br>
            • <code>posterior_after(prior, sens, spec, positives)</code> → the probability after <code>positives</code> positive tests in a row (independent tests: update repeatedly)<br>
            • <code>p_negative_but_sick(prior, sens, spec)</code> → P(sick | negative test)`,
          starter: d`
            def posterior(prior, sens, spec):
                return sens

            def posterior_after(prior, sens, spec, positives):
                pass

            def p_negative_but_sick(prior, sens, spec):
                pass
            `,
          solution: d`
            def posterior(prior, sens, spec):
                p_pos = sens * prior + (1 - spec) * (1 - prior)
                return sens * prior / p_pos

            def posterior_after(prior, sens, spec, positives):
                p = prior
                for _ in range(positives):
                    p = posterior(p, sens, spec)
                return p

            def p_negative_but_sick(prior, sens, spec):
                p_neg = (1 - sens) * prior + spec * (1 - prior)
                return (1 - sens) * prior / p_neg`,
          hints: ["P(+) = sens · prior + (1 − spec) · (1 − prior)", "Repeated tests: the posterior becomes the next prior", "Negative test: P(−|sick) = 1 − sens, P(−|healthy) = spec"],
          tests: [{ code: d`
            po = expect_func("posterior"); pa = expect_func("posterior_after"); pn = expect_func("p_negative_but_sick")
            expect_close(po(0.001, 0.99, 0.99), 0.000990 / (0.000990 + 0.00999), "posterior(0.001, 0.99, 0.99)")
            expect_close(po(0.5, 0.9, 0.9), 0.9, "posterior with a 50% prior")
            p1 = po(0.001, 0.99, 0.99)
            expect_close(pa(0.001, 0.99, 0.99, 2), po(p1, 0.99, 0.99), "posterior_after two positive tests")
            expect_close(pa(0.2, 0.8, 0.7, 0), 0.2, "posterior_after zero tests is the prior")
            expect_close(pn(0.1, 0.9, 0.95), 0.01 / (0.01 + 0.855), "p_negative_but_sick(0.1, 0.9, 0.95)")
            assert po(0.001, 0.99, 0.99) < 0.1, "With a rare disease, one positive test should still leave the chance below 10%: the base rate matters!"` }],
        },
        {
          id: "st10-2", title: "Natural Frequencies",
          story: "The guards don't understand probabilities. The Oracle explains with people instead: imagine 100,000 travellers…",
          lesson: `<p>Bayes becomes obvious with <b>counts</b>. Out of N people:</p>
            <ul><li>sick = N × prior; of those, <b>true positives</b> = sick × sens and <b>false negatives</b> = the rest</li>
            <li>healthy = N − sick; of those, <b>false positives</b> = healthy × (1 − spec) and <b>true negatives</b> = the rest</li>
            <li>Among all positives, the share actually sick (the <b>positive predictive value</b>) = TP ÷ (TP + FP)</li></ul>
            <p>When the disease is rare, false positives from the huge healthy group can outnumber the true positives.</p>`,
          example: d`
            N, prior, sens, spec = 100_000, 0.001, 0.99, 0.99
            sick = N * prior
            tp = sick * sens
            fp = (N - sick) * (1 - spec)
            print(round(tp), round(fp), round(tp / (tp + fp), 3))`,
          task: `Write:<br>• <code>frequency_table(N, prior, sens, spec)</code> → a dict with <code>"tp"</code>, <code>"fn"</code>, <code>"fp"</code>, <code>"tn"</code>: expected counts rounded to whole numbers (ints)<br>
            • <code>ppv(table)</code> → TP ÷ (TP + FP) from such a table<br>• <code>npv(table)</code> → TN ÷ (TN + FN)`,
          starter: d`
            def frequency_table(N, prior, sens, spec):
                pass

            def ppv(table):
                pass

            def npv(table):
                pass
            `,
          solution: d`
            def frequency_table(N, prior, sens, spec):
                sick = N * prior
                healthy = N - sick
                return {"tp": round(sick * sens), "fn": round(sick * (1 - sens)),
                        "fp": round(healthy * (1 - spec)), "tn": round(healthy * spec)}

            def ppv(table):
                return table["tp"] / (table["tp"] + table["fp"])

            def npv(table):
                return table["tn"] / (table["tn"] + table["fn"])`,
          hints: ["sick = N * prior; healthy = N - sick", "tp = sick * sens, fn = sick * (1 - sens), fp = healthy * (1 - spec), tn = healthy * spec, each rounded", "ppv = tp / (tp + fp)"],
          tests: [{ code: d`
            ft = expect_func("frequency_table"); pp = expect_func("ppv"); nv = expect_func("npv")
            t = ft(100000, 0.001, 0.99, 0.99)
            expect_equal(t, {"tp": 99, "fn": 1, "fp": 999, "tn": 98901}, "frequency_table(100000, 0.001, 0.99, 0.99)")
            expect_close(pp(t), 99 / 1098, "ppv(table)")
            expect_close(nv(t), 98901 / 98902, "npv(table)")
            t2 = ft(1000, 0.3, 0.8, 0.9)
            expect_equal(t2, {"tp": 240, "fn": 60, "fp": 70, "tn": 630}, "frequency_table(1000, 0.3, 0.8, 0.9)")
            expect_close(pp(t2), 240 / 310, "ppv when the condition is common")` }],
        },
        {
          id: "st10-3", title: "The Spam Oracle",
          story: "Raven messages flood the temple, many of them scams. The Oracle builds a filter that learns from examples.",
          lesson: `<p>A <b>naive Bayes</b> classifier applies Bayes' theorem to words. For each class (spam, ham):</p>
            <p><code>score(class) = log P(class) + Σ log P(word | class)</code></p>
            <ul><li>P(class) = share of training messages in that class</li>
            <li>P(word | class) = <code>(count of word in class + 1) / (total words in class + V)</code>, where V = vocabulary size. The +1 (<b>Laplace smoothing</b>) stops an unseen word from making a probability 0</li>
            <li>"Naive": it assumes words are independent given the class. That's wrong, but it works surprisingly well</li>
            <li>Logs turn a product of tiny numbers into a sum (no underflow)</li></ul>`,
          example: d`
            import math
            from collections import Counter

            spam = "win gold now win".split()
            c = Counter(spam)
            V = 6
            print(c["win"], math.log((c["win"] + 1) / (len(spam) + V)))`,
          task: `Messages are split into words with <code>msg.lower().split()</code>. Write:<br>
            • <code>train(messages, labels)</code> → a model dict: <code>"priors"</code> (<code>{label: share of messages}</code>), <code>"counts"</code> (<code>{label: {word: count}}</code>), <code>"totals"</code> (<code>{label: total words}</code>) and <code>"vocab"</code> (a set of all words)<br>
            • <code>log_score(model, msg, label)</code> → log prior + Σ log((count + 1) / (total + V)) over the message's words that are in the vocabulary (unknown words are ignored)<br>
            • <code>classify(model, msg)</code> → the label with the highest score (on a tie, the alphabetically first)`,
          starter: d`
            import math

            def train(messages, labels):
                pass

            def log_score(model, msg, label):
                pass

            def classify(model, msg):
                pass
            `,
          solution: d`
            import math

            def train(messages, labels):
                counts, totals, vocab, n_per = {}, {}, set(), {}
                for msg, lab in zip(messages, labels):
                    n_per[lab] = n_per.get(lab, 0) + 1
                    c = counts.setdefault(lab, {})
                    for w in msg.lower().split():
                        c[w] = c.get(w, 0) + 1
                        totals[lab] = totals.get(lab, 0) + 1
                        vocab.add(w)
                priors = {lab: n / len(labels) for lab, n in n_per.items()}
                return {"priors": priors, "counts": counts, "totals": totals, "vocab": vocab}

            def log_score(model, msg, label):
                V = len(model["vocab"])
                c, total = model["counts"].get(label, {}), model["totals"].get(label, 0)
                s = math.log(model["priors"][label])
                for w in msg.lower().split():
                    if w in model["vocab"]:
                        s += math.log((c.get(w, 0) + 1) / (total + V))
                return s

            def classify(model, msg):
                return min(model["priors"], key=lambda lab: (-log_score(model, msg, lab), lab))`,
          hints: ["train: count messages per label, words per label, total words per label, and every word seen", "log_score: start from math.log(prior); add math.log((count + 1) / (total + V)) for known words", "classify: the label with the highest score; min with key (-score, label) handles ties"],
          tests: [{ code: d`
            import math
            tr = expect_func("train"); ls = expect_func("log_score"); cl = expect_func("classify")
            msgs = ["win free gold now", "free gold for you", "claim your free prize now", "meet at the temple", "the harvest report is ready",
                    "gold price report for the temple", "win a prize now", "see you at the meeting"]
            labs = ["spam", "spam", "spam", "ham", "ham", "ham", "spam", "ham"]
            m = tr(msgs, labs)
            expect_equal(m["priors"], {"spam": 0.5, "ham": 0.5}, "priors")
            expect_equal(m["counts"]["spam"]["free"], 3, "count of 'free' in spam")
            expect_equal(m["totals"], {"spam": 17, "ham": 20}, "total words per label")
            V = len({w for t in msgs for w in t.lower().split()})
            expect_equal(len(m["vocab"]), V, "vocabulary size")
            want = math.log(0.5) + math.log((3 + 1) / (17 + V)) + math.log((2 + 1) / (17 + V))
            expect_close(ls(m, "FREE gold", "spam"), want, "log_score('FREE gold', spam)")
            expect_close(ls(m, "dragons", "ham"), math.log(0.5), "log_score of only unknown words is the log prior")
            expect_equal(cl(m, "free gold prize now"), "spam", "classify('free gold prize now')")
            expect_equal(cl(m, "the temple meeting"), "ham", "classify('the temple meeting')")
            expect_equal(cl(m, "dragons"), "ham", "classify with only unknown words (tie → alphabetically first)")` }],
        },
        {
          id: "st10-4", type: "quiz", title: "Riddles of the Mirror",
          story: "The Mirror's riddles: the ones that fool doctors, judges and juries.",
          lesson: `<p>Ignoring how common something is (the base rate) is the most common reasoning error with probabilities. P(A | B) and P(B | A) are different things.</p>`,
          questions: [
            { q: "A disease affects 1 in 1,000 people. A test catches 99% of cases and has a 1% false-positive rate. You test positive. Roughly how likely are you to be sick?",
              choices: ["about 9%", "about 99%", "about 50%", "about 1%"], answer: 0,
              explain: "Among 100,000 people: 99 true positives but 999 false positives. 99 / 1,098 ≈ 9%. This is the <b>base rate fallacy</b>." },
            { q: "Most dragons breathe fire. Does that mean most fire-breathers are dragons?",
              choices: ["no: P(fire | dragon) is not P(dragon | fire)", "yes, it's the same statement", "only if dragons are common", "only if the test is 99% accurate"], answer: 0,
              explain: "Swapping the condition is the \"prosecutor's fallacy\". Fire-mages may far outnumber dragons." },
            { q: "What does this print?", predict: true, code: d`
                prior, sens, spec = 0.5, 0.8, 0.8
                post = sens * prior / (sens * prior + (1 - spec) * (1 - prior))
                print(round(post, 2))`,
              choices: ["0.8", "0.5", "0.64", "0.4"], answer: 0,
              explain: "With a 50/50 prior and a symmetric test, the posterior equals the test's accuracy." },
            { q: "In Bayesian updating, what does today's posterior become when new evidence arrives tomorrow?",
              choices: ["tomorrow's prior", "tomorrow's likelihood", "the sensitivity", "it's thrown away"], answer: 0,
              explain: "Beliefs are updated step by step: the posterior after one piece of evidence is the prior for the next." },
            { q: "Why is naive Bayes called \"naive\"?",
              choices: ["it assumes the words are independent of each other given the class", "it ignores the prior", "it only works with two classes", "it uses no probabilities"], answer: 0,
              explain: "\"free\" and \"gold\" clearly aren't independent in spam, but the simplification works well in practice." },
          ],
        },
        {
          id: "st10-5", boss: true, time: 990, title: "The Oracle's Coin",
          story: "The final trial. The Oracle hands you a coin: \"Is it fair?\" Answer like a Bayesian: with a belief, and how sure you are.",
          lesson: `<p>For an unknown probability θ (the coin's chance of heads), Bayesians use a <b>Beta(a, b)</b> distribution as the belief: Beta(1, 1) means "no idea" (uniform).</p>
            <ul><li>After seeing h heads and t tails, the belief becomes <b>Beta(a + h, b + t)</b>. Updating is just counting!</li>
            <li>Its mean is <code>a / (a + b)</code></li>
            <li>A 95% <b>credible interval</b>: the 2.5th and 97.5th percentiles of many draws from the Beta (<code>rng.beta(a, b, n)</code>). Unlike a confidence interval, this one really says "θ is in here with 95% probability" (given the prior)</li>
            <li>P(θ &gt; 0.5) = the fraction of draws above 0.5</li></ul>`,
          example: d`
            import numpy as np

            a, b = 1 + 7, 1 + 3          # uniform prior, then 7 heads and 3 tails
            draws = np.random.default_rng(0).beta(a, b, 100_000)
            print(a / (a + b), np.percentile(draws, [2.5, 97.5]).round(3), (draws > 0.5).mean())`,
          task: `Write:<br>• <code>update(a, b, heads, tails)</code> → the new <code>(a, b)</code><br>• <code>beta_mean(a, b)</code><br>
            • <code>credible_interval(a, b, seed, n=100000)</code> → <code>(low, high)</code>: percentiles 2.5 and 97.5 of <code>rng.beta(a, b, n)</code> with <code>rng = np.random.default_rng(seed)</code><br>
            • <code>prob_heads_favoured(a, b, seed, n=100000)</code> → the fraction of <code>rng.beta(a, b, n)</code> draws above 0.5 (its own fresh <code>rng</code>)<br>
            • <code>verdict(heads, tails, seed)</code> → starting from Beta(1, 1): <code>"biased to heads"</code> if P(θ &gt; 0.5) &gt; 0.95, <code>"biased to tails"</code> if it's &lt; 0.05, otherwise <code>"could be fair"</code>`,
          starter: d`
            import numpy as np

            def update(a, b, heads, tails):
                pass

            def beta_mean(a, b):
                pass

            def credible_interval(a, b, seed, n=100000):
                pass

            def prob_heads_favoured(a, b, seed, n=100000):
                pass

            def verdict(heads, tails, seed):
                pass
            `,
          solution: d`
            import numpy as np

            def update(a, b, heads, tails):
                return (a + heads, b + tails)

            def beta_mean(a, b):
                return a / (a + b)

            def credible_interval(a, b, seed, n=100000):
                draws = np.random.default_rng(seed).beta(a, b, n)
                low, high = np.percentile(draws, [2.5, 97.5])
                return (float(low), float(high))

            def prob_heads_favoured(a, b, seed, n=100000):
                return float((np.random.default_rng(seed).beta(a, b, n) > 0.5).mean())

            def verdict(heads, tails, seed):
                a, b = update(1, 1, heads, tails)
                p = prob_heads_favoured(a, b, seed)
                if p > 0.95:
                    return "biased to heads"
                if p < 0.05:
                    return "biased to tails"
                return "could be fair"`,
          hints: ["update: (a + heads, b + tails)", "credible_interval: np.percentile(rng.beta(a, b, n), [2.5, 97.5])", "verdict: update Beta(1, 1), then compare P(θ > 0.5) with 0.95 and 0.05"],
          tests: [{ code: d`
            import numpy as np
            up = expect_func("update"); bm = expect_func("beta_mean"); ci = expect_func("credible_interval"); ph = expect_func("prob_heads_favoured"); ve = expect_func("verdict")
            expect_equal(up(1, 1, 7, 3), (8, 4), "update(1, 1, 7, 3)")
            expect_close(bm(8, 4), 2 / 3, "beta_mean(8, 4)")
            d = np.random.default_rng(0).beta(8, 4, 100000)
            expect_close(ci(8, 4, 0), tuple(np.percentile(d, [2.5, 97.5])), "credible_interval(8, 4, seed 0)")
            expect_close(ph(8, 4, 0), (d > 0.5).mean(), "prob_heads_favoured(8, 4, seed 0)")
            expect_equal(ve(7, 3, 1), "could be fair", "verdict after 7 heads, 3 tails")
            expect_equal(ve(70, 30, 1), "biased to heads", "verdict after 70 heads, 30 tails")
            expect_equal(ve(38, 62, 1), "biased to tails", "verdict after 38 heads, 62 tails")
            expect_equal(ve(50, 50, 1), "could be fair", "verdict after 50 heads, 50 tails")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "stats", name: "Statistics", realm: "The Oracle's Realm", tower: "The Temple of Chance",
    ruler: "Oracle Laplace", rulerIcon: "🔮", icon: "🎲", color: "#c792ea", requires: ["numpy"],
    packages: ["numpy"], runMs: 15000, submitMs: 25000,
    blurb: "Reason about data and uncertainty: distributions, sampling, confidence intervals and hypothesis tests.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
