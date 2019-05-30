const validate = require("../auth/validate-key");
const cookies = require("../cookie-parser/main");
const admin = require("firebase-admin");
// const serviceAccount = require("../../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");
// const auth = require("../auth/CRUD");

function request(req, res) {
	//console.log(req.url);
	if (req.url === "/GET/profile/header") {
		headerData(req, res);
	}
	if (req.url === "/GET/profile/default") {
		profileDefault(req, res);
	}
	if (req.url === "/GET/profile/subs") {
		getSubs(req, res);
	}
	if (req.url === "/GET/logout") {
		logout(req, res);
	}
	if (req.url === "/GET/items") {
		getItems(req, res);
	}
	if (req.url.indexOf("/GET/subscribe/Platform/") != -1) {
		subscribe("Platform", req.url.split(/\/GET\/subscribe\/Platform\//)[1], req, res);
    }
    
    if (req.url.indexOf("/GET/subscribe/Type/") != -1) {
		subscribe("Type", req.url.split(/\/GET\/subscribe\/Type\//)[1], req, res);
    }
    
    if (req.url.indexOf("/GET/subscribe/Author/") != -1) {
		subscribe("Author", req.url.split(/\/GET\/subscribe\/Author\//)[1], req, res);
	}
	//can get the url parsed and well ...
	//check for another session ?
}

function subscribe(type, data, req, res) {
	//We push the data into the db

	//GET THE COOKIE SESSION
	data = decodeURI(data);
	if (req.headers.cookie != undefined) {
		var cookie = cookies.parse(req.headers.cookie);
		if (cookie.session != undefined) {
			var validateSession = new Promise(function(resolve, reject) {
				resolve(validate.ckeckSession(cookie.session));
			});
			validateSession.then(function(value) {
				//console.log("We have a valid session !");
				//push that data into the db
				var uid = cookie.session.split(/{{/)[1].split(/}}/)[0];
				var ref = admin.database().ref("/auth/users/Users/" + uid + "/sub");
				ref.once("value").then(function(snap) {
                    ///console.log(snap.val()[type]); // tip inexistent :/  ... 
                    if(snap.val()[type] === undefined){
                        console.log("This type is not in db!",type) 
                        //we add it along with our val on 0 so we can push more of these
                        ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + '/0');
                        ref.once("value").then(function(snap) {
                            console.log(snap.val());
                            ref.set(data);
                        });

                    } else 
					if (snap.val()[type].indexOf(data) !== -1) {
						//already subscribed - > unsubscribe
						ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type);
						ref.once("value").then(function(snap) {
							console.log(snap.val().indexOf(data));
							ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/" + snap.val().indexOf(data));
							ref.once("value").then(function(snap) {
								console.log(snap.val());
								ref.remove();
							});
						});
					} else {
						console.log("It is not true");
						//Not subscribed => subscribe
						//console.log(snap.val()[type]);
						ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type);
						ref.once("value").then(function(snap) {
							//console.log(snap.val().findIndex(element => element === undefined));
							//console.log("/auth/users/Users/" + uid + '/sub/' + type + '/' + snap.val().findIndex(element => element === undefined))
							if (snap.val().findIndex(element => element === undefined) !== -1) {
								ref = admin
									.database()
									.ref(
										"/auth/users/Users/" +
											uid +
											"/sub/" +
											type +
											"/" +
											snap.val().findIndex(element => element === undefined),
									);
								ref.once("value").then(function(snap) {
									console.log(snap.val());
									ref.set(data);
								});
							} else {
								//pusham la final
								//luam dimensiunea arrayului
								var item = snap.val().length;
								ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/" + item);
								ref.once("value").then(function(snap) {
									console.log(snap.val());
									ref.set(data);
								});
							}
						});
					}
				});
				res.end();
			});
		}
	}

	//var ref = admin.database().ref("/auth/users/");
}

function getItems(req, res) {
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

function logout(req, res) {
	var prevPage = req.headers.referer;
	if (req.headers.cookie != undefined) {
		//console.log(cookies.parse(req.headers.cookie));
		var cookie = cookies.parse(req.headers.cookie);
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 0);
		/**TODO
		 * REMOVE COOKIE FROM DB
		 */
		res.writeHead(302, {
			"Set-Cookie": "session=; expires=" + exdate.toUTCString() + '; Path=/;"',
			Location: prevPage,
		});
		res.end();
	} else {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 0);
		/**TODO
		 * REMOVE COOKIE FROM DB
		 */
		res.writeHead(302, {
			"Set-Cookie": "session=; expires=" + exdate.toUTCString() + '; Path=/;"',
			Location: prevPage,
		});
		res.end();
	}
	//get the cookie,
	//valdiate it
	//delete it from db
	//delete it from browser
	//redirect back to prev page
}

function getSubs(req, res) {
	var userLink = req.headers.referer;
	if (req.headers.cookie != undefined) {
		var cookie = cookies.parse(req.headers.cookie);
		if (cookie.session != undefined) {
			var validateSession = new Promise(function(resolve, reject) {
				resolve(validate.ckeckSession(cookie.session));
			});
			validateSession.then(function(value) {
				//console.log("We have a valid session !");
				value["own"] = true;
				delete value.password;
				delete value.email;
				delete value.picture;
				delete value.title;
				delete value.userURL;
				//console.log(value);
				res.end(JSON.stringify(value));
			});
		} else {
			res.end(
				JSON.stringify({
					own: false,
				}),
			);
		}
	} else {
		res.end(
			JSON.stringify({
				own: false,
			}),
		);
	}
}

function profileDefault(req, res) {
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
				//console.log("We have a valid session !");
				value["own"] = true;
				delete value.password;
				res.end(JSON.stringify(value));
			});
		}
	} else {
		res.end(
			JSON.stringify({
				own: false,
			}),
		);
	}
}

function headerData(req, res) {
	var userLink = req.headers.referer;
	if (req.headers.cookie != undefined) {
		//console.log(cookies.parse(req.headers.cookie));
		var cookie = cookies.parse(req.headers.cookie);
		//parse cookie into json
		//check session
		//if session valid return data
		//if not check db for users with the same url
		//return data
		//console.log("Some cookie");
		if (cookie.session != undefined) {
			//console.log("We have a session ?")
			var validateSession = new Promise(function(resolve, reject) {
				resolve(validate.ckeckSession(cookie.session));
			});
			validateSession.then(function(value) {
				//console.log("We have a valid session !");
				value["own"] = true;
				delete value.password;
				res.end(JSON.stringify(value));
			});
		} else {
			//console.log("No session !")
			res.end(
				JSON.stringify({
					own: false,
				}),
			);
		}
	} else {
		//console.log("No session !")
		res.end(
			JSON.stringify({
				own: false,
			}),
		);
	}
}

module.exports = {
	request: request,
};
