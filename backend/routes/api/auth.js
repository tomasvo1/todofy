const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth')
const User = require('../../schemes/user.model');

router.post('/', (req, res) => {
    try { req.body = JSON.parse(Object.keys(req.body)[0]) } catch (err) { req.body = req.body }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exists' });
           
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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
                })
        });
});

router.get('/user', auth, function (req, res) {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;