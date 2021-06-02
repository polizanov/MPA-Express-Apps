const { Router } = require("express");
const router = Router();


const { findOne, attachAccessory } = require("../../services/cubeService.js")
const { getAll, create } = require("../../services/accessoryService.js");
const forAutheticated = require("../../middlewares/authenticated");

router.get("/create", forAutheticated, (req, res) => {
    res.render("createAccessory", { title: "Create accessory" });
})

router.post("/create", forAutheticated, async (req, res) => {
    try {
        await create(req.body);
    } catch (err) {
        return res.render("createAccessory", { err });
    }
    res.redirect("/");
})

router.get("/attach/:id", forAutheticated, async (req, res) => {
    try {
        let cubeDetails = await findOne(req.params.id);
        let accessoryArr = await getAll(cubeDetails.accessories);
        res.render("attachAccessory", { title: "Attach a new accessory", cubeDetails, accessoryArr });
    } catch (err) {
        res.status(500)
    }
})

router.post("/attach/:id", forAutheticated, async (req, res) => {
    try {
        await attachAccessory(req.params.id, req.body.accessory);
        res.redirect("/details/" + req.params.id)
    } catch (err) {
        res.status(500)
    }

})

module.exports = router;
