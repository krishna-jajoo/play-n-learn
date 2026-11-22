// The pandas empire: the Bamboo Kingdom. Empress Mei is locked at the top of the Jade Pagoda.
// Missions run real pandas in the browser. Datasets below are shipped to Python as files (mission.files).
(function (root) {
  const { d } = root.QUEST;

  // ───────────────────────────── datasets (generated once, deterministic)
  const SALES = `date,region,product,units,price
2024-01-01,South,Shield,16,85
2024-01-07,East,Potion,17,15
2024-01-08,East,Shield,12,85
2024-01-08,South,Bow,8,60
2024-01-09,East,Shield,6,85
2024-01-10,South,Shield,9,85
2024-01-13,West,Bow,16,60
2024-01-16,West,Shield,12,85
2024-01-16,East,Shield,4,85
2024-01-17,North,Sword,6,120
2024-01-19,South,Potion,4,15
2024-01-20,South,Shield,9,85
2024-01-22,East,Bow,6,60
2024-01-25,East,Shield,3,85
2024-01-29,North,Potion,13,15
2024-01-29,East,Potion,15,15
2024-01-30,North,Potion,7,15
2024-02-01,North,Bow,3,60
2024-02-02,North,Bow,9,60
2024-02-11,North,Sword,6,120
2024-02-12,West,Shield,8,85
2024-02-14,North,Sword,5,120
2024-02-16,East,Bow,1,60
2024-02-21,North,Potion,3,15
2024-02-23,North,Shield,17,85
2024-02-24,South,Bow,11,60
2024-02-26,North,Shield,11,85
2024-02-28,South,Potion,4,15
2024-03-02,North,Shield,14,85
2024-03-03,West,Sword,16,120
2024-03-13,South,Potion,19,15
2024-03-13,North,Shield,6,85
2024-03-13,North,Shield,1,85
2024-03-19,East,Shield,20,85
2024-03-23,South,Shield,18,85
2024-03-24,South,Potion,12,15
2024-03-24,East,Shield,20,85
2024-03-29,East,Potion,2,15
2024-03-30,East,Shield,12,85
2024-03-31,North,Potion,13,15
`;
  const HEROES = `name,class,level,hp,gold,guild,joined
Lyra,Mage,17,220.0,278.0,Dawn,2021-10-25
Orin,Mage,6,122.0,260.0,Dawn,2021-12-10
Mira,Archer,35,365.0,754.0,Frost,2021-11-03
Zed,Knight,16,242.0,,Dawn,2022-01-29
Anna,Archer,1,63.0,723.0,Ember,2023-11-30
Bo,Mage,32,466.0,103.0,,2021-09-06
Cass,Knight,1,60.0,624.0,Frost,2021-08-21
Dren,Knight,10,130.0,119.0,Dawn,2022-09-11
Elk,Archer,16,,171.0,Ember,2023-02-06
Fay,Archer,34,356.0,517.0,Frost,2023-10-21
Gus,Knight,29,398.0,1168.0,Ember,2023-05-19
Hale,Archer,25,400.0,,Frost,2023-07-02
Ivy,Knight,19,316.0,141.0,Frost,2021-12-08
Jax,Mage,26,336.0,1126.0,Dawn,2023-06-16
Kai,Archer,36,410.0,1837.0,,2023-01-05
Luz,Healer,37,383.0,1813.0,Frost,2022-07-17
Moe,Archer,31,453.0,1779.0,Frost,2023-03-26
Nia,Mage,21,260.0,461.0,,2023-12-08
Ode,Knight,9,140.0,1659.0,Frost,2023-05-09
Pip,Knight,6,110.0,298.0,Ember,2023-07-13
`;
  const WEATHER = `date,city,temp,rain
2024-01-01,Oakvale,4.1,0.0
2024-01-02,Oakvale,4.7,1.8
2024-01-03,Oakvale,10.2,1.6
2024-01-04,Oakvale,7.8,0.0
2024-01-05,Oakvale,6.7,0.0
2024-01-06,Oakvale,5.0,0.0
2024-01-07,Oakvale,5.9,10.3
2024-01-08,Oakvale,5.0,0.0
2024-01-09,Oakvale,0.9,0.0
2024-01-10,Oakvale,7.0,0.0
2024-01-11,Oakvale,5.9,0.0
2024-01-12,Oakvale,1.6,0.0
2024-01-13,Oakvale,3.5,0.0
2024-01-14,Oakvale,4.5,0.0
2024-01-15,Oakvale,6.1,0.0
2024-01-16,Oakvale,9.7,0.0
2024-01-17,Oakvale,5.5,0.0
2024-01-18,Oakvale,0.7,0.0
2024-01-19,Oakvale,7.2,0.0
2024-01-20,Oakvale,5.3,15.1
2024-01-21,Oakvale,1.4,0.0
2024-01-22,Oakvale,0.2,0.0
2024-01-23,Oakvale,3.3,0.0
2024-01-24,Oakvale,7.0,29.1
2024-01-25,Oakvale,4.2,0.0
2024-01-26,Oakvale,7.7,10.3
2024-01-27,Oakvale,5.6,0.0
2024-01-28,Oakvale,6.9,0.0
2024-01-29,Oakvale,8.2,1.4
2024-01-30,Oakvale,8.0,1.4
2024-01-31,Oakvale,4.0,0.0
2024-02-01,Oakvale,11.6,4.2
2024-02-02,Oakvale,1.9,4.6
2024-02-03,Oakvale,6.5,4.2
2024-02-04,Oakvale,4.5,3.6
2024-02-05,Oakvale,10.1,0.0
2024-02-06,Oakvale,3.9,0.0
2024-02-07,Oakvale,4.7,0.0
2024-02-08,Oakvale,4.5,0.0
2024-02-09,Oakvale,4.0,0.0
2024-02-10,Oakvale,6.1,0.0
2024-02-11,Oakvale,8.1,0.0
2024-02-12,Oakvale,5.3,3.2
2024-02-13,Oakvale,3.6,0.0
2024-02-14,Oakvale,7.2,5.9
2024-02-15,Oakvale,7.9,0.0
2024-02-16,Oakvale,9.8,0.0
2024-02-17,Oakvale,6.1,0.0
2024-02-18,Oakvale,7.8,0.0
2024-02-19,Oakvale,10.6,0.0
2024-02-20,Oakvale,5.9,0.0
2024-02-21,Oakvale,8.3,0.0
2024-02-22,Oakvale,7.7,6.9
2024-02-23,Oakvale,5.1,0.0
2024-02-24,Oakvale,8.5,3.5
2024-02-25,Oakvale,11.7,0.0
2024-02-26,Oakvale,14.6,0.0
2024-02-27,Oakvale,5.4,0.0
2024-02-28,Oakvale,11.5,6.6
2024-02-29,Oakvale,12.0,0.0
2024-03-01,Oakvale,12.3,0.0
2024-03-02,Oakvale,8.3,0.0
2024-03-03,Oakvale,10.3,0.0
2024-03-04,Oakvale,8.1,0.0
2024-03-05,Oakvale,11.1,8.2
2024-03-06,Oakvale,12.8,0.0
2024-03-07,Oakvale,9.2,0.0
2024-03-08,Oakvale,10.5,1.2
2024-03-09,Oakvale,12.2,15.8
2024-03-10,Oakvale,11.9,6.9
2024-03-11,Oakvale,8.5,0.0
2024-03-12,Oakvale,13.7,1.3
2024-03-13,Oakvale,11.6,8.1
2024-03-14,Oakvale,10.9,0.0
2024-03-15,Oakvale,10.7,0.0
2024-03-16,Oakvale,12.4,16.5
2024-03-17,Oakvale,13.3,1.3
2024-03-18,Oakvale,7.7,15.1
2024-03-19,Oakvale,8.7,0.0
2024-03-20,Oakvale,6.7,4.8
2024-03-21,Oakvale,12.2,0.0
2024-03-22,Oakvale,12.2,0.0
2024-03-23,Oakvale,10.4,5.7
2024-03-24,Oakvale,8.6,6.0
2024-03-25,Oakvale,14.7,0.0
2024-03-26,Oakvale,15.6,5.5
2024-03-27,Oakvale,15.6,0.0
2024-03-28,Oakvale,11.9,0.0
2024-03-29,Oakvale,12.2,0.0
2024-03-30,Oakvale,12.3,12.9
2024-03-31,Oakvale,11.7,0.0
2024-01-01,Stonebridge,10.1,0.0
2024-01-02,Stonebridge,12.7,1.4
2024-01-03,Stonebridge,8.2,0.0
2024-01-04,Stonebridge,10.5,0.0
2024-01-05,Stonebridge,12.4,8.3
2024-01-06,Stonebridge,12.5,19.7
2024-01-07,Stonebridge,11.9,0.0
2024-01-08,Stonebridge,12.3,0.0
2024-01-09,Stonebridge,1.3,0.0
2024-01-10,Stonebridge,5.2,0.0
2024-01-11,Stonebridge,10.9,5.0
2024-01-12,Stonebridge,5.8,0.0
2024-01-13,Stonebridge,12.6,0.0
2024-01-14,Stonebridge,8.8,0.0
2024-01-15,Stonebridge,6.4,1.0
2024-01-16,Stonebridge,12.6,0.0
2024-01-17,Stonebridge,8.9,3.3
2024-01-18,Stonebridge,8.1,0.0
2024-01-19,Stonebridge,12.5,0.0
2024-01-20,Stonebridge,10.2,0.0
2024-01-21,Stonebridge,7.8,5.0
2024-01-22,Stonebridge,8.2,0.0
2024-01-23,Stonebridge,6.9,0.0
2024-01-24,Stonebridge,15.2,0.0
2024-01-25,Stonebridge,14.5,3.7
2024-01-26,Stonebridge,11.4,0.0
2024-01-27,Stonebridge,9.6,10.3
2024-01-28,Stonebridge,12.6,0.0
2024-01-29,Stonebridge,11.0,1.0
2024-01-30,Stonebridge,13.6,0.0
2024-01-31,Stonebridge,13.3,0.0
2024-02-01,Stonebridge,11.9,7.1
2024-02-02,Stonebridge,11.2,0.0
2024-02-03,Stonebridge,13.5,6.0
2024-02-04,Stonebridge,12.1,0.0
2024-02-05,Stonebridge,8.0,4.1
2024-02-06,Stonebridge,12.9,3.0
2024-02-07,Stonebridge,16.8,0.0
2024-02-08,Stonebridge,11.5,0.0
2024-02-09,Stonebridge,13.2,0.0
2024-02-10,Stonebridge,11.7,0.0
2024-02-11,Stonebridge,13.4,0.0
2024-02-12,Stonebridge,12.0,6.1
2024-02-13,Stonebridge,18.8,0.0
2024-02-14,Stonebridge,14.1,5.1
2024-02-15,Stonebridge,13.1,0.0
2024-02-16,Stonebridge,13.9,1.4
2024-02-17,Stonebridge,13.5,0.0
2024-02-18,Stonebridge,17.0,1.6
2024-02-19,Stonebridge,11.7,0.0
2024-02-20,Stonebridge,11.5,9.8
2024-02-21,Stonebridge,15.0,19.8
2024-02-22,Stonebridge,13.2,1.6
2024-02-23,Stonebridge,12.2,0.0
2024-02-24,Stonebridge,9.2,4.1
2024-02-25,Stonebridge,13.9,0.0
2024-02-26,Stonebridge,12.6,0.0
2024-02-27,Stonebridge,16.8,0.0
2024-02-28,Stonebridge,11.5,0.0
2024-02-29,Stonebridge,15.3,0.0
2024-03-01,Stonebridge,14.3,4.2
2024-03-02,Stonebridge,12.8,10.6
2024-03-03,Stonebridge,17.8,0.4
2024-03-04,Stonebridge,18.3,0.0
2024-03-05,Stonebridge,14.0,0.0
2024-03-06,Stonebridge,14.3,0.0
2024-03-07,Stonebridge,9.7,0.0
2024-03-08,Stonebridge,17.4,7.6
2024-03-09,Stonebridge,14.8,0.0
2024-03-10,Stonebridge,18.2,0.0
2024-03-11,Stonebridge,14.3,0.0
2024-03-12,Stonebridge,16.8,0.0
2024-03-13,Stonebridge,16.7,0.0
2024-03-14,Stonebridge,16.9,0.0
2024-03-15,Stonebridge,14.6,0.0
2024-03-16,Stonebridge,14.2,3.0
2024-03-17,Stonebridge,13.1,6.6
2024-03-18,Stonebridge,16.5,0.0
2024-03-19,Stonebridge,14.0,10.7
2024-03-20,Stonebridge,17.4,1.9
2024-03-21,Stonebridge,11.5,0.0
2024-03-22,Stonebridge,19.7,0.0
2024-03-23,Stonebridge,17.7,2.3
2024-03-24,Stonebridge,16.7,0.0
2024-03-25,Stonebridge,14.6,5.1
2024-03-26,Stonebridge,14.6,0.0
2024-03-27,Stonebridge,15.6,2.3
2024-03-28,Stonebridge,18.5,0.0
2024-03-29,Stonebridge,17.5,0.0
2024-03-30,Stonebridge,18.1,0.0
2024-03-31,Stonebridge,19.4,0.0
`;
  const CUSTOMERS = `customer_id,name,city
1,Lyra,Oakvale
2,Orin,Stonebridge
3,Mira,Oakvale
4,Zed,Fernhill
5,Anna,Stonebridge
6,Bo,Oakvale
`;
  const ORDERS = `order_id,customer_id,amount
101,1,120.0
102,2,45.5
103,1,60.0
104,3,15.0
105,5,300.0
106,2,85.0
107,1,22.5
108,7,99.0
109,3,140.0
110,5,12.0
111,5,60.0
112,2,30.0
`;
  const CENSUS = `name,age,city,income,joined
  Lyra Stone ,29,oakvale,"$1,200",2023-01-15
Orin Vale,unknown,Oakvale,$950,2023-02-01
MIRA KEEN,41,STONEBRIDGE,"$2,400",2022-11-30
zed hollow,35, Fernhill ,,2023-03-12
Lyra Stone,29,Oakvale,"$1,200",2023-01-15
Anna Brook,52,stonebridge,"$3,100",
Bo Finch,17,Oakvale,$0,2023-05-02
Cass Reed,,Fernhill,"$1,750",2022-08-19
`;

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The Series Scroll", topic: "Series, index, labels & alignment", time: 420, icon: "📜",
      intro: "In the Bamboo Kingdom every number carries a label. The Series is a column of values with names attached.",
      missions: [
        {
          id: "pd1-1", title: "The First Scroll",
          story: "Empress Mei's treasurer keeps each hero's gold on a scroll, a name beside every number.",
          lesson: `<p><b>pandas</b> is the library data scientists use every day to load, clean and analyse tables. It's built on NumPy and imported as <code>pd</code>.</p>
            <p>A <b>Series</b> is a 1-D array with <b>labels</b> (its <b>index</b>):</p>
            <ul><li><code>pd.Series([3, 5, 8])</code> → labels 0, 1, 2</li>
            <li><code>pd.Series({"Lyra": 120, "Orin": 75})</code> → the dict keys become the labels</li>
            <li><code>s["Lyra"]</code> reads by <b>label</b>; <code>s.iloc[0]</code> reads by <b>position</b></li>
            <li><code>s.index</code> → the labels; <code>s.values</code> → the NumPy array inside</li>
            <li>Maths works on every value, like NumPy: <code>s * 2</code>, <code>s.sum()</code>, <code>s.mean()</code></li></ul>`,
          example: d`
            import pandas as pd

            hp = pd.Series({"Lyra": 80, "Orin": 120, "Mira": 95})
            print(hp)
            print(hp["Orin"], hp.iloc[0], list(hp.index))
            print(hp + 10)
            print(hp.mean(), hp.max())`,
          task: `Create <code>gold</code>: a Series with Lyra → 120, Orin → 75, Mira → 200 (in that order), and <code>with_bonus</code>: every hero's gold plus 50, <b>calculated</b> from <code>gold</code>.<br>
            Then print, each on its own line: Mira's gold (by label), the first value (by position), <code>list(gold.index)</code> and the total gold.`,
          starter: d`
            import pandas as pd
            `,
          solution: d`
            import pandas as pd

            gold = pd.Series({"Lyra": 120, "Orin": 75, "Mira": 200})
            with_bonus = gold + 50
            print(gold["Mira"])
            print(gold.iloc[0])
            print(list(gold.index))
            print(gold.sum())`,
          hints: ["gold = pd.Series({\"Lyra\": 120, \"Orin\": 75, \"Mira\": 200})", "with_bonus = gold + 50", "gold[\"Mira\"] by label, gold.iloc[0] by position, gold.sum() for the total"],
          tests: [{ code: d`
            expect_series(expect_var("gold"), {"Lyra": 120, "Orin": 75, "Mira": 200}, "gold")
            expect_series(expect_var("with_bonus"), {"Lyra": 170, "Orin": 125, "Mira": 250}, "with_bonus")
            assert "170" not in __code__ and "250" not in __code__, "Calculate with_bonus from gold (gold + 50)."
            assert ".iloc[" in __code__, "Read the first value by position with .iloc[0]."
            expect_output("""200
            120
            ['Lyra', 'Orin', 'Mira']
            395""")` }],
        },
        {
          id: "pd1-2", title: "Labels and Positions",
          story: "The scroll-keeper can find any entry by its name, or by counting down the scroll. Mixing the two up causes chaos.",
          lesson: `<ul><li><code>s.loc[label]</code> → by label; <code>s.iloc[pos]</code> → by position. Prefer these two over plain <code>s[...]</code>, which can mean either</li>
            <li><b>Label slices include the end</b>: <code>s.loc["b":"d"]</code> includes "d". Position slices don't: <code>s.iloc[1:3]</code> stops before 3</li>
            <li><code>s.get(label, default)</code> → like a dict: no error for a missing label</li>
            <li><code>s.idxmax()</code> / <code>s.idxmin()</code> → the <b>label</b> of the largest / smallest value</li>
            <li><code>s.head(n)</code> / <code>s.tail(n)</code> → the first / last <code>n</code></li></ul>`,
          example: d`
            import pandas as pd

            s = pd.Series([10, 40, 25, 30], index=["a", "b", "c", "d"])
            print(s.loc["b":"d"].tolist(), s.iloc[1:3].tolist())
            print(s.idxmax(), s.get("z", 0), s.head(2).tolist())`,
          task: `Write:<br>• <code>first_n(s, n)</code> → the first <code>n</code> values (by position)<br>
            • <code>between_labels(s, a, b)</code> → the values from label <code>a</code> to label <code>b</code>, <b>both included</b><br>
            • <code>best(s)</code> → the label of the largest value<br>
            • <code>value_or(s, label, default)</code> → the value for <code>label</code>, or <code>default</code> if there's no such label`,
          starter: d`
            import pandas as pd

            def first_n(s, n):
                pass

            def between_labels(s, a, b):
                pass

            def best(s):
                return s.max()

            def value_or(s, label, default):
                return s[label]
            `,
          solution: d`
            import pandas as pd

            def first_n(s, n):
                return s.iloc[:n]

            def between_labels(s, a, b):
                return s.loc[a:b]

            def best(s):
                return s.idxmax()

            def value_or(s, label, default):
                return s.get(label, default)`,
          hints: ["first_n: s.iloc[:n]", "between_labels: s.loc[a:b] (label slices include b)", "best: s.idxmax() gives the label, s.max() the value", "value_or: s.get(label, default)"],
          tests: [{ code: d`
            import pandas as pd
            fn = expect_func("first_n"); bl = expect_func("between_labels"); be = expect_func("best"); vo = expect_func("value_or")
            s = pd.Series([10, 40, 25, 30, 5], index=["a", "b", "c", "d", "e"])
            expect_series(fn(s, 2), pd.Series([10, 40], index=["a", "b"]), "first_n(s, 2)")
            expect_series(bl(s, "b", "d"), pd.Series([40, 25, 30], index=["b", "c", "d"]), 'between_labels(s, "b", "d")')
            expect_equal(be(s), "b", "best(s)")
            expect_equal(vo(s, "c", 0), 25, 'value_or(s, "c", 0)')
            expect_equal(vo(s, "z", -1), -1, 'value_or(s, "z", -1)')
            n = pd.Series([7, 8, 9], index=[30, 20, 10])
            expect_series(fn(n, 1), pd.Series([7], index=[30]), "first_n on a Series whose labels are numbers")` }],
        },
        {
          id: "pd1-3", title: "Aligned Armies",
          story: "Two armies report their weapons. When their lists are combined, every weapon must be matched by name, not by position.",
          lesson: `<p>pandas lines values up <b>by label</b> before doing maths. This is called <b>alignment</b>:</p>
            <ul><li><code>a + b</code> adds values with the same label; a label found in only one of them gives <code>NaN</code> (missing)</li>
            <li><code>a.add(b, fill_value=0)</code> treats a missing label as 0 instead</li>
            <li><code>s.sort_values(ascending=False)</code> sorts by value; <code>s.sort_index()</code> by label</li>
            <li><code>s.value_counts()</code> counts how often each value appears, most common first</li></ul>`,
          example: d`
            import pandas as pd

            a = pd.Series({"sword": 3, "bow": 2})
            b = pd.Series({"bow": 5, "axe": 1})
            print(a + b)
            print(a.add(b, fill_value=0))
            print(pd.Series(["x", "y", "x", "x"]).value_counts())`,
          task: `Write:<br>• <code>combine_stock(a, b)</code> → the two stock Series added together by label, treating missing labels as 0<br>
            • <code>ranked(s)</code> → the Series sorted from the largest value to the smallest<br>
            • <code>counts(items)</code> → a Series counting how often each item of the list appears, most common first`,
          starter: d`
            import pandas as pd

            def combine_stock(a, b):
                return a + b

            def ranked(s):
                pass

            def counts(items):
                pass
            `,
          solution: d`
            import pandas as pd

            def combine_stock(a, b):
                return a.add(b, fill_value=0)

            def ranked(s):
                return s.sort_values(ascending=False)

            def counts(items):
                return pd.Series(items).value_counts()`,
          hints: ["combine_stock: a.add(b, fill_value=0)", "ranked: s.sort_values(ascending=False)", "counts: pd.Series(items).value_counts()"],
          tests: [{ code: d`
            import pandas as pd
            cs = expect_func("combine_stock"); rk = expect_func("ranked"); ct = expect_func("counts")
            a = pd.Series({"sword": 3, "bow": 2, "rope": 4})
            b = pd.Series({"bow": 5, "axe": 1})
            r = cs(a, b)
            expect_series(r.sort_index(), pd.Series({"axe": 1.0, "bow": 7.0, "rope": 4.0, "sword": 3.0}), "combine_stock(a, b) (sorted by name)")
            expect_series(rk(pd.Series({"x": 5, "y": 9, "z": 1})), pd.Series({"y": 9, "x": 5, "z": 1}), "ranked(...)")
            c = ct(["potion", "sword", "potion", "bow", "potion", "sword"])
            expect_equal(list(c.values), [3, 2, 1], "counts(...) values, most common first")
            expect_equal(list(c.index), ["potion", "sword", "bow"], "counts(...) labels")` }],
        },
        {
          id: "pd1-4", type: "quiz", title: "Riddles of the Scroll",
          story: "The scroll-keepers test you on labels, positions and the mysterious NaN.",
          lesson: `<p>Remember: maths aligns by label; a missing value (<code>NaN</code>) forces an int column to become float; <code>.loc</code> slices include the end label; with number labels, <code>s[0]</code> means the <b>label</b> 0, not the first position.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                a = pd.Series({"x": 1, "y": 2})
                b = pd.Series({"y": 10, "z": 20})
                print((a + b).to_dict())`,
              choices: ["{'x': nan, 'y': 12.0, 'z': nan}", "{'x': 1, 'y': 12, 'z': 20}", "{'y': 12}", "{'x': 11, 'y': 22}"], answer: 0,
              explain: "Only <code>y</code> is in both; <code>x</code> and <code>z</code> have nothing to add to, so they become NaN (and NaN makes the values floats)." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.Series([1, 2, None]).dtype)`,
              choices: ["float64", "int64", "object", "None"], answer: 0,
              explain: "A missing value is stored as NaN, which is a float, so the whole column becomes float64." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([10, 20, 30, 40], index=["a", "b", "c", "d"])
                print(s.loc["b":"c"].tolist(), s.iloc[1:2].tolist())`,
              choices: ["[20, 30] [20]", "[20] [20]", "[20, 30] [20, 30]", "[30] [20]"], answer: 0,
              explain: "Label slices include their end; position slices don't." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([5, 6, 7], index=[2, 1, 0])
                print(s.loc[0], s.iloc[0])`,
              choices: ["7 5", "5 5", "5 7", "7 7"], answer: 0,
              explain: "<code>.loc[0]</code> finds the <b>label</b> 0 (the last row, 7); <code>.iloc[0]</code> is the first position (5)." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([4, 9, 2], index=["a", "b", "c"])
                print(s.idxmax(), s.max(), s[s > 3].index.tolist())`,
              choices: ["b 9 ['a', 'b']", "9 b ['a', 'b']", "1 9 [4, 9]", "b 9 [4, 9]"], answer: 0,
              explain: "<code>idxmax</code> gives the label of the maximum; filtering keeps the labels of the values that pass." },
          ],
        },
        {
          id: "pd1-5", boss: true, time: 630, title: "The Tax Scroll",
          story: "Empress Mei wants a fair tax: a small share of every hero's first 1000 gold, a bigger share of the rest.",
          lesson: `<p>Series methods let you write whole calculations without loops:</p>
            <ul><li><code>s.clip(upper=1000)</code> → every value capped at 1000; <code>s.clip(lower=0)</code> → never below 0</li>
            <li><code>s.nlargest(n)</code> → the <code>n</code> biggest values, with their labels</li>
            <li><code>s / s.sum() * 100</code> → each value as a percentage of the total; <code>.round(1)</code> rounds</li></ul>
            <p>A <b>progressive tax</b> of 10% up to 1000 and 20% above: <code>s.clip(upper=1000) * 0.1 + (s - 1000).clip(lower=0) * 0.2</code>.</p>`,
          example: d`
            import pandas as pd

            s = pd.Series({"a": 500, "b": 1500, "c": 3000})
            print(s.clip(upper=1000).tolist(), (s - 1000).clip(lower=0).tolist())
            print(s.nlargest(2))
            print((s / s.sum() * 100).round(1))`,
          task: `<code>s</code> is a Series of incomes labelled by hero name. Write, <b>without loops</b>:<br>
            • <code>tax(s)</code> → each hero's tax: 10% of the income up to 1000, plus 20% of the part above 1000<br>
            • <code>richest(s, n)</code> → a list of the names of the <code>n</code> highest incomes, highest first<br>
            • <code>share(s)</code> → each income as a percentage of the total, rounded to 1 decimal<br>
            • <code>summary(s)</code> → a dict with <code>"mean"</code>, <code>"median"</code> (floats) and <code>"top"</code> (name of the highest income)`,
          starter: d`
            import pandas as pd

            def tax(s):
                return s * 0.1

            def richest(s, n):
                pass

            def share(s):
                pass

            def summary(s):
                pass
            `,
          solution: d`
            import pandas as pd

            def tax(s):
                return s.clip(upper=1000) * 0.1 + (s - 1000).clip(lower=0) * 0.2

            def richest(s, n):
                return list(s.nlargest(n).index)

            def share(s):
                return (s / s.sum() * 100).round(1)

            def summary(s):
                return {"mean": float(s.mean()), "median": float(s.median()), "top": s.idxmax()}`,
          hints: ["tax: s.clip(upper=1000) * 0.1 + (s - 1000).clip(lower=0) * 0.2", "richest: list(s.nlargest(n).index)", "share: (s / s.sum() * 100).round(1)", "summary: s.mean(), s.median(), s.idxmax()"],
          tests: [{ code: d`
            import pandas as pd
            must_not_use("for", "while", "listcomp")
            tx = expect_func("tax"); ri = expect_func("richest"); sh = expect_func("share"); su = expect_func("summary")
            s = pd.Series({"Lyra": 800, "Orin": 1000, "Mira": 2500, "Zed": 0, "Anna": 1200})
            expect_series(tx(s), pd.Series({"Lyra": 80.0, "Orin": 100.0, "Mira": 400.0, "Zed": 0.0, "Anna": 140.0}), "tax(incomes)")
            expect_equal(ri(s, 2), ["Mira", "Anna"], "richest(incomes, 2)")
            expect_series(sh(s), (s / s.sum() * 100).round(1), "share(incomes)")
            r = su(s)
            expect_close([r.get("mean"), r.get("median")], [1100.0, 1000.0], "summary mean and median")
            expect_equal(r.get("top"), "Mira", "summary top")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Great Table", topic: "DataFrame, read_csv, describe & new columns", time: 480, icon: "🀄",
      intro: "Many scrolls side by side make a table: the DataFrame, heart of the Bamboo Kingdom's records.",
      missions: [
        {
          id: "pd2-1", title: "Raise the Table",
          story: "The kingdom's heroes must be recorded in one great table: names, classes and levels in neat columns.",
          lesson: `<p>A <b>DataFrame</b> is a table: rows share an index, and each column is a Series with its own name and type.</p>
            <ul><li><code>pd.DataFrame({"name": [...], "level": [...]})</code> → a dict of equal-length lists becomes the columns</li>
            <li><code>df["level"]</code> → one column (a <b>Series</b>); <code>df[["name", "level"]]</code> → several columns (a <b>DataFrame</b>, note the double brackets)</li>
            <li><code>df.shape</code> → (rows, columns); <code>df.columns</code> → the column names; <code>df.dtypes</code> → each column's type</li>
            <li><code>df.head(n)</code> → the first rows; <code>print(df)</code> shows it as a table</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({
                "name": ["Lyra", "Orin", "Mira"],
                "level": [12, 7, 30],
                "class": ["Mage", "Knight", "Archer"],
            })
            print(df)
            print(df.shape, df.columns.tolist())
            print(df["level"].mean())
            print(df[["name", "class"]])`,
          task: `Create <code>heroes</code>, a DataFrame with the columns <code>name</code> = Lyra, Orin, Mira, Zed; <code>class</code> = Mage, Knight, Archer, Mage; <code>level</code> = 12, 7, 30, 18.<br>
            Then create <code>levels</code> (the <code>level</code> column as a Series) and <code>small</code> (a DataFrame with only <code>name</code> and <code>level</code>).<br>
            Print <code>heroes.shape</code>, then <code>heroes.columns.tolist()</code>.`,
          starter: d`
            import pandas as pd
            `,
          solution: d`
            import pandas as pd

            heroes = pd.DataFrame({
                "name": ["Lyra", "Orin", "Mira", "Zed"],
                "class": ["Mage", "Knight", "Archer", "Mage"],
                "level": [12, 7, 30, 18],
            })
            levels = heroes["level"]
            small = heroes[["name", "level"]]
            print(heroes.shape)
            print(heroes.columns.tolist())`,
          hints: ["pd.DataFrame({\"name\": [...], \"class\": [...], \"level\": [...]})", "levels = heroes[\"level\"] (single brackets → Series)", "small = heroes[[\"name\", \"level\"]] (double brackets → DataFrame)"],
          tests: [{ code: d`
            want = {"name": ["Lyra", "Orin", "Mira", "Zed"], "class": ["Mage", "Knight", "Archer", "Mage"], "level": [12, 7, 30, 18]}
            expect_frame(expect_var("heroes"), want, "heroes")
            expect_series(expect_var("levels"), [12, 7, 30, 18], "levels")
            expect_frame(expect_var("small"), {"name": want["name"], "level": want["level"]}, "small")
            expect_output("""(4, 3)
            ['name', 'class', 'level']""")` }],
        },
        {
          id: "pd2-2", title: "Read the Ledger",
          story: "The kingdom's sales ledger arrives as a CSV file. Load it, and find out what's inside before doing anything else.",
          lesson: `<p><code>pd.read_csv("sales.csv")</code> loads a CSV file into a DataFrame, guessing each column's type. (This mission comes with <code>sales.csv</code>: try <code>print(pd.read_csv("sales.csv"))</code>.)</p>
            <p>The first things to do with any new dataset:</p>
            <ul><li><code>df.head()</code> → look at a few rows</li><li><code>df.shape</code> → how big is it?</li>
            <li><code>df.dtypes</code> → which columns are numbers, which are text (<code>object</code>)?</li>
            <li><code>df.describe()</code> → count, mean, std, min, quartiles and max of every numeric column</li>
            <li><code>df.select_dtypes("number")</code> → only the numeric columns</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(df.head(3))
            print(df.shape)
            print(df.dtypes)
            print(df.describe().round(1))`,
          files: { "sales.csv": SALES },
          task: `Write:<br>• <code>load()</code> → the DataFrame from <code>sales.csv</code><br>
            • <code>size(df)</code> → a tuple <code>(rows, columns)</code><br>
            • <code>numeric_columns(df)</code> → a list of the names of the numeric columns<br>
            • <code>averages(df)</code> → a Series with the mean of each numeric column, rounded to 2 decimals`,
          starter: d`
            import pandas as pd

            def load():
                pass

            def size(df):
                pass

            def numeric_columns(df):
                pass

            def averages(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def load():
                return pd.read_csv("sales.csv")

            def size(df):
                return df.shape

            def numeric_columns(df):
                return df.select_dtypes("number").columns.tolist()

            def averages(df):
                return df.select_dtypes("number").mean().round(2)`,
          hints: ["load: pd.read_csv(\"sales.csv\")", "size: df.shape is already a tuple", "numeric_columns: df.select_dtypes(\"number\").columns.tolist()", "averages: df.select_dtypes(\"number\").mean().round(2)"],
          tests: [{ code: d`
            import pandas as pd
            ld = expect_func("load"); sz = expect_func("size"); nc = expect_func("numeric_columns"); av = expect_func("averages")
            ref = pd.read_csv("sales.csv")
            df = ld()
            expect_frame(df, ref, "load()")
            expect_equal(sz(df), (40, 5), "size(sales)")
            expect_equal(nc(df), ["units", "price"], "numeric_columns(sales)")
            expect_series(av(df), ref[["units", "price"]].mean().round(2), "averages(sales)")
            small = pd.DataFrame({"a": [1, 2], "b": ["x", "y"], "c": [0.5, 1.5]})
            expect_equal(nc(small), ["a", "c"], "numeric_columns of another table")` }],
        },
        {
          id: "pd2-3", title: "New Columns",
          story: "The ledger is missing what the Empress cares about most: how much money each sale made.",
          lesson: `<ul><li>Add a column with maths on other columns: <code>df["revenue"] = df["units"] * df["price"]</code></li>
            <li>That changes <code>df</code> itself. To leave the original alone, work on <code>out = df.copy()</code>, or use <code>df.assign(revenue=...)</code>, which returns a new table</li>
            <li><code>df.rename(columns={"old": "new"})</code> → rename; <code>df.drop(columns=[...])</code> → remove columns</li>
            <li><code>df.columns.str.strip().str.lower()</code> → tidy every column name at once</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"Item Name": ["rope", "lamp"], " Qty": [3, 1], "Cost": [2.0, 9.5]})
            out = df.copy()
            out["total"] = out[" Qty"] * out["Cost"]
            print(out)
            print(df.columns.str.strip().str.lower().str.replace(" ", "_").tolist())
            print(df.drop(columns=["Cost"]).columns.tolist(), df.columns.tolist())`,
          task: `Write (none of them may change the table passed in):<br>
            • <code>add_revenue(df)</code> → a copy with a new column <code>revenue</code> = <code>units</code> × <code>price</code><br>
            • <code>tidy_columns(df)</code> → a copy whose column names are stripped of outer spaces, lowercase, with spaces replaced by <code>_</code><br>
            • <code>without(df, cols)</code> → a copy without the listed columns`,
          starter: d`
            import pandas as pd

            def add_revenue(df):
                df["revenue"] = df["units"] * df["price"]
                return df

            def tidy_columns(df):
                pass

            def without(df, cols):
                pass
            `,
          solution: d`
            import pandas as pd

            def add_revenue(df):
                return df.assign(revenue=df["units"] * df["price"])

            def tidy_columns(df):
                out = df.copy()
                out.columns = out.columns.str.strip().str.lower().str.replace(" ", "_")
                return out

            def without(df, cols):
                return df.drop(columns=cols)`,
          hints: ["add_revenue: df.assign(revenue=df[\"units\"] * df[\"price\"]) returns a new table", "tidy_columns: out = df.copy(); out.columns = out.columns.str.strip().str.lower().str.replace(\" \", \"_\")", "without: df.drop(columns=cols)"],
          tests: [{ code: d`
            import pandas as pd
            ar = expect_func("add_revenue"); tc = expect_func("tidy_columns"); wo = expect_func("without")
            df = pd.DataFrame({"product": ["Sword", "Potion"], "units": [2, 10], "price": [120, 15]})
            expect_frame(ar(df), {"product": ["Sword", "Potion"], "units": [2, 10], "price": [120, 15], "revenue": [240, 150]}, "add_revenue(df)")
            expect_equal(df.columns.tolist(), ["product", "units", "price"], "the original table's columns after add_revenue (it must not change)")
            messy = pd.DataFrame({" Hero Name ": ["Lyra"], "Gold Coins": [5], "LEVEL": [3]})
            expect_equal(tc(messy).columns.tolist(), ["hero_name", "gold_coins", "level"], "tidy_columns(messy).columns")
            expect_equal(messy.columns.tolist(), [" Hero Name ", "Gold Coins", "LEVEL"], "the original columns after tidy_columns (must not change)")
            expect_frame(wo(df, ["price"]), {"product": ["Sword", "Potion"], "units": [2, 10]}, 'without(df, ["price"])')
            expect_equal(df.columns.tolist(), ["product", "units", "price"], "the original after without (must not change)")` }],
        },
        {
          id: "pd2-4", type: "quiz", title: "Riddles of the Table",
          story: "The table-keepers ask about brackets, shapes and the strange things read_csv does.",
          lesson: `<p>Single brackets give a Series, double brackets a DataFrame. <code>read_csv</code> guesses types: a column of numbers loses leading zeros, and one bad value turns a whole column into text (<code>object</code>).</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2], "b": [3, 4]})
                print(type(df["a"]).__name__, type(df[["a"]]).__name__)`,
              choices: ["Series DataFrame", "DataFrame DataFrame", "Series Series", "list DataFrame"], answer: 0,
              explain: "One name → one column (Series). A list of names → a table (DataFrame), even if the list has one name." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                print(df.shape, len(df), df.size)`,
              choices: ["(3, 2) 3 6", "(2, 3) 2 6", "(3, 2) 2 6", "(3, 2) 3 3"], answer: 0,
              explain: "3 rows and 2 columns; <code>len</code> counts rows; <code>size</code> counts every cell." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd, io
                d = pd.read_csv(io.StringIO("code,qty\n007,3\n042,x\n"))
                print(d["code"].tolist(), d["qty"].dtype)`,
              choices: ["[7, 42] object", "['007', '042'] int64", "[7, 42] int64", "['007', '042'] object"], answer: 0,
              explain: "\"007\" looked like a number, so it became 7. The \"x\" means qty can't be numeric, so it's read as text. Use <code>dtype={\"code\": str}</code> to keep the zeros." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2], "b": [3, 4]})
                df["c"] = df["a"] * 10
                print(df.columns.tolist(), df["c"].tolist())`,
              choices: ["['a', 'b', 'c'] [10, 20]", "['c', 'a', 'b'] [10, 20]", "['a', 'b'] [10, 20]", "['a', 'b', 'c'] [1, 2]"], answer: 0,
              explain: "Assigning to a new column name adds it at the end." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2], "b": [3, 4], "t": ["x", "y"]})
                print(df.describe().loc["mean"].tolist())`,
              choices: ["[1.5, 3.5]", "[1.5, 3.5, nan]", "[2.0, 4.0]", "[3.0, 7.0]"], answer: 0,
              explain: "<code>describe()</code> summarises only the numeric columns by default." },
          ],
        },
        {
          id: "pd2-5", boss: true, time: 720, title: "The Hero Registry",
          story: "Empress Mei asks for a summary of every registered hero, and a band for each one: novice, veteran or legend.",
          lesson: `<p>Useful tools for a first summary:</p>
            <ul><li><code>df["col"].idxmax()</code> → the row label of the maximum; <code>df.loc[label, "name"]</code> → that row's name</li>
            <li><code>df["class"].unique()</code> → the distinct values; <code>sorted(...)</code> sorts them</li>
            <li><code>df.isna().sum().sum()</code> → the total number of missing cells</li>
            <li><code>pd.cut(values, bins=[0, 9, 29, float("inf")], labels=["novice", "veteran", "legend"])</code> → puts each number into a labelled range ("bin"): (0, 9], (9, 29], (29, ∞). Add <code>.astype(str)</code> for plain text</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df.head(3))
            print(df["gold"].idxmax(), df.loc[df["gold"].idxmax(), "name"])
            print(df.isna().sum())
            print(pd.cut(pd.Series([3, 15, 35]), bins=[0, 9, 29, float("inf")], labels=["low", "mid", "high"]).astype(str).tolist())`,
          files: { "heroes.csv": HEROES },
          task: `Using <code>heroes.csv</code>, write:<br>
            • <code>registry_report(path)</code> → a dict with <code>"rows"</code>, <code>"columns"</code> (list of names), <code>"avg_level"</code> (rounded to 2), <code>"richest"</code> (name of the hero with the most gold), <code>"classes"</code> (sorted list of the distinct classes) and <code>"missing"</code> (total number of missing cells)<br>
            • <code>level_band(df)</code> → a copy with a new text column <code>band</code>: <code>"novice"</code> for level 1–9, <code>"veteran"</code> for 10–29, <code>"legend"</code> for 30 and up`,
          starter: d`
            import pandas as pd

            def registry_report(path):
                df = pd.read_csv(path)
                return {}

            def level_band(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def registry_report(path):
                df = pd.read_csv(path)
                return {
                    "rows": len(df),
                    "columns": df.columns.tolist(),
                    "avg_level": round(float(df["level"].mean()), 2),
                    "richest": df.loc[df["gold"].idxmax(), "name"],
                    "classes": sorted(df["class"].unique()),
                    "missing": int(df.isna().sum().sum()),
                }

            def level_band(df):
                out = df.copy()
                out["band"] = pd.cut(out["level"], bins=[0, 9, 29, float("inf")], labels=["novice", "veteran", "legend"]).astype(str)
                return out`,
          hints: ["richest: df.loc[df[\"gold\"].idxmax(), \"name\"] (idxmax skips missing values)", "missing: int(df.isna().sum().sum())", "band: pd.cut(out[\"level\"], bins=[0, 9, 29, float(\"inf\")], labels=[...]).astype(str)"],
          tests: [{ code: d`
            import pandas as pd
            rr = expect_func("registry_report"); lb = expect_func("level_band")
            ref = pd.read_csv("heroes.csv")
            r = rr("heroes.csv")
            expect_equal(r.get("rows"), 20, "rows")
            expect_equal(r.get("columns"), ref.columns.tolist(), "columns")
            expect_close(r.get("avg_level"), round(ref["level"].mean(), 2), "avg_level")
            expect_equal(r.get("richest"), ref.loc[ref["gold"].idxmax(), "name"], "richest")
            expect_equal(r.get("classes"), ["Archer", "Healer", "Knight", "Mage"], "classes")
            expect_equal(r.get("missing"), 6, "missing")
            t = pd.DataFrame({"name": list("abcdef"), "level": [1, 9, 10, 29, 30, 40]})
            out = lb(t)
            expect_equal(out["band"].astype(str).tolist(), ["novice", "novice", "veteran", "veteran", "legend", "legend"], "level_band bands for levels 1, 9, 10, 29, 30, 40")
            assert "band" not in t.columns, "level_band must not change the table passed in."` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "Choosing Wisely", topic: "loc, iloc, set_index & safe edits", time: 480, icon: "🎯",
      intro: "A wise ruler asks for exactly the rows and columns she needs, by name or by number, and never edits by accident.",
      missions: [
        {
          id: "pd3-1", title: "Pick Rows and Columns",
          story: "The Empress's advisors ask for precise extracts: these columns, those rows, that one cell.",
          lesson: `<p>DataFrames take <b>two</b> selectors, rows first: <code>df.loc[rows, columns]</code> (by label) and <code>df.iloc[rows, columns]</code> (by position).</p>
            <ul><li><code>df.loc[:, ["name", "level"]]</code> → all rows, two columns</li>
            <li><code>df.iloc[:3]</code> → the first 3 rows; <code>df.iloc[:, -1]</code> → the last column</li>
            <li><code>df.iloc[2]["name"]</code> or <code>df["name"].iloc[2]</code> → one cell; <code>df.at[label, "name"]</code> is the fast way by label</li>
            <li><code>df.loc[df["level"] &gt; 10, "name"]</code> → rows by condition, one column</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df.loc[:, ["name", "level"]].head(3))
            print(df.iloc[:2, :3])
            print(df.iloc[-1, 0], df.at[4, "class"])
            print(df.loc[df["level"] > 35, "name"].tolist())`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>name_and_level(df)</code> → only the <code>name</code> and <code>level</code> columns<br>
            • <code>first_rows(df, n)</code> → the first <code>n</code> rows<br>
            • <code>cell(df, pos, col)</code> → the value in column <code>col</code> of the row at position <code>pos</code><br>
            • <code>names_above(df, level)</code> → a list of the names of heroes with a level above <code>level</code>`,
          starter: d`
            import pandas as pd

            def name_and_level(df):
                pass

            def first_rows(df, n):
                pass

            def cell(df, pos, col):
                pass

            def names_above(df, level):
                pass
            `,
          solution: d`
            import pandas as pd

            def name_and_level(df):
                return df.loc[:, ["name", "level"]]

            def first_rows(df, n):
                return df.iloc[:n]

            def cell(df, pos, col):
                return df[col].iloc[pos]

            def names_above(df, level):
                return df.loc[df["level"] > level, "name"].tolist()`,
          hints: ["name_and_level: df.loc[:, [\"name\", \"level\"]] (or df[[...]])", "first_rows: df.iloc[:n]", "cell: df[col].iloc[pos]", "names_above: df.loc[df[\"level\"] > level, \"name\"].tolist()"],
          tests: [{ code: d`
            import pandas as pd
            nl = expect_func("name_and_level"); fr = expect_func("first_rows"); ce = expect_func("cell"); na = expect_func("names_above")
            df = pd.read_csv("heroes.csv")
            expect_frame(nl(df), df[["name", "level"]], "name_and_level(heroes)")
            expect_frame(fr(df, 3), df.head(3), "first_rows(heroes, 3)")
            expect_equal(ce(df, 2, "name"), df["name"].iloc[2], 'cell(heroes, 2, "name")')
            expect_equal(ce(df, -1, "level"), int(df["level"].iloc[-1]), 'cell(heroes, -1, "level")')
            expect_equal(na(df, 30), df.loc[df["level"] > 30, "name"].tolist(), "names_above(heroes, 30)")
            shuffled = df.sample(frac=1, random_state=1)
            expect_equal(ce(shuffled, 0, "name"), shuffled["name"].iloc[0], "cell on a shuffled table (by position, not label)")` }],
        },
        {
          id: "pd3-2", title: "The Index Key",
          story: "Searching the table by row number is slow and error-prone. Use the heroes' names as the key.",
          lesson: `<p>The row labels are the <b>index</b>. By default it's 0, 1, 2…, but any column can become the index:</p>
            <ul><li><code>df.set_index("name")</code> → the names become row labels, so <code>.loc["Lyra"]</code> finds Lyra's row</li>
            <li><code>df.reset_index()</code> → turn the index back into a column; <code>reset_index(drop=True)</code> → throw it away and number rows 0, 1, 2… again</li>
            <li><code>df.sort_index()</code> → rows ordered by label</li>
            <li><code>row.to_dict()</code> turns one row (a Series) into a dict</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            h = df.set_index("name")
            print(h.loc["Mira", ["class", "level"]].to_dict())
            print(h.sort_index().index[:4].tolist())
            print(df[df["level"] > 30].reset_index(drop=True).head(2))`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>by_name(df)</code> → the table with <code>name</code> as its index<br>
            • <code>stats_of(df, name)</code> → a dict of that hero's <code>level</code> and <code>gold</code>: <code>{"level": …, "gold": …}</code><br>
            • <code>alphabetical(df)</code> → the table indexed by name, rows sorted alphabetically<br>
            • <code>renumber(df)</code> → the same rows with the index reset to 0, 1, 2… (the old index thrown away)`,
          starter: d`
            import pandas as pd

            def by_name(df):
                pass

            def stats_of(df, name):
                pass

            def alphabetical(df):
                pass

            def renumber(df):
                return df.reset_index()
            `,
          solution: d`
            import pandas as pd

            def by_name(df):
                return df.set_index("name")

            def stats_of(df, name):
                return df.set_index("name").loc[name, ["level", "gold"]].to_dict()

            def alphabetical(df):
                return df.set_index("name").sort_index()

            def renumber(df):
                return df.reset_index(drop=True)`,
          hints: ["by_name: df.set_index(\"name\")", "stats_of: df.set_index(\"name\").loc[name, [\"level\", \"gold\"]].to_dict()", "alphabetical: set_index then sort_index()", "renumber: reset_index(drop=True)"],
          tests: [{ code: d`
            import pandas as pd
            bn = expect_func("by_name"); so = expect_func("stats_of"); al = expect_func("alphabetical"); rn = expect_func("renumber")
            df = pd.read_csv("heroes.csv")
            expect_frame(bn(df), df.set_index("name"), "by_name(heroes)")
            r = so(df, "Mira")
            row = df[df["name"] == "Mira"].iloc[0]
            expect_close([r.get("level"), r.get("gold")], [row["level"], row["gold"]], 'stats_of(heroes, "Mira")')
            expect_equal(al(df).index[:3].tolist(), ["Anna", "Bo", "Cass"], "alphabetical(heroes): first three names")
            part = df[df["level"] > 20]
            expect_frame(rn(part), part.reset_index(drop=True), "renumber(heroes above level 20)")` }],
        },
        {
          id: "pd3-3", title: "Edit in Place",
          story: "A careless scribe changed a copy of the registry and the real one at the same time. Learn to edit safely.",
          lesson: `<p>To change cells that match a condition, use <b>one</b> <code>.loc</code> call: <code>df.loc[df["name"] == "Lyra", "level"] = 20</code>.</p>
            <p>Writing <code>df[df["level"] &gt; 10]["level"] = 0</code> (two steps, "chained") may change a temporary copy and silently do nothing. pandas warns about it with <code>SettingWithCopyWarning</code>.</p>
            <ul><li>Functions should usually leave their input alone: start with <code>out = df.copy()</code></li>
            <li><code>s.isin([...])</code> → True for values in the list</li>
            <li><code>s.clip(upper=x)</code> caps values; <code>s.replace(old, new)</code> swaps values</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"name": ["Lyra", "Orin", "Mira"], "level": [5, 9, 12]})
            out = df.copy()
            out.loc[out["name"].isin(["Lyra", "Mira"]), "level"] += 1
            print(out)
            print(df["level"].tolist())    # unchanged`,
          task: `Write (each returns a <b>new</b> table and leaves the input unchanged):<br>
            • <code>promote(df, names)</code> → the heroes whose name is in the list <code>names</code> gain 1 level<br>
            • <code>cap_gold(df, cap)</code> → no hero has more than <code>cap</code> gold<br>
            • <code>rename_class(df, old, new)</code> → every <code>old</code> class becomes <code>new</code>`,
          starter: d`
            import pandas as pd

            def promote(df, names):
                df[df["name"].isin(names)]["level"] += 1
                return df

            def cap_gold(df, cap):
                pass

            def rename_class(df, old, new):
                pass
            `,
          solution: d`
            import pandas as pd

            def promote(df, names):
                out = df.copy()
                out.loc[out["name"].isin(names), "level"] += 1
                return out

            def cap_gold(df, cap):
                out = df.copy()
                out["gold"] = out["gold"].clip(upper=cap)
                return out

            def rename_class(df, old, new):
                out = df.copy()
                out["class"] = out["class"].replace(old, new)
                return out`,
          hints: ["Start each function with out = df.copy()", "promote: out.loc[out[\"name\"].isin(names), \"level\"] += 1", "cap_gold: out[\"gold\"] = out[\"gold\"].clip(upper=cap)", "rename_class: out[\"class\"] = out[\"class\"].replace(old, new)"],
          tests: [{ code: d`
            import pandas as pd
            pr = expect_func("promote"); cg = expect_func("cap_gold"); rc = expect_func("rename_class")
            df = pd.DataFrame({"name": ["Lyra", "Orin", "Mira"], "class": ["Mage", "Knight", "Mage"], "level": [5, 9, 12], "gold": [100.0, 900.0, None]})
            before = df.copy()
            expect_equal(pr(df, ["Lyra", "Mira"])["level"].tolist(), [6, 9, 13], 'promote(df, ["Lyra", "Mira"]) levels')
            expect_equal(pr(df, [])["level"].tolist(), [5, 9, 12], "promote(df, []) levels")
            g = cg(df, 500)["gold"]
            expect_equal(g.iloc[:2].tolist(), [100.0, 500.0], "cap_gold(df, 500) gold")
            assert pd.isna(g.iloc[2]), "cap_gold should leave a missing gold value missing."
            expect_equal(rc(df, "Mage", "Wizard")["class"].tolist(), ["Wizard", "Knight", "Wizard"], 'rename_class(df, "Mage", "Wizard")')
            expect_frame(df, before, "the original table after all three functions (it must not change)")` }],
        },
        {
          id: "pd3-4", type: "quiz", title: "Riddles of Choice",
          story: "The Empress's advisors test you: label or position? Inclusive or not?",
          lesson: `<p><code>loc</code> = labels, end included. <code>iloc</code> = positions, end excluded. After filtering or setting a new index, labels and positions no longer match, which is exactly when mixing them up causes bugs.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                print(len(df.loc[0:1]), len(df.iloc[0:1]))`,
              choices: ["2 1", "1 1", "2 2", "1 2"], answer: 0,
              explain: "<code>loc[0:1]</code> includes label 1 (two rows); <code>iloc[0:1]</code> stops before position 1 (one row)." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                print(df.loc[df["a"] > 1, "b"].tolist())`,
              choices: ["[5, 6]", "[2, 3]", "[4, 5, 6]", "[False, True, True]"], answer: 0,
              explain: "Rows where a &gt; 1 (the last two), column b." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                f = df[df["a"] > 1]
                print(f.index.tolist(), f.loc[2, "b"], f.iloc[0, 1])`,
              choices: ["[1, 2] 6 5", "[0, 1] 6 5", "[1, 2] 5 5", "[0, 1] 5 6"], answer: 0,
              explain: "Filtering keeps the original labels 1 and 2. Label 2 is the row with b = 6; position 0 is the row with b = 5." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                d2 = df.set_index("a")
                print(d2.loc[2, "b"], d2.columns.tolist())`,
              choices: ["5 ['b']", "6 ['b']", "5 ['a', 'b']", "6 ['a', 'b']"], answer: 0,
              explain: "Column a became the index (no longer a column). The row labelled 2 has b = 5." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
                print(df.iloc[[0, 2]]["b"].tolist(), df.iloc[-1].tolist())`,
              choices: ["[4, 6] [3, 6]", "[4, 5] [3, 6]", "[4, 6] [6]", "[1, 3] [3, 6]"], answer: 0,
              explain: "Rows at positions 0 and 2, then column b. <code>iloc[-1]</code> is the whole last row." },
          ],
        },
        {
          id: "pd3-5", boss: true, time: 720, title: "The Guild Ledger",
          story: "Each guild keeps its own ledger. The Empress wants hero cards, ranges of columns, and safe corrections.",
          lesson: `<p>All the selection tools together:</p>
            <ul><li><code>df.loc[:, "class":"hp"]</code> → a <b>range</b> of columns by name, both ends included</li>
            <li><code>df.iloc[::2]</code> → every other row; <code>df.iloc[:r, :c]</code> → a top-left block</li>
            <li><code>df.sort_values("level", ascending=False)</code> → rows ordered by a column (more on Floor 5)</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df.loc[:, "class":"hp"].head(2))
            print(df.iloc[::5, :2])
            print(df[df["guild"] == "Dawn"].sort_values("level", ascending=False)["name"].tolist())`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>hero_card(df, name)</code> → a dict of every column of that hero's row except <code>name</code><br>
            • <code>column_range(df, first, last)</code> → the columns from <code>first</code> to <code>last</code> (both included)<br>
            • <code>every_other(df)</code> → rows 0, 2, 4…<br>
            • <code>guild_roster(df, guild)</code> → a list of the names in that guild, highest level first<br>
            • <code>set_level(df, name, level)</code> → a new table where that hero's level is <code>level</code> (input unchanged)`,
          starter: d`
            import pandas as pd

            def hero_card(df, name):
                pass

            def column_range(df, first, last):
                pass

            def every_other(df):
                pass

            def guild_roster(df, guild):
                pass

            def set_level(df, name, level):
                pass
            `,
          solution: d`
            import pandas as pd

            def hero_card(df, name):
                return df.set_index("name").loc[name].to_dict()

            def column_range(df, first, last):
                return df.loc[:, first:last]

            def every_other(df):
                return df.iloc[::2]

            def guild_roster(df, guild):
                g = df[df["guild"] == guild]
                return g.sort_values("level", ascending=False)["name"].tolist()

            def set_level(df, name, level):
                out = df.copy()
                out.loc[out["name"] == name, "level"] = level
                return out`,
          hints: ["hero_card: df.set_index(\"name\").loc[name].to_dict()", "column_range: df.loc[:, first:last]", "guild_roster: filter the guild, sort_values(\"level\", ascending=False), take the names", "set_level: out = df.copy(); out.loc[out[\"name\"] == name, \"level\"] = level"],
          tests: [{ code: d`
            import pandas as pd
            hc = expect_func("hero_card"); cr = expect_func("column_range"); eo = expect_func("every_other"); gr = expect_func("guild_roster"); sl = expect_func("set_level")
            df = pd.read_csv("heroes.csv")
            before = df.copy()
            card = hc(df, "Orin")
            want = df.set_index("name").loc["Orin"].to_dict()
            expect_equal(sorted(card), sorted(want), 'keys of hero_card(heroes, "Orin")')
            expect_equal((card["class"], int(card["level"]), card["joined"]), (want["class"], int(want["level"]), want["joined"]), 'hero_card(heroes, "Orin") values')
            expect_frame(cr(df, "class", "hp"), df[["class", "level", "hp"]], 'column_range(heroes, "class", "hp")')
            expect_frame(eo(df), df.iloc[::2], "every_other(heroes)")
            ref = df[df["guild"] == "Frost"].sort_values("level", ascending=False)["name"].tolist()
            expect_equal(gr(df, "Frost"), ref, 'guild_roster(heroes, "Frost")')
            expect_equal(gr(df, "Nowhere"), [], 'guild_roster(heroes, "Nowhere")')
            out = sl(df, "Zed", 99)
            expect_equal(int(out.loc[out["name"] == "Zed", "level"].iloc[0]), 99, 'set_level(heroes, "Zed", 99)')
            expect_frame(df, before, "the original table (it must not change)")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Filter Gate", topic: "boolean filters, query, isin & string matching", time: 480, icon: "⛩️",
      intro: "Only the rows that answer the gatekeeper's question may pass. Filtering is the most common thing you'll ever do to a table.",
      missions: [
        {
          id: "pd4-1", title: "Open the Gate",
          story: "The gatekeeper lets through only the orders the Empress asks about: big ones, from certain regions, in a certain price range.",
          lesson: `<p>A condition on a column gives a True/False Series; <code>df[condition]</code> keeps the True rows.</p>
            <ul><li>Combine with <code>&amp;</code> (and), <code>|</code> (or), <code>~</code> (not), each condition in parentheses: <code>df[(df["units"] &gt;= 10) &amp; (df["region"] == "North")]</code></li>
            <li><code>df["region"].isin(["North", "East"])</code> → True for any value in the list</li>
            <li><code>df["price"].between(50, 100)</code> → inclusive range</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(df[df["units"] >= 18])
            print(len(df[(df["region"] == "North") & (df["product"] == "Potion")]))
            print(df[df["region"].isin(["East", "West"]) & ~(df["product"] == "Bow")].head(3))`,
          files: { "sales.csv": SALES },
          task: `Write (for the sales table):<br>• <code>big_orders(df, n)</code> → orders with at least <code>n</code> units<br>
            • <code>region_product(df, region, product)</code> → orders of that product in that region<br>
            • <code>in_regions(df, regions)</code> → orders from any region in the list<br>
            • <code>price_between(df, lo, hi)</code> → orders whose price is from <code>lo</code> to <code>hi</code>, inclusive`,
          starter: d`
            import pandas as pd

            def big_orders(df, n):
                pass

            def region_product(df, region, product):
                pass

            def in_regions(df, regions):
                pass

            def price_between(df, lo, hi):
                pass
            `,
          solution: d`
            import pandas as pd

            def big_orders(df, n):
                return df[df["units"] >= n]

            def region_product(df, region, product):
                return df[(df["region"] == region) & (df["product"] == product)]

            def in_regions(df, regions):
                return df[df["region"].isin(regions)]

            def price_between(df, lo, hi):
                return df[df["price"].between(lo, hi)]`,
          hints: ["big_orders: df[df[\"units\"] >= n]", "region_product: two conditions in parentheses joined by &", "in_regions: df[df[\"region\"].isin(regions)]", "price_between: df[df[\"price\"].between(lo, hi)]"],
          tests: [{ code: d`
            import pandas as pd
            must_not_use("for", "while", "listcomp")
            bo = expect_func("big_orders"); rp = expect_func("region_product"); ir = expect_func("in_regions"); pb = expect_func("price_between")
            df = pd.read_csv("sales.csv")
            expect_frame(bo(df, 18), df[df["units"] >= 18], "big_orders(sales, 18)")
            expect_frame(rp(df, "North", "Potion"), df[(df.region == "North") & (df["product"] == "Potion")], 'region_product(sales, "North", "Potion")')
            expect_frame(ir(df, ["East", "West"]), df[df.region.isin(["East", "West"])], 'in_regions(sales, ["East", "West"])')
            expect_frame(pb(df, 60, 85), df[(df.price >= 60) & (df.price <= 85)], "price_between(sales, 60, 85)")
            expect_equal(len(pb(df, 1000, 2000)), 0, "price_between(sales, 1000, 2000) rows")` }],
        },
        {
          id: "pd4-2", title: "Ask the Oracle",
          story: "The oracle answers questions written in plain words: \"units above ten and region North\".",
          lesson: `<p><code>df.query("units &gt; 10 and region == 'North'")</code> filters with a readable string. Inside it you can write <code>and</code>, <code>or</code>, <code>not</code>, and compare columns by name.</p>
            <ul><li>Use a Python variable with <code>@</code>: <code>df.query("units &gt;= @n")</code></li>
            <li>Text values need quotes inside the string: <code>"product == 'Bow'"</code></li>
            <li>Lists work too: <code>df.query("region in ['North', 'East']")</code></li></ul>
            <p><code>query</code> and boolean indexing do the same job; choose whichever reads better.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            n = 15
            print(df.query("units >= @n and product != 'Potion'"))
            print(df.query("region in ['North', 'South'] and price > 80").shape)`,
          files: { "sales.csv": SALES },
          task: `Write, using <code>query</code>:<br>• <code>at_least(df, n)</code> → orders with at least <code>n</code> units (use <code>@n</code>)<br>
            • <code>cheap_or_bulk(df)</code> → orders with a price below 50 <b>or</b> at least 15 units<br>
            • <code>not_product(df, product)</code> → every order except that product`,
          starter: d`
            import pandas as pd

            def at_least(df, n):
                pass

            def cheap_or_bulk(df):
                pass

            def not_product(df, product):
                pass
            `,
          solution: d`
            import pandas as pd

            def at_least(df, n):
                return df.query("units >= @n")

            def cheap_or_bulk(df):
                return df.query("price < 50 or units >= 15")

            def not_product(df, product):
                return df.query("product != @product")`,
          hints: ["at_least: df.query(\"units >= @n\")", "cheap_or_bulk: df.query(\"price < 50 or units >= 15\")", "not_product: df.query(\"product != @product\")"],
          tests: [{ code: d`
            import pandas as pd
            must_call("query")
            al = expect_func("at_least"); cb = expect_func("cheap_or_bulk"); np_ = expect_func("not_product")
            df = pd.read_csv("sales.csv")
            expect_frame(al(df, 12), df[df.units >= 12], "at_least(sales, 12)")
            expect_frame(cb(df), df[(df.price < 50) | (df.units >= 15)], "cheap_or_bulk(sales)")
            expect_frame(np_(df, "Potion"), df[df["product"] != "Potion"], 'not_product(sales, "Potion")')` }],
        },
        {
          id: "pd4-3", title: "Words in the Wind",
          story: "The herald only remembers part of a name. Find every hero whose name matches.",
          lesson: `<p>Text columns have a <code>.str</code> accessor with string methods for the whole column:</p>
            <ul><li><code>df["name"].str.contains("ra", case=False)</code> → True where the text appears (any case)</li>
            <li><code>.str.startswith("M")</code>, <code>.str.endswith("a")</code>, <code>.str.len()</code>, <code>.str.lower()</code></li>
            <li>Missing values give NaN in the result; add <code>na=False</code> to <code>contains</code> to treat them as no match</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df[df["name"].str.contains("a", case=False)]["name"].tolist())
            print(df[df["name"].str.len() == 2]["name"].tolist())
            print(df["guild"].str.startswith("F", na=False).sum())`,
          files: { "heroes.csv": HEROES },
          task: `Write (each returns a list of names, in table order):<br>• <code>names_with(df, text)</code> → names containing <code>text</code>, ignoring upper/lower case<br>
            • <code>names_starting(df, letter)</code> → names starting with <code>letter</code><br>
            • <code>long_names(df, n)</code> → names longer than <code>n</code> characters<br>
            • <code>guild_like(df, text)</code> → names of heroes whose guild contains <code>text</code> (any case; heroes without a guild never match)`,
          starter: d`
            import pandas as pd

            def names_with(df, text):
                return df[df["name"].str.contains(text)]["name"].tolist()

            def names_starting(df, letter):
                pass

            def long_names(df, n):
                pass

            def guild_like(df, text):
                pass
            `,
          solution: d`
            import pandas as pd

            def names_with(df, text):
                return df[df["name"].str.contains(text, case=False)]["name"].tolist()

            def names_starting(df, letter):
                return df[df["name"].str.startswith(letter)]["name"].tolist()

            def long_names(df, n):
                return df[df["name"].str.len() > n]["name"].tolist()

            def guild_like(df, text):
                return df[df["guild"].str.contains(text, case=False, na=False)]["name"].tolist()`,
          hints: ["names_with: .str.contains(text, case=False)", "names_starting: .str.startswith(letter)", "long_names: .str.len() > n", "guild_like: .str.contains(text, case=False, na=False) on the guild column"],
          tests: [{ code: d`
            import pandas as pd
            nw = expect_func("names_with"); ns = expect_func("names_starting"); ln = expect_func("long_names"); gl = expect_func("guild_like")
            df = pd.read_csv("heroes.csv")
            expect_equal(nw(df, "a"), df[df.name.str.lower().str.contains("a")].name.tolist(), 'names_with(heroes, "a")')
            expect_equal(nw(df, "LY"), ["Lyra"], 'names_with(heroes, "LY")')
            expect_equal(ns(df, "M"), ["Mira", "Moe"], 'names_starting(heroes, "M")')
            expect_equal(ln(df, 3), df[df.name.str.len() > 3].name.tolist(), "long_names(heroes, 3)")
            expect_equal(gl(df, "ROST"), df[df.guild.fillna("").str.lower().str.contains("rost")].name.tolist(), 'guild_like(heroes, "ROST")')` }],
        },
        {
          id: "pd4-4", type: "quiz", title: "Riddles of the Gate",
          story: "The gatekeeper's riddles: which rows pass, and which spells raise errors?",
          lesson: `<p><code>&amp;</code> and <code>|</code> need parentheses around each condition (they bind more tightly than <code>&gt;</code> and <code>==</code>). Python's <code>and</code>/<code>or</code> don't work on Series. Filtering keeps the original index labels.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 5, 3], "b": ["x", "y", "x"]})
                print(df[(df["a"] > 2) & (df["b"] == "x")]["a"].tolist())`,
              choices: ["[3]", "[5, 3]", "[1, 3]", "[]"], answer: 0,
              explain: "Only the last row has a &gt; 2 and b == \"x\"." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 5, 3], "b": ["x", "y", "x"]})
                print(df[df["a"] > 2 and df["b"] == "x"])`,
              choices: ["ValueError", "the last row", "an empty table", "KeyError"], answer: 0,
              explain: "<code>and</code> asks whether the whole Series is True, which is ambiguous. Use <code>&amp;</code>." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 5, 3], "b": ["x", "y", "x"]})
                print(df[df["b"].isin(["y", "z"])].index.tolist(), df.query("a >= 3").shape)`,
              choices: ["[1] (2, 2)", "[0] (2, 2)", "[1] (1, 2)", "['y'] (2, 2)"], answer: 0,
              explain: "The row labelled 1 holds \"y\". Two rows have a ≥ 3, and both columns are kept." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series(["Ann", None, "joanna"])
                print(s.str.contains("ann", case=False, na=False).tolist())`,
              choices: ["[True, False, True]", "[True, None, True]", "[False, False, True]", "[True, nan, True]"], answer: 0,
              explain: "Ignoring case, both \"Ann\" and \"joanna\" contain \"ann\"; <code>na=False</code> turns the missing value into False." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, 2, 3, 4])
                print(s[s.between(2, 3)].tolist(), s[~(s > 2)].tolist())`,
              choices: ["[2, 3] [1, 2]", "[2] [1, 2]", "[2, 3] [3, 4]", "[3] [1]"], answer: 0,
              explain: "<code>between</code> includes both ends. <code>~</code> flips the mask." },
          ],
        },
        {
          id: "pd4-5", boss: true, time: 720, title: "The Watchtower Report",
          story: "The watchtower reports to the Empress each month: what sold, where, and which orders look suspicious.",
          lesson: `<p>Filters combine with everything else you know:</p>
            <ul><li>Dates stored as text like <code>"2024-02-14"</code>: <code>.str.startswith("2024-02")</code> selects a month (real date handling comes on Floor 8)</li>
            <li><code>df.nlargest(n, "units")</code> → the <code>n</code> rows with the most units</li>
            <li><code>len(filtered)</code> or <code>mask.sum()</code> → how many rows match</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            feb = df[df["date"].str.startswith("2024-02")]
            print(len(feb), feb.nlargest(2, "units"))
            print(((df["product"] == "Bow") & (df["units"] > 10)).sum())`,
          files: { "sales.csv": SALES },
          task: `Write:<br>• <code>orders_in_month(df, month)</code> → the orders whose date starts with <code>month</code> (like <code>"2024-02"</code>)<br>
            • <code>top_orders(df, region, n)</code> → the <code>n</code> orders from that region with the most units<br>
            • <code>suspicious(df)</code> → orders with 18 or more units, <b>or</b> Sword orders with 10 or more units<br>
            • <code>watch_report(df)</code> → a dict: <code>"north_swords"</code> (number of Sword orders in North), <code>"big"</code> (orders with at least 15 units), <code>"early_potions"</code> (Potion orders in January or February)`,
          starter: d`
            import pandas as pd

            def orders_in_month(df, month):
                pass

            def top_orders(df, region, n):
                pass

            def suspicious(df):
                pass

            def watch_report(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def orders_in_month(df, month):
                return df[df["date"].str.startswith(month)]

            def top_orders(df, region, n):
                return df[df["region"] == region].nlargest(n, "units")

            def suspicious(df):
                return df[(df["units"] >= 18) | ((df["product"] == "Sword") & (df["units"] >= 10))]

            def watch_report(df):
                early = df["date"].str.startswith("2024-01") | df["date"].str.startswith("2024-02")
                return {
                    "north_swords": int(((df["region"] == "North") & (df["product"] == "Sword")).sum()),
                    "big": int((df["units"] >= 15).sum()),
                    "early_potions": int((early & (df["product"] == "Potion")).sum()),
                }`,
          hints: ["orders_in_month: df[df[\"date\"].str.startswith(month)]", "top_orders: filter the region, then .nlargest(n, \"units\")", "suspicious: (A) | ((B) & (C))", "Counts: (condition).sum(); turn them into int()"],
          tests: [{ code: d`
            import pandas as pd
            om = expect_func("orders_in_month"); to = expect_func("top_orders"); su = expect_func("suspicious"); wr = expect_func("watch_report")
            df = pd.read_csv("sales.csv")
            expect_frame(om(df, "2024-02"), df[df.date.str[:7] == "2024-02"], 'orders_in_month(sales, "2024-02")')
            expect_frame(to(df, "East", 3), df[df.region == "East"].nlargest(3, "units"), 'top_orders(sales, "East", 3)')
            expect_frame(su(df), df[(df.units >= 18) | ((df["product"] == "Sword") & (df.units >= 10))], "suspicious(sales)")
            r = wr(df)
            want = {"north_swords": int(((df.region == "North") & (df["product"] == "Sword")).sum()),
                    "big": int((df.units >= 15).sum()),
                    "early_potions": int((df.date.str[:7].isin(["2024-01", "2024-02"]) & (df["product"] == "Potion")).sum())}
            expect_equal(r, want, "watch_report(sales)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Sorting Hall", topic: "sorting, ranking & calculated columns", time: 540, icon: "🏯",
      intro: "In the Sorting Hall the heroes line up by any measure the Empress names, and new measures are invented on the spot.",
      missions: [
        {
          id: "pd5-1", title: "Order the Ranks",
          story: "Line the heroes up: by level, by class and level, by wealth.",
          lesson: `<ul><li><code>df.sort_values("level", ascending=False)</code> → highest level first</li>
            <li>Several columns: <code>df.sort_values(["class", "level"], ascending=[True, False])</code> → class A–Z, and within a class the highest level first</li>
            <li>Missing values go last (<code>na_position="first"</code> to change that)</li>
            <li><code>df.nlargest(n, "gold")</code> / <code>df.nsmallest(n, "gold")</code> → quick top/bottom n</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df.sort_values("level", ascending=False)[["name", "level"]].head(3))
            print(df.sort_values(["class", "level"], ascending=[True, False])[["class", "name", "level"]].head(4))
            print(df.nsmallest(2, "gold")[["name", "gold"]])`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>by_level(df)</code> → rows sorted by level, highest first<br>
            • <code>by_class_then_level(df)</code> → sorted by class A–Z, then level highest first<br>
            • <code>richest(df, n)</code> → the <code>n</code> rows with the most gold<br>
            • <code>names_z_to_a(df)</code> → a list of all names in reverse alphabetical order`,
          starter: d`
            import pandas as pd

            def by_level(df):
                return df.sort_values("level")

            def by_class_then_level(df):
                pass

            def richest(df, n):
                pass

            def names_z_to_a(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def by_level(df):
                return df.sort_values("level", ascending=False)

            def by_class_then_level(df):
                return df.sort_values(["class", "level"], ascending=[True, False])

            def richest(df, n):
                return df.nlargest(n, "gold")

            def names_z_to_a(df):
                return df["name"].sort_values(ascending=False).tolist()`,
          hints: ["by_level: sort_values(\"level\", ascending=False)", "by_class_then_level: sort_values([\"class\", \"level\"], ascending=[True, False])", "richest: df.nlargest(n, \"gold\")", "names_z_to_a: df[\"name\"].sort_values(ascending=False).tolist()"],
          tests: [{ code: d`
            import pandas as pd
            bl = expect_func("by_level"); bc = expect_func("by_class_then_level"); ri = expect_func("richest"); nz = expect_func("names_z_to_a")
            df = pd.read_csv("heroes.csv")
            expect_equal(bl(df)["level"].tolist(), sorted(df.level, reverse=True), "levels after by_level(heroes)")
            got = bc(df)
            expect_equal(list(zip(got["class"], got["level"])), sorted(zip(df["class"], df.level), key=lambda t: (t[0], -t[1])), "(class, level) order after by_class_then_level(heroes)")
            expect_frame(ri(df, 3), df.nlargest(3, "gold"), "richest(heroes, 3)")
            expect_equal(nz(df), sorted(df.name, reverse=True), "names_z_to_a(heroes)")` }],
        },
        {
          id: "pd5-2", title: "Calculated Columns",
          story: "The Empress invents new measures every day: revenue, order size, price band. Add them to the ledger.",
          lesson: `<p>New columns are usually built from whole-column maths (fast):</p>
            <ul><li><code>df["revenue"] = df["units"] * df["price"]</code></li>
            <li><code>np.where(df["units"] &gt;= 10, "big", "small")</code> → one of two values per row</li>
            <li><code>pd.cut(df["price"], bins=[0, 20, 90, np.inf], labels=["cheap", "mid", "premium"])</code> → number ranges become labels</li>
            <li><code>df["name"].map(func)</code> or <code>.apply(func)</code> runs a Python function on each value: flexible, but slower. Use it when no vectorized way exists</li></ul>`,
          example: d`
            import pandas as pd
            import numpy as np

            df = pd.read_csv("sales.csv").head(5)
            out = df.copy()
            out["revenue"] = out["units"] * out["price"]
            out["size"] = np.where(out["units"] >= 10, "big", "small")
            out["band"] = pd.cut(out["price"], bins=[0, 20, 90, np.inf], labels=["cheap", "mid", "premium"]).astype(str)
            out["code"] = out["product"].map(lambda p: p[:3].upper())
            print(out)`,
          files: { "sales.csv": SALES },
          task: `Write (each returns a copy with the new column; the input stays unchanged):<br>
            • <code>with_revenue(df)</code> → <code>revenue</code> = units × price<br>
            • <code>with_size(df)</code> → <code>size</code> = <code>"big"</code> when units ≥ 10, else <code>"small"</code><br>
            • <code>with_discount(df)</code> → <code>final_price</code> = price with 10% off for orders of 15+ units (otherwise the full price), rounded to 2 decimals<br>
            • <code>with_band(df)</code> → <code>band</code> (text): <code>"cheap"</code> for price ≤ 20, <code>"mid"</code> for ≤ 90, else <code>"premium"</code>`,
          starter: d`
            import pandas as pd
            import numpy as np

            def with_revenue(df):
                pass

            def with_size(df):
                pass

            def with_discount(df):
                pass

            def with_band(df):
                pass
            `,
          solution: d`
            import pandas as pd
            import numpy as np

            def with_revenue(df):
                return df.assign(revenue=df["units"] * df["price"])

            def with_size(df):
                return df.assign(size=np.where(df["units"] >= 10, "big", "small"))

            def with_discount(df):
                return df.assign(final_price=np.where(df["units"] >= 15, df["price"] * 0.9, df["price"]).round(2))

            def with_band(df):
                band = pd.cut(df["price"], bins=[0, 20, 90, np.inf], labels=["cheap", "mid", "premium"]).astype(str)
                return df.assign(band=band)`,
          hints: ["df.assign(new_column=...) returns a copy with the column added", "with_size: np.where(df[\"units\"] >= 10, \"big\", \"small\")", "with_discount: np.where(df[\"units\"] >= 15, df[\"price\"] * 0.9, df[\"price\"]).round(2)", "with_band: pd.cut(df[\"price\"], bins=[0, 20, 90, np.inf], labels=[...]).astype(str)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            wr = expect_func("with_revenue"); ws = expect_func("with_size"); wd = expect_func("with_discount"); wb = expect_func("with_band")
            df = pd.read_csv("sales.csv")
            before = df.copy()
            expect_series(wr(df)["revenue"], df.units * df.price, "revenue column")
            expect_equal(ws(df)["size"].tolist(), ["big" if u >= 10 else "small" for u in df.units], "size column")
            expect_series(wd(df)["final_price"], pd.Series(np.where(df.units >= 15, df.price * 0.9, df.price)).round(2), "final_price column", check_index=False)
            expect_equal(wb(df)["band"].astype(str).tolist(), ["cheap" if p <= 20 else "mid" if p <= 90 else "premium" for p in df.price], "band column")
            expect_frame(df, before, "the original table (must not change)")` }],
        },
        {
          id: "pd5-3", title: "The Ranking Ritual",
          story: "Every hero receives a rank: first, second… and heroes of equal level must share their rank fairly.",
          lesson: `<p><code>s.rank(ascending=False)</code> numbers the values from the best. Ties need a rule (<code>method</code>):</p>
            <ul><li><code>"min"</code> → tied values share the best rank, and the next rank is skipped (1, 2, 2, 4), like sports</li>
            <li><code>"dense"</code> → no gaps (1, 2, 2, 3)</li>
            <li><code>pct=True</code> → the rank as a fraction from 0 to 1 (a percentile)</li></ul>
            <p>"The best row of each group": sort, then keep the first row of every group with <code>drop_duplicates("class")</code>.</p>`,
          example: d`
            import pandas as pd

            s = pd.Series([50, 80, 80, 30], index=["a", "b", "c", "d"])
            print(s.rank(ascending=False, method="min").tolist())
            print(s.rank(ascending=False, method="dense").astype(int).tolist())
            df = pd.read_csv("heroes.csv")
            print(df.sort_values("level", ascending=False).drop_duplicates("class")[["class", "name", "level"]])`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>dense_rank(df)</code> → a Series (same index as <code>df</code>) of int ranks by level, highest level = 1, ties share a rank, no gaps<br>
            • <code>best_per_class(df)</code> → one row per class: the hero with the highest level, sorted by class A–Z<br>
            • <code>level_percentile(df)</code> → a Series: each hero's level as a percentile rank (0–1, ascending), rounded to 2 decimals`,
          starter: d`
            import pandas as pd

            def dense_rank(df):
                return df["level"].rank()

            def best_per_class(df):
                pass

            def level_percentile(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def dense_rank(df):
                return df["level"].rank(ascending=False, method="dense").astype(int)

            def best_per_class(df):
                return df.sort_values("level", ascending=False).drop_duplicates("class").sort_values("class")

            def level_percentile(df):
                return df["level"].rank(pct=True).round(2)`,
          hints: ["dense_rank: rank(ascending=False, method=\"dense\").astype(int)", "best_per_class: sort by level (highest first), drop_duplicates(\"class\"), then sort_values(\"class\")", "level_percentile: rank(pct=True).round(2)"],
          tests: [{ code: d`
            import pandas as pd
            dr = expect_func("dense_rank"); bp = expect_func("best_per_class"); lp = expect_func("level_percentile")
            t = pd.DataFrame({"name": list("abcde"), "class": ["X", "Y", "X", "Y", "X"], "level": [50, 80, 80, 30, 50]})
            expect_series(dr(t), [2, 1, 1, 3, 2], "dense_rank(levels 50 80 80 30 50)")
            df = pd.read_csv("heroes.csv")
            ref = df.sort_values("level", ascending=False).drop_duplicates("class").sort_values("class")
            expect_equal(bp(df)[["class", "name"]].values.tolist(), ref[["class", "name"]].values.tolist(), "best_per_class(heroes) (class, name)")
            expect_series(lp(df), df.level.rank(pct=True).round(2), "level_percentile(heroes)")` }],
        },
        {
          id: "pd5-4", type: "quiz", title: "Riddles of the Hall",
          story: "The hall-master asks about ties, missing values and the order of things.",
          lesson: `<p>Sorting keeps each row's original index label (only the order changes). Missing values sort last. <code>nlargest</code> keeps the first row on ties unless you ask <code>keep="all"</code>.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([10, 20, 20, 30])
                print(s.rank(ascending=False, method="min").tolist(), s.rank(ascending=False, method="dense").tolist())`,
              choices: ["[4.0, 2.0, 2.0, 1.0] [3.0, 2.0, 2.0, 1.0]", "[4.0, 3.0, 2.0, 1.0] [3.0, 2.0, 2.0, 1.0]", "[1.0, 2.0, 2.0, 4.0] [1.0, 2.0, 2.0, 3.0]", "[4.0, 2.5, 2.5, 1.0] [3.0, 2.0, 2.0, 1.0]"], answer: 0,
              explain: "30 is best (1); the two 20s share rank 2. With \"min\" the next rank is 4; with \"dense\" it's 3." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"n": ["b", "a", "c"], "v": [2, 2, 1]})
                print(df.sort_values(["v", "n"], ascending=[False, True])["n"].tolist())`,
              choices: ["['a', 'b', 'c']", "['b', 'a', 'c']", "['c', 'a', 'b']", "['c', 'b', 'a']"], answer: 0,
              explain: "v high to low puts the two 2s first; among them n is sorted A to Z." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.Series([3, None, 1]).sort_values().tolist())`,
              choices: ["[1.0, 3.0, nan]", "[nan, 1.0, 3.0]", "[1.0, 3.0]", "[1, 3, None]"], answer: 0,
              explain: "Missing values go to the end by default." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"n": ["b", "a", "c"], "v": [2, 2, 1]})
                print(df.sort_values("n").index.tolist())`,
              choices: ["[1, 0, 2]", "[0, 1, 2]", "[2, 0, 1]", "['a', 'b', 'c']"], answer: 0,
              explain: "Rows keep their original labels when sorted: \"a\" was row 1, \"b\" row 0, \"c\" row 2." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"n": ["b", "a", "c"], "v": [2, 2, 1]})
                print(df.nlargest(1, "v")["n"].tolist(), df.nlargest(1, "v", keep="all")["n"].tolist())`,
              choices: ["['b'] ['b', 'a']", "['a'] ['a', 'b']", "['b'] ['b']", "['b', 'a'] ['b', 'a']"], answer: 0,
              explain: "On a tie, <code>nlargest</code> keeps the first row; <code>keep=\"all\"</code> keeps every tied row." },
          ],
        },
        {
          id: "pd5-5", boss: true, time: 810, title: "The Tournament Ladder",
          story: "The Empress holds a tournament. Every hero gets a power score and a place on the ladder.",
          lesson: `<p>A ladder is: compute a score, sort by it (with a tie-break), and number the places.</p>
            <ul><li><code>df["gold"].fillna(0)</code> → treat missing gold as 0 (more on Floor 6)</li>
            <li><code>sort_values(["power", "name"], ascending=[False, True])</code> → ties broken by name</li>
            <li><code>reset_index(drop=True)</code>, then the place is the position + 1</li>
            <li><code>set_index("class")["name"].to_dict()</code> → a dict from two columns</li></ul>`,
          example: d`
            import pandas as pd

            t = pd.DataFrame({"name": ["b", "a", "c"], "score": [5.0, 5.0, 9.0]})
            lad = t.sort_values(["score", "name"], ascending=[False, True]).reset_index(drop=True)
            lad.insert(0, "place", range(1, len(lad) + 1))
            print(lad)`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>with_power(df)</code> → a copy with <code>power</code> = level × 10 + hp ÷ 10 + gold ÷ 100 (missing hp or gold count as 0), rounded to 1 decimal<br>
            • <code>ladder(df)</code> → a new table with columns <code>place, name, class, power</code>: sorted by power (highest first, ties by name A–Z), places 1, 2, 3…, index 0, 1, 2…<br>
            • <code>class_champions(df)</code> → a dict <code>{class: name of the most powerful hero in it}</code><br>
            • <code>rising_stars(df, max_level)</code> → names of heroes with level ≤ <code>max_level</code> whose power is at least the median power of all heroes, most powerful first`,
          starter: d`
            import pandas as pd

            def with_power(df):
                pass

            def ladder(df):
                pass

            def class_champions(df):
                pass

            def rising_stars(df, max_level):
                pass
            `,
          solution: d`
            import pandas as pd

            def with_power(df):
                power = df["level"] * 10 + df["hp"].fillna(0) / 10 + df["gold"].fillna(0) / 100
                return df.assign(power=power.round(1))

            def ladder(df):
                p = with_power(df).sort_values(["power", "name"], ascending=[False, True]).reset_index(drop=True)
                p["place"] = range(1, len(p) + 1)
                return p[["place", "name", "class", "power"]]

            def class_champions(df):
                p = with_power(df).sort_values("power", ascending=False).drop_duplicates("class")
                return p.set_index("class")["name"].to_dict()

            def rising_stars(df, max_level):
                p = with_power(df)
                stars = p[(p["level"] <= max_level) & (p["power"] >= p["power"].median())]
                return stars.sort_values("power", ascending=False)["name"].tolist()`,
          hints: ["power: df[\"level\"] * 10 + df[\"hp\"].fillna(0) / 10 + df[\"gold\"].fillna(0) / 100, then .round(1)", "ladder: sort_values([\"power\", \"name\"], ascending=[False, True]).reset_index(drop=True), then p[\"place\"] = range(1, len(p) + 1)", "class_champions: sort by power, drop_duplicates(\"class\"), set_index(\"class\")[\"name\"].to_dict()", "rising_stars: two conditions, then sort by power"],
          tests: [{ code: d`
            import pandas as pd
            wp = expect_func("with_power"); la = expect_func("ladder"); cc = expect_func("class_champions"); rs = expect_func("rising_stars")
            df = pd.read_csv("heroes.csv")
            before = df.copy()
            pw = (df.level * 10 + df.hp.fillna(0) / 10 + df.gold.fillna(0) / 100).round(1)
            expect_series(wp(df)["power"], pw, "power column")
            P = df.assign(power=pw)
            ref = P.sort_values(["power", "name"], ascending=[False, True]).reset_index(drop=True)
            ref.insert(0, "place", range(1, len(ref) + 1))
            expect_frame(la(df), ref[["place", "name", "class", "power"]], "ladder(heroes)")
            expect_equal(cc(df), P.sort_values("power", ascending=False).drop_duplicates("class").set_index("class")["name"].to_dict(), "class_champions(heroes)")
            want = P[(P.level <= 25) & (P.power >= P.power.median())].sort_values("power", ascending=False).name.tolist()
            expect_equal(rs(df, 25), want, "rising_stars(heroes, 25)")
            expect_frame(df, before, "the original table (must not change)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "Missing Pieces", topic: "NaN: find, fill, drop & interpolate", time: 540, icon: "🧩",
      intro: "Real records always have holes. A data scientist finds every one, then decides: fill it, or drop it?",
      missions: [
        {
          id: "pd6-1", title: "Find the Gaps",
          story: "The registry has empty cells. Before fixing anything, the Empress wants to know exactly where they are.",
          lesson: `<p>pandas marks missing values as <code>NaN</code> (or <code>None</code> in text columns). Never test with <code>== None</code>:</p>
            <ul><li><code>df.isna()</code> → a True/False table; <code>df.notna()</code> → the opposite</li>
            <li><code>df.isna().sum()</code> → missing count per column; <code>df.isna().mean() * 100</code> → percent missing</li>
            <li><code>df[df.isna().any(axis=1)]</code> → rows with at least one gap</li>
            <li><code>df.dropna()</code> → only complete rows</li>
            <li>Statistics like <code>mean()</code> and <code>sum()</code> skip NaN automatically; <code>count()</code> counts only non-missing values</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            print(df.isna().sum())
            print((df.isna().mean() * 100).round(1))
            print(df[df.isna().any(axis=1)][["name", "hp", "gold", "guild"]])`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>missing_per_column(df)</code> → a Series: number of missing values per column<br>
            • <code>rows_with_missing(df)</code> → the rows that have at least one missing value<br>
            • <code>complete_rows(df)</code> → the rows with no missing values<br>
            • <code>missing_share(df)</code> → a Series: percent of missing values per column, rounded to 1 decimal`,
          starter: d`
            import pandas as pd

            def missing_per_column(df):
                return (df == None).sum()

            def rows_with_missing(df):
                pass

            def complete_rows(df):
                pass

            def missing_share(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def missing_per_column(df):
                return df.isna().sum()

            def rows_with_missing(df):
                return df[df.isna().any(axis=1)]

            def complete_rows(df):
                return df.dropna()

            def missing_share(df):
                return (df.isna().mean() * 100).round(1)`,
          hints: ["missing_per_column: df.isna().sum()", "rows_with_missing: df[df.isna().any(axis=1)]", "complete_rows: df.dropna()", "missing_share: (df.isna().mean() * 100).round(1)"],
          tests: [{ code: d`
            import pandas as pd
            mp = expect_func("missing_per_column"); rw = expect_func("rows_with_missing"); cr = expect_func("complete_rows"); ms = expect_func("missing_share")
            df = pd.read_csv("heroes.csv")
            expect_series(mp(df), {"name": 0, "class": 0, "level": 0, "hp": 1, "gold": 2, "guild": 3, "joined": 0}, "missing_per_column(heroes)")
            expect_frame(rw(df), df[df.isna().any(axis=1)], "rows_with_missing(heroes)")
            expect_frame(cr(df), df.dropna(), "complete_rows(heroes)")
            expect_series(ms(df), {"name": 0.0, "class": 0.0, "level": 0.0, "hp": 5.0, "gold": 10.0, "guild": 15.0, "joined": 0.0}, "missing_share(heroes)")` }],
        },
        {
          id: "pd6-2", title: "Fill the Gaps",
          story: "Some gaps can be repaired: a sensible number, a placeholder word, or a value guessed from the neighbours.",
          lesson: `<p><code>fillna</code> replaces missing values. What to fill with is a <b>decision</b> that affects your results:</p>
            <ul><li>A fixed value: <code>df["gold"].fillna(0)</code>; a placeholder: <code>df["guild"].fillna("Unknown")</code></li>
            <li>A typical value: <code>s.fillna(s.median())</code> (the median is safer than the mean when there are outliers)</li>
            <li>For ordered data (time series): <code>s.ffill()</code> copies the last known value forward; <code>s.interpolate()</code> draws a straight line between known neighbours</li>
            <li>Several columns at once: <code>df.fillna({"gold": 0, "guild": "Unknown"})</code></li></ul>`,
          example: d`
            import pandas as pd

            s = pd.Series([10.0, None, None, 16.0, None])
            print(s.fillna(0).tolist())
            print(s.ffill().tolist())
            print(s.interpolate().tolist())
            df = pd.read_csv("heroes.csv")
            print(df.fillna({"gold": 0, "guild": "Unknown"}).isna().sum().sum())`,
          files: { "heroes.csv": HEROES },
          task: `Write (each returns a new object; the input stays unchanged):<br>• <code>fill_gold_zero(df)</code> → the table with missing gold set to 0<br>
            • <code>fill_with_median(df, col)</code> → the table with missing values in <code>col</code> set to that column's median<br>
            • <code>fill_guild(df)</code> → the table with missing guilds set to <code>"Unaffiliated"</code><br>
            • <code>smooth(s)</code> → the Series with gaps filled by linear interpolation`,
          starter: d`
            import pandas as pd

            def fill_gold_zero(df):
                df["gold"] = df["gold"].fillna(0)
                return df

            def fill_with_median(df, col):
                pass

            def fill_guild(df):
                pass

            def smooth(s):
                pass
            `,
          solution: d`
            import pandas as pd

            def fill_gold_zero(df):
                return df.fillna({"gold": 0})

            def fill_with_median(df, col):
                return df.fillna({col: df[col].median()})

            def fill_guild(df):
                return df.fillna({"guild": "Unaffiliated"})

            def smooth(s):
                return s.interpolate()`,
          hints: ["df.fillna({\"gold\": 0}) returns a new table", "fill_with_median: df.fillna({col: df[col].median()})", "smooth: s.interpolate()"],
          tests: [{ code: d`
            import pandas as pd
            fg = expect_func("fill_gold_zero"); fm = expect_func("fill_with_median"); fu = expect_func("fill_guild"); sm = expect_func("smooth")
            df = pd.read_csv("heroes.csv")
            before = df.copy()
            expect_series(fg(df)["gold"], df.gold.fillna(0), "gold after fill_gold_zero")
            expect_series(fm(df, "hp")["hp"], df.hp.fillna(df.hp.median()), 'hp after fill_with_median(heroes, "hp")')
            expect_series(fm(df, "gold")["gold"], df.gold.fillna(df.gold.median()), 'gold after fill_with_median(heroes, "gold")')
            g = fu(df)["guild"]
            expect_equal(int((g == "Unaffiliated").sum()), 3, "number of Unaffiliated heroes")
            expect_series(sm(pd.Series([10.0, None, None, 16.0])), [10.0, 12.0, 14.0, 16.0], "smooth([10 nan nan 16])")
            expect_frame(df, before, "the original table (must not change)")` }],
        },
        {
          id: "pd6-3", title: "Choose to Drop",
          story: "Some rows are too damaged to trust, and some columns are mostly empty. Cut them away, carefully.",
          lesson: `<ul><li><code>df.dropna(subset=["gold", "hp"])</code> → drop rows missing <b>these</b> columns only</li>
            <li><code>df.dropna(thresh=k)</code> → keep rows with at least <code>k</code> non-missing values</li>
            <li><code>df.dropna(axis=1, how="all")</code> → drop columns that are completely empty</li>
            <li>To drop columns that are <b>mostly</b> empty: compute <code>df.isna().mean()</code> and keep the columns below your limit</li></ul>
            <p>Dropping is easy but throws information away. Always check how many rows you lose.</p>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"a": [1, None, 3, None], "b": [None, None, 6, 7], "c": [None] * 4})
            print(df.dropna(subset=["a"]))
            print(df.dropna(thresh=2))
            share = df.isna().mean()
            print(share.tolist(), df.loc[:, share <= 0.5].columns.tolist())`,
          task: `Write:<br>• <code>drop_if_missing(df, cols)</code> → rows that have a value in every column listed in <code>cols</code><br>
            • <code>keep_mostly_complete(df, k)</code> → rows with at least <code>k</code> non-missing values<br>
            • <code>drop_sparse_columns(df, max_share)</code> → the table without the columns whose share of missing values is above <code>max_share</code> (a number from 0 to 1)`,
          starter: d`
            import pandas as pd

            def drop_if_missing(df, cols):
                return df.dropna()

            def keep_mostly_complete(df, k):
                pass

            def drop_sparse_columns(df, max_share):
                pass
            `,
          solution: d`
            import pandas as pd

            def drop_if_missing(df, cols):
                return df.dropna(subset=cols)

            def keep_mostly_complete(df, k):
                return df.dropna(thresh=k)

            def drop_sparse_columns(df, max_share):
                return df.loc[:, df.isna().mean() <= max_share]`,
          hints: ["drop_if_missing: df.dropna(subset=cols)", "keep_mostly_complete: df.dropna(thresh=k)", "drop_sparse_columns: df.loc[:, df.isna().mean() <= max_share]"],
          tests: [{ code: d`
            import pandas as pd
            dm = expect_func("drop_if_missing"); km = expect_func("keep_mostly_complete"); ds = expect_func("drop_sparse_columns")
            df = pd.DataFrame({"a": [1, None, 3, None, 5], "b": [None, None, 6, 7, 8], "c": [None, None, None, 1, None], "d": [1, 2, 3, 4, 5]})
            expect_frame(dm(df, ["a"]), df.iloc[[0, 2, 4]], 'drop_if_missing(df, ["a"])')
            expect_frame(dm(df, ["a", "b"]), df.iloc[[2, 4]], 'drop_if_missing(df, ["a", "b"])')
            expect_frame(km(df, 3), df.iloc[[2, 3, 4]], "keep_mostly_complete(df, 3)")
            expect_frame(ds(df, 0.5), df[["a", "b", "d"]], "drop_sparse_columns(df, 0.5)")
            expect_frame(ds(df, 0.3), df[["d"]], "drop_sparse_columns(df, 0.3)")` }],
        },
        {
          id: "pd6-4", type: "quiz", title: "Riddles of the Gaps",
          story: "The gap-keeper's riddles: what counts, what's skipped, what fills in?",
          lesson: `<p>Most statistics skip NaN. <code>len</code> counts every row; <code>count</code> only the filled ones. NaN is never equal to anything, so <code>== None</code> and <code>== np.nan</code> never find gaps.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, None, 3])
                print(s.sum(), s.mean(), s.count(), len(s))`,
              choices: ["4.0 2.0 2 3", "nan nan 3 3", "4.0 1.33 3 3", "4.0 2.0 3 3"], answer: 0,
              explain: "The gap is skipped: sum 4, mean of the two values 2, count 2, but the Series still has 3 rows." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, None, 3])
                print((s == None).sum(), s.isna().sum())`,
              choices: ["0 1", "1 1", "1 0", "0 0"], answer: 0,
              explain: "NaN is not equal to anything, so <code>== None</code> finds nothing. Always use <code>isna()</code>." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, None, None, 4])
                print(s.ffill().tolist(), s.interpolate().tolist())`,
              choices: ["[1.0, 1.0, 1.0, 4.0] [1.0, 2.0, 3.0, 4.0]", "[1.0, 4.0, 4.0, 4.0] [1.0, 2.0, 3.0, 4.0]", "[1.0, 1.0, 1.0, 4.0] [1.0, 2.5, 2.5, 4.0]", "[1.0, 0.0, 0.0, 4.0] [1.0, 2.0, 3.0, 4.0]"], answer: 0,
              explain: "<code>ffill</code> repeats the last known value; <code>interpolate</code> draws a straight line from 1 to 4." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, None], "b": [None, None]})
                print(df.dropna().shape, df.dropna(how="all").shape, df.dropna(axis=1, how="all").shape)`,
              choices: ["(0, 2) (1, 2) (2, 1)", "(1, 2) (1, 2) (2, 1)", "(0, 2) (0, 2) (2, 0)", "(2, 2) (1, 2) (2, 1)"], answer: 0,
              explain: "Every row has a gap, so <code>dropna()</code> leaves none. Only row 1 is completely empty. Only column b is completely empty." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([2, None, 10])
                print(s.fillna(s.mean()).tolist())`,
              choices: ["[2.0, 6.0, 10.0]", "[2.0, 4.0, 10.0]", "[2.0, 0.0, 10.0]", "[2.0, nan, 10.0]"], answer: 0,
              explain: "The mean of the known values is (2 + 10) / 2 = 6." },
          ],
        },
        {
          id: "pd6-5", boss: true, time: 810, title: "Restore the Registry",
          story: "The Empress orders the registry restored: every gap filled with the most sensible value, and a log of every repair.",
          lesson: `<p>Smart filling uses <b>similar</b> rows: a Mage's missing gold is better guessed from other Mages than from everyone.</p>
            <p><code>df.groupby("class")["gold"].transform("median")</code> gives, for every row, the median gold of that row's class (you'll master <code>groupby</code> on Floor 9). Then <code>df["gold"].fillna(that)</code> fills each gap with its own class's median.</p>
            <p>A <b>repair log</b> records what was changed: find the missing cells with <code>isna()</code> <i>before</i> filling.</p>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"cls": ["A", "A", "B", "B"], "v": [10.0, None, 1.0, None]})
            med = df.groupby("cls")["v"].transform("median")
            print(med.tolist())
            print(df["v"].fillna(med).tolist())
            print(df.loc[df["v"].isna(), "cls"].tolist())`,
          files: { "heroes.csv": HEROES },
          task: `Write:<br>• <code>restore(df)</code> → a new table where missing <code>gold</code> is the median gold of the hero's class, missing <code>hp</code> is <code>level × 10 + 50</code>, and missing <code>guild</code> is <code>"Unaffiliated"</code><br>
            • <code>missing_report(df)</code> → a dict <code>{column: count}</code> for the columns that have any missing values<br>
            • <code>repair_log(df)</code> → a list of strings <code>"NAME: column"</code> for every missing cell, row by row (table order), columns in table order`,
          starter: d`
            import pandas as pd

            def restore(df):
                return df.fillna(0)

            def missing_report(df):
                pass

            def repair_log(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def restore(df):
                out = df.copy()
                out["gold"] = out["gold"].fillna(out.groupby("class")["gold"].transform("median"))
                out["hp"] = out["hp"].fillna(out["level"] * 10 + 50)
                out["guild"] = out["guild"].fillna("Unaffiliated")
                return out

            def missing_report(df):
                counts = df.isna().sum()
                return {k: int(v) for k, v in counts[counts > 0].items()}

            def repair_log(df):
                log = []
                gaps = df.isna()
                for i in df.index:
                    for col in df.columns:
                        if gaps.loc[i, col]:
                            log.append(f"{df.loc[i, 'name']}: {col}")
                return log`,
          hints: ["gold: out[\"gold\"].fillna(out.groupby(\"class\")[\"gold\"].transform(\"median\"))", "hp: out[\"hp\"].fillna(out[\"level\"] * 10 + 50) (a Series can fill a Series, row by row)", "missing_report: counts = df.isna().sum(); keep counts > 0", "repair_log: loop over df.index and df.columns, checking gaps = df.isna()"],
          tests: [{ code: d`
            import pandas as pd
            rs = expect_func("restore"); mr = expect_func("missing_report"); rl = expect_func("repair_log")
            df = pd.read_csv("heroes.csv")
            before = df.copy()
            out = rs(df)
            expect_equal(int(out[["gold", "hp", "guild"]].isna().sum().sum()), 0, "missing values left after restore")
            med = df.groupby("class")["gold"].transform("median")
            expect_series(out["gold"], df.gold.fillna(med), "gold after restore (class medians)")
            expect_series(out["hp"], df.hp.fillna(df.level * 10 + 50), "hp after restore")
            expect_equal(out["guild"].tolist(), df.guild.fillna("Unaffiliated").tolist(), "guild after restore")
            expect_equal(mr(df), {"hp": 1, "gold": 2, "guild": 3}, "missing_report(heroes)")
            want = [f"{df.loc[i, 'name']}: {c}" for i in df.index for c in df.columns if pd.isna(df.loc[i, c])]
            expect_equal(rl(df), want, "repair_log(heroes)")
            expect_frame(df, before, "the original table (must not change)")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "Clean Ink", topic: "types, text cleaning & duplicates", time: 600, icon: "🖌️",
      intro: "The census scrolls were copied by tired scribes: stray spaces, shouting capitals, money written as text, the same person twice.",
      missions: [
        {
          id: "pd7-1", title: "Fix the Types",
          story: "The census lists ages like \"unknown\" and incomes like \"$1,200\". Numbers stored as text can't be added up.",
          lesson: `<p>When a column contains even one non-number, <code>read_csv</code> keeps it as text (<code>object</code>). Fix it:</p>
            <ul><li><code>pd.to_numeric(s, errors="coerce")</code> → numbers, and anything unreadable becomes NaN (instead of an error)</li>
            <li>Clean the text first: <code>s.str.replace("[$,]", "", regex=True)</code> removes <code>$</code> and commas</li>
            <li><code>s.astype(float)</code> converts when every value is valid; <code>astype(int)</code> fails if there are NaNs</li>
            <li>Check the result with <code>df.dtypes</code></li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("census_raw.csv")
            print(df.dtypes)
            print(pd.to_numeric(df["age"], errors="coerce").tolist())
            print(df["income"].str.replace("[$,]", "", regex=True).tolist())`,
          files: { "census_raw.csv": CENSUS },
          task: `Write:<br>• <code>to_numbers(s)</code> → the text Series as numbers; anything that isn't a number becomes NaN<br>
            • <code>parse_money(s)</code> → amounts like <code>"$1,200"</code> as floats (<code>1200.0</code>); missing values stay missing<br>
            • <code>fix_ages(df)</code> → a copy of the census table whose <code>age</code> column is numeric (unreadable ages become NaN)`,
          starter: d`
            import pandas as pd

            def to_numbers(s):
                return s.astype(float)

            def parse_money(s):
                pass

            def fix_ages(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def to_numbers(s):
                return pd.to_numeric(s, errors="coerce")

            def parse_money(s):
                return pd.to_numeric(s.str.replace("[$,]", "", regex=True), errors="coerce")

            def fix_ages(df):
                return df.assign(age=pd.to_numeric(df["age"], errors="coerce"))`,
          hints: ["to_numbers: pd.to_numeric(s, errors=\"coerce\")", "parse_money: remove $ and commas with s.str.replace(\"[$,]\", \"\", regex=True), then to_numeric", "fix_ages: df.assign(age=...)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            tn = expect_func("to_numbers"); pm = expect_func("parse_money"); fa = expect_func("fix_ages")
            expect_series(tn(pd.Series(["1", "x", "3.5", None])), [1.0, np.nan, 3.5, np.nan], 'to_numbers(["1", "x", "3.5", None])')
            expect_series(pm(pd.Series(["$1,200", "$95", None, "$3,100.50"])), [1200.0, 95.0, np.nan, 3100.5], "parse_money(...)")
            df = pd.read_csv("census_raw.csv")
            out = fa(df)
            expect_series(out["age"], [29, np.nan, 41, 35, 29, 52, 17, np.nan], "age after fix_ages(census)")
            assert df["age"].dtype == object, "fix_ages must not change the table passed in."` }],
        },
        {
          id: "pd7-2", title: "Scrub the Text",
          story: "\"  Lyra Stone \", \"MIRA KEEN\", \"zed hollow\": the same kind of thing written three different ways.",
          lesson: `<p>The <code>.str</code> accessor cleans a whole text column at once:</p>
            <ul><li><code>.str.strip()</code> → remove outer spaces; <code>.str.title()</code> → "Each Word Capitalised"; <code>.str.lower()</code> / <code>.str.upper()</code></li>
            <li><code>.str.replace("old", "new")</code> → swap text</li>
            <li><code>.str.split(" ", n=1, expand=True)</code> → split into columns (at most one split → 2 columns)</li></ul>
            <p>Clean text <b>before</b> grouping, counting or removing duplicates, or "Oakvale" and "oakvale" will be treated as two places.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("census_raw.csv")
            print(df["city"].value_counts().to_dict())
            print(df["city"].str.strip().str.title().value_counts().to_dict())
            print(df["name"].str.strip().str.split(" ", n=1, expand=True))`,
          files: { "census_raw.csv": CENSUS },
          task: `Write:<br>• <code>clean_names(s)</code> → names with outer spaces removed, in Title Case<br>
            • <code>normalize_city(s)</code> → cities with outer spaces removed, in Title Case<br>
            • <code>split_name(df)</code> → a copy with two new columns, <code>first</code> and <code>last</code>, from the cleaned name (split at the first space)`,
          starter: d`
            import pandas as pd

            def clean_names(s):
                return s.str.title()

            def normalize_city(s):
                pass

            def split_name(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def clean_names(s):
                return s.str.strip().str.title()

            def normalize_city(s):
                return s.str.strip().str.title()

            def split_name(df):
                out = df.copy()
                parts = clean_names(out["name"]).str.split(" ", n=1, expand=True)
                out["first"] = parts[0]
                out["last"] = parts[1]
                return out`,
          hints: ["clean_names: s.str.strip().str.title()", "split_name: parts = clean_names(df[\"name\"]).str.split(\" \", n=1, expand=True); parts[0] and parts[1] are the two columns"],
          tests: [{ code: d`
            import pandas as pd
            cn = expect_func("clean_names"); nc = expect_func("normalize_city"); sn = expect_func("split_name")
            expect_series(cn(pd.Series(["  Lyra Stone ", "MIRA KEEN", "zed hollow"])), ["Lyra Stone", "Mira Keen", "Zed Hollow"], "clean_names(...)")
            df = pd.read_csv("census_raw.csv")
            expect_equal(nc(df["city"]).value_counts().to_dict(), {"Oakvale": 4, "Stonebridge": 2, "Fernhill": 2}, "normalize_city(census city) counts")
            out = sn(df)
            expect_equal(out["first"].tolist(), ["Lyra", "Orin", "Mira", "Zed", "Lyra", "Anna", "Bo", "Cass"], "first names")
            expect_equal(out["last"].tolist(), ["Stone", "Vale", "Keen", "Hollow", "Stone", "Brook", "Finch", "Reed"], "last names")
            assert "first" not in df.columns, "split_name must not change the table passed in."` }],
        },
        {
          id: "pd7-3", title: "Twins and Doubles",
          story: "Lyra Stone was counted twice. Duplicates inflate every total: find them and remove them.",
          lesson: `<ul><li><code>df.duplicated()</code> → True for rows that repeat an <b>earlier</b> row exactly</li>
            <li><code>df.duplicated(subset=["name"])</code> → compare only some columns</li>
            <li><code>df.drop_duplicates(subset=..., keep="first")</code> → keep the first copy (or <code>keep="last"</code>)</li>
            <li><code>s.value_counts()</code> then filter counts &gt; 1 → which values repeat</li></ul>
            <p>Decide what "the same" means: same everything? same name? Clean the text first, or near-duplicates slip through.</p>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"name": ["Ann", "Bo", "Ann", "Ann"], "city": ["X", "Y", "X", "Z"]})
            print(df.duplicated().tolist(), df.duplicated(subset=["name"]).tolist())
            print(df.drop_duplicates(subset=["name"], keep="last"))
            vc = df["name"].value_counts()
            print(vc[vc > 1].index.tolist())`,
          task: `Write:<br>• <code>count_duplicates(df)</code> → how many rows exactly repeat an earlier row<br>
            • <code>dedupe(df, cols)</code> → the table keeping only the first row for each combination of the columns in <code>cols</code><br>
            • <code>repeated_values(s)</code> → a sorted list of the values that appear more than once`,
          starter: d`
            import pandas as pd

            def count_duplicates(df):
                pass

            def dedupe(df, cols):
                return df.drop_duplicates()

            def repeated_values(s):
                pass
            `,
          solution: d`
            import pandas as pd

            def count_duplicates(df):
                return int(df.duplicated().sum())

            def dedupe(df, cols):
                return df.drop_duplicates(subset=cols, keep="first")

            def repeated_values(s):
                vc = s.value_counts()
                return sorted(vc[vc > 1].index.tolist())`,
          hints: ["count_duplicates: int(df.duplicated().sum())", "dedupe: df.drop_duplicates(subset=cols, keep=\"first\")", "repeated_values: vc = s.value_counts(); sorted(vc[vc > 1].index.tolist())"],
          tests: [{ code: d`
            import pandas as pd
            cd = expect_func("count_duplicates"); dd = expect_func("dedupe"); rv = expect_func("repeated_values")
            df = pd.DataFrame({"name": ["Ann", "Bo", "Ann", "Ann", "Bo"], "city": ["X", "Y", "X", "Z", "Y"], "v": [1, 2, 1, 3, 2]})
            expect_equal(cd(df), 2, "count_duplicates(df)")
            expect_frame(dd(df, ["name"]), df.iloc[[0, 1]], 'dedupe(df, ["name"])')
            expect_frame(dd(df, ["name", "city"]), df.iloc[[0, 1, 3]], 'dedupe(df, ["name", "city"])')
            expect_equal(rv(pd.Series(["b", "a", "b", "c", "a", "b"])), ["a", "b"], "repeated_values(...)")
            expect_equal(rv(pd.Series([1, 2, 3])), [], "repeated_values with no repeats")` }],
        },
        {
          id: "pd7-4", type: "quiz", title: "Riddles of the Ink",
          story: "The scribes' riddles are about types and text: things that look the same but aren't.",
          lesson: `<p>Text that looks like a number is still text until you convert it. <code>astype(int)</code> cuts decimals off (like NumPy). <code>duplicated()</code> marks only the <b>later</b> copies.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.to_numeric(pd.Series(["1", "x", "3"]), errors="coerce").tolist())`,
              choices: ["[1.0, nan, 3.0]", "[1, 'x', 3]", "ValueError", "[1.0, 0.0, 3.0]"], answer: 0,
              explain: "<code>errors=\"coerce\"</code> turns unreadable values into NaN (so the result is float)." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.Series(["  ann LEE ", "BOB"]).str.strip().str.title().tolist())`,
              choices: ["['Ann Lee', 'Bob']", "['  Ann Lee ', 'Bob']", "['ann lee', 'bob']", "['Ann LEE', 'BOB']"], answer: 0,
              explain: "Strip removes outer spaces; title capitalises the first letter of each word and lowercases the rest." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"a": [1, 1, 2], "b": [5, 5, 5]})
                print(df.duplicated().tolist(), df.duplicated(subset=["b"]).sum())`,
              choices: ["[False, True, False] 2", "[True, True, False] 3", "[False, True, False] 1", "[False, False, False] 0"], answer: 0,
              explain: "Row 1 repeats row 0 exactly. Looking only at b, rows 1 and 2 both repeat row 0." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series(["$1,200", "$95"])
                print(s.str.replace("[$,]", "", regex=True).astype(float).sum())`,
              choices: ["1295.0", "$1,295", "120095", "ValueError"], answer: 0,
              explain: "After removing $ and commas the texts are \"1200\" and \"95\", which convert to floats." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.Series(["10", "9", "100"]).sort_values().tolist())`,
              choices: ["['10', '100', '9']", "['9', '10', '100']", "['100', '10', '9']", "[9, 10, 100]"], answer: 0,
              explain: "Text sorts letter by letter, so \"100\" comes before \"9\". Convert to numbers before sorting!" },
          ],
        },
        {
          id: "pd7-5", boss: true, time: 900, title: "The Census Cleanup",
          story: "Empress Mei needs a trustworthy census. Clean the raw scroll completely, then report on the people of the kingdom.",
          lesson: `<p>A cleaning pipeline usually goes: <b>fix text</b> → <b>fix types</b> → <b>remove duplicates</b> (only now do near-duplicates become exact) → <b>reset the index</b>.</p>
            <p>Write it as one function that returns a new table, so you can run it again whenever new raw data arrives.</p>`,
          example: d`
            import pandas as pd

            raw = pd.read_csv("census_raw.csv")
            print(raw)
            print(raw.duplicated().sum(), "exact duplicates before cleaning")`,
          files: { "census_raw.csv": CENSUS },
          task: `Write:<br>• <code>clean_census(path)</code> → read the CSV and return a clean table with the same columns: <code>name</code> and <code>city</code> stripped and in Title Case, <code>age</code> and <code>income</code> numeric (unreadable or missing → NaN; incomes like <code>"$1,200"</code> → <code>1200.0</code>), duplicate rows removed (after cleaning), index 0, 1, 2…<br>
            • <code>census_summary(df)</code> → for a cleaned table, a dict: <code>"people"</code> (rows), <code>"adults"</code> (age 18 or more), <code>"avg_income"</code> (mean income, ignoring missing, rounded to 2) and <code>"cities"</code> (<code>{city: number of people}</code>)`,
          starter: d`
            import pandas as pd

            def clean_census(path):
                return pd.read_csv(path)

            def census_summary(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def clean_census(path):
                df = pd.read_csv(path)
                df["name"] = df["name"].str.strip().str.title()
                df["city"] = df["city"].str.strip().str.title()
                df["age"] = pd.to_numeric(df["age"], errors="coerce")
                df["income"] = pd.to_numeric(df["income"].str.replace("[$,]", "", regex=True), errors="coerce")
                return df.drop_duplicates().reset_index(drop=True)

            def census_summary(df):
                return {
                    "people": len(df),
                    "adults": int((df["age"] >= 18).sum()),
                    "avg_income": round(float(df["income"].mean()), 2),
                    "cities": df["city"].value_counts().to_dict(),
                }`,
          hints: ["Clean name and city with .str.strip().str.title()", "age: pd.to_numeric(..., errors=\"coerce\"); income: remove [$,] first", "Only after cleaning: drop_duplicates().reset_index(drop=True)", "adults: (df[\"age\"] >= 18).sum() (NaN counts as False)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            cc = expect_func("clean_census"); cs = expect_func("census_summary")
            out = cc("census_raw.csv")
            expect_equal(out.columns.tolist(), ["name", "age", "city", "income", "joined"], "columns")
            expect_equal(out["name"].tolist(), ["Lyra Stone", "Orin Vale", "Mira Keen", "Zed Hollow", "Anna Brook", "Bo Finch", "Cass Reed"], "names (Lyra's duplicate removed)")
            expect_series(out["age"], [29, np.nan, 41, 35, 52, 17, np.nan], "age")
            expect_equal(out["city"].tolist(), ["Oakvale", "Oakvale", "Stonebridge", "Fernhill", "Stonebridge", "Oakvale", "Fernhill"], "city")
            expect_series(out["income"], [1200, 950, 2400, np.nan, 3100, 0, 1750], "income")
            expect_equal(out.index.tolist(), list(range(7)), "index")
            s = cs(out)
            expect_equal({k: s.get(k) for k in ("people", "adults")}, {"people": 7, "adults": 4}, "people and adults")
            expect_close(s.get("avg_income"), round((1200 + 950 + 2400 + 3100 + 0 + 1750) / 6, 2), "avg_income")
            expect_equal(s.get("cities"), {"Oakvale": 3, "Stonebridge": 2, "Fernhill": 2}, "cities")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 8, name: "The Calendar Room", topic: "dates, time series, resample & rolling", time: 600, icon: "📅",
      intro: "In the Calendar Room, every row has a moment in time. Days become weeks and months; noisy days become smooth trends.",
      missions: [
        {
          id: "pd8-1", title: "Read the Calendar",
          story: "The weather scrolls record dates as plain text. Teach pandas they're dates, and it can tell you the month, the weekday, the span.",
          lesson: `<ul><li><code>pd.to_datetime(df["date"])</code> → real dates (dtype <code>datetime64</code>); or <code>pd.read_csv(path, parse_dates=["date"])</code></li>
            <li>The <code>.dt</code> accessor: <code>.dt.year</code>, <code>.dt.month</code>, <code>.dt.day</code>, <code>.dt.day_name()</code>, <code>.dt.strftime("%Y-%m")</code></li>
            <li>Dates compare and subtract: <code>df[df["date"] &gt;= "2024-02-01"]</code>; <code>(d2 - d1).days</code></li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("weather.csv")
            print(df.dtypes["date"])
            df["date"] = pd.to_datetime(df["date"])
            print(df.dtypes["date"])
            print(df["date"].dt.month.head(3).tolist(), df["date"].dt.day_name().head(3).tolist())
            print((df["date"].max() - df["date"].min()).days)`,
          files: { "weather.csv": WEATHER },
          task: `Write:<br>• <code>with_dates(df)</code> → a copy whose <code>date</code> column holds real dates<br>
            • <code>add_parts(df)</code> → a copy with real dates plus two new columns: <code>month</code> (number) and <code>weekday</code> (name like <code>"Monday"</code>)<br>
            • <code>between_dates(df, start, end)</code> → the rows from <code>start</code> to <code>end</code> (text dates like <code>"2024-02-10"</code>), both included<br>
            • <code>days_span(df)</code> → the number of days from the earliest to the latest date (an int)`,
          starter: d`
            import pandas as pd

            def with_dates(df):
                pass

            def add_parts(df):
                pass

            def between_dates(df, start, end):
                pass

            def days_span(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def with_dates(df):
                return df.assign(date=pd.to_datetime(df["date"]))

            def add_parts(df):
                out = with_dates(df)
                out["month"] = out["date"].dt.month
                out["weekday"] = out["date"].dt.day_name()
                return out

            def between_dates(df, start, end):
                d = pd.to_datetime(df["date"])
                return df[(d >= start) & (d <= end)]

            def days_span(df):
                d = pd.to_datetime(df["date"])
                return int((d.max() - d.min()).days)`,
          hints: ["with_dates: df.assign(date=pd.to_datetime(df[\"date\"]))", "add_parts: .dt.month and .dt.day_name()", "between_dates: convert, then (d >= start) & (d <= end)", "days_span: (d.max() - d.min()).days"],
          tests: [{ code: d`
            import pandas as pd
            wd = expect_func("with_dates"); ap = expect_func("add_parts"); bd = expect_func("between_dates"); ds = expect_func("days_span")
            df = pd.read_csv("weather.csv")
            out = wd(df)
            assert pd.api.types.is_datetime64_any_dtype(out["date"]), "with_dates: the date column should hold real dates (datetime64)."
            assert df["date"].dtype == object, "with_dates must not change the table passed in."
            p = ap(df)
            expect_equal(p["month"].tolist()[:3] + p["month"].tolist()[-1:], [1, 1, 1, 3], "month column (first three and last)")
            expect_equal(p["weekday"].tolist()[:2], ["Monday", "Tuesday"], "weekday column (2024-01-01 was a Monday)")
            sub = bd(df, "2024-02-10", "2024-02-12")
            expect_equal(len(sub), 6, 'rows from between_dates(weather, "2024-02-10", "2024-02-12") (3 days x 2 cities)')
            expect_equal(ds(df), 90, "days_span(weather)")` }],
        },
        {
          id: "pd8-2", title: "The Time Index",
          story: "With dates as the index, the calendar answers questions like \"February\" or \"week by week\" directly.",
          lesson: `<p>Put the dates in the index (<code>set_index("date")</code>) and pandas understands time:</p>
            <ul><li><code>s.loc["2024-02"]</code> → everything in February 2024</li>
            <li><code>s.resample("W").sum()</code> → weekly totals; <code>"MS"</code> = by month (labelled by month start), <code>"D"</code> = by day</li>
            <li>Any aggregation works: <code>.mean()</code>, <code>.max()</code>, <code>.count()</code></li></ul>
            <p><b>Resampling</b> turns daily noise into weekly or monthly patterns: the core of time-series analysis.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("weather.csv", parse_dates=["date"])
            oak = df[df["city"] == "Oakvale"].set_index("date")["temp"]
            print(oak.head(3))
            print(oak.loc["2024-02"].mean().round(2))
            print(oak.resample("MS").mean().round(2))`,
          files: { "weather.csv": WEATHER },
          task: `Write (<code>df</code> is the weather table with text dates):<br>• <code>city_series(df, city)</code> → that city's <code>temp</code> as a Series indexed by real dates<br>
            • <code>monthly_mean(df, city)</code> → that city's mean temperature per month (<code>resample("MS")</code>), rounded to 2<br>
            • <code>weekly_rain(df, city)</code> → that city's total rain per week (<code>resample("W")</code>)<br>
            • <code>month_max(df, city, month)</code> → the highest temperature in that month (like <code>"2024-02"</code>)`,
          starter: d`
            import pandas as pd

            def city_series(df, city):
                pass

            def monthly_mean(df, city):
                pass

            def weekly_rain(df, city):
                pass

            def month_max(df, city, month):
                pass
            `,
          solution: d`
            import pandas as pd

            def _city(df, city):
                c = df[df["city"] == city].copy()
                c["date"] = pd.to_datetime(c["date"])
                return c.set_index("date")

            def city_series(df, city):
                return _city(df, city)["temp"]

            def monthly_mean(df, city):
                return _city(df, city)["temp"].resample("MS").mean().round(2)

            def weekly_rain(df, city):
                return _city(df, city)["rain"].resample("W").sum()

            def month_max(df, city, month):
                return float(_city(df, city)["temp"].loc[month].max())`,
          hints: ["A helper: filter the city, convert the dates, set_index(\"date\")", "monthly_mean: [\"temp\"].resample(\"MS\").mean().round(2)", "weekly_rain: [\"rain\"].resample(\"W\").sum()", "month_max: [\"temp\"].loc[month].max()"],
          tests: [{ code: d`
            import pandas as pd
            cs = expect_func("city_series"); mm = expect_func("monthly_mean"); wr = expect_func("weekly_rain"); mx = expect_func("month_max")
            df = pd.read_csv("weather.csv")
            ref = df.assign(date=pd.to_datetime(df.date))
            oak = ref[ref.city == "Oakvale"].set_index("date")
            s = cs(df, "Oakvale")
            assert isinstance(s.index, pd.DatetimeIndex), "city_series should be indexed by real dates."
            expect_series(s, oak.temp, 'city_series(weather, "Oakvale")')
            expect_series(mm(df, "Oakvale"), oak.temp.resample("MS").mean().round(2), 'monthly_mean(weather, "Oakvale")')
            st = ref[ref.city == "Stonebridge"].set_index("date")
            expect_series(wr(df, "Stonebridge"), st.rain.resample("W").sum(), 'weekly_rain(weather, "Stonebridge")')
            expect_close(mx(df, "Stonebridge", "2024-02"), st.temp.loc["2024-02"].max(), 'month_max(weather, "Stonebridge", "2024-02")')` }],
        },
        {
          id: "pd8-3", title: "Smooth the Seasons",
          story: "Day-to-day weather jumps around. The astronomers want the trend, the daily change, and the record-breaking days.",
          lesson: `<ul><li><code>s.rolling(7).mean()</code> → the average of each 7-day window (the first 6 are NaN): a <b>moving average</b></li>
            <li><code>s.shift(1)</code> → yesterday's value on today's row; <code>s.diff()</code> → today − yesterday</li>
            <li><code>s.cummax()</code> → the highest value so far</li>
            <li>A new record: a value bigger than every earlier one: <code>s &gt; s.cummax().shift(1)</code> (the first day has nothing before it)</li></ul>`,
          example: d`
            import pandas as pd

            s = pd.Series([3, 5, 4, 8, 6, 9], index=pd.date_range("2024-01-01", periods=6))
            print(s.rolling(3).mean().round(2).tolist())
            print(s.diff().tolist())
            print(s[s > s.cummax().shift(1)].index.strftime("%Y-%m-%d").tolist())`,
          task: `<code>s</code> is a Series of daily values indexed by dates. Write:<br>• <code>rolling_mean(s, w)</code> → the <code>w</code>-day moving average<br>
            • <code>day_change(s)</code> → the change from the previous day<br>
            • <code>above_trend(s, w)</code> → a True/False Series: is the value above its <code>w</code>-day moving average? (False where there's no average yet)<br>
            • <code>record_days(s)</code> → a list of dates (<code>"YYYY-MM-DD"</code> text) on which a new record high was set, including the first day`,
          starter: d`
            import pandas as pd

            def rolling_mean(s, w):
                pass

            def day_change(s):
                pass

            def above_trend(s, w):
                pass

            def record_days(s):
                pass
            `,
          solution: d`
            import pandas as pd

            def rolling_mean(s, w):
                return s.rolling(w).mean()

            def day_change(s):
                return s.diff()

            def above_trend(s, w):
                return s > s.rolling(w).mean()

            def record_days(s):
                new = (s > s.cummax().shift(1)) | (s.index == s.index[0])
                return s[new].index.strftime("%Y-%m-%d").tolist()`,
          hints: ["rolling_mean: s.rolling(w).mean()", "day_change: s.diff()", "above_trend: s > s.rolling(w).mean() (comparing with NaN gives False)", "record_days: (s > s.cummax().shift(1)) or the first day; format with .index.strftime(\"%Y-%m-%d\")"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            rm = expect_func("rolling_mean"); dc = expect_func("day_change"); at = expect_func("above_trend"); rd = expect_func("record_days")
            s = pd.Series([3.0, 5, 4, 8, 6, 9, 2], index=pd.date_range("2024-01-01", periods=7))
            expect_series(rm(s, 3), s.rolling(3).mean(), "rolling_mean(s, 3)")
            expect_series(dc(s), [np.nan, 2, -1, 4, -2, 3, -7], "day_change(s)", check_index=False)
            expect_equal(at(s, 3).tolist(), [False, False, False, True, False, True, False], "above_trend(s, 3)")
            expect_equal(rd(s), ["2024-01-01", "2024-01-02", "2024-01-04", "2024-01-06"], "record_days(s)")
            flat = pd.Series([5.0, 5, 5], index=pd.date_range("2024-03-01", periods=3))
            expect_equal(rd(flat), ["2024-03-01"], "record_days of a flat series (equal is not a new record)")` }],
        },
        {
          id: "pd8-4", type: "quiz", title: "Riddles of the Calendar",
          story: "The calendar-keeper's riddles: leap years, windows and shifting days.",
          lesson: `<p>Date maths knows leap years. Rolling windows need a full window before they give a value. <code>shift</code> moves values down a row; <code>diff</code> subtracts the shifted values.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                d = pd.to_datetime(pd.Series(["2024-02-28", "2024-03-01"]))
                print((d.iloc[1] - d.iloc[0]).days, d.dt.month.tolist())`,
              choices: ["2 [2, 3]", "1 [2, 3]", "3 [2, 3]", "2 [28, 1]"], answer: 0,
              explain: "2024 is a leap year: Feb 28 → Feb 29 → Mar 1 is 2 days." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                t = pd.Timestamp("2024-03-15")
                print(t.day_name(), (t + pd.Timedelta(days=20)).date())`,
              choices: ["Friday 2024-04-04", "Friday 2024-04-05", "Thursday 2024-04-04", "Friday 2024-03-35"], answer: 0,
              explain: "March has 31 days: 15 + 20 = 35 → April 4." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, 2, 3, 4])
                print(s.rolling(2).mean().tolist())`,
              choices: ["[nan, 1.5, 2.5, 3.5]", "[1.5, 2.5, 3.5]", "[1.0, 1.5, 2.5, 3.5]", "[1.5, 2.5, 3.5, nan]"], answer: 0,
              explain: "The first window isn't full yet, so it's NaN; each later value averages itself with the one before." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, 4, 9])
                print(s.shift(1).tolist(), s.diff().tolist())`,
              choices: ["[nan, 1.0, 4.0] [nan, 3.0, 5.0]", "[4.0, 9.0, nan] [3.0, 5.0, nan]", "[nan, 1.0, 4.0] [3.0, 5.0]", "[0, 1, 4] [0, 3, 5]"], answer: 0,
              explain: "<code>shift(1)</code> moves everything down; <code>diff</code> is the value minus the shifted value." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                idx = pd.date_range("2024-01-30", periods=4, freq="D")
                print(pd.Series([1, 2, 3, 4], index=idx).resample("MS").sum().tolist())`,
              choices: ["[3, 7]", "[10]", "[1, 2, 3, 4]", "[6, 4]"], answer: 0,
              explain: "Jan 30–31 (1 + 2) fall in January, Feb 1–2 (3 + 4) in February." },
          ],
        },
        {
          id: "pd8-5", boss: true, time: 900, title: "The Almanac",
          story: "The Empress's almanac must record each city's warmest day, wettest month and longest dry spell.",
          lesson: `<p>Counting <b>runs</b> (consecutive days in a row) is a classic time-series trick:</p>
            <ol><li><code>dry = rain == 0</code></li>
            <li><code>run_id = (~dry).cumsum()</code> → the number increases on each rainy day, so all the dry days after one rainy day share an id</li>
            <li><code>dry.groupby(run_id).sum().max()</code> → the longest run of dry days</li></ol>
            <p>Two Series with the same date index can be subtracted directly; pandas lines up the dates.</p>`,
          example: d`
            import pandas as pd

            rain = pd.Series([0, 0, 3, 0, 0, 0, 1, 0])
            dry = rain == 0
            run_id = (~dry).cumsum()
            print(run_id.tolist())
            print(dry.groupby(run_id).sum().max())`,
          files: { "weather.csv": WEATHER },
          task: `Write:<br>• <code>almanac(df, city)</code> → a dict for that city: <code>"warmest_day"</code> (date as <code>"YYYY-MM-DD"</code>), <code>"rain_days"</code> (days with rain &gt; 0), <code>"wettest_month"</code> (<code>"YYYY-MM"</code> with the most total rain) and <code>"longest_dry_spell"</code> (most consecutive days with no rain)<br>
            • <code>temp_gap(df)</code> → a Series indexed by real dates: Stonebridge's temperature minus Oakvale's on each day`,
          starter: d`
            import pandas as pd

            def almanac(df, city):
                pass

            def temp_gap(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def _city(df, city):
                c = df[df["city"] == city].copy()
                c["date"] = pd.to_datetime(c["date"])
                return c.set_index("date")

            def almanac(df, city):
                c = _city(df, city)
                dry = c["rain"] == 0
                runs = dry.groupby((~dry).cumsum()).sum()
                monthly = c["rain"].resample("MS").sum()
                return {
                    "warmest_day": c["temp"].idxmax().strftime("%Y-%m-%d"),
                    "rain_days": int((c["rain"] > 0).sum()),
                    "wettest_month": monthly.idxmax().strftime("%Y-%m"),
                    "longest_dry_spell": int(runs.max()),
                }

            def temp_gap(df):
                return _city(df, "Stonebridge")["temp"] - _city(df, "Oakvale")["temp"]`,
          hints: ["Filter the city, convert dates, set_index(\"date\")", "warmest_day: c[\"temp\"].idxmax().strftime(\"%Y-%m-%d\")", "wettest_month: c[\"rain\"].resample(\"MS\").sum().idxmax()", "Dry spell: dry.groupby((~dry).cumsum()).sum().max()"],
          tests: [{ code: d`
            import pandas as pd
            al = expect_func("almanac"); tg = expect_func("temp_gap")
            df = pd.read_csv("weather.csv")
            for city in ("Oakvale", "Stonebridge"):
                c = df[df.city == city].assign(date=lambda x: pd.to_datetime(x.date)).set_index("date")
                dry = c.rain == 0
                want = {"warmest_day": c.temp.idxmax().strftime("%Y-%m-%d"), "rain_days": int((c.rain > 0).sum()),
                        "wettest_month": c.rain.resample("MS").sum().idxmax().strftime("%Y-%m"),
                        "longest_dry_spell": int(dry.groupby((~dry).cumsum()).sum().max())}
                expect_equal(al(df, city), want, "almanac(weather, " + repr(city) + ")")
            g = tg(df)
            o = df[df.city == "Oakvale"].assign(date=lambda x: pd.to_datetime(x.date)).set_index("date").temp
            s = df[df.city == "Stonebridge"].assign(date=lambda x: pd.to_datetime(x.date)).set_index("date").temp
            expect_series(g, s - o, "temp_gap(weather)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 9
    {
      id: 9, name: "The Grouping Garden", topic: "groupby, agg, transform & filter", time: 660, icon: "🎋",
      intro: "In the Grouping Garden the rows are sorted into beds (by region, by class) and each bed is measured on its own.",
      missions: [
        {
          id: "pd9-1", title: "Split, Apply, Combine",
          story: "The Empress asks: how much did each region sell? Which product brought the most money?",
          lesson: `<p><code>groupby</code> does three steps: <b>split</b> the rows into groups, <b>apply</b> a calculation to each, <b>combine</b> the answers.</p>
            <ul><li><code>df.groupby("region")["units"].sum()</code> → one total per region (a Series indexed by region)</li>
            <li><code>.mean()</code>, <code>.max()</code>, <code>.count()</code> (non-missing values), <code>.size()</code> (rows per group)</li>
            <li>Several keys: <code>df.groupby(["region", "product"])["units"].sum()</code></li>
            <li><code>.reset_index()</code> turns the group labels back into columns</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(df.groupby("region")["units"].sum())
            print(df.groupby("product").size())
            print(df.groupby(["region", "product"])["units"].mean().round(1).reset_index().head())`,
          files: { "sales.csv": SALES },
          task: `Write (for the sales table):<br>• <code>units_by_region(df)</code> → total units per region<br>
            • <code>revenue_by_product(df)</code> → total revenue (units × price) per product, highest first<br>
            • <code>orders_per_region(df)</code> → the number of orders (rows) per region<br>
            • <code>avg_units_table(df)</code> → a DataFrame with columns <code>region, product, units</code>: the mean units for each region–product pair, rounded to 1`,
          starter: d`
            import pandas as pd

            def units_by_region(df):
                pass

            def revenue_by_product(df):
                pass

            def orders_per_region(df):
                pass

            def avg_units_table(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def units_by_region(df):
                return df.groupby("region")["units"].sum()

            def revenue_by_product(df):
                rev = df.assign(revenue=df["units"] * df["price"])
                return rev.groupby("product")["revenue"].sum().sort_values(ascending=False)

            def orders_per_region(df):
                return df.groupby("region").size()

            def avg_units_table(df):
                return df.groupby(["region", "product"])["units"].mean().round(1).reset_index()`,
          hints: ["units_by_region: df.groupby(\"region\")[\"units\"].sum()", "revenue_by_product: add a revenue column, group by product, sum, sort_values(ascending=False)", "orders_per_region: df.groupby(\"region\").size()", "avg_units_table: groupby both, mean, round(1), reset_index()"],
          tests: [{ code: d`
            import pandas as pd
            ur = expect_func("units_by_region"); rp = expect_func("revenue_by_product"); op = expect_func("orders_per_region"); at = expect_func("avg_units_table")
            df = pd.read_csv("sales.csv")
            expect_series(ur(df), df.groupby("region").units.sum(), "units_by_region(sales)")
            rv = (df.units * df.price).groupby(df["product"]).sum().sort_values(ascending=False)
            expect_series(rp(df), rv, "revenue_by_product(sales)")
            expect_series(op(df), df.groupby("region").size(), "orders_per_region(sales)")
            expect_frame(at(df), df.groupby(["region", "product"]).units.mean().round(1).reset_index(), "avg_units_table(sales)")` }],
        },
        {
          id: "pd9-2", title: "Many Measures",
          story: "One number per group isn't enough. The council wants a full table: counts, averages and maximums, side by side.",
          lesson: `<p><code>agg</code> computes several things per group at once. <b>Named aggregation</b> gives each result a clear column name:</p>
            <p><code>df.groupby("class").agg(heroes=("name", "count"), avg_level=("level", "mean"), max_gold=("gold", "max"))</code></p>
            <p>Each argument is <code>new_name=(column, function)</code>. Functions can be <code>"sum"</code>, <code>"mean"</code>, <code>"median"</code>, <code>"min"</code>, <code>"max"</code>, <code>"count"</code>, <code>"nunique"</code>…</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("heroes.csv")
            t = df.groupby("class").agg(heroes=("name", "count"), avg_level=("level", "mean"), guilds=("guild", "nunique"))
            print(t.round(1))`,
          files: { "heroes.csv": HEROES, "sales.csv": SALES },
          task: `Write:<br>• <code>class_table(heroes)</code> → one row per class (the index), with columns <code>heroes</code> (count of names), <code>avg_level</code> (mean, rounded to 1) and <code>max_gold</code><br>
            • <code>region_summary(sales)</code> → one row per region with columns <code>orders</code> (rows), <code>units</code> (total), <code>revenue</code> (total units × price) and <code>avg_price</code> (mean price, rounded to 2), sorted by revenue, highest first`,
          starter: d`
            import pandas as pd

            def class_table(heroes):
                return heroes.groupby("class").mean()

            def region_summary(sales):
                pass
            `,
          solution: d`
            import pandas as pd

            def class_table(heroes):
                t = heroes.groupby("class").agg(heroes=("name", "count"), avg_level=("level", "mean"), max_gold=("gold", "max"))
                t["avg_level"] = t["avg_level"].round(1)
                return t

            def region_summary(sales):
                s = sales.assign(revenue=sales["units"] * sales["price"])
                t = s.groupby("region").agg(orders=("units", "size"), units=("units", "sum"), revenue=("revenue", "sum"), avg_price=("price", "mean"))
                t["avg_price"] = t["avg_price"].round(2)
                return t.sort_values("revenue", ascending=False)`,
          hints: ["Named aggregation: .agg(new_name=(\"column\", \"function\"), ...)", "Round a column afterwards: t[\"avg_level\"] = t[\"avg_level\"].round(1)", "region_summary: add revenue first; orders can be (\"units\", \"size\")", "Finish with sort_values(\"revenue\", ascending=False)"],
          tests: [{ code: d`
            import pandas as pd
            ct = expect_func("class_table"); rs = expect_func("region_summary")
            h = pd.read_csv("heroes.csv")
            ref = h.groupby("class").agg(heroes=("name", "count"), avg_level=("level", "mean"), max_gold=("gold", "max"))
            ref["avg_level"] = ref["avg_level"].round(1)
            expect_frame(ct(h), ref, "class_table(heroes)")
            s = pd.read_csv("sales.csv").assign(revenue=lambda x: x.units * x.price)
            r2 = s.groupby("region").agg(orders=("units", "size"), units=("units", "sum"), revenue=("revenue", "sum"), avg_price=("price", "mean"))
            r2["avg_price"] = r2["avg_price"].round(2)
            expect_frame(rs(pd.read_csv("sales.csv")), r2.sort_values("revenue", ascending=False), "region_summary(sales)")` }],
        },
        {
          id: "pd9-3", title: "Group-wise Magic",
          story: "Each region's gardener wants their own numbers inside the big table: shares of their bed, their best plant, their busiest beds.",
          lesson: `<ul><li><code>transform</code> computes per group but returns a value for <b>every row</b> (same length as the table): <code>df.groupby("region")["units"].transform("sum")</code> → each row gets its region's total. Perfect for "share of group"</li>
            <li><code>groupby(...)["level"].rank(ascending=False, method="min")</code> → rank <b>within</b> each group</li>
            <li><code>groupby(...).filter(lambda g: len(g) &gt;= 5)</code> → keep only the rows of groups that pass a test</li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            tot = df.groupby("region")["units"].transform("sum")
            print((df["units"] / tot).round(3).head().tolist())
            print(df.groupby("product")["units"].rank(ascending=False, method="min").head().tolist())
            print(df.groupby("region").filter(lambda g: len(g) >= 11)["region"].unique())`,
          files: { "sales.csv": SALES, "heroes.csv": HEROES },
          task: `Write:<br>• <code>share_of_region(sales)</code> → a copy with a column <code>share</code>: each order's units ÷ its region's total units, rounded to 3<br>
            • <code>top_in_class(heroes)</code> → the rows of the heroes with the highest level in their class (all of them if tied)<br>
            • <code>busy_regions(sales, n)</code> → the orders of regions that have at least <code>n</code> orders`,
          starter: d`
            import pandas as pd

            def share_of_region(sales):
                pass

            def top_in_class(heroes):
                pass

            def busy_regions(sales, n):
                pass
            `,
          solution: d`
            import pandas as pd

            def share_of_region(sales):
                total = sales.groupby("region")["units"].transform("sum")
                return sales.assign(share=(sales["units"] / total).round(3))

            def top_in_class(heroes):
                r = heroes.groupby("class")["level"].rank(ascending=False, method="min")
                return heroes[r == 1]

            def busy_regions(sales, n):
                return sales.groupby("region").filter(lambda g: len(g) >= n)`,
          hints: ["share: units / sales.groupby(\"region\")[\"units\"].transform(\"sum\")", "top_in_class: rank within class (method=\"min\") and keep rank == 1", "busy_regions: sales.groupby(\"region\").filter(lambda g: len(g) >= n)"],
          tests: [{ code: d`
            import pandas as pd
            sr = expect_func("share_of_region"); tc = expect_func("top_in_class"); br = expect_func("busy_regions")
            s = pd.read_csv("sales.csv")
            expect_series(sr(s)["share"], (s.units / s.groupby("region").units.transform("sum")).round(3), "share column")
            h = pd.read_csv("heroes.csv")
            expect_frame(tc(h), h[h["level"] == h.groupby("class")["level"].transform("max")], "top_in_class(heroes)")
            t = pd.DataFrame({"class": ["A", "A", "B"], "level": [5, 5, 2], "name": ["x", "y", "z"]})
            expect_equal(tc(t)["name"].tolist(), ["x", "y", "z"], "top_in_class with a tie keeps both")
            for n in (10, 11, 12):
                expect_frame(br(s, n), s.groupby("region").filter(lambda g: len(g) >= n), f"busy_regions(sales, {n})")` }],
        },
        {
          id: "pd9-4", type: "quiz", title: "Riddles of the Garden",
          story: "The head gardener's riddles: what shape does each grouping spell return?",
          lesson: `<p>An aggregation (<code>sum</code>, <code>mean</code>…) returns <b>one row per group</b>. <code>transform</code> returns <b>one value per original row</b>. <code>filter</code> returns <b>original rows</b> of the groups that pass. Rows whose key is missing are left out of the groups by default.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"k": ["a", "b", "a"], "v": [1, 2, 3]})
                print(df.groupby("k")["v"].sum().to_dict())`,
              choices: ["{'a': 4, 'b': 2}", "{'a': 1, 'b': 2}", "{'a': [1, 3], 'b': [2]}", "{'a': 2.0, 'b': 2.0}"], answer: 0,
              explain: "Group a holds 1 and 3; group b holds 2." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"k": ["a", "b", "a"], "v": [1, 2, 3]})
                print(df.groupby("k")["v"].transform("sum").tolist())`,
              choices: ["[4, 2, 4]", "[4, 2]", "[1, 2, 4]", "[6, 6, 6]"], answer: 0,
              explain: "Every row gets its own group's total, so the result is as long as the table." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"k": ["a", "b", "a"], "v": [1, None, 3]})
                print(df.groupby("k").size().tolist(), df.groupby("k")["v"].count().tolist())`,
              choices: ["[2, 1] [2, 0]", "[2, 1] [2, 1]", "[2, 0] [2, 0]", "[3] [2]"], answer: 0,
              explain: "<code>size</code> counts rows; <code>count</code> counts non-missing values." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"k": ["a", "b", "a"], "v": [1, 2, 3]})
                print(df.groupby("k").filter(lambda g: len(g) > 1)["v"].tolist())`,
              choices: ["[1, 3]", "[4]", "['a']", "[2]"], answer: 0,
              explain: "Only group a has more than one row, and <code>filter</code> returns its original rows." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"k": ["a", None, "a"], "v": [1, 2, 3]})
                print(df.groupby("k")["v"].sum().to_dict())`,
              choices: ["{'a': 4}", "{'a': 4, None: 2}", "{'a': 4, nan: 2}", "{'a': 6}"], answer: 0,
              explain: "Rows with a missing key are dropped from the groups (use <code>dropna=False</code> to keep them)." },
          ],
        },
        {
          id: "pd9-5", boss: true, time: 900, title: "The Harvest Council",
          story: "The harvest council meets each quarter. Prepare the full report: money per month, best sellers, shares and top orders.",
          lesson: `<p>Group by anything you can compute, even a derived key like the month: <code>df.groupby(df["date"].str[:7])</code>.</p>
            <ul><li>Best item per group: group by both keys, sum, then <code>.idxmax()</code> per group, or sort and <code>drop_duplicates</code></li>
            <li>Top <code>n</code> rows of each group: sort, then <code>.groupby(key).head(n)</code></li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(df.groupby(df["date"].str[:7])["units"].sum())
            t = df.groupby(["region", "product"])["units"].sum().reset_index()
            print(t.sort_values("units", ascending=False).drop_duplicates("region"))
            print(df.sort_values("units", ascending=False).groupby("product").head(1))`,
          files: { "sales.csv": SALES },
          task: `Write (revenue = units × price):<br>• <code>monthly_revenue(df)</code> → total revenue per month, indexed by <code>"YYYY-MM"</code><br>
            • <code>best_product_per_region(df)</code> → a dict <code>{region: product with the highest total revenue there}</code><br>
            • <code>share_table(df)</code> → one row per region with columns <code>revenue</code>, <code>share</code> (% of all revenue, rounded to 1) and <code>orders</code>, sorted by revenue, highest first<br>
            • <code>top_orders(df, n)</code> → for every product, its <code>n</code> orders with the highest revenue; sorted by product A–Z, then revenue highest first, with a <code>revenue</code> column added`,
          starter: d`
            import pandas as pd

            def monthly_revenue(df):
                pass

            def best_product_per_region(df):
                pass

            def share_table(df):
                pass

            def top_orders(df, n):
                pass
            `,
          solution: d`
            import pandas as pd

            def _rev(df):
                return df.assign(revenue=df["units"] * df["price"])

            def monthly_revenue(df):
                d = _rev(df)
                return d.groupby(d["date"].str[:7])["revenue"].sum()

            def best_product_per_region(df):
                t = _rev(df).groupby(["region", "product"])["revenue"].sum().reset_index()
                best = t.sort_values("revenue", ascending=False).drop_duplicates("region")
                return best.set_index("region")["product"].to_dict()

            def share_table(df):
                t = _rev(df).groupby("region").agg(revenue=("revenue", "sum"), orders=("revenue", "size"))
                t["share"] = (t["revenue"] / t["revenue"].sum() * 100).round(1)
                return t[["revenue", "share", "orders"]].sort_values("revenue", ascending=False)

            def top_orders(df, n):
                d = _rev(df).sort_values(["product", "revenue"], ascending=[True, False])
                return d.groupby("product").head(n)`,
          hints: ["Add revenue once in a helper: df.assign(revenue=df[\"units\"] * df[\"price\"])", "monthly_revenue: group by d[\"date\"].str[:7]", "best_product_per_region: sum per (region, product), sort by revenue, drop_duplicates(\"region\")", "top_orders: sort_values([\"product\", \"revenue\"], ascending=[True, False]).groupby(\"product\").head(n)"],
          tests: [{ code: d`
            import pandas as pd
            mr = expect_func("monthly_revenue"); bp = expect_func("best_product_per_region"); st = expect_func("share_table"); to = expect_func("top_orders")
            df = pd.read_csv("sales.csv")
            d = df.assign(revenue=df.units * df.price)
            expect_series(mr(df), d.groupby(d.date.str[:7]).revenue.sum(), "monthly_revenue(sales)")
            t = d.groupby(["region", "product"]).revenue.sum()
            expect_equal(bp(df), {r: t.loc[r].idxmax() for r in sorted(d.region.unique())}, "best_product_per_region(sales)")
            ref = d.groupby("region").agg(revenue=("revenue", "sum"), orders=("revenue", "size"))
            ref["share"] = (ref.revenue / ref.revenue.sum() * 100).round(1)
            expect_frame(st(df), ref[["revenue", "share", "orders"]].sort_values("revenue", ascending=False), "share_table(sales)")
            expect_frame(to(df, 2), d.sort_values(["product", "revenue"], ascending=[True, False]).groupby("product").head(2), "top_orders(sales, 2)")` }],
        },
      ],
    },
    // ───────────────────────────── FLOOR 10
    {
      id: 10, name: "The Joining Bridge", topic: "merge, joins, anti-joins & concat", time: 660, icon: "🌉",
      intro: "The kingdom's records live in separate scrolls: customers here, orders there. The Joining Bridge connects them by their keys.",
      missions: [
        {
          id: "pd10-1", title: "Match the Records",
          story: "The order scroll only says \"customer 3\". The Empress wants names next to the orders.",
          lesson: `<p><code>pd.merge(left, right, on="key", how=...)</code> joins two tables where the key matches (like SQL's JOIN):</p>
            <ul><li><code>how="inner"</code> (default) → only rows with a match in <b>both</b></li>
            <li><code>how="left"</code> → every row of the left table; missing matches get NaN</li>
            <li><code>how="outer"</code> → everything from both</li>
            <li>If one key matches several rows, the rows are repeated: one customer with 3 orders → 3 joined rows</li></ul>`,
          example: d`
            import pandas as pd

            customers = pd.read_csv("customers.csv")
            orders = pd.read_csv("orders.csv")
            print(customers)
            print(pd.merge(orders, customers, on="customer_id").head())
            print(len(pd.merge(orders, customers, on="customer_id")), len(pd.merge(orders, customers, on="customer_id", how="left")))`,
          files: { "customers.csv": CUSTOMERS, "orders.csv": ORDERS },
          task: `Write:<br>• <code>orders_with_names(orders, customers)</code> → the orders that belong to a known customer, with the customer's columns added<br>
            • <code>all_orders(orders, customers)</code> → <b>every</b> order, with customer columns (NaN for unknown customers)<br>
            • <code>customer_totals(orders, customers)</code> → a Series indexed by customer <b>name</b>: the total amount each customer spent, 0 for customers with no orders, sorted by name`,
          starter: d`
            import pandas as pd

            def orders_with_names(orders, customers):
                pass

            def all_orders(orders, customers):
                pass

            def customer_totals(orders, customers):
                pass
            `,
          solution: d`
            import pandas as pd

            def orders_with_names(orders, customers):
                return pd.merge(orders, customers, on="customer_id")

            def all_orders(orders, customers):
                return pd.merge(orders, customers, on="customer_id", how="left")

            def customer_totals(orders, customers):
                m = pd.merge(customers, orders, on="customer_id", how="left")
                return m.groupby("name")["amount"].sum().sort_index()`,
          hints: ["orders_with_names: pd.merge(orders, customers, on=\"customer_id\")", "all_orders: add how=\"left\"", "customer_totals: merge customers (left) with orders, then groupby(\"name\")[\"amount\"].sum() (missing amounts add up to 0)"],
          tests: [{ code: d`
            import pandas as pd
            ow = expect_func("orders_with_names"); ao = expect_func("all_orders"); ct = expect_func("customer_totals")
            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            expect_frame(ow(o, c), pd.merge(o, c, on="customer_id"), "orders_with_names")
            expect_equal(len(ow(o, c)), 11, "number of orders with a known customer")
            r = ao(o, c)
            expect_equal(len(r), 12, "all_orders keeps every order")
            expect_equal(int(r["name"].isna().sum()), 1, "orders with an unknown customer")
            expect_series(ct(o, c), {"Anna": 372.0, "Bo": 0.0, "Lyra": 202.5, "Mira": 155.0, "Orin": 160.5, "Zed": 0.0}, "customer_totals")` }],
        },
        {
          id: "pd10-2", title: "Who's Missing?",
          story: "Some customers never ordered; some orders name a customer nobody knows. Both are problems the Empress must hear about.",
          lesson: `<p>An <b>anti-join</b> finds rows with <b>no</b> match. Two ways:</p>
            <ul><li><code>~customers["customer_id"].isin(orders["customer_id"])</code> → customers whose id never appears in the orders</li>
            <li><code>pd.merge(a, b, on="key", how="outer", indicator=True)</code> adds a <code>_merge</code> column: <code>"both"</code>, <code>"left_only"</code> or <code>"right_only"</code></li></ul>
            <p>Checking for unmatched keys is part of every data-quality review: unmatched rows usually mean typos, deleted records or broken exports.</p>`,
          example: d`
            import pandas as pd

            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            print(c[~c["customer_id"].isin(o["customer_id"])])
            m = pd.merge(o, c, on="customer_id", how="outer", indicator=True)
            print(m["_merge"].value_counts())`,
          files: { "customers.csv": CUSTOMERS, "orders.csv": ORDERS },
          task: `Write:<br>• <code>no_orders(customers, orders)</code> → a list of the names of customers who never ordered<br>
            • <code>orphan_orders(orders, customers)</code> → a list of the <code>order_id</code>s whose customer isn't in the customer table<br>
            • <code>match_report(orders, customers)</code> → a dict with the number of rows of each kind in an outer merge: <code>{"both": …, "orders_only": …, "customers_only": …}</code>`,
          starter: d`
            import pandas as pd

            def no_orders(customers, orders):
                pass

            def orphan_orders(orders, customers):
                pass

            def match_report(orders, customers):
                pass
            `,
          solution: d`
            import pandas as pd

            def no_orders(customers, orders):
                return customers[~customers["customer_id"].isin(orders["customer_id"])]["name"].tolist()

            def orphan_orders(orders, customers):
                return orders[~orders["customer_id"].isin(customers["customer_id"])]["order_id"].tolist()

            def match_report(orders, customers):
                m = pd.merge(orders, customers, on="customer_id", how="outer", indicator=True)
                vc = m["_merge"].value_counts()
                return {"both": int(vc["both"]), "orders_only": int(vc["left_only"]), "customers_only": int(vc["right_only"])}`,
          hints: ["no_orders: ~customers[\"customer_id\"].isin(orders[\"customer_id\"])", "orphan_orders: the same idea the other way round", "match_report: merge(..., how=\"outer\", indicator=True), then value_counts of _merge (left = orders)"],
          tests: [{ code: d`
            import pandas as pd
            no = expect_func("no_orders"); oo = expect_func("orphan_orders"); mr = expect_func("match_report")
            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            expect_equal(no(c, o), ["Zed", "Bo"], "no_orders")
            expect_equal(oo(o, c), [108], "orphan_orders")
            expect_equal(mr(o, c), {"both": 11, "orders_only": 1, "customers_only": 2}, "match_report")` }],
        },
        {
          id: "pd10-3", title: "Stack the Scrolls",
          story: "Each month's ledger arrives as its own scroll. Sew them into one long scroll, and remember where each part came from.",
          lesson: `<ul><li><code>pd.concat([df1, df2])</code> → stacks rows (tables with the same columns). Add <code>ignore_index=True</code> to number rows 0, 1, 2… again</li>
            <li>Columns that exist in only some tables are filled with NaN</li>
            <li><code>pd.concat([a, b], axis=1)</code> → puts tables side by side, matched by index</li>
            <li>To remember the source, add a column to each table first: <code>df.assign(source="jan")</code></li></ul>
            <p>Merge matches by key; concat just stacks.</p>`,
          example: d`
            import pandas as pd

            jan = pd.DataFrame({"item": ["rope", "lamp"], "qty": [2, 1]})
            feb = pd.DataFrame({"item": ["axe"], "qty": [4], "note": ["rush"]})
            print(pd.concat([jan, feb], ignore_index=True))
            print(pd.concat([jan.assign(month="jan"), feb.assign(month="feb")], ignore_index=True)[["item", "month"]])
            print(pd.concat([jan, pd.DataFrame({"price": [3, 9]})], axis=1))`,
          task: `Write:<br>• <code>stack_all(frames)</code> → all tables in the list stacked, rows numbered 0, 1, 2…<br>
            • <code>stack_with_source(frames, names)</code> → stacked, with a column <code>source</code> holding the matching name from <code>names</code> for each table's rows, rows numbered 0, 1, 2…<br>
            • <code>side_by_side(a, b)</code> → the two tables' columns next to each other`,
          starter: d`
            import pandas as pd

            def stack_all(frames):
                pass

            def stack_with_source(frames, names):
                pass

            def side_by_side(a, b):
                pass
            `,
          solution: d`
            import pandas as pd

            def stack_all(frames):
                return pd.concat(frames, ignore_index=True)

            def stack_with_source(frames, names):
                return pd.concat([f.assign(source=n) for f, n in zip(frames, names)], ignore_index=True)

            def side_by_side(a, b):
                return pd.concat([a, b], axis=1)`,
          hints: ["stack_all: pd.concat(frames, ignore_index=True)", "stack_with_source: [f.assign(source=n) for f, n in zip(frames, names)]", "side_by_side: pd.concat([a, b], axis=1)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            sa = expect_func("stack_all"); sw = expect_func("stack_with_source"); sb = expect_func("side_by_side")
            jan = pd.DataFrame({"item": ["rope", "lamp"], "qty": [2, 1]})
            feb = pd.DataFrame({"item": ["axe"], "qty": [4], "note": ["rush"]})
            expect_frame(sa([jan, feb]), {"item": ["rope", "lamp", "axe"], "qty": [2, 1, 4], "note": [np.nan, np.nan, "rush"]}, "stack_all([jan, feb])")
            r = sw([jan, jan], ["a", "b"])
            expect_equal(r["source"].tolist(), ["a", "a", "b", "b"], "source column")
            expect_equal(r.index.tolist(), [0, 1, 2, 3], "index after stack_with_source")
            expect_frame(sb(jan, pd.DataFrame({"price": [3, 9]})), {"item": ["rope", "lamp"], "qty": [2, 1], "price": [3, 9]}, "side_by_side")` }],
        },
        {
          id: "pd10-4", type: "quiz", title: "Riddles of the Bridge",
          story: "The bridge-keeper's riddles: how many rows come out the other side?",
          lesson: `<p>Count before you trust a merge: an inner join can <b>lose</b> rows (no match), and any join can <b>multiply</b> rows (several matches per key).</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                left = pd.DataFrame({"k": [1, 2, 3]})
                right = pd.DataFrame({"k": [2, 3, 3], "v": ["a", "b", "c"]})
                print(len(pd.merge(left, right, on="k")))`,
              choices: ["3", "2", "4", "6"], answer: 0,
              explain: "k=1 has no match (dropped); k=2 matches once; k=3 matches twice → 3 rows." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                left = pd.DataFrame({"k": [1, 2, 3]})
                right = pd.DataFrame({"k": [2, 3, 3], "v": ["a", "b", "c"]})
                m = pd.merge(left, right, on="k", how="left")
                print(len(m), m["v"].isna().sum())`,
              choices: ["4 1", "3 1", "3 0", "4 0"], answer: 0,
              explain: "Every left row is kept (k=3 twice, because it matched twice) and k=1 gets NaN." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                a = pd.DataFrame({"id": [1, 2], "score": [5, 6]})
                b = pd.DataFrame({"id": [1, 2], "score": [7, 8]})
                print(pd.merge(a, b, on="id").columns.tolist())`,
              choices: ["['id', 'score_x', 'score_y']", "['id', 'score']", "['id', 'score', 'score']", "['id_x', 'score_x', 'id_y', 'score_y']"], answer: 0,
              explain: "Both tables have a non-key column called score, so pandas adds suffixes. Choose them with <code>suffixes=(\"_a\", \"_b\")</code>." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                a = pd.DataFrame({"x": [1, 2]})
                b = pd.DataFrame({"x": [3]})
                print(pd.concat([a, b]).index.tolist(), pd.concat([a, b], ignore_index=True).index.tolist())`,
              choices: ["[0, 1, 0] [0, 1, 2]", "[0, 1, 2] [0, 1, 2]", "[0, 1, 0] [0, 1, 0]", "[1, 2, 3] [0, 1, 2]"], answer: 0,
              explain: "concat keeps each table's own index unless you ask it to renumber." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                a = pd.DataFrame({"k": [1, 2]})
                b = pd.DataFrame({"k": [2, 3]})
                m = pd.merge(a, b, on="k", how="outer", indicator=True)
                print(m["_merge"].astype(str).tolist())`,
              choices: ["['left_only', 'both', 'right_only']", "['both', 'both', 'both']", "['left_only', 'right_only']", "['both']"], answer: 0,
              explain: "1 is only in a, 2 is in both, 3 is only in b." },
          ],
        },
        {
          id: "pd10-5", boss: true, time: 900, title: "The Customer Ledger",
          story: "The Empress wants one ledger about every customer, the cities that bring in the most gold, and how much came from strangers.",
          lesson: `<p>A full customer report starts from the customer table (so customers without orders still appear), joins the orders with <code>how="left"</code>, then aggregates.</p>
            <ul><li><code>count</code> on the order id counts real orders (NaN from a missing match isn't counted)</li>
            <li><code>fillna(0)</code> after aggregating turns "no orders" into 0</li></ul>`,
          example: d`
            import pandas as pd

            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            m = pd.merge(c, o, on="customer_id", how="left")
            print(m.groupby("name").agg(orders=("order_id", "count"), total=("amount", "sum")))`,
          files: { "customers.csv": CUSTOMERS, "orders.csv": ORDERS },
          task: `Write:<br>• <code>customer_report(orders, customers)</code> → one row for <b>every</b> customer with columns <code>name, city, orders, total, avg</code> (orders = number of orders, total = sum of amounts, avg = mean amount rounded to 2; 0 for customers without orders), sorted by total highest first, then name A–Z, index 0, 1, 2…<br>
            • <code>city_revenue(orders, customers)</code> → total amount per city (known customers only), highest first<br>
            • <code>unknown_revenue(orders, customers)</code> → the total amount of orders whose customer is unknown`,
          starter: d`
            import pandas as pd

            def customer_report(orders, customers):
                pass

            def city_revenue(orders, customers):
                pass

            def unknown_revenue(orders, customers):
                pass
            `,
          solution: d`
            import pandas as pd

            def customer_report(orders, customers):
                m = pd.merge(customers, orders, on="customer_id", how="left")
                r = m.groupby(["name", "city"]).agg(orders=("order_id", "count"), total=("amount", "sum"), avg=("amount", "mean")).reset_index()
                r["avg"] = r["avg"].fillna(0).round(2)
                return r.sort_values(["total", "name"], ascending=[False, True]).reset_index(drop=True)

            def city_revenue(orders, customers):
                m = pd.merge(orders, customers, on="customer_id")
                return m.groupby("city")["amount"].sum().sort_values(ascending=False)

            def unknown_revenue(orders, customers):
                return float(orders[~orders["customer_id"].isin(customers["customer_id"])]["amount"].sum())`,
          hints: ["Start from customers: pd.merge(customers, orders, on=\"customer_id\", how=\"left\")", "groupby([\"name\", \"city\"]).agg(orders=(\"order_id\", \"count\"), total=(\"amount\", \"sum\"), avg=(\"amount\", \"mean\"))", "Fill the missing avg with 0, round, sort by [\"total\", \"name\"], reset the index", "unknown_revenue: orders whose customer_id isn't in customers"],
          tests: [{ code: d`
            import pandas as pd
            cr = expect_func("customer_report"); cv = expect_func("city_revenue"); ur = expect_func("unknown_revenue")
            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            want = pd.DataFrame({
                "name": ["Anna", "Lyra", "Orin", "Mira", "Bo", "Zed"],
                "city": ["Stonebridge", "Oakvale", "Stonebridge", "Oakvale", "Oakvale", "Fernhill"],
                "orders": [3, 3, 3, 2, 0, 0],
                "total": [372.0, 202.5, 160.5, 155.0, 0.0, 0.0],
                "avg": [124.0, 67.5, 53.5, 77.5, 0.0, 0.0],
            })
            expect_frame(cr(o, c), want, "customer_report")
            expect_series(cv(o, c), {"Stonebridge": 532.5, "Oakvale": 357.5}, "city_revenue")
            expect_close(ur(o, c), 99.0, "unknown_revenue")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 11
    {
      id: 11, name: "The Reshaping Loom", topic: "pivot_table, melt, crosstab, stack & unstack", time: 660, icon: "🧶",
      intro: "On the great loom, long threads become wide cloth and back again. The same data, woven into whatever shape the question needs.",
      missions: [
        {
          id: "pd11-1", title: "Pivot the Table",
          story: "The council can't read a long list of orders. They want a grid: regions down the side, products across the top.",
          lesson: `<p><code>pd.pivot_table(df, index="region", columns="product", values="units", aggfunc="sum", fill_value=0)</code> builds a grid:</p>
            <ul><li><code>index</code> → the rows; <code>columns</code> → the columns; <code>values</code> → what fills the cells</li>
            <li><code>aggfunc</code> → how to combine several rows that land in one cell (<code>"sum"</code>, <code>"mean"</code>, <code>"count"</code>…)</li>
            <li><code>fill_value=0</code> → empty cells become 0 instead of NaN</li></ul>
            <p>A pivot table is a <code>groupby</code> on two keys, laid out as a grid, just like in a spreadsheet.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(pd.pivot_table(df, index="region", columns="product", values="units", aggfunc="sum", fill_value=0))
            w = pd.read_csv("weather.csv")
            w["month"] = w["date"].str[:7]
            print(pd.pivot_table(w, index="month", columns="city", values="rain", aggfunc="sum").round(1))`,
          files: { "sales.csv": SALES, "weather.csv": WEATHER },
          task: `Write:<br>• <code>units_pivot(sales)</code> → total units with regions as rows and products as columns (0 where there were no sales)<br>
            • <code>avg_price_pivot(sales)</code> → the mean price with products as rows and regions as columns (leave empty cells as NaN)<br>
            • <code>monthly_city_temp(weather)</code> → the mean temperature with months (<code>"YYYY-MM"</code>) as rows and cities as columns, rounded to 1`,
          starter: d`
            import pandas as pd

            def units_pivot(sales):
                pass

            def avg_price_pivot(sales):
                pass

            def monthly_city_temp(weather):
                pass
            `,
          solution: d`
            import pandas as pd

            def units_pivot(sales):
                return pd.pivot_table(sales, index="region", columns="product", values="units", aggfunc="sum", fill_value=0)

            def avg_price_pivot(sales):
                return pd.pivot_table(sales, index="product", columns="region", values="price", aggfunc="mean")

            def monthly_city_temp(weather):
                w = weather.assign(month=weather["date"].str[:7])
                return pd.pivot_table(w, index="month", columns="city", values="temp", aggfunc="mean").round(1)`,
          hints: ["pd.pivot_table(df, index=..., columns=..., values=..., aggfunc=\"sum\", fill_value=0)", "avg_price_pivot: index=\"product\", columns=\"region\", aggfunc=\"mean\"", "monthly_city_temp: add a month column with weather[\"date\"].str[:7] first"],
          tests: [{ code: d`
            import pandas as pd
            up = expect_func("units_pivot"); ap = expect_func("avg_price_pivot"); mt = expect_func("monthly_city_temp")
            s = pd.read_csv("sales.csv"); w = pd.read_csv("weather.csv")
            expect_frame(up(s), pd.pivot_table(s, index="region", columns="product", values="units", aggfunc="sum", fill_value=0), "units_pivot(sales)")
            expect_frame(ap(s), pd.pivot_table(s, index="product", columns="region", values="price", aggfunc="mean"), "avg_price_pivot(sales)")
            ref = pd.pivot_table(w.assign(month=w.date.str[:7]), index="month", columns="city", values="temp", aggfunc="mean").round(1)
            expect_frame(mt(w), ref, "monthly_city_temp(weather)")` }],
        },
        {
          id: "pd11-2", title: "Melt the Wide",
          story: "The academy's grade sheet has one column per subject. To analyse it, each grade must become its own row.",
          lesson: `<p><b>Wide</b> data has one column per category (math, art, …). <b>Long</b> (tidy) data has one row per observation: (name, subject, score). Most analysis and plotting tools prefer long.</p>
            <ul><li><code>df.melt(id_vars=["name"], var_name="subject", value_name="score")</code> → wide to long</li>
            <li><code>long.pivot(index="name", columns="subject", values="score")</code> → long back to wide (each name–subject pair must appear only once; otherwise use <code>pivot_table</code>)</li></ul>`,
          example: d`
            import pandas as pd

            wide = pd.DataFrame({"name": ["Lyra", "Orin"], "math": [90, 72], "art": [65, 88]})
            long = wide.melt(id_vars=["name"], var_name="subject", value_name="score")
            print(long)
            print(long.pivot(index="name", columns="subject", values="score"))`,
          task: `Write:<br>• <code>long_scores(wide)</code> → the wide grade table (a <code>name</code> column plus one column per subject) as a long table with columns <code>name, subject, score</code>, sorted by name then subject, index 0, 1, 2…<br>
            • <code>wide_scores(long)</code> → the long table back to wide: names as the index, one column per subject<br>
            • <code>best_subject(wide)</code> → a dict <code>{name: subject with that student's highest score}</code>`,
          starter: d`
            import pandas as pd

            def long_scores(wide):
                pass

            def wide_scores(long):
                pass

            def best_subject(wide):
                pass
            `,
          solution: d`
            import pandas as pd

            def long_scores(wide):
                long = wide.melt(id_vars=["name"], var_name="subject", value_name="score")
                return long.sort_values(["name", "subject"]).reset_index(drop=True)

            def wide_scores(long):
                return long.pivot(index="name", columns="subject", values="score")

            def best_subject(wide):
                return wide.set_index("name").idxmax(axis=1).to_dict()`,
          hints: ["long_scores: wide.melt(id_vars=[\"name\"], var_name=\"subject\", value_name=\"score\"), then sort and reset the index", "wide_scores: long.pivot(index=\"name\", columns=\"subject\", values=\"score\")", "best_subject: wide.set_index(\"name\").idxmax(axis=1) gives each row's column with the maximum"],
          tests: [{ code: d`
            import pandas as pd
            ls = expect_func("long_scores"); ws = expect_func("wide_scores"); bs = expect_func("best_subject")
            wide = pd.DataFrame({"name": ["Orin", "Lyra"], "math": [72, 90], "art": [88, 65], "history": [70, 95]})
            want = pd.DataFrame({"name": ["Lyra"] * 3 + ["Orin"] * 3, "subject": ["art", "history", "math"] * 2, "score": [65, 95, 90, 88, 70, 72]})
            got = ls(wide)
            expect_frame(got, want, "long_scores(wide)")
            back = ws(got)
            expect_equal(back.loc["Lyra", "math"], 90, "wide_scores(long).loc['Lyra', 'math']")
            expect_equal(sorted(back.columns), ["art", "history", "math"], "wide_scores columns")
            expect_equal(bs(wide), {"Orin": "art", "Lyra": "history"}, "best_subject(wide)")` }],
        },
        {
          id: "pd11-3", title: "Cross the Threads",
          story: "How often does each region order each product? And what share of a region's orders is each product?",
          lesson: `<ul><li><code>pd.crosstab(df["region"], df["product"])</code> → a grid of <b>counts</b> (how many rows have each combination)</li>
            <li><code>normalize="index"</code> → each row becomes proportions that add up to 1</li>
            <li><code>margins=True</code> → adds an "All" total row and column</li>
            <li><code>.unstack()</code> → turns the inner level of a two-key index into columns (<code>.stack()</code> does the opposite): <code>df.groupby(["region", "product"])["units"].sum().unstack(fill_value=0)</code></li></ul>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            print(pd.crosstab(df["region"], df["product"], margins=True))
            print(pd.crosstab(df["region"], df["product"], normalize="index").round(2))
            print(df.groupby(["region", "product"])["units"].sum().unstack(fill_value=0))`,
          files: { "sales.csv": SALES },
          task: `Write:<br>• <code>order_counts(sales)</code> → a crosstab counting orders per region (rows) and product (columns)<br>
            • <code>product_mix(sales)</code> → the same, but each region's row as proportions of that region's orders, rounded to 3<br>
            • <code>units_grid(sales)</code> → total units per region (rows) and product (columns) using <code>groupby</code> + <code>unstack</code>, 0 where none`,
          starter: d`
            import pandas as pd

            def order_counts(sales):
                pass

            def product_mix(sales):
                pass

            def units_grid(sales):
                pass
            `,
          solution: d`
            import pandas as pd

            def order_counts(sales):
                return pd.crosstab(sales["region"], sales["product"])

            def product_mix(sales):
                return pd.crosstab(sales["region"], sales["product"], normalize="index").round(3)

            def units_grid(sales):
                return sales.groupby(["region", "product"])["units"].sum().unstack(fill_value=0)`,
          hints: ["order_counts: pd.crosstab(sales[\"region\"], sales[\"product\"])", "product_mix: add normalize=\"index\", then round(3)", "units_grid: groupby([\"region\", \"product\"])[\"units\"].sum().unstack(fill_value=0)"],
          tests: [{ code: d`
            import pandas as pd
            oc = expect_func("order_counts"); pm = expect_func("product_mix"); ug = expect_func("units_grid")
            s = pd.read_csv("sales.csv")
            expect_frame(oc(s), pd.crosstab(s.region, s["product"]), "order_counts(sales)")
            mix = pm(s)
            expect_frame(mix, pd.crosstab(s.region, s["product"], normalize="index").round(3), "product_mix(sales)")
            expect_close(mix.sum(axis=1).tolist(), [1.0] * 4, "each row of product_mix adds up to about 1", tol=0.01)
            expect_frame(ug(s), s.groupby(["region", "product"]).units.sum().unstack(fill_value=0), "units_grid(sales)")` }],
        },
        {
          id: "pd11-4", type: "quiz", title: "Riddles of the Loom",
          story: "The weaver asks what shape the cloth will have after each twist of the loom.",
          lesson: `<p>Melting <code>n</code> rows with <code>k</code> value columns gives <code>n × k</code> rows. <code>pivot</code> refuses duplicate index/column pairs; <code>pivot_table</code> aggregates them.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                wide = pd.DataFrame({"name": ["a", "b", "c"], "x": [1, 2, 3], "y": [4, 5, 6]})
                print(wide.melt(id_vars=["name"]).shape)`,
              choices: ["(6, 3)", "(3, 3)", "(6, 2)", "(9, 3)"], answer: 0,
              explain: "3 rows × 2 value columns = 6 rows, with columns name, variable and value." },
            { q: "What does this print?", predict: true, allowError: true, code: d`
                import pandas as pd
                long = pd.DataFrame({"k": ["a", "a"], "c": ["x", "x"], "v": [1, 2]})
                print(long.pivot(index="k", columns="c", values="v"))`,
              choices: ["ValueError", "a table with 1.5", "a table with 3", "a table with 1"], answer: 0,
              explain: "Two rows want the same cell (a, x), and <code>pivot</code> won't choose. <code>pivot_table</code> would aggregate them (mean = 1.5)." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                long = pd.DataFrame({"k": ["a", "a", "b"], "c": ["x", "x", "y"], "v": [1, 2, 5]})
                print(pd.pivot_table(long, index="k", columns="c", values="v", aggfunc="sum", fill_value=0).values.tolist())`,
              choices: ["[[3, 0], [0, 5]]", "[[1, 2], [5, 0]]", "[[3, 5]]", "[[1.5, 0], [0, 5]]"], answer: 0,
              explain: "Cell (a, x) sums 1 + 2; (b, y) is 5; the empty cells are filled with 0." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                df = pd.DataFrame({"r": ["N", "N", "S"], "p": ["A", "B", "A"]})
                print(pd.crosstab(df["r"], df["p"], margins=True).loc["All"].tolist())`,
              choices: ["[2, 1, 3]", "[1, 1, 2]", "[3]", "[2, 1]"], answer: 0,
              explain: "The All row counts every row per column: A appears twice, B once, 3 in total." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([1, 2, 3], index=pd.MultiIndex.from_tuples([("N", "A"), ("N", "B"), ("S", "A")]))
                print(s.unstack().shape)`,
              choices: ["(2, 2)", "(3, 2)", "(2, 3)", "(3,)"], answer: 0,
              explain: "Outer labels N, S become rows; inner labels A, B become columns (S–B is NaN)." },
          ],
        },
        {
          id: "pd11-5", boss: true, time: 900, title: "The Weaver's Pattern",
          story: "The final cloth on the loom: a revenue grid of regions and months with totals, and the pattern woven back into threads.",
          lesson: `<p><code>pivot_table(..., margins=True, margins_name="Total")</code> adds a total row and column. To go back to long form, <code>reset_index()</code> then <code>melt</code>, and drop the totals.</p>
            <p>Being able to move between long and wide quickly is what makes a pandas user fast.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv")
            df["month"] = df["date"].str[:7]
            df["revenue"] = df["units"] * df["price"]
            print(pd.pivot_table(df, index="region", columns="month", values="revenue", aggfunc="sum", fill_value=0, margins=True, margins_name="Total"))`,
          files: { "sales.csv": SALES },
          task: `Write (revenue = units × price, month = <code>"YYYY-MM"</code> from the date):<br>
            • <code>revenue_matrix(sales)</code> → total revenue with regions as rows and months as columns, 0 where none, plus a <code>"Total"</code> row and column<br>
            • <code>best_month_per_region(sales)</code> → a dict <code>{region: month with the highest revenue}</code><br>
            • <code>matrix_to_long(matrix)</code> → from a matrix like the one above, a long table with columns <code>region, month, revenue</code> <b>without</b> the totals, sorted by region then month, index 0, 1, 2…`,
          starter: d`
            import pandas as pd

            def revenue_matrix(sales):
                pass

            def best_month_per_region(sales):
                pass

            def matrix_to_long(matrix):
                pass
            `,
          solution: d`
            import pandas as pd

            def _prep(sales):
                return sales.assign(month=sales["date"].str[:7], revenue=sales["units"] * sales["price"])

            def revenue_matrix(sales):
                return pd.pivot_table(_prep(sales), index="region", columns="month", values="revenue", aggfunc="sum", fill_value=0, margins=True, margins_name="Total")

            def best_month_per_region(sales):
                m = revenue_matrix(sales).drop(index="Total", columns="Total")
                return m.idxmax(axis=1).to_dict()

            def matrix_to_long(matrix):
                m = matrix.drop(index="Total", columns="Total")
                long = m.reset_index().melt(id_vars="region", var_name="month", value_name="revenue")
                return long.sort_values(["region", "month"]).reset_index(drop=True)`,
          hints: ["revenue_matrix: pivot_table(..., fill_value=0, margins=True, margins_name=\"Total\")", "Drop the totals: m.drop(index=\"Total\", columns=\"Total\")", "best month: idxmax(axis=1)", "matrix_to_long: reset_index().melt(id_vars=\"region\", var_name=\"month\", value_name=\"revenue\")"],
          tests: [{ code: d`
            import pandas as pd
            rm = expect_func("revenue_matrix"); bm = expect_func("best_month_per_region"); ml = expect_func("matrix_to_long")
            s = pd.read_csv("sales.csv")
            p = s.assign(month=s.date.str[:7], revenue=s.units * s.price)
            ref = pd.pivot_table(p, index="region", columns="month", values="revenue", aggfunc="sum", fill_value=0, margins=True, margins_name="Total")
            m = rm(s)
            expect_frame(m, ref, "revenue_matrix(sales)")
            expect_equal(int(m.loc["Total", "Total"]), int(p.revenue.sum()), "grand total")
            core = ref.drop(index="Total", columns="Total")
            expect_equal(bm(s), core.idxmax(axis=1).to_dict(), "best_month_per_region(sales)")
            long = ml(ref)
            want = core.reset_index().melt(id_vars="region", var_name="month", value_name="revenue").sort_values(["region", "month"]).reset_index(drop=True)
            expect_frame(long, want, "matrix_to_long(matrix)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 12
    {
      id: 12, name: "The Empress's Trial", topic: "four end-to-end data projects", time: 1080, icon: "👸",
      intro: "At the top of the Jade Pagoda, Empress Mei sets four final trials. Each one is a real analysis, from raw files to answers.",
      missions: [
        {
          id: "pd12-1", boss: true, time: 1200, title: "The Kingdom Dashboard",
          story: "The Empress wants the numbers that matter on one page: the kingdom's key performance indicators.",
          lesson: `<p><b>KPIs</b> (key performance indicators) are the handful of numbers a business watches: total revenue, number of orders, average order value, best sellers, growth.</p>
            <p>Growth from January to March in percent: <code>(march - january) / january * 100</code>.</p>
            <p>Every KPI here is one or two lines of pandas you already know. The skill is choosing the right tool for each.</p>`,
          example: d`
            import pandas as pd

            df = pd.read_csv("sales.csv", parse_dates=["date"])
            df["revenue"] = df["units"] * df["price"]
            print(df["date"].dt.day_name().value_counts().head(3))
            print(df.groupby(df["date"].dt.strftime("%Y-%m"))["revenue"].sum())`,
          files: { "sales.csv": SALES },
          task: `Write <code>kpis(path)</code> that reads the sales CSV and returns a dict:<br>
            • <code>"revenue"</code>: total revenue (units × price)<br>• <code>"orders"</code>: number of orders<br>
            • <code>"avg_order"</code>: average revenue per order, rounded to 2<br>
            • <code>"best_region"</code> and <code>"best_product"</code>: the region and the product with the highest revenue<br>
            • <code>"busiest_weekday"</code>: the weekday name with the most orders (alphabetically first on a tie)<br>
            • <code>"growth_pct"</code>: March revenue compared with January revenue, in percent, rounded to 1`,
          starter: d`
            import pandas as pd

            def kpis(path):
                df = pd.read_csv(path)
                return {}
            `,
          solution: d`
            import pandas as pd

            def kpis(path):
                df = pd.read_csv(path, parse_dates=["date"])
                df["revenue"] = df["units"] * df["price"]
                by_month = df.groupby(df["date"].dt.strftime("%Y-%m"))["revenue"].sum()
                days = df["date"].dt.day_name().value_counts()
                busiest = sorted(days[days == days.max()].index)[0]
                return {
                    "revenue": int(df["revenue"].sum()),
                    "orders": len(df),
                    "avg_order": round(float(df["revenue"].mean()), 2),
                    "best_region": df.groupby("region")["revenue"].sum().idxmax(),
                    "best_product": df.groupby("product")["revenue"].sum().idxmax(),
                    "busiest_weekday": busiest,
                    "growth_pct": round(float((by_month["2024-03"] - by_month["2024-01"]) / by_month["2024-01"] * 100), 1),
                }`,
          hints: ["Read with parse_dates=[\"date\"] and add a revenue column", "best_region: groupby(\"region\")[\"revenue\"].sum().idxmax()", "busiest_weekday: value_counts of dt.day_name(); handle ties by sorting the names that share the maximum", "Monthly revenue: groupby(df[\"date\"].dt.strftime(\"%Y-%m\"))[\"revenue\"].sum()"],
          tests: [{ code: d`
            import pandas as pd
            kp = expect_func("kpis")
            df = pd.read_csv("sales.csv", parse_dates=["date"])
            df["revenue"] = df.units * df.price
            bm = df.groupby(df.date.dt.strftime("%Y-%m")).revenue.sum()
            days = df.date.dt.day_name().value_counts()
            want = {"revenue": int(df.revenue.sum()), "orders": 40, "avg_order": round(df.revenue.mean(), 2),
                    "best_region": df.groupby("region").revenue.sum().idxmax(), "best_product": df.groupby("product").revenue.sum().idxmax(),
                    "busiest_weekday": sorted(days[days == days.max()].index)[0],
                    "growth_pct": round((bm["2024-03"] - bm["2024-01"]) / bm["2024-01"] * 100, 1)}
            got = kp("sales.csv")
            for k, v in want.items():
                if isinstance(v, float):
                    expect_close(got.get(k), v, "kpis[" + repr(k) + "]")
                else:
                    expect_equal(got.get(k), v, "kpis[" + repr(k) + "]")` }],
        },
        {
          id: "pd12-2", boss: true, time: 1200, title: "The Clean Pipeline",
          story: "The census will be re-run every year. Build a pipeline that turns any raw census file into analysis-ready data.",
          lesson: `<p>A reusable <b>pipeline</b>: read → clean text → fix types (numbers <b>and dates</b>) → remove duplicates → derive new columns → sort.</p>
            <ul><li><code>pd.to_datetime(s, errors="coerce")</code> → bad or missing dates become <code>NaT</code> (the date version of NaN)</li>
            <li>Days between two dates: <code>(pd.Timestamp(ref) - df["joined"]).dt.days</code></li>
            <li><code>pd.cut(age, bins=[0, 17, 35, 60, np.inf], labels=[...])</code> → age groups</li></ul>`,
          example: d`
            import pandas as pd

            d = pd.to_datetime(pd.Series(["2023-01-15", None, "oops"]), errors="coerce")
            print(d.tolist())
            print((pd.Timestamp("2024-01-01") - d).dt.days.tolist())`,
          files: { "census_raw.csv": CENSUS },
          task: `Write:<br>• <code>pipeline(path, ref_date)</code> → the census cleaned like in <i>The Census Cleanup</i> (name/city stripped and Title Case, numeric age and income, duplicates removed after cleaning), plus:<br>
            &nbsp;&nbsp;– <code>joined</code> as real dates (missing → NaT)<br>
            &nbsp;&nbsp;– <code>tenure_days</code>: days from <code>joined</code> to <code>ref_date</code> (a text date)<br>
            &nbsp;&nbsp;– <code>age_group</code> (text): <code>"minor"</code> 0–17, <code>"young"</code> 18–35, <code>"middle"</code> 36–60, <code>"senior"</code> 61+, and <code>"unknown"</code> when age is missing<br>
            &nbsp;&nbsp;sorted by name, index 0, 1, 2…<br>
            • <code>income_by_group(df)</code> → the mean income per age group (ignoring missing incomes), rounded to 2`,
          starter: d`
            import pandas as pd
            import numpy as np

            def pipeline(path, ref_date):
                return pd.read_csv(path)

            def income_by_group(df):
                pass
            `,
          solution: d`
            import pandas as pd
            import numpy as np

            def pipeline(path, ref_date):
                df = pd.read_csv(path)
                df["name"] = df["name"].str.strip().str.title()
                df["city"] = df["city"].str.strip().str.title()
                df["age"] = pd.to_numeric(df["age"], errors="coerce")
                df["income"] = pd.to_numeric(df["income"].str.replace("[$,]", "", regex=True), errors="coerce")
                df = df.drop_duplicates()
                df["joined"] = pd.to_datetime(df["joined"], errors="coerce")
                df["tenure_days"] = (pd.Timestamp(ref_date) - df["joined"]).dt.days
                groups = pd.cut(df["age"], bins=[0, 17, 35, 60, np.inf], labels=["minor", "young", "middle", "senior"])
                df["age_group"] = groups.astype(str).replace("nan", "unknown")
                return df.sort_values("name").reset_index(drop=True)

            def income_by_group(df):
                return df.groupby("age_group")["income"].mean().round(2)`,
          hints: ["Reuse the cleaning steps, then drop_duplicates()", "joined: pd.to_datetime(df[\"joined\"], errors=\"coerce\"); tenure: (pd.Timestamp(ref_date) - df[\"joined\"]).dt.days", "age_group: pd.cut(...).astype(str) turns missing into \"nan\": replace it with \"unknown\"", "income_by_group: groupby(\"age_group\")[\"income\"].mean().round(2)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            pl = expect_func("pipeline"); ig = expect_func("income_by_group")
            out = pl("census_raw.csv", "2024-01-01")
            expect_equal(out["name"].tolist(), ["Anna Brook", "Bo Finch", "Cass Reed", "Lyra Stone", "Mira Keen", "Orin Vale", "Zed Hollow"], "names (sorted, duplicate removed)")
            assert pd.api.types.is_datetime64_any_dtype(out["joined"]), "joined should hold real dates."
            expect_series(out["tenure_days"], [np.nan, 244, 500, 351, 397, 334, 295], "tenure_days")
            expect_equal(out["age_group"].tolist(), ["middle", "minor", "unknown", "young", "middle", "unknown", "young"], "age_group")
            expect_equal(out.index.tolist(), list(range(7)), "index")
            expect_series(ig(out).sort_index(), {"middle": 2750.0, "minor": 0.0, "unknown": 1350.0, "young": 1200.0}, "income_by_group (sorted by group)")` }],
        },
        {
          id: "pd12-3", boss: true, time: 1200, title: "The Loyal Customers",
          story: "The Empress wants to reward her best customers. Rank them, give each a tier, and find the best customer in each city.",
          lesson: `<p><b>Customer segmentation</b> groups customers by behaviour so a business can treat them differently. A simple version: total spent → tier.</p>
            <ul><li><code>pd.cut(total, bins=[-np.inf, 100, 200, np.inf], right=False, labels=["bronze", "silver", "gold"])</code> → [−∞, 100) bronze, [100, 200) silver, [200, ∞) gold (<code>right=False</code> includes the left edge)</li>
            <li>Best per group: sort, then <code>drop_duplicates("city")</code></li></ul>`,
          example: d`
            import pandas as pd
            import numpy as np

            t = pd.Series([50, 100, 199.5, 200])
            print(pd.cut(t, bins=[-np.inf, 100, 200, np.inf], right=False, labels=["bronze", "silver", "gold"]).astype(str).tolist())`,
          files: { "customers.csv": CUSTOMERS, "orders.csv": ORDERS },
          task: `Write:<br>• <code>loyalty(orders, customers)</code> → one row per <b>known customer who ordered</b>, with columns <code>name, city, orders, total, avg, tier</code> (avg rounded to 2; tier: <code>"gold"</code> for a total of 200+, <code>"silver"</code> for 100+, else <code>"bronze"</code>, as text), sorted by total highest first, index 0, 1, 2…<br>
            • <code>best_per_city(orders, customers)</code> → a dict <code>{city: name of the customer who spent the most there}</code> (only cities with orders)`,
          starter: d`
            import pandas as pd
            import numpy as np

            def loyalty(orders, customers):
                pass

            def best_per_city(orders, customers):
                pass
            `,
          solution: d`
            import pandas as pd
            import numpy as np

            def loyalty(orders, customers):
                m = pd.merge(orders, customers, on="customer_id")
                t = m.groupby(["name", "city"]).agg(orders=("order_id", "count"), total=("amount", "sum"), avg=("amount", "mean")).reset_index()
                t["avg"] = t["avg"].round(2)
                t["tier"] = pd.cut(t["total"], bins=[-np.inf, 100, 200, np.inf], right=False, labels=["bronze", "silver", "gold"]).astype(str)
                return t.sort_values("total", ascending=False).reset_index(drop=True)

            def best_per_city(orders, customers):
                t = loyalty(orders, customers)
                return t.sort_values("total", ascending=False).drop_duplicates("city").set_index("city")["name"].to_dict()`,
          hints: ["Inner merge orders with customers, then groupby([\"name\", \"city\"]).agg(...)", "tier: pd.cut(total, bins=[-np.inf, 100, 200, np.inf], right=False, labels=[\"bronze\", \"silver\", \"gold\"]).astype(str)", "best_per_city: sort by total, drop_duplicates(\"city\"), set_index(\"city\")[\"name\"].to_dict()"],
          tests: [{ code: d`
            import pandas as pd
            lo = expect_func("loyalty"); bp = expect_func("best_per_city")
            c = pd.read_csv("customers.csv"); o = pd.read_csv("orders.csv")
            want = pd.DataFrame({"name": ["Anna", "Lyra", "Orin", "Mira"], "city": ["Stonebridge", "Oakvale", "Stonebridge", "Oakvale"],
                                 "orders": [3, 3, 3, 2], "total": [372.0, 202.5, 160.5, 155.0], "avg": [124.0, 67.5, 53.5, 77.5],
                                 "tier": ["gold", "gold", "silver", "silver"]})
            got = lo(o, c)
            expect_frame(got.assign(tier=got["tier"].astype(str)), want, "loyalty(orders, customers)")
            expect_equal(bp(o, c), {"Stonebridge": "Anna", "Oakvale": "Lyra"}, "best_per_city")` }],
        },
        {
          id: "pd12-4", boss: true, time: 1200, title: "The Weather Oracle",
          story: "The last trial. Read the skies of both cities, measure their trends, and find their warmest streaks. Then Empress Mei is free.",
          lesson: `<p>A small time-series study:</p>
            <ul><li><b>Trend</b>: fit a straight line through temperature vs day number with <code>np.polyfit(days, temps, 1)</code>; the slope is degrees per day</li>
            <li>The latest 7-day average: <code>s.rolling(7).mean().iloc[-1]</code></li>
            <li><b>Streaks</b> (runs) use the same trick as dry spells: <code>hot = s &gt; t</code>, <code>hot.groupby((~hot).cumsum()).sum().max()</code></li></ul>`,
          example: d`
            import numpy as np
            import pandas as pd

            s = pd.Series([1.0, 2.2, 2.8, 4.1, 5.0])
            print(np.polyfit(np.arange(len(s)), s, 1).round(3))
            print(s.rolling(3).mean().iloc[-1].round(2))`,
          files: { "weather.csv": WEATHER },
          task: `Write:<br>• <code>city_profile(df, city)</code> → a dict: <code>"mean_temp"</code> (rounded to 2), <code>"last_week_avg"</code> (mean of the last 7 days, rounded to 2), <code>"trend_per_day"</code> (slope of the straight-line fit of temp against day number 0, 1, 2…, rounded to 3), <code>"total_rain"</code> (rounded to 1)<br>
            • <code>warm_streak(df, city, threshold)</code> → the most consecutive days with a temperature above <code>threshold</code><br>
            • <code>oracle(df)</code> → a DataFrame with one row per city (the index, A–Z) and the four profile values as columns`,
          starter: d`
            import pandas as pd
            import numpy as np

            def city_profile(df, city):
                pass

            def warm_streak(df, city, threshold):
                pass

            def oracle(df):
                pass
            `,
          solution: d`
            import pandas as pd
            import numpy as np

            def _city(df, city):
                c = df[df["city"] == city].copy()
                c["date"] = pd.to_datetime(c["date"])
                return c.sort_values("date").set_index("date")

            def city_profile(df, city):
                c = _city(df, city)
                slope = np.polyfit(np.arange(len(c)), c["temp"].to_numpy(), 1)[0]
                return {
                    "mean_temp": round(float(c["temp"].mean()), 2),
                    "last_week_avg": round(float(c["temp"].iloc[-7:].mean()), 2),
                    "trend_per_day": round(float(slope), 3),
                    "total_rain": round(float(c["rain"].sum()), 1),
                }

            def warm_streak(df, city, threshold):
                hot = _city(df, city)["temp"] > threshold
                return int(hot.groupby((~hot).cumsum()).sum().max())

            def oracle(df):
                cities = sorted(df["city"].unique())
                return pd.DataFrame([city_profile(df, c) for c in cities], index=cities)`,
          hints: ["Helper: filter the city, convert and sort the dates", "trend: np.polyfit(np.arange(len(c)), c[\"temp\"].to_numpy(), 1)[0]", "warm_streak: hot = temp > threshold; hot.groupby((~hot).cumsum()).sum().max()", "oracle: pd.DataFrame([city_profile(df, c) for c in cities], index=cities)"],
          tests: [{ code: d`
            import pandas as pd, numpy as np
            cp = expect_func("city_profile"); ws = expect_func("warm_streak"); orc = expect_func("oracle")
            df = pd.read_csv("weather.csv")
            rows = {}
            for city in ("Oakvale", "Stonebridge"):
                c = df[df.city == city].assign(date=lambda x: pd.to_datetime(x.date)).sort_values("date")
                want = {"mean_temp": round(c.temp.mean(), 2), "last_week_avg": round(c.temp.iloc[-7:].mean(), 2),
                        "trend_per_day": round(np.polyfit(np.arange(len(c)), c.temp.to_numpy(), 1)[0], 3), "total_rain": round(c.rain.sum(), 1)}
                rows[city] = want
                got = cp(df, city)
                expect_close({k: got.get(k) for k in want}, want, "city_profile(weather, " + repr(city) + ")")
                for t in (10, 15):
                    hot = c.temp.reset_index(drop=True) > t
                    expect_equal(ws(df, city, t), int(hot.groupby((~hot).cumsum()).sum().max()), f"warm_streak(weather, {city!r}, {t})")
            expect_frame(orc(df), pd.DataFrame(rows).T, "oracle(weather)")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "pandas", name: "pandas", realm: "The Bamboo Kingdom", tower: "The Jade Pagoda",
    ruler: "Empress Mei", rulerIcon: "👸", icon: "🐼", color: "#3fd49a", requires: ["numpy"],
    packages: ["numpy", "pandas"], runMs: 12000, submitMs: 20000,
    blurb: "Load, clean, reshape and summarise real tables of data: the everyday tool of a data scientist.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
