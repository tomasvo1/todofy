const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    todo_priority: { 
        type: String
    },
    todo_board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        //required: true
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);