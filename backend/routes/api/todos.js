const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Todo = require('../../schemes/todo.model');

router.get('/', function (req, res) {
    /* Todo.find({})
        .populate('todo_responsible')
        .exec(function (err, todos) {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
            }
        }); */

    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

router.post('/add', function (req, res) {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

router.post('/update/:id', function (req, res) {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send("data is not found");
        }
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
        }
        todo.save().then(todo => {
            res.json('Todo updated!');
        }).catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

router.delete('/:id', function (req, res) {
    Todo.deleteOne({ _id: req.params.id }, function (err, todo) {
        if (err) {
            res.json({ error: err });
        }
        res.json({ message: 'Successfully deleted' });
    })
});

module.exports = router;