const { Router } = require("express");
const router = Router();
require("body-parser");


const {
    create,
    findOneWithAccesssories,
    getAll,
    findOne,
    editCube,
    deleteCube
} = require("../../services/cubeService.js");
const forAutheticated = require("../../middlewares/authenticated");

router.get("/", async (req, res) => {
    try {
        let data = await getAll({})
        res.render("home", { title: "Home page", data })
    } catch (err) {
        res.status(500)
    }
})

router.get("/about", (req, res) => {
    res.render("about", { title: "About page" })
})

router.get("/create", forAutheticated, (req, res) => {
    res.render("create", { title: "Create page" })
})

router.post("/create", forAutheticated, async (req, res) => {
    try {
        await create(req.body, req.user._id);
    } catch (err) {
        return res.render("create", { err });
    }
    res.redirect("/");
})

router.get("/edit/:id", forAutheticated, async (req, res) => {
    try {
        let detailsData = await findOne(req.params.id);
        res.render("editCube", { title: "Edit Cube", detailsData})
    } catch (err) {
        return res.render("editCube", { err });
    }
})

router.post("/edit/:id", forAutheticated, (req, res) => {
    try {
        editCube(req.params.id, req.body);
    } catch (err) {
        return res.render("editCube", { err });
    }
    res.redirect(`/details/${req.params.id}`)
})

router.get("/delete/:id", forAutheticated, async (req, res) => {
    try {
        let deleteData = await findOne(req.params.id);
        res.render("deleteCube", { title: "Delete Cube", deleteData })
    } catch (err) {
        return res.render("deleteCube", { err })
    }

})

router.post("/delete/:id", forAutheticated, (req, res) => {
    try {
        deleteCube(req.params.id);
    } catch (err) {
        return res.redirect("/");
    }
    return res.redirect("/");
})

router.get("/details/:id", async (req, res) => {
    try {
        let isAuthorised;
        detailsData = await findOneWithAccesssories(req.params.id);
        if (!res.locals.user) {
            isAuthorised = false;
        } else {
            isAuthorised = res.locals.user._id == detailsData.userId
        }

        res.render("updatedDetailsPage", { title: "Details page", detailsData: detailsData, isAuthorised })
    } catch (err) {
        res.status(500)
    }
})

router.post("/search", async (req, res) => {
    let info = req.body;
    try {
        let data = await getAll({
            search: info.search,
            from: info.from,
            to: info.to,
        })
        res.render("home", { title: "Home page", data });
    } catch (err) {
        res.status(500)
    }
})

module.exports = router;