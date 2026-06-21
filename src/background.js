// MV3 service worker: open the game in a full-page tab when the toolbar icon is clicked.
chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({ url: chrome.runtime.getURL('app.html') });
});
