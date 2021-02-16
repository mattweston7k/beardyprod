function captureData() {

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
				 
				 
			  			  
			$('.bearing').text(Math.round(alpha) + ' / 360');
				//20 = -60
				
				var gw = 20; //gyro item width
			
				$('.jq-box').css('right', Math.round(alpha)/3.6 +'%');
				if ( (Math.round(alpha) < 289) ) {
					$('.jq-hide-right').css('right', Math.round(alpha)/3.6 + gw +'%'); //20 = item width in %
				}
				else {
					$('.jq-hide-right').css('right', '0%');
				}
				
				$('.jq-hide-left').css('right', Math.round(alpha)/3.6 - gw - 60 +'%');
				
				$('.jq-box').css('width', '20%');
					$('.jq-hider').css('width', '80%');
				
				
		//simulate zoom		
				//$('.jq-hide-left').css('right', Math.round(alpha)/3.6 -gw-20  +'%');
				/*
				if ( $('.jq-gyro').hasClass('zoomed') ) {
				
					var gw = 40; //gyro item width
				
					$('.jq-box').css('right', Math.round(alpha)/3.6 +'%');
					if ( (Math.round(alpha) < 215) ) {
						$('.jq-hide-right').css('right', Math.round(alpha)/3.6 + gw +'%'); //20 = item width in %
					}
					else {
						$('.jq-hide-right').css('right', '0%');
					}
					
					$('.jq-hide-left').css('right', Math.round(alpha)/3.6 - gw - 19.5 +'%');
					
	
					$('.jq-box').css('width', '40%');
					$('.jq-hider').css('width', '60%');
		
	
					
				}
				*/
		  }, false);
	}

}	