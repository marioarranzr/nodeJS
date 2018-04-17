require('./config/config');
const userApp = require('./router/user');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(userApp);

app.get('/', function(req, res) {
    res.json('Hello World')
});

// DB connection
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) {
        throw err;
    }
});

app.listen(process.env.PORT);