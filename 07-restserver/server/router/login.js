const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // user not found in DB
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password not valid'
                }
            });
        }

        // password of that user is not correct
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password not valid'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN }); // expires in 30 days

        res.json({
            ok: true,
            user: userDB,
            token: token
        });
    });

});


module.exports = app;