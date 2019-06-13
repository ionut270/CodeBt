const fs = require('fs');

var login = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\/..\/src/auth/login/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    login: login
};