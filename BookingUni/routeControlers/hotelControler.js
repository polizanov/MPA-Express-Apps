const { Router } = require("express");
const router = Router();

const hotelService = require("../services/hotelServices")

router.get("/create", (req, res) => {
    res.render("crud/create", { title: "Create" })
})

router.post("/create", async (req, res) => {
    console.log(res.locals.user._id)
    try {
        await hotelService.create(req.body, res.locals.user._id)
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.render("crud/create", { title: "Create", err})
    }
})

router.get("/details/:hotelId", (req, res) => {
    console.log(req.params.hotelId)
    res.redirect("/")
})

module.exports = router;