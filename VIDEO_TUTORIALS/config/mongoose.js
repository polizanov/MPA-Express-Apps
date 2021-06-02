const mongoose = require('mongoose');
const { DB_LINK } = require("./index")

module.exports = () => {
    mongoose.connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log("DB CONNECTED!"));
}

