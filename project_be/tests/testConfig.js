require("dotenv").config();
const mongoose = require("mongoose");

let testConnection;

const connectTestDB = async () => {
  if (testConnection) {
    return testConnection;
  }

  testConnection = await mongoose.createConnection(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to test database");
  return testConnection;
};

const closeTestDB = async () => {
  if (testConnection) {
    await testConnection.dropDatabase();
    await testConnection.close();
    testConnection = null;
  }
  await mongoose.disconnect();
};

module.exports = { connectTestDB, closeTestDB };
