//gmap tests
// var usr_faction = 'ewok';
var usr_faction = 'empire';
var intro_delay = 2000;
var dialog_duration = 1000;


var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(52.8227, -0.83557),
    new google.maps.LatLng(52.8627, -0.73557)


   // new google.maps.LatLng(52.8227, -0.83557),
   //    new google.maps.LatLng(52.9227, -0.63557)
);

var faction_id = 0;

var dmg_icon = 'icon-rebel.png';

var z_bounds = new google.maps.LatLngBounds( //this is the target  that we try to hit
    new google.maps.LatLng(52.792814874283955, -1.2063585742187115),
    new google.maps.LatLng(52.83284238573486, -1.1063585742188025)
);




$(document).ready(function() {
   cardRotate();
});


//calculates distance between two points in km's
function calcDistance(p1, p2){
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}



function fireTargetLogic() {
   $('#fire').on("click", function() {
      defaultCoordinates(); //if user hasn't moved the rectangle from default location
      $('#fire').prop('disabled', true); //disable after 1st shot
      $('.txt--empire').text('');

      var s_lat = $('#sw_lat').text();
      var dmg_sw = new google.maps.LatLng($('#sw_lat').text(), $('#sw_lng').text());
      var dmg_ne = new google.maps.LatLng($('#ne_lat').text(), $('#ne_lng').text());

      var dmg_bound = new google.maps.LatLngBounds(dmg_sw, dmg_ne);
      var dmg_overlay =  new GameOverlay(dmg_bound, 'assets/images/' + dmg_icon, map);

      dialogLogic();

      //push to array
      var s_lat =[$('#ne_lat').text(), $('#ne_lng').text(), $('#sw_lat').text(), $('#sw_lng').text(), usr_faction];

      if (usr_faction == 'rebel') {
         pOneData.push(s_lat);
      }
      else if (usr_faction == 'empire') {
         pTwoData.push(s_lat); //push data to array (used to track previous tries)

//--target distance calculation
         a_target = dmg_bound.getCenter(); //get epicentre of target area_bounds
         b_target = z_bounds.getCenter(); //get target epicenter
         //15km > really close
         //20km > 15 close
         //30km > 20 medium
         var off_target = calcDistance(a_target, b_target);
         var txt_distance;

         if (off_target <31) {
            if (off_target < 16) {
               txt_distance = 'Really close';
            }
            else if (off_target > 15 && off_target < 20) {
               txt_distance = 'Quite close';
            }
            else if (off_target > 20 && off_target < 31) {
               txt_distance = 'Medium distance';
            }

            //give feedback how far we were off the target
            $('.txt--empire').text(
               // off_target + ' | ' +
               txt_distance +' to the target...'
            );
         }
         else {
            $('.txt--empire').html('Error... <br/><br/>Too far from target!');
         }

         setTimeout(function() {
            $('.dialog__empire').fadeIn(400);
         }, dialog_duration+200);

         setTimeout(function() {
            $('.dialog__empire').fadeOut(400);
         }, dialog_duration*2.5);

      }

      //----tracker test
      var z_center = z_bounds.getCenter();

      var z = dmg_bound.contains(z_center);
      if(z == true) {
         endGame();
      }
      // alert(
      //    rectangle.getBounds().contains({lat: 52.895851047628526, lng: -1.0981188281250525})
      // );
   });
}

function endGame() { //faction
   $('body').addClass('game-ended');
   $('.card__'+usr_faction).addClass('block');
   setTimeout(function() {
      $('.card__'+usr_faction).addClass('show');
   }, 900);
}

function dialogLogic() {
   $('.meter-overlay').removeClass('animate');
   $('.dialog').fadeIn(400);
   setTimeout(function() {
         $('.meter-overlay').addClass('animate');
   },400);

   setTimeout(function() {
      $('.dialog').fadeOut(400);
   }, dialog_duration-100);

}

function debugUse() {
   $('.intro').remove();
   $('.game, .dbg-info').addClass('visible');
}

function startUp() {
   setTimeout(function() {
      $('.intro').fadeOut(intro_delay);
   }, 800);
   setTimeout(function() {
      $('.game').addClass('visible');
   },intro_delay);
   // fireTargetLogic();
   //generate random intro pic
   var active_pic = Math.floor((Math.random() * 4) + 0);
   $('.intro img:eq('+active_pic+')').addClass('active-pic');

   // debugUse();
   // gameLogic();
   // alert(usr_faction)
   setColorElements(usr_faction);

   //fixes set user faction from start screen
   if (usr_faction == 'rebel') {
      dmg_icon = 'icon-rebel.png'; //previous marker(s) pic
      bounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(52.8227, -0.83557),
         new google.maps.LatLng(52.8627, -0.73557)
      );
   }
   else {
      dmg_icon = 'icon-empire.png';
      bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(52.8227, -0.83557),
          new google.maps.LatLng(52.9227, -0.63557)
      );
   }



   fireTargetLogic();
   initializeCustom();
}

function defaultCoordinates(){
   var ne = rectangle.getBounds().getNorthEast();
   var sw = rectangle.getBounds().getSouthWest();

   //bind fire function call here:
    $('#ne_lat').text(ne.lat());
    $('#ne_lng').text(ne.lng());
    $('#sw_lat').text(sw.lat());
    $('#sw_lng').text(sw.lng());
}

function insertMarkers(f) { //faction

// alert('faction = ' + f);

      var base_overlay =  new GameOverlay(z_bounds, 'assets/images/base-2.png', map);

   var prev_dmg;
   if (f == 'rebel') {
      dmg_icon = 'icon-rebel.png';
      //get array length and loop all the markers to the map
      for (x=0; x<pOneData.length; x++) {
         prev_dmg = new google.maps.LatLngBounds(
            new google.maps.LatLng(pOneData[x][2],pOneData[x][3]),
            new google.maps.LatLng(pOneData[x][0],pOneData[x][1])
         );
         prev_dmg =  new GameOverlay(prev_dmg, 'assets/images/icon-rebel-alt.png', map);
      }
   }
   else if (f == 'empire') {
      dmg_icon = 'icon-empire.png';
      for (x=0; x<pOneData.length; x++) {
         prev_dmg = new google.maps.LatLngBounds(
            new google.maps.LatLng(pTwoData[x][2],pTwoData[x][3]),
            new google.maps.LatLng(pTwoData[x][0],pTwoData[x][1])
         );
         prev_dmg =  new GameOverlay(prev_dmg, 'assets/images/icon-empire-alt.png', map);
      }
   }
}

$('#switch').on("click", function() {
   $('#fire').prop('disabled', false);
   if (usr_faction == 'rebel') {
      usr_faction = 'empire';
      dmg_icon = 'icon-empire.png';

      bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(52.8227, -0.83557),
          new google.maps.LatLng(52.9227, -0.63557)
      );

      faction_id = 1;
   }
   else {
      usr_faction = 'rebel';
      dmg_icon = 'icon-rebel.png'; //previous marker(s) pic
      bounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(52.8227, -0.83557),
         new google.maps.LatLng(52.8627, -0.73557)
      );

      faction_id = 0;
   }
   setColorElements(usr_faction);
   initializeCustom();


   var dmg_bound = new google.maps.LatLngBounds(
      new google.maps.LatLng(mapData[faction_id][0],mapData[faction_id][1]), //ne
      new google.maps.LatLng(mapData[faction_id][2],mapData[faction_id][3]) //sw

      // mapData[0][1], mapData[0][0]
   );
   var dmg_overlay =  new GameOverlay(dmg_bound, 'assets/images/' + dmg_icon, map);
   // initializeCustom();
   try { //error handling when no prev markers exist..
      insertMarkers(usr_faction); //insert previous markers
   }
   catch(e) {
      // alert(e);
   }

});


var color_map_water;
var color_map_terrain;
var color_target;
var color_target_bg;

function setColorElements(faction) {


   if (faction=="rebel") {
      color_map_water = '#195384'; //215bed
      color_map_terrain = '#506598';
      color_target = '#055a27';
      color_target_bg = '#12f36c';
   }
   else if (faction=="empire") {
      color_map_water = '#450d5d' //'#5d0e6b'; // { color: '#5d0e6b' }
      color_map_terrain = '#ca052f';  // { hue: '#ca052f' },
      // color_target = '#22a6b2';
      // color_target_bg = '#12e0f3';
      color_target =  '#222'; // '#1e959c';
      color_target_bg = '#e0eb2a'; //'#00d5e1';
   }
   else if (faction=="ewok") {
      color_map_water = '#0f54a2'; // { color: '#5d0e6b' }
      color_map_terrain = '#038900';  // { hue: '#ca052f' },
      color_target = '#dd4169';
      color_target_bg = '#b5441b';
   }
}


var rectangle;
var map;
var infoWindow;

var MY_MAPTYPE_ID = 'custom_style';
//--rectangle info
function showNewRect(event) {
  var ne = rectangle.getBounds().getNorthEast();
  var sw = rectangle.getBounds().getSouthWest();

  //bind fire function call here:
   $('#ne_lat').text(ne.lat());
   $('#ne_lng').text(ne.lng());
   $('#sw_lat').text(sw.lat());
   $('#sw_lng').text(sw.lng());
}

var overlay;
GameOverlay.prototype = new google.maps.OverlayView();

function initializeCustom() {
   var featureOpts = [
     {
       stylers: [
         { hue: color_map_terrain },
       // { hue: '#ca052f' },
         { visibility: 'simplified' },
         { gamma: 0.5 },
         { weight: 0.5 }
       ]
     },
     {
       elementType: 'labels',
       stylers: [
         { visibility: 'off' }
       ]
     },
     {
       featureType: 'water',
       stylers: [
          // { color: '#5d0e6b' }
         { color: color_map_water }
       ]
     }
   ];

  var mapOptions = {
   //  center: new google.maps.LatLng(44.5452, -78.5389),
   center: new google.maps.LatLng(52.9227, -0.83557),
    zoom: 9,
    disableDefaultUI: true,
    scaleControl: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Hunter mode'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

  // Define the rectangle and set its editable property to true.
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: false,
    draggable: true,
    strokeColor: color_target,
    strokeWeight: 2,
    fillColor: color_target_bg
  });


  var swBound = new google.maps.LatLng(51.94766868098161, -2.4038683398437115);
  var neBound = new google.maps.LatLng(53.18847858272043, 0.009876777343720278);
  var area_bounds = new google.maps.LatLngBounds(swBound, neBound);

  var srcImage = 'assets/images/map-overlay-3.png'; //'https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png';

  // The custom GameOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  overlay = new GameOverlay(area_bounds, srcImage, map);

  rectangle.setMap(map);

  // Add an event listener on the rectangle.
  google.maps.event.addListener(rectangle, 'bounds_changed', showNewRect);

  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();
}


/** @constructor */
function GameOverlay(bounds, image, map) {
  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
GameOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

GameOverlay.prototype.draw = function() {
  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
GameOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};


//-----
// google.maps.event.addDomListener(window, 'load', initializeCustom);


function cardRotate() {
   var c_index;
   var a_delay = 500;
   $('.factions .card').on("click", function() {
      //reset
      // $('.active .card__txt').removeClass('show');

//check if card is rotated
      if ($(this).hasClass('active')) {
         $(this).removeClass('active');
         $(this).find('.card__txt').removeClass('show');
         $(this).addClass('card-' + $(this).index());

         c_index = '.card-' + $(this).index()+' .card__pic'; //pass the value for timed function call

         setTimeout(function() {
            $(c_index ).removeClass('card-rotate');
         }, a_delay);
      }
      else {
         // $('.factions .card').removeClass('active');
         // $('.card__pic').removeClass('card-rotate');
         $(this).find('.card__pic').addClass('card-rotate');
         $(this).addClass('active');

         setTimeout(function() {
            $('.active .card__txt').addClass('show');
         }, a_delay);
      }
   });

   $('.factions .btn').on("click", function() {
      $(this).prop('disabled', true);
      usr_faction = $(this).attr('data-faction');


      $('.factions').fadeOut(200);
      setTimeout(function() {
         $('.game').css('display','block');
         startUp();
      }, a_delay);
   });
}
