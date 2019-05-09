
		var txt = "";
		//otta make a req and get it separately
		for (x in subs) {
			txt += '<div class="icoNested">';
			if (subs[x].type === "External") {
				txt += '<img class="bookmark" src="/file../external.png" />';
			} else if (subs[x].type === "Type") {
				txt += '<img class="bookmark" src="/file../type.png" />';
			} else if (subs[x].type === "Platform") {
				txt += '<img class="bookmark" src="/file../platform.png" />';
			} else if (subs[x].type === "User") {
				txt += '<img class="bookmark" src="/file../user.png" />';
			}

			txt += '<button class="className button noStyle">' + subs[x].identifier + "</button>";
			txt += "</div>";
		}
		document.getElementById("SUBSCRIBERS").innerHTML = txt;



//<div>Icons made by <a href="https://www.flaticon.com/authors/yannick" title="Yannick">Yannick</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
