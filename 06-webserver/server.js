const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/json', function(req, res) {
    let json = {
        name: 'Mario',
        age: 28,
        url: req.url
    }

    res.send(JSON.stringify(json));
    // res.send('Hello World')
});

app.listen(8080);