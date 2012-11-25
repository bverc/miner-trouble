$(document).ready(function(){
  var y_max;
  var x_max;
  var y_loc;
  var x_loc;
  var pull_enable = false;
  var lvl = 1;
  var lvl_top = 6;
  var rubies;
  
  load(lvl);
  
  for (var i = 1; i <= lvl_top; i++) {
    $('#levels').append('<a href="#">' + i + '</a>');
  }
  
  //user control
  $('body').keydown(function(event) {
    switch (event.keyCode) {
      case 37:
        if (pull_enable) {
          pull(x_loc + 1, y_loc);
        } else {
          move(x_loc - 1, y_loc);
        }
        break;
      case 38:
        if (pull_enable) {
          pull(x_loc, y_loc + 1);
        } else {
          move(x_loc, y_loc - 1);
        }
        break;
      case 39:
        if (pull_enable) {
          pull(x_loc - 1, y_loc);
        } else {
          move(x_loc + 1, y_loc);
        }
        break;
      case 40:
        if (pull_enable) {
          pull(x_loc, y_loc - 1);
        } else {
          move(x_loc, y_loc + 1);
        }
        break;
    }
    
    // stop scrolling on small browser windows.
    return false;
  });
  
  //enable pull
  $('body').keydown(function(event) {
    switch (event.which) {
      case 65:
        pull_enable = true;
        break;
    }
  });
  
  //disable pull
  $('body').keyup(function(event) {
    switch (event.which) {
      case 65:
        pull_enable = false;
        break;
    }
  });
  
  // level select
  $('#levels a').click(function() {
    lvl = $(this).text();
    load(lvl);
    return false;
  });
  
  function move (x_new, y_new) {
    // Check for bomb
    if ($('.y' + y_new + ' .x' + x_new).hasClass('bomb')) {
      alert('Watch out for bombs!');
      load(lvl);
      return;
    }
    
    // Check for ruby
    if ($('.y' + y_new + ' .x' + x_new).hasClass('ruby')) {
      $('.y' + y_new + ' .x' + x_new).removeClass('ruby');
      if (rubies > 0) {
        rubies--;
      }
    }
    
    // push
    if ($('.y' + y_new + ' .x' + x_new).hasClass('box')) {
      if (isObstacle(2*x_new - x_loc, 2*y_new - y_loc)) {
        return false;
      }
      $('.y' + y_new + ' .x' + x_new).removeClass('box');
      if (isBomb(2*x_new - x_loc, 2*y_new - y_loc)) {
        $('.y' + (2*y_new - y_loc) + ' .x' + (2*x_new - x_loc)).removeClass('bomb');
      }
      else {
        $('.y' + (2*y_new - y_loc) + ' .x' + (2*x_new - x_loc)).addClass('box');
      }
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
      win();
    }
    
    return true;
  }
  
  function pull (x, y) {
    var pull_loc = $('.y' + y + ' .x' + x);
    if (!isObstacle (2*x_loc - x, 2*y_loc - y) && pull_loc.hasClass('box')) {
      pull_loc.removeClass('box');
      $('.y' + y_loc + ' .x' + x_loc).addClass('box');
      move(2*x_loc - x, 2*y_loc - y);
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
    if (tile.hasClass('home') && rubies > 0) {
      alert('You still have rubies to collect.');
      return true;
    }
    return false;
  }
  
  function isBomb (x, y) {
    var tile = $('.y' + y + ' .x' + x);
    if (tile.hasClass('bomb')) {
      return true;
    }
    return false;
  }
  
  // load level
  function load (lvl) {
    $('#map tbody').html('');
    $.get('lvl/' + lvl, function(data) {
      var rows = data.split('\n');
      var name = rows[0];
      var desc = rows[1];
      var size = rows[2].split(' ');
      
      $('#lvl_num').text(lvl);
      $('#lvl_name').text(name);
      $('#lvl_desc').html(desc);
      
      y_max = size[1];
      x_max = size[0];
      
      rubies = 0;
      
      for (var i = 0; i < (20-y_max)/2; i++) {
        $('#map tbody').append('<tr><td class="wall" colspan="20"></td></tr>');
      }
      
      for (var y = 0; y < y_max; y++) {
        var row = rows[y+3].split(' ');
        $('#map tbody').append('<tr class="y' + y + '"></tr>');
        if (x_max < 20) {
          for (var i = 0; i < (20-x_max)/2; i++) {
            $('#map tr.y' + y).append('<td class="wall"></td>');
          }
        }
        for (var x = 0; x < x_max; x++) {
          $('#map tr.y' + y).append('<td class="x' + x + ' ' + row[x] +'"></td>');
          if (row[x] == 'user') {
            y_loc = y;
            x_loc = x;
          }
          if (row[x] == 'ruby') {
            rubies++;
          }
        }
        if (x_max < 20) {
          for (var i = 0; i < (19-x_max)/2; i++) {
            $('#map tr.y' + y).append('<td class="wall"></td>');
          }
        }
      }
      
      for (var i = 0; i < (19-y_max)/2; i++) {
        $('#map tbody').append('<tr><td class="wall" colspan="20"></td></tr>');
      }
    }, 'text');
  }
  
  function win () {
    alert('You Win!');
    lvl = lvl + 1;
    load(lvl%lvl_top);
  }
  
});