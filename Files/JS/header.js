document.addEventListener(
	"DOMContentLoaded",
	function() {
		var output = parseCookie();
		getHeaderData(output.session);
	},
	false,
);

function getHeaderData(key) {
	fetch("/GET/profile/header")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			var client = new XMLHttpRequest();
			client.open("GET", "/file../Components/header.html");
			client.onload = function() {
				var txt = "";
				if (myJson.own) {
					txt += client.responseText.replace("{{ HEADTHUMBNAIL }}", myJson.picture);
					headerData = myJson;
				} else {
					txt += client.responseText.replace("{{ HEADTHUMBNAIL }}", "/file../user.png");
					headerData = {
						username: "Guest",
					};
				}
				document.getElementById("HEADER").innerHTML = txt;
				dynamicallyLoadScript("/file../JS/dropdown.js");
				dynamicallyLoadScript("/file../JS/headerMenu.js");
			};
			client.send();
		})
		.catch(res => {
			console.log("Exception > ", res);
		});
}
loadNot();
function loadNot() {
	fetch("/GET/profile/header")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			if (window.location.href.indexOf("/notifications") === -1) {
				fetch("/GET/Notifications")
					.then(res => {
						return res.json();
					})
					.then(res => {
						console.log(res);
						console.log(document.getElementById("notificationBell").innerHTML);
						if (res != undefined && res != null) {
							document.getElementById("notificationBell").innerHTML = document
								.getElementById("notificationBell").innerHTML
								.replace("{{ NOTIFIED }}", "link_to_notify")
								.replace("{{ NOTIFIED_MSG }}", "You have notifications!");
						} else {
							document.getElementById("notificationBell").innerHTML = document
							.getElementById("notificationBell").innerHTML
							.replace("{{ NOTIFIED }}", "")
							.replace("{{ NOTIFIED_MSG }}", "You no have notifications!");
						}
						// if (res != undefined && res != null) {
						// 	txt = txt
						// 		.replace("{{ NOTIFIED }}", "link_to_notify")
						// 		.replace("{{ NOTIFIED_MSG }}", "You have notifications!");
						// 	document.getElementById("HEADER").innerHTML = txt;
						// } else {
						// 	txt = txt.replace("{{ NOTIFIED }}", "").replace("{{ NOTIFIED_MSG }}", "");
						// 	document.getElementById("HEADER").innerHTML = txt;
						// }
					});
			}
		});
}

function dynamicallyLoadScript(url) {
	var script = document.createElement("script"); // create a script DOM node
	script.src = url; // set its src to the provided URL
	document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

function parseCookie() {
	var output = {};
	if (document.cookie != undefined) {
		document.cookie.split(/\s*;\s*/).forEach(function(pair) {
			pair = pair.split(/\s*=\s*/);
			output[pair[0]] = pair.splice(1).join("=");
		});
	}
	return output;
}
