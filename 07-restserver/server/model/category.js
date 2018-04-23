const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is mandatory']
    },
    description: {
        type: String
    },
    user: {
        // necessary to obtain the User object
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Category', categorySchema);