const { Router } = require("express");
const { LOGIN_COOKIE_NAME } = require("../config")
const router = Router();

const authService = require("../services/authService");

const isGuest = require("../middlewares/isGuest");
const isAuth = require("../middlewares/isAuth");

router.get("/register", isGuest, (req, res) => {
    res.render("auth/register", { title: "Register" })
})

router.post("/register", isGuest, async (req, res) => {
    try {
        await authService.register(req.body);
        res.redirect("/auth/login");
    } catch (err) {
        console.log(err)
        res.render("auth/register", { title: "Register", err });
    }
})

router.get("/login", isGuest, (req, res) => {
    res.render("auth/login", { title: "Login" })
})

router.post("/login", isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(LOGIN_COOKIE_NAME, token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        res.render("auth/login", { title: "Login", err })
    }
})

router.get("/logout", isAuth, (req, res) => {
    res.clearCookie(LOGIN_COOKIE_NAME);
    res.locals.user = "";
    res.locals.isAuthenticated = false;
    res.redirect("/")
})

module.exports = router;