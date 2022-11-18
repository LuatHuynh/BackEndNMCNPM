const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Role = new Schema({
    idRole: String,
    role: String,
    idPermission: String
});

module.exports = mongoose.model('User', Role);