const qs = require("querystring");
const admin = require("firebase-admin");
const serviceAccount = require("../../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");
const sesionID = require("../generator/uuid");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://login-684d3.firebaseio.com"
});

var logged = false;
var userData = {};

var login = function (req, res) {
    var post;
    var body = "";
    req.on("data", (data) => {
        var promiseData = new Promise((resolve, reject) => {
            body += data;
            if (body.length > 1e6) req.connection.destroy();
            resolve(body);
        })
        promiseData.then(function () {
            req.on("end", () => {
                post = qs.parse(body);
                var ref = admin.database().ref("/auth/users");
                var usersRef = ref.child("Users");
                usersRef.once(`value`, function (snap) {
                    snap.forEach(function (childSnap) {
                        if (childSnap.val().username === post.username) {
                            if (childSnap.val().password === post.password) {
                                userData = childSnap.val();
                                userData["session"] = sesionID.generate(childSnap.key);
                                //We stored this in here, now we should put in our db this session Id
                                var ref = admin.database().ref("/auth/users/Users/" + childSnap.key);
                                //we rember the user data id thing inside the db so its unacesible to the suer
                                userData["uid"] = childSnap.key;
                                ref.update({
                                    "session": userData.session
                                });
                            } else {
                                console.log("Bad password!");
                            }
                        } else {
                        }
                    });
                }).then(() => {
                    res.writeHead(302, {
                        'Set-Cookie': 'session=' + userData.session,
                        'Location': '/profile/',
                    });
                    res.end();
                });
            });
        })
    });
};

var register = function (req, res) {
    var post;
    var body = "";
    req.on("data", function (data) {
        body += data;
        if (body.length > 1e6) req.connection.destroy();
    });
    req.on("end", function () {
        post = qs.parse(body);
        post["userURL"]=sesionID.generateURL(post.username,post.email);
        //ok so I may have no choice :|
        //reg 
        //if username is not existent :?
        //if password is at least 8 chars and contains shit
        //if email is more or less valid eg @email.com <-regex 
        //then we send data to firebase 
        var ref = admin.database().ref("/auth/users");
        var usersRef = ref.child("Users");
        var userRef = usersRef.push(post);
    });
};

function getData() {
    return userData;
}

module.exports = {
    login: login,
    register: register,
    logged: logged,
    getData: getData
};