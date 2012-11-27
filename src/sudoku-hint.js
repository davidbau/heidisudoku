// Sudoku hint engine for Heidi's Sudoku Hintpad
// Implements various nonbacktracking sudoku deduction techniques.
//
// Copyright 2010 David Bau, all rights reserved.

var SudokuHint = {};

(function(lib) {

var debugging_enabled = false;

function emptyboard() {
  var result = [];
  for (var pos = 0; pos < 81; pos++) {
    result.push(null);
  }
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

function boardsofar(puzzle, answer) {
  var sofar = puzzle.slice();
  for (var j = 0; j < 81; j++) {
    if (answer[j] !== null) sofar[j] = answer[j];
  }
  return sofar;
}


// Assume that if a number isn't marked at all within a block,
// the player thinks that the number could be anywhere in the block.
function unzeroedwork(puzzle, answer, work) {
  var result = work.slice();
  var solution = Sudoku.solution(puzzle);
  var sofar = boardsofar(puzzle, answer);
  for (var block = 0; block < 9; block++) {
    var marked = 0;
    for (var y = 0; y < 9; y++) {
      var pos = posfor(block, y, 2);
      if (sofar[pos] !== null) {
        marked |= (1 << sofar[pos]);
      } else {
        marked |= work[pos];
      }
    }
    var unmarked = 511 ^ marked;
    if (unmarked != 0) {
      for (var y = 0; y < 9; y++) {
        var pos = posfor(block, y, 2);
        if (sofar[pos] === null) {
          result[pos] |= unmarked;
          // benefit of the doubt: assume the player thinks the correct
          // solution is one of the options in an empty square.
          if (work[pos] == 0 && solution !== null) {
            result[pos] |= (1 << solution[pos]);
          }
        }
      }
    }
  }
  return result;
}

function fillzeroeswork(puzzle, answer, work) {
  var result = work.slice();
  var sofar = boardsofar(puzzle, answer);
  for (var j = 0; j < 81; j++) {
    if (result[j] == 0 && sofar[j] === null) {
      result[j] = 511;
    }
  }
  return result;
}

function simplehint(board) {
  return figurebits(board).allowed;
}

function conflicts(board) {
  var marked = emptyboard();
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var counts = [0,0,0,0,0,0,0,0,0];
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (board[pos] !== null) {
          counts[board[pos]] += 1;
        }
      }
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (board[pos] !== null && counts[board[pos]] > 1) {
          marked[pos] = true;
        }
      }
    }
  }
  var errors = [];
  for (var j = 0; j < 81; j++) {
    if (marked[j]) errors.push(j);
  }
  if (errors.length == 0) { return []; }
  return [{
    exclude: 0,
    reduced: [],
    support: [],
    hint: 'conflicts',
    size: 0,
    errors: errors
  }];
}

function mistakes(board, answer, work) {
  var solution = Sudoku.solution(board);
  var errors = [];
  for (var j = 0; j < 81; j++) {
    if (board[j] !== null) continue;
    if ((work[j] != 0 && !(work[j] & (1 << solution[j]))) ||
        (answer[j] !== null && answer[j] != solution[j])) {
      errors.push(j);
    }
  }
  if (errors.length == 0) { return []; }
  return [{
    exclude: 0,
    reduced: [],
    support: [],
    hint: 'mistakes',
    size: 0,
    errors: errors
  }];
}

function whyexclude(board, poslist, nums) {
  var support = [];
  var marked = emptyboard();
  for (var axis = 0; axis < 3; axis++) {
    for (var j = 0; j < poslist.length; j++) {
      var pos = poslist[j];
      var x = axisfor(pos, axis);
      for (var y = 0; y < 9; y++) {
        var look = posfor(x, y, axis);
        if (board[look] === null) continue;
        if ((1 << board[look]) & nums) {
          support.push(look);
          if (marked[look] === null) marked[look] = [];
          marked[look].push(pos);
        }
      }
    }
  }
  support.sort(function(a, b) { return marked[b].length - marked[a].length; });
  // Now remove redundant support
  if (poslist.length == 1) {
    var covered = 0;
    var result = [];
    for (var j = 0; covered != nums && j < support.length; j++) {
      if (covered & (1 << board[support[j]])) continue;
      covered |= 1 << board[support[j]];
      result.push(support[j]);
    }
  } else if (listbits(nums).length == 1) {
    var covered = 0;
    var result = [];
    for (var j = 0; covered < poslist.length && j < support.length; j++) {
      for (var k = 0; k < marked[support[j]].length; k++) {
        var pos = marked[support[j]][k];
        if (marked[pos] === null) {
          marked[pos] = true;
          covered += 1;
          if (result.length == 0 || result[result.length - 1] != support[j]) {
            result.push(support[j]);
          }
        }
      }
    }
  } else {
    result = support;
  }
  return result;
}

function advancesubset(cur, choose, from) {
  if (cur.length == 0) {
    if (choose > from) return false;
    for (var j = 0; j < choose; j++) {
      cur.push(j);
    }
    return true;
  }
  var j = choose - 1;
  while (j >= 0 && cur[j] == from - choose + j) {
    j -= 1;
  }
  if (j == -1) return false;
  cur[j] += 1;
  j += 1;
  while (j < choose) {
    cur[j] = cur[j - 1] + 1;
    j += 1;
  }
  return true;
}

function nakedsets(board, unz, bits, size) {
  var result = [];
  for (var axis = 2; axis >= 0; axis--) {
    for (var x = 0; x < 9; x++) {
      var positions = [];
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (board[pos] !== null || unz[pos] == 0) continue;
        positions.push(pos);
      }
      var naked = [];
      if (positions.length >= size + 1) {
        for (var cur = []; advancesubset(cur, size, positions.length); ) {
          var exclude = 0;
          for (var j = 0; j < size; j++) {
            exclude |= unz[positions[cur[j]]];
          }
          if (listbits(exclude).length == size) {
            var reduced = [];
            var m = 0;
            for (var k = 0; k < positions.length; k++) {
              if (k == cur[m]) { m += 1; continue; }
              if (bits[positions[k]] & exclude) { reduced.push(positions[k]); }
            }
            if (axis < 2 && size <= 3) {
              var block = axisfor(positions[cur[0]], 2);
              for (var k = 1; k < size; k++) {
                if (axisfor(positions[cur[k]], 2) != block) {
                  block = null;
                  break;
                }
              }
              if (block != null) {
                for (var k = 0; k < 9; k++) {
                  var pos = posfor(block, k, 2);
                  if (axisfor(pos, axis) == x) continue;
                  if (board[pos] !== null) continue;
                  if (bits[pos] & exclude) { reduced.push(pos); }
                }
              }
            }
            if (reduced.length > 0) {
              var support = [];
              for (var k = 0; k < size; k++) {
                support.push(positions[cur[k]]);
              };
              result.push({
                exclude: exclude,
                reduced: reduced,
                hint: 'nakedsets',
                size: size,
                support: support
              });
            }
          }
        }
      }
    }
  }
  return result;
}

function hiddensets(board, unz, bits, size) {
  var result = [];
  for (var axis = 0; axis < 3; axis++) {
    for (var x = 0; x < 9; x++) {
      var open = 0;
      var known = 0;
      // Collect together all the unknown numbers in a row
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (board[pos] !== null) { known |= (1 << board[pos]); continue; }
        open |= unz[pos];
      }
      var nums = listbits(open & ~known);
      if (nums.length >= size + 1) {
        var numpos = [];
        // numpos[j] is the valid positions for nums[j]
        for (var j = 0; j < nums.length; j++) {
          var np = 0;
          var bit = 1 << nums[j];
          for (var y = 0; y < 9; y++) {
            var pos = posfor(x, y, axis);
            if (unz[pos] & bit) { np |= (1 << y); }
          }
          numpos.push(np);
        }
        // for each subset of given size, look at the set of possible positions
        for (var cur = []; advancesubset(cur, size, nums.length); ) {
          var reduced = [];
          var possible = 0;
          for (var j = 0; j < size; j++) {
            possible |= numpos[cur[j]];
          }
          var positions = listbits(possible);
          if (positions.length == size) {
            var exclude = 511;
            for (var j = 0; j < size; j++) {
              exclude ^= (1 << nums[cur[j]]);
            }
            for (var j = 0; j < size; j++) {
              var pos = posfor(x, positions[j], axis);
              if (bits[pos] & exclude) { reduced.push(pos); }
            }
            if (reduced.length > 0) {
              var support = [];
              for (var y = 0; y < 9; y++) {
                if ((1 << y) & possible) {
                  support.push(posfor(x, y, axis));
                }
              };
              result.push({
                exclude: exclude,
                reduced: reduced,
                hint: 'hiddensets',
                size: size,
                support: support
              });
            }
          }
        }
      }
    }
  }
  return result;
}

// Look to find not-yet-noted conflicts that force an answer.
function singlenumdirect(board, fb, unz) {
  var hint = fb.allowed;
  var result = [];
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] !== null) continue;
    var b = unz[pos];
    var forced = hint[pos] & b;
    if (listbits(forced).length != 1) continue;
    result.push({
      exclude: 511 ^ forced,
      reduced: [pos],
      hint: 'singlenumdirect',
      size: 1,
      support: whyexclude(board, [pos], b & ~forced)
    });
  }
  return result;
}

// Look in each block to find a number which needs to be placed, but which
// is directly excluded in each available square except one.
function singleposdirect(board, fb) {
  var result = [];
  for (var axis = 2; axis >= 0; axis--) {
    for (var x = 0; x < 9; x++) {
      var numbers = listbits(fb.needed[axis * 9 + x]);
      for (var j = 0; j < numbers.length; j++) {
        var num = numbers[j];
        bit = 1 << num;
        var hint = null;
        var poslist = [];
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (fb.allowed[pos] & bit) {
            if (hint !== null) { hint = null; break; }
            hint = pos;
          } else if (board[pos] === null) {
            poslist.push(pos);
          }
        }
        if (hint !== null) {
          result.push({
            exclude: 511 ^ (1 << num),
            reduced: [hint],
            hint: 'singleposdirect',
            size: 1,
            support: whyexclude(board, poslist, 1 << num)
          });
        }
      }
    }
  }
  return result;
}

function singlepos(board, fb, unz) {
  var result = [];
  // quick check for bits that are all OK
  var hint = fb.allowed;
  for (var j = 0; j < 81; j++) {
    if (hint[j] & unz[j]) { hint = null; break; }
  }
  if (hint != null) { return result; }
  var singlepos = emptyboard();
  for (var axis = 2; axis >= 0; axis--) {
    for (var x = 0; x < 9; x++) {
      for (var num = 0; num < 9; num++) {
        var bit = (1 << num);
        var positions = [];
        var found = null;
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (unz[pos] & bit) {
            if (found != null) {
              found = null;
              break;
            }
            found = pos;
          }
        }
        if (found !== null && singlepos[found] !== null) {
          singlepos[found] = num;
          var support = [];
          for (var y = 0; y < 9; y++) {
            var pos = posfor(x, y, axis);
            if (pos != found) {
              support.push(posfor(x, y, axis));
            }
          }
          result.push({
            exclude: 511 ^ (1 << singlepos[j]),
            reduced: [found],
            hint: 'singlepos',
            size: 1,
            support: support
          });
        }
      }
    }
  }
  return result;
}

// Look to find not-yet-noted conflicts that force an answer.
function singlenum(board, bits) {
  var result = [];
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] === null) continue;
    var num = board[pos];
    var bit = 1 << num;
    var reduced = [];
    for (var axis = 0; axis < 3; axis++) {
      var x = axisfor(pos, axis);
      for (var y = 0; y < 9; y++) {
        var pos2 = posfor(x, y, axis);
        if (board[pos2] === null && (bits[pos2] & bit)) {
          if (axis == 2 && (axisfor(pos, 0) == axisfor(pos2, 0) ||
              axisfor(pos, 1) == axisfor(pos2, 1))) { continue; }
          reduced.push(pos2);
        }
      }
    }
    if (reduced.length == 0) continue;
    result.push({
      exclude: bit,
      reduced: reduced,
      hint: 'singlenum',
      size: 1,
      support: [pos]
    });
  }
  return result;
}


function fullbits(board, bits) {
  var result = bits.slice();
  for (var j = 0; j < 81; j++) {
    if (board[j] !== null) result[j] = (1 << board[j]);
  }
  return result;
}

function unzero(bits) {
  if (bits == 0) return 511;
  return bits;
}

function claiming(board, unz, bits) {
  unz = fullbits(board, unz);
  var result = [];
  for (var axis = 0; axis < 2; axis++) {
    for (var x = 0; x < 9; x++) {
      var blockbits = [0, 0, 0];
      var solvedbits = 0;
      for (var y = 0; y < 9; y++) {
        blockbits[(y - (y % 3)) / 3] |= unz[posfor(x, y, axis)];
        if (board[pos] !== null) solvedbits |= (1 << board[pos]);
      }
      for (var j = 0; j < 3; j++) {
        var claimedbits = blockbits[j] & ~solvedbits &
            ~blockbits[(j + 1) % 3] & ~blockbits[(j + 2) % 3];
        if (claimedbits == 0) continue;
        var reduced = [];
        var reducedbits = 0;
        var block = axisfor(posfor(x, j * 3, axis), 2);
        for (var z = 0; z < 9; z++) {
          var pos = posfor(block, z, 2);
          if (axisfor(pos, axis) == x) continue;
          if (claimedbits & bits[pos]) {
            reducedbits |= (claimedbits & bits[pos]);
            reduced.push(pos);
          }
        }
        if (reducedbits == 0) continue;
        var intersection = [];
        for (var z = 0; z < 9; z++) {
          var pos = posfor(block, z, 2);
          if (axisfor(pos, axis) != x) continue;
          if (bits[pos] & claimedbits) {
            intersection.push(pos);
          }
        }
        result.push({
          exclude: claimedbits,
          reduced: reduced,
          hint: 'claiming',
          size: 1,
          support: intersection 
        });
      }
    }
  }
  return result;
}

function pointing(board, unz, bits) {
  unz = fullbits(board, unz);
  var result = [];
  for (var block = 0; block < 9; block++) {
    for (var axis = 0; axis < 2; axis++) {
      for (var x = 0; x < 3; x++) {
        var candbits = 0;
        var notbits = 0;
        for (var y = 0; y < 3; y++) {
          candbits |= unz[posforblock(block, axis, x, y)];
          notbits |= unz[posforblock(block, axis, (x + 1) % 3, y)];
          notbits |= unz[posforblock(block, axis, (x + 2) % 3, y)];
        }
        var candbits = candbits & ~notbits;
        if (candbits == 0) continue;
        var reduced = [];
        var reducedbits = 0;
        for (var y = 3; y < 9; y++) {
          var pos = posforblock(block, axis, x, y);
          if (bits[pos] & candbits) {
            reducedbits |= (bits[pos] & candbits);
            reduced.push(pos);
          }
        }
        if (reducedbits == 0) continue;
        var candidates = [];
        for (var y = 0; y < 3; y++) {
          var pos = posforblock(block, axis, x, y);
          if (bits[pos] & reducedbits) {
            candidates.push(pos);
          }
        }
        result.push({
          exclude: reducedbits,
          reduced: reduced,
          hint: 'pointing',
          size: 1,
          support: candidates
        });
      }
    }
  }
  return result;
}


function doublepointing(board, unz, bits) {
  unz = fullbits(board, unz);
  var result = [];
  for (var block = 0; block < 9; block++) {
    for (var axis = 0; axis < 2; axis++) {
      for (var x = 0; x < 3; x++) {
        var candbits = 0;
        var notbits = 0;
        for (var y = 3; y < 9; y++) {
          notbits |= unz[posforblock(block, axis, x, y)];
          candbits |= unz[posforblock(block, axis, (x + 1) % 3, y)];
          candbits |= unz[posforblock(block, axis, (x + 2) % 3, y)];
        }
        candbits = candbits & ~notbits;
        if (candbits == 0) continue;
        var reducedbits = 0;
        var reduced = [];
        for (var y = 0; y < 3; y++) {
          for (var x2 = x + 1; x2 <= x + 2; x2++) {
            var pos = posforblock(block, axis, x2 % 3, y);
            var rbit = candbits & bits[pos];
            if (rbit != 0) { reduced.push(pos); reducedbits |= rbit; }
          }
        }
        if (reducedbits == 0) continue;
        var candidates = [];
        for (var y = 3; y < 9; y++) {
          for (var x2 = x + 1; x2 <= x + 2; x2++) {
            var pos = posforblock(block, axis, x2 % 3, y);
            if ((reducedbits & bits[pos]) != 0) { candidates.push(pos); }
          }
        }
        result.push({
          exclude: reducedbits,
          reduced: reduced,
          hint: 'pointing',
          size: 2,
          support: candidates 
        });
      }
    }
  }
  return result;
}

function xwing(board, unz, bits, size) {
  var result = [];
  unz = fullbits(board, unz);
  for (var axis = 0; axis < 2; axis++) {
    for (var num = 0; num < 9; num++) {
      var bit = 1 << num;
      // colllect rows with that number in just two spots
      var twospotrows = [];
      var twospotplaces = [];
      for (var x = 0; x < 9; x++) {
        var spots = 0;
        var spotcount = 0;
        for (var y = 0; spotcount <= 2 && y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (board[pos] === num) {
            spotcount = 1;
            break;
          }
          if (unz[pos] & bit) {
            spotcount += 1;
            spots |= (1 << y);
          }
        }
        if (spotcount == 2) {
          twospotrows.push(x);
          twospotplaces.push(spots);
        }
      }
      // look at all subsets of given size
      for (var cur = []; advancesubset(cur, size, twospotrows.length); ) {
        var places = 0;
        for (var j = 0; j < size; j++) {
          places |= twospotplaces[cur[j]];
        }
        var cols = listbits(places);
        // number of spots == size, then we can look for xwing reductions
        if (cols.length == size) {
          var reduce = [];
          for (var k = 0; k < size; k++) {
            var skip = 0;
            for (var m = 0; m < 9; m++) {
              if (m == twospotrows[cur[skip]]) { skip += 1; continue; }
              var pos = posfor(m, cols[k], axis);
              if (board[pos] === null && (bits[pos] & bit)) {
                reduce.push(pos);
              }
            }
          }
          if (reduce.length > 0) {
            var support = [];
            for (var k = 0; k < size; k++) {
              var cols = listbits(twospotplaces[cur[k]]);
              support.push(posfor(twospotrows[cur[k]], cols[0], axis));
              support.push(posfor(twospotrows[cur[k]], cols[1], axis));
            }
            result.push({
              exclude: bit,
              reduced: reduce,
              hint: 'xwing',
              size: size,
              support: support
            });
          }
        }
      }
    }
  }
  return result;
}

function coloring(board, unz, bits, maxsize, maxaxis) {
  var paths = [];
  for (var num = 0; num < 9; num++) {
    // Mark any row, col, or block with only two possible positions
    var startbit = (1 << num);
    var twopos = emptyboard();
    for (var axis = 0; axis < 3; axis++) {
      for (var x = 0; x < 9; x++) {
        var poslist = [], countu = 0;
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (unz[pos] & startbit) { countu += 1; }
          if (bits[pos] & startbit) { poslist.push(pos); }
        }
        if (poslist.length == 2 && countu == 2) {
          if (axis > 2 || axisfor(poslist[0], 3) != axisfor(poslist[1], 3)) {
            for (var j = 0; j < 2; j++) {
              if (twopos[poslist[j]] === null) { twopos[poslist[j]] = []; }
              twopos[poslist[j]].push(poslist[1 - j]);
            }
          }
        }
      }
    }
    for (var startpos = 0; startpos < 81; startpos++) {
      if (twopos[startpos] === null) continue;
      var goalstate = emptyboard();
      goalstate[startpos] = 1; // 'start'

      // scan bits to find constrained numbers in seen by startpos
      var seen = 0;
      for (var axis = 0; axis < maxaxis; axis++) {
        var x = axisfor(startpos, axis);
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (pos != startpos && (bits[pos] & startbit) &&
              goalstate[pos] === null) {
            goalstate[pos] = 2; // 'seen'
            seen += 1;
          }
        }
      }
      if (seen == 0) continue;

      // scan twopos to find other twopos that see 'seen' numbers
      var goalcount = 0;
      for (var axis = 0; axis < 3; axis++) {
        for (var x = 0; x < 9; x++) {
          var mark = false;
          for (var y = 0; y < 9; y++) {
            var pos = posfor(x, y, axis);
            if (goalstate[pos] == 2) { mark = true; break; }
          }
          if (!mark) continue;
          for (var y = 0; y < 9; y++) {
            var pos = posfor(x, y, axis);
            if (twopos[pos] !== null && goalstate[pos] === null) {
              goalstate[pos] = 3; // 'goal'
              goalcount += 1;
            }
          }
        }
      }
      if (goalcount == 0) continue;

      // do a breadthfirst search, enforcing maxsize, from 'start' to 'goal'.
      var searchstate = emptyboard();
      searchstate[startpos] = 1;
      var tree = [{color: false, pos: startpos, depth: 1, parent: null}];
      for (var index = 0; index < tree.length; index++) {
        var size = tree[index].depth;
        var searchpos = tree[index].pos
        if (size >= maxsize) break;
        if (tree[index].color == false) {
          var forcedlist = twopos[searchpos];
          for (var j = 0; j < forcedlist.length; j++) {
            var forced = forcedlist[j];
            if (goalstate[forced] == 3) {
              // found a goal
              var path = [forced];
              for (var k = index; k !== null; k = tree[k].parent) {
                path.push(tree[k].pos);
              }
              if (path[0] > path[path.length - 1]) {
                path.reverse();
              }
              paths.push({
                exclude: startbit,
                support: path,
                hint: 'coloring',
                size: path.length,
              }); // reduced not yet set
              maxsize = path.length;
            } else if (size + 1 < maxsize && searchstate[forced] === null) {
              searchstate[forced] = 1; // 'colored'
              tree.push({
                  color: true, pos: forced, depth: size + 1, parent: index});
            }
          }
        } else {
          for (var axis = 0; axis < maxaxis; axis++) {
            var x = axisfor(searchpos, axis);
            for (var y = 0; y < 9; y++) {
              var forced = posfor(x, y, axis);
              if (forced == searchpos) continue;
              if (twopos[forced] !== null && searchstate[forced] === null) {
                searchstate[forced] = 1;
                tree.push({
                    color: false, pos: forced, depth: size + 1, parent: index});
              }
            }
          }
        }
      }
    }
  }
  // Go through found path, eliminating paths longer than maxsize,
  // and build 'reduced' arrays
  var result = [];
  var done = {};
  for (var j = 0; j < paths.length; j++) {
    if (paths[j].size > maxsize) continue;
    var startpos = paths[j].support[0];
    var endpos = paths[j].support[paths[j].support.length - 1];
    if ((startpos + 81 * endpos) in done) continue;
    done[startpos + 81 * endpos] = 1;
    var bit = paths[j].exclude;
    var endposaxis = [];
    for (var axis = 0; axis < 3; axis++) {
      endposaxis.push(axisfor(endpos, axis));
    }
    var marked = emptyboard();
    marked[startpos] = marked[endpos] = 1;
    var reduced = [];
    for (var axis = 0; axis < 3; axis++) {
      var x = axisfor(startpos, axis);
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (marked[pos] !== null) continue;
        if (bits[pos] & bit) {
          for (var axis2 = 0; axis2 < 3; axis2++) {
            if (axisfor(pos, axis2) == endposaxis[axis2]) {
              marked[pos] = 1;
              reduced.push(pos);
            }
          }
        }
      }
    }
    // TODO: verify that reduced is nonempty
    paths[j].reduced = reduced;
    result.push(paths[j]);
  }
  return result;
}

function ywing(board, unz, bits, maxsize, maxaxis) {
  var paths = [];
  // first build array of bits with only two-candidate cells
  var pairs = emptyboard();
  var pairlist = [];
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] !== null || bits[pos] == 0 ||
        unz[pos] != bits[pos]) continue;
    var listed = listbits(bits[pos]);
    if (listed.length != 2) continue;
    pairs[pos] = bits[pos];
    pairlist.push([pos, listed[0]]);
    pairlist.push([pos, listed[1]]);
  }
  if (pairlist.length < 3) return [];
  for (var j = 0; j < pairlist.length; j++) {
    var startpos = pairlist[j][0];
    var startnum = pairlist[j][1];
    var startbit = 1 << startnum;
    var seen = 0;
    var goalstate = emptyboard();
    goalstate[startpos] = 1; // 'start'
    // scan bits to find constrained numbers in seen by pos, num
    for (var axis = 0; axis < 3; axis++) {
      var x = axisfor(startpos, axis);
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (pos != startpos && (bits[pos] & startbit) &&
            goalstate[pos] === null) {
          goalstate[pos] = 2; // 'seen'
          seen += 1;
        }
      }
    }
    if (seen == 0) continue;
    // scan pairs to find other pairs that see 'seen' numbers
    var goalcount = 0;
    for (var axis = 0; axis < 3; axis++) {
      for (var x = 0; x < 9; x++) {
        var mark = false;
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (goalstate[pos] == 2) { mark = true; break; }
        }
        if (!mark) continue;
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (pairs[pos] !== null && (pairs[pos] & startbit) &&
              goalstate[pos] === null) {
            goalstate[pos] = 3; // 'goal'
            goalcount += 1;
          }
        }
      }
    }
    if (goalcount == 0) continue;
    // do a breadthfirst search, enforcing maxsize, from 'start' to 'goal'.
    var supposenum = listbits(bits[startpos] ^ startbit)[0];
    var searchstate = emptyboard();
    searchstate[pos] = 1;
    var tree = [{num: supposenum, pos: startpos, depth: 1, parent: null}];
    for (var index = 0; index < tree.length; index++) {
      nextchoice = tree[index]
      var num = nextchoice.num;
      var pos = nextchoice.pos;
      var depth = nextchoice.depth;
      if (depth >= maxsize) break;
      // scan for forced numbers
      var bit = (1 << num);
      for (var axis = 0; axis < maxaxis; axis++) {
        var x = axisfor(pos, axis);
        for (var y = 0; y < 9; y++) {
          var forcedpos = posfor(x, y, axis);
          if (pairs[forcedpos] === null || !(pairs[forcedpos] & bit) ||
              pos == forcedpos || searchstate[forcedpos] !== null) continue;
          var forcedbit = pairs[forcedpos] ^ bit;
          var forcednum = listbits(forcedbit)[0];
          // found a goal!
          if (forcednum == startnum && goalstate[forcedpos] == 3) {
            var path = [forcedpos];
            for (var k = index; k !== null; k = tree[k].parent) {
              path.push(tree[k].pos);
            }
            if (path[0] > path[path.length - 1]) {
              path.reverse();
            }
            paths.push({
              exclude: forcedbit,
              support: path,
              hint: 'ywing',
              size: path.length,
            }); // reduced not yet set
            maxsize = path.length;
            continue;
          }
          // note a new path to explore, if not too deep.
          if (depth + 1 < maxsize && searchstate[forcedpos] === null) {
            searchstate[forcedpos] = 4;
            tree.push({pos: forcedpos, num: forcednum,
                       depth: depth + 1, parent: index});
          }
        }
      }
    }
  }
  // Go through found path, eliminating paths longer than maxsize,
  // and build 'reduced' arrays
  var result = [];
  var done = {};
  for (var j = 0; j < paths.length; j++) {
    if (paths[j].size > maxsize) continue;
    var startpos = paths[j].support[0];
    var endpos = paths[j].support[paths[j].support.length - 1];
    if ((startpos + 81 * endpos) in done) continue;
    done[startpos + 81 * endpos] = 1;
    var bit = paths[j].exclude;
    var endposaxis = [];
    for (var axis = 0; axis < 3; axis++) {
      endposaxis.push(axisfor(endpos, axis));
    }
    var marked = emptyboard();
    marked[startpos] = marked[endpos] = 1;
    var reduced = [];
    for (var axis = 0; axis < 3; axis++) {
      var x = axisfor(startpos, axis);
      for (var y = 0; y < 9; y++) {
        var pos = posfor(x, y, axis);
        if (marked[pos] !== null) continue;
        if (bits[pos] & bit) {
          for (var axis2 = 0; axis2 < 3; axis2++) {
            if (axisfor(pos, axis2) == endposaxis[axis2]) {
              marked[pos] = 1;
              reduced.push(pos);
            }
          }
        }
      }
    }
    // TODO: verify that reduced is nonempty
    paths[j].reduced = reduced;
    result.push(paths[j]);
  }
  return result;
}

function hintsort(x, y) {
  if (x.hint == 'singleposdirect' && y.hint == 'singlenumdirect') {
    return 1;
  }
  if (y.hint == 'singleposdirect' && x.hint == 'singlenumdirect') {
    return -1;
  }
  // favor more squares fully solved
  if (x.solved != y.solved) {
    return y.solved - x.solved;
  }
  // favor more bits elminiated
  var xb = listbits(x.exclude);
  var yb = listbits(y.exclude);
  if (xb.length != yb.length) {
    return yb.length - xb.length;
  }
  // favor fewer support squares
  if (x.support.length != y.support.length) {
    return x.support.length - y.support.length;
  }
  // favor more squares reduced
  if (x.reduced.length != y.reduced.length) {
    return y.reduced.length - x.reduced.length;
  }
  // randomize ties
  var xs = '' + xb + x.support + ',' + x.reduced
  var ys = '' + yb + y.support + ',' + y.reduced
  if (xs < ys) return -1;
  if (ys < xs) return 1;
  return 0;
}

function countsolved(hint, work) {
  var solvedcount = 0;
  for (var j = 0; j < hint.reduced.length; j++) {
    var pos = hint.reduced[j];
    var bits = work[pos] & ~hint.exclude;
    if (listbits(bits).length == 1) {
      solvedcount += 1;
    }
  }
  return solvedcount;
}

function hint(puzzle, answer, work) {
  var result = rawhints(puzzle, answer, work, false);
  if (!result.hints.length) return null;
  for (var j = 0; j < result.hints.length; j++) {
    result.hints[j].solved = countsolved(result.hints[j], work);
  }
  result.hints.sort(hintsort);
  result.hints[0].level = result.level;
  dumphints(result);
  return result.hints[0];
}

function rawhints(puzzle, answer, work, nomistakes) {
  var sofar = boardsofar(puzzle, answer);
  var unz = unzeroedwork(puzzle, answer, work);
  var fzw = work.slice(); // fillzeroeswork(puzzle, answer, work);
  var result = [];
  var level = 0;
  var fb = figurebits(sofar);
  while (true) {
    if (!nomistakes) {
      result = result.concat(conflicts(sofar));
      if (result.length) break;
      result = result.concat(mistakes(puzzle, answer, unz));
      if (result.length) break;
    }
    level = 1;
    result = result.concat(singleposdirect(sofar, fb));
    result = result.concat(singlenumdirect(sofar, fb, unz));
    if (result.length) break;
    level = 2;
    result = result.concat(singlepos(sofar, fb, unz));
    result = result.concat(singlenum(sofar, fzw));
    if (result.length) break;
    level = 3;
    result = result.concat(pointing(sofar, unz, fzw));
    result = result.concat(claiming(sofar, unz, fzw));
    result = result.concat(nakedsets(sofar, unz, fzw, 2));
    result = result.concat(hiddensets(sofar, unz, fzw, 1));
    if (result.length) break;
    level = 4;
    result = result.concat(xwing(sofar, unz, fzw, 2));
    result = result.concat(ywing(sofar, unz, fzw, 3, 2));
    result = result.concat(doublepointing(sofar, unz, fzw));
    result = result.concat(nakedsets(sofar, unz, fzw, 3));
    result = result.concat(hiddensets(sofar, unz, fzw, 2));
    if (result.length) break;
    level = 5;
    result = result.concat(xwing(sofar, unz, fzw, 3));
    result = result.concat(nakedsets(sofar, unz, fzw, 4));
    result = result.concat(hiddensets(sofar, unz, fzw, 3));
    result = result.concat(ywing(sofar, unz, fzw, 4, 3));
    result = result.concat(coloring(sofar, unz, fzw, 3, 3));
    if (result.length) break;
    level = 6;
    result = result.concat(hiddensets(sofar, unz, fzw, 4));
    result = result.concat(xwing(sofar, unz, fzw, 4));
    result = result.concat(ywing(sofar, unz, fzw, 12, 3));
    result = result.concat(coloring(sofar, unz, fzw, 7, 3));
    // result = result.concat(hiddensets(sofar, unz, fzw, 5));
    // result = result.concat(xwing(sofar, unz, fzw, 5));
    break;
  }
  return {
    level: level,
    hints: result
  };
}

function pencilmarks(board, work) {
  var unz = unzeroedwork(Sudoku.emptyboard(), board, work);
  var hint = simplehint(board);
  for (var j = 0; j < 81; j++) {
    hint[j] &= unz[j];
  }
  return hint;
}

function dumphints(h) {
  if (debugging_enabled) {
    console.log("Level", h.level, "options", h.hints.length,
                "eg", JSON.stringify(h.hints[0]));
  }
}

function hintgrade(puzzle) {
  var answer = emptyboard();
  work = [];
  var unsolved = 0;
  var level = 0;
  for (var j = 0; j < 81; j++) {
    if (puzzle[j] === null) { work.push(511); unsolved += 1; }
    else work.push(0);
  }
  var steps = 0;
  while (unsolved) {
    var h = rawhints(puzzle, answer, work, true);
    if (h.hints.length == 0) {
      steps += Math.pow(2, (unsolved - 3) / 2);
      break;
    }
    var difficulty = (h.level - 1) * 4 + 1;
    dumphints(h);
    if (h.hints.length <= 1) { difficulty += 2; }
    steps += difficulty * ((unsolved + 12) / 48);
    for (var k = 0; k < h.hints.length; k++) {
      var hint = h.hints[k];
      var modified = false;
      for (var j = 0; j < hint.reduced.length; j++) {
        var pos = hint.reduced[j];
        if (work[pos] & hint.exclude) {
          modified = true;
          work[pos] = (work[pos] & ~hint.exclude);
        }
      }
      /*
      if ((!modified && k == 0) ||
          mistakes(puzzle, answer, work).length) {
        console.log('problem', JSON.stringify(hint));
        SudokuUI.debugstate({
          puzzle:puzzle,
          answer:answer,
          work:work
        });
        alert('problem');
        return 0;
      }
      */
    }
    var wasunsolved = unsolved;
    unsolved = 0;
    for (var j = 0; j < 81; j++) {
      if (answer[j] !== null || puzzle[j] !== null) continue;
      var nums = listbits(work[j]);
      if (nums.length == 1) { answer[j] = nums[0]; work[j] = 0; }
      else { unsolved += 1; }
    }
    if (unsolved == wasunsolved && difficulty > 2) {
      steps += 1;
    }
  }
  return steps;
}

function constraints(puzzle) {
  var answer = emptyboard();
  var level = emptyboard();
  var maxlevel = 0;
  var work = [];
  var unsolved = 0;
  for (var j = 0; j < 81; j++) {
    if (puzzle[j] === null) { work.push(511); unsolved += 1; }
    else work.push(0);
  }
  while (unsolved) {
    var h = rawhints(puzzle, answer, work, true);
    var modified = false;
    if (h.hints.length > 0) {
      if (h.level > maxlevel) { maxlevel = h.level; }
      for (var k = 0; k < h.hints.length; k++) {
        var hint = h.hints[k];
        for (var j = 0; j < hint.reduced.length; j++) {
          var pos = hint.reduced[j];
          if (work[pos] & hint.exclude) {
            work[pos] = (work[pos] & ~hint.exclude);
            modified = true;
          }
        }
      }
      unsolved = 0;
      for (var j = 0; j < 81; j++) {
        if (answer[j] !== null || puzzle[j] !== null) continue;
        var nums = listbits(work[j]);
        if (nums.length == 1) {
          answer[j] = nums[0];
          level[j] = maxlevel;
          work[j] = 0;
        }
        else { unsolved += 1; }
      }
    }
    if (!modified && unsolved) { break; }
    if (maxlevel < 2) maxlevel = 2;
  }
  var deduced = boardsofar(puzzle, answer);
  if (Sudoku.uniquesolution(deduced)) {
    // Remaining squares are marked as 'require guessing'
    var solution = Sudoku.solution(deduced);
    for (var j = 0; j < 81; j++) {
      if (puzzle[j] === null && answer[j] === null) {
        answer[j] = solution[j];
        level[j] = 7;
      }
    }
    return { answer: answer, level: level };
  }
  // Determine which squares are unconstrained
  var probes = [];
  var unconstrained = emptyboard();
  for (var j = 0; j < 5; j++) {
    probes.push(Sudoku.solution(deduced));
  }
  for (var pos = 0; pos < 81; pos++) {
    for (var j = 1; j < 5; j++) {
      if (probes[j][pos] != probes[j - 1][pos]) {
        unconstrained[pos] = 1;
      }
    }
  }
  var unknown = work.slice();
  for (var pos = 0; pos < 81; pos++) {
    if (deduced[pos] !== null || unconstrained[pos]) {
      unknown[pos] = 0;
      continue;
    }
    unknown[pos] &= ~(1 << probes[0][pos]);
    var nums = listbits(unknown[pos]);
    for (var j = 0; j < nums.length; j++) {
      var guessed = deduced.slice();
      guessed[pos] = nums[j];
      var solution = Sudoku.solution(guessed);
      if (solution !== null) {
        for (var pos2 = 0; pos2 < 81; pos2 += 1) {
          if (solution[pos2] != probes[probes.length - 1][pos2]) {
            unknown[pos2] = 0;
            unconstrained[pos2] = 1;
          }
        }
        probes.push(solution);
        break;
      } else {
        unknown[pos] &= ~(1 << nums[j]);
      }
    }
    if (unconstrained[pos] === null) {
      deduced[pos] = probes[0][pos];
    }
  }
  for (var j = 0; j < 81; j++) {
    if (puzzle[j] === null && answer[j] === null) {
      answer[j] = deduced[j];
      level[j] = unconstrained[j] ? null : 7;
    }
  }
  return { answer: answer, level: level };
}


lib.simplehint = simplehint;
lib.conflicts = conflicts;
lib.mistakes = mistakes;
lib.unzeroedwork = unzeroedwork;
lib.pencilmarks = pencilmarks;
lib.hint = hint;
lib.hintgrade = hintgrade;
lib.constraints = constraints;

})(SudokuHint);

