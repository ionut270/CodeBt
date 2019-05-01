const fs = require('fs');

var staticServe = function (req, res, folder) {
    var path = req.url.replace("/file..", "");
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html'); // mime type shit not required if I'm right ? 
    var myReadStream = fs.createReadStream(__dirname + '\\..\\..\\' + folder + '/' + path, 'utf8');
    myReadStream.pipe(res);
}

module.exports = {
    staticServe: staticServe
};