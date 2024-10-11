const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination function called");
    cb(null, path.join(__dirname, "..", "public", "profileImages"));
  },
  filename: function (req, file, cb) {
    console.log("Filename function called");
    console.log("Original filename:", file.originalname);
    const fileExtension = path.extname(file.originalname);
    console.log("File extension:", fileExtension);
    const newFilename = `${Date.now()}${fileExtension}`;
    console.log("New filename:", newFilename);
    cb(null, newFilename);
  },
});

const uploadProfile = multer({ storage: storage });

module.exports = uploadProfile;
