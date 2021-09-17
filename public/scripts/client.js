/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
$(".error").hide();
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      // $("#tweets").append(tweetElement)
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

    //Implementing Cross S.S

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //const safeHTML = `<p>${escape(textFromUser)}</p>`;

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

    // const $tweet = $(htmlTweet)
    //console.log($tweet)
    return $tweet;
  };


  // form submission using jquery

  $("form").submit(function (event) {
    event.preventDefault();
    //console.log(event)
    const $form = $(this);

    // validating the data before sending it to the server

    if (event.target[0].value.length === 0) {
      $(".error").text("Can Not Submit An Empty Tweet!").slideDown();
    } else if (event.target[0].value.length > 140) {
      $(".error").text("Too Long,Limit is 140 Characters!").slideDown();
    } else {
      $(".error").hide();
      const formData = $form.serialize();
      //const $input = $form.find('textarea');
      //console.log('>>>>', $input.val())
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: formData
      }).then(function (data) {
        //console.log('----data', data);
        loadTweets();

        //Empty textarea after successful submission

        $("#tweet-text").val("");
        $(".counter").text("140");
      }).catch((error) => {
        console.log(error);
      });
    }

  });

  // fetching tweets with Ajax

  const loadTweets = function () {
    // const $form = $(this);
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function (data) {
      renderTweets(data);
    }).catch((error) => {
      console.log(error);
    });

  };

  loadTweets();


});

