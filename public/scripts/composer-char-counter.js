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
  var btn = $('#bottom-top');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
      
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '200');
    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideDown('fast');
      $('#tweet-text').focus();
      return;
    }  
    
  });
  
});

