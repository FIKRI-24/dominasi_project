const db = require('../config/database');

// GET semua soal (versi admin, dengan kunci jawaban)
const getAllQuestionsAdmin = (req, res, next) => {
  try {
    const { package_id } = req.query;
    let query = `
      SELECT q.*, p.title as package_title, p.slug as package_slug
      FROM questions q
      JOIN packages p ON q.package_id = p.id
    `;
    const params = [];
    if (package_id) {
      query += ' WHERE q.package_id = ?';
      params.push(package_id);
    }
    query += ' ORDER BY q.package_id ASC, q.order_index ASC, q.id ASC';
    const questions = db.prepare(query).all(...params);

    // 🛡️ Safe parse options & graph_data agar tidak crash jika ada format data yang anomali
    const parsed = questions.map(q => {
      let parsedOptions = [];
      try {
        parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : (Array.isArray(q.options) ? q.options : []);
      } catch (e) {
        parsedOptions = [];
      }

      let parsedGraph = null;
      if (q.has_diagram && q.graph_data) {
        try {
          parsedGraph = typeof q.graph_data === 'string' ? JSON.parse(q.graph_data) : q.graph_data;
        } catch (e) {
          parsedGraph = null;
        }
      }

      return {
        ...q,
        options: parsedOptions,
        graph_data: parsedGraph
      };
    });

    res.json({ success: true, data: parsed });
  } catch (err) { next(err); }
};

// POST buat soal baru
const createQuestion = (req, res, next) => {
  try {
    const { package_id, question_text, has_diagram, graph_data, options, correct_index, explanation, order_index } = req.body;
    if (!package_id || !question_text || !question_text.trim() || !options || correct_index === undefined || !explanation || !explanation.trim()) {
      return res.status(400).json({ success: false, message: 'Field wajib: package_id, question_text, options, correct_index, explanation tidak boleh kosong.' });
    }
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ success: false, message: 'options harus array dengan tepat 4 elemen.' });
    }

    // 🛡️ Validasi bahwa setiap pilihan jawaban tidak boleh berupa string kosong
    const cleanOptions = options.map(opt => typeof opt === 'string' ? opt.trim() : String(opt || '').trim());
    if (cleanOptions.some(opt => opt.length === 0)) {
      return res.status(400).json({ success: false, message: 'Setiap pilihan jawaban dari opsi 1 sampai 4 wajib diisi teks yang valid.' });
    }

    if (!Number.isInteger(correct_index) || correct_index < 0 || correct_index > 3) {
      return res.status(400).json({ success: false, message: 'correct_index harus berupa integer antara 0 dan 3 (0=A, 1=B, 2=C, 3=D).' });
    }
    const pkg = db.prepare('SELECT id FROM packages WHERE id = ?').get(package_id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });

    // Auto-calculate order_index if not provided
    let calculatedOrder = order_index;
    if (calculatedOrder === undefined || calculatedOrder === null) {
      const maxRow = db.prepare('SELECT COALESCE(MAX(order_index), -1) as max_order FROM questions WHERE package_id = ?').get(package_id);
      calculatedOrder = maxRow.max_order + 1;
    }

    const result = db.prepare(`
      INSERT INTO questions (package_id, question_text, has_diagram, graph_data, options, correct_index, explanation, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      package_id,
      question_text.trim(),
      has_diagram ? 1 : 0,
      graph_data ? JSON.stringify(graph_data) : null,
      JSON.stringify(cleanOptions),
      correct_index,
      explanation.trim(),
      calculatedOrder
    );
    const newQ = db.prepare('SELECT * FROM questions WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({
      success: true,
      message: 'Soal berhasil dibuat.',
      data: {
        ...newQ,
        options: cleanOptions,
        graph_data: newQ.graph_data ? (typeof newQ.graph_data === 'string' ? JSON.parse(newQ.graph_data) : newQ.graph_data) : null
      }
    });
  } catch (err) { next(err); }
};

// PUT update soal
const updateQuestion = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Soal tidak ditemukan.' });

    const { question_text, has_diagram, graph_data, options, correct_index, explanation, order_index } = req.body;

    let cleanOptions = undefined;
    if (options !== undefined) {
      if (!Array.isArray(options) || options.length !== 4) {
        return res.status(400).json({ success: false, message: 'options harus berupa array dengan tepat 4 elemen pilihan jawaban.' });
      }
      cleanOptions = options.map(opt => typeof opt === 'string' ? opt.trim() : String(opt || '').trim());
      if (cleanOptions.some(opt => opt.length === 0)) {
        return res.status(400).json({ success: false, message: 'Setiap pilihan jawaban dari opsi 1 sampai 4 wajib diisi teks yang valid.' });
      }
    }

    if (correct_index !== undefined && (!Number.isInteger(correct_index) || correct_index < 0 || correct_index > 3)) {
      return res.status(400).json({ success: false, message: 'correct_index harus berupa integer antara 0 dan 3 (0=A, 1=B, 2=C, 3=D).' });
    }

    const updated = {
      question_text: question_text !== undefined ? question_text.trim() : existing.question_text,
      has_diagram: has_diagram !== undefined ? (has_diagram ? 1 : 0) : existing.has_diagram,
      graph_data: graph_data !== undefined ? (graph_data ? JSON.stringify(graph_data) : null) : existing.graph_data,
      options: cleanOptions ? JSON.stringify(cleanOptions) : existing.options,
      correct_index: correct_index !== undefined ? correct_index : existing.correct_index,
      explanation: explanation !== undefined ? explanation.trim() : existing.explanation,
      order_index: order_index !== undefined ? parseInt(order_index) : existing.order_index,
    };
    db.prepare(`
      UPDATE questions SET question_text=?, has_diagram=?, graph_data=?, options=?, correct_index=?, explanation=?, order_index=? WHERE id=?
    `).run(updated.question_text, updated.has_diagram, updated.graph_data, updated.options, updated.correct_index, updated.explanation, updated.order_index, id);
    const result = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);

    let parsedOptions = [];
    try {
      parsedOptions = typeof result.options === 'string' ? JSON.parse(result.options) : result.options;
    } catch (e) {
      parsedOptions = [];
    }

    res.json({
      success: true,
      message: 'Soal berhasil diupdate.',
      data: {
        ...result,
        options: parsedOptions,
        graph_data: result.graph_data ? (typeof result.graph_data === 'string' ? JSON.parse(result.graph_data) : result.graph_data) : null
      }
    });
  } catch (err) { next(err); }
};

// DELETE soal
const deleteQuestion = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Soal tidak ditemukan.' });
    db.prepare('DELETE FROM questions WHERE id = ?').run(id);
    res.json({ success: true, message: `Soal ID ${id} berhasil dihapus.` });
  } catch (err) { next(err); }
};

// POST analyze graph - hitung γ(G) dan β(G)
const analyzeGraph = (req, res, next) => {
  try {
    const { nodes, edges } = req.body;
    if (!nodes || !edges || !Array.isArray(nodes) || !Array.isArray(edges)) {
      return res.status(400).json({ success: false, message: 'Format data tidak valid. Kirim { nodes: [{id},...], edges: [[u,v],...] }' });
    }

    if (nodes.length === 0) {
      return res.status(400).json({ success: false, message: 'Graf harus memiliki setidaknya 1 simpul.' });
    }

    // 🛡️ Batasan Pencegahan DoS: Maksimal 16 simpul untuk komputasi kombinatorial instan
    const MAX_NODES = 16;
    if (nodes.length > MAX_NODES) {
      return res.status(400).json({
        success: false,
        message: `Jumlah simpul (${nodes.length}) melampaui batas aman maksimal (${MAX_NODES} simpul) untuk komputasi kombinatorial instan.`
      });
    }

    // Validasi integritas simpul
    const nodeIds = nodes.map(n => n?.id).filter(Boolean);
    const nodeSet = new Set(nodeIds);

    if (nodeIds.length !== nodes.length) {
      return res.status(400).json({ success: false, message: 'Setiap elemen dalam nodes wajib memiliki properti id yang valid.' });
    }
    if (nodeSet.size !== nodes.length) {
      return res.status(400).json({ success: false, message: 'Terdapat duplikasi ID simpul pada graf.' });
    }

    // Validasi dan sanitasi edges
    const cleanEdges = [];
    const edgeSet = new Set();

    for (const edge of edges) {
      if (!Array.isArray(edge) || edge.length < 2) {
        return res.status(400).json({ success: false, message: 'Format sisi tidak valid. Setiap sisi harus berupa pasangan [u, v].' });
      }
      const [u, v] = edge;
      if (!nodeSet.has(u) || !nodeSet.has(v)) {
        return res.status(400).json({
          success: false,
          message: `Sisi [${u}, ${v}] tidak valid karena menghubungkan simpul yang tidak ada dalam daftar nodes.`
        });
      }
      if (u === v) continue; // Abaikan self-loop

      const edgeKey = u < v ? `${u}---${v}` : `${v}---${u}`;
      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        cleanEdges.push([u, v]);
      }
    }

    // Inisialisasi adjacency list & Set tetangga
    const adj = {};
    for (const id of nodeIds) adj[id] = [];
    for (const [u, v] of cleanEdges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    const adjSet = {};
    for (const id of nodeIds) {
      adjSet[id] = new Set(adj[id]);
    }

    // BFS distance untuk graf tak berbobot
    const bfs = (start) => {
      const dist = {};
      for (const id of nodeIds) dist[id] = Infinity;
      dist[start] = 0;
      const queue = [start];
      while (queue.length > 0) {
        const cur = queue.shift();
        for (const neighbor of (adj[cur] || [])) {
          if (dist[neighbor] === Infinity) {
            dist[neighbor] = dist[cur] + 1;
            queue.push(neighbor);
          }
        }
      }
      return dist;
    };

    // Hitung seluruh jarak antar simpul
    const allDist = {};
    for (const id of nodeIds) allDist[id] = bfs(id);

    const n = nodeIds.length;

    // Cek keterhubungan graf
    const isConnected = n > 0 && nodeIds.every(id => allDist[nodeIds[0]][id] !== Infinity);

    // --- Domination Number γ(G) ---
    let domNumber = n;
    let domSet = [...nodeIds];

    const isDominating = (subset) => {
      const subSet = new Set(subset);
      for (const v of nodeIds) {
        if (subSet.has(v)) continue;
        let hasDominator = false;
        for (let i = 0; i < subset.length; i++) {
          if (adjSet[v].has(subset[i])) {
            hasDominator = true;
            break;
          }
        }
        if (!hasDominator) return false;
      }
      return true;
    };

    for (let size = 1; size <= n; size++) {
      let found = false;
      const combinations = (arr, k, start = 0, current = []) => {
        if (current.length === k) {
          if (isDominating(current)) {
            domSet = [...current];
            found = true;
          }
          return;
        }
        for (let i = start; i < arr.length && !found; i++) {
          current.push(arr[i]);
          combinations(arr, k, i + 1, current);
          current.pop();
        }
      };
      combinations(nodeIds, size);
      if (found) {
        domNumber = size;
        break;
      }
    }

    // --- Metric Dimension β(G) ---
    const isResolving = (subset) => {
      for (let i = 0; i < n; i++) {
        const vi = nodeIds[i];
        for (let j = i + 1; j < n; j++) {
          const vj = nodeIds[j];
          let distinguished = false;
          for (let sIdx = 0; sIdx < subset.length; sIdx++) {
            const s = subset[sIdx];
            if (allDist[s][vi] !== allDist[s][vj]) {
              distinguished = true;
              break;
            }
          }
          if (!distinguished) return false;
        }
      }
      return true;
    };

    let metricDim = n;
    let resolveSet = [...nodeIds];

    for (let size = 1; size <= n; size++) {
      let found = false;
      const combinations = (arr, k, start = 0, current = []) => {
        if (current.length === k) {
          if (isResolving(current)) {
            resolveSet = [...current];
            found = true;
          }
          return;
        }
        for (let i = start; i < arr.length && !found; i++) {
          current.push(arr[i]);
          combinations(arr, k, i + 1, current);
          current.pop();
        }
      };
      combinations(nodeIds, size);
      if (found) {
        metricDim = size;
        break;
      }
    }

    // Diameter
    let diameter = 0;
    if (isConnected) {
      for (const u of nodeIds) {
        for (const v of nodeIds) {
          if (allDist[u][v] !== Infinity && allDist[u][v] > diameter) {
            diameter = allDist[u][v];
          }
        }
      }
    } else {
      diameter = 'Terputus (∞)';
    }

    res.json({
      success: true,
      data: {
        n: n,
        m: cleanEdges.length,
        is_connected: isConnected,
        diameter,
        domination_number: domNumber,
        domination_set: domSet,
        metric_dimension: metricDim,
        resolving_set: resolveSet
      }
    });
  } catch (err) { next(err); }
};

// ── CRUD PAKET LATIHAN ──
// POST create package
const createPackage = (req, res, next) => {
  try {
    const { title, slug, category, difficulty, target_questions, icon, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Judul paket (title) wajib diisi.' });
    }

    const finalSlug = slug && slug.trim() 
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') 
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const existingSlug = db.prepare('SELECT id FROM packages WHERE slug = ?').get(finalSlug);
    if (existingSlug) {
      return res.status(400).json({ success: false, message: `Slug '${finalSlug}' sudah digunakan. Buat slug yang berbeda.` });
    }

    const result = db.prepare(`
      INSERT INTO packages (slug, title, category, difficulty, target_questions, icon, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      finalSlug,
      title.trim(),
      category && category.trim() ? category.trim() : 'Teori Graf',
      difficulty || 'Beginner',
      target_questions ? parseInt(target_questions) : 10,
      icon || '📋',
      description || ''
    );

    const newPkg = db.prepare(`
      SELECT p.*, 0 as question_count FROM packages p WHERE p.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({ success: true, message: 'Paket latihan berhasil dibuat.', data: newPkg });
  } catch (err) { next(err); }
};

// PUT update package
const updatePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });

    const { title, slug, category, difficulty, target_questions, icon, description } = req.body;

    let finalSlug = existing.slug;
    if (slug && slug.trim() && slug.trim() !== existing.slug) {
      finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const conflict = db.prepare('SELECT id FROM packages WHERE slug = ? AND id != ?').get(finalSlug, id);
      if (conflict) {
        return res.status(400).json({ success: false, message: `Slug '${finalSlug}' sudah dipakai paket lain.` });
      }
    }

    db.prepare(`
      UPDATE packages
      SET title = ?, slug = ?, category = ?, difficulty = ?, target_questions = ?, icon = ?, description = ?
      WHERE id = ?
    `).run(
      title ? title.trim() : existing.title,
      finalSlug,
      category ? category.trim() : existing.category,
      difficulty || existing.difficulty,
      target_questions !== undefined ? parseInt(target_questions) : existing.target_questions,
      icon || existing.icon,
      description !== undefined ? description : existing.description,
      id
    );

    const updated = db.prepare(`
      SELECT p.*, COUNT(q.id) as question_count
      FROM packages p
      LEFT JOIN questions q ON q.package_id = p.id
      WHERE p.id = ?
      GROUP BY p.id
    `).get(id);

    res.json({ success: true, message: 'Paket berhasil diperbarui.', data: updated });
  } catch (err) { next(err); }
};

// DELETE package (atomic cascade delete quiz_attempts, questions, and package)
const deletePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });

    // 🛡️ Transaksi atomik: Memastikan seluruh data relasi terhapus serentak (all-or-nothing)
    const deleteTx = db.transaction((pkgId) => {
      // 1. Hapus riwayat pengerjaan kuis siswa untuk paket ini
      db.prepare('DELETE FROM quiz_attempts WHERE package_id = ?').run(pkgId);
      // 2. Hapus seluruh butir soal dalam paket
      db.prepare('DELETE FROM questions WHERE package_id = ?').run(pkgId);
      // 3. Hapus entitas paket
      db.prepare('DELETE FROM packages WHERE id = ?').run(pkgId);
    });

    deleteTx(id);

    res.json({
      success: true,
      message: `Paket '${existing.title}' beserta seluruh soal dan riwayat evaluasinya berhasil dihapus secara permanen.`
    });
  } catch (err) { next(err); }
};

// ── MONITORING PELAJAR & REKAP EVALUASI ──
// GET /api/admin/users
const getAllStudents = (req, res, next) => {
  try {
    const students = db.prepare(`
      SELECT 
        u.id, u.name, u.email, u.role, u.created_at,
        COUNT(qa.id) as attempts_count,
        ROUND(AVG(qa.score), 1) as avg_score,
        MAX(qa.score) as best_score,
        MAX(qa.completed_at) as last_activity
      FROM users u
      LEFT JOIN quiz_attempts qa ON qa.user_id = u.id
      WHERE u.role = 'student'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `).all();

    res.json({
      success: true,
      data: students
    });
  } catch (err) { next(err); }
};

// GET /api/admin/attempts
const getAllAttempts = (req, res, next) => {
  try {
    const { package_id, user_id } = req.query;

    let query = `
      SELECT 
        qa.id, qa.user_id, u.name as student_name, u.email as student_email,
        qa.package_id, p.title as package_title, p.category as package_category,
        qa.score, qa.total_questions, qa.correct_count, qa.wrong_count,
        qa.completed_at
      FROM quiz_attempts qa
      JOIN users u ON u.id = qa.user_id
      JOIN packages p ON p.id = qa.package_id
    `;
    const conditions = [];
    const params = [];

    if (package_id) {
      conditions.push('qa.package_id = ?');
      params.push(package_id);
    }
    if (user_id) {
      conditions.push('qa.user_id = ?');
      params.push(user_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY qa.completed_at DESC LIMIT 100';

    const attempts = db.prepare(query).all(...params);

    res.json({
      success: true,
      data: attempts
    });
  } catch (err) { next(err); }
};

module.exports = {
  getAllQuestionsAdmin,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  analyzeGraph,
  createPackage,
  updatePackage,
  deletePackage,
  getAllStudents,
  getAllAttempts
};
