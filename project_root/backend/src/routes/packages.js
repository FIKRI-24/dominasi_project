const express = require('express');
const router = express.Router();
const { getAllPackages } = require('../controllers/packageController');
const { getQuestionsByPackage, submitAnswers } = require('../controllers/questionController');
const { optionalAuth } = require('../middleware/auth');

// GET /api/packages
router.get('/', getAllPackages);

// GET /api/packages/:id/questions
router.get('/:id/questions', getQuestionsByPackage);

// POST /api/packages/:id/submit (mendukung opsional autentikasi untuk merekam nilai)
router.post('/:id/submit', optionalAuth, submitAnswers);

module.exports = router;
