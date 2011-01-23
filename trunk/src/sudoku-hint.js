// Sudoku hint engine for Heidi's Sudoku Hintpad
// Implements various nonbacktracking sudoku deduction techniques.
//
// Copyright 2010 David Bau, all rights reserved.

var SudokuHint = {};

(function(lib) {

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
        if (sofar[pos] === null) result[pos] |= unmarked;
        // benefit of the doubt: assume the player thinks the correct
        // solution is one of the options in an empty square.
        if (work[pos] == 0 && solution !== null) {
          result[pos] |= (1 << solution[pos]);
        }
      }
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
  result.sort(hintsort);
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
  result.sort(hintsort);
  return result;
}

// Look to find not-yet-noted conflicts that force an answer.
function singlenumdirect(board, unz) {
  var hint = figurebits(board).allowed;
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
  result.sort(hintsort);
  return result;
}

// Look in each block to find a number which needs to be placed, but which
// is directly excluded in each available square except one.
function singleposdirect(board) {
  var result = [];
  var bits = figurebits(board);
  for (var axis = 2; axis >= 0; axis--) {
    for (var x = 0; x < 9; x++) {
      var numbers = listbits(bits.needed[axis * 9 + x]);
      for (var j = 0; j < numbers.length; j++) {
        var num = numbers[j];
        bit = 1 << num;
        var hint = null;
        var poslist = [];
        for (var y = 0; y < 9; y++) {
          var pos = posfor(x, y, axis);
          if (bits.allowed[pos] & bit) {
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
  result.sort(hintsort);
  return result;
}

function singlepos(board, unz) {
  var result = [];
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
  result.sort(hintsort);
  return result;
}

// Look to find not-yet-noted conflicts that force an answer.
function singlenum(board, bits) {
  var hint = figurebits(board).allowed;
  var result = [];
  for (var pos = 0; pos < 81; pos++) {
    if (board[pos] !== null) continue;
    var b = bits[pos];
    var forced = hint[pos] & b;
    if (forced == b) continue;
    result.push({
      exclude: 511 ^ hint[pos],
      reduced: [pos],
      hint: 'singlenum',
      size: 1,
      support: whyexclude(board, [pos], b & ~forced)
    });
  }
  result.sort(hintsort);
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

function candidatelines(board, unz, bits) {
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
          hint: 'candidatelines',
          size: 1,
          support: candidates
        });
      }
    }
  }
  result.sort(hintsort);
  return result;
}


function candidatelinepairs(board, unz, bits) {
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
          hint: 'candidatelines',
          size: 2,
          support: candidates 
        });
      }
    }
  }
  result.sort(hintsort);
  return result;
}

function xwing(board, unz, bits, size) {
  var result = [];
  bits = fullbits(board, bits);
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
          if (board[pos] === null && (unz[pos] & bit)) {
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

function hintsort(x, y) {
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

function hint(puzzle, answer, work) {
  var result = rawhints(puzzle, answer, work);
  if (!result.hints.length) return null;
  result.hints.sort(hintsort);
  result.hints[0].level = result.level;
  return result.hints[0];
}

function rawhints(puzzle, answer, work) {
  var sofar = boardsofar(puzzle, answer);
  var unz = unzeroedwork(puzzle, answer, work);
  var result = [];
  var level = 0;
  while (true) {
    result = result.concat(conflicts(sofar));
    if (result.length) break;
    result = result.concat(mistakes(puzzle, answer, unz));
    if (result.length) break;
    level = 1;
    result = result.concat(singleposdirect(sofar));
    result = result.concat(singlenumdirect(sofar, unz));
    if (result.length) break;
    level = 2;
    result = result.concat(singlepos(sofar, unz));
    result = result.concat(singlenum(sofar, work));
    if (result.length) break;
    level = 3;
    result = result.concat(candidatelines(sofar, unz, work));
    result = result.concat(nakedsets(sofar, unz, work, 2));
    result = result.concat(hiddensets(sofar, unz, work, 1));
    if (result.length) break;
    level = 4;
    result = result.concat(xwing(sofar, unz, work, 2));
    result = result.concat(candidatelinepairs(sofar, unz, work));
    result = result.concat(nakedsets(sofar, unz, work, 3));
    result = result.concat(hiddensets(sofar, unz, work, 2));
    if (result.length) break;
    level = 5;
    result = result.concat(xwing(sofar, unz, work, 3));
    result = result.concat(nakedsets(sofar, unz, work, 4));
    result = result.concat(hiddensets(sofar, unz, work, 3));
    if (result.length) break;
    level = 6;
    result = result.concat(hiddensets(sofar, unz, work, 4));
    result = result.concat(xwing(sofar, unz, work, 4));
    // result = result.concat(hiddensets(sofar, unz, work, 5));
    // result = result.concat(xwing(sofar, unz, work, 5));
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

function hintgrade(puzzle) {
  var answer = emptyboard();
  work = [];
  var unsolved = 0;
  var level = 0;
  for (var j = 0; j < 81; j++) {
    work.push(511);
    if (puzzle[j] === null) { unsolved += 1; }
  }
  var steps = 0;
  while (unsolved) {
    var h = rawhints(puzzle, answer, work);
    if (h.hints.length == 0) {
      steps += Math.floor(Math.pow(2, (unsolved - 3) / 3));
      break;
    }
    var difficulty = (h.level - 1) * 3 + 1;
    // console.log("Level " + h.level + " options " + h.hints.length);
    if (h.hints.length <= 2) { difficulty += (3 - h.hints.length); }
    difficulty *= (unsolved / 36);
    steps += difficulty;
    for (var k = 0; k < h.hints.length; k++) {
      var hint = h.hints[k];
      var oldwork = work.slice();
      var modified = false;
      for (var j = 0; j < hint.reduced.length; j++) {
        var pos = hint.reduced[j];
        if (work[pos] & hint.exclude) { modified = true; }
        work[pos] = (work[pos] & ~hint.exclude);
      }
      /*
      if ((!modified && k == 0) ||
          mistakes(puzzle, answer, work).length) {
        console.log('problem', JSON.stringify(hint));
        SudokuUI.commitstate({
          puzzle:puzzle,
          answer:answer,
          work:oldwork
        });
        alert('problem');
        return 0;
      } 
      */
    }
    unsolved = 0;
    for (var j = 0; j < 81; j++) {
      if (answer[j] !== null || puzzle[j] !== null) continue;
      var nums = listbits(work[j]);
      if (nums.length == 1) { answer[j] = nums[0]; work[j] = 0; }
      else { unsolved += 1; }
    }
  }
  return steps;
}


lib.simplehint = simplehint;
lib.conflicts = conflicts;
lib.mistakes = mistakes;
lib.unzeroedwork = unzeroedwork;
lib.pencilmarks = pencilmarks;
lib.hint = hint;
lib.hintgrade = hintgrade;

})(SudokuHint);

