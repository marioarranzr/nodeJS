const express = require('express');
const hbs = require('hbs');
const functions = require('firebase-functions');
const firebase = require('firebase-admin');

require('./hbs/helpers');

const app = express();

const firebaseApp = firebase.initializeApp(functions.config().firebase);

function getFirebaseData(path) {
    const ref = firebase.database().ref(path);
    return ref.once('value').then(snap => snap.val());
}

app.use(express.static(__dirname + '/public'));

// Express HBS Engine
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', './views');
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

const port = process.env.PORT || 8080;
app.listen(port);

exports.app = functions.https.onRequest(app);