const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toolsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    available: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // borrower: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: { type: String, required: true },
    // status: { type: String, enum: ["shared", "borrowed"], default: "shared" }, // New field
  },
  { timestamps: true },
  { collection: "tools" }
);
module.exports = mongoose.model("Tools", toolsSchema);
