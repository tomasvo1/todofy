const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'Member'
    }
});

module.exports = User = mongoose.model('User', UserSchema);