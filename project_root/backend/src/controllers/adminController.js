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
    query += ' ORDER BY q.package_id ASC, q.order_index ASC';
    const questions = db.prepare(query).all(...params);
    const parsed = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options),
      graph_data: q.graph_data ? JSON.parse(q.graph_data) : null
    }));
    res.json({ success: true, data: parsed });
  } catch (err) { next(err); }
};

// POST buat soal baru
const createQuestion = (req, res, next) => {
  try {
    const { package_id, question_text, has_diagram, graph_data, options, correct_index, explanation, order_index } = req.body;
    if (!package_id || !question_text || !options || correct_index === undefined || !explanation) {
      return res.status(400).json({ success: false, message: 'Field wajib: package_id, question_text, options, correct_index, explanation' });
    }
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ success: false, message: 'options harus array dengan tepat 4 elemen.' });
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
      question_text,
      has_diagram ? 1 : 0,
      graph_data ? JSON.stringify(graph_data) : null,
      JSON.stringify(options),
      correct_index,
      explanation,
      calculatedOrder
    );
    const newQ = db.prepare('SELECT * FROM questions WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: 'Soal berhasil dibuat.', data: { ...newQ, options: JSON.parse(newQ.options) } });
  } catch (err) { next(err); }
};

// PUT update soal
const updateQuestion = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Soal tidak ditemukan.' });

    const { question_text, has_diagram, graph_data, options, correct_index, explanation, order_index } = req.body;
    const updated = {
      question_text: question_text ?? existing.question_text,
      has_diagram: has_diagram !== undefined ? (has_diagram ? 1 : 0) : existing.has_diagram,
      graph_data: graph_data !== undefined ? (graph_data ? JSON.stringify(graph_data) : null) : existing.graph_data,
      options: options ? JSON.stringify(options) : existing.options,
      correct_index: correct_index !== undefined ? correct_index : existing.correct_index,
      explanation: explanation ?? existing.explanation,
      order_index: order_index !== undefined ? order_index : existing.order_index,
    };
    db.prepare(`
      UPDATE questions SET question_text=?, has_diagram=?, graph_data=?, options=?, correct_index=?, explanation=?, order_index=? WHERE id=?
    `).run(updated.question_text, updated.has_diagram, updated.graph_data, updated.options, updated.correct_index, updated.explanation, updated.order_index, id);
    const result = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);
    res.json({ success: true, message: 'Soal berhasil diupdate.', data: { ...result, options: JSON.parse(result.options) } });
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
      return res.status(400).json({ success: false, message: 'Kirim { nodes: [{id},...], edges: [[u,v],...] }' });
    }

    // Build adjacency list
    const adj = {};
    for (const node of nodes) adj[node.id] = [];
    for (const [u, v] of edges) {
      if (adj[u]) adj[u].push(v);
      if (adj[v]) adj[v].push(u);
    }

    // BFS distance
    const bfs = (start) => {
      const dist = {};
      for (const n of nodes) dist[n.id] = Infinity;
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

    // Compute all BFS distances
    const allDist = {};
    for (const node of nodes) allDist[node.id] = bfs(node.id);

    const nodeIds = nodes.map(n => n.id);
    const n = nodeIds.length;

    // --- Domination Number γ(G) ---
    // Brute force for small graphs (n <= 20)
    let domNumber = n;
    let domSet = nodeIds;
    const isDominating = (subset) => {
      const subSet = new Set(subset);
      for (const v of nodeIds) {
        if (subSet.has(v)) continue;
        const dominated = (adj[v] || []).some(nb => subSet.has(nb));
        if (!dominated) return false;
      }
      return true;
    };
    for (let size = 1; size <= n; size++) {
      let found = false;
      const combinations = (arr, k, start = 0, current = []) => {
        if (current.length === k) {
          if (isDominating(current)) { domSet = [...current]; found = true; }
          return;
        }
        for (let i = start; i < arr.length && !found; i++) {
          current.push(arr[i]);
          combinations(arr, k, i + 1, current);
          current.pop();
        }
      };
      combinations(nodeIds, size);
      if (found) { domNumber = size; break; }
    }

    // --- Metric Dimension β(G) ---
    const getDistVector = (subset, v) => subset.map(s => allDist[s][v]);
    const isResolving = (subset) => {
      for (let i = 0; i < nodeIds.length; i++) {
        for (let j = i + 1; j < nodeIds.length; j++) {
          const vi = nodeIds[i], vj = nodeIds[j];
          const di = getDistVector(subset, vi);
          const dj = getDistVector(subset, vj);
          if (di.every((d, k) => d === dj[k])) return false;
        }
      }
      return true;
    };
    let metricDim = n;
    let resolveSet = nodeIds;
    for (let size = 1; size < n; size++) {
      let found = false;
      const combinations = (arr, k, start = 0, current = []) => {
        if (current.length === k) {
          if (isResolving(current)) { resolveSet = [...current]; found = true; }
          return;
        }
        for (let i = start; i < arr.length && !found; i++) {
          current.push(arr[i]);
          combinations(arr, k, i + 1, current);
          current.pop();
        }
      };
      combinations(nodeIds, size);
      if (found) { metricDim = size; break; }
    }

    // Diameter
    let diameter = 0;
    for (const u of nodeIds) {
      for (const v of nodeIds) {
        if (allDist[u][v] !== Infinity && allDist[u][v] > diameter) diameter = allDist[u][v];
      }
    }

    res.json({
      success: true,
      data: {
        n: n,
        m: edges.length,
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

// DELETE package (cascade delete questions)
const deletePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });

    db.prepare('DELETE FROM questions WHERE package_id = ?').run(id);
    db.prepare('DELETE FROM packages WHERE id = ?').run(id);

    res.json({ success: true, message: `Paket '${existing.title}' beserta seluruh soalnya berhasil dihapus.` });
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
  deletePackage
};
