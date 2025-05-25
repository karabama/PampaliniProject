// 📁 File: D:/PampaliniProject/Backend_Api/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ثبت‌نام
router.post("/register", authController.register);

// ورود
router.post("/login", authController.login);

// ثبت route برای دریافت پروفایل کاربر
router.get('/profile', authController.profile);

module.exports = router;
