const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
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