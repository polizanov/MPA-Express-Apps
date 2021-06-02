const mongoose = require('mongoose');

const courceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /https?/
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    usersEnroled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model("Cource", courceSchema);