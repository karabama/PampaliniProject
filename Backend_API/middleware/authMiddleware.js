const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // بهتر است از فایل .env گرفته شود

// تأیید اینکه کاربر احراز هویت شده
exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'توکن ارسال نشده است' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'توکن نامعتبر است' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'دسترسی غیرمجاز' });
  }
};

// بررسی نقش خاص (برای ادمین، عامل و غیره)
exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'کاربر تأیید نشده است' });
    if (req.user.role !== role) return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    next();
  };
};
