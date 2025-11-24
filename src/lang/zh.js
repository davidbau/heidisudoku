// Chinese (Simplified) translations for Heidi's Infinite Sudoku

I18n.register('zh', {
  // Page titles
  'title': "海蒂的无限数独",
  'about_title': "关于海蒂的无限数独",

  // Main UI
  'promo': "安装Chrome网络应用以离线游戏",
  'time_label': "时间",
  'finished_in': "完成于",
  'hints_label': "提示",

  // Buttons
  'color_button': "颜色",
  'color_button_title': "显示颜色。按Ctrl清除颜色。",
  'file_button': "文件",
  'file_button_title': "载入或保存。按Ctrl载入17提示数独。",
  'clear_button': "清除",
  'clear_button_title': "重置谜题。按Ctrl清空谜题。",
  'check_button': "检查",
  'check_button_title': "检查错误。按Ctrl显示错误。",
  'prev_button': "« 上一个",
  'prev_button_title': "上一个谜题。按Ctrl后退10个。",
  'next_button': "下一个 »",
  'next_button_title': "下一个谜题。按Ctrl前进10个。",
  'hint_button': "提示",
  'hint_button_title': "显示提示。按Ctrl获得明确提示。",
  'marks_button': "标记",
  'marks_button_title': "自动铅笔标记。按Ctrl清除标记。",
  'timer_button': "计时器",
  'timer_button_title': "显示计时器。按Ctrl显示答案。",

  // Popups
  'victory': "你赢了！",
  'ok': "目前正确",
  'errors': "错误",
  'nohint': "无提示",

  // File dialog
  'saved_games': "已保存的游戏",
  'save_current': "保存当前游戏",
  'save_copy': "保存新副本",
  'save_as_url': "保存为网址",
  'select_all': "全选",
  'delete_selected': "删除所选",
  'load_selected': "载入所选",
  'saved_game_default': "已保存的游戏",

  // About page link
  'about_link': "关于此游戏",

  // About page content
  'back_to_game': "返回游戏",
  'how_to_play': "如何游戏",
  'how_to_play_p1': "使用<b>下一个</b>和<b>上一个</b>按钮或<b>N</b>和<b>P</b>键浏览谜题。您可以按任意顺序玩谜题，稍后再返回任何谜题。",
  'how_to_play_p2': "要填写谜题，请单击右侧的数字，然后单击任何方格以铅笔标记该数字。数独的规则是每个数字1-9必须在每行、每列和每个3x3块中出现一次。",

  'keyboard_shortcuts': "键盘快捷键",
  'keyboard_shortcuts_p1': "您也可以使用键盘。指向一个方格或使用箭头<b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b>键移动蓝色虚线矩形，然后输入数字<b>1</b> - <b>9</b>填入。在一个方格中输入多个数字将标记所有这些数字，但双击数字将清除所有标记并将该数字写为答案。使用<b>空格</b>或<b>0</b>键再次清除所选方格。",
  'keyboard_shortcuts_p2': "逗号<b>,</b>键会弹出一个菜单，让您标记多个数字。当菜单显示时，<b>H</b>键可以用黄色突出显示标记的数字。<b>M</b>键会自动标记在行、列或块中没有直接冲突的数字，<b>标记</b>按钮会为每个方格填写这些。",

  'getting_hints': "获取提示",
  'getting_hints_p1': "单击左侧的颜色以显示该难度级别的方格：紫色方格最简单，红色方格最难。单击<b>颜色</b>按钮显示所有颜色。",
  'getting_hints_p2': "按住<b>提示</b>按钮获取特定提示。红色方格指出任何错误。蓝色方格将是以某种方式约束谜题的地方，绿色方格将是可以填入数字或缩小可能性的位置。",
  'getting_hints_p3': "如果您仍然卡住，可以在按住<b>ctrl</b>的同时单击<b>提示</b>按钮以尝试更明确的提示。有时显示的策略会非常微妙：学习识别<a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">显式对</a>和<a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">交集</a>，看看您是否能找到<a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">隐藏对或三元组</a>或识别<a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">X翼</a>、<a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">Y翼</a>或<a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">剑鱼</a>。",

  'checking_mistakes': "检查和修复错误",
  'checking_mistakes_p1': "<b>检查</b>按钮可用于快速检查您是否铅笔标记了任何错误或矛盾的方格，而不会显示错误是什么。",
  'checking_mistakes_p2': "在按住<b>ctrl</b>的同时单击<b>检查</b>将显示错误的位置。",
  'checking_mistakes_p3': "当您发现错误时，可以使用浏览器的\"后退\"按钮撤消所需的任意数量的移动。",

  'the_timer': "计时器",
  'the_timer_p1': "游戏将跟踪您解决谜题所花费的时间。按<b>计时器</b>按钮显示经过的时间和提示计数器。",
  'the_timer_p2': "如果您离开谜题并且不希望所有空闲时间都算在内，不用担心：按浏览器中的\"刷新\"按钮，计时器将返回到您最后一次移动的时间。同样，如果您保存游戏，保存的时间将是最后一次移动的时间。",

  'saving_sharing': "保存和分享谜题",
  'saving_sharing_p1': "也可以使用<b>文件</b>按钮保存和载入谜题。已保存的游戏通过评级、日期和进度标识，或者您可以自己重命名它们。",
  'saving_sharing_p2': "如果您发现一个想要分享的宝石游戏，<b>保存为网址</b>链接将为您当前的谜题创建一个可以通过电子邮件发送的短网址。您在游戏上放置的任何标记和颜色都将与网址一起保存，因此您可以与其他谜题爱好者分享特别聪明的数独步骤。",

  'entering_puzzles': "输入您自己的谜题",
  'entering_puzzles_p1': "如果您右键单击或在单击方格时按住<b>ctrl</b>，您可以随时更改谜题。在单击<b>清除</b>时按住<b>ctrl</b>将清除整个谜题，您可以使用键盘或鼠标输入新谜题。请注意，某些数字无法输入，因为提示板不会让您输入没有解决方案的谜题。",
  'entering_puzzles_p2': "一旦您输入了具有唯一解决方案的谜题，将显示难度评级，键盘将切换回游戏模式。",

  'minimal_puzzles': "数学上最小的谜题",
  'minimal_puzzles_p1': "通常，海蒂的无限数独板中的谜题将有25-30个提示。当然，如果提示较少，您将享受稍长的游戏时间。",
  'minimal_puzzles_p2': "可解决的数独游戏可以给出的最小提示数被认为是17，Gordon Royle维护了迄今为止发现的所有17提示谜题的数据库。如果您在单击<b>文件</b>时按住<b>ctrl</b>，将从互联网加载这些17提示谜题之一。",

  'difficulty_ratings': "难度评级",
  'difficulty_ratings_p1': "数独谜题按24级评级，从\"初学者\"（最简单）到\"令人困惑\"（最难）。整个评级：",
  'difficulty_ratings_p2': "只需避免直接冲突就可以解决的谜题是\"基本\"或更容易，具体取决于看到约束有多容易。\"微妙\"的谜题需要一两个聪明的推论。从那里变得更加困难：\"令人困惑\"的谜题涉及解开大量复杂的线索。",

  'credits': "制作人员",
  'credits_content': "海蒂的提示板是由海蒂的丈夫<a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a>使用<a target=_blank href=\"http://ejohn.org/\">John Resig的</a> <a target=_blank href=\"http://jquery.com/\">jQuery</a>和<a target=_blank href=\"http://benalman.com/\">Ben Alman的</a>方便的<a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">BBQ插件</a>（由<a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a> <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">分叉</a>）用HTML和Javascript编写的。<a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince的</a>精彩<a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a>字体提供手写数字，<a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson的</a> <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a>用于谜题数字。<a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a>提供了黄色荧光笔图标；<a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle的</a>数学上美丽的<a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">最小数独集</a>在您按住<b>ctrl</b>同时单击<b>文件</b>时提供最小的17提示谜题。",
  'sources_notice': "海蒂的数独提示板的源代码目前未获得重用许可，但可以在<a target=_blank href=\"https://github.com/davidbau/heidisudoku\">Github上阅读</a>。",
  'version': "版本 0.67",

  // Color labels
  'easiest': '最简单',
  'hardest': '最难',

  // Difficulty levels
  levels: [
    "无解",
    "初学者",
    "容易",
    "简单",
    "基本",
    "中等",
    "棘手",
    "聪明",
    "令人困惑",
    "微妙",
    "困难",
    "复杂",
    "棘手",
    "令人困惑",
    "错综复杂",
    "令人费解",
    "模糊",
    "迷宫般",
    "固执",
    "深奥",
    "恼人",
    "神秘",
    "强大",
    "恶魔般",
    "令人困惑",
    "不可能"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['刚才'],
      ['', Math.round(ms / 1000), '秒前'],
      ['', Math.round(ms / 60 / 1000), '分钟前'],
      ['', Math.round(ms / 60 / 60 / 1000), '小时前'],
      ['', Math.round(ms / 24 / 60 / 60 / 1000), '天前'],
      ['', Math.round(ms / 7 / 24 / 60 / 60 / 1000), '周前'],
      ['', Math.round(ms / 30 / 24 / 60 / 60 / 1000), '月前'],
      ['', Math.round(ms / 365 / 24 / 60 / 60 / 1000), '年前']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join('');
  }
});
