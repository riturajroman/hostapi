const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field is Required'],
        unique: true
    },
    team: {
        type: String,
        required: [true, 'This field is Required'],
    },
    role: {
        type: String,
        required: [true, 'This field is Required'],
    },
    age: {
        type: Number,
        required: [true, 'This field is Required'],
    }
});

const user = mongoose.model('User', usersSchema);

module.exports = user;