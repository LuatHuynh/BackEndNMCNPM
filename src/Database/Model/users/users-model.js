const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        name: String,
        required: true,
    },
    password: String,

    property:Number,

    roleID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role",
        },
    ],
});

module.exports = model('user',User);