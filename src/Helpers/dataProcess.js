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
module.exports.validatePassword = async(passwordLogin, hashedPasswordInDatabase) =>{
    const checkPassword = await bcrypt.compare(passwordLogin, hashedPasswordInDatabase);
    if(checkPassword) return true;
    return false;
}

//generate Token
module.exports.GenerateToken = (payload, secret, expire = '30d')=> {
    const token = jwt.sign({...payload}, secret, {expiresIn: expire});
    return token;
}

//format ID
module.exports.FormatID = (_id) => {

    
}

//format data
module.exports.formatData = (data)=>{
    if(data) {
        return { ...data };
    }
    throw new Error('Data Not found!');
}
