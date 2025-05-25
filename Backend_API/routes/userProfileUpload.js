// routes/userProfileUpload.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const User = require('../models/User');

// تعریف چند فیلد مختلف
const cpUpload = upload.fields([
{ name: 'profilePhoto', maxCount: 1 },
{ name: 'nationalCardPhoto', maxCount: 1 },
{ name: 'faceVideo', maxCount: 1 }
]);

router.post('/upload-verification', cpUpload, async (req, res) => {
try {
const userId = req.body.userId;
const user = await User.findByPk(userId);
if (!user) return res.status(404).json({ message: 'User not found' });

pgsql
Copy
Edit
if (req.files['profilePhoto']) {
  user.profilePhoto = req.files['profilePhoto'][0].path;
}
if (req.files['nationalCardPhoto']) {
  user.nationalCardPhoto = req.files['nationalCardPhoto'][0].path;
}
if (req.files['faceVideo']) {
  user.faceVideo = req.files['faceVideo'][0].path;
}

user.isVerified = false;
await user.save();

res.json({ message: 'Files uploaded successfully', user });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Upload failed', error: err });
}
});

module.exports = router;

