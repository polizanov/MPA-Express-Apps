const mongoose = require("mongoose");

const playSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
    },
    usersLiked: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Play", playSchema);