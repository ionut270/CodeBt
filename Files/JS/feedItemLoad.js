function subscribePlatform(data) {
	fetch("/GET/subscribe/Platform/" + data)
		.then(response => {
			return response.text();
		})
		.then(response => {
			getHeaderData("0");
			//updateFeedItem()
		})
		.catch(res => {
			console.log("Exception > ", res);
			//updateFeedItem()
		});
}

function subscribeType(data) {
	fetch("/GET/subscribe/Type/" + data)
		.then(response => {
			return response.text();
		})
		.then(response => {
			//updateFeedItem()
			getHeaderData("0");
		})
		.catch(res => {
			console.log("Exception > ", res);
			//updateFeedItem()
		});
}

function subscribeAuthor(data) {
	console.log("!!!!!");
	console.log(data);
	fetch("/GET/subscribe/Author/" + data)
		.then(response => {
			return response.text();
		})
		.then(response => {
			//updateFeedItem()
			getHeaderData("0");
		})
		.catch(res => {
			console.log("Exception > ", res);
			//updateFeedItem()
		});
}

var start_at = 0;
var old_at = 0;

document.addEventListener(
	"DOMContentLoaded",
	function() {
		document.getElementById("feedList").innerHTML =
			'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
		var client = new XMLHttpRequest();
		client.open("GET", "/file../Components/feedItem.html");
		client.onload = function() {
			fetch("/GET/items",{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'start_at':start_at
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
				.then(function(response) {
					return response.json();
				})
				.then(function(items) {
					var txt = "";
					var x = items.lastItemId;
					//console.log(items) // vreau doar 15 elemente
					for (x in items) {
						if (items[x] != undefined) {
							start_at = x;
							console.log(x);
							txt += client.responseText
								.replace("{{ PLATFORM }}", items[x].Platform)
								.replace("{{ SUBSCRIBE_PLATFORM }}", items[x].Platform)
								.replace("{{ SOURCE }}", "https://www.exploit-db.com/" + items[x].url)
								.replace("{{ DESCRIPTION }}", items[x].Title)
								.replace("{{ TYPE }}", items[x].Type)
								.replace("{{ SUBSCRIBE_TYPE }}", items[x].Type)
								.replace("{{ DATE }}", items[x].Date)
								.replace("{{ AUTHOR }}", items[x].Author)
								.replace("{{ SUBSCRIBE_AUTHOR }}", items[x].Author)
								.replace("{{ URL }}", "/item/" + items[x].url.split(/\//)[1]);

							if (subs.Platform.indexOf(items[x].Platform) !== -1) {
								txt = txt.replace("{{ PLATFORM_COLOR }}", "green").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "X");
							} else {
								txt = txt.replace("{{ PLATFORM_COLOR }}", "red").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "+");
							}

							if (subs.Type.indexOf(items[x].Type) !== -1) {
								txt = txt.replace("{{ TYPE_COLOR }}", "green").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "X");
							} else {
								txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "+");
							}

							if (subs.Author.indexOf(items[x].Author) !== -1) {
								txt = txt.replace("{{ AUTHOR_COLOR }}", "green").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "X");
							} else {
								txt = txt.replace("{{ AUTHOR_COLOR }}", "red").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "+");
							}
						}
						document.getElementById("feedList").innerHTML = txt;
					}
				})
				.catch(res => {
					console.log("Exception > ", res);
				});
		};
		client.send();
	},
	false,
);

function next_page (){
	old_at = start_at;
	document.getElementById("feedList").innerHTML =
	'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
var client = new XMLHttpRequest();
client.open("GET", "/file../Components/feedItem.html");
client.onload = function() {
	fetch("/GET/items",{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'start_at':start_at
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(items) {
			var txt = "";
			var x = items.lastItemId;
			//console.log(items) // vreau doar 15 elemente
			for (x in items) {
				if (items[x] != undefined) {
					start_at = x;
					console.log(x);
					txt += client.responseText
						.replace("{{ PLATFORM }}", items[x].Platform)
						.replace("{{ SUBSCRIBE_PLATFORM }}", items[x].Platform)
						.replace("{{ SOURCE }}", "https://www.exploit-db.com/" + items[x].url)
						.replace("{{ DESCRIPTION }}", items[x].Title)
						.replace("{{ TYPE }}", items[x].Type)
						.replace("{{ SUBSCRIBE_TYPE }}", items[x].Type)
						.replace("{{ DATE }}", items[x].Date)
						.replace("{{ AUTHOR }}", items[x].Author)
						.replace("{{ SUBSCRIBE_AUTHOR }}", items[x].Author)
						.replace("{{ URL }}", "/item/" + items[x].url.split(/\//)[1]);

					if (subs.Platform.indexOf(items[x].Platform) !== -1) {
						txt = txt.replace("{{ PLATFORM_COLOR }}", "green").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ PLATFORM_COLOR }}", "red").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "+");
					}

					if (subs.Type.indexOf(items[x].Type) !== -1) {
						txt = txt.replace("{{ TYPE_COLOR }}", "green").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "+");
					}

					if (subs.Author.indexOf(items[x].Author) !== -1) {
						txt = txt.replace("{{ AUTHOR_COLOR }}", "green").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ AUTHOR_COLOR }}", "red").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "+");
					}
				}
				document.getElementById("feedList").innerHTML = txt;
			}
		})
		.catch(res => {
			console.log("Exception > ", res);
		});
};
client.send();
}

function prev_page (){
	document.getElementById("feedList").innerHTML =
	'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
var client = new XMLHttpRequest();
client.open("GET", "/file../Components/feedItem.html");
client.onload = function() {
	fetch("/GET/items",{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'start_at':old_at
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(items) {
			var txt = "";
			var x = items.lastItemId;
			for (x in items) {
				if (items[x] != undefined) {
					end_at = x;
					break;
				}
			}
			//console.log(items) // vreau doar 15 elemente
			for (x in items) {
				if (items[x] != undefined) {
					start_at = x;
					console.log(x);
					txt += client.responseText
						.replace("{{ PLATFORM }}", items[x].Platform)
						.replace("{{ SUBSCRIBE_PLATFORM }}", items[x].Platform)
						.replace("{{ SOURCE }}", "https://www.exploit-db.com/" + items[x].url)
						.replace("{{ DESCRIPTION }}", items[x].Title)
						.replace("{{ TYPE }}", items[x].Type)
						.replace("{{ SUBSCRIBE_TYPE }}", items[x].Type)
						.replace("{{ DATE }}", items[x].Date)
						.replace("{{ AUTHOR }}", items[x].Author)
						.replace("{{ SUBSCRIBE_AUTHOR }}", items[x].Author)
						.replace("{{ URL }}", "/item/" + items[x].url.split(/\//)[1]);

					if (subs.Platform.indexOf(items[x].Platform) !== -1) {
						txt = txt.replace("{{ PLATFORM_COLOR }}", "green").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ PLATFORM_COLOR }}", "red").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "+");
					}

					if (subs.Type.indexOf(items[x].Type) !== -1) {
						txt = txt.replace("{{ TYPE_COLOR }}", "green").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "+");
					}

					if (subs.Author.indexOf(items[x].Author) !== -1) {
						txt = txt.replace("{{ AUTHOR_COLOR }}", "green").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "X");
					} else {
						txt = txt.replace("{{ AUTHOR_COLOR }}", "red").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "+");
					}
				}
				document.getElementById("feedList").innerHTML = txt;
			}
		})
		.catch(res => {
			console.log("Exception > ", res);
		});
};
client.send();
}