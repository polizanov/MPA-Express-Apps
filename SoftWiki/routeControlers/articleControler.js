const { Router } = require("express");
const router = Router();

const isGuest = require("../middlewares/isGuest");
const isAuth = require("../middlewares/isAuth");

router.get("/all", (req, res) => {
    res.render("article/allArticles", { title: "All Articles" });
})

router.get("/create", isAuth, (req, res) => {
    res.render("article/create", { title: "Create Article" });
})

router.post("/create", isAuth, (req, res) => {
    console.log(req.body)
    res.redirect("/")
})

router.get("/details/articleId", (req, res) => {
    console.log(req.params.articleId)
    res.render("article/details", { title: "Details" })
})

module.exports = router;