const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z\d@\.]+$/
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    bookedHotels: [{
        type: mongoose.Types.ObjectId,
        ref: "Hotel"
    }],
    offeredHotels: [{
        type: mongoose.Types.ObjectId,
        ref: "Hotel"
    }]
})

module.exports = mongoose.model("User", userSchema);