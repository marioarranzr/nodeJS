const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Email is mandatory']
    },
    pasword: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    img: {
        type: String
    },
    role: {
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', userSchema);