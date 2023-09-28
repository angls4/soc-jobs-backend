const multer = require('multer');
const path = require('path');

// Define storage settings for avatar and CV uploads
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/avatar'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/cv'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer with the storage configurations
const uploadAvatar = multer({ storage: avatarStorage });
const uploadCV = multer({ storage: cvStorage });

module.exports = { uploadAvatar, uploadCV };
