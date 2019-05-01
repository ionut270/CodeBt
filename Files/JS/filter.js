document.addEventListener(
  "DOMContentLoaded",
  function() {
    var client = new XMLHttpRequest();
    client.open("GET", "/file../Components/filter.html");
    client.onreadystatechange = function() {
      document.getElementById("C.FILTER").innerHTML = client.responseText;
    };
    client.send();
    dynamicallyLoadScript("/file../JS/filterList.js");
    dynamicallyLoadScript("/file../JS/subscriptionList.js")
  },
  false
);
function dynamicallyLoadScript(url) {
  var script = document.createElement("script"); // create a script DOM node
  script.src = url; // set its src to the provided URL
  document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
