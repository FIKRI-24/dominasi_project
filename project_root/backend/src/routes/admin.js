const express = require('express');
const router = express.Router();
const {
  getAllQuestionsAdmin,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  analyzeGraph
} = require('../controllers/adminController');

// GET /api/admin/questions?package_id=1
router.get('/questions', getAllQuestionsAdmin);

// POST /api/admin/questions
router.post('/questions', createQuestion);

// PUT /api/admin/questions/:id
router.put('/questions/:id', updateQuestion);

// DELETE /api/admin/questions/:id
router.delete('/questions/:id', deleteQuestion);

// POST /api/admin/graph/analyze
router.post('/graph/analyze', analyzeGraph);

module.exports = router;
