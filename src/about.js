$(function() {

if (/^chrome-extension:/.test(location.href)) {
  $('.back').attr('href', '/app.html');
}

$('.back').click(function(ev) {
  if (history.length > 1) {
    history.back();
    ev.preventDefault();
    return false;
  }
});

});
