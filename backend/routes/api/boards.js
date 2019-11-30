const express = require('express');
const router = express.Router();

const Board = require('../../schemes/Board.model');

router.get('/', function (req, res) {
    Board.find(function (err, boards) {
        if (err) {
            console.log(err);
        } else {
            res.json(boards);
        }
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    Board.findById(id, function (err, board) {
        res.json(board);
    });
});

router.post('/add', function (req, res) {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    let board = new Board(req.body);
    board.save()
        .then(board => {
            res.status(200).json({ 'Board': 'board added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new board failed');
        });
});

router.post('/update/:id', function (req, res) {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    Board.findById(req.params.id, function (err, board) {
        if (!board) {
            res.status(404).send("data is not found");
        }
        else {
            board.name = req.body.name;
            board.date = req.body.date;
        }
        board.save().then(todo => {
            res.json('Board updated!');
        }).catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

router.delete('/:id', function (req, res) {
    Board.deleteOne({ _id: req.params.id }, function (err, board) {
        if (err) {
            res.json({ error: err });
        }
        res.json({ message: 'Successfully deleted' });
    })
});

module.exports = router;