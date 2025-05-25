// 📁 File: D:/PampaliniProject/Backend_API/server.js
require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);

// ⚠️ حذف sync و استفاده فقط از migration برای تغییر ساختار دیتابیس
// sequelize.sync() را حذف کردیم تا فقط migration اجرا شود

app.listen(3000, () => {
  console.log("🚀 سرور روی پورت 3000 اجرا شد");
});
