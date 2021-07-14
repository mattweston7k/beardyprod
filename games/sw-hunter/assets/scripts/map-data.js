var mapData = [
   //NE lat lng, SW lat lng
//set targeting rectangle size and postion for each faction
   [52.87430574946152, -0.7190905078125525, 52.83431644618604, -0.8190905078124615, "rebel"],
   [ 53.104465226296846,-1.3496813281250297,53.004885265784004,-1.5496813281249615, 'imperial' ]
];

var mapDataP = [
   [52.92235364149394, -1.2217150195313025, 'rebel']
];

var pOneData = [];
var pTwoData = [];

var debug_mode = false;

function activateDebug(){
   $('.debug_func').fadeIn(500);
   $('#dbg_mode').on("click", function(){
      debug_mode = true;
   });
}

var max_lat_ne = 53.184842781988564;
var max_lng_ne = -0.0022325976563024597;
var min_lat_ne = 51.99185235385825;
var min_lng_ne = -2.2956285937500525;

var sw_lng = 0.1; //differential
var sw_lat = 0.03970248; //differential


var t_lat_ne = giveRandomLocation(min_lat_ne, max_lat_ne);
var t_lng_ne = giveRandomLocation(min_lng_ne, max_lng_ne);

var t_lat_sw = t_lat_ne - sw_lat;
var t_lng_sw = t_lng_ne - sw_lng;

function giveRandomLocation(min, max) {
   return Math.random() * (max - min) + min;
}
