// 📁 File: D:/PampaliniProject/Backend_API/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoutes');
const requestRoutes = require('./routes/requestRoutes');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Database connected.");
    // ایجاد ادمین اصلی اگر وجود ندارد
    const adminNationalCode = 'z62';
    const adminPassword = '62126';
    const adminUser = await require('./models/User').findOne({ where: { nationalCode: adminNationalCode, userType: 'admin' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await require('./models/User').create({
        fullName: 'ادمین اصلی',
        phoneNumber: '09120000000',
        nationalCode: adminNationalCode,
        password: hashedPassword,
        userType: 'admin',
        isVerified: true
      });
      console.log('✅ ادمین اصلی با نام کاربری z62 ساخته شد.');
    } else {
      console.log('ℹ️ ادمین اصلی قبلاً وجود داشته است.');
    }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

// ⚠️ حذف کامل sync و استفاده فقط از migration برای تغییر ساختار دیتابیس
// هیچ گونه sequelize.sync() یا sync({ alter: true }) در این فایل نباید باشد
