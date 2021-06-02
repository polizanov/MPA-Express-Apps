const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z\d]+$/,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
})

module.exports = mongoose.model("User", userSchema)