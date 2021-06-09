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

router.get("/edit/:hotelId", async (req, res, next) => {
    try {
        let data = await hotelService.getHotelById(req.params.hotelId);
        res.render("crud/edit", { title: "Edit", data });
    } catch {
        next()
    }
})

router.post("/edit/:hotelId", async (req, res) => {
    try {
        await hotelService.editHotel(req.body, req.params.hotelId)
        res.redirect(`/hotel/details/${req.params.hotelId}`);
    } catch (err) {
        console.log(err)
        res.render("crud/edit", { title: "Edit", err })
    }
})

router.get("/delete/:hotelId", async (req, res, next) => {
    try {
        await hotelService.deleteHotel(req.params.hotelId);
        res.redirect("/");
    } catch {
        next()
    }
})

router.get("/book/:hotelId", async (req, res, next) => {
    try {
        await hotelService.bookHotel(res.locals.user._id, req.params.hotelId);
        res.redirect(`/hotel/details/${req.params.hotelId}`);
    } catch (err) {
        next();
    }
})

router.get("/profile/:profileId", async (req, res, next) => {
    try {
        let data = await hotelService.getProfile(res.locals.user._id);
        res.render("home/profile", {title: "Profile", data});
    } catch (err) {
        console.log(err);
        next()
    }
})

module.exports = router;