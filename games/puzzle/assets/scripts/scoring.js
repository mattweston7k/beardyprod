var pname = 'puzzle_scores'; //localStorage key, used to store scores
var ckey = 'puzzle_current';
var btn_status = true; //score button status
//storing json object: JSON.stringify()
//laoding json object: JSON.parse() -> converts to [objects]

var test_json = [
   { "usrname":"Test user 1", "score":"10", "date": "1433714526402" },
    { "usrname":"Test user 2", "score":"40", "date": "1433454426402" },
    { "usrname":"Test user 3","score": "35", "date": "1433754626402" },
    { "usrname":"Test user 4","score": "8", "date": "1433754626402" }
];




$('#load').on('click',function() { //generate default scorelist
   try {
      localStorage.setItem(pname, JSON.stringify(test_json));
      // $('body').append('<h4>default scorelist generated..</h4>');
   }
   catch(e) {
      alert(e);
   }
});


function showScore() {
   var r = localStorage.getItem(pname);
   if (r != null) {   //check if score exists
      var jo = JSON.parse(localStorage.getItem(pname));
      //sort array
      jo.sort(function(a, b){
         return a.score-b.score;
      });

      $('#scorelist .list').html(''); //reset
      $('#scorelist').fadeOut(300);
      //generete header
      $('#scorelist .list').prepend(
      '<li class="row__scoretable">' +
         '<div class="score__field field--name field--header float--left">Name</div><div class="score__field field--header text-center float--left">Moves</div><div class="score__field field--header float--right">Date</div>' +
      '</li>'
      );
      //render highscore dom
      // for (x=0; x<jo.length; x++) { //set limiter
      for (x=0; x<jo.length; x++) {
         // if (x<3) { //set limiter
            $('#scorelist .list').append(
               '<li class="row__scoretable">' +
                  '<div class="score__field field--name float--left">' + jo[x]['usrname'] +'</div>' +
                  '<div class="score__field text-center text-b float--left">'+jo[x]['score'] + '</div>' +
                  '<div class="score__field float--right field--date">' +
                     getTime(parseFloat(jo[x]['date'])) + '</div>' +
               '</li>'
            );
         // }
      }

      $('#scorelist').fadeIn(800);
   }
   else if (r == null ) { //no data
      // $('body').append('<h4>No data...</h4>');
   }

}


function writeToJson() {
   var r = localStorage.getItem(pname);
   var tnow = Date.now(); //get UTC now
   if (r != null) {   //check if score exists
      var jo = JSON.parse(r); //fetch existing scores array
      jo.push( { "usrname":$('#usr_name').val(), "score":$('.score__val').text(), "date": tnow } ); //push current value to existing scorelist array
      localStorage.setItem(ckey, tnow);
      localStorage.setItem(pname, JSON.stringify(jo));
      // alert('added to previous score');
   }
   else if (r == null) {
      // alert('was empty');
      var score_json = [ //create new array for scores
         { "usrname":$('#usr_name').val(), "score":$('.score__val').text(), "date": tnow }
      ];
      localStorage.setItem(pname, JSON.stringify(score_json));
   }
   //write to localStorage:
   // localStorage.setItem(pname, JSON.stringify(jo));


   //display reset button
   $('#reset').toggleClass('active');
}


$('#read').on('click',function() {
   if (localStorage.getItem(pname) == null ) { //no data
      alert('No high scores');
   }
   else {
      $(this).toggleClass('btn--alt');
      try {
         localStorage.removeItem(ckey); //remove
      }
      catch(e) {
      }
      if ($(this).hasClass('btn--alt')) {
         $(this).text('Hide high scores');
         showScoreList(true);
      }
      else {
         $(this).text('Show high scores');
         $('#scorelist').fadeOut(100);
      }
   }

});


function showScoreList(limit_list) { //filter val
   var r = localStorage.getItem(pname);
   if (r != null) {   //check if score exists
      var jo = JSON.parse(localStorage.getItem(pname));
      //sort array
      jo.sort(function(a, b){
         return a.score-b.score;
      });

      $('#scorelist .list').html(''); //reset
      $('#scorelist').fadeOut(300);
      //generete header
      $('#scorelist .list').prepend(
      '<li class="row__scoretable">' +
         '<div class="score__field field--name field--header float--left">Name</div><div class="score__field field--header text-center float--left">Moves</div><div class="score__field field--header float--right">Date</div>' +
      '</li>'
      );
      //render highscore dom

      //check if more than x
      var limiter = jo.length; //limiter


      if (limit_list == true && jo.length > 10) {
         limiter = 10; //max items displayed
      }


      for (x=0; x<limiter; x++) {
         if ( localStorage.getItem(ckey) == jo[x]['date'] && limit_list != true ) {
            $('#scorelist .list').append(
               '<li class="row__scoretable current">' +
                  '<div class="score__field field--name float--left">' + parseInt(x+1) +') ' + jo[x]['usrname'] +'</div>' +
                  '<div class="score__field text-center text-b float--left">'+jo[x]['score'] + '</div>' +
                  '<div class="score__field float--right field--date">' +
                     getTime(parseFloat(jo[x]['date'])) + '</div>' +
               '</li>'
            );
         }
         else {
            $('#scorelist .list').append(
               '<li class="row__scoretable">' +
                  '<div class="score__field field--name float--left">'+ parseInt(x+1)  +') '  + jo[x]['usrname'] +'</div>' +
                  '<div class="score__field text-center text-b float--left">'+jo[x]['score'] + '</div>' +
                  '<div class="score__field float--right field--date">' +
                     getTime(parseFloat(jo[x]['date'])) + '</div>' +
               '</li>'
            );

         }
      }

      if (limit_list == true && jo.length > limiter) {
         $('#scorelist .btn--expand').removeClass('js-toggled');
      }
      $('#scorelist').fadeIn(800);
   }
}


function btnLogic() {
   $('#scorelist .btn--expand').on("click", function() {
      $('#scorelist .btn--expand').addClass('js-toggled');
      showScoreList();
   });
}


$('#clear').on('click',function() { //delete localStorage data for key
   try {
      localStorage.removeItem(pname); //pname //delete data
      localStorage.removeItem(ckey); //pname //delete data
      $('#scorelist').fadeOut(300);
      $('#read').text('Show high scores').removeClass('btn--alt'); //set text to hide scorelist
   }
   catch(e) {
      alert(e);
   }
});

function getTime(v) { //get time as UTC and convert it to: dd/mm/yyyy
	Number.prototype.padLeft = function(base,chr){
		var  len = (String(base || 10).length - String(this).length)+1;
		return len > 0? new Array(len).join(chr || '0')+this : this;
	}
	var d = new Date(v);

	d = [
		d.getDate().padLeft(),
		(d.getMonth()+1).padLeft(),
		d.getFullYear()].join('/');
	return d;
}

function dateToUtc(dv) { //takes date value
	var myDate = dv;
	myDate=myDate.split("-");
	var newDate = myDate[1]+"/"+myDate[2]+"/"+myDate[0];
	return new Date(newDate).getTime();
}
