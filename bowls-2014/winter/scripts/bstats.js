

var bstat = [
	{ "date": "October 27, 2014", "week": "week 4", "team": "Melham muppets", "result": "lost", "scoreplus": 4, "scoreminus": 21},
	{ "date": "November 3, 2014", "week": "week 5", "team": "Spinky's (Barnsley)", "result": "lost", "scoreplus": 5, "scoreminus": 21},
	{ "date": "November 24, 2014", "week": "week 8", "team": "Hawks", "result": "lost", "scoreplus": 10, "scoreminus": 21},
	{ "date": "December 1, 2014", "week": "week 9", "team": "Melham muppets", "result": "lost", "scoreplus": 11, "scoreminus": 21}
];

//variables
/*
date
home/away (game) / week
team
opponent
result
description
*/

$(document).ready(function() {
	getStats();
});

function getStats() {
var d = ''

	$('#jq-description').append(
		'<table cellpadding="0" cellspacing="0" class="table--stats"><tr class="jq-th"><th>Date</th><th>Week nro</th><th>Team</th><th>Result</th><th>Score forward</th><th>Score against</th>'+ 
		//'<table cellpadding="0" cellspacing="0" class="table--stats"><tr class="jq-th"><th>Date</th><th>Home / Away</th><th>Team</th><th>Result</th><th>Score forward</th><th>Score against</th>'+ 
		'<th>win/lose %</th>'+
		'</tr>'+'</table>'
	);

		for (x=0; x<bstat.length; x++) {					
		var max = 21;
		
			$(
			'<tr class="">'+'<td>'+bstat[x].date+'</td>'+
				'<td>' +bstat[x].week+'</td>' +
				'<td>' +bstat[x].team+'</td>' +
				'<td class="status status--'+bstat[x].result+'">' +bstat[x].result+'</td>' +
				'<td class="center">'+bstat[x].scoreplus+'</td>'+
				'<td class="center">'+bstat[x].scoreminus+'</td>'+
				'<td class="center percent item-'+x+'">'+Math.round((bstat[x].scoreplus - bstat[x].scoreminus)/ max *100)+'%</td>'+				   
			'</tr>'
			).appendTo($('.table--stats'));
			
/*
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
*/			
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
			//forward - against
			
			
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
