const { Router } = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler");
const playControler = require("./routeControlers/playControler");

const isAuth = require("./middlewares/isAuth");

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.use("/play", isAuth, playControler);
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;