const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const packagesRouter = require('./routes/packages');

const app = express();

// CORS - allow frontend Vite dev server
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
