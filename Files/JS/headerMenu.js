var page = [
	{
		name: "Feed",
		url: "/feed",
	},
];
let status = "";
var txt = "";
for (x in page) {
	if (page[x].url === window.location.href.replace("http://localhost:3000", "")) {
		status = "Active";
	} else {
		status = "";
	}
	txt += '<div class="headerButton ' + status + '"><a href="' + page[x].url + '">' + page[x].name + "</a></div>";
	txt += '<div role="none" class="dropdown-divider"></div>';
}
document.getElementById("headerMenu").innerHTML = txt;
