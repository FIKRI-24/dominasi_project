const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const {
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
} = require('../controllers/adminController');

// 🛡️ Proteksi Akses Penuh: Semua rute admin wajib menyertakan Bearer Token valid & role 'admin'
router.use(requireAuth, requireAdmin);

// ── CRUD PAKET ──
// POST /api/admin/packages
router.post('/packages', createPackage);

// PUT /api/admin/packages/:id
router.put('/packages/:id', updatePackage);

// DELETE /api/admin/packages/:id
router.delete('/packages/:id', deletePackage);

// ── CRUD SOAL ──
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

// ── MONITORING PELAJAR & REKAP EVALUASI ──
// GET /api/admin/users
router.get('/users', getAllStudents);

// GET /api/admin/attempts
router.get('/attempts', getAllAttempts);

module.exports = router;
