require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// public folder available
app.use(express.static(path.resolve(__dirname, '../public')));

// router
app.use(require('./router/index'));

// DB connection
mongoose.connect(process.env.urlDB, (err, res) => {
    if (err) {
        throw err;
    }
});

app.listen(process.env.PORT);