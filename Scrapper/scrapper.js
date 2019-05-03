/**
 * teme ?
 *
 * Soap
 * Informatia adusa in mod dinamic ref la stiri
 * Un serviciu 2 functionalitati
 * 1 call cu numele unei surse sa returneze titul ultimei stiri
 * data la care a fost postata ultima stire
 * calluri din client
 */

const admin = require("firebase-admin");
const serviceAccount = require("../login-684d3-firebase-adminsdk-lvtgv-6e51107487.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://login-684d3.firebaseio.com",
});

const puppeteer = require("puppeteer"),
	p = require("node-html-parser"),
	scrapUrl = "https://www.exploit-db.com/";

let scrape = async () => {
	console.log("Scrapper launched for https://www.exploit-db.com/ !");
	const browser = await puppeteer.launch({
		headless: true,
	});

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
	for (i = 0; i < 15; i++) {
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
		//console.log(data[i]);
	}
	//Deci avem 15 urluir
	//new login to implement
	//get the latest id
	//if latest id != latest id from dv =>  go on and check the page
	//else
	//do nothin
	//and store the latest idem in a variable :/
	//or just keep on goin
	var i = 0;
	var scrapp = new Promise(function(resolve, reject) {
		resolve(scrapeItem(data[0]));
	});
	scrapp
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[1]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[2]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[3]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[4]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[5]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[6]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[7]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[8]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[9]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[10]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[11]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[12]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[13]));
			});
		})
		.then(function(res) {
			return new Promise(function(resolve, reject) {
				resolve(scrapeItem(data[14]));
			});
		})
		.then(function(res) {
			console.log("**Done running ! Going to sleep till next session starts !**");
		});
};

let scrapeItem = async data => {
	const browser = await puppeteer.launch({
		headless: true,
	});

	var page = await browser.newPage();
	await page.goto(scrapUrl + data.url);
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
	//console.log(content.structuredText);
	//console.log(content.structuredText.split(/<code class=" language-txt" style="white-space: pre-wrap;">/)[1].split(/<\/code>/)[0])
	if (content.structuredText.split(/<code class=" language-txt" style="white-space: pre-wrap;">/)[1] === undefined) {
		//note !
		//Daca language nu e tip text
		/**Anything with a class diferent from "language-txt will have spans in it" */
		i = 0;
		var txt = "";
		data["language"] = content.structuredText.split(/<code class=" language-/)[1].split(/"/)[0];
		while (
			content.structuredText
				.split(/<code class=" language-[a-zA-Z1-9]*" style="white-space: pre-wrap;">/)[1]
				.split(/<\/code>/)[0]
				.split(/<span class="[a-z\-]*\s*[a-z\-]*">|<\/span>/)[i] != undefined
		) {
			txt += content.structuredText
				.split(/<code class=" language-[a-zA-Z1-9]*" style="white-space: pre-wrap;">/)[1]
				.split(/<\/code>/)[0]
				.split(/<span class="[a-z\-]*\s*[a-z\-]*">|<\/span>/)[i];
			i++;
		}

		//console.log(txt.split(/>/));
	} else {
		data["language"] = "txt";
		var txt = content.structuredText
			.split(/<code class=" language-txt" style="white-space: pre-wrap;">/)[1]
			.split(/<\/code>/)[0];
		//console.log(txt);
		//altfel e simplu
	}
	data["details"] = txt;
	//console.log(data);
	var ref;
	//yay am pushat :/

	ref = admin.database().ref("/items/lastItemId");
	ref.once(`value`, function(snap) {
		console.log("Updating data ", data.index, "\nLatest item in db ", snap.val());
		if (data.index > snap.val()) {
			ref.set(data.index);
		}
		var ref2 = admin.database().ref("/items/" + data.index);
		ref2.set(data);
	});
	//return txt;
	return 1;
};

module.exports = {
	scrap: scrape,
};
