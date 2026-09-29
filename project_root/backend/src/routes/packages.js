const express = require('express');
const router = express.Router();
const { getAllPackages } = require('../controllers/packageController');
const { getQuestionsByPackage, submitAnswers } = require('../controllers/questionController');

// GET /api/packages
router.get('/', getAllPackages);

// GET /api/packages/:id/questions
router.get('/:id/questions', getQuestionsByPackage);

// POST /api/packages/:id/submit
router.post('/:id/submit', submitAnswers);

module.exports = router;
