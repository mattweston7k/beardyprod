//could have logic to calc items / row and make styling based on it

$(document).ready(function() {
	//read array content via function call
	readArr(locations, '.page-3', '');
	
	toggler();	
	makeAllMap();
	captureData();	
});

var img_folder = "images/";

function gyroVision(pic) {
	$('body > .section').addClass('toggled');
	$('.jq-gyro').html(
		'<div class="jq-box jq-z-elem"><img src="images/lens.png" /><img class="toggled" src="images/viewer.png" /></div><div class="jq-hider jq-hide-left jq-z-elem"></div><div class="jq-hider jq-hide-right jq-z-elem"></div>' +
		'<div class="jq-img"><img src="' +img_folder + pic + '" /></div>'
		/*'<button class="jq-move-left">left + 1%</button>' +
		'<button class="jq-move-right">right + 1%</button>'			
		*/
	);
	
	$('.jq-func').removeClass('toggled');
	
	$('.jq-gyro').toggleClass('toggled');
	//$('.jq-gyro').removeClass('toggled');
	
	//match height of picture	
	//$('.jq-gyro .jq-z-elem, .jq-box img').css('height', $('.jq-img img').outerHeight());
	
	$('.jq-box img').on("click", function() {
		$('.jq-box img').toggleClass('toggled');
		//$(this).find('background','#000');
		
		$('.jq-gyro').toggleClass('zoomed');
	});
	
	
	$('.jq-close').on("click", function() {
		$('.section.toggled').removeClass('toggled');
		$('.jq-gyro').addClass('toggled');
		$('.jq-func').addClass('toggled');
	});
	var p = 0;
	var offset_percent = 80; //in percentage
	var item_w = 20; //in percentage
	var l_offset = -100;
	var move_val = 1;
	
	//$('.jq-hide-left').css('left','-100%');
	
	$('.jq-move-right').on("click", function() { //ready
		if (p == offset_percent) { //reset on overflow
			p = 0;
		}
		else {
			p+=move_val;
		}		
		$('.jq-box').css('left',  p+ '%');
		$('.jq-hide-right').css('left', p + item_w + '%');		
		$('.jq-hide-left').css('left',  p-item_w-60 + '%');	
	});
	
	$('.jq-move-left').on("click", function() {
		if (p == 0) { //reset on overflow
			p = offset_percent;
		}
		else {
			p-=move_val;
		}
		$('.jq-box').css('left',  p+ '%');
		$('.jq-hide-right').css('left', p + item_w + '%');		
		$('.jq-hide-left').css('left',  p-item_w-60 + '%');	
	});
	
}

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


function makeAllMap() {
	$('input.jq-hide').css('display','block');
	 var infowindow = new google.maps.InfoWindow({
      maxWidth: 160
    });
	
	$('#map-canvas').addClass('active');
	
		var dyn_string = '';		
		var latlng = new google.maps.LatLng(60.14054,24.98443);
		
		var map = new google.maps.Map(
			document.getElementById('map-canvas'), {
			  center: latlng,
			  zoom: 10,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		
		
		//set markers		
		
		for (x = 0; x < locations.length; x++) { 				
			if (x > 0 && x < locations.length) { //take out header row
				//dyn_string += '<div class="item-' +x+ '">'+locations[x][0] +locations[x][1] +  '</div>'; 
				
				var latLng = new google.maps.LatLng(locations[x][1], locations[x][0]);
				
				var marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
	
				google.maps.event.addListener(marker, 'click', function(marker, x) {
					return function() {
					var kuva = locations[x][4];
						infowindow.setContent('<div id="info" data-img-3d="' +locations[x][4]+ '"><h2>' + locations[x][2] + '</h2>' + 
						'<a class="lnk" href="#" onclick=gyroVision("'+kuva+'")>Open with gyro viewer</a>' +
						'</div>');
						infowindow.open(map,marker);
					}
				}(marker, x));

			}						
		}		
		
		//$('.jq-gyro').append(dyn_string);

}
//----------------------------------------------

function makeGmap(long_val, lat_val, c_val, d_txt) { //longitude, latitude, 
	$('input.jq-hide').css('display','block');
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
		content: '<div id="info"><p>' +d_txt+ '</p>  </div>'
	});	
	marker.setMap(map);	
	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});
	
}	

function toggler() { //transitions	

	$('input.jq-hide').on("click", function() {
		$(this).css('display','none');
	});
	
	$('input.jq-show-all').on("click", function() {
		makeAllMap();
	});

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
