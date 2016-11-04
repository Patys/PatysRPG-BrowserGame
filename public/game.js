var main = function() {
  $('#menu-character').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-character"]').show();
  });
  $('#menu-mission').click(function() {
    $('div[id^="panel-"]').hide();
    $('div[id^="panel-mission"]').show();
  });
  $('#menu-shop').click(menuShop);
  $('#menu-arena').click(menuArena);
  $('#menu-ranking').click(menuCharacter);
  $('#menu-messages').click(menuCharacter);
  $('#menu-group').click(menuCharacter);
}


$(document).ready(main);
