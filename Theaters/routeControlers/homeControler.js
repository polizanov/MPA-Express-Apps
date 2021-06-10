const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    try {
        res.render("home/home", { title: "Home Page" });
    } catch (err) {
        console.log(err)
    }
})

router.get("/about", (req, res) => {
    res.send("About");
})

module.exports = router;