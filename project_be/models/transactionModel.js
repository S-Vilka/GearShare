const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tool_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tool",
    required: true,
  },
  transaction_type: { type: String, enum: ["borrow", "share"], required: true },
  transaction_date: { type: Date, default: Date.now },
  return_date: Date,
});

module.exports = mongoose.model("Transaction", transactionSchema);
