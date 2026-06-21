// Initialize i18n and localize the app UI.
// External file (not inline) because MV3 extension pages disallow inline scripts.
$(function() {
  // Initialize i18n and update page
  document.title = I18n.t('title');
  $('#main-title').text(I18n.t('title'));
  $('.progress').text(I18n.t('time_label'));
  $('.finished').text(I18n.t('finished_in'));
  $('.hinttext').html(I18n.t('hints_label') + ' <span class=hints>0</span>');
  $('#colorbutton').val(I18n.t('color_button')).attr('title', I18n.t('color_button_title'));
  $('#filebutton').val(I18n.t('file_button')).attr('title', I18n.t('file_button_title'));
  $('#clearbutton').val(I18n.t('clear_button')).attr('title', I18n.t('clear_button_title'));
  $('#checkbutton').val(I18n.t('check_button')).attr('title', I18n.t('check_button_title'));
  $('#prevbutton').val(I18n.t('prev_button')).attr('title', I18n.t('prev_button_title'));
  $('#nextbutton').val(I18n.t('next_button')).attr('title', I18n.t('next_button_title'));
  $('#hintbutton').val(I18n.t('hint_button')).attr('title', I18n.t('hint_button_title'));
  $('#markbutton').val(I18n.t('marks_button')).attr('title', I18n.t('marks_button_title'));
  $('#timerbutton').val(I18n.t('timer_button')).attr('title', I18n.t('timer_button_title'));
  $('#victory').text(I18n.t('victory'));
  $('#ok').text(I18n.t('ok'));
  $('#errors').text(I18n.t('errors'));
  $('#nohint').text(I18n.t('nohint'));
  $('.save-outerbox center').text(I18n.t('saved_games'));
  $('#savename').val(I18n.t('saved_game_default'));
  $('#savecurrent').val(I18n.t('save_current'));
  $('#savecopy').val(I18n.t('save_copy'));
  $('#shortenurl').text(I18n.t('save_as_url'));
  $('#selectall').val(I18n.t('select_all'));
  $('#deleteselected').val(I18n.t('delete_selected'));
  $('#loadselected').val(I18n.t('load_selected'));
  $('.save-outerbox center').first().text(I18n.t('saved_games'));
  // Update about link to point to language-specific page
  var aboutLink = $('a[href="about.html"]');
  aboutLink.text(I18n.t('about_link'));
  aboutLink.attr('href', 'about.' + I18n.getLanguage() + '.html');

  // Language selector change handler
  $('#langselect').on('change', function() {
    var lang = $(this).val();
    I18n.setLanguage(lang);
    // Reload with language parameter
    var url = window.location.pathname + '?lang=' + lang + window.location.hash;
    window.location.href = url;
  });

  // Set current language in selector
  $('#langselect').val(I18n.getLanguage());
});
