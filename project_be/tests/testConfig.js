const mongoose = require("mongoose");
const connectDB = require("../config/db");

const connectTestDB = async () => {
  await connectDB();
};

const closeTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports = { connectTestDB, closeTestDB };