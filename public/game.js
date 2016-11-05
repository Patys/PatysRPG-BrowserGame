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

  var img[0] = new Image();
  var img[1] = new Image();

  img[0].onload = function () {
      ctx.drawImage(img[0], 150, 100);
  };
  img[1].onload = function () {
      ctx.drawImage(img[1], 150, 20);
  };
  img[0].src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Face/Completes/face1.png";
  img[1].src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Hair/Black/blackMan1.png";
}

$(document).ready(main);
