const { Router } = require("express");
const router = Router();

const playServices = require("../services/playService");

router.get("/", async (req, res) => {
    try {
        let data;
        if(res.locals.user){
            data = await playServices.getAll(res.locals.user._id);
        } else {
            data = await playServices.getAll();
        }
        res.render("home/home", { title: "Home Page", data});
    } catch (err) {
        console.log(err)
    }
})

router.get("/about", (req, res) => {
    res.send("About");
})

module.exports = router;