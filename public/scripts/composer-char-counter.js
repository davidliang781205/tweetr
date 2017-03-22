$(document).ready(function() {
  $('.new-tweet textarea').on("keyup", function() {
    var length = $(this).val().length;
    length = 140 - length;
    if (length < 0) {
      $(this).siblings('span').css("color", "red");
    } else {
      $(this).siblings('span').css("color", "#244751");
    }
    $(this).siblings('span').text(length);
  });
});