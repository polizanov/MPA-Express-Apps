const User = require("../schemes/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SALT_ROUNDS, JWT_LOGIN_SECRET, LETTERS_AND_DIGITS_PATTERN } = require("../config");


async function register(registerData) {
    if (registerData.email == "" || registerData.username == "" || registerData.password == "") {
        throw { message: "All fields are requred" }
    }

    if (registerData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!" }
    }

    if(!LETTERS_AND_DIGITS_PATTERN.test(registerData.email)){
        throw { message: "Email should consist only with English letters and digits!" }
    }

    if (registerData.password.length < 5 || !LETTERS_AND_DIGITS_PATTERN.test(registerData.password)) {
        throw { message: "Password should be at least 5 characters long, and consist only with English letters and digits!" }
    }

    if (registerData.rePassword !== registerData.password) {
        throw { message: "Password and Repeat Password must be identical!" }
    }

    let user = await User.findOne({ username: registerData.username });

    if (user) {
        throw { message: "This username exist" }
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(registerData.password.trim(), salt);
    const userObj = new User({ email: registerData.email.trim(), username: registerData.username.trim(), password: hash});
    return userObj.save()
}

async function login(loginData){
    if (loginData.username == "" || loginData.password == "") {
        throw { message: "All fields are requred" }
    }

    if (loginData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!" }
    }


    if (loginData.password.length < 5 || !LETTERS_AND_DIGITS_PATTERN.test(loginData.password)) {
        throw { message: "Password should be at least 5 characters long, and consist only with English letters and digits!" }
    }

    let user = await User.findOne({ username: loginData.username });

    if (!user) {
        throw { message: "Incorect username and password!" }
    }

    const match = bcrypt.compare(loginData.password.trim(), user.password)

    if(!match){
        throw { message: "Incorect username and password!" }
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