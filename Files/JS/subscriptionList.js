function renderSubscriberList() {
	var txt = "";
	if (subs === undefined) {
		document.getElementById("SUBSCRIBERS").innerHTML = "You are not subscribed to anything yet !";
	} else {
		type = Object.keys(subs);
		types = type.length;

		for (i in type) {
			for (j in subs[type[i]]) {
				if (subs[type[i]][j] !== null) {
					txt += '<div class="icoNested">';
					if (type[i] === "External") {
						txt += '<img class="bookmark" src="/file../external.png" />';
					} else if (type[i] === "Type") {
						txt += '<img class="bookmark" src="/file../type.png" />';
					} else if (type[i] === "Platform") {
						txt += '<img class="bookmark" src="/file../platform.png" />';
					} else if (type[i] === "Author") {
						txt += '<img class="bookmark" src="/file../user.png" />';
					}
					txt += '<button class="className button noStyle">' + decodeURI(subs[type[i]][j]) + "</button>";
					txt += "</div>";
				}
			}
		}
		document.getElementById("SUBSCRIBERS").innerHTML = txt;
	}
}
renderSubscriberList();

//<div>Icons made by <a href="https://www.flaticon.com/authors/yannick" title="Yannick">Yannick</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
