
//var myDate = new Date("April 19, 2014");

//var myDateFrmt = new Date(dd.mm.yyyy);

var bstat = [
	{ "date": "April 4, 2015", "game": "Away", "team": "Rothwell Park", "result": "lost", "scoreplus": 19, "scoreminus": 21},
	{ "date": "April 25, 2015", "game": "Away", "team": "Chapel Allerton", "result": "lost", "scoreplus": 19, "scoreminus": 21},
	{ "date": "May 9, 2015", "game": "Home", "team": "Garforth CC A", "result": "lost", "scoreplus": 15, "scoreminus": 21}, //rescheduled match
	{ "date": "May 12, 2015", "game": "Home", "team": "Swillington", "result": "lost", "scoreplus": 10, "scoreminus": 21},	
	{ "date": "May 30, 2015", "game": "Away", "team": "Garforth Rec B", "result": "lost", "scoreplus": 1, "scoreminus": 21}  //rescheduled match
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
