const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const parser = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: "Medik+/profile",
  allowedFormats: ["jpg", "png"],
  trasnformation: [{ width: 150, height: 150 }],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
