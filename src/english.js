// This file now uses the i18n system for internationalization
// Levels and timeago are provided by the i18n system

// Set levels and timeago from i18n (with fallback to English)
if (typeof I18n !== 'undefined') {
  SudokuUI.levels = I18n.getLevels();
  SudokuUI.timeago = I18n.timeago;
} else {
  // Fallback to English if i18n is not loaded
  SudokuUI.levels = [
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
  ];

  SudokuUI.timeago = function timeago(ms) {
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
  };
}
