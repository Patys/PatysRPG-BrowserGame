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
  var img = document.getElementById("face1");
  ctx.drawImage(img,10,10);
}

$(document).ready(main);
