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
      order_index ?? 99
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

module.exports = { getAllQuestionsAdmin, createQuestion, updateQuestion, deleteQuestion, analyzeGraph };
