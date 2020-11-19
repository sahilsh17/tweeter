/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  
  const createTweetElement = function(data) {
    const $markUp = `<article class="tweet">
    <header>
    <div class="head"> 
    <div class='tweet-head'>
    <img src="${data["user"]["avatars"]}"/><label>${data["user"]["name"]}</label></div>               <label id="user-name" class='handle'>${data["user"]["handle"]}</label></div>
     
      <p>${data["content"]["text"]}</p>
      
      <hr></header>
    
    <footer>
      <p>10 days ago</p>
      <i class="fa fa-flag-o"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-refresh" aria-hidden="true"></i></footer>
  </article>`;

    return $markUp;
  }
  const renderTweets = function(dataArray) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    
    for (let data of dataArray) {
      const $tweet = createTweetElement(data);
      $('.tweet-container').append($tweet); 
    }
  }
   
 
  
  $('.new-tweet form').submit((event)=>{ // event hander submit for form element
    event.preventDefault()
    let data = $('.new-tweet form').serialize();
    console.log(tweetData[tweetData.length - 1]);
    $.ajax('/tweets',{data: data, method: 'POST'}) //AJAX POST request for sending new tweets to server
    .then(function(data){
      
    })
    .catch((error) => {
      console.log(error);
    });
    
  });
  const loadTweets = function() {
    $.ajax('/tweets',{ method: 'GET'}) //AJAX GET request for rendering new tweets
    .then(function(dataArray){
      renderTweets(dataArray);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  loadTweets();
});

