const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const User = new Schema({
    id: String,
    account: String,
    password: String,
    idRole: String,
    balance: Number
});

module.exports = mongoose.model('User', User);