/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  
  //The function returns the template string for article element
  const createTweetElement = function(data) {
    let date = new Date(data['created_at']);
    let date2 = new Date();
    let days =  date2.getDay() - date.getDay();
    if(days < 1) {
      days = "";
      days += "Created today";
    } else {
    days += " days ago";
    }
    
    const $markUp = `<article class="tweet">
    <header class="article-header">
    <div class="head"> 
    <div class='tweet-head'>
    <img src="${data["user"]["avatars"]}"/><label>${data["user"]["name"]}</label></div> <label id="user-name" class='handle'>${data["user"]["handle"]}</label></div>
     
      <p>${escape(data["content"]["text"])}</p>
      
      <hr></header>
    
    <footer>
      <p>${days}</p>
      <i id="icon1" class="fa fa-flag-o"></i>
      <i id="icon2"class="fa fa-heart"></i>
      <i id="icon3" class="fa fa-refresh" aria-hidden="true"></i>
    </footer>
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
      
      $('.tweet-container').prepend($tweet); 
    }
  };

   
 
  
  $('.new-tweet form').submit((event)=>{ // event hander submit for form element
    event.preventDefault();
    let $textValue = $('#tweet-text').val();
    
    if(!$textValue) {
      $('.new-tweet > h3').text(`Please enter a valid tweet to submit!!`);
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
      $('.counter').text(140);
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
  
  //When the nav-bar text on its right side is clicked, the text box toggles up and down
  $('.nav-label').click(function() {
    if($('.new-tweet').is(":hidden")) {
    $('.new-tweet').slideDown('fast');
    $('#tweet-text').focus();
    return;
    }
    
    if($('.new-tweet').is(":visible")) {
      $('.new-tweet').slideUp('fast');
    }
    
  });
  
  let $icons = $('footer > i');
    $icons.hide();
    if($icons.is(":hidden")) {

    }
  
});

