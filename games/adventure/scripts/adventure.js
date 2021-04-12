//define user commands
/*
var commands = [
	{ "cmd_open": "open", "cmd_left": "go left", "cmd_right": "go right", "cmd_turn": "turn around" }
];
*/

var commands = [
	"Up", "Right", "Down", "Left" 
];
				
var descriptions = [
	"Move the cursor on the map by activating voice control or using up/down/left/right links.",
	"something something"
];	


//adventure
$(document).ready(function() {

//	for (x = commands.size
	getCommands();
	setTxt();
});

function getCommands() {	
	for (x = 0; x < commands.length; x++) {//loop through available commands
		$('#jq-actions').append('<p><a href="#">' +commands[x]+ '</a></p>');
	}
	$('#jq-actions a').on("click", function(e) {
		e.preventDefault();
		//alert($(this).text());
		if ($(this).text() == "Up") {
			moveMap("North");
		}
		else if ($(this).text() == "Right") {
			moveMap("East");
		}
		else if ($(this).text() == "Down") {
			moveMap("South");
		}		
		else if ($(this).text() == "Left") {
			moveMap("West");
		}				
	});	
	//activate voice control
	voiceControl();
}

function moveMap(direction) {
	var offset = 0.9; //offset from bottom/left
	var map_increase = 95; //increase by 14.2%
	
	
	var map_loc_y = parseFloat($('.map--location').css('bottom'));
	var map_loc_x = parseFloat($('.map--location').css('left'));

	if (direction == "North") {
		$('#jq-compass').text('N');			
		map_loc_y += map_increase;	
		
		$('.map--location').css('bottom', 
			map_loc_y+'px'
		);
	}
	else if (direction == "East") {
		$('#jq-compass').text('E');
		map_loc_x += map_increase;
		$('.map--location').css('left', 
			map_loc_x+'px'
		);
	}	
	else if (direction == "South") {
		$('#jq-compass').text('S');
			
		map_loc_y -= map_increase;
		$('.map--location').css('bottom', 
			map_loc_y+'px'
		);
	}
	else if (direction == "West") {
		$('#jq-compass').text('W');
		map_loc_x -= map_increase;
		$('.map--location').css('left', 
			map_loc_x+'px'
		);
	}
}


function setTxt() {
	$('#jq-description').append('<p>' +descriptions[0]+ '</p>');
}			

//---voice controlled
function voiceControl() {
	$('#jq-listen').on("click", function() {
		try {	
			listenMic();
		}
		catch(e) {
			alert(e);
		}
	});

	$('#jq-stop-listen').on("click", function() {
		try {
			annyang.abort();
		}
		catch(e) {
			alert('stop error: ' +e);
		}	
	});
}
//nexus 7 -> y = 243px, x = 242px
function listenMic() {
	if (annyang) {
	  // Let's define a command.
	 
	  var commands = {
		'up' : function() { 			
			$('#jq-compass').text('N');
			moveMap("North");
		},
		'right' : function() { 			
			$('#jq-compass').text('E');
			moveMap("East");
		},
		'down' : function() { 			
			$('#jq-compass').text('S');
			moveMap("South");
		},
		'left': function() { 
			$('#jq-compass').text('W');
			moveMap("West");
		}		
	  };
	
	/*
	var commands = {
		'koti': function() {
			alert('koti')
		},
		'mansikka': function() {
			alert('mansikka')
		}
	}
	 */
	//annyang.setLanguage('fi');
	
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening.
	  annyang.start();
	}
}


