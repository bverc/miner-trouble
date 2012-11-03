$(document).ready(function(){
  //setup map
  var y_max = 32;
  var x_max = 32;
  for (var y = 0; y < y_max; y++) {
    $('#map tbody').append('<tr class="y' + y + '"></tr>');
    for (var x = 0; x < x_max; x++) {
      $('#map tr.y' + y).append('<td class="x' + x + '"></td>');
    }
  }
  
  //starting location
  var x_loc = 16;
  var y_loc = 16;
  
  //place user
  $('.y' + y_loc + ' .x' + x_loc).addClass('user');
  
  
  $('.y8 .x8').addClass('box'); // place box
  
  //user control
  $('body').keypress(function(event) {
    var x_new = x_loc;
    var y_new = y_loc;
    switch (event.keyCode) {
      case 37:
        x_new = x_loc - 1;
        break;
      case 38:
        y_new = y_loc - 1;
        break;
      case 39:
        x_new = x_loc + 1;
        break;
      case 40:
        y_new = y_loc + 1;
        break;
    }
    
    // push
    if ($('.y' + y_new + ' .x' + x_new).hasClass('box')) {
      $('.y' + y_new + ' .x' + x_new).removeClass('box');
      $('.y' + (2*y_new - y_loc) + ' .x' + (2*x_new - x_loc)).addClass('box');
    }
    
    //check boundaries
    if (y_new >= 0 && y_new < y_max && x_new >= 0 && x_new < x_max) {
      $('.y' + y_loc + ' .x' + x_loc).removeClass('user');
      $('.y' + y_new + ' .x' + x_new).addClass('user');
      y_loc = y_new;
      x_loc = x_new;
    }
  });
});