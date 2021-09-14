/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet)
      $("#tweets").append(tweetElement)

    }
  }

  const createTweetElement = function (tweet) {
    const userName = tweet.user.name;
    const userAvatar = tweet.user.avatars;
    const userHandle = tweet.user.handle;
    const contentText = tweet.content.text;
    const createdAt = tweet.created_at;

    const htmlTweet = `
<article class="tweet">
  <section class="user">
  <img src=${userAvatar}>
  <span>${userName}</span>
  <span class="email">${userHandle}</span>
  </section>
  <span>${contentText}</span>
        <hr class="line">
        <footer class="footer">
          <section class="time-ago">
            ${createdAt}
          </section>
          <section class="icons">
          <i class="fas fa-flag"></i> 
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
          
          </section>
        </footer>
   </article>`

    const $tweet = $(htmlTweet)
    //console.log($tweet)
    return $tweet
  }


  // form submission using jquery

  $("form").submit(function (event) {
    event.preventDefault();
    //console.log(event)
    const $form = $(this);
    const formData = $form.serialize();
    //const $input = $form.find('textarea');
    //console.log('>>>>', $input.val())
    $.ajax({
      url: "/tweets",
      type: "post",
      data: formData
    }).done(function (data) {
      console.log('----data', data)
    });

  });

  // fetching tweets with Ajax

  const loadTweets = function () {
    // const $form = $(this);
    $.ajax({
      url: "/tweets",
      type: "get",
      // data: $form
    }).done(function (data) {
      //  console.log('----data', data)
      // return data;
      renderTweets(data);
    });

  }
  loadTweets();

})

