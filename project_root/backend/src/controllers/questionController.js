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
      ORDER BY order_index ASC
    `).all(id);

    // Parse options JSON string
    const parsed = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options)
    }));

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

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Format jawaban tidak valid. Kirim { answers: { "0": 1, "1": 3, ... } }' });
    }

    const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Paket soal tidak ditemukan.' });
    }

    const questions = db.prepare(`
      SELECT id, question_text, options, correct_index, explanation, order_index
      FROM questions WHERE package_id = ? ORDER BY order_index ASC
    `).all(id);

    let correctCount = 0;
    const results = questions.map((q, idx) => {
      const userAnswer = answers[String(idx)];
      const isCorrect = typeof userAnswer === 'number' && userAnswer === q.correct_index;
      if (isCorrect) correctCount++;

      return {
        index: idx,
        question_text: q.question_text,
        options: JSON.parse(q.options),
        user_answer: userAnswer !== undefined ? userAnswer : null,
        correct_index: q.correct_index,
        is_correct: isCorrect,
        explanation: q.explanation
      };
    });

    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
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
        JSON.stringify(answers)
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
