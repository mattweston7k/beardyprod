//main.js

sliderLogic();
var answer = randomRange();
$('#sweet_val').text(answer);

function sliderLogic() {
   //$('.btn__range').val();
var offset = 5;
var close_number = 11;


   $('.btn__range').change(function() {
      debugUse(); //remove when done testing

      //get val 100
      var rotation_val = parseInt($('.btn__range').val()); //$('.btn__range').val()*36;
      rotation_val+=offset;
      //rotate image object

      if ($('.btn__range').val() > 0) {
         $('.dynamic-bg .center-block').css('transform', 'rotate(-' +rotation_val+ 'deg)');
      }
      else {
         $('.dynamic-bg .center-block').css('transform', 'rotate(0deg)');
      }

      //check if we are getting closer to sweet spot
      if ($('.btn__range').val()==answer) {
         $('#slider_val').addClass('answer__correct');
         $('.btn__range').addClass('locked').prop('disabled', true);
      }
//check if number is below or above the correct value with offset of X (defined in variable: close_number)
      else if( $('.btn__range').val() < answer && $('.btn__range').val() > answer-close_number || $('.btn__range').val() > answer && $('.btn__range').val() < answer+close_number ) {
         $('#slider_val').addClass('answer__close');
      }
      else {
         $('#slider_val').removeClass('answer__close answer__correct');
      }

   });
}

//
//
function randomRange() {
   // var sweet_val = Math.floor((Math.random() *100) + 1);
   // return sweet_val;
   return Math.floor((Math.random() *100) + 1);
}

function debugUse() {
   $('#slider_val').text(
      $('.btn__range').val()
   );
}
