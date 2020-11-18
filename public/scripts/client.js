/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const tweetData =[
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1605557908452
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1605644308452
    }
  ];
  
  const createTweetElement = function(data) {
    const markUp = `<article class="tweet">
    <header>
    <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png"/><label>${data["user"]["name"]}</label><label id="user-name">${data["user"]["handle"]}</label>
     
      <p>${data["content"]["text"]}</p>
      
      <hr></header>
    
    <footer>
      <p>10 days ago</p>
      <i class="fa fa-flag-o"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-refresh" aria-hidden="true"></i></footer>
  </article>`;

    return markUp;
  }
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let data of tweetData) {
      const $tweet = createTweetElement(data);
      $('.tweet-container').append($tweet); 
    }
  }
   
  renderTweets(tweetData);

});
