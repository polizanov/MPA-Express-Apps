const { Router } = require("express");
let router = Router();

const homeRoute = require("./config/routes/homeRoute.js");
const accessoryRoute = require("./config/routes/accessoryRoute.js");
const authRoute = require("./config/routes/authRoute.js");

router.use("/", homeRoute);
router.use("/auth", authRoute);
router.use("/accessories", accessoryRoute);

module.exports = router;