const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is mandatory']
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
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

// delete password in the returned JSON object
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: 'The attribute {PATH} must be unique' });

module.exports = mongoose.model('user', userSchema);