document.addEventListener(
	"DOMContentLoaded",
	function () {
		var output = parseCookie();
		getHeaderData(output.session);
	},
	false,
);


function getHeaderData(key) {
	console.log("HeaderData!");
	fetch("/GET/profile/header")
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			var client = new XMLHttpRequest();
			client.open("GET", "/file../Components/header.html");
			client.onload = function () {
				var txt = "";
				if (myJson.own) {
					txt += client.responseText
						.replace("{{HEADTHUMBNAIL}}", myJson.picture);
					headerData = myJson;
				} else {
					txt += client.responseText
						.replace("{{HEADTHUMBNAIL}}", "/file../user.png");
					headerData = {
						username: "Guest",
					}
				}
				document.getElementById("HEADER").innerHTML = txt;
				dynamicallyLoadScript("/file../JS/dropdown.js");
				/**TODO
				 * ASYNC FUNCTION TO PROPERLY LAOD THE MENU'S
				 */
				dynamicallyLoadScript("/file../JS/headerMenu.js");
			};
			client.send();
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
		document.cookie.split(/\s*;\s*/).forEach(function (pair) {
			pair = pair.split(/\s*=\s*/);
			output[pair[0]] = pair.splice(1).join("=");
		});
	}
	return output;
}