$(document).ready(function() {
  
  
  
  $('#tweet-text').keypress((e) => {
    let count = $('.counter');
    let textCount = 140 - $('#tweet-text').val().length;
    console.log(this);
    count.text(textCount);
    if (textCount < 0) {
      count.css('color', 'red');
    }
  });
  
  
});

