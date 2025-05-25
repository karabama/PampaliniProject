// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zproject_db', 'postgres', '456', {
  host: 'localhost',
  dialect: 'postgres',
});

// اعتبارسنجی اتصال به دیتابیس
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;
