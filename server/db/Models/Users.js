const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 25],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 30],
      },
    },
  },
  {
    sequelize: db,
    modelName: 'users',
  }
);

User.addHook('beforeSave', (user) => {
  if (user._changed.has('password')) {
    const { password } = user;
    return bcrypt
      .hash(password, 7)
      .then((password) => (user.password = password));
  }
});

module.exports = User;
