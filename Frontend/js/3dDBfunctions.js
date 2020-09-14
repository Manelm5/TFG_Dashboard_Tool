
/*-------------------------------------------------------------*/
// 3D Dashboard Front-end display functions
/*-------------------------------------------------------------*/
// Author: Manel Muñiz (initial version 30/09/2019)
// Last updated: 11/11/2019 (Manel Muñiz)
/*-------------------------------------------------------------*/

var programIndex = 0;
var loadingTimer;
var switchingTimer;
var frameIndex = 0;

var fourModuleStructure = '<div class="FourModule_Container"><div id="Module_1_1" class="Module_1_1"></div><div id="Module_1_2" class="Module_1_2"></div><div id="Module_2_1" class="Module_2_1"></div><div id="Module_2_2" class="Module_2_2"></div><div id="Name_display" class="Name_display">HP 3D</div><div id="Date_display" class="Date_display"></div><div id="Logo_display" class="Logo_display"></div></div>'
var singleModuleStructure = '<div class="SingleModule_Container"><div class="Name_display" id="Name_display">HP 3D</div><div id ="Date_display" class="Date_display"></div><div class="Logo_display"></div><div id = "Module_1" class="Module_1"></div></div>';
var SWQAStructure = '<embed src="SWQA/SWQA.html" width="100%">'

var threeModuleStructure = '<div class="ThreeModule_Container"><div id ="Name_display" class="Name_display"></div><div id="Date_display" class="Date_display"></div><div id="Logo_display" class="Logo_display"></div><div id="Module_1_1" class="Module_1_1"></div><div id="Module_2_1" class="Module_2_1"></div><div id="Module_x_2" class="Module_x_2"></div></div>'


var pluginFunctions = { "Blank": drawBlankContent, "defectsTrend": defectsTrend,
                        "defectsByTeam": defectsByTeam, "defectsFoundFixed": defectsFoundFixed,
                        "Picture": drawPicContent, "html": embedHtml, "weather": drawWeather, 
                        "video": drawVideo, "SonarQube": processSonarQube, "Jira": processJira,
                        "Releases_Dates": processReleasesDates, "Name": processName, "Adict": processAdict };

var drawPageFunctions = { "FourModule": drawFourModule, "SingleModule": drawSingleModule, "SWQA": drawSWQAModule,
                          "ThreeModule": drawThreeModule};

function setToRefresh() {
    document.cookie = 'same-site-cookie=foo; SameSite=Lax';
    document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
    switchingTimer = setInterval(switchProgram, frameTimeoutArray[frameIndex]);
}

function switchProgram() {

    frameIndex++;
    
    if(frameTimeoutArray.length == frameIndex) {
        frameIndex = 0;
    }

    drawCharts();
}

function drawFourModule(pageIndex) {
    document.getElementById('Main_Structure').innerHTML = fourModuleStructure;
    processModules();
}

function drawThreeModule(pageIndex) {
    document.getElementById('Main_Structure').innerHTML = threeModuleStructure;
    processModules();
}


function drawSingleModule() {
    document.getElementById('Main_Structure').innerHTML = singleModuleStructure;
    processModules();
}

function drawSWQAModule() {
    document.getElementById('Main_Structure').innerHTML = SWQAStructure;
}

function drawCharts() {
    if (!drawPageFunctions[frameConfigArray[frameIndex]]) {
        alert("Please, check that all the names specified on the configuration.txt are correct and refresh the page.");
        return;
    }
    drawPageFunctions[frameConfigArray[frameIndex]]();
}

function processModules() {
    
    document.getElementById("Date_display").innerHTML = 'Last update: ' + datetime;

    var pageId = frameIdVar[frameIndex];

    for(var i = 0; i < TypesPerPage[pageId].length; i++) {
        if (!pluginFunctions[TypesPerPage[pageId][i]]) {
            alert('Error in ' + TypesPerPage[pageId][i]);
            continue;
        }
        pluginFunctions[TypesPerPage[pageId][i]](LocationsPerPage[pageId][i], ConfigsPerPage[pageId]);  //FLAG HERE
    }
}

function defectsFoundFixed(config_div,config_prop) {

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
            hAxis: { title:'3 Weeks net found', titleTextStyle: {color: 'white', fontSize: 20}, textStyle: { color:'#AAAAAA', fontSize: 19}, gridlines: {color:'black'}  },
            annotations: {alwaysOutside: true, textStyle: {fontSize: 20, color:'white'}, stem: {length: 0}},
            backgroundColor:'black',
            'tooltip' : {
                trigger: 'none',
                enableInteractivity: false
            }
    };

    // Create the data table.
    var seriesConfig = ['Date', 'Found', {role: 'annotation'}, 'Fixed', {role: 'annotation'}];
    var d = foundFixed.programs[ programIndex ];
    d[0] = seriesConfig;
    var data = google.visualization.arrayToDataTable( d );

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById(config_div));
    chart.draw(data, options);
}

function defectsTrend(config_div,config_prop) {

    var options = {
        title: 'Open Defects Log',
            titleTextStyle: {color: '#BBBBBB', fontSize: 32},
            colors:['white', 'red', 'blue'],
            fontSize: 16,
            legend: { position: 'top', alignment: 'end', textStyle: {color: 'grey', fontSize: 16} },
            vAxis: { title:'Total', titleTextStyle: {color: 'white', fontSize: 20}, textStyle: { color:'#AAAAAA', fontSize: 18}, gridlines: {color:'black'}, format:'short' },
            hAxis: { title:'8 Weeks', titleTextStyle: {color: 'white', fontSize: 20}, textStyle: { color:'#AAAAAA', fontSize: 18}, gridlines: {color:'black'}  },
            chartArea:{ left: 150, top: 70},
            backgroundColor:'black',
            'tooltip' : {
                trigger: 'none',
                enableInteractivity: false
            }
    };

    var seriesConfig = ['Day', 'Total', 'Above RC', 'Below RC'];
    var t = openLog.programs[ programIndex ];
    t[0] = seriesConfig;
    var data = google.visualization.arrayToDataTable( t );

    var chart = new google.visualization.LineChart(document.getElementById(config_div));
    chart.draw(data, options);
 }

function catalogStatus(config_div,config_prop) {

    var options = {
            title:'Test Catalog Status',
            titleTextStyle: {color: '#BBBBBB', fontSize: 32},
            pieHole:0.6,
            colors:['green', 'red', 'grey', 'blue'],
            fontSize:28,
            legend:{ position: 'top',alignment: 'start', textStyle:{color: 'grey', fontSize:16} },
            chartArea:{ left: 150, top: 100 },
            backgroundColor:'black',
            'tooltip' : {
                trigger: 'none',
                enableInteractivity: false
            }
    };

    // Create the data table.
    var seriesConfig = ["Result", "Percent"];
    var c = catalogs.programs[ programIndex ]
    c[0] = seriesConfig;
    var data = google.visualization.arrayToDataTable( c );

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(config_div));
    chart.draw(data, options);
}

function defectsByTeam(config_div,config_prop) {

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
        'tooltip' : {
                trigger: 'none',
                enableInteractivity: false
            }
    };

    // Create the data table.
    var d = teams.programs[ programIndex ];
    var seriesConfig = ['Severity', 'Above RC', 'Below RC', {role: 'annotation'}];
    d[0] = seriesConfig;
    var data = google.visualization.arrayToDataTable( d );

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById(config_div));
    chart.draw(data, options);
}

function drawBlankContent() {
}


function drawPicContent(config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var path = aux_module["filename"];
    var image = "<img src=" + path + ">";
    document.getElementById(config_div).innerHTML = image;
}


function embedHtml(config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var path = aux_module["filename"];
    var html = '<embed src=' + path + ' width="100%" height="100%" >';
    document.getElementById(config_div).innerHTML = html;
}


function processSonarQube_module(config_div, config_prop,SonarQube_data,team) {

    var table = '<div class="sq-container" id="sq-container' + team[0] + "module" + '">' +
    '<div class="Project_Name" id="Project_Name' + team[0] +"module" +'"></div>' +
    '<div class="N_Bugs" id="N_Bugs' + team[0] + "module" +'"></div>' +
    '<div class="Bugs_Text" id="Bugs_Text' + team[0] +"module" +'"></div>' +
    '<div class="N_Vulnerabilities" id="N_Vulnerabilities' + team[0] + "module" +'"></div>' +
    '<div class="Vulnerabilities_Text" id="Vulnerabilities_Text' + team[0] + "module" +'"></div>' +
    '<div class="N_CS" id="N_CS' + team[0] + "module" + '"></div>' +
    '<div class="CS_Text" id="CS_Text' + team[0] + "module" + '"></div>' +
    '<div class="N_Cov" id="N_Cov' + team[0]+ "module" + '"></div>' +
    '<div class="Cov_Text" id="Cov_Text' + team[0] +"module" + '"></div></div>';
 
    document.getElementById(config_div).innerHTML = table;

    var team_data = SonarQube_data[team[0]];
    
    document.getElementById("Project_Name" + team[0] +"module").innerHTML = "SonarQube: " + team[0];
    document.getElementById("N_CS" + team[0] +"module").innerHTML = team_data["code_smells"];
    document.getElementById("N_Bugs" + team[0] +"module").innerHTML = team_data["bugs"];
    document.getElementById("N_Cov" + team[0] +"module").innerHTML = team_data["coverage"] + "%";
    document.getElementById("N_Vulnerabilities" + team[0] +"module").innerHTML = team_data["vulnerabilities"];

    document.getElementById("CS_Text" + team[0] +"module").innerHTML = "Code Smells";
    document.getElementById("Bugs_Text" + team[0] +"module").innerHTML = "Bugs"
    document.getElementById("Vulnerabilities_Text" + team[0] +"module").innerHTML = "Vulnerabilities";
    document.getElementById("Cov_Text" + team[0] +"module").innerHTML = "Coverage";
}

function processSonarQube_table(config_div, config_prop,SonarQube_data,teams) {

    var n_teams = teams.length;
  
    var sq_result_table = '<table id="SonarQubeTable"><tr>' + '<th id=""></th><th id="title">Bugs</th><th id="title">Vulnerabilities</th><th id="title">Code Smells</th><th id="title">Coverage</th></tr>';
    
    for (var i = 0; i < n_teams; i++) {
             
         var table_row = '<tr><td id="team_name' + teams[i] +'">' + '</td><td id="N_Bugs' + teams[i] + '">' + '</td><td id="N_Vulnerabilities' + teams[i] + '">'+ '</td><td id="N_CS' + teams[i] + '">' + '</td><td id="N_Cov' + teams[i] + '"></td></tr>';
         sq_result_table = sq_result_table + table_row;        
    }

    document.getElementById(config_div).innerHTML = sq_result_table;
   
    var team;
    for (var i = 0; i < n_teams; i++) {

        team = SonarQube_data[teams[i]]
        document.getElementById("team_name" + teams[i]).innerHTML = teams[i];
        document.getElementById("N_CS" + teams[i]).innerHTML = team["code_smells"];
        document.getElementById("N_Bugs" + teams[i]).innerHTML = team["bugs"];
        document.getElementById("N_Cov" + teams[i]).innerHTML = team["coverage"] + "%";
        document.getElementById("N_Vulnerabilities" + teams[i]).innerHTML = team["vulnerabilities"];
    }

    sq_result_table = '<table id="SonarQubeTable"><tr>' + '<th id=""></th><th id="title">Bugs</th><th id="title">Vulnerabilities</th><th id="title">Code Smells</th><th id="title">Coverage</th></tr>';
}

function processSonarQube (config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var teams = aux_module["teams"];
    var info = aux_module["plugin"];
    var type = aux_module["type"];  
    var page = frameIdVar[frameIndex];
    var Module_data = DataPerPage[page];
    var SonarQube_data = Module_data[config_div];

    switch(info) {
        case "getTeamInfo":
            document.getElementById("Name_display").innerHTML = "HP SQ 3D";
            if (type == "fullscreen") {
                processSonarQube_table(config_div, config_prop, SonarQube_data ,teams);
            } else {
                if (type == "table") {
                processSonarQube_module(config_div, config_prop, SonarQube_data, teams);
                } else {
                    console.log("Sonarqube type tag not specified correctly. Look documentation to see available types.");
                }
          
            }
            break;
        default: 
            break;
    }   
}

function drawWeather(config_div, config_prop) {

    var aux_module = config_prop[config_div];
    var path = "html/weather.html";
    var html = '<embed src=' + path + ' width="100%" height="100%" >';
    document.getElementById(config_div).innerHTML = html;
}


function drawVideo(config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var path = aux_module["filename"];
    var html = '<video width="1920px" height="1080px" loop="true" autoplay="autoplay" muted controls> <source src="' + path + '" type ="video/mp4"></video>';
    document.getElementById(config_div).innerHTML = html;    
}



function processJira(config_div,config_prop) {

    var aux_module = config_prop[config_div];

    var project = aux_module["project"];
    var component = aux_module["component"];
    var fixVersion = aux_module["fixVersion"]; 
    var actualSprint = aux_module["actualSprint"];
    var plugin = aux_module["plugin"];

    var page = frameIdVar[frameIndex];
    var Module_data = DataPerPage[page];
    var JiraDataLocation = Module_data[config_div];

    document.getElementById("Name_display").innerHTML = fixVersion;
    
    var image = "<img src=" + " images/plotly/" +  JiraDataLocation + ">";
    document.getElementById(config_div).innerHTML = image;

}


function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].includes(str)) return strArray[j];
    }
    return -1;
}

function processReleasesDates(config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var fixVersion = aux_module["fixVersion"];

    var dates = fixVersions[fixVersion];

    
    var IDArray = searchStringInArray("ID:", dates);
    var FCArray = searchStringInArray("FC:", dates);
    var CFArray = searchStringInArray("CF:", dates);
    var CSArray = searchStringInArray("CS:", dates);

    var ID = IDArray.split("ID:")[1].replace(" ", "");  
    var FC = FCArray.split("FC:")[1].replace(" ", "");
    var CF = CFArray.split("CF:")[1].replace(" ", "");
    var CS = CSArray.split("CS:")[1].replace(" ", "");
  
    var table = "<table id='IncomingReleasesTable'> <caption align='bottom'>This data is generated via Jira API and it refreshes automatically every day at 6.00AM</caption><tr><th>Intro Date (ID):</th><td>" + ID + "</td></tr><tr><th id='row'>Functionality Complete (FC):</th><td id='row'>" + FC + "</td></tr><tr><th>Code Slush (CS):</th><td>" +
     CF + "</td></tr><tr><th id='row'>Code Freeze (CF):</th><td id='row'>" + CF + "</td></tr></table>";
 
    document.getElementById(config_div).innerHTML = table;
     
}


function processName(config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var name = aux_module["name"];
     document.getElementById("Name_display").innerHTML = name;
/*
    var html = "<p id='Name'>" + name + "</p>";
    document.getElementById(config_div).innerHTML = html;
*/
}

function processAdict_isLocked(config_div, aux_module, Adict_data) {

    var project = aux_module["project"];
    var branch = aux_module["branch"];

    var branch_name = " "
    if (project=="ipg-atlas" && branch== "trunk") {
        branch_name = "bcd";
    } else {
        branch_name = branch;
    }

    isLocked = Adict_data["is_locked"];

    if (isLocked == "locked") {
        var image_location = "images/locked.png";
    } else {
        var image_location = "images/no-locked.png";
    }
    

    header_str = "Adict branch lock status:"; 
    var html = "<div class='adict-container'><div id='adict_header'>" + header_str + "</div>" + '<div id= isLocked_content><span style="color:white">' + branch_name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img style="vertical-align:middle" width=200px src="' + image_location + '"></div>';
    document.getElementById(config_div).innerHTML = html;


}


var mainBoxColors = { "success": "style='background-color: #e0ffd0;'", "fail": "style='background-color: #d1d1d1;'", 
                      "noresources": "style='background-color: #ffa3a3;'", "aborted": "style='background-color: #ffa3a3;'"};

var testSuiteColors = { "success": "style='background-color: green;'", "fail": "style='background-color: red;'", 
                      "noresources": "style='background-color: grey;'", "aborted": "style='background-color: orange;'"};

function processAdict_getlastGoodBuild(config_div, aux_module, Adict_data, Module_data) {

    ProductBuilds = Adict_data["ProductBuilds"];
    TestSuites = Adict_data["TestSuites"];
    Revision = Adict_data["Revision"]
    ProductName = aux_module["product"];
    Name = aux_module["name"];
    var resultHTML = "";

    var main_box = "success";
    var nBuilds = 0;
    for (var key in ProductBuilds) {
        
        if (ProductBuilds.hasOwnProperty(key)) {
            value = ProductBuilds[key];
            if (value == "fail") {
                main_box = value;
                break;
            }
            if (value == "noresources") {
                main_box = value;     
            }
            if (value == "aborted") {
                main_box = value;
            }
        }
        nBuilds++;
    }

    resultHTML = "<div id='box_content' " + mainBoxColors[main_box] + ">";


    var testsuite_HTML = "";
    for (var test in TestSuites) {
        if (TestSuites.hasOwnProperty(test)) {
                testsuite_status = TestSuites[test]["status"];
                testsuite_kind = TestSuites[test]["kind_type"];
                testsuite_value= TestSuites[test]["percentage_test"];                                                  //testsuite_kind
                testsuite_HTML = testsuite_HTML + "<div id='testsuite_box' " + testSuiteColors[testsuite_status] + ">" + test + " " + testsuite_value +  "%</div>";                   
        }
    }

    header_str = "Adict last good build for " + ProductName + " : " + Name + " - Last revision: " + Revision + " - B<sub>" + nBuilds + "/" + Object.keys(ProductBuilds).length + "</sub>"; 
    resultHTML = "<div class='adict-container'><div id='adict_header'>" + header_str + "</div>" + resultHTML + testsuite_HTML + "</div></div>";
    document.getElementById(config_div).innerHTML = resultHTML;
}

function processAdict (config_div,config_prop) {

    var aux_module = config_prop[config_div];
    var plugin = aux_module["plugin"]; 
    
    var page = frameIdVar[frameIndex];
    var Module_data = DataPerPage[page];
    var Adict_data = Module_data[config_div];

    switch(plugin) {
        case "isLocked":
            processAdict_isLocked(config_div, aux_module, Adict_data);
            break;
        case "getlastGoodBuild":
            processAdict_getlastGoodBuild(config_div, aux_module, Adict_data, Module_data);
            break;
        default: 
            break;
    }   
}