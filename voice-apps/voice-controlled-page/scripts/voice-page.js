$(document).ready(function() {
	topnavLogic();
	voiceControl();
	simulateFunc();
	
	$('#jq-change-lang').on("click", function(e) {
		$(this).toggleClass('fi');
	});
		
});

function topnavLogic() {
	$('.nav--top a').on("click", function(e) {
		e.preventDefault();
		if ($(this).text() == "Home") {
			sc( $('.wrapper'), false );
		}
		else if ($(this).text() == "Art") {
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
		},
		'Text *term': writeTxt,
		'Find': findOnPage,
		'reset' : resetSearch,
		'voice off' : stopMic
	  };

	//annyang.setLanguage('fi');	
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening.
	  annyang.start();
	}
}

function stopMic() {
	try {
		annyang.abort();
	}
	catch(e) {
		alert('stop error: ' +e);
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
		},
		'Text *term': writeTxt,
		'Find': findOnPage
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

//------------
jQuery.fn.highlight = function (str, className) {
    var regex = new RegExp(str, "gi");
    return this.each(function () {
        $(this).contents().filter(function() {
            return this.nodeType == 3 && regex.test(this.nodeValue);
        }).replaceWith(function() {
            return (this.nodeValue || "").replace(regex, function(match) {
                return "<span class=\"" + className + "\">" + match + "</span>";
            });
        });
    });		
}; 

function findOnPage() {
	//reset
	resetSearch();
	
	if ($('#jq-search-term').val().length > 0) {	
		var stxt =  $('#jq-search-term').val().toString(); //"to save and improve";  //searched text
		$(".main *").highlight(stxt, "jq-focused");
		if ( $('.jq-focused').length > 1 ) {
			indexElements('.jq-focused');		
			$('.jq-focused').each(function () {
				$(this).append('<div class="jq-index">' + $(this).attr("jdex") +'</div>');
			});		
		}	
		
		//fadeIn
		$('.js-panel').fadeIn(500);
		$('#js-find-count').text(
			$('.jq-focused').size()
		);
	}	
}

function resetSearch() {
	$('#js-find-count').text('');
	$('.jq-index').remove();
	$('.jq-focused').contents().unwrap();
	$('.js-panel').fadeOut(200);
}

//--no microphone
function simulateFunc() {
	$('.js-simulate').on("click", function(e) {
	
		e.preventDefault();
		findOnPage();
	});
	$('.js-reset').on("click", function(e) {
		e.preventDefault();
		resetSearch();
	});
}

//----search
function writeTxt(term) {	
	$('#jq-search-term').val(term);
	
}

function indexElements(element) {
	try {
		var offset = 1; //get index-1 start instead of index-0
		for(var i=0; i< $(element).length; i++) {		
			$(element+':eq('+i+')').attr("jdex",(i+offset) );
		}
	}
	catch(e) {
		//indexer failed
	}	
}
 

//jq-search-term
/*
function listenMic() {
	if (annyang) {
	  var commands = {
		'Text *term': writeTxt,
		'Find': findOnPage
		}
	};
	//annyang.setLanguage('fi');	
	  annyang.addCommands(commands);
	  annyang.start();
	
}
*/