console.log("Dropdown");
var client = new XMLHttpRequest();
client.open('GET', '/file../Components/h.dropdown.html');
client.onreadystatechange = function() {
    document.getElementById("USERDROPDOWN").innerHTML = client.responseText;
}
client.send();