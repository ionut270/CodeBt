const scrape = require('./Scrapper/scrapper');

var i = 0;
const currentdate = new Date();
function timeout() {
  console.log("Scrapped ",i," times so far! \nStart date and hour :",currentdate.getDay() + "/"+currentdate.getMonth() 
  + "/" + currentdate.getFullYear() + " @ " 
  + currentdate.getHours() + ":" 
  + currentdate.getMinutes() + ":" + currentdate.getSeconds());
  i++;
  scrape.scrap();
  // var random = Math.floor(Math.random() * 10);
  // // console.log("Running again after",30+random,"minutes!");
	// // setTimeout(() => {
  // //   timeout();
  // // }, 60000 * 30 + random); 
}
timeout();