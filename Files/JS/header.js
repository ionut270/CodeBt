
document.addEventListener(
  "DOMContentLoaded",
  function() {
    var client = new XMLHttpRequest();
    client.open("GET", "/file../Components/header.html");
    client.onreadystatechange = function() {
      document.getElementById("HEADER").innerHTML = client.responseText;
    };
    client.send();
    dynamicallyLoadScript('/file../JS/headerMenu.js');
    dynamicallyLoadScript('/file../JS/dropdown.js');
  },
  false
);
function dynamicallyLoadScript(url) {
  var script = document.createElement("script");  // create a script DOM node
  script.src = url;  // set its src to the provided URL
  document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}