$(document).ready(function() {
	//read array content via function call
	readArr(bowls, '.page-1', '');
	
	toggler();
	btnSort();
	
	uiLogic();
});

function uiLogic() {
	$('.jq-find').on("click", function() {
		findOnPage();
	});
	
	$('.help').on("click", function() {
		$('.instructions').toggle(500);
	});
}

function findOnPage() {	
	$('.active .row').css('display','none'); //hide elements
	$('.w-2:contains("'+ $('.jq-search-val').val() + '")').closest('.row').css('display','block');
}


$('.jq-listen').on("click", function() {
	try {	
		listenMic();
		$('.jq-listen').addClass('active');
		$('.jq-stop-listen').removeClass('active');
	}
	catch(e) {
		alert('error listening to microphone: '+e);
	}
});
$('.jq-stop-listen').on("click", function() {
	try {
		annyang.abort();
		$('.jq-stop-listen').addClass('active');
		$('.jq-listen').removeClass('active');
	}
	catch(e) {
		alert('stop error: ' +e);
	}	
});

function listenMic() {
	if (annyang) {
	  // Let's define a command.
	  var commands = {
		'find': function() { 
			findOnPage();
		},
		'turn off': function() { 
			annyang.abort();
			$('.jq-stop-listen').addClass('active');
			$('.jq-listen').removeClass('active');
		}
	  };
	  // Add our commands to annyang
	  annyang.addCommands(commands);
	  
	  annyang.start();// Start listening.
	}
}





//http://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
function sortIt(ar, ci, di) { //array name, cell index, direction
	ar.sort(function(a,b) {
		if (di == 'down') {
			return b[ci] - a[ci]; //sorts array descending 10 - 0	
		}		
		else if (di == 'up') {
			return a[ci] - b[ci]; //sorts array ascending 0 - 10	
		}
	});
}

//--func--------------------
function readArr(arr_name, t_element, s_direction) { //target element
	var dyn_string = '';
	var pfix = '<div class="row">';
	var sfix = '</div>';	

	if (s_direction != '') {
		sortIt(arr_name, 4, s_direction);
	}
	for (r=0; r < arr_name.length; r++) {		
		dyn_string += pfix;
		for (x=0; x < arr_name[0].length; x++) { 
			if (r==0) { //items on first row
				dyn_string += '<div class="title cell w-' +x+ '">'+ arr_name[r][x] +'</div>'; 
			}
			else {				
					dyn_string += '<div class="cell w-' +x+ '">'+ arr_name[r][x] +'</div>'; 				
			}			
		}
		if (arr_name == bowls && r > 0) {
			dyn_string += '<input class="jq-gmap-btn" type="button" value="gmaps" /> '+sfix;
		}
		else {
			dyn_string += sfix;		
		}
		
		
		
	}
	
	$(t_element).text('').append(dyn_string);	
}


function makeGmap(long_val, lat_val, c_val) { //longitude, latitude, club name
	var c_loc = new google.maps.LatLng(long_val, lat_val);			
	var map = new google.maps.Map(
        document.getElementById('map-canvas'), {
		  center: c_loc,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
//add marker	  
	  var marker = new google.maps.Marker({
		position: c_loc,		
	});	
	var infowindow = new google.maps.InfoWindow({
		content: '<div id="info"> Bowls club: <h2>' + c_val + '</h2></div>'
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

		var club_name = $(this).closest('.row').find('.w-2').text();
		
		$('#map-canvas').addClass('active');
		makeGmap(p_long, p_lat, club_name);
		
	});

}

function btnSort() {
	$('.btn--sort').on("click", function() { //sorting
		$('.active').toggleClass('sort--up');				

		if ($('.active').hasClass('sort--up')) {				
			//readArr(a_obj, p, 'down');	
			readArr(bowls, '.page-1', 'down');
		}
		else {
			//readArr(a_obj, p, 'up');
			readArr(bowls, '.page-1', 'up');
		}		
	});
}