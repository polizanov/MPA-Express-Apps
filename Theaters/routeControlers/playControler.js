const { Router } = require("express");
const router = Router();

const playService = require("../services/playService")

router.get("/create", (req, res, next) => {
    try {
        res.render("play/create", { title: "Create" });
    } catch {
        next()
    }
})

router.post("/create", async (req, res) => {
    try {
        await playService.create(req.body, res.locals.user._id)
        res.redirect("/");
    } catch (err) {
        res.render("play/create", { title: "Create", err })
    }
})

router.get("/details/:playId", async (req, res, next) => {
    try {
        let data = await playService.getById(req.params.playId, res.locals.user._id);
        res.render("play/details", { title: "Details", data });
    } catch (err){
        next();
    }
})

router.get("/edit/:playId", async (req, res, next) => {
    try {
        let data = await playService.getById(req.params.playId, res.locals.user._id);
        res.render("play/edit", { title: "Edit", data });
    } catch (err){
        next();
    }
})

router.post("/edit/:playId", async (req, res) => {
    try {
        await playService.edit(req.params.playId, req.body)
        res.redirect(`/play/details/${req.params.playId}`);
    } catch (err) {
        res.render("play/edit", { title: "Create", err })
    }
})

router.get("/delete/:playId", async (req, res, next) => {
    try {
        await playService.deleteTeather(req.params.playId);
        res.redirect("/");
    } catch (err) {
        next();
    }
})

router.get("/like/:playId", async (req, res, next) => {
    try {
        await playService.like(req.params.playId, res.locals.user._id);
        res.redirect(`/play/details/${req.params.playId}`);
    } catch (err) {
        next();
    }
})

module.exports = router;