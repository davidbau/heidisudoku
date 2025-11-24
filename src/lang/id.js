// Indonesian translations for Heidi's Infinite Sudoku

I18n.register('id', {
  // Page titles
  'title': "Sudoku Tak Terbatas Heidi",
  'about_title': "Tentang Sudoku Tak Terbatas Heidi",

  // Main UI
  'time_label': "Waktu",
  'finished_in': "Selesai dalam",
  'hints_label': "Petunjuk",

  // Buttons
  'color_button': "Warna",
  'color_button_title': "Tampilkan warna. Ctrl untuk menghapus warna.",
  'file_button': "Berkas",
  'file_button_title': "Muat atau simpan. Ctrl untuk memuat Sudoku 17-petunjuk.",
  'clear_button': "Hapus",
  'clear_button_title': "Setel ulang teka-teki. Ctrl untuk teka-teki kosong.",
  'check_button': "Periksa",
  'check_button_title': "Periksa kesalahan. Ctrl untuk menampilkan kesalahan.",
  'prev_button': "« Sblm",
  'prev_button_title': "Teka-teki sebelumnya. Ctrl untuk mundur 10.",
  'next_button': "Brkt »",
  'next_button_title': "Teka-teki berikutnya. Ctrl untuk maju 10.",
  'hint_button': "Hint",
  'hint_button_title': "Tampilkan petunjuk. Ctrl untuk petunjuk eksplisit.",
  'marks_button': "Tanda",
  'marks_button_title': "Tanda pensil otomatis. Ctrl untuk menghapus tanda.",
  'timer_button': "Timer",
  'timer_button_title': "Tampilkan pengatur waktu. Ctrl untuk mengungkapkan solusi.",

  // Popups
  'victory': "Anda Menang!",
  'ok': "oke sejauh ini",
  'errors': "kesalahan",
  'nohint': "tidak ada petunjuk",

  // File dialog
  'saved_games': "Permainan Tersimpan",
  'save_current': "Simpan Permainan Saat Ini",
  'save_copy': "Simpan Salinan Baru",
  'save_as_url': "simpan sebagai url",
  'select_all': "Pilih Semua",
  'delete_selected': "Hapus yang Dipilih",
  'load_selected': "Muat yang Dipilih",
  'saved_game_default': "Permainan Tersimpan",

  // About page link
  'about_link': "Tentang permainan ini",

  // About page content
  'back_to_game': "Kembali ke permainan",
  'how_to_play': "Cara Bermain",
  'how_to_play_p1': "Jelajahi teka-teki dengan tombol <b>Berikutnya</b> dan <b>Sebelumnya</b> atau tombol <b>N</b> dan <b>P</b>. Anda dapat mengerjakan teka-teki dalam urutan apa pun dan kembali ke teka-teki apa pun nanti.",
  'how_to_play_p2': "Untuk mengisi teka-teki, klik angka di sebelah kanan lalu klik kotak mana pun untuk menandai angka itu dengan pensil. Aturan Sudoku adalah bahwa setiap digit 1-9 harus muncul sekali di setiap baris, kolom, dan blok 3x3.",

  'keyboard_shortcuts': "Pintasan Keyboard",
  'keyboard_shortcuts_p1': "Anda juga dapat menggunakan keyboard. Arahkan ke kotak atau gunakan tombol panah <b>&larr;</b> <b>&uarr;</b> <b>&darr;</b> <b>&rarr;</b> untuk memindahkan persegi panjang biru putus-putus, lalu ketik digit <b>1</b> - <b>9</b> untuk mengisinya. Mengetik beberapa angka di kotak akan menandai semua angka tersebut, tetapi angka yang diketuk dua kali akan menghapus semua tanda dan menulis angka sebagai jawaban. Gunakan tombol <b>spasi</b> atau <b>0</b> untuk menghapus kotak yang dipilih lagi.",
  'keyboard_shortcuts_p2': "Tombol koma <b>,</b> membuka menu yang memungkinkan Anda menandai beberapa angka. Dengan menu yang ditampilkan, tombol <b>H</b> memungkinkan Anda menyorot angka yang ditandai dengan warna kuning. Tombol <b>M</b> secara otomatis menandai angka yang tidak dalam konflik langsung di baris, kolom, atau blok, dan tombol <b>Tanda</b> mengisi ini untuk setiap kotak.",

  'getting_hints': "Mendapatkan Petunjuk",
  'getting_hints_p1': "Klik warna di sebelah kiri untuk mengungkapkan kotak yang berada di tingkat kesulitan itu: kotak ungu adalah yang termudah, dan kotak merah adalah yang tersulit. Klik tombol <b>Warna</b> untuk mengungkapkan semua warna.",
  'getting_hints_p2': "Tahan tombol <b>Petunjuk</b> untuk mendapatkan petunjuk spesifik. Kotak merah menunjukkan kesalahan apa pun. Kotak biru akan menjadi tempat yang membatasi teka-teki dengan cara tertentu, dan kotak hijau akan menjadi lokasi di mana angka dapat diisi, atau di mana kemungkinan dapat dipersempit.",
  'getting_hints_p3': "Jika Anda masih terjebak, Anda dapat mencoba petunjuk yang lebih eksplisit dengan menahan <b>ctrl</b> sambil mengklik tombol <b>Petunjuk</b>. Terkadang strategi yang ditunjukkan akan sangat halus: pelajari untuk mengenali <a target=_blank href=\"http://www.sudokuwiki.org/Naked_Candidates\">pasangan telanjang</a> dan <a target=_blank href=\"http://www.sudokuwiki.org/Intersection_Removal\">persimpangan</a>, dan lihat apakah Anda dapat menemukan <a target=_blank href=\"http://www.sudokuwiki.org/Hidden_Candidates\">pasangan atau tripel tersembunyi</a> atau mengenali <a target=_blank href=\"http://www.sudokuwiki.org/X_Wing_Strategy\">x-wing</a>, <a target=_blank href=\"http://www.sudokuwiki.org/Y_Wing_Strategy\">y-wing</a> atau <a target=_blank href=\"http://www.sudokuwiki.org/Sword_Fish_Strategy\">swordfish</a>.",

  'checking_mistakes': "Memeriksa dan Memperbaiki Kesalahan",
  'checking_mistakes_p1': "Tombol <b>Periksa</b> dapat digunakan untuk memeriksa dengan cepat apakah Anda telah menandai dengan pensil kesalahan atau kotak yang bertentangan tanpa mengungkapkan apa kesalahannya.",
  'checking_mistakes_p2': "Menahan <b>ctrl</b> sambil mengklik <b>Periksa</b> akan menunjukkan posisi kesalahan.",
  'checking_mistakes_p3': "Ketika Anda menemukan kesalahan, Anda dapat menggunakan tombol \"kembali\" browser untuk membatalkan sebanyak mungkin gerakan yang Anda perlukan.",

  'the_timer': "Pengatur Waktu",
  'the_timer_p1': "Permainan akan melacak jumlah waktu yang Anda butuhkan untuk menyelesaikan teka-teki. Tekan tombol <b>Pengatur Waktu</b> untuk menampilkan waktu yang telah berlalu dan penghitung petunjuk.",
  'the_timer_p2': "Jika Anda menjauh dari teka-teki dan tidak ingin semua waktu diam dihitung terhadap Anda, jangan khawatir: tekan tombol \"Segarkan\" di browser Anda dan pengatur waktu akan kembali ke waktu Anda membuat gerakan terakhir. Demikian pula, jika Anda menyimpan permainan, waktu yang disimpan akan menjadi waktu gerakan terakhir yang dibuat.",

  'saving_sharing': "Menyimpan dan Berbagi Teka-teki",
  'saving_sharing_p1': "Teka-teki juga dapat disimpan dan dimuat menggunakan tombol <b>Berkas</b>. Permainan yang disimpan diidentifikasi berdasarkan peringkat, tanggal, dan kemajuan, atau Anda dapat mengganti namanya sendiri.",
  'saving_sharing_p2': "Jika Anda menemukan permata permainan yang ingin Anda bagikan, tautan <b>Simpan sebagai Url</b> akan membuat URL pendek untuk teka-teki Anda saat ini yang dapat dikirim melalui email. Setiap tanda dan warna yang Anda letakkan pada permainan akan disimpan bersama dengan URL, sehingga Anda dapat berbagi langkah sudoku yang sangat cerdas dengan penggemar lainnya.",

  'entering_puzzles': "Memasukkan Teka-teki Anda Sendiri",
  'entering_puzzles_p1': "Jika Anda mengklik kanan atau menahan <b>ctrl</b> sambil mengklik kotak, Anda dapat mengubah teka-teki kapan saja. Menahan <b>ctrl</b> sambil mengklik <b>Hapus</b> akan menghapus seluruh teka-teki, dan Anda dapat memasukkan teka-teki baru menggunakan keyboard atau mouse. Perhatikan bahwa beberapa angka tidak dapat dimasukkan karena pad petunjuk tidak akan membiarkan Anda memasukkan teka-teki yang tidak memiliki solusi.",
  'entering_puzzles_p2': "Segera setelah Anda memasukkan teka-teki dengan solusi unik, peringkat kesulitan akan ditampilkan dan keyboard akan beralih kembali ke mode permainan.",

  'minimal_puzzles': "Teka-teki Matematis Minimal",
  'minimal_puzzles_p1': "Biasanya teka-teki yang ditemukan di Sudoku Tak Terbatas Heidi akan memiliki 25-30 petunjuk. Tentu saja, jika ada lebih sedikit petunjuk, Anda akan menikmati permainan yang sedikit lebih lama.",
  'minimal_puzzles_p2': "Jumlah petunjuk terkecil yang dapat diberikan pada permainan Sudoku yang dapat dipecahkan diyakini adalah 17, dan Gordon Royle memelihara database semua teka-teki 17-petunjuk yang telah ditemukan sejauh ini. Jika Anda menahan <b>ctrl</b> sambil mengklik <b>Berkas</b>, salah satu teka-teki 17-petunjuk ini akan dimuat dari internet.",

  'difficulty_ratings': "Peringkat Kesulitan",
  'difficulty_ratings_p1': "Teka-teki Sudoku dinilai pada skala 24 tingkat dari \"Pemula\" (termudah) hingga \"Membingungkan\" (tersulit). Skala lengkap:",
  'difficulty_ratings_p2': "Teka-teki yang dapat dipecahkan hanya dengan menghindari konflik langsung adalah \"Dasar\" atau lebih mudah, tergantung pada seberapa mudah melihat kendala. Teka-teki \"Halus\" memerlukan satu atau dua deduksi yang cerdas. Dan menjadi lebih sulit dari sana: teka-teki \"Membingungkan\" melibatkan menguraikan massa petunjuk yang kompleks.",

  'credits': "Kredit",
  'credits_content': "Pad Heidi ditulis dalam HTML dan Javascript oleh suami Heidi <a target=_blank href=\"http://davidbau.com/about/david_bau.html\">David Bau</a> menggunakan <a target=_blank href=\"http://jquery.com/\">jQuery</a> <a target=_blank href=\"http://ejohn.org/\">John Resig</a> dengan <a href=\"http://benalman.com/projects/jquery-bbq-plugin/\">plugin BBQ</a> praktis <a target=_blank href=\"http://benalman.com/\">Ben Alman</a> (sebagaimana <a target=_blank href=\"https://raw.githubusercontent.com/hswong3i/jquery-bbq/master/jquery.ba-bbq.js\">bercabang</a> oleh <a target=_blank href=\"http://hswong3i.net/\">Edison Wong</a>). Font <a target=_blank href=\"https://www.google.com/fonts/specimen/Handlee\">Handlee</a> yang indah dari <a target=_blank href=\"https://dribbble.com/JoePrince\">Joe Prince</a> menyediakan digit tulisan tangan dan <a target=_blank href=\"https://www.google.com/fonts/specimen/Open+Sans\">Open Sans</a> <a target=_blank href=\"http://www.monotypeimaging.com/ProductsServices/TypeDesignerShowcase/SteveMatteson/\">Steve Matteson</a> digunakan untuk angka teka-teki. <a target=_blank href=\"http://www.deleket.com/\">Jojo Mendoza</a> menyediakan ikon penanda kuning; dan <a href=\"http://school.maths.uwa.edu.au/~gordon/sudokumin.php\">Koleksi Sudoku Minimal</a> yang indah secara matematis dari <a target=_blank href=\"http://en.wikipedia.org/wiki/Gordon_Royle\">Gordon Royle</a> menyediakan teka-teki 17-petunjuk minimal ketika Anda menahan <b>ctrl</b> sambil mengklik <b>Berkas</b>.",
  'sources_notice': "Sumber untuk Pad Sudoku Heidi tidak dilisensikan untuk digunakan kembali saat ini, tetapi tersedia untuk dibaca <a target=_blank href=\"https://github.com/davidbau/heidisudoku\">di sini di Github</a>.",
  'version': "Versi 0.67",

  // Color labels
  'easiest': 'Termudah',
  'hardest': 'Tersulit',

  // Difficulty levels
  levels: [
    "Tidak Dapat Dipecahkan",
    "Pemula",
    "Mudah",
    "Sederhana",
    "Dasar",
    "Moderat",
    "Rumit",
    "Cerdas",
    "Membingungkan",
    "Halus",
    "Sulit",
    "Rumit",
    "Berduri",
    "Membingungkan",
    "Rumit",
    "Membingungkan",
    "Kabur",
    "Labirin",
    "Keras Kepala",
    "Abstrak",
    "Menjengkelkan",
    "Enigmatik",
    "Tangguh",
    "Setan",
    "Membingungkan",
    "Mustahil"
  ],

  // Time ago function
  timeago: function(ms) {
    var messages = [
      ['baru saja'],
      ['', Math.round(ms / 1000), 'detik yang lalu'],
      ['', Math.round(ms / 60 / 1000), 'menit yang lalu'],
      ['', Math.round(ms / 60 / 60 / 1000), 'jam yang lalu'],
      ['', Math.round(ms / 24 / 60 / 60 / 1000), 'hari yang lalu'],
      ['', Math.round(ms / 7 / 24 / 60 / 60 / 1000), 'minggu yang lalu'],
      ['', Math.round(ms / 30 / 24 / 60 / 60 / 1000), 'bulan yang lalu'],
      ['', Math.round(ms / 365 / 24 / 60 / 60 / 1000), 'tahun yang lalu']
    ];
    for (var j = 1; j < messages.length && messages[j][1] > 2; j++) { }
    return messages[j - 1].join(' ');
  }
});
