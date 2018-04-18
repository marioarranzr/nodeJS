const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../model/user');

const app = express();

app.get('/user', function(req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    let filter = {};

    User.find(filter, 'name email role active google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count(filter, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            });
        });
});

app.post('/user', function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
});

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'active']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/user/:id', function(req, res) {
    let id = req.params.id;

    User.findByIdAndUpdate(id, { active: false }, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });









    User.findByIdAndRemove(id, {}, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Not found user'
                }
            });
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app;