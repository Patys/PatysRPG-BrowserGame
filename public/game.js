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
  $('body').on('click', '#end-mission-button', function(e){
      $("#content").load("/mission/end");
  });
}

$(document).ready(main);
