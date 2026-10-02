const db = require('../src/config/database');

const newPackage = {
  slug: 'dimensi-metrik-dan-pembeda',
  title: 'Dimensi Metrik & Himpunan Pembeda',
  category: 'Dimensi Metrik & Sensor Lokasi',
  icon: '🎯',
  difficulty: 'Intermediate',
  target_questions: 10,
  description: 'Uji penalaran himpunan pembeda (resolving set), representasi vektor jarak metrik r(v|W), dan bilangan dominasi-lokasi pada graf standar.'
};

const questions = [
  {
    question_text: 'Suatu himpunan bagian simpul W ⊆ V(G) disebut sebagai himpunan pembeda (resolving set) dari graf terhubung G jika dan hanya jika...',
    has_diagram: 0,
    graph_data: null,
    options: [
      'Setiap pasang simpul berbeda u, v ∈ V(G) memiliki representasi vektor jarak terhadap W yang berbeda, yaitu r(u|W) ≠ r(v|W).',
      'Setiap simpul di luar W bertetangga langsung dengan setidaknya satu simpul di dalam W.',
      'Tidak ada dua simpul di dalam W yang saling bertetangga.',
      'Derajat setiap simpul di dalam W bernilai genap.'
    ],
    correct_index: 0,
    explanation: 'Berdasarkan definisi Harary & Melter (1976), himpunan W = {w1, w2, ..., wk} adalah himpunan pembeda jika setiap simpul v memiliki koordinat metrik unik r(v|W) = (d(v, w1), d(v, w2), ..., d(v, wk)), sehingga tidak ada dua simpul berbeda yang memiliki representasi vektor jarak identik.',
    order_index: 0
  },
  {
    question_text: 'Diberikan graf lintasan Pn dengan n ≥ 2 simpul (seperti pada diagram P4 di bawah). Berapakah nilai dimensi metrik β(Pn)?',
    has_diagram: 1,
    graph_data: JSON.stringify({
      viewBox: '0 0 320 100',
      nodes: [
        { id: 'v1', x: 50, y: 50, label: 'v1' },
        { id: 'v2', x: 120, y: 50, label: 'v2' },
        { id: 'v3', x: 190, y: 50, label: 'v3' },
        { id: 'v4', x: 260, y: 50, label: 'v4' }
      ],
      edges: [['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4']],
      highlights: ['v1']
    }),
    options: [
      'β(Pn) = n - 1',
      'β(Pn) = 1',
      'β(Pn) = 2',
      'β(Pn) = ⌊n/3⌋'
    ],
    correct_index: 1,
    explanation: 'Graf lintasan Pn selalu memiliki dimensi metrik β(Pn) = 1 untuk sembarang n ≥ 2. Cukup memilih salah satu ujung daun sebagai W = {v1}, maka jarak setiap simpul vk ke v1 adalah unik, yaitu d(vk, v1) = k - 1.',
    order_index: 1
  },
  {
    question_text: 'Graf terhubung sederhana G memiliki dimensi metrik β(G) = 1 jika dan hanya jika G adalah...',
    has_diagram: 0,
    graph_data: null,
    options: [
      'Graf Pohon (Tree) sembarang',
      'Graf Lintasan (Pn)',
      'Graf Siklus (Cn)',
      'Graf Bipartisi Lengkap (Km,n)'
    ],
    correct_index: 1,
    explanation: 'Teorema fundamental Khuller et al. (1996) menyatakan bahwa satu-satunya keluarga graf terhubung sederhana dengan dimensi metrik β(G) = 1 adalah graf lintasan Pn.',
    order_index: 2
  },
  {
    question_text: 'Untuk graf lengkap Kn dengan n simpul (n ≥ 2, seperti K5 di bawah), berapakah nilai dimensi metrik β(Kn)?',
    has_diagram: 1,
    graph_data: JSON.stringify({
      viewBox: '0 0 320 180',
      nodes: [
        { id: 'v1', x: 160, y: 30, label: 'v1' },
        { id: 'v2', x: 75, y: 90, label: 'v2' },
        { id: 'v3', x: 105, y: 155, label: 'v3' },
        { id: 'v4', x: 215, y: 155, label: 'v4' },
        { id: 'v5', x: 245, y: 90, label: 'v5' }
      ],
      edges: [
        ['v1', 'v2'], ['v1', 'v3'], ['v1', 'v4'], ['v1', 'v5'],
        ['v2', 'v3'], ['v2', 'v4'], ['v2', 'v5'],
        ['v3', 'v4'], ['v3', 'v5'],
        ['v4', 'v5']
      ],
      highlights: ['v1', 'v2', 'v3', 'v4']
    }),
    options: [
      'β(Kn) = 1',
      'β(Kn) = 2',
      'β(Kn) = n - 1',
      'β(Kn) = n'
    ],
    correct_index: 2,
    explanation: 'Pada Kn, jarak antar setiap pasang simpul berbeda adalah tepat 1. Jika ada dua simpul u, v yang tidak masuk ke W, maka vektor r(u|W) = r(v|W) = (1, 1, ..., 1) sehingga tidak terbedakan. Akibatnya, di luar W maksimal hanya boleh ada 1 simpul, sehingga |W| minimal adalah n - 1.',
    order_index: 3
  },
  {
    question_text: 'Berapakah nilai dimensi metrik dari graf siklus/lingkaran Cn untuk setiap n ≥ 3 (seperti C5 di bawah)?',
    has_diagram: 1,
    graph_data: JSON.stringify({
      viewBox: '0 0 320 180',
      nodes: [
        { id: 'v1', x: 160, y: 30, label: 'v1' },
        { id: 'v2', x: 245, y: 90, label: 'v2' },
        { id: 'v3', x: 215, y: 155, label: 'v3' },
        { id: 'v4', x: 105, y: 155, label: 'v4' },
        { id: 'v5', x: 75, y: 90, label: 'v5' }
      ],
      edges: [['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4'], ['v4', 'v5'], ['v5', 'v1']],
      highlights: ['v1', 'v2']
    }),
    options: [
      'β(Cn) = 2 untuk semua n ≥ 3',
      'β(Cn) = 1 jika n ganjil, dan 2 jika n genap',
      'β(Cn) = ⌈n/2⌉',
      'β(Cn) = 3'
    ],
    correct_index: 0,
    explanation: 'Untuk setiap graf siklus Cn dengan n ≥ 3, dimensi metriknya bernilai tetap β(Cn) = 2. Memilih dua simpul berdekatan (misalnya W = {v1, v2}) cukup untuk memberikan kombinasi jarak searah jarum jam dan berlawanan jarum jam yang unik bagi seluruh simpul lainnya.',
    order_index: 4
  },
  {
    question_text: 'Diberikan graf lintasan P4: v1 - v2 - v3 - v4. Jika dipilih himpunan pembeda W = {v1, v3}, tentukan koordinat representasi metrik r(v4 | W)!',
    has_diagram: 1,
    graph_data: JSON.stringify({
      viewBox: '0 0 320 100',
      nodes: [
        { id: 'v1', x: 50, y: 50, label: 'v1' },
        { id: 'v2', x: 120, y: 50, label: 'v2' },
        { id: 'v3', x: 190, y: 50, label: 'v3' },
        { id: 'v4', x: 260, y: 50, label: 'v4' }
      ],
      edges: [['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4']],
      highlights: ['v1', 'v3']
    }),
    options: [
      'r(v4 | W) = (1, 3)',
      'r(v4 | W) = (3, 1)',
      'r(v4 | W) = (2, 1)',
      'r(v4 | W) = (3, 2)'
    ],
    correct_index: 1,
    explanation: 'Definisi representasi metrik adalah r(v4 | W) = (d(v4, v1), d(v4, v3)). Jarak d(v4, v1) pada P4 adalah 3 langkah, dan jarak d(v4, v3) adalah 1 langkah. Oleh karena itu, r(v4 | W) = (3, 1).',
    order_index: 5
  },
  {
    question_text: 'Diberikan graf bintang K1,k dengan 1 simpul pusat c dan k simpul daun (seperti K1,4 di bawah). Berapakah dimensi metrik β(K1,k)?',
    has_diagram: 1,
    graph_data: JSON.stringify({
      viewBox: '0 0 320 180',
      nodes: [
        { id: 'c', x: 160, y: 95, label: 'c' },
        { id: 'v1', x: 80, y: 45, label: 'v1' },
        { id: 'v2', x: 240, y: 45, label: 'v2' },
        { id: 'v3', x: 80, y: 145, label: 'v3' },
        { id: 'v4', x: 240, y: 145, label: 'v4' }
      ],
      edges: [['c', 'v1'], ['c', 'v2'], ['c', 'v3'], ['c', 'v4']],
      highlights: ['v1', 'v2', 'v3']
    }),
    options: [
      'β(K1,k) = 1',
      'β(K1,k) = 2',
      'β(K1,k) = k - 1',
      'β(K1,k) = k'
    ],
    correct_index: 2,
    explanation: 'Simpul pusat c memiliki jarak 1 ke seluruh simpul daun. Jika terdapat 2 daun atau lebih yang tidak berada di W, keduanya akan memiliki vektor jarak yang sama (keduanya berjarak 2 ke daun lain dan 1 ke pusat). Sehingga W harus memuat minimal k - 1 daun. Jadi β(K1,k) = k - 1.',
    order_index: 6
  },
  {
    question_text: 'Suatu himpunan S ⊆ V(G) disebut sebagai Himpunan Dominasi-Lokasi (Locating-Dominating Set / Sensor Super) jika S adalah himpunan dominasi dan memenuhi syarat...',
    has_diagram: 0,
    graph_data: null,
    options: [
      'Setiap dua simpul berbeda di luar S bertetangga dengan himpunan simpul penjamin di dalam S yang unik, yaitu N(u) ∩ S ≠ N(v) ∩ S untuk setiap u ≠ v ∈ V \\ S.',
      'Derajat semua simpul di dalam S harus lebih besar daripada simpul di luar S.',
      'Tidak ada sisi yang menghubungkan sesama simpul di dalam S.',
      'S juga harus merupakan himpunan pemutus jaringan (cut set).'
    ],
    correct_index: 0,
    explanation: 'Himpunan Dominasi-Lokasi (Slater, 1988) mensyaratkan S mendominasi G dan setiap simpul tak terpilih v ∈ V \\ S memiliki sidik tetangga unik N(v) ∩ S di dalam S, sehingga lokasi gangguan pada simpul manapun dapat dideteksi secara instan hanya dari sensor aktif di sekitarnya.',
    order_index: 7
  },
  {
    question_text: 'Manakah pernyataan yang BENAR mengenai hubungan antara bilangan dominasi γ(G) dan dimensi metrik β(G) pada graf terhubung secara umum?',
    has_diagram: 0,
    graph_data: null,
    options: [
      'γ(G) selalu bernilai lebih besar atau sama dengan β(G) untuk semua graf.',
      'β(G) selalu bernilai lebih besar atau sama dengan γ(G) untuk semua graf.',
      'Tidak ada relasi keterurutan tetap; pada Kn berlaku β > γ, sedangkan pada lintasan panjang Pn berlaku γ > β.',
      'Jumlah γ(G) + β(G) selalu tepat sama dengan n.'
    ],
    correct_index: 2,
    explanation: 'Tidak ada urutan mutlak antara γ(G) dan β(G). Contohnya pada graf lengkap Kn: γ(Kn) = 1 sedangkan β(Kn) = n - 1 (sehingga β > γ). Sebaliknya pada lintasan P10: β(P10) = 1 sedangkan γ(P10) = ⌈10/3⌉ = 4 (sehingga γ > β).',
    order_index: 8
  },
  {
    question_text: 'Dalam aplikasi navigasi robot dan deteksi gangguan jaringan, keunggulan utama pemilihan himpunan pembeda (resolving set) berukuran minimum adalah...',
    has_diagram: 0,
    graph_data: null,
    options: [
      'Menemukan sirkuit Hamilton berbobot minimum.',
      'Meminimalkan jumlah sensor/landmark yang harus dipasang sambil tetap menjamin setiap simpul jaringan dapat diidentifikasi secara unik dari vektor jaraknya.',
      'Menghilangkan semua siklus ganjil agar graf menjadi bipartisi.',
      'Menghitung nilai eigen terbesar dari matriks ketetanggaan.'
    ],
    correct_index: 1,
    explanation: 'Tujuan utama penentuan dimensi metrik adalah efisiensi biaya infrastruktur. Dengan memasang sensor hanya pada simpul-simpul pembeda W berukuran minimum, setiap simpul di seluruh jaringan memiliki koordinat identitas jarak yang unik, sehingga posisi agen atau titik masalah dapat ditentukan secara presisi.',
    order_index: 9
  }
];

try {
  const insertPkg = db.prepare(`
    INSERT INTO packages (slug, title, category, icon, difficulty, target_questions, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertQ = db.prepare(`
    INSERT INTO questions (package_id, question_text, has_diagram, graph_data, options, correct_index, explanation, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    // Hapus jika sudah pernah ada slug yang sama sebelumnya
    const existing = db.prepare('SELECT id FROM packages WHERE slug = ?').get(newPackage.slug);
    if (existing) {
      db.prepare('DELETE FROM questions WHERE package_id = ?').run(existing.id);
      db.prepare('DELETE FROM packages WHERE id = ?').run(existing.id);
    }

    const pkgResult = insertPkg.run(
      newPackage.slug,
      newPackage.title,
      newPackage.category,
      newPackage.icon,
      newPackage.difficulty,
      newPackage.target_questions,
      newPackage.description
    );

    const packageId = pkgResult.lastInsertRowid;

    for (const q of questions) {
      insertQ.run(
        packageId,
        q.question_text,
        q.has_diagram,
        q.graph_data,
        JSON.stringify(q.options),
        q.correct_index,
        q.explanation,
        q.order_index
      );
    }

    return packageId;
  });

  const createdId = tx();
  console.log(`✅ Berhasil membuat paket baru [ID: ${createdId}] "${newPackage.title}" dengan ${questions.length} butir soal objektif lengkap!`);
} catch (err) {
  console.error('❌ Gagal menambahkan paket:', err.message);
  process.exit(1);
}
