
// config/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// تابع ساخت پوشه در صورت عدم وجود
const makeDirectoryIfNotExists = (folder) => {
const fullPath = path.join(__dirname, '..', 'uploads', folder);
if (!fs.existsSync(fullPath)) {
fs.mkdirSync(fullPath, { recursive: true });
}
return fullPath;
};

const storage = multer.diskStorage({
destination: function (req, file, cb) {
let folder = '';
if (file.fieldname === 'profilePhoto') folder = 'photos/profile';
else if (file.fieldname === 'nationalCardPhoto') folder = 'photos/nationalCard';
else if (file.fieldname === 'faceVideo') folder = 'videos/face';

csharp
Copy
Edit
const uploadPath = makeDirectoryIfNotExists(folder);
cb(null, uploadPath);
},
filename: function (req, file, cb) {
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
const ext = path.extname(file.originalname);
cb(null, file.fieldname + '-' + uniqueSuffix + ext);
}
});

const upload = multer({ storage });

module.exports = upload;