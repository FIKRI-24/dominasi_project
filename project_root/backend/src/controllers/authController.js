const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Alamat email wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // 🛡️ Validasi Format Email Standar RFC
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
      return res.status(400).json({ success: false, message: 'Format alamat email tidak valid.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Kata sandi minimal 6 karakter.' });
    }

    // Cek apakah email sudah terdaftar
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email tersebut sudah terdaftar. Silakan login atau gunakan email lain.' });
    }

    // Hash password secara asinkron (non-blocking event-loop)
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, 'student')
    `).run(cleanName, cleanEmail, hashedPassword);

    const userId = result.lastInsertRowid;
    const userPayload = { id: userId, name: cleanName, email: cleanEmail, role: 'student' };

    // Buat JWT token (masa berlaku 7 hari)
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil! Selamat datang di platform belajar Teori Graf.',
      data: {
        token,
        user: userPayload
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan kata sandi wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Format alamat email tidak valid.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak cocok.' });
    }

    // Verifikasi password secara asinkron (non-blocking)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak cocok.' });
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: `Login berhasil. Selamat datang kembali, ${user.name}!`,
      data: {
        token,
        user: userPayload
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
const getMe = (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    // Hitung riwayat pengerjaan user
    const stats = db.prepare(`
      SELECT 
        COUNT(id) as total_attempts,
        ROUND(AVG(score), 1) as average_score,
        MAX(score) as best_score
      FROM quiz_attempts
      WHERE user_id = ?
    `).get(userId);

    res.json({
      success: true,
      data: {
        ...user,
        stats: {
          total_attempts: stats.total_attempts || 0,
          average_score: stats.average_score || 0,
          best_score: stats.best_score || 0
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe
};
