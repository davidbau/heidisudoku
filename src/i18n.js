// Internationalization (i18n) module for Heidi's Infinite Sudoku
//
// Copyright 2024 David Bau, all rights reserved.

var I18n = (function() {
  var currentLang = 'en';
  var translations = {};
  var availableLanguages = {
    'en': 'English',
    'zh': '中文',
    'zh-tw': '中文 (繁體)',
    'es': 'Español',
    'ar': 'العربية',
    'pt': 'Português',
    'id': 'Bahasa Indonesia',
    'fr': 'Français',
    'ja': '日本語',
    'ru': 'Русский',
    'de': 'Deutsch'
  };

  // Get language from URL parameter
  function getLanguageFromURL() {
    var params = window.location.search.substring(1).split('&');
    for (var i = 0; i < params.length; i++) {
      var pair = params[i].split('=');
      if (pair[0] === 'lang' && pair[1]) {
        var lang = pair[1].toLowerCase();
        if (availableLanguages.hasOwnProperty(lang)) {
          return lang;
        }
      }
    }
    return null;
  }

  // Detect browser language
  function detectLanguage() {
    var browserLang = navigator.language || navigator.userLanguage || 'en';
    // Extract the primary language code (e.g., 'en' from 'en-US')
    browserLang = browserLang.split('-')[0].toLowerCase();

    // Check if we support this language
    if (availableLanguages.hasOwnProperty(browserLang)) {
      return browserLang;
    }

    // Default to English
    return 'en';
  }

  // Load language from URL, localStorage, or detect from browser
  function initLanguage() {
    // Priority: URL parameter > localStorage > browser detection
    var urlLang = getLanguageFromURL();
    if (urlLang) {
      currentLang = urlLang;
      // Save to localStorage for persistence
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sudoku_lang', urlLang);
      }
    } else if (typeof localStorage !== 'undefined' && localStorage.getItem('sudoku_lang')) {
      currentLang = localStorage.getItem('sudoku_lang');
    } else {
      currentLang = detectLanguage();
    }
  }

  // Set current language
  function setLanguage(lang) {
    if (availableLanguages.hasOwnProperty(lang)) {
      currentLang = lang;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sudoku_lang', lang);
      }
      return true;
    }
    return false;
  }

  // Get current language
  function getLanguage() {
    return currentLang;
  }

  // Get available languages
  function getAvailableLanguages() {
    return availableLanguages;
  }

  // Register translations for a language
  function register(lang, trans) {
    translations[lang] = trans;
  }

  // Check if we're on Mac
  function isMac() {
    return navigator.platform.indexOf('Mac') > -1;
  }

  // Replace Ctrl with Command symbol on Mac
  function adaptForPlatform(text) {
    if (isMac() && typeof text === 'string') {
      // Replace various forms of "Ctrl" with the Command symbol (⌘ is U+2318)
      return text.replace(/\bCtrl\b/g, '\u2318')      // English, French, Spanish, etc.
                 .replace(/\bStrg\b/g, '\u2318')      // German
                 .replace(/按Ctrl/g, '按\u2318');     // Chinese: "press Ctrl"
    }
    return text;
  }

  // Get translation string
  function t(key, defaultValue) {
    var result;
    if (translations[currentLang] && translations[currentLang][key]) {
      result = translations[currentLang][key];
    } else if (currentLang !== 'en' && translations['en'] && translations['en'][key]) {
      // Fallback to English
      result = translations['en'][key];
    } else {
      result = defaultValue || key;
    }
    return adaptForPlatform(result);
  }

  // Get translation function for current language
  function getTranslator() {
    return function(key, defaultValue) {
      return t(key, defaultValue);
    };
  }

  // Format time ago message
  function timeago(ms) {
    var trans = translations[currentLang] || translations['en'];
    if (!trans || !trans.timeago) {
      // Fallback to English-style formatting
      return formatTimeagoEnglish(ms);
    }
    return trans.timeago(ms);
  }

  // English time ago formatting (fallback)
  function formatTimeagoEnglish(ms) {
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

  // Get difficulty levels
  function getLevels() {
    var trans = translations[currentLang] || translations['en'];
    if (trans && trans.levels) {
      return trans.levels;
    }
    // Return English as fallback
    return translations['en'] ? translations['en'].levels : [];
  }

  // Initialize on load
  initLanguage();

  return {
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    getAvailableLanguages: getAvailableLanguages,
    register: register,
    t: t,
    getTranslator: getTranslator,
    timeago: timeago,
    getLevels: getLevels
  };
})();
