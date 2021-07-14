//global vars
var p_count;
var usr_faction;  //= 'empire';
var intro_delay = 2000;
var dialog_duration = 1000;
var disable_intro = false; //for browsers with issues...
var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(52.8227, -0.83557),
    new google.maps.LatLng(52.8627, -0.73557)
   // new google.maps.LatLng(52.8227, -0.83557),
   //    new google.maps.LatLng(52.9227, -0.63557)
);
var img_folder = 'assets/images/';
var faction_id = 0;

var dmg_icon = 'icon-rebel.png';

var z_bounds = new google.maps.LatLngBounds( //this is the target  that we try to hit
   //  new google.maps.LatLng(52.792814874283955, -1.2063585742187115),
   //  new google.maps.LatLng(52.83284238573486, -1.1063585742188025)
    new google.maps.LatLng(t_lat_sw, t_lng_sw),
    new google.maps.LatLng(t_lat_ne, t_lng_ne)
);

function testCss3(){
   var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
   var isFirefox = typeof InstallTrigger !== 'undefined';
   var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
   if (isSafari == true || isIE == true /*|| isFirefox == true*/) {
      disable_intro = true;
   }
   if (isFirefox == true) { //firefox button disable glitch, fix:
      $('.card .btn, #pause, #show-map, #fire').prop('disabled', false);
   }
}

$(document).ready(function() {
   playerSelect();
   testCss3(); //check if we can play intro animation
   // disable_intro = true; //for testing

   instructionModal();
   splashScreen();
   cardRotate(); //2player version
   helperFunctions(); //helpScreen logic, etc

   resetGame(); //for play again functionality
   activateDebug(); //for testing
});

function instructionModal() {
   $('#btn_instructions').on("click",function(){
      $('.modal--instructions').fadeIn(500);
   });
   $('.modal--instructions').on("click",function(){
      $(this).fadeOut(500);
   });
}
function playerSelect() {
   $('.start-menu .btn--p').on("click",function(){
      //reset
      $('.selected-btn').removeClass('selected-btn');
      $(this).addClass('selected-btn');
   });
}
function splashScreen() {
   $('#start').on("click",function(){
//store player count
   p_count = $('.selected-btn').text();


      $('.start-menu').fadeOut(50);
//check if css3 supported
      if (disable_intro == true) {
         // $('body').removeClass('splash--animate').toggleClass('game--ready');
         // $('.factions').fadeIn(800);

         $('body').addClass('splash--static');
         playAudio('sw-mood.mp3', 'play', 'splash');
         setTimeout(function() {
            $('body').removeClass('splash--static').toggleClass('game--ready');
            $('.factions').fadeIn(800);
         }, 16000);
      }
      else {
         $('body').addClass('splash--animate');
         playAudio('sw-mood.mp3', 'play', 'splash');
         setTimeout(function() {
            $('body').removeClass('splash--animate').toggleClass('game--ready');
            $('.factions').fadeIn(800);
         }, 16000);
      }
   });
}

//calculates distance between two points in km's
function calcDistance(p1, p2){
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}



function fireTargetLogic() {
   var r_shot = 0;
   $('#fire').on("click", function() {
      defaultCoordinates(); //if user hasn't moved the rectangle from default location
      // $('#fire').prop('disabled', true); //disable after 1st shot
      $('.txt--empire').text('');
      $('.txt--rebel').text('');
      var dmg_sw = new google.maps.LatLng($('#sw_lat').text(), $('#sw_lng').text());
      var dmg_ne = new google.maps.LatLng($('#ne_lat').text(), $('#ne_lng').text());

      var dmg_bound = new google.maps.LatLngBounds(dmg_sw, dmg_ne);
      var dmg_overlay =  new GameOverlay(dmg_bound, img_folder + dmg_icon, map);

      dialogLogic();

      //push to array
      var map_icon = '';
      var s_lat =[$('#ne_lat').text(), $('#ne_lng').text(), $('#sw_lat').text(), $('#sw_lng').text(), usr_faction, map_icon];
      var sound_file_search = 'search-1.mp3';

      if (usr_faction == 'rebel') {
         //check that game hasn't ended
         if (dmg_bound.contains(z_bounds.getCenter()) != true) {
            //--target distance calculation:
            a_target = dmg_bound.getCenter(); //get epicentre of target area_bounds
            b_target = z_bounds.getCenter(); //get target epicenter
            //15km > really close
            //20km > 15 close
            //30km > 20 medium
            var off_target = calcDistance(a_target, b_target);
            var txt_distance;

            //feedback
            if (off_target > 50) {
               $('.txt--rebel').html('You were far away from target!');
               map_icon = 'icon-rebel-alt.png';
               sound_file_search = 'search-1.mp3';
            }

            else if (off_target < 50 && off_target > 31) {
               $('.txt--rebel').html('Base detected somewhere...');
               map_icon = 'icon-rebel-close.png';
               sound_file_search = 'search-2.mp3';
            }
            else if (off_target < 31) {
               $('.txt--rebel').html('Base detected nearby');
               map_icon = 'icon-rebel-range-1.png';
               sound_file_search = 'search-2.mp3'
            }

            playAudio(sound_file_search, 'play', 'search');
            setTimeout(function() {
               $('.dialog--rebel').fadeIn(400);
            }, dialog_duration+200);

            setTimeout(function() {
               $('.dialog--rebel').fadeOut(400);
            }, dialog_duration*2.5);

            pOneData.push(
               [$('#ne_lat').text(), $('#ne_lng').text(), $('#sw_lat').text(), $('#sw_lng').text(), usr_faction, map_icon]
            ); //store data

         }


         if (r_shot==1) {
            $('#fire').prop('disabled', true); //disable after 2nd shot
            r_shot = 0;
            $('#switch').prop('disabled', false);
         }
         else {
            r_shot++;
         }
         // pOneData.push(s_lat); //store data
      }
      else if (usr_faction == 'empire') {

         $('#fire').prop('disabled', true); //disable after 1st shot
         //pTwoData.push(s_lat); //push data to array (used to track previous tries)

         //check that game hasn't ended
         if (dmg_bound.contains(z_bounds.getCenter()) != true) {
            //--target distance calculation:
            a_target = dmg_bound.getCenter(); //get epicentre of target area_bounds
            b_target = z_bounds.getCenter(); //get target epicenter
            //15km > really close
            //20km > 15 close
            //30km > 20 medium
            var off_target = calcDistance(a_target, b_target);
            var txt_distance;

            if (off_target <31) {
               sound_file_search = 'search-2.mp3';
               if (off_target < 16) {
                  txt_distance = 'Base detected';
                  map_icon = 'icon-empire-range-1.png';
               }
               else if (off_target > 15 && off_target < 22) {
                  txt_distance = 'Base sensed nearby';
                  map_icon = 'icon-empire-range-2.png';
               }
               else if (off_target > 22 && off_target < 31) {
                  txt_distance = 'Medium distance to base';
                  map_icon = 'icon-empire-range-3.png';
               }
               //give feedback how far we were off the target
               $('.txt--empire').text(
                  // off_target + ' | ' +
                  txt_distance
               );

            }
            else {
               sound_file_search = 'search-1.mp3';
               $('.txt--empire').html('Error... <br/><br/>Too far from target!');
               map_icon = 'icon-empire-alt.png';
            }
            playAudio(sound_file_search, 'play', 'search');
            setTimeout(function() {
               $('.dialog--empire').fadeIn(400);
            }, dialog_duration+200);

            setTimeout(function() {
               $('.dialog--empire').fadeOut(400);
            }, dialog_duration*2.5);

            pTwoData.push(
               [$('#ne_lat').text(), $('#ne_lng').text(), $('#sw_lat').text(), $('#sw_lng').text(), usr_faction, map_icon]
            );
         }
         $('#switch').prop('disabled', false);
      }

      //----tracker test
      var z_center = z_bounds.getCenter();

      var z = dmg_bound.contains(z_center);
      if(z == true) {
         endGame();
      }
   });
}

function endGame() { //faction
   $('body').addClass('game-ended');
   try {
      introMusic('stop');
   }
   catch(e) {

   }
   //to get score use pOneData() & pTwoData().length
   if (usr_faction == 'rebel') {
      $('.stat-rebel').text('With: ' + (pOneData.length+1) + ' moves');
      playAudio('win-rebel.mp3', 'play', 'win');
   }
   else {
      $('.stat-empire').text('With: ' + (pTwoData.length+1) + ' moves');
      playAudio('win-empire.mp3', 'play', 'win');
   }

   $('.card__'+usr_faction).addClass('block');
   setTimeout(function() {
      $('.card__'+usr_faction).addClass('show');
      $('#show-map').addClass('show');
   }, 900);



   $('.card__'+usr_faction).removeClass('block').removeClass('show');
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
   $('.intro').css('display','none');// .remove();
   $('.game, .dbg-info').addClass('visible');
}

function startUp() {
   setTimeout(function() {
      $('.intro').fadeOut(intro_delay);
   }, 800);
   setTimeout(function() {
      $('.game').addClass('visible');
   },intro_delay);

   //generate random intro pic
   var active_pic = Math.floor((Math.random() * 4) + 0);
   $('.intro img:eq('+active_pic+')').addClass('active-pic');
   setColorElements(usr_faction);

   //fixes set user faction from start screen
   if (usr_faction == 'rebel') {
      dmg_icon = 'icon-rebel.png'; //assign marker(s) pic
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

      $('#help-info').removeClass('hidden');
   }

   fireTargetLogic();
   initializeCustom(true);
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


   if (debug_mode == true) {
      var base_overlay =  new GameOverlay(z_bounds, img_folder+'/base-4.png', map); //target
   }

   var prev_dmg;
   if (f == 'rebel') {
      dmg_icon = 'icon-rebel.png';
      //get array length and loop all the markers to the map
      for (x=0; x<pOneData.length; x++) {
         prev_dmg = new google.maps.LatLngBounds(
            new google.maps.LatLng(pOneData[x][2],pOneData[x][3]),
            new google.maps.LatLng(pOneData[x][0],pOneData[x][1])
         );
         prev_dmg =  new GameOverlay(prev_dmg, img_folder+pOneData[x][5] , map); //dynamic
      }
   }
   else if (f == 'empire') {
      dmg_icon = 'icon-empire.png';
      // for (x=0; x<pOneData.length; x++) {
      for (x=0; x<pTwoData.length; x++) {
         prev_dmg = new google.maps.LatLngBounds(
            new google.maps.LatLng(pTwoData[x][2],pTwoData[x][3]),
            new google.maps.LatLng(pTwoData[x][0],pTwoData[x][1])
         );
         prev_dmg =  new GameOverlay(prev_dmg, img_folder+pTwoData[x][5] , map); //dynamic
      }
   }
}

$('#switch').on("click", function() { //end turn function
//pause screen
   pauseScreen();

   $('#fire').prop('disabled', false);
   //check if 1p or 2p mode
   if (parseInt(p_count) == 1) { //single player logic
      singlePlayerLogic();
   }
   else { //2player OOTB logic
      if (usr_faction == 'rebel') {
         usr_faction = 'empire';
         dmg_icon = 'icon-empire.png';
         bounds = new google.maps.LatLngBounds(
             new google.maps.LatLng(52.8227, -0.83557),
             new google.maps.LatLng(52.9227, -0.63557)
         );

         faction_id = 1;
         $('#help-info').removeClass('hidden');
      }
      else {
         usr_faction = 'rebel';
         dmg_icon = 'icon-rebel.png'; //previous marker(s) pic
         bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(52.8227, -0.83557),
            new google.maps.LatLng(52.8627, -0.73557)
         );

         faction_id = 0;
         $('#help-info').addClass('hidden');
      }
   }


   setColorElements(usr_faction);
   initializeCustom(true);


   var dmg_bound = new google.maps.LatLngBounds(
      new google.maps.LatLng(mapData[faction_id][0],mapData[faction_id][1]), //ne
      new google.maps.LatLng(mapData[faction_id][2],mapData[faction_id][3]) //sw

      // mapData[0][1], mapData[0][0]
   );
   var dmg_overlay =  new GameOverlay(dmg_bound, img_folder + dmg_icon, map);
   // initializeCustom();
   try { //error handling when no prev markers exist..
      insertMarkers(usr_faction); //insert previous markers
   }
   catch(e) {
      alert(e);
   }

});

function singlePlayerLogic() {
   if (usr_faction == 'rebel') {
      dmg_icon = 'icon-rebel.png'; //previous marker(s) pic
      bounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(52.8227, -0.83557),
         new google.maps.LatLng(52.8627, -0.73557)
      );

      faction_id = 0;
      $('#help-info').addClass('hidden');
   }
   else {
      dmg_icon = 'icon-empire.png';
      bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(52.8227, -0.83557),
          new google.maps.LatLng(52.9227, -0.63557)
      );

      faction_id = 1;
      $('#help-info').removeClass('hidden');
   }
}


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
   else if (faction=="neutral") {
      color_map_water = '#5a7abb'; // '#0f54a2'; // { color: '#5d0e6b' }
      color_map_terrain = '#60a15e'; //'#038900';  // { hue: '#ca052f' },
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

function initializeCustom(show_rectangle) {
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


   var center_coordinates; //after game has ended, center the map on the target
   if (show_rectangle == false) {
      center_coordinates = z_bounds.getCenter();
   }
   else {
      center_coordinates = new google.maps.LatLng(52.9227, -0.83557);
   }
  var mapOptions = {
   //  center: new google.maps.LatLng(44.5452, -78.5389),
   //endgame, center on target

   //center: new google.maps.LatLng(52.9227, -0.83557),
   center: center_coordinates,
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

  var srcImage = img_folder+'map-overlay-3.png';

  // The custom GameOverlay object contains the image,
  // the bounds of the image, and a reference to the map.
  overlay = new GameOverlay(area_bounds, srcImage, map);

  if (show_rectangle != false) {
     rectangle.setMap(map);
     // Add an event listener on the rectangle.
     google.maps.event.addListener(rectangle, 'bounds_changed', showNewRect);

     // Define an info window on the map.
     infoWindow = new google.maps.InfoWindow();
  }
  $('#switch').prop('disabled', true);
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
   // resetGame(); //reset logic
   var c_index;
   var a_delay = 500;
   $('.factions .card').on("click", function() {
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
         $(this).find('.card__pic').addClass('card-rotate');
         $(this).addClass('active');

         setTimeout(function() {
            $('.active .card__txt').addClass('show');
         }, a_delay);
      }
   });

   $('.factions .btn').on("click", function() { //start game
      introMusic('play');
      $('#splash').addClass('toggled'); // .css('display','none'); //.remove(); //remove splash screen from DOM
      // $(this).prop('disabled', true);
      usr_faction = $(this).attr('data-faction');
      $('.factions').fadeOut(200);
      // audioLogic(); //play sound at start of the game

      setTimeout(function() {
         $('.game').css('display','block');
         startUp();
      }, a_delay);
   });
}

function pauseScreen() {
   $('.pause__screen').fadeIn(10);
   $('#pause').on("click", function() {
      // if (audio_on == true) {
      //    bgAudio('intro.mp3', 'play', 'intro');
      // }
      $('.pause__screen').fadeOut(800);
   });
}

function helperFunctions() { //? window for empire, display map at end of the game, music on/off
   $('#help-info').on("click", function() {
      $('.info__empire').toggle(500);
   });
   $('#show-map').on("click", function() {
      drawAllMarkers(); //new end screen
      $('body').removeClass('game-ended');
      $('.game button').addClass('hidden');
      //$('#switch').removeClass('hidden').prop('disabled', false);
      //load map with both faction markers + base on it

      $('#play-again').addClass('show');
   });
}

function drawAllMarkers() {
   setColorElements('neutral');
   initializeCustom(false);
   //dmg_icon = 'icon-rebel.png';
   //get array length and loop all the markers to the map
   var search_marker;
   // var search_marker2;

   for (x=0; x<pOneData.length; x++) {
      search_marker = new google.maps.LatLngBounds(
         new google.maps.LatLng(pOneData[x][2],pOneData[x][3]),
         new google.maps.LatLng(pOneData[x][0],pOneData[x][1])
      );
      search_marker =  new GameOverlay(search_marker, img_folder+pOneData[x][5] , map); //dynamic
   }
   for (x=0; x<pTwoData.length; x++) {
      search_marker = new google.maps.LatLngBounds(
         new google.maps.LatLng(pTwoData[x][2],pTwoData[x][3]),
         new google.maps.LatLng(pTwoData[x][0],pTwoData[x][1])
      );
      search_marker =  new GameOverlay(search_marker, img_folder+pTwoData[x][5] , map); //dynamic
   }
   var base_overlay =  new GameOverlay(z_bounds, img_folder+'/base-4.png', map); //target
}


function resetGame() {
   $('#play-again').on("click", function(){
      location.reload();
      // //reset data
      // pOneData.splice(0, pOneData.length);
      // pTwoData.splice(0, pTwoData.length);
      // alert(pOneData);
      // alert(pTwoData);
      //
      //
      //
      //    // pOneData.length = 0; // .length = 0;  //[];
      //    // pTwoData.length = 0; //[];
      //
      //
      // //reset faction select
      // faction_id = 0;
      //
      // //get new target
      // t_lat_ne = giveRandomLocation(min_lat_ne, max_lat_ne);
      // t_lng_ne = giveRandomLocation(min_lng_ne, max_lng_ne);
      //
      //
      // $('.factions .card').removeClass('active');
      // $('.factions .show').removeClass('show');
      // $('.factions .card-rotate').removeClass('card-rotate');
      //
      // $('.game').removeClass('visible').css('display','none');
      // $('#show-map, #play-again').removeClass('show');
      // $('#fire, #switch').prop('disabled', false).removeClass('hidden');
      // $('#splash').removeClass('toggled');
      // $('.dialog__endgame .show').removeClass('show');
      // //display intro
      // $('body').removeClass('game--ready');
      // var disable_intro = false;
      // $('.start-menu').fadeIn(300);
      // $('.factions').fadeIn(300);

      // alert(pOneData);
      //render buttons
      //--need to reset x has won the game end screen for 2nd run..
   });
}
