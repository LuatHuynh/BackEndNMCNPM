const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
  id: String,
  name: String,
  img: String,
  type: String,
  price: Number
});

module.exports = mongoose.model('Product', Product);