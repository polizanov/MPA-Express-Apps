const { Router } = require("express");
const router = Router();

const hotelService = require("../services/hotelServices")

router.get("/", async (req, res, next) => {
    try {
        let data = await hotelService.getAll();
        res.render("home/home", { title: "Home Page", data });
    } catch {
        next();
    }
})


module.exports = router;