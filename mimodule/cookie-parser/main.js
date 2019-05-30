function get(req) {
  //console.log("Cookie is:", req.headers.cookie);
  var output = {};
  if (req.headers.cookie != undefined) {
    req.headers.cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join("=");
    });
    //var json = JSON.stringify(output, null, 4);
    return output;
  }
}

function parse(cookie) {
  //console.log("Cookie is:", req.headers.cookie);
  var output = {};
  if (cookie != undefined) {
    cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join("=");
    });
    //var json = JSON.stringify(output, null, 4);
    return output;
  }
}


function post(res, obj) {
  var myCookie = "data={";
  var i;
  for (i = 0; i < Object.keys(obj).length; i++) {
    myCookie += Object.keys(obj)[i] + "=" + Object.values(obj)[i] + ",";
  }
  myCookie += "}";
  //console.log(myCookie);
  res.writeHead(200, {
    "set-Cookie": myCookie
  });
}

module.exports = {
  get: get,
  post: post,
  parse:parse
};
