const db = require('../config/database');

// GET questions WITHOUT correct_index (anti-cheat)
const getQuestionsByPackage = (req, res, next) => {
  try {
    const { id } = req.params;

    const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Paket soal tidak ditemukan.' });
    }

    const questions = db.prepare(`
      SELECT id, package_id, question_text, has_diagram, graph_data, options, order_index
      FROM questions
      WHERE package_id = ?
      ORDER BY order_index ASC, id ASC
    `).all(id);

    // Safe parse options & graph_data JSON string
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

    res.json({
      success: true,
      data: {
        package: pkg,
        questions: parsed
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST submit answers — grading engine & persistent attempt recording
const submitAnswers = (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers, is_final } = req.body;

    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Format jawaban tidak valid. Kirim objek { answers: { "0": 1, ... } } atau { answers: { [question_id]: 1, ... } }' });
    }

    const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Paket soal tidak ditemukan.' });
    }

    const questions = db.prepare(`
      SELECT id, question_text, options, correct_index, explanation, order_index
      FROM questions WHERE package_id = ? ORDER BY order_index ASC, id ASC
    `).all(id);

    const totalQuestions = questions.length;
    if (totalQuestions === 0) {
      return res.status(400).json({
        success: false,
        message: 'Paket latihan ini belum memiliki butir soal untuk dikerjakan.'
      });
    }

    let correctCount = 0;
    const normalizedAnswers = {};

    const results = questions.map((q, idx) => {
      // Dukung pencocokan presisi via ID Soal (q.id) dan fallback ke array index (idx)
      const rawAnswer = answers[String(q.id)] !== undefined ? answers[String(q.id)] : answers[String(idx)];
      const userAnswer = typeof rawAnswer === 'number' && Number.isInteger(rawAnswer) ? rawAnswer : null;
      
      const isCorrect = userAnswer !== null && userAnswer === q.correct_index;
      if (isCorrect) correctCount++;

      if (userAnswer !== null) {
        normalizedAnswers[q.id] = userAnswer;
      }

      let parsedOptions = [];
      try {
        parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : (Array.isArray(q.options) ? q.options : []);
      } catch (e) {
        parsedOptions = [];
      }

      return {
        question_id: q.id,
        index: idx,
        question_text: q.question_text,
        options: parsedOptions,
        user_answer: userAnswer,
        correct_index: q.correct_index,
        is_correct: isCorrect,
        explanation: q.explanation
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const wrongCount = totalQuestions - correctCount;

    // Rekam attempt ke basis data jika pengguna login dan ini adalah submit akhir
    let attemptId = null;
    const shouldRecordAttempt = req.user && (is_final || Object.keys(answers).length >= totalQuestions);

    if (shouldRecordAttempt) {
      const insertAttempt = db.prepare(`
        INSERT INTO quiz_attempts (user_id, package_id, score, total_questions, correct_count, wrong_count, answers_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        req.user.id,
        parseInt(id),
        score,
        totalQuestions,
        correctCount,
        wrongCount,
        JSON.stringify(normalizedAnswers)
      );
      attemptId = insertAttempt.lastInsertRowid;
    }

    res.json({
      success: true,
      data: {
        package_id: parseInt(id),
        package_title: pkg.title,
        total_questions: totalQuestions,
        correct_count: correctCount,
        wrong_count: wrongCount,
        score,
        attempt_id: attemptId,
        is_saved: !!attemptId,
        user: req.user ? { id: req.user.id, name: req.user.name } : null,
        results
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getQuestionsByPackage, submitAnswers };
