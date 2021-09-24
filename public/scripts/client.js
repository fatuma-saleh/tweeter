
$(document).ready(function () {

  // fetching tweets with Ajax

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function (data) {
      renderTweets(data);
    }).catch((error) => {
      console.log(error);
    });

  };

  const renderTweets = function (tweets) {

    // avoiding the previous tweets from been rendered everytime new tweet is posted

    const $container = $("#tweets");
    $container.empty();

    // loops through tweets,calls createTweetElement for each tweet
    // takes return value and prepends it to the tweets container

    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets").prepend(tweetElement);
    }
  };

  // Creates TweetElement for each tweet

  const createTweetElement = function (tweet) {

    const userName = tweet.user.name;
    const userAvatar = tweet.user.avatars;
    const userHandle = tweet.user.handle;
    const contentText = tweet.content.text;

    const newTime = (unix) => {
      return timeago.format(unix);
    };
    const createdAt = newTime(tweet.created_at);

    //Implementing Cross-Site Scripting

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = `
<article class="tweet">
  <header class="user">
  <div>
  <img src=${escape(userAvatar)}>
  <span>${escape(userName)}</span>
  </div>
  <span class="email">${escape(userHandle)}</span>
  </header>
  <span class="text"><b> ${escape(contentText)}</b></span>
        <hr class="line">
        <footer class="footer">
          <section class="time-ago">
            ${escape(createdAt)}
          </section>
          <section class="icons">
          <i class="fas fa-flag"></i> 
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
          </section>
        </footer>
   </article>`;

    return $tweet;
  };

  // form submission using jquery

  $("form").submit(function (event) {
    event.preventDefault();
    const $form = $(this);

    // validating the data before sending it to the server

    if (event.target[0].value.length === 0) {
      $(".error").text("Can Not Submit An Empty Tweet!").slideDown();
      setTimeout(() => {
        $(".error").hide();
      }, 3000)
    } else if (event.target[0].value.length > 140) {
      $(".error").text("Too Long,Limit is 140 Characters!").slideDown();
      setTimeout(() => {
        $(".error").hide();
      }, 3000)
    } else {
      $(".error").hide();
      const formData = $form.serialize();

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: formData
      }).then(function (data) {
        loadTweets();

        //Empty textarea after successful submission and reset character counter back to 140

        $("#tweet-text").val("");
        $(".counter").text("140");
      }).catch((error) => {
        console.log(error);
      });
    }

  });


  // implementing the Go Up button

  let btn = $('#up-button');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  // Hide the error message and load the tweets when the page loads

  $(".error").hide();
  loadTweets();
});

