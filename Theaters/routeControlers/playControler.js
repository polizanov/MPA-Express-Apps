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
        console.log(res.locals.user._id)
        await playService.create(req.body, res.locals.user._id)
        res.redirect("/");
    } catch (err) {
        res.render("play/create", { title: "Create", err })
    }
})

module.exports = router;