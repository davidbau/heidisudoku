// Chinese (Traditional) translations for Heidi's Infinite Sudoku

I18n.register('zh-tw', {
  // Page titles
  'title': "海蒂的無限數獨",
  'about_title': "關於海蒂的無限數獨",

  // Main UI
  'time_label': "時間",
  'finished_in': "完成於",
  'hints_label': "提示",

  // Buttons
  'color_button': "顏色",
  'color_button_title': "顯示顏色。按Ctrl清除顏色。",
  'file_button': "檔案",
  'file_button_title': "載入或儲存。按Ctrl載入17提示數獨。",
  'clear_button': "清除",
  'clear_button_title': "重置謎題。按Ctrl清空謎題。",
  'check_button': "檢查",
  'check_button_title': "檢查錯誤。按Ctrl顯示錯誤。",
  'prev_button': "« 上一個",
  'prev_button_title': "上一個謎題。按Ctrl後退10個。",
  'next_button': "下一個 »",
  'next_button_title': "下一個謎題。按Ctrl前進10個。",
  'hint_button': "提示",
  'hint_button_title': "顯示提示。按Ctrl獲得明確提示。",
  'marks_button': "標記",
  'marks_button_title': "自動鉛筆標記。按Ctrl清除標記。",
  'timer_button': "計時器",
  'timer_button_title': "顯示計時器。按Ctrl顯示答案。",

  // Popups
  'victory': "你贏了！",
  'ok': "目前正確",
  'errors': "錯誤",
  'nohint': "無提示",

  // File dialog
  'saved_games': "已儲存的遊戲",
  'save_current': "儲存當前遊戲",
  'save_copy': "儲存新副本",
  'save_as_url': "儲存為網址",
  'select_all': "全選",
  'delete_selected': "刪除所選",
  'load_selected': "載入所選",
  'saved_game_default': "已儲存的遊戲",

  // About page link
  'about_link': "關於此遊戲",

  // About page content
  'back_to_game': "返回遊戲",
  'how_to_play': "如何遊戲",
  'how_to_play_p1': "使用<b>下一個</b>和<b>上一個</b>按鈕或<b>N</b>和<b>P</b>鍵瀏覽謎題。您可以按任意順序玩謎題，稍後再返回任何謎題。",
  'how_to_play_p2': "要填寫謎題，請點擊右側的數字，然後點擊任何方格以鉛筆標記該數字。數獨的規則是每個數字1-9必須在每行、每列和每個3x3塊中出現一次。",

  'keyboard_shortcuts': "鍵盤快捷鍵",
  'keyboard_shortcuts_p1': "您也可以使用鍵盤。指向一個方格或使用箭頭<b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b>鍵移動藍色虛線矩形，然後輸入數字<b>1</b> - <b>9</b>填入。在一個方格中輸入多個數字將標記所有這些數字，但雙擊數字將清除所有標記並將該數字寫為答案。使用<b>空格</b>或<b>0</b>鍵再次清除所選方格。",
  'keyboard_shortcuts_p2': "逗號<b>,</b>鍵會彈出一個選單，讓您標記多個數字。當選單顯示時，<b>H</b>鍵可以用黃色突出顯示標記的數字。<b>M</b>鍵會自動標記在行、列或塊中沒有直接衝突的數字，<b>標記</b>按鈕會為每個方格填寫這些。",

  'getting_hints': "獲取提示",
  'getting_hints_p1': "點擊左側的顏色以顯示該難度級別的方格：紫色方格最簡單，紅色方格最難。點擊<b>顏色</b>按鈕顯示所有顏色。",
  'getting_hints_p2': "按住<b>提示</b>按鈕獲取特定提示。紅色方格指出任何錯誤。藍色方格將是以某種方式約束謎題的地方，綠色方格將是可以填入數字或縮小可能性的位置。",
  'getting_hints_p3': "如果您仍然卡住，可以在按住<b>ctrl</b>的同時點擊<b>提示</b>按鈕以嘗試更明確的提示。有時顯示的策略會非常微妙：學習識別<a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">顯式對</a>和<a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">交集</a>，看看您是否能找到<a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">隱藏對或三元組</a>或識別<a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">X翼</a>、<a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">Y翼</a>或<a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">劍魚</a>。",

  'checking_mistakes': "檢查和修復錯誤",
  'checking_mistakes_p1': "<b>檢查</b>按鈕可用於快速檢查您是否鉛筆標記了任何錯誤或矛盾的方格，而不會顯示錯誤是什麼。",
  'checking_mistakes_p2': "在按住<b>ctrl</b>的同時點擊<b>檢查</b>將顯示錯誤的位置。",
  'checking_mistakes_p3': "當您發現錯誤時，可以使用瀏覽器的\"後退\"按鈕撤銷所需的任意數量的移動。",

  'the_timer': "計時器",
  'the_timer_p1': "遊戲將追蹤您解決謎題所花費的時間。按<b>計時器</b>按鈕顯示經過的時間和提示計數器。",
  'the_timer_p2': "如果您離開謎題並且不希望所有空閒時間都算在內，不用擔心：按瀏覽器中的\"重新整理\"按鈕，計時器將返回到您最後一次移動的時間。同樣，如果您儲存遊戲，儲存的時間將是最後一次移動的時間。",

  'saving_sharing': "儲存和分享謎題",
  'saving_sharing_p1': "也可以使用<b>檔案</b>按鈕儲存和載入謎題。已儲存的遊戲透過評級、日期和進度標識，或者您可以自己重新命名它們。",
  'saving_sharing_p2': "如果您發現一個想要分享的寶石遊戲，<b>儲存為網址</b>連結將為您當前的謎題建立一個可以透過電子郵件傳送的短網址。您在遊戲上放置的任何標記和顏色都將與網址一起儲存，因此您可以與其他謎題愛好者分享特別聰明的數獨步驟。",

  'entering_puzzles': "輸入您自己的謎題",
  'entering_puzzles_p1': "如果您按右鍵或在點擊方格時按住<b>ctrl</b>，您可以隨時更改謎題。在點擊<b>清除</b>時按住<b>ctrl</b>將清除整個謎題，您可以使用鍵盤或滑鼠輸入新謎題。請注意，某些數字無法輸入，因為提示板不會讓您輸入沒有解決方案的謎題。",
  'entering_puzzles_p2': "一旦您輸入了具有唯一解決方案的謎題，將顯示難度評級，鍵盤將切換回遊戲模式。",

  'minimal_puzzles': "數學上最小的謎題",
  'minimal_puzzles_p1': "通常，海蒂的無限數獨板中的謎題將有25-30個提示。當然，如果提示較少，您將享受稍長的遊戲時間。",
  'minimal_puzzles_p2': "可解決的數獨遊戲可以給出的最小提示數被認為是17，Gordon Royle維護了迄今為止發現的所有17提示謎題的資料庫。如果您在點擊<b>檔案</b>時按住<b>ctrl</b>，將從網際網路載入這些17提示謎題之一。",

  'difficulty_ratings': "難度評級",
  'difficulty_ratings_p1': "數獨謎題按24級評級，從\"初學者\"（最簡單）到\"令人困惑\"（最難）。整個評級：",
  'difficulty_ratings_p2': "只需避免直接衝突就可以解決的謎題是\"基本\"或更容易，具體取決於看到約束有多容易。\"微妙\"的謎題需要一兩個聰明的推論。從那裡變得更加困難：\"令人困惑\"的謎題涉及解開大量複雜的線索。",

  'credits': "製作人員",
  'credits_content': "海蒂的提示板是由海蒂的丈夫<a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a>使用<a target=_blank href=\"http://ejohn.org/\">John Resig的</a> <a target=_blank href=\"http://jquery.com/\">jQuery</a>和<a target=_blank href=\"http://benalman.com/\">Ben Alman的</a>方便的<a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">BBQ外掛</a>（由<a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a> <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">分支</a>）用HTML和Javascript編寫的。<a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince的</a>精彩<a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a>字型提供手寫數字，<a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson的</a> <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a>用於謎題數字。<a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a>提供了黃色螢光筆圖示；<a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle的</a>數學上美麗的<a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">最小數獨集</a>在您按住<b>ctrl</b>同時點擊<b>檔案</b>時提供最小的17提示謎題。",
  'sources_notice': "海蒂的數獨提示板的原始碼目前未獲得重複使用許可，但可以在<a target=_blank href=\"https://github.com/davidbau/heidisudoku\">Github上閱讀</a>。",
  'version': "版本 0.67",

  // Color labels
  'easiest': '最簡單',
  'hardest': '最難',

  // Difficulty levels
  levels: [
    "無解",
    "初學者",
    "容易",
    "簡單",
    "基本",
    "中等",
    "棘手",
    "聰明",
    "令人困惑",
    "微妙",
    "困難",
    "複雜",
    "棘手",
    "令人困惑",
    "錯綜複雜",
    "令人費解",
    "模糊",
    "迷宮般",
    "固執",
    "深奧",
    "惱人",
    "神祕",
    "強大",
    "惡魔般",
    "令人困惑",
    "不可能"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['剛才'],
      ['', Math.round(ms / 1000), '秒前'],
      ['', Math.round(ms / 60 / 1000), '分鐘前'],
      ['', Math.round(ms / 60 / 60 / 1000), '小時前'],
      ['', Math.round(ms / 24 / 60 / 60 / 1000), '天前'],
      ['', Math.round(ms / 7 / 24 / 60 / 60 / 1000), '週前'],
      ['', Math.round(ms / 30 / 24 / 60 / 60 / 1000), '月前'],
      ['', Math.round(ms / 365 / 24 / 60 / 60 / 1000), '年前']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join('');
  }
});
