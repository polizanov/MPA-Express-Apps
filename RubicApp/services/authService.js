const User = require("../models/schemes/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SALT_REGISTER, SECRET_JWT } = require("../config/start").dev;
let LETTERS_AND_DIGITS_PATTERN = /^[a-zA-Z\d]+$/;

async function register(userData) {
    if (userData.username == "" || userData.password == "") {
        throw { message: "All fields are requred", data: userData };
    }

    if (userData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!", data: userData };
    }

    if (!LETTERS_AND_DIGITS_PATTERN.test(userData.username)) {
        throw { message: "Username and Password should consist only with English letters and digits!", data: userData };
    }

    if (!LETTERS_AND_DIGITS_PATTERN.test(userData.password)) {
        throw { message: "Username and Password should consist only with English letters and digits!", data: userData };
    }

    if (userData.password.length < 8) {
        throw { message: "Password should be at least 8 characters long", data: userData };
    }

    if (userData.repeatPassword !== userData.password) {
        throw { message: "Password and Repeat Password must be identical!", data: userData };
    }

    let user = await User.findOne({ username: userData.username });

    if (user) {
        throw { message: "This username exist", data: userData };
    }


    const salt = await bcrypt.genSaltSync(SALT_REGISTER);
    const passwordHash = await bcrypt.hashSync(userData.password, salt);
    let userObj = new User({ username: userData.username, password: passwordHash });
    return userObj.save();
}

async function login(userData) {
    if (userData.username == "" || userData.password == "") {
        throw { message: "All fields are requred", data: userData };
    }

    if (userData.username.length < 5) {
        throw { message: "Username should be at least 5 characters long!", data: userData };
    }


    let user = await User.findOne({ username: userData.username });

    if (!user) {
        throw { message: "Invalid username or password", data: userData };
    }

    const match = await bcrypt.compare(userData.password, user.password);

    if (match) {
        return jwt.sign({ "_id": user._id, user: user.username }, SECRET_JWT);
    } else {
        throw { message: "Invalid username or password", data: userData };
    }

}

module.exports = {
    register,
    login
}