console.log("Dropdown");
console.log(headerData);
var client = new XMLHttpRequest();
client.open("GET", "/file../Components/h.dropdown.html");
client.onreadystatechange = function() {
	var txt = "";
	if (headerData.own) {
		txt += client.responseText
			.replace("{{LOGGEDUSERNAME}}", "Logged in as " + headerData.username)
			.replace("{{LOGGEDMSG}}", "You'r profile")
			.replace("{{DASHBOARD}}", "You'r dashboard")
			.replace("{{PROFILEURL}}", "/profile/"+headerData.userURL)
			.replace("{{AUTH}}", "Logout");
	} else {
                txt += client.responseText
                .replace("{{LOGGEDUSERNAME}}", "Not logged in!")
                .replace("{{LOGGEDMSG}}", "Log in")
                .replace("{{DASHBOARD}}", "Sign up")
                .replace("{{PROFILEURL}}", '/log')
                .replace("{{AUTH}}", "");
	}
	document.getElementById("USERDROPDOWN").innerHTML = txt;
};
client.send();
