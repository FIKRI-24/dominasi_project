const db = require('../config/database');

const getAllPackages = (req, res, next) => {
  try {
    const packages = db.prepare(`
      SELECT
        p.id, p.slug, p.title, p.icon, p.difficulty, p.description, p.created_at,
        COUNT(q.id) as question_count
      FROM packages p
      LEFT JOIN questions q ON q.package_id = p.id
      GROUP BY p.id
      ORDER BY p.id ASC
    `).all();

    res.json({
      success: true,
      data: packages
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPackages };
