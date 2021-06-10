const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        validate: /^[a-zA-Z\d]+$/,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema);