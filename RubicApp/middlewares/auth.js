const { SALT_REGISTER, SECRET_JWT, USER_SESSION } = require("../config/start").dev;
const jwt = require("jsonwebtoken");
const User = require("../models/schemes/User");

module.exports = async (req, res, next) => {
    let token = req.cookies[USER_SESSION];
    if (token) {
        try {
            await validateUser(token)
        } catch (err) {
            res.clearCookie(USER_SESSION);
        }
    } 

    next()

    async function validateUser(token) {
        let decoded = jwt.verify(token, SECRET_JWT);
        let isFind = await User.findOne({ username: decoded.user });

        if (isFind) {
            req.user = decoded;
            res.locals.user = decoded;
            res.locals.isAuthenticated = true;
        } else {
            throw err("Invalid user");
        }
    }
}

