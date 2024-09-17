require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error: Connecting to the database failed.");
    process.exit(1);
  }
};

module.exports = connectDB;



