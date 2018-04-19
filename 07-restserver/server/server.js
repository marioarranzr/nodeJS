require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// router
app.use(require('./router/index'));

app.get('/', function(req, res) {
    res.json('Hello World')
});

// DB connection
mongoose.connect(process.env.urlDB, (err, res) => {
    if (err) {
        throw err;
    }
});

app.listen(process.env.PORT);