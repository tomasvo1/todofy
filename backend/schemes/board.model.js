const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo', 
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Board = mongoose.model('Board', BoardSchema);