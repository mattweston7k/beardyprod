
//var myDate = new Date("April 19, 2014");

//var myDateFrmt = new Date(dd.mm.yyyy);

var bstat = [
	{ "date": "April 5, 2014", "game": "Home", "team": "Valley Ridge B", "result": "won", "scoreplus": 21, "scoreminus": 7},
	{ "date": "April 12, 2014", "game": "Away", "team": "Grove Road", "result": "won", "scoreplus": 21, "scoreminus": 12},
	{ "date": "April 26, 2014", "game": "Away", "team": "Swillington B", "result": "won", "scoreplus": 21, "scoreminus": 8}, // "score": "21-8" },
	{ "date": "May 3, 2014", "game": "Home", "team": "Rothwell BC B", "result": "lost", "scoreplus": 6, "scoreminus": 21}, //"score": "6-21" },
	//{ "date": "May 10, 2014", "game": "Cup", "team": "Garforth at Colton", "result": "lost", "score": "7-21" },
	{ "date": "May 17, 2014", "game": "Away", "team": "Rothwell Park A", "result": "lost", "scoreplus": 7, "scoreminus": 21}, //"score": "7-21" },
	{ "date": "May 31, 2014", "game": "Away", "team": "Fearnville", "result": "lost", "scoreplus": 15, "scoreminus": 21}, //"score": "15-21" },
	{ "date": "June 7, 2014", "game": "Home", "team": "Thorner", "result": "won", "scoreplus": 21, "scoreminus": 20}, //"score": "21-20" },
	{ "date": "June 21, 2014", "game": "Home", "team": "Sherburn B", "result": "lost", "scoreplus": 18, "scoreminus": 21}, //"score": "18-21" },
	{ "date": "June 28, 2014", "game": "Away", "team": "Tadcaster B", "result": "lost", "scoreplus": 4, "scoreminus": 21}, //"score": "4-21" },
	{ "date": "July 4, 2014", "game": "Away", "team": "Barwick B", "result": "lost", "scoreplus": 10, "scoreminus": 21}, //"score": "10-21" },
	{ "date": "July 5, 2014", "game": "Away", "team": "Valley Ridge B", "result": "won", "scoreplus": 21, "scoreminus": 13}, //"score": "21-13" },
	{ "date": "July 26, 2014", "game": "Home", "team": "Swillington B", "result": "won", "scoreplus": 21, "scoreminus": 15}, // "score": "21-17 or 21-15" },
	{ "date": "July 28, 2014", "game": "Home", "team": "Grove Road", "result": "won", "scoreplus": 21, "scoreminus": 17}, // "score": "21-17" },
	{ "date": "August 2, 2014", "game": "Away", "team": "Rothwell BC B", "result": "won", "scoreplus": 21, "scoreminus": 13}, //"score": "21-13" },
	{ "date": "August 9, 2014", "game": "Home", "team": "Rothwell Park A", "result": "lost", "scoreplus": 14, "scoreminus": 21}, //"score": "14-21" },
	{ "date": "August 30, 2014", "game": "Home", "team": "Fearnville", "result": "lost", "scoreplus": 10, "scoreminus": 21}, //"score": "10-21" },
	{ "date": "September 6, 2014", "game": "Away", "team": "Thorner", "result": "lost", "scoreplus": 15, "scoreminus": 21}, //"score": "15-21" },
	{ "date": "September 13, 2014", "game": "Home", "team": "Barwick B", "result": "lost", "scoreplus": 19, "scoreminus": 21}, //"score": "19-21" },
	{ "date": "September 20, 2014", "game": "Away", "team": "Sherburn B", "result": "lost", "scoreplus": 10, "scoreminus": 21}, //"score": "10-21" },
	{ "date": "September 27, 2014", "game": "Home", "team": "Tadcaster B", "result": "lost", "scoreplus": 13, "scoreminus": 21} //"score": "13-21" }
];


//variables
/*
date
home/away (game)
team
opponent
result
description
*/

$(document).ready(function() {
	getStats();
});

function getStats() {
//make header
//var x = 0;

//sort array:

//bstat.sort("team");


var d = ''

	$('#jq-description').append(
		'<table cellpadding="0" cellspacing="0" class="table--stats"><tr class="jq-th"><th>Date</th><th>Home / Away</th><th>Team</th><th>Result</th><th>Score forward</th><th>Score against</th>'+ 
		'<th>percentage</th>'+
		'</tr>'+'</table>'
	);
		
		
		//loop
	
		//'</table>'
		
		//bstat[0].date
	var m = 'x'; //modifier
	
		for (x=0; x<bstat.length; x++) {
		
			//m = 'status--'+ bstat[x].result;
		var max = 21;
		
			$(
			'<tr class="">'+'<td>'+bstat[x].date+'</td>'+
				'<td class="status status--' +bstat[x].game+ '">' +bstat[x].game+'</td>' +
				'<td>' +bstat[x].team+'</td>' +
				'<td class="status status--'+bstat[x].result+'">' +bstat[x].result+'</td>' +
				'<td class="center">'+bstat[x].scoreplus+'</td>'+
				'<td class="center">'+bstat[x].scoreminus+'</td>'+
				'<td class="center percent item-'+x+'">'+Math.round((bstat[x].scoreplus - bstat[x].scoreminus)/ max *100)+'%</td>'+				   
			'</tr>'
			).appendTo($('.table--stats'));
			
			$('<canvas class="pie" style="width: 80px; height: 80px" id="canvas-'+x+'">').appendTo($('.item-'+x));
			
			var p = Math.round(bstat[x].scoreplus / max *100);
			var tg = "canvas-"+x;
			var c;
			
			if (bstat[x].scoreplus < 21) { //lost
				c = "#a21010";								
				p = Math.round((bstat[x].scoreplus - bstat[x].scoreminus)/ max *100*-1);	
				makePie(p, 100-p,c,tg);				
			}
			else {
				c = "#1ca210";
				p = Math.round((bstat[x].scoreplus - bstat[x].scoreminus)/ max *100);				
				makePie(p, 100-p,c,tg);
			}
			
		}
	
	//makePie(75,25, "canvas-1");
}



function makePie(x,y,c,t) {	
	var pieData = [
		{
			value : x,
			color : c//"#1ca210"
		},
		{
			value : y,
			color : "#eee"
		}	
	];

	var myPie = new Chart(document.getElementById(t).getContext("2d")).Pie(pieData);
}

