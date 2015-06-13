// Simple, minimal sudoku solving and hinting engine in Javascript.
// March 2010 version
//
// Copyright 2010 David Bau, all rights reserved.
//
// Usage:
//
// A board has 81 entries that are null or 0-8:
//      board = [null, null, 0, null, 1, null, ... etc];
//
// Any board can be solved like this - null is returned if no solution:
//      solved = SudokuSolver.solution(board);
//
// Unique solutions can be detected:
//      if (!SudokuSolver.uniquesolution(board)) alert('not solvable');
//
// And random minimal puzzles can be generated:
//      puzzle = SudokuSolver.makepuzzle()

var Sudoku = {};

(function(lib) {

// Returns an array of 81 nulls.

function emptyboard() {
  var result = [];
  for (var pos = 0; pos < 81; pos++) {
    result.push(null);
  }
  return result;
}

// Given a 81-length array board with numbers 0-8 in some positions
// and null in other positions, returns an 81-length array containing
// a fully filled-in solution, or null if one doesn't exist.  The
// solution does not need to be unique.

function solution(board, limit) {
  if (typeof(limit) == 'undefined') limit = Infinity;
  return solvefast(board, limit).solution;
}

// Returns true if the given board is solvable.  The solution does not
// need to be unique.

function solvable(board, limit) {
  if (typeof(limit) == 'undefined') limit = Infinity;
  return solvefast(board, limit).solution !== null;
}

// Returns true if the given board is solvable and the solution is
// unique.

function uniquesolution(board) {
  var s = solvefast(board, Infinity);
  if (s.solution === null) return false;
  s = solvenext(s.track, Infinity);
  return (s.solution === null);
}

// Makes a minimal sudoku puzzle by generating a random solved board
// and then finding a subset of squares that uniquely determine a
// solution.

function makepuzzle(seed, quick, symmetric) {
  // Apply seed if supplied
  var oldrandom = null;
  if (seed && 'seedrandom' in Math) {
    oldrandom = Math.random;
    Math.seedrandom('sudoku-' + seed);
  }

  // Make a solved board
  var solved = solution(emptyboard());

  // Reveal a subsequence where later squares aren't immediately
  // deduced from earlier ones.  puzzle is a list of [position, value].
  var puzzle = [];
  var deduced = emptyboard();
  for (var k = (symmetric ? 2 : 1); k > 0; --k) {
    // Look at squares in shuffled order
    var order = unconstrained(deduced);
    for (var i = 0; i < order.length; ++i) {
      var pos = order[i];
      if (deduced[pos] === null && (k < 2 || deduced[80 - pos] === null)) {
        var hint = {pos: pos, num: solved[pos]};
        if (symmetric) {
          hint.sym = solved[80 - pos];
          deduced[80 - pos] = solved[80 - pos];
        }
        deduced[80 - pos] = solved[80 - pos];
        puzzle.push(hint);
        deduce(deduced);
      }
    }
  }

  // Shuffle the revealed squares
  // shuffle(puzzle);
  puzzle.reverse();

  // Restore native prng
  if (oldrandom !== null) {
    Math.random = oldrandom;
  }

  // Remove any revealed squares as long as a unique solution is
  // determined.  The process below is slow and could be skipped
  // if absolutely minimal puzzles are not required.
  if (!quick) {
    for (var i = puzzle.length - 1; i >= 0; i--) {
      var old = puzzle[i];
      puzzle.splice(i, 1);
      if (!uniquesolution(boardforentries(puzzle))) {
        puzzle.splice(i, 0, old);
      }
    }
  }

  // Convert the puzzle list to a 81-square board
  return boardforentries(puzzle);
}

// Solves a partially arbitrarily filled-in board quickly, or returns
// null if there is no solution.  Spends no more than "limit" steps,
// after which no return value is returned.  The parallel solution
// technique here is only needed when the input board is allowed to be
// unsolvable.  Most of the time, a board can be solved or proved to have
// no solution in less than 100 steps.  However, on certain unsolvable
// boards, it is possible for a depthfirst search to get stuck in an
// unlucky path that leads to an exponential explosion of backtracking
// that will never succeed.  Such paths do not have high probability,
// so after 100 steps we simply run "rabbits" in parallel to the main
// "turtle" to expore other paths that allow us to prove unsovability
// quickly in the cases where our turtle happens to be on an unlucky
// path.

function solvefast(original, limit) {
  var turtle = solveboard(original, 100);
  var steps = 100;
  var rabbitsteps = 60;
  while (steps < limit) {
    if (turtle.solution !== null || turtle.track.length == 0) return turtle;
    var rabbit = solveboard(original, rabbitsteps);
    if (rabbit.solution !== null || rabbit.track.length == 0) return rabbit;
    turtle = solvenext(turtle.track, rabbitsteps);
    steps += 2 * rabbitsteps;
    rabbitsteps += 10;
  }
}

// Spends the given (limit) number of iterations on searching for
// a solution to the input (original) board.  The return value is
// an object {track:[some array], solution:board} that represents
// the search state.  If solution is null, no solution has been
// found yet.  If the track additionally has length zero, all
// possible search paths have been exhausted for some ordering of
// the depthfirst search tree and the board has been proved to be
// unsolvable.

function solveboard(original, limit) {
  var board = original.slice();
  var guesses = deduce(board);
  if (guesses === null) return {track:[], solution:null};
  if (guesses.length == 0) return {track:[], solution:board};
  return solvenext([{guesses:guesses, c:0, board:board}], limit);
}

// Spends the given (limit) number of iterations continuing a
// search whose state (remembered) was returned by a previous
// solveboard or solvenext call.  The return value has the
// same form as solveboard.  Notice that depthfirst search
// ordering is randomized, so calling solvenext on the same
// initial search state may result in different paths being
// followed.

function solvenext(remembered, limit) {
  var steps = 0;
  while (remembered.length > 0 && steps < limit) {
    steps += 1;
    var r = remembered.pop();
    if (r.c >= r.guesses.length) continue;
    remembered.push({guesses:r.guesses, c:r.c+1, board:r.board});
    workspace = r.board.slice();
    workspace[r.guesses[r.c].pos] = r.guesses[r.c].num;
    newguesses = deduce(workspace);
    if (newguesses === null) continue;
    if (newguesses.length == 0) return {track:remembered, solution:workspace};
    remembered.push({guesses:newguesses, c:0, board:workspace});
  }
  return {track:remembered, solution:null};
}

// Given a partially-filled in board, continues filling in
// squares that are directly deduced by existing squares.
// When local deductions are no longer possible, returns an array
// of [{pos, val}, {pos, val}, ...] alternatives, or the empty array
// if the board is full and correct, or null if there are no legal
// moves and the board is not finished.

function deduce(board) {
  while (true) {
    var choices = bestchoices(board);
    if (choices === null) return null;
    if (choices.length == 0) return [];
    if (choices[0].length != 1) return choices[0];
    var done = 0;
    for (i = 0; i < choices.length; i++) {
      var num = choices[i][0].num;
      var bit = 1 << num;
      if (!(done & bit)) {
        done |= bit;
        board[choices[i][0].pos] = num;
      }
    }
  }
}

// Given an input 81-number-or-null array (board), returns an array
// of positions, ordered from least-constrained to most-constrained,
// with positions at the same level of constraint shuffled.
function unconstrained(board) {
  var bits = figurebits(board);
  var results = [];
  for (var freedom = 0; freedom < 10; freedom++) {
    results.push([]);
  }
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] === null) {
      results[listbits(bits.allowed[pos]).length].push(pos);
    }
  }
  var result = [];
  for (freedom = results.length - 1; freedom >= 0; --freedom) {
    shuffle(results[freedom]);
    result.push.apply(result, results[freedom]);
  }
  return result;
}

// Given an input 81-number-or-null array (board), returns a nested
// array of possible moves that could be filled in without contradicting
// the local rules of sudoku (although the possible moves might contradict
// the global state of the board).  The output is of the form:
//
//     bestchoices = [ choice, choice, choice ]
//
// where each choice is a list of alternative moves
//
//     choice = [{pos, val}, {pos, val}, {pos, val}]
//
// Within each choice, we have a list of {pos, val} moves which are all
// locally legal but which contradict each other.  A depthfirst searcher
// would have to choose one but not the others.
//
// The function applies local sudoku rules to find the maximally
// constrained squares, and then returns a list of choices
// with the same minimized branching factor.  So each choice array
// has the same length as every other, and they are all the minimum
// length arrays that are found.
//
// The returned choices in the bestchoices array are shuffled, and the
// alternatives within the first choice, if any, are shuffled.
//
// If no moves exist that fit with the local rules of sudoku, an empty
// array is returned.

function bestchoices(board) {
  var result = [];
  var bits = figurebits(board);
  var emptycount = 0;
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] === null) {
      emptycount += 1;
      var numbers = listbits(bits.allowed[pos]);
      if (result.length && numbers.length > result[0].length) continue;
      var choices = [];
      for (var i = 0; i < numbers.length; i++) {
        choices.push({pos: pos, num: numbers[i]});
      }
      updatechoices(result, choices);
    }
  }
  if (emptycount == 0) return [];
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var numbers = listbits(bits.needed[axis * 9 + x]);
      for (var j = 0; j < numbers.length; j++) {
        bit = 1 << numbers[j];
        var choices = [];
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (bits.allowed[pos] & bit) {
            choices.push({pos: pos, num: numbers[j]});
          }
        }
        updatechoices(result, choices);
      }
    }
  }
  if (result.length == 0 || result[0].length == 0) return null;
  shuffle(result);
  shuffle(result[0]);
  return result;
}

// Given an input (board) returns an object of the form
//
//     {allowed: [81 nums 0-511], needed:[27 nums 0-511]}
//
// where, in the allowed array, each bit represents a number 1<<n that
// would be allowed to be placed in the given square, and in the needed
// array, each bit represents a number 1<<n that is not present in a
// particular row, column, or block.

function figurebits(board) {
  var needed = [];
  var allowed = [];
  for (var i = 0; i < board.length; i++)  {
    allowed.push(board[i] === null ? 511 : 0);
  }
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var bits = axismissing(board, x, axis);
      needed.push(bits);
      for (var y = 0; y < 9; y++) {
        allowed[posfor(x, y, axis)] &= bits
      }
    }
  }
  return {allowed:allowed, needed:needed};
}

// Returns the board position of the given 0-8 (x) and 0-8 (y) when the
// ordering is col-row (axis=0), row-col (axis=1) or block-order (axis=2)

function posfor(x, y, axis) {
  if (axis == 0) return x * 9 + y;
  if (axis == 1) return y * 9 + x;
  return [0,3,6,27,30,33,54,57,60][x] + [0,1,2,9,10,11,18,19,20][y];
}

// Returns the column (axis=0), row (axis=1), or block (axis=2) of the
// given position (pos).

function axisfor(pos, axis) {
  if (axis == 0) return (pos - pos % 9) / 9;
  if (axis == 1) return pos % 9;
  return ((pos - pos % 27) / 27) * 3 + ((pos - pos % 3) / 3) % 3;
}

// Given a block (0-8) and an orientation, returns the position within
// the block for x, y from 0-2, or in other blocks along the same row
// or column for x, y in the range 3-8.
function posforblock(block, axis, x, y) {
  var c = 3 * (block % 3);
  var r = (block - block % 3);
  if (axis == 0) { c += x; r += y; }
  else { c += y; r += x; }
  c = c % 9;
  r = r % 9;
  return r * 9 + c;
}

// Returns a bitfield (0-511) representing the numbers that are missing
// in the specified (x) column (axis=0), row (axis=1), or block (axis=2).

function axismissing(board, x, axis) {
  var bits = 0
  for (var y = 0; y < 9; y++) {
    var e = board[posfor(x, y, axis)];
    if (e !== null) bits |= 1 << e;
  }
  return 511 ^ bits;
}

// Converts a bitfield (0-511) into an array of integers (0-8), one
// for each bit that was set to "1".

function listbits(bits) {
  var result = [];
  for (var y = 0; y < 9; y++) {
    if (0 != (bits & (1 << y))) result.push(y);
  }
  return result;
}

// Helper for the bestchoices() implementation: if the given choice array
// (choices) is better-constrained than the passed result array (result),
// then any existing results are cleared and the choice is added.  If the
// given choices are same-constrained, then the choice is just added on.
// If the given choices are looser-constrained, then they are just
// discarded.

function updatechoices(result, choices) {
  if (result.length) {
    if (choices.length > result[0].length) return;
    if (choices.length < result[0].length) result.length = 0;
  }
  result.push(choices);
}

// Converts a list of {pos, val} moves into a populated 81-square board
// of numbers (0-8) and nulls where there is no move.

function boardforentries(entries) {
  var result = emptyboard();
  for (var i = 0; i < entries.length; i++) {
    result[entries[i].pos] = entries[i].num;
    if (entries[i].sym != null) {
      result[80 - entries[i].pos] = entries[i].sym;
    }

  }
  return result;
}

// Shuffles the given array in-place using fisher-yates.

function shuffle(o) {
  for (var j, x, i = o.length; i;
       j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
}

function hasconflicts(board) {
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var bits = 0;
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (board[pos] === null) continue;
        var bit = 1 << board[pos];
        if (bits & bit) return true;
        bits |= bit;
      }
    }
  }
  return false;
}

function puzzlechoices(board, pos) {
  var result = 0;
  var trial = board.slice();
  trial[pos] = null;
  if (hasconflicts(trial) > 0) return 0;
  for (var j = 0; j < 9; j++) {
    trial[pos] = j;
    if (hasconflicts(trial) > 0) continue;
    if (!solvable(trial)) continue;
    result |= (1 << j);
  }
  return result;
}


lib.emptyboard = emptyboard;
lib.solution = solution;
lib.solvable = solvable;
lib.uniquesolution = uniquesolution;
lib.makepuzzle = makepuzzle;
lib.puzzlechoices = puzzlechoices;

})(Sudoku);

