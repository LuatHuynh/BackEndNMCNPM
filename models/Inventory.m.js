const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Inventory = new Schema({
    idGood: String,
    quantity: Number
});

module.exports = mongoose.model('Inventory', Inventory);