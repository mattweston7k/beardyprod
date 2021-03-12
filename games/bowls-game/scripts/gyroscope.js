function captureData() {

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
		
			$('#usr-x').val(Math.round(alpha));
			$('#usr-y').val(Math.round(beta));
				//20 = -60

		  }, false);
	}
	/*
	// Check for support for DeviceMotion events
	if(window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', function(event) {
			var x = event.accelerationIncludingGravity.x;
			var y = event.accelerationIncludingGravity.y;
			var z = event.accelerationIncludingGravity.z;
			var r = event.rotationRate;
			var html = '<div class="title color-1">Acceleration:</div>';
			html += 'x: ' + Math.round(x) +'<br />y: ' + Math.round(y) + '<br/>z: ' + Math.round(z) + '<br />';
			
			$('#jq-acc').text(z);
			
			var html2 = '<div class="title color-2">Rotation rate:</div>';
			if(r!=null) html2 += 'alpha: ' + Math.round(r.alpha) + 
				'<br />beta: ' + Math.round(r.beta) + '<br/>gamma: ' + Math.round(r.gamma) + '<br />';
			
			dataContainerMotion.innerHTML = html;  
			dataContainerAcceleration.innerHTML = html2;  

		  });
	}
*/
}	