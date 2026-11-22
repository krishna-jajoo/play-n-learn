// The Machine Learning empire: the Automaton Empire. King Turing waits at the top of the Clockwork Spire.
// Missions use scikit-learn (with its built-in datasets) and two generated datasets below.
(function (root) {
  const { d } = root.QUEST;

  // ───────────────────────────── datasets (generated once, deterministic)
  const ADVENTURERS = `age,class,guild,level,gold,has_map,party,returned
59.0,Archer,Dawn,1,605.0,1,2,0
39.0,Mage,Ember,13,242.0,0,4,1
65.0,Healer,Dawn,21,202.0,0,1,1
54.0,Archer,Ember,37,74.0,0,1,0
48.0,Knight,Ember,30,210.0,0,4,1
61.0,Healer,Ember,32,192.0,0,4,1
41.0,Archer,Ember,22,628.0,1,5,0
52.0,Archer,Dawn,5,202.0,1,3,0
30.0,Knight,Frost,16,207.0,0,6,1
64.0,Mage,Frost,40,75.0,1,3,1
47.0,Mage,Frost,2,105.0,0,5,0
55.0,Healer,Frost,36,290.0,0,1,1
39.0,Archer,Ember,28,31.0,1,1,1
59.0,Healer,Frost,12,397.0,0,5,0
,Mage,Ember,32,405.0,1,6,1
21.0,Knight,Dawn,34,96.0,1,6,1
41.0,Archer,Frost,2,258.0,0,2,0
52.0,Knight,Dawn,5,473.0,1,1,0
56.0,Healer,Frost,27,180.0,0,6,1
38.0,Archer,Ember,40,155.0,0,4,1
48.0,Archer,Frost,1,170.0,0,2,0
43.0,Mage,Ember,27,242.0,1,5,1
64.0,Healer,Ember,6,118.0,1,6,1
48.0,Healer,Dawn,27,144.0,1,2,1
36.0,Archer,Frost,25,245.0,1,5,1
64.0,Knight,Dawn,4,134.0,0,5,0
21.0,Mage,Ember,28,69.0,1,4,0
65.0,Knight,Ember,36,28.0,1,4,1
23.0,Knight,Ember,35,205.0,0,2,1
30.0,Archer,Dawn,2,453.0,1,6,0
57.0,Archer,Ember,10,268.0,1,6,1
52.0,Healer,Ember,10,71.0,1,6,1
64.0,Mage,Dawn,19,105.0,0,5,1
53.0,Mage,Dawn,6,154.0,0,1,0
47.0,Mage,Frost,35,641.0,1,3,1
,Knight,Dawn,32,664.0,0,3,1
16.0,Knight,Dawn,33,613.0,0,6,1
22.0,Mage,Ember,8,221.0,0,4,1
30.0,Knight,Dawn,1,1207.0,1,4,1
18.0,Archer,Ember,37,109.0,1,1,1
,Mage,Dawn,12,149.0,0,5,0
54.0,Healer,,27,376.0,1,3,1
64.0,Archer,Frost,37,246.0,0,1,0
,Mage,Ember,2,257.0,0,6,1
59.0,Healer,Frost,1,83.0,1,2,1
65.0,Healer,Frost,1,191.0,0,1,0
58.0,Mage,Dawn,7,111.0,0,1,1
,Knight,Ember,3,56.0,0,3,1
32.0,Archer,Dawn,33,122.0,1,1,1
,Knight,Ember,25,246.0,0,6,0
28.0,Knight,Dawn,40,334.0,0,4,1
36.0,Knight,Frost,33,27.0,0,2,0
19.0,Archer,Dawn,39,198.0,0,1,0
55.0,Archer,Ember,10,184.0,0,3,1
48.0,Archer,Dawn,12,237.0,1,1,0
20.0,Archer,,34,73.0,1,6,1
27.0,Mage,Frost,10,74.0,1,2,0
43.0,Archer,Frost,3,462.0,0,3,0
43.0,Knight,Ember,27,97.0,0,1,1
56.0,Knight,Dawn,33,143.0,0,1,0
29.0,Archer,Frost,39,155.0,1,2,1
62.0,Mage,Ember,38,112.0,0,1,0
38.0,Archer,Frost,5,284.0,0,5,1
57.0,Archer,Frost,31,267.0,1,6,1
27.0,Archer,Ember,34,178.0,0,6,0
17.0,Archer,Frost,28,118.0,0,2,1
18.0,Archer,,33,167.0,0,5,1
34.0,Mage,Ember,34,211.0,1,4,1
63.0,Knight,Dawn,18,105.0,0,1,0
18.0,Mage,Dawn,2,299.0,0,1,1
34.0,Knight,,19,395.0,0,4,1
21.0,Mage,Ember,9,515.0,0,3,0
62.0,Healer,Dawn,5,494.0,0,1,0
49.0,Knight,Dawn,5,155.0,1,6,1
54.0,Knight,Frost,28,219.0,0,5,1
51.0,Knight,Frost,21,175.0,0,4,0
48.0,Knight,Dawn,22,175.0,0,6,1
54.0,Archer,Ember,30,166.0,1,6,1
16.0,Archer,Dawn,22,201.0,1,6,0
59.0,Archer,Frost,26,440.0,0,2,1
52.0,Archer,Frost,4,252.0,1,6,1
52.0,Mage,Frost,35,69.0,0,4,0
35.0,Healer,Ember,18,384.0,1,5,1
56.0,Knight,Ember,7,235.0,0,6,0
35.0,Knight,Frost,33,286.0,0,1,0
18.0,Knight,Ember,30,248.0,1,3,1
61.0,Archer,Ember,3,257.0,0,1,0
27.0,Mage,Frost,8,265.0,1,2,0
21.0,Knight,Ember,1,34.0,0,3,0
47.0,Mage,Frost,11,283.0,0,6,1
27.0,Knight,Ember,4,109.0,0,6,1
58.0,Archer,Frost,29,134.0,1,3,0
38.0,Mage,Dawn,21,200.0,1,2,0
16.0,Mage,Dawn,40,570.0,0,4,1
63.0,Mage,Dawn,30,81.0,0,6,1
41.0,Archer,Ember,25,195.0,0,6,1
29.0,Mage,Frost,21,163.0,1,2,1
49.0,Knight,Dawn,3,380.0,1,2,1
42.0,Knight,Dawn,3,159.0,0,5,0
17.0,Healer,Frost,25,237.0,1,2,1
53.0,Healer,Frost,1,82.0,1,2,0
36.0,Archer,Ember,2,425.0,0,1,1
50.0,Knight,Ember,9,51.0,1,3,1
60.0,Healer,Ember,36,281.0,0,3,1
46.0,Archer,Dawn,19,238.0,1,4,1
49.0,Archer,Dawn,29,264.0,0,2,0
,Mage,Frost,17,52.0,0,5,0
,Knight,Ember,7,157.0,0,5,0
36.0,Knight,Frost,15,367.0,1,3,1
,Healer,Frost,4,627.0,0,2,0
42.0,Mage,Dawn,31,183.0,0,4,1
33.0,Knight,Dawn,8,344.0,1,5,0
,Mage,Frost,16,221.0,1,3,0
58.0,Archer,Dawn,40,191.0,1,2,1
61.0,Knight,Ember,24,142.0,0,4,1
30.0,Healer,Frost,19,200.0,0,3,1
,Archer,Frost,22,323.0,0,3,1
45.0,Archer,Frost,32,342.0,0,3,0
38.0,Mage,Dawn,11,63.0,0,2,0
35.0,Archer,Dawn,26,132.0,0,5,0
21.0,Archer,Dawn,35,78.0,1,3,1
29.0,Archer,Dawn,23,208.0,0,3,1
43.0,Knight,Dawn,18,152.0,1,4,1
60.0,Mage,Frost,6,257.0,0,3,0
59.0,Knight,Dawn,10,270.0,0,1,0
25.0,Mage,Frost,38,17.0,1,6,1
49.0,Mage,Ember,22,199.0,0,1,0
20.0,Knight,,13,446.0,1,4,1
49.0,Knight,Dawn,17,132.0,0,2,1
33.0,Archer,Dawn,24,129.0,0,2,0
38.0,Knight,Ember,22,395.0,0,1,1
,Healer,Dawn,28,353.0,1,6,0
37.0,Archer,Frost,11,86.0,1,3,1
56.0,Mage,Dawn,26,329.0,1,3,0
42.0,Archer,Dawn,18,104.0,1,5,1
65.0,Knight,Frost,38,128.0,1,1,1
47.0,Healer,Ember,7,85.0,1,4,0
30.0,Mage,Dawn,6,63.0,0,3,0
54.0,Archer,Frost,19,217.0,1,4,1
36.0,Knight,Dawn,21,54.0,1,1,1
42.0,Mage,Frost,28,224.0,0,6,1
22.0,Mage,Frost,17,219.0,0,2,0
21.0,Healer,Frost,37,177.0,0,5,1
44.0,Archer,Frost,19,137.0,0,5,1
25.0,Mage,Dawn,6,116.0,0,3,1
65.0,Knight,Frost,5,76.0,0,1,0
58.0,Mage,Dawn,39,518.0,0,2,1
51.0,Mage,Ember,6,171.0,0,5,0
52.0,Mage,Dawn,38,167.0,1,6,1
45.0,Knight,Ember,12,89.0,1,6,1
19.0,Healer,Frost,4,482.0,0,2,0
35.0,Healer,Ember,13,122.0,1,4,1
40.0,Knight,Dawn,25,240.0,0,1,1
61.0,Archer,Dawn,18,275.0,1,5,1
26.0,Knight,Frost,32,218.0,1,3,1
40.0,Archer,Ember,25,52.0,1,5,1
33.0,Knight,Ember,17,319.0,0,5,0
22.0,Archer,Ember,26,121.0,1,6,1
21.0,Archer,Dawn,39,350.0,0,3,0
34.0,Archer,Ember,17,190.0,0,3,0
20.0,Knight,Ember,7,287.0,1,4,1
,Healer,Frost,17,461.0,0,1,0
33.0,Knight,Ember,34,311.0,1,1,1
26.0,Knight,,9,292.0,1,4,0
43.0,Archer,Frost,38,329.0,0,5,1
16.0,Mage,Dawn,24,100.0,0,4,1
31.0,Healer,Ember,25,360.0,1,5,1
38.0,Healer,Ember,13,161.0,0,2,0
64.0,Mage,Dawn,37,165.0,1,3,1
47.0,Healer,Dawn,2,212.0,0,4,0
60.0,Knight,Frost,12,149.0,0,3,0
33.0,Mage,Ember,17,83.0,0,1,0
38.0,Knight,Dawn,20,200.0,0,1,1
37.0,Healer,Dawn,19,166.0,1,6,1
60.0,Knight,Dawn,6,161.0,0,4,0
63.0,Knight,Dawn,10,185.0,0,2,1
64.0,Mage,Dawn,4,19.0,0,2,0
53.0,Healer,Frost,23,162.0,1,1,1
41.0,Healer,Frost,15,499.0,1,6,1
43.0,Archer,Ember,23,473.0,1,1,1
65.0,Healer,Ember,24,206.0,1,5,1
30.0,Healer,Frost,29,201.0,1,2,1
,Mage,Frost,22,13.0,1,3,1
60.0,Mage,Dawn,26,127.0,0,2,1
35.0,Archer,Frost,24,327.0,1,5,1
27.0,Archer,Dawn,27,146.0,0,1,0
44.0,Mage,Dawn,25,406.0,0,3,0
32.0,Knight,Ember,13,389.0,0,2,1
60.0,Archer,Frost,10,125.0,0,2,0
61.0,Knight,,32,218.0,0,2,1
31.0,Healer,Dawn,14,526.0,0,6,1
42.0,Knight,Dawn,22,51.0,0,3,1
,Knight,Ember,8,149.0,0,3,0
53.0,Healer,Frost,18,46.0,0,3,0
26.0,Knight,Dawn,22,94.0,0,6,1
45.0,Knight,Dawn,26,629.0,0,3,1
46.0,Archer,Dawn,22,149.0,1,3,1
48.0,Healer,Dawn,15,26.0,0,2,0
17.0,Knight,Dawn,39,82.0,0,2,1
,Mage,Ember,21,40.0,0,1,0
58.0,Archer,Ember,33,224.0,0,4,1
28.0,Healer,Ember,30,272.0,0,1,1
30.0,Mage,Frost,23,364.0,0,2,0
32.0,Knight,Ember,36,315.0,0,2,0
24.0,Knight,Dawn,6,54.0,1,2,1
23.0,Knight,Ember,37,262.0,1,5,1
33.0,Knight,Dawn,35,179.0,1,4,1
59.0,Archer,Frost,21,400.0,1,6,1
16.0,Knight,Dawn,30,340.0,1,3,1
30.0,Mage,,21,683.0,0,6,1
,Archer,Frost,11,88.0,0,1,0
44.0,Archer,Ember,32,77.0,1,4,0
28.0,Knight,Dawn,10,134.0,0,5,1
55.0,Healer,Frost,13,185.0,1,4,1
45.0,Archer,Dawn,21,113.0,0,6,1
,Archer,,34,92.0,1,2,1
47.0,Knight,Frost,16,250.0,0,1,1
37.0,Knight,Ember,20,133.0,1,5,1
59.0,Healer,Ember,2,109.0,0,1,0
39.0,Mage,,5,53.0,1,5,0
63.0,Mage,Ember,3,15.0,0,5,1
65.0,Mage,Dawn,3,483.0,1,6,0
45.0,Archer,Dawn,35,474.0,0,3,1
49.0,Healer,Dawn,34,347.0,0,6,1
28.0,Knight,Frost,33,293.0,0,2,1
56.0,Healer,Dawn,3,123.0,0,3,1
49.0,Knight,,4,301.0,0,1,0
61.0,Archer,Frost,12,72.0,1,5,0
29.0,Archer,Frost,23,214.0,1,5,1
55.0,Knight,Dawn,14,101.0,1,5,0
39.0,Knight,Dawn,20,302.0,1,5,0
25.0,Mage,Frost,7,550.0,0,2,0
24.0,Healer,Dawn,30,82.0,0,1,0
44.0,Archer,Dawn,13,129.0,0,6,0
,Healer,Frost,3,211.0,0,3,0
21.0,Healer,Frost,30,30.0,0,1,0
37.0,Mage,Frost,37,43.0,0,6,1
48.0,Archer,Frost,1,539.0,0,6,1
31.0,Knight,Dawn,18,251.0,1,3,1
63.0,Knight,Dawn,34,118.0,0,5,1
54.0,Healer,Dawn,29,194.0,0,1,1
41.0,Archer,Dawn,35,134.0,1,1,0
62.0,Knight,Frost,17,215.0,1,2,0
37.0,Mage,Dawn,15,138.0,0,4,1
22.0,Archer,Ember,29,183.0,0,1,1
17.0,Healer,,7,321.0,0,1,0
62.0,Archer,Frost,10,307.0,0,5,0
63.0,Mage,Dawn,25,519.0,1,5,0
52.0,Mage,Ember,27,264.0,1,5,1
21.0,Mage,Ember,5,204.0,0,5,0
30.0,Archer,Frost,21,571.0,0,5,0
18.0,Healer,Ember,15,168.0,0,4,0
18.0,Mage,,21,17.0,0,4,0
28.0,Knight,Frost,39,350.0,1,6,1
44.0,Knight,Frost,4,241.0,0,3,1
19.0,Archer,Ember,40,196.0,1,1,1
65.0,Healer,Dawn,18,357.0,1,5,1
38.0,Knight,Ember,31,139.0,1,2,1
29.0,Knight,Frost,17,18.0,1,6,0
41.0,Archer,Frost,13,362.0,0,3,1
55.0,Knight,Ember,31,114.0,1,6,0
31.0,Healer,Dawn,28,85.0,1,1,1
18.0,Mage,Ember,6,20.0,0,4,0
18.0,Knight,Frost,29,341.0,0,3,1
,Healer,Frost,31,9.0,1,3,1
21.0,Knight,,16,458.0,1,2,1
,Knight,Dawn,38,151.0,1,6,1
35.0,Knight,Ember,26,352.0,0,3,0
54.0,Knight,Dawn,14,269.0,1,6,1
19.0,Knight,Frost,1,641.0,1,3,1
60.0,Knight,Dawn,27,264.0,1,1,1
50.0,Knight,Ember,9,447.0,0,6,0
38.0,Knight,,31,125.0,1,2,1
26.0,Archer,,22,42.0,0,2,1
64.0,Archer,Frost,19,390.0,1,6,1
31.0,Mage,Dawn,7,41.0,0,6,0
40.0,Mage,Frost,29,338.0,1,6,1
35.0,Mage,Ember,7,75.0,1,3,1
27.0,Healer,Dawn,17,245.0,1,5,1
36.0,Healer,Ember,34,649.0,0,2,1
23.0,Knight,Ember,37,320.0,0,5,1
16.0,Knight,Ember,40,169.0,1,4,1
30.0,Knight,Dawn,39,274.0,1,1,1
21.0,Knight,Ember,23,129.0,0,3,1
36.0,Archer,Ember,9,814.0,0,3,0
59.0,Mage,Dawn,34,107.0,1,2,1
24.0,Knight,Frost,33,184.0,1,3,1
16.0,Mage,Dawn,40,300.0,0,4,0
21.0,Mage,Frost,27,260.0,0,1,1
41.0,Knight,Dawn,6,281.0,0,1,0
29.0,Healer,Frost,21,131.0,0,5,1
40.0,Knight,Ember,18,163.0,0,3,1
17.0,Healer,Dawn,34,378.0,1,4,1
,Knight,Dawn,16,365.0,0,4,0
36.0,Healer,Frost,14,264.0,1,4,0
37.0,Healer,Frost,4,485.0,1,3,1
43.0,Healer,Dawn,34,389.0,1,3,1
55.0,Healer,Ember,31,358.0,1,5,1
39.0,Archer,Ember,2,40.0,0,6,1
58.0,Archer,Dawn,18,262.0,1,2,1
42.0,Archer,Ember,20,229.0,1,5,0
29.0,Knight,Frost,19,526.0,0,6,1
27.0,Mage,Frost,37,176.0,0,1,0
32.0,Mage,Frost,7,215.0,0,5,0
45.0,Healer,Dawn,13,74.0,0,3,0
28.0,Mage,Dawn,8,89.0,0,6,0
,Mage,Ember,10,527.0,1,4,0
39.0,Archer,Dawn,37,280.0,0,6,1
59.0,Knight,Ember,38,649.0,0,1,1
50.0,Knight,Dawn,2,173.0,1,1,0
32.0,Mage,Dawn,26,51.0,1,6,1
27.0,Mage,Dawn,10,154.0,1,4,1
53.0,Knight,Dawn,8,133.0,0,4,1
32.0,Mage,Frost,12,328.0,1,2,1
28.0,Mage,Dawn,8,319.0,1,2,1
62.0,Mage,Frost,20,291.0,0,5,1
40.0,Mage,Dawn,40,782.0,0,2,0
18.0,Archer,Dawn,24,466.0,1,4,1
40.0,Knight,,29,95.0,0,2,0
,Healer,Frost,20,397.0,1,2,0
59.0,Healer,Dawn,1,204.0,0,1,0
51.0,Mage,Dawn,4,169.0,0,6,0
25.0,Mage,Frost,11,505.0,1,6,0
23.0,Mage,Ember,10,89.0,0,1,0
46.0,Healer,Ember,34,379.0,0,3,1
18.0,Archer,Frost,34,339.0,0,4,1
31.0,Healer,Frost,35,88.0,0,3,1
22.0,Mage,Ember,26,39.0,0,5,1
17.0,Archer,Ember,23,187.0,1,2,0
61.0,Knight,Dawn,26,429.0,0,1,0
20.0,Archer,Dawn,17,261.0,0,3,0
16.0,Knight,Ember,27,516.0,0,4,0
,Archer,Dawn,32,248.0,1,2,1
25.0,Healer,Frost,31,539.0,0,5,1
56.0,Knight,Frost,25,121.0,1,1,0
17.0,Archer,Dawn,3,290.0,0,1,0
23.0,Knight,Ember,29,145.0,1,4,1
,Archer,Dawn,15,183.0,0,4,1
51.0,Knight,Ember,30,214.0,0,2,0
47.0,Healer,Dawn,22,261.0,0,2,1
39.0,Knight,Ember,36,107.0,0,1,1
,Healer,Ember,14,280.0,1,4,1
20.0,Healer,Ember,38,206.0,0,3,1
44.0,Archer,Ember,34,55.0,0,1,1
27.0,Archer,Dawn,14,32.0,1,3,0
45.0,Archer,Frost,20,430.0,1,6,0
50.0,Healer,Frost,22,176.0,1,2,1
58.0,Knight,Frost,31,49.0,0,6,1
40.0,Archer,Ember,28,598.0,0,2,1
16.0,Knight,Frost,35,301.0,0,2,1
30.0,Archer,Ember,15,256.0,1,2,0
58.0,Knight,Frost,21,99.0,0,2,0
42.0,Archer,Dawn,18,54.0,1,1,0
46.0,Archer,Dawn,37,229.0,0,4,1
38.0,Mage,Ember,13,197.0,1,3,0
24.0,Mage,Ember,24,76.0,0,5,1
60.0,Archer,Frost,5,73.0,0,3,0
54.0,Archer,Dawn,35,70.0,1,3,0
65.0,Mage,Frost,16,67.0,0,3,0
58.0,Archer,Dawn,14,118.0,0,1,0
30.0,Healer,Ember,24,256.0,1,5,1
28.0,Knight,Frost,20,288.0,1,1,0
28.0,Knight,Ember,34,193.0,0,5,0
61.0,Knight,Frost,22,221.0,1,6,1
43.0,Archer,Frost,21,298.0,1,5,1
38.0,Mage,Frost,5,23.0,0,3,1
64.0,Archer,Ember,1,234.0,0,2,1
46.0,Archer,Ember,16,480.0,1,6,1
61.0,Mage,Dawn,40,172.0,1,2,1
65.0,Healer,Ember,37,418.0,0,3,0
19.0,Archer,Frost,26,175.0,0,5,1
34.0,Knight,Ember,26,312.0,0,6,1
,Mage,Ember,16,252.0,1,6,1
56.0,Mage,Dawn,8,68.0,0,1,0
23.0,Knight,Ember,1,85.0,0,6,1
31.0,Knight,Dawn,14,539.0,1,1,1
,Healer,Frost,13,360.0,0,4,1
55.0,Mage,,8,184.0,0,6,1
,Mage,Dawn,11,166.0,1,4,1
46.0,Archer,Dawn,1,100.0,1,6,0
30.0,Archer,Frost,25,268.0,0,3,0
26.0,Healer,Frost,38,107.0,1,2,1
41.0,Archer,Frost,28,149.0,1,2,1
36.0,Mage,Dawn,18,118.0,1,3,0
47.0,Mage,Dawn,17,345.0,1,5,1
31.0,Healer,Dawn,13,178.0,1,3,1
57.0,Archer,Frost,6,222.0,0,5,0
19.0,Healer,Frost,24,70.0,1,3,1
59.0,Knight,Frost,23,117.0,1,2,1
17.0,Healer,Dawn,1,226.0,0,2,1
52.0,Archer,Dawn,17,41.0,1,4,1
33.0,Knight,Frost,12,168.0,0,6,1
35.0,Archer,Frost,7,198.0,1,6,1
16.0,Archer,Frost,29,61.0,1,2,1
51.0,Knight,Dawn,22,405.0,1,3,0
24.0,Mage,Dawn,26,258.0,0,5,1
48.0,Healer,Dawn,29,177.0,1,4,1
52.0,Knight,Frost,40,110.0,0,1,1
58.0,Mage,,33,39.0,1,4,0
51.0,Mage,,25,384.0,0,1,0
`;
  const HOUSES = `size,rooms,age,garden,district,price
74.0,3,109,0,Fernhill,153800.0
128.0,4,90,0,Stonebridge,321200.0
61.0,2,27,1,Stonebridge,159000.0
88.0,3,22,0,Stonebridge,251200.0
148.0,5,81,0,Harbour,445900.0
122.0,5,7,1,Fernhill,234800.0
99.0,3,64,0,Stonebridge,254700.0
126.0,4,53,0,Stonebridge,362900.0
108.0,4,89,0,Oakvale,258500.0
110.0,5,24,0,Harbour,369600.0
133.0,4,91,1,Oakvale,299200.0
85.0,4,83,0,Oakvale,197200.0
111.0,5,28,0,Harbour,331600.0
99.0,3,42,1,Fernhill,210700.0
55.0,2,7,0,Oakvale,97700.0
78.0,2,53,1,Oakvale,183900.0
165.0,5,31,1,Oakvale,357000.0
123.0,5,13,0,Stonebridge,338600.0
64.0,2,67,1,Oakvale,151800.0
56.0,2,68,0,Harbour,94100.0
106.0,3,10,1,Harbour,362500.0
165.0,5,22,0,Stonebridge,437500.0
103.0,5,9,1,Stonebridge,316800.0
156.0,5,81,0,Oakvale,311900.0
122.0,3,40,1,Oakvale,307100.0
126.0,5,8,0,Fernhill,240700.0
63.0,2,22,1,Oakvale,164300.0
143.0,5,117,1,Oakvale,337100.0
98.0,3,30,0,Oakvale,208300.0
140.0,4,82,0,Oakvale,254100.0
82.0,3,56,0,Stonebridge,146800.0
116.0,3,21,1,Fernhill,211100.0
122.0,4,36,1,Fernhill,258000.0
105.0,4,1,0,Stonebridge,268500.0
124.0,6,89,0,Fernhill,247600.0
101.0,3,40,1,Stonebridge,282400.0
87.0,1,59,0,Fernhill,163400.0
166.0,5,18,0,Stonebridge,416900.0
147.0,7,98,0,Oakvale,325600.0
83.0,3,26,1,Harbour,301700.0
130.0,4,67,0,Oakvale,298200.0
84.0,3,104,1,Oakvale,146000.0
69.0,2,85,0,Oakvale,118800.0
146.0,4,72,1,Stonebridge,407900.0
50.0,1,106,0,Stonebridge,147800.0
142.0,5,21,0,Stonebridge,374700.0
101.0,2,115,0,Harbour,287500.0
103.0,3,66,1,Oakvale,247100.0
124.0,4,49,1,Stonebridge,361100.0
130.0,4,30,0,Oakvale,256800.0
81.0,3,89,0,Fernhill,144300.0
135.0,4,117,0,Oakvale,292100.0
114.0,4,82,1,Oakvale,302000.0
66.0,1,3,0,Stonebridge,178900.0
104.0,5,56,1,Fernhill,219300.0
158.0,4,87,1,Fernhill,284500.0
169.0,5,47,1,Stonebridge,466100.0
135.0,5,92,0,Fernhill,231700.0
68.0,4,84,1,Stonebridge,210400.0
127.0,4,8,1,Oakvale,262000.0
140.0,5,66,0,Oakvale,320200.0
135.0,5,20,0,Oakvale,256700.0
137.0,4,58,1,Oakvale,288700.0
123.0,4,46,1,Stonebridge,339900.0
107.0,3,96,0,Stonebridge,309400.0
89.0,2,104,1,Stonebridge,222600.0
44.0,2,55,1,Stonebridge,119800.0
122.0,3,64,0,Fernhill,187300.0
117.0,4,75,1,Fernhill,267500.0
130.0,3,78,0,Oakvale,179800.0
63.0,2,76,1,Oakvale,120700.0
133.0,4,93,1,Stonebridge,422200.0
182.0,7,117,1,Stonebridge,505000.0
113.0,4,99,1,Oakvale,222900.0
108.0,5,16,1,Oakvale,261100.0
121.0,3,57,1,Fernhill,227200.0
181.0,6,55,0,Stonebridge,483800.0
74.0,2,61,0,Oakvale,188600.0
117.0,4,63,1,Stonebridge,331000.0
82.0,3,86,0,Harbour,239300.0
91.0,2,50,0,Oakvale,194500.0
108.0,3,31,0,Harbour,318400.0
157.0,4,54,1,Oakvale,310200.0
173.0,4,102,1,Stonebridge,400600.0
126.0,3,37,1,Stonebridge,297500.0
97.0,4,2,1,Oakvale,212900.0
197.0,5,117,1,Harbour,595500.0
95.0,2,23,0,Stonebridge,241100.0
90.0,4,72,0,Harbour,256900.0
48.0,1,96,1,Oakvale,28400.0
159.0,6,32,0,Harbour,484500.0
144.0,5,40,1,Harbour,470200.0
195.0,7,33,0,Stonebridge,491700.0
61.0,1,17,0,Oakvale,154400.0
161.0,5,18,1,Fernhill,293600.0
112.0,2,22,0,Stonebridge,294500.0
138.0,7,54,0,Harbour,455200.0
52.0,1,63,0,Stonebridge,118700.0
161.0,5,1,0,Oakvale,313800.0
138.0,4,101,0,Oakvale,268800.0
109.0,2,81,1,Fernhill,176000.0
133.0,6,8,1,Harbour,467800.0
83.0,5,101,0,Oakvale,174400.0
90.0,3,3,1,Fernhill,163000.0
94.0,2,67,0,Harbour,306000.0
45.0,1,55,0,Oakvale,93000.0
140.0,4,60,0,Oakvale,268400.0
152.0,5,114,1,Fernhill,285700.0
85.0,2,111,0,Stonebridge,195900.0
122.0,4,33,1,Oakvale,254300.0
101.0,4,69,1,Fernhill,204600.0
121.0,4,115,1,Stonebridge,307700.0
88.0,3,87,0,Harbour,246400.0
79.0,2,106,0,Harbour,191700.0
147.0,5,52,1,Fernhill,274300.0
108.0,4,33,0,Stonebridge,294000.0
181.0,7,61,1,Oakvale,387900.0
112.0,4,98,0,Stonebridge,342900.0
78.0,1,111,1,Oakvale,181000.0
153.0,4,82,0,Fernhill,286600.0
132.0,4,84,0,Oakvale,281700.0
135.0,4,61,0,Stonebridge,384300.0
152.0,6,38,1,Oakvale,327600.0
87.0,3,50,0,Oakvale,112600.0
106.0,4,59,0,Oakvale,207400.0
104.0,4,97,0,Stonebridge,275600.0
65.0,2,66,0,Fernhill,110000.0
101.0,4,95,0,Oakvale,211400.0
157.0,6,3,1,Harbour,566900.0
118.0,4,90,0,Harbour,375200.0
63.0,3,60,1,Oakvale,177000.0
56.0,2,119,0,Fernhill,61900.0
168.0,5,56,1,Stonebridge,421200.0
107.0,3,57,1,Oakvale,277000.0
87.0,3,15,0,Stonebridge,227500.0
100.0,4,96,0,Oakvale,187000.0
58.0,2,84,0,Harbour,158900.0
160.0,6,103,0,Harbour,487400.0
96.0,2,11,1,Fernhill,167700.0
158.0,5,25,1,Stonebridge,397800.0
112.0,4,105,1,Stonebridge,266400.0
160.0,5,5,0,Harbour,503400.0
119.0,6,60,0,Oakvale,245000.0
140.0,5,48,0,Oakvale,318000.0
135.0,4,112,0,Stonebridge,338100.0
132.0,4,102,1,Oakvale,291000.0
122.0,2,107,0,Oakvale,204000.0
102.0,3,34,0,Oakvale,202800.0
177.0,7,70,0,Stonebridge,469300.0
78.0,2,84,1,Oakvale,189500.0
110.0,3,116,1,Oakvale,231400.0
111.0,5,0,0,Oakvale,271800.0
124.0,5,117,1,Stonebridge,339000.0
95.0,4,42,0,Harbour,325400.0
121.0,4,15,1,Oakvale,264500.0
104.0,3,73,0,Fernhill,127500.0
55.0,1,93,0,Fernhill,85200.0
110.0,3,15,0,Oakvale,241000.0
71.0,2,4,1,Fernhill,163300.0
49.0,1,107,1,Fernhill,103100.0
115.0,3,112,1,Stonebridge,292100.0
127.0,3,18,0,Oakvale,232900.0
128.0,4,108,1,Oakvale,290100.0
130.0,5,109,0,Harbour,417400.0
42.0,3,119,1,Fernhill,84300.0
62.0,2,25,1,Harbour,247000.0
179.0,6,69,0,Harbour,541400.0
73.0,3,119,0,Oakvale,127200.0
131.0,4,108,0,Fernhill,258300.0
86.0,3,72,0,Stonebridge,236400.0
113.0,4,23,0,Fernhill,193300.0
88.0,3,10,0,Oakvale,191200.0
130.0,4,31,0,Oakvale,269500.0
115.0,4,7,1,Fernhill,163900.0
94.0,2,23,0,Fernhill,133100.0
73.0,2,8,0,Stonebridge,183500.0
119.0,3,91,1,Oakvale,244500.0
68.0,1,70,0,Oakvale,127800.0
125.0,5,62,0,Harbour,427100.0
202.0,8,97,0,Stonebridge,515000.0
157.0,5,49,1,Stonebridge,397800.0
135.0,5,48,0,Stonebridge,356900.0
107.0,3,24,0,Stonebridge,261600.0
42.0,1,53,1,Stonebridge,119300.0
64.0,2,20,1,Stonebridge,180100.0
155.0,6,70,1,Fernhill,357700.0
82.0,2,119,1,Harbour,208100.0
86.0,4,63,0,Harbour,266900.0
104.0,3,35,0,Stonebridge,261200.0
73.0,2,82,1,Stonebridge,179900.0
67.0,1,98,1,Fernhill,143300.0
108.0,4,56,0,Fernhill,210500.0
79.0,3,30,1,Stonebridge,228300.0
84.0,3,85,0,Fernhill,134300.0
83.0,5,22,1,Fernhill,188600.0
128.0,5,119,1,Fernhill,242700.0
102.0,3,38,0,Fernhill,172700.0
104.0,3,42,1,Oakvale,228600.0
131.0,5,87,0,Stonebridge,340400.0
105.0,3,1,1,Stonebridge,312200.0
100.0,4,24,0,Oakvale,181900.0
126.0,4,15,0,Harbour,373000.0
133.0,5,46,0,Stonebridge,300700.0
105.0,4,66,1,Oakvale,262400.0
113.0,5,21,0,Fernhill,217800.0
83.0,3,41,0,Fernhill,158400.0
80.0,3,92,1,Fernhill,123400.0
137.0,6,112,1,Stonebridge,423000.0
126.0,5,1,0,Harbour,395000.0
126.0,4,75,1,Stonebridge,344500.0
120.0,4,3,0,Stonebridge,332900.0
112.0,4,62,0,Oakvale,204200.0
134.0,5,105,1,Stonebridge,349800.0
143.0,4,95,0,Fernhill,241700.0
142.0,3,27,0,Stonebridge,421300.0
106.0,3,31,1,Stonebridge,299000.0
159.0,5,94,0,Fernhill,310500.0
118.0,3,98,1,Fernhill,245400.0
132.0,5,33,1,Oakvale,312200.0
120.0,4,0,0,Harbour,359300.0
119.0,4,53,1,Fernhill,258600.0
84.0,2,74,0,Harbour,213800.0
135.0,4,53,1,Harbour,485100.0
210.0,7,112,0,Harbour,661300.0
97.0,4,97,1,Fernhill,126700.0
112.0,3,94,0,Stonebridge,262900.0
94.0,3,2,0,Oakvale,212300.0
93.0,5,102,0,Stonebridge,238700.0
164.0,5,90,0,Fernhill,296300.0
86.0,2,47,0,Stonebridge,188000.0
93.0,3,70,0,Harbour,254300.0
54.0,2,98,0,Oakvale,99700.0
83.0,3,108,0,Stonebridge,203600.0
50.0,2,66,0,Stonebridge,115100.0
132.0,3,4,0,Stonebridge,360700.0
208.0,6,74,1,Oakvale,421800.0
97.0,3,81,0,Oakvale,198100.0
52.0,2,7,0,Fernhill,96700.0
141.0,4,98,1,Stonebridge,332700.0
85.0,3,24,1,Oakvale,168700.0
155.0,5,106,0,Oakvale,309500.0
100.0,4,66,0,Stonebridge,306300.0
88.0,3,38,1,Oakvale,219600.0
104.0,4,7,1,Fernhill,172900.0
137.0,4,2,1,Fernhill,188500.0
102.0,4,88,0,Oakvale,225600.0
93.0,3,45,0,Stonebridge,232200.0
103.0,4,100,0,Oakvale,235900.0
65.0,3,27,0,Oakvale,118200.0
124.0,5,110,0,Harbour,398000.0
47.0,1,112,1,Stonebridge,147600.0
94.0,3,12,0,Harbour,286700.0
137.0,5,77,1,Oakvale,295200.0
121.0,4,112,1,Oakvale,263800.0
131.0,4,38,0,Stonebridge,345500.0
108.0,4,8,0,Stonebridge,282900.0
151.0,5,105,1,Harbour,517500.0
142.0,4,56,0,Oakvale,272200.0
126.0,4,3,0,Harbour,367800.0
142.0,5,100,1,Harbour,517200.0
136.0,3,81,1,Stonebridge,338300.0
95.0,3,8,1,Oakvale,207700.0
63.0,2,31,0,Stonebridge,156900.0
125.0,4,2,0,Oakvale,262400.0
129.0,5,114,0,Fernhill,212900.0
148.0,4,2,1,Stonebridge,400700.0
77.0,2,95,0,Harbour,227000.0
78.0,1,61,0,Stonebridge,184200.0
126.0,4,69,0,Stonebridge,257200.0
108.0,3,97,1,Fernhill,247400.0
44.0,1,107,0,Stonebridge,91500.0
123.0,5,15,0,Harbour,414100.0
45.0,2,2,1,Oakvale,89300.0
77.0,3,14,1,Harbour,261600.0
157.0,5,81,1,Fernhill,277400.0
174.0,7,68,1,Harbour,619800.0
67.0,2,10,0,Stonebridge,156100.0
98.0,3,28,1,Fernhill,214000.0
111.0,2,64,1,Oakvale,217600.0
172.0,5,87,0,Fernhill,279500.0
93.0,4,41,1,Oakvale,216500.0
93.0,5,113,1,Oakvale,253700.0
164.0,6,119,0,Stonebridge,367300.0
97.0,3,91,1,Oakvale,181000.0
135.0,4,54,1,Stonebridge,315300.0
58.0,2,105,1,Fernhill,88100.0
104.0,2,87,1,Oakvale,197700.0
52.0,2,62,0,Fernhill,47000.0
73.0,3,53,1,Oakvale,157600.0
139.0,5,99,1,Fernhill,214300.0
108.0,3,66,0,Fernhill,154300.0
99.0,4,21,0,Stonebridge,290800.0
84.0,3,119,1,Fernhill,171400.0
102.0,3,8,1,Harbour,351400.0
121.0,6,83,0,Fernhill,198800.0
144.0,5,78,0,Stonebridge,326900.0
35.0,2,70,0,Stonebridge,60200.0
81.0,1,6,1,Fernhill,153600.0
116.0,5,59,1,Oakvale,292200.0
107.0,5,107,0,Fernhill,213100.0
`;

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The Learning Machine", topic: "features & labels, train/test split, fit/predict/score, baselines", time: 600, icon: "⚙️",
      intro: "In the Automaton Empire, machines learn from examples. Every learning machine is built the same way: data in, a model out, judged on data it has never seen.",
      missions: [
        {
          id: "ml1-1", title: "Features and Labels",
          story: "King Turing's first machine must learn to tell three kinds of flowers apart. First, prepare its lessons.",
          lesson: `<p><b>Supervised learning</b>: show a model many examples with the right answer, and it learns to predict answers for new examples.</p>
            <ul><li><b>X</b> (features): a 2-D table, one row per example, one column per measurement</li>
            <li><b>y</b> (labels/target): the answer for each row</li>
            <li>Hold some data back as a <b>test set</b>, so you can check the model on examples it never saw: <code>train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)</code></li>
            <li><code>random_state</code> makes the shuffle repeatable; <code>stratify=y</code> keeps the class proportions the same in both parts</li></ul>
            <p><b>scikit-learn</b> (<code>sklearn</code>) is Python's machine-learning toolkit, with famous datasets built in. (It's a big download the first time, about 70 MB with SciPy.)</p>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split

            X, y = load_iris(return_X_y=True)
            print(X.shape, y.shape, X[0], y[:5])
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
            print(Xtr.shape, Xte.shape)`,
          task: `Write:<br>• <code>load()</code> → <code>(X, y)</code> of the iris dataset (<code>load_iris(return_X_y=True)</code>)<br>
            • <code>split(X, y)</code> → <code>train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)</code> (returns Xtr, Xte, ytr, yte)<br>
            • <code>class_counts(y)</code> → a dict <code>{label: how many}</code> with plain ints`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split

            def load():
                pass

            def split(X, y):
                pass

            def class_counts(y):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split

            def load():
                return load_iris(return_X_y=True)

            def split(X, y):
                return train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

            def class_counts(y):
                vals, counts = np.unique(y, return_counts=True)
                return {int(v): int(c) for v, c in zip(vals, counts)}`,
          hints: ["load_iris(return_X_y=True)", "train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)", "class_counts: np.unique(y, return_counts=True)"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            ld = expect_func("load"); sp = expect_func("split"); cc = expect_func("class_counts")
            X, y = ld()
            expect_equal(X.shape, (150, 4), "X.shape"); expect_equal(y.shape, (150,), "y.shape")
            parts = sp(X, y)
            ref = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            for got, want, name in zip(parts, ref, ["Xtr", "Xte", "ytr", "yte"]):
                expect_array(np.asarray(got), want, name)
            expect_equal(cc(y), {0: 50, 1: 50, 2: 50}, "class_counts(y)")
            vals, cnts = np.unique(ref[3], return_counts=True)
            got = cc(parts[3])
            expect_equal(got, {int(v): int(c) for v, c in zip(vals, cnts)}, "class_counts(yte)")
            assert max(got.values()) - min(got.values()) <= 1, "stratify should keep the classes balanced in the test set"` }],
        },
        {
          id: "ml1-2", title: "The Fit-Predict Spell",
          story: "Every machine in the Empire obeys the same three commands: fit, predict, score.",
          lesson: `<p>Every scikit-learn model has the same interface:</p>
            <ul><li><code>model = DecisionTreeClassifier(max_depth=3, random_state=0)</code>: choose a model and its settings (<b>hyperparameters</b>)</li>
            <li><code>model.fit(Xtr, ytr)</code>: learn from the training data</li>
            <li><code>model.predict(X)</code>: predict labels for new rows</li>
            <li><code>model.score(Xte, yte)</code>: accuracy (the fraction correct) for classifiers</li></ul>
            <p>To predict one example, pass a 2-D array with one row: <code>model.predict([[5.1, 3.5, 1.4, 0.2]])</code>.</p>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.tree import DecisionTreeClassifier

            X, y = load_iris(return_X_y=True)
            model = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X, y)
            print(model.predict([[5.1, 3.5, 1.4, 0.2], [6.7, 3.0, 5.2, 2.3]]))`,
          task: `Write:<br>• <code>train(Xtr, ytr)</code> → a fitted <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code><br>
            • <code>test_accuracy(model, Xte, yte)</code> → the accuracy on the test data<br>
            • <code>predict_one(model, sample)</code> → the predicted label (a plain int) for a single sample (a list of 4 numbers)`,
          starter: d`
            from sklearn.tree import DecisionTreeClassifier

            def train(Xtr, ytr):
                pass

            def test_accuracy(model, Xte, yte):
                pass

            def predict_one(model, sample):
                return model.predict(sample)
            `,
          solution: d`
            from sklearn.tree import DecisionTreeClassifier

            def train(Xtr, ytr):
                return DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)

            def test_accuracy(model, Xte, yte):
                return float(model.score(Xte, yte))

            def predict_one(model, sample):
                return int(model.predict([sample])[0])`,
          hints: ["DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr) returns the fitted model", "model.score(Xte, yte)", "predict_one: model.predict([sample])[0] (a list holding one row)"],
          tests: [{ code: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            tr = expect_func("train"); ta = expect_func("test_accuracy"); po = expect_func("predict_one")
            X, y = load_iris(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            m = tr(Xtr, ytr)
            assert isinstance(m, DecisionTreeClassifier) and m.get_depth() <= 3, "train should return a fitted DecisionTreeClassifier with max_depth=3."
            ref = DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)
            expect_close(ta(m, Xte, yte), ref.score(Xte, yte), "test_accuracy")
            expect_equal(po(m, [5.1, 3.5, 1.4, 0.2]), 0, "predict_one(a setosa)")
            expect_equal(po(m, [6.7, 3.0, 5.2, 2.3]), int(ref.predict([[6.7, 3.0, 5.2, 2.3]])[0]), "predict_one(a virginica)")` }],
        },
        {
          id: "ml1-3", title: "The Honest Baseline",
          story: "A machine boasts 63% accuracy. Impressive? Not if always guessing \"benign\" scores the same.",
          lesson: `<p>Always compare a model with a <b>baseline</b>: the score of a trivial strategy. For classification, predicting the most common class: <code>DummyClassifier(strategy="most_frequent")</code>.</p>
            <p>If your model barely beats the baseline, it hasn't learned much, however good its number sounds.</p>
            <p>Accuracy is just the share of correct predictions: <code>(y_true == y_pred).mean()</code>.</p>`,
          example: d`
            import numpy as np
            from sklearn.dummy import DummyClassifier

            y = np.array([0, 0, 0, 1, 0, 1, 0, 0])
            d = DummyClassifier(strategy="most_frequent").fit(np.zeros((8, 1)), y)
            print(d.predict(np.zeros((3, 1))), d.score(np.zeros((8, 1)), y))`,
          task: `Write:<br>• <code>accuracy(y_true, y_pred)</code> → the share of correct predictions, by hand (no sklearn)<br>
            • <code>baseline_accuracy(Xtr, ytr, Xte, yte)</code> → the test accuracy of a <code>DummyClassifier(strategy="most_frequent")</code> trained on the training data<br>
            • <code>lift_over_baseline(model_acc, base_acc)</code> → how many percentage points the model beats the baseline by: (model_acc − base_acc) × 100`,
          starter: d`
            import numpy as np
            from sklearn.dummy import DummyClassifier

            def accuracy(y_true, y_pred):
                pass

            def baseline_accuracy(Xtr, ytr, Xte, yte):
                pass

            def lift_over_baseline(model_acc, base_acc):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.dummy import DummyClassifier

            def accuracy(y_true, y_pred):
                return float((np.asarray(y_true) == np.asarray(y_pred)).mean())

            def baseline_accuracy(Xtr, ytr, Xte, yte):
                return float(DummyClassifier(strategy="most_frequent").fit(Xtr, ytr).score(Xte, yte))

            def lift_over_baseline(model_acc, base_acc):
                return (model_acc - base_acc) * 100`,
          hints: ["accuracy: (np.asarray(y_true) == np.asarray(y_pred)).mean()", "DummyClassifier(strategy=\"most_frequent\").fit(Xtr, ytr).score(Xte, yte)", "lift: (model_acc - base_acc) * 100"],
          tests: [{ code: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            ac = expect_func("accuracy"); ba = expect_func("baseline_accuracy"); lo = expect_func("lift_over_baseline")
            must_not_call("accuracy_score")
            expect_close(ac([1, 0, 1, 1], [1, 1, 1, 0]), 0.5, "accuracy([1 0 1 1], [1 1 1 0])")
            expect_close(ac([2, 2], [2, 2]), 1.0, "accuracy when all correct")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            expect_close(ba(Xtr, ytr, Xte, yte), (yte == 1).mean(), "baseline_accuracy on breast cancer (always 'benign' = 1)")
            expect_close(lo(0.95, 0.63), 32.0, "lift_over_baseline(0.95, 0.63)")` }],
        },
        {
          id: "ml1-4", type: "quiz", title: "Riddles of the Machine",
          story: "King Turing's engineers ask the questions every machine-builder must answer.",
          lesson: `<p><b>Classification</b> predicts categories; <b>regression</b> predicts numbers. A model that's great on training data but poor on test data has <b>overfitted</b>: it memorised instead of learning. Never fit anything on the test set.</p>`,
          questions: [
            { q: "Predicting tomorrow's price of grain (in gold coins) is…",
              choices: ["regression", "classification", "clustering", "a baseline"], answer: 0, explain: "The answer is a number on a continuous scale." },
            { q: "Predicting whether an email is spam is…",
              choices: ["classification", "regression", "dimensionality reduction", "a test split"], answer: 0, explain: "The answer is one of a few categories." },
            { q: "A model scores 100% on its training data but 62% on the test data. What happened?",
              choices: ["it overfitted: it memorised the training examples", "it underfitted", "the test set is too big", "nothing, 100% is perfect"], answer: 0,
              explain: "The gap between training and test performance is the sign of overfitting." },
            { q: "Why set <code>random_state=0</code> in <code>train_test_split</code>?",
              choices: ["to get the same split every time, so results can be reproduced", "to make the model more accurate", "to put the first rows in the test set", "to remove randomness from the model itself"], answer: 0,
              explain: "Without it, each run shuffles differently and results change." },
            { q: "Where may you look at the test set while building a model?",
              choices: ["only at the very end, to measure the final model", "whenever you want", "while choosing features", "while tuning settings"], answer: 0,
              explain: "Every peek leaks information. Use the training data (or cross-validation) for decisions, the test set once." },
          ],
        },
        {
          id: "ml1-5", boss: true, time: 900, title: "The First Automaton",
          story: "King Turing's first automaton must sort wines from three vineyards. Report everything the engineers need to trust it.",
          lesson: `<p>A first model report should include the data's size, the model's test score, a <b>baseline</b> to compare with, and the <b>training</b> score, to spot overfitting.</p>
            <p><code>load_wine(return_X_y=True)</code> gives 178 wines with 13 chemical measurements each, from 3 vineyards.</p>`,
          example: d`
            from sklearn.datasets import load_wine

            X, y = load_wine(return_X_y=True)
            print(X.shape, set(y))`,
          task: `Write <code>wine_report()</code>: load the wine data, split with <code>test_size=0.3, random_state=1, stratify=y</code>, train a <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> and a most-frequent <code>DummyClassifier</code>. Return a dict:<br>
            <code>"n_train"</code>, <code>"n_test"</code>, <code>"n_features"</code>, <code>"n_classes"</code>, <code>"train_acc"</code> and <code>"test_acc"</code> (the tree), <code>"baseline_acc"</code> (the dummy, on the test set), and <code>"overfit_gap"</code> (train_acc − test_acc). Round the four accuracies/gap to 3 decimals.`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.dummy import DummyClassifier

            def wine_report():
                X, y = load_wine(return_X_y=True)
                return {}
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.dummy import DummyClassifier

            def wine_report():
                X, y = load_wine(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
                tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)
                dummy = DummyClassifier(strategy="most_frequent").fit(Xtr, ytr)
                train_acc, test_acc = tree.score(Xtr, ytr), tree.score(Xte, yte)
                return {"n_train": len(ytr), "n_test": len(yte), "n_features": X.shape[1], "n_classes": len(np.unique(y)),
                        "train_acc": round(train_acc, 3), "test_acc": round(test_acc, 3),
                        "baseline_acc": round(dummy.score(Xte, yte), 3), "overfit_gap": round(train_acc - test_acc, 3)}`,
          hints: ["Split, then fit both models on the training part", "train_acc = tree.score(Xtr, ytr); test_acc = tree.score(Xte, yte)", "n_classes: len(np.unique(y))"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.dummy import DummyClassifier
            wr = expect_func("wine_report")
            X, y = load_wine(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
            t = DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)
            a, b = t.score(Xtr, ytr), t.score(Xte, yte)
            want = {"n_train": 124, "n_test": 54, "n_features": 13, "n_classes": 3, "train_acc": round(a, 3), "test_acc": round(b, 3),
                    "baseline_acc": round(DummyClassifier(strategy="most_frequent").fit(Xtr, ytr).score(Xte, yte), 3), "overfit_gap": round(a - b, 3)}
            got = wr()
            for k in ("n_train", "n_test", "n_features", "n_classes"):
                expect_equal(got.get(k), want[k], k)
            expect_close({k: got.get(k) for k in ("train_acc", "test_acc", "baseline_acc", "overfit_gap")}, {k: want[k] for k in ("train_acc", "test_acc", "baseline_acc", "overfit_gap")}, "accuracies")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Straight Path", topic: "linear regression, error metrics, polynomial features & overfitting", time: 600, icon: "📏",
      intro: "Some automatons predict numbers: prices, harvests, disease progression. The simplest and most useful is the straight line.",
      missions: [
        {
          id: "ml2-1", title: "Draw the Best Line",
          story: "The royal physicians want to predict how a disease progresses from ten measurements of a patient.",
          lesson: `<p><code>LinearRegression()</code> fits <code>ŷ = b₀ + b₁x₁ + … + bₖxₖ</code> by least squares (as in the Statistics realm, now in one line):</p>
            <ul><li><code>model.coef_</code> → b₁…bₖ; <code>model.intercept_</code> → b₀</li>
            <li><code>model.score(X, y)</code> → R² for regressors</li></ul>
            <p>The <b>diabetes</b> dataset (<code>load_diabetes</code>) has 442 patients, 10 features (already scaled) and a measure of disease progression one year later.</p>`,
          example: d`
            from sklearn.datasets import load_diabetes
            from sklearn.linear_model import LinearRegression

            data = load_diabetes()
            print(data.feature_names)
            m = LinearRegression().fit(data.data, data.target)
            print(m.intercept_.round(1), m.coef_.round(1))`,
          task: `Write:<br>• <code>fit_diabetes()</code> → load the diabetes data, split with <code>test_size=0.2, random_state=0</code>, fit a <code>LinearRegression</code> on the training part and return <code>(model, test_r2)</code><br>
            • <code>strongest_feature(model, names)</code> → the feature name whose coefficient has the largest <b>absolute</b> value`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_diabetes
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression

            def fit_diabetes():
                pass

            def strongest_feature(model, names):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_diabetes
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression

            def fit_diabetes():
                X, y = load_diabetes(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
                model = LinearRegression().fit(Xtr, ytr)
                return model, float(model.score(Xte, yte))

            def strongest_feature(model, names):
                return names[int(np.argmax(np.abs(model.coef_)))]`,
          hints: ["load_diabetes(return_X_y=True), then train_test_split(..., test_size=0.2, random_state=0)", "model.score(Xte, yte) is R²", "strongest: names[np.argmax(np.abs(model.coef_))]"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_diabetes
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression
            fd = expect_func("fit_diabetes"); sf = expect_func("strongest_feature")
            X, y = load_diabetes(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
            ref = LinearRegression().fit(Xtr, ytr)
            m, r2 = fd()
            expect_array(np.asarray(m.coef_), ref.coef_, "the model's coefficients")
            expect_close(r2, ref.score(Xte, yte), "test R²")
            names = load_diabetes().feature_names
            expect_equal(sf(ref, names), names[int(np.argmax(np.abs(ref.coef_)))], "strongest_feature")` }],
        },
        {
          id: "ml2-2", title: "Measure the Error",
          story: "\"How wrong is it, on average?\" the physicians ask. R² alone doesn't answer that.",
          lesson: `<p>Regression metrics in <code>sklearn.metrics</code>:</p>
            <ul><li><code>mean_absolute_error</code> (MAE): the average size of a miss, in the target's units</li>
            <li><code>mean_squared_error</code> (MSE): punishes big misses more; its square root (<b>RMSE</b>) is back in the target's units</li>
            <li><code>r2_score</code>: the share of variation explained</li></ul>
            <p>The regression <b>baseline</b> predicts the training mean for everyone. A useful model must beat its RMSE.</p>`,
          example: d`
            import numpy as np
            from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

            y, p = np.array([3.0, 5, 7]), np.array([2.5, 5.5, 8])
            print(mean_absolute_error(y, p), mean_squared_error(y, p) ** 0.5, r2_score(y, p))`,
          task: `Write:<br>• <code>regression_metrics(y_true, y_pred)</code> → a dict <code>{"mae", "rmse", "r2"}</code> using <code>sklearn.metrics</code><br>
            • <code>baseline_rmse(ytr, yte)</code> → the RMSE on <code>yte</code> of always predicting the mean of <code>ytr</code>`,
          starter: d`
            import numpy as np
            from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

            def regression_metrics(y_true, y_pred):
                pass

            def baseline_rmse(ytr, yte):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

            def regression_metrics(y_true, y_pred):
                return {"mae": float(mean_absolute_error(y_true, y_pred)),
                        "rmse": float(np.sqrt(mean_squared_error(y_true, y_pred))),
                        "r2": float(r2_score(y_true, y_pred))}

            def baseline_rmse(ytr, yte):
                guess = np.full(len(yte), np.mean(ytr))
                return float(np.sqrt(mean_squared_error(yte, guess)))`,
          hints: ["rmse = np.sqrt(mean_squared_error(y_true, y_pred))", "baseline: predict np.mean(ytr) for every test row"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_diabetes
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression
            rm = expect_func("regression_metrics"); br = expect_func("baseline_rmse")
            expect_close(rm(np.array([3.0, 5, 7]), np.array([2.5, 5.5, 8])), {"mae": 2 / 3, "rmse": np.sqrt(1.5 / 3), "r2": 1 - 1.5 / 8}, "regression_metrics on a tiny example")
            X, y = load_diabetes(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=0)
            p = LinearRegression().fit(Xtr, ytr).predict(Xte)
            got = rm(yte, p)
            expect_close(got["r2"], 1 - ((yte - p) ** 2).sum() / ((yte - yte.mean()) ** 2).sum(), "r2 on diabetes")
            b = br(ytr, yte)
            expect_close(b, np.sqrt(((yte - ytr.mean()) ** 2).mean()), "baseline_rmse on diabetes")
            assert got["rmse"] < b, "The model's RMSE should beat the baseline's."` }],
        },
        {
          id: "ml2-3", title: "Bend the Line",
          story: "The harvest doesn't grow in a straight line. Bend the model, but not so much that it starts chasing noise.",
          lesson: `<p><code>PolynomialFeatures(degree=d)</code> adds x², x³, … as extra features, so a <b>linear</b> model can fit curves. Chain the steps with a <b>pipeline</b>: <code>make_pipeline(PolynomialFeatures(3), LinearRegression())</code>.</p>
            <p>Too low a degree <b>underfits</b> (misses the shape). Too high a degree <b>overfits</b>: the training score keeps rising while the test score falls, because the model learns the noise. This trade-off is the <b>bias–variance trade-off</b>.</p>`,
          example: d`
            import numpy as np
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import PolynomialFeatures
            from sklearn.linear_model import LinearRegression

            x = np.linspace(0, 1, 20).reshape(-1, 1); y = np.sin(2 * np.pi * x).ravel()
            for d in (1, 3, 9):
                m = make_pipeline(PolynomialFeatures(d), LinearRegression()).fit(x, y)
                print(d, round(m.score(x, y), 3))`,
          task: `The starter makes noisy data and splits it. Write:<br>• <code>poly_scores(degree)</code> → a tuple <code>(train_r2, test_r2)</code> for a pipeline of <code>PolynomialFeatures(degree)</code> and <code>LinearRegression()</code> fitted on the training data<br>
            • <code>best_degree(degrees)</code> → the degree (from the list) with the highest <b>test</b> R²`,
          starter: d`
            import numpy as np
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import PolynomialFeatures
            from sklearn.linear_model import LinearRegression
            from sklearn.model_selection import train_test_split

            rng = np.random.default_rng(0)
            x = rng.uniform(0, 1, 60).reshape(-1, 1)
            y = np.sin(2 * np.pi * x).ravel() + rng.normal(0, 0.3, 60)
            Xtr, Xte, ytr, yte = train_test_split(x, y, test_size=0.4, random_state=0)

            def poly_scores(degree):
                pass

            def best_degree(degrees):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import PolynomialFeatures
            from sklearn.linear_model import LinearRegression
            from sklearn.model_selection import train_test_split

            rng = np.random.default_rng(0)
            x = rng.uniform(0, 1, 60).reshape(-1, 1)
            y = np.sin(2 * np.pi * x).ravel() + rng.normal(0, 0.3, 60)
            Xtr, Xte, ytr, yte = train_test_split(x, y, test_size=0.4, random_state=0)

            def poly_scores(degree):
                m = make_pipeline(PolynomialFeatures(degree), LinearRegression()).fit(Xtr, ytr)
                return (float(m.score(Xtr, ytr)), float(m.score(Xte, yte)))

            def best_degree(degrees):
                return max(degrees, key=lambda d: poly_scores(d)[1])`,
          hints: ["m = make_pipeline(PolynomialFeatures(degree), LinearRegression()).fit(Xtr, ytr)", "(m.score(Xtr, ytr), m.score(Xte, yte))", "best_degree: max(degrees, key=lambda d: poly_scores(d)[1])"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import PolynomialFeatures
            from sklearn.linear_model import LinearRegression
            from sklearn.model_selection import train_test_split
            ps = expect_func("poly_scores"); bd = expect_func("best_degree")
            rng = np.random.default_rng(0); x = rng.uniform(0, 1, 60).reshape(-1, 1); y = np.sin(2 * np.pi * x).ravel() + rng.normal(0, 0.3, 60)
            Xtr, Xte, ytr, yte = train_test_split(x, y, test_size=0.4, random_state=0)
            def ref(d):
                m = make_pipeline(PolynomialFeatures(d), LinearRegression()).fit(Xtr, ytr); return (m.score(Xtr, ytr), m.score(Xte, yte))
            for d in (1, 3, 12):
                expect_close(ps(d), ref(d), "poly_scores(" + str(d) + ")")
            assert ps(12)[0] > ps(3)[0], "A higher degree should always fit the training data at least as well."
            expect_equal(bd([1, 2, 3, 5, 9, 12]), max([1, 2, 3, 5, 9, 12], key=lambda d: ref(d)[1]), "best_degree([1, 2, 3, 5, 9, 12])")` }],
        },
        {
          id: "ml2-4", type: "quiz", title: "Riddles of the Line",
          story: "The engineers' riddles about lines, errors and curves.",
          lesson: `<p>R² compares a model with always predicting the mean (R² = 0). RMSE is in the target's units. A coefficient's size depends on its feature's units, so compare coefficients only when the features are on the same scale.</p>`,
          questions: [
            { q: "A model's test R² is negative. What does that mean?",
              choices: ["it's worse than always predicting the average", "it's impossible: R² is always between 0 and 1", "it's perfect", "the features are negative"], answer: 0,
              explain: "On new data R² can drop below 0, meaning the model is worse than the simplest baseline." },
            { q: "House prices are in gold. In which unit is the RMSE?",
              choices: ["gold", "gold squared", "percent", "no unit"], answer: 0,
              explain: "MSE is in gold², and its square root brings it back to gold." },
            { q: "As the polynomial degree goes from 1 to 15, the training R² keeps rising but the test R² falls after degree 4. What's happening?",
              choices: ["overfitting: the model starts fitting the noise", "underfitting", "the test set is broken", "the data has no pattern"], answer: 0,
              explain: "Training performance always improves with flexibility; test performance tells the truth." },
            { q: "A price model has coef 2,000 for size in m² and 9,000 for the number of rooms. Is the number of rooms \"more important\"?",
              choices: ["not necessarily: the features have different units and ranges", "yes, its coefficient is larger", "no, size is always more important", "only if R² is high"], answer: 0,
              explain: "One extra room and one extra m² are very different changes. Standardise features before comparing coefficients." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                from sklearn.linear_model import LinearRegression
                X = np.array([[0.0], [1.0], [2.0]])
                m = LinearRegression().fit(X, [1.0, 3.0, 5.0])
                print(round(m.coef_[0], 2), round(m.intercept_, 2), m.predict([[10.0]]).round(2))`,
              choices: ["2.0 1.0 [21.]", "1.0 2.0 [12.]", "2.0 1.0 [20.]", "2.0 0.0 [20.]"], answer: 0,
              explain: "The points lie exactly on y = 1 + 2x, so at x = 10 the prediction is 21." },
          ],
        },
        {
          id: "ml2-5", boss: true, time: 900, title: "The House Appraiser",
          story: "The Empire's tax office needs an automaton that values houses fairly, and explains its valuations.",
          lesson: `<p>A good regression report: the test errors in real units (RMSE, MAE), R², the baseline, and an <b>interpretable</b> coefficient (here: how much each extra m² adds, holding the others fixed).</p>
            <p>To predict one house, pass a one-row DataFrame with the same columns as the training data.</p>`,
          example: d`
            import pandas as pd

            houses = pd.read_csv("houses.csv")
            print(houses.head())
            print(houses.describe().round(1))`,
          files: { "houses.csv": HOUSES },
          task: `From <code>houses.csv</code>, use the features <code>size, rooms, age, garden</code> to predict <code>price</code>. Split with <code>test_size=0.25, random_state=7</code> and fit a <code>LinearRegression</code>. Write <code>appraise()</code> returning a dict:<br>
            <code>"r2"</code>, <code>"rmse"</code>, <code>"mae"</code> (on the test set), <code>"baseline_rmse"</code> (predicting the training mean), <code>"per_m2"</code> (the coefficient of size) and <code>"example"</code> (the predicted price of a house with size 120, 4 rooms, age 10, garden 1). Round everything to 1 decimal.`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression
            from sklearn.metrics import mean_absolute_error, mean_squared_error

            FEATURES = ["size", "rooms", "age", "garden"]

            def appraise():
                houses = pd.read_csv("houses.csv")
                return {}
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression
            from sklearn.metrics import mean_absolute_error, mean_squared_error

            FEATURES = ["size", "rooms", "age", "garden"]

            def appraise():
                houses = pd.read_csv("houses.csv")
                X, y = houses[FEATURES], houses["price"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=7)
                m = LinearRegression().fit(Xtr, ytr)
                p = m.predict(Xte)
                example = pd.DataFrame([[120, 4, 10, 1]], columns=FEATURES)
                return {
                    "r2": round(float(m.score(Xte, yte)), 1),
                    "rmse": round(float(np.sqrt(mean_squared_error(yte, p))), 1),
                    "mae": round(float(mean_absolute_error(yte, p)), 1),
                    "baseline_rmse": round(float(np.sqrt(((yte - ytr.mean()) ** 2).mean())), 1),
                    "per_m2": round(float(m.coef_[0]), 1),
                    "example": round(float(m.predict(example)[0]), 1),
                }`,
          hints: ["X = houses[FEATURES], y = houses[\"price\"]", "The coefficient of size is m.coef_[0] (size is the first feature)", "example = pd.DataFrame([[120, 4, 10, 1]], columns=FEATURES)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.linear_model import LinearRegression
            ap = expect_func("appraise")
            F = ["size", "rooms", "age", "garden"]
            h = pd.read_csv("houses.csv"); Xtr, Xte, ytr, yte = train_test_split(h[F], h.price, test_size=0.25, random_state=7)
            m = LinearRegression().fit(Xtr, ytr); p = m.predict(Xte)
            want = {"r2": round(m.score(Xte, yte), 1), "rmse": round(np.sqrt(((yte - p) ** 2).mean()), 1), "mae": round(np.abs(yte - p).mean(), 1),
                    "baseline_rmse": round(np.sqrt(((yte - ytr.mean()) ** 2).mean()), 1), "per_m2": round(m.coef_[0], 1),
                    "example": round(m.predict(pd.DataFrame([[120, 4, 10, 1]], columns=F))[0], 1)}
            expect_close(ap(), want, "appraise()", tol=1e-4)` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Yes-or-No Gate", topic: "logistic regression, probabilities, thresholds & decision boundaries", time: 600, icon: "🚦",
      intro: "Many questions have two answers: sick or healthy, spam or not, returns or doesn't. The gate-keeper's automaton answers with a probability.",
      missions: [
        {
          id: "ml3-1", title: "Probabilities, Not Just Answers",
          story: "The royal physicians examine tumours. The automaton must say how likely each one is to be benign, not just guess.",
          lesson: `<p><b>Logistic regression</b> is a classifier: it computes a weighted sum of the features and squeezes it through the sigmoid into a probability between 0 and 1.</p>
            <ul><li><code>model.predict_proba(X)</code> → one column per class; <code>[:, 1]</code> is the probability of class 1</li>
            <li><code>model.predict(X)</code> → class 1 when that probability is ≥ 0.5</li>
            <li>Logistic regression works best with <b>scaled</b> features: <code>make_pipeline(StandardScaler(), LogisticRegression())</code></li></ul>
            <p>The <b>breast cancer</b> dataset: 569 tumours, 30 measurements, target 1 = benign, 0 = malignant.</p>`,
          example: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            X, y = load_breast_cancer(return_X_y=True)
            m = make_pipeline(StandardScaler(), LogisticRegression()).fit(X, y)
            print(m.predict_proba(X[:3]).round(3), m.predict(X[:3]))`,
          task: `Write:<br>• <code>fit_cancer()</code> → load the breast cancer data, split with <code>test_size=0.25, random_state=0, stratify=y</code>, fit <code>make_pipeline(StandardScaler(), LogisticRegression())</code> on the training part, return <code>(model, Xte, yte)</code><br>
            • <code>benign_probability(model, X)</code> → the probability of class 1 for every row<br>
            • <code>most_uncertain(model, X)</code> → the index of the row whose probability is closest to 0.5`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def fit_cancer():
                pass

            def benign_probability(model, X):
                pass

            def most_uncertain(model, X):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def fit_cancer():
                X, y = load_breast_cancer(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                model = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr)
                return model, Xte, yte

            def benign_probability(model, X):
                return model.predict_proba(X)[:, 1]

            def most_uncertain(model, X):
                return int(np.argmin(np.abs(benign_probability(model, X) - 0.5)))`,
          hints: ["make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr)", "predict_proba(X)[:, 1]", "most_uncertain: np.argmin(np.abs(p - 0.5))"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            fc = expect_func("fit_cancer"); bp = expect_func("benign_probability"); mu = expect_func("most_uncertain")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ref = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr)
            m, xt, yt = fc()
            expect_array(np.asarray(xt), Xte, "Xte"); expect_array(np.asarray(yt), yte, "yte")
            p = bp(m, Xte)
            expect_array(np.asarray(p), ref.predict_proba(Xte)[:, 1], "benign_probability on the test set")
            expect_equal(mu(m, Xte), int(np.argmin(np.abs(ref.predict_proba(Xte)[:, 1] - 0.5))), "most_uncertain")` }],
        },
        {
          id: "ml3-2", title: "Move the Threshold",
          story: "Missing a malignant tumour is far worse than a false alarm. The physicians want to be more cautious than 50/50.",
          lesson: `<p><code>predict</code> uses a <b>threshold</b> of 0.5. You can choose another: <code>(proba &gt;= t).astype(int)</code>.</p>
            <ul><li>A <b>higher</b> threshold for "benign" (class 1) means fewer tumours are called benign: fewer dangerous misses, more extra checks</li>
            <li>The right threshold depends on the <b>cost</b> of each kind of mistake, not on maths alone</li></ul>`,
          example: d`
            import numpy as np

            proba = np.array([0.95, 0.7, 0.55, 0.3, 0.1])
            for t in (0.5, 0.8):
                print(t, (proba >= t).astype(int))`,
          task: `Write:<br>• <code>predict_at(proba, t)</code> → 1 where proba ≥ t, else 0 (an int array)<br>
            • <code>missed_malignant(y_true, proba, t)</code> → how many malignant tumours (y = 0) are predicted benign (1) at threshold t<br>
            • <code>safest_threshold(y_true, proba, thresholds)</code> → the <b>smallest</b> threshold from the list that misses no malignant tumour at all (<code>None</code> if none does)`,
          starter: d`
            import numpy as np

            def predict_at(proba, t):
                pass

            def missed_malignant(y_true, proba, t):
                pass

            def safest_threshold(y_true, proba, thresholds):
                pass
            `,
          solution: d`
            import numpy as np

            def predict_at(proba, t):
                return (np.asarray(proba) >= t).astype(int)

            def missed_malignant(y_true, proba, t):
                y = np.asarray(y_true)
                return int(((y == 0) & (predict_at(proba, t) == 1)).sum())

            def safest_threshold(y_true, proba, thresholds):
                for t in sorted(thresholds):
                    if missed_malignant(y_true, proba, t) == 0:
                        return t
                return None`,
          hints: ["predict_at: (proba >= t).astype(int)", "missed: (y == 0) & (prediction == 1), then .sum()", "Try the thresholds from small to large; return the first with no misses"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            pa = expect_func("predict_at"); mm = expect_func("missed_malignant"); st = expect_func("safest_threshold")
            expect_array(np.asarray(pa([0.95, 0.7, 0.55, 0.3], 0.6)), [1, 1, 0, 0], "predict_at(…, 0.6)")
            y = np.array([1, 0, 1, 0, 0]); p = np.array([0.9, 0.6, 0.7, 0.2, 0.45])
            expect_equal(mm(y, p, 0.5), 1, "missed_malignant at 0.5"); expect_equal(mm(y, p, 0.65), 0, "missed_malignant at 0.65")
            expect_equal(st(y, p, [0.9, 0.5, 0.65, 0.8]), 0.65, "safest_threshold")
            expect_equal(st(np.array([0, 1]), np.array([0.99, 0.5]), [0.5, 0.9]), None, "safest_threshold when nothing works")
            X, Y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, Y, test_size=0.25, random_state=0, stratify=Y)
            pr = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr).predict_proba(Xte)[:, 1]
            ts = [0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99]
            want = next((t for t in ts if (((yte == 0) & (pr >= t)).sum() == 0)), None)
            expect_equal(st(yte, pr, ts), want, "safest_threshold on the real tumours")` }],
        },
        {
          id: "ml3-3", title: "The Sigmoid Inside",
          story: "The physicians don't trust black boxes. Open the gate-keeper and compute its answer by hand.",
          lesson: `<p>Inside, logistic regression computes <code>z = b + w₁x₁ + w₂x₂ + …</code> (<code>model.intercept_</code>, <code>model.coef_</code>), then <code>p = 1 / (1 + e^(−z))</code>.</p>
            <p>With two features, the <b>decision boundary</b> (where p = 0.5, i.e. z = 0) is a straight line: <code>x₂ = −(b + w₁x₁) / w₂</code>. Everything on one side is class 1, the other side class 0.</p>`,
          example: d`
            import numpy as np
            from sklearn.linear_model import LogisticRegression

            X = np.array([[1.0, 1], [2, 1], [4, 5], [5, 4]]); y = np.array([0, 0, 1, 1])
            m = LogisticRegression().fit(X, y)
            z = X @ m.coef_[0] + m.intercept_[0]
            print(1 / (1 + np.exp(-z)))
            print(m.predict_proba(X)[:, 1])`,
          task: `<code>model</code> is a plain <code>LogisticRegression</code> (no pipeline) fitted on two features. Write:<br>
            • <code>manual_proba(model, X)</code> → the probability of class 1 computed by hand from <code>coef_</code> and <code>intercept_</code><br>
            • <code>boundary_x2(model, x1)</code> → the x₂ on the decision boundary for a given x₁<br>
            • <code>side(model, point)</code> → 1 if the point is on the class-1 side (z ≥ 0), else 0, by hand`,
          starter: d`
            import numpy as np

            def manual_proba(model, X):
                return model.predict_proba(X)[:, 1]

            def boundary_x2(model, x1):
                pass

            def side(model, point):
                pass
            `,
          solution: d`
            import numpy as np

            def manual_proba(model, X):
                z = np.asarray(X) @ model.coef_[0] + model.intercept_[0]
                return 1 / (1 + np.exp(-z))

            def boundary_x2(model, x1):
                w1, w2 = model.coef_[0]
                return -(model.intercept_[0] + w1 * x1) / w2

            def side(model, point):
                z = np.dot(point, model.coef_[0]) + model.intercept_[0]
                return int(z >= 0)`,
          hints: ["z = X @ model.coef_[0] + model.intercept_[0]; p = 1 / (1 + np.exp(-z))", "boundary: w1, w2 = model.coef_[0]; x2 = -(b + w1 * x1) / w2", "side: compute z for the point and compare with 0"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.linear_model import LogisticRegression
            must_not_call("predict_proba")
            mp = expect_func("manual_proba"); bx = expect_func("boundary_x2"); sd = expect_func("side")
            rng = np.random.default_rng(1)
            X = np.vstack([rng.normal([1, 1], 1, (40, 2)), rng.normal([4, 3], 1, (40, 2))]); y = np.array([0] * 40 + [1] * 40)
            m = LogisticRegression().fit(X, y)
            expect_array(np.asarray(mp(m, X[:10])), m.predict_proba(X[:10])[:, 1], "manual_proba")
            x2 = bx(m, 2.0)
            expect_close(float(m.predict_proba([[2.0, x2]])[0, 1]), 0.5, "the probability on the boundary should be 0.5")
            expect_equal([sd(m, p) for p in X[:6]], [int(v) for v in m.predict(X[:6])], "side for six points")` }],
        },
        {
          id: "ml3-4", type: "quiz", title: "Riddles of the Gate",
          story: "The gate-keeper's riddles about probabilities and thresholds.",
          lesson: `<p>A logistic model's output is a probability. The threshold turns it into a decision, and moving the threshold trades one kind of mistake for the other.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                z = np.array([-2.0, 0.0, 2.0])
                print((1 / (1 + np.exp(-z))).round(3))`,
              choices: ["[0.119 0.5   0.881]", "[0.    0.5   1.   ]", "[-2.  0.  2.]", "[0.881 0.5   0.119]"], answer: 0,
              explain: "The sigmoid maps 0 to 0.5 and is symmetric: σ(−2) = 1 − σ(2)." },
            { q: "You raise the threshold for predicting \"spam\" from 0.5 to 0.9. What happens?",
              choices: ["fewer emails are called spam: fewer false alarms, more spam slips through", "more emails are called spam", "accuracy always improves", "nothing changes"], answer: 0,
              explain: "A stricter threshold makes positive predictions rarer." },
            { q: "Why is logistic regression usually put after a <code>StandardScaler</code>?",
              choices: ["features on very different scales make training slow and the coefficients hard to compare", "it can't run without it", "scaling makes it non-linear", "to remove outliers"], answer: 0,
              explain: "The optimiser works best when the features have similar ranges." },
            { q: "With two features, what shape is a logistic regression's decision boundary?",
              choices: ["a straight line", "a circle", "any curve", "a staircase"], answer: 0,
              explain: "z = 0 is a linear equation in x₁ and x₂. For curved boundaries you need extra features or another model." },
            { q: "<code>predict_proba</code> returns <code>[[0.3, 0.7]]</code> for one tumour. What does <code>predict</code> return (default threshold)?",
              choices: ["[1]", "[0]", "[0.7]", "[0.3]"], answer: 0,
              explain: "The probability of class 1 (0.7) is above 0.5." },
          ],
        },
        {
          id: "ml3-5", boss: true, time: 900, title: "The Dragon's Pass",
          story: "Adventurers cross the Dragon's Pass every day. Not all return. The guild wants to predict who will, and why.",
          lesson: `<p>A complete classification report: test accuracy vs a baseline, a probability for an individual case, and which features matter most.</p>
            <p>After a <code>StandardScaler</code>, the coefficients are per standard deviation, so their absolute sizes can be compared. Reach them through the pipeline: <code>model[-1].coef_</code>.</p>`,
          example: d`
            import pandas as pd

            adv = pd.read_csv("adventurers.csv")
            print(adv.head())
            print(adv["returned"].mean().round(3))`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `From <code>adventurers.csv</code>, use the features <code>level, has_map, party, gold</code> to predict <code>returned</code>. Split with <code>test_size=0.25, random_state=3, stratify=y</code>, and fit <code>make_pipeline(StandardScaler(), LogisticRegression())</code>. Write <code>pass_report()</code> returning a dict:<br>
            <code>"accuracy"</code> (test), <code>"baseline"</code> (most-frequent dummy, test), <code>"p_example"</code> (the probability of returning for level 20, has_map 1, party 4, gold 300) and <code>"top_feature"</code> (the feature with the largest absolute coefficient). Round numbers to 3 decimals.`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.dummy import DummyClassifier

            FEATURES = ["level", "has_map", "party", "gold"]

            def pass_report():
                adv = pd.read_csv("adventurers.csv")
                return {}
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.dummy import DummyClassifier

            FEATURES = ["level", "has_map", "party", "gold"]

            def pass_report():
                adv = pd.read_csv("adventurers.csv")
                X, y = adv[FEATURES], adv["returned"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
                model = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr)
                base = DummyClassifier(strategy="most_frequent").fit(Xtr, ytr)
                example = pd.DataFrame([[20, 1, 4, 300]], columns=FEATURES)
                coefs = model[-1].coef_[0]
                return {"accuracy": round(float(model.score(Xte, yte)), 3),
                        "baseline": round(float(base.score(Xte, yte)), 3),
                        "p_example": round(float(model.predict_proba(example)[0, 1]), 3),
                        "top_feature": FEATURES[int(np.argmax(np.abs(coefs)))]}`,
          hints: ["X = adv[FEATURES]; y = adv[\"returned\"]", "model[-1] is the LogisticRegression inside the pipeline", "example = pd.DataFrame([[20, 1, 4, 300]], columns=FEATURES); model.predict_proba(example)[0, 1]"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.dummy import DummyClassifier
            pr = expect_func("pass_report")
            F = ["level", "has_map", "party", "gold"]
            a = pd.read_csv("adventurers.csv"); Xtr, Xte, ytr, yte = train_test_split(a[F], a.returned, test_size=0.25, random_state=3, stratify=a.returned)
            m = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr)
            want = {"accuracy": round(m.score(Xte, yte), 3), "baseline": round(DummyClassifier(strategy="most_frequent").fit(Xtr, ytr).score(Xte, yte), 3),
                    "p_example": round(m.predict_proba(pd.DataFrame([[20, 1, 4, 300]], columns=F))[0, 1], 3), "top_feature": F[int(np.argmax(np.abs(m[-1].coef_[0])))]}
            got = pr()
            expect_equal(got.get("top_feature"), want["top_feature"], "top_feature")
            expect_close({k: got.get(k) for k in ("accuracy", "baseline", "p_example")}, {k: want[k] for k in ("accuracy", "baseline", "p_example")}, "numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Judge's Scales", topic: "confusion matrix, precision, recall, F1, ROC-AUC & imbalanced classes", time: 600, icon: "⚖️",
      intro: "Accuracy can lie. The Judge weighs every kind of mistake separately before declaring a machine fit for duty.",
      missions: [
        {
          id: "ml4-1", title: "The Confusion Table",
          story: "The Judge wants every decision of the automaton sorted into four boxes: right and wrong, yes and no.",
          lesson: `<p>For a yes/no classifier (1 = positive), every prediction is one of four kinds:</p>
            <ul><li><b>TP</b> true positive: predicted 1, really 1; <b>TN</b> true negative: predicted 0, really 0</li>
            <li><b>FP</b> false positive (false alarm): predicted 1, really 0; <b>FN</b> false negative (miss): predicted 0, really 1</li></ul>
            <p>Together they form the <b>confusion matrix</b>. sklearn's <code>confusion_matrix(y, p)</code> returns <code>[[TN, FP], [FN, TP]]</code>.</p>`,
          example: d`
            import numpy as np
            from sklearn.metrics import confusion_matrix

            y = np.array([1, 0, 1, 1, 0, 0]); p = np.array([1, 0, 0, 1, 1, 0])
            print(confusion_matrix(y, p))
            print(((y == 1) & (p == 1)).sum(), "true positives")`,
          task: `Write, <b>by hand</b> (no <code>confusion_matrix</code>):<br>• <code>confusion(y_true, y_pred)</code> → a dict <code>{"tp", "tn", "fp", "fn"}</code> of ints<br>
            • <code>accuracy_from(c)</code> → (tp + tn) ÷ total, from such a dict`,
          starter: d`
            import numpy as np

            def confusion(y_true, y_pred):
                pass

            def accuracy_from(c):
                pass
            `,
          solution: d`
            import numpy as np

            def confusion(y_true, y_pred):
                y, p = np.asarray(y_true), np.asarray(y_pred)
                return {"tp": int(((y == 1) & (p == 1)).sum()), "tn": int(((y == 0) & (p == 0)).sum()),
                        "fp": int(((y == 0) & (p == 1)).sum()), "fn": int(((y == 1) & (p == 0)).sum())}

            def accuracy_from(c):
                return (c["tp"] + c["tn"]) / (c["tp"] + c["tn"] + c["fp"] + c["fn"])`,
          hints: ["tp: ((y == 1) & (p == 1)).sum(), and similarly for the others", "accuracy = (tp + tn) / (tp + tn + fp + fn)"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.metrics import confusion_matrix
            must_not_call("confusion_matrix")
            co = expect_func("confusion"); af = expect_func("accuracy_from")
            y = np.array([1, 0, 1, 1, 0, 0, 1]); p = np.array([1, 0, 0, 1, 1, 0, 1])
            expect_equal(co(y, p), {"tp": 3, "tn": 2, "fp": 1, "fn": 1}, "confusion(y, p)")
            expect_close(af({"tp": 3, "tn": 2, "fp": 1, "fn": 1}), 5 / 7, "accuracy_from")
            rng = np.random.default_rng(0); yy = rng.integers(0, 2, 200); pp = rng.integers(0, 2, 200)
            (tn, fp), (fn, tp) = confusion_matrix(yy, pp)
            expect_equal(co(yy, pp), {"tp": int(tp), "tn": int(tn), "fp": int(fp), "fn": int(fn)}, "confusion on 200 random labels")` }],
        },
        {
          id: "ml4-2", title: "Precision and Recall",
          story: "\"When it raises the alarm, is it right?\" asks one judge. \"Does it catch every case?\" asks the other.",
          lesson: `<ul><li><b>Precision</b> = TP / (TP + FP): of everything flagged positive, the share that really is</li>
            <li><b>Recall</b> = TP / (TP + FN): of all real positives, the share that was caught</li>
            <li><b>F1</b> = 2 · P · R / (P + R): the harmonic mean, high only when both are high</li></ul>
            <p>They pull against each other: flag more cases → recall up, precision down. Screening for a deadly disease favours <b>recall</b>; a spam filter that hides real mail must favour <b>precision</b>.</p>`,
          example: d`
            from sklearn.metrics import precision_score, recall_score, f1_score

            y = [1, 0, 1, 1, 0, 0, 1]; p = [1, 0, 0, 1, 1, 0, 1]
            print(precision_score(y, p), recall_score(y, p), f1_score(y, p))`,
          task: `Write <code>prf(y_true, y_pred)</code> → a tuple <code>(precision, recall, f1)</code> computed <b>by hand</b> from the counts. If a denominator is 0, that value is 0.0.`,
          starter: d`
            import numpy as np

            def prf(y_true, y_pred):
                pass
            `,
          solution: d`
            import numpy as np

            def prf(y_true, y_pred):
                y, p = np.asarray(y_true), np.asarray(y_pred)
                tp = ((y == 1) & (p == 1)).sum()
                fp = ((y == 0) & (p == 1)).sum()
                fn = ((y == 1) & (p == 0)).sum()
                precision = tp / (tp + fp) if tp + fp else 0.0
                recall = tp / (tp + fn) if tp + fn else 0.0
                f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
                return (float(precision), float(recall), float(f1))`,
          hints: ["Count tp, fp and fn with masks", "precision = tp / (tp + fp), recall = tp / (tp + fn)", "Guard each division: if the denominator is 0, use 0.0"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.metrics import precision_score, recall_score, f1_score
            for f in ("precision_score", "recall_score", "f1_score"):
                must_not_call(f)
            pr = expect_func("prf")
            y = [1, 0, 1, 1, 0, 0, 1]; p = [1, 0, 0, 1, 1, 0, 1]
            expect_close(pr(y, p), (0.75, 0.75, 0.75), "prf(y, p)")
            expect_close(pr([1, 1, 0], [0, 0, 0]), (0.0, 0.0, 0.0), "prf when nothing is flagged")
            rng = np.random.default_rng(4); yy = rng.integers(0, 2, 300); pp = np.where(rng.random(300) < 0.8, yy, 1 - yy)
            expect_close(pr(yy, pp), (precision_score(yy, pp), recall_score(yy, pp), f1_score(yy, pp)), "prf on 300 labels (matches sklearn)")` }],
        },
        {
          id: "ml4-3", title: "The ROC Curve",
          story: "Each threshold gives a different trade-off. The Judge wants one number that judges them all.",
          lesson: `<p>As the threshold slides from 1 down to 0, the model flags more and more cases. The <b>ROC curve</b> plots recall (the true positive rate) against the false positive rate at every threshold.</p>
            <p>The <b>AUC</b> (area under that curve) summarises it: 1.0 = perfect ranking, 0.5 = random guessing. It's the probability that a random positive gets a higher score than a random negative. <code>roc_auc_score(y, proba)</code>.</p>`,
          example: d`
            from sklearn.metrics import roc_auc_score

            y = [0, 0, 1, 1]
            print(roc_auc_score(y, [0.1, 0.4, 0.35, 0.8]), roc_auc_score(y, [0.1, 0.2, 0.3, 0.4]))`,
          task: `Write:<br>• <code>auc(y, proba)</code> → the ROC-AUC (sklearn)<br>
            • <code>auc_by_pairs(y, proba)</code> → the same number computed by hand: over every (positive, negative) pair, the share where the positive's score is higher (a tie counts as half)<br>
            • <code>threshold_for_recall(y, proba, target)</code> → the <b>highest</b> threshold t (from the scores themselves) at which recall (proba ≥ t) is at least <code>target</code>`,
          starter: d`
            import numpy as np
            from sklearn.metrics import roc_auc_score

            def auc(y, proba):
                pass

            def auc_by_pairs(y, proba):
                pass

            def threshold_for_recall(y, proba, target):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.metrics import roc_auc_score

            def auc(y, proba):
                return float(roc_auc_score(y, proba))

            def auc_by_pairs(y, proba):
                y, s = np.asarray(y), np.asarray(proba, dtype=float)
                pos, neg = s[y == 1], s[y == 0]
                diff = pos[:, None] - neg[None, :]
                return float(((diff > 0) + 0.5 * (diff == 0)).mean())

            def threshold_for_recall(y, proba, target):
                y, s = np.asarray(y), np.asarray(proba, dtype=float)
                for t in sorted(np.unique(s), reverse=True):
                    if ((s >= t) & (y == 1)).sum() / (y == 1).sum() >= target:
                        return float(t)
                return float(s.min())`,
          hints: ["auc: roc_auc_score(y, proba)", "Pairs: compare every positive score with every negative score (broadcasting: pos[:, None] - neg[None, :])", "Thresholds: try the unique scores from high to low; return the first with enough recall"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.metrics import roc_auc_score
            au = expect_func("auc"); ap = expect_func("auc_by_pairs"); tr = expect_func("threshold_for_recall")
            y = [0, 0, 1, 1]; s = [0.1, 0.4, 0.35, 0.8]
            expect_close(au(y, s), 0.75, "auc"); expect_close(ap(y, s), 0.75, "auc_by_pairs")
            expect_close(ap([0, 1, 1], [0.5, 0.5, 0.9]), 0.75, "auc_by_pairs with a tie")
            rng = np.random.default_rng(2); yy = rng.integers(0, 2, 150); ss = yy * 0.3 + rng.random(150)
            expect_close(ap(yy, ss), roc_auc_score(yy, ss), "auc_by_pairs matches sklearn on 150 cases")
            expect_close(tr(y, s, 0.5), 0.8, "threshold_for_recall(target 0.5)")
            expect_close(tr(y, s, 1.0), 0.35, "threshold_for_recall(target 1.0)")` }],
        },
        {
          id: "ml4-4", type: "quiz", title: "Riddles of the Scales",
          story: "The Judge's riddles about mistakes that cost lives, or money.",
          lesson: `<p>With rare positives, accuracy rewards ignoring them. Choose metrics by the cost of each mistake: recall when misses are dangerous, precision when false alarms are costly.</p>`,
          questions: [
            { q: "1% of travellers carry the plague. A model always predicts \"healthy\". What's its accuracy, and its recall?",
              choices: ["99% accuracy, 0% recall", "1% accuracy, 100% recall", "99% accuracy, 99% recall", "50% accuracy, 50% recall"], answer: 0,
              explain: "The accuracy paradox: high accuracy, yet it catches no one. With imbalanced classes, look at recall and precision." },
            { q: "For screening a deadly but treatable disease, which matters most?",
              choices: ["recall: don't miss sick people (false alarms get a second test)", "precision", "accuracy", "the AUC of a different model"], answer: 0,
              explain: "A missed case is far worse than an extra check." },
            { q: "What does this print?", predict: true, code: d`
                p, r = 0.9, 0.1
                print(round(2 * p * r / (p + r), 2), (p + r) / 2)`,
              choices: ["0.18 0.5", "0.5 0.5", "0.18 0.18", "0.9 0.1"], answer: 0,
              explain: "F1 (the harmonic mean) stays low unless both are high; the ordinary average would hide the terrible recall." },
            { q: "A model's ROC-AUC is 0.5. What does it mean?",
              choices: ["it ranks cases no better than random guessing", "it's right half the time at any threshold", "it's perfect", "it's always wrong"], answer: 0,
              explain: "AUC 0.5 = a random ordering of positives and negatives." },
            { q: "Your filter hides emails it thinks are spam, and missing a real message from the Queen would be a disaster. What should you favour?",
              choices: ["precision for the spam class (only hide mail you're sure about)", "recall for the spam class", "accuracy", "a lower threshold"], answer: 0,
              explain: "Here a false positive (hiding real mail) is the costly mistake." },
          ],
        },
        {
          id: "ml4-5", boss: true, time: 900, title: "The Plague Screener",
          story: "Only 1 traveller in 20 carries the grey plague. The guards' automaton must catch them, and the Judge must decide which version to deploy.",
          lesson: `<p>With rare positives, a model trained normally leans towards predicting the majority. <code>LogisticRegression(class_weight="balanced")</code> makes mistakes on the rare class count more, usually trading precision for much better recall.</p>
            <p><code>sklearn.datasets.make_classification</code> generates a synthetic dataset; <code>weights=[0.95]</code> makes 95% of it class 0.</p>`,
          example: d`
            import numpy as np
            from sklearn.datasets import make_classification

            X, y = make_classification(n_samples=2000, n_features=8, weights=[0.95], random_state=3)
            print(X.shape, y.mean())`,
          task: `Generate <code>X, y = make_classification(n_samples=2000, n_features=8, n_informative=4, weights=[0.95], flip_y=0.01, random_state=3)</code> and split with <code>test_size=0.3, random_state=0, stratify=y</code>. Train two pipelines of <code>StandardScaler()</code> + <code>LogisticRegression()</code>: <b>plain</b>, and with <code>class_weight="balanced"</code>.<br>
            Write <code>screen_report()</code> returning <code>{"plain": {...}, "balanced": {...}, "deploy": …}</code>, where each inner dict has <code>"recall"</code>, <code>"precision"</code>, <code>"f1"</code> and <code>"auc"</code> on the test set (rounded to 3), and <code>"deploy"</code> is the name (<code>"plain"</code> or <code>"balanced"</code>) with the higher recall (the plague must not get through).`,
          starter: d`
            from sklearn.datasets import make_classification
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, precision_score, f1_score, roc_auc_score

            def screen_report():
                X, y = make_classification(n_samples=2000, n_features=8, n_informative=4, weights=[0.95], flip_y=0.01, random_state=3)
                return {}
            `,
          solution: d`
            from sklearn.datasets import make_classification
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, precision_score, f1_score, roc_auc_score

            def screen_report():
                X, y = make_classification(n_samples=2000, n_features=8, n_informative=4, weights=[0.95], flip_y=0.01, random_state=3)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
                report = {}
                for name, cw in (("plain", None), ("balanced", "balanced")):
                    m = make_pipeline(StandardScaler(), LogisticRegression(class_weight=cw)).fit(Xtr, ytr)
                    p = m.predict(Xte)
                    report[name] = {"recall": round(recall_score(yte, p), 3), "precision": round(precision_score(yte, p), 3),
                                    "f1": round(f1_score(yte, p), 3), "auc": round(roc_auc_score(yte, m.predict_proba(Xte)[:, 1]), 3)}
                report["deploy"] = max(("plain", "balanced"), key=lambda k: report[k]["recall"])
                return report`,
          hints: ["Loop over (\"plain\", None) and (\"balanced\", \"balanced\") as class_weight", "recall_score(yte, p) etc.; AUC needs probabilities: predict_proba(Xte)[:, 1]", "deploy: the name with the higher recall"],
          tests: [{ code: d`
            from sklearn.datasets import make_classification
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, precision_score, f1_score, roc_auc_score
            sr = expect_func("screen_report")
            X, y = make_classification(n_samples=2000, n_features=8, n_informative=4, weights=[0.95], flip_y=0.01, random_state=3)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
            want = {}
            for name, cw in (("plain", None), ("balanced", "balanced")):
                m = make_pipeline(StandardScaler(), LogisticRegression(class_weight=cw)).fit(Xtr, ytr); p = m.predict(Xte)
                want[name] = {"recall": round(recall_score(yte, p), 3), "precision": round(precision_score(yte, p), 3), "f1": round(f1_score(yte, p), 3), "auc": round(roc_auc_score(yte, m.predict_proba(Xte)[:, 1]), 3)}
            got = sr()
            for name in ("plain", "balanced"):
                expect_close(got.get(name), want[name], name + " metrics")
            expect_equal(got.get("deploy"), max(("plain", "balanced"), key=lambda k: want[k]["recall"]), "deploy")
            assert want["balanced"]["recall"] > want["plain"]["recall"], "(self-check) balanced weights should raise recall"` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 5
    {
      id: 5, name: "The Neighbours", topic: "k-nearest neighbours, distances & feature scaling", time: 600, icon: "🏘️",
      intro: "\"Tell me who your neighbours are, and I'll tell you who you are.\" The simplest learning machine of all simply asks the nearest examples.",
      missions: [
        {
          id: "ml5-1", title: "Ask the Neighbours",
          story: "To classify a new flower, look at the k most similar flowers already known, and let them vote.",
          lesson: `<p><b>k-nearest neighbours</b> (kNN) stores the training data. To predict, it finds the <code>k</code> closest training points (by distance) and takes a majority vote.</p>
            <ul><li><code>KNeighborsClassifier(n_neighbors=5)</code></li>
            <li>Small k → follows every quirk of the data (overfits); large k → too smooth (underfits)</li>
            <li>Choose k by checking several values (properly, with cross-validation: Floor 10)</li></ul>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier

            X, y = load_iris(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, random_state=0)
            for k in (1, 5, 25):
                print(k, KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte))`,
          task: `On iris, split with <code>test_size=0.25, random_state=0, stratify=y</code>. Write:<br>
            • <code>knn_accuracy(k)</code> → the test accuracy of <code>KNeighborsClassifier(n_neighbors=k)</code><br>
            • <code>best_k(ks)</code> → the k from the list with the highest accuracy (the smallest k on a tie)`,
          starter: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier

            X, y = load_iris(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

            def knn_accuracy(k):
                pass

            def best_k(ks):
                pass
            `,
          solution: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier

            X, y = load_iris(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

            def knn_accuracy(k):
                return float(KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte))

            def best_k(ks):
                return min(ks, key=lambda k: (-knn_accuracy(k), k))`,
          hints: ["KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte)", "best_k: min(ks, key=lambda k: (-knn_accuracy(k), k)) picks the highest accuracy, then the smallest k"],
          tests: [{ code: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            ka = expect_func("knn_accuracy"); bk = expect_func("best_k")
            X, y = load_iris(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ref = lambda k: KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte)
            for k in (1, 7, 40):
                expect_close(ka(k), ref(k), "knn_accuracy(" + str(k) + ")")
            ks = [1, 3, 5, 9, 15, 30, 60]
            expect_equal(bk(ks), min(ks, key=lambda k: (-ref(k), k)), "best_k(" + str(ks) + ")")` }],
        },
        {
          id: "ml5-2", title: "Distance by Hand",
          story: "King Turing insists every engineer builds one machine with their own hands. Build the neighbour-voter yourself.",
          lesson: `<p>kNN needs only NumPy:</p>
            <ol><li>Distances from the new point to every training point: <code>np.sqrt(((Xtr - x) ** 2).sum(axis=1))</code> (Euclidean)</li>
            <li>The indexes of the k smallest: <code>np.argsort(d)[:k]</code></li>
            <li>Majority vote of their labels: <code>np.bincount(labels).argmax()</code> (on a tie, the smallest label wins)</li></ol>`,
          example: d`
            import numpy as np

            Xtr = np.array([[0.0, 0], [1, 0], [5, 5], [6, 5]]); ytr = np.array([0, 0, 1, 1])
            x = np.array([4.5, 4.0])
            d = np.sqrt(((Xtr - x) ** 2).sum(axis=1))
            near = np.argsort(d)[:3]
            print(d.round(2), near, np.bincount(ytr[near]).argmax())`,
          task: `Write, with NumPy only:<br>• <code>distances(Xtr, x)</code> → the Euclidean distance from <code>x</code> to every row<br>
            • <code>knn_predict(Xtr, ytr, x, k)</code> → the majority label of the k nearest rows (smallest label on a tie)<br>
            • <code>knn_predict_many(Xtr, ytr, X, k)</code> → an array of predictions for every row of <code>X</code>`,
          starter: d`
            import numpy as np

            def distances(Xtr, x):
                pass

            def knn_predict(Xtr, ytr, x, k):
                pass

            def knn_predict_many(Xtr, ytr, X, k):
                pass
            `,
          solution: d`
            import numpy as np

            def distances(Xtr, x):
                return np.sqrt(((np.asarray(Xtr) - np.asarray(x)) ** 2).sum(axis=1))

            def knn_predict(Xtr, ytr, x, k):
                near = np.argsort(distances(Xtr, x), kind="stable")[:k]
                return int(np.bincount(np.asarray(ytr)[near]).argmax())

            def knn_predict_many(Xtr, ytr, X, k):
                return np.array([knn_predict(Xtr, ytr, x, k) for x in X])`,
          hints: ["distances: np.sqrt(((Xtr - x) ** 2).sum(axis=1))", "near = np.argsort(d)[:k]; vote = np.bincount(ytr[near]).argmax()", "knn_predict_many: loop over the rows of X"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_iris
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            dist = expect_func("distances"); kp = expect_func("knn_predict"); km = expect_func("knn_predict_many")
            assert "sklearn" not in __code__, "Build this one with NumPy only."
            expect_array(np.asarray(dist(np.array([[0.0, 0], [3, 4]]), np.array([0.0, 0]))), [0, 5], "distances")
            Xtr = np.array([[0.0, 0], [1, 0], [5, 5], [6, 5]]); ytr = np.array([0, 0, 1, 1])
            expect_equal(kp(Xtr, ytr, np.array([4.5, 4.0]), 3), 1, "knn_predict near the 1s")
            expect_equal(kp(Xtr, ytr, np.array([3.0, 2.5]), 4), 0, "knn_predict with a 2–2 tie (smallest label)")
            X, y = load_iris(return_X_y=True)
            Xa, Xb, ya, yb = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            mine = np.asarray(km(Xa, ya, Xb, 5))
            ref = KNeighborsClassifier(n_neighbors=5).fit(Xa, ya).predict(Xb)
            assert (mine == ref).mean() >= 0.97, "Your kNN should agree with sklearn's on (almost) every iris test flower; it agrees on " + str(round((mine == ref).mean() * 100)) + "%."` }],
        },
        {
          id: "ml5-3", title: "Scale Before Measuring",
          story: "One wine measurement is in the hundreds, another below 1. The neighbour-voter only listens to the loud one, unless you scale.",
          lesson: `<p>Distances add up the squared differences of every feature. A feature measured in thousands drowns out one measured in tenths, even if the small one matters more.</p>
            <p><code>StandardScaler</code> rescales each feature to mean 0 and standard deviation 1. Put it in a pipeline (<code>make_pipeline(StandardScaler(), KNeighborsClassifier())</code>) so it learns the scaling from the <b>training</b> data only.</p>
            <p>Distance-based models (kNN, k-means, SVMs) and gradient-based ones (logistic regression, neural networks) need scaling. Trees don't.</p>`,
          example: d`
            from sklearn.datasets import load_wine

            X, y = load_wine(return_X_y=True)
            print(X.min(axis=0).round(2))
            print(X.max(axis=0).round(2))`,
          task: `On the wine data split with <code>test_size=0.3, random_state=1, stratify=y</code>, write <code>compare_scaling(k=5)</code> → a tuple <code>(unscaled_accuracy, scaled_accuracy)</code> for <code>KNeighborsClassifier(n_neighbors=k)</code> without and with a <code>StandardScaler</code> in a pipeline.`,
          starter: d`
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler

            def compare_scaling(k=5):
                pass
            `,
          solution: d`
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler

            def compare_scaling(k=5):
                X, y = load_wine(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
                raw = KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte)
                scaled = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k)).fit(Xtr, ytr).score(Xte, yte)
                return (float(raw), float(scaled))`,
          hints: ["Unscaled: KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte)", "Scaled: make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))"],
          tests: [{ code: d`
            from sklearn.datasets import load_wine
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            cs = expect_func("compare_scaling")
            X, y = load_wine(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
            for k in (5, 11):
                want = (KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte), make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k)).fit(Xtr, ytr).score(Xte, yte))
                expect_close(cs(k), want, "compare_scaling(" + str(k) + ")")
            a, b = cs(5)
            assert b > a + 0.15, "Scaling should make a big difference on the wine data."` }],
        },
        {
          id: "ml5-4", type: "quiz", title: "Riddles of the Neighbours",
          story: "The neighbours' riddles about distance and votes.",
          lesson: `<p>kNN does no work during <code>fit</code> (it just stores the data) and all its work during <code>predict</code>. Its behaviour depends entirely on what "near" means, so feature scales matter.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                a, b = np.array([1.0, 2.0]), np.array([4.0, 6.0])
                print(np.sqrt(((a - b) ** 2).sum()))`,
              choices: ["5.0", "7.0", "25.0", "3.5"], answer: 0,
              explain: "√(3² + 4²) = 5: the Euclidean distance." },
            { q: "With <code>n_neighbors=1</code>, what's the accuracy on the <b>training</b> data (no duplicate points)?",
              choices: ["100%: each point's nearest neighbour is itself", "about 50%", "the same as on the test data", "0%"], answer: 0,
              explain: "That's why k = 1 overfits: it memorises the training set perfectly." },
            { q: "One feature is \"gold in coins\" (0–5000), another \"has a map\" (0 or 1). Without scaling, kNN will…",
              choices: ["mostly ignore \"has a map\": gold dominates every distance", "treat both equally", "ignore gold", "refuse to run"], answer: 0,
              explain: "A difference of 1 in has_map is nothing next to differences of hundreds of coins." },
            { q: "Which step of kNN is slow on huge datasets?",
              choices: ["predicting: it compares the new point with every training point", "fitting", "scaling", "nothing, it's always fast"], answer: 0,
              explain: "kNN is \"lazy\": training just stores data, prediction does all the work." },
            { q: "Why put the <code>StandardScaler</code> inside the pipeline instead of scaling all the data first?",
              choices: ["so the scaling is learned from the training data only, with no test information leaking in", "it's faster", "pipelines can't hold models otherwise", "to change the number of neighbours"], answer: 0,
              explain: "Scaling with the test set's mean and spread lets test information leak into training (data leakage)." },
          ],
        },
        {
          id: "ml5-5", boss: true, time: 900, title: "The Digit Readers",
          story: "The Empire's post office receives thousands of handwritten numbers. Teach an automaton to read them.",
          lesson: `<p><code>load_digits()</code> holds 1,797 handwritten digits, each an 8 × 8 image flattened to 64 pixel values (0–16). Every pixel is on the same scale, so no scaling is needed here.</p>
            <p>The off-diagonal cells of a confusion matrix show which digits get mixed up: <code>cm[i, j]</code> = how often true digit i was read as j.</p>`,
          example: d`
            from sklearn.datasets import load_digits

            d = load_digits()
            print(d.data.shape)
            print(d.images[0])`,
          task: `On the digits, split with <code>test_size=0.25, random_state=0, stratify=y</code>. Write <code>digits_report(ks)</code> returning a dict:<br>
            <code>"accuracy"</code>: <code>{k: test accuracy rounded to 4}</code> for each k in <code>ks</code> with <code>KNeighborsClassifier</code>; <code>"best_k"</code> (highest accuracy, the smallest k on a tie); and <code>"most_confused"</code>: for the best k, the pair <code>(true_digit, predicted_digit)</code> with the most mistakes (a tuple of ints; the first in row-major order on a tie).`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.metrics import confusion_matrix

            def digits_report(ks):
                X, y = load_digits(return_X_y=True)
                return {}
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.metrics import confusion_matrix

            def digits_report(ks):
                X, y = load_digits(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                acc = {k: round(float(KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte)), 4) for k in ks}
                best = min(ks, key=lambda k: (-acc[k], k))
                pred = KNeighborsClassifier(n_neighbors=best).fit(Xtr, ytr).predict(Xte)
                cm = confusion_matrix(yte, pred)
                np.fill_diagonal(cm, 0)
                i, j = np.unravel_index(np.argmax(cm), cm.shape)
                return {"accuracy": acc, "best_k": best, "most_confused": (int(i), int(j))}`,
          hints: ["A dict comprehension: {k: round(score, 4) for k in ks}", "Confusion matrix of the best model; zero the diagonal (correct answers) with np.fill_diagonal(cm, 0)", "np.unravel_index(np.argmax(cm), cm.shape) gives (row, column)"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.metrics import confusion_matrix
            dr = expect_func("digits_report")
            X, y = load_digits(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ks = [1, 3, 5, 7]
            acc = {k: round(KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr).score(Xte, yte), 4) for k in ks}
            best = min(ks, key=lambda k: (-acc[k], k))
            cm = confusion_matrix(yte, KNeighborsClassifier(n_neighbors=best).fit(Xtr, ytr).predict(Xte)); np.fill_diagonal(cm, 0)
            got = dr(ks)
            expect_close(got.get("accuracy"), acc, "accuracy per k")
            expect_equal(got.get("best_k"), best, "best_k")
            expect_equal(got.get("most_confused"), tuple(int(v) for v in np.unravel_index(np.argmax(cm), cm.shape)), "most_confused")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 6
    {
      id: 6, name: "The Forest of Trees", topic: "decision trees, depth & overfitting, random forests, feature importance", time: 660, icon: "🌲",
      intro: "In the Forest, every tree asks yes-or-no questions. One tree is easily fooled; a whole forest voting together is wise.",
      missions: [
        {
          id: "ml6-1", title: "The Question Tree",
          story: "A decision tree plays twenty questions with the data: \"Is the radius above 16?\" Then another question, and another…",
          lesson: `<p>A <b>decision tree</b> splits the data with the single question that best separates the classes, then repeats inside each branch.</p>
            <ul><li><code>max_depth</code> limits the number of questions in a row. Deeper trees fit the training data better, but too deep and they memorise noise (overfit)</li>
            <li>Trees need no scaling and are easy to explain</li>
            <li><code>tree.tree_.feature[0]</code> is the index of the feature used by the very first question (the root)</li></ul>`,
          example: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.tree import DecisionTreeClassifier, export_text

            data = load_breast_cancer()
            t = DecisionTreeClassifier(max_depth=2, random_state=0).fit(data.data, data.target)
            print(export_text(t, feature_names=list(data.feature_names)))`,
          task: `On the breast cancer data split with <code>test_size=0.25, random_state=0, stratify=y</code>, write:<br>
            • <code>depth_scores(depths)</code> → a list of tuples <code>(depth, train_accuracy, test_accuracy)</code> for <code>DecisionTreeClassifier(max_depth=depth, random_state=0)</code><br>
            • <code>root_feature()</code> → the <b>name</b> of the feature used by the root question of a depth-3 tree`,
          starter: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier

            data = load_breast_cancer()
            Xtr, Xte, ytr, yte = train_test_split(data.data, data.target, test_size=0.25, random_state=0, stratify=data.target)

            def depth_scores(depths):
                pass

            def root_feature():
                pass
            `,
          solution: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier

            data = load_breast_cancer()
            Xtr, Xte, ytr, yte = train_test_split(data.data, data.target, test_size=0.25, random_state=0, stratify=data.target)

            def depth_scores(depths):
                out = []
                for d in depths:
                    t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(Xtr, ytr)
                    out.append((d, float(t.score(Xtr, ytr)), float(t.score(Xte, yte))))
                return out

            def root_feature():
                t = DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)
                return str(data.feature_names[t.tree_.feature[0]])`,
          hints: ["Loop over the depths; fit a tree; record (d, train score, test score)", "root: data.feature_names[t.tree_.feature[0]]"],
          tests: [{ code: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            ds = expect_func("depth_scores"); rf = expect_func("root_feature")
            data = load_breast_cancer()
            Xtr, Xte, ytr, yte = train_test_split(data.data, data.target, test_size=0.25, random_state=0, stratify=data.target)
            want = []
            for d in (1, 3, 6, None):
                t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(Xtr, ytr); want.append((d, t.score(Xtr, ytr), t.score(Xte, yte)))
            got = ds([1, 3, 6, None])
            expect_equal([g[0] for g in got], [1, 3, 6, None], "depths in the result")
            expect_close([g[1:] for g in got], [w[1:] for w in want], "train and test accuracy per depth")
            expect_close(got[-1][1], 1.0, "an unlimited tree's training accuracy")
            t = DecisionTreeClassifier(max_depth=3, random_state=0).fit(Xtr, ytr)
            expect_equal(rf(), str(data.feature_names[t.tree_.feature[0]]), "root_feature")` }],
        },
        {
          id: "ml6-2", title: "Many Trees, One Forest",
          story: "One tree has a strong opinion and is often wrong. Two hundred trees, each seeing slightly different data, vote much better.",
          lesson: `<p>A <b>random forest</b> trains many trees, each on a random sample of the rows (<b>bagging</b>) and choosing among a random subset of features at each split. Their mistakes differ, so the vote cancels many of them out.</p>
            <p><code>RandomForestClassifier(n_estimators=200, random_state=0)</code>. Forests are one of the best "first serious models" for tables of data.</p>`,
          example: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.model_selection import train_test_split

            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, random_state=1)
            print(RandomForestClassifier(n_estimators=50, random_state=0).fit(Xtr, ytr).score(Xte, yte))`,
          task: `On the breast cancer data split with <code>test_size=0.25, random_state=2, stratify=y</code>, write <code>forest_vs_tree()</code> → a dict with <code>"tree"</code> (test accuracy of <code>DecisionTreeClassifier(random_state=0)</code>, unlimited depth), <code>"forest"</code> (<code>RandomForestClassifier(n_estimators=200, random_state=0)</code>) and <code>"gain"</code> (forest − tree), all rounded to 4.`,
          starter: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.ensemble import RandomForestClassifier

            def forest_vs_tree():
                pass
            `,
          solution: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.ensemble import RandomForestClassifier

            def forest_vs_tree():
                X, y = load_breast_cancer(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=2, stratify=y)
                tree = DecisionTreeClassifier(random_state=0).fit(Xtr, ytr).score(Xte, yte)
                forest = RandomForestClassifier(n_estimators=200, random_state=0).fit(Xtr, ytr).score(Xte, yte)
                return {"tree": round(float(tree), 4), "forest": round(float(forest), 4), "gain": round(float(forest - tree), 4)}`,
          hints: ["Split once, fit both models on the same training data", "gain = forest - tree"],
          tests: [{ code: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.tree import DecisionTreeClassifier
            from sklearn.ensemble import RandomForestClassifier
            fv = expect_func("forest_vs_tree")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=2, stratify=y)
            t = DecisionTreeClassifier(random_state=0).fit(Xtr, ytr).score(Xte, yte); f = RandomForestClassifier(n_estimators=200, random_state=0).fit(Xtr, ytr).score(Xte, yte)
            expect_close(fv(), {"tree": round(t, 4), "forest": round(f, 4), "gain": round(f - t, 4)}, "forest_vs_tree()")` }],
        },
        {
          id: "ml6-3", title: "What the Forest Sees",
          story: "The physicians ask the forest: which measurements did you rely on most?",
          lesson: `<p><code>forest.feature_importances_</code> gives each feature a share of the total importance (they add up to 1): how much it reduced impurity across all the trees' splits.</p>
            <p>Use them to explain and explore, but carefully: correlated features split the credit between them, and features with many distinct values can look more important than they are.</p>`,
          example: d`
            import numpy as np
            from sklearn.datasets import load_wine
            from sklearn.ensemble import RandomForestClassifier

            data = load_wine()
            f = RandomForestClassifier(n_estimators=100, random_state=0).fit(data.data, data.target)
            order = np.argsort(f.feature_importances_)[::-1]
            print([data.feature_names[i] for i in order[:3]], f.feature_importances_.sum())`,
          task: `Fit <code>RandomForestClassifier(n_estimators=200, random_state=0)</code> on the <b>whole</b> breast cancer dataset. Write:<br>
            • <code>top_features(k)</code> → a list of the k most important feature names, most important first<br>
            • <code>importance_share(k)</code> → the total importance of those top k features (rounded to 3)`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.ensemble import RandomForestClassifier

            data = load_breast_cancer()

            def top_features(k):
                pass

            def importance_share(k):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.ensemble import RandomForestClassifier

            data = load_breast_cancer()
            forest = RandomForestClassifier(n_estimators=200, random_state=0).fit(data.data, data.target)
            order = np.argsort(forest.feature_importances_)[::-1]

            def top_features(k):
                return [str(data.feature_names[i]) for i in order[:k]]

            def importance_share(k):
                return round(float(forest.feature_importances_[order[:k]].sum()), 3)`,
          hints: ["Fit the forest once, outside the functions", "order = np.argsort(forest.feature_importances_)[::-1] (most important first)", "share: forest.feature_importances_[order[:k]].sum()"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.ensemble import RandomForestClassifier
            tf = expect_func("top_features"); ish = expect_func("importance_share")
            data = load_breast_cancer()
            f = RandomForestClassifier(n_estimators=200, random_state=0).fit(data.data, data.target)
            o = np.argsort(f.feature_importances_)[::-1]
            expect_equal(tf(5), [str(data.feature_names[i]) for i in o[:5]], "top_features(5)")
            expect_close(ish(5), round(f.feature_importances_[o[:5]].sum(), 3), "importance_share(5)")
            expect_close(ish(30), 1.0, "all importances add up to 1")` }],
        },
        {
          id: "ml6-4", type: "quiz", title: "Riddles of the Forest",
          story: "The forest-keepers' riddles about trees and their votes.",
          lesson: `<p>Trees split on thresholds, so feature scale doesn't matter. Unlimited trees memorise the training set. Forests reduce that variance by averaging many different trees.</p>`,
          questions: [
            { q: "Do decision trees need feature scaling?",
              choices: ["no: a split like \"gold &gt; 300\" works the same whatever the units", "yes, always", "only for regression", "only random forests do"], answer: 0,
              explain: "Trees compare one feature with a threshold; rescaling just moves the threshold." },
            { q: "An unlimited-depth tree scores 100% on training data and 91% on test data. A depth-3 tree scores 95% and 94%. Which do you trust more?",
              choices: ["the depth-3 tree: smaller gap, better test score", "the unlimited tree: it's perfect on training", "they're equal", "neither"], answer: 0,
              explain: "Judge by the test score; the large gap shows the deep tree overfitted." },
            { q: "Why does a random forest train each tree on a random sample of rows and features?",
              choices: ["so the trees make different mistakes, which cancel out in the vote", "to make training slower", "to use less memory only", "so every tree is identical"], answer: 0,
              explain: "Averaging many diverse, overfitted trees reduces the variance." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                from sklearn.tree import DecisionTreeClassifier
                X = np.array([[1], [2], [3], [10], [11], [12]]); y = np.array([0, 0, 0, 1, 1, 1])
                t = DecisionTreeClassifier(random_state=0).fit(X, y)
                print(t.get_depth(), t.tree_.threshold[0], t.predict([[7], [6]]))`,
              choices: ["1 6.5 [1 0]", "2 6.5 [1 0]", "1 7.0 [1 1]", "1 6.5 [0 0]"], answer: 0,
              explain: "One question separates the classes perfectly: \"x ≤ 6.5\" (midway between 3 and 10)." },
            { q: "Two features are almost copies of each other (radius and perimeter). What happens to their feature importances?",
              choices: ["the credit is split between them, so each can look less important than it really is", "both get full credit", "the forest crashes", "one is always exactly 0"], answer: 0,
              explain: "Correlated features share importance, so read importances with care." },
          ],
        },
        {
          id: "ml6-5", boss: true, time: 960, title: "The Pass Revisited",
          story: "The guild asks again: who returns from the Dragon's Pass? This time, let three automatons compete for the job.",
          lesson: `<p>Comparing several models on the <b>same</b> split is the everyday work of machine learning. Keep a baseline in the line-up, and report which features the winning model relied on.</p>`,
          example: d`
            import pandas as pd

            adv = pd.read_csv("adventurers.csv")
            print(adv[["level", "has_map", "party", "gold", "returned"]].corr()["returned"].round(3))`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `From <code>adventurers.csv</code>, use <code>level, has_map, party, gold</code> to predict <code>returned</code>; split with <code>test_size=0.25, random_state=3, stratify=y</code>. Compare: a most-frequent <code>DummyClassifier</code> (<code>"dummy"</code>), <code>make_pipeline(StandardScaler(), LogisticRegression())</code> (<code>"logistic"</code>) and <code>RandomForestClassifier(n_estimators=300, min_samples_leaf=5, random_state=0)</code> (<code>"forest"</code>).<br>
            Write <code>compete()</code> → a dict: <code>"scores"</code> (<code>{name: test accuracy rounded to 3}</code>), <code>"winner"</code> (the best name; on a tie, the first in the order dummy, logistic, forest) and <code>"forest_top"</code> (the forest's most important feature).`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.dummy import DummyClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier

            FEATURES = ["level", "has_map", "party", "gold"]

            def compete():
                adv = pd.read_csv("adventurers.csv")
                return {}
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.dummy import DummyClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier

            FEATURES = ["level", "has_map", "party", "gold"]

            def compete():
                adv = pd.read_csv("adventurers.csv")
                X, y = adv[FEATURES], adv["returned"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
                models = {
                    "dummy": DummyClassifier(strategy="most_frequent"),
                    "logistic": make_pipeline(StandardScaler(), LogisticRegression()),
                    "forest": RandomForestClassifier(n_estimators=300, min_samples_leaf=5, random_state=0),
                }
                scores = {name: round(float(m.fit(Xtr, ytr).score(Xte, yte)), 3) for name, m in models.items()}
                winner = max(models, key=lambda n: scores[n])
                top = FEATURES[int(np.argmax(models["forest"].feature_importances_))]
                return {"scores": scores, "winner": winner, "forest_top": top}`,
          hints: ["Put the three models in a dict and loop: fit on the training part, score on the test part", "max over the names in order picks the first one on a tie", "forest_top: FEATURES[np.argmax(forest.feature_importances_)]"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.dummy import DummyClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            cp = expect_func("compete")
            F = ["level", "has_map", "party", "gold"]
            a = pd.read_csv("adventurers.csv"); Xtr, Xte, ytr, yte = train_test_split(a[F], a.returned, test_size=0.25, random_state=3, stratify=a.returned)
            ms = {"dummy": DummyClassifier(strategy="most_frequent"), "logistic": make_pipeline(StandardScaler(), LogisticRegression()),
                  "forest": RandomForestClassifier(n_estimators=300, min_samples_leaf=5, random_state=0)}
            sc = {n: round(m.fit(Xtr, ytr).score(Xte, yte), 3) for n, m in ms.items()}
            got = cp()
            expect_close(got.get("scores"), sc, "scores")
            expect_equal(got.get("winner"), max(ms, key=lambda n: sc[n]), "winner")
            expect_equal(got.get("forest_top"), F[int(np.argmax(ms["forest"].feature_importances_))], "forest_top")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 7
    {
      id: 7, name: "The Unlabelled Lands", topic: "k-means clustering, inertia, silhouette & scaling", time: 600, icon: "🗺️",
      intro: "Beyond the Spire lie lands where no one knows the right answers. Here machines must discover groups on their own: unsupervised learning.",
      missions: [
        {
          id: "ml7-1", title: "Find the Clusters",
          story: "A traveller brings 150 flowers with no names. Can the machine discover that there are three kinds?",
          lesson: `<p><b>Clustering</b> groups similar rows without any labels. <b>k-means</b>:</p>
            <ol><li>Place k centres</li><li>Assign every point to its nearest centre</li><li>Move each centre to the mean of its points</li><li>Repeat until nothing changes</li></ol>
            <p><code>KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)</code>; <code>.labels_</code> gives each row's cluster, <code>.cluster_centers_</code> the centres. The cluster numbers are arbitrary names: cluster 0 isn't "the first species".</p>`,
          example: d`
            import numpy as np
            from sklearn.cluster import KMeans

            X = np.array([[1.0, 1], [1.2, 0.8], [5, 5], [5.1, 4.9], [9, 1], [8.8, 1.2]])
            km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
            print(km.labels_, km.cluster_centers_.round(2))`,
          task: `Write:<br>• <code>cluster(X, k)</code> → the cluster labels from <code>KMeans(n_clusters=k, n_init=10, random_state=0)</code><br>
            • <code>cluster_sizes(labels)</code> → a list of the cluster sizes, largest first<br>
            • <code>iris_sizes()</code> → the cluster sizes for the iris features with k = 3`,
          starter: d`
            import numpy as np
            from sklearn.cluster import KMeans
            from sklearn.datasets import load_iris

            def cluster(X, k):
                pass

            def cluster_sizes(labels):
                pass

            def iris_sizes():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.cluster import KMeans
            from sklearn.datasets import load_iris

            def cluster(X, k):
                return KMeans(n_clusters=k, n_init=10, random_state=0).fit(X).labels_

            def cluster_sizes(labels):
                return sorted(np.bincount(labels).tolist(), reverse=True)

            def iris_sizes():
                X, _ = load_iris(return_X_y=True)
                return cluster_sizes(cluster(X, 3))`,
          hints: ["KMeans(n_clusters=k, n_init=10, random_state=0).fit(X).labels_", "sizes: np.bincount(labels), sorted from large to small", "iris_sizes: only X is used, the labels are ignored"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.cluster import KMeans
            from sklearn.datasets import load_iris
            cl = expect_func("cluster"); cs = expect_func("cluster_sizes"); isz = expect_func("iris_sizes")
            X = np.array([[1.0, 1], [1.2, 0.8], [5, 5], [5.1, 4.9], [9, 1], [8.8, 1.2]])
            lab = np.asarray(cl(X, 3))
            assert lab[0] == lab[1] and lab[2] == lab[3] and lab[4] == lab[5] and len(set(lab)) == 3, "cluster should find the three obvious pairs."
            expect_equal(cs(np.array([0, 2, 2, 1, 2, 0])), [3, 2, 1], "cluster_sizes")
            Xi, _ = load_iris(return_X_y=True)
            expect_equal(isz(), sorted(np.bincount(KMeans(n_clusters=3, n_init=10, random_state=0).fit(Xi).labels_).tolist(), reverse=True), "iris_sizes()")` }],
        },
        {
          id: "ml7-2", title: "How Many Groups?",
          story: "Nobody told the machine how many kinds there are. It has to find a good k by itself.",
          lesson: `<ul><li><b>Inertia</b> (<code>km.inertia_</code>): the total squared distance from points to their centre. It always drops as k grows, so look for the <b>elbow</b> where it stops dropping fast</li>
            <li><b>Silhouette score</b> (<code>silhouette_score(X, labels)</code>, from −1 to 1): how much closer points are to their own cluster than to the next one. Pick the k with the highest silhouette</li></ul>`,
          example: d`
            from sklearn.datasets import make_blobs
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score

            X, _ = make_blobs(n_samples=200, centers=3, random_state=1)
            for k in (2, 3, 4):
                km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
                print(k, round(km.inertia_, 1), round(silhouette_score(X, km.labels_), 3))`,
          task: `With <code>KMeans(n_clusters=k, n_init=10, random_state=0)</code>, write:<br>
            • <code>inertias(X, ks)</code> → a list of the inertia for each k<br>
            • <code>silhouettes(X, ks)</code> → a list of the silhouette score for each k (every k ≥ 2)<br>
            • <code>best_k(X, ks)</code> → the k with the highest silhouette`,
          starter: d`
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score

            def inertias(X, ks):
                pass

            def silhouettes(X, ks):
                pass

            def best_k(X, ks):
                pass
            `,
          solution: d`
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score

            def _fit(X, k):
                return KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)

            def inertias(X, ks):
                return [float(_fit(X, k).inertia_) for k in ks]

            def silhouettes(X, ks):
                return [float(silhouette_score(X, _fit(X, k).labels_)) for k in ks]

            def best_k(X, ks):
                scores = silhouettes(X, ks)
                return ks[scores.index(max(scores))]`,
          hints: ["A helper that fits KMeans for a given k", "inertia: km.inertia_; silhouette: silhouette_score(X, km.labels_)", "best_k: the k at the position of the highest silhouette"],
          tests: [{ code: d`
            from sklearn.datasets import make_blobs
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score
            ine = expect_func("inertias"); sil = expect_func("silhouettes"); bk = expect_func("best_k")
            X, _ = make_blobs(n_samples=300, centers=4, cluster_std=1.0, random_state=7)
            ks = [2, 3, 4, 5, 6]
            fit = lambda k: KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
            expect_close(ine(X, ks), [fit(k).inertia_ for k in ks], "inertias")
            ref = [silhouette_score(X, fit(k).labels_) for k in ks]
            expect_close(sil(X, ks), ref, "silhouettes")
            expect_equal(bk(X, ks), ks[ref.index(max(ref))], "best_k")
            v = ine(X, ks); assert all(a >= b for a, b in zip(v, v[1:])), "Inertia should never rise as k grows."` }],
        },
        {
          id: "ml7-3", title: "Clusters vs Truth",
          story: "The wine experts know the real vineyards. How well did the unsupervised machine rediscover them, with and without scaling?",
          lesson: `<p>When true labels exist, compare clusters with them using the <b>adjusted Rand index</b> (<code>adjusted_rand_score(y, labels)</code>): 1 = identical groupings, about 0 = random. It doesn't care what the clusters are numbered.</p>
            <p>k-means uses distances, so unscaled features (one in the hundreds, others below 1) distort it, just like kNN.</p>`,
          example: d`
            from sklearn.metrics import adjusted_rand_score

            print(adjusted_rand_score([0, 0, 1, 1], [1, 1, 0, 0]), adjusted_rand_score([0, 0, 1, 1], [0, 1, 0, 1]))`,
          task: `On the wine data, write <code>wine_clusters()</code> → a dict <code>{"raw": ARI, "scaled": ARI}</code> (rounded to 3) comparing the true labels with <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code> clusters of the raw features, and of the features scaled with <code>StandardScaler().fit_transform(X)</code>.`,
          starter: d`
            from sklearn.datasets import load_wine
            from sklearn.cluster import KMeans
            from sklearn.preprocessing import StandardScaler
            from sklearn.metrics import adjusted_rand_score

            def wine_clusters():
                pass
            `,
          solution: d`
            from sklearn.datasets import load_wine
            from sklearn.cluster import KMeans
            from sklearn.preprocessing import StandardScaler
            from sklearn.metrics import adjusted_rand_score

            def wine_clusters():
                X, y = load_wine(return_X_y=True)
                raw = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X).labels_
                scaled = KMeans(n_clusters=3, n_init=10, random_state=0).fit(StandardScaler().fit_transform(X)).labels_
                return {"raw": round(float(adjusted_rand_score(y, raw)), 3), "scaled": round(float(adjusted_rand_score(y, scaled)), 3)}`,
          hints: ["Fit KMeans on X, then on StandardScaler().fit_transform(X)", "adjusted_rand_score(y, labels)"],
          tests: [{ code: d`
            from sklearn.datasets import load_wine
            from sklearn.cluster import KMeans
            from sklearn.preprocessing import StandardScaler
            from sklearn.metrics import adjusted_rand_score
            wc = expect_func("wine_clusters")
            X, y = load_wine(return_X_y=True)
            r = adjusted_rand_score(y, KMeans(n_clusters=3, n_init=10, random_state=0).fit(X).labels_)
            s = adjusted_rand_score(y, KMeans(n_clusters=3, n_init=10, random_state=0).fit(StandardScaler().fit_transform(X)).labels_)
            got = wc()
            expect_close(got, {"raw": round(r, 3), "scaled": round(s, 3)}, "wine_clusters()")
            assert got["scaled"] > got["raw"] + 0.3, "Scaling should make the clusters match the vineyards far better."` }],
        },
        {
          id: "ml7-4", type: "quiz", title: "Riddles of the Unlabelled",
          story: "The cartographers of the unlabelled lands ask their riddles.",
          lesson: `<p>Clustering finds structure but not meaning: you still have to look at each cluster and name it. k-means assumes round, similar-sized groups and needs k chosen in advance.</p>`,
          questions: [
            { q: "What makes clustering \"unsupervised\"?",
              choices: ["it uses no labels: it finds groups from the features alone", "it needs no computer", "it can't be evaluated at all", "it uses only the labels"], answer: 0,
              explain: "There's no target column to learn from." },
            { q: "As k grows, the k-means inertia…",
              choices: ["always goes down (with k = number of points it's 0)", "always goes up", "stays the same", "is highest at the best k"], answer: 0,
              explain: "More centres always fit at least as closely. That's why you look for the elbow or use the silhouette." },
            { q: "What does this print?", predict: true, code: d`
                from sklearn.metrics import adjusted_rand_score
                print(adjusted_rand_score([0, 0, 1, 1, 2, 2], [5, 5, 3, 3, 9, 9]))`,
              choices: ["1.0", "0.0", "0.33", "-1.0"], answer: 0,
              explain: "Same grouping, different names: a perfect match. Cluster numbers are only labels." },
            { q: "k-means finds 4 clusters of customers. What should you do next?",
              choices: ["look at each cluster's average features to understand and name it", "trust them blindly", "delete the smallest cluster", "use them as true labels from now on"], answer: 0,
              explain: "Clusters are hypotheses; meaning comes from inspecting them." },
            { q: "The groups in your data are long, thin crescents. Is k-means a good fit?",
              choices: ["no: it assumes roughly round clusters around a centre", "yes, it fits any shape", "only with k = 2", "only after PCA"], answer: 0,
              explain: "k-means assigns points to the nearest centre, which carves space into straight-edged regions (other methods such as DBSCAN handle odd shapes)." },
          ],
        },
        {
          id: "ml7-5", boss: true, time: 900, title: "The Merchant Guilds",
          story: "The merchant council wants its customers grouped into segments, each with a clear profile.",
          lesson: `<p>A segmentation workflow: scale the features, choose k by silhouette, fit, then describe each cluster in the <b>original</b> units. Convert the centres back with <code>scaler.inverse_transform(km.cluster_centers_)</code>.</p>
            <p><code>make_blobs</code> generates data with known groups. Perfect for practising.</p>`,
          example: d`
            import numpy as np
            from sklearn.preprocessing import StandardScaler

            X = np.array([[1.0, 100], [2, 300]])
            s = StandardScaler().fit(X)
            print(s.transform(X), s.inverse_transform(s.transform(X)))`,
          task: `The starter creates customer data (<code>X</code>: yearly spend, visits). Write <code>segment(ks)</code>:<br>
            scale X with a <code>StandardScaler</code>, choose the k from <code>ks</code> with the best silhouette (KMeans with <code>n_init=10, random_state=0</code> on the scaled data), and return a dict: <code>"k"</code>, <code>"sizes"</code> (cluster sizes, largest first) and <code>"centres"</code> (the centres in <b>original units</b>, rounded to 1, as a list of <code>[spend, visits]</code> lists sorted by spend).`,
          starter: d`
            import numpy as np
            from sklearn.datasets import make_blobs
            from sklearn.preprocessing import StandardScaler
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score

            rng = np.random.default_rng(5)
            centres = np.array([[300, 4], [900, 12], [1500, 5], [2200, 20]])
            X = np.vstack([c + rng.normal(0, [90, 1.6], (75, 2)) for c in centres])

            def segment(ks):
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import make_blobs
            from sklearn.preprocessing import StandardScaler
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score

            rng = np.random.default_rng(5)
            centres = np.array([[300, 4], [900, 12], [1500, 5], [2200, 20]])
            X = np.vstack([c + rng.normal(0, [90, 1.6], (75, 2)) for c in centres])

            def segment(ks):
                scaler = StandardScaler().fit(X)
                Z = scaler.transform(X)
                fits = {k: KMeans(n_clusters=k, n_init=10, random_state=0).fit(Z) for k in ks}
                best = max(ks, key=lambda k: silhouette_score(Z, fits[k].labels_))
                km = fits[best]
                cents = scaler.inverse_transform(km.cluster_centers_).round(1).tolist()
                return {"k": best, "sizes": sorted(np.bincount(km.labels_).tolist(), reverse=True), "centres": sorted(cents)}`,
          hints: ["scaler = StandardScaler().fit(X); Z = scaler.transform(X)", "Fit KMeans for every k; pick the best silhouette", "centres: scaler.inverse_transform(km.cluster_centers_).round(1).tolist(), then sorted()"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.preprocessing import StandardScaler
            from sklearn.cluster import KMeans
            from sklearn.metrics import silhouette_score
            sg = expect_func("segment")
            rng = np.random.default_rng(5); C = np.array([[300, 4], [900, 12], [1500, 5], [2200, 20]])
            X = np.vstack([c + rng.normal(0, [90, 1.6], (75, 2)) for c in C])
            sc = StandardScaler().fit(X); Z = sc.transform(X); ks = [2, 3, 4, 5, 6]
            fits = {k: KMeans(n_clusters=k, n_init=10, random_state=0).fit(Z) for k in ks}
            best = max(ks, key=lambda k: silhouette_score(Z, fits[k].labels_))
            got = sg(ks)
            expect_equal(got.get("k"), best, "k"); expect_equal(got.get("k"), 4, "the data has 4 segments")
            expect_equal(got.get("sizes"), sorted(np.bincount(fits[best].labels_).tolist(), reverse=True), "sizes")
            expect_close(got.get("centres"), sorted(sc.inverse_transform(fits[best].cluster_centers_).round(1).tolist()), "centres (original units, sorted by spend)")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 8
    {
      id: 8, name: "The Shrinking Spell", topic: "PCA: explained variance, choosing components, compress-then-classify", time: 600, icon: "🔍",
      intro: "Thirty measurements per patient, sixty-four pixels per digit: too many dimensions to see. The Shrinking Spell keeps what matters and drops the rest.",
      missions: [
        {
          id: "ml8-1", title: "Squash the Dimensions",
          story: "Thirty tumour measurements can't be drawn. Squash them into two numbers that keep as much information as possible.",
          lesson: `<p><b>PCA</b> (principal component analysis) finds new axes, the <b>principal components</b>: directions along which the data varies most, each at right angles to the previous ones. Keeping the first few gives a compact summary.</p>
            <ul><li>Scale first (PCA is about variance, so units matter)</li>
            <li><code>PCA(n_components=2).fit_transform(X_scaled)</code> → a 2-column version of the data</li>
            <li><code>pca.explained_variance_ratio_</code> → the share of the total variance each component keeps</li></ul>`,
          example: d`
            import numpy as np
            from sklearn.decomposition import PCA

            rng = np.random.default_rng(0)
            x = rng.normal(size=200)
            X = np.column_stack([x, 2 * x + rng.normal(0, 0.1, 200), rng.normal(size=200)])
            p = PCA().fit(X)
            print(p.explained_variance_ratio_.round(3))`,
          task: `On the breast cancer features scaled with <code>StandardScaler().fit_transform</code>, write:<br>
            • <code>pca_2d()</code> → a tuple <code>(X2, ratios)</code>: the data transformed by <code>PCA(n_components=2)</code>, and its explained variance ratios<br>
            • <code>kept_by_two()</code> → the total share of variance kept by those two components (rounded to 3)`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA

            X, y = load_breast_cancer(return_X_y=True)
            Xs = StandardScaler().fit_transform(X)

            def pca_2d():
                pass

            def kept_by_two():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA

            X, y = load_breast_cancer(return_X_y=True)
            Xs = StandardScaler().fit_transform(X)

            def pca_2d():
                p = PCA(n_components=2)
                X2 = p.fit_transform(Xs)
                return X2, p.explained_variance_ratio_

            def kept_by_two():
                return round(float(pca_2d()[1].sum()), 3)`,
          hints: ["p = PCA(n_components=2); X2 = p.fit_transform(Xs)", "p.explained_variance_ratio_", "kept: the sum of the two ratios"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            pc = expect_func("pca_2d"); kb = expect_func("kept_by_two")
            X, y = load_breast_cancer(return_X_y=True); Xs = StandardScaler().fit_transform(X)
            p = PCA(n_components=2); X2 = p.fit_transform(Xs)
            g2, r = pc()
            expect_equal(np.asarray(g2).shape, (569, 2), "the transformed data's shape")
            expect_array(np.abs(np.asarray(g2)), np.abs(X2), "the transformed data (up to sign)")
            expect_array(np.asarray(r), p.explained_variance_ratio_, "explained variance ratios")
            expect_close(kb(), round(p.explained_variance_ratio_.sum(), 3), "kept_by_two()")` }],
        },
        {
          id: "ml8-2", title: "How Many Dimensions?",
          story: "How few numbers can describe a handwritten digit, while keeping 90% of the information?",
          lesson: `<p>Fit <code>PCA()</code> with all components, then look at the <b>cumulative</b> explained variance: <code>np.cumsum(p.explained_variance_ratio_)</code>. The number of components needed for a share s is the first position where the cumulative sum reaches s (plus 1, because positions start at 0).</p>
            <p>Shortcut: <code>PCA(n_components=0.9)</code> chooses that number for you.</p>`,
          example: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA

            X, _ = load_digits(return_X_y=True)
            cum = np.cumsum(PCA().fit(X).explained_variance_ratio_)
            print(cum[:10].round(3))`,
          task: `Write:<br>• <code>components_for(X, share)</code> → the smallest number of components whose cumulative explained variance is at least <code>share</code> (using <code>PCA().fit(X)</code>, no scaling inside)<br>
            • <code>digits_components()</code> → a dict <code>{0.8: n, 0.9: n, 0.95: n}</code> for the digits pixels`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA

            def components_for(X, share):
                pass

            def digits_components():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA

            def components_for(X, share):
                cum = np.cumsum(PCA().fit(X).explained_variance_ratio_)
                return int(np.argmax(cum >= share - 1e-12) + 1)

            def digits_components():
                X, _ = load_digits(return_X_y=True)
                return {s: components_for(X, s) for s in (0.8, 0.9, 0.95)}`,
          hints: ["cum = np.cumsum(PCA().fit(X).explained_variance_ratio_)", "np.argmax(cum >= share) is the first position that reaches the share; add 1"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA
            cf = expect_func("components_for"); dc = expect_func("digits_components")
            X, _ = load_digits(return_X_y=True)
            cum = np.cumsum(PCA().fit(X).explained_variance_ratio_)
            want = {s: int(np.argmax(cum >= s) + 1) for s in (0.8, 0.9, 0.95)}
            expect_equal(dc(), want, "digits_components()")
            for s in (0.8, 0.9):
                expect_equal(PCA(n_components=s).fit(X).n_components_, want[s], "(self-check) PCA(n_components=" + str(s) + ")")
            rng = np.random.default_rng(0); a = rng.normal(size=300)
            Y = np.column_stack([a, a * 3 + rng.normal(0, 0.01, 300), rng.normal(0, 0.01, 300)])
            expect_equal(cf(Y, 0.99), 1, "components_for nearly one-dimensional data")` }],
        },
        {
          id: "ml8-3", title: "Compress and Classify",
          story: "Can the tumour classifier work with just a handful of PCA components instead of all thirty measurements?",
          lesson: `<p>PCA can be a step in a pipeline: <code>make_pipeline(StandardScaler(), PCA(n_components=k), LogisticRegression())</code>. Fewer features mean faster models and less overfitting, sometimes at almost no cost in accuracy.</p>`,
          example: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression

            X, y = load_breast_cancer(return_X_y=True)
            m = make_pipeline(StandardScaler(), PCA(n_components=3), LogisticRegression()).fit(X, y)
            print(m.score(X, y))`,
          task: `On the breast cancer data split with <code>test_size=0.25, random_state=0, stratify=y</code>, write:<br>
            • <code>pca_accuracy(k)</code> → the test accuracy of <code>make_pipeline(StandardScaler(), PCA(n_components=k), LogisticRegression())</code><br>
            • <code>smallest_good_k(ks, tolerance=0.01)</code> → the smallest k in the list whose accuracy is within <code>tolerance</code> of the full model (StandardScaler + LogisticRegression, no PCA)`,
          starter: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression

            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

            def pca_accuracy(k):
                pass

            def smallest_good_k(ks, tolerance=0.01):
                pass
            `,
          solution: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression

            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

            def pca_accuracy(k):
                m = make_pipeline(StandardScaler(), PCA(n_components=k), LogisticRegression()).fit(Xtr, ytr)
                return float(m.score(Xte, yte))

            def smallest_good_k(ks, tolerance=0.01):
                full = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr).score(Xte, yte)
                for k in sorted(ks):
                    if pca_accuracy(k) >= full - tolerance:
                        return k
                return None`,
          hints: ["make_pipeline(StandardScaler(), PCA(n_components=k), LogisticRegression())", "Full model: make_pipeline(StandardScaler(), LogisticRegression())", "Try the ks from small to large; return the first that's close enough"],
          tests: [{ code: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression
            pa = expect_func("pca_accuracy"); sg = expect_func("smallest_good_k")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ref = lambda k: make_pipeline(StandardScaler(), PCA(n_components=k), LogisticRegression()).fit(Xtr, ytr).score(Xte, yte)
            for k in (1, 3, 10):
                expect_close(pa(k), ref(k), "pca_accuracy(" + str(k) + ")")
            full = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr, ytr).score(Xte, yte)
            ks = [1, 2, 3, 5, 8, 12]
            expect_equal(sg(ks), next((k for k in sorted(ks) if ref(k) >= full - 0.01), None), "smallest_good_k")` }],
        },
        {
          id: "ml8-4", type: "quiz", title: "Riddles of the Shrinking Spell",
          story: "The spell-casters' riddles about dimensions.",
          lesson: `<p>PCA components are new combined features, ordered by the variance they explain. They're uncorrelated with each other but harder to interpret than the original features.</p>`,
          questions: [
            { q: "Why scale features before PCA?",
              choices: ["PCA looks for variance, so a feature measured in big units would dominate the components", "PCA crashes on unscaled data", "to make it faster", "scaling isn't needed"], answer: 0,
              explain: "Without scaling, \"variance\" mostly reflects units, not information." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                r = np.array([0.45, 0.25, 0.15, 0.1, 0.05])
                cum = np.cumsum(r)
                print(cum.round(2), int(np.argmax(cum >= 0.8) + 1))`,
              choices: ["[0.45 0.7  0.85 0.95 1.  ] 3", "[0.45 0.25 0.15 0.1  0.05] 3", "[0.45 0.7  0.85 0.95 1.  ] 2", "[0.45 0.7  0.85 0.95 1.  ] 4"], answer: 0,
              explain: "The cumulative share first reaches 0.8 at the third component." },
            { q: "The first principal component of a dataset is…",
              choices: ["the direction along which the data varies the most", "the most important original feature", "the first column", "the cluster centre"], answer: 0,
              explain: "A component is a combination of all the features, not one of them." },
            { q: "After PCA to 5 components, the classifier is just as accurate. A benefit?",
              choices: ["faster training and less risk of overfitting with fewer features", "the model becomes easier to explain feature by feature", "it needs no test set", "it fixes missing values"], answer: 0,
              explain: "Fewer inputs; but interpretability usually gets worse, not better." },
            { q: "Can PCA capture a curved (non-linear) pattern, like points on a circle?",
              choices: ["no: it only finds straight directions (linear combinations)", "yes, always", "only with scaling", "only with 2 components"], answer: 0,
              explain: "PCA is linear; non-linear methods (like t-SNE or UMAP) exist for curved structure." },
          ],
        },
        {
          id: "ml8-5", boss: true, time: 900, title: "The Digit Map",
          story: "The post office wants the digit reader smaller and faster. How far can the 64 pixels be squeezed?",
          lesson: `<p>Pull everything together: measure how much variance a few components keep, how many components a target needs, and what that does to a classifier's accuracy and size.</p>`,
          example: d`
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA

            X, y = load_digits(return_X_y=True)
            print(PCA(n_components=2).fit(X).explained_variance_ratio_.sum().round(3))`,
          task: `On the digits, write <code>digit_map()</code> returning a dict:<br>
            • <code>"two_components"</code>: the variance share kept by 2 components (<code>PCA(n_components=2)</code> on the raw pixels), rounded to 3<br>
            • <code>"for_90"</code>: components needed for 90% of the variance<br>
            • <code>"acc_full"</code> and <code>"acc_pca"</code>: test accuracies (split <code>test_size=0.25, random_state=0, stratify=y</code>) of <code>make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000))</code> and of the same with <code>PCA(n_components=for_90, random_state=0)</code> between the two steps, rounded to 3<br>
            • <code>"shrink"</code>: 64 ÷ for_90, rounded to 1`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def digit_map():
                X, y = load_digits(return_X_y=True)
                return {}
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def digit_map():
                X, y = load_digits(return_X_y=True)
                two = PCA(n_components=2).fit(X).explained_variance_ratio_.sum()
                cum = np.cumsum(PCA().fit(X).explained_variance_ratio_)
                n90 = int(np.argmax(cum >= 0.9) + 1)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                full = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)).fit(Xtr, ytr).score(Xte, yte)
                small = make_pipeline(StandardScaler(), PCA(n_components=n90, random_state=0), LogisticRegression(max_iter=2000)).fit(Xtr, ytr).score(Xte, yte)
                return {"two_components": round(float(two), 3), "for_90": n90, "acc_full": round(float(full), 3),
                        "acc_pca": round(float(small), 3), "shrink": round(64 / n90, 1)}`,
          hints: ["two: PCA(n_components=2).fit(X).explained_variance_ratio_.sum()", "for_90: cumulative sum, first position ≥ 0.9, plus 1", "Two pipelines on the same split; the second has PCA(n_components=for_90) in the middle"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.decomposition import PCA
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            dm = expect_func("digit_map")
            X, y = load_digits(return_X_y=True)
            two = PCA(n_components=2).fit(X).explained_variance_ratio_.sum(); n = int(np.argmax(np.cumsum(PCA().fit(X).explained_variance_ratio_) >= 0.9) + 1)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            a = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)).fit(Xtr, ytr).score(Xte, yte)
            b = make_pipeline(StandardScaler(), PCA(n_components=n, random_state=0), LogisticRegression(max_iter=2000)).fit(Xtr, ytr).score(Xte, yte)
            got = dm()
            expect_equal(got.get("for_90"), n, "for_90")
            expect_close({k: got.get(k) for k in ("two_components", "acc_full", "acc_pca", "shrink")},
                         {"two_components": round(two, 3), "acc_full": round(a, 3), "acc_pca": round(b, 3), "shrink": round(64 / n, 1)}, "numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 9
    {
      id: 9, name: "The Feature Forge", topic: "one-hot encoding, imputation, ColumnTransformer & pipelines", time: 660, icon: "🔨",
      intro: "Real tables hold words, gaps and numbers side by side. In the Forge, raw columns are hammered into features a machine can use.",
      missions: [
        {
          id: "ml9-1", title: "Words into Numbers",
          story: "The automatons only understand numbers, but the guild records say \"Knight\" and \"Mage\".",
          lesson: `<p>Models need numbers. For a category without an order (class, guild, city), use <b>one-hot encoding</b>: one 0/1 column per category.</p>
            <ul><li>Don't number them 0, 1, 2: the model would think Mage (2) is "twice" Knight (1)</li>
            <li><code>OneHotEncoder(handle_unknown="ignore", sparse_output=False)</code> learns the categories from the training data; a category never seen before becomes all zeros instead of crashing</li>
            <li><code>enc.get_feature_names_out()</code> names the new columns</li></ul>`,
          example: d`
            import pandas as pd
            from sklearn.preprocessing import OneHotEncoder

            df = pd.DataFrame({"class": ["Knight", "Mage", "Knight"]})
            enc = OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(df)
            print(enc.get_feature_names_out(), enc.transform(pd.DataFrame({"class": ["Mage", "Bard"]})))`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `Write:<br>• <code>fit_class_encoder()</code> → a <code>OneHotEncoder(handle_unknown="ignore", sparse_output=False)</code> fitted on the <code>class</code> column of <code>adventurers.csv</code> (pass a one-column DataFrame)<br>
            • <code>encoded_names(enc)</code> → a list of its output column names<br>
            • <code>encode(enc, classes)</code> → the one-hot array for a list of class names (unknown names give rows of zeros)`,
          starter: d`
            import pandas as pd
            from sklearn.preprocessing import OneHotEncoder

            def fit_class_encoder():
                pass

            def encoded_names(enc):
                pass

            def encode(enc, classes):
                pass
            `,
          solution: d`
            import pandas as pd
            from sklearn.preprocessing import OneHotEncoder

            def fit_class_encoder():
                adv = pd.read_csv("adventurers.csv")
                return OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(adv[["class"]])

            def encoded_names(enc):
                return list(enc.get_feature_names_out())

            def encode(enc, classes):
                return enc.transform(pd.DataFrame({"class": classes}))`,
          hints: ["Fit on adv[[\"class\"]] (double brackets: a one-column DataFrame)", "list(enc.get_feature_names_out())", "encode: enc.transform(pd.DataFrame({\"class\": classes}))"],
          tests: [{ code: d`
            import numpy as np
            fe = expect_func("fit_class_encoder"); en = expect_func("encoded_names"); ec = expect_func("encode")
            enc = fe()
            expect_equal(en(enc), ["class_Archer", "class_Healer", "class_Knight", "class_Mage"], "encoded_names")
            expect_array(np.asarray(ec(enc, ["Mage", "Archer", "Bard"])), [[0, 0, 0, 1], [1, 0, 0, 0], [0, 0, 0, 0]], "encode(Mage, Archer, Bard)")` }],
        },
        {
          id: "ml9-2", title: "Fill the Gaps",
          story: "Some adventurers never told their age. The machine can't skip them; it needs a sensible guess.",
          lesson: `<p><code>SimpleImputer(strategy="median")</code> fills missing numbers with the median; <code>strategy="most_frequent"</code> fills categories with the most common value.</p>
            <p>The golden rule: <b>fit</b> the imputer on the <b>training</b> data only, then <b>transform</b> both training and test data with what it learned. Using the test set's median would leak information from the future.</p>`,
          example: d`
            import numpy as np
            from sklearn.impute import SimpleImputer

            tr = np.array([[1.0], [np.nan], [5.0]]); te = np.array([[np.nan]])
            imp = SimpleImputer(strategy="median").fit(tr)
            print(imp.statistics_, imp.transform(tr).ravel(), imp.transform(te).ravel())`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `The starter splits the adventurers (<code>test_size=0.25, random_state=3</code>). Write:<br>
            • <code>fill_age(train, test)</code> → a tuple of two 1-D arrays: the <code>age</code> column of each, filled with the <b>training</b> median (<code>SimpleImputer</code>)<br>
            • <code>fill_guild(train, test)</code> → the same for <code>guild</code>, filled with the training data's most frequent guild`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.impute import SimpleImputer
            from sklearn.model_selection import train_test_split

            adv = pd.read_csv("adventurers.csv")
            train, test = train_test_split(adv, test_size=0.25, random_state=3)

            def fill_age(train, test):
                filled = adv["age"].fillna(adv["age"].median())
                return filled, filled

            def fill_guild(train, test):
                pass
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.impute import SimpleImputer
            from sklearn.model_selection import train_test_split

            adv = pd.read_csv("adventurers.csv")
            train, test = train_test_split(adv, test_size=0.25, random_state=3)

            def fill_age(train, test):
                imp = SimpleImputer(strategy="median").fit(train[["age"]])
                return imp.transform(train[["age"]]).ravel(), imp.transform(test[["age"]]).ravel()

            def fill_guild(train, test):
                imp = SimpleImputer(strategy="most_frequent").fit(train[["guild"]])
                return imp.transform(train[["guild"]]).ravel(), imp.transform(test[["guild"]]).ravel()`,
          hints: ["imp = SimpleImputer(strategy=\"median\").fit(train[[\"age\"]])", "transform both parts; .ravel() makes them 1-D", "Guild: strategy=\"most_frequent\""],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            fa = expect_func("fill_age"); fg = expect_func("fill_guild")
            adv = pd.read_csv("adventurers.csv"); tr, te = train_test_split(adv, test_size=0.25, random_state=3)
            a, b = fa(tr, te)
            med = tr["age"].median()
            expect_array(np.asarray(a, dtype=float), tr["age"].fillna(med).values, "training ages")
            expect_array(np.asarray(b, dtype=float), te["age"].fillna(med).values, "test ages (filled with the TRAINING median)")
            g1, g2 = fg(tr, te)
            mode = tr["guild"].mode()[0]
            expect_equal(list(g2), list(te["guild"].fillna(mode)), "test guilds (filled with the training's most frequent guild)")` }],
        },
        {
          id: "ml9-3", title: "The Column Workshop",
          story: "Numbers need filling and scaling; words need filling and encoding. One workshop must do both, every time, without mistakes.",
          lesson: `<p>A <code>ColumnTransformer</code> applies different steps to different columns, and a <code>Pipeline</code> chains it with the model:</p>
            <pre class="out">pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"),
                          OneHotEncoder(handle_unknown="ignore")), CAT),
])
model = make_pipeline(pre, LogisticRegression())</pre>
            <p>Now <code>model.fit(train_df, y)</code> learns every step from the training data, and <code>model.predict(new_df)</code> repeats exactly the same steps. No leaks, no forgotten steps.</p>`,
          example: d`
            import pandas as pd
            from sklearn.compose import ColumnTransformer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler

            df = pd.DataFrame({"x": [1.0, 2, 3], "c": ["a", "b", "a"]})
            ct = ColumnTransformer([("num", StandardScaler(), ["x"]), ("cat", OneHotEncoder(), ["c"])])
            print(ct.fit_transform(df), ct.get_feature_names_out())`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `With <code>NUM = ["age", "level", "gold", "has_map", "party"]</code> and <code>CAT = ["class", "guild"]</code>, write:<br>
            • <code>make_preprocessor()</code> → the <code>ColumnTransformer</code> from the lesson (median + scaler for NUM; most-frequent + one-hot with <code>handle_unknown="ignore"</code> for CAT)<br>
            • <code>make_model()</code> → <code>make_pipeline(make_preprocessor(), LogisticRegression())</code>`,
          starter: d`
            import pandas as pd
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                pass

            def make_model():
                pass
            `,
          solution: d`
            import pandas as pd
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])

            def make_model():
                return make_pipeline(make_preprocessor(), LogisticRegression())`,
          hints: ["ColumnTransformer([(\"num\", numeric_steps, NUM), (\"cat\", categorical_steps, CAT)])", "Each set of steps is itself a make_pipeline(...)", "make_model: make_pipeline(make_preprocessor(), LogisticRegression())"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            mp = expect_func("make_preprocessor"); mm = expect_func("make_model")
            adv = pd.read_csv("adventurers.csv"); X, y = adv.drop(columns="returned"), adv["returned"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
            pre = mp().fit(Xtr)
            Z = pre.transform(Xte)
            expect_equal(Z.shape[1], 12, "number of columns after preprocessing (5 numeric + 4 classes + 3 guilds)")
            assert not np.isnan(np.asarray(Z, dtype=float)).any(), "No missing values should remain after preprocessing."
            expect_close(np.asarray(pre.transform(Xtr)[:, :5], dtype=float).mean(axis=0).tolist(), [0.0] * 5, "scaled numeric columns have mean 0 on the training data", tol=1e-6)
            m = mm().fit(Xtr, ytr)
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            ref = make_pipeline(ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "level", "gold", "has_map", "party"]),
                ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), ["class", "guild"])]), LogisticRegression()).fit(Xtr, ytr)
            expect_close(m.score(Xte, yte), ref.score(Xte, yte), "the full model's test accuracy")
            new = pd.DataFrame([{"age": None, "class": "Bard", "guild": "Moon", "level": 20, "gold": 100.0, "has_map": 1, "party": 3}])
            m.predict(new)` }],
        },
        {
          id: "ml9-4", type: "quiz", title: "Riddles of the Forge",
          story: "The forge-master's riddles about turning raw columns into features.",
          lesson: `<p>Encode categories with one-hot, fill gaps with statistics learned from the training data, and keep all of it inside a pipeline so it's applied identically everywhere.</p>`,
          questions: [
            { q: "Why not encode class as Knight = 0, Mage = 1, Archer = 2 for a logistic regression?",
              choices: ["the model would treat them as ordered amounts, as if Archer were \"twice\" Mage", "numbers can't be categories", "it uses too much memory", "logistic regression can't read integers"], answer: 0,
              explain: "Arbitrary numbers invent an order. One-hot gives each category its own independent column." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                print(pd.get_dummies(pd.Series(["a", "b", "a"]), dtype=int).values.tolist())`,
              choices: ["[[1, 0], [0, 1], [1, 0]]", "[[0], [1], [0]]", "[[1, 0, 1], [0, 1, 0]]", "[[1], [2], [1]]"], answer: 0,
              explain: "One column per category (a, b), with a 1 where the row has that category." },
            { q: "You fill missing ages with the median of the WHOLE dataset before splitting. What's the problem?",
              choices: ["the test set's values influenced the training data: data leakage", "medians can't be used for ages", "nothing, it's simpler", "the model becomes non-linear"], answer: 0,
              explain: "Anything learned from data (medians, scaling, categories) must be learned from the training part only." },
            { q: "A new adventurer's class is \"Bard\", never seen in training. With <code>OneHotEncoder(handle_unknown=\"ignore\")</code>…",
              choices: ["the class columns are all 0 and the prediction still works", "it raises an error", "Bard becomes Knight", "the row is dropped"], answer: 0,
              explain: "\"ignore\" makes unknown categories all zeros instead of crashing in production." },
            { q: "Why put preprocessing inside the pipeline instead of doing it by hand before training?",
              choices: ["the exact same steps are learned on training data and repeated on new data, with no leaks or forgotten steps", "it makes the model more accurate by itself", "pipelines are required by sklearn", "to avoid writing column names"], answer: 0,
              explain: "Pipelines make the whole recipe one object you can fit, cross-validate and deploy." },
          ],
        },
        {
          id: "ml9-5", boss: true, time: 960, title: "The Full Pass",
          story: "On the Yes-or-No floor, the guild's model used only four numbers. Now give it everything: age, class, guild. Does it help?",
          lesson: `<p>Comparing a model with and without extra features, on the <b>same</b> split, tells you whether the extra work in the forge paid off. Report the gain honestly: sometimes it's small.</p>`,
          example: d`
            import pandas as pd

            adv = pd.read_csv("adventurers.csv")
            print(adv.groupby("class")["returned"].mean().round(3))`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `Split the adventurers (features = every column except <code>returned</code>) with <code>test_size=0.25, random_state=3, stratify=y</code>. Write <code>full_pass_report()</code> returning a dict:<br>
            • <code>"numeric_only"</code>: test accuracy of <code>make_pipeline(StandardScaler(), LogisticRegression())</code> on <code>level, has_map, party, gold</code><br>
            • <code>"full"</code>: test accuracy of the ColumnTransformer pipeline (as in the Column Workshop) + <code>LogisticRegression()</code> on all features<br>
            • <code>"gain"</code>: full − numeric_only • <code>"n_features"</code>: the number of columns the preprocessor produces<br>Round accuracies and gain to 3.`,
          starter: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def full_pass_report():
                adv = pd.read_csv("adventurers.csv")
                return {}
            `,
          solution: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def full_pass_report():
                adv = pd.read_csv("adventurers.csv")
                X, y = adv.drop(columns="returned"), adv["returned"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
                few = ["level", "has_map", "party", "gold"]
                numeric = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr[few], ytr).score(Xte[few], yte)
                pre = ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])
                full_model = make_pipeline(pre, LogisticRegression()).fit(Xtr, ytr)
                full = full_model.score(Xte, yte)
                return {"numeric_only": round(float(numeric), 3), "full": round(float(full), 3),
                        "gain": round(float(full - numeric), 3), "n_features": int(pre.transform(Xte[:1]).shape[1])}`,
          hints: ["X = adv.drop(columns=\"returned\")", "Numeric-only model uses Xtr[few] and Xte[few]", "n_features: after fitting, pre.transform(some rows).shape[1]"],
          tests: [{ code: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            fr = expect_func("full_pass_report")
            adv = pd.read_csv("adventurers.csv"); X, y = adv.drop(columns="returned"), adv["returned"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
            few = ["level", "has_map", "party", "gold"]
            a = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xtr[few], ytr).score(Xte[few], yte)
            pre = ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "level", "gold", "has_map", "party"]),
                ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), ["class", "guild"])])
            b = make_pipeline(pre, LogisticRegression()).fit(Xtr, ytr).score(Xte, yte)
            got = fr()
            expect_equal(got.get("n_features"), 12, "n_features")
            expect_close({k: got.get(k) for k in ("numeric_only", "full", "gain")}, {"numeric_only": round(a, 3), "full": round(b, 3), "gain": round(b - a, 3)}, "accuracies")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 10
    {
      id: 10, name: "The Fair Trial", topic: "cross-validation, grid search & data leakage", time: 660, icon: "🧑‍⚖️",
      intro: "A machine judged on one lucky split can fool everyone. In the Fair Trial, every model is tested many times, and nobody may peek at the answers.",
      missions: [
        {
          id: "ml10-1", title: "Fold the Data",
          story: "One test split might be easy by chance. The court demands five trials, each with a different part held back.",
          lesson: `<p><b>k-fold cross-validation</b> splits the data into k parts (folds). Each fold takes a turn as the test set while the model trains on the rest. You get k scores: their <b>mean</b> is a more reliable estimate, their <b>spread</b> shows how stable the model is.</p>
            <p><code>cross_val_score(model, X, y, cv=5)</code>. For classifiers it uses <b>stratified</b> folds (class proportions kept). Put preprocessing in a pipeline, so each fold scales using its own training part.</p>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import cross_val_score
            from sklearn.tree import DecisionTreeClassifier

            X, y = load_iris(return_X_y=True)
            s = cross_val_score(DecisionTreeClassifier(random_state=0), X, y, cv=5)
            print(s.round(3), s.mean().round(3), s.std().round(3))`,
          task: `Write:<br>• <code>cv_scores(model, X, y, k)</code> → the array of k cross-validation scores<br>
            • <code>cv_summary(model, X, y, k)</code> → a tuple <code>(mean, std)</code> of those scores, rounded to 4<br>
            • <code>cancer_cv()</code> → <code>cv_summary</code> of <code>make_pipeline(StandardScaler(), LogisticRegression())</code> on the breast cancer data with k = 5`,
          starter: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def cv_scores(model, X, y, k):
                pass

            def cv_summary(model, X, y, k):
                pass

            def cancer_cv():
                pass
            `,
          solution: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def cv_scores(model, X, y, k):
                return cross_val_score(model, X, y, cv=k)

            def cv_summary(model, X, y, k):
                s = cv_scores(model, X, y, k)
                return (round(float(s.mean()), 4), round(float(s.std()), 4))

            def cancer_cv():
                X, y = load_breast_cancer(return_X_y=True)
                return cv_summary(make_pipeline(StandardScaler(), LogisticRegression()), X, y, 5)`,
          hints: ["cross_val_score(model, X, y, cv=k)", "(round(s.mean(), 4), round(s.std(), 4))"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer, load_iris
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.tree import DecisionTreeClassifier
            cs = expect_func("cv_scores"); su = expect_func("cv_summary"); cc = expect_func("cancer_cv")
            X, y = load_iris(return_X_y=True)
            ref = cross_val_score(DecisionTreeClassifier(random_state=0), X, y, cv=4)
            expect_array(np.asarray(cs(DecisionTreeClassifier(random_state=0), X, y, 4)), ref, "cv_scores(tree, iris, 4)")
            expect_close(su(DecisionTreeClassifier(random_state=0), X, y, 4), (round(ref.mean(), 4), round(ref.std(), 4)), "cv_summary")
            Xc, yc = load_breast_cancer(return_X_y=True)
            s = cross_val_score(make_pipeline(StandardScaler(), LogisticRegression()), Xc, yc, cv=5)
            expect_close(cc(), (round(s.mean(), 4), round(s.std(), 4)), "cancer_cv()")` }],
        },
        {
          id: "ml10-2", title: "Tune the Dials",
          story: "How many neighbours should the machine ask? Don't guess, and don't ask the test set. Search, with cross-validation.",
          lesson: `<p><code>GridSearchCV(model, param_grid, cv=5)</code> tries every combination of settings with cross-validation <b>on the training data</b>, then refits the best one on all the training data.</p>
            <ul><li>For a pipeline, name a step's setting as <code>stepname__param</code>: <code>{"kneighborsclassifier__n_neighbors": [1, 3, 5]}</code></li>
            <li><code>search.best_params_</code>, <code>search.best_score_</code> (mean CV score), and <code>search.score(Xte, yte)</code> for the final test</li></ul>
            <p>The test set is touched exactly once, at the end.</p>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.model_selection import GridSearchCV
            from sklearn.neighbors import KNeighborsClassifier

            X, y = load_iris(return_X_y=True)
            g = GridSearchCV(KNeighborsClassifier(), {"n_neighbors": [1, 5, 15]}, cv=5).fit(X, y)
            print(g.best_params_, round(g.best_score_, 3))`,
          task: `On the breast cancer data split with <code>test_size=0.25, random_state=0, stratify=y</code>, write <code>tune_knn(ks)</code>: run <code>GridSearchCV(make_pipeline(StandardScaler(), KNeighborsClassifier()), {"kneighborsclassifier__n_neighbors": ks}, cv=5)</code> on the training data and return a tuple <code>(best_k, best_cv_score, test_accuracy)</code>, the two scores rounded to 4.`,
          starter: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neighbors import KNeighborsClassifier

            def tune_knn(ks):
                pass
            `,
          solution: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neighbors import KNeighborsClassifier

            def tune_knn(ks):
                X, y = load_breast_cancer(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                search = GridSearchCV(make_pipeline(StandardScaler(), KNeighborsClassifier()),
                                      {"kneighborsclassifier__n_neighbors": ks}, cv=5).fit(Xtr, ytr)
                return (search.best_params_["kneighborsclassifier__n_neighbors"],
                        round(float(search.best_score_), 4), round(float(search.score(Xte, yte)), 4))`,
          hints: ["Fit the GridSearchCV on Xtr, ytr only", "best_k = search.best_params_[\"kneighborsclassifier__n_neighbors\"]", "search.score(Xte, yte) uses the refitted best model"],
          tests: [{ code: d`
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neighbors import KNeighborsClassifier
            tk = expect_func("tune_knn")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ks = [1, 3, 5, 9, 15, 25]
            g = GridSearchCV(make_pipeline(StandardScaler(), KNeighborsClassifier()), {"kneighborsclassifier__n_neighbors": ks}, cv=5).fit(Xtr, ytr)
            want = (g.best_params_["kneighborsclassifier__n_neighbors"], round(g.best_score_, 4), round(g.score(Xte, yte), 4))
            got = tk(ks)
            expect_equal(got[0], want[0], "best_k")
            expect_close(got[1:], want[1:], "best CV score and test accuracy")` }],
        },
        {
          id: "ml10-3", title: "The Leak",
          story: "A rival engineer claims his machine predicts coin flips from random noise with 80% accuracy. The court suspects a leak.",
          lesson: `<p><b>Data leakage</b>: information from the test data sneaks into training, making scores look far better than reality.</p>
            <p>A classic leak: choosing the "best" features using <b>all</b> the data, then cross-validating. The feature choice already saw the test folds' answers. Even on pure noise, this can look like strong prediction!</p>
            <p>The fix: put feature selection (and scaling, imputing…) inside the pipeline, so it's redone inside every fold on that fold's training data only.</p>`,
          example: d`
            import numpy as np
            from sklearn.feature_selection import SelectKBest, f_classif

            rng = np.random.default_rng(0)
            X = rng.normal(size=(20, 100)); y = rng.integers(0, 2, 20)
            print(SelectKBest(f_classif, k=3).fit(X, y).get_support(indices=True))`,
          task: `The starter creates pure noise: <code>X</code> (60 × 2000) and random labels <code>y</code>. Write:<br>
            • <code>leaky_score()</code> → fit <code>SelectKBest(f_classif, k=20)</code> on <b>all</b> of X, y, transform X, then return the mean of <code>cross_val_score(LogisticRegression(), X_selected, y, cv=5)</code><br>
            • <code>honest_score()</code> → the mean of <code>cross_val_score(make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression()), X, y, cv=5)</code><br>
            (Round both to 3.) Then compare them: on noise, the honest one should be near 0.5.`,
          starter: d`
            import numpy as np
            from sklearn.feature_selection import SelectKBest, f_classif
            from sklearn.linear_model import LogisticRegression
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline

            rng = np.random.default_rng(0)
            X = rng.normal(size=(60, 2000))
            y = rng.integers(0, 2, 60)

            def leaky_score():
                pass

            def honest_score():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.feature_selection import SelectKBest, f_classif
            from sklearn.linear_model import LogisticRegression
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline

            rng = np.random.default_rng(0)
            X = rng.normal(size=(60, 2000))
            y = rng.integers(0, 2, 60)

            def leaky_score():
                Xs = SelectKBest(f_classif, k=20).fit_transform(X, y)
                return round(float(cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()), 3)

            def honest_score():
                model = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
                return round(float(cross_val_score(model, X, y, cv=5).mean()), 3)`,
          hints: ["leaky: Xs = SelectKBest(f_classif, k=20).fit_transform(X, y), then cross-validate on Xs", "honest: the selector goes inside make_pipeline, and you cross-validate on the full X"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.feature_selection import SelectKBest, f_classif
            from sklearn.linear_model import LogisticRegression
            from sklearn.model_selection import cross_val_score
            from sklearn.pipeline import make_pipeline
            ls = expect_func("leaky_score"); hs = expect_func("honest_score")
            rng = np.random.default_rng(0); X = rng.normal(size=(60, 2000)); y = rng.integers(0, 2, 60)
            leak = round(cross_val_score(LogisticRegression(), SelectKBest(f_classif, k=20).fit_transform(X, y), y, cv=5).mean(), 3)
            hon = round(cross_val_score(make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression()), X, y, cv=5).mean(), 3)
            expect_close(ls(), leak, "leaky_score()"); expect_close(hs(), hon, "honest_score()")
            assert leak > hon + 0.2, "(self-check) the leak should look much better than the truth"` }],
        },
        {
          id: "ml10-4", type: "quiz", title: "Riddles of the Fair Trial",
          story: "The court's riddles about honest evaluation.",
          lesson: `<p>Choose models and settings with cross-validation on the training data; touch the test set once. Anything learned from data belongs inside the pipeline.</p>`,
          questions: [
            { q: "Why is a 5-fold cross-validation score more trustworthy than one train/test split?",
              choices: ["every row is tested once, and five scores average out the luck of a single split", "it uses more features", "it trains faster", "it can't overfit"], answer: 0,
              explain: "One split can be easy or hard by chance; the mean over folds is steadier, and the spread shows the uncertainty." },
            { q: "You tried 200 settings and picked the one with the best <b>test</b> score. What's wrong?",
              choices: ["you tuned on the test set, so its score is now optimistic", "nothing", "200 is too few", "you should have used accuracy"], answer: 0,
              explain: "Choosing based on the test set turns it into training data. Tune with cross-validation; test once." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                from sklearn.model_selection import KFold
                print([len(te) for tr, te in KFold(n_splits=3).split(np.zeros(10))])`,
              choices: ["[4, 3, 3]", "[3, 3, 3]", "[3, 3, 4]", "[10, 10, 10]"], answer: 0,
              explain: "10 rows in 3 folds: the first fold gets the extra row." },
            { q: "Which of these is a data leak?",
              choices: ["scaling with the mean and std of the whole dataset before splitting", "scaling inside a pipeline", "using cross-validation", "keeping a test set"], answer: 0,
              explain: "The test rows influenced the scaling, which the model then learned from." },
            { q: "In a pipeline made with <code>make_pipeline(StandardScaler(), SVC())</code>, how do you name the C setting in a grid?",
              choices: ["\"svc__C\"", "\"C\"", "\"SVC.C\"", "\"pipeline__C\""], answer: 0,
              explain: "make_pipeline names steps after their lowercased class; settings are step__param." },
          ],
        },
        {
          id: "ml10-5", boss: true, time: 1080, title: "The Fair Verdict",
          story: "Three automatons apply to guard the Dragon's Pass. The court will hear each one fairly, then test the winner once.",
          lesson: `<p>The honest model-selection workflow:</p>
            <ol><li>Split off a test set and lock it away</li><li>Compare candidates by cross-validation on the training data</li>
            <li>Fit the winner on all the training data</li><li>Report its test score, once</li></ol>`,
          example: d`
            from sklearn.model_selection import cross_val_score
            print("candidates are compared with cross_val_score on the training part only")`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `Split the adventurers (all features) with <code>test_size=0.25, random_state=3, stratify=y</code>. Each candidate is <code>make_pipeline(preprocessor, model)</code> with the Column Workshop preprocessor:<br>
            <code>"logistic"</code>: <code>LogisticRegression()</code>; <code>"forest"</code>: <code>RandomForestClassifier(n_estimators=100, min_samples_leaf=5, random_state=0)</code>; <code>"knn"</code>: <code>KNeighborsClassifier(n_neighbors=15)</code>.<br>
            Write <code>verdict()</code> → a dict: <code>"cv"</code> (<code>{name: mean 5-fold CV accuracy on the training data, rounded to 3}</code>), <code>"winner"</code> (highest CV mean; first in the order logistic, forest, knn on a tie) and <code>"test"</code> (the winner's test accuracy after fitting on the training data, rounded to 3).`,
          starter: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.neighbors import KNeighborsClassifier

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])

            def verdict():
                pass
            `,
          solution: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.neighbors import KNeighborsClassifier

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])

            def verdict():
                adv = pd.read_csv("adventurers.csv")
                X, y = adv.drop(columns="returned"), adv["returned"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
                models = {
                    "logistic": LogisticRegression(),
                    "forest": RandomForestClassifier(n_estimators=100, min_samples_leaf=5, random_state=0),
                    "knn": KNeighborsClassifier(n_neighbors=15),
                }
                cv = {n: round(float(cross_val_score(make_pipeline(make_preprocessor(), m), Xtr, ytr, cv=5).mean()), 3) for n, m in models.items()}
                winner = max(models, key=lambda n: cv[n])
                final = make_pipeline(make_preprocessor(), models[winner]).fit(Xtr, ytr)
                return {"cv": cv, "winner": winner, "test": round(float(final.score(Xte, yte)), 3)}`,
          hints: ["Cross-validate make_pipeline(make_preprocessor(), model) on Xtr, ytr for each model", "winner = max(models, key=lambda n: cv[n])", "Fit only the winner on the training data, then score it on the test data"],
          tests: [{ code: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.neighbors import KNeighborsClassifier
            ve = expect_func("verdict")
            pre = lambda: ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "level", "gold", "has_map", "party"]),
                ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), ["class", "guild"])])
            adv = pd.read_csv("adventurers.csv"); X, y = adv.drop(columns="returned"), adv["returned"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
            ms = {"logistic": LogisticRegression(), "forest": RandomForestClassifier(n_estimators=100, min_samples_leaf=5, random_state=0), "knn": KNeighborsClassifier(n_neighbors=15)}
            cv = {n: round(cross_val_score(make_pipeline(pre(), m), Xtr, ytr, cv=5).mean(), 3) for n, m in ms.items()}
            w = max(ms, key=lambda n: cv[n])
            got = ve()
            expect_close(got.get("cv"), cv, "cv"); expect_equal(got.get("winner"), w, "winner")
            expect_close(got.get("test"), round(make_pipeline(pre(), ms[w]).fit(Xtr, ytr).score(Xte, yte), 3), "test")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 11
    {
      id: 11, name: "The Thinking Engine", topic: "perceptrons, gradient descent, neural networks & backpropagation", time: 720, icon: "🧠",
      intro: "At the heart of the Spire turns the Thinking Engine: layers of tiny calculators that learn by correcting their own mistakes. Build one with your own hands.",
      missions: [
        {
          id: "ml11-1", title: "The Perceptron",
          story: "The very first learning machine (1958) had one artificial neuron. Rebuild it, and teach it simple logic.",
          lesson: `<p>A <b>perceptron</b> computes <code>w · x + b</code> and outputs 1 if that's above 0, else 0. It learns by going through the examples one by one:</p>
            <p><code>error = y − prediction</code>; <code>w += lr × error × x</code>; <code>b += lr × error</code></p>
            <p>It nudges the weights only when it's wrong. It can learn any rule that a straight line can separate (AND, OR), but never XOR, which no single straight line separates. That limit is why networks need <b>layers</b>.</p>`,
          example: d`
            import numpy as np

            X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]); y = np.array([0, 0, 0, 1])   # AND
            w, b = np.zeros(2), 0.0
            for epoch in range(5):
                for xi, yi in zip(X, y):
                    err = yi - int(xi @ w + b > 0)
                    w += err * xi; b += err
            print(w, b, [int(x @ w + b > 0) for x in X])`,
          task: `With NumPy only, write:<br>• <code>train_perceptron(X, y, epochs=10, lr=1.0)</code> → <code>(w, b)</code>, starting from zeros and applying the rule above to each row in order, for <code>epochs</code> passes<br>
            • <code>perceptron_predict(w, b, X)</code> → an int array: 1 where <code>X @ w + b &gt; 0</code>`,
          starter: d`
            import numpy as np

            def train_perceptron(X, y, epochs=10, lr=1.0):
                pass

            def perceptron_predict(w, b, X):
                pass
            `,
          solution: d`
            import numpy as np

            def train_perceptron(X, y, epochs=10, lr=1.0):
                X = np.asarray(X, dtype=float)
                w, b = np.zeros(X.shape[1]), 0.0
                for _ in range(epochs):
                    for xi, yi in zip(X, y):
                        err = yi - (1 if xi @ w + b > 0 else 0)
                        w = w + lr * err * xi
                        b = b + lr * err
                return w, b

            def perceptron_predict(w, b, X):
                return (np.asarray(X, dtype=float) @ w + b > 0).astype(int)`,
          hints: ["Start with w = np.zeros(n_features), b = 0.0", "For each row: err = yi - prediction; w += lr * err * xi; b += lr * err", "predict: (X @ w + b > 0).astype(int)"],
          tests: [{ code: d`
            import numpy as np
            tp = expect_func("train_perceptron"); pp = expect_func("perceptron_predict")
            assert "sklearn" not in __code__, "Build the perceptron with NumPy only."
            X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
            for name, y in (("AND", [0, 0, 0, 1]), ("OR", [0, 1, 1, 1])):
                w, b = tp(X, np.array(y))
                expect_array(np.asarray(pp(w, b, X)), y, name + " learned")
            w, b = tp(X, np.array([0, 0, 0, 1]), epochs=1)
            expect_close((list(w), b), ([1.0, 1.0], 1.0), "weights after one pass on AND")
            w, b = tp(X, np.array([0, 1, 1, 0]), epochs=50)
            assert (np.asarray(pp(w, b, X)) == [0, 1, 1, 0]).mean() < 1, "(self-check) a single perceptron can't learn XOR"` }],
        },
        {
          id: "ml11-2", title: "One Smooth Neuron",
          story: "The perceptron jumps between 0 and 1. A smooth neuron gives probabilities, and can learn by sliding downhill.",
          lesson: `<p>Replace the hard step with the sigmoid, and you have logistic regression as a single neuron. Train it by <b>gradient descent</b> on the <b>log loss</b> (binary cross-entropy):</p>
            <p><code>loss = −mean(y·log p + (1 − y)·log(1 − p))</code></p>
            <p>Its gradients are beautifully simple: with <code>p = σ(Xw + b)</code>, <code>grad_w = Xᵀ(p − y) / n</code> and <code>grad_b = mean(p − y)</code>. Each step: <code>w −= lr · grad_w</code>, <code>b −= lr · grad_b</code>.</p>`,
          example: d`
            import numpy as np

            y = np.array([1, 0, 1]); p = np.array([0.9, 0.2, 0.6])
            print(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))`,
          task: `With NumPy only, write:<br>• <code>log_loss(y, p)</code> → the mean binary cross-entropy (clip <code>p</code> to [1e-12, 1 − 1e-12] first)<br>
            • <code>train_neuron(X, y, lr=0.5, epochs=1000)</code> → <code>(w, b)</code>: start from zeros; each epoch compute p for all rows, then update w and b with the gradients above<br>
            • <code>neuron_predict(w, b, X)</code> → 1 where σ(Xw + b) ≥ 0.5`,
          starter: d`
            import numpy as np

            def sigmoid(z):
                return 1 / (1 + np.exp(-z))

            def log_loss(y, p):
                pass

            def train_neuron(X, y, lr=0.5, epochs=1000):
                pass

            def neuron_predict(w, b, X):
                pass
            `,
          solution: d`
            import numpy as np

            def sigmoid(z):
                return 1 / (1 + np.exp(-z))

            def log_loss(y, p):
                p = np.clip(p, 1e-12, 1 - 1e-12)
                return float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))

            def train_neuron(X, y, lr=0.5, epochs=1000):
                X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
                w, b = np.zeros(X.shape[1]), 0.0
                for _ in range(epochs):
                    p = sigmoid(X @ w + b)
                    w = w - lr * X.T @ (p - y) / len(y)
                    b = b - lr * np.mean(p - y)
                return w, b

            def neuron_predict(w, b, X):
                return (sigmoid(np.asarray(X) @ w + b) >= 0.5).astype(int)`,
          hints: ["log_loss: clip, then -mean(y * log(p) + (1 - y) * log(1 - p))", "Each epoch: p = sigmoid(X @ w + b); w -= lr * X.T @ (p - y) / n; b -= lr * mean(p - y)", "predict: sigmoid(...) >= 0.5"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.preprocessing import StandardScaler
            ll = expect_func("log_loss"); tn = expect_func("train_neuron"); npd = expect_func("neuron_predict")
            assert "sklearn" not in __code__, "Build the neuron with NumPy only."
            expect_close(ll(np.array([1, 0, 1]), np.array([0.9, 0.2, 0.6])), -np.mean(np.log([0.9, 0.8, 0.6])), "log_loss")
            expect_close(ll(np.array([1.0]), np.array([0.0])), -np.log(1e-12), "log_loss with p = 0 (clipped)")
            X, y = load_breast_cancer(return_X_y=True); Xs = StandardScaler().fit_transform(X)
            sig = lambda z: 1 / (1 + np.exp(-z))
            w, b = np.zeros(30), 0.0
            for _ in range(300):
                p = sig(Xs @ w + b); w = w - 0.5 * Xs.T @ (p - y) / len(y); b = b - 0.5 * np.mean(p - y)
            gw, gb = tn(Xs, y, lr=0.5, epochs=300)
            expect_array(np.asarray(gw), w, "the learned weights (300 epochs)")
            expect_close(gb, b, "the learned bias")
            acc = (np.asarray(npd(gw, gb, Xs)) == y).mean()
            assert acc > 0.95, "The neuron should classify more than 95% of the tumours correctly (it gets " + str(round(acc, 3)) + ")."` }],
        },
        {
          id: "ml11-3", title: "The Engine in a Box",
          story: "Hand-built engines teach you how it works. For real jobs, the Empire's foundry builds them ready-made.",
          lesson: `<p><code>MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)</code> is a <b>multi-layer perceptron</b>: inputs → a hidden layer of 32 neurons → outputs, trained with backpropagation.</p>
            <p>Neural networks need scaled inputs, and many settings (layers, learning rate, regularisation). On small tables they often don't beat simpler models; they shine with images, sound and text, at much larger scale (with libraries like PyTorch).</p>
            <p>(A "did not converge" warning means it could use more iterations; it's fine for this mission.)</p>`,
          example: d`
            from sklearn.datasets import load_iris
            from sklearn.neural_network import MLPClassifier
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler

            X, y = load_iris(return_X_y=True)
            m = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(8,), max_iter=500, random_state=0)).fit(X, y)
            print(m.score(X, y))`,
          task: `On the digits split with <code>test_size=0.25, random_state=0, stratify=y</code>, write <code>mlp_vs_logistic()</code> → a dict with the test accuracies (rounded to 3) of <code>"mlp"</code>: <code>make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0))</code> and <code>"logistic"</code>: <code>make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000))</code>.`,
          starter: d`
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neural_network import MLPClassifier
            from sklearn.linear_model import LogisticRegression

            def mlp_vs_logistic():
                pass
            `,
          solution: d`
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neural_network import MLPClassifier
            from sklearn.linear_model import LogisticRegression

            def mlp_vs_logistic():
                X, y = load_digits(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                mlp = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)).fit(Xtr, ytr)
                lr = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)).fit(Xtr, ytr)
                return {"mlp": round(float(mlp.score(Xte, yte)), 3), "logistic": round(float(lr.score(Xte, yte)), 3)}`,
          hints: ["Two pipelines on the same split", "MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)"],
          tests: [{ code: d`
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.neural_network import MLPClassifier
            from sklearn.linear_model import LogisticRegression
            ml = expect_func("mlp_vs_logistic")
            X, y = load_digits(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            a = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)).fit(Xtr, ytr).score(Xte, yte)
            b = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)).fit(Xtr, ytr).score(Xte, yte)
            expect_close(ml(), {"mlp": round(a, 3), "logistic": round(b, 3)}, "mlp_vs_logistic()")` }],
        },
        {
          id: "ml11-4", type: "quiz", title: "Riddles of the Engine",
          story: "The engine-keepers' riddles about neurons, layers and learning.",
          lesson: `<p>A neuron is a weighted sum plus a non-linear activation. Stacking layers lets a network bend its decision boundary. Gradient descent moves the weights a little against the gradient of the loss, step after step; backpropagation computes those gradients layer by layer with the chain rule.</p>`,
          questions: [
            { q: "Why can't a single perceptron learn XOR?",
              choices: ["XOR's two classes can't be separated by one straight line", "XOR needs more data", "the learning rate is too small", "XOR has no pattern"], answer: 0,
              explain: "(0,1) and (1,0) are 1, while (0,0) and (1,1) are 0: no single line splits them. A hidden layer solves it." },
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                relu = lambda z: np.maximum(0, z)
                print(relu(np.array([-2.0, 0.0, 3.0])), np.tanh(0.0))`,
              choices: ["[0. 0. 3.] 0.0", "[-2.  0.  3.] 0.0", "[0. 0. 3.] 1.0", "[2. 0. 3.] 0.0"], answer: 0,
              explain: "ReLU keeps positives and zeroes negatives; tanh(0) = 0." },
            { q: "Without non-linear activations, a 10-layer network is equivalent to…",
              choices: ["a single linear model", "a random forest", "a much more powerful model", "a k-means clustering"], answer: 0,
              explain: "Stacking linear functions gives another linear function. The non-linearity is what adds power." },
            { q: "The learning rate is far too large. What typically happens during training?",
              choices: ["the loss jumps around or explodes instead of decreasing", "training becomes slow but steady", "the model ignores the data", "nothing changes"], answer: 0,
              explain: "Steps that are too big overshoot the valley; steps that are too small crawl." },
            { q: "What does backpropagation compute?",
              choices: ["the gradient of the loss with respect to every weight, layer by layer (the chain rule)", "the predictions", "the best network size", "the test accuracy"], answer: 0,
              explain: "Gradient descent then uses those gradients to update the weights." },
          ],
        },
        {
          id: "ml11-5", boss: true, time: 1200, title: "Teach the Engine XOR",
          story: "The single neuron failed at XOR in 1969, and research nearly stopped for a decade. Add a hidden layer, write backpropagation, and succeed where it failed.",
          lesson: `<p>A 2-layer network: <code>h = tanh(X·W1 + b1)</code> (hidden layer), <code>p = σ(h·W2 + b2)</code> (output). Training, each epoch, with <code>Y</code> as a column (shape (n, 1)):</p>
            <pre class="out">dz2 = (p - Y) / n                 # output error
dW2 = h.T @ dz2;  db2 = dz2.sum(axis=0)
dh  = (dz2 @ W2.T) * (1 - h ** 2) # back through tanh
dW1 = X.T @ dh;   db1 = dh.sum(axis=0)
W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2</pre>
            <p>That's backpropagation: the chain rule, applied from the output back to the input.</p>`,
          example: d`
            import numpy as np

            rng = np.random.default_rng(1)
            W1 = rng.normal(0, 1, (2, 4)); W2 = rng.normal(0, 1, (4, 1))
            X = np.array([[0.0, 0], [0, 1], [1, 0], [1, 1]])
            h = np.tanh(X @ W1)
            print(h.shape, (1 / (1 + np.exp(-(h @ W2)))).ravel().round(3))`,
          task: `With NumPy only, the starter sets up XOR and the initial weights. Write:<br>
            • <code>forward(params, X)</code> → <code>(h, p)</code> as above<br>
            • <code>train_xor(epochs=3000, lr=1.0)</code> → <code>(params, losses)</code>: copy <code>init_params()</code>, then each epoch do a forward pass, append the log loss (mean binary cross-entropy of p vs Y) to <code>losses</code>, and update with the gradients above<br>
            • <code>predict_xor(params, X)</code> → a flat int array: 1 where p ≥ 0.5`,
          starter: d`
            import numpy as np

            X = np.array([[0.0, 0], [0, 1], [1, 0], [1, 1]])
            Y = np.array([[0.0], [1], [1], [0]])

            def init_params():
                rng = np.random.default_rng(1)
                return {"W1": rng.normal(0, 1, (2, 4)), "b1": np.zeros(4), "W2": rng.normal(0, 1, (4, 1)), "b2": np.zeros(1)}

            def sigmoid(z):
                return 1 / (1 + np.exp(-z))

            def forward(params, X):
                pass

            def train_xor(epochs=3000, lr=1.0):
                pass

            def predict_xor(params, X):
                pass
            `,
          solution: d`
            import numpy as np

            X = np.array([[0.0, 0], [0, 1], [1, 0], [1, 1]])
            Y = np.array([[0.0], [1], [1], [0]])

            def init_params():
                rng = np.random.default_rng(1)
                return {"W1": rng.normal(0, 1, (2, 4)), "b1": np.zeros(4), "W2": rng.normal(0, 1, (4, 1)), "b2": np.zeros(1)}

            def sigmoid(z):
                return 1 / (1 + np.exp(-z))

            def forward(params, X):
                h = np.tanh(X @ params["W1"] + params["b1"])
                p = sigmoid(h @ params["W2"] + params["b2"])
                return h, p

            def train_xor(epochs=3000, lr=1.0):
                P = {k: v.copy() for k, v in init_params().items()}
                losses = []
                n = len(X)
                for _ in range(epochs):
                    h, p = forward(P, X)
                    pc = np.clip(p, 1e-12, 1 - 1e-12)
                    losses.append(float(-np.mean(Y * np.log(pc) + (1 - Y) * np.log(1 - pc))))
                    dz2 = (p - Y) / n
                    dW2, db2 = h.T @ dz2, dz2.sum(axis=0)
                    dh = (dz2 @ P["W2"].T) * (1 - h ** 2)
                    dW1, db1 = X.T @ dh, dh.sum(axis=0)
                    P["W1"] -= lr * dW1; P["b1"] -= lr * db1
                    P["W2"] -= lr * dW2; P["b2"] -= lr * db2
                return P, losses

            def predict_xor(params, X):
                return (forward(params, X)[1] >= 0.5).astype(int).ravel()`,
          hints: ["forward: h = tanh(X @ W1 + b1); p = sigmoid(h @ W2 + b2)", "Record the loss BEFORE updating, each epoch", "Follow the five gradient lines in the lesson exactly", "predict: (p >= 0.5).astype(int).ravel()"],
          tests: [{ code: d`
            import numpy as np
            fw = expect_func("forward"); tx = expect_func("train_xor"); px = expect_func("predict_xor")
            assert "sklearn" not in __code__, "Build the network with NumPy only."
            X = np.array([[0.0, 0], [0, 1], [1, 0], [1, 1]]); Y = np.array([[0.0], [1], [1], [0]])
            rng = np.random.default_rng(1); P = {"W1": rng.normal(0, 1, (2, 4)), "b1": np.zeros(4), "W2": rng.normal(0, 1, (4, 1)), "b2": np.zeros(1)}
            h, p = fw(P, X)
            expect_array(np.asarray(h), np.tanh(X @ P["W1"]), "forward: hidden layer")
            sig = lambda z: 1 / (1 + np.exp(-z))
            expect_array(np.asarray(p), sig(np.tanh(X @ P["W1"]) @ P["W2"]), "forward: output")
            losses = []
            for _ in range(3000):
                h = np.tanh(X @ P["W1"] + P["b1"]); p = sig(h @ P["W2"] + P["b2"])
                losses.append(-np.mean(Y * np.log(p) + (1 - Y) * np.log(1 - p)))
                d2 = (p - Y) / 4; dh = (d2 @ P["W2"].T) * (1 - h ** 2)
                P["W2"] -= h.T @ d2; P["b2"] -= d2.sum(0); P["W1"] -= X.T @ dh; P["b1"] -= dh.sum(0)
            params, got = tx()
            expect_equal(len(got), 3000, "number of recorded losses")
            expect_close([got[0], got[999], got[-1]], [losses[0], losses[999], losses[-1]], "the loss at epochs 1, 1000 and 3000", tol=1e-5)
            expect_array(np.asarray(px(params, X)), [0, 1, 1, 0], "XOR predictions")
            assert got[-1] < 0.05, "After 3000 epochs the loss should be below 0.05."` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 12
    {
      id: 12, name: "The Automaton's Trial", topic: "four end-to-end machine-learning projects", time: 1200, icon: "🤴",
      intro: "At the top of the Clockwork Spire, King Turing sets the final trials: real projects, built properly from start to finish.",
      missions: [
        {
          id: "ml12-1", boss: true, time: 1200, title: "The Appraiser's Return",
          story: "The tax office's house appraiser ignored the district. Rebuild it with every feature, and let a forest challenge the straight line.",
          lesson: `<p>For regression model selection, cross-validate with <code>scoring="neg_root_mean_squared_error"</code> (sklearn maximises scores, so errors are negated: flip the sign back).</p>
            <p>District is a category: one-hot encode it in a ColumnTransformer; pass the numeric columns through (<code>"passthrough"</code>) or scale them.</p>`,
          example: d`
            import pandas as pd

            h = pd.read_csv("houses.csv")
            print(h.groupby("district")["price"].mean().round(0))`,
          files: { "houses.csv": HOUSES },
          task: `From <code>houses.csv</code> (features <code>size, rooms, age, garden, district</code>; target <code>price</code>), split with <code>test_size=0.25, random_state=7</code>. The preprocessor: <code>ColumnTransformer([("num", StandardScaler(), NUM), ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"])])</code>.<br>
            Candidates (each in <code>make_pipeline(preprocessor, model)</code>): <code>"linear"</code>: <code>LinearRegression()</code>; <code>"forest"</code>: <code>RandomForestRegressor(n_estimators=100, min_samples_leaf=3, random_state=0)</code>.<br>
            Write <code>appraiser()</code> → a dict: <code>"cv_rmse"</code> (<code>{name: mean 5-fold CV RMSE on the training data}</code>), <code>"best"</code> (lowest CV RMSE), <code>"test_rmse"</code> and <code>"test_r2"</code> of the best model fitted on the training data, and <code>"example"</code> (its predicted price for size 120, 4 rooms, age 10, garden 1, district Harbour). Round all numbers to 1 (R² to 3).`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LinearRegression
            from sklearn.ensemble import RandomForestRegressor
            from sklearn.metrics import mean_squared_error, r2_score

            NUM = ["size", "rooms", "age", "garden"]

            def appraiser():
                houses = pd.read_csv("houses.csv")
                return {}
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LinearRegression
            from sklearn.ensemble import RandomForestRegressor
            from sklearn.metrics import mean_squared_error, r2_score

            NUM = ["size", "rooms", "age", "garden"]

            def pre():
                return ColumnTransformer([("num", StandardScaler(), NUM), ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"])])

            def appraiser():
                houses = pd.read_csv("houses.csv")
                X, y = houses[NUM + ["district"]], houses["price"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=7)
                models = {"linear": LinearRegression(), "forest": RandomForestRegressor(n_estimators=100, min_samples_leaf=3, random_state=0)}
                cv = {n: round(float(-cross_val_score(make_pipeline(pre(), m), Xtr, ytr, cv=5, scoring="neg_root_mean_squared_error").mean()), 1)
                      for n, m in models.items()}
                best = min(models, key=lambda n: cv[n])
                final = make_pipeline(pre(), models[best]).fit(Xtr, ytr)
                p = final.predict(Xte)
                example = pd.DataFrame([[120, 4, 10, 1, "Harbour"]], columns=NUM + ["district"])
                return {"cv_rmse": cv, "best": best,
                        "test_rmse": round(float(np.sqrt(mean_squared_error(yte, p))), 1),
                        "test_r2": round(float(r2_score(yte, p)), 3),
                        "example": round(float(final.predict(example)[0]), 1)}`,
          hints: ["X = houses[NUM + [\"district\"]]", "CV RMSE: -cross_val_score(..., scoring=\"neg_root_mean_squared_error\").mean()", "best = the name with the LOWEST RMSE", "example = pd.DataFrame([[120, 4, 10, 1, \"Harbour\"]], columns=NUM + [\"district\"])"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LinearRegression
            from sklearn.ensemble import RandomForestRegressor
            ap = expect_func("appraiser")
            N = ["size", "rooms", "age", "garden"]
            pre = lambda: ColumnTransformer([("num", StandardScaler(), N), ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"])])
            h = pd.read_csv("houses.csv"); Xtr, Xte, ytr, yte = train_test_split(h[N + ["district"]], h.price, test_size=0.25, random_state=7)
            ms = {"linear": LinearRegression(), "forest": RandomForestRegressor(n_estimators=100, min_samples_leaf=3, random_state=0)}
            cv = {n: round(-cross_val_score(make_pipeline(pre(), m), Xtr, ytr, cv=5, scoring="neg_root_mean_squared_error").mean(), 1) for n, m in ms.items()}
            best = min(ms, key=lambda n: cv[n]); f = make_pipeline(pre(), ms[best]).fit(Xtr, ytr); p = f.predict(Xte)
            got = ap()
            expect_equal(got.get("best"), best, "best")
            expect_close(got.get("cv_rmse"), cv, "cv_rmse", tol=1e-4)
            expect_close([got.get("test_rmse"), got.get("test_r2"), got.get("example")],
                         [round(np.sqrt(((yte - p) ** 2).mean()), 1), round(1 - ((yte - p) ** 2).sum() / ((yte - yte.mean()) ** 2).sum(), 3),
                          round(f.predict(pd.DataFrame([[120, 4, 10, 1, "Harbour"]], columns=N + ["district"]))[0], 1)], "test_rmse, test_r2, example", tol=1e-4)` }],
        },
        {
          id: "ml12-2", boss: true, time: 1200, title: "The Pass Champion",
          story: "The guild wants the best possible guard for the Dragon's Pass: a tuned forest, judged fairly, explained clearly.",
          lesson: `<p><code>GridSearchCV</code> on a full pipeline tunes the model's settings with cross-validation, keeping the preprocessing inside every fold. Report the chosen settings, the CV score, and the final test accuracy and AUC.</p>`,
          example: d`
            print({"randomforestclassifier__max_depth": [3, 6, None]})`,
          files: { "adventurers.csv": ADVENTURERS },
          task: `Split the adventurers (all features) with <code>test_size=0.25, random_state=3, stratify=y</code>. Using the Column Workshop preprocessor, run <code>GridSearchCV(make_pipeline(preprocessor, RandomForestClassifier(n_estimators=60, random_state=0)), grid, cv=5)</code> on the training data, with grid <code>{"randomforestclassifier__max_depth": [3, 6, None], "randomforestclassifier__min_samples_leaf": [1, 5]}</code>.<br>
            Write <code>champion()</code> → a dict: <code>"max_depth"</code> and <code>"min_samples_leaf"</code> (the best settings), <code>"cv"</code> (best CV accuracy), <code>"test_acc"</code> and <code>"test_auc"</code> (rounded to 3).`,
          starter: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import roc_auc_score

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])

            def champion():
                pass
            `,
          solution: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import roc_auc_score

            NUM = ["age", "level", "gold", "has_map", "party"]
            CAT = ["class", "guild"]

            def make_preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), CAT),
                ])

            def champion():
                adv = pd.read_csv("adventurers.csv")
                X, y = adv.drop(columns="returned"), adv["returned"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
                grid = {"randomforestclassifier__max_depth": [3, 6, None], "randomforestclassifier__min_samples_leaf": [1, 5]}
                search = GridSearchCV(make_pipeline(make_preprocessor(), RandomForestClassifier(n_estimators=60, random_state=0)), grid, cv=5).fit(Xtr, ytr)
                bp = search.best_params_
                return {"max_depth": bp["randomforestclassifier__max_depth"], "min_samples_leaf": bp["randomforestclassifier__min_samples_leaf"],
                        "cv": round(float(search.best_score_), 3), "test_acc": round(float(search.score(Xte, yte)), 3),
                        "test_auc": round(float(roc_auc_score(yte, search.predict_proba(Xte)[:, 1])), 3)}`,
          hints: ["GridSearchCV(make_pipeline(make_preprocessor(), RandomForestClassifier(...)), grid, cv=5).fit(Xtr, ytr)", "search.best_params_ holds the long names", "AUC: roc_auc_score(yte, search.predict_proba(Xte)[:, 1])"],
          tests: [{ code: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, GridSearchCV
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import roc_auc_score
            ch = expect_func("champion")
            pre = ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "level", "gold", "has_map", "party"]),
                ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), ["class", "guild"])])
            adv = pd.read_csv("adventurers.csv"); X, y = adv.drop(columns="returned"), adv["returned"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=3, stratify=y)
            g = GridSearchCV(make_pipeline(pre, RandomForestClassifier(n_estimators=60, random_state=0)),
                             {"randomforestclassifier__max_depth": [3, 6, None], "randomforestclassifier__min_samples_leaf": [1, 5]}, cv=5).fit(Xtr, ytr)
            got = ch()
            expect_equal((got.get("max_depth"), got.get("min_samples_leaf")), (g.best_params_["randomforestclassifier__max_depth"], g.best_params_["randomforestclassifier__min_samples_leaf"]), "best settings")
            expect_close([got.get("cv"), got.get("test_acc"), got.get("test_auc")],
                         [round(g.best_score_, 3), round(g.score(Xte, yte), 3), round(roc_auc_score(yte, g.predict_proba(Xte)[:, 1]), 3)], "cv, test_acc, test_auc")` }],
        },
        {
          id: "ml12-3", boss: true, time: 1200, title: "The Physician's Machine",
          story: "The royal physicians will only use the tumour classifier if it catches at least 98% of malignant tumours. Choose its threshold honestly.",
          lesson: `<p>A decision threshold is a setting too, so it must be chosen on data the final test never sees. Split the training data again into a <b>fitting</b> part and a <b>validation</b> part: fit the model, pick the threshold on validation, then report on the untouched test set.</p>
            <p>Here the dangerous class is <b>malignant</b> (y = 0), so use <code>predict_proba(X)[:, 0]</code> as the "malignant score" and flag a tumour when the score ≥ t.</p>`,
          example: d`
            import numpy as np

            score = np.array([0.9, 0.3, 0.6, 0.05]); malignant = np.array([1, 0, 1, 0])
            for t in (0.5, 0.25):
                flagged = score >= t
                print(t, (flagged & (malignant == 1)).sum() / malignant.sum())`,
          task: `Load the breast cancer data. Split <code>test_size=0.25, random_state=0, stratify=y</code> into train and test; then split the train part again (<code>test_size=0.25, random_state=1, stratify</code> on it) into fit and validation parts. Fit <code>make_pipeline(StandardScaler(), LogisticRegression())</code> on the fit part.<br>
            Write <code>physician()</code> → a dict:<br>
            • <code>"threshold"</code>: the <b>highest</b> t among the validation malignant scores such that validation recall of malignant ≥ 0.98<br>
            • <code>"test_recall"</code>, <code>"test_precision"</code>: malignant recall and precision on the test set at that threshold<br>
            • <code>"default_recall"</code>: malignant recall on the test set at t = 0.5<br>All rounded to 3.`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def physician():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression

            def recall_precision(mal, score, t):
                flagged = score >= t
                tp = (flagged & mal).sum()
                return tp / mal.sum(), (tp / flagged.sum() if flagged.sum() else 0.0)

            def physician():
                X, y = load_breast_cancer(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                Xf, Xv, yf, yv = train_test_split(Xtr, ytr, test_size=0.25, random_state=1, stratify=ytr)
                model = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xf, yf)
                sv, st = model.predict_proba(Xv)[:, 0], model.predict_proba(Xte)[:, 0]
                mv, mt = yv == 0, yte == 0
                t = max(s for s in np.unique(sv) if recall_precision(mv, sv, s)[0] >= 0.98)
                r, p = recall_precision(mt, st, t)
                return {"threshold": round(float(t), 3), "test_recall": round(float(r), 3), "test_precision": round(float(p), 3),
                        "default_recall": round(float(recall_precision(mt, st, 0.5)[0]), 3)}`,
          hints: ["Two splits: train/test, then fit/validation inside train", "Malignant score = predict_proba(X)[:, 0]; malignant = (y == 0)", "Try every unique validation score as t; keep the highest with recall ≥ 0.98", "Then measure recall and precision on the test set at that t"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_breast_cancer
            from sklearn.model_selection import train_test_split
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.linear_model import LogisticRegression
            ph = expect_func("physician")
            X, y = load_breast_cancer(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            Xf, Xv, yf, yv = train_test_split(Xtr, ytr, test_size=0.25, random_state=1, stratify=ytr)
            m = make_pipeline(StandardScaler(), LogisticRegression()).fit(Xf, yf)
            sv, st = m.predict_proba(Xv)[:, 0], m.predict_proba(Xte)[:, 0]
            rec = lambda mal, s, t: ((s >= t) & mal).sum() / mal.sum()
            t = max(s for s in np.unique(sv) if rec(yv == 0, sv, s) >= 0.98)
            fl = st >= t
            want = {"threshold": round(t, 3), "test_recall": round(rec(yte == 0, st, t), 3), "test_precision": round((fl & (yte == 0)).sum() / fl.sum(), 3),
                    "default_recall": round(rec(yte == 0, st, 0.5), 3)}
            expect_close(ph(), want, "physician()")` }],
        },
        {
          id: "ml12-4", boss: true, time: 1200, title: "King Turing's Last Trial",
          story: "The final trial: choose the best digit reader by fair comparison, test it once, and write its model card. Then King Turing is free.",
          lesson: `<p>A <b>model card</b> documents a model honestly: what was compared, how it was chosen, how well it does on unseen data, and where it is weakest. Per-class recall (<code>recall_score(y, p, average=None)</code>) reveals which digits it struggles with.</p>`,
          example: d`
            from sklearn.metrics import recall_score
            print(recall_score([0, 0, 1, 1, 2, 2], [0, 0, 1, 2, 2, 2], average=None))`,
          task: `On the digits, split with <code>test_size=0.25, random_state=0, stratify=y</code>. Candidates: <code>"pca_logistic"</code>: <code>make_pipeline(StandardScaler(), PCA(n_components=30, random_state=0), LogisticRegression(max_iter=2000))</code>; <code>"knn"</code>: <code>KNeighborsClassifier(n_neighbors=3)</code>; <code>"forest"</code>: <code>RandomForestClassifier(n_estimators=100, random_state=0)</code>.<br>
            Write <code>model_card()</code> → a dict: <code>"cv"</code> (<code>{name: mean 3-fold CV accuracy on the training data, rounded to 3}</code>), <code>"chosen"</code> (highest CV; first in the order above on a tie), <code>"test_acc"</code> (the chosen model fitted on the training data, rounded to 3), <code>"weakest_digit"</code> (the digit with the lowest test recall; the smallest digit on a tie) and <code>"weakest_recall"</code> (rounded to 3).`,
          starter: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import recall_score

            def model_card():
                pass
            `,
          solution: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import recall_score

            def model_card():
                X, y = load_digits(return_X_y=True)
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                models = {
                    "pca_logistic": make_pipeline(StandardScaler(), PCA(n_components=30, random_state=0), LogisticRegression(max_iter=2000)),
                    "knn": KNeighborsClassifier(n_neighbors=3),
                    "forest": RandomForestClassifier(n_estimators=100, random_state=0),
                }
                cv = {n: round(float(cross_val_score(m, Xtr, ytr, cv=3).mean()), 3) for n, m in models.items()}
                chosen = max(models, key=lambda n: cv[n])
                model = models[chosen].fit(Xtr, ytr)
                pred = model.predict(Xte)
                rec = recall_score(yte, pred, average=None)
                weakest = int(np.argmin(rec))
                return {"cv": cv, "chosen": chosen, "test_acc": round(float((pred == yte).mean()), 3),
                        "weakest_digit": weakest, "weakest_recall": round(float(rec[weakest]), 3)}`,
          hints: ["cv: {name: round(cross_val_score(m, Xtr, ytr, cv=3).mean(), 3)}", "chosen = max(models, key=lambda n: cv[n])", "rec = recall_score(yte, pred, average=None); weakest = np.argmin(rec)"],
          tests: [{ code: d`
            import numpy as np
            from sklearn.datasets import load_digits
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.pipeline import make_pipeline
            from sklearn.preprocessing import StandardScaler
            from sklearn.decomposition import PCA
            from sklearn.linear_model import LogisticRegression
            from sklearn.neighbors import KNeighborsClassifier
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import recall_score
            mc = expect_func("model_card")
            X, y = load_digits(return_X_y=True)
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ms = {"pca_logistic": make_pipeline(StandardScaler(), PCA(n_components=30, random_state=0), LogisticRegression(max_iter=2000)),
                  "knn": KNeighborsClassifier(n_neighbors=3), "forest": RandomForestClassifier(n_estimators=100, random_state=0)}
            cv = {n: round(cross_val_score(m, Xtr, ytr, cv=3).mean(), 3) for n, m in ms.items()}
            ch = max(ms, key=lambda n: cv[n]); pred = ms[ch].fit(Xtr, ytr).predict(Xte); rec = recall_score(yte, pred, average=None)
            got = mc()
            expect_close(got.get("cv"), cv, "cv"); expect_equal(got.get("chosen"), ch, "chosen")
            expect_equal(got.get("weakest_digit"), int(np.argmin(rec)), "weakest_digit")
            expect_close([got.get("test_acc"), got.get("weakest_recall")], [round((pred == yte).mean(), 3), round(rec.min(), 3)], "test_acc, weakest_recall")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "ml", name: "Machine Learning", realm: "The Automaton Empire", tower: "The Clockwork Spire",
    ruler: "King Turing", rulerIcon: "🤴", icon: "🤖", color: "#ef5a6f", requires: ["pandas", "stats"],
    packages: ["numpy", "pandas", "scikit-learn"], runMs: 25000, submitMs: 45000,
    blurb: "Teach computers to predict with scikit-learn, and build a neural network from scratch.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
