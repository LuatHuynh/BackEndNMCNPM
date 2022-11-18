const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const OnSell = new Schema({
  id: String,
  quantity: Number
});

module.exports = mongoose.model('Onsell', OnSell);