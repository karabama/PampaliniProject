const express = require('express');
const router = express.Router();
const { authenticateUser, requireRole } = require('../middleware/authMiddleware');
const { User } = require('../models');
const Mission = require('../models/Request');
const Notification = require('../models/Notification');
// TODO: Add Agent, Request, Transaction models when available

// فقط ادمین می‌تواند این مسیرها را ببیند
router.get('/dashboard', authenticateUser, requireRole('admin'), (req, res) => {
  res.json({ message: 'خوش آمدید ادمین!' });
});

// لیست همه کاربران
router.get('/users', authenticateUser, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت کاربران', error: err.message });
  }
});

// لیست همه عوامل (userType = agent)
router.get('/agents', authenticateUser, requireRole('admin'), async (req, res) => {
  try {
    const agents = await User.findAll({ where: { userType: 'agent' } });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت عوامل', error: err.message });
  }
});

// لیست همه ماموریت‌ها (در آینده: مدل Mission)
router.get('/missions', authenticateUser, requireRole('admin'), async (req, res) => {
  // TODO: Implement when Mission model is available
  res.json([]);
});

// لیست همه تراکنش‌ها (در آینده: مدل Transaction)
router.get('/transactions', authenticateUser, requireRole('admin'), async (req, res) => {
  // TODO: Implement when Transaction model is available
  res.json([]);
});

// لیست ماموریت‌های کاربر جاری
router.get('/my-missions', authenticateUser, async (req, res) => {
  try {
    const missions = await Mission.findAll({ where: { userId: req.user.id } });
    res.json(missions);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت ماموریت‌ها', error: err.message });
  }
});

// لیست اعلان‌های کاربر جاری
router.get('/my-notifications', authenticateUser, async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت اعلان‌ها', error: err.message });
  }
});

// ثبت ماموریت جدید
router.post('/missions', authenticateUser, async (req, res) => {
  try {
    const { title, description, city, date, files, price, allowAgentPrice, location } = req.body;
    const mission = await Mission.create({
      title,
      description,
      city,
      date,
      files: JSON.stringify(files),
      price,
      allowAgentPrice,
      location: location ? JSON.stringify(location) : null,
      userId: req.user.id
    });
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
