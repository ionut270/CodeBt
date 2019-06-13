const fs = require('fs');

var itemPage = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\/..\/src/itemPage/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    itemPage: itemPage
};