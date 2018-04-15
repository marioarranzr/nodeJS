const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// Express HBS Engine
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    // res.send('Hello World')

    res.render('home', { // render to load handlebars page
        name: 'Mario',
        // year: new Date().getFullYear()
    });
});

app.get('/about', function(req, res) {
    // res.send('Hello World')

    res.render('about');
});

app.get('/json', function(req, res) {
    let json = {
        name: 'Mario',
        age: 28,
        url: req.url
    }

    res.send(JSON.stringify(json));
});

app.listen(port);