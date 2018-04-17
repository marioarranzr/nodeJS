const express = require('express');

const app = express();

app.get('/user', function(req, res) {
    res.json('Hello World')
});

app.post('/user', function(req, res) {
    let body = req.body;
    res.json({ user: body });
});

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/user', function(req, res) {
    res.json('Hello World')
});

module.exports = app;