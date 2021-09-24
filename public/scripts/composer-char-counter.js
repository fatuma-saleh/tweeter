$(document).ready(function () {

  $("#tweet-text").on('keyup', function () {

    const characterLength = 140 - $(this).val().length;
    let $form = $(this).closest('form');
    let $counter = $form.find('.counter')
    $counter.html(characterLength);
    /* add a class named red  when counter < 0 */

    if (characterLength < 0) {
      $counter.css('color', 'red')
    } else {
      $counter.css('color', 'gray')
    }
  });

});


