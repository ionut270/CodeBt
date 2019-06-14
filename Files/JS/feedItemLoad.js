String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, "g"), replacement);
};
function subscribe(data, type) {
	fetch("/GET/subscribe/" + type + "/" + data)
		.then(response => {
			/** TODO
			 * Update subs !
			 */
			if (subs === undefined) {
				subs = [];
				subs[type] = [];
				subs[type].push(data);
				renderSubscriberList();

				for (i = 0; i < document.getElementsByClassName(data).length; i++) {
					//console.log("class", document.getElementsByClassName(data)[i].className);
					document.getElementsByClassName(data)[i].classList.remove("BTNbutton--black");
					document.getElementsByClassName(data)[i].classList.add("BTNbutton--green");
				}
			} else {
				if (subs[type] === undefined) {
					subs[type] = [];
					subs[type].push(data);
					renderSubscriberList();

					for (i = 0; i < document.getElementsByClassName(data).length; i++) {
						//console.log("class", document.getElementsByClassName(data)[i].className);
						document.getElementsByClassName(data)[i].classList.remove("BTNbutton--black");
						document.getElementsByClassName(data)[i].classList.add("BTNbutton--green");
					}
				} else {
					//singurul caz in care pot avea dubluri  ...

					if (subs[type].indexOf(data) === -1) {
						//adica nu sunt abonat
						//verific daca avem null prin array
						if (subs[type].indexOf(null) === -1) {
							//daca nu avem null in array pusham
							subs[type].push(data);
							renderSubscriberList();
						} else {
							//avem null pusham pe locul ala
							subs[type][subs[type].indexOf(null)] = data;
							renderSubscriberList();
						}
						for (i = 0; i < document.getElementsByClassName(data).length; i++) {
							//console.log("class", document.getElementsByClassName(data)[i].className);
							document.getElementsByClassName(data)[i].classList.remove("BTNbutton--black");
							document.getElementsByClassName(data)[i].classList.add("BTNbutton--green");
						}
					} else {
						// sunt abonat deci caut poz aia si o sterg

						for (i = 0; i < document.getElementsByClassName(data).length; i++) {
							//console.log("class", document.getElementsByClassName(data)[i].className);
							document.getElementsByClassName(data)[i].classList.remove("BTNbutton--green");
							document.getElementsByClassName(data)[i].classList.add("BTNbutton--black");
						}

						subs[type].splice(subs[type].indexOf(data), 1);
						renderSubscriberList();
					}
				}
			}
			//console.log(subs);
		})
		.catch(res => {
			console.log("Exception > ", res);
		});
}
function subscribePlatform(data) {
	subscribe(data, "Platform");
}
function subscribeType(data) {
	subscribe(data, "Type");
}
function subscribeAuthor(data) {
	subscribe(data, "Author");
}

var start_at = 0;
var old_at = 0;
var globalItems;

document.addEventListener("DOMContentLoaded", loadItems(), false);

var globalPage = 1;

function convertToArray() {
	//console.log("Converting!", subs);
	if (subs != undefined) {
		if (typeof subs.Platform === "object") {
			//console.log("true");
			subs.Platform = Object.keys(subs.Platform).map(function(key) {
				return [subs.Platform[key]];
			});
		}

		if (typeof subs.Type === "object") {
			//console.log("true");
			subs.Type = Object.keys(subs.Type).map(function(key) {
				return [subs.Type[key]];
			});
		}

		if (typeof subs.Author === "object") {
			//console.log("true");
			subs.Author = Object.keys(subs.Platform).map(function(key) {
				return [subs.Author[key]];
			});
		}
	}
}
function loadItems() {
	if (document.getElementsByClassName("mainBody")[0].scrollTop === 0) {
		document.getElementById("feedList").innerHTML =
			'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
		var client = new XMLHttpRequest();
		client.open("GET", "/file../Components/feedItem.html");
		client.onload = function() {
			fetch("/GET/items", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					start_at: start_at,
					item_nr: 15,
				},
			})
				.then(function(response) {
					return response.json();
				})
				.then(function(items) {
					//convertToArray();
					//console.log(typeof(subs.Platform),typeof(subs.Type),typeof(subs.Author));
					globalItems = items;
					var txt = "";
					var x = items.lastItemId;
					for (x in items) {
						if (items[x] != undefined) {
							start_at = x;
							txt += client.responseText
								.replaceAll("{{ PLATFORM }}", items[x].Platform)
								.replaceAll("{{ SUBSCRIBE_PLATFORM }}", items[x].Platform)
								.replaceAll("{{ SOURCE }}", "https://www.exploit-db.com/" + items[x].url)
								.replaceAll("{{ DESCRIPTION }}", items[x].Title)
								.replaceAll("{{ TYPE }}", items[x].Type)
								.replaceAll("{{ SUBSCRIBE_TYPE }}", items[x].Type)
								.replaceAll("{{ DATE }}", items[x].Date)
								.replaceAll("{{ AUTHOR }}", items[x].Author)
								.replaceAll("{{ SUBSCRIBE_AUTHOR }}", items[x].Author)
								.replaceAll("{{ URL }}", "/item/" + items[x].url);

							if (subs != undefined) {
								//console.log(subs);
								if (subs.Platform === undefined) {
									txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
								} else {
									//nu e undefined si trebuie sa verific
									//console.log("www", subs.Platform.indexOf(items[x].Platform), items[x].Platform, subs.Platform);
									if (subs.Platform.indexOf(items[x].Platform) === -1) {
										//neabonat => black
										txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
									} else {
										//abonat
										txt = txt.replace("{{ PLATFORM_COLOR }}", "green").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
									}
								}

								if (subs.Type === undefined) {
									txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
								} else {
									//nu e undefined si trebuie sa verific
									if (subs.Type.indexOf(items[x].Type) === -1) {
										//neabonat => black
										txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
									} else {
										//abonat
										txt = txt.replace("{{ TYPE_COLOR }}", "green").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
									}
								}

								if (subs.Author === undefined) {
									txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
								} else {
									//nu e undefined si trebuie sa verific
									if (subs.Author.indexOf(items[x].Author) === -1) {
										//neabonat => black
										txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
									} else {
										//abonat
										txt = txt.replace("{{ AUTHOR_COLOR }}", "green").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
									}
								}
							} else {
								txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
								txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
								txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
							}
						}
					}
					txt += '<div class="feedItem"><div class="pagination" style="margin: 0 auto;" >';
					var startAt = globalPage - 6;
					if (startAt < 1) {
						startAt = 1;
					}
					for (let i = startAt; i <= startAt + 10; i++) {
						if (i === globalPage) {
							txt +=
								'<a onclick="gotoPage(' +
								i +
								')" class="paginated BTNbutton--red button" style="border-radius: 100%;width: 1em;height: 1em;padding: 1em;">' +
								i +
								"</a>";
						} else
							txt +=
								'<a onclick="gotoPage(' +
								i +
								')" class="paginated BTNbutton--white button" style="border-radius: 100%;width: 1em;height: 1em;padding: 1em;">' +
								i +
								"</a>";
					}
					txt += "</div> </div>";
					document.getElementById("feedList").innerHTML = txt;
				})
				.catch(res => {
					console.log("Exception > ", res);
				});
		};
		client.send();
	} else {
		document.getElementsByClassName("mainBody")[0].scrollTop = 0;
		loadItems();
		//console.log(document.getElementsByClassName("mainBody")[0].scrollTop);
	}
}

function loadItemsCategory(res) {
	document.getElementById("feedList").innerHTML =
		'<div class="loads-ring"><div></div><div></div><div></div><div></div></div>';
	var client = new XMLHttpRequest();
	client.open("GET", "/file../Components/feedItem.html");
	client.onload = function() {
		globalItems = res;
		var txt = "";
		//convertToArray();
		for (x in res) {
			if (res[x] != undefined) {
				start_at = x;
				txt += client.responseText
					.replaceAll("{{ PLATFORM }}", res[x].Platform)
					.replaceAll("{{ SUBSCRIBE_PLATFORM }}", res[x].Platform)
					.replaceAll("{{ SOURCE }}", "https://www.exploit-db.com/" + res[x].url)
					.replaceAll("{{ DESCRIPTION }}", res[x].Title)
					.replaceAll("{{ TYPE }}", res[x].Type)
					.replaceAll("{{ SUBSCRIBE_TYPE }}", res[x].Type)
					.replaceAll("{{ DATE }}", res[x].Date)
					.replaceAll("{{ AUTHOR }}", res[x].Author)
					.replaceAll("{{ SUBSCRIBE_AUTHOR }}", res[x].Author)
					.replaceAll("{{ URL }}", "/item/" + res[x].url);

				if (subs != undefined) {
					if (subs.Platform === undefined) {
						txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
					} else {
						//nu e undefined si trebuie sa verific
						if (subs.Platform.indexOf(res[x].Platform) === -1) {
							//neabonat => black
							txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
						} else {
							//abonat
							txt = txt.replace("{{ PLATFORM_COLOR }}", "green").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
						}
					}

					if (subs.Type === undefined) {
						txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
					} else {
						//nu e undefined si trebuie sa verific
						if (subs.Type.indexOf(res[x].Type) === -1) {
							//neabonat => black
							txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
						} else {
							//abonat
							txt = txt.replace("{{ TYPE_COLOR }}", "green").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
						}
					}

					if (subs.Author === undefined) {
						txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
					} else {
						//nu e undefined si trebuie sa verific
						if (subs.Author.indexOf(res[x].Author) === -1) {
							//neabonat => black
							txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
						} else {
							//abonat
							txt = txt.replace("{{ AUTHOR_COLOR }}", "green").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
						}
					}
				} else {
					txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
					txt = txt.replace("{{ TYPE_COLOR }}", "black").replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
					txt = txt.replace("{{ AUTHOR_COLOR }}", "black").replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
				}
			}
		}
		document.getElementById("feedList").innerHTML = txt;
	};
	client.send();
}

function gotoPage(page) {
	//console.log(page, "Going!");
	globalPage = page;
	page--;
	page = page * 15;
	start_at = parseInt(Object.keys(globalItems)[Object.keys(globalItems).length - 1]) - page;
	loadItems();
	start_at = 0;
}
