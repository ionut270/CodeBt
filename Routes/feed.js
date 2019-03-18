const fs = require('fs');

var feed = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\\..\\src/Feed/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    feed: feed
};