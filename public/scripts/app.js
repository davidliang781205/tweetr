/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

function createTweetElement(data) {
  let avatar = data['user']['avatars']['small'];
  let username = data['user']['name'];
  let handle = data['user']['handle'];
  let content = data['content']['text'];
  let timeCreated = timeSince(data['created_at']);
  let tweetContainer = $('.tweet');

  // Create article tag for tweet
  let $tweet = $('<article>').addClass('tweet');

  // Create header area for tweet
  let $header = $('<header>');
  $header.append($('<div>').addClass('avatar').append($('<img>').addClass('avatar-img').attr('src', escape(avatar))));
  let $headerText = $('<div>').addClass('header-text');
  $headerText.append($('<div>').addClass('username').text(escape(username))).append($('<div>').addClass('handle').text(escape(handle)));
  $header.append($headerText);

  // Create main content area for tweet
  let $body = $('<div>').addClass('tweet-body').text(escape(content));

  // Create footer area for tweet
  let $footer = $('<footer>');
  $footer.append($('<div>').addClass('footer-left').text(escape(timeCreated)));
  let $icons = $('<div>').addClass('footer-icons');
  ['flag', 'retweet', 'heart'].forEach(function(item) {
    $icons.append($('<i>').addClass("fa").addClass("fa-" + item));
  });
  $footer.append($icons);

  // Append to article
  $tweet.append($header).append($body).append($footer);

  return $tweet;
}

function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (var i in tweets) {
    $('#tweets-container').prepend(createTweetElement(tweets[i]));
  }
}

function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  }).done(function(tweets) {
    renderTweets(tweets);
  });
}

// Document load jQuery
$(function() {
  loadTweets();

  $('.compose-button').click(() => {
    $('.new-tweet').fadeToggle();
    $('.new-tweet').find('textarea').focus();
  });

  $('.new-tweet form').submit(() => {
    event.preventDefault();
    let textInput = $(this).find('textarea');

    if (!$.trim(textInput.val())) {
      $('.error-message').text("Tweet is empty.").slideDown(function() {
        setTimeout(function() {
          $('.error-message').slideUp();
        }, 2000);
      });
    } else if (textInput.val().length > 140) {
      $('.error-message').text("Tweet exceeds max characters.").slideDown(function() {
        setTimeout(function() {
          $('.error-message').slideUp();
        }, 2000);
      });
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: textInput.serialize()
      }).done(() => {
        textInput.val('');
        $('.counter').text(140);
        loadTweets();
      });
    }
  });

});