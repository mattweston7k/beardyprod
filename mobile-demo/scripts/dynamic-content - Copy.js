//could have logic to calc items / row and make styling based on it

$(document).ready(function() {
	//read array content via function call
	readArr(locations, '.page-3', '');
	
	toggler();

});


//--func--------------------
function readArr(arr_name, t_element, s_direction) { //target element
	var dyn_string = '';
	var pfix = '<div class="row">';
	var sfix = '</div>';	

	for (r=0; r < arr_name.length; r++) {		
		dyn_string += pfix;
		for (x=0; x < arr_name[0].length; x++) { 
			if (r==0) { //items on first row
				dyn_string += '<div class="title cell w-' +x+ '">'+ arr_name[r][x] +'</div>'; 
			}
			else {				
				if (x==2) {
					dyn_string += '<div class="cell w-' +x+ '">'+ '<input class="jq-gmap-btn" type="button" value="' + arr_name[r][x] + '" value="gmaps" />' +'</div>' ; 	
				}
				else {
					dyn_string += '<div class="cell w-' +x+ '">'+ arr_name[r][x] +'</div>'; 				
				}
			}			
		}
		
			dyn_string += sfix;
		
		
		
		
	}
	
	$(t_element).text('').append(dyn_string);	
}

//---------------------
//initializeGmaps(); 
/*
	google.maps.event.addDomListener(window, 'load', initializeGmaps);
	var location = new google.maps.LatLng(locations[x].latitude,locations[x].longitude);	
	var gmapOptions = {
			disableDefaultUI: true,
			rotateControl: true,
			zoomControl: true,
			panControl: true,

			position: location,
			pov: {
			  heading: locations[x].heading,
			  pitch: 0
			}	
		};
		var map = new  google.maps.StreetViewPanorama(document.getElementById('gmap'),gmapOptions);		
*/

function makeGmap(long_val, lat_val, c_val, d_txt) { //longitude, latitude, club name
	//alert(long_val + '\n\n' + lat_val);
	var c_loc = new google.maps.LatLng(long_val, lat_val);		
	
	var map = new google.maps.Map(
        document.getElementById('map-canvas'), {
		  center: c_loc,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
//add marker	  
	  var marker = new google.maps.Marker({
		position: c_loc,		
	});	
	var infowindow = new google.maps.InfoWindow({
		content: '<div id="info">View on mobile: <h2>' + c_val + '</h2><p>' +d_txt+ '</p>  </div>'
	});	
	marker.setMap(map);	
	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});
	
}	

function toggler() { //transitions
	$('.jq-hide').on("click", function() {
		$('#map-canvas').removeClass('active');
	});
	
	$('.jq-gmap-btn').on("click", function() {
	//parse string till '.' and split
	
		var p_lat = $(this).closest('.row').find('.w-0').text().substring(0, $(this).closest('.row').find('.w-0').text().length-1); //these were in wrong order
		var p_long = $(this).closest('.row').find('.w-1').text().substring(0, $(this).closest('.row').find('.w-1').text().length-1);

		var p_txt = $(this).closest('.row').find('.w-2').text();
		var d_txt = $(this).closest('.row').find('.w-3').text();
		
		$('#map-canvas').addClass('active');
		makeGmap(p_long, p_lat, p_txt, d_txt);
		
	});

//-----	
}
