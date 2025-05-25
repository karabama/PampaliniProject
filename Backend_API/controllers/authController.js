const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = 'your_secret_key'; // بهتر است از .env خوانده شود

exports.register = async (req, res) => {
  try {
    const { fullName, phoneNumber, nationalCode, password, userType } = req.body;

    // بررسی یکتایی کد ملی (به جز ادمین)
    const existingNational = await User.findOne({ where: { nationalCode } });
    if (existingNational) return res.status(400).json({ message: 'کد ملی قبلاً ثبت شده است' });

    // بررسی یکتایی شماره موبایل
    const existingPhone = await User.findOne({ where: { phoneNumber } });
    if (existingPhone) return res.status(400).json({ message: 'شماره موبایل قبلاً ثبت شده است' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      phoneNumber,
      nationalCode,
      password: hashedPassword,
      userType: userType || 'basic',
    });

    res.status(201).json({ message: 'ثبت‌نام موفق بود', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { nationalCode, password, userType } = req.body;
    nationalCode = String(nationalCode);
    userType = String(userType);
    console.log('ورودی login:', { nationalCode, password, userType });
    let user;
    if (userType === 'admin') {
      user = await User.findOne({ where: { userType: 'admin', nationalCode } });
    } else {
      user = await User.findOne({ where: { nationalCode, userType } });
    }
    console.log('کاربر پیدا شده:', user);
    if (!user) return res.status(404).json({ message: 'کاربر یافت نشد' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'رمز عبور اشتباه است' });

    const token = jwt.sign(
      { id: user.id, nationalCode: user.nationalCode, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'ورود موفقیت‌آمیز بود', token });
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور', error: error.message });
  }
};

// دریافت پروفایل کاربر بر اساس توکن
exports.profile = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'توکن ارسال نشده است' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'توکن نامعتبر است' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'کاربر یافت نشد' });
    // اطلاعات کاربر را بدون پسورد برگردان
    const { password, ...userData } = user.toJSON();
    res.json(userData);
  } catch (error) {
    res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده است', error: error.message });
  }
};
