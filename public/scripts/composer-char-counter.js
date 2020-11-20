$(document).ready(function() {
  
  //keypress event for textarea counter
  $('#tweet-text').keyup(() => {
    let count = $('.counter');
    let textCount = 140 - $('#tweet-text').val().length;
    console.log(this);
    count.text(textCount);
    if (textCount < 0) {
      count.css('color', 'red');
    }
    if (textCount > 0) {
      count.css('color', 'black');
    }
  });
  

  
});

