document.addEventListener(
	"DOMContentLoaded",
	loadItemInfo(),
	false,
);
function loadItemInfo(){
    var curentItemId = parseInt(window.location.href.split(/\//)[window.location.href.split(/\//).length-1])*-1;
    fetch("/GET/itemInfo",{
        headers: {
            "Content-Type": "application/json",
            itemId:curentItemId
        },
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        var client = new XMLHttpRequest();
			client.open("GET", "/file../Components/itemInfo.html");
			client.onload = function () {
                var txt = client.responseText;
                txt = txt.replace('{{ TITLE }}',res.Title)
                txt = txt.replace('{{ PLATFORM }}',res.Platform)
                txt = txt.replace('{{ DATE }}',res.Date)
                txt = txt.replace('{{ TYPE }}',res.Type)
                txt = txt.replace('{{ AUTHOR }}',res.Author)
                txt = txt.replace('{{ LANGUAGE }}',res.language)
                txt = txt.replace('{{ DATA }}',res.details)
                /**TODO PARCURGE */
                document.getElementsByClassName("elementItemInfo")[0].innerHTML = txt;
                PR.prettyPrint()
            }
            client.send();
    })
    .catch(res=>{
        console.log("Exception! > ",res);
    })
}