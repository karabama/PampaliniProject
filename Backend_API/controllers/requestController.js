const { Request, User, Agent } = require('../models');
const { Op } = require('sequelize');

// ایجاد درخواست جدید
exports.createRequest = async (req, res) => {
  try {
    const { title, description, city, date, price, allowAgentPrice, location, isMission, files } = req.body;
    const userId = req.user.id;

    // بررسی اعتبار داده‌های ورودی
    if (!title || !description || !city || !date) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً تمام فیلدهای ضروری را پر کنید'
      });
    }

    const request = await Request.create({
      userId,
      title,
      description,
      city,
      scheduledDate: date,
      price: price || null,
      allowAgentPrice,
      location: location ? JSON.stringify(location) : null,
      isMission,
      status: 'PENDING',
      files: files || []
    });

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error in createRequest:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ایجاد درخواست'
    });
  }
};

// دریافت لیست درخواست‌های کاربر
exports.getUserRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await Request.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Error in getUserRequests:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت لیست درخواست‌ها'
    });
  }
};

// دریافت جزئیات یک درخواست
exports.getRequestDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Agent,
          attributes: ['id', 'name', 'rating'],
          required: false
        }
      ]
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'درخواست مورد نظر یافت نشد'
      });
    }

    // بررسی دسترسی کاربر به درخواست
    if (request.userId !== req.user.id && req.user.role !== 'ADMIN' && req.user.role !== 'AGENT') {
      return res.status(403).json({
        success: false,
        message: 'شما اجازه دسترسی به این درخواست را ندارید'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error in getRequestDetails:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت جزئیات درخواست'
    });
  }
};

// به‌روزرسانی وضعیت درخواست
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, agentId } = req.body;

    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'درخواست مورد نظر یافت نشد'
      });
    }

    // بررسی مجوز تغییر وضعیت
    if (req.user.role !== 'ADMIN' && req.user.role !== 'AGENT') {
      return res.status(403).json({
        success: false,
        message: 'شما اجازه تغییر وضعیت این درخواست را ندارید'
      });
    }

    await request.update({
      status,
      agentId: agentId || null
    });

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error in updateRequestStatus:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در به‌روزرسانی وضعیت درخواست'
    });
  }
};

// حذف درخواست
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'درخواست مورد نظر یافت نشد'
      });
    }

    // فقط کاربر صاحب درخواست و ادمین می‌توانند درخواست را حذف کنند
    if (request.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'شما اجازه حذف این درخواست را ندارید'
      });
    }

    await request.destroy();
    res.json({
      success: true,
      message: 'درخواست با موفقیت حذف شد'
    });
  } catch (error) {
    console.error('Error in deleteRequest:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در حذف درخواست'
    });
  }
};
