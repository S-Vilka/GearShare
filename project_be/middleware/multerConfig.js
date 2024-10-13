const multer = require("multer");
const path = require("path");

// Configure the storage settings for multer
const storage = multer.diskStorage({
  // Define the destination for uploaded files
  destination: function (req, file, cb) {
    console.log("Destination function called");
     // Set the destination directory for uploaded files
    cb(null, path.join(__dirname, "..", "public", "toolsImages"));
  },
   // Define the filename for uploaded files
  filename: function (req, file, cb) {
    console.log("Filename function called");
    console.log("Original filename:", file.originalname);
        // Extract the file extension from the original filename
    const fileExtension = path.extname(file.originalname);
    console.log("File extension:", fileExtension);
    // Create a new filename using the current timestamp and the original file extension
    const newFilename = `${Date.now()}${fileExtension}`;
    console.log("New filename:", newFilename);
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;