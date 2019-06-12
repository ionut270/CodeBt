const admin = require("firebase-admin");
const serviceAccount = require("../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://login-684d3.firebaseio.com",
});

const puppeteer = require("puppeteer"),
	p = require("node-html-parser"),
	scrapUrl = "https://www.exploit-db.com/";

function formatPageData(data) {
	data = data.split(/\\n|  /);
	for (i = 0; i < data.length; i++) {
		while (data[i] === "" || data[i] === '"') {
			data.splice(i, 1);
		}
	}
	return data;
}

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(search, replacement);
};

let scrape = async () => {
	console.log("Scrapper launched for https://www.exploit-db.com/ !");
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	//console.log("Sucessfull args!");
	var page = await browser.newPage();
	await page.goto(scrapUrl);
	await page.waitFor(2000);

	let bodyHTML = await page.evaluate(() => document.body.innerHTML);
	const content = p.parse(bodyHTML, {
		lowerCaseTagName: true, // convert tag name to lower case (hurt performance heavily)
		script: true, // retrieve content in <script> (hurt performance slightly)
		style: true, // retrieve content in <style> (hurt performance slightly)
		pre: true,
		code: true,
	});
	await page.close();
	await browser.close();
	var data = [{}];
	var i = 0;
	data[i] = {};
	data[i]["Date"] = content.querySelectorAll("tbody")[0].childNodes[i].structuredText.split(/\r?\n/)[0];
	data[i]["Title"] = content.querySelectorAll("tbody")[0].childNodes[i].structuredText.split(/\r?\n/)[1];
	data[i]["Type"] = content.querySelectorAll("tbody")[0].childNodes[i].structuredText.split(/\r?\n/)[2];
	data[i]["Platform"] = content.querySelectorAll("tbody")[0].childNodes[i].structuredText.split(/\r?\n/)[3];
	data[i]["Author"] = content.querySelectorAll("tbody")[0].childNodes[i].structuredText.split(/\r?\n/)[4];
	data[i]["url"] =
		"exploit" +
		content
			.querySelectorAll("tbody")[0]
			.childNodes[i].outerHTML.split(/<a href="\/exploit/)[1]
			.split(/">/)[0];
	data[i]["index"] = content
		.querySelectorAll("tbody")[0]
		.childNodes[i].outerHTML.split(/<a href="\/exploit/)[1]
		.split(/">/)[0]
		.split(/\//)[1];

	//var i = 0;

	var scrapp = new Promise(function(resolve, reject) {
		console.log(data[0].index);
		ref = admin.database().ref("/items/lastItemId");
		ref.once(`value`, function(snap) {
			console.log("Starting from ...  ", snap.val());
			var dbIndex = parseInt(snap.val()) * -1;
			resolve(scrapeItem({ lastItemId: data[0].index, url: "exploits/" + dbIndex }));
		});
	});

	// sa redefinesc scrap de fiecare data :/
	//ar trebui sa obtin last item id sa stiu cat si de unde merg
	//sau
	//sau
	// trec la elementul urmator pana la data.index din scrapeItem

	scrapp.then(function(res) {
		console.log("**Done running ! Going to sleep till next session starts !**");
	});
};

let scrapeItem = async data => {
	var fail = false;
	console.log("Scrapping ... ", data);
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	console.log("0");
	var page = await browser.newPage();
	console.log("1");
	await page.goto(scrapUrl + data.url).catch(res => {
		console.log("Exception!, Page is too damn huge! ");
		console.log(data.url.split(/\//));
		var pageIndex = parseInt(data.url.split(/\//)[1]) + 1;
		scrapeItem({ lastItemId: data.lastItemId, url: "exploits/" + pageIndex });
		fail = true;
		console.log("Sorry I failed!");
	});
	if (fail === false) {
		console.log("2");
		await page.waitFor(2000);
		console.log("3");

		//solution ? fetch  ? eeh :/

		let bodyHTML = await page.evaluate(() => document.body.innerHTML);
		const content = p.parse(bodyHTML, {
			lowerCaseTagName: true, // convert tag name to lower case (hurt performance heavily)
			script: true, // retrieve content in <script> (hurt performance slightly)
			style: true, // retrieve content in <style> (hurt performance slightly)
			pre: true,
			code: true,
		});
		await page.close();
		await browser.close();

		//const dom = new JSDOM(content.structuredText);
		// /console.log(bodyHTML);
		//var dom = parser.parseFromString(bodyHTML)

		var scraps = {
			Title: "",
			index: "",
			Author: "",
			Type: "",
			Platform: "",
			Date: "",
			language: "",
			details: "",
			url: "",
		};

		if (
			bodyHTML.split(/<h1 class="card-title text-secondary text-center" style="font-size: 2.5em;">/)[1] === undefined
		) {
			console.log("No data here, moving on ... ++ ");
			var myindex = parseInt(data.url.split(/exploits\//)[1]);
			myindex++;
			scrapeItem({ lastItemId: data.lastItemId, url: "exploits/" + myindex });
		} else {
			scraps.Title = JSON.stringify(
				bodyHTML
					.split(/<h1 class="card-title text-secondary text-center" style="font-size: 2.5em;">/)[1]
					.split(/<\/h1>/)[0],
			);
			scraps.Title = formatPageData(scraps.Title).toString();
			//console.log(scraps.title);

			scraps.index = JSON.stringify(bodyHTML.split(/<h6 class="stats-title">/)[1].split(/<\/h6>/)[0]);
			scraps.index = formatPageData(scraps.index).toString();
			//console.log(scraps.id);

			scraps.Author = JSON.stringify(bodyHTML.split(/<h6 class="stats-title">/)[3].split(/<\/h6>/)[0]);
			scraps.Author = formatPageData(scraps.Author)[1].toString();
			//console.log(scraps.author[1]);

			scraps.Type = JSON.stringify(bodyHTML.split(/<h6 class="stats-title">/)[4].split(/<\/h6>/)[0]);
			scraps.Type = formatPageData(scraps.Type)[1].toString();
			//console.log(scraps.type[1]);

			scraps.Platform = JSON.stringify(bodyHTML.split(/<h6 class="stats-title">/)[5].split(/<\/h6>/)[0]);
			scraps.Platform = formatPageData(scraps.Platform)[1].toString();
			//console.log(scraps.platform[1]);

			scraps.Date = JSON.stringify(bodyHTML.split(/<h6 class="stats-title">/)[6].split(/<\/h6>/)[0]);
			scraps.Date = formatPageData(scraps.Date).toString();

			scraps.url = "exploits/" + scraps.index;
			//console.log(scraps.date)

			//console.log("data ... ")
			if (
				content.structuredText.split(/<code class=" language-txt" style="white-space: pre-wrap;">/)[1] === undefined
			) {
				//console.log("is undefined!");
				i = 0;
				var txt = "";
				data["language"] = content.structuredText.split(/<code class=" language-/)[1].split(/"/)[0];
				// while (
				// 	content.structuredText
				// 		.split(/<code class=" language-[a-zA-Z1-9]*" style="white-space: pre-wrap;">/)[1]
				// 		.split(/<\/code>/)[0]
				// 		.split(/<span class="[a-z\-]*\s*[a-z\-]*">|<\/span>/)[i] != undefined
				// ) {
				// 	console.log("while");
				// 	txt += content.structuredText
				// 		.split(/<code class=" language-[a-zA-Z1-9]*" style="white-space: pre-wrap;">/)[1]
				// 		.split(/<\/code>/)[0]
				// 		.split(/<span class="[a-z\-]*\s*[a-z\-]*">|<\/span>/)[i];
				// 	i++;
				// }

				txt += content.structuredText
					.split(/<code class=" language-[a-zA-Z1-9]*" style="white-space: pre-wrap;">/)[1]
					.split(/<\/code>/)[0];
				txt = txt.replace(/<span class="([a-z\-\n]*\n*\s*\n*)*">|<\/span>/gm, "");
				//console.log("out of while");
			} else {
				//console.log("is not undefined");
				data["language"] = "txt";
				var txt = content.structuredText
					.split(/<code class=" language-txt" style="white-space: pre-wrap;">/)[1]
					.split(/<\/code>/)[0];
			}
			//console.log("done data ... ")
			//console.log(txt);
			data["details"] = txt;
			scraps.language = data.language;
			scraps.details = data.details;
			//console.log(scraps);
			var ref;
			//console.log("Data is ", data);

			//DATABASE
			ref = admin.database().ref("/items/lastItemId");
			ref.once(`value`, function(snap) {
				//console.log("DATA FROM DB ", snap.val());
				var dbIndex = parseInt(snap.val());
				ref = admin.database().ref("/items/" + -1 * scraps.index);
				ref.once("value", function(snap) {
					if (snap.val() !== undefined && snap.val() !== null) {
						dbIndex = -1 * scraps.index;
						ref = admin.database().ref("/items/" + -1 * scraps.index);
						ref.set(scraps);
						ref = admin.database().ref("/items/lastItemId");
						ref.set(dbIndex);
					} else {
						ref.set(scraps);
						dbIndex = -1 * scraps.index;
						ref = admin.database().ref("/items/lastItemId");
						ref.set(dbIndex);
					}
				});
				//trec la urmatorul
				if (parseInt(data.lastItemId) >= parseInt(scraps.index)) {
					//console.log("Going forward!");
					var pageIndex = parseInt(scraps.index) + 1;
					//console.log(pageIndex)
					scrapeItem({ lastItemId: data.lastItemId, url: "exploits/" + pageIndex });
				} else {
					//console.log("Not going forward for some reason ", data.lastItemId,scraps.index)
				}
				console.log("Updating data ", scraps.index, "\nLatest item in db ", snap.val());
			});
			return 1;
		}
	}
};

module.exports = {
	scrap: scrape,
};
