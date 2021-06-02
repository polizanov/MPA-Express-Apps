const mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9 ]+$/,
        minLength: 5,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /https?/,
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 20,
        validate: /^[a-zA-Z0-9 ]+$/,

    }
})

module.exports = mongoose.model("Accessory", accessorySchema);