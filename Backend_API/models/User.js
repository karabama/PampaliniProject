// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('basic', 'silver', 'gold', 'agent', 'admin'),
    defaultValue: 'basic',
  },
  profilePhoto: {
    type: DataTypes.STRING, // مسیر ذخیره عکس پرسنلی
  },
  nationalCardPhoto: {
    type: DataTypes.STRING, // مسیر ذخیره کارت ملی
  },
  faceVideo: {
    type: DataTypes.STRING, // مسیر ذخیره ویدئو چهره
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  nationalCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'کد ملی به عنوان نام کاربری و شناسه یکتا (به جز ادمین‌ها)'
  }
}, {
  timestamps: true,
});

// Sequelize will handle unique constraint automatically. If you need to sync changes without dropping the table, use migrations instead of sync({ alter: true }) or sync({ force: true }).

module.exports = User;
