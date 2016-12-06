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
      $.ajax({url: "/character", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-arena").click(function(){
      $.ajax({url: "/arena", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-group").click(function(){
      $.ajax({url: "/group", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-messages").click(function(){
      $.ajax({url: "/messages", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-missions").click(function(){
      $.ajax({url: "/missions", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-ranking").click(function(){
      $.ajax({url: "/ranking", success: function(result){
          $("#content").html(result);
      }});
  });
  $("#menu-shop").click(function(){
      $.ajax({url: "/shop", success: function(result){
          $("#content").html(result);
      }});
  });
}

$(document).ready(main);
