//voice-page.js

//$('body').scrollTo( $('.block--medium:eq(1)'), 800 );

//sc( $('.block--medium:eq(1)') );

//sc( $('.block__art') );


$(document).ready(function() {
	topnavLogic();
	voiceControl();
	
	
	$('#jq-change-lang').on("click", function(e) {
		$(this).toggleClass('fi');
	});
		
});

function topnavLogic() {
	$('.nav--top a').on("click", function(e) {
		e.preventDefault();
		if ($(this).text() == "Art") {
			sc( $('.block__art'), true );
		}
		else if ($(this).text() == "Politics") {
			sc( $('.block__politics'), true );
		}
		else if ($(this).text() == "Health") {
			sc( $('.block__health'), true );
		}
		else if ($(this).text() == "Weather") {
			sc( $('.block__weather'), true );
		}
		else if ($(this).text() == "News") {
			sc( $('.block__news'), true );
		}
	});
}

function sc(target, blur) {	
	$('body').scrollTo( target, 800);
	
	if (blur == true) {
		$('.block').addClass('blurred')
		target.removeClass('blurred');
	}
	else {
		$('.block').removeClass('blurred');
	}
}

function listenMic() {
	if (annyang) {
	  var commands = {
		'home' : function() { 			
			sc( $('.wrapper'), false );
		},
		'art' : function() { 			
			sc( $('.block__art'), true );
		},
		'politics' : function() { 			
			sc( $('.block__politics'), true );
		},
		'health' : function() { 						
			sc( $('.block__health'), true );
		},
		'weather' : function() { 						
			sc( $('.block__weather'), true );
		},	
		'news' : function() { 			
			sc( $('.block__news'), true );
		}
	  };

	//annyang.setLanguage('fi');	
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening.
	  annyang.start();
	}
}

function listenMicFI() {
	if (annyang) {
	  var commands = {
		'koti' : function() { 			
			sc( $('.wrapper'), false );
		},
		'taide' : function() { 			
			sc( $('.block__art'), true );
		},
		'politiikka' : function() { 			
			sc( $('.block__politics'), true );
		},
		'terveys' : function() { 						
			sc( $('.block__health'), true );
		},
		'sää' : function() { 						
			sc( $('.block__weather'), true );
		},	
		'uutiset' : function() { 			
			sc( $('.block__news'), true );
		}
	  };

	annyang.setLanguage('fi');	
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening.
	  annyang.start();
	}
}


function voiceControl() {
	$('#jq-listen').on("click", function() {
		try {	
			if ( $('#jq-change-lang').hasClass('fi') ) {
				listenMicFI();
			}
			else {
				listenMic();
			}			
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