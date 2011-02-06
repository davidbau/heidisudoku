// UI for Heidi's Sudoku Hintpad
//
// Copyright 2010 David Bau, all rights reserved.

var SudokuUI = {};

(function(lib) {

lib.levels = [];
for (var j = 0; j <= 10; j++) { lib.levels.push(j); }

$(function() {

function startnewgame(seed) {
  var now = (new Date).getTime();
  var auto = (typeof seed == 'undefined');
  if (auto) { seed = now; }
  var puzzle, steps;
  for (;;) {
    puzzle = Sudoku.makepuzzle(seed);
    steps = SudokuHint.hintgrade(puzzle);
    if (!auto || steps <= 130) break;
    seed += 1;
  }
  gradepuzzle(puzzle, steps);
  var finished = (new Date).getTime();
  commitstate({
    puzzle: puzzle, seed: seed,
    answer: [], work: [], marks: [], color: [],
    gentime: finished, savename: ''
  });
}

// Starttime set on initial load based on the 'elapsed' state, and
// updated whenever loadstate() is called (i.e., when the user loads
// a game) or when commitstate() is called with a newer gentime
// (i.e., when a new game is started).
var starttime = (new Date).getTime();

if (!window.location.hash) {
  if (!loadstate('sudokustate')) {
    startnewgame();
  }
} else if (/^#seed=[^&]*$/.test(location.hash)) {
  startnewgame(location.hash.substr(6));
} else {
  // If you link to a game, time starts at the moment of the last move.
  state = currentstate();
  starttime = (new Date).getTime() - state.elapsed;
}

var graded = null;
var entrymode = false;

gradepuzzle();
redraw();

$(window).bind('hashchange', function() {
  $('#file,#victory').css('display', 'none');
  gradepuzzle();
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
  if ($(ev.target).closest('#file').length > 0) return;
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

var lastkeyat = { pos: null, num: null, timestamp: 0 };

$(document).keydown(function(ev) {
  if (workmenu.showing()) { workmenu.keydown(ev); return; }
  // if (filebox.showing()) { filebox.keydown(ev); return; }
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
  var num = ev.which - '1'.charCodeAt(0);
  if (ev.which == 32 || ev.which == 46 || ev.which == 189) {
    num = -1;
  }

  if (entrymode && num >= -1 && num < 9) {
    if (num == -1) { num = null; }
    if (state.puzzle[pos] !== num) {
      state.puzzle[pos] = null;
      if (num !== null) {
        if (!(SudokuHint.simplehint(state.puzzle)[pos] & (1 << num))) return;
        state.puzzle[pos] = num;
        if (!Sudoku.solvable(state.puzzle)) return;
      }
      state.answer[pos] = null;
      state.work[pos] = 0;
      state.mark[pos] = 0;
      state['seed'] = 0;
      state['savename'] = '';
      state['gentime'] = (new Date).getTime();
      commitstate(state);
      gradepuzzle();
    }
    return;
  }

  if (num >= 0 && num < 9 && state.puzzle[pos] !== null) return;

  var doubletap = false;
  var now = (new Date).getTime();
  if (num >= 0 && num < 9) {
    if (lastkeyat.num == num &&
        lastkeyat.pos == pos && now - lastkeyat.timestamp < 500) {
      doubletap = true;
      lastkeyat.num = null;
    } else {
      lastkeyat.num = num;
      lastkeyat.pos = pos;
      lastkeyat.timestamp = now;
    }
  } else if (ev.which == 13 && lastkeyat.num !== null &&
      lastkeyat.pos == pos && now - lastkeyat.timestamp < 2000) {
    doubletap = true;
    num = lastkeyat.num;
    lastkeyat.num = null;
  } else {
    lastkeyat.num = null;
  }

  if (num >= 0 && num < 9) {
    if (doubletap) {
      state.work[pos] = 0;
      state.mark[pos] = 0;
      state.answer[pos] = num;
    } else {
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
    }
  }
  else if (num == -1) {
    state.work[pos] = 0;
    state.mark[pos] = 0;
    state.answer[pos] = null;
    state.color[pos] = null;
  } else if (ev.which == 'W'.charCodeAt(0)) {
    state.color[pos] = null;
  } else if (ev.which == 'P'.charCodeAt(0) || ev.which == 'V'.charCodeAt(0)) {
    state.color[pos] = 1;
  } else if (ev.which == 'B'.charCodeAt(0)) {
    state.color[pos] = 2;
  } else if (ev.which == 'G'.charCodeAt(0)) {
    state.color[pos] = 3;
  } else if (ev.which == 'Y'.charCodeAt(0)) {
    state.color[pos] = 4;
  } else if (ev.which == 'O'.charCodeAt(0)) {
    state.color[pos] = 5;
  } else if (ev.which == 'R'.charCodeAt(0)) {
    state.color[pos] = 6;
  } else {
    return;
  }
  // fast redraw of just the keyed cell, then commit state after a timeout
  redraw(state, pos);
  setTimeout(function() {
    commitstate(state);
  }, 0);
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

$(window).bind('contextmenu', function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
});

$('td.sudoku-cell').mousedown(function(ev) {
  ev.preventDefault();
  hidepopups();
  var pos = parseInt($(this).attr('id').substr(2));
  justclicked = pos;
  var state = currentstate();
  if (isalt(ev)) {
    var bits = 0;
    var hint = Sudoku.puzzlechoices(state.puzzle, pos);
    workmenu.show(this, $('div.puzzle-menu'), state.puzzle[pos], 0, 0,
                  hint, true,
    function(num, w, m) {
      state = currentstate();
      if (state.puzzle[pos] !== num) {
        state.puzzle[pos] = num;
        if (num !== null) {
          state.answer[pos] = null;
          state.work[pos] = 0;
          state.mark[pos] = 0;
        }
        state['seed'] = 0;
        state['savename'] = '';
        state['gentime'] = (new Date).getTime();
        commitstate(state);
        gradepuzzle();
      }
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
      if (state.answer[pos] !== num ||
          state.work[pos] !== w ||
          state.mark[pos] !== m) {
        state.answer[pos] = num;
        state.work[pos] = w;
        state.mark[pos] = m;
        commitstate(state);
      }
    });
  }
  ev.stopPropagation();
});

function gradepuzzle(puzzle, steps) {
  var state = currentstate();
  if ('savename' in state && state.savename.length > 0) {
    $('#grade').html(htmlescape(state.savename));
    entrymode = false;
    return;
  }
  if (!puzzle) puzzle = state.puzzle;
  var current = encodepuzzle81(puzzle);
  if (graded === current) return;
  graded = current;

  if (current == '') {
    $('#grade').html('&nbsp;');
    entrymode = true;
    return;
  }
  if (!Sudoku.uniquesolution(puzzle)) {
    $('#grade').html(lib.levels[0]);
    entrymode = true;
    return;
  }
  if (!steps) steps = SudokuHint.hintgrade(puzzle);
  var level = Math.max(1, Math.min(lib.levels.length - 1,
              Math.floor(steps / 5)));
  $('#grade').html(lib.levels[level]);
  entrymode = false;
  return;
}

$('#newbutton').click(function(ev) {
  hidepopups();
  if (isalt(ev)) {
    redraw({puzzle: Sudoku.emptyboard(), answer: Sudoku.emptyboard(),
            work: zdecodebits(''), mark: zdecodebits(''),
            color: Sudoku.emptyboard(),
            seed: 0, savename: '', gentime: (new Date).getTime()});
    $('#grade').html('&nbsp;');
    $.getJSON('http://davidbau.com/sudoku/min.json?callback=?', function(p) {
      var puzzle = decodepuzzle81(p);
      commitstate({puzzle: puzzle, answer: [], work: [], mark: [], color: [],
                   seed: 0, savename: '', gentime: (new Date).getTime()});
      gradepuzzle();
    });
    ev.preventDefault();
  } else {
    startnewgame();
    gradepuzzle();
  }
});

$('#clearbutton').click(function(ev) {
  hidepopups();
  var state = currentstate();
  var cleared = {puzzle: state.puzzle, answer:[], work:[], mark:[], color:[]};
  if (isalt(ev)) {
    cleared = {puzzle: [], answer: [], work: [], mark: [], color: [],
               seed: 0, savename: '', gentime: (new Date).getTime()};
    gradepuzzle();
    ev.preventDefault();
  }
  commitstate(cleared);
});

$('#timerbutton').mousedown(function(ev) {
  hidepopups();
  showpopup('#timer');
  function updatetime() {
    if ($('#timer').is(':visible')) {
      rendertime();
      setTimeout(updatetime, 1500 - ((new Date).getTime() % 1000));
    }
  }
  updatetime();
});

$('#hintbutton,#checkbutton,#timerbutton').bind(
    'mouseup mouseleave', function() {
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
    state.color[j] = null;
  }
  if (hint !== null) {
    if (hint.errors) {
      for (var j = 0; j < hint.errors.length; j++) {
        state.color[hint.errors[j]] = 6;
      }
    } else {
      for (var j = 0; j < hint.support.length; j++) {
        state.color[hint.support[j]] = 2;
      }
      if (hint.support.length == 0 || isalt(ev)) {
        for (var j = 0; j < hint.reduced.length; j++) {
          state.color[hint.reduced[j]] = 3;
        }
        if (isalt(ev)) {
          ev.preventDefault();
          if (ev.shiftKey) {
            var hintlog = JSON.parse(JSON.stringify(hint));
            hintlog.exclude = listbits(hintlog.exclude);
            console.log(JSON.stringify(hintlog));
          }
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
  if (isalt(ev)) {
    for (var j = 0; j < 81; j++) {
      state.color[j] = null;
      if (sofar[j] !== null) continue;
      state.work[j] = 0;
      state.mark[j] = 0;
    }
    ev.preventDefault();
  } else {
    state.work = SudokuHint.pencilmarks(sofar, state.work);
    for (var j = 0; j < 81; j++) {
      state.mark[j] &= state.work[j];
    }
  }
  commitstate(state);
});

$('#solvebutton').click(function(ev) {
  hidepopups();
  var state = currentstate();
  var constraints = SudokuHint.constraints(state.puzzle);
  if (isalt(ev)) {
    ev.preventDefault();
    state.color = constraints.level;
  } else {
    state.answer = constraints.answer;
  }
  commitstate(state);
});

$('#filebutton').click(function(ev) {
  hidepopups();
  var state = currentstate();
  if (isalt(ev)) {
    ev.preventDefault();
    var constraints = SudokuHint.constraints(state.puzzle);
    // state.answer = constraints.answer;
    state.color = constraints.level;
    commitstate(state);
    return;
  }
  if (!('savename' in state) || state.savename.length == 0) {
    state.savename = $.trim($('#grade').text());
  }
  if (!('gentime' in state) || state.gentime == 0) {
    state.gentime = (new Date).getTime();
  }
  filebox.show(state);
  ev.stopPropagation();
});

$('#checkbutton').mousedown(function(ev) {
  hidepopups();
  var state = currentstate();
  for (var j = 0; j < 81; j++) {
    state.color[j] = null;
  }
  var sofar = boardsofar(state);
  var conflicts = SudokuHint.conflicts(sofar);
  if (conflicts.length == 0 && isalt(ev)) {
    ev.preventDefault();
    var unz = SudokuHint.unzeroedwork(state.puzzle, state.answer, state.work);
    conflicts = SudokuHint.mistakes(state.puzzle, state.answer, unz);
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

function formatelapsed(elapsed) {
  if (!(elapsed >= 0)) { return '-'; }
  var seconds = Math.floor(elapsed / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  seconds -= minutes * 60;
  minutes -= hours * 60;
  var formatted = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  if (hours > 0) {
    formattted = hours + ':' + (minutes < 10 ? '0' : '') + formatted;
  }
  return formatted;
}

function rendertime() {
  $('#timer').text(formatelapsed((new Date).getTime() - starttime));
}

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

function redraw(s, pos) {
  var state = s ? s : currentstate();
  var startpos = 0;
  var endpos = 81;
  if (typeof pos != 'undefined') { startpos = pos; endpos = pos + 1; }
  var puzzle = state.puzzle;
  var answer = state.answer;
  var work = state.work;
  var mark = state.mark;
  var color = state.color;
  for (var j = startpos; j < endpos; j++) {
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
    var cn = color[j];
    if (cn === null) cn = 0;
    var c = ['', '#ecf', '#bef', '#afb', '#ffa', '#fea', '#fdd',
             '#ddd', '#888'][cn];
    $("#sc" + j).css('background-color', c);
  }
}

function loadstate(name) {
  if (!('localStorage' in window) || !('JSON' in window) ||
      !(name in window.localStorage)) {
    return false;
  }
  var state = JSON.parse(localStorage[name]);
  if (!state.puzzle || !state.puzzle.length) return false;
  if ('elapsed' in state) {
    starttime = (new Date).getTime() - state.elapsed;
  }
  commitstate(state);
  return true;
}

function currentstate() {
  return decodeboardstate($.deparam.fragment());
}

function commitstate(state) {
  var now = (new Date).getTime();
  if (state.gentime > starttime) {
    starttime = state.gentime;
  }
  state.elapsed = (now - starttime);
  $.bbq.pushState(encodeboardstate(state));
  savestate('sudokustate', state);
}

lib.debugstate = commitstate;

function savestate(name, state) {
  if (!('localStorage' in window) || !('JSON' in window)) {
    return;
  }
  localStorage[name] = JSON.stringify(state);
}

// rlebits
// bit offcount oncount offcount oncount
function decodeboardstate(data) {
  var puzzle = decodepuzzle81('puzzle' in data ? data.puzzle : '');
  var answer = decodepuzzle81('answer' in data ? data.answer : '');
  var work = zdecodebits('work' in data ? data.work : '');
  var mark = zdecodebits('mark' in data ? data.mark : '');
  var color = decodepuzzle81('color' in data ? data.color : '');
  var result = {
    puzzle: puzzle,
    answer: answer,
    work: work,
    mark: mark,
    color: color
  };
  if ('seed' in data) { result.seed = data.seed; }
  if ('gentime' in data) { result.gentime = data.gentime; }
  if ('savename' in data) { result.savename = data.savename; }
  if ('elapsed' in data) { result.elapsed = data.elapsed; }
  return result;
}

function encodeboardstate(state) {
  var result = {
    puzzle: encodepuzzle81(state.puzzle)
  }
  if ('answer' in state) { result.answer = encodepuzzle81(state.answer); }
  if ('work' in state) { result.work = zencodebits(state.work); }
  if ('mark' in state) { result.mark = zencodebits(state.mark); }
  if ('color' in state) { result.color = encodepuzzle81(state.color); }
  if ('seed' in state) { result.seed = state.seed; }
  if ('gentime' in state) { result.gentime = state.gentime; }
  if ('savename' in state) { result.savename = state.savename; }
  if ('elapsed' in state) { result.elapsed = state.elapsed; }
  return result;
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

function shorttobase64(int18) {
  return base64chars[(int18 >> 6) & 63] +
         base64chars[int18 & 63];
}

function base64toshort(base64, index) {
  return (base64chars.indexOf(base64.charAt(index)) << 6) +
          base64chars.indexOf(base64.charAt(index + 1));
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
  for (var j = 0; j + 1 < base64.length; j += 2) {
    result.push(base64toshort(base64, j));
  }
  return result;
}

function zencodebits(numbers) {
  result = [];
  for (var j = 0; j < numbers.length; j++) {
    if (numbers[j] == 0) {
      var zeroes = 1;
      while (numbers[j + zeroes] == 0 && j + zeroes < numbers.length) {
        zeroes += 1;
      }
      if (zeroes > 1) {
        j += zeroes;
        if (j < numbers.length) { result.push(512 | zeroes); }
        j -= 1;
        continue;
      }
    }
    result.push(numbers[j] & 511);
  }
  return arraytobase64(result);
}

function zdecodebits(base64) {
  var result = [];
  var znums = base64toarray(base64);
  for (var j = 0; j < znums.length; j++) {
    if (znums[j] & 512) {
      var zeroes = znums[j] & 511;
      while (zeroes > 0) {
        result.push(0);
        zeroes -= 1;
      }
    } else {
      result.push(znums[j])
    }
  }
  while (result.length < 81) {
    result.push(0);
  }
  return result;
}

var workmenu = (function() {
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
    if (!showing) { return; }
    var topleft = $(menu).offset();
    var width = $(menu).outerWidth();
    var height = $(menu).outerHeight();
    var dx = Math.max(topleft.left - x, x - (topleft.left + width), 0);
    var dy = Math.max(topleft.top - y, y - (topleft.top + height), 0);
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist >= 10) {
      hide();
      $(menu).css('opacity', '');
    } else if (dist > 2) {
      $(menu).css('opacity', (10 - dist) / 8);
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

// save strategy:

// each board has a gentime, which is the last time at which the board
// was generated, and a savename, which is the name under which the board
// was last saved.

// when saving the board normally, the gentime isn't changed, and the
// game is overwritten.

// when saving 'a new copy' the gentime is brought to the current time
// and the savename may be changed.

var filebox = (function() {
  $('.save-closebutton').click(function() { hidepopups(); });

  function allsaved() {
    var key;
    var result = [];
    for (var j = 0, len = localStorage.length; j < len; j++){
      key = localStorage.key(j);
      if ((/^sudokusave_/).test(key)) {
        var state = JSON.parse(localStorage.getItem(key));
        if (!('gentime' in state)) {
          state.gentime = parseInt(key.substr(key.indexOf('_') + 1));
        }
        result.push({key: key, state:state});
      }
    }
    result.sort(function(a, b) { return b.state.gentime - a.state.gentime; });
    return result;
  }

  var currentstate = null;
  var now = 0;

  // functions to get the selection
  function getselected() {
    var result = [];
    $('.save-listbox ul li:not(:first) input:checked').each(function(j, elt) {
      result.push($(elt).parent('li').attr('data-key'));
    });
    return result;
  }
  function getselectedset() {
    var selected = getselected();
    var result = {};
    for (var j = 0; j < selected.length; j++) {
      result[selected[j]] = true;
    }
    return result;
  }

  // function to show the filebox
  function show(state) {
    currentstate = state;
    now = (new Date).getTime();
    var name = 'savename' in state ? state.savename : '';
    $('#savename').val(name);
    $('#shortenurl').css('display', '');
    $('#shortenedurl').css('display', '');
    $('.save-listbox ul li:not(:first)').remove();
    redrawlist();
    setTimeout(function() { $('#savename').focus(); }, 0);
    showpopup('#file');
  }

  function summarize(state) {
    var summary = [];
    var needed = 0, finished = 0;
    for (var j = 0; j < 81; j++) {
      if (state.puzzle[j] === null) {
        needed += 1;
        if (state.answer[j] !== null) { finished += 1; }
      }
    }
    if (needed + finished > 0) {
      summary.push(finished + '/' + needed);
    }
    if (state.elapsed > 0) {
      summary.push(formatelapsed(state.elapsed));
    }
    if (summary.length == 0) { return ''; }
    return '(' + summary.join(', ') + ')';
  }

  // function to render the filebox
  function redrawlist(force) {
    var saved = allsaved();
    // first ensure that the list has the right set of items.
    var items = $('.save-listbox ul li:not(:first)');
    var rebuild = true;
    if (items.length == saved.length && !force) {
      rebuild = false;
      for (var j = 0; j < saved.length; j++) {
        if (saved[j].key != $(items[j]).attr('data-key')) {
          rebuild = true;
          break;
        }
      }
    }
    if (rebuild) {
      var selected = getselectedset();
      $('.save-listbox ul li:not(:first)').remove();
      for (var j = 0; j < saved.length; j++) {
        var checked = false;
        var item = saved[j];
        if (item.key in selected) {
          checked = true;
        }
        $('.save-listbox ul').append(
           '<li data-key="' + htmlescape(item.key) + 
           '"><input type=checkbox' + (checked ? ' checked' : '') +
           '> ' + htmlescape(item.state.savename) +
           ' ' + lib.timeago(now - item.state.gentime) +
           ' ' + summarize(item.state) +
           '</li>');
      }
      items = $('.save-listbox ul li:not(:first)');
    }
    // Now update checkmarks and buttons
    var lastcopykey = null;
    var changedname = false;
    var currentname = $.trim($('#savename').val());
    var countselected =
        $('.save-listbox ul li:not(:first) input:checked').length;
    for (var j = 0; j < saved.length; j++) {
      if (currentstate !== null &&
          saved[j].state.gentime == currentstate.gentime) {
        lastcopykey = saved[j].key;
        changedname = (saved[j].state.savename != currentname);
      }
    }
    $('.save-listbox li').css('font-weight', '');
    if (lastcopykey !== null) {
      $('.save-listbox li[data-key=' + lastcopykey + ']').css(
          'font-weight', 'bold');
    }
    $('#savename').attr('disabled', currentstate === null);
    $('#savecurrent').attr('disabled', !(lastcopykey === null || !changedname));
    $('#savecopy').attr('disabled', !(lastcopykey !== null && changedname &&
      currentname != ''));
    $('#selectall').attr('disabled', saved.length == 0);
    $('#deleteselected').attr('disabled', countselected == 0);
    $('#loadselected').attr('disabled', countselected != 1);
  }

  $('.save-listbox').delegate('input', 'change', function() {
    redrawlist();
  });

  var lastclicktime = 0;
  var lastclickelt = null;
  $('.save-listbox').delegate('li', 'click', function(ev) {
    if (ev.target.tagName == 'INPUT') return;
    if ($(ev.target).is(':first-child')) return;
    lastclickelt = ev.target;
    lastclicktime = (new Date).getTime();
    $(this).find('input').click();
    redrawlist();
  });

  $('.save-listbox').delegate('li', 'mousedown', function(ev) {
    if (ev.target === lastclickelt &&
        (new Date).getTime() - lastclicktime < 500) {
      ev.preventDefault();
      $('.save-listbox ul li:not(:first) input').attr('checked', false);
      $(lastclickelt).find('input').attr('checked', true);
      redrawlist();
      setTimeout(function() { $('#loadselected').click(); }, 0);
    }
  });

  $('#savename').keydown(function(ev) {
    if (ev.which == 13) {
      ev.preventDefault();
      if ($('#savecurrent').is(':enabled')) { $('#savecurrent').click(); }
      else if ($('#savecopy').is(':enabled')) { $('#savecopy').click(); }
      return;
    }
    setTimeout(function() { redrawlist(); }, 0);
  });

  $('#savecurrent,#savecopy').click(function(ev) {
    if (!('gentime' in currentstate) || $(ev.target).is('#savecopy')) {
      currentstate.gentime = now;
    }
    var currentname = $.trim($('#savename').val());
    if (currentname == '') return;
    currentstate.savename = currentname;
    var key = 'sudokusave_' + currentstate.gentime;
    savestate(key, currentstate);
    redrawlist(true);
    setTimeout(function() { hidepopups(); loadstate(key); }, 800);
  });

  $('#loadselected').click(function() {
    var selection = getselected();
    if (selection.length < 1) return;
    if (loadstate(selection[0])) {
      hidepopups();
    }
  });

  $('#selectall').click(function() {
    $('.save-listbox ul li:not(:first) input').attr('checked', true);
    redrawlist();
  });

  $('#deleteselected').click(function() {
    var selection = getselected();
    if (selection.length > 0) {
      for (var j = 0; j < selection.length; j++) {
        localStorage.removeItem(selection[j]);
      }
      redrawlist();
    }
  });

  $('#shortenurl').click(function(ev) {
    ev.preventDefault();
    googlurl('http://davidbau.com/sudoku/redirect.html' +
             location.hash, function(s) {
      if (!s) return;
      $('#shortenurl').css('display', 'none');
      $('#shortenedurl').val(s).css('display', 'block').focus().select();
    });
  });

  return { show: show };
})();

lib.commitstate = commitstate;
});

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

function isalt(ev) {
  return (ev.which == 3) || (ev.ctrlKey);
}

function htmlescape(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").
           replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                  "abcdefghijklmnopqrstuvwxyz" +
                  "0123456789" +
                  "-_";

function googlurl(url, cb) {
  jsonlib.fetch({
    url: 'https://www.googleapis.com/urlshortener/v1/url?' +
         'key=AIzaSyCIhMVF0u3UknPnTV-7sSxFG3nEpwDdidE',
    header: 'Content-Type: application/json',
    data: JSON.stringify({longUrl: url})
  }, function (m) {
    var result = null;
    try {
      if ('content' in m) {
        result = JSON.parse(m.content).id;
        if (typeof result != "string") { result = null; }
      }
    } catch (e) {
      result = null;
    }
    cb(result);
  });
}

lib.boardhtml = boardhtml;
lib.menuhtml = menuhtml;
lib.debugstate = function(s) {
  setTimeout(function() { lib.debugstate(s); }, 10);
};

})(SudokuUI);


