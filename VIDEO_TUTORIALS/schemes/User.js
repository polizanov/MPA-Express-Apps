const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z\d]+$/,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    enrolledCources: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cource'
    }]
})

module.exports = mongoose.model("User", userSchema);