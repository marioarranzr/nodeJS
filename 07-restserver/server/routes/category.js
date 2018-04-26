const express = require('express');
const Category = require('../model/category');

const Authorization = require('../middleware/authentication'); //const { verifyToken } = require('../middleware/authentication')

const app = express();

app.get('/categories', Authorization.verifyToken, (req, res) => {

    let filter = {};

    Category.find(filter)
        .populate('user', 'name email')
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Category.count(filter, (err, count) => {
                res.json({
                    ok: true,
                    categories,
                    count
                });
            });
        });
});

app.get('/categories/:id', Authorization.verifyToken, (req, res) => {
    let id = req.params.id;
    Category.findById(id)
        .populate('user', 'name email')
        .exec((err, categoryDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!categoryDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'There is not any category with that ID'
                    }
                });
            }
            res.json({
                ok: true,
                category: categoryDB,
            });
        });

});

app.post('/categories', Authorization.verifyToken, (req, res) => {
    let body = req.body;
    let category = new Category({
        name: body.name,
        description: body.description,
        user: req.user._id // thanks to Authorization.verifyToken we have this info
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            category: categoryDB
        });
    })

});

app.put('/categories/:id', Authorization.verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descCategory = {
        description: body.description,
        name: body.name
    }
    Category.findByIdAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

app.delete('/categories/:id', [Authorization.verifyToken, Authorization.verifyAdminRole], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            // user not found in DB
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'That id doesn\'t exist'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB,
            message: 'Deleted category'
        });
    });
});

module.exports = app;