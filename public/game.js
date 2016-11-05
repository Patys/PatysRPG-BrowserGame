var main = function() {
  $('div[id^="panel-"]').hide();
  $('div[id^="panel-character"]').show();
  $('#menu-character').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-character"]').show();
  });
  $('#menu-mission').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-mission"]').show();
  });
  $('#menu-shop').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-shop"]').show();
  });
  $('#menu-arena').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-arena"]').show();
  });
  $('#menu-ranking').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-ranking"]').show();
  });
  $('#menu-messages').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-messages"]').show();
  });
  $('#menu-group').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-group"]').show();
  });
  drawCharacter();

}

function drawCharacter() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
      ctx.drawImage(img, 0, 0);// this is line 14
      console.log('wtf');
  };
  img.src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Face/Completes/face1.png";
}

$(document).ready(main);
