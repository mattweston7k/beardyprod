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
	var cv = $('.measure-line').css('top'); //current value
	var meter_max = 330;
	var meter_min = 30;
	
	var d = 360;
	var tval = 0;
	var bpoint = 72; //72%
	
	$('.jq-bearing').text(tval);
	$('.jq-btns button').on("click", function() {
	
		tval += parseInt($(this).attr('data-amount'));
		//reset
		if (tval < -2450) {
			//tval = 0;
		}
		
		$('.jq-bearing').text(tval);
		$('.scenery img').css('margin-left', tval/10 +'%');

	});
	
	$('.jq-zoom button').on("click", function() {
		tval += parseInt($(this).attr('data-amount'));
		$('.scenery').css('zoom', 100+tval/10 +'%');		
	});
	$('.jq-meter--btns button').on("click", function() {	
		tval += parseInt($(this).attr('data-amount'));
		
		//if (cv.substring(0,cv.length-2) < meter_max || cv.substring(0,cv.length-2) > meter_min) {
		
		//if (cv.substring(0,cv.length-2) < meter_max) {

			var mv = cv.substring(0,cv.length-2); //remove px
		
			$('.measure-line').css('top', parseInt(mv)+parseInt(tval) +'px');
		//}
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

	var iw = 0.28375;

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
			  
			  
			$('.bearing').text(Math.round(alpha));
			//iw = item width in percentage

			$('.scenery img').css('margin-left', '-'+ Math.round(alpha)/3.6 +'%');
			
		
			
			var cval = $('.measure-line').css('top'); //current value
			var mv = cval.substring(0,cval.length-2); //remove px		
			$('.measure-line').css('top', Math.round(beta) +'px');
			
			
			/*
			if ((Math.round(alpha) > 110)) {
				//$('.hider').css('border','solid 1px #f00');
				$('.hider-alt').css('left','auto');
				$('.hider-alt').css('right', '-'+(Math.round(alpha)/3.6) +'%');
			}
			else {
				$('.hider-alt').css('right','auto');
				$('.hider-alt').css('left',  (Math.round(alpha)/3.6) +'%');
				//$('.hider').css('border','none');
			}
			*/
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