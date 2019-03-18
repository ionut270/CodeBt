const fs = require('fs');

var home = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\\..\\src/Home/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    home: home
};