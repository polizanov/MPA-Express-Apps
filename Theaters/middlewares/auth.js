const { LOGIN_COOKIE_NAME, JWT_LOGIN_SECRET } = require("../config");
const { findUserWithId } = require("../services/authService");
const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
    let token = req.cookies[LOGIN_COOKIE_NAME];

    if (token) {
        try {
            await check(token);
        } catch (err) {
            res.clearCookie(LOGIN_COOKIE_NAME);
            res.locals.user = "";
            res.locals.isAuthenticated = false;
        }
    }

    next()

    async function check(token) {
        let decoded = jwt.verify(token, JWT_LOGIN_SECRET)
        let isFind = await findUserWithId(decoded._id);
    
        if (isFind) {
            res.locals.user = decoded;
            res.locals.isAuthenticated = true;
        } else {
            throw error("Invalid User");
        }
    
    }
}

