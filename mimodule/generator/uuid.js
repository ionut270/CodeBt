//UUIDs are 128-bit hexadecimal numbers that are globally unique. The chances of the same UUID getting generated twice is negligible.

// a 4-byte epoch timestamp in seconds, Date.now()
// a 3-byte machine identifier,
// a 2-byte process id, and
// a 3-byte counter, starting with a random value
function generator(uid) {
  var session =
    "codebt" +
    Date.now() +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    "{{" +
    uid +
    "}}" +
    Math.random()
      .toString(36)
      .substr(2, 9);
  console.log("uuid.js : Cookie session is ", session);
  return session;
}
function generateURL(username, email) 
{
    var url =
    "view=" +
    username +
    "?data:"+
    Date.now() +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    email +
    Math.random()
      .toString(36)
      .substr(2, 9);
  console.log("uuid.js : user URL ", url);
  return url;
}

module.exports = {
  generate: generator,
  generateURL: generateURL
};
