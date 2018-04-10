const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let json = {
        name: 'Mario',
        age: 28,
        url: req.url
    }

    res.write(JSON.stringify(json));
    res.end();

}).listen(8080);