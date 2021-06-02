const { Router } = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler");
const articleControler = require("./routeControlers/articleControler")

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.use("/article", articleControler)
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;