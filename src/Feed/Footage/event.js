console.log("the script is kickin");
var type = [
  {
    name: "dos"
  },
  {
    name: "local"
  },
  {
    name: "remote"
  },
  {
    name: "shellcode"
  },
  {
    name: "papers"
  },
  {
    name: "webapps"
  }
];

var output = document.getElementById("type");
var txt="";
txt += '<p class="feedClass">TYPE</p>'
for (x in type) {
  //console.log(type[x]);
  txt += '<div class="className">' + type[x].name + '</div>';
}
document.getElementById("type").innerHTML = txt;
