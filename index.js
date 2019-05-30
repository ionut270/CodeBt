const http = require("http"),
  port = 8080,
  feed = require("./Routes/feed.js"),
  itemPage = require("./Routes/itemPage.js"),
  profile = require("./Routes/profile.js"),
  // login = require("./Routes/login.js"),
  // register = require("./Routes/register.js"),
  fs = require("fs"),
  // events = require("events"),
  // util = require("util"),
  staticServe = require("./mimodule/serve-static/main.js"),
  //scrapper = require('./mimodule/web-scrapper/main.js'),
  auth = require("./mimodule/auth/CRUD.js"),
  // cookieParser = require("./mimodule/cookie-parser/main"),
  // sesionID = require("./mimodule/generator/uuid"),
  // qs = require("querystring"),
  manageREQ = require("./mimodule/requests/main.js");
// var myEmitter = new events.EventEmitter();

// var userData = {
//   username: "NONE",
//   password: "How about no?",
//   email: "somethin@somethin.somethin"
// };

const server = http.createServer((req, res) => {
  //console.log("url:", req.url);
  if (req.url.indexOf("/GET/") != -1) {
    manageREQ.request(req, res);
  } else if (req.url === "/") {
    //scrapper.scrap();
    feed.feed(req, res);
  } else if (req.url === "/feed") {
    feed.feed(req, res);
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
