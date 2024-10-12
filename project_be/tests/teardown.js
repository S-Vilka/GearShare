const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.disconnect();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Give time for connections to close
};
