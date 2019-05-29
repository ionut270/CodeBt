function subscribePlatform(data) {
	/**TODO
	 * Loading animation while requesting
	 * update button status
	 * update subscribe list
	 */
	fetch("/GET/subscribe/Platform/" + data)
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			console.log(response);
			getHeaderData('0');
		})
}

function subscribeType(data) {

}

function subscribeAuthor(data) {

}

document.addEventListener(
	"DOMContentLoaded",
	function () {
		document.getElementById("feedList").innerHTML =
			'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
		var client = new XMLHttpRequest();
		client.open("GET", "/file../Components/feedItem.html");
		client.onload = function () {
			console.log("Loaded!");
			//request data
			///GET/items
			fetch("/GET/items")
				.then(function (response) {
					return response.json();
				})
				.then(function (items) {
					//console.log(items);

					var txt = "";
					//console.log(items.lastItemId + " " + items.firstItemId);
					var x = items.lastItemId;
					for (x; x > items.firstItemId; x--) {
						if (items[x] != undefined) {
							//console.log("x=", x," = ",items[x]);
							//for (x in items) {
							/**TODO
							 * CHECK SUB LIST AND IF THE ITEM IS IN IT TO CHANGE THE BUTTON
							 */
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
								.replace("{{ URL }}", '/item/' + items[x].url.split(/\//)[1]);
						}
						document.getElementById("feedList").innerHTML = txt;
					}
				});

		};
		client.send();
	},
	false,
);