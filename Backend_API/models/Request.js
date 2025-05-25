// models/Mission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Mission = sequelize.define('Mission', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  city: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  files: { type: DataTypes.TEXT }, // JSON string
  price: { type: DataTypes.STRING },
  allowAgentPrice: { type: DataTypes.BOOLEAN, defaultValue: false },
  location: { type: DataTypes.TEXT }, // JSON string for lat/lng
  status: { type: DataTypes.ENUM('pending', 'in_progress', 'done', 'rejected', 'canceled'), defaultValue: 'pending' },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
});

Mission.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Mission, { foreignKey: 'userId' });

module.exports = Mission;
