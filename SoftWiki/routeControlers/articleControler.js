const { Router } = require("express");
const router = Router();

const isGuest = require("../middlewares/isGuest");
const isAuth = require("../middlewares/isAuth");

const articleService = require("../services/articleService")

router.get("/all", (req, res) => {
    res.render("article/allArticles", { title: "All Articles" });
})

router.get("/create", isAuth, (req, res) => {
    res.render("article/create", { title: "Create Article" });
})

router.post("/create", isAuth, async (req, res) => {
    try {
        await articleService.create(req.body, res.locals.user._id);
        res.redirect("/")
    } catch(err) {
        res.render("article/create", { title: "Create Article", err})
    }
})

router.get("/details/:articleId", (req, res) => {
    console.log(req.params.articleId)
    res.render("article/details", { title: "Details" })
})

module.exports = router;