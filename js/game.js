$(document).ready(function(){
  var y_max;
  var x_max;
  var y_loc;
  var x_loc;
  
  //load level 1
  $.get('lvl/1', function(data) {
    var rows = data.split('\r\n');
    var size = rows[0].split(' ');
    
    y_max = size[1];
    x_max = size[0];
    
    for (var y = 0; y < y_max; y++) {
      var row = rows[y+1].split(' ');
      $('#map tbody').append('<tr class="y' + y + '"></tr>');
      for (var x = 0; x < x_max; x++) {
        $('#map tr.y' + y).append('<td class="x' + x + ' ' + row[x] +'"></td>');
        if (x == 0 && y == 0) {
          y_loc = y;
          x_loc = x;
        }
      }
    }
  }, 'text');
  
  //user control
  $('body').keypress(function(event) {
    switch (event.keyCode) {
      case 37:
        move(x_loc - 1, y_loc);
        break;
      case 38:
        move(x_loc, y_loc - 1);
        break;
      case 39:
        move(x_loc + 1, y_loc);
        break;
      case 40:
        move(x_loc, y_loc + 1);
        break;
    }
  });
  
  function move (x_new, y_new) {
    // push
    if ($('.y' + y_new + ' .x' + x_new).hasClass('box')) {
      if (isObstacle(2*x_new - x_loc, 2*y_new - y_loc)) {
        return false;
      }
      $('.y' + y_new + ' .x' + x_new).removeClass('box');
      $('.y' + (2*y_new - y_loc) + ' .x' + (2*x_new - x_loc)).addClass('box');
    }
    
    //check for obstacles
    if (isObstacle(x_new, y_new)) {
      return false;
    }
    $('.y' + y_loc + ' .x' + x_loc).removeClass('user');
    $('.y' + y_new + ' .x' + x_new).addClass('user');
    y_loc = y_new;
    x_loc = x_new;
    
    if ($('.y' + y_loc + ' .x' + x_loc).hasClass('home')) {
      alert('You Win!');
    }
    
    return true;
  }
  
  function isObstacle (x, y) {
    if (x < 0 || x >= x_max || y < 0 || y >= y_max) {
      return true;
    }
    var tile = $('.y' + y + ' .x' + x);
    if (tile.hasClass('wall') || tile.hasClass('box')) {
      return true;
    }
    return false;
  }
});