CREATE TABLE IF NOT EXISTS packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(100) DEFAULT 'Teori Graf',
  icon VARCHAR(20) DEFAULT '📋',
  difficulty VARCHAR(20) DEFAULT 'Beginner',
  target_questions INTEGER DEFAULT 10,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  package_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  has_diagram BOOLEAN DEFAULT 0,
  graph_data TEXT DEFAULT NULL,
  options TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK(correct_index >= 0 AND correct_index <= 3),
  explanation TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);
