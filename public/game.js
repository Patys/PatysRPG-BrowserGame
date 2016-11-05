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
  ctx.globalCompositeOperation='destination-over';

  var img_face1 = new Image();
  var img_faceFull1 = new Image();
  var img_hair1 = new Image();

  img_face1.onload = function () {
      ctx.drawImage(img_face1, 150, 100);
  };
  img_faceFull1.onload = function () {
      ctx.drawImage(img_faceFull1, 150, 100);
  };
  img_hair1.onload = function () {
      ctx.drawImage(img_hair1, 135, 30);
  };
  img_face1.src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Face/Completes/face1.png";
  img_faceFull1.src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Skin/Tint%201/tint1_head.png";
  img_hair1.src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Hair/Black/blackMan1.png";
}

$(document).ready(main);
