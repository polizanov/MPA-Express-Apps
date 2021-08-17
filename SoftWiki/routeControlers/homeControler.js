const { Router } = require("express");
const router = Router();

const articleService = require("../services/articleService")

router.get("/", async (req, res, next) => {
    try {
        let data = await articleService.getLeastThree();
        res.render("home/home", { title: "Home Page", data });
    } catch (err){
        next();
    }
})

module.exports = router;