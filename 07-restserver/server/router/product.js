const express = require('express');
const Product = require('../model/product');

const Authorization = require('../middleware/authentication'); //const { verifyToken } = require('../middleware/authentication')

const app = express();

app.get('/products', Authorization.verifyToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    let filter = { available: true };

    Product.find(filter)
        .skip(from)
        .limit(limit)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Product.count(filter, (err, count) => {
                res.json({
                    ok: true,
                    products,
                    count
                });
            });
        });
});

app.get('/products/:id', Authorization.verifyToken, (req, res) => {
    let id = req.params.id;
    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!productDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'There is not any product with that ID'
                    }
                });
            }
            res.json({
                ok: true,
                product: productDB,
            });
        });

});

app.get('/products/search/:term', Authorization.verifyToken, (req, res) => {
    let term = req.params.term;
    let regExp = new RegExp(term, 'i');
    Product.find({ name: regExp })
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!productDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'There is not any product with that ID'
                    }
                });
            }
            res.json({
                ok: true,
                product: productDB,
            });
        });

});

app.post('/products', Authorization.verifyToken, (req, res) => {
    let body = req.body;
    let product = new Product({
        name: body.name,
        description: body.description,
        price: body.price,
        available: body.available,
        category: body.category,
        user: req.user._id // thanks to Authorization.verifyToken we have this info
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });
    })

});

app.put('/products/:id', Authorization.verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descProduct = {
        description: body.description,
        name: body.name,
        category: body.category,
        available: body.available,
        price: body.price,

    }
    Product.findByIdAndUpdate(id, descProduct, { new: true, runValidators: true }, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productDB
        });
    });
});

app.delete('/products/:id', [Authorization.verifyToken, Authorization.verifyAdminRole], (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
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
            product: productDB,
            message: 'Deleted product'
        });
    });
});

module.exports = app;