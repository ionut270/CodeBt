const fs = require('fs');

var staticServe = function (req, res, folder) {
    var path = req.url.replace("/file..", "");
    console.log("Giving a file!", req.url);
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html'); // mime type shit not required if I'm right ? 
    var myReadStream = fs.createReadStream(__dirname + '\/..\/..\/' + folder + path);
    myReadStream.pipe(res);
}

module.exports = {
    staticServe: staticServe
};