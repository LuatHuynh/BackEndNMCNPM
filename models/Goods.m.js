const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Good = new Schema({
  id: String,
  name: String,
  type: String,
  price: Number
});

module.exports = mongoose.model('Good', Good);