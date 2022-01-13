const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientPhone: {
    type: Number,
    default: "",
    trim: true,
  },
  clientOrganization: {
    type: String,
    default: "",
    trim: true,
  },
  selectedProducts: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  userName: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  invoiceNo: {
    type: Number,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
