const express = require("express")
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser")


module.exports = (app) => {
    app.engine('hbs', handlebars({ extname: ".hbs" }));
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: false }));

    app.use("/static", express.static("public"));

    app.use(cookieParser())

}

