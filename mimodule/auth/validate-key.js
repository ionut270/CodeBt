const qs = require("querystring");
const admin = require("firebase-admin");
const serviceAccount = require("../../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");
const auth = require("./CRUD");

function validate(key) {
  //we have to parse the key so we can get the user id
//console.log("KEY RECIEVED:",key.split(/{{/)[1].split(/}}/)[0] )
  //console.log("\tvalidate-key.js : ***********VALIDATE**********");
  //userData = auth.getData();
  //console.log("Key is :",key)
  if (key === undefined) {
    //console.log("\tThere is not cookie session id but validate was launched!");
    return false;
  } else {
    var uid = key.split(/{{/)[1].split(/}}/)[0];
    //console.log("\tvalidate-key.js : Validate request recieved !");
    var ref = admin.database().ref("/auth/users/Users/" + uid);
    return ref.once("value").then(function(snap) {
      //console.log("validate-key.js : username is :",snap.val());
      //console.log(snap.val().session);
      //console.log(key);
      if (key === snap.val().session) {
        //console.log("\tvalidate-key.js : Valid!");
        //console.log("\tvalidate-key.js : ***********VALIDATE**********");
        return snap.val();
      } else {
       // console.log("\tvalidate-key.js : Not valid!");
        //console.log("\tvalidate-key.js : ***********VALIDATE**********");
        return false;
      }
    });
  }
}

module.exports = {
  ckeckSession: validate
};
