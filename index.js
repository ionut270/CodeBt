const http = require("http"),
  port = 8080,
  feed = require("./Routes/feed.js"),
  itemPage = require("./Routes/itemPage.js"),
  profile = require("./Routes/profile.js"),
  fs = require("fs"),
  staticServe = require("./mimodule/serve-static/main.js"),
  auth = require("./mimodule/auth/CRUD.js"),
  manageREQ = require("./mimodule/requests/main.js");

const server = http.createServer((req, res) => {
  if (req.url.indexOf("/GET/") != -1) {
    manageREQ.request(req, res);
  } else if (req.url === "/") {
    feed.feed(req, res);
  } else if (req.url === "/feed") {
    feed.feed(req, res);
  } else if(req.url === "/notifications"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '/src/notify/index.html', 'utf8');
    //console.log(myReadStream);
    myReadStream.pipe(res);
  } else if(req.url === "/security_tips"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var myReadStream = fs.createReadStream(__dirname + '/src/security_tips/index.html', 'utf8');
    //console.log(myReadStream);
    myReadStream.pipe(res);
  } else if (req.url.indexOf("/item/") != -1) {
    itemPage.itemPage(req, res);
  } else if (req.url.indexOf("/profile/") != -1) {
    profile.profile(req, res);
  } else if (req.url === "/log") {
    if (req.method === "POST") {
      auth.login(req, res);
      return;
    }
    var myReadStream = fs.createReadStream(
      __dirname + "/src/auth/login/index.html",
      "utf8"
    );
    myReadStream.pipe(res);
  } else if (req.url === "/reg") {
    console.log("Register!");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    var myReadStream = fs.createReadStream(
      __dirname + "/src/auth/register/index.html",
      "utf8"
    );
    myReadStream.pipe(res);

    if (req.method === "POST") {
      auth.register(req, res); //<--WORKS !
    }
  } else if (req.url.indexOf("/file../") != -1) {
    staticServe.staticServe(req, res, "Files");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    var myReadStream = fs.createReadStream(
      __dirname + "/src/404/index.html",
      "utf8"
    );
    myReadStream.pipe(res);
  }
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
