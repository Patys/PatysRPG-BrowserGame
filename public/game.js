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
  $("#menu-character").click(function(){
      $("#content").load("/character");
  });
  $("#menu-arena").click(function(){
      $("#content").load("/arena");
  });
  $("#menu-group").click(function(){
      $("#content").load("/group");
  });
  $("#menu-messages").click(function(){
      $("#content").load("/messages");
  });
  $("#menu-missions").click(function(){
      $("#content").load("/missions");
  });
  $("#menu-ranking").click(function(){
      $("#content").load("/ranking");
  });
  $("#ranking-get").click(function(){
      console.log("get ranknig");
      console.log("/ranking?page=" + $('#pagination-ranking').val());
      $("#content").load("/ranking?page=" + $('#pagination-ranking').val());
  });
  $("#menu-shop").click(function(){
      $("#content").load("/shop");
  });
}

$(document).ready(main);
