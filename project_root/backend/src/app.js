const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const packagesRouter = require('./routes/packages');

const app = express();

// 🛡️ CORS Fleksibel & Aman: Dukung multi-origin (ENV), localhost/127.0.0.1 dev ports, dan production domain
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(s => s.trim())
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:4173'
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Izinkan request tanpa origin (seperti Postman, cURL, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Pada lingkungan pengembangan (non-production), izinkan pola origin loopback lokal apapun
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Akses dari origin ${origin} diblokir oleh kebijakan CORS.`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Batasi ukuran payload untuk mencegah memory exhaustion attack
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Dominasi Backend API is running 🎯', version: '1.0.0' });
});

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

// Routes
app.use('/api/packages', packagesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} tidak ditemukan.` });
});

// Error handler
app.use(errorHandler);

module.exports = app;
