const validate = require("../auth/validate-key");
const cookies = require("../cookie-parser/main");
const admin = require("firebase-admin");
// const serviceAccount = require("../../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");
// const auth = require("../auth/CRUD");

function request(req, res) {
    console.log(req.url);
	if (req.url === "/GET/profile/header") {
        headerData(req,res);
    } else 
    if (req.url === "/GET/profile/default") {
        profileDefault(req,res);
    } else 
    if(req.url === "/GET/profile/subs"){
        getSubs(req,res);
    } else 
    if(req.url ==="/GET/logout"){
        logout(req,res);
    }
    if(req.url ==="/GET/items"){
        getItems(req,res);
    }
	//can get the url parsed and well ...
	//check for another session ?
}

function getItems(req,res){
    //TODO
    /**MANAGE SPECIFIC QUERRIES 
     * The idea :
     * Press on a button, make req to here somewhere
     * inside cookies or the header we'll have the querry value
     * and from here we make sure only that is returned as a result
     * then from front the app removes the tag with the items and rerenders it
    */
    var ref = admin.database().ref("/items");
    ref.once("value").then(function(snap) {
        res.end(JSON.stringify(snap.val()));
    });
}

function logout(req,res){
    var prevPage = req.headers.referer;
    if (req.headers.cookie != undefined) {
        console.log(cookies.parse(req.headers.cookie));
        var cookie = cookies.parse(req.headers.cookie);
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + 0);
        /**TODO
         * REMOVE COOKIE FROM DB
         */
        res.writeHead(302, {
            'Set-Cookie': 'session=; expires='+exdate.toUTCString()+'; Path=/;"',
            'Location': prevPage,
        });
        res.end();
    } else {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + 0);
              /**TODO
         * REMOVE COOKIE FROM DB
         */
        res.writeHead(302, {
            'Set-Cookie': 'session=; expires='+exdate.toUTCString()+'; Path=/;"',
            'Location': prevPage,
        });
        res.end();
    }
    //get the cookie,
    //valdiate it
    //delete it from db
    //delete it from browser
    //redirect back to prev page
}

function getSubs(req,res){
    var userLink = req.headers.referer;
    if (req.headers.cookie != undefined) {
        //console.log(cookies.parse(req.headers.cookie));
        var cookie = cookies.parse(req.headers.cookie);
        //parse cookie into json
        //check session
        //if session valid return data
        //if not check db for users with the same url
        //return data
        if (cookie.session != undefined) {
            var validateSession = new Promise(function(resolve, reject) {
                resolve(validate.ckeckSession(cookie.session));
            });
            validateSession.then(function(value) {
                console.log("We have a valid session !");
                value["own"] = true;
                delete value.password;
                delete value.email;
                delete value.picture;
                delete value.title;
                delete value.userURL;
                res.end(JSON.stringify(value));
            });
        }
    } else {
        res.end(JSON.stringify({own:false}));
    }
}

function profileDefault(req,res){
    var userLink = req.headers.referer;
    if (req.headers.cookie != undefined) {
        //console.log(cookies.parse(req.headers.cookie));
        var cookie = cookies.parse(req.headers.cookie);
        //parse cookie into json
        //check session
        //if session valid return data
        //if not check db for users with the same url
        //return data
        if (cookie.session != undefined) {
            var validateSession = new Promise(function(resolve, reject) {
                resolve(validate.ckeckSession(cookie.session));
            });
            validateSession.then(function(value) {
                console.log("We have a valid session !");
                value["own"] = true;
                delete value.password;
                res.end(JSON.stringify(value));
            });
        }
    }else {
        res.end(JSON.stringify({own:false}));
    }
}
function headerData(req,res){
    var userLink = req.headers.referer;
    if (req.headers.cookie != undefined) {
        console.log(cookies.parse(req.headers.cookie));
        var cookie = cookies.parse(req.headers.cookie);
        //parse cookie into json
        //check session
        //if session valid return data
        //if not check db for users with the same url
        //return data
        if (cookie.session != undefined) {
            var validateSession = new Promise(function(resolve, reject) {
                resolve(validate.ckeckSession(cookie.session));
            });
            validateSession.then(function(value) {
                //console.log("We have a valid session !");
                value["own"] = true;
                delete value.password;
                res.end(JSON.stringify(value));
            });
        }
    }else {
        res.end(JSON.stringify({own:false}));
    }
}


module.exports = {
	request: request,
};
