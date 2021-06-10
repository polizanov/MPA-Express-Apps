const { Router } = require("express");
const router = Router();

const playServices = require("../services/playService");

router.get("/", async (req, res, next) => {
    try {
        let data;
        if(res.locals.user){
            data = await playServices.getAll(res.locals.user._id, res.locals.isAuthenticated);
        } else {
            data = await playServices.getAllForGuest();
        }
        res.render("home/home", { title: "Home Page", data});
    } catch (err) {
        next()
        console.log(err)
    }
})

router.get("/about", (req, res) => {
    res.send("About");
})

module.exports = router;