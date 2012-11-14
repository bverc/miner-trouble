$(document).ready(function(){
  var brush;
  var x_max;
  var y_max;
  
  //setup map
  setSize($('input[name=x_max]').val(), $('input[name=y_max]').val());
  
  $("#size_change").click(function() {
    setSize($('input[name=x_max]').val(), $('input[name=y_max]').val());
  });
  
  function setSize(x, y) {
    x_max = x;
    y_max = y;
    $('#map tr').remove();
    for (var y = 0; y < y_max; y++) {
      $('#map tbody').append('<tr class="y' + y + '"></tr>');
      for (var x = 0; x < x_max; x++) {
        $('#map tr.y' + y).append('<td class="x' + x + '"></td>');
      }
    }
    
    $('#map td').click( function() {
      if (brush == 'cut') {
        $(this).html('');
      }
      else {
        $(this).html('<img class="' + brush + '" src="img/' + brush + '.png" />');
      }
    });
  }
  
  // Generate Output
  $('#gen').click(function() {
    var output;
    output = $('input[name=name]').val() + '\r\n';
    output += $('input[name=desc]').val() + '\r\n';
    output += x_max + ' ' + y_max + '\r\n';
    for (var y = 0; y < y_max; y++) {
      for (var x = 0; x < x_max; x++) {
        var cell = $('#map .y' + y + ' .x' + x);
        if (cell.has('img').length) {
          output += cell.children('img').attr('class') + ' ';
        }
        else {
          output += '0 ';
        }
      }
      output += '\n';
    }
    $('#output').html(output);
  });
  
  // Set Brush
  $('#left .icon_group img').click(function() {
    brush = $(this).attr('id');
    $('#brush').attr('src','img/' + brush + '.png');
    $('#map').css('cursor', 'url(img/' + brush + '.png) 8 8, crosshair');
  });
  
});