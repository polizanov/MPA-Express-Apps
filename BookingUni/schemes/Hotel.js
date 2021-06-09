const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
    },
    city: {
        type: String,
        required: true,
        minLength: 3,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /https?/
    },
    freeRooms: {
        type: Number,
        required: function () {
            return this.freeRooms >= 1 && this.freeRooms <= 100;
        }
    },
    usersBooked: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    ownerId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Hotel", hotelSchema)