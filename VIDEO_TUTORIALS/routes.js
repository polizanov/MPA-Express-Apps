const { Router } = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler");
const courceControler = require("./routeControlers/courceControler.js");

const isAuth = require("./middlewares/isAuth")

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.use("/course", isAuth, courceControler);
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;