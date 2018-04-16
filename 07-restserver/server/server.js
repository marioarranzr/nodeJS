require('./config/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json('Hello World')
});

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

app.listen(process.env.PORT);