const fs = require('fs');

var profile = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\\..\\src/Profile/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    profile: profile
};