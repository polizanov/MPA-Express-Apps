const { Router } = require("express");
const moment = require("moment");
const router = Router();

const courceService = require("../services/courceService")

router.get("/", (req, res, next) => {
    if (res.locals.isAuthenticated) {
        if(req.query.search){
            courceService.searchCource(res.locals.user._id, req.query.search)
            .then(cources => {
                cources = cources.map(x => Object.assign(x, { createdAt: moment().format('MMMM Do YYYY') }));
                res.render("home/home", { title: "Home Page", cources });
            })
            .catch(next);
        } else {
            courceService.getAllCourcesForUsers(res.locals.user._id)
            .then(cources => {
                cources = cources.map(x => Object.assign(x, { createdAt: moment().format('MMMM Do YYYY') }));
                res.render("home/home", { title: "Home Page", cources });
            })
            .catch(next);
        }
        
    } else {
        courceService.getTopThree()
            .then(cources => {
                cources = cources
                    .map(x => Object.assign(x, { createdAt: moment().format('MMMM Do YYYY') }))
                    .sort((a, b) => b.usersEnroled.length - a.usersEnroled.length)
                    .slice(0, 4)
    
                console.log(cources)
                res.render("home/home", { title: "Home Page", cources });
            })
            .catch(err => console.log(err));
        
    }



})

router.get("/about", (req, res) => {
    res.send("About");
})

module.exports = router;