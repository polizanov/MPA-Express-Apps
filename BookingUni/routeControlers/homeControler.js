const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("home/home", { title: "Home Page" });
})


module.exports = router;