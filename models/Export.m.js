const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Export = new Schema({
    idGood: String,
    time: Date,
    quantity: Number
});

module.exports = mongoose.model('Export', Export);