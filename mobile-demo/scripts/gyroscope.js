function captureData() {
	
	//might need item width
	
//Find our div containers in the DOM
	var dataContainerOrientation = document.getElementById('dataContainerOrientation');
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

			//$('.scenery img').css('left', '-'+ Math.round(alpha)/3.6 +'%');

			/*
			if ( (Math.round(alpha) < 289) ) {
			
				$('.jq-box').css('left', Math.round(alpha)/3.6 +'%');
				$('.jq-hide-right').css('left', Math.round(alpha)/3.6 + 20 +'%'); //20 = item width in %
				$('.jq-hide-left').css('left', Math.round(alpha)/3.6 - 20 - 60 +'%');
			}
			*/
			
			
				$('.jq-box').css('right', Math.round(alpha)/3.6 +'%');
				if ( (Math.round(alpha) < 289) ) {
					$('.jq-hide-right').css('right', Math.round(alpha)/3.6 + 20 +'%'); //20 = item width in %
				}
				else {
					$('.jq-hide-right').css('right', '0%');
				}
				
				$('.jq-hide-left').css('right', Math.round(alpha)/3.6 - 20 - 60 +'%');

		  }, false);
	}

}	