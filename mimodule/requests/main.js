const validate = require("../auth/validate-key");
const cookies = require("../cookie-parser/main");

function request(req,res){
    //can get the url parsed and well ...
    var userLink = req.headers.referer;
    if(req.headers.cookie!=undefined){
        //console.log(cookies.parse(req.headers.cookie));
        var cookie = cookies.parse(req.headers.cookie);
        //parse cookie into json
        //check session
        //if session valid return data
        //if not check db for users with the same url
        //return data
        if(cookie.session!=undefined){
            var validateSession = new Promise(function(resolve,reject){
                resolve(validate.ckeckSession(cookie.session))
            });
            validateSession.then(function(value){
                console.log("We have a valid session !")
                console.log(value);
                value["own"] = true;
                console.log(value);
                res.end(JSON.stringify(value));
            })
        }
    }
    //check for another session ?
}

module.exports = {
    request:request
}