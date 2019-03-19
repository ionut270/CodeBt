const http = require('http'),
    port = 3000,
    feed = require('./Routes/feed.js'),
    fs = require('fs'),
    events = require('events'),
    util = require('util');
var myEmitter = new events.EventEmitter();


const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Main page");

    } else 
    if(req.url === "/feed"){
        feed.feed(req, res);
    }else 
    //SENDING ENDPOINT FOR FILES **YUCK
    if(req.url === "/Styles/header.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Styles/header.css', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Footage/event.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/event.js', 'utf8');
        myReadStream.pipe(res);
    }
    //SENDING ENDPOINT FOR FILES **YUCK
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        var myReadStream = fs.createReadStream(__dirname + '/src/404/index.html', 'utf8');
        myReadStream.pipe(res);
    }
});

server.listen(port, () => {
    console.log(`Server running on ${port}`);
})