const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ACCESS_TOKEN} = require('../Config');

const salt = 10;// The number of rounds to secure the hash

//Genarate salt to hash
module.exports.genarateSalt = async() => {
    return await bcrypt.genSalt(salt);
}

//hashing password
module.exports.createHashPassword = async(password, saltGenarated) =>{
    return await bcrypt.hash(password,saltGenarated);
}

//compare password login with password in database
module.exports.validatePassword = async(passwordLogin, hashedPassword) =>{
    const checkPassword = await bcrypt.compare(passwordLogin, hashedPassword);
    if(checkPassword) return true;
    return false;
}
