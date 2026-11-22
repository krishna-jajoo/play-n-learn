// The Visualization empire: the Painted Isles. Lady Florence waits in the Lighthouse of Insight.
// Charts are drawn off-screen with matplotlib (seaborn on floor 5) and shown as images; tests inspect the
// chart objects themselves (bar heights, line data, labels, colours, scales). See expect_fig etc. in harness.js.
(function (root) {
  const { d } = root.QUEST;

  // ───────────────────────────── datasets (the same ones as the pandas realm)
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

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The First Canvas", topic: "figures, axes, line plots, labels & styles", time: 480, icon: "🖼️",
      intro: "On the Painted Isles, numbers become pictures. Your first brush is matplotlib, the library behind most charts in Python.",
      missions: [
        {
          id: "vz1-1", title: "The First Line",
          story: "Lady Florence asks for a picture of the kingdom's growth. A table of numbers won't move the council; a chart will.",
          lesson: `<p><b>matplotlib</b> draws charts. The usual start:</p>
            <pre class="out">import matplotlib.pyplot as plt
fig, ax = plt.subplots()</pre>
            <ul><li><code>fig</code> is the whole picture (the <b>Figure</b>); <code>ax</code> is one chart inside it (an <b>Axes</b>)</li>
            <li><code>ax.plot(x, y)</code> draws a line through the points</li>
            <li><code>ax.set_title(...)</code>, <code>ax.set_xlabel(...)</code>, <code>ax.set_ylabel(...)</code> name things</li></ul>
            <p>Press <b>Run</b> and your chart appears below the output. (In normal Python you'd call <code>plt.show()</code>; here it's optional.)</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.plot([1, 2, 3, 4], [10, 14, 12, 18])
            ax.set_title("A first line")
            ax.set_xlabel("Day")
            ax.set_ylabel("Visitors")`,
          task: `Draw the kingdom's population as a line: <code>years</code> on the x-axis, <code>population</code> on the y-axis.<br>
            Title: <code>Kingdom population</code>; x label: <code>Year</code>; y label: <code>People</code>.`,
          starter: d`
            import matplotlib.pyplot as plt

            years = [1200, 1201, 1202, 1203, 1204, 1205]
            population = [5200, 5600, 6100, 6000, 6800, 7400]
            `,
          solution: d`
            import matplotlib.pyplot as plt

            years = [1200, 1201, 1202, 1203, 1204, 1205]
            population = [5200, 5600, 6100, 6000, 6800, 7400]
            fig, ax = plt.subplots()
            ax.plot(years, population)
            ax.set_title("Kingdom population")
            ax.set_xlabel("Year")
            ax.set_ylabel("People")`,
          hints: ["fig, ax = plt.subplots()", "ax.plot(years, population)", "ax.set_title(...), ax.set_xlabel(...), ax.set_ylabel(...)"],
          tests: [{ code: d`
            fig = expect_fig(1); ax = fig.axes[0]
            lines = lines_of(ax)
            assert len(lines) == 1, "Draw exactly one line (you have " + str(len(lines)) + ")."
            expect_close(list(lines[0].get_xdata()), [1200, 1201, 1202, 1203, 1204, 1205], "the line's x values (years)")
            expect_close(list(lines[0].get_ydata()), [5200, 5600, 6100, 6000, 6800, 7400], "the line's y values (population)")
            expect_text(ax.get_title(), "title", exact="Kingdom population")
            expect_text(ax.get_xlabel(), "x label", exact="Year")
            expect_text(ax.get_ylabel(), "y label", exact="People")` }],
        },
        {
          id: "vz1-2", title: "Two Lines and a Legend",
          story: "Two cities argue about which is warmer. Put both on one chart, and let the picture settle it.",
          lesson: `<p>Call <code>ax.plot</code> once per series. Give each a <code>label=</code>, then <code>ax.legend()</code> shows a key.</p>
            <p>The x values can be text (categories like month names): matplotlib places them in order.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.plot(["Mon", "Tue", "Wed"], [3, 5, 4], label="Bread")
            ax.plot(["Mon", "Tue", "Wed"], [1, 2, 6], label="Ale")
            ax.legend()`,
          task: `Plot both cities' average temperatures against <code>months</code>: one line labelled <code>Oakvale</code>, one labelled <code>Stonebridge</code>. Show a legend.<br>
            Title: <code>Average temperature</code>; y label: <code>°C</code>.`,
          starter: d`
            import matplotlib.pyplot as plt

            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
            oakvale = [3, 5, 9, 13, 17, 21]
            stonebridge = [7, 8, 12, 15, 19, 24]
            `,
          solution: d`
            import matplotlib.pyplot as plt

            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
            oakvale = [3, 5, 9, 13, 17, 21]
            stonebridge = [7, 8, 12, 15, 19, 24]
            fig, ax = plt.subplots()
            ax.plot(months, oakvale, label="Oakvale")
            ax.plot(months, stonebridge, label="Stonebridge")
            ax.set_title("Average temperature")
            ax.set_ylabel("°C")
            ax.legend()`,
          hints: ["Two ax.plot calls, each with label=\"…\"", "ax.legend() after plotting", "ax.set_ylabel(\"°C\")"],
          tests: [{ code: d`
            fig = expect_fig(1); ax = fig.axes[0]
            lines = {l.get_label(): l for l in lines_of(ax)}
            for name, vals in [("Oakvale", [3, 5, 9, 13, 17, 21]), ("Stonebridge", [7, 8, 12, 15, 19, 24])]:
                assert name in lines, "There should be a line labelled " + repr(name) + " (label=...)."
                expect_close(list(lines[name].get_ydata()), vals, name + "'s values")
            expect_equal(sorted(legend_of(ax)), ["Oakvale", "Stonebridge"], "legend entries")
            expect_text(ax.get_title(), "title", exact="Average temperature")
            expect_text(ax.get_ylabel(), "y label", exact="°C")` }],
        },
        {
          id: "vz1-3", title: "Style the Stroke",
          story: "The herald wants the scores chart bold and clear: a red dashed line with dots, on a scale from 0 to 100.",
          lesson: `<p>Line style keywords:</p>
            <ul><li><code>color="red"</code> (names, <code>"#1f77b4"</code> hex codes, or <code>"tab:blue"</code>)</li>
            <li><code>linestyle="--"</code> (dashed), <code>":"</code> (dotted), <code>"-"</code> (solid)</li>
            <li><code>marker="o"</code> (dots), <code>"s"</code> (squares), <code>"^"</code> (triangles); <code>linewidth=2</code></li></ul>
            <p>Axes settings: <code>ax.set_ylim(0, 100)</code> fixes the y range; <code>ax.grid(True)</code> adds guide lines.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.plot([1, 2, 3], [20, 35, 30], color="tab:green", linestyle=":", marker="s", linewidth=3)
            ax.set_ylim(0, 50)
            ax.grid(True)`,
          task: `Plot <code>scores</code> against <code>days</code> as a <b>red, dashed</b> line with <b>circle</b> markers and line width 2.<br>
            Make the y-axis run from 0 to 100 and turn the grid on.`,
          starter: d`
            import matplotlib.pyplot as plt

            days = [1, 2, 3, 4, 5, 6, 7]
            scores = [55, 62, 58, 71, 80, 77, 85]
            fig, ax = plt.subplots()
            ax.plot(days, scores)
            `,
          solution: d`
            import matplotlib.pyplot as plt

            days = [1, 2, 3, 4, 5, 6, 7]
            scores = [55, 62, 58, 71, 80, 77, 85]
            fig, ax = plt.subplots()
            ax.plot(days, scores, color="red", linestyle="--", marker="o", linewidth=2)
            ax.set_ylim(0, 100)
            ax.grid(True)`,
          hints: ["ax.plot(days, scores, color=\"red\", linestyle=\"--\", marker=\"o\", linewidth=2)", "ax.set_ylim(0, 100)", "ax.grid(True)"],
          tests: [{ code: d`
            fig = expect_fig(1); ax = fig.axes[0]
            lines = lines_of(ax)
            assert len(lines) == 1, "Draw exactly one line."
            l = lines[0]
            expect_close(list(l.get_ydata()), [55, 62, 58, 71, 80, 77, 85], "the scores")
            expect_equal(hexcolor(l.get_color()), "#ff0000", "line colour (red)")
            expect_equal(l.get_linestyle(), "--", "line style (dashed)")
            expect_equal(l.get_marker(), "o", "marker (circles)")
            expect_close(l.get_linewidth(), 2, "line width")
            expect_close(ax.get_ylim(), (0, 100), "y-axis range")
            assert any(g.get_visible() for g in ax.get_ygridlines()), "Turn the grid on with ax.grid(True)."` }],
        },
        {
          id: "vz1-4", type: "quiz", title: "Riddles of the Canvas",
          story: "Lady Florence's apprentices test what you know about figures, axes and lines.",
          lesson: `<p>One <b>Figure</b> can hold several <b>Axes</b> (charts). Each <code>ax.plot</code> call adds a line to that Axes. With only y values, <code>plot</code> uses 0, 1, 2, … as x.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.plot([10, 20, 30])
                print(list(ax.get_lines()[0].get_xdata()))`,
              choices: ["[0.0, 1.0, 2.0]", "[10.0, 20.0, 30.0]", "[1.0, 2.0, 3.0]", "[]"], answer: 0,
              explain: "With a single list, it becomes the y values, and x is simply 0, 1, 2, … (matplotlib stores them as floats)." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.plot([1, 2], [3, 4], "r--")
                line = ax.get_lines()[0]
                print(line.get_color(), line.get_linestyle())`,
              choices: ["r --", "red -", "b --", "r -"], answer: 0,
              explain: "The short format string \"r--\" means red and dashed." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.plot([1, 2])
                ax.plot([3, 4])
                print(len(ax.get_lines()), len(fig.axes))`,
              choices: ["2 1", "1 2", "2 2", "1 1"], answer: 0,
              explain: "Two lines on the same chart: one Axes, two lines." },
            { q: "In <code>fig, ax = plt.subplots()</code>, what is <code>ax</code>?",
              choices: ["one chart (the plotting area) inside the figure", "the whole window", "the x-axis only", "a list of all the lines"], answer: 0,
              explain: "The Figure is the canvas; an Axes is one chart on it, with its own x-axis and y-axis." },
            { q: "Why do data scientists prefer <code>ax.set_title(...)</code> over <code>plt.title(...)</code>?",
              choices: ["it says exactly which chart to change, which matters when a figure has several", "plt.title doesn't exist", "it's faster", "it draws a bigger title"], answer: 0,
              explain: "The <code>plt.</code> functions act on whichever chart is \"current\", which gets confusing with several charts." },
          ],
        },
        {
          id: "vz1-5", boss: true, time: 720, title: "The Growth Chart",
          story: "The almanac wants Oakvale's daily temperature, and a smooth trend line that ignores the day-to-day noise.",
          lesson: `<p>Pandas and matplotlib work together: plot a Series with <code>ax.plot(s.index, s.values)</code>; dates on the x-axis are handled automatically.</p>
            <p>A <b>rolling mean</b> (<code>s.rolling(7).mean()</code>) smooths noise. Draw it thicker so it stands out, and let a legend explain the two lines. (This mission comes with <code>weather.csv</code>.)</p>`,
          example: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            s = w[w["city"] == "Stonebridge"].set_index("date")["rain"]
            fig, ax = plt.subplots()
            ax.plot(s.index, s.values, label="rain")
            ax.legend()`,
          files: { "weather.csv": WEATHER },
          task: `From <code>weather.csv</code>, plot Oakvale's daily <code>temp</code> (label <code>daily</code>) and its 7-day rolling mean (label <code>7-day average</code>, line width 3) on the same chart, with dates on the x-axis.<br>
            Add a legend, a title that mentions <code>Oakvale</code>, and the y label <code>°C</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            oak = w[w["city"] == "Oakvale"].set_index("date")["temp"]
            fig, ax = plt.subplots()
            ax.plot(oak.index, oak.values, label="daily")
            ax.plot(oak.index, oak.rolling(7).mean().values, label="7-day average", linewidth=3)
            ax.set_title("Oakvale temperature")
            ax.set_ylabel("°C")
            ax.legend()`,
          hints: ["oak = w[w[\"city\"] == \"Oakvale\"].set_index(\"date\")[\"temp\"]", "ax.plot(oak.index, oak.values, label=\"daily\")", "ax.plot(oak.index, oak.rolling(7).mean().values, label=\"7-day average\", linewidth=3)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            w = pd.read_csv("weather.csv", parse_dates=["date"])
            oak = w[w.city == "Oakvale"].set_index("date")["temp"]
            lines = {l.get_label(): l for l in lines_of(ax)}
            assert "daily" in lines and "7-day average" in lines, "Label the lines 'daily' and '7-day average' (found " + str(list(lines)) + ")."
            expect_array(np.asarray(lines["daily"].get_ydata(), dtype=float), oak.values, "the daily line")
            expect_array(np.asarray(lines["7-day average"].get_ydata(), dtype=float), oak.rolling(7).mean().values, "the 7-day average line")
            expect_close(lines["7-day average"].get_linewidth(), 3, "the average line's width")
            expect_equal(sorted(legend_of(ax)), ["7-day average", "daily"], "legend entries")
            expect_text(ax.get_title(), "title", contains="Oakvale")
            expect_text(ax.get_ylabel(), "y label", exact="°C")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Gallery of Forms", topic: "bar charts, histograms, scatter plots & box plots", time: 540, icon: "📊",
      intro: "The gallery holds a different form for every question: bars to compare, histograms to show spread, scatters to reveal relations.",
      missions: [
        {
          id: "vz2-1", title: "Raise the Bars",
          story: "Which region earns the most? A sorted bar chart answers before anyone finishes reading the table.",
          lesson: `<p><code>ax.bar(categories, values)</code> draws vertical bars; <code>ax.barh</code> horizontal ones.</p>
            <p>Bars are for <b>comparing</b> amounts between categories. Sorting them (largest first) makes the ranking instantly readable.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.bar(["Rope", "Lamp", "Axe"], [12, 30, 7], color="tab:orange")
            ax.set_ylabel("Sold")`,
          files: { "sales.csv": SALES },
          task: `From <code>sales.csv</code>, compute each region's total revenue (units × price) and draw it as a bar chart, <b>highest first</b>.<br>
            Title: <code>Revenue by region</code>; y label: <code>Gold</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            rev = (sales["units"] * sales["price"]).groupby(sales["region"]).sum().sort_values(ascending=False)
            fig, ax = plt.subplots()
            ax.bar(rev.index, rev.values)
            ax.set_title("Revenue by region")
            ax.set_ylabel("Gold")`,
          hints: ["rev = (sales[\"units\"] * sales[\"price\"]).groupby(sales[\"region\"]).sum()", "sort_values(ascending=False) before plotting", "ax.bar(rev.index, rev.values)"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv")
            rev = (s.units * s.price).groupby(s.region).sum().sort_values(ascending=False)
            expect_close(bars_of(ax), list(rev.values), "bar heights (highest first)")
            expect_equal(ticklabels_of(ax), list(rev.index), "region names under the bars")
            expect_text(ax.get_title(), "title", exact="Revenue by region")
            expect_text(ax.get_ylabel(), "y label", exact="Gold")` }],
        },
        {
          id: "vz2-2", title: "Count the Spread",
          story: "How are Oakvale's temperatures spread out? Mostly mild, or wild swings? A histogram shows the shape.",
          lesson: `<p>A <b>histogram</b> splits the range of values into <b>bins</b> and draws one bar per bin, as tall as the number of values in it. It shows a distribution's shape: where the values cluster, how wide they spread, whether there's a long tail.</p>
            <p><code>ax.hist(values, bins=12, edgecolor="black")</code>. The number of bins changes the picture, so try a few.</p>`,
          example: d`
            import numpy as np
            import matplotlib.pyplot as plt

            data = np.random.default_rng(0).normal(170, 8, 500)
            fig, ax = plt.subplots()
            ax.hist(data, bins=20, edgecolor="white")
            ax.set_xlabel("Height (cm)")`,
          files: { "weather.csv": WEATHER },
          task: `Draw a histogram of Oakvale's daily <code>temp</code> values with <b>12 bins</b> and black edges.<br>
            x label: <code>°C</code>; y label: <code>Days</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv")
            temps = w[w["city"] == "Oakvale"]["temp"]
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv")
            temps = w[w["city"] == "Oakvale"]["temp"]
            fig, ax = plt.subplots()
            ax.hist(temps, bins=12, edgecolor="black")
            ax.set_xlabel("°C")
            ax.set_ylabel("Days")`,
          hints: ["ax.hist(temps, bins=12, edgecolor=\"black\")", "ax.set_xlabel(\"°C\"); ax.set_ylabel(\"Days\")"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            w = pd.read_csv("weather.csv"); t = w[w.city == "Oakvale"].temp
            heights = bars_of(ax)
            assert len(heights) == 12, "Use 12 bins (your histogram has " + str(len(heights)) + " bars)."
            expect_close(heights, list(np.histogram(t, bins=12)[0]), "the number of days in each bin")
            expect_equal(hexcolor(ax.patches[0].get_edgecolor()), "#000000", "bar edge colour (black)")
            expect_text(ax.get_xlabel(), "x label", exact="°C"); expect_text(ax.get_ylabel(), "y label", exact="Days")` }],
        },
        {
          id: "vz2-3", title: "Scatter the Stars",
          story: "Do stronger heroes hoard more gold? One dot per hero will show whether the two go together.",
          lesson: `<p>A <b>scatter plot</b> shows the relation between two numeric variables: one dot per row. <code>ax.scatter(x, y, s=60, alpha=0.7)</code>: <code>s</code> is the dot size; <code>alpha</code> makes dots see-through, so overlaps show.</p>
            <p>Missing values can't be drawn, so drop them first (<code>df.dropna(subset=[...])</code>).</p>`,
          example: d`
            import numpy as np
            import matplotlib.pyplot as plt

            rng = np.random.default_rng(1)
            x = rng.uniform(0, 10, 40); y = 2 * x + rng.normal(0, 3, 40)
            fig, ax = plt.subplots()
            ax.scatter(x, y, s=50, alpha=0.6)`,
          files: { "heroes.csv": HEROES },
          task: `From <code>heroes.csv</code>, drop the heroes with missing <code>gold</code>, then scatter <code>level</code> (x) against <code>gold</code> (y) with dot size 60 and alpha 0.7.<br>
            x label: <code>Level</code>; y label: <code>Gold</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv").dropna(subset=["gold"])
            fig, ax = plt.subplots()
            ax.scatter(heroes["level"], heroes["gold"], s=60, alpha=0.7)
            ax.set_xlabel("Level")
            ax.set_ylabel("Gold")`,
          hints: ["heroes.dropna(subset=[\"gold\"])", "ax.scatter(h[\"level\"], h[\"gold\"], s=60, alpha=0.7)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            h = pd.read_csv("heroes.csv").dropna(subset=["gold"])
            pts = points_of(ax)
            expect_array(pts, h[["level", "gold"]].values, "the dots (level, gold)")
            expect_close(float(ax.collections[0].get_sizes()[0]), 60, "dot size")
            expect_close(ax.collections[0].get_alpha(), 0.7, "alpha")
            expect_text(ax.get_xlabel(), "x label", exact="Level"); expect_text(ax.get_ylabel(), "y label", exact="Gold")` }],
        },
        {
          id: "vz2-4", type: "quiz", title: "Riddles of the Gallery",
          story: "Each painting in the gallery answers a different question. Match the question to the form.",
          lesson: `<p><b>Line</b>: change over time. <b>Bar</b>: compare amounts between categories. <b>Histogram</b>: the shape of one variable's distribution. <b>Scatter</b>: the relation between two numeric variables. <b>Box plot</b>: compare distributions between groups.</p>`,
          questions: [
            { q: "You want to show how hero levels are distributed (are most heroes low-level?). Which chart?",
              choices: ["histogram", "line chart", "pie chart", "scatter plot"], answer: 0, explain: "One numeric variable's distribution → histogram." },
            { q: "You want to compare the total revenue of the four regions. Which chart?",
              choices: ["bar chart", "histogram", "scatter plot", "line chart"], answer: 0, explain: "Comparing amounts between categories → bars." },
            { q: "Does gold rise with level? Which chart?",
              choices: ["scatter plot", "bar chart", "pie chart", "histogram"], answer: 0, explain: "The relation between two numeric variables → scatter." },
            { q: "You want to show the daily temperature over three months. Which chart?",
              choices: ["line chart", "pie chart", "bar chart of 91 bars", "histogram"], answer: 0, explain: "Change over time → line." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                counts, edges, bars = ax.hist([1, 2, 2, 3, 3, 3], bins=3)
                print(counts.tolist(), len(ax.patches))`,
              choices: ["[1.0, 2.0, 3.0] 3", "[1.0, 2.0, 3.0] 6", "[3.0, 2.0, 1.0] 3", "[6.0] 1"], answer: 0,
              explain: "Three bins with one, two and three values; one bar (patch) per bin." },
          ],
        },
        {
          id: "vz2-5", boss: true, time: 810, title: "The Market Panorama",
          story: "The council wants the products' revenue at a glance: exact numbers on the bars, and a line showing the average.",
          lesson: `<ul><li><code>bars = ax.bar(...)</code> then <code>ax.bar_label(bars)</code> writes each bar's value on it</li>
            <li><code>ax.axhline(y, linestyle="--", color="gray", label="average")</code> draws a horizontal reference line across the chart</li>
            <li>A legend can include the reference line (it has a label)</li></ul>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            bars = ax.bar(["A", "B", "C"], [30, 45, 15])
            ax.bar_label(bars)
            ax.axhline(30, linestyle="--", color="gray", label="target")
            ax.legend()`,
          files: { "sales.csv": SALES },
          task: `From <code>sales.csv</code>, draw total revenue (units × price) per <b>product</b>, highest first, with each bar's value written on it (<code>bar_label</code>).<br>
            Add a dashed gray horizontal line at the <b>mean</b> of those product totals, labelled <code>average</code>, and a legend. Title: <code>Revenue by product</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            rev = (sales["units"] * sales["price"]).groupby(sales["product"]).sum().sort_values(ascending=False)
            fig, ax = plt.subplots()
            bars = ax.bar(rev.index, rev.values)
            ax.bar_label(bars)
            ax.axhline(rev.mean(), linestyle="--", color="gray", label="average")
            ax.set_title("Revenue by product")
            ax.legend()`,
          hints: ["rev per product, sorted descending", "bars = ax.bar(...); ax.bar_label(bars)", "ax.axhline(rev.mean(), linestyle=\"--\", color=\"gray\", label=\"average\")"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv")
            rev = (s.units * s.price).groupby(s["product"]).sum().sort_values(ascending=False)
            expect_close(bars_of(ax), list(rev.values), "bar heights (highest first)")
            expect_equal(ticklabels_of(ax), list(rev.index), "product names")
            labels = [t.get_text() for t in ax.texts]
            assert len(labels) >= len(rev), "Write the values on the bars with ax.bar_label(bars)."
            avg = [l for l in lines_of(ax) if l.get_label() == "average"]
            assert avg, "Add a horizontal line labelled 'average' (ax.axhline(..., label='average'))."
            expect_close(list(avg[0].get_ydata()), [rev.mean(), rev.mean()], "the average line's height")
            expect_equal(avg[0].get_linestyle(), "--", "the average line's style (dashed)")
            assert "average" in legend_of(ax), "Show a legend that includes the average line."
            expect_text(ax.get_title(), "title", exact="Revenue by product")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Labelled Map", topic: "ticks, annotations, colours with meaning & reference lines", time: 540, icon: "🏷️",
      intro: "A chart nobody can read is a painting nobody understands. Here you learn to label, point, and colour with purpose.",
      missions: [
        {
          id: "vz3-1", title: "Name Everything",
          story: "The council doesn't know what \"2024-01\" means. They want proper month names, readable at an angle.",
          lesson: `<ul><li><code>ax.set_xticks(positions)</code> chooses where ticks go; <code>ax.set_xticklabels(texts, rotation=45)</code> names them</li>
            <li>Long labels read better rotated, or use horizontal bars instead</li>
            <li>Put <b>units</b> in axis labels: <code>"Revenue (gold)"</code></li></ul>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.bar([0, 1, 2], [5, 9, 4])
            ax.set_xticks([0, 1, 2])
            ax.set_xticklabels(["Rope", "Lantern", "Grappling hook"], rotation=30)`,
          files: { "sales.csv": SALES },
          task: `From <code>sales.csv</code>, draw total revenue per month as bars at x = 0, 1, 2 (January to March).<br>
            Label the ticks <code>January</code>, <code>February</code>, <code>March</code>, rotated 45°. y label: <code>Revenue (gold)</code>; title: <code>Revenue per month</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            monthly = (sales["units"] * sales["price"]).groupby(sales["date"].str[:7]).sum()
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            monthly = (sales["units"] * sales["price"]).groupby(sales["date"].str[:7]).sum()
            fig, ax = plt.subplots()
            ax.bar([0, 1, 2], monthly.values)
            ax.set_xticks([0, 1, 2])
            ax.set_xticklabels(["January", "February", "March"], rotation=45)
            ax.set_ylabel("Revenue (gold)")
            ax.set_title("Revenue per month")`,
          hints: ["ax.bar([0, 1, 2], monthly.values)", "ax.set_xticks([0, 1, 2]); ax.set_xticklabels([...], rotation=45)"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv")
            m = (s.units * s.price).groupby(s.date.str[:7]).sum()
            expect_close(bars_of(ax), list(m.values), "monthly revenue bars")
            expect_equal(ticklabels_of(ax), ["January", "February", "March"], "tick labels")
            expect_close(ax.get_xticklabels()[0].get_rotation(), 45, "tick label rotation")
            expect_text(ax.get_ylabel(), "y label", exact="Revenue (gold)"); expect_text(ax.get_title(), "title", exact="Revenue per month")` }],
        },
        {
          id: "vz3-2", title: "Point the Way",
          story: "In twelve weeks of trading, one week stood out. Point at it, so nobody can miss it.",
          lesson: `<ul><li><code>ax.annotate("text", xy=(x, y), xytext=(x2, y2), arrowprops={"arrowstyle": "->"})</code>: a label with an arrow pointing at the point <code>(x, y)</code></li>
            <li><code>ax.axhline(y)</code> / <code>ax.axvline(x)</code>: reference lines (an average, a target, a date)</li>
            <li>Annotations tell the reader what to look at. Use one or two, not ten</li></ul>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.plot([1, 2, 3, 4], [3, 8, 5, 6])
            ax.annotate("Festival", xy=(2, 8), xytext=(2.5, 7.5), arrowprops={"arrowstyle": "->"})
            ax.axhline(5.5, color="gray", linestyle=":")`,
          task: `Plot <code>units</code> against <code>weeks</code> as a line with markers. Annotate the week with the most units with the text <code>Best week</code> (the arrow pointing at that point: <code>xy=(week, units)</code>).<br>
            Also draw a dashed horizontal line at the average number of units.`,
          starter: d`
            import matplotlib.pyplot as plt

            weeks = list(range(1, 13))
            units = [34, 41, 38, 45, 52, 49, 77, 58, 55, 61, 57, 63]
            `,
          solution: d`
            import matplotlib.pyplot as plt

            weeks = list(range(1, 13))
            units = [34, 41, 38, 45, 52, 49, 77, 58, 55, 61, 57, 63]
            best = units.index(max(units))
            fig, ax = plt.subplots()
            ax.plot(weeks, units, marker="o")
            ax.annotate("Best week", xy=(weeks[best], units[best]), xytext=(weeks[best] + 1, units[best] + 3),
                        arrowprops={"arrowstyle": "->"})
            ax.axhline(sum(units) / len(units), linestyle="--")`,
          hints: ["best = units.index(max(units)) gives the position of the best week", "ax.annotate(\"Best week\", xy=(weeks[best], units[best]), xytext=(…), arrowprops={\"arrowstyle\": \"->\"})", "ax.axhline(sum(units) / len(units), linestyle=\"--\")"],
          tests: [{ code: d`
            from matplotlib.text import Annotation
            fig = expect_fig(1); ax = fig.axes[0]
            ann = [t for t in ax.texts if isinstance(t, Annotation) and t.get_text() == "Best week"]
            assert ann, "Add an annotation with the text 'Best week' (ax.annotate)."
            expect_close(tuple(ann[0].xy), (7, 77), "the point the annotation points at")
            data = [l for l in lines_of(ax) if len(l.get_xdata()) == 12]
            assert data, "Plot the 12 weeks as a line."
            assert data[0].get_marker() not in (None, "None", ""), "Show markers on the line (marker=\"o\")."
            avg = sum([34, 41, 38, 45, 52, 49, 77, 58, 55, 61, 57, 63]) / 12
            ref = [l for l in lines_of(ax) if len(l.get_ydata()) == 2 and abs(l.get_ydata()[0] - avg) < 1e-6]
            assert ref, "Draw a horizontal line at the average (ax.axhline)."
            expect_equal(ref[0].get_linestyle(), "--", "the average line's style (dashed)")` }],
        },
        {
          id: "vz3-3", title: "Colour with Meaning",
          story: "The regions had a target. Colour the winners green and the others red, so the council sees it in one second.",
          lesson: `<p>Colour should <b>mean</b> something: a category, a threshold, a highlight. Pass a list of colours, one per bar: <code>ax.bar(names, values, color=colors)</code>.</p>
            <p>Build the list from a condition: <code>["tab:green" if v &gt;= target else "tab:red" for v in values]</code>. A reference line at the target explains the colours.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            values = [12, 30, 22]
            colors = ["tab:blue" if v > 20 else "lightgray" for v in values]
            fig, ax = plt.subplots()
            ax.bar(["A", "B", "C"], values, color=colors)`,
          files: { "sales.csv": SALES },
          task: `Draw each region's total revenue (units × price) as bars, regions in alphabetical order. Colour a bar <code>"tab:green"</code> if the region reached the <code>target</code> (6500), otherwise <code>"tab:red"</code>.<br>
            Draw a black horizontal line at the target.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            target = 6500
            rev = (sales["units"] * sales["price"]).groupby(sales["region"]).sum()
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            target = 6500
            rev = (sales["units"] * sales["price"]).groupby(sales["region"]).sum()
            colors = ["tab:green" if v >= target else "tab:red" for v in rev.values]
            fig, ax = plt.subplots()
            ax.bar(rev.index, rev.values, color=colors)
            ax.axhline(target, color="black")`,
          hints: ["groupby already sorts the regions alphabetically", "colors = [\"tab:green\" if v >= target else \"tab:red\" for v in rev.values]", "ax.bar(..., color=colors); ax.axhline(target, color=\"black\")"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv")
            rev = (s.units * s.price).groupby(s.region).sum()
            expect_close(bars_of(ax), list(rev.values), "bar heights (regions A–Z)")
            want = [hexcolor("tab:green") if v >= 6500 else hexcolor("tab:red") for v in rev.values]
            expect_equal([hexcolor(p.get_facecolor()) for p in ax.patches], want, "bar colours (green = reached the target)")
            ref = [l for l in lines_of(ax) if abs(l.get_ydata()[0] - 6500) < 1e-6]
            assert ref, "Draw a horizontal line at the target (6500)."
            expect_equal(hexcolor(ref[0].get_color()), "#000000", "the target line's colour")` }],
        },
        {
          id: "vz3-4", type: "quiz", title: "Riddles of the Map",
          story: "Lady Florence's mapmakers ask about labels, ranges and colours.",
          lesson: `<p><code>ax.set(title=…, xlabel=…, ylabel=…)</code> sets several things at once. Limits come back as floats. Colour choices should work for colour-blind readers (about 1 in 12 men can't tell red from green).</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.set(title="Sales", xlabel="Month", ylim=(0, 50))
                print(ax.get_title(), ax.get_xlabel(), ax.get_ylim())`,
              choices: ["Sales Month (0.0, 50.0)", "Sales Month (0, 50)", "Sales  (0.0, 50.0)", "(0.0, 50.0) Sales Month"], answer: 0,
              explain: "<code>ax.set</code> accepts many settings at once; limits are returned as floats." },
            { q: "Values range from 3 to 3,000,000 (a plague doubling every two days). What helps readers see the early days?",
              choices: ["a logarithmic y-axis (ax.set_yscale(\"log\"))", "a pie chart", "more grid lines", "a 3D chart"], answer: 0,
              explain: "On a log scale, steady growth becomes a straight line, and small and huge values both stay visible." },
            { q: "You colour \"good\" bars green and \"bad\" bars red. What's the risk?",
              choices: ["colour-blind readers may not tell them apart: also use labels, or blue/orange", "green and red can't be used in matplotlib", "the chart becomes slower", "none"], answer: 0,
              explain: "Red–green colour blindness is common. Pair colour with text, shapes or a colour-blind-friendly palette." },
            { q: "When is a legend useless?",
              choices: ["when there's only one series and the title already says what it is", "on line charts", "when the chart has a title", "never"], answer: 0,
              explain: "Legends identify several series. With a single one, it only adds clutter." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.plot([0, 1, 2], [5, 9, 7])
                ax.annotate("top", xy=(1, 9))
                print(len(ax.texts), ax.texts[0].get_text(), ax.texts[0].xy)`,
              choices: ["1 top (1, 9)", "0 top (1, 9)", "1 top (9, 1)", "3 top (1, 9)"], answer: 0,
              explain: "An annotation is a text object stored in <code>ax.texts</code>, pointing at <code>xy</code>." },
          ],
        },
        {
          id: "vz3-5", boss: true, time: 810, title: "The Royal Report Chart",
          story: "The quarterly report needs one chart: every product's monthly units, honest axes, a clear legend, and the peak pointed out.",
          lesson: `<p>A finished chart has: a title that states the subject, labelled axes with units, a legend when there are several series, a y-axis starting at 0 for amounts, and one annotation for the key insight.</p>
            <p><code>df.pivot_table(index="month", columns="product", values="units", aggfunc="sum", fill_value=0)</code> gives one column per product, ready to plot.</p>`,
          example: d`
            import pandas as pd

            s = pd.read_csv("sales.csv")
            s["month"] = s["date"].str[:7]
            print(s.pivot_table(index="month", columns="product", values="units", aggfunc="sum", fill_value=0))`,
          files: { "sales.csv": SALES },
          task: `From <code>sales.csv</code>, plot the total units of each product per month (<code>"YYYY-MM"</code>): one line with markers per product, labelled with the product's name, products in alphabetical order.<br>
            Add a legend with the title <code>Product</code>, make the y-axis start at 0, and annotate the single highest point with the text <code>Peak</code> (<code>xy</code> = that point's month and units).<br>
            Title: <code>Units sold per month</code>; y label: <code>Units</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            sales["month"] = sales["date"].str[:7]
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            sales["month"] = sales["date"].str[:7]
            t = sales.pivot_table(index="month", columns="product", values="units", aggfunc="sum", fill_value=0)
            fig, ax = plt.subplots()
            for product in t.columns:
                ax.plot(t.index, t[product], marker="o", label=product)
            best_product = t.max().idxmax()
            best_month = t[best_product].idxmax()
            ax.annotate("Peak", xy=(best_month, t.loc[best_month, best_product]))
            ax.set_ylim(bottom=0)
            ax.set_title("Units sold per month")
            ax.set_ylabel("Units")
            ax.legend(title="Product")`,
          hints: ["Pivot: index month, columns product, values units, aggfunc sum", "One ax.plot per column, with label=product and marker=\"o\"", "The peak: best product = t.max().idxmax(), its month = t[best].idxmax()", "ax.set_ylim(bottom=0); ax.legend(title=\"Product\")"],
          tests: [{ code: d`
            import pandas as pd
            from matplotlib.text import Annotation
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv"); s["month"] = s.date.str[:7]
            t = s.pivot_table(index="month", columns="product", values="units", aggfunc="sum", fill_value=0)
            lines = {l.get_label(): l for l in lines_of(ax)}
            for p in t.columns:
                assert p in lines, "Missing a line labelled " + repr(p) + "."
                expect_close([float(v) for v in lines[p].get_ydata()], [float(v) for v in t[p].values], p + "'s monthly units")
                assert lines[p].get_marker() not in (None, "None", ""), "Use markers on the lines."
            leg = ax.get_legend()
            assert leg is not None and leg.get_title().get_text() == "Product", "Add a legend with the title 'Product' (ax.legend(title=...))."
            expect_close(ax.get_ylim()[0], 0, "the bottom of the y-axis")
            ann = [a for a in ax.texts if isinstance(a, Annotation) and a.get_text() == "Peak"]
            assert ann, "Annotate the highest point with 'Peak'."
            expect_close(float(ann[0].xy[1]), float(t.values.max()), "the Peak annotation's height")
            expect_text(ax.get_title(), "title", exact="Units sold per month"); expect_text(ax.get_ylabel(), "y label", exact="Units")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "Many Windows", topic: "subplots, grids, shared axes, twin axes & dashboards", time: 600, icon: "🪟",
      intro: "One chart answers one question. A figure with many windows tells a whole story at once.",
      missions: [
        {
          id: "vz4-1", title: "Side by Side",
          story: "The same temperatures, seen two ways: their full shape, and their summary.",
          lesson: `<p><code>fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))</code> makes a figure with 1 row and 2 columns of charts. <code>figsize</code> is in inches (width, height).</p>
            <p>A <b>box plot</b> (<code>ax.boxplot(values)</code>) summarises a distribution: the box spans Q1–Q3, the line inside is the median, whiskers reach the furthest non-outliers, and dots mark outliers.</p>
            <p><code>fig.tight_layout()</code> stops the charts' labels from overlapping.</p>`,
          example: d`
            import numpy as np
            import matplotlib.pyplot as plt

            data = np.random.default_rng(0).normal(50, 10, 200)
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 3))
            ax1.hist(data, bins=15)
            ax2.boxplot(data)
            fig.tight_layout()`,
          files: { "weather.csv": WEATHER },
          task: `Make a figure with two charts side by side, size 10 × 4 inches: on the left a histogram of Oakvale's temperatures (15 bins), titled <code>Histogram</code>; on the right a box plot of the same values, titled <code>Box plot</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv")
            temps = w[w["city"] == "Oakvale"]["temp"]
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv")
            temps = w[w["city"] == "Oakvale"]["temp"]
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
            ax1.hist(temps, bins=15)
            ax1.set_title("Histogram")
            ax2.boxplot(temps)
            ax2.set_title("Box plot")
            fig.tight_layout()`,
          hints: ["fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))", "ax1.hist(temps, bins=15); ax2.boxplot(temps)", "Set each chart's own title"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(2)
            ax1, ax2 = fig.axes
            expect_close(tuple(fig.get_size_inches()), (10, 4), "figure size")
            w = pd.read_csv("weather.csv"); t = w[w.city == "Oakvale"].temp
            expect_close(bars_of(ax1), list(np.histogram(t, bins=15)[0]), "left: the histogram")
            expect_text(ax1.get_title(), "left title", exact="Histogram"); expect_text(ax2.get_title(), "right title", exact="Box plot")
            meds = [l for l in ax2.get_lines() if len(l.get_ydata()) == 2 and abs(l.get_ydata()[0] - t.median()) < 1e-9 and abs(l.get_ydata()[1] - t.median()) < 1e-9]
            assert meds, "The right chart should be a box plot of the same temperatures (ax2.boxplot(temps))."` }],
        },
        {
          id: "vz4-2", title: "The Grid of Panels",
          story: "Four regions, four small charts with the same scale: the eye compares them instantly. These are called small multiples.",
          lesson: `<p><code>fig, axs = plt.subplots(2, 2, sharey=True)</code>: <code>axs</code> is a 2 × 2 array of charts. <code>axs[0, 1]</code> is the top-right one; <code>axs.flat</code> goes through them in reading order.</p>
            <p><code>sharey=True</code> gives every panel the same y-axis. Without it, each panel scales itself and comparisons lie.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, axs = plt.subplots(2, 2, sharey=True)
            for i, ax in enumerate(axs.flat):
                ax.bar(["x", "y"], [i + 1, 4 - i])
                ax.set_title("panel " + str(i))`,
          files: { "sales.csv": SALES },
          task: `Make a 2 × 2 grid with a shared y-axis: one panel per region (alphabetical: East, North, South, West, in reading order). Each panel shows bars of total <b>units</b> per product, for <b>all four products</b> in alphabetical order (0 where none were sold). Title each panel with its region's name.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            grid = sales.pivot_table(index="region", columns="product", values="units", aggfunc="sum", fill_value=0)
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            grid = sales.pivot_table(index="region", columns="product", values="units", aggfunc="sum", fill_value=0)
            fig, axs = plt.subplots(2, 2, sharey=True, figsize=(9, 6))
            for ax, region in zip(axs.flat, grid.index):
                ax.bar(grid.columns, grid.loc[region])
                ax.set_title(region)
            fig.tight_layout()`,
          hints: ["grid has one row per region and one column per product, already sorted", "for ax, region in zip(axs.flat, grid.index): …", "ax.bar(grid.columns, grid.loc[region]); ax.set_title(region)"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(4)
            s = pd.read_csv("sales.csv")
            g = s.pivot_table(index="region", columns="product", values="units", aggfunc="sum", fill_value=0)
            for ax, region in zip(fig.axes, g.index):
                expect_text(ax.get_title(), "panel title", exact=region)
                expect_close(bars_of(ax), [float(v) for v in g.loc[region]], region + " panel: units per product")
            lims = {tuple(round(v, 6) for v in ax.get_ylim()) for ax in fig.axes}
            assert len(lims) == 1, "Share the y-axis between the panels (plt.subplots(2, 2, sharey=True))."` }],
        },
        {
          id: "vz4-3", title: "Two Scales",
          story: "Warmth and rain have different units. The almanac wants both over the weeks, each with its own scale.",
          lesson: `<p><code>ax2 = ax.twinx()</code> creates a second y-axis on the right that shares the same x-axis. Draw one variable on each.</p>
            <p>Use this sparingly: two scales can be manipulated to suggest any relation. Label both axes clearly, ideally in each series' colour.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.plot([1, 2, 3], [10, 14, 12], color="tab:red")
            ax.set_ylabel("°C", color="tab:red")
            ax2 = ax.twinx()
            ax2.bar([1, 2, 3], [5, 0, 9], alpha=0.3)
            ax2.set_ylabel("Rain (mm)")`,
          files: { "weather.csv": WEATHER },
          task: `For Oakvale, compute per week (<code>resample("W")</code>) the <b>mean</b> temperature and the <b>total</b> rain. Plot the temperature as a line on the left axis (y label <code>°C</code>), and the rain as bars on a twin right axis (y label <code>Rain (mm)</code>). Use <code>range(len(weekly))</code> as the x positions for both.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            oak = w[w["city"] == "Oakvale"].set_index("date")
            weekly_temp = oak["temp"].resample("W").mean()
            weekly_rain = oak["rain"].resample("W").sum()
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            oak = w[w["city"] == "Oakvale"].set_index("date")
            weekly_temp = oak["temp"].resample("W").mean()
            weekly_rain = oak["rain"].resample("W").sum()
            x = range(len(weekly_temp))
            fig, ax = plt.subplots()
            ax.plot(x, weekly_temp.values, color="tab:red")
            ax.set_ylabel("°C")
            ax2 = ax.twinx()
            ax2.bar(x, weekly_rain.values, alpha=0.4)
            ax2.set_ylabel("Rain (mm)")`,
          hints: ["x = range(len(weekly_temp))", "ax.plot(x, weekly_temp.values); ax.set_ylabel(\"°C\")", "ax2 = ax.twinx(); ax2.bar(x, weekly_rain.values); ax2.set_ylabel(\"Rain (mm)\")"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(2)
            w = pd.read_csv("weather.csv", parse_dates=["date"]); o = w[w.city == "Oakvale"].set_index("date")
            wt, wr = o.temp.resample("W").mean(), o.rain.resample("W").sum()
            line_ax = [a for a in fig.axes if a.get_lines()]
            bar_ax = [a for a in fig.axes if a.patches]
            assert line_ax and bar_ax, "One axis should have the temperature line and the other the rain bars."
            expect_close([float(v) for v in line_ax[0].get_lines()[0].get_ydata()], list(wt.values), "weekly mean temperature line")
            expect_close(bars_of(bar_ax[0]), list(wr.values), "weekly rain bars")
            expect_text(line_ax[0].get_ylabel(), "temperature axis label", exact="°C")
            expect_text(bar_ax[0].get_ylabel(), "rain axis label", exact="Rain (mm)")` }],
        },
        {
          id: "vz4-4", type: "quiz", title: "Riddles of the Windows",
          story: "The window-makers' riddles: which pane is which?",
          lesson: `<p><code>plt.subplots(rows, cols)</code> returns an array of Axes shaped (rows, cols) (a plain list when one of them is 1). <code>fig.suptitle</code> titles the whole figure; <code>ax.set_title</code> titles one chart.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, axs = plt.subplots(2, 3)
                print(axs.shape, len(fig.axes))`,
              choices: ["(2, 3) 6", "(3, 2) 6", "(6,) 6", "(2, 3) 1"], answer: 0,
              explain: "2 rows × 3 columns = 6 Axes." },
            { q: "In a 2 × 2 grid, which chart is <code>axs[1, 0]</code>?",
              choices: ["bottom-left", "top-right", "bottom-right", "top-left"], answer: 0,
              explain: "[row, column]: row 1 is the second (bottom) row, column 0 the first (left)." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, axs = plt.subplots(1, 2, sharey=True)
                axs[0].plot([0, 1], [0, 100])
                axs[1].plot([0, 1], [0, 5])
                print(axs[0].get_ylim() == axs[1].get_ylim())`,
              choices: ["True", "False"], answer: 0,
              explain: "With <code>sharey=True</code> both panels use one y range, so small values look small. That's honest." },
            { q: "You want one title above a whole dashboard of four charts. Which call?",
              choices: ["fig.suptitle(\"…\")", "ax.set_title(\"…\") on each chart", "plt.title(\"…\")", "fig.set_title(\"…\")"], answer: 0,
              explain: "<code>suptitle</code> is the figure-level (super) title." },
            { q: "What does <code>figsize=(10, 4)</code> mean?",
              choices: ["10 inches wide, 4 inches tall", "10 charts in 4 rows", "10 cm by 4 cm", "4 inches wide, 10 tall"], answer: 0,
              explain: "Width then height, in inches." },
          ],
        },
        {
          id: "vz4-5", boss: true, time: 900, title: "The Weather Dashboard",
          story: "Lady Florence wants the whole season of weather for both cities on one page: the Empire's first dashboard.",
          lesson: `<p>A dashboard puts related views side by side. Plan each panel's question first:</p>
            <ol><li>How did temperature change? (lines)</li><li>Which month was wettest? (bars)</li><li>How are temperatures distributed? (histograms)</li><li>Does rain go with cold? (scatter)</li></ol>
            <p>For grouped bars, shift each city's bars sideways: <code>x - 0.2</code> and <code>x + 0.2</code> with <code>width=0.4</code>. Overlapping histograms need <code>alpha</code> to stay readable.</p>`,
          example: d`
            import numpy as np
            import matplotlib.pyplot as plt

            x = np.arange(3)
            fig, ax = plt.subplots()
            ax.bar(x - 0.2, [5, 7, 3], width=0.4, label="A")
            ax.bar(x + 0.2, [6, 4, 8], width=0.4, label="B")
            ax.legend()`,
          files: { "weather.csv": WEATHER },
          task: `Build a 2 × 2 dashboard (size 12 × 8) titled <code>Weather of the Empire</code> (<code>fig.suptitle</code>). Cities in alphabetical order (Oakvale, then Stonebridge) everywhere:<br>
            • top-left: each city's daily <code>temp</code> as a line labelled with the city's name, plus a legend<br>
            • top-right: grouped bars of each city's total rain per month (x = 0, 1, 2; Oakvale at x − 0.2, Stonebridge at x + 0.2, width 0.4)<br>
            • bottom-left: a histogram of each city's temperatures (20 bins, <code>alpha=0.5</code>)<br>
            • bottom-right: a scatter of <code>temp</code> (x) against <code>rain</code> (y) for all rows`,
          starter: d`
            import numpy as np
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            import matplotlib.pyplot as plt

            w = pd.read_csv("weather.csv", parse_dates=["date"])
            cities = sorted(w["city"].unique())
            fig, axs = plt.subplots(2, 2, figsize=(12, 8))
            fig.suptitle("Weather of the Empire")
            x = np.arange(3)
            for i, city in enumerate(cities):
                c = w[w["city"] == city]
                axs[0, 0].plot(c["date"], c["temp"], label=city)
                monthly = c.groupby(c["date"].dt.month)["rain"].sum()
                axs[0, 1].bar(x - 0.2 + 0.4 * i, monthly.values, width=0.4, label=city)
                axs[1, 0].hist(c["temp"], bins=20, alpha=0.5, label=city)
            axs[0, 0].legend()
            axs[1, 1].scatter(w["temp"], w["rain"], s=12)
            fig.tight_layout()`,
          hints: ["fig, axs = plt.subplots(2, 2, figsize=(12, 8)); fig.suptitle(...)", "Loop over sorted cities; each draws on three panels", "Monthly rain: c.groupby(c[\"date\"].dt.month)[\"rain\"].sum(); bars at x - 0.2 + 0.4 * i", "axs[1, 1].scatter(w[\"temp\"], w[\"rain\"])"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(4)
            assert fig._suptitle is not None and fig._suptitle.get_text() == "Weather of the Empire", "Give the figure the title 'Weather of the Empire' with fig.suptitle."
            expect_close(tuple(fig.get_size_inches()), (12, 8), "figure size")
            tl, tr, bl, br = fig.axes
            w = pd.read_csv("weather.csv", parse_dates=["date"])
            lines = {l.get_label(): l for l in tl.get_lines()}
            for city in ("Oakvale", "Stonebridge"):
                c = w[w.city == city]
                assert city in lines, "Top-left: a line labelled " + repr(city) + "."
                expect_close([float(v) for v in lines[city].get_ydata()], list(c.temp.values), "top-left: " + city + " temperatures")
            assert tl.get_legend() is not None, "Top-left: show a legend."
            mon = [list(w[w.city == c].groupby(w[w.city == c].date.dt.month).rain.sum().values) for c in ("Oakvale", "Stonebridge")]
            expect_close(bars_of(tr), mon[0] + mon[1], "top-right: monthly rain bars (Oakvale's three, then Stonebridge's three)")
            expect_close([round(p.get_x() + p.get_width() / 2, 6) for p in tr.patches], [-0.2, 0.8, 1.8, 0.2, 1.2, 2.2], "top-right: bar positions")
            hist = bars_of(bl)
            expect_equal(len(hist), 40, "bottom-left: number of histogram bars (2 cities x 20 bins)")
            expect_close(bl.patches[0].get_alpha(), 0.5, "bottom-left: alpha")
            expect_array(points_of(br), w[["temp", "rain"]].values, "bottom-right: scatter points")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Seaborn Sea", topic: "seaborn: charts straight from DataFrames, hue, heatmaps", time: 600, icon: "🌊",
      intro: "Beyond the isles lies the Seaborn Sea, where one line of code turns a whole table into a polished chart. (Seaborn downloads the first time you sail here.)",
      missions: [
        {
          id: "vz5-1", title: "Charts from Tables", packages: ["micropip:seaborn"],
          story: "The sea-captains speak in tables. Seaborn reads a DataFrame and draws it, with no loops and no grouping by hand.",
          lesson: `<p><b>seaborn</b> (imported as <code>sns</code>) is built on matplotlib and works directly with DataFrames:</p>
            <p><code>sns.barplot(data=df, x="region", y="units", estimator="sum", errorbar=None, ax=ax)</code></p>
            <ul><li><code>x</code>, <code>y</code> are <b>column names</b>; seaborn groups and aggregates for you (<code>estimator</code>: mean by default)</li>
            <li>By default it draws error bars (a 95% confidence interval); <code>errorbar=None</code> turns them off</li>
            <li><code>order=[...]</code> fixes the order of the categories. Pass <code>ax=ax</code> to draw on your own Axes</li></ul>`,
          example: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            df = pd.DataFrame({"team": ["a", "a", "b", "b"], "score": [3, 5, 4, 8]})
            fig, ax = plt.subplots()
            sns.barplot(data=df, x="team", y="score", errorbar=None, ax=ax)`,
          files: { "sales.csv": SALES },
          task: `With seaborn, draw a bar chart of the <b>total</b> units per region from <code>sales.csv</code> (no error bars), regions in alphabetical order. Title: <code>Units by region</code>.`,
          starter: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            fig, ax = plt.subplots()
            `,
          solution: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            fig, ax = plt.subplots()
            sns.barplot(data=sales, x="region", y="units", estimator="sum", errorbar=None, order=sorted(sales["region"].unique()), ax=ax)
            ax.set_title("Units by region")`,
          hints: ["sns.barplot(data=sales, x=\"region\", y=\"units\", ...)", "estimator=\"sum\", errorbar=None", "order=sorted(sales[\"region\"].unique()), ax=ax"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            s = pd.read_csv("sales.csv"); tot = s.groupby("region").units.sum()
            expect_close(bars_of(ax), list(tot.values), "bar heights (total units, regions A–Z)")
            expect_equal(ticklabels_of(ax), list(tot.index), "region order")
            assert len([l for l in ax.get_lines()]) == 0, "Turn the error bars off (errorbar=None)."
            expect_text(ax.get_title(), "title", exact="Units by region")` }],
        },
        {
          id: "vz5-2", title: "Colour by Group", packages: ["micropip:seaborn"],
          story: "Do Mages and Knights gather gold differently? Colour each hero's dot by class.",
          lesson: `<p><code>hue="class"</code> colours the marks by a column and adds a legend automatically:</p>
            <p><code>sns.scatterplot(data=heroes, x="level", y="gold", hue="class", ax=ax)</code></p>
            <p><code>hue</code> works in most seaborn charts (bars, lines, histograms), adding a third variable to a 2-D picture.</p>`,
          example: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            df = pd.DataFrame({"x": [1, 2, 3, 4], "y": [2, 3, 2, 5], "kind": ["a", "b", "a", "b"]})
            fig, ax = plt.subplots()
            sns.scatterplot(data=df, x="x", y="y", hue="kind", s=80, ax=ax)`,
          files: { "heroes.csv": HEROES },
          task: `From <code>heroes.csv</code> (drop rows with missing gold), draw a seaborn scatter plot of <code>level</code> vs <code>gold</code>, coloured by <code>class</code> with the classes in alphabetical order (<code>hue_order</code>). Title: <code>Gold by level</code>.`,
          starter: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            fig, ax = plt.subplots()
            `,
          solution: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv").dropna(subset=["gold"])
            fig, ax = plt.subplots()
            sns.scatterplot(data=heroes, x="level", y="gold", hue="class", hue_order=sorted(heroes["class"].unique()), ax=ax)
            ax.set_title("Gold by level")`,
          hints: ["heroes.dropna(subset=[\"gold\"])", "sns.scatterplot(data=heroes, x=\"level\", y=\"gold\", hue=\"class\", hue_order=sorted(...), ax=ax)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            h = pd.read_csv("heroes.csv").dropna(subset=["gold"])
            pts = points_of(ax)
            expect_array(pts, h[["level", "gold"]].values, "the dots (level, gold)")
            labels = legend_of(ax)
            expect_equal([l for l in labels if l in set(h["class"])], sorted(h["class"].unique()), "legend: the classes in alphabetical order")
            expect_text(ax.get_title(), "title", exact="Gold by level")` }],
        },
        {
          id: "vz5-3", title: "The Heat of Relations", packages: ["micropip:seaborn"],
          story: "How does every numeric column relate to every other? A heatmap shows a whole correlation table as colour.",
          lesson: `<p><code>df.corr(numeric_only=True)</code> computes every pair's correlation. <code>sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1)</code> colours it:</p>
            <ul><li><code>annot=True</code> writes the numbers in the cells; <code>fmt=".2f"</code> uses 2 decimals</li>
            <li>A <b>diverging</b> colour map (<code>coolwarm</code>) centred on 0, with <code>vmin=-1, vmax=1</code>, shows negative and positive relations in opposite colours</li></ul>`,
          example: d`
            import numpy as np
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            rng = np.random.default_rng(0)
            df = pd.DataFrame({"a": rng.normal(size=50)})
            df["b"] = df["a"] * 2 + rng.normal(size=50); df["c"] = -df["a"] + rng.normal(size=50)
            fig, ax = plt.subplots()
            sns.heatmap(df.corr(), annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, ax=ax)`,
          files: { "sales.csv": SALES },
          task: `Add a <code>revenue</code> column (units × price) to the sales table, then draw a heatmap of the correlations between <code>units</code>, <code>price</code> and <code>revenue</code> (in that order), with the numbers shown (2 decimals), the <code>coolwarm</code> colour map and the scale from −1 to 1.`,
          starter: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            fig, ax = plt.subplots()
            `,
          solution: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            sales["revenue"] = sales["units"] * sales["price"]
            corr = sales[["units", "price", "revenue"]].corr()
            fig, ax = plt.subplots()
            sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, ax=ax)`,
          hints: ["sales[\"revenue\"] = sales[\"units\"] * sales[\"price\"]", "corr = sales[[\"units\", \"price\", \"revenue\"]].corr()", "sns.heatmap(corr, annot=True, fmt=\".2f\", cmap=\"coolwarm\", vmin=-1, vmax=1, ax=ax)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig()
            ax = [a for a in fig.axes if a.collections][0]
            s = pd.read_csv("sales.csv"); s["revenue"] = s.units * s.price
            corr = s[["units", "price", "revenue"]].corr()
            mesh = ax.collections[0]
            expect_array(np.asarray(mesh.get_array()).reshape(3, 3), corr.values, "the heatmap's values")
            expect_close((mesh.norm.vmin, mesh.norm.vmax), (-1, 1), "colour scale range")
            expect_equal(mesh.get_cmap().name, "coolwarm", "colour map")
            texts = [t.get_text() for t in ax.texts]
            expect_equal(sorted(texts), sorted(f"{v:.2f}" for v in corr.values.flatten()), "the numbers written in the cells")` }],
        },
        {
          id: "vz5-4", type: "quiz", title: "Riddles of the Sea",
          story: "The sea-captains' riddles about seaborn's habits.",
          lesson: `<p>Seaborn expects <b>long</b> (tidy) data: one row per observation, one column per variable. It aggregates for you (mean by default) and adds confidence-interval error bars unless told not to.</p>`,
          questions: [
            { q: "In <code>sns.barplot(data=df, x=\"region\", y=\"units\")</code>, what is each bar's height by default?",
              choices: ["the mean of units in that region", "the total of units in that region", "the number of rows in that region", "the first value of each region"], answer: 0,
              explain: "The default estimator is the mean. Use <code>estimator=\"sum\"</code> for totals." },
            { q: "What do the small vertical lines on top of seaborn's bars show by default?",
              choices: ["a 95% confidence interval for each mean", "the minimum and maximum", "the standard deviation", "the median"], answer: 0,
              explain: "Seaborn bootstraps a confidence interval. Turn it off with <code>errorbar=None</code>." },
            { q: "What does <code>hue=\"class\"</code> do?",
              choices: ["colours the marks by the class column and adds a legend", "sorts the bars by class", "filters to one class", "changes the chart's background colour"], answer: 0,
              explain: "<code>hue</code> maps a column to colour." },
            { q: "Your table has columns <code>name, math, art, history</code> (one column per subject). To plot the scores by subject with seaborn, what should you do first?",
              choices: ["melt it to long form: name, subject, score", "pivot it wider", "drop the name column", "nothing, seaborn prefers wide data"], answer: 0,
              explain: "Seaborn works best with tidy data, where \"subject\" is a column you can use for x or hue." },
            { q: "Why is <code>cmap=\"coolwarm\"</code> with <code>vmin=-1, vmax=1</code> a good choice for a correlation heatmap?",
              choices: ["it's centred on 0, so negative and positive relations get opposite colours", "it's the fastest colour map", "it makes every cell red", "it hides weak correlations"], answer: 0,
              explain: "A diverging colour map with a symmetric range keeps 0 neutral." },
          ],
        },
        {
          id: "vz5-5", boss: true, time: 900, title: "The Hero Atlas", packages: ["micropip:seaborn"],
          story: "The atlas of heroes needs two pages side by side: how levels differ between classes, and how many heroes each guild has.",
          lesson: `<ul><li><code>sns.boxplot(data=df, x="class", y="level", order=[...], ax=ax1)</code>: one box per class, to compare distributions</li>
            <li><code>sns.countplot(data=df, x="guild", order=[...], ax=ax2)</code>: bars counting rows per category (missing values aren't counted)</li></ul>`,
          example: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            df = pd.DataFrame({"g": ["a", "b", "a", "a"], "v": [3, 7, 5, 4]})
            fig, (a1, a2) = plt.subplots(1, 2)
            sns.boxplot(data=df, x="g", y="v", ax=a1)
            sns.countplot(data=df, x="g", ax=a2)`,
          files: { "heroes.csv": HEROES },
          task: `From <code>heroes.csv</code>, make a figure with two charts side by side (size 11 × 4):<br>
            • left: a seaborn box plot of <code>level</code> by <code>class</code>, classes in alphabetical order, titled <code>Level by class</code><br>
            • right: a seaborn count plot of <code>guild</code>, guilds in alphabetical order, titled <code>Heroes per guild</code>`,
          starter: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            `,
          solution: d`
            import pandas as pd
            import seaborn as sns
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
            sns.boxplot(data=heroes, x="class", y="level", order=sorted(heroes["class"].unique()), ax=ax1)
            ax1.set_title("Level by class")
            sns.countplot(data=heroes, x="guild", order=sorted(heroes["guild"].dropna().unique()), ax=ax2)
            ax2.set_title("Heroes per guild")
            fig.tight_layout()`,
          hints: ["fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))", "sns.boxplot(data=heroes, x=\"class\", y=\"level\", order=sorted(...), ax=ax1)", "sns.countplot(data=heroes, x=\"guild\", order=sorted(heroes[\"guild\"].dropna().unique()), ax=ax2)"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(2); ax1, ax2 = fig.axes
            expect_close(tuple(fig.get_size_inches()), (11, 4), "figure size")
            h = pd.read_csv("heroes.csv")
            expect_equal(ticklabels_of(ax1), sorted(h["class"].unique()), "left: class order")
            expect_text(ax1.get_title(), "left title", exact="Level by class")
            counts = h.guild.value_counts().sort_index()
            expect_close(bars_of(ax2), list(counts.values), "right: heroes per guild")
            expect_equal(ticklabels_of(ax2), list(counts.index), "right: guild order")
            expect_text(ax2.get_title(), "right title", exact="Heroes per guild")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "The Honest Painter", topic: "honest axes, clear ordering, log scales & the final dashboard", time: 600, icon: "🧭",
      intro: "In the lighthouse at the end of the isles, Lady Florence waits. Her last lesson: a chart must never lie.",
      missions: [
        {
          id: "vz6-1", title: "Start at Zero",
          story: "A rival painter showed the council a chart where the North region seemed to crush the others. It was a trick.",
          lesson: `<p>A bar's <b>length</b> encodes its value. If the y-axis starts at 95 instead of 0, a bar for 99 looks <i>five times</i> taller than one for 96, although the difference is 3%. This <b>truncated axis</b> is the most common way charts mislead.</p>
            <p>Rule: bar charts start at zero (<code>ax.set_ylim(bottom=0)</code>). Line charts may zoom in, because there the slope matters, not the length.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, (a, b) = plt.subplots(1, 2, figsize=(8, 3))
            for ax in (a, b):
                ax.bar(["A", "B"], [96, 99])
            a.set_ylim(95, 100); a.set_title("Misleading")
            b.set_ylim(0, 100); b.set_title("Honest")`,
          task: `The starter chart exaggerates small differences. Fix it so the y-axis starts at <b>0</b> (keep it ending at 100), and change the title to <code>Approval by region (%)</code>.`,
          starter: d`
            import matplotlib.pyplot as plt

            regions = ["East", "North", "South", "West"]
            approval = [96.0, 99.1, 97.4, 96.8]
            fig, ax = plt.subplots()
            ax.bar(regions, approval)
            ax.set_ylim(95, 100)
            ax.set_title("North crushes the competition!")`,
          solution: d`
            import matplotlib.pyplot as plt

            regions = ["East", "North", "South", "West"]
            approval = [96.0, 99.1, 97.4, 96.8]
            fig, ax = plt.subplots()
            ax.bar(regions, approval)
            ax.set_ylim(0, 100)
            ax.set_title("Approval by region (%)")`,
          hints: ["ax.set_ylim(0, 100)", "ax.set_title(\"Approval by region (%)\")"],
          tests: [{ code: d`
            fig = expect_fig(1); ax = fig.axes[0]
            expect_close(bars_of(ax), [96.0, 99.1, 97.4, 96.8], "bar heights")
            expect_close(ax.get_ylim(), (0, 100), "y-axis range (bars must start at 0)")
            expect_text(ax.get_title(), "title", exact="Approval by region (%)")` }],
        },
        {
          id: "vz6-2", title: "Order and Clarity",
          story: "Twenty heroes' gold in random order is a puzzle. The eight richest, sorted, with names readable: that's a chart.",
          lesson: `<ul><li>Sort bars by value: the ranking becomes obvious</li>
            <li>Many categories or long names? Use <b>horizontal</b> bars: <code>ax.barh(names, values)</code></li>
            <li><code>barh</code> draws the first item at the <b>bottom</b>. To put the largest on top, plot in ascending order</li>
            <li>Show the top N; a chart of 50 bars helps nobody</li></ul>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, ax = plt.subplots()
            ax.barh(["small", "medium", "large"], [2, 5, 9])   # the last one is drawn at the top`,
          files: { "heroes.csv": HEROES },
          task: `From <code>heroes.csv</code>, draw a horizontal bar chart of the <b>8</b> heroes with the most gold, with the richest at the <b>top</b>.<br>
            x label: <code>Gold</code>; title: <code>The eight richest heroes</code>.`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            fig, ax = plt.subplots()
            ax.bar(heroes["name"], heroes["gold"])`,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            heroes = pd.read_csv("heroes.csv")
            top = heroes.nlargest(8, "gold").sort_values("gold")
            fig, ax = plt.subplots()
            ax.barh(top["name"], top["gold"])
            ax.set_xlabel("Gold")
            ax.set_title("The eight richest heroes")`,
          hints: ["top = heroes.nlargest(8, \"gold\")", "sort ascending before barh so the largest is drawn last (at the top)", "ax.barh(top[\"name\"], top[\"gold\"])"],
          tests: [{ code: d`
            import pandas as pd
            fig = expect_fig(1); ax = fig.axes[0]
            h = pd.read_csv("heroes.csv"); top = h.nlargest(8, "gold").sort_values("gold")
            widths = bars_of(ax, horizontal=True)
            assert len(widths) == 8, "Show exactly 8 heroes (you have " + str(len(widths)) + " bars)."
            expect_close(widths, list(top.gold.values), "bar lengths (bottom to top)")
            expect_equal(ticklabels_of(ax, "y"), list(top.name), "hero names (bottom to top: the richest at the top)")
            expect_text(ax.get_xlabel(), "x label", exact="Gold"); expect_text(ax.get_title(), "title", exact="The eight richest heroes")` }],
        },
        {
          id: "vz6-3", title: "The Log Lens",
          story: "The grey plague spreads, doubling every two days. On a normal chart the first two weeks look like nothing at all.",
          lesson: `<p>Exponential growth on a linear axis hides everything except the last few points. On a <b>logarithmic</b> axis (<code>ax.set_yscale("log")</code>), equal <b>ratios</b> take equal space, so a steady doubling becomes a straight line and early values stay visible.</p>
            <p>Showing both views side by side is often the most honest choice. Label the log one clearly.</p>`,
          example: d`
            import numpy as np
            import matplotlib.pyplot as plt

            x = np.arange(10); y = 2 ** x
            fig, (a, b) = plt.subplots(1, 2, figsize=(8, 3))
            a.plot(x, y); b.plot(x, y); b.set_yscale("log")`,
          task: `<code>cases = 3 × 2^(day / 2)</code> for days 0 to 30. Make two charts side by side: left with a normal (linear) y-axis titled <code>Linear scale</code>, right with a <b>log</b> y-axis titled <code>Log scale</code>. Both plot <code>cases</code> against <code>days</code>.`,
          starter: d`
            import numpy as np
            import matplotlib.pyplot as plt

            days = np.arange(0, 31)
            cases = 3 * 2 ** (days / 2)
            `,
          solution: d`
            import numpy as np
            import matplotlib.pyplot as plt

            days = np.arange(0, 31)
            cases = 3 * 2 ** (days / 2)
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
            ax1.plot(days, cases)
            ax1.set_title("Linear scale")
            ax2.plot(days, cases)
            ax2.set_yscale("log")
            ax2.set_title("Log scale")`,
          hints: ["fig, (ax1, ax2) = plt.subplots(1, 2)", "Plot the same data on both", "ax2.set_yscale(\"log\")"],
          tests: [{ code: d`
            import numpy as np
            fig = expect_fig(2); ax1, ax2 = fig.axes
            d = np.arange(0, 31); c = 3 * 2 ** (d / 2)
            for ax, name in ((ax1, "left"), (ax2, "right")):
                assert ax.get_lines(), name + ": plot the cases."
                expect_array(np.asarray(ax.get_lines()[0].get_ydata(), dtype=float), c, name + ": the cases")
            expect_equal(ax1.get_yscale(), "linear", "left y-scale"); expect_equal(ax2.get_yscale(), "log", "right y-scale")
            expect_text(ax1.get_title(), "left title", exact="Linear scale"); expect_text(ax2.get_title(), "right title", exact="Log scale")` }],
        },
        {
          id: "vz6-4", type: "quiz", title: "Riddles of Honesty",
          story: "Lady Florence's final riddles. Each describes a chart that lies. Spot the lie.",
          lesson: `<p>Common chart lies: truncated bar axes, two y-axes stretched to suggest a link, pie charts with many slices, 3D effects that distort size, cherry-picked date ranges, and colours that can't be told apart.</p>`,
          questions: [
            { q: "A bar chart's y-axis runs from 40 to 42. What's wrong?",
              choices: ["the truncated axis makes tiny differences look huge", "nothing: zooming in shows detail", "bars should be horizontal", "the colours"], answer: 0,
              explain: "Bars encode values by length, so they must start at zero." },
            { q: "A chart shows sales only from the one month after a new law, rising sharply. What should you ask?",
              choices: ["what happened before and after: is the range cherry-picked?", "which font was used", "why it's a line chart", "nothing, data is data"], answer: 0,
              explain: "Choosing a convenient window can create any trend you like." },
            { q: "A pie chart has 14 slices of similar size. What's the better choice?",
              choices: ["a sorted bar chart", "a 3D pie chart", "a pie with more colours", "a donut chart"], answer: 0,
              explain: "People judge angles poorly; sorted bars make small differences readable." },
            { q: "Two lines on two y-axes cross perfectly, \"proving\" that ice cream causes drownings. What's the trick?",
              choices: ["each axis can be rescaled until the lines match, and correlation isn't causation anyway", "the lines are the wrong colour", "there's no legend", "it needs a log scale"], answer: 0,
              explain: "Dual axes let the author choose the visual match. Be very careful with them." },
            { q: "What does this print?", predict: true, code: d`
                import matplotlib.pyplot as plt
                fig, ax = plt.subplots()
                ax.bar(["a", "b"], [96, 99])
                ax.set_ylim(95, 100)
                lo, hi = ax.get_ylim()
                print(round((99 - lo) / (96 - lo), 1))`,
              choices: ["4.0", "1.0", "1.03", "0.25"], answer: 0,
              explain: "With the axis starting at 95, the bar for 99 is drawn 4 times as tall as the bar for 96, though the values differ by about 3%." },
          ],
        },
        {
          id: "vz6-5", boss: true, time: 990, title: "Lady Florence's Rose",
          story: "Florence Nightingale changed history with a chart. Your final work: an honest summary of the Empire's trade on a single page.",
          lesson: `<p>Bring everything together: the right chart for each question, honest axes, sorted bars, clear labels, one figure title.</p>
            <p>Before you finish, check: does every chart have a title and labelled axes? Do the bars start at 0? Would someone understand it in 10 seconds?</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, axs = plt.subplots(1, 3, figsize=(15, 4))
            fig.suptitle("A one-page summary")
            for ax, name in zip(axs, ["Where", "When", "How much"]):
                ax.set_title(name)`,
          files: { "sales.csv": SALES },
          task: `From <code>sales.csv</code> (revenue = units × price), make a 1 × 3 figure (15 × 4) titled <code>Sales of the Empire</code>:<br>
            • left: total revenue per region as bars, highest first, values written on the bars, y from 0, titled <code>Revenue by region</code><br>
            • middle: total revenue per month (<code>"YYYY-MM"</code>) as a line with markers, y from 0, titled <code>Revenue by month</code><br>
            • right: a histogram of the units per order (10 bins), titled <code>Units per order</code>, x label <code>Units</code>`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            sales["revenue"] = sales["units"] * sales["price"]
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            sales = pd.read_csv("sales.csv")
            sales["revenue"] = sales["units"] * sales["price"]
            by_region = sales.groupby("region")["revenue"].sum().sort_values(ascending=False)
            by_month = sales.groupby(sales["date"].str[:7])["revenue"].sum()

            fig, (a1, a2, a3) = plt.subplots(1, 3, figsize=(15, 4))
            fig.suptitle("Sales of the Empire")
            bars = a1.bar(by_region.index, by_region.values)
            a1.bar_label(bars)
            a1.set_ylim(bottom=0)
            a1.set_title("Revenue by region")
            a2.plot(by_month.index, by_month.values, marker="o")
            a2.set_ylim(bottom=0)
            a2.set_title("Revenue by month")
            a3.hist(sales["units"], bins=10)
            a3.set_title("Units per order")
            a3.set_xlabel("Units")
            fig.tight_layout()`,
          hints: ["by_region: groupby region, sum, sort descending; by_month: groupby date.str[:7]", "bars = a1.bar(...); a1.bar_label(bars); a1.set_ylim(bottom=0)", "a2.plot(..., marker=\"o\"); a2.set_ylim(bottom=0)", "a3.hist(sales[\"units\"], bins=10)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            fig = expect_fig(3); a1, a2, a3 = fig.axes
            assert fig._suptitle is not None and fig._suptitle.get_text() == "Sales of the Empire", "Title the figure 'Sales of the Empire' (fig.suptitle)."
            expect_close(tuple(fig.get_size_inches()), (15, 4), "figure size")
            s = pd.read_csv("sales.csv"); s["revenue"] = s.units * s.price
            br = s.groupby("region").revenue.sum().sort_values(ascending=False)
            bm = s.groupby(s.date.str[:7]).revenue.sum()
            expect_close(bars_of(a1), list(br.values), "left: revenue per region (highest first)")
            assert len(a1.texts) >= 4, "Left: write the values on the bars (bar_label)."
            expect_close(a1.get_ylim()[0], 0, "left: bottom of the y-axis")
            expect_text(a1.get_title(), "left title", exact="Revenue by region")
            assert a2.get_lines(), "Middle: draw the monthly revenue as a line."
            ml = a2.get_lines()[0]
            expect_close([float(v) for v in ml.get_ydata()], list(bm.values), "middle: monthly revenue")
            assert ml.get_marker() not in (None, "None", ""), "Middle: use markers."
            expect_close(a2.get_ylim()[0], 0, "middle: bottom of the y-axis")
            expect_text(a2.get_title(), "middle title", exact="Revenue by month")
            expect_close(bars_of(a3), list(np.histogram(s.units, bins=10)[0]), "right: histogram of units (10 bins)")
            expect_text(a3.get_title(), "right title", exact="Units per order"); expect_text(a3.get_xlabel(), "right x label", exact="Units")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "viz", name: "Visualization", realm: "The Painted Isles", tower: "The Lighthouse of Insight",
    ruler: "Lady Florence", rulerIcon: "👩‍🎨", icon: "🎨", color: "#ffa94d", requires: ["pandas"],
    packages: ["numpy", "pandas", "matplotlib"], runMs: 20000, submitMs: 30000,
    blurb: "Turn numbers into pictures people understand, with matplotlib and seaborn.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
