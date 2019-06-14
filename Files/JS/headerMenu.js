var page = [
	{
		name: "Feed",
		url: "/feed",
	},
	{
		name: "Security tips",
		url: "/security_tips",
	},
	{
		name: "Docs",
		url: "https://ionut270.github.io/CodeBt/",
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
	txt += '<a class="headerButton ' + status + '"  href="' + page[x].url + '"><p>' + page[x].name + "</p></a>";
	txt += '<div role="none" class="dropdown-divider"></div>';
}
document.getElementById("headerMenu").innerHTML = txt;
