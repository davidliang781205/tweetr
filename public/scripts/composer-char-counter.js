$(document).ready(function() {
  const charLimit = 140;
  $('.new-tweet textarea').on('input', function() {
    let $length = $(this).val().length;
    let $charCount = $(this).siblings('span');
    $length = charLimit - $length;
    if ($length < 0) {
      $charCount.css("color", "red");
    } else {
      $charCount.css("color", "#244751");
    }
    $charCount.text($length);
  });
});