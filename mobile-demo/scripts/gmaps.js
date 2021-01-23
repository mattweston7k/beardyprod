//use: http://universimmedia.pagesperso-orange.fr/geo/loc.htm

var latitude_val = 0;
var longitude_val = 0;
var item_id = 'map-1';

var myLatlng = new google.maps.LatLng(latitude_val, longitude_val);
var mapOptions = {
	zoom: 13,
	center: myLatlng
}
var map = new google.maps.Map(document.getElementById(item_id), mapOptions);
var marker = new google.maps.Marker({
	position: myLatlng,
	map: map,
	title: ''
});



$(document).ready(function() {
	toggler();
	renderGmaps('map-1', 60.21178, 25.10719);	
	renderGmaps('map-2', 60.21178, 25.10719);
});

function toggler() {
	$('.jq-toggler').on("click", function() {
		$('.jq-toggled').slideToggle(500);

		$('body').prepend('toggled-1, ');
		google.maps.event.trigger(map, "resize");
	});
}

function renderGmaps(item_id, latitude_val, longitude_val) {	
	function initialize() {
	  myLatlng = new google.maps.LatLng(latitude_val, longitude_val);
	  mapOptions = {
	    zoom: 13,
	    center: myLatlng
	  }
	  map = new google.maps.Map(document.getElementById(item_id), mapOptions);

	 marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: ''
	  });	  	  
	}
	google.maps.event.addDomListener(window, 'load', initialize);	
}


/*
function renderGmaps(item_id, latitude_val, longitude_val) {	
	function initialize() {
	  var myLatlng = new google.maps.LatLng(latitude_val, longitude_val);
	  var mapOptions = {
	    zoom: 13,
	    center: myLatlng
	  }
	  var map = new google.maps.Map(document.getElementById(item_id), mapOptions);

	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title: ''
	  });	  	  
	}
	google.maps.event.addDomListener(window, 'load', initialize);	
}
*/