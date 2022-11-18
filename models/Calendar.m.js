const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Calendar = new Schema({
    idGood: String,
    day: String,
    quantity: Number
});

module.exports = mongoose.model('Calendar', Calendar);