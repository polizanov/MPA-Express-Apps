const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
    },
    articles: [{
        type: mongoose.Types.ObjectId,
        ref: "Article"
    }]
})

module.exports = mongoose.model("User", userSchema);