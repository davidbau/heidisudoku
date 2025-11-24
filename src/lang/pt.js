// Portuguese translations for Heidi's Infinite Sudoku

I18n.register('pt', {
  // Page titles
  'title': "Sudoku Infinito da Heidi",
  'about_title': "Sobre o Sudoku Infinito da Heidi",

  // Main UI
  'promo': "Instale o aplicativo Chrome para jogar offline",
  'time_label': "Tempo",
  'finished_in': "Terminado em",
  'hints_label': "Dicas",

  // Buttons
  'color_button': "Cor",
  'color_button_title': "Mostrar cores. Ctrl para limpar cores.",
  'file_button': "Arquivo",
  'file_button_title': "Carregar ou salvar. Ctrl para carregar um Sudoku de 17 dicas.",
  'clear_button': "Limpar",
  'clear_button_title': "Reiniciar quebra-cabeça. Ctrl para quebra-cabeça vazio.",
  'check_button': "Check",
  'check_button_title': "Verificar erros. Ctrl para mostrar erro.",
  'prev_button': "« Ant",
  'prev_button_title': "Quebra-cabeça anterior. Ctrl para voltar 10.",
  'next_button': "Prox »",
  'next_button_title': "Próximo quebra-cabeça. Ctrl para avançar 10.",
  'hint_button': "Dica",
  'hint_button_title': "Mostrar uma dica. Ctrl para uma dica explícita.",
  'marks_button': "Marcas",
  'marks_button_title': "Marcas de lápis automáticas. Ctrl para limpar marcas.",
  'timer_button': "Timer",
  'timer_button_title': "Mostrar cronômetro. Ctrl para revelar solução.",

  // Popups
  'victory': "Você venceu!",
  'ok': "ok até agora",
  'errors': "erro",
  'nohint': "sem dica",

  // File dialog
  'saved_games': "Jogos Salvos",
  'save_current': "Salvar Jogo Atual",
  'save_copy': "Salvar Nova Cópia",
  'save_as_url': "salvar como url",
  'select_all': "Selecionar Tudo",
  'delete_selected': "Excluir Selecionados",
  'load_selected': "Carregar Selecionado",
  'saved_game_default': "Jogo Salvo",

  // About page link
  'about_link': "Sobre este jogo",

  // About page content
  'back_to_game': "Voltar ao jogo",
  'how_to_play': "Como Jogar",
  'how_to_play_p1': "Navegue pelos quebra-cabeças com os botões <b>Próximo</b> e <b>Anterior</b> ou as teclas <b>N</b> e <b>P</b>. Você pode trabalhar nos quebra-cabeças em qualquer ordem e voltar a qualquer quebra-cabeça mais tarde.",
  'how_to_play_p2': "Para preencher um quebra-cabeça, clique em um número à direita e depois clique em qualquer quadrado para marcar esse número a lápis. As regras do Sudoku são que cada dígito 1-9 deve aparecer uma vez em cada linha, coluna e bloco 3x3.",

  'keyboard_shortcuts': "Atalhos de Teclado",
  'keyboard_shortcuts_p1': "Você também pode usar o teclado. Aponte para um quadrado ou use as teclas de seta <b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b> para mover o retângulo azul pontilhado e depois digite um dígito <b>1</b> - <b>9</b> para preenchê-lo. Digitar vários números em um quadrado marcará todos esses números, mas um número tocado duas vezes limpará todas as marcas e escreverá o número como resposta. Use a tecla <b>espaço</b> ou <b>0</b> para limpar o quadrado selecionado novamente.",
  'keyboard_shortcuts_p2': "A tecla vírgula <b>,</b> abre um menu que permite marcar vários números. Com o menu mostrando, a tecla <b>H</b> permite destacar em amarelo os números marcados. A tecla <b>M</b> marca automaticamente números que não estão em conflito direto na linha, coluna ou bloco, e o botão <b>Marcas</b> preenche estes para cada quadrado.",

  'getting_hints': "Obtendo Dicas",
  'getting_hints_p1': "Clique em uma cor à esquerda para revelar quadrados que estão nesse nível de dificuldade: quadrados violeta são os mais fáceis e quadrados vermelhos são os mais difíceis. Clique no botão <b>Cor</b> para revelar todas as cores.",
  'getting_hints_p2': "Mantenha pressionado o botão <b>Dica</b> para obter uma dica específica. Quadrados vermelhos apontam quaisquer erros. Quadrados azuis serão lugares que restringem o quebra-cabeça de alguma forma, e quadrados verdes serão locais onde um número pode ser preenchido ou onde as possibilidades podem ser reduzidas.",
  'getting_hints_p3': "Se você ainda estiver preso, pode tentar uma dica mais explícita mantendo pressionado <b>ctrl</b> enquanto clica no botão <b>Dica</b>. Às vezes, as estratégias mostradas serão muito sutis: aprenda a reconhecer <a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">pares nus</a> e <a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">interseções</a>, e veja se consegue encontrar os <a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">pares ou trios ocultos</a> ou reconhecer uma <a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">asa-x</a>, <a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">asa-y</a> ou <a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">peixe-espada</a>.",

  'checking_mistakes': "Verificando e Corrigindo Erros",
  'checking_mistakes_p1': "O botão <b>Verificar</b> pode ser usado para verificar rapidamente se você marcou a lápis quaisquer erros ou quadrados contraditórios sem revelar quais são os erros.",
  'checking_mistakes_p2': "Manter pressionado <b>ctrl</b> enquanto clica em <b>Verificar</b> mostrará a posição de um erro.",
  'checking_mistakes_p3': "Quando você descobrir um erro, pode usar o botão \"voltar\" do navegador para desfazer tantos movimentos quanto precisar.",

  'the_timer': "O Cronômetro",
  'the_timer_p1': "O jogo acompanhará a quantidade de tempo que você levou para resolver um quebra-cabeça. Pressione o botão <b>Cronômetro</b> para exibir o tempo decorrido e o contador de dicas.",
  'the_timer_p2': "Se você se afastar de um quebra-cabeça e não quiser que todo o tempo ocioso conte contra você, não se preocupe: pressione o botão \"Atualizar\" em seu navegador e o cronômetro voltará ao momento em que você fez seu último movimento. Da mesma forma, se você salvar um jogo, o tempo salvo será o do último movimento feito.",

  'saving_sharing': "Salvando e Compartilhando Quebra-cabeças",
  'saving_sharing_p1': "Os quebra-cabeças também podem ser salvos e carregados usando o botão <b>Arquivo</b>. Os jogos salvos são identificados por classificação, data e progresso, ou você pode renomeá-los você mesmo.",
  'saving_sharing_p2': "Se você descobrir uma joia de jogo que gostaria de compartilhar, o link <b>Salvar como Url</b> criará uma URL curta para seu quebra-cabeça atual que pode ser enviada por e-mail. Quaisquer marcações e cores que você colocar no jogo serão salvas junto com a URL, para que você possa compartilhar uma etapa de sudoku particularmente inteligente com outros entusiastas.",

  'entering_puzzles': "Inserindo Seus Próprios Quebra-cabeças",
  'entering_puzzles_p1': "Se você clicar com o botão direito ou mantiver pressionado <b>ctrl</b> enquanto clica em um quadrado, poderá alterar o quebra-cabeça a qualquer momento. Manter pressionado <b>ctrl</b> enquanto clica em <b>Limpar</b> limpará todo o quebra-cabeça, e você pode inserir um novo quebra-cabeça usando o teclado ou o mouse. Observe que alguns números não podem ser inseridos porque o bloco de dicas não permitirá que você insira um quebra-cabeça sem solução.",
  'entering_puzzles_p2': "Assim que você inserir um quebra-cabeça com uma solução única, uma classificação de dificuldade será mostrada e o teclado voltará ao modo de jogo.",

  'minimal_puzzles': "Quebra-cabeças Matematicamente Mínimos",
  'minimal_puzzles_p1': "Normalmente, os quebra-cabeças encontrados no Sudoku Infinito da Heidi terão 25-30 dicas. Naturalmente, se houver menos dicas, você desfrutará de um jogo um pouco mais longo.",
  'minimal_puzzles_p2': "Acredita-se que o menor número de dicas que pode ser dado em um jogo de Sudoku solucionável seja 17, e Gordon Royle mantém um banco de dados de todos os quebra-cabeças de 17 dicas que foram descobertos até agora. Se você mantiver pressionado <b>ctrl</b> enquanto clica em <b>Arquivo</b>, um desses quebra-cabeças de 17 dicas será carregado da internet.",

  'difficulty_ratings': "Classificações de Dificuldade",
  'difficulty_ratings_p1': "Os quebra-cabeças de Sudoku são classificados em uma escala de 24 níveis desde \"Iniciante\" (o mais fácil) até \"Confuso\" (o mais difícil). A escala completa:",
  'difficulty_ratings_p2': "Os quebra-cabeças que podem ser resolvidos apenas evitando conflitos diretos são \"Básico\" ou mais fáceis, dependendo de quão fácil seja ver as restrições. Quebra-cabeças \"Sutis\" requerem uma ou duas deduções inteligentes. E fica mais difícil a partir daí: quebra-cabeças \"Confusos\" envolvem desembaraçar uma massa de pistas complexas.",

  'credits': "Créditos",
  'credits_content': "O Bloco da Heidi foi escrito em HTML e Javascript pelo marido da Heidi <a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a> usando <a target=_blank href=\"http://jquery.com/\">jQuery</a> de <a target=_blank href=\"http://ejohn.org/\">John Resig</a> com o prático <a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">plugin BBQ</a> de <a target=_blank href=\"http://benalman.com/\">Ben Alman</a> (como <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">bifurcado</a> por <a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a>). A maravilhosa fonte <a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a> de <a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince</a> fornece dígitos manuscritos e <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a> de <a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson</a> é usado para os numerais do quebra-cabeça. <a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a> forneceu o ícone de marca-texto amarelo; e a matematicamente bela <a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">Coleção Mínima de Sudoku</a> de <a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle</a> fornece quebra-cabeças mínimos de 17 dicas quando você mantém pressionado <b>ctrl</b> enquanto clica em <b>Arquivo</b>.",
  'sources_notice': "As fontes do Bloco de Sudoku da Heidi não estão licenciadas para reutilização no momento, mas estão disponíveis para leitura <a target=_blank href=\"https://github.com/davidbau/heidisudoku\">aqui no Github</a>.",
  'version': "Versão 0.67",

  // Color labels
  'easiest': 'Mais fácil',
  'hardest': 'Mais difícil',

  // Difficulty levels
  levels: [
    "Insolúvel",
    "Iniciante",
    "Fácil",
    "Simples",
    "Básico",
    "Moderado",
    "Complicado",
    "Esperto",
    "Intrigante",
    "Sutil",
    "Difícil",
    "Complicado",
    "Espinhoso",
    "Desconcertante",
    "Intrincado",
    "Perplexo",
    "Obscuro",
    "Labiríntico",
    "Obstinado",
    "Abstruso",
    "Irritante",
    "Enigmático",
    "Formidável",
    "Diabólico",
    "Confuso",
    "Impossível"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['agora mesmo'],
      ['há', Math.round(ms / 1000), 'segundos'],
      ['há', Math.round(ms / 60 / 1000), 'minutos'],
      ['há', Math.round(ms / 60 / 60 / 1000), 'horas'],
      ['há', Math.round(ms / 24 / 60 / 60 / 1000), 'dias'],
      ['há', Math.round(ms / 7 / 24 / 60 / 60 / 1000), 'semanas'],
      ['há', Math.round(ms / 30 / 24 / 60 / 60 / 1000), 'meses'],
      ['há', Math.round(ms / 365 / 24 / 60 / 60 / 1000), 'anos']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join(' ');
  }
});
