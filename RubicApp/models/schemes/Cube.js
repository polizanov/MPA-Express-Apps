const mongoose = require("mongoose");

let cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9 ]+$/,
        mixLength: 5,
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
        validate: /^[a-zA-Z0-9 ]+$/,
        mixLength: 20,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /https?/,
    }, 
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    }, 
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],
    userId: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Cube', cubeSchema);