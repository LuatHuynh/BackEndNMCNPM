const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testQLCT');
        console.log("connect successful");
    } catch (error) {
        console.log("connect fail");
    }
}

module.exports = {connect};