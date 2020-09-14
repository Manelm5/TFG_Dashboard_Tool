var programsData = '{"names":["Vulcan","Crait","Jedha","Eleven","Dqar","Device App"],"types":["Device","Device","Device","Device","Software","Software"]}';

var timeData = '{"programs":[["19/10/2019  04:46"],["19/10/2019  04:46"],["19/10/2019  04:47"],["19/10/2019  04:48"],["19/10/2019  04:49"],["19/10/2019  04:50"]]}';

var statusData = '{"programs":[["0%",16,1,15,0.6,"*59%",0],["90%",43,6,37,0.7,"63%",10],["87%",40,5,35,0.6,"*79%",16],["86%",43,7,36,0.7,"*82%",0],["99%",25,0,25,0.5,"*83%",7],["98%",10,0,10,0.8,"*74%",0]]}';

var catalogStatusData = '{"programs":[[[""],["Passed",0],["Failed",0],["Not Run",0],["Blocked",0]],[[""],["Passed",528],["Failed",47],["Not Run",105],["Blocked",14]],[[""],["Passed",604],["Failed",53],["Not Run",75],["Blocked",35]],[[""],["Passed",355],["Failed",37],["Not Run",48],["Blocked",20]],[[""],["Passed",365],["Failed",4],["Not Run",192],["Blocked",0]],[[""],["Passed",167],["Failed",3],["Not Run",49],["Blocked",0]]]}';

var defectFoundFixedData = '{"programs":[[[""],["04/05/2019",11,11,14,14],["25/05/2019",10,10,14,14],["15/06/2019",6,6,12,12],["06/07/2019",2,2,2,2],["27/07/2019",1,1,3,3],["17/08/2019",5,5,4,4],["07/09/2019",3,3,7,7],["28/09/2019",2,2,6,6],["19/10/2019",1,1,7,7]],[[""],["04/05/2019",73,73,61,61],["25/05/2019",57,57,67,67],["15/06/2019",38,38,39,39],["06/07/2019",36,36,55,55],["27/07/2019",31,31,32,32],["17/08/2019",17,17,17,17],["07/09/2019",32,32,27,27],["28/09/2019",23,23,19,19],["19/10/2019",47,47,73,73]],[[""],["04/05/2019",13,13,36,36],["25/05/2019",48,48,39,39],["15/06/2019",49,49,48,48],["06/07/2019",83,83,85,85],["27/07/2019",57,57,56,56],["17/08/2019",39,39,36,36],["07/09/2019",46,46,42,42],["28/09/2019",42,42,40,40],["19/10/2019",61,61,105,105]],[[""],["04/05/2019",17,17,18,18],["25/05/2019",32,32,35,35],["15/06/2019",24,24,34,34],["06/07/2019",17,17,19,19],["27/07/2019",36,36,18,18],["17/08/2019",23,23,15,15],["07/09/2019",13,13,11,11],["28/09/2019",23,23,14,14],["19/10/2019",17,17,72,72]],[[""],["04/05/2019",13,13,14,14],["25/05/2019",12,12,14,14],["15/06/2019",16,16,22,22],["06/07/2019",10,10,8,8],["27/07/2019",4,4,8,8],["17/08/2019",13,13,6,6],["07/09/2019",9,9,16,16],["28/09/2019",7,7,9,9],["19/10/2019",8,8,19,19]],[[""],["04/05/2019",0,0,0,0],["25/05/2019",2,2,1,1],["15/06/2019",7,7,6,6],["06/07/2019",30,30,28,28],["27/07/2019",6,6,0,0],["17/08/2019",4,4,7,7],["07/09/2019",8,8,10,10],["28/09/2019",2,2,1,1],["19/10/2019",10,10,6,6]]]}';

var defectsTrendData = '{"programs":[[[""],["08/12/2018",849,428,420],["29/12/2018",871,438,432],["19/01/2019",902,454,447],["09/02/2019",932,468,463],["02/03/2019",958,487,470],["23/03/2019",975,500,474],["13/04/2019",997,516,480],["04/05/2019",1008,525,482],["25/05/2019",1018,532,485],["15/06/2019",1024,536,487],["06/07/2019",1026,538,487],["27/07/2019",1027,539,487],["17/08/2019",1032,542,489],["07/09/2019",1035,544,490],["28/09/2019",1037,546,490],["19/10/2019",1038,547,490]],[[""],["08/12/2018",332,71,261],["29/12/2018",364,77,287],["19/01/2019",393,83,310],["09/02/2019",442,94,348],["02/03/2019",508,111,397],["23/03/2019",574,126,448],["13/04/2019",640,143,497],["04/05/2019",713,156,557],["25/05/2019",770,161,609],["15/06/2019",808,168,640],["06/07/2019",844,179,665],["27/07/2019",875,184,691],["17/08/2019",892,185,707],["07/09/2019",924,192,732],["28/09/2019",947,199,748],["19/10/2019",994,218,776]],[[""],["08/12/2018",241,74,167],["29/12/2018",280,77,203],["19/01/2019",304,83,221],["09/02/2019",348,89,259],["02/03/2019",414,109,305],["23/03/2019",492,127,365],["13/04/2019",587,153,434],["04/05/2019",600,155,445],["25/05/2019",648,170,478],["15/06/2019",697,179,518],["06/07/2019",780,198,582],["27/07/2019",837,215,622],["17/08/2019",876,220,656],["07/09/2019",922,225,697],["28/09/2019",964,230,734],["19/10/2019",1025,243,782]],[[""],["08/12/2018",28,7,21],["29/12/2018",35,7,28],["19/01/2019",59,19,40],["09/02/2019",79,22,57],["02/03/2019",112,31,81],["23/03/2019",150,35,115],["13/04/2019",174,41,133],["04/05/2019",191,45,146],["25/05/2019",223,54,169],["15/06/2019",247,60,187],["06/07/2019",264,64,200],["27/07/2019",300,71,229],["17/08/2019",323,73,250],["07/09/2019",336,74,262],["28/09/2019",359,80,279],["19/10/2019",376,85,291]],[[""],["08/12/2018",813,189,624],["29/12/2018",822,193,629],["19/01/2019",831,193,638],["09/02/2019",854,196,658],["02/03/2019",871,201,670],["23/03/2019",888,206,682],["13/04/2019",922,218,704],["04/05/2019",935,222,713],["25/05/2019",947,225,722],["15/06/2019",963,232,731],["06/07/2019",973,235,738],["27/07/2019",977,237,740],["17/08/2019",990,239,751],["07/09/2019",999,243,756],["28/09/2019",1006,243,763],["19/10/2019",1014,244,770]],[[""],["08/12/2018",0,0,0],["29/12/2018",0,0,0],["19/01/2019",0,0,0],["09/02/2019",0,0,0],["02/03/2019",0,0,0],["23/03/2019",0,0,0],["13/04/2019",0,0,0],["04/05/2019",0,0,0],["25/05/2019",2,2,0],["15/06/2019",9,4,5],["06/07/2019",39,13,26],["27/07/2019",45,13,32],["17/08/2019",49,13,36],["07/09/2019",57,13,44],["28/09/2019",59,13,46],["19/10/2019",69,14,55]]]}';

var defectsByTeamData = '{"programs":[[[""],["3D-VCN FW",0,11,11],["3D-Common FW",1,1,2],["3D-SW&Data",0,2,2],["CE",0,1,1],["3DP Pipeline&Ink Sys.",0,0,0],["I/O",0,0,0],["3DP-Pre-Post Proc.",0,0,0],["CPS",0,0,0],["CA",0,0,0],["3DP-Fusing System",0,0,0],["SWQA",0,0,0],["Foundations",0,0,0]],[[""],["3DP Pipeline&Ink Sys.",3,13,16],["3DP-Fusing System",1,9,10],["3DP-Pre-Post Proc.",0,4,4],["3D-Common FW",0,3,3],["3D-SW&Data",1,2,3],["CPS",0,3,3],["I/O",0,2,2],["CA",1,0,1],["Foundations",0,1,1],["3D-VCN FW",0,0,0],["CE",0,0,0],["SWQA",0,0,0]],[[""],["3DP-Pre-Post Proc.",1,17,18],["3D-Common FW",0,6,6],["CPS",0,6,6],["3DP Pipeline&Ink Sys.",3,1,4],["3DP-Fusing System",1,3,4],["CA",0,2,2],["3D-VCN FW",0,0,0],["3D-SW&Data",0,0,0],["I/O",0,0,0],["CE",0,0,0],["SWQA",0,0,0],["Foundations",0,0,0]],[[""],["3D-Common FW",0,15,15],["3DP Pipeline&Ink Sys.",1,10,11],["3DP-Fusing System",6,4,10],["CPS",0,3,3],["3DP-Pre-Post Proc.",0,2,2],["SWQA",0,1,1],["Foundations",0,1,1],["3D-VCN FW",0,0,0],["3D-SW&Data",0,0,0],["I/O",0,0,0],["CE",0,0,0],["CA",0,0,0]],[[""],["3D-SW&Data",0,22,22],["SWQA",0,2,2],["3D-Common FW",0,1,1],["3D-VCN FW",0,0,0],["3DP Pipeline&Ink Sys.",0,0,0],["I/O",0,0,0],["3DP-Pre-Post Proc.",0,0,0],["CE",0,0,0],["CPS",0,0,0],["CA",0,0,0],["3DP-Fusing System",0,0,0],["Foundations",0,0,0]],[[""],["3D-SW&Data",0,7,7],["3DP-Fusing System",0,2,2],["3D-Common FW",0,1,1],["3D-VCN FW",0,0,0],["3DP Pipeline&Ink Sys.",0,0,0],["I/O",0,0,0],["3DP-Pre-Post Proc.",0,0,0],["CE",0,0,0],["CPS",0,0,0],["CA",0,0,0],["SWQA",0,0,0],["Foundations",0,0,0]]]}';

var openLogData = '{"programs":[[[""],["18/10/2019",16,1,15],["19/10/2019",16,1,15],["10/10/2019",18,1,17],["11/10/2019",19,2,17],["12/10/2019",19,2,17],["15/10/2019",18,2,16],["16/10/2019",18,2,16],["17/10/2019",18,2,16],["30/08/2019",11,3,8],["15/07/2019",11,3,8],["17/07/2019",11,3,8],["11/06/2019",10,2,8],["12/06/2019",10,2,8],["13/06/2019",11,3,8],["14/06/2019",10,2,8],["15/06/2019",10,2,8],["16/06/2019",10,2,8],["17/06/2019",10,2,8],["18/06/2019",10,2,8],["19/06/2019",10,2,8],["20/06/2019",10,2,8],["21/06/2019",10,2,8],["22/06/2019",10,2,8],["23/06/2019",10,2,8],["24/06/2019",10,2,8],["25/06/2019",10,2,8],["26/06/2019",10,2,8],["27/06/2019",10,2,8],["28/06/2019",11,3,8],["29/06/2019",11,3,8],["30/06/2019",11,3,8],["01/07/2019",11,3,8],["02/07/2019",11,3,8],["03/07/2019",11,3,8],["04/07/2019",11,3,8],["05/07/2019",11,3,8],["06/07/2019",11,3,8],["07/07/2019",11,3,8],["08/07/2019",11,3,8],["09/07/2019",11,3,8],["10/07/2019",11,3,8],["11/07/2019",11,3,8],["12/07/2019",11,3,8],["13/07/2019",11,3,8],["14/07/2019",11,3,8],["18/07/2019",11,3,8],["19/07/2019",11,3,8],["20/07/2019",11,3,8],["21/07/2019",11,3,8],["22/07/2019",11,3,8],["23/07/2019",11,3,8],["24/07/2019",12,3,9],["25/07/2019",12,3,9],["26/07/2019",11,3,8],["27/07/2019",12,4,8],["03/08/2019",12,4,8],["04/08/2019",12,4,8],["05/08/2019",12,4,8],["26/08/2019",11,3,8],["27/08/2019",12,4,8],["28/08/2019",12,4,8],["28/07/2019",12,4,8],["29/07/2019",12,4,8],["30/07/2019",13,5,8],["31/07/2019",13,5,8],["01/08/2019",12,4,8],["02/08/2019",12,4,8],["31/08/2019",12,3,9],["01/09/2019",12,3,9],["02/09/2019",12,3,9],["03/09/2019",12,3,9],["04/09/2019",12,3,9],["10/09/2019",9,1,8],["11/09/2019",9,1,8],["12/09/2019",9,1,8],["13/09/2019",9,1,8],["14/09/2019",9,1,8],["15/09/2019",9,1,8],["16/09/2019",9,1,8],["17/09/2019",9,1,8],["18/09/2019",9,1,8],["19/09/2019",9,1,8],["20/09/2019",9,1,8],["05/09/2019",10,1,9],["06/09/2019",10,1,9],["07/09/2019",10,2,8],["08/09/2019",10,2,8],["09/09/2019",10,2,8],["21/09/2019",9,1,8],["22/09/2019",9,1,8],["23/09/2019",9,1,8],["24/09/2019",9,1,8],["25/09/2019",9,1,8],["26/09/2019",8,1,7],["27/09/2019",8,1,7],["28/09/2019",8,1,7],["29/09/2019",8,1,7],["30/09/2019",8,1,7],["01/10/2019",2,0,2],["02/10/2019",2,0,2],["03/10/2019",21,1,20],["04/10/2019",21,1,20],["05/10/2019",21,1,20],["06/10/2019",21,1,20],["07/10/2019",21,1,20],["08/10/2019",21,1,20],["09/10/2019",21,1,20]],[[""],["18/10/2019",44,7,37],["19/10/2019",43,6,37],["10/10/2019",52,10,42],["11/10/2019",51,9,42],["12/10/2019",45,6,39],["15/10/2019",41,5,36],["16/10/2019",41,5,36],["17/10/2019",37,3,34],["28/08/2019",55,3,52],["30/08/2019",53,3,50],["15/07/2019",54,6,48],["17/07/2019",51,5,46],["11/06/2019",54,6,48],["12/06/2019",51,5,46],["13/06/2019",49,5,44],["14/06/2019",52,5,47],["15/06/2019",56,5,51],["16/06/2019",56,5,51],["17/06/2019",56,5,51],["18/06/2019",54,4,50],["19/06/2019",51,5,46],["20/06/2019",54,6,48],["21/06/2019",56,6,50],["22/06/2019",39,4,35],["23/06/2019",39,4,35],["24/06/2019",39,4,35],["25/06/2019",39,4,35],["26/06/2019",43,5,38],["27/06/2019",43,5,38],["28/06/2019",44,6,38],["29/06/2019",46,6,40],["30/06/2019",46,6,40],["01/07/2019",46,6,40],["02/07/2019",48,6,42],["03/07/2019",49,8,41],["04/07/2019",46,8,38],["05/07/2019",43,6,37],["06/07/2019",44,6,38],["07/07/2019",44,6,38],["08/07/2019",44,6,38],["09/07/2019",44,5,39],["10/07/2019",55,6,49],["11/07/2019",55,7,48],["12/07/2019",53,7,46],["13/07/2019",54,6,48],["14/07/2019",54,6,48],["18/07/2019",50,4,46],["19/07/2019",51,3,48],["20/07/2019",54,3,51],["21/07/2019",54,3,51],["22/07/2019",54,3,51],["23/07/2019",56,3,53],["24/07/2019",56,3,53],["25/07/2019",55,3,52],["26/07/2019",53,3,50],["27/07/2019",55,3,52],["03/08/2019",55,3,52],["04/08/2019",55,3,52],["05/08/2019",55,3,52],["26/08/2019",56,5,51],["27/08/2019",55,4,51],["28/07/2019",55,3,52],["29/07/2019",55,3,52],["30/07/2019",54,3,51],["31/07/2019",54,3,51],["01/08/2019",53,3,50],["02/08/2019",54,3,51],["31/08/2019",60,3,57],["01/09/2019",60,3,57],["02/09/2019",60,3,57],["03/09/2019",62,4,58],["04/09/2019",65,5,60],["10/09/2019",66,6,60],["11/09/2019",68,6,62],["12/09/2019",68,6,62],["13/09/2019",68,6,62],["14/09/2019",70,7,63],["15/09/2019",70,7,63],["16/09/2019",70,7,63],["17/09/2019",70,7,63],["18/09/2019",68,7,61],["19/09/2019",72,10,62],["20/09/2019",70,9,61],["05/09/2019",63,6,57],["06/09/2019",62,5,57],["07/09/2019",65,6,59],["08/09/2019",65,6,59],["09/09/2019",65,6,59],["21/09/2019",71,9,62],["22/09/2019",71,9,62],["23/09/2019",71,9,62],["24/09/2019",66,9,57],["25/09/2019",64,8,56],["26/09/2019",63,7,56],["27/09/2019",67,7,60],["28/09/2019",69,7,62],["29/09/2019",69,7,62],["30/09/2019",69,7,62],["01/10/2019",46,6,40],["02/10/2019",44,10,34],["03/10/2019",74,13,61],["04/10/2019",74,13,61],["05/10/2019",66,10,56],["06/10/2019",66,10,56],["07/10/2019",66,10,56],["08/10/2019",59,8,51],["09/10/2019",54,8,46]],[[""],["18/10/2019",44,6,38],["19/10/2019",40,5,35],["09/10/2019",68,2,66],["10/10/2019",61,2,59],["11/10/2019",52,1,51],["12/10/2019",52,3,49],["15/10/2019",48,1,47],["16/10/2019",49,1,48],["17/10/2019",40,1,39],["28/08/2019",61,1,60],["30/08/2019",59,1,58],["15/07/2019",48,6,42],["17/07/2019",53,6,47],["11/06/2019",81,13,68],["12/06/2019",78,14,64],["13/06/2019",75,11,64],["14/06/2019",67,10,57],["15/06/2019",66,10,56],["16/06/2019",66,10,56],["17/06/2019",66,10,56],["18/06/2019",64,8,56],["19/06/2019",60,5,55],["20/06/2019",61,7,54],["21/06/2019",68,8,60],["22/06/2019",60,4,56],["23/06/2019",60,4,56],["24/06/2019",60,4,56],["25/06/2019",60,4,56],["26/06/2019",67,8,59],["27/06/2019",67,8,59],["28/06/2019",70,8,62],["29/06/2019",72,6,66],["30/06/2019",72,6,66],["01/07/2019",71,6,65],["02/07/2019",69,5,64],["03/07/2019",62,4,58],["04/07/2019",62,7,55],["05/07/2019",65,8,57],["06/07/2019",59,9,50],["07/07/2019",58,8,50],["08/07/2019",58,8,50],["09/07/2019",55,6,49],["10/07/2019",54,6,48],["11/07/2019",55,5,50],["12/07/2019",50,5,45],["13/07/2019",48,6,42],["14/07/2019",48,6,42],["18/07/2019",53,6,47],["19/07/2019",53,6,47],["20/07/2019",51,6,45],["21/07/2019",51,6,45],["22/07/2019",51,6,45],["23/07/2019",56,9,47],["24/07/2019",59,8,51],["25/07/2019",61,9,52],["26/07/2019",56,8,48],["27/07/2019",56,6,50],["03/08/2019",63,3,60],["04/08/2019",62,2,60],["05/08/2019",62,2,60],["26/08/2019",62,1,61],["27/08/2019",61,1,60],["28/07/2019",56,6,50],["29/07/2019",56,6,50],["30/07/2019",54,0,54],["31/07/2019",54,0,54],["01/08/2019",58,1,57],["02/08/2019",62,1,61],["31/08/2019",58,1,57],["01/09/2019",58,1,57],["02/09/2019",58,1,57],["03/09/2019",58,1,57],["04/09/2019",60,1,59],["10/09/2019",67,4,63],["11/09/2019",65,3,62],["12/09/2019",65,3,62],["13/09/2019",64,2,62],["14/09/2019",65,2,63],["15/09/2019",65,2,63],["16/09/2019",65,2,63],["17/09/2019",66,2,64],["18/09/2019",70,1,69],["19/09/2019",76,1,75],["20/09/2019",74,1,73],["05/09/2019",69,3,66],["06/09/2019",70,4,66],["07/09/2019",71,5,66],["08/09/2019",71,5,66],["09/09/2019",71,5,66],["21/09/2019",75,3,72],["22/09/2019",75,3,72],["23/09/2019",75,3,72],["24/09/2019",72,4,68],["25/09/2019",70,3,67],["26/09/2019",66,1,65],["27/09/2019",65,2,63],["28/09/2019",70,1,69],["29/09/2019",70,1,69],["30/09/2019",70,1,69],["01/10/2019",40,2,38],["02/10/2019",33,1,32],["03/10/2019",66,2,64],["04/10/2019",62,0,62],["05/10/2019",62,0,62],["06/10/2019",62,0,62],["07/10/2019",62,0,62],["08/10/2019",61,1,60]],[[""],["18/10/2019",44,8,36],["19/10/2019",43,7,36],["09/10/2019",72,8,64],["10/10/2019",71,7,64],["11/10/2019",70,6,64],["12/10/2019",59,7,52],["15/10/2019",46,7,39],["16/10/2019",46,7,39],["17/10/2019",38,7,31],["28/08/2019",83,2,81],["30/08/2019",85,2,83],["15/07/2019",64,1,63],["17/07/2019",72,2,70],["11/06/2019",49,0,49],["12/06/2019",51,1,50],["13/06/2019",48,0,48],["14/06/2019",48,0,48],["15/06/2019",50,0,50],["16/06/2019",50,0,50],["17/06/2019",50,0,50],["18/06/2019",50,3,47],["19/06/2019",48,4,44],["20/06/2019",49,3,46],["21/06/2019",50,3,47],["22/06/2019",52,4,48],["23/06/2019",52,4,48],["24/06/2019",52,4,48],["25/06/2019",52,4,48],["26/06/2019",52,3,49],["27/06/2019",49,2,47],["28/06/2019",48,2,46],["29/06/2019",52,2,50],["30/06/2019",52,2,50],["01/07/2019",52,2,50],["02/07/2019",53,3,50],["03/07/2019",51,1,50],["04/07/2019",48,0,48],["05/07/2019",50,1,49],["06/07/2019",52,2,50],["07/07/2019",52,2,50],["08/07/2019",52,2,50],["09/07/2019",53,3,50],["10/07/2019",59,2,57],["11/07/2019",62,3,59],["12/07/2019",66,3,63],["13/07/2019",64,1,63],["14/07/2019",64,1,63],["18/07/2019",73,2,71],["19/07/2019",71,1,70],["20/07/2019",71,1,70],["21/07/2019",71,1,70],["22/07/2019",71,1,70],["23/07/2019",71,2,69],["24/07/2019",72,2,70],["25/07/2019",77,2,75],["26/07/2019",79,3,76],["27/07/2019",76,2,74],["03/08/2019",77,1,76],["04/08/2019",77,1,76],["05/08/2019",77,1,76],["26/08/2019",83,2,81],["27/08/2019",83,2,81],["28/07/2019",76,2,74],["29/07/2019",76,2,74],["30/07/2019",78,2,76],["31/07/2019",78,2,76],["01/08/2019",75,1,74],["02/08/2019",75,0,75],["31/08/2019",85,2,83],["01/09/2019",85,2,83],["02/09/2019",85,2,83],["03/09/2019",82,2,80],["04/09/2019",81,2,79],["10/09/2019",89,3,86],["11/09/2019",92,3,89],["12/09/2019",92,3,89],["13/09/2019",94,3,91],["14/09/2019",95,4,91],["15/09/2019",95,4,91],["16/09/2019",95,4,91],["17/09/2019",93,3,90],["18/09/2019",94,3,91],["19/09/2019",94,4,90],["20/09/2019",90,5,85],["05/09/2019",85,2,83],["06/09/2019",87,2,85],["07/09/2019",87,2,85],["08/09/2019",87,2,85],["09/09/2019",87,2,85],["21/09/2019",89,5,84],["22/09/2019",89,5,84],["23/09/2019",89,5,84],["24/09/2019",91,4,87],["25/09/2019",94,5,89],["26/09/2019",96,5,91],["27/09/2019",97,6,91],["28/09/2019",98,7,91],["29/09/2019",98,7,91],["30/09/2019",98,7,91],["01/10/2019",45,5,40],["02/10/2019",45,5,40],["03/10/2019",96,6,90],["04/10/2019",96,6,90],["05/10/2019",94,6,88],["06/10/2019",94,6,88],["07/10/2019",94,6,88],["08/10/2019",79,7,72]],[[""],["17/10/2019",27,0,27],["18/10/2019",27,0,27],["19/10/2019",25,0,25],["09/10/2019",26,0,26],["10/10/2019",24,0,24],["11/10/2019",24,0,24],["12/10/2019",24,0,24],["15/10/2019",28,0,28],["16/10/2019",27,0,27],["28/08/2019",41,2,39],["30/08/2019",39,2,37],["17/07/2019",38,2,36],["11/06/2019",41,2,39],["12/06/2019",40,1,39],["13/06/2019",38,0,38],["14/06/2019",38,0,38],["15/06/2019",38,0,38],["16/06/2019",38,0,38],["17/06/2019",38,0,38],["18/06/2019",39,1,38],["19/06/2019",39,1,38],["20/06/2019",38,0,38],["21/06/2019",39,0,39],["22/06/2019",39,0,39],["23/06/2019",39,0,39],["24/06/2019",39,0,39],["25/06/2019",39,0,39],["26/06/2019",39,0,39],["27/06/2019",39,0,39],["28/06/2019",38,0,38],["29/06/2019",38,0,38],["30/06/2019",38,0,38],["01/07/2019",38,0,38],["02/07/2019",38,0,38],["03/07/2019",38,0,38],["04/07/2019",38,0,38],["05/07/2019",40,1,39],["06/07/2019",40,1,39],["07/07/2019",40,1,39],["08/07/2019",40,1,39],["09/07/2019",40,1,39],["10/07/2019",38,1,37],["11/07/2019",38,1,37],["12/07/2019",39,1,38],["13/07/2019",40,2,38],["14/07/2019",40,2,38],["15/07/2019",40,2,38],["18/07/2019",38,2,36],["19/07/2019",38,2,36],["20/07/2019",38,3,35],["21/07/2019",38,3,35],["22/07/2019",38,3,35],["23/07/2019",36,2,34],["24/07/2019",34,1,33],["25/07/2019",34,1,33],["26/07/2019",34,1,33],["27/07/2019",35,1,34],["03/08/2019",41,0,41],["04/08/2019",41,0,41],["05/08/2019",41,0,41],["26/08/2019",38,2,36],["27/08/2019",39,2,37],["28/07/2019",35,1,34],["29/07/2019",35,1,34],["30/07/2019",37,2,35],["31/07/2019",37,2,35],["01/08/2019",37,1,36],["02/08/2019",40,0,40],["31/08/2019",38,2,36],["01/09/2019",38,2,36],["02/09/2019",38,2,36],["03/09/2019",39,2,37],["04/09/2019",38,2,36],["11/09/2019",38,0,38],["12/09/2019",38,0,38],["13/09/2019",39,0,39],["14/09/2019",39,0,39],["15/09/2019",39,0,39],["16/09/2019",39,0,39],["17/09/2019",38,0,38],["18/09/2019",39,1,38],["19/09/2019",38,0,38],["20/09/2019",38,0,38],["05/09/2019",37,1,36],["06/09/2019",36,0,36],["07/09/2019",36,0,36],["08/09/2019",36,0,36],["09/09/2019",36,0,36],["10/09/2019",37,0,37],["21/09/2019",34,0,34],["22/09/2019",34,0,34],["23/09/2019",34,0,34],["24/09/2019",35,0,35],["25/09/2019",35,0,35],["26/09/2019",35,0,35],["27/09/2019",34,0,34],["28/09/2019",35,0,35],["29/09/2019",35,0,35],["30/09/2019",35,0,35],["01/10/2019",3,0,3],["02/10/2019",3,0,3],["03/10/2019",28,0,28],["04/10/2019",27,0,27],["05/10/2019",26,0,26],["06/10/2019",26,0,26],["07/10/2019",26,0,26],["08/10/2019",27,0,27]],[[""],["17/10/2019",13,1,12],["18/10/2019",14,1,13],["19/10/2019",10,0,10],["09/10/2019",5,0,5],["10/10/2019",5,0,5],["11/10/2019",5,0,5],["12/10/2019",5,0,5],["15/10/2019",8,0,8],["16/10/2019",11,0,11],["28/08/2019",8,0,8],["17/07/2019",8,0,8],["13/06/2019",3,1,2],["14/06/2019",3,1,2],["15/06/2019",2,0,2],["16/06/2019",2,0,2],["17/06/2019",2,0,2],["18/06/2019",4,0,4],["19/06/2019",10,4,6],["20/06/2019",12,4,8],["21/06/2019",8,2,6],["22/06/2019",6,2,4],["23/06/2019",6,2,4],["24/06/2019",6,2,4],["25/06/2019",6,2,4],["26/06/2019",5,0,5],["27/06/2019",4,1,3],["28/06/2019",3,1,2],["29/06/2019",4,1,3],["30/06/2019",4,1,3],["01/07/2019",4,1,3],["02/07/2019",5,2,3],["03/07/2019",6,1,5],["04/07/2019",5,1,4],["05/07/2019",3,0,3],["06/07/2019",3,0,3],["07/07/2019",3,0,3],["08/07/2019",3,0,3],["09/07/2019",4,0,4],["10/07/2019",6,0,6],["11/07/2019",6,0,6],["12/07/2019",6,0,6],["13/07/2019",8,0,8],["14/07/2019",8,0,8],["15/07/2019",8,0,8],["18/07/2019",8,0,8],["19/07/2019",8,0,8],["20/07/2019",10,0,10],["21/07/2019",10,0,10],["22/07/2019",10,0,10],["23/07/2019",10,0,10],["24/07/2019",10,0,10],["25/07/2019",10,0,10],["26/07/2019",10,0,10],["27/07/2019",10,0,10],["03/08/2019",9,0,9],["04/08/2019",9,0,9],["05/08/2019",9,0,9],["26/08/2019",6,0,6],["27/08/2019",7,0,7],["28/07/2019",10,0,10],["29/07/2019",10,0,10],["30/07/2019",9,0,9],["31/07/2019",9,0,9],["01/08/2019",9,0,9],["02/08/2019",9,0,9],["30/08/2019",7,0,7],["31/08/2019",7,0,7],["01/09/2019",7,0,7],["02/09/2019",7,0,7],["03/09/2019",7,0,7],["10/09/2019",6,0,6],["11/09/2019",6,0,6],["12/09/2019",6,0,6],["13/09/2019",7,0,7],["14/09/2019",7,0,7],["15/09/2019",7,0,7],["16/09/2019",7,0,7],["17/09/2019",7,0,7],["18/09/2019",7,0,7],["19/09/2019",7,0,7],["20/09/2019",6,0,6],["04/09/2019",7,0,7],["05/09/2019",5,0,5],["06/09/2019",5,0,5],["07/09/2019",5,0,5],["08/09/2019",5,0,5],["09/09/2019",5,0,5],["21/09/2019",6,0,6],["22/09/2019",6,0,6],["23/09/2019",6,0,6],["24/09/2019",6,0,6],["25/09/2019",6,0,6],["26/09/2019",6,0,6],["27/09/2019",6,0,6],["01/10/2019",0,0,0],["02/10/2019",0,0,0],["03/10/2019",5,0,5],["04/10/2019",5,0,5],["05/10/2019",5,0,5],["06/10/2019",5,0,5],["07/10/2019",5,0,5],["08/10/2019",5,0,5]]]}';