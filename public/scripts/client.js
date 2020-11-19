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
    <img src="${data["user"]["avatars"]}"/><label>${data["user"]["name"]}</label></div> <label id="user-name" class='handle'>${data["user"]["handle"]}</label></div>
     
      <p>${escape(data["content"]["text"])}</p>
      
      <hr></header>
    
    <footer>
      <p>10 days ago</p>
      <i class="fa fa-flag-o"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-refresh" aria-hidden="true"></i></footer>
  </article>`;

    return $markUp;
  };
  const escape =  function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
  const renderTweets = function(dataArray) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    if(!Array.isArray(dataArray)) {
      const $tweet = createTweetElement(dataArray);
      $('.tweet-container').prepend($tweet); 
      return;
    }
    for (let data of dataArray) {
      const $tweet = createTweetElement(data);
      $('.tweet-container').append($tweet); 
    }
  };

   
 
  
  $('.new-tweet form').submit((event)=>{ // event hander submit for form element
    event.preventDefault()
    let $textValue = $('#tweet-text').val();
    
    if(!$textValue) {
      $('.new-tweet > h3').text(`Please enter a tweet to submit!!`);
      $('.new-tweet > h3').slideDown('fast');
      return;
    } 
    if ($textValue.length > 140) {
      $('.new-tweet form').trigger("reset");

      $('.new-tweet > h3').text(`Too Long! please make sure the tweet length is upto 140 characters`);
      $('.new-tweet > h3').slideDown('fast');
      return;
    }
    $('.new-tweet > h3').slideUp('fast');
    let data = $('.new-tweet form').serialize();
    
    $.ajax('/tweets',{data: data, method: 'POST'}) //AJAX POST request for sending new tweets to server
    .then(function(data){
      $('.new-tweet form').trigger("reset");
      const b = true;
      loadTweets(b);
    })
    .catch((error) => {
      console.log(error);
    });
    
  });
  const loadTweets = function(b) {
    $.ajax('/tweets',{ method: 'GET'}) //AJAX GET request for rendering new tweets
    .then(function(dataArray){
      if(b) {renderTweets(dataArray[dataArray.length - 1]);}
      if(!b) {renderTweets(dataArray); }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const b = false;
  loadTweets(b);
});

