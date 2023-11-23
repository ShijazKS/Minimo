const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  reference: {
    type: String,
  },
  date: {
    type: String,
    required: [true, "date is required"],
  },
});

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
