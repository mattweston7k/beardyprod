$(document).ready(function() {
	$('body').removeClass('no-script').addClass('script-support');
	uiLogic();
});


function uiLogic() {
	gameSettings();
	drawGreen();
	$('.jq--throw').on("click", function() {
		captureData();		
		//draw:
		drawOncanvas();
		
	});
	
	$('.jq--stop').on("click", function() {		
		//window.removeEventListener('deviceorientation');		
		//clear raphael
		$('svg').remove();
		
	});
	$('.jq--jack').on("click", function() {		
		drawTarget();
	});
}

function drawGreen() {
	var c = document.getElementById('game-area'); //$('#game-area');
	var ctx = c.getContext("2d");	
//make gutters	
	ctx.fillStyle = "rgb(227,227,227)";
	ctx.fillRect(0,0,300,150);
	ctx.clearRect(10,5,280,140);
}

//draw random target

function drawTarget() {
	var t_x = Math.floor((Math.random() * 280) + 10);
	var t_y = Math.floor((Math.random() * 280) + 10);

	var paper = Raphael("paper-1", 300, 300);
	var circle = paper.circle(t_x, t_y, 4);
	circle.animate( {fill: "#fcec34", stroke: "#666" }, 700);
	
	$('#dbg-data').html('x = ' + t_x + '<br />y = ' + t_y);
}

function drawOncanvas() {
	var w = 300;
	var h = 300;

	x_pos = $('#usr-x').val(); //120;
	y_pos = $('#usr-y').val(); //160;

	var paper = Raphael("paper-1", w, h);
	paper.text(150, 295, "Player-1");


//alpha -> 360
//beta -> angle

// Sets the fill attribute of the circle to red (#f00)
//circle.attr("fill", "#f00");

// Creates circle at x = 50, y = 40, with radius 10
//var circle = paper.circle(120, 60, 8);
var circle = paper.circle(x_pos, y_pos, 8);
circle.animate( {fill: "#aaa", stroke: "#666" }, 700);

//Move to 50,100 then draw a Line to 120,120, then draw a Line to 120,40 and then close the path (Z):
//var p1 = paper.path("M150,285 L120, 60 Z"); //paper.path("M50,100L120,120L140,40Z");

var p1 = paper.path("M150,285 L" + x_pos+ ", " +y_pos+ " Z");

p1.attr({"stroke-width": 1 }); //, fill: "red"})



}

function gameSettings() {
	$('.jq--weight button').on("click", function() {
		var bowls_weight = parseInt($('.jq--bowls-weight').text());
		var b_change = 0;
		if ($(this).text()=='+') {				 
			 b_change = 2;				
			 if (bowls_weight > 12) {
				b_change = 0;
			 }			
		}			
		else if ($(this).text()=='-') {
			b_change = -2;
			if (bowls_weight == 0) {
				b_change = 0;
			 }	
		}
		$('.jq--bowls-weight').text(bowls_weight + b_change);
	});
	$('.jq--change-bias').on("click", function() {
		if ($('.jq--val-bias').text() == 'thumb') {
			$('.jq--val-bias').text('finger');
		}
		else {
			$('.jq--val-bias').text('thumb');
		}
	});
	$('.jq--change-hand').on("click", function() {
		if ($('.jq--val-hand').text() == 'right') {
			$('.jq--val-hand').text('left');
		}
		else {
			$('.jq--val-hand').text('right');
		}
	});
}