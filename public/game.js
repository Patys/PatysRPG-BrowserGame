// var main = function() {
//   $('div[id^="panel-"]').hide();
//   $('div[id^="panel-character"]').show();
//   $('#menu-character').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-character"]').show();
//   });
//   $('#menu-mission').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-mission"]').show();
//   });
//   $('#menu-shop').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-shop"]').show();
//   });
//   $('#menu-arena').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-arena"]').show();
//   });
//   $('#menu-ranking').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-ranking"]').show();
//   });
//   $('#menu-messages').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-messages"]').show();
//   });
//   $('#menu-group').click(function() {
//     $('div[id^="panel-"]').hide();
//     $('div[id^="panel-group"]').show();
//   });
//
// }
//
//
// $(document).ready(main);

function main() {
  $('body').on('click', '#menu-character', function(e){
      $("#content").load("/character");
  });
  $('body').on('click', '#menu-arena', function(e){
      $("#content").load("/arena");
  });
  $('body').on('click', '#menu-group', function(e){
      $("#content").load("/group");
  });
  $('body').on('click', '#menu-messages', function(e){
      $("#content").load("/messages");
  });
  $('body').on('click', '#menu-missions', function(e){
      $("#content").load("/missions");
  });
  $('body').on('click', '#menu-ranking', function(e){
      $("#content").load("/ranking");
  });
  $('body').on('click', '#rankingget', function(e){
    $("#content").load("/ranking?page=" + $('#paginationranking').val());
  });
  $('body').on('click', '#menu-shop', function(e){
      $("#content").load("/shop");
  });
}

$(document).ready(main);
