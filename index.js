const http = require('http'),
    port = 3000,
    home = require('./Routes/home.js'),
    fs = require('fs'),
    events = require('events'),
    util = require('util');
var myEmitter = new events.EventEmitter();


const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Main page");
    }
    if(req.url === "/home"){
        home.home(req, res);
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        var myReadStream = fs.createReadStream(__dirname + '/src/404/404.html', 'utf8');
        myReadStream.pipe(res);
    }
});

server.listen(port, () => {
    console.log(`Server running on ${port}`);
})