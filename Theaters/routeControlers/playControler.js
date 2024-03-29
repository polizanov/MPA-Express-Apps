const { Router } = require("express");
const router = Router();

const playService = require("../services/playService");

router.get("/create", (req, res, next) => {
    try {
        res.render("play/create", { title: "Create" });
    } catch {
        next();
    }
})

router.post("/create", async (req, res) => {
    try {
        await playService.create(req.body, res.locals.user._id);
        res.redirect("/");
    } catch (err) {
        res.render("play/create", { title: "Create", err });
    }
})

router.get("/details/:playId", async (req, res, next) => {
    try {
        let data = await playService.getById(req.params.playId, res.locals.user._id);
        res.render("play/details", { title: "Details", data });
    } catch {
        next();
    }
})

router.get("/edit/:playId", async (req, res, next) => {
    try {
        let data = await playService.getById(req.params.playId, res.locals.user._id);
        res.render("play/edit", { title: "Edit", data });
    } catch {
        next();
    }
})

router.post("/edit/:playId", async (req, res) => {
    try {
        await playService.edit(req.params.playId, req.body, res.locals.user._id);
        res.redirect(`/play/details/${req.params.playId}`);
    } catch (err) {
        res.render("play/edit", { title: "Create", err, data: err.data });
    }
})

router.get("/delete/:playId", async (req, res, next) => {
    try {
        await playService.deleteTeather(req.params.playId, res.locals.user._id);
        res.redirect("/");
    } catch {
        next();
    }
})

router.get("/like/:playId", async (req, res, next) => {
    try {
        await playService.like(req.params.playId, res.locals.user._id);
        res.redirect(`/play/details/${req.params.playId}`);
    } catch  {
        next();
    }
})

router.get("/sortbylikes", async (req, res, next) => {
    try {
        let data = await playService.sortByLikes(res.locals.user._id, res.locals.isAuthenticated);
        res.render("home/home", { title: "Home", data });
    } catch {
        next();
    }
})

module.exports = router;