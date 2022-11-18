const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Permission = new Schema({
    idPermission: String,
    action: String,
    url: String
});

module.exports = mongoose.model('Permission', Permission);