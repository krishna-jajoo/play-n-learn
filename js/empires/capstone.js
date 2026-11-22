// The Capstone: the Imperial Capital. The Emperor waits at the top of the Emperor's Palace.
// Projects that combine SQL (sqlite3 from Python), pandas, matplotlib and scikit-learn on three generated datasets.
(function (root) {
  const { d } = root.QUEST;

  // ───────────────────────────── datasets (generated once, deterministic)
  const CENSUS = `citizen_id,province,age,occupation,income,household
1001,East ,81,Farmer,255,3
1002,SOUTH,65,Scholar,531,5
1003,West,45,Merchant,583,4
1004,south,55,Merchant,1059,2
1005,north,32,Smith,317,2
1006,East,43,Merchant,1270,4
1007,West,20,Farmer,312,2
1008, West,41,Merchant,314,4
1025,west,42,Farmer,233,1
1009,East,32,Soldier,384,4
1010,South,48,Scholar,939,6
1011,North,45,Farmer,241,5
1012,Capital,74,Soldier,393,4
1013,Capital ,50,Scholar,656,2
1305,East,36,Smith,350,2
1014,north,38,Merchant,669,2
1015,West,27,Soldier,246,5
1016,Capital,33,Soldier,567,4
1017,south,38,Merchant,560,1
1018,CAPITAL,,Farmer,419,5
1019,South,32,Smith,441,2
1020,East ,40,Merchant,646,6
1021,North,,Scholar,686,4
1022,north,16,Farmer,377,3
1023,west,35,Soldier,361,3
1024,capital,,Merchant,1516,2
1025,west,42,Farmer,233,1
1026,EAST,40,Merchant,840,6
1027,Capital,48,Merchant,992,3
1028,East,46,Farmer,319,3
1029,East ,16,Soldier,562,5
1030,Capital,32,Scholar,679,1
1031,Capital,24,Smith,542,2
1032,West ,49,Soldier,396,1
1033,Capital,39,Merchant,757,5
1034,Capital,51,Scholar,529,1
1035,South ,31,Farmer,484,6
1036, Capital,20,Soldier,610,3
1037,South,51,Farmer,391,2
1038,SOUTH,49,Scholar,689,3
1039,Capital,42,Soldier,684,6
1040,north,16,Soldier,396,4
1041,West,64,Farmer,,5
1042,Capital,70,Scholar,661,4
1043, North,58,Smith,385,5
1044,South ,27,Farmer,195,6
1045,East,49,Farmer,359,5
1046,SOUTH,49,Farmer,317,3
1047,North,33,Soldier,405,5
1048,south,65,Farmer,459,1
1049,East,68,Soldier,427,3
1050,Capital ,55,Smith,581,2
1051,South,36,Merchant,561,5
1052,North,34,Farmer,280,4
1053,Capital ,54,Scholar,791,1
1054,West,46,Farmer,199,3
1055,Capital ,19,Scholar,723,2
1056, West,40,Soldier,247,5
1057,South,16,Farmer,361,1
1058,West,52,Farmer,316,6
1059,CAPITAL,17,Scholar,980,1
1060,South,47,Farmer,246,2
1061,West,24,Smith,377,4
1062,West,36,Smith,292,6
1063,North ,38,Farmer,287,1
1064, West,54,Farmer,343,5
1065,Capital,48,Merchant,960,5
1066,CAPITAL,17,Soldier,371,2
1067,Capital,56,Merchant,1278,5
1068,Capital,56,Soldier,446,6
1069,Capital,61,Farmer,277,3
1070,South,45,Soldier,381,4
1563,South,22,Merchant,456,3
1071,South,27,Farmer,309,5
1072,West,54,Farmer,336,3
1073,north,40,Farmer,228,3
1074,East,23,Merchant,742,6
1075,North,30,Merchant,632,5
1076,North,72,Scholar,554,5
1077,Capital,25,Scholar,1248,3
1078,West,55,Farmer,294,5
1079,south,36,Smith,210,3
1080,North,44,Smith,349,6
1081,WEST,67,Soldier,452,5
1082,South,16,Merchant,605,2
1083,north,16,Farmer,320,1
1084, Capital,,Merchant,399,3
1085,East,47,Merchant,1044,6
1086,South,51,Farmer,204,2
1087,Capital,17,Farmer,413,4
1088,South,39,Farmer,234,1
1089,Capital,41,Merchant,594,2
1090,Capital,21,Soldier,709,1
1091,Capital,62,Soldier,555,4
1092,WEST,16,Smith,397,3
1093,South,38,Merchant,880,2
1094,North,67,Scholar,303,1
1095,Capital,21,Merchant,740,4
1096,west,,Farmer,299,1
1097,South,38,Merchant,831,5
1098,West,39,Soldier,360,2
1099,Capital,16,Merchant,648,1
1100,North,29,Smith,411,5
1101,East,30,Smith,409,3
1102,north,56,Farmer,264,1
1103,capital,40,Smith,721,3
1104,North,39,Farmer,355,4
1105,Capital,18,Smith,551,6
1106,East,46,Scholar,527,3
1107,Capital,41,Smith,761,3
1108,north,46,Soldier,343,5
1109,Capital,66,Merchant,1016,6
1110,Capital,49,Merchant,833,5
1112,North,49,Farmer,,6
1111,SOUTH,23,Farmer,,5
1112,North,49,Farmer,,6
1113,north,30,Soldier,435,5
1114, East,28,Merchant,924,2
1115,Capital,63,Farmer,503,1
1116,Capital,,Scholar,745,6
1117,West,44,Merchant,477,6
1118,South,44,Smith,443,3
1119,Capital,16,Soldier,611,3
1120,capital,49,Scholar,761,3
1121,Capital,39,Merchant,1200,1
1122,Capital,47,Merchant,979,2
1123,West,41,Smith,473,1
1124,CAPITAL,68,Scholar,665,2
1125,Capital,50,Smith,874,1
1126,North,19,Farmer,279,3
1127,West,42,Merchant,713,3
1128,North,57,Smith,472,5
1129,East,59,Farmer,331,5
1130,Capital,,Scholar,1210,1
1131,West,44,Soldier,304,6
1132,SOUTH,,Merchant,649,2
1133,North,,Smith,480,3
1134,Capital,45,Scholar,825,3
1135,East,57,Smith,449,2
1136,South,38,Farmer,395,5
1137,Capital,38,Merchant,753,4
1138,north,36,Soldier,452,4
1139,capital,33,Soldier,489,3
1140,south,51,Smith,444,2
1141,Capital,74,Merchant,1374,1
1142,South,55,Smith,441,1
1143,South,28,Merchant,870,4
1144,north,28,Soldier,,5
1145,south,70,Farmer,,5
1146,West,61,Smith,373,1
1147,west,40,Farmer,245,3
1148,North,18,Smith,443,5
1149,West ,26,Farmer,298,1
1150,east,25,Soldier,451,5
1151,Capital,24,Merchant,825,2
1152,south,,Merchant,958,5
1153,west,32,Farmer,207,4
1154,South,43,Smith,471,1
1155,East,56,Merchant,784,6
1156,north,29,Farmer,245,6
1157,South,53,Farmer,300,3
1158,Capital,39,Scholar,1157,3
1159,South,61,Farmer,268,5
1160,South,36,Smith,474,5
1161,south,77,Merchant,557,6
1162,South,55,Merchant,297,2
1163,North,68,Soldier,509,1
1164,South,16,Smith,477,3
1165, North,63,Scholar,502,1
1166,west,40,Farmer,307,1
1167,North,47,Farmer,235,1
1168,North,29,Smith,,3
1169,Capital,42,Merchant,831,5
1170,South,51,Scholar,552,5
1171,Capital,45,Scholar,662,5
1172,East,41,Farmer,360,6
1173,East,38,Farmer,440,2
1174,West,58,Smith,327,4
1175,Capital,64,Smith,701,2
1176,South,45,Farmer,,3
1177,Capital,49,Smith,725,5
1178,Capital,53,Scholar,522,6
1179,Capital,41,Merchant,756,5
1180, Capital,59,Merchant,1210,5
1181,West,34,Smith,321,6
1182, Capital,23,Smith,398,1
1183,WEST,28,Farmer,253,2
1184,Capital,48,Scholar,786,4
1185,South,44,Farmer,222,1
1186,South ,38,Smith,328,5
1187,West,,Farmer,163,4
1188,West,55,Farmer,290,1
1189,Capital,27,Merchant,1147,3
1190,EAST,25,Merchant,816,4
1191,North,43,Farmer,285,6
1192,Capital,32,Soldier,563,4
1193,Capital,44,Farmer,541,5
1194,Capital,25,Merchant,928,2
1195,West,,Soldier,443,3
1196,north,73,Merchant,533,2
1197,North,56,Soldier,495,5
1198,capital,31,Farmer,522,6
1199,east,34,Scholar,626,4
1200, North,42,Merchant,754,4
1201,North,26,Smith,358,1
1202,capital,43,Scholar,1011,4
1203,south,48,Merchant,685,1
1204,North,45,Soldier,371,3
1205,North ,49,Smith,344,4
1206,South,47,Smith,727,6
1207,Capital,21,Merchant,1270,5
1189,Capital,27,Merchant,1147,3
1208,East ,41,Farmer,385,6
1209,Capital,36,Scholar,896,1
1210,Capital ,47,Farmer,431,2
1211, North,62,Soldier,408,3
1212, West,43,Farmer,312,1
1213,South,43,Scholar,480,3
1214,Capital,26,Smith,487,2
1215,east,70,Smith,489,2
1216,Capital,49,Merchant,544,1
1217, North,44,Merchant,621,1
1218,North,16,Smith,338,4
1219,East,61,Smith,473,5
1220,East,30,Soldier,405,6
1221,East,52,Soldier,507,5
1222,North,50,Farmer,292,3
1223,capital,84,Farmer,367,1
1224,SOUTH,34,Scholar,492,1
1225,North,,Farmer,325,5
1223,capital,84,Farmer,367,1
1226,South,44,Merchant,564,2
1227,capital,58,Merchant,906,4
1228,Capital,35,Soldier,446,5
1229, North,38,Merchant,632,3
1230,east,55,Farmer,326,4
1231,South,53,Merchant,938,3
1232,East,30,Scholar,665,3
1233,south,34,Smith,367,2
1234,CAPITAL,46,Scholar,675,1
1235,West ,45,Smith,347,1
1236,South,34,Farmer,235,3
1237,south,44,Smith,501,5
1238,North,51,Farmer,290,3
1239,capital,62,Merchant,796,2
1240,north,20,Soldier,254,3
1241,south,,Merchant,770,3
1242,Capital,26,Soldier,268,1
1243,North,40,Smith,371,3
1244,East,38,Scholar,925,1
1245,Capital,47,Scholar,640,6
1246,South,38,Farmer,355,3
1247, South,66,Farmer,436,3
1248,south,30,Smith,397,2
1249,Capital,44,Merchant,663,4
1250,Capital,16,Merchant,917,1
1251,Capital,38,Scholar,750,2
1252, East,16,Merchant,926,2
1253,west,43,Soldier,,1
1254,Capital,39,Scholar,1214,2
1255,South,72,Soldier,431,5
1256,Capital,59,Soldier,450,6
1454,South,49,Merchant,1164,1
1257, West,21,Scholar,431,5
1258,north,36,Farmer,239,2
1259,East ,17,Merchant,888,5
1260,South,36,Farmer,331,5
1261,capital,,Smith,653,2
1262,South,34,Soldier,277,5
1263,Capital,29,Farmer,648,2
1264,Capital,16,Scholar,875,1
1265,East,42,Merchant,1233,2
1266,South,47,Smith,544,3
1267,capital,26,Smith,651,1
1268,capital,52,Farmer,464,5
1269,North,45,Farmer,384,1
1270,East,65,Scholar,447,5
1271,South,57,Smith,440,2
1272, South,16,Farmer,390,4
1273,East,49,Smith,401,5
1274,West,53,Farmer,283,2
1275,south,21,Farmer,256,5
1276,capital,37,Soldier,419,2
1277,East,55,Merchant,579,4
1278,south,70,Smith,453,1
1191,North,43,Farmer,285,6
1279,Capital,36,Smith,483,1
1280,South,20,Smith,466,2
1281,south,28,Soldier,381,3
1282,Capital,40,Smith,514,6
1283,West,39,Soldier,326,1
1284,East,55,Smith,410,6
1285,East,16,Scholar,672,4
1286,South,52,Merchant,690,6
1287,capital,20,Soldier,488,5
1288,NORTH,16,Farmer,339,3
1289,East ,46,Smith,368,6
1290,South,33,Scholar,948,6
1291,South,88,Farmer,225,1
1292,North,39,Scholar,653,6
1293,Capital,44,Soldier,,6
1294,Capital,43,Merchant,1178,3
1295,West,27,Scholar,542,4
1296,north,32,Farmer,227,1
1297,East,37,Scholar,562,3
1298,North,35,Farmer,267,6
1299,Capital,63,Merchant,943,6
1300,Capital,30,Soldier,374,4
1301,south,53,Scholar,374,3
1302,Capital,49,Scholar,600,2
1303, Capital,57,Merchant,1343,3
1304, West,49,Farmer,329,1
1305,East,36,Smith,350,2
1306,West,76,Farmer,412,6
1307,South,69,Farmer,251,4
1308,north,38,Soldier,368,5
1321,East,30,Soldier,408,1
1309, North,53,Farmer,237,6
1310,East,39,Soldier,368,5
1311,Capital,29,Scholar,,1
1312,North ,51,Farmer,604,4
1313,south,24,Farmer,320,4
1314,east,48,Soldier,236,3
1315,East,54,Farmer,318,2
1316,north,52,Smith,400,6
1317,capital,30,Scholar,648,5
1318,capital,35,Farmer,487,3
1319,North,55,Smith,355,3
1320,capital,46,Farmer,425,3
1321,East,30,Soldier,408,1
1322,Capital,,Soldier,746,5
1323,Capital,31,Merchant,790,6
1324,West,,Farmer,265,3
1325,West,16,Soldier,207,3
1326, East,33,Farmer,255,1
1327,north,48,Farmer,,5
1328,South,43,Smith,365,4
1329,East ,17,Farmer,193,1
1330,North,65,Farmer,281,2
1331,South,63,Farmer,310,4
1332,West,24,Scholar,,5
1333,capital,62,Soldier,593,5
1334, North,59,Farmer,325,5
1335,CAPITAL,32,Smith,480,3
1336,south,,Scholar,803,6
1337,Capital ,65,Scholar,976,1
1338,West,26,Soldier,277,5
1339,South,40,Farmer,357,3
1340,North,45,Merchant,594,2
1341,Capital,55,Merchant,943,3
1342,North,66,Smith,504,1
1343,West,40,Farmer,239,5
1344,North,41,Merchant,660,6
1345,Capital ,49,Scholar,921,1
1346,CAPITAL,17,Soldier,317,5
1347,South,34,Smith,451,1
1348,East,29,Merchant,1018,4
1349,Capital,35,Scholar,789,1
1350, South,26,Scholar,398,4
1351,NORTH,54,Farmer,225,3
1352,North,39,Farmer,367,1
1353,North,,Farmer,243,6
1354,North,30,Soldier,320,6
1355,south,36,Farmer,454,2
1356,east,46,Smith,512,4
1357,Capital,42,Scholar,840,6
1358,South,54,Farmer,353,6
1359,South ,57,Merchant,891,1
1290,South,33,Scholar,948,6
1360, Capital,32,Merchant,1142,2
1361,CAPITAL,33,Soldier,383,3
1362,capital,55,Merchant,1201,1
1363,South,34,Farmer,258,3
1364,North,,Farmer,386,5
1365,East,63,Merchant,591,3
1366,CAPITAL,47,Scholar,1226,5
1367,west,53,Scholar,349,4
1368,West,57,Smith,,1
1369,east,37,Smith,479,2
1004,south,55,Merchant,1059,2
1370,south,,Farmer,254,3
1371,NORTH,67,Farmer,313,3
1372,SOUTH,42,Scholar,877,6
1373,Capital ,16,Farmer,292,2
1374,NORTH,24,Smith,,1
1375,North,29,Soldier,392,1
1376,East,53,Scholar,624,1
1377,West,45,Merchant,550,3
1378,West ,,Farmer,251,6
1379,South,20,Merchant,580,4
1380,West,44,Merchant,593,3
1381,West,45,Smith,369,1
1382,CAPITAL,43,Scholar,821,4
1383,West ,31,Farmer,219,2
1384,Capital ,53,Soldier,514,1
1385, Capital,39,Scholar,676,2
1386,West,16,Scholar,904,2
1387,capital,40,Scholar,726,1
1388,Capital,24,Smith,647,2
1389,capital,83,Soldier,715,4
1390,North,58,Soldier,375,6
1391, South,44,Smith,465,2
1392,east,46,Soldier,317,6
1393,Capital,22,Soldier,501,2
1394,South,56,Farmer,292,2
1395,Capital,41,Merchant,608,2
1396,North,22,Farmer,191,5
1397,North,27,Merchant,648,3
1398,south,47,Farmer,273,5
1399,capital,48,Merchant,1063,1
1400,capital,25,Soldier,823,3
1401,West,31,Farmer,161,6
1402,Capital,41,Soldier,575,3
1403,East,37,Merchant,960,1
1404,West ,67,Farmer,,5
1405,north,40,Soldier,434,5
1406,capital,16,Merchant,363,5
1407,South,54,Merchant,674,5
1408,South ,47,Farmer,271,2
1409,east,16,Soldier,350,6
1006,East,43,Merchant,1270,4
1410,North,53,Farmer,377,3
1411,South ,46,Merchant,879,2
1412,EAST,32,Smith,624,5
1413,Capital,40,Merchant,878,6
1414,WEST,73,Soldier,,4
1415,NORTH,37,Smith,415,2
1416, South,25,Merchant,806,5
1417,Capital,17,Smith,421,3
1418,EAST,,Smith,381,6
1419,north,22,Scholar,589,2
1420,Capital ,30,Scholar,671,6
1297,East,37,Scholar,562,3
1421,East,,Merchant,618,6
1422,West,33,Scholar,500,4
1423,South,44,Smith,382,6
1424,west,65,Farmer,386,6
1425, Capital,36,Smith,580,2
1426,east,21,Farmer,343,1
1427,South,42,Smith,431,5
1428,Capital ,31,Merchant,1091,5
1429,WEST,35,Farmer,,6
1430,capital,53,Smith,532,1
1431,Capital,32,Smith,533,4
1432,West,67,Farmer,266,1
1433,South,48,Farmer,448,3
1434, South,56,Farmer,334,3
1435,North,80,Farmer,158,3
1436,capital,34,Soldier,683,3
1437,North,46,Farmer,376,6
1438,west,57,Soldier,,1
1439,east,40,Smith,445,3
1440,west,43,Smith,669,1
1441,West,44,Farmer,282,6
1442,WEST,25,Scholar,531,6
1443,West,41,Farmer,288,4
1444,Capital ,83,Scholar,741,4
1256,Capital,59,Soldier,450,6
1445, East,42,Smith,470,2
1446, South,51,Farmer,292,1
1447,west,50,Soldier,310,1
1448,west,63,Soldier,256,5
1449,capital,57,Merchant,841,1
1450, East,36,Scholar,762,3
1451,North,55,Farmer,228,1
1452,South,27,Farmer,,4
1453,West,41,Farmer,267,2
1454,South,49,Merchant,1164,1
1455,capital,28,Scholar,672,4
1456,North,38,Scholar,,1
1457,North,87,Farmer,354,2
1458,south,43,Scholar,474,3
1459,South,53,Farmer,332,4
1460,South,35,Merchant,396,4
1461,Capital,28,Scholar,1098,6
1462,Capital ,27,Merchant,,6
1463,Capital,34,Merchant,561,4
1464,North ,32,Smith,408,6
1465,Capital,23,Smith,501,6
1466,Capital,19,Merchant,798,3
1467, West,63,Farmer,215,1
1468,Capital,54,Scholar,700,5
1270,East,65,Scholar,447,5
1469,West ,24,Farmer,272,1
1470,West ,,Merchant,627,2
1471,South,28,Smith,431,6
1085,East,47,Merchant,1044,6
1472,Capital,41,Soldier,333,6
1473,North,16,Soldier,410,6
1474,south,39,Farmer,250,5
1475,South,30,Farmer,194,2
1476,Capital,30,Merchant,739,3
1477,West,46,Farmer,315,4
1478,Capital,52,Merchant,1148,2
1479,Capital,72,Farmer,329,6
1480,capital,57,Farmer,381,6
1481,Capital,32,Merchant,660,4
1482,South,45,Farmer,315,5
1483,Capital,43,Soldier,469,5
1484,West,49,Soldier,401,4
1485,West,55,Farmer,291,5
1486,West,29,Soldier,378,3
1487,West,47,Farmer,237,1
1488,CAPITAL,,Merchant,1066,4
1489,North,38,Soldier,336,5
1490,South,30,Scholar,1040,1
1491,South,30,Smith,537,1
1492,north,28,Farmer,270,1
1493,South,37,Smith,544,2
1494, Capital,42,Soldier,,1
1495,east,36,Scholar,497,6
1496,East,51,Smith,325,6
1497,capital,44,Merchant,892,4
1498,East,,Smith,315,6
1499,South,51,Smith,556,5
1500,North,45,Farmer,219,4
1501,SOUTH,44,Merchant,836,4
1502,south,53,Merchant,1036,1
1503,South ,64,Farmer,361,1
1504,North,33,Soldier,302,1
1505,East,21,Scholar,486,3
1506,South,55,Smith,486,2
1507,Capital ,42,Merchant,651,6
1508,north,33,Farmer,200,5
1509,South,23,Merchant,761,6
1510,West ,58,Farmer,248,5
1511,Capital,23,Smith,538,3
1512,Capital,39,Soldier,452,2
1513,South,62,Farmer,280,5
1514,West,29,Farmer,235,4
1515,south,55,Merchant,715,2
1516,Capital,33,Merchant,609,2
1517,NORTH,58,Farmer,,4
1518,South,41,Merchant,782,4
1519,East,64,Farmer,569,2
1091,Capital,62,Soldier,555,4
1520,WEST,26,Farmer,226,5
1521,capital,45,Soldier,543,4
1522,east,40,Merchant,675,1
1365,East,63,Merchant,591,3
1523,Capital,28,Scholar,658,1
1524,WEST,24,Farmer,181,4
1525,WEST,82,Merchant,488,4
1526,Capital,68,Farmer,339,2
1527, South,56,Farmer,275,1
1528,West,35,Farmer,289,2
1529,Capital,45,Merchant,993,6
1530,capital,65,Scholar,885,6
1531, East,27,Merchant,492,6
1532,South,42,Scholar,395,6
1533,South,51,Scholar,525,4
1534,East,48,Farmer,530,3
1535,north,25,Smith,454,2
1536,South,39,Smith,570,4
1537,Capital,42,Scholar,578,4
1538,West,16,Farmer,316,2
1539, East,30,Scholar,508,2
1540,North,,Soldier,253,3
1541,capital,35,Merchant,768,3
1542,East ,30,Merchant,729,6
1543,North,27,Farmer,379,6
1544,Capital,65,Farmer,510,3
1545,North,46,Farmer,290,2
1546,West,42,Farmer,,6
1547,Capital,,Smith,561,2
1548,south,46,Farmer,337,6
1549,North,49,Farmer,228,4
1550,North ,56,Smith,251,5
1551,SOUTH,38,Scholar,509,5
1552,South,31,Smith,430,3
1553,North,36,Smith,315,4
1554,South,63,Soldier,507,4
1555, South,44,Farmer,465,3
1556,west,33,Farmer,,5
1557,EAST,46,Merchant,1063,4
1558,West ,42,Scholar,549,4
1559,South,58,Farmer,363,1
1560,East,33,Smith,399,3
1561,north,54,Smith,306,5
1562, Capital,58,Farmer,250,2
1563,South,22,Merchant,456,3
1564,east,,Soldier,375,2
1565,Capital,16,Smith,473,6
1566,NORTH,36,Farmer,299,4
1567, West,54,Farmer,258,3
1568,Capital,39,Merchant,745,1
1569,Capital,38,Soldier,,5
1570,Capital,40,Smith,476,2
1571,capital,40,Merchant,1139,5
1572,SOUTH,58,Farmer,400,3
1573,North,68,Farmer,227,5
1574,South ,40,Farmer,331,1
1575,north,44,Merchant,599,4
1576,South,68,Farmer,378,1
1577,East,32,Smith,241,3
1578,Capital,19,Farmer,546,5
1579,Capital ,40,Smith,596,5
1580,North ,24,Soldier,405,1
1581,East,,Scholar,698,1
1582,Capital,,Smith,716,6
1583,Capital,72,Soldier,506,5
1584,South,49,Merchant,1229,4
1585,capital,47,Soldier,673,5
1586,South,35,Scholar,443,2
1587,Capital,60,Merchant,552,2
1588,East,56,Scholar,620,1
1589,South,30,Farmer,227,4
1590,East ,49,Scholar,566,3
1591,capital,36,Merchant,,2
1592, West,38,Merchant,729,4
1593,Capital,35,Scholar,654,2
1594,South,43,Farmer,305,1
1595,East,52,Soldier,381,1
1596, Capital,16,Merchant,1154,6
1597,West,41,Farmer,221,5
1598,North,39,Soldier,324,1
1599,South,46,Smith,597,6
1600,South ,43,Merchant,831,5
1601, West,23,Soldier,357,1
1602,South,31,Farmer,245,2
1603,South,,Merchant,1046,2
1604,South,21,Smith,,1
1605,Capital,38,Scholar,,4
1606,East,59,Farmer,413,2
1607,North,62,Farmer,253,2
1608,South ,32,Scholar,903,4
1609,west,45,Scholar,387,3
1610,east,55,Scholar,662,4
1611,North ,33,Farmer,387,5
1612,west,26,Soldier,452,4
1613,South,43,Merchant,1107,3
1614,South,33,Merchant,704,5
1615,West,16,Soldier,521,1
1616,south,28,Merchant,575,4
1617, Capital,42,Merchant,910,4
1618,West,26,Smith,476,5
1619,CAPITAL,,Merchant,936,4
1620,EAST,42,Merchant,838,2
`;
  const PATIENTS = `patient_id,age,bmi,bp,glucose,smoker,exercise,province,sick
1,67,22.9,108,65,0,daily,South,0
2,54,27.8,132,63,0,none,West,0
3,58,23.7,103,88,0,none,Capital,0
4,56,32.3,138,77,1,daily,North,0
5,44,22.5,135,101,1,daily,Capital,0
6,27,32.7,121,119,1,some,Capital,0
7,33,30.4,147,93,1,none,South,1
8,77,33.3,139,106,1,daily,West,1
9,31,19.8,113,85,0,some,Capital,0
10,51,25.4,133,51,0,none,West,1
11,36,23.3,121,65,0,some,South,0
12,18,23.4,159,81,1,none,North,0
13,60,,138,44,0,some,West,0
14,85,23.6,108,121,0,none,East,1
15,66,23,133,129,0,none,East,1
16,54,18.9,114,113,0,some,East,0
17,67,27.2,102,87,0,daily,North,0
18,43,24.8,143,103,0,daily,West,0
19,47,29.1,139,81,1,none,East,1
20,63,26.7,126,84,0,some,South,1
21,46,,122,90,0,none,North,0
22,54,30.4,132,97,0,some,Capital,0
23,50,18,134,95,0,some,Capital,0
24,49,19.7,124,79,0,some,North,0
25,39,25.7,141,123,0,none,West,1
26,33,27.1,127,77,0,some,South,1
27,60,23.6,131,84,0,daily,Capital,0
28,45,26.4,134,84,0,none,North,0
29,65,26.8,136,81,0,none,West,0
30,69,24.3,120,85,0,none,Capital,1
31,48,30.3,129,98,0,some,South,0
32,54,15.9,113,115,1,none,Capital,1
33,62,,138,124,0,some,Capital,1
34,59,18.2,104,74,0,some,South,0
35,64,28.6,113,91,0,none,North,0
36,48,31.6,131,82,0,some,West,0
37,38,23.7,141,103,0,none,Capital,0
38,43,27.6,119,91,1,some,North,0
39,39,22.3,142,113,0,none,East,0
40,40,22.6,106,98,0,some,East,0
41,67,23,131,114,0,daily,North,1
42,33,33.5,142,97,0,none,North,0
43,55,28.9,114,119,0,daily,Capital,1
44,41,24.8,135,102,0,some,South,0
45,33,28.8,107,93,1,some,Capital,0
46,34,,130,99,0,daily,North,0
47,55,33.8,132,110,0,none,South,1
48,58,26.3,128,79,1,some,South,0
49,65,30.2,133,101,0,daily,North,1
50,56,30.3,121,138,0,none,East,1
51,42,21.5,109,97,1,none,Capital,0
52,56,27.6,127,94,0,some,Capital,1
53,60,30.2,119,82,0,some,West,1
54,35,26.5,102,82,0,daily,East,0
55,32,21.7,124,118,1,some,Capital,0
56,72,30.1,115,91,1,some,South,1
57,55,27.1,144,83,0,daily,East,0
58,55,31.4,101,113,0,some,West,1
59,63,34,128,108,0,some,West,1
60,57,19.3,114,78,0,daily,West,0
61,23,23.3,117,100,1,daily,West,0
62,57,28.1,144,71,0,some,Capital,0
63,61,27.3,103,117,0,none,Capital,0
64,77,25,120,130,0,none,East,1
65,54,24,135,64,0,none,North,0
66,35,,110,73,0,none,Capital,0
67,56,35.4,132,77,0,daily,Capital,0
68,55,25.4,118,97,0,some,West,1
69,18,29.8,108,132,0,some,North,0
70,45,24.6,126,112,0,none,East,0
71,53,30.6,144,87,0,none,Capital,1
72,45,27.2,104,142,0,none,North,1
73,59,33,118,104,0,daily,Capital,0
74,29,26.2,117,107,0,some,Capital,0
75,33,29.9,124,104,1,none,North,1
76,49,24.2,125,98,0,none,East,0
77,67,28.1,142,102,0,daily,Capital,1
78,43,21.7,103,119,0,some,North,0
79,26,,127,88,0,none,Capital,0
80,60,23.6,145,87,0,some,Capital,0
81,46,23.5,148,132,1,some,Capital,0
82,58,23.1,104,113,1,none,Capital,1
83,51,24.8,100,123,0,none,Capital,1
84,45,17.4,142,103,1,none,Capital,0
85,69,26.1,118,81,0,some,West,0
86,71,28.4,156,86,0,none,North,1
87,79,26.7,116,122,1,none,South,1
88,67,25.2,105,107,1,daily,South,1
89,48,19.6,153,80,0,none,Capital,0
90,38,31.3,123,116,0,some,Capital,1
91,50,27.7,110,92,0,some,West,0
92,49,26.8,124,108,0,some,Capital,1
93,52,30.6,129,85,1,none,Capital,1
94,45,25,130,89,0,none,Capital,0
95,50,24.7,124,100,1,some,North,1
96,43,26,101,78,0,none,West,0
97,82,25.8,105,157,0,none,West,1
98,60,,157,122,1,some,Capital,1
99,23,31.1,132,96,0,daily,East,0
100,73,25.7,136,83,0,none,South,0
101,34,22.5,130,72,0,none,Capital,0
102,65,26,110,114,1,some,Capital,0
103,42,32.1,152,96,0,daily,South,0
104,58,24.5,127,114,0,none,Capital,1
105,82,,115,119,0,none,West,1
106,48,26.8,113,135,0,daily,Capital,0
107,65,23.9,113,96,1,none,West,1
108,53,31.7,115,105,0,some,South,1
109,56,21,158,74,0,some,South,0
110,37,14.6,128,116,0,daily,Capital,0
111,65,14.4,122,112,0,none,Capital,0
112,60,24.6,117,104,0,some,Capital,0
113,63,30.4,119,85,0,none,West,0
114,41,31,118,80,0,none,South,1
115,41,23.4,100,109,0,some,East,0
116,51,27.1,133,102,0,some,South,0
117,18,25.5,136,85,1,some,Capital,0
118,49,28.9,106,96,0,none,East,0
119,74,23.6,148,86,0,some,Capital,0
120,64,22.4,140,81,0,some,Capital,0
121,38,18.1,124,93,1,none,West,1
122,46,25.7,119,85,1,some,North,0
123,54,22.3,125,103,0,daily,East,0
124,43,24.8,130,102,0,none,Capital,0
125,73,24.1,132,118,0,some,West,0
126,33,26.4,118,101,0,none,Capital,0
127,65,34.7,134,89,0,some,East,0
128,49,26.8,131,138,0,none,South,0
129,47,30.5,128,84,0,daily,East,0
130,46,25.6,121,70,1,some,West,0
131,43,25.3,138,121,1,none,East,1
132,67,,111,109,0,none,North,0
133,41,26.8,105,83,1,none,North,1
134,54,26,128,82,0,none,South,1
135,68,24.4,139,116,0,some,Capital,0
136,49,18.5,128,131,0,none,North,0
137,52,24.3,139,82,0,none,Capital,0
138,56,23.3,118,143,0,some,South,0
139,52,23.6,142,72,0,none,South,0
140,54,27.7,99,86,0,daily,South,0
141,69,,112,124,1,some,North,1
142,46,29.1,135,91,1,some,South,1
143,37,24.6,129,131,0,none,Capital,1
144,47,30.2,116,89,0,none,South,1
145,38,21.6,103,123,0,daily,West,0
146,46,18,147,123,0,none,North,0
147,32,26.3,125,132,0,some,North,0
148,36,30.4,127,122,1,some,East,1
149,40,24.5,136,63,0,some,West,0
150,46,34.5,137,99,0,none,South,1
151,34,29.3,119,67,0,some,Capital,1
152,53,29.8,124,96,0,daily,Capital,0
153,26,29.9,115,101,1,daily,Capital,0
154,29,34.5,125,100,0,some,East,0
155,58,24,132,94,1,some,South,1
156,45,25,109,120,0,none,Capital,1
157,40,27.7,133,97,0,none,North,0
158,24,,119,66,0,none,Capital,0
159,70,,119,105,0,daily,North,0
160,58,21.7,99,112,0,daily,Capital,1
161,75,,129,93,0,some,Capital,0
162,52,28.4,104,88,0,some,South,0
163,65,24.7,135,72,1,none,North,1
164,43,25,141,93,0,none,South,0
165,47,19.9,120,93,0,none,North,0
166,24,22.2,137,86,0,none,West,0
167,59,26.8,137,69,1,some,West,0
168,41,25.3,115,76,1,some,South,0
169,62,24.9,127,105,0,daily,Capital,0
170,52,25.9,133,100,0,some,Capital,0
171,52,27,136,131,1,none,Capital,1
172,76,27.1,106,100,0,none,West,1
173,75,29.5,130,122,0,none,South,0
174,18,28.1,135,120,0,none,Capital,0
175,46,30.6,98,118,0,daily,Capital,0
176,37,33.5,109,110,0,daily,East,0
177,53,30.2,146,67,0,daily,North,0
178,43,22,94,109,0,daily,South,0
179,43,22.9,138,91,0,none,West,0
180,49,18.5,124,110,0,none,Capital,1
181,85,28.3,121,100,0,daily,North,0
182,72,20.7,143,104,0,daily,Capital,1
183,63,21.1,126,93,0,daily,West,0
184,53,27.7,119,116,0,none,South,1
185,82,24,136,73,1,daily,Capital,0
186,42,,109,90,0,some,East,0
187,47,25.1,157,112,0,none,Capital,1
188,29,19.7,121,111,0,none,Capital,1
189,58,19.5,138,75,1,none,Capital,0
190,48,25.3,121,124,1,none,West,1
191,64,27.4,133,100,0,daily,East,0
192,81,25.5,134,116,1,some,North,1
193,51,34.9,116,63,0,none,South,0
194,63,34.6,158,98,1,some,South,1
195,63,29.9,154,141,1,daily,Capital,1
196,54,25.1,130,95,0,none,Capital,0
197,46,22.2,145,59,0,some,West,0
198,41,20.8,96,122,1,some,South,1
199,52,33.9,126,84,0,none,Capital,0
200,85,28.1,125,111,0,some,East,1
201,33,18.1,129,121,1,some,South,1
202,18,16.3,102,118,0,some,South,0
203,76,29.2,128,95,0,some,West,1
204,26,27.2,149,95,1,none,Capital,1
205,53,32.7,101,97,0,none,East,1
206,48,21.1,161,121,0,some,North,1
207,60,23,133,84,1,some,North,1
208,42,19.7,149,106,1,some,East,1
209,28,28.5,125,134,0,none,East,1
210,51,27,102,109,0,none,Capital,1
211,42,25.3,132,84,0,none,Capital,0
212,34,29.9,136,67,0,some,North,0
213,34,26,108,68,0,some,South,0
214,63,30.3,126,111,0,none,Capital,1
215,58,20.5,108,127,1,some,North,1
216,61,27.3,140,132,0,some,North,0
217,61,25.3,109,114,0,none,South,1
218,64,25.3,119,76,1,daily,West,1
219,51,25.2,164,105,1,none,South,1
220,35,28.1,99,98,0,daily,North,0
221,64,34.4,68,60,0,daily,Capital,0
222,75,28.8,135,110,1,some,East,1
223,33,23.4,148,123,0,daily,East,1
224,58,23.5,95,106,0,daily,Capital,0
225,32,27.7,109,69,0,some,Capital,0
226,32,30.9,145,107,1,daily,Capital,1
227,78,,122,82,0,some,East,0
228,64,29.4,136,104,0,none,West,0
229,50,25.1,118,94,0,none,South,0
230,83,26,135,83,0,daily,South,0
231,29,29.3,127,112,0,daily,East,0
232,56,34.4,118,92,0,some,East,1
233,43,23.2,107,100,1,some,Capital,0
234,38,30.3,147,97,0,daily,Capital,0
235,68,23.2,120,103,0,daily,Capital,1
236,40,19.4,129,105,0,daily,Capital,0
237,67,15.3,135,111,0,some,North,1
238,56,,122,105,0,none,North,0
239,69,21.5,128,94,0,daily,North,0
240,55,30.2,127,75,0,daily,Capital,0
241,72,31.4,137,96,0,daily,East,0
242,83,27.3,121,96,1,daily,Capital,1
243,43,31,112,116,0,daily,West,0
244,57,28.7,153,134,0,daily,Capital,0
245,65,15.2,136,104,1,none,Capital,1
246,79,29.9,130,90,0,some,North,1
247,50,28.2,128,119,0,none,South,1
248,51,20.6,114,83,0,none,Capital,0
249,51,20,101,77,0,some,South,0
250,60,,126,97,1,none,Capital,1
251,52,,130,109,1,daily,South,1
252,31,26.8,130,85,0,daily,East,0
253,67,23.7,115,83,0,daily,South,0
254,18,22.7,135,117,0,daily,East,0
255,65,,132,73,1,none,Capital,1
256,55,36,120,108,0,daily,Capital,0
257,41,20.8,140,96,1,none,North,1
258,82,,139,125,1,some,South,1
259,48,25.9,97,108,0,some,Capital,1
260,64,23.2,124,107,0,some,East,1
261,72,26.8,122,97,1,none,Capital,1
262,48,23.7,99,56,0,none,South,0
263,23,29.9,125,76,0,some,West,0
264,61,18.8,135,127,0,daily,Capital,0
265,60,27.1,111,103,0,daily,Capital,0
266,39,31.7,137,79,0,daily,North,0
267,67,28.9,98,106,0,none,East,0
268,71,28.9,132,109,1,some,South,1
269,33,27.1,130,102,0,some,East,0
270,61,23.5,137,84,0,some,Capital,0
271,54,29.2,134,90,1,none,North,1
272,29,32.9,100,110,0,some,Capital,0
273,33,26.7,120,99,1,daily,South,0
274,58,28.5,134,97,0,none,Capital,1
275,51,24.6,102,93,0,none,East,0
276,26,23.5,131,88,0,some,East,0
277,60,26,139,85,1,some,North,0
278,55,23.3,123,112,0,none,Capital,1
279,58,27.1,136,105,0,some,West,1
280,48,34.4,136,114,1,some,Capital,1
281,64,25.4,130,125,1,daily,Capital,1
282,58,32.7,96,103,0,none,Capital,1
283,61,26.3,139,93,0,none,South,0
284,36,20,115,93,0,none,South,0
285,43,19.3,111,112,0,some,North,0
286,74,26.8,135,109,0,some,West,0
287,45,22.6,139,96,1,some,West,0
288,39,,122,120,0,some,Capital,0
289,76,32.6,140,88,0,daily,North,0
290,60,29.8,119,86,1,none,South,1
291,48,26.5,125,96,0,some,South,1
292,55,22.3,108,95,0,none,Capital,0
293,44,21.3,130,102,0,some,West,0
294,54,24.7,128,98,0,daily,West,0
295,18,30.1,119,90,0,none,South,0
296,57,27.8,113,94,1,daily,North,1
297,46,25.5,118,112,0,some,Capital,0
298,50,19.5,121,121,0,none,West,1
299,49,21.2,138,87,1,some,Capital,0
300,62,24.2,124,88,0,some,South,1
301,51,31.7,141,80,0,none,West,0
302,49,25.2,121,87,0,daily,West,0
303,55,33,123,89,0,none,Capital,0
304,44,29.9,136,105,1,none,Capital,1
305,34,28.6,141,112,0,some,North,1
306,42,20.4,110,90,0,some,North,0
307,49,22.4,116,112,0,some,South,0
308,36,28.1,107,76,0,none,North,0
309,65,27.9,134,118,0,daily,West,0
310,42,23.3,119,74,1,some,Capital,1
311,73,24.2,132,103,0,daily,Capital,1
312,68,31.3,111,79,0,daily,East,0
313,41,20.5,123,108,0,daily,North,0
314,50,24,118,98,1,daily,North,0
315,42,25.5,114,83,0,none,Capital,0
316,47,26,119,89,0,some,West,0
317,59,21.5,133,84,1,none,East,0
318,33,15.7,135,75,0,some,North,0
319,24,,95,104,1,none,South,0
320,43,23.4,121,102,1,daily,North,0
321,62,27.6,95,78,0,some,West,0
322,55,19.9,125,112,0,none,West,0
323,31,21,109,96,0,none,Capital,0
324,59,30.7,168,114,0,some,East,1
325,57,26.5,103,104,1,some,Capital,0
326,55,25.4,111,68,0,some,East,0
327,72,23.6,119,84,0,none,East,0
328,33,18.5,154,89,0,some,Capital,0
329,72,26.5,125,127,0,some,North,1
330,47,22.2,120,149,1,none,East,1
331,24,31.3,122,71,0,daily,South,0
332,66,23,138,102,0,none,East,1
333,56,32.7,148,107,0,some,North,0
334,60,28.5,110,110,0,none,East,0
335,29,25.1,133,98,0,some,Capital,0
336,39,13,128,118,0,none,West,0
337,75,27.4,129,64,1,some,Capital,0
338,66,24.3,108,95,1,some,North,0
339,54,30.2,134,90,1,none,North,1
340,48,25.6,131,93,0,some,East,0
341,44,25.2,134,122,0,none,North,1
342,31,,103,103,1,some,Capital,1
343,57,,140,85,1,none,Capital,1
344,63,20.1,122,103,0,daily,East,0
345,45,25,119,130,0,some,North,0
346,57,19.5,113,97,0,some,South,0
347,49,22.8,113,106,0,some,South,0
348,68,30.8,123,109,0,none,North,0
349,64,24.7,116,111,0,none,North,0
350,38,24.1,131,84,1,some,Capital,0
351,44,23.3,130,99,0,daily,West,0
352,42,21.5,139,93,0,some,South,0
353,60,24.2,134,89,0,some,Capital,0
354,52,31.6,174,80,1,none,North,1
355,68,28,128,120,0,some,East,0
356,22,24.1,103,80,0,daily,Capital,0
357,28,27.2,126,139,0,some,South,0
358,43,35.2,145,102,0,none,East,1
359,88,27.5,124,122,0,none,Capital,1
360,65,,115,67,0,daily,South,0
361,75,24.3,111,97,0,daily,Capital,1
362,62,31.9,128,105,1,none,Capital,1
363,40,27.6,130,71,0,some,West,0
364,45,30.4,122,82,0,none,West,0
365,18,25.7,99,109,0,none,Capital,0
366,43,25.6,129,121,0,none,East,0
367,34,17.9,142,89,1,some,South,1
368,33,29.4,124,134,0,none,South,1
369,64,22.9,151,125,0,none,East,1
370,46,36.9,108,123,1,none,North,1
371,61,33.1,121,82,1,some,South,0
372,44,29.9,120,121,0,some,South,1
373,56,27.1,116,89,0,daily,Capital,0
374,59,,117,122,0,daily,East,0
375,50,21.9,99,130,0,some,North,0
376,47,25.8,103,111,0,daily,Capital,0
377,61,20.9,141,94,0,some,West,0
378,72,21.1,122,108,0,daily,West,0
379,34,29.3,148,109,0,none,South,0
380,54,22.8,147,113,0,none,Capital,1
381,53,23.9,126,132,1,daily,West,0
382,43,,133,76,0,none,East,0
383,45,28.7,142,147,0,none,Capital,0
384,78,25.8,131,105,0,none,West,0
385,62,27.4,136,121,0,none,Capital,1
386,62,23.2,135,99,0,daily,Capital,0
387,54,28.3,164,99,1,daily,West,0
388,53,20.7,141,108,0,none,Capital,0
389,83,26.3,88,77,0,daily,East,0
390,62,27.2,119,100,0,none,West,1
391,35,21.4,135,78,0,some,West,0
392,63,23.5,113,91,0,none,Capital,0
393,75,25.4,177,145,0,none,Capital,0
394,47,31,121,87,0,some,North,1
395,71,21.5,132,69,0,none,East,0
396,60,29.6,136,102,0,daily,East,0
397,28,,133,104,0,none,West,0
398,44,26.3,123,56,0,daily,East,0
399,71,25.5,140,160,0,none,North,0
400,23,23.3,115,131,0,none,West,0
401,36,22.1,119,115,0,daily,Capital,0
402,76,30.3,118,83,1,none,South,0
403,30,28.3,138,65,0,none,West,0
404,53,29.4,96,122,0,none,Capital,0
405,68,27.5,130,97,1,daily,North,0
406,34,26.1,141,110,0,none,West,1
407,40,27.3,133,114,0,some,North,1
408,58,21.5,152,121,0,daily,Capital,1
409,64,30.6,110,120,0,some,North,0
410,44,27.6,101,62,0,none,South,0
411,81,25.4,115,83,0,some,West,0
412,53,21.8,116,176,1,some,Capital,1
413,39,19.4,117,92,0,some,Capital,0
414,40,20.7,135,105,1,daily,Capital,0
415,49,27.8,70,125,1,some,Capital,0
416,30,26.7,107,109,1,some,North,0
417,51,24.7,139,76,0,some,South,0
418,53,19.6,112,99,0,some,East,0
419,29,26,112,122,0,none,South,1
420,43,21.3,125,120,1,some,Capital,0
421,51,24.4,120,106,0,some,West,1
422,77,30.1,108,81,0,some,West,0
423,43,23.7,94,98,1,daily,North,0
424,59,30.2,142,74,0,none,Capital,0
425,29,26.2,136,125,0,none,South,0
426,64,31.6,86,106,0,daily,North,0
427,48,24,141,102,0,none,Capital,0
428,52,34.3,111,117,0,none,West,1
429,47,21.7,101,107,0,daily,West,0
430,29,27.3,120,116,0,none,East,0
431,28,25.6,114,128,0,some,Capital,0
432,44,29.9,117,90,1,daily,West,1
433,52,24.6,127,140,0,some,Capital,0
434,54,27.5,99,92,0,some,West,0
435,79,27.7,150,42,0,none,Capital,1
436,50,25.3,115,108,0,none,North,0
437,64,26.1,115,118,0,none,West,0
438,64,32.2,95,132,0,none,North,0
439,70,22.1,102,96,0,daily,North,0
440,72,26.4,116,104,0,daily,East,1
441,42,28.3,115,90,0,daily,Capital,0
442,44,28.3,145,68,1,daily,Capital,0
443,27,28.9,124,109,0,none,Capital,0
444,54,23.9,95,74,1,daily,Capital,0
445,35,34,135,84,0,some,Capital,0
446,25,25.6,113,127,0,some,North,0
447,48,27.3,105,112,0,daily,West,0
448,56,25.3,136,73,0,none,Capital,0
449,66,29.1,131,76,0,daily,East,0
450,25,26.1,136,88,0,none,North,0
451,51,24.2,147,61,0,daily,South,0
452,72,26.2,138,74,0,daily,South,0
453,58,33.1,113,74,0,daily,North,0
454,52,26.3,125,115,0,none,South,1
455,45,17,129,133,0,daily,South,0
456,48,26.5,125,48,0,daily,Capital,0
457,42,25.2,119,85,0,some,South,0
458,59,,142,97,0,some,Capital,1
459,31,28.9,99,112,0,some,North,0
460,45,23.2,114,103,0,some,Capital,0
461,63,28.4,118,97,0,none,North,0
462,47,25,122,85,0,some,Capital,0
463,59,24.5,144,139,0,some,Capital,1
464,25,,114,124,0,some,Capital,0
465,38,29.3,130,110,1,some,East,1
466,54,29.4,145,102,0,some,East,1
467,23,33.7,146,86,1,daily,East,1
468,35,39.4,152,97,0,none,Capital,0
469,47,,113,111,0,none,South,1
470,63,25.5,108,63,0,some,West,0
471,49,24.6,133,125,0,none,Capital,0
472,36,26.2,121,130,1,none,North,1
473,39,27.9,125,101,1,some,Capital,0
474,44,27.1,118,95,0,some,West,1
475,35,24.8,101,98,1,some,South,0
476,69,29.4,116,127,0,none,West,1
477,52,27.4,137,62,0,some,Capital,0
478,43,,139,123,0,none,North,1
479,35,29.9,110,77,1,none,East,1
480,38,30.1,105,81,0,daily,East,0
481,39,32,98,62,1,none,East,1
482,83,20.2,137,96,0,some,East,0
483,38,24.1,133,99,1,some,East,0
484,34,23,145,127,0,some,West,0
485,42,28.4,122,80,0,some,South,0
486,38,23.6,137,78,0,daily,West,0
487,81,26.3,109,105,0,daily,West,0
488,36,18.9,131,126,0,some,East,0
489,48,20.5,108,104,0,daily,South,0
490,44,26.5,118,92,0,none,West,0
491,46,26.7,138,95,0,some,West,1
492,67,,118,128,1,none,East,1
493,50,20.5,117,81,1,daily,Capital,1
494,88,20.7,108,97,1,none,South,1
495,32,22.7,122,101,0,some,Capital,0
496,42,23.6,98,84,0,daily,West,0
497,57,25.4,137,116,0,some,East,0
498,50,26.6,125,100,0,some,Capital,1
499,64,29.5,118,121,1,none,East,1
500,75,,130,110,0,some,Capital,0
501,41,23.6,122,110,0,none,South,0
502,48,30.2,138,96,0,some,West,1
503,19,27.6,133,112,0,daily,Capital,0
504,19,,117,93,0,some,South,0
505,36,23,140,120,1,daily,South,1
506,52,29.1,115,134,0,daily,North,0
507,18,,117,86,1,some,West,0
508,65,27.4,97,82,0,some,Capital,0
509,63,28.6,133,110,0,some,Capital,0
510,43,28.9,147,106,0,daily,North,0
511,55,21.6,134,101,0,some,Capital,0
512,82,16.7,115,100,0,none,North,1
513,53,28.6,113,118,0,some,South,0
514,49,37.4,134,84,0,some,Capital,0
515,65,28,125,88,1,none,South,1
516,35,21.1,144,88,0,some,East,0
517,71,24,140,103,0,none,North,0
518,27,31.1,134,83,1,none,Capital,0
519,54,29.4,132,97,1,some,Capital,1
520,52,28.8,163,105,0,some,West,0
`;
  const EMPIRE_SQL = `CREATE TABLE provinces (province_id INTEGER PRIMARY KEY, name TEXT, region TEXT);
INSERT INTO provinces VALUES (1, 'Capital', 'Central');
INSERT INTO provinces VALUES (2, 'North', 'Highlands');
INSERT INTO provinces VALUES (3, 'South', 'Coast');
INSERT INTO provinces VALUES (4, 'East', 'Coast');
INSERT INTO provinces VALUES (5, 'West', 'Highlands');
CREATE TABLE shops (shop_id INTEGER PRIMARY KEY, province_id INTEGER, kind TEXT, opened INTEGER);
INSERT INTO shops VALUES (1, 1, 'bakery', 2018);
INSERT INTO shops VALUES (2, 1, 'smithy', 2014);
INSERT INTO shops VALUES (3, 1, 'tavern', 2012);
INSERT INTO shops VALUES (4, 2, 'bakery', 2019);
INSERT INTO shops VALUES (5, 2, 'smithy', 2011);
INSERT INTO shops VALUES (6, 2, 'tavern', 2013);
INSERT INTO shops VALUES (7, 3, 'bakery', 2013);
INSERT INTO shops VALUES (8, 3, 'smithy', 2013);
INSERT INTO shops VALUES (9, 3, 'tavern', 2012);
INSERT INTO shops VALUES (10, 4, 'bakery', 2014);
INSERT INTO shops VALUES (11, 4, 'smithy', 2018);
INSERT INTO shops VALUES (12, 4, 'tavern', 2012);
INSERT INTO shops VALUES (13, 5, 'bakery', 2013);
INSERT INTO shops VALUES (14, 5, 'smithy', 2012);
INSERT INTO shops VALUES (15, 5, 'tavern', 2013);
CREATE TABLE sales (shop_id INTEGER, month TEXT, units INTEGER, revenue REAL, promo INTEGER);
INSERT INTO sales VALUES
(1, '2021-01', 731, 1828.24, 0),
(1, '2021-02', 829, 2072.64, 0),
(1, '2021-03', 809, 2022.65, 0),
(1, '2021-04', 1068, 2671.01, 1),
(1, '2021-05', 978, 2444.34, 0),
(1, '2021-06', 1050, 2626.10, 0),
(1, '2021-07', 1095, 2738.20, 0),
(1, '2021-08', 1222, 3055.89, 1),
(1, '2021-09', 1144, 2860.54, 1),
(1, '2021-10', 1192, 2978.75, 1),
(1, '2021-11', 792, 1981.16, 0),
(1, '2021-12', 802, 2004.76, 0),
(1, '2022-01', 917, 2292.48, 1),
(1, '2022-02', 810, 2024.06, 0),
(1, '2022-03', 1006, 2515.50, 1),
(1, '2022-04', 1160, 2898.87, 1),
(1, '2022-05', 1384, 3459.58, 1),
(1, '2022-06', 1320, 3299.87, 1),
(1, '2022-07', 1172, 2928.86, 0),
(1, '2022-08', 1221, 3052.27, 1),
(1, '2022-09', 1193, 2981.70, 1),
(1, '2022-10', 1028, 2569.97, 0),
(1, '2022-11', 1028, 2570.70, 1),
(1, '2022-12', 1042, 2604.29, 1),
(1, '2023-01', 808, 2020.89, 0),
(1, '2023-02', 895, 2236.32, 0),
(1, '2023-03', 1065, 2661.74, 1),
(1, '2023-04', 1051, 2626.39, 0),
(1, '2023-05', 1044, 2610.25, 0),
(1, '2023-06', 1262, 3154.13, 0),
(1, '2023-07', 1203, 3007.53, 0),
(1, '2023-08', 1365, 3411.78, 0),
(1, '2023-09', 1419, 3547.64, 1),
(1, '2023-10', 1289, 3223.23, 1),
(1, '2023-11', 1156, 2891.19, 1),
(1, '2023-12', 983, 2456.95, 0),
(2, '2021-01', 35, 638.23, 0),
(2, '2021-02', 41, 729.26, 0),
(2, '2021-03', 41, 729.96, 0),
(2, '2021-04', 48, 856.87, 1),
(2, '2021-05', 52, 937.53, 0),
(2, '2021-06', 51, 924.73, 0),
(2, '2021-07', 58, 1037.23, 0),
(2, '2021-08', 56, 1004.95, 0),
(2, '2021-09', 52, 933.79, 0),
(2, '2021-10', 46, 833.62, 0),
(2, '2021-11', 43, 768.15, 0),
(2, '2021-12', 37, 658.67, 0),
(2, '2022-01', 37, 673.45, 0),
(2, '2022-02', 43, 772.24, 0),
(2, '2022-03', 46, 820.36, 0),
(2, '2022-04', 49, 886.66, 0),
(2, '2022-05', 54, 966.43, 0),
(2, '2022-06', 54, 968.74, 0),
(2, '2022-07', 55, 995.43, 0),
(2, '2022-08', 59, 1060.14, 0),
(2, '2022-09', 58, 1044.50, 0),
(2, '2022-10', 55, 988.88, 1),
(2, '2022-11', 46, 830.55, 0),
(2, '2022-12', 43, 771.35, 0);
INSERT INTO sales VALUES
(2, '2023-01', 42, 757.97, 0),
(2, '2023-02', 44, 789.80, 0),
(2, '2023-03', 46, 833.31, 0),
(2, '2023-04', 55, 985.78, 0),
(2, '2023-05', 53, 958.86, 0),
(2, '2023-06', 58, 1039.79, 0),
(2, '2023-07', 65, 1171.08, 0),
(2, '2023-08', 62, 1108.33, 0),
(2, '2023-09', 55, 981.62, 0),
(2, '2023-10', 63, 1129.18, 1),
(2, '2023-11', 46, 829.70, 0),
(2, '2023-12', 46, 831.77, 0),
(3, '2021-01', 398, 1590.17, 1),
(3, '2021-02', 357, 1428.06, 0),
(3, '2021-03', 352, 1408.26, 0),
(3, '2021-04', 423, 1691.18, 0),
(3, '2021-05', 451, 1804.54, 0),
(3, '2021-06', 463, 1852.99, 0),
(3, '2021-07', 502, 2009.87, 0),
(3, '2021-08', 501, 2003.82, 0),
(3, '2021-09', 476, 1902.36, 0),
(3, '2021-10', 422, 1689.12, 0),
(3, '2021-11', 390, 1560.34, 0),
(3, '2021-12', 331, 1325.89, 0),
(3, '2022-01', 350, 1400.41, 0),
(3, '2022-02', 361, 1445.55, 0),
(3, '2022-03', 441, 1765.73, 0),
(3, '2022-04', 425, 1699.90, 0),
(3, '2022-05', 495, 1981.30, 0),
(3, '2022-06', 522, 2089.70, 0),
(3, '2022-07', 537, 2148.00, 0),
(3, '2022-08', 525, 2099.90, 0),
(3, '2022-09', 520, 2080.65, 0),
(3, '2022-10', 470, 1880.17, 0),
(3, '2022-11', 474, 1895.46, 1),
(3, '2022-12', 386, 1543.12, 0),
(3, '2023-01', 401, 1604.02, 1),
(3, '2023-02', 437, 1748.97, 1),
(3, '2023-03', 410, 1640.06, 0),
(3, '2023-04', 489, 1955.54, 0),
(3, '2023-05', 479, 1917.21, 0),
(3, '2023-06', 554, 2215.51, 0),
(3, '2023-07', 657, 2626.73, 1),
(3, '2023-08', 627, 2508.49, 1),
(3, '2023-09', 557, 2228.09, 0),
(3, '2023-10', 481, 1925.86, 0),
(3, '2023-11', 441, 1763.49, 0),
(3, '2023-12', 408, 1632.05, 0),
(4, '2021-01', 815, 2036.52, 0),
(4, '2021-02', 875, 2186.55, 0),
(4, '2021-03', 877, 2191.64, 0),
(4, '2021-04', 1193, 2982.33, 1),
(4, '2021-05', 1215, 3036.84, 1),
(4, '2021-06', 1158, 2895.33, 0),
(4, '2021-07', 1405, 3512.19, 1),
(4, '2021-08', 1366, 3414.05, 1),
(4, '2021-09', 1074, 2683.95, 0),
(4, '2021-10', 1173, 2933.73, 1),
(4, '2021-11', 1139, 2846.49, 1),
(4, '2021-12', 820, 2049.51, 0);
INSERT INTO sales VALUES
(4, '2022-01', 956, 2389.72, 1),
(4, '2022-02', 942, 2354.37, 1),
(4, '2022-03', 1100, 2750.39, 1),
(4, '2022-04', 983, 2458.38, 0),
(4, '2022-05', 1299, 3246.39, 1),
(4, '2022-06', 1387, 3468.24, 1),
(4, '2022-07', 1186, 2966.06, 0),
(4, '2022-08', 1400, 3499.83, 1),
(4, '2022-09', 1105, 2763.27, 0),
(4, '2022-10', 1025, 2562.92, 0),
(4, '2022-11', 1100, 2749.84, 1),
(4, '2022-12', 933, 2333.51, 0),
(4, '2023-01', 861, 2151.50, 0),
(4, '2023-02', 1022, 2555.03, 1),
(4, '2023-03', 1062, 2654.06, 1),
(4, '2023-04', 1168, 2920.66, 1),
(4, '2023-05', 1265, 3163.13, 1),
(4, '2023-06', 1174, 2934.58, 0),
(4, '2023-07', 1278, 3194.68, 0),
(4, '2023-08', 1165, 2913.11, 0),
(4, '2023-09', 1176, 2940.44, 0),
(4, '2023-10', 1088, 2721.07, 0),
(4, '2023-11', 990, 2475.51, 0),
(4, '2023-12', 925, 2313.37, 0),
(5, '2021-01', 66, 1188.92, 0),
(5, '2021-02', 64, 1143.21, 0),
(5, '2021-03', 69, 1244.16, 0),
(5, '2021-04', 90, 1615.07, 1),
(5, '2021-05', 82, 1472.05, 0),
(5, '2021-06', 87, 1574.92, 0),
(5, '2021-07', 93, 1682.50, 0),
(5, '2021-08', 87, 1569.42, 0),
(5, '2021-09', 87, 1557.77, 0),
(5, '2021-10', 79, 1417.17, 0),
(5, '2021-11', 84, 1513.42, 1),
(5, '2021-12', 66, 1190.47, 0),
(5, '2022-01', 66, 1180.79, 0),
(5, '2022-02', 70, 1268.19, 0),
(5, '2022-03', 76, 1374.20, 1),
(5, '2022-04', 78, 1405.12, 0),
(5, '2022-05', 84, 1520.67, 0),
(5, '2022-06', 93, 1671.76, 0),
(5, '2022-07', 109, 1959.09, 1),
(5, '2022-08', 91, 1630.62, 0),
(5, '2022-09', 86, 1550.51, 0),
(5, '2022-10', 75, 1353.76, 0),
(5, '2022-11', 76, 1361.25, 0),
(5, '2022-12', 68, 1220.14, 0),
(5, '2023-01', 65, 1161.67, 0),
(5, '2023-02', 66, 1181.65, 0),
(5, '2023-03', 70, 1267.09, 0),
(5, '2023-04', 79, 1414.21, 0),
(5, '2023-05', 88, 1579.07, 0),
(5, '2023-06', 101, 1817.37, 0),
(5, '2023-07', 91, 1645.77, 0),
(5, '2023-08', 93, 1667.92, 0),
(5, '2023-09', 81, 1455.77, 0),
(5, '2023-10', 83, 1498.05, 0),
(5, '2023-11', 71, 1286.62, 0),
(5, '2023-12', 63, 1127.68, 0);
INSERT INTO sales VALUES
(6, '2021-01', 300, 1200.35, 0),
(6, '2021-02', 323, 1290.96, 0),
(6, '2021-03', 336, 1344.89, 0),
(6, '2021-04', 396, 1585.39, 0),
(6, '2021-05', 433, 1733.13, 0),
(6, '2021-06', 476, 1902.08, 0),
(6, '2021-07', 541, 2163.90, 1),
(6, '2021-08', 561, 2242.49, 1),
(6, '2021-09', 433, 1731.46, 0),
(6, '2021-10', 457, 1826.81, 1),
(6, '2021-11', 422, 1688.26, 1),
(6, '2021-12', 336, 1345.49, 0),
(6, '2022-01', 315, 1258.95, 0),
(6, '2022-02', 349, 1395.68, 0),
(6, '2022-03', 376, 1503.93, 0),
(6, '2022-04', 480, 1919.29, 1),
(6, '2022-05', 446, 1784.29, 0),
(6, '2022-06', 446, 1783.54, 0),
(6, '2022-07', 476, 1904.14, 0),
(6, '2022-08', 466, 1864.66, 0),
(6, '2022-09', 448, 1793.62, 0),
(6, '2022-10', 468, 1870.05, 1),
(6, '2022-11', 369, 1477.96, 0),
(6, '2022-12', 367, 1466.87, 0),
(6, '2023-01', 297, 1186.69, 0),
(6, '2023-02', 349, 1395.23, 0),
(6, '2023-03', 436, 1743.39, 1),
(6, '2023-04', 422, 1686.07, 0),
(6, '2023-05', 508, 2031.41, 1),
(6, '2023-06', 525, 2101.97, 1),
(6, '2023-07', 478, 1913.42, 0),
(6, '2023-08', 543, 2171.15, 1),
(6, '2023-09', 464, 1854.43, 0),
(6, '2023-10', 404, 1617.16, 0),
(6, '2023-11', 403, 1610.69, 0),
(6, '2023-12', 378, 1510.76, 0),
(7, '2021-01', 955, 2387.20, 1),
(7, '2021-02', 994, 2485.80, 1),
(7, '2021-03', 1061, 2651.86, 1),
(7, '2021-04', 1236, 3089.66, 1),
(7, '2021-05', 1507, 3766.71, 1),
(7, '2021-06', 1236, 3090.56, 0),
(7, '2021-07', 1516, 3791.02, 1),
(7, '2021-08', 1376, 3441.03, 0),
(7, '2021-09', 1270, 3174.66, 0),
(7, '2021-10', 1301, 3253.02, 1),
(7, '2021-11', 1232, 3080.05, 1),
(7, '2021-12', 1181, 2951.27, 1),
(7, '2022-01', 998, 2495.03, 0),
(7, '2022-02', 1185, 2962.85, 1),
(7, '2022-03', 1409, 3523.22, 1),
(7, '2022-04', 1258, 3144.95, 0),
(7, '2022-05', 1449, 3621.70, 0),
(7, '2022-06', 1352, 3380.07, 0),
(7, '2022-07', 1543, 3857.82, 0),
(7, '2022-08', 1463, 3658.44, 0),
(7, '2022-09', 1727, 4316.77, 1),
(7, '2022-10', 1526, 3816.14, 1),
(7, '2022-11', 1355, 3387.00, 1),
(7, '2022-12', 1272, 3179.89, 1);
INSERT INTO sales VALUES
(7, '2023-01', 1093, 2731.27, 0),
(7, '2023-02', 1441, 3601.47, 1),
(7, '2023-03', 1472, 3680.39, 1),
(7, '2023-04', 1667, 4168.38, 1),
(7, '2023-05', 1855, 4636.64, 1),
(7, '2023-06', 1753, 4382.95, 0),
(7, '2023-07', 2006, 5016.18, 1),
(7, '2023-08', 1839, 4597.82, 0),
(7, '2023-09', 1924, 4808.83, 1),
(7, '2023-10', 1737, 4343.14, 1),
(7, '2023-11', 1354, 3384.94, 0),
(7, '2023-12', 1391, 3476.74, 0),
(8, '2021-01', 99, 1785.46, 0),
(8, '2021-02', 122, 2192.32, 1),
(8, '2021-03', 138, 2478.33, 1),
(8, '2021-04', 125, 2247.71, 0),
(8, '2021-05', 147, 2651.22, 0),
(8, '2021-06', 166, 2990.54, 1),
(8, '2021-07', 187, 3362.11, 1),
(8, '2021-08', 161, 2897.28, 0),
(8, '2021-09', 175, 3155.34, 1),
(8, '2021-10', 155, 2781.24, 1),
(8, '2021-11', 124, 2240.40, 0),
(8, '2021-12', 140, 2527.60, 1),
(8, '2022-01', 118, 2122.41, 0),
(8, '2022-02', 127, 2289.05, 0),
(8, '2022-03', 128, 2308.67, 0),
(8, '2022-04', 152, 2727.18, 0),
(8, '2022-05', 191, 3436.35, 1),
(8, '2022-06', 177, 3192.73, 0),
(8, '2022-07', 200, 3594.85, 0),
(8, '2022-08', 175, 3147.36, 0),
(8, '2022-09', 198, 3562.67, 1),
(8, '2022-10', 156, 2810.22, 0),
(8, '2022-11', 148, 2665.39, 0),
(8, '2022-12', 134, 2416.79, 0),
(8, '2023-01', 160, 2876.78, 1),
(8, '2023-02', 169, 3040.39, 1),
(8, '2023-03', 153, 2746.24, 0),
(8, '2023-04', 200, 3600.64, 1),
(8, '2023-05', 173, 3120.26, 0),
(8, '2023-06', 210, 3788.61, 0),
(8, '2023-07', 204, 3672.82, 0),
(8, '2023-08', 228, 4095.78, 1),
(8, '2023-09', 252, 4532.60, 1),
(8, '2023-10', 183, 3285.87, 0),
(8, '2023-11', 185, 3322.31, 1),
(8, '2023-12', 150, 2695.04, 0),
(9, '2021-01', 363, 1451.65, 0),
(9, '2021-02', 385, 1540.57, 0),
(9, '2021-03', 435, 1739.26, 0),
(9, '2021-04', 457, 1826.32, 0),
(9, '2021-05', 535, 2139.56, 0),
(9, '2021-06', 517, 2066.77, 0),
(9, '2021-07', 578, 2312.80, 0),
(9, '2021-08', 574, 2296.56, 0),
(9, '2021-09', 632, 2529.33, 1),
(9, '2021-10', 577, 2306.33, 1),
(9, '2021-11', 531, 2125.38, 1),
(9, '2021-12', 518, 2073.87, 1);
INSERT INTO sales VALUES
(9, '2022-01', 516, 2065.70, 1),
(9, '2022-02', 452, 1806.07, 0),
(9, '2022-03', 531, 2122.52, 1),
(9, '2022-04', 540, 2159.52, 0),
(9, '2022-05', 628, 2513.02, 0),
(9, '2022-06', 608, 2430.74, 0),
(9, '2022-07', 637, 2546.89, 0),
(9, '2022-08', 643, 2573.16, 0),
(9, '2022-09', 624, 2495.16, 0),
(9, '2022-10', 570, 2278.55, 0),
(9, '2022-11', 503, 2010.35, 0),
(9, '2022-12', 518, 2072.85, 0),
(9, '2023-01', 527, 2106.61, 0),
(9, '2023-02', 469, 1874.63, 0),
(9, '2023-03', 560, 2239.85, 0),
(9, '2023-04', 625, 2499.41, 0),
(9, '2023-05', 700, 2801.43, 0),
(9, '2023-06', 755, 3020.51, 0),
(9, '2023-07', 843, 3372.32, 1),
(9, '2023-08', 852, 3406.71, 1),
(9, '2023-09', 770, 3080.94, 1),
(9, '2023-10', 670, 2678.60, 0),
(9, '2023-11', 594, 2375.75, 0),
(9, '2023-12', 598, 2392.82, 0),
(10, '2021-01', 525, 1312.89, 0),
(10, '2021-02', 622, 1553.98, 1),
(10, '2021-03', 595, 1487.13, 0),
(10, '2021-04', 666, 1665.22, 0),
(10, '2021-05', 744, 1860.74, 0),
(10, '2021-06', 875, 2186.71, 1),
(10, '2021-07', 809, 2021.28, 0),
(10, '2021-08', 754, 1886.17, 0),
(10, '2021-09', 769, 1922.33, 0),
(10, '2021-10', 745, 1862.45, 0),
(10, '2021-11', 667, 1666.53, 0),
(10, '2021-12', 537, 1341.51, 0),
(10, '2022-01', 608, 1519.32, 0),
(10, '2022-02', 633, 1582.05, 0),
(10, '2022-03', 764, 1910.48, 1),
(10, '2022-04', 887, 2216.85, 1),
(10, '2022-05', 808, 2018.92, 0),
(10, '2022-06', 995, 2486.73, 1),
(10, '2022-07', 858, 2145.10, 0),
(10, '2022-08', 898, 2244.33, 0),
(10, '2022-09', 833, 2082.02, 0),
(10, '2022-10', 809, 2023.46, 0),
(10, '2022-11', 768, 1919.30, 1),
(10, '2022-12', 624, 1560.82, 0),
(10, '2023-01', 727, 1818.65, 1),
(10, '2023-02', 730, 1825.39, 1),
(10, '2023-03', 689, 1722.40, 0),
(10, '2023-04', 802, 2003.86, 0),
(10, '2023-05', 869, 2171.59, 0),
(10, '2023-06', 1123, 2807.76, 1),
(10, '2023-07', 1098, 2745.81, 1),
(10, '2023-08', 953, 2382.95, 0),
(10, '2023-09', 904, 2261.01, 0),
(10, '2023-10', 828, 2069.78, 0),
(10, '2023-11', 735, 1836.43, 0),
(10, '2023-12', 669, 1672.85, 0);
INSERT INTO sales VALUES
(11, '2021-01', 143, 2570.55, 1),
(11, '2021-02', 160, 2875.29, 1),
(11, '2021-03', 137, 2466.69, 0),
(11, '2021-04', 156, 2814.36, 0),
(11, '2021-05', 173, 3119.60, 0),
(11, '2021-06', 166, 2983.65, 0),
(11, '2021-07', 205, 3687.29, 1),
(11, '2021-08', 188, 3383.11, 0),
(11, '2021-09', 177, 3190.71, 0),
(11, '2021-10', 181, 3263.99, 1),
(11, '2021-11', 135, 2430.30, 0),
(11, '2021-12', 133, 2393.85, 0),
(11, '2022-01', 153, 2760.87, 1),
(11, '2022-02', 138, 2478.93, 0),
(11, '2022-03', 178, 3211.49, 1),
(11, '2022-04', 162, 2919.19, 0),
(11, '2022-05', 180, 3238.70, 0),
(11, '2022-06', 223, 4013.86, 1),
(11, '2022-07', 231, 4151.77, 1),
(11, '2022-08', 179, 3223.94, 0),
(11, '2022-09', 221, 3973.26, 1),
(11, '2022-10', 167, 3011.53, 0),
(11, '2022-11', 175, 3151.03, 1),
(11, '2022-12', 162, 2922.40, 0),
(11, '2023-01', 178, 3206.75, 1),
(11, '2023-02', 156, 2799.66, 0),
(11, '2023-03', 162, 2922.05, 0),
(11, '2023-04', 211, 3806.04, 1),
(11, '2023-05', 239, 4293.35, 1),
(11, '2023-06', 212, 3816.08, 0),
(11, '2023-07', 245, 4415.93, 1),
(11, '2023-08', 260, 4684.94, 1),
(11, '2023-09', 193, 3465.80, 0),
(11, '2023-10', 189, 3397.10, 0),
(11, '2023-11', 190, 3416.78, 1),
(11, '2023-12', 162, 2922.89, 0),
(12, '2021-01', 274, 1094.81, 0),
(12, '2021-02', 252, 1009.79, 0),
(12, '2021-03', 319, 1276.09, 0),
(12, '2021-04', 360, 1440.74, 0),
(12, '2021-05', 374, 1497.81, 0),
(12, '2021-06', 456, 1824.16, 1),
(12, '2021-07', 463, 1851.01, 0),
(12, '2021-08', 474, 1895.23, 1),
(12, '2021-09', 423, 1691.55, 0),
(12, '2021-10', 376, 1504.29, 0),
(12, '2021-11', 357, 1428.53, 0),
(12, '2021-12', 307, 1228.74, 0),
(12, '2022-01', 362, 1449.82, 1),
(12, '2022-02', 303, 1213.79, 0),
(12, '2022-03', 369, 1476.28, 0),
(12, '2022-04', 392, 1569.17, 0),
(12, '2022-05', 519, 2074.30, 1),
(12, '2022-06', 474, 1895.25, 0),
(12, '2022-07', 518, 2070.58, 0),
(12, '2022-08', 429, 1714.03, 0),
(12, '2022-09', 401, 1603.56, 0),
(12, '2022-10', 374, 1497.90, 0),
(12, '2022-11', 348, 1392.92, 0),
(12, '2022-12', 331, 1323.15, 0);
INSERT INTO sales VALUES
(12, '2023-01', 351, 1403.31, 0),
(12, '2023-02', 356, 1423.36, 0),
(12, '2023-03', 398, 1590.21, 0),
(12, '2023-04', 418, 1672.19, 0),
(12, '2023-05', 489, 1955.86, 0),
(12, '2023-06', 501, 2003.88, 0),
(12, '2023-07', 499, 1994.69, 0),
(12, '2023-08', 533, 2130.71, 0),
(12, '2023-09', 553, 2213.66, 1),
(12, '2023-10', 518, 2071.09, 1),
(12, '2023-11', 489, 1954.19, 1),
(12, '2023-12', 365, 1458.52, 0),
(13, '2021-01', 946, 2366.03, 1),
(13, '2021-02', 924, 2309.32, 1),
(13, '2021-03', 852, 2129.04, 0),
(13, '2021-04', 983, 2458.57, 0),
(13, '2021-05', 1051, 2628.49, 0),
(13, '2021-06', 1038, 2593.97, 0),
(13, '2021-07', 1281, 3202.74, 1),
(13, '2021-08', 1370, 3424.08, 1),
(13, '2021-09', 954, 2385.37, 0),
(13, '2021-10', 890, 2223.86, 0),
(13, '2021-11', 979, 2447.91, 1),
(13, '2021-12', 951, 2378.29, 1),
(13, '2022-01', 792, 1980.83, 0),
(13, '2022-02', 729, 1821.46, 0),
(13, '2022-03', 993, 2482.17, 1),
(13, '2022-04', 1098, 2743.88, 1),
(13, '2022-05', 1048, 2619.62, 0),
(13, '2022-06', 1220, 3050.85, 1),
(13, '2022-07', 1047, 2616.47, 0),
(13, '2022-08', 1202, 3005.94, 1),
(13, '2022-09', 1044, 2609.14, 0),
(13, '2022-10', 855, 2136.86, 0),
(13, '2022-11', 814, 2036.01, 0),
(13, '2022-12', 910, 2273.80, 1),
(13, '2023-01', 737, 1842.45, 0),
(13, '2023-02', 777, 1942.86, 0),
(13, '2023-03', 883, 2207.62, 1),
(13, '2023-04', 1050, 2624.46, 1),
(13, '2023-05', 1095, 2736.72, 1),
(13, '2023-06', 1257, 3141.27, 1),
(13, '2023-07', 1205, 3011.75, 1),
(13, '2023-08', 1133, 2831.32, 1),
(13, '2023-09', 1112, 2780.94, 1),
(13, '2023-10', 879, 2197.03, 0),
(13, '2023-11', 766, 1915.75, 0),
(13, '2023-12', 848, 2119.98, 1),
(14, '2021-01', 59, 1064.84, 0),
(14, '2021-02', 68, 1230.22, 0),
(14, '2021-03', 69, 1250.63, 0),
(14, '2021-04', 72, 1296.45, 0),
(14, '2021-05', 86, 1547.51, 0),
(14, '2021-06', 84, 1510.14, 0),
(14, '2021-07', 105, 1888.44, 1),
(14, '2021-08', 90, 1619.61, 0),
(14, '2021-09', 82, 1484.61, 0),
(14, '2021-10', 66, 1196.82, 0),
(14, '2021-11', 65, 1165.06, 0),
(14, '2021-12', 61, 1089.05, 0);
INSERT INTO sales VALUES
(14, '2022-01', 56, 1002.44, 0),
(14, '2022-02', 64, 1157.60, 0),
(14, '2022-03', 80, 1443.64, 1),
(14, '2022-04', 75, 1345.43, 0),
(14, '2022-05', 80, 1432.83, 0),
(14, '2022-06', 100, 1801.06, 1),
(14, '2022-07', 82, 1473.63, 0),
(14, '2022-08', 97, 1745.36, 1),
(14, '2022-09', 71, 1285.58, 0),
(14, '2022-10', 73, 1316.84, 0),
(14, '2022-11', 71, 1270.27, 0),
(14, '2022-12', 59, 1056.60, 0),
(14, '2023-01', 70, 1256.28, 1),
(14, '2023-02', 74, 1339.26, 1),
(14, '2023-03', 67, 1205.42, 0),
(14, '2023-04', 72, 1288.95, 0),
(14, '2023-05', 85, 1521.10, 1),
(14, '2023-06', 85, 1533.36, 0),
(14, '2023-07', 93, 1668.91, 1),
(14, '2023-08', 85, 1538.79, 0),
(14, '2023-09', 91, 1636.59, 1),
(14, '2023-10', 81, 1458.01, 1),
(14, '2023-11', 67, 1197.56, 0),
(14, '2023-12', 55, 984.60, 0),
(15, '2021-01', 457, 1829.81, 0),
(15, '2021-02', 500, 2000.31, 1),
(15, '2021-03', 568, 2270.43, 1),
(15, '2021-04', 505, 2019.14, 0),
(15, '2021-05', 565, 2259.28, 0),
(15, '2021-06', 595, 2380.34, 0),
(15, '2021-07', 577, 2306.66, 0),
(15, '2021-08', 727, 2908.91, 1),
(15, '2021-09', 610, 2439.39, 0),
(15, '2021-10', 475, 1901.80, 0),
(15, '2021-11', 476, 1904.39, 0),
(15, '2021-12', 500, 2001.63, 1),
(15, '2022-01', 513, 2050.23, 1),
(15, '2022-02', 506, 2023.36, 1),
(15, '2022-03', 482, 1927.96, 0),
(15, '2022-04', 516, 2065.33, 0),
(15, '2022-05', 536, 2145.35, 0),
(15, '2022-06', 585, 2338.44, 0),
(15, '2022-07', 644, 2574.93, 1),
(15, '2022-08', 584, 2337.72, 0),
(15, '2022-09', 548, 2191.62, 0),
(15, '2022-10', 605, 2420.01, 1),
(15, '2022-11', 547, 2187.07, 1),
(15, '2022-12', 404, 1616.19, 0),
(15, '2023-01', 407, 1629.65, 0),
(15, '2023-02', 417, 1667.92, 0),
(15, '2023-03', 512, 2047.84, 1),
(15, '2023-04', 583, 2333.93, 1),
(15, '2023-05', 592, 2367.16, 1),
(15, '2023-06', 570, 2278.82, 0),
(15, '2023-07', 662, 2649.68, 1),
(15, '2023-08', 543, 2173.15, 0),
(15, '2023-09', 528, 2113.69, 0),
(15, '2023-10', 529, 2116.58, 1),
(15, '2023-11', 502, 2008.84, 1),
(15, '2023-12', 479, 1917.91, 1);
`;

  const WORLDS = [
    // ───────────────────────────── FLOOR 1
    {
      id: 1, name: "The Census", topic: "load, inspect, clean and summarise a messy dataset, then report it", time: 900, icon: "📜",
      intro: "The Emperor's census arrived from five provinces, written by fifty clerks in fifty styles. Before anyone can govern, someone must make sense of it.",
      missions: [
        {
          id: "cp1-1", title: "Read the Census",
          story: "Before cleaning anything, a good analyst measures the mess: how many rows, how many repeats, how many gaps?",
          lesson: `<p>Every project starts with an inspection, not a model:</p>
            <ul><li><code>len(df)</code>, <code>df.dtypes</code>, <code>df.head()</code></li>
            <li><code>df.duplicated().sum()</code>: rows that exactly repeat an earlier row</li>
            <li><code>df.isna().sum()</code>: missing values per column</li>
            <li><code>df["col"].unique()</code> / <code>nunique()</code>: spot inconsistent spellings ("North", "north", " North")</li></ul>`,
          example: d`
            import pandas as pd

            census = pd.read_csv("census.csv")
            print(census.head())
            print(census["province"].unique())`,
          files: { "census.csv": CENSUS },
          task: `Write:<br>• <code>load_census()</code> → <code>census.csv</code> as a DataFrame<br>
            • <code>messy_report(df)</code> → a dict: <code>"rows"</code>, <code>"duplicates"</code> (exact duplicate rows), <code>"missing"</code> (<code>{column: count}</code> for columns with at least one missing value) and <code>"spellings"</code> (the number of distinct raw values in <code>province</code>)`,
          starter: d`
            import pandas as pd

            def load_census():
                pass

            def messy_report(df):
                pass
            `,
          solution: d`
            import pandas as pd

            def load_census():
                return pd.read_csv("census.csv")

            def messy_report(df):
                missing = {col: int(n) for col, n in df.isna().sum().items() if n > 0}
                return {"rows": len(df), "duplicates": int(df.duplicated().sum()), "missing": missing,
                        "spellings": int(df["province"].nunique())}`,
          hints: ["df.duplicated().sum() counts repeated rows", "df.isna().sum() gives a Series of counts; keep the ones above 0", "df[\"province\"].nunique()"],
          tests: [{ code: d`
            import pandas as pd
            lc = expect_func("load_census"); mr = expect_func("messy_report")
            raw = pd.read_csv("census.csv")
            expect_frame(lc(), raw, "load_census()")
            want = {"rows": len(raw), "duplicates": int(raw.duplicated().sum()),
                    "missing": {c: int(n) for c, n in raw.isna().sum().items() if n > 0}, "spellings": int(raw["province"].nunique())}
            expect_equal(mr(raw), want, "messy_report(census)")
            small = pd.DataFrame({"a": [1, 1, None], "province": ["X", "X", "x"]})
            expect_equal(mr(small), {"rows": 3, "duplicates": 1, "missing": {"a": 1}, "spellings": 2}, "messy_report on a tiny table")` }],
        },
        {
          id: "cp1-2", title: "Scrub the Scrolls",
          story: "Now fix it: one spelling per province, no repeated citizens, and sensible guesses for the gaps.",
          lesson: `<p>A cleaning function takes the raw table and returns a clean copy. Each step should be easy to explain:</p>
            <ol><li><code>drop_duplicates()</code> (exact repeats are copying mistakes)</li>
            <li>Normalise text: <code>.str.strip().str.title()</code></li>
            <li>Fill gaps with a value from a <b>similar group</b>, not the whole table: <code>df.groupby("province")["age"].transform("median")</code> gives each row its province's median</li></ol>
            <p>Clean the province names <b>before</b> grouping by them, or "north" and "North" are separate groups.</p>`,
          example: d`
            import pandas as pd

            df = pd.DataFrame({"g": ["a", "a", "b", "b"], "x": [1.0, None, 10.0, None]})
            df["x"] = df["x"].fillna(df.groupby("g")["x"].transform("median"))
            print(df)`,
          files: { "census.csv": CENSUS },
          task: `Write <code>clean(df)</code> returning a new DataFrame: duplicates dropped; <code>province</code> stripped and title-cased; missing <code>age</code> filled with the median age of that (clean) province; missing <code>income</code> filled with the median income of that <b>occupation</b>; the index reset (<code>drop=True</code>). Don't change the input DataFrame.`,
          starter: d`
            import pandas as pd

            def clean(df):
                pass

            census = pd.read_csv("census.csv")
            `,
          solution: d`
            import pandas as pd

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            census = pd.read_csv("census.csv")`,
          hints: ["Start with df = df.drop_duplicates().copy() so the input isn't changed", "Fix province before using it in groupby", "fillna(df.groupby(\"province\")[\"age\"].transform(\"median\"))", "Finish with reset_index(drop=True)"],
          tests: [{ code: d`
            import pandas as pd
            cl = expect_func("clean")
            raw = pd.read_csv("census.csv"); keep = raw.copy()
            d = raw.drop_duplicates().copy(); d["province"] = d["province"].str.strip().str.title()
            d["age"] = d["age"].fillna(d.groupby("province")["age"].transform("median"))
            d["income"] = d["income"].fillna(d.groupby("occupation")["income"].transform("median"))
            d = d.reset_index(drop=True)
            got = cl(raw)
            expect_frame(raw, keep, "the original census (it must not be changed)")
            expect_equal(sorted(got["province"].unique()), ["Capital", "East", "North", "South", "West"], "province names after cleaning")
            expect_frame(got, d, "clean(census)")` }],
        },
        {
          id: "cp1-3", title: "The Province Table",
          story: "The Emperor wants one small table: each province's size, age, wealth and main trade.",
          lesson: `<p>Build a summary table from several aggregations on the same grouping, then sort it so the most important row comes first.</p>
            <ul><li><code>g = df.groupby("province")</code>; <code>g.size()</code>, <code>g["age"].mean()</code>, <code>g["income"].median()</code></li>
            <li>The most common value: <code>s.value_counts().idxmax()</code>. To break ties alphabetically, sort first: <code>s.value_counts().sort_index().idxmax()</code></li>
            <li><code>sort_values(..., kind="stable")</code> keeps the existing order for ties</li></ul>`,
          example: d`
            import pandas as pd

            s = pd.Series(["Smith", "Farmer", "Smith", "Farmer"])
            print(s.value_counts().sort_index().idxmax())`,
          files: { "census.csv": CENSUS },
          task: `Using the clean census (the starter gives you <code>clean</code>), write <code>province_table(c)</code> → a DataFrame indexed by province with columns <code>population</code>, <code>mean_age</code> (rounded to 1), <code>median_income</code> and <code>top_occupation</code> (the most common; alphabetical first on a tie), sorted by population, largest first (<code>kind="stable"</code>).`,
          starter: d`
            import pandas as pd

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            census = clean(pd.read_csv("census.csv"))

            def province_table(c):
                pass
            `,
          solution: d`
            import pandas as pd

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            census = clean(pd.read_csv("census.csv"))

            def province_table(c):
                g = c.groupby("province")
                t = pd.DataFrame({
                    "population": g.size(),
                    "mean_age": g["age"].mean().round(1),
                    "median_income": g["income"].median(),
                    "top_occupation": g["occupation"].agg(lambda s: s.value_counts().sort_index().idxmax()),
                })
                return t.sort_values("population", ascending=False, kind="stable")`,
          hints: ["g = c.groupby(\"province\"); build a DataFrame from a dict of Series", "top_occupation: g[\"occupation\"].agg(lambda s: s.value_counts().sort_index().idxmax())", "sort_values(\"population\", ascending=False, kind=\"stable\")"],
          tests: [{ code: d`
            import pandas as pd
            cl = expect_func("clean"); pt = expect_func("province_table")
            c = cl(pd.read_csv("census.csv")); g = c.groupby("province")
            want = pd.DataFrame({"population": g.size(), "mean_age": g["age"].mean().round(1), "median_income": g["income"].median(),
                "top_occupation": g["occupation"].agg(lambda s: s.value_counts().sort_index().idxmax())}).sort_values("population", ascending=False, kind="stable")
            expect_frame(pt(c), want, "province_table(census)")
            tiny = pd.DataFrame({"province": ["A", "A", "B"], "age": [20.0, 30, 40], "income": [1.0, 3, 5], "occupation": ["Smith", "Farmer", "Smith"]})
            expect_equal(pt(tiny)["top_occupation"].to_dict(), {"A": "Farmer", "B": "Smith"}, "top_occupation with a tie")` }],
        },
        {
          id: "cp1-4", type: "quiz", title: "Riddles of the Census",
          story: "The census-keepers' riddles about honest cleaning and reporting.",
          lesson: `<p>Every cleaning choice changes the answer, so make each one deliberate, explainable and done in code you can rerun.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([" North", "north", "NORTH ", "South"])
                print(s.nunique(), s.str.strip().str.title().nunique())`,
              choices: ["4 2", "2 2", "4 4", "3 2"], answer: 0,
              explain: "Four raw spellings, but only two provinces once they're stripped and title-cased." },
            { q: "Why fill a missing income with the median of the person's <b>occupation</b> instead of the whole census?",
              choices: ["incomes differ a lot by trade, so the group's median is a closer guess", "it's faster", "the overall median doesn't exist", "to remove outliers"], answer: 0,
              explain: "A missing scholar's income is better guessed from other scholars than from farmers." },
            { q: "Why the median rather than the mean to fill incomes?",
              choices: ["incomes are skewed: a few rich citizens pull the mean up, the median resists them", "the mean can't be computed with gaps", "the median is always larger", "pandas requires it"], answer: 0,
              explain: "Medians are robust to extreme values." },
            { q: "You filled 6% of the ages with medians. What should your report mention?",
              choices: ["that some values were estimated, and how", "nothing: the data is clean now", "only the final numbers", "that the census is wrong"], answer: 0,
              explain: "Readers deserve to know which numbers are measured and which are estimated." },
            { q: "Why write cleaning as a function <code>clean(df)</code> instead of fixing cells by hand?",
              choices: ["next year's census can be cleaned the same way in one call, and anyone can check every step", "functions are faster to type", "pandas can't edit cells", "to hide the steps"], answer: 0,
              explain: "Reproducible cleaning is part of a trustworthy analysis." },
          ],
        },
        {
          id: "cp1-5", boss: true, time: 1200, title: "The Census Report",
          story: "The Emperor reads only one page. Give it a clear two-panel chart and a one-sentence headline.",
          lesson: `<p>A report needs one picture and one sentence that a busy reader will remember. Two charts side by side: <code>fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))</code>. A title over the whole figure: <code>fig.suptitle(...)</code>. Horizontal bars (<code>ax.barh</code>) suit long category names and money.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, (a, b) = plt.subplots(1, 2, figsize=(8, 3))
            a.bar(["x", "y"], [3, 5]); b.barh(["x", "y"], [10, 7])
            fig.suptitle("Two panels")
            plt.show()`,
          files: { "census.csv": CENSUS },
          task: `With the province table (given in the starter), write:<br>
            • <code>census_chart(table)</code> → a figure with two charts side by side: left, vertical bars of <code>population</code> per province (in the table's order) titled <code>"Population"</code>; right, horizontal bars of <code>median_income</code> titled <code>"Median income"</code>; the figure titled <code>"The Imperial Census"</code><br>
            • <code>headline(table)</code> → <code>"&lt;Province&gt; is the most populous province, with &lt;n&gt; citizens (&lt;p&gt;% of the Empire)."</code>, with p rounded to 1 decimal`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def province_table(c):
                g = c.groupby("province")
                t = pd.DataFrame({"population": g.size(), "mean_age": g["age"].mean().round(1), "median_income": g["income"].median(),
                                  "top_occupation": g["occupation"].agg(lambda s: s.value_counts().sort_index().idxmax())})
                return t.sort_values("population", ascending=False, kind="stable")

            table = province_table(clean(pd.read_csv("census.csv")))

            def census_chart(table):
                pass

            def headline(table):
                pass
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def province_table(c):
                g = c.groupby("province")
                t = pd.DataFrame({"population": g.size(), "mean_age": g["age"].mean().round(1), "median_income": g["income"].median(),
                                  "top_occupation": g["occupation"].agg(lambda s: s.value_counts().sort_index().idxmax())})
                return t.sort_values("population", ascending=False, kind="stable")

            table = province_table(clean(pd.read_csv("census.csv")))

            def census_chart(table):
                fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
                a.bar(table.index, table["population"])
                a.set_title("Population")
                b.barh(table.index, table["median_income"])
                b.set_title("Median income")
                fig.suptitle("The Imperial Census")
                return fig

            def headline(table):
                top = table.index[0]
                n = int(table["population"].iloc[0])
                pct = round(100 * n / table["population"].sum(), 1)
                return f"{top} is the most populous province, with {n} citizens ({pct}% of the Empire)."

            census_chart(table)
            print(headline(table))`,
          hints: ["fig, (a, b) = plt.subplots(1, 2)", "a.bar(table.index, table[\"population\"]); b.barh(table.index, table[\"median_income\"])", "fig.suptitle(\"The Imperial Census\"); return fig", "The table is already sorted, so the first row is the most populous"],
          tests: [{ code: d`
            import pandas as pd
            cc = expect_func("census_chart"); hl = expect_func("headline"); pt = expect_func("province_table"); cl = expect_func("clean")
            t = pt(cl(pd.read_csv("census.csv")))
            fig = cc(t)
            assert fig is not None and hasattr(fig, "axes"), "census_chart should return the figure."
            fig.canvas.draw()
            expect_equal(len(fig.axes), 2, "number of charts in the figure")
            a, b = fig.axes
            expect_close(bars_of(a), list(t["population"]), "population bars (in the table's order)")
            expect_equal(ticklabels_of(a), list(t.index), "province names under the population bars")
            expect_close(bars_of(b, horizontal=True), list(t["median_income"]), "median income bars (horizontal)")
            expect_text(a.get_title(), "left title", exact="Population"); expect_text(b.get_title(), "right title", exact="Median income")
            expect_text(fig._suptitle.get_text() if fig._suptitle else "", "figure title", exact="The Imperial Census")
            n = int(t["population"].iloc[0])
            expect_equal(hl(t), f"{t.index[0]} is the most populous province, with {n} citizens ({round(100 * n / t['population'].sum(), 1)}% of the Empire).", "headline")
            tiny = pd.DataFrame({"population": [3, 1]}, index=["B", "A"])
            expect_equal(hl(tiny), "B is the most populous province, with 3 citizens (75.0% of the Empire).", "headline on a tiny table")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 2
    {
      id: 2, name: "The Merchant's Forecast", topic: "SQL from Python, time-series charts, time-based features & a forecast", time: 960, icon: "📈",
      intro: "The Merchant Guild keeps its ledgers in a database. The Emperor asks: how much gold will the shops bring in next month?",
      missions: [
        {
          id: "cp2-1", title: "Ask the Ledger",
          story: "The ledgers live in a database. Ask it questions in SQL, and receive the answers as pandas tables.",
          lesson: `<p>Python's built-in <code>sqlite3</code> talks to SQLite databases; pandas turns query results into DataFrames:</p>
            <pre class="out">import sqlite3
conn = sqlite3.connect(":memory:")                 # a database in memory
with open("empire.sql") as f:                 # build the tables
    conn.executescript(f.read())
df = pd.read_sql_query("SELECT ... FROM ...", conn)</pre>
            <p>Let the database do the heavy lifting (joins, grouping), then use pandas for the rest. Tables: <code>provinces(province_id, name, region)</code>, <code>shops(shop_id, province_id, kind, opened)</code>, <code>sales(shop_id, month, units, revenue, promo)</code>; <code>month</code> is text like <code>'2021-01'</code>.</p>`,
          example: d`
            import sqlite3
            import pandas as pd

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            print(pd.read_sql_query("SELECT * FROM shops LIMIT 4", conn))`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write:<br>• <code>connect()</code> → an in-memory connection with <code>empire.sql</code> loaded<br>
            • <code>monthly_revenue(conn)</code> → a DataFrame with columns <code>month, revenue</code> (total revenue of all shops, rounded to 2 <b>in SQL</b>), ordered by month<br>
            • <code>revenue_by_region(conn)</code> → a DataFrame with columns <code>region, revenue</code> (rounded to 2), highest first<br>Use SQL (<code>GROUP BY</code>, <code>JOIN</code>) for the aggregation.`,
          starter: d`
            import sqlite3
            import pandas as pd

            def connect():
                pass

            def monthly_revenue(conn):
                pass

            def revenue_by_region(conn):
                pass
            `,
          solution: d`
            import sqlite3
            import pandas as pd

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def monthly_revenue(conn):
                return pd.read_sql_query(
                    "SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)

            def revenue_by_region(conn):
                return pd.read_sql_query("""
                    SELECT p.region, ROUND(SUM(s.revenue), 2) AS revenue
                    FROM sales s
                    JOIN shops sh ON s.shop_id = sh.shop_id
                    JOIN provinces p ON sh.province_id = p.province_id
                    GROUP BY p.region
                    ORDER BY revenue DESC""", conn)`,
          hints: ["connect: sqlite3.connect(\":memory:\"), then conn.executescript(open(\"empire.sql\").read())", "SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", "Region needs two joins: sales → shops → provinces"],
          tests: [{ code: d`
            import sqlite3, pandas as pd
            co = expect_func("connect"); mr = expect_func("monthly_revenue"); rr = expect_func("revenue_by_region")
            assert "GROUP BY" in __code__.upper() and "JOIN" in __code__.upper(), "Do the grouping and joining in SQL (GROUP BY, JOIN)."
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            conn = co()
            expect_equal(conn.execute("SELECT COUNT(*) FROM sales").fetchone()[0], 540, "rows in the sales table of your connection")
            expect_frame(mr(conn), pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", ref), "monthly_revenue")
            want = pd.read_sql_query("SELECT p.region, ROUND(SUM(s.revenue), 2) AS revenue FROM sales s JOIN shops sh ON s.shop_id = sh.shop_id JOIN provinces p ON sh.province_id = p.province_id GROUP BY p.region ORDER BY revenue DESC", ref)
            expect_frame(rr(conn), want, "revenue_by_region")` }],
        },
        {
          id: "cp2-2", title: "Draw the Trend",
          story: "Thirty-six months of numbers are hard to read. A line, with a smoothed average on top, tells the story at a glance.",
          lesson: `<p>Monthly sales wiggle with the seasons. A <b>12-month rolling mean</b> (<code>s.rolling(12).mean()</code>) averages a full year at every point, so the seasons cancel out and the underlying trend shows. Its first 11 values are NaN (not enough history), and matplotlib simply leaves them out.</p>
            <p>36 month labels are crowded: <code>ax.tick_params(axis="x", labelrotation=90, labelsize=7)</code>.</p>`,
          example: d`
            import pandas as pd

            s = pd.Series([1, 2, 3, 4, 5, 6])
            print(s.rolling(3).mean().tolist())`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write <code>trend_chart(monthly)</code> → a figure with one chart: the revenue by month (x = the month labels) as a line labelled <code>"revenue"</code>, the 12-month rolling mean as a second line labelled <code>"12-month average"</code>, a legend, the title <code>"Monthly revenue"</code> and the y label <code>"Gold"</code>.`,
          starter: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)

            def trend_chart(monthly):
                pass
            `,
          solution: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)

            def trend_chart(monthly):
                fig, ax = plt.subplots(figsize=(10, 4))
                ax.plot(monthly["month"], monthly["revenue"], label="revenue")
                ax.plot(monthly["month"], monthly["revenue"].rolling(12).mean(), label="12-month average")
                ax.legend()
                ax.set_title("Monthly revenue")
                ax.set_ylabel("Gold")
                ax.tick_params(axis="x", labelrotation=90, labelsize=7)
                return fig

            trend_chart(monthly)`,
          hints: ["ax.plot(monthly[\"month\"], monthly[\"revenue\"], label=\"revenue\")", "The average: monthly[\"revenue\"].rolling(12).mean()", "Return the figure"],
          tests: [{ code: d`
            import sqlite3, numpy as np, pandas as pd
            tc = expect_func("trend_chart")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            m = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", ref)
            fig = tc(m)
            assert fig is not None and hasattr(fig, "axes"), "trend_chart should return the figure."
            fig.canvas.draw(); ax = fig.axes[0]
            by = {l.get_label(): l for l in lines_of(ax)}
            assert "revenue" in by and "12-month average" in by, "Draw two lines labelled 'revenue' and '12-month average'. Found: " + str(list(by))
            expect_close(list(np.asarray(by["revenue"].get_ydata(), dtype=float)), list(m["revenue"]), "the revenue line")
            avg = np.asarray(by["12-month average"].get_ydata(), dtype=float)
            expect_equal(len(avg), 36, "points in the average line")
            expect_close(list(avg[11:]), list(m["revenue"].rolling(12).mean()[11:]), "the 12-month average line")
            assert set(legend_of(ax)) >= {"revenue", "12-month average"}, "The legend should name both lines."
            expect_text(ax.get_title(), "title", exact="Monthly revenue"); expect_text(ax.get_ylabel(), "y label", exact="Gold")` }],
        },
        {
          id: "cp2-3", title: "Features from Time",
          story: "A forecaster needs clues: how far along we are in time, which month it is, and what happened in the same month last year.",
          lesson: `<p>To predict a time series with an ordinary model, turn time into columns:</p>
            <ul><li><code>t</code>: 0, 1, 2… (the trend)</li><li><code>month_of_year</code>: 1–12 (the season), here <code>month.str[5:].astype(int)</code></li>
            <li><code>lag_12</code>: the value 12 months earlier, <code>shift(12)</code> (last year's same month)</li></ul>
            <p>Split by <b>time</b>, never at random: train on the past, test on the most recent months. Shuffling would let the model peek at the future.</p>`,
          example: d`
            import pandas as pd

            s = pd.Series([10, 20, 30, 40])
            print(s.shift(2).tolist())`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write:<br>• <code>make_features(monthly)</code> → a copy of <code>monthly</code> with new columns <code>t</code>, <code>month_of_year</code> and <code>lag_12</code> (in that order), the rows without a lag dropped, the index reset<br>
            • <code>time_split(features, test_months=6)</code> → a tuple <code>(train, test)</code>: all but the last <code>test_months</code> rows, and the last <code>test_months</code> rows`,
          starter: d`
            import sqlite3
            import pandas as pd

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)

            def make_features(monthly):
                pass

            def time_split(features, test_months=6):
                pass
            `,
          solution: d`
            import sqlite3
            import pandas as pd

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)

            def make_features(monthly):
                f = monthly.copy()
                f["t"] = range(len(f))
                f["month_of_year"] = f["month"].str[5:].astype(int)
                f["lag_12"] = f["revenue"].shift(12)
                return f.dropna().reset_index(drop=True)

            def time_split(features, test_months=6):
                return features.iloc[:-test_months], features.iloc[-test_months:]`,
          hints: ["f[\"t\"] = range(len(f))", "f[\"lag_12\"] = f[\"revenue\"].shift(12), then dropna()", "time_split: features.iloc[:-n] and features.iloc[-n:]"],
          tests: [{ code: d`
            import sqlite3, pandas as pd
            mf = expect_func("make_features"); ts = expect_func("time_split")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            m = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", ref)
            f = m.copy(); f["t"] = range(len(f)); f["month_of_year"] = f["month"].str[5:].astype(int); f["lag_12"] = f["revenue"].shift(12)
            f = f.dropna().reset_index(drop=True)
            got = mf(m)
            expect_equal(list(m.columns), ["month", "revenue"], "monthly's columns (it must not be changed)")
            expect_frame(got, f, "make_features(monthly)")
            tr, te = ts(f, 6)
            expect_equal((len(tr), len(te)), (18, 6), "sizes of train and test")
            expect_equal(list(te["month"]), list(f["month"][-6:]), "the test months (the most recent ones)")
            tr, te = ts(f, test_months=4); expect_equal(list(te["t"]), [32, 33, 34, 35], "time_split with test_months=4")` }],
        },
        {
          id: "cp2-4", type: "quiz", title: "Riddles of the Forecast",
          story: "The guild's riddles about predicting the future honestly.",
          lesson: `<p>Forecasts are judged on the future, so evaluate them on the most recent data, and always compare with a simple baseline such as "same as last year".</p>`,
          questions: [
            { q: "Why not use <code>train_test_split</code> with shuffling for a sales forecast?",
              choices: ["the model would train on months after the ones it's tested on, peeking at the future", "it's too slow", "it only works for classification", "shuffling changes the revenue"], answer: 0,
              explain: "In real life you only ever have the past. The test must imitate that." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                s = pd.Series([5, 6, 7, 8, 9])
                print(s.shift(1).tolist()[:3], s.rolling(2).mean().tolist()[-1])`,
              choices: ["[nan, 5.0, 6.0] 8.5", "[5, 6, 7] 8.5", "[nan, 5.0, 6.0] 9.0", "[6.0, 7.0, 8.0] 8.5"], answer: 0,
              explain: "shift(1) moves every value down a row; the last 2-value average is (8 + 9) / 2." },
            { q: "The \"same month last year\" baseline is called…",
              choices: ["a seasonal naive forecast", "a random forest", "a rolling mean", "cross-validation"], answer: 0,
              explain: "If your model can't beat it, the model isn't adding anything." },
            { q: "Revenue grows every year. Why does the seasonal naive baseline tend to <b>under</b>-predict?",
              choices: ["it copies last year's value, missing a year of growth", "it ignores the season", "it averages too many months", "it predicts zero"], answer: 0,
              explain: "Adding a trend feature (t) lets a model correct for that growth." },
            { q: "A 12-month rolling mean of monthly sales mostly removes…",
              choices: ["the seasonal ups and downs, leaving the trend", "the trend", "the missing values", "the promotions only"], answer: 0,
              explain: "Every 12-month window holds each season exactly once." },
          ],
        },
        {
          id: "cp2-5", boss: true, time: 1200, title: "The Forecast",
          story: "The guild-master wants a number for next month, and proof that the forecaster beats the old rule of thumb.",
          lesson: `<p>Fit on the past, evaluate on the last months, compare against the baseline with the same metric (here MAE, the mean absolute error in gold), and only then forecast forward.</p>
            <p>The next month (2024-01) has <code>t = 36</code> and <code>lag_12</code> = the revenue of 2023-01.</p>`,
          example: d`
            import numpy as np

            actual = np.array([100, 120]); pred = np.array([90, 125])
            print(np.abs(actual - pred).mean())`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write <code>forecast_report()</code>: query the monthly revenue, build the features, split off the last 6 months, fit <code>LinearRegression()</code> on <code>["t", "lag_12"]</code> of the training part. Return a dict: <code>"mae_model"</code> and <code>"mae_baseline"</code> on the test months (the baseline predicts <code>lag_12</code>), <code>"better"</code> (<code>"model"</code> or <code>"baseline"</code>, whichever MAE is lower), and <code>"next_month"</code> (the model's forecast for 2024-01). Round numbers to 1.`,
          starter: d`
            import sqlite3
            import numpy as np
            import pandas as pd
            from sklearn.linear_model import LinearRegression

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def make_features(monthly):
                f = monthly.copy()
                f["t"] = range(len(f))
                f["month_of_year"] = f["month"].str[5:].astype(int)
                f["lag_12"] = f["revenue"].shift(12)
                return f.dropna().reset_index(drop=True)

            def forecast_report():
                pass
            `,
          solution: d`
            import sqlite3
            import numpy as np
            import pandas as pd
            from sklearn.linear_model import LinearRegression

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def make_features(monthly):
                f = monthly.copy()
                f["t"] = range(len(f))
                f["month_of_year"] = f["month"].str[5:].astype(int)
                f["lag_12"] = f["revenue"].shift(12)
                return f.dropna().reset_index(drop=True)

            def forecast_report():
                monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", connect())
                f = make_features(monthly)
                train, test = f.iloc[:-6], f.iloc[-6:]
                cols = ["t", "lag_12"]
                model = LinearRegression().fit(train[cols], train["revenue"])
                mae_model = np.abs(test["revenue"] - model.predict(test[cols])).mean()
                mae_base = np.abs(test["revenue"] - test["lag_12"]).mean()
                jan = monthly.loc[monthly["month"] == "2023-01", "revenue"].iloc[0]
                nxt = model.predict(pd.DataFrame({"t": [36], "lag_12": [jan]}))[0]
                return {"mae_model": round(float(mae_model), 1), "mae_baseline": round(float(mae_base), 1),
                        "better": "model" if mae_model < mae_base else "baseline", "next_month": round(float(nxt), 1)}`,
          hints: ["monthly → make_features → train = f.iloc[:-6], test = f.iloc[-6:]", "MAE: np.abs(actual - predicted).mean()", "Forecast with pd.DataFrame({\"t\": [36], \"lag_12\": [revenue of 2023-01]})"],
          tests: [{ code: d`
            import sqlite3, numpy as np, pandas as pd
            from sklearn.linear_model import LinearRegression
            fr = expect_func("forecast_report")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            m = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", ref)
            f = m.copy(); f["t"] = range(len(f)); f["lag_12"] = f["revenue"].shift(12); f = f.dropna().reset_index(drop=True)
            tr, te = f.iloc[:-6], f.iloc[-6:]
            lr = LinearRegression().fit(tr[["t", "lag_12"]], tr["revenue"])
            a = np.abs(te["revenue"] - lr.predict(te[["t", "lag_12"]])).mean(); b = np.abs(te["revenue"] - te["lag_12"]).mean()
            nxt = lr.predict(pd.DataFrame({"t": [36], "lag_12": [m["revenue"][24]]}))[0]
            got = fr()
            expect_equal(got.get("better"), "model" if a < b else "baseline", "better")
            expect_close({k: got.get(k) for k in ("mae_model", "mae_baseline", "next_month")},
                         {"mae_model": round(a, 1), "mae_baseline": round(b, 1), "next_month": round(nxt, 1)}, "numbers")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 3
    {
      id: 3, name: "The Royal Physician", topic: "explore, model, explain and choose a classifier for patients", time: 960, icon: "⚕️",
      intro: "A fever spreads through the Empire. The Royal Physician needs to know who is at risk, and why, before deciding who to treat first.",
      missions: [
        {
          id: "cp3-1", title: "Meet the Patients",
          story: "Before any model, the physician wants simple facts: how many are sick, and does smoking or exercise seem to matter?",
          lesson: `<p>For a 0/1 target, the mean <b>is</b> the rate: <code>df["sick"].mean()</code> is the share of sick patients, and <code>df.groupby("smoker")["sick"].mean()</code> the rate in each group.</p>
            <p>To show categories in a meaningful order (none → some → daily) rather than alphabetically, use <code>.reindex(["none", "some", "daily"])</code>.</p>`,
          example: d`
            import pandas as pd

            p = pd.read_csv("patients.csv")
            print(p.head())
            print(p.groupby("smoker")["sick"].mean().round(3))`,
          files: { "patients.csv": PATIENTS },
          task: `Write:<br>• <code>sick_rates(df)</code> → a dict: <code>"overall"</code>, <code>"smoker"</code> (<code>{0: rate, 1: rate}</code>) and <code>"exercise"</code> (<code>{"none": …, "some": …, "daily": …}</code>), all rounded to 3<br>
            • <code>rate_chart(df)</code> → a figure with one bar chart of the sick rate by exercise in the order none, some, daily, titled <code>"Sickness by exercise"</code>, y label <code>"Share sick"</code>`,
          starter: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            patients = pd.read_csv("patients.csv")

            def sick_rates(df):
                pass

            def rate_chart(df):
                pass
            `,
          solution: d`
            import pandas as pd
            import matplotlib.pyplot as plt

            patients = pd.read_csv("patients.csv")
            ORDER = ["none", "some", "daily"]

            def sick_rates(df):
                smoker = df.groupby("smoker")["sick"].mean().round(3)
                exercise = df.groupby("exercise")["sick"].mean().round(3).reindex(ORDER)
                return {"overall": round(float(df["sick"].mean()), 3),
                        "smoker": {int(k): float(v) for k, v in smoker.items()},
                        "exercise": {k: float(v) for k, v in exercise.items()}}

            def rate_chart(df):
                rates = df.groupby("exercise")["sick"].mean().reindex(ORDER)
                fig, ax = plt.subplots()
                ax.bar(rates.index, rates.values)
                ax.set_title("Sickness by exercise")
                ax.set_ylabel("Share sick")
                return fig

            rate_chart(patients)`,
          hints: ["df.groupby(\"smoker\")[\"sick\"].mean()", "Order the exercise groups with .reindex([\"none\", \"some\", \"daily\"])", "ax.bar(rates.index, rates.values); return fig"],
          tests: [{ code: d`
            import pandas as pd
            sr = expect_func("sick_rates"); rc = expect_func("rate_chart")
            p = pd.read_csv("patients.csv")
            ex = p.groupby("exercise")["sick"].mean().reindex(["none", "some", "daily"])
            want = {"overall": round(p.sick.mean(), 3), "smoker": {int(k): round(v, 3) for k, v in p.groupby("smoker")["sick"].mean().items()},
                    "exercise": {k: round(v, 3) for k, v in ex.items()}}
            got = sr(p)
            expect_close(got, want, "sick_rates(patients)")
            expect_equal(list(got["exercise"]), ["none", "some", "daily"], "the order of the exercise groups")
            fig = rc(p)
            assert fig is not None and hasattr(fig, "axes"), "rate_chart should return the figure."
            fig.canvas.draw(); ax = fig.axes[0]
            expect_close(bars_of(ax), list(ex.values), "bar heights")
            expect_equal(ticklabels_of(ax), ["none", "some", "daily"], "bar labels (in order)")
            expect_text(ax.get_title(), "title", exact="Sickness by exercise"); expect_text(ax.get_ylabel(), "y label", exact="Share sick")` }],
        },
        {
          id: "cp3-2", title: "The Physician's Pipeline",
          story: "Now build the risk model: numbers scaled, categories encoded, gaps filled, all in one pipeline.",
          lesson: `<p>The same recipe as the Feature Forge (Machine Learning, Floor 9): a <code>ColumnTransformer</code> for numeric and categorical columns, then a <code>LogisticRegression</code>. For a medical screen, report more than accuracy: <b>recall</b> (how many sick patients are caught) and <b>AUC</b> (how well it ranks).</p>`,
          example: d`
            import pandas as pd

            p = pd.read_csv("patients.csv")
            print(p.isna().sum()[p.isna().sum() > 0])`,
          files: { "patients.csv": PATIENTS },
          task: `With <code>NUM = ["age", "bmi", "bp", "glucose", "smoker"]</code> and <code>CAT = ["exercise", "province"]</code> (features = all columns except <code>patient_id</code> and <code>sick</code>), write:<br>
            • <code>make_model()</code> → <code>make_pipeline(ColumnTransformer([("num", median imputer + StandardScaler, NUM), ("cat", OneHotEncoder(handle_unknown="ignore"), CAT)]), LogisticRegression(max_iter=1000))</code><br>
            • <code>evaluate(model)</code> → fit it on the training part of a split with <code>test_size=0.25, random_state=0, stratify=y</code>; return <code>{"accuracy", "recall", "auc"}</code> on the test part, rounded to 3`,
          starter: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, roc_auc_score

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]
            patients = pd.read_csv("patients.csv")
            X, y = patients.drop(columns=["patient_id", "sick"]), patients["sick"]

            def make_model():
                pass

            def evaluate(model):
                pass
            `,
          solution: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, roc_auc_score

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]
            patients = pd.read_csv("patients.csv")
            X, y = patients.drop(columns=["patient_id", "sick"]), patients["sick"]

            def make_model():
                pre = ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", OneHotEncoder(handle_unknown="ignore"), CAT),
                ])
                return make_pipeline(pre, LogisticRegression(max_iter=1000))

            def evaluate(model):
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                model.fit(Xtr, ytr)
                pred = model.predict(Xte)
                return {"accuracy": round(float((pred == yte).mean()), 3), "recall": round(float(recall_score(yte, pred)), 3),
                        "auc": round(float(roc_auc_score(yte, model.predict_proba(Xte)[:, 1])), 3)}`,
          hints: ["Numeric steps: make_pipeline(SimpleImputer(strategy=\"median\"), StandardScaler())", "evaluate: split, fit on the training part, predict the test part", "AUC uses predict_proba(Xte)[:, 1]"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.metrics import recall_score, roc_auc_score
            mm = expect_func("make_model"); ev = expect_func("evaluate")
            p = pd.read_csv("patients.csv"); X, y = p.drop(columns=["patient_id", "sick"]), p["sick"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ref = make_pipeline(ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "bmi", "bp", "glucose", "smoker"]),
                ("cat", OneHotEncoder(handle_unknown="ignore"), ["exercise", "province"])]), LogisticRegression(max_iter=1000)).fit(Xtr, ytr)
            pr = ref.predict(Xte)
            want = {"accuracy": round((pr == yte).mean(), 3), "recall": round(recall_score(yte, pr), 3), "auc": round(roc_auc_score(yte, ref.predict_proba(Xte)[:, 1]), 3)}
            expect_close(ev(mm()), want, "evaluate(make_model())")
            m = mm().fit(Xtr, ytr)
            expect_equal(len(m[0].get_feature_names_out()), 13, "columns after preprocessing (5 numeric + 3 exercise + 5 provinces)")` }],
        },
        {
          id: "cp3-3", title: "Why Did It Decide?",
          story: "The physicians won't trust a black box. Which factors push the risk up, and by how much?",
          lesson: `<p>A logistic regression is explainable: each feature has a coefficient. With <b>scaled</b> features, coefficients are comparable: the bigger |coef|, the stronger the effect. Positive raises the risk, negative lowers it.</p>
            <ul><li>Names: <code>model[0].get_feature_names_out()</code> (like <code>num__glucose</code>, <code>cat__exercise_daily</code>)</li>
            <li>Coefficients: <code>model[-1].coef_[0]</code></li>
            <li><code>exp(coef)</code> is an <b>odds multiplier</b>: one standard deviation more glucose multiplies the odds of being sick by e<sup>coef</sup></li></ul>
            <p>These are associations in this data, not proof of cause.</p>`,
          example: d`
            import numpy as np

            print(round(float(np.exp(0.7)), 2), round(float(np.exp(-0.7)), 2))`,
          files: { "patients.csv": PATIENTS },
          task: `The starter fits the physician's model on the training split. Write:<br>
            • <code>top_factors(model, k=5)</code> → a list of <code>(feature_name, coef)</code> tuples for the k largest |coef|, largest first, coef rounded to 3<br>
            • <code>odds_multiplier(model, name)</code> → <code>exp(coef)</code> of the named feature, rounded to 2`,
          starter: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]
            patients = pd.read_csv("patients.csv")
            X, y = patients.drop(columns=["patient_id", "sick"]), patients["sick"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            model = make_pipeline(ColumnTransformer([
                ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                ("cat", OneHotEncoder(handle_unknown="ignore"), CAT),
            ]), LogisticRegression(max_iter=1000)).fit(Xtr, ytr)

            def top_factors(model, k=5):
                pass

            def odds_multiplier(model, name):
                pass
            `,
          solution: d`
            import numpy as np
            import pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]
            patients = pd.read_csv("patients.csv")
            X, y = patients.drop(columns=["patient_id", "sick"]), patients["sick"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            model = make_pipeline(ColumnTransformer([
                ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                ("cat", OneHotEncoder(handle_unknown="ignore"), CAT),
            ]), LogisticRegression(max_iter=1000)).fit(Xtr, ytr)

            def coefs(model):
                return dict(zip(model[0].get_feature_names_out(), model[-1].coef_[0]))

            def top_factors(model, k=5):
                c = coefs(model)
                order = sorted(c, key=lambda n: -abs(c[n]))[:k]
                return [(str(n), round(float(c[n]), 3)) for n in order]

            def odds_multiplier(model, name):
                return round(float(np.exp(coefs(model)[name])), 2)

            print(top_factors(model))`,
          hints: ["names = model[0].get_feature_names_out(); values = model[-1].coef_[0]", "Sort the names by -abs(coef) and keep the first k", "odds_multiplier: np.exp(coef of that name)"],
          tests: [{ code: d`
            import numpy as np, pandas as pd
            from sklearn.model_selection import train_test_split
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            tf = expect_func("top_factors"); om = expect_func("odds_multiplier")
            p = pd.read_csv("patients.csv"); X, y = p.drop(columns=["patient_id", "sick"]), p["sick"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            m = make_pipeline(ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "bmi", "bp", "glucose", "smoker"]),
                ("cat", OneHotEncoder(handle_unknown="ignore"), ["exercise", "province"])]), LogisticRegression(max_iter=1000)).fit(Xtr, ytr)
            c = dict(zip(m[0].get_feature_names_out(), m[-1].coef_[0])); order = sorted(c, key=lambda n: -abs(c[n]))
            got = tf(m)
            expect_equal([g[0] for g in got], order[:5], "the top 5 factors (largest |coef| first)")
            expect_close([g[1] for g in got], [round(c[n], 3) for n in order[:5]], "their coefficients")
            expect_equal(len(tf(m, k=3)), 3, "top_factors(model, k=3)")
            expect_close(om(m, "num__glucose"), round(np.exp(c["num__glucose"]), 2), "odds_multiplier(model, 'num__glucose')")` }],
        },
        {
          id: "cp3-4", type: "quiz", title: "Riddles of the Physician",
          story: "The Royal Physician's riddles about explaining models.",
          lesson: `<p>Explanations are only as good as the setup behind them: scale before comparing coefficients, remember correlation isn't causation, and choose metrics that match the cost of each mistake.</p>`,
          questions: [
            { q: "What does this print?", predict: true, code: d`
                import numpy as np
                print(round(float(np.exp(np.log(2) + np.log(3))), 1))`,
              choices: ["6.0", "5.0", "1.8", "0.7"], answer: 0,
              explain: "Coefficients add on the log-odds scale, so their odds multipliers multiply: 2 × 3 = 6." },
            { q: "Why compare coefficients only after scaling the numeric features?",
              choices: ["otherwise a coefficient depends on the units (a feature in grams gets a tiny coefficient)", "scaling makes coefficients positive", "unscaled models can't have coefficients", "it doesn't matter"], answer: 0,
              explain: "After scaling, each coefficient is the effect of one standard deviation, which makes them comparable." },
            { q: "The model gives \"daily exercise\" a strong negative coefficient. Can the physician claim exercise <b>prevents</b> the fever?",
              choices: ["not from this alone: it's an association, and something else (like age) may explain it", "yes, the model proves it", "yes, if the AUC is above 0.8", "no, coefficients are meaningless"], answer: 0,
              explain: "Observational data shows associations. Causal claims need experiments or careful causal methods." },
            { q: "Missing the sick patients is far worse than a false alarm. Which number should the physician watch most?",
              choices: ["recall of the sick class", "accuracy", "precision", "the number of features"], answer: 0,
              explain: "Recall tells you what share of sick patients the model catches." },
            { q: "A forest has a higher AUC than the logistic model, but the physicians need to see the reasons for each prediction. A sensible choice?",
              choices: ["weigh both: report the gain, and consider the simpler explainable model if the gap is small", "always pick the higher AUC", "always pick the simpler model", "average their coefficients"], answer: 0,
              explain: "Model choice is a judgement about accuracy, trust and use, not just one number." },
          ],
        },
        {
          id: "cp3-5", boss: true, time: 1200, title: "The Physician's Verdict",
          story: "Two automatons apply to be the Royal Physician's assistant. Judge them fairly, pick one, and set its alarm level.",
          lesson: `<p>Compare candidates with cross-validated AUC on the training data, test the winner once, then choose an operating threshold. Lowering the threshold below 0.5 catches more sick patients (higher recall) at the price of more false alarms.</p>`,
          example: d`
            print("cross_val_score(model, Xtr, ytr, cv=5, scoring='roc_auc')")`,
          files: { "patients.csv": PATIENTS },
          task: `Split as before (<code>test_size=0.25, random_state=0, stratify=y</code>). Candidates share the physician's preprocessor: <code>"logistic"</code> (<code>LogisticRegression(max_iter=1000)</code>) and <code>"forest"</code> (<code>RandomForestClassifier(n_estimators=200, min_samples_leaf=5, random_state=0)</code>).<br>
            Write <code>verdict()</code> → a dict: <code>"cv_auc"</code> (<code>{name: mean 5-fold CV AUC on the training data}</code>), <code>"winner"</code> (higher; logistic on a tie), <code>"test_auc"</code> of the winner fitted on the training data, and <code>"recall_at_0.3"</code>: the winner's test recall when patients with a sick probability ≥ 0.3 are flagged. Round to 3.`,
          starter: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import roc_auc_score, recall_score

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]

            def preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", OneHotEncoder(handle_unknown="ignore"), CAT),
                ])

            def verdict():
                patients = pd.read_csv("patients.csv")
                return {}
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
            from sklearn.metrics import roc_auc_score, recall_score

            NUM = ["age", "bmi", "bp", "glucose", "smoker"]
            CAT = ["exercise", "province"]

            def preprocessor():
                return ColumnTransformer([
                    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), NUM),
                    ("cat", OneHotEncoder(handle_unknown="ignore"), CAT),
                ])

            def verdict():
                patients = pd.read_csv("patients.csv")
                X, y = patients.drop(columns=["patient_id", "sick"]), patients["sick"]
                Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
                models = {"logistic": LogisticRegression(max_iter=1000),
                          "forest": RandomForestClassifier(n_estimators=200, min_samples_leaf=5, random_state=0)}
                cv = {n: round(float(cross_val_score(make_pipeline(preprocessor(), m), Xtr, ytr, cv=5, scoring="roc_auc").mean()), 3)
                      for n, m in models.items()}
                winner = max(models, key=lambda n: cv[n])
                final = make_pipeline(preprocessor(), models[winner]).fit(Xtr, ytr)
                proba = final.predict_proba(Xte)[:, 1]
                return {"cv_auc": cv, "winner": winner, "test_auc": round(float(roc_auc_score(yte, proba)), 3),
                        "recall_at_0.3": round(float(recall_score(yte, (proba >= 0.3).astype(int))), 3)}`,
          hints: ["cross_val_score(make_pipeline(preprocessor(), model), Xtr, ytr, cv=5, scoring=\"roc_auc\")", "max over the names in order picks logistic on a tie", "Flag with (proba >= 0.3).astype(int), then recall_score(yte, flags)"],
          tests: [{ code: d`
            import pandas as pd
            from sklearn.model_selection import train_test_split, cross_val_score
            from sklearn.compose import ColumnTransformer
            from sklearn.pipeline import make_pipeline
            from sklearn.impute import SimpleImputer
            from sklearn.preprocessing import OneHotEncoder, StandardScaler
            from sklearn.linear_model import LogisticRegression
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.metrics import roc_auc_score, recall_score
            ve = expect_func("verdict")
            pre = lambda: ColumnTransformer([("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["age", "bmi", "bp", "glucose", "smoker"]),
                ("cat", OneHotEncoder(handle_unknown="ignore"), ["exercise", "province"])])
            p = pd.read_csv("patients.csv"); X, y = p.drop(columns=["patient_id", "sick"]), p["sick"]
            Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
            ms = {"logistic": LogisticRegression(max_iter=1000), "forest": RandomForestClassifier(n_estimators=200, min_samples_leaf=5, random_state=0)}
            cv = {n: round(cross_val_score(make_pipeline(pre(), m), Xtr, ytr, cv=5, scoring="roc_auc").mean(), 3) for n, m in ms.items()}
            w = max(ms, key=lambda n: cv[n]); pr = make_pipeline(pre(), ms[w]).fit(Xtr, ytr).predict_proba(Xte)[:, 1]
            got = ve()
            expect_close(got.get("cv_auc"), cv, "cv_auc"); expect_equal(got.get("winner"), w, "winner")
            expect_close([got.get("test_auc"), got.get("recall_at_0.3")], [round(roc_auc_score(yte, pr), 3), round(recall_score(yte, (pr >= 0.3).astype(int)), 3)], "test_auc, recall_at_0.3")` }],
        },
      ],
    },

    // ───────────────────────────── FLOOR 4
    {
      id: 4, name: "The Emperor's Council", topic: "full analyses that combine SQL, pandas, statistics, charts and models", time: 1200, icon: "🫅",
      intro: "The Emperor's Council meets one last time. Every question needs everything you've learned. Answer them, and the Empire is saved.",
      missions: [
        {
          id: "cp4-1", boss: true, time: 1200, title: "The Granary Question",
          story: "One new granary can be built. The council wants it where trade is growing fastest.",
          lesson: `<p>Pivot inside SQL with conditional sums: <code>SUM(CASE WHEN substr(month, 1, 4) = '2022' THEN revenue END)</code>. Then finish in pandas and show the answer as a chart where colour carries meaning: green for growth, red for decline.</p>`,
          example: d`
            import sqlite3

            conn = sqlite3.connect(":memory:")
            with open("empire.sql") as f:
                conn.executescript(f.read())
            print(conn.execute("SELECT substr(month, 1, 4) AS year, ROUND(SUM(revenue)) FROM sales GROUP BY year").fetchall())`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write:<br>• <code>growth_table(conn)</code> → a DataFrame with columns <code>province, rev_2022, rev_2023, growth_pct</code>: each province's total revenue in 2022 and 2023 (from SQL, rounded to 2 in SQL), and growth = (2023 ÷ 2022 − 1) × 100 rounded to 1, sorted by growth, highest first, index reset<br>
            • <code>growth_chart(table)</code> → a figure with horizontal bars of <code>growth_pct</code> per province (table order), green (<code>"#2e7d32"</code>) for growth ≥ 0 and red (<code>"#c62828"</code>) otherwise, a vertical line at 0, titled <code>"Revenue growth, 2022 to 2023"</code>`,
          starter: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def growth_table(conn):
                pass

            def growth_chart(table):
                pass
            `,
          solution: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def growth_table(conn):
                t = pd.read_sql_query("""
                    SELECT p.name AS province,
                           ROUND(SUM(CASE WHEN substr(s.month, 1, 4) = '2022' THEN s.revenue END), 2) AS rev_2022,
                           ROUND(SUM(CASE WHEN substr(s.month, 1, 4) = '2023' THEN s.revenue END), 2) AS rev_2023
                    FROM sales s
                    JOIN shops sh ON s.shop_id = sh.shop_id
                    JOIN provinces p ON sh.province_id = p.province_id
                    GROUP BY p.name""", conn)
                t["growth_pct"] = ((t["rev_2023"] / t["rev_2022"] - 1) * 100).round(1)
                return t.sort_values("growth_pct", ascending=False).reset_index(drop=True)

            def growth_chart(table):
                fig, ax = plt.subplots()
                colours = ["#2e7d32" if g >= 0 else "#c62828" for g in table["growth_pct"]]
                ax.barh(table["province"], table["growth_pct"], color=colours)
                ax.axvline(0, color="black", linewidth=1)
                ax.set_title("Revenue growth, 2022 to 2023")
                return fig

            t = growth_table(connect())
            print(t)
            growth_chart(t)`,
          hints: ["One row per province: GROUP BY p.name, with a CASE WHEN inside each SUM", "growth_pct in pandas: ((rev_2023 / rev_2022 - 1) * 100).round(1)", "Colours: a list, one per bar; ax.barh(..., color=colours); ax.axvline(0)"],
          tests: [{ code: d`
            import sqlite3, pandas as pd
            gt = expect_func("growth_table"); gc = expect_func("growth_chart")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            t = pd.read_sql_query("SELECT p.name AS province, ROUND(SUM(CASE WHEN substr(s.month, 1, 4) = '2022' THEN s.revenue END), 2) AS rev_2022, ROUND(SUM(CASE WHEN substr(s.month, 1, 4) = '2023' THEN s.revenue END), 2) AS rev_2023 FROM sales s JOIN shops sh ON s.shop_id = sh.shop_id JOIN provinces p ON sh.province_id = p.province_id GROUP BY p.name", ref)
            t["growth_pct"] = ((t["rev_2023"] / t["rev_2022"] - 1) * 100).round(1)
            t = t.sort_values("growth_pct", ascending=False).reset_index(drop=True)
            c2 = sqlite3.connect(":memory:"); c2.executescript(open("empire.sql").read())
            got = gt(c2)
            expect_frame(got, t, "growth_table")
            fig = gc(t)
            assert fig is not None and hasattr(fig, "axes"), "growth_chart should return the figure."
            fig.canvas.draw(); ax = fig.axes[0]
            expect_close(bars_of(ax, horizontal=True), list(t["growth_pct"]), "bar lengths")
            expect_equal(ticklabels_of(ax, "y"), list(t["province"]), "province labels")
            from matplotlib.patches import Rectangle
            cols = [hexcolor(r.get_facecolor()) for r in ax.patches if isinstance(r, Rectangle)]
            expect_equal(cols, ["#2e7d32" if g >= 0 else "#c62828" for g in t["growth_pct"]], "bar colours (green for growth, red for decline)")
            assert any(list(l.get_xdata()) == [0, 0] for l in lines_of(ax)), "Add a vertical line at 0 (ax.axvline(0))."
            expect_text(ax.get_title(), "title", exact="Revenue growth, 2022 to 2023")` }],
        },
        {
          id: "cp4-2", boss: true, time: 1200, title: "Does the Promotion Work?",
          story: "The merchants swear their promotions raise revenue by almost 40%. The treasurer suspects the big shops simply promote more often.",
          lesson: `<p>A naive comparison (mean revenue in promotion months vs other months) mixes two things: the promotion's effect, and <b>which shops</b> run promotions. If big shops promote more, the naive lift is inflated: a confounder, like Simpson's paradox.</p>
            <p>A fairer comparison stays <b>within each shop</b>: compare each shop's promotion months with its own normal months, then average those lifts across shops.</p>`,
          example: d`
            import pandas as pd

            d = pd.DataFrame({"shop": [1, 1, 2, 2], "promo": [0, 1, 0, 1], "rev": [100, 110, 1000, 1100]})
            print(d.groupby("promo")["rev"].mean())`,
          files: { "empire.sql": EMPIRE_SQL },
          task: `Write <code>promo_effect(conn)</code> → a dict:<br>
            • <code>"naive_lift_pct"</code>: (mean revenue of promo rows ÷ mean revenue of non-promo rows − 1) × 100<br>
            • <code>"fair_lift_pct"</code>: for each shop, (its mean promo revenue ÷ its mean non-promo revenue − 1) × 100; then the mean over shops<br>
            • <code>"promo_rate_big"</code> and <code>"promo_rate_small"</code>: the share of promo months among the 7 shops with the highest total revenue, and among the other 8<br>All rounded to 1 (the rates to 3).`,
          starter: d`
            import sqlite3
            import pandas as pd

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def promo_effect(conn):
                sales = pd.read_sql_query("SELECT shop_id, month, revenue, promo FROM sales", conn)
                return {}
            `,
          solution: d`
            import sqlite3
            import pandas as pd

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def promo_effect(conn):
                sales = pd.read_sql_query("SELECT shop_id, month, revenue, promo FROM sales", conn)
                means = sales.groupby("promo")["revenue"].mean()
                naive = (means[1] / means[0] - 1) * 100
                per_shop = sales.groupby(["shop_id", "promo"])["revenue"].mean().unstack()
                fair = ((per_shop[1] / per_shop[0] - 1) * 100).mean()
                totals = sales.groupby("shop_id")["revenue"].sum().sort_values(ascending=False)
                big = sales["shop_id"].isin(totals.index[:7])
                return {"naive_lift_pct": round(float(naive), 1), "fair_lift_pct": round(float(fair), 1),
                        "promo_rate_big": round(float(sales.loc[big, "promo"].mean()), 3),
                        "promo_rate_small": round(float(sales.loc[~big, "promo"].mean()), 3)}`,
          hints: ["Naive: sales.groupby(\"promo\")[\"revenue\"].mean()", "Within shops: groupby([\"shop_id\", \"promo\"])[\"revenue\"].mean().unstack() gives a column per promo value", "Big shops: the top 7 of groupby(\"shop_id\")[\"revenue\"].sum() sorted descending"],
          tests: [{ code: d`
            import sqlite3, pandas as pd
            pe = expect_func("promo_effect")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            s = pd.read_sql_query("SELECT shop_id, month, revenue, promo FROM sales", ref)
            m = s.groupby("promo")["revenue"].mean(); ps = s.groupby(["shop_id", "promo"])["revenue"].mean().unstack()
            tot = s.groupby("shop_id")["revenue"].sum().sort_values(ascending=False); big = s["shop_id"].isin(tot.index[:7])
            want = {"naive_lift_pct": round((m[1] / m[0] - 1) * 100, 1), "fair_lift_pct": round(((ps[1] / ps[0] - 1) * 100).mean(), 1),
                    "promo_rate_big": round(s.loc[big, "promo"].mean(), 3), "promo_rate_small": round(s.loc[~big, "promo"].mean(), 3)}
            got = pe(ref)
            expect_close(got, want, "promo_effect")
            assert want["naive_lift_pct"] > want["fair_lift_pct"] + 5, "(self-check) the naive lift should be inflated"` }],
        },
        {
          id: "cp4-3", type: "quiz", title: "Riddles of the Council",
          story: "The council's final riddles, about the whole journey from data to decision.",
          lesson: `<p>A good analysis asks a clear question, uses the right data, checks for traps (confounders, leakage, bad baselines), and ends with an answer a decision-maker can act on.</p>`,
          questions: [
            { q: "Promotion months average 40% more revenue, but within each shop the lift is only 15%. The most likely reason?",
              choices: ["bigger shops run promotions more often, inflating the naive comparison", "the promotions stopped working", "a calculation error", "revenue was rounded"], answer: 0,
              explain: "Shop size confounds the comparison; comparing within shops removes it." },
            { q: "What does this print?", predict: true, code: d`
                import pandas as pd
                d = pd.DataFrame({"shop": [1, 1, 2, 2], "promo": [0, 1, 0, 1], "rev": [100, 110, 1000, 1100]})
                print(d.groupby(["shop", "promo"])["rev"].mean().unstack().values.tolist())`,
              choices: ["[[100.0, 110.0], [1000.0, 1100.0]]", "[[100.0, 1000.0], [110.0, 1100.0]]", "[[550.0, 605.0]]", "[[100, 110, 1000, 1100]]"], answer: 0,
              explain: "unstack() turns the inner index (promo) into columns: one row per shop." },
            { q: "Where should most of the heavy filtering and joining of a huge database happen?",
              choices: ["in SQL, inside the database, before loading the result into pandas", "in pandas after loading every table", "in matplotlib", "by hand"], answer: 0,
              explain: "Databases are built to join and aggregate large tables; load only what you need." },
            { q: "Your final model has 91% accuracy. What should the report to the Emperor also include?",
              choices: ["a baseline for comparison, the main limitations, and what decision the result supports", "only the 91%", "the source code", "nothing else"], answer: 0,
              explain: "Numbers mean little without context: compared to what, how reliable, and so what?" },
            { q: "Which of these is a sign that a result might be too good to be true?",
              choices: ["near-perfect test scores on a hard problem: check for data leakage", "a model slightly better than the baseline", "a wide confidence interval", "a small dataset"], answer: 0,
              explain: "When a model looks magical, first suspect the test data leaked into training." },
          ],
        },
        {
          id: "cp4-4", boss: true, time: 1200, title: "The State of the Empire",
          story: "For the great assembly, the Emperor wants a single dashboard: the Empire's trade, people and health on one page.",
          lesson: `<p>A dashboard puts several small charts on one figure: <code>fig, axes = plt.subplots(2, 2, figsize=(12, 8))</code>, then draw on <code>axes[0, 0]</code>, <code>axes[0, 1]</code>… Give each panel a short title, the whole figure a <code>suptitle</code>, and call <code>fig.tight_layout()</code> so nothing overlaps.</p>`,
          example: d`
            import matplotlib.pyplot as plt

            fig, axes = plt.subplots(2, 2, figsize=(6, 4))
            for i, ax in enumerate(axes.flat):
                ax.set_title("panel " + str(i))
            fig.tight_layout()
            plt.show()`,
          files: { "empire.sql": EMPIRE_SQL, "census.csv": CENSUS, "patients.csv": PATIENTS },
          task: `Write <code>state_of_the_empire()</code> → a 2 × 2 figure titled <code>"State of the Empire"</code>:<br>
            • top left, <code>"Monthly revenue"</code>: a line of the total revenue by month (from SQL, rounded to 2)<br>
            • top right, <code>"Revenue by region"</code>: bars of revenue per region, highest first<br>
            • bottom left, <code>"Population"</code>: bars of the clean census population per province, largest first<br>
            • bottom right, <code>"Sickness by exercise"</code>: bars of the sick rate for none, some, daily`,
          starter: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def state_of_the_empire():
                pass
            `,
          solution: d`
            import sqlite3
            import pandas as pd
            import matplotlib.pyplot as plt

            def connect():
                conn = sqlite3.connect(":memory:")
                with open("empire.sql") as f:
                    conn.executescript(f.read())
                return conn

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def state_of_the_empire():
                conn = connect()
                monthly = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", conn)
                region = pd.read_sql_query("""SELECT p.region, ROUND(SUM(s.revenue), 2) AS revenue FROM sales s
                    JOIN shops sh ON s.shop_id = sh.shop_id JOIN provinces p ON sh.province_id = p.province_id
                    GROUP BY p.region ORDER BY revenue DESC""", conn)
                population = clean(pd.read_csv("census.csv"))["province"].value_counts()
                patients = pd.read_csv("patients.csv")
                sick = patients.groupby("exercise")["sick"].mean().reindex(["none", "some", "daily"])

                fig, axes = plt.subplots(2, 2, figsize=(12, 8))
                axes[0, 0].plot(monthly["month"], monthly["revenue"])
                axes[0, 0].set_title("Monthly revenue")
                axes[0, 0].tick_params(axis="x", labelrotation=90, labelsize=6)
                axes[0, 1].bar(region["region"], region["revenue"])
                axes[0, 1].set_title("Revenue by region")
                axes[1, 0].bar(population.index, population.values)
                axes[1, 0].set_title("Population")
                axes[1, 1].bar(sick.index, sick.values)
                axes[1, 1].set_title("Sickness by exercise")
                fig.suptitle("State of the Empire")
                fig.tight_layout()
                return fig

            state_of_the_empire()`,
          hints: ["fig, axes = plt.subplots(2, 2); draw on axes[0, 0], axes[0, 1], axes[1, 0], axes[1, 1]", "Population: clean(census)[\"province\"].value_counts() is already largest first", "Sick rates: groupby(\"exercise\")[\"sick\"].mean().reindex([\"none\", \"some\", \"daily\"])"],
          tests: [{ code: d`
            import sqlite3, numpy as np, pandas as pd
            se = expect_func("state_of_the_empire"); cl = expect_func("clean")
            ref = sqlite3.connect(":memory:"); ref.executescript(open("empire.sql").read())
            m = pd.read_sql_query("SELECT month, ROUND(SUM(revenue), 2) AS revenue FROM sales GROUP BY month ORDER BY month", ref)
            r = pd.read_sql_query("SELECT p.region, ROUND(SUM(s.revenue), 2) AS revenue FROM sales s JOIN shops sh ON s.shop_id = sh.shop_id JOIN provinces p ON sh.province_id = p.province_id GROUP BY p.region ORDER BY revenue DESC", ref)
            pop = cl(pd.read_csv("census.csv"))["province"].value_counts()
            p = pd.read_csv("patients.csv"); sk = p.groupby("exercise")["sick"].mean().reindex(["none", "some", "daily"])
            fig = se()
            assert fig is not None and hasattr(fig, "axes"), "state_of_the_empire should return the figure."
            fig.canvas.draw()
            expect_equal(len(fig.axes), 4, "number of panels")
            a, b, c, d = fig.axes
            expect_equal([x.get_title() for x in fig.axes], ["Monthly revenue", "Revenue by region", "Population", "Sickness by exercise"], "panel titles (top left, top right, bottom left, bottom right)")
            assert lines_of(a), "Top left: draw the monthly revenue as a line."
            expect_close(list(np.asarray(lines_of(a)[0].get_ydata(), dtype=float)), list(m["revenue"]), "top left: monthly revenue")
            expect_close(bars_of(b), list(r["revenue"]), "top right: revenue by region"); expect_equal(ticklabels_of(b), list(r["region"]), "top right: region labels")
            expect_close(bars_of(c), list(pop.values), "bottom left: population"); expect_equal(ticklabels_of(c), list(pop.index), "bottom left: province labels")
            expect_close(bars_of(d), list(sk.values), "bottom right: sick rates"); expect_equal(ticklabels_of(d), ["none", "some", "daily"], "bottom right: labels")
            expect_text(fig._suptitle.get_text() if fig._suptitle else "", "figure title", exact="State of the Empire")` }],
        },
        {
          id: "cp4-5", boss: true, time: 1500, title: "Save the Empire",
          story: "The fever must be stopped. One royal hospital can be built. Combine the census and the physician's records to decide where, and free the Emperor.",
          lesson: `<p>The final answer combines two sources: the <b>census</b> says how many people live in each province, the <b>patients</b> say how often people there fall sick. Expected sick citizens = population × sick rate. Merge on the shared key (province) and rank. Notice that the province with the highest <b>rate</b> is not necessarily the one with the most <b>cases</b>.</p>
            <p>Always state the answer, the evidence and the main caveat (here: the patient records are a sample, and their rates are estimates).</p>`,
          example: d`
            import pandas as pd

            a = pd.DataFrame({"province": ["A", "B"], "population": [100, 300]})
            b = pd.DataFrame({"province": ["B", "A"], "sick_rate": [0.1, 0.5]})
            m = a.merge(b, on="province")
            m["expected_sick"] = m["population"] * m["sick_rate"]
            print(m.sort_values("expected_sick", ascending=False))`,
          files: { "census.csv": CENSUS, "patients.csv": PATIENTS },
          task: `Write:<br>• <code>hospital_table()</code> → a DataFrame with columns <code>province, population, sick_rate, expected_sick</code>: population from the <b>clean</b> census, sick rate per province from the patients (rounded to 3), expected_sick = population × the <b>unrounded</b> rate, rounded to 1; sorted by expected_sick, highest first, index reset<br>
            • <code>decision()</code> → <code>"Build the hospital in &lt;Province&gt;: about &lt;n&gt; sick citizens expected."</code> with n the top expected_sick rounded to a whole number`,
          starter: d`
            import pandas as pd

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def hospital_table():
                pass

            def decision():
                pass
            `,
          solution: d`
            import pandas as pd

            def clean(df):
                df = df.drop_duplicates().copy()
                df["province"] = df["province"].str.strip().str.title()
                df["age"] = df["age"].fillna(df.groupby("province")["age"].transform("median"))
                df["income"] = df["income"].fillna(df.groupby("occupation")["income"].transform("median"))
                return df.reset_index(drop=True)

            def hospital_table():
                census = clean(pd.read_csv("census.csv"))
                pop = census.groupby("province").size().rename("population").reset_index()
                rate = pd.read_csv("patients.csv").groupby("province")["sick"].mean().rename("rate").reset_index()
                t = pop.merge(rate, on="province")
                t["expected_sick"] = (t["population"] * t["rate"]).round(1)
                t["sick_rate"] = t["rate"].round(3)
                t = t[["province", "population", "sick_rate", "expected_sick"]]
                return t.sort_values("expected_sick", ascending=False).reset_index(drop=True)

            def decision():
                top = hospital_table().iloc[0]
                return f"Build the hospital in {top['province']}: about {round(top['expected_sick'])} sick citizens expected."

            print(hospital_table())
            print(decision())`,
          hints: ["population: clean(census).groupby(\"province\").size()", "rate: patients.groupby(\"province\")[\"sick\"].mean(); merge on \"province\"", "Compute expected_sick from the unrounded rate, then round the columns", "decision: the first row of the sorted table"],
          tests: [{ code: d`
            import pandas as pd
            ht = expect_func("hospital_table"); de = expect_func("decision"); cl = expect_func("clean")
            pop = cl(pd.read_csv("census.csv")).groupby("province").size()
            rate = pd.read_csv("patients.csv").groupby("province")["sick"].mean()
            t = pd.DataFrame({"province": pop.index, "population": pop.values, "sick_rate": rate[pop.index].round(3).values,
                              "expected_sick": (pop * rate[pop.index]).round(1).values})
            t = t.sort_values("expected_sick", ascending=False).reset_index(drop=True)
            expect_frame(ht(), t, "hospital_table()")
            expect_equal(de(), "Build the hospital in " + t["province"][0] + ": about " + str(round(t["expected_sick"][0])) + " sick citizens expected.", "decision()")` }],
        },
      ],
    },
  ];

  root.QUEST.empire({
    id: "capstone", name: "Capstone", realm: "The Imperial Capital", tower: "The Emperor's Palace",
    ruler: "The Emperor", rulerIcon: "🫅", icon: "👑", color: "#ffdf8a", requires: ["sql", "viz", "ml"],
    packages: ["numpy", "pandas", "matplotlib", "scikit-learn", "sqlite3"], runMs: 25000, submitMs: 45000,
    blurb: "Real projects from messy data to clear answers. Free the Emperor and save the Empire.",
    worlds: WORLDS,
  });
})(typeof window !== "undefined" ? window : globalThis);
