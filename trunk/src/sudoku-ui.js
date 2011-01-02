// UI for Heidi's Sudoku Hintpad
//
// Copyright 2010 David Bau, all rights reserved.

var SudokuUI = {};

(function(lib) {

lib.levels = [];
for (var j = 0; j <= 10; j++) { lib.levels.push(j); }

$(function() {

if (!window.location.hash) {
  if (!loadstate()) {
    savestate({ puzzle: Sudoku.makepuzzle(), work: [] });
  }
}

setTimeout(gradepuzzle, 0);
redraw();

$(window).bind('hashchange', function() {
  setTimeout(gradepuzzle, 0);
  redraw();
});

var justclicked = null;

function hidepopups() {
  if (workmenu.showing()) {
    workmenu.hide();
  }
  $('div.sudoku-popup').css('display', 'none');
  justclicked = null;
}

$('body').click(function(ev) {
  hidepopups();
});

var keyfocus = null;

function setkeyfocus(kf) {
  if (keyfocus !== null) {
    $(keyfocus).find('div.sudoku-border').css('border', '');
  }
  keyfocus = kf;
  if (keyfocus !== null) {
    $(keyfocus).find('div.sudoku-border').css('border', '1px dotted blue');
  }
}

$(document).keydown(function(ev) {
  if (workmenu.showing()) { workmenu.keydown(ev); return; }
  if (keyfocus === null) return;
  var pos = parseInt($(keyfocus).attr('id').substr(2));
  if (!(pos >= 0 && pos < 81)) return;
  if (ev.which >= 37 && ev.which <= 40) {
    var x = pos % 9;
    var y = (pos - x) / 9;
    if (ev.which == 37 && x > 0) { x -= 1; }
    if (ev.which == 39 && x < 8) { x += 1; }
    if (ev.which == 38 && y > 0) { y -= 1; }
    if (ev.which == 40 && y < 8) { y += 1; }
    setkeyfocus($('#sc' + (x + y * 9)));
    return;
  }
  var state = currentstate();
  if (state.puzzle[pos] !== null) return;
  var num = ev.which - '1'.charCodeAt(0);
  if (num >= 0 && num < 9) {
    var bit = (1 << num);
    var bits = state.work[pos];
    if (state.answer[pos] !== null) bits |= (1 << state.answer[pos]);
    bits ^= bit;
    state.mark[pos] &= ~bit;
    var nums = listbits(bits);
    if (nums.length == 1) {
      state.work[pos] = 0;
      state.mark[pos] = 0;
      state.answer[pos] = nums[0];
    } else {
      state.answer[pos] = null;
      state.work[pos] = bits;
    }
  } else if (num == -1 || ev.which == 32 || ev.which == 46 || ev.which == 189) {
    state.work[pos] = 0;
    state.mark[pos] = 0;
    state.answer[pos] = null;
  } else {
    return;
  }
  savestate(state);
});

$('td.sudoku-cell').click(function(ev) {
  var pos = parseInt($(this).attr('id').substr(2));
  if (pos == justclicked) ev.stopPropagation();
});

$('td.sudoku-cell').mouseenter(function(ev) {
  if (!workmenu.showing()) {
    $(this).find('div.sudoku-border').css('border', '1px dotted blue');
    setkeyfocus(this);
  }
  ev.stopPropagation();
});

$('td.sudoku-cell').mouseleave(function(ev) {
  $(this).find('div.sudoku-border').css('border', '');
  setkeyfocus(null);
  ev.stopPropagation();
});

$('td.sudoku-cell').mousedown(function(ev) {
  hidepopups();
  var pos = parseInt($(this).attr('id').substr(2));
  justclicked = pos;
  var state = currentstate();
  if (ev.ctrlKey) {
    var bits = 0;
    var hint = Sudoku.puzzlechoices(state.puzzle, pos);
    workmenu.show(this, $('div.puzzle-menu'), state.puzzle[pos], 0, 0,
                  hint, true,
    function(num, w, m) {
      state = currentstate();
      state.puzzle[pos] = num;
      if (num !== null) {
        state.answer[pos] = null;
        state.work[pos] = 0;
        state.mark[pos] = 0;
      }
      savestate(state);
      setTimeout(gradepuzzle, 0);
    });
  } else {
    if (state.puzzle[pos] !== null) return;
    var sofar = boardsofar(state);
    sofar[pos] = null;
    var hint = SudokuHint.simplehint(sofar)[pos];
    workmenu.show(this, $('div.work-menu'),
                  state.answer[pos], state.work[pos], state.mark[pos],
                  hint, false,
    function(num, w, m) {
      state = currentstate();
      state.answer[pos] = num;
      state.work[pos] = w;
      state.mark[pos] = m;
      savestate(state);
    });
  }
  ev.stopPropagation();
});

var graded = null;
function gradepuzzle() {
  var state = currentstate();
  var current = encodepuzzle81(state.puzzle);
  if (graded === current) return;
  graded = current;

  if (current == '') {
    $('#grade').html('&nbsp;');
    return;
  }
  if (!Sudoku.uniquesolution(state.puzzle)) {
    $('#grade').html(lib.levels[0]);
    return;
  }
  var steps = SudokuHint.hintgrade(state.puzzle);
  var level = Math.max(1, Math.min(lib.levels.length - 1,
              Math.floor(steps / 5)));
  $('#grade').html(lib.levels[level]);
}

$('#newbutton').click(function(ev) {
  hidepopups();
  if (ev.ctrlKey) {
    savestate({puzzle: [], work: []});
    $.getJSON('http://davidbau.com/sudoku/min.json?callback=?', function(p) {
      var puzzle = decodepuzzle81(p);
      savestate({puzzle: puzzle, answer: [], work: [], mark: []});
      setTimeout(gradepuzzle, 0);
    });
  } else {
    var state = { puzzle: Sudoku.makepuzzle(), answer: [], work: [], mark: [] };
    if (!SudokuHint.hintgrade(state.puzzle)) return;
    savestate(state);
    setTimeout(gradepuzzle, 0);
  }
});

$('#clearbutton').click(function(ev) {
  hidepopups();
  var state = currentstate();
  var cleared = {puzzle: state.puzzle, answer:[], work: [], mark: []};
  if (ev.ctrlKey) {
    cleared['puzzle'] = [];
    setTimeout(gradepuzzle, 0);
  }
  savestate(cleared);
});

$('#hintbutton,#checkbutton').bind('mouseup mouseleave', function() {
  hidepopups();
  var state = currentstate();
  redraw(state);
  $('#markbutton').css('border', '');
});
  
$('#hintbutton').mousedown(function(ev) {
  hidepopups();
  var state = currentstate();
  var hint = SudokuHint.hint(state.puzzle, state.answer, state.work);
  for (j = 0; j < 81; j++) {
    state.color[j] = 0;
  }
  if (hint !== null) {
    if (hint.errors) {
      for (var j = 0; j < hint.errors.length; j++) {
        state.color[hint.errors[j]] = 3;
      }
    } else {
      for (var j = 0; j < hint.support.length; j++) {
        state.color[hint.support[j]] = 2;
      }
      if (hint.support.length == 0 || ev.ctrlKey) {
        for (var j = 0; j < hint.reduced.length; j++) {
          state.color[hint.reduced[j]] = 1;
        }
      }
    }
  } else {
    var needmarks = false;
    var sofar = boardsofar(state);
    var unfinished = false;
    for (var j = 0; j < 81; j++) {
      if (sofar[j] === null) {
        unfinished = true;
        if (state.work[j] == 0) {
          needmarks = true;
          break;
        }
      }
    }
    if (needmarks) {
      $('#markbutton').css('border', '2px solid blue');
    } else if (unfinished) {
      showpopup('#nohint');
    }
  }
  redraw(state);
});

$('#markbutton').click(function(ev) {
  hidepopups();
  var state = currentstate();
  var sofar = boardsofar(state);
  if (ev.ctrlKey) {
    for (var j = 0; j < 81; j++) {
      if (sofar[j] !== null) continue;
      state.work[j] = 0;
    }
  } else {
    state.work = SudokuHint.pencilmarks(sofar, state.work);
    for (var j = 0; j < 81; j++) {
      state.mark[j] &= state.work[j];
    }
  }
  savestate(state);
});

$('#solvebutton').click(function() {
  hidepopups();
  var state = currentstate();
  var solution = Sudoku.solution(state.puzzle);
  if (solution === null) {
    alert("No solution");
    return;
  }
  for (var j = 0; j < 81; j++) {
    if (state.puzzle[j] === null) {
      state.answer[j] = solution[j];
      state.work[j] = 0;
      state.mark[j] = 0;
    }
  }
  savestate(state);
});

function showpopup(id) {
  var velt = $(id);
  var telt = $('table.sudoku');
  var position = telt.offset();
  position.left += (telt.outerWidth() - velt.outerWidth()) / 2;
  position.top += (telt.outerHeight() - velt.outerHeight()) / 3;
  velt.css({
    display: 'block',
    left: position.left,
    top: position.top
  });
}

$('#checkbutton').mousedown(function(ev) {
  hidepopups();
  var state = currentstate();
  for (var j = 0; j < 81; j++) {
    state.color[j] = 0;
  }
  var sofar = boardsofar(state);
  var conflicts = SudokuHint.conflicts(sofar);
  if (conflicts.length == 0 && ev.ctrlKey) {
    conflicts = SudokuHint.mistakes(state.puzzle, state.answer, state.work);
  }
  if (conflicts.length > 0 && conflicts[0].errors) {
    var errors = conflicts[0].errors;
    for (var j = 0; j < errors.length; j++) {
      state.color[errors[j]] = 3;
    }
  }
  redraw(state);
  // now check for a win.
  if (conflicts.length == 0) {
    var unfinished = 0;
    for (var j = 0; j < 81; j++) {
      if (sofar[j] === null) unfinished += 1;
    }
    showpopup(unfinished == 0 ? '#victory' : '#ok');
  }
  ev.stopPropagation();
});

$('#checkbutton').click(function(ev) {
  if ($('#victory').css('display') != 'none') {
    ev.stopPropagation();
  }
});

});

function listbits(bits) {
  var result = [];
  for (var y = 0; y < 9; y++) {
    if (0 != (bits & (1 << y))) result.push(y);
  }
  return result;
}

function boardsofar(state) {
  var sofar = state.puzzle.slice();
  for (var j = 0; j < 81; j++) {
    if (state.answer[j] !== null) sofar[j] = state.answer[j];
  }
  return sofar;
}

// location hash state serialization:
// puzzle=[0-9]{81} &
// work=[base64]{162}

function redraw(s) {
  var state = s ? s : currentstate();
  var puzzle = state.puzzle;
  var answer = state.answer;
  var work = state.work;
  var mark = state.mark;
  var color = state.color;
  for (var j = 0; j < 81; j++) {
    if (puzzle[j] !== null) {
      $("#sn" + j).attr('class', 'sudoku-given').html(puzzle[j] + 1);
    } else {
      if (answer[j] !== null || work[j] == 0) {
        $("#sn" + j).attr('class', 'sudoku-answer').html(
            answer[j] === null ? '&nbsp;' : answer[j] + 1);
      } else {
        var text = '<table class="sudoku-work-table">';
        for (var n = 0; n < 9; n++) {
          if (n % 3 == 0) { text += '<tr>'; }
          text += '<td' +
          ((mark[j] & (1 << n)) ? ' style="background-color:yellow"' : '') +
          '><div>' +
          ((work[j] & (1 << n)) ? (n+1) : '&nbsp;') +
          '</div></td>';
          if (n % 3 == 2) { text += '</tr>'; }
        }
        text += '</table>'
        $("#sn" + j).attr('class', 'sudoku-work').html(text);
      }
    }
    var c = ['', 'lightgreen', 'lightblue', 'pink'][color[j]];
    $("#sc" + j).css('background-color', c);
  }
}

function loadstate() {
  if (!('localStorage' in window) || !('JSON' in window) ||
      !('sudokustate' in window.localStorage)) {
    return false;
  }
  var state = JSON.parse(localStorage['sudokustate']);
  if (!state.puzzle || !state.puzzle.length) return false;
  savestate(state);
  return true;
}

function currentstate() {
  return decodeboardstate($.deparam.fragment());
}

function savestate(state) {
  $.bbq.pushState(encodeboardstate(state));
  if (!('localStorage' in window) || !('JSON' in window)) {
    return;
  }
  localStorage['sudokustate'] = JSON.stringify(state);
}

function decodeboardstate(data) {
  var puzzle = decodepuzzle81('puzzle' in data ? data.puzzle : '');
  var answer = decodepuzzle81('answer' in data ? data.answer : '');
  var bits = base64toarray('marks' in data ? data.marks : '');
  var work = [];
  var mark = [];
  var color = [];
  var w, c;
  for (var j = 0; j < 81; j++) {
    if (j < bits.length) {
      w = bits[j] & 511;
      m = (bits[j] >> 9) & 511;
    } else {
      w = 0;
      m = 0;
    }
    work.push(w);
    mark.push(m);
    color.push(0);
  }
  return {
    puzzle: puzzle,
    answer: answer,
    work: work,
    mark: mark,
    color: color
  };
}

function encodeboardstate(state) {
  var bits = state.work.slice();
  if ('mark' in state) {
    for (var j = 0; j < state.mark.length; j++) {
      bits[j] |= ((state.mark[j] & 511) << 9);
    }
  }
  return {
    puzzle: encodepuzzle81(state.puzzle),
    answer: encodepuzzle81(state.answer),
    marks: arraytobase64(bits)
  };
}

function encodepuzzle81(puzzle, explicit) {
  if (!puzzle) return '';
  var result = [];
  if (explicit) {
    for (var j = 0; j < puzzle.length; j++) {
      result.push(puzzle[j] === null ? 0 : puzzle[j] + 1);
    }
    return result.join('');
  }
  var run = 0;
  for (var j = 0; j < puzzle.length; j++) {
    if (puzzle[j] === null) {
      run += 1;
    }
    if (puzzle[j] !== null) {
      while (run > 27) { result.push('Z'); run -= 27; }
      if (run > 1) {
        result.push(base64chars.charAt(run - 2));
      } else if (run == 1) {
        result.push('0');
      }
      run = 0;
    }
    if (puzzle[j] !== null) {
      result.push(puzzle[j] + 1);
    }
  }
  return result.join('');
}

function decodepuzzle81(str) {
  var puzzle = [];
  var c = 0;
  for (var j = 0; j < 81;) {
    var num = null;
    var repeat = 1;
    if (c < str.length) {
      num = str.charCodeAt(c) - '0'.charCodeAt(0);
      if (num < 0 || num > 9) {
        num = null;
        repeat = base64chars.indexOf(str.charAt(c)) + 2;
      } else if (num == 0) {
        num = null;
      } else {
        num -= 1;
      }
      c += 1;
    }
    while (repeat && j < 81) {
      puzzle.push(num);
      repeat -= 1;
      j += 1;
    }
  }
  return puzzle;
}

var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                  "abcdefghijklmnopqrstuvwxyz" +
                  "0123456789" +
                  "-_";

function shorttobase64(int18) {
  return base64chars[(int18 >> 12) & 63] +
         base64chars[(int18 >> 6) & 63] +
         base64chars[int18 & 63];
}

function base64toshort(base64, index) {
  return (base64chars.indexOf(base64.charAt(index)) << 12) +
         (base64chars.indexOf(base64.charAt(index + 1)) << 6) +
          base64chars.indexOf(base64.charAt(index + 2));
}

function arraytobase64(numbers) {
  var result = [];
  for (var j = 0; j < numbers.length; j++) {
    result.push(shorttobase64(numbers[j]));
  }
  return result.join('');
}

function base64toarray(base64) {
  var result = [];
  for (var j = 0; j + 2 < base64.length; j += 3) {
    result.push(base64toshort(base64, j));
  }
  return result;
}

function boardhtml() {
  var text = "<table class=sudoku id=grid cellpadding=1px>\n";
  text += "<tr><td colspan=13 class=sudoku-border>" +
          "<img class=sudoku-border></td></tr>\n";
  for (var y = 0; y < 9; y++) {
    text += "<tr>"
    text += "<td class=sudoku-border></td>"
    for (var x = 0; x < 9; x++) {
      var c = y * 9 + x;
      text += "<td class=sudoku-cell id=sc" + c + ">" +
              "<div class=sudoku-border>" +
              "<div class=sudoku-number id=sn" + c + ">" +
              "&nbsp;</div></div>";
      if (x % 3 == 2) text += "<td class=sudoku-border></td>";
    }
    text += "</tr>\n";
    if (y % 3 == 2) {
      text += "<tr><td colspan=13 class=sudoku-border>" +
              "<img class=sudoku-border></td></tr>\n";
    }
  }
  text += "<tr><td colspan=9 id=caption></td></tr>\n";
  text += "</table>\n";
  return text;
}

function menuhtml() {
  var result = ['<div class=work-menu><table>'];
  var cells = [1,2,3,4,5,6,7,8,9,'&mdash;','?',
               '<div class=menu-mode></div>'];
  for (var j = 0; j < cells.length; j++) {
    if (j % 3 == 0) result.push('<tr>');
    result.push('<td><div class=menu-clip><div class=menu-text>');
    result.push(cells[j]);
    result.push('</div></div></td>');
    if (j % 3 == 2) result.push('</tr>');
  }
  result.push('</table></div>');
  result.push('<div class=puzzle-menu><table>');
  var cells = [1,2,3,4,5,6,7,8,9];
  for (var j = 0; j < cells.length; j++) {
    if (j % 3 == 0) result.push('<tr>');
    result.push('<td><div class=menu-clip><div class=menu-text>');
    result.push(cells[j]);
    result.push('</div></div></td>');
    if (j % 3 == 2) result.push('</tr>');
  }
  result.push('</table></div>');
  return result.join('');
}

var workmenu = null;

$(function() {

workmenu = (function() {
  var showing = false;
  var menu = null;
  var exclusive = false;
  var state = 0;
  var marked = 0;
  var hint = 0;
  var callback = null;
  var lasttime = 0;
  var lastclick = null;
  var called = false;
  var mode = 0;
  function redrawmenu() {
    $(menu).find('div.menu-clip div').each(function(j, elt) {
      if (exclusive && j < 9 && 0 == (hint & (1 << j))) {
        $(elt).css({'color': 'white'});
      } else if (j < 9 && 0 == (state & (1 << j))) {
        $(elt).css({'color': 'lightgray'});
      } else if (j >= 9 || exclusive) {
        $(elt).css({'color': 'black'});
      } else {
        $(elt).css({'color': '#22c' });
      }
      $(elt).css({'background-color': (marked & (1 << j)) ? 'yellow' : ''});
    });
    $(menu).find('div.menu-mode').css({'background-image': 'url("' + 
      ['pencilgray.png', 'pencil.png', 'highlighter.png'][mode] + '")' });
  }
  function togglemode() {
    mode = (mode + 1) % 3;
    redrawmenu();
  }
  function show(elt, m, n, bits, mrk, h, ex, cb) {
    if (showing) { hide(); }
    menu = m;
    exclusive = ex;
    state = bits;
    marked = mrk;
    hint = h;
    callback = cb;
    showing = true;
    lasttime = 0;
    lastclick = null;
    called = false;
    mode = 0; // 0: auto; 1: pencil; 2: highlight
    if (listbits(state).length == 1) { mode = 1; }
    else if (n !== null) { state = (1 << n); }
    redrawmenu();
    var offset = $(elt).offset();
    offset.left += ($(elt).outerWidth() - $(menu).outerWidth()) / 2;
    offset.top += ($(elt).outerHeight() - $(menu).outerHeight()) / 2;
    $(menu).css({display: 'block'}).offset(offset);
  }
  function sendcallback() {
    if (callback && !called) {
      called = true;
      var nums = listbits(state);
      if (mode == 0 && marked == 0 && nums.length == 1) {
        callback(nums[0], 0, 0);
      } else {
        callback(null, state, marked);
      }
    }
  }
  function hide() {
    showing = false;
    $(menu).css({
      'display': 'none'
    });
    sendcallback();
  }
  function keydown(ev) {
    var txt = null;
    if (ev.which >= '1'.charCodeAt(0) && ev.which <= '9'.charCodeAt(0)) {
      txt = String.fromCharCode(ev.which);
    } else if (ev.which == '0'.charCodeAt(0) ||
               ev.which == 32 || ev.which == 46 || ev.which == 189) {
      txt = '-';
    }
    if (txt === null) return;
    entry(txt);
  }
  function entry(txt) {
    if (txt == '') { togglemode(); }
    else if (txt == '\u2014') { state = 0; marked = 0;}
    else if (txt == '?') { state = hint; }
    else {
      var clicktime = (new Date()).getTime();
      var bit = (1 << (parseInt(txt) - 1));
      if (exclusive) {
        if (0 == (hint & bit)) return;
        state = (state & bit) ^ bit;
        hide();
      } else {
        state ^= bit;
        if (mode == 2 && !(marked & bit)) { state |= bit; }
        marked = (marked & ~bit);
        if (mode == 2) marked |= (state & bit);
        lastclick = bit;
        lasttime = clicktime;
      }
    }
    called = false;
    redrawmenu();
  }

  $('div.menu-text').mouseenter(function(ev) {
    $(this).css({'background-color': '#eef', 'opacity': 1.0});
  }).mouseleave(function(ev) {
    var num = parseInt($(this).text());
    var clr = !isNaN(num) && (marked & (1 << (num - 1))) ? 'yellow' : '';
    $(this).css({'background-color': clr, 'opacity': ''});
  }).click(function(ev) {
    ev.stopPropagation();
    entry($(this).text());
  }).mousedown(function(ev) {
    ev.stopPropagation();
    var txt = $(this).text();
    if (exclusive || txt < '0' || txt > '9') return;
    var downtime = (new Date()).getTime();
    var bit = (1 << (parseInt(txt) - 1));
    if (bit == lastclick && (downtime - lasttime < 500)) {
      // when there is a double-click, then write an answer
      state = bit;
      mode = 0;
      marked = 0;
      redrawmenu();
      hide();
    }
  });
  function fade(x, y) {
    if (!showing) return;
    var topleft = $(menu).offset();
    var width = $(menu).outerWidth();
    var height = $(menu).outerHeight();
    var dx = Math.max(topleft.left - x, x - (topleft.left + width), 0);
    var dy = Math.max(topleft.top - y, y - (topleft.top + height), 0);
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist >= 36) {
      hide();
      $(menu).css('opacity', '');
    } else if (dist > 16) {
      $(menu).css('opacity', (36 - dist) / 20);
      sendcallback();
    } else {
      $(menu).css('opacity', '');
    }
  }
  return {show:show, hide:hide, fade:fade, keydown:keydown,
    showing:function(){ return showing; } };
})();

$(document).mousemove(function(ev) {
  workmenu.fade(ev.pageX, ev.pageY);
});

});

function boardcss() {
  var IE6 = /MSIE 6/i.test(navigator.userAgent);
  return [
    "body {" +
            "-webkit-user-select: none;" +
            "user-select: none; }",
    // Font loading for firefox
    "@font-face {" +
            "font-family: 'Covered By Your Grace';" +
            "font-style: normal;" +
            "font-weight: normal;" +
            "src: local('Covered By Your Grace'), " +
                 "local('CoveredByYourGrace'), " +
                 "url('CoveredByYourGrace.ttf') format('truetype'); }",
    // Font loading for chrome
    "@media screen {" +
      "@font-face {" +
            "font-family: 'Covered By Your Grace';" +
            "font-style: normal;" +
            "font-weight: normal;" +
            "src: local('Covered By Your Grace'), " +
                 "local('CoveredByYourGrace'), " +
                 "url('CoveredByYourGrace.ttf') format('truetype'); } }",
    "table.sudoku {" +
            "border-collapse: collapse;" +
            "table-layout: fixed; }",
    "table.sudoku-select {" +
            "border-collapse: collapse; " +
            (IE6 ? "" : "border: 1px solid transparent; ") + 
            "line-height: 100%; " +
            "text-align: center; vertical-align: middle; " +
            "padding: 0px; }",
    "table.sudoku-work-table {" +
            "border-collapse: collapse; " +
            "border: 0; " +
            "margin: 0; " +
            "width: 100%; " +
            "height: 100%; }",
    "table.sudoku-work-table td {" +
            "border: 0; " +
            "padding: 0; " +
            "margin: 0; " +
            "line-height: 0; " +
            "text-align: center; " +
            "vertical-align: middle; } ",
    "table.sudoku-work-table div {" +
            "color: #22c;" +
            "width: 16px; height: 16px;" +
            "margin: -2px; " +
            "font: 12px 'Covered By Your Grace', sans-serif; }",
    "td.sudoku-cell {" +
            "width: 38px; height: 38px; " +
            "text-align: center; vertical-align: middle; " +
            "line-height: 0; " +
            "border: 1px solid black; }",
    "div.sudoku-border {" +
            "width: 36px; height: 36px; " +
            "border: 1px solid transparent; overflow: hidden; }",
    "div.sudoku-work {" +
            "width: 34px; height: 34px; " +
            "text-align: center; " +
            "cursor: hand; " +
            "padding: 0; margin: 0; border: 0; }",
    "div.sudoku-answer {" +
            "width: 54px; height: 54px; " +
            "text-align: center; " +
            "cursor: hand; " +
            "padding: 0; margin: -10px; border: 0;" + 
            "color: #22c;" +
            "font: 40px 'Covered By Your Grace', sans-serif;}",
    "div.sudoku-given {" +
            "width: 40px; height: 40px; " +
            "text-align: center; vertical-align: middle; " +
            "cursor: default; " +
            "padding: 0; margin: -3px; " +
            "line-height: 0; " + 
            "font-weight: bold; " + 
            "font: 27px 'arial black', sans-serif;}",
    "td.sudoku-border {" +
            "background: black; height: 1px; width: 1px; " +
            "border: 1px solid black;}",
    "img.sudoku-border {" +
            "background: black; height: 1px; width: 1px; }",
    "div.sudoku-popup {" +
            "position: absolute;" +
            "height: 42px; width: 220px;" +
            "font: 27px 'arial black', sans-serif;" +
            "cursor: default;" +
            "text-align: center;" +
            "padding: 2px;" +
            "vertical-align: middle; " +
            "border: 3px solid black;" +
            "background-color: white;" +
            "display: none; }",
    "div.sudoku-popup#victory {" +
            "background-color: yellow; }",
    "div.work-menu {" +
            "position: absolute;" +
            "display: none;" +
            "overflow: hidden; }",
    "div.work-menu table {" +
            "border: 2px solid black;" +
            "border-collapse: collapse;" +
            "border-spacing: 0;" +
            "width: 60px;" +
            "height: 80px; }",
    "div.work-menu td {" +
            "padding: 0;" +
            "}",
    "div.menu-clip {" +
            "height: 20px; width: 20px; border:0;" +
            "text-align:center;" +
            "vertical-align:middle;" +
            "overflow:hidden; }",
    "div.work-menu div.menu-text {" +
            "color: #aaa;" +
            "font: 20px Covered By Your Grace; padding:0; margin:0;" +
            "height: 30px; width: 30px; border:0;" +
            "margin: -5px;" +
            "vertical-align:middle;" +
            "cursor: pointer;" +
            "background-color:#fff;" +
            "opacity:1; }",
    "div.menu-mode {" +
            "height: 30px; width: 30px; border:0;" +
            "background-repeat:no-repeat;" +
            "background-image:url(pencilgray.png);" +
            "background-position:center;" +
            "vertical-align:middle;" +
            "cursor: default;" +
            "background-color:transparent;" +
            "opacity:1; }",
    "div.puzzle-menu {" +
            "position: absolute;" +
            "border: 2px solid black;" +
            "display: none;" +
            "overflow: hidden; }",
    "div.puzzle-menu table {" +
            "border-collapse: collapse;" +
            "border-spacing: 0;" +
            "width: 60px;" +
            "height: 60px; }",
    "div.puzzle-menu td {" +
            "padding: 0;" +
            "}",
    "div.puzzle-menu div.menu-text {" +
            "color: #aaa;" +
            "font: 14px Arial Black; padding:0; margin:0;" +
            "height: 20px; width: 20px; border:0;" +
            "margin: -0px;" +
            "vertical-align:middle;" +
            "cursor: pointer;" +
            "background-color:#fff;" +
            "opacity:1; }",
  ].join('\n');
}


lib.boardcss = boardcss;
lib.boardhtml = boardhtml;
lib.menuhtml = menuhtml;
lib.savestate = savestate;

})(SudokuUI);


