const { Router } = require("express");
const router = Router();
const { register, login } = require("../../services/authService");
const { USER_SESSION } = require("../start").dev
require("body-parser");

const forAutheticated = require("../../middlewares/authenticated");
const forGuest = require("../../middlewares/guest");

router.get("/login", forGuest, (req, res) => {
    res.render("login");
})

router.post("/login", forGuest, async (req, res) => {
    try {
        let token = await login(req.body);
        res.cookie(USER_SESSION, token);
    } catch (err) {
        res.render("login", { err })
        return;
    }
    res.redirect("/");
})

router.get("/register", forGuest, (req, res) => {
    res.render("register");
})

router.post("/register", forGuest, async (req, res) => {
    try {
        await register(req.body)
    } catch (err) {
        res.render("register", { err })
        return;
    }
    res.redirect("/auth/login");
})

router.get("/logout", forAutheticated, (req, res) => {
    res.clearCookie(USER_SESSION);
    res.locals.user = {};
    res.locals.isAuthenticated = false;
    res.redirect("/");
})

module.exports = router;