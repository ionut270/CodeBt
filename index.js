const http = require('http'),
    port = 3000,
    feed = require('./Routes/feed.js'),
    itemPage = require('./Routes/itemPage.js'),
    profile = require('./Routes/profile.js'),
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
    if(req.url === "/itemPage"){
        itemPage.itemPage(req, res);
    }else 
    if(req.url === "/profile"){
        profile.profile(req, res);
    }else 
    //SENDING ENDPOINT FOR FILES **YUCK
    if(req.url === "/Styles/header.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Styles/header.css', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Styles/body.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Styles/body.css', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Styles/filter.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Styles/filter.css', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Styles/feed-Element.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Styles/feed-Element.css', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Footage/filter.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/filter.js', 'utf8');
        myReadStream.pipe(res);
    } else 
    if(req.url === "/Footage/subscription.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/subscription.js', 'utf8');
        myReadStream.pipe(res);
    } else 
    if(req.url === "/Footage/feedItemLoad.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/feedItemLoad.js', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Footage/headerMenu.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/headerMenu.js', 'utf8');
        myReadStream.pipe(res);
    } else
    if(req.url === "/Footage/css.js"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        var myReadStream = fs.createReadStream(__dirname + '/src/Feed/Footage/css.js', 'utf8');
        myReadStream.pipe(res);
    } else 
    if(req.url === "/Styles/itemElement.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/itemPage/Styles/itemElement.css', 'utf8');
        myReadStream.pipe(res);
    } else 
    if(req.url === "/Styles/profile.css"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        var myReadStream = fs.createReadStream(__dirname + '/src/Profile/Styles/profile.css', 'utf8');
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