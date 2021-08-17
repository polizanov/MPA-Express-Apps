const User = require("../schemes/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SALT_ROUNDS, JWT_LOGIN_SECRET } = require("../config");


async function register(registerData) {
    if (registerData.username == "" || registerData.password == "") {
        throw { message: "All fields are requred", data: registerData }
    }

    if (registerData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!" , data: registerData }
    }


    if (registerData.password.length < 8) {
        throw { message: "Password should be at least 8 characters long" , data: registerData }
    }

    if (registerData.rePass !== registerData.password) {
        throw { message: "Password and Repeat Password must be identical!" , data: registerData }
    }

    let user = await User.findOne({ username: registerData.username });

    if (user) {
        throw { message: "This username exist" , data: registerData }
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(registerData.password.trim(), salt);
    const userObj = new User({username: registerData.username.trim(), password: hash});
    return userObj.save()
}

async function login(loginData){
    if (loginData.username == "" || loginData.password == "") {
        throw { message: "All fields are requred", data: loginData }
    }

    if (loginData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!", data: loginData }
    }


    if (loginData.password.length < 8) {
        throw { message: "Password should be at least 8 characters long", data: loginData }
    }

    let user = await User.findOne({ username: loginData.username });

    if (!user) {
        throw { message: "Incorect username and password!", data: loginData }
    }

    const match = await bcrypt.compare(loginData.password.trim(), user.password)

    if(!match){
        throw { message: "Incorect username and password!", data: loginData }
    } 
    return jwt.sign({"_id": user._id, username: user.username}, JWT_LOGIN_SECRET);
}

async function findUserWithId(id){
    return User.findOne({ _id: id });
}

module.exports = {
    register,
    login,
    findUserWithId,
}