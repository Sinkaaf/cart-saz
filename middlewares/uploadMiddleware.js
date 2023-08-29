const path = require("path");
const fs = require("fs");

const multer = require("multer");
const sharp = require("sharp");


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl == "/category") {
      cb(null, 'uploads/images/category');
    } else if (req.originalUrl == "/product") {
      cb(null, 'uploads/images/product');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/ +/g, "_"));
  }
});

const fileFilter = async (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const clearFile = filePath => {
  filePath = path.join(__dirname, '..', 'uploads', filePath);
  fs.unlink(filePath, err => console.log(err));
};
const editorImage = (from, to) => {
  sharp(from)
    .resize(800)
    .toFile(to)
}
module.exports = {
  multer,
  fileStorage,
  fileFilter,
  clearFile,
  editorImage
}