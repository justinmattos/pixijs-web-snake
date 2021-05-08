const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Score extends Model {}
Score.init(
  {
    difficulty: {
      type: DataTypes.ENUM(['EASY', 'MEDIUM', 'HARD']),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: Date.now,
    },
  },
  { sequelize: db, modelName: 'scores' }
);

module.exports = Score;
