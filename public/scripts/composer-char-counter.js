$(document).ready(function() {
  //console.log("callbackkkk")
  $("#tweet-text").on('keyup', function() {
    //console.log($(this).val().length); 
    const characterLength = 140 - $(this).val().length;
    console.log($(this).val().length);
    let $form    = $(this).closest('form');
    // console.log($form);
    let $counter = $form.find('.counter')
   // console.log($counter)
    $counter.html(characterLength);
    /* add a class named red  when counter < 0 */
      
    if (characterLength < 0){
      // $counter.addClass('red')
      $counter.css('color','red')
    }else{
      $counter.css('color','gray')
    }
  });

});


