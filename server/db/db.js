const { Sequelize } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/pixijs_web_snake',
  {
    logging: false,
    timezone: 'America/New_York',
  }
);

module.exports = db;
