String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, "g"), replacement);
};
document.addEventListener("DOMContentLoaded", loadNotifications(), false);
function loadNotifications() {
            fetch("/file../Components/feedItem.html")
            .then(client=>{
                return client.text();
            })
            .then(client=>{
                console.log(client);
                fetch("/GET/Notifications")
				.then(function(response) {
					return response.json();
				})
				.then(function(items) {
					console.log(items);
					var txt = "";
					for (let i = 0; i < Object.keys(items).length; i++) {
						//console.log(items[Object.keys(items)[i]]);
						for (let j = 0; j < items[Object.keys(items)[i]].length; j++) {
							//console.log("1",items[Object.keys(items)[i]]);
							console.log("2", JSON.stringify(items[Object.keys(items)[i]][j]));
							fetch("/GET/itemInfo", {
								headers: {
									"Content-Type": "application/json",
									itemId: JSON.stringify(parseInt(items[Object.keys(items)[i]][j]) * -1),
								},
							})
								.then(res => {
									return res.json();
								})
								.then(res => {
                                    console.log(res);
                                    txt = client
                                    .replaceAll("{{ PLATFORM }}", res.Platform)
								    .replaceAll("{{ SUBSCRIBE_PLATFORM }}",res.Platform)
								    .replaceAll("{{ SOURCE }}", "https://www.exploit-db.com/" +res.url)
								    .replaceAll("{{ DESCRIPTION }}", res.Title)
								    .replaceAll("{{ TYPE }}", res.Type)
								    .replaceAll("{{ SUBSCRIBE_TYPE }}", res.Type)
								    .replaceAll("{{ DATE }}", res.Date)
								    .replaceAll("{{ AUTHOR }}", res.Author)
								    .replaceAll("{{ SUBSCRIBE_AUTHOR }}", res.Author)
                                    .replaceAll("{{ URL }}", "/item/" + res.url)
                                    .replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "")
                                    .replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "")
                                    .replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
                                    document.getElementById("mainBody").innerHTML += txt;
								});
						}
					}
					//document.getElementById("mainBody").innerHTML = "Hello";
				})
				.catch(res => {
					console.log("Exception > ", res);
				});
            })
}
