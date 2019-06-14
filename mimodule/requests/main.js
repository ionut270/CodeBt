const validate = require("../auth/validate-key");
const cookies = require("../cookie-parser/main");
const admin = require("firebase-admin");

function request(req, res) {
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
	if (req.url === "/GET/itemInfo") {
		getItemInfo(req, res);
	}
	if (req.url === "/GET/categoryData") {
		getCategoryData(req, res);
	}

	if (req.url === "/GET/Notifications") {
		getNotifications(req, res);
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
}

function getNotifications(req, res) {
	var notification_Platform = [];
	var notification_Type = [];
	var notification_Author = [];
	var Notifications = [];
	var seen = [];
	var Platforms = [];
	var Types = [];
	var Authors = [];
	var cookie = cookies.parse(req.headers.cookie);
	var uid = cookie.session.split(/{{/)[1].split(/}}/)[0];
	var ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/Platform");
	ref.once("value").then(snap => {
		Platforms = snap.val();
		var ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/Type");
		ref.once("value").then(snap => {
			Types = snap.val();
			var ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/Author");
			ref.once("value").then(snap => {
				Authors = snap.val();

				if (Platforms != null) {
					for (var x = 0; x < Platforms.length; x++) {
						var ref = admin.database().ref("/auth/users/Users/" + uid + "/Seen/Platform/" + Platforms[x]);
						let i = x;
						ref.once("value").then(snap => {
							var firstSeen = snap.val().firstSeen;
							//console.log("Snapped! Platform > ", "{" + Platforms[i] + ":" + snap.val() + "}");
							let platform = '{"' + Platforms[i] + '":' + JSON.stringify(snap.val()) + "}";
							platform = JSON.parse(platform);
							seen.push(platform);
							//console.log(platform[Object.keys(platform)[0]].firstSeen);
							//FACEM UN QUERRY PANA LA FIRSTSEEN

							ref = admin
								.database()
								.ref("/items")
								.orderByChild("/Platform")
								.equalTo(Object.keys(platform)[0])
								.limitToFirst(30);
							ref.once("value").then(snap => {
								for (let k = 0; k < 30; k++) {
									if (Object.keys(snap.val())[k] != undefined) {
										let myIndex = snap.val()[Object.keys(snap.val())[k]].index;

										let seenId = [];
										let stringSeenId = JSON.stringify(seen);
										for (let i = 0; i < stringSeenId.match(/(?:"id":")[0-9]*"/gm).length; i++) {
											seenId.push(
												stringSeenId
													.match(/(?:"id":")[0-9]*"/gm)
													[i].split(/"id":"/)[1]
													.split(/"/)[0],
											);
										}

										//console.log(seenId.indexOf(myIndex),seenId,myIndex)
										if (seenId.indexOf(myIndex) === -1 && parseInt(firstSeen) < parseInt(myIndex)) {
											//console.log("Good");
											notification_Platform.push(myIndex);
										}
									}
								}
								//console.log("Not Platform", notification_Platform);
							});
						});
					}
				}
				if (Types != null) {
					for (var x = 0; x < Types.length; x++) {
						var ref = admin.database().ref("/auth/users/Users/" + uid + "/Seen/Type/" + Types[x]);
						let i = x;
						ref.once("value").then(snap => {
							var firstSeen = snap.val().firstSeen;
							//console.log("Snapped! Type > ", "{" + Types[i] + ":" + snap.val() + "}");
							let type = '{"' + Types[i] + '":' + JSON.stringify(snap.val()) + "}";
							type = JSON.parse(type);
							seen.push(type);

							ref = admin
								.database()
								.ref("/items")
								.orderByChild("/Type")
								.equalTo(Object.keys(type)[0])
								.limitToFirst(30);
							ref.once("value").then(snap => {
								for (let k = 0; k < 30; k++) {
									if (Object.keys(snap.val())[k] != undefined) {
										let myIndex = snap.val()[Object.keys(snap.val())[k]].index;

										let seenId = [];
										let stringSeenId = JSON.stringify(seen);
										for (let i = 0; i < stringSeenId.match(/(?:"id":")[0-9]*"/gm).length; i++) {
											seenId.push(
												stringSeenId
													.match(/(?:"id":")[0-9]*"/gm)
													[i].split(/"id":"/)[1]
													.split(/"/)[0],
											);
										}
										if (seenId.indexOf(myIndex) === -1 && parseInt(firstSeen) < parseInt(myIndex)) {
											notification_Type.push(myIndex);
										}
									}
								}
								//console.log("Not Type ", notification_Type);
							});
						});
					}
				}
				if (Authors != null) {
					for (var x = 0; x < Authors.length; x++) {
						var ref = admin.database().ref("/auth/users/Users/" + uid + "/Seen/Author/" + Authors[x]);
						let i = x;
						ref.once("value").then(snap => {
							var firstSeen = snap.val().firstSeen;
							let author = '{"' + Authors[i] + '":' + JSON.stringify(snap.val()) + "}";
							author = JSON.parse(author);
							seen.push(author);

							ref = admin
								.database()
								.ref("/items")
								.orderByChild("/Author")
								.equalTo(Object.keys(author)[0])
								.limitToFirst(30);
							ref.once("value").then(snap => {
								for (let k = 0; k < 30; k++) {
									if (Object.keys(snap.val())[k] != undefined) {
										let myIndex = snap.val()[Object.keys(snap.val())[k]].index;

										let seenId = [];
										let stringSeenId = JSON.stringify(seen);
										for (let i = 0; i < stringSeenId.match(/(?:"id":")[0-9]*"/gm).length; i++) {
											seenId.push(
												stringSeenId
													.match(/(?:"id":")[0-9]*"/gm)
													[i].split(/"id":"/)[1]
													.split(/"/)[0],
											);
										}

										//console.log(seenId.indexOf(myIndex),seenId,myIndex)
										if (seenId.indexOf(myIndex) === -1 && parseInt(firstSeen) < parseInt(myIndex)) {
											//console.log("Good");
											notification_Author.push(myIndex);
										}
									}
								}
								//console.log("Not Author", notification_Author);
							});
						});
					}
				}
				setTimeout(()=>{
					//console.log(notification_Author,notification_Platform,notification_Type);
					var to_res = '{ "Platform":'+JSON.stringify(notification_Platform);
					to_res+=',"Type":'+JSON.stringify(notification_Type);
					to_res+=',"Author":'+JSON.stringify(notification_Author) + '}';
					res.end(to_res);

				},1000)
			});
		});
	});
}

function getCategoryData(req, res) {
	if (req.headers === undefined) {
		res.end("There is no such category!");
	} else {
		if (req.headers.category === undefined || req.headers.type === undefined) {
			res.end("There is no such category!");
		} else {
			var category = req.headers.category;
			var type = req.headers.type;

			if (req.headers.startAt === undefined || req.headers.startAt === 0) {
				var ref = admin.database().ref("/items/lastItemId");
				ref
					.once("value")
					.then(function(snap) {
						//console.log(snap.val());
						req.headers.startAt = JSON.stringify(snap.val());

						var ref = admin
							.database()
							.ref("/items")
							.orderByChild(type)
							.equalTo(category)
							.limitToFirst(15);

						ref
							.once("value")
							.then(function(snap) {
								res.end(JSON.stringify(snap.val()));
							})
							.catch(res => {
								console.log("Exception > ", res);
							});
					})
					.catch(res => {
						console.log("Exception > ", res);
					});
			} else {
				res.end("OK");
			}
		}
	}
}

function subscribe(type, data, req, res) {
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
					if (snap.val() === null || snap.val()[type] === undefined) {
						//console.log("This type is not in db!", type);
						//we add it along with our val on 0 so we can push more of these
						ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/0");
						ref.once("value").then(function(snap) {
							ref.set(data);

							//console.log("Data", data);
							//console.log("Type", type);

							ref = admin
								.database()
								.ref("/items")
								.orderByChild(type)
								.equalTo(data)
								.limitToFirst(1);

							ref
								.once("value")
								.then(function(snap) {
									//console.log("firstSeen", snap.val()[Object.keys(snap.val())[0]].index);

									ref = admin.database().ref("/auth/users/Users/" + uid + "/Seen/" + type + "/" + data + "/firstSeen");
									ref.set(snap.val()[Object.keys(snap.val())[0]].index);
								})
								.catch(res => {
									console.log("Exception > ", res);
								});
						});
					} else if (snap.val()[type].indexOf(data) !== -1) {
						//already subscribed - > unsubscribe
						ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type);
						ref.once("value").then(function(snap) {
							//console.log(snap.val().indexOf(data));
							ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/" + snap.val().indexOf(data));
							ref.once("value").then(function(snap) {
								ref.remove();
							});
						});
					} else {
						//console.log("It is not true");
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
									//console.log(snap.val());
									ref.set(data);

									//console.log("Data", data);
									//console.log("Type", type);

									ref = admin
										.database()
										.ref("/items")
										.orderByChild(type)
										.equalTo(data)
										.limitToFirst(1);

									ref
										.once("value")
										.then(function(snap) {
											//console.log("firstSeen", snap.val()[Object.keys(snap.val())[0]].index);

											ref = admin
												.database()
												.ref("/auth/users/Users/" + uid + "/Seen/" + type + "/" + data + "/firstSeen");
											ref.set(snap.val()[Object.keys(snap.val())[0]].index);
										})
										.catch(res => {
											console.log("Exception > ", res);
										});
								});
							} else {
								//pusham la final
								//luam dimensiunea arrayului
								var item = snap.val().length;
								ref = admin.database().ref("/auth/users/Users/" + uid + "/sub/" + type + "/" + item);
								ref.once("value").then(function(snap) {
									//console.log(snap.val());
									ref.set(data);

									//console.log("Data", data);
									//console.log("Type", type);

									ref = admin
										.database()
										.ref("/items")
										.orderByChild(type)
										.equalTo(data)
										.limitToFirst(1);

									ref
										.once("value")
										.then(function(snap) {
											//console.log("firstSeen", snap.val()[Object.keys(snap.val())[0]].index);
											//acum mergem unde trebuie sa pusham valoarea asta
											ref = admin
												.database()
												.ref("/auth/users/Users/" + uid + "/Seen/" + type + "/" + data + "/firstSeen");
											ref.set(snap.val()[Object.keys(snap.val())[0]].index);
										})
										.catch(res => {
											console.log("Exception > ", res);
										});
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
	var pageLength = 15;
	//console.log(req.headers.start_at);
	//req.headers.start_at = "-2000"; // lastitem id daca e 0 ...

	if (req.headers.start_at === "0") {
		//console.log("Begining");
		var ref = admin.database().ref("/items/lastItemId");
		ref
			.once("value")
			.then(function(snap) {
				//console.log(snap.val());
				req.headers.start_at = JSON.stringify(snap.val());

				var ref = admin
					.database()
					.ref("/items")
					.orderByKey()
					.limitToFirst(pageLength)
					.startAt(req.headers.start_at);
				ref
					.once("value")
					.then(function(snap) {
						//console.log("Sent data!");
						res.end(JSON.stringify(snap.val()));
					})
					.catch(res => {
						console.log("Exception > ", res);
					});
			})
			.catch(res => {
				console.log("Exception > ", res);
			});
	} else {
		//console.log("Actually here!");
		var ref = admin
			.database()
			.ref("/items")
			.orderByKey()
			.limitToFirst(pageLength)
			.startAt(req.headers.start_at);
		ref
			.once("value")
			.then(function(snap) {
				//console.log("Sent data!");
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

function getItemInfo(req, res) {
	var user_db_id = req.headers.cookie
		.split(/session=/)[1]
		.split(/{{/)[1]
		.split(/}}/)[0];
	if (req.headers.itemid != undefined) {
		//console.log(req.headers.itemid);
		var ref = admin.database().ref("/items/" + req.headers.itemid);
		//console.log("/items/" + req.headers.itemid);
		ref
			.once("value")
			.then(function(snap) {
				//console.log(snap.val())
				res.end(JSON.stringify(snap.val()));
				var dbdata = snap.val();
				ref = admin.database().ref("/auth/users/Users/" + user_db_id + "/Seen/Platform/" + dbdata.Platform);

				ref
					.orderByChild("/id")
					.equalTo(dbdata.index)
					.once("value")
					.then(snap => {
						if (snap.val() === null) {
							ref = admin.database().ref("/auth/users/Users/" + user_db_id + "/Seen/Platform/" + dbdata.Platform);
							ref.once("value").then(snap => {
								ref.push({ id: dbdata.index });

								ref = admin.database().ref("/auth/users/Users/" + user_db_id + "/Seen/Type/" + dbdata.Type);
								ref.once("value").then(snap => {
									ref.push({ id: dbdata.index });

									ref = admin.database().ref("/auth/users/Users/" + user_db_id + "/Seen/Author/" + dbdata.Author);
									ref.once("value").then(snap => {
										ref.push({ id: dbdata.index });
									});
								});
							});
						}
					});
			})
			.catch(Response => {
				console.log("Exception > ", Response);
				res.end("There are no informations about such an exploit!");
			});
	} else {
		res.end("There are no informations about such an exploit!");
	}
}

module.exports = {
	request: request,
};

return 1;
