const {status,expire} = require('../Constant');
const {userRepository, roleRepository} = require('./../Database');

const {
    genarateSalt,
    validatePassword,
    createHashPassword,
    GenerateToken,
    formatData
} = require('./../Helpers');

const {
    ACCESS_TOKEN
} = require('./../Config')

const authService = {
    register: async(username, email, password, role = 'user') => {
        try{
            const user = userRepository.FindUserByEmail(email);
            if(user){//Neu ton tai thi tra ve
                // throw new Error('Email has existed',{
                //     cause: status.NOT_FOUND
                // })
            }
            console.log(email)
            const salt = await genarateSalt();
            console.log(password);
            const passwordHashed = await createHashPassword(password,salt);
            console.log(passwordHashed);
            let _role = await roleRepository.GetRoleIdByRoleName(role);
            
            const newUser = await userRepository.CreateUser({
                username: username,
                email: email,
                password: passwordHashed,
                role: _role._id
            });

            return formatData({newUser});
        } catch(err) {
            throw err;
        }
    },
    login: async(email,password) => {
        try{
            const user = await userRepository.FindUserByEmail(email);
            if(!user){//Neu khong ton tai thi tra ve
                // throw new Error('User not exist',{
                //     cause: status.NOT_FOUND
                // })
            }
            console.log(user);
            // check password
            const validPassword = await validatePassword(password,user.password);
            if(!validPassword) {
                // throw new Error('incorrect password', {
                //     cause: status.BAD_REQUEST
                // });
            }
            // update sate user
            userRepository.UpdateSateUserById(user._id,true);
            user.status = true;

            // get data into token
            const {password: _password, ...payload} = user._doc;

            //create token
            const token = GenerateToken(payload, ACCESS_TOKEN, expire.ACCESS_TOKEN_EXPIRE);
            return formatData({payload, accessToken: token});
        } catch (err) {
            throw err;
        }
    }
}

module.exports = authService;