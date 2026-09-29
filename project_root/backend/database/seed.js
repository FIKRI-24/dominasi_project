require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const db = require('../src/config/database');

const packages = [
  {
    slug: 'dasar-graph-matrix',
    title: 'Dasar Graph Matrix',
    icon: '📊',
    difficulty: 'Beginner',
    description: 'Pelajari cara merepresentasikan jaringan menggunakan baris dan kolom matriks.',
    questions: [
      { question_text: 'Dalam adjacency matrix, apa arti dari nilai 1 pada posisi (i,j)?', options: ['Tidak ada edge antara vertex i dan j', 'Ada edge antara vertex i dan j', 'Vertex i dan j adalah vertex yang sama', 'Terdapat loop pada vertex i'], correct_index: 1, explanation: 'Nilai 1 pada posisi (i,j) dalam adjacency matrix melambangkan adanya keterhubungan langsung (sisi/edge) antara titik i dan titik j.' },
      { question_text: 'Berapa jumlah edge dalam graf jika adjacency matrix berukuran 4×4 memiliki 6 nilai 1?', options: ['6', '3', '12', 'Tidak dapat ditentukan'], correct_index: 1, explanation: 'Untuk graf sederhana tak berarah, setiap edge dihitung 2 kali (simetris di atas dan bawah diagonal utama) dalam adjacency matrix, sehingga 6/2 = 3 edge.' },
      { question_text: 'Adjacency matrix untuk graf tak berarah memiliki sifat:', options: ['Asimetris', 'Simetris', 'Diagonal utama selalu 0', 'B dan C benar'], correct_index: 3, explanation: 'Pada graf tak berarah, matriks ketetanggaan selalu simetris (A = A^T), dan jika tidak memiliki loop, diagonal utamanya bernilai 0.' },
      { question_text: 'Jika graf tak berarah memiliki adjacency matrix dengan trace = 2 (menggunakan konvensi derajat di mana tiap loop bernilai 2 pada diagonal), berapa jumlah loop pada graf tersebut?', options: ['2', '1', '5', '0'], correct_index: 1, explanation: 'Trace adalah jumlahan elemen pada diagonal utama. Berdasarkan konvensi derajat pada graf tak berarah, setiap loop menyumbang nilai 2 pada diagonal utama agar jumlahan baris sama dengan derajat simpul. Dengan trace = 2, terdapat 2/2 = 1 loop.' },
      { question_text: 'Incidence matrix memiliki dimensi:', options: ['n × n (n = jumlah vertex)', 'm × m (m = jumlah edge)', 'n × m (n = vertex, m = edge)', 'Selalu square matrix'], correct_index: 2, explanation: 'Incidence matrix menghubungkan simpul dengan sisi, sehingga dimensinya adalah jumlah simpul (n) × jumlah sisi (m).' },
      { question_text: 'Dalam incidence matrix, jumlah nilai 1 pada setiap kolom adalah:', options: ['1', '2', 'Tergantung degree vertex', 'Tidak tetap'], correct_index: 1, explanation: 'Setiap kolom melambangkan satu edge, dan setiap edge selalu menghubungkan tepat 2 titik ujung (kecuali loop), sehingga kolom selalu berisi tepat dua nilai 1.' },
      { question_text: 'Path matrix P^k menunjukkan:', options: ['Jumlah path dengan panjang tepat k', 'Jumlah path dengan panjang maksimal k', 'Shortest path antara dua vertex', 'Semua path yang mungkin'], correct_index: 0, explanation: 'Perkalian matriks ketetanggaan A^k memberikan jumlah jalur (walk/path) dengan panjang tepat k langkah antar simpul.' },
      { question_text: 'Jika A adalah adjacency matrix, maka A² memberikan informasi tentang:', options: ['Path dengan panjang 1', 'Path dengan panjang 2', 'Jumlah total path', 'Degree setiap vertex'], correct_index: 1, explanation: 'Sesuai teori eksponen matriks ketetanggaan, nilai pada matriks A² menunjukkan jumlah lintasan (walk) dengan panjang tepat 2 langkah.' },
      { question_text: 'Degree matrix D memiliki nilai non-zero hanya pada:', options: ['Diagonal utama', 'Baris pertama', 'Kolom pertama', 'Semua posisi'], correct_index: 0, explanation: 'Degree matrix adalah matriks diagonal di mana nilai derajat setiap titik hanya diletakkan pada diagonal utama (d_ii = deg(v_i)).' },
      { question_text: 'Laplacian matrix L dihitung dengan rumus:', options: ['L = A + D', 'L = D - A', 'L = A - D', 'L = D × A'], correct_index: 1, explanation: 'Laplacian matrix L didefinisikan secara akademis dengan mengurangkan matriks ketetanggaan dari matriks derajat: L = D - A.' }
    ]
  },
  {
    slug: 'aplikasi-graph-matrix',
    title: 'Aplikasi Graph Matrix',
    icon: '🔬',
    difficulty: 'Intermediate',
    description: 'Analisis karakteristik spektral dan sifat jaringan menggunakan komputasi matriks.',
    questions: [
      { question_text: 'Untuk menentukan apakah graf terhubung, kita dapat menggunakan:', options: ['Adjacency matrix saja', 'Powers of adjacency matrix', 'Incidence matrix saja', 'Degree matrix saja'], correct_index: 1, explanation: 'Dengan menjumlahkan perpangkatan matriks ketetanggaan dari A^0 hingga A^(n-1), kita mendapatkan matriks keterjangkauan untuk melihat konektivitas graf.' },
      { question_text: 'Eigenvalue terbesar dari adjacency matrix disebut:', options: ['Spectral radius', 'Chromatic number', 'Independence number', 'Domination number'], correct_index: 0, explanation: 'Nilai eigen (eigenvalue) terbesar dari suatu matriks ketetanggaan graf disebut sebagai radius spektral (spectral radius).' },
      { question_text: 'Jika adjacency matrix A memiliki rank r, maka jumlah komponen terhubung tak terisolasi (memiliki sisi) pada graf tersebut maksimal:', options: ['r vertex', 'r edge', 'r komponen terhubung', 'Tidak ada hubungan'], correct_index: 2, explanation: 'Setiap komponen terhubung yang memiliki sisi menyumbang rank minimal 2 pada adjacency matrix (rank(A) >= 2c). Maka, jumlah komponen terhubung tak terisolasi dibatasi maksimal sebanyak r (bahkan secara ketat maksimal r/2) komponen.' },
      { question_text: 'Untuk graf bipartit, adjacency matrix dapat ditulis dalam bentuk:', options: ['Block diagonal', 'Upper triangular', '[[0, B], [B^T, 0]]', 'Lower triangular'], correct_index: 2, explanation: 'Graf bipartit membagi simpul menjadi dua himpunan independen, sehingga relasi ketetanggaannya hanya ada antar himpunan yang membentuk struktur matriks blok [[0, B], [B^T, 0]].' },
      { question_text: 'Jumlah triangles dalam graf dapat dihitung dengan:', options: ['trace(A)', 'trace(A²)', 'trace(A³)/6', 'trace(A³)/3'], correct_index: 2, explanation: 'trace(A³) menghitung lintasan tertutup sepanjang 3 langkah. Karena setiap segitiga memiliki 3 titik dan dapat dilalui dalam 2 arah berbeda, jumlah segitiga sebenarnya adalah trace(A³)/6.' },
      { question_text: 'Multiplicity eigenvalue 0 pada Laplacian matrix menunjukkan:', options: ['Jumlah vertex', 'Jumlah edge', 'Jumlah komponen terhubung', 'Chromatic number'], correct_index: 2, explanation: 'Multiplisitas aljabar dari eigenvalue 0 pada matriks Laplacian selalu sama dengan jumlah komponen terhubung (connected components) di dalam graf.' },
      { question_text: 'Adjacency matrix graf regular memiliki ciri:', options: ['Semua baris memiliki jumlah yang sama', 'Simetris', 'Eigenvalue terbesar = degree', 'Semua benar'], correct_index: 3, explanation: 'Graf regular memiliki derajat simpul yang sama (k), sehingga baris bermatriks berjumlah k, matriks tetap simetris, dan radius spektralnya tepat sama dengan k.' },
      { question_text: 'Untuk graf dengan n vertex, adjacency matrix berukuran n×n memiliki maksimal berapa nilai 1?', options: ['n', 'n²', 'n(n-1)', 'n(n-1)/2'], correct_index: 2, explanation: 'Untuk graf berarah sederhana tanpa loop, kapasitas maksimal nilai 1 adalah n(n-1) (tidak ada nilai 1 di diagonal utama).' },
      { question_text: 'Permanent dari adjacency matrix berkaitan dengan:', options: ['Jumlah perfect matchings', 'Jumlah Hamiltonian cycles', 'Jumlah spanning trees', 'Chromatic polynomial'], correct_index: 0, explanation: 'Secara aljabar, nilai permanen dari adjacency matrix graf bipartit mengukur jumlah pencocokan sempurna (perfect matchings).' },
      { question_text: 'Matrix-tree theorem menggunakan:', options: ['Adjacency matrix', 'Incidence matrix', 'Laplacian matrix', 'Degree matrix'], correct_index: 2, explanation: 'Matrix-Tree Theorem menyatakan bahwa jumlah spanning tree dalam graf sama dengan kofaktor manapun dari matriks Laplacian (L).' }
    ]
  },
  {
    slug: 'dasar-bilangan-dominasi',
    title: 'Dasar Bilangan Dominasi',
    icon: '🎯',
    difficulty: 'Intermediate',
    description: 'Pahami konsep set dominasi minimum dan penempatan sensor optimal di graf.',
    questions: [
      { question_text: 'Bilangan dominasi γ(G) didefinisikan sebagai:', options: ['Ukuran minimum dominating set', 'Ukuran maksimum dominating set', 'Jumlah semua dominating set', 'Degree maksimum dalam graf'], correct_index: 0, explanation: 'Bilangan dominasi γ(G) adalah kardinalitas atau ukuran paling sedikit (minimum) dari suatu himpunan dominasi di graf G.' },
      { question_text: 'Suatu himpunan S ⊆ V(G) disebut dominating set jika:', options: ['Setiap vertex dalam S bertetangga', 'Setiap vertex di luar S bertetangga dengan minimal satu vertex di S', 'S membentuk clique', 'S adalah independent set'], correct_index: 1, explanation: 'Definisi formal dominating set adalah setiap simpul di luar himpunan tersebut harus terhubung langsung (bertetangga) dengan setidaknya satu simpul di dalam himpunan.' },
      { question_text: 'Untuk graf path P_n, bilangan dominasi γ(P_n) = :', options: ['⌊n/2⌋', '⌈n/2⌉', '⌊n/3⌋', '⌈n/3⌉'], correct_index: 3, explanation: 'Untuk graf lintasan, penempatan sensor paling optimal adalah setiap 3 langkah sekali, menghasilkan nilai batas atas: ⌈n/3⌉.' },
      { question_text: 'Bilangan dominasi untuk graf complete K_n adalah:', options: ['1', '2', 'n-1', 'n'], correct_index: 0, explanation: 'Dalam graf lengkap K_n, semua simpul terhubung langsung dengan simpul lainnya, sehingga cukup memilih 1 simpul manapun untuk mendominasi seluruh graf.' },
      { question_text: 'Untuk graf cycle C_n, γ(C_n) = :', options: ['⌊n/2⌋', '⌈n/2⌉', '⌊n/3⌋', '⌈n/3⌉'], correct_index: 3, explanation: 'Sama seperti lintasan, simpul pada graf siklus melingkar dapat didominasi secara optimal oleh 1 sensor untuk setiap 3 simpul, menghasilkan ⌈n/3⌉.' },
      { question_text: 'Minimal dominating set yang juga merupakan independent set disebut:', options: ['Perfect dominating set', 'Independent dominating set', 'Connected dominating set', 'Total dominating set'], correct_index: 1, explanation: 'Sesuai namanya, jika simpul-simpul di dalam himpunan dominasi tidak saling bertetangga satu sama lain, maka disebut independent dominating set.' },
      { question_text: 'Total dominating set mensyaratkan bahwa:', options: ['Setiap vertex hanya mendominasi dirinya sendiri', 'Setiap vertex (termasuk anggota set) wajib memiliki tetangga di dalam set', 'Himpunan dominasi terhubung', 'Himpunan dominasi maksimal'], correct_index: 1, explanation: 'Dalam total domination (open neighborhood domination), setiap simpul di graf—termasuk simpul di dalam himpunan dominasi itu sendiri—wajib memiliki tetangga di dalam himpunan tersebut, sehingga tidak ada simpul terisolasi di dalam subgraf himpunan dominasi.' },
      { question_text: 'Untuk graf star S_n (n ≥ 2), γ(S_n) = :', options: ['1', '2', 'n-1', 'n'], correct_index: 0, explanation: 'Graf bintang memiliki 1 pusat yang bertetangga dengan seluruh simpul lainnya. Cukup tempatkan 1 sensor di pusat maka seluruh jaringan terdominasi.' },
      { question_text: 'Connected dominating set adalah dominating set yang:', options: ['Berisi semua vertex dengan degree maksimum', 'Membentuk subgraf terhubung', 'Tidak memiliki dua vertex bertetangga', 'Memiliki ukuran minimal'], correct_index: 1, explanation: 'Himpunan dominasi terhubung mewajibkan subgraf yang diinduksi oleh simpul-simpul dominasi tersebut membentuk graf yang saling terhubung (tidak terputus).' },
      { question_text: 'Hubungan antara bilangan dominasi γ(G) dan independence number α(G):', options: ['γ(G) = α(G)', 'γ(G) ≤ α(G)', 'γ(G) ≥ α(G)', 'Tidak ada hubungan pasti'], correct_index: 1, explanation: 'Secara teoretis, ukuran himpunan dominasi independen minimum γ(G) selalu kurang dari atau sama dengan ukuran himpunan independen maksimum α(G).' }
    ]
  },
  {
    slug: 'aplikasi-variasi-dominasi',
    title: 'Aplikasi & Variasi Dominasi',
    icon: '🚀',
    difficulty: 'Advanced',
    description: 'Kuasai variasi lanjut seperti Domatic Number, Roman Domination, dan kompleksitas algoritma.',
    questions: [
      { question_text: 'k-dominating set adalah himpunan vertex dimana setiap vertex di luar himpunan bertetangga dengan minimal:', options: ['1 vertex dalam himpunan', 'k vertex dalam himpunan', 'k vertex di luar himpunan', 'degree k'], correct_index: 1, explanation: 'Pada k-domination, setiap simpul di luar himpunan dominasi wajib memiliki minimal k buah tetangga yang berada di dalam himpunan dominasi.' },
      { question_text: 'Domatic number d(G) adalah:', options: ['Ukuran minimum dominating set', 'Maksimum jumlah disjoint dominating sets', 'Jumlah total dominating sets', 'Rata-rata ukuran dominating sets'], correct_index: 1, explanation: 'Domatic number d(G) didefinisikan sebagai jumlah maksimal partisi himpunan dominasi yang saling lepas (disjoint) yang dapat dibentuk di graf G.' },
      { question_text: 'Untuk graf dengan minimum degree δ, domatic number memenuhi:', options: ['d(G) ≤ δ', 'd(G) ≤ δ + 1', 'd(G) = δ + 1', 'd(G) ≥ δ + 1'], correct_index: 1, explanation: 'Secara matematis, batas atas dari domatic number dari graf G tidak akan pernah melebihi derajat minimum (δ) ditambah satu: d(G) ≤ δ + 1.' },
      { question_text: 'Domination number untuk graf bipartit lengkap K_{m,n} adalah:', options: ['1', '2', 'min(m,n)', 'max(m,n)'], correct_index: 1, explanation: 'Karena tidak ada sisi internal dalam partisi yang sama, kita harus memilih 1 simpul dari partisi kiri dan 1 simpul dari partisi kanan untuk mendominasi seluruh simpul lawan. Jadi γ = 2.' },
      { question_text: 'Locating-dominating set memiliki properti tambahan:', options: ['Setiap vertex memiliki neighbor unik dalam set', 'Set membentuk clique', 'Set terhubung', 'Set independent'], correct_index: 0, explanation: 'Locating-dominating set mengharuskan setiap simpul di luar himpunan memiliki himpunan tetangga patokan yang unik di dalam set dominasi tersebut.' },
      { question_text: 'Untuk graf grid m×n, estimasi bilangan dominasi adalah sekitar:', options: ['mn/5', 'mn/4', 'mn/3', 'mn/2'], correct_index: 0, explanation: 'Pada graf grid dua dimensi, sebuah simpul di tengah mendominasi dirinya sendiri ditambah 4 tetangganya (total 5 simpul). Maka efisiensi kasarnya sekitar mn/5.' },
      { question_text: 'Restrained dominating set memiliki syarat bahwa:', options: ['Set berukuran minimal', 'Komplemen set juga dominating', 'Setiap vertex di luar set memiliki neighbor di luar set', 'Set membentuk matching'], correct_index: 2, explanation: 'Restrained domination mengharuskan subgraf yang dibentuk oleh simpul-simpul di luar set dominasi tidak memiliki simpul terisolasi (setiap simpul luar punya tetangga simpul luar).' },
      { question_text: 'Untuk graf wheel W_n (n ≥ 3), γ(W_n) = :', options: ['1', '2', 'Refaktor rim', 'n/3'], correct_index: 0, explanation: 'Sama seperti graf bintang, graf roda memiliki poros pusat (hub) yang terhubung langsung dengan semua simpul rim. Cukup taruh 1 sensor di pusat untuk mendominasi.' },
      { question_text: 'Roman dominating function f: V → {0,1,2} dengan syarat vertex bernilai 0 bertetangga dengan vertex bernilai:', options: ['1', '2', '1 atau 2', 'Minimal 2 vertex bernilai 1'], correct_index: 1, explanation: 'Roman domination mengamanatkan bahwa setiap simpul dengan bobot 0 (tidak ada legiun) wajib bertetangga dengan minimal satu simpul berbobot 2 (memiliki legiun cadangan).' },
      { question_text: 'Kompleksitas komputasi untuk menentukan bilangan dominasi adalah:', options: ['P (polynomial time)', 'NP-complete', 'PSPACE-complete', 'Undecidable'], correct_index: 1, explanation: 'Menemukan ukuran minimum dominating set adalah salah satu masalah klasik yang tergolong dalam kelas NP-complete (sulit diselesaikan secara efisien untuk ukuran besar).' }
    ]
  }
];

const insertPackage = db.prepare(`
  INSERT OR IGNORE INTO packages (slug, title, icon, difficulty, description)
  VALUES (@slug, @title, @icon, @difficulty, @description)
`);

const insertQuestion = db.prepare(`
  INSERT INTO questions (package_id, question_text, has_diagram, graph_data, options, correct_index, explanation, order_index)
  VALUES (@package_id, @question_text, 0, NULL, @options, @correct_index, @explanation, @order_index)
`);

const seedAll = db.transaction(() => {
  // Clear existing data
  db.exec('DELETE FROM questions');
  db.exec('DELETE FROM packages');
  db.exec('DELETE FROM sqlite_sequence WHERE name=\'packages\' OR name=\'questions\'');

  for (const pkg of packages) {
    insertPackage.run({
      slug: pkg.slug,
      title: pkg.title,
      icon: pkg.icon,
      difficulty: pkg.difficulty,
      description: pkg.description
    });

    const pkgRow = db.prepare('SELECT id FROM packages WHERE slug = ?').get(pkg.slug);
    const packageId = pkgRow.id;

    pkg.questions.forEach((q, idx) => {
      insertQuestion.run({
        package_id: packageId,
        question_text: q.question_text,
        options: JSON.stringify(q.options),
        correct_index: q.correct_index,
        explanation: q.explanation,
        order_index: idx
      });
    });
  }
});

try {
  seedAll();
  const pkgCount = db.prepare('SELECT COUNT(*) as count FROM packages').get();
  const qCount = db.prepare('SELECT COUNT(*) as count FROM questions').get();
  console.log(`✅ Seed berhasil! ${pkgCount.count} paket dan ${qCount.count} soal dimasukkan ke database.`);
} catch (err) {
  console.error('❌ Seed gagal:', err.message);
  process.exit(1);
}
