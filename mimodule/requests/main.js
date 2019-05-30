const validate = require("../auth/validate-key");
const cookies = require("../cookie-parser/main");
const admin = require("firebase-admin");
// const serviceAccount = require("../../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");
// const auth = require("../auth/CRUD");

function reverseObject(object) {
	var newObject = {};
	var keys = [];

	for (var key in object) {
			keys.push(key);
	}

	for (var i = keys.length - 1; i >= 0; i--) {
		var value = object[keys[i]];
		newObject[keys[i]]= value;
	}       

	return newObject;
}

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
					if (snap.val()[type] === undefined) {
						console.log("This type is not in db!", type);
						//we add it along with our val on 0 so we can push more of these
						ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/0");
						ref.once("value").then(function(snap) {
							console.log(snap.val());
							ref.set(data);
						});
					} else if (snap.val()[type].indexOf(data) !== -1) {
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
	var pageLength = 6;
	console.log(req.headers.start_at);

	/**
	 * Primesc start at
	 * Daca e 0 ia ultimul element din baza de date si porneste de acolo
	 */

	if (req.headers.start_at === "0") {
		console.log("Kinda here!");
		var ref = admin
			.database()
			.ref("/items")
		ref
			.once("value")
			.then(function(snap) {
				//console.log(snap.val());
				var data_to_send = reverseObject(snap.val());
				console.log(data_to_send);
				res.end(JSON.stringify(data_to_send));
			})
			.catch(res => {
				console.log("Exception > ", res);
			});
	} else {
		console.log("Actually here!");
		var ref = admin
			.database()
			.ref("/items")
			.limitToFirst(pageLength)
			.startAt(req.headers.start_at);
		ref
			.once("value")
			.then(function(snap) {
				console.log(snap.val());
				res.end(JSON.stringify(snap.val()));
			})
			.catch(res => {
				console.log("Exception > ", res);
			});
	}
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


ref = admin.database().ref("/items/lastItemId");
ref.once(`value`, function(snap) {
				//convertim valoarea asta al un integer
				var dbIndex = parseInt(snap.val());
				//il avem ca si numar , scadem din el 1 si pusham ? ... 
				//accesam acel lastitem id
				ref = admin.database().ref("/items/"+dbIndex);
				ref.once('value',function (snap){
								//comparam indesii
								if(snap.vall().index == data.index){ 
												//Inseamna ca am deja datele astea
												//si pushez peste ele  
												ref.set(data);
								} else {
												dbIndex--;
												ref = admin.database().ref("/items/"+dbIndex);
												ref.set(data)
												//asta inseamna ca trebuie actualizat si last itemid
												ref = admin.database().ref("/items/lastItemId");
												ref.set(dbIndex);
								}
				})
				console.log("Updating data ", data.index, "\nLatest item in db ", snap.val() );
				//if (data.index > snap.val()) {
				//      ref.set(data.index);
				//}
				//var ref2 = admin.database().ref("/items/" + data.index);
				//ref2.set(data);
});
//return txt;
return 1;