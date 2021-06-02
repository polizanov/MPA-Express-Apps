const { Router } = require("express");
const router = Router();

const courceService = require("../services/courceService")

router.get("/create", (req, res) => {
    res.render('cource/create', { title: "Create Cource" });
})

router.post("/create", async (req, res) => {
    try {
        await courceService.create(req.body, res.locals.user._id);
        res.redirect("/");
    } catch (err) {
        res.render('cource/create', { title: "Create Cource", err })
    }
})

router.get("/details/:courceId", async (req, res, next) => {
    try {
        let data = await courceService.getOneById(req.params.courceId, res.locals.user._id);
        res.render("cource/details", { title: "Details", data });
    } catch (err) {
        next()
    }
})

router.get("/enroll/:courceId", async (req, res, next) => {
    console.log(res.locals.user._id);
    try {
        await courceService.enrollUser(req.params.courceId, res.locals.user._id)
        res.redirect(`/course/details/${req.params.courceId}`);
    } catch (err) {
        next()
    }
})

router.get("/delete/:courceId", async (req, res, next) => {
    try {
        await courceService.deleteCource(req.params.courceId);
        res.redirect("/");
    } catch (err) {
        next();
    }
})

router.get("/update/:courceId", async (req, res) => {
    try {
        let data = await courceService.getOneById(req.params.courceId, res.locals.user._id);
        res.render("cource/edit", {title: "Edit", data});
    } catch (err) {
        res.render("cource/edit", { err })
    }
})

router.post("/update/:courceId", async (req, res) => {
    try {
       console.log(req.body);
       await courceService.update(req.body, req.params.courceId)
       res.redirect(`/course/details/${req.params.courceId}`)
    } catch (err) {
        res.render("cource/edit", { err })
    }
})


module.exports = router;