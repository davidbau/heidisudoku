// Spanish translations for Heidi's Infinite Sudoku

I18n.register('es', {
  // Page titles
  'title': "Sudoku Infinito de Heidi",
  'about_title': "Acerca de Sudoku Infinito de Heidi",

  // Main UI
  'promo': "Instale la aplicación web de Chrome para jugar sin conexión",
  'time_label': "Tiempo",
  'finished_in': "Terminado en",
  'hints_label': "Pistas",

  // Buttons
  'color_button': "Color",
  'color_button_title': "Mostrar colores. Ctrl para borrar colores.",
  'file_button': "Archivo",
  'file_button_title': "Cargar o guardar. Ctrl para cargar un Sudoku de 17 pistas.",
  'clear_button': "Borrar",
  'clear_button_title': "Reiniciar puzzle. Ctrl para puzzle vacío.",
  'check_button': "Check",
  'check_button_title': "Buscar errores. Ctrl para mostrar error.",
  'prev_button': "« Ant",
  'prev_button_title': "Puzzle anterior. Ctrl para retroceder 10.",
  'next_button': "Sig »",
  'next_button_title': "Siguiente puzzle. Ctrl para avanzar 10.",
  'hint_button': "Pista",
  'hint_button_title': "Mostrar una pista. Ctrl para una pista explícita.",
  'marks_button': "Marcas",
  'marks_button_title': "Marcas de lápiz automáticas. Ctrl para borrar marcas.",
  'timer_button': "Timer",
  'timer_button_title': "Mostrar cronómetro. Ctrl para revelar solución.",

  // Popups
  'victory': "¡Ganaste!",
  'ok': "bien hasta ahora",
  'errors': "error",
  'nohint': "sin pista",

  // File dialog
  'saved_games': "Juegos Guardados",
  'save_current': "Guardar Juego Actual",
  'save_copy': "Guardar Nueva Copia",
  'save_as_url': "guardar como url",
  'select_all': "Seleccionar Todo",
  'delete_selected': "Eliminar Seleccionados",
  'load_selected': "Cargar Seleccionado",
  'saved_game_default': "Juego Guardado",

  // About page link
  'about_link': "Acerca de este juego",

  // About page content
  'back_to_game': "Volver al juego",
  'how_to_play': "Cómo Jugar",
  'how_to_play_p1': "Navega por los puzzles con los botones <b>Siguiente</b> y <b>Anterior</b> o las teclas <b>N</b> y <b>P</b>. Puedes trabajar en los puzzles en cualquier orden y volver a cualquier puzzle más tarde.",
  'how_to_play_p2': "Para rellenar un puzzle, haz clic en un número a la derecha y luego haz clic en cualquier casilla para marcar ese número con lápiz. Las reglas del Sudoku son que cada dígito 1-9 debe aparecer una vez en cada fila, columna y bloque de 3x3.",

  'keyboard_shortcuts': "Atajos de Teclado",
  'keyboard_shortcuts_p1': "También puedes usar el teclado. Apunta a una casilla o usa las teclas de flecha <b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b> para mover el rectángulo azul punteado, y luego escribe un dígito <b>1</b> - <b>9</b> para rellenarlo. Escribir múltiples números en una casilla marcará todos esos números, pero un número pulsado dos veces borrará todas las marcas y escribirá el número como respuesta. Usa la tecla <b>espacio</b> o <b>0</b> para borrar la casilla seleccionada nuevamente.",
  'keyboard_shortcuts_p2': "La tecla de coma <b>,</b> abre un menú que te permite marcar múltiples números. Con el menú mostrándose, la tecla <b>H</b> te permite resaltar en amarillo los números marcados. La tecla <b>M</b> marca automáticamente números que no están en conflicto directo en la fila, columna o bloque, y el botón <b>Marcas</b> los rellena para cada casilla.",

  'getting_hints': "Obtener Pistas",
  'getting_hints_p1': "Haz clic en un color a la izquierda para revelar casillas que tienen ese nivel de dificultad: las casillas violeta son las más fáciles y las rojas son las más difíciles. Haz clic en el botón <b>Color</b> para revelar todos los colores.",
  'getting_hints_p2': "Mantén presionado el botón <b>Pista</b> para obtener una pista específica. Las casillas rojas señalan errores. Las casillas azules serán lugares que restringen el puzzle de alguna manera, y las casillas verdes serán ubicaciones donde se puede rellenar un número o donde se pueden reducir las posibilidades.",
  'getting_hints_p3': "Si aún estás atascado, puedes intentar una pista más explícita manteniendo presionado <b>ctrl</b> mientras haces clic en el botón <b>Pista</b>. A veces las estrategias mostradas serán muy sutiles: aprende a reconocer <a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">pares desnudos</a> e <a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">intersecciones</a>, y ve si puedes encontrar los <a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">pares o triples ocultos</a> o reconocer un <a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">ala-x</a>, <a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">ala-y</a> o <a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">pez espada</a>.",

  'checking_mistakes': "Verificar y Corregir Errores",
  'checking_mistakes_p1': "El botón <b>Verificar</b> se puede usar para verificar rápidamente si has marcado con lápiz errores o casillas contradictorias sin revelar cuáles son los errores.",
  'checking_mistakes_p2': "Mantener presionado <b>ctrl</b> mientras haces clic en <b>Verificar</b> te mostrará la posición de un error.",
  'checking_mistakes_p3': "Cuando descubras un error, puedes usar el botón \"atrás\" del navegador para deshacer tantos movimientos como necesites.",

  'the_timer': "El Cronómetro",
  'the_timer_p1': "El juego llevará un registro de la cantidad de tiempo que te ha tomado resolver un puzzle. Presiona el botón <b>Cronómetro</b> para mostrar el tiempo transcurrido y el contador de pistas.",
  'the_timer_p2': "Si te alejas de un puzzle y no quieres que todo el tiempo inactivo cuente en tu contra, no te preocupes: presiona el botón \"Actualizar\" en tu navegador y el cronómetro volverá al momento en que hiciste tu último movimiento. De manera similar, si guardas un juego, el tiempo guardado será el del último movimiento realizado.",

  'saving_sharing': "Guardar y Compartir Puzzles",
  'saving_sharing_p1': "Los puzzles también se pueden guardar y cargar usando el botón <b>Archivo</b>. Los juegos guardados se identifican por calificación, fecha y progreso, o puedes renombrarlos tú mismo.",
  'saving_sharing_p2': "Si descubres una joya de juego que te gustaría compartir, el enlace <b>Guardar como Url</b> creará una URL corta para tu puzzle actual que se puede enviar por correo electrónico. Cualquier marca y color que pongas en el juego se guardará junto con la URL, para que puedas compartir un paso de sudoku particularmente inteligente con otros aficionados.",

  'entering_puzzles': "Ingresar Tus Propios Puzzles",
  'entering_puzzles_p1': "Si haces clic derecho o mantienes presionado <b>ctrl</b> mientras haces clic en una casilla, puedes cambiar el puzzle en cualquier momento. Mantener presionado <b>ctrl</b> mientras haces clic en <b>Borrar</b> borrará todo el puzzle, y puedes ingresar un nuevo puzzle usando el teclado o el ratón. Ten en cuenta que algunos números no se pueden ingresar porque la almohadilla de pistas no te permitirá ingresar un puzzle que no tiene solución.",
  'entering_puzzles_p2': "Tan pronto como hayas ingresado un puzzle con una solución única, se mostrará una calificación de dificultad y el teclado volverá al modo de juego.",

  'minimal_puzzles': "Puzzles Matemáticamente Mínimos",
  'minimal_puzzles_p1': "Usualmente los puzzles encontrados en el Sudoku Infinito de Heidi tendrán 25-30 pistas. Naturalmente, si hay menos pistas, disfrutarás de un juego un poco más largo.",
  'minimal_puzzles_p2': "Se cree que el número más pequeño de pistas que se pueden dar en un juego de Sudoku resoluble es 17, y Gordon Royle mantiene una base de datos de todos los puzzles de 17 pistas que se han descubierto hasta ahora. Si mantienes presionado <b>ctrl</b> mientras haces clic en <b>Archivo</b>, se cargará uno de estos puzzles de 17 pistas desde Internet.",

  'difficulty_ratings': "Calificaciones de Dificultad",
  'difficulty_ratings_p1': "Los puzzles de Sudoku se califican en una escala de 24 niveles desde \"Principiante\" (el más fácil) hasta \"Confuso\" (el más difícil). La escala completa:",
  'difficulty_ratings_p2': "Los puzzles que se pueden resolver simplemente evitando conflictos directos son \"Básico\" o más fáciles, dependiendo de qué tan fácil sea ver las restricciones. Los puzzles \"Sutiles\" requieren una o dos deducciones inteligentes. Y se vuelve más difícil a partir de ahí: los puzzles \"Confusos\" implican desenredar una masa de pistas complejas.",

  'credits': "Créditos",
  'credits_content': "La Almohadilla de Heidi fue escrita en HTML y Javascript por el esposo de Heidi <a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a> usando <a target=_blank href=\"http://ejohn.org/\">jQuery de John Resig</a> con el útil <a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">plugin BBQ</a> de <a target=_blank href=\"http://benalman.com/\">Ben Alman</a> (como <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">bifurcado</a> por <a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a>). La maravillosa fuente <a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a> de <a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince</a> proporciona dígitos manuscritos y se usa <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a> de <a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson</a> para los numerales del puzzle. <a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a> proporcionó el ícono de resaltador amarillo; y la matemáticamente hermosa <a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">Colección Mínima de Sudoku</a> de <a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle</a> proporciona puzzles mínimos de 17 pistas cuando mantienes presionado <b>ctrl</b> mientras haces clic en <b>Archivo</b>.",
  'sources_notice': "Las fuentes de la Almohadilla de Sudoku de Heidi no están licenciadas para reutilización en este momento, pero están disponibles para leer <a target=_blank href=\"https://github.com/davidbau/heidisudoku\">aquí en Github</a>.",
  'version': "Versión 0.67",

  // Color labels
  'easiest': 'Más fácil',
  'hardest': 'Más difícil',

  // Difficulty levels
  levels: [
    "Irresoluble",
    "Principiante",
    "Fácil",
    "Simple",
    "Básico",
    "Moderado",
    "Complicado",
    "Astuto",
    "Desconcertante",
    "Sutil",
    "Difícil",
    "Enredado",
    "Espinoso",
    "Desconcertante",
    "Intrincado",
    "Perplejo",
    "Oscuro",
    "Laberíntico",
    "Obstinado",
    "Abstruso",
    "Irritante",
    "Enigmático",
    "Formidable",
    "Diabólico",
    "Confuso",
    "Imposible"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['justo ahora'],
      ['hace', Math.round(ms / 1000), 'segundos'],
      ['hace', Math.round(ms / 60 / 1000), 'minutos'],
      ['hace', Math.round(ms / 60 / 60 / 1000), 'horas'],
      ['hace', Math.round(ms / 24 / 60 / 60 / 1000), 'días'],
      ['hace', Math.round(ms / 7 / 24 / 60 / 60 / 1000), 'semanas'],
      ['hace', Math.round(ms / 30 / 24 / 60 / 60 / 1000), 'meses'],
      ['hace', Math.round(ms / 365 / 24 / 60 / 60 / 1000), 'años']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join(' ');
  }
});
