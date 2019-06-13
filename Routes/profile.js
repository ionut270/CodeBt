const fs = require("fs");
const auth = require("../mimodule/auth/CRUD");
const validate = require("../mimodule/auth/validate-key");
const cookies = require("../mimodule/cookie-parser/main");

var profile = function(req, res) {
  if (req.url === "/profile/") {
    userData = auth.getData();
    var cookie = cookies.get(req);
    if (
      (cookie === undefined || cookie.session === undefined) &&
      userData.session === undefined
    ) {
      //check if user is logged in!
      res.writeHead(302, {
        Location: "/auth/log"
      });
      res.end();
    } else {
      var is_valid;
      var valid = new Promise((resolve, reject) => {
        if (cookie === undefined) {
          resolve(validate.ckeckSession(userData.session));
        } else {
          resolve(validate.ckeckSession(cookie.session));
        }
      });
      valid.then((response) => {
        //response = true;
        userData = response;
        if (response != false) {
          res.writeHead(302, {
            'Location': '/profile/'+userData.userURL,
        });
          var myReadStream = fs.createReadStream(
            __dirname + "\/..\/src/Profile/index.html",
            "utf8"
          );
          myReadStream.pipe(res);
        } else {
          res.writeHead(302, {
            Location: "/auth/log"
          });
          res.end();
        }
      });
    }
  } else {
    var myReadStream = fs.createReadStream(
      __dirname + "\/..\/src/Profile/index.html",
      "utf8"
    );
    myReadStream.pipe(res);
  }
};

module.exports = {
  profile: profile
};
