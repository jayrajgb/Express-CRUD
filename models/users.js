const mongoose = require('mongoose');

// Scheme
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

// Model
const User = mongoose.model('user', userSchema); // user is our collection name

module.exports = User;