const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("home/home", { title: "Home Page" });
})

router.get("/about", (req, res) => {
    res.send("About");
})

module.exports = router;