require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH
  ? path.resolve(__dirname, '../../', process.env.DB_PATH)
  : path.join(__dirname, '../../database/dominasi.db');

// Pastikan folder database ada
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode untuk performa lebih baik
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Inisialisasi schema
const schemaPath = path.join(__dirname, '../../database/schema.sql');
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
}

// Auto-migration for newly added columns if table already existed
try {
  db.exec(`ALTER TABLE packages ADD COLUMN category VARCHAR(100) DEFAULT 'Teori Graf'`);
} catch (e) {}

try {
  db.exec(`ALTER TABLE packages ADD COLUMN target_questions INTEGER DEFAULT 10`);
} catch (e) {}

// Set initial categories if default is still unset or general
try {
  db.prepare(`UPDATE packages SET category = 'Representasi Matriks', target_questions = 10 WHERE slug = 'dasar-graph-matrix' AND (category IS NULL OR category = 'Teori Graf')`).run();
  db.prepare(`UPDATE packages SET category = 'Spektral Graf & Laplacian', target_questions = 10 WHERE slug = 'aplikasi-graph-matrix' AND (category IS NULL OR category = 'Teori Graf')`).run();
  db.prepare(`UPDATE packages SET category = 'Dasar Bilangan Dominasi', target_questions = 10 WHERE slug = 'dasar-bilangan-dominasi' AND (category IS NULL OR category = 'Teori Graf')`).run();
  db.prepare(`UPDATE packages SET category = 'Variasi Dominasi & Sensor', target_questions = 10 WHERE slug = 'aplikasi-variasi-dominasi' AND (category IS NULL OR category = 'Teori Graf')`).run();
} catch (e) {}

module.exports = db;
