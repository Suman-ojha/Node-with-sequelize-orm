const { DataTypes } = require('sequelize');
const sequelize = require('../DB/db_connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true, //means it's not required
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
  },
},{timestamps:true});

module.exports = User;
