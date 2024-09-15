const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    City: { type: String, required: true },
    StreetName: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
