const { Sequelize } = require('sequelize');
const UserModel = require('./User'); // مدل‌ها اینجا اضافه می‌شن

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = UserModel(sequelize); // مقداردهی مدل

sequelize.sync({ alter: true }) // این خط جداول رو می‌سازه
  .then(() => {
    console.log('✅ All models were synchronized successfully.');

    // 👇 ساخت کاربر ادمین در صورت نبود
    User.findOrCreate({
      where: { email: 'admin@zproject.com' },
      defaults: {
        name: 'Admin',
        password: '456', // بعداً هش می‌کنیم
        role: 'admin',
      },
    }).then(([admin, created]) => {
      if (created) {
        console.log('✅ ادمین ساخته شد.');
      } else {
        console.log('ℹ️ ادمین قبلاً وجود داشته.');
      }
    });

  })
  .catch((err) => {
    console.error('❌ Error syncing models:', err);
  });

module.exports = {
  sequelize,
  User,
};
