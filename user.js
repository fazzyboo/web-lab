const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', users);

module.exports = User;