const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const wrap = require('async-wrap');

const User = require('../../schemes/user.model');

router.post('/add', (req, res) => {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            const newUser = new User({
                name,
                email,
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        });
});

router.get('/', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

router.post('/update/:id', function (req, res) {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    console.log(req.body);
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            res.status(404).send("data is not found");
        }
        else {
            user.name = req.body.name;
            user.date = req.body.date;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;
        }
        user.save().then(user => {
            res.json(user);
        }).catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

router.delete('/:id', function (req, res) {
    User.deleteOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.json({ error: err });
        }
        res.json({ message: 'Successfully deleted' });
    })
});

router.post('/login', (req, res, next) => {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            throw new Error('NotFound');
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (!isMatch) {
                return res.status(400).json({ error: 'Incorrect password' });
            }
            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
            }
            jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    next(err);
                }
                res.cookie('Authorization', `Bearer ${token}`);
                res.end();
            })
        }).catch((err) => {
            throw new Error(err.message);
        })
    })
})

module.exports = router;