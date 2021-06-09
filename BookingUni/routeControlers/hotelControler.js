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
        res.render("crud/create", { title: "Create", err })
    }
})

router.get("/details/:hotelId", async (req, res, next) => {
    try {
        let data = await hotelService.getHotelById(req.params.hotelId, res.locals.user._id);
        res.render("crud/details", { title: "Details", data })
    } catch {
        next();
    }
})

router.get("/delete/:hotelId", async (req, res, next) => {
    try {
        await hotelService.deleteHotel(req.params.hotelId);
    } catch {
        next()
    }
})

module.exports = router;