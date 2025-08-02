const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  inStock: { type: Boolean, default: true },
  tags: [String]
});

// The error was here. Corrected to use mongoose.model()
module.exports = mongoose.model("Product", ProductSchema);