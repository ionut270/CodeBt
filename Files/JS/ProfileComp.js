document.addEventListener(
  "DOMContentLoaded",
  function() {
    var output = parseCookie();
    requestUserData(output.session);
  },
  false
);

function requestUserData(key) {
  fetch("/GET/profile/default")
  .then(function(response) {
      console.log("RESPONSE:",response);
      return response.json();
  })
  .then(function(myJson) {
    console.log("OBJ:",myJson);
    var client = new XMLHttpRequest();
    client.open("GET", "/file../Components/profile.html");
    client.onreadystatechange = function() {
      var txt = "";
      if(myJson.own){
        txt += client.responseText
        .replace("{{USERNAME}}", myJson.username)
        .replace("{{EMAIL}}", myJson.email)
        .replace("{{TITLE}}",myJson.title)
        .replace("{{EDIT OR SUBSCRIBE}}","Edit");
      } else {
        txt += client.responseText
        .replace("{{USERNAME}}", myJson.username)
        .replace("{{EMAIL}}", myJson.email)
        .replace("{{TITLE}}",myJson.title)
        .replace("{{EDIT OR SUBSCRIBE}}","Subscribe");
      }
      document.getElementById("C.PROFILE").innerHTML = txt;
      dynamicallyLoadScript("/file../JS/subscriptionList.js");
    };
    client.send();
  });
}

function dynamicallyLoadScript(url) {
  var script = document.createElement("script"); // create a script DOM node
  script.src = url; // set its src to the provided URL
  document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

function parseCookie() {
  var output = {};
  if (document.cookie != undefined) {
    document.cookie.split(/\s*;\s*/).forEach(function(pair) {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join("=");
    });
  }
  return output;
}
