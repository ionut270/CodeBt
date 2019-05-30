document.addEventListener("DOMContentLoaded", renderFilter(), false);
var subs = {};
var resolver;

function renderFilter() {
	var client = new XMLHttpRequest();
	client.open("GET", "/file../Components/filter.html");
	client.onload = function () {
		document.getElementById("C.FILTER").innerHTML = client.responseText;
		document.getElementById("SUBSCRIBERS").innerHTML = '<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
		fetch("/GET/profile/subs")
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				subs = myJson.sub;
				dynamicallyLoadScript("/file../JS/filterList.js");
				if (subs != undefined) {
					dynamicallyLoadScript("/file../JS/subscriptionList.js");
				} else {
					document.getElementById("SUBTITLE").innerHTML = "";
				}
			})
			.catch(res=>{
				console.log("Exception > ",res)
			});
	};
	client.send();
}

function dynamicallyLoadScript(url) {
	var script = document.createElement("script"); // create a script DOM node
	script.src = url; // set its src to the provided URL
	document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}