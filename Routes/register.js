const fs = require('fs');

var register = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '\/..\/src/auth/register/index.html', 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    register: register
};