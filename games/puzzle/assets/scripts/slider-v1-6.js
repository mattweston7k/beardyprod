var solved = false; //global var for game state
var usr_click = 0;

$(document).ready(function() {
   $('.score__val').text('');
   // generateSlides('debug'); //use 'debug' for dev
   generateSlides();
   $('#reset').attr('disabled','disabled');
   startGame();
   help();
   resetGame();

   btnLogic();
});

function startGame() {

   $('#play').on("click", function() {

      $('#play').fadeOut(500);
      $('.shader').slideToggle(800);
      // testGame(); //used for debugging
      switchSlides(); //shuffled slides
   });
   moveSlide();
}


function testGame() {
   $('.slide[data--slide-index="8"]').attr('data--slide-loc','9').removeClass('slide-8').addClass('slide-9');
   $('.slide[data--slide-index="9"]').attr('data--slide-loc','8').removeClass('slide-9').addClass('slide-8');
}


function switchSlides() {
   //switch first 2 tiles
   $('.slide[data--slide-index="1"]').attr('data--slide-loc','2').removeClass('slide-1').addClass('slide-2');
   $('.slide[data--slide-index="2"]').attr('data--slide-loc','1').removeClass('slide-2').addClass('slide-1');
   //random generate others
   var arr = [3,4,5,6,7,8]; //switch order for slides 3-8
   fischerYates(arr);

   //loop objects
   n = 2; //we have already switched the first 2 objects manually above
   for (x=0; x< arr.length; x++) {
      n++;
      //replace item
      $('.slide[data--slide-index="' +n+ '"]').attr('data--slide-loc', arr[x]).removeClass('slide-'+n).addClass('slide-' +arr[x]);

   }
}



function fischerYates(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}



function generateSlides(gmode) {
   var max = 8;
   for (x=0; x < max; x++) {
      $('#slides__container').append(
         '<div data--slide-index="'+(x+1)+'" ' +'data--slide-loc="' +(x+1)+ '" class="slide slide-' +(x+1)+ '"></div>'
      );
   }
   //--empty slide container
   $('#slides__container').append('<div data--slide-index="9" data--slide-loc="9" class="slide slide-9"></div> ');
   //generate empty slide
   if (gmode == 'debug') {
      $('#slides__container .slide[data--slide-index="8"]').addClass('slide-blank');
   }
   else {
      $('#slides__container .slide[data--slide-index="9"]').addClass('slide-blank');
   }
}


function moveSlide() {
   $('.slide').each(function() {
      $(this).on("click",function() {
         //add amount of usrClick

         if (solved != true) {
            //get blank location, then fetch value from array
            var blank_loc = $('#slides__container .slide-blank').attr('data--slide-index'); //used for grid movement logic
            //get clicked item val
             var clicked_item = $(this).attr('data--slide-index'); //1-9
             var clicked_item_pos = '.slide-' + $(this).attr('data--slide-loc');

            // //get amount of slides that can move
            var movable_items = itemArr[blank_loc][3].length;
            var moved = false;
            var d; //used to store move direction

      //check if this item has already been moved, dta-new-loc="slide-x"
      //get slides__grid slide-blank and match it with data-new-loc
            for (var i=0; i<movable_items; i++) {
               if (clicked_item == itemArr[blank_loc][3][i]) {
                  moved = true; //set flag so we can move the element
                  d = i;
               }
               else {
               }
            }

            if (moved == true) { //move element.

               //assing previous slide blank location
               //do highlight animation
                $(this).addClass('highlight ' +itemArr[blank_loc][4][d] );

                var s_old = $(this).attr('data--slide-loc');
                var s_new = $('.slide-blank').attr('data--slide-loc'); //slide blank moved to new location
                var $this = $(this); //pass jquery variable to be executed on timeout function

               function showIllusion() {
                  var removable_classes = 'slide-1 slide-2 slide-3 slide-4 slide-5 slide-6 slide-7 slide-8 slide-9 highlight move-up move-right move-down move-left';
                  $('.slide-blank').attr('data--slide-loc', s_old); //where we have clicked
                  $('.slide-blank').removeClass(removable_classes); //only needs slide classes removed..

                  $('.slide-blank').addClass('slide-'+s_old);

                  $($this).attr('data--slide-loc',s_new); //where the empty slide was
                  $($this).removeClass(removable_classes);

                  //set this as blank slide
                  $('.slide-blank').removeClass('slide-blank');
                  $($this).addClass('slide-blank');
                  evaluateResult();

                  // max_score - (click*sxp)
                  $('.score__val').text(
                     scoreLogic()
                     // max_score-(usr_click*sxp)
                  );


               }
               setTimeout(showIllusion, 400); //value has to be = +1 ms for sass variable $seconds

            }
            else{
               //function call when user clicks invalid slide
            }
         }
      });

   });

}

function evaluateResult() {
   //logic for endgame, check if slide index = location on ALL of the elements
   //check if solved, loop every slide and compare slide id = loc


   var csum = 0;
   for (i=0; i<$('#slides__container .slide').size()-1; i++) {

      //loop every element

      if ($('.slide:eq('+i+')').attr('data--slide-loc') == $('.slide:eq('+i+')').attr('data--slide-index')) {
         csum++;
      }
      else {
      }

   }
   if (csum==8) { //amount of correct answers
      $('#slides__container').toggleClass('complete');
      $('.dialog').addClass('active');
      $('.dialog #dialog__close').on("click", function() {
         var ok = true; //filter var
         var to_filter = $('#usr_name').val();
         //check filtered words
         for (w=0; w < wordsArray.length; w++) {
            if ( to_filter.search(wordsArray[w]) != -1) { //wordsArray[w]
               ok = false; //set flag for filter
               alert('Please change your name to something more family friendly!');
            }
         }

         if (ok != false) { //no words found on filter list, continue..
            if (solved == false ) {
               $('.dialog').removeClass('active');
               //check if value = rude
               writeToJson();
               solved = true;
               $('#reset').removeAttr('disabled');
               showScoreList(); //display scorelist
               $('#read').text('Hide high scores').addClass('btn--alt'); //set text to hide scorelist
            }
            else {
            }

            $('.shader').fadeIn(300);
            return solved;
         }

      });
   }
}

function scoreLogic() {
   usr_click+=1;
   return usr_click;
}

function help() {
   $('#help').on("click",function() {
      $('.help__window').toggle(500);
   });
}

function resetGame() {
   $('#reset').on("click", function() {
      $('#reset').toggleClass('active').attr('disabled','disabled');
      switchSlides(); //to run full version

      $('#slides__container').removeClass('complete');
      $('.shader').fadeOut(500);
      $('.score__val').text(''); //reset moves text field (for user)

      usr_click = 0;
      solved = false;
      return solved, usr_click;
   });
}
