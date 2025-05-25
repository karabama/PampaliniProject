const sequelize = require('../config/database');

const User = require('./User');
// سایر مدل‌ها مثل Agent و Request بعداً اضافه می‌شوند

module.exports = {
  sequelize,
  User,
};
