$(document).ready(function() {	
	uiLogic();
	
});

function uiLogic() {
//run tests:
	//testOrientation();
	//testMotion();
	
	captureData();
	desktopTest();
	
	//$('.hider-alt').css('display','none');
}

function desktopTest() {
	var d = 360;
	var tval = 0;
	var bpoint = 72; //72%
	
	$('.jq-bearing').text(tval);
	$('.jq-btns button').on("click", function() {
	
		tval += parseInt($(this).attr('data-amount'));
	/*
		if ($(this).hasClass('btn-down')) {
			tval += -10;
		}
		else if ($(this).hasClass('btn-up')) {
			tval += 10;
		}
	*/	
		//reset
		if (tval < -2450) {
			//tval = 0;
		}
		
		$('.jq-bearing').text(tval);
		$('.scenery img').css('left', tval/10 +'%');
	
		
	
		//$('.hider').css('right', (Math.round(100)/3.6)-0.28375 +'%');
	});
	
	$('.binos').on("click", function() {
		
		
		$('.scenery').toggleClass('zoomed-in');
	});
	
}


function testOrientation() {
	var txt1 = 'orientation support = ';
	if(window.DeviceOrientationEvent) { //Do something 
		$('.jq-output').append(txt1+'true');
	}
	else {
		$('.jq-output').append(txt1+'false');
	}
}

function testMotion() { 
	var txt1 = '<br /> device motion support = ';
	if(window.DeviceMotion) { //Do something }
		$('.jq-output').append(txt1+'true');
	}
	else {
		$('.jq-output').append(txt1+'false');
	}
}

function captureData() {

	var iw = 0.28375; //iw = item width in percentage

//Find our div containers in the DOM
	var dataContainerOrientation = document.getElementById('dataContainerOrientation');
	var dataContainerMotion = document.getElementById('dataContainerMotion');
	var dataContainerAcceleration = document.getElementById('dataContainerAcceleration');
	//Check for support for DeviceOrientation event
	if(window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', function(event) {
			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;

			if(alpha!=null || beta!=null || gamma!=null) 
			  dataContainerOrientation.innerHTML = 'alpha: ' + Math.round(alpha) + '<br/>beta: ' +
				 Math.round(beta) + '<br />gamma: ' + Math.round(gamma);
			  
			  
			//$('.bearing').text(Math.round(alpha));
			$('.jq-bearing').text(Math.round(alpha));
			

			//$('.scenery img').css('left', '-'+ Math.round(alpha)/3.6 +'%');
			$('.scenery img').css('right', '-'+ Math.round(alpha)/3.6 +'%');
			
			$('.scenery img').css('top', '-'+ Math.round(beta)/3.6 +'%');

		  }, false);
	}

	// Check for support for DeviceMotion events
	if(window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', function(event) {
			var x = event.accelerationIncludingGravity.x;
			var y = event.accelerationIncludingGravity.y;
			var z = event.accelerationIncludingGravity.z;
			var r = event.rotationRate;
			var html = '<div class="title color-1">Acceleration:</div>';
			html += 'x: ' + Math.round(x) +'<br />y: ' + Math.round(y) + '<br/>z: ' + Math.round(z) + '<br />';
			
			var html2 = '<div class="title color-2">Rotation rate:</div>';
			if(r!=null) html2 += 'alpha: ' + Math.round(r.alpha) + 
				'<br />beta: ' + Math.round(r.beta) + '<br/>gamma: ' + Math.round(r.gamma) + '<br />';
			
			dataContainerMotion.innerHTML = html;  

			dataContainerAcceleration.innerHTML = html2;  
		  });
	}
}	  