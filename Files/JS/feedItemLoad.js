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
					console.log("class",document.getElementsByClassName(data)[i].className);
					document.getElementsByClassName(data)[i].classList.remove("BTNbutton--black");
					document.getElementsByClassName(data)[i].classList.add("BTNbutton--green");
				}

			} else {
				if (subs[type] === undefined) {
					subs[type] = [];
					subs[type].push(data);
					renderSubscriberList();

					for (i = 0; i < document.getElementsByClassName(data).length; i++) {
						console.log("class",document.getElementsByClassName(data)[i].className);
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
							console.log("class",document.getElementsByClassName(data)[i].className);
							document.getElementsByClassName(data)[i].classList.remove("BTNbutton--black");
							document.getElementsByClassName(data)[i].classList.add("BTNbutton--green");
						}
					} else {
						// sunt abonat deci caut poz aia si o sterg

						for (i = 0; i < document.getElementsByClassName(data).length; i++) {
							console.log("class",document.getElementsByClassName(data)[i].className);
							document.getElementsByClassName(data)[i].classList.remove("BTNbutton--green");
							document.getElementsByClassName(data)[i].classList.add("BTNbutton--black");
						}

						subs[type].splice(subs[type].indexOf(data), 1);
						renderSubscriberList();
					}
				}
			}
			console.log(subs);
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

document.addEventListener(
	"DOMContentLoaded",
	function() {
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
							console.log(subs);

							if (subs != undefined) {
								if (subs.Platform === undefined) {
									txt = txt.replace("{{ PLATFORM_COLOR }}", "black").replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
								} else {
									//nu e undefined si trebuie sa verific
									if(subs.Platform.indexOf(items[x].Platform) === -1){
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
									if(subs.Type.indexOf(items[x].Type) === -1){
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
									if(subs.Author.indexOf(items[x].Author) === -1){
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
							// if (subs != undefined) {
							// 	if (subs.Platform != undefined) {
							// 		if (subs.Platform.indexOf(items[x].Platform) !== -1) {
							// 			txt = txt
							// 				.replace("{{ PLATFORM_COLOR }}", "green")
							// 				.replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", '<i class="fa fa-check"></i>');
							// 		} else {
							// 			txt = txt
							// 				.replace("{{ PLATFORM_COLOR }}", "black")
							// 				.replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "fa fa-info-circle");
							// 		}
							// 	} else {
							// 		txt = txt
							// 			.replace("{{ PLATFORM_COLOR }}", "black")
							// 			.replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
							// 	}
							// 	if (subs.Type != undefined) {
							// 		if (subs.Type.indexOf(items[x].Type) !== -1) {
							// 			txt = txt
							// 				.replace("{{ TYPE_COLOR }}", "green")
							// 				.replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", '<i class="fa fa-check"></i>');
							// 		} else {
							// 			txt = txt
							// 				.replace("{{ TYPE_COLOR }}", "black")
							// 				.replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
							// 		}
							// 	} else {
							// 		txt = txt
							// 			.replace("{{ TYPE_COLOR }}", "black")
							// 			.replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", '');
							// 	}
							// 	if (subs.Author != undefined) {
							// 		if (subs.Author.indexOf(items[x].Author) !== -1) {
							// 			txt = txt
							// 				.replace("{{ AUTHOR_COLOR }}", "green")
							// 				.replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", '<i class="fa fa-check"></i>');
							// 		} else {
							// 			txt = txt
							// 				.replace("{{ AUTHOR_COLOR }}", "black")
							// 				.replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
							// 		}
							// 	} else {
							// 		txt = txt
							// 			.replace("{{ AUTHOR_COLOR }}", "black")
							// 			.replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
							// 	}
							// } else {
							// 	txt = txt
							// 		.replace("{{ PLATFORM_COLOR }}", "black")
							// 		.replace("{{ PLATFORM_SUBSCRIBE_SIMBOL }}", "");
							// 	txt = txt
							// 		.replace("{{ TYPE_COLOR }}", "black")
							// 		.replace("{{ TYPE_SUBSCRIBE_SIMBOL }}", "");
							// 	txt = txt
							// 		.replace("{{ AUTHOR_COLOR }}", "black")
							// 		.replace("{{ AUTHOR_SUBSCRIBE_SIMBOL }}", "");
							// }
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
