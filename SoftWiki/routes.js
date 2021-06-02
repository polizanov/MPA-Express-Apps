const { Router } = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler")

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;