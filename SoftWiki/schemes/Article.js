const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    creationDate: {
        type: Date,
    }
})

module.exports = mongoose.model("Article", articleSchema);