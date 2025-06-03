const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const requestController = require('../controllers/requestController');

// ایجاد درخواست جدید
router.post('/', authMiddleware, requestController.createRequest);

// دریافت لیست درخواست‌های کاربر
router.get('/user', authMiddleware, requestController.getUserRequests);

// دریافت جزئیات یک درخواست
router.get('/:id', authMiddleware, requestController.getRequestDetails);

// به‌روزرسانی وضعیت درخواست
router.put('/:id/status', authMiddleware, requestController.updateRequestStatus);

// حذف درخواست
router.delete('/:id', authMiddleware, requestController.deleteRequest);

module.exports = router;
