

var programIndex = 0;
var statusNumbers;
var loadingTimer;
var switchingTimer;

 function setToRefresh() {

    loadingTimer = setInterval(reloadData, 1500000);
    switchingTimer = setInterval(switchProgram, 7000);
}
		    
function switchAndHold() {

    switchProgram();
	clearInterval(loadingTimer);
	clearInterval(switchingTimer);
	setInterval(switchProgram, 30000);
	setInterval(reloadData, 30100);
}

function reloadData() { location.reload(); }

function updateProgramNumbers() {

	statusNumbers = statusByProgram.programs[ programIndex ];
 }

function switchProgram() {
	
	updateProgramNumbers();
	drawCharts();
		      
	document.getElementById("SWQA_Name_display").innerHTML = programs.names[ programIndex ];
    document.getElementById("totalTd").innerHTML = statusNumbers[ 1 ];
    document.getElementById("aboveRcTd").innerHTML = statusNumbers[ 2 ];
    document.getElementById("belowRcTd").innerHTML = statusNumbers[ 3 ];
    document.getElementById("smiTd").innerHTML = statusNumbers[ 5 ];
    document.getElementById("deferredTd").innerHTML = statusNumbers[ 6 ];  
    document.getElementById("SWQA_Date_display").innerHTML = "Status at: " + timeStamps.programs[ programIndex ];
		      
	programIndex++;
		      
	if( programIndex == programs.names.length) {
		 programIndex = 0;
	}

}

function drawCharts() {

    defectsFoundFixed();
    defectsTrend();
	catalogStatus();
	defectsByTeam();		
}

function defectsFoundFixed() {

		var options = {
			title:'Found and Fixed',
			titleTextStyle: {color: '#BBBBBB', fontSize: 32},
			animation:{startup: true, duration: 1000, easing: 'out'},
			colors:['red','blue'],
			bar: {groupWidth: "75%"},
			fontSize: 20,
			legend:{ position: 'top', alignment: 'end', textStyle: {color: 'grey', fontSize: 24} },
			chartArea:{ left: 150, top: 70 },
			vAxis: { title:'CRs Found', titleTextStyle: {color: 'white', fontSize: 20}, textStyle: { color:'#AAAAAA', fontSize: 20}, gridlines: {color:'black'}  },
			hAxis: { title:'3 Weeks net found', titleTextStyle: {color: 'white', fontSize: 18}, textStyle: { color:'#AAAAAA', fontSize: 18}, gridlines: {color:'black'}  },
			annotations: {alwaysOutside: true, textStyle: {fontSize: 20, color:'white'}, stem: {length: 0}},
			backgroundColor:'black',
			tooltip : {
  				trigger: 'none',
  				enableInteractivity: false,
  				isHtml: false
			},
			plotOptions: {
        		series: {
            		states: {
                		hover: {
                    		enabled: false
                		}
            		}
        		}
    		}
	};
				       
	// Create the data table.
	var seriesConfig = ['Date', 'Found', {role: 'annotation'}, 'Fixed', {role: 'annotation'}];
	var d = foundFixed.programs[ programIndex ];
	d[0] = seriesConfig;
	var data = google.visualization.arrayToDataTable( d );
			
	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById('Module1_display'));
	chart.draw(data, options);
}

function defectsTrend() {

	var options = {
		title: 'Open Defects Log',
			titleTextStyle: {color: '#BBBBBB', fontSize: 32},
			colors:['white', 'red', 'blue'],
			fontSize: 16,
			legend: { position: 'top', alignment: 'end', textStyle: {color: 'grey', fontSize: 16} },
			vAxis: { title:'Total', titleTextStyle: {color: 'white', fontSize: 20}, textStyle: { color:'#AAAAAA', fontSize: 18}, gridlines: {color:'black'}, format:'short' },
			hAxis: { title:'8 Weeks', titleTextStyle: {color: 'white', fontSize: 18}, textStyle: { color:'#AAAAAA', fontSize: 12}, gridlines: {color:'black'}  },
			chartArea:{ left: 150, top: 70},
			backgroundColor:'black',
			tooltip : {
  				trigger: 'none',
  				enableInteractivity: false,
  				isHtml: false
			},
			plotOptions: {
        		series: {
            		states: {
                		hover: {
                    		enabled: false
                		}
            		}
        		}
    		}
	};
					
	var seriesConfig = ['Day', 'Total', 'Above RC', 'Below RC'];
	var t = openLog.programs[ programIndex ];
	t[0] = seriesConfig;
	var data = google.visualization.arrayToDataTable( t );
			
	var chart = new google.visualization.LineChart(document.getElementById('Module2_display'));
	chart.draw(data, options);
 }

function catalogStatus() {

	var options = {
			title:'Test Catalog Status',
			titleTextStyle: {color: '#BBBBBB', fontSize: 32},
			pieHole:0.6,
			colors:['green', 'red', 'grey', 'blue'],
			fontSize:28,
			legend:{ position: 'top',alignment: 'start', textStyle:{color: 'grey', fontSize:16} },
			chartArea:{ left: 150, top: 100 },
			backgroundColor:'black',
			tooltip : {
  				trigger: 'none',
  				enableInteractivity: false,
  				isHtml: false
			},
			plotOptions: {
        		series: {
            		states: {
                		hover: {
                    		enabled: false
                		}
            		}
        		}
    		}
	};
				       
	// Create the data table.
	var seriesConfig = ["Result", "Percent"];
	var c = catalogs.programs[ programIndex ]
	c[0] = seriesConfig;
	var data = google.visualization.arrayToDataTable( c );

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('Module3_display'));
	chart.draw(data, options);
}

function defectsByTeam() {

	var options = {
        title:'Open defects by team',
		titleTextStyle: {color: '#BBBBBB', fontSize: 32},
		fontSize: 28,
		animation:{startup: true, duration: 1000, easing: 'out'},
		bar: {groupWidth: "85%"},
		legend:{ position: 'top', alignment: 'end', textStyle: {color: 'grey', fontSize: 24} },
		colors:['red','blue'],
		isStacked:true,
		chartArea:{ left: 170, top: 100 },
		annotations: {highContrast: true, alwaysOutside: true, textStyle: {fontSize: 28, color:'white'}, stem: {length: 0}},
		vAxis: { title:'Issues', titleTextStyle: {color: 'white', fontSize: 24}, textStyle: { color:'#AAAAAA', fontSize: 20}, gridlines: {color:'black'}  },
		hAxis: { title:'Teams', titleTextStyle: {color: 'white', fontSize: 14}, textStyle: { color:'#AAAAAA', fontSize: 10}, gridlines: {color:'black'}  },
		backgroundColor:'black',
		tooltip : {
  				trigger: 'none',
  				enableInteractivity: false,
  				isHtml: false
			},
		plotOptions: {
        		series: {
            		states: {
                		hover: {
                    		enabled: false
                		}
            		}
        		}
    	}
		
	};
					   
	// Create the data table.
	var d = teams.programs[ programIndex ];
	var seriesConfig = ['Severity', 'Above RC', 'Below RC', {role: 'annotation'}];
	d[0] = seriesConfig;
	var data = google.visualization.arrayToDataTable( d );
			
	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById('Module4_display'));
	chart.draw(data, options);
}