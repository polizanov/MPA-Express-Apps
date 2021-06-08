const { Router } = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler");
const hotelControler = require("./routeControlers/hotelControler");

const isAuth = require("./middlewares/isAuth")

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.use("/hotel", isAuth, hotelControler);
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;