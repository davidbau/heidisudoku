// English translations for Heidi's Infinite Sudoku

I18n.register('en', {
  // Page titles
  'title': "Heidi's Infinite Sudoku",
  'about_title': "About Heidi's Infinite Sudoku",

  // Main UI
  'time_label': "Time",
  'finished_in': "Finished in",
  'hints_label': "Hints",

  // Buttons
  'color_button': "Color",
  'color_button_title': "Show colors.  Ctrl to clear colors.",
  'file_button': "File",
  'file_button_title': "Load or save.  Ctrl to load a 17-hint Sudoku.",
  'clear_button': "Clear",
  'clear_button_title': "Reset puzzle.  Ctrl for empty puzzle.",
  'check_button': "Check",
  'check_button_title': "Check for mistakes.  Ctrl to show mistake.",
  'prev_button': "« Prev",
  'prev_button_title': "Previous puzzle.  Ctrl to go back 10.",
  'next_button': "Next »",
  'next_button_title': "Next puzzle.  Ctrl to go forward 10.",
  'hint_button': "Hint",
  'hint_button_title': "Show a hint.  Ctrl for an explicit hint.",
  'marks_button': "Marks",
  'marks_button_title': "Auto pencilmarks.  Ctrl to clear marks.",
  'timer_button': "Timer",
  'timer_button_title': "Show timer.  Ctrl to reveal solution.",

  // Popups
  'victory': "You Win!",
  'ok': "ok so far",
  'errors': "mistake",
  'nohint': "no hint",

  // File dialog
  'saved_games': "Saved Games",
  'save_current': "Save Current Game",
  'save_copy': "Save New Copy",
  'save_as_url': "save as url",
  'select_all': "Select All",
  'delete_selected': "Delete Selected",
  'load_selected': "Load Selected",
  'saved_game_default': "Saved Game",

  // About page link
  'about_link': "About this game",

  // About page content
  'back_to_game': "Back to the game",
  'how_to_play': "How to Play",
  'how_to_play_p1': "Flip through puzzles with the <b>Next</b> and <b>Prev</b> buttons or the <b>N</b> and <b>P</b> keys.  You can work on the puzzles in any order and come back to any puzzle later.",
  'how_to_play_p2': "To fill in a puzzle, click on a number on the right and then click on any square to pencil in that number.  The rules of Sudoku are that every digit 1-9 must appear once in each row, column, and 3x3 block.",

  'keyboard_shortcuts': "Keyboard Shortcuts",
  'keyboard_shortcuts_p1': "You can also use the keyboard.  Point at a square or use arrow <b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b> keys to move the dotted blue rectangle, and then type a digit <b>1</b> - <b>9</b> to fill it in. Typing multiple numbers in a square will mark all those numbers, but a double-tapped number will clear all marks and write the number as the answer.  Use the <b>space</b> or <b>0</b> key to clear the selected square again.",
  'keyboard_shortcuts_p2': "The comma <b>,</b> key brings up a menu that lets you mark multiple numbers.  With the menu showing, the <b>H</b> key lets you highlight marked numbers in yellow.  The <b>M</b> key automatically marks numbers that are not in direct conflict in the row, column, or block, and the <b>Marks</b> button fills these in for every square.",

  'getting_hints': "Getting Hints",
  'getting_hints_p1': "Click a color on the left to reveal squares that are that level of difficulty: violet squares are the easiest, and red squares are the hardest.  Click the <b>Color</b> button to reveal all colors.",
  'getting_hints_p2': "Hold down the <b>Hint</b> button to get a specific hint.  Red squares point out any mistakes.  Blue squares will be places that constrain the puzzle in some way, and green squares will be locations where a number can be filled in, or where the possibilities can be narrowed down.",
  'getting_hints_p3': "If you are still stuck, you can try a more explicit hint by holding down <b>ctrl</b> while clicking the <b>Hint</b> button.  Sometimes the strategies shown will be very subtle: learn to recognize <a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">naked pairs</a> and <a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">intersections</a>, and see if you can find the <a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">hidden pairs or triples</a> or recognize an <a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">x-wing</a>, <a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">y-wing</a> or <a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">swordfish</a>.",

  'checking_mistakes': "Checking and Fixing Mistakes",
  'checking_mistakes_p1': "The <b>Check</b> button can be used to quickly check if you have penciled in any mistakes or contradictory squares without revealing what the mistakes are.",
  'checking_mistakes_p2': "Holding <b>ctrl</b> while clicking <b>Check</b> will show you the position of a mistake.",
  'checking_mistakes_p3': "When you discover a mistake, you can use the browser's \"back\" button to undo as many moves as you need to.",

  'the_timer': "The Timer",
  'the_timer_p1': "The game will keep track of the amount of time it has taken you to solve a puzzle.  Press the <b>Timer</b> button to display the elapsed time and hint counter.",
  'the_timer_p2': "If you walk away from a puzzle and don't want all the idle time counted against you, don't worry: press the \"Refresh\" button in your browser and the timer will go back to the time you made your last move. Similarly, if you save a game, the time saved will be the time of the last move made.",

  'saving_sharing': "Saving and Sharing Puzzles",
  'saving_sharing_p1': "Puzzles can also be saved and loaded using the <b>File</b> button. Saved games are identified by rating, date, and progress, or you can rename them yourself.",
  'saving_sharing_p2': "If you discover a gem of a game that you would like to share, the <b>Save as Url</b> link will create a short URL for your current puzzle that can be emailed.  Any markup and colors you put on the game will be saved along with the URL, so you can share a particularly clever sudoku step with other puzzlers.",

  'entering_puzzles': "Entering Your Own Puzzles",
  'entering_puzzles_p1': "If you right-click or hold down <b>ctrl</b> while clicking a square, you can change the puzzle at any time.  Holding <b>ctrl</b> while clicking <b>Clear</b> will clear the entire puzzle, and you can enter a new puzzle using the keyboard or mouse.  Note that some numbers cannot be entered because the hintpad will not let you enter a puzzle that has no solution.",
  'entering_puzzles_p2': "As soon as you have entered a puzzle with a unique solution, a difficulty rating will be shown and the keyboard will switch back to game mode.",

  'minimal_puzzles': "Mathematically Minimal Puzzles",
  'minimal_puzzles_p1': "Usually the puzzles found in Heidi's Infinite Sudoku Pad will have 25-30 hints.  Naturally, if there are fewer hints, you enjoy a slightly longer game.",
  'minimal_puzzles_p2': "The smallest number of hints that can be given on a solvable Suduoku game is believed to be 17, and Gordon Royle maintains a database of all 17-hint puzzles that have been discovered so far.  If you hold <b>ctrl</b> while clicking <b>File</b>, one of these 17-hint puzzles will be loaded from the internet.",

  'difficulty_ratings': "Difficulty Ratings",
  'difficulty_ratings_p1': "Sudoku puzzles are rated on a 24-level scale from \"Beginner\" (the easiest) to \"Counfounding\" (the hardest).  The whole scale:",
  'difficulty_ratings_p2': "Puzzles that can be solved by just avoiding direct conflicts are \"Basic\" or easier, depending on how easy it is to see the constraints.  \"Subtle\" puzzles require one or two clever deductions. And it gets more difficult from there: \"Confounding\" puzzles involve untangling a mass of complex clues.",

  'credits': "Credits",
  'credits_content': "Heidi's Hintpad was written in HTML and Javascript by Heidi's husband <a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a> using <a target=_blank href=\"http://ejohn.org/\">John Resig's</a> <a target=_blank href=\"http://jquery.com/\">jQuery</a> with <a target=_blank href=\"http://benalman.com/\">Ben Alman's</a> handy <a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">BBQ plugin</a> (as <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">forked</a> by <a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a>). <a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince's</a> wonderful <a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a> font provides handwritten digits and <a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson's</a> <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a> is used for the puzzle numerals. <a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a> provided the yellow highlighter icon; and <a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle's</a> mathematically beautiful <a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">Minimum Sudoku Collection</a> provides minimal 17-hint puzzles when you hold <b>ctrl</b> while clicking <b>File</b>.",
  'sources_notice': "The sources for Heidi's Sudoku Hintpad are not licensed for reuse at this time, but they are available to read <a target=_blank href=\"https://github.com/davidbau/heidisudoku\">here on Github</a>.",
  'version': "Version 0.67",

  // Color labels
  'easiest': 'Easiest',
  'hardest': 'Hardest',

  // Difficulty levels
  levels: [
    "Unsolvable",
    "Beginner",
    "Easy",
    "Simple",
    "Basic",
    "Moderate",
    "Tricky",
    "Clever",
    "Puzzling",
    "Subtle",
    "Difficult",
    "Knotty",
    "Thorny",
    "Baffling",
    "Intricate",
    "Perplexing",
    "Obscure",
    "Labyrinthine",
    "Obstinate",
    "Abstruse",
    "Vexing",
    "Enigmatic",
    "Formidable",
    "Diabolical",
    "Confounding",
    "Impossible"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['just now'],
      ['from', Math.round(ms / 1000), 'seconds ago'],
      ['from', Math.round(ms / 60 / 1000), 'minutes ago'],
      ['from', Math.round(ms / 60 / 60 / 1000), 'hours ago'],
      ['from', Math.round(ms / 24 / 60 / 60 / 1000), 'days ago'],
      ['from', Math.round(ms / 7 / 24 / 60 / 60 / 1000), 'weeks ago'],
      ['from', Math.round(ms / 30 / 24 / 60 / 60 / 1000), 'months ago'],
      ['from', Math.round(ms / 365 / 24 / 60 / 60 / 1000), 'years ago']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join(' ');
  }
});
