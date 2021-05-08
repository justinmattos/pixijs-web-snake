const db = require('./db');
const User = require('./Models/Users');
const Score = require('./Models/Scores');

User.hasMany(Score);
Score.belongsTo(User);

module.exports = { db, models: { User } };
