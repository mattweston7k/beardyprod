$(document).ready(function() {
	voiceControl();
	
});

 

function writeTxt(term) {	
	$('#jq-speech').html('You said: <br />' +term);
	
}

function listenMic() {
	if (annyang) {
	  var commands = {
		'Go *term': writeTxt			
		}

	};

	//annyang.setLanguage('fi');	
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening.
	  annyang.start();
	
}


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