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
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
      this._canvas.drawImage(img, 300, 300);// this is line 14
  };
  img.src = "https://github.com/Patys/PatysRPG-graphic/raw/master/Face/Completes/face1.png";
  ctx.drawImage(img,10,10);
}

$(document).ready(main);
