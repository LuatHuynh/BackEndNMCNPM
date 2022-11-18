const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Import = new Schema({
    idGood: String,
    time: Date,
    quantity: Number,
    source: String,
    type: String
});

module.exports = mongoose.model('Import', Import);