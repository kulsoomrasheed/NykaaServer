const { default: mongoose } = require("mongoose");

const dataSchema = new mongoose.Schema({
  featured: String,
  best: String,
  img: String,
  name: String,
  mrp: String,
  price: String,
  offer: String,
  gift: String,
  qty: String,
  shades: String,
  });
  
  const Products = mongoose.model('data', dataSchema);
  
  module.exports = {Products}