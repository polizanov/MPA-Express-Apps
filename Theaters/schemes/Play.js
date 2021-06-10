const mongoose = require("mongoose");

const playSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 1,
    },
    imageUrl: {
        type: String,
        required: true,
        minLength: 1,
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
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Play", playSchema);