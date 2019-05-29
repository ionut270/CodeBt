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

// const rp = require('request-promise');
// const url = 'https://www.exploit-db.com/';

// function scrapper() {
//     console.log("Scrapping...");
//     rp(url)
//         .then(function (html) {
//             //success!
//             //console.log(html);
//             console.log($('td > a', html).length);
//             //console.log($('td > a', html));
//         })
//         .catch(function (err) {
//             console.log(err, " I am unable to scrap this :(")
//             //handle error
//         });
// }

const puppeteer = require('puppeteer');
const p = require('node-html-parser');
//const $ = require('cheerio');

let scrape = async () => {
    var browser = await puppeteer.launch({
        headless: true
    });
    var page = await browser.newPage();
    await page.goto('https://www.exploit-db.com/');
    await page.waitFor(2000);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    var content = p.parse(bodyHTML, {
        lowerCaseTagName: true, // convert tag name to lower case (hurt performance heavily)
        script: true, // retrieve content in <script> (hurt performance slightly)
        style: true, // retrieve content in <style> (hurt performance slightly)
        pre: true,
        code: true
    });
    console.log(content.querySelectorAll('tbody')[0].childNodes[0].structuredText.split(/\r?\n/));
    let detail_url = content.querySelectorAll('tbody')[0].querySelectorAll('a')[0].outerHTML.split(/href="/)[1].split(/"/)[0];
    let detail_code = detail_url.split(/[/]/)[2];
    console.log(detail_url);
    var page = await browser.newPage();
    await page.goto('https://www.exploit-db.com/exploit/' + detail_code); //46760

    bodyHTML = await page.evaluate(() => console.log(document.body.innerHTML));
    content = p.parse(bodyHTML, {
        lowerCaseTagName: false, // convert tag name to lower case (hurt performance heavily)
        script: false, // retrieve content in <script> (hurt performance slightly)
        style: false, // retrieve content in <style> (hurt performance slightly)
        pre: false,
    });
    console.log(content.querySelectorAll('code').structuredText);
    return bodyHTML;
}
scrape().then((value) => {
    //console.log(value);
})

module.exports = {
    scrap: scrape
};