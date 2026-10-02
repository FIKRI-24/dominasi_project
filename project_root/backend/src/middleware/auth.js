const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dominasi_jwt_secret_key_2026';

// Middleware wajib login
const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token autentikasi tidak ditemukan. Silakan login terlebih dahulu.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Sesi login telah kedaluwarsa atau token tidak valid. Silakan login kembali.'
    });
  }
};

// Middleware opsional login (jika ada token di-decode, jika tidak ada req.user = null)
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } else {
      req.user = null;
    }
  } catch (err) {
    req.user = null;
  }
  next();
};

// Middleware khusus admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return requireAuth(req, res, () => {
      if (req.user && req.user.role === 'admin') {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: 'Akses terlarang. Anda memerlukan hak akses Administrator untuk tindakan ini.'
      });
    });
  }

  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Akses terlarang. Anda memerlukan hak akses Administrator untuk tindakan ini.'
  });
};

module.exports = {
  JWT_SECRET,
  requireAuth,
  optionalAuth,
  requireAdmin
};
