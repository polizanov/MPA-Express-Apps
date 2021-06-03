const { Router } = require("express");
const router = Router();

const isAuth = require("../middlewares/isAuth");

const articleService = require("../services/articleService")

router.get("/all", async (req, res, next) => {
    try {
        let data = await articleService.getAll();
        res.render("article/allArticles", { title: "All Articles", data});
    } catch (err){
        next();
    }
})

router.get("/create", isAuth, (req, res) => {
    res.render("article/create", { title: "Create Article" });
})

router.post("/create", isAuth, async (req, res) => {
    try {
        await articleService.create(req.body, res.locals.user._id);
        res.redirect("/")
    } catch (err) {
        res.render("article/create", { title: "Create Article", err })
    }
})

router.get("/details/:articleId", async (req, res, next) => {
    try {
        let data;
        if (!res.locals.user) {
            data = await articleService.getArticleById(req.params.articleId)
        } else {
            data = await articleService.getArticleById(req.params.articleId, res.locals.user._id)
        }
        res.render("article/details", { title: "Details", data })
    } catch {
        next();
    }
})

router.get("/edit/:articleId", isAuth, async (req, res, next) => {
    try {
        let data = await articleService.getArticleForEdit(req.params.articleId)
        res.render("article/edit", { title: "Edit", data })
    } catch (err){
        next();
    }
})

router.post("/edit/:articleId", isAuth, async (req, res) => {
    try {
        await articleService.editArticle(req.params.articleId, req.body);
        res.redirect(`/article/details/${req.params.articleId}`);
    } catch (err){
        res.render("article/edit", { title: "Edit", err })
    }
})

router.get("/delete/:articleId", isAuth, async (req, res, next) => {
    try {
        await articleService.deleteArticle(req.params.articleId);
        res.redirect(`/`);
    } catch {
        next()
    }
})

module.exports = router;