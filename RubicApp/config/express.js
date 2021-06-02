const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const auth = require("../middlewares/auth")

module.exports = (app) => {
    app.engine("hbs", handlebars({extname: ".hbs"}));
    app.set("view engine", "hbs");

    app.use(bodyParser.urlencoded({extended: false}));

    app.use("/static", express.static("public"));

    app.use(cookieParser());

    app.use(auth);
}
