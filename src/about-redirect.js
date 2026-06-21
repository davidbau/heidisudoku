// Redirect to language-specific about page.
// External file because MV3 extension pages block inline scripts.
var lang = I18n.getLanguage();
window.location.href = 'about.' + lang + '.html';
