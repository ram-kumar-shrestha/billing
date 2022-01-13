const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  rate: {
    type: Number,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
    default: "",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
