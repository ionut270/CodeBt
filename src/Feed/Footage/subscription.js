var subs = [
  {
    name: "Lenovo"
  },
  {
    name: "Apple"
  },
  {
    name: "Romsoft"
  },
  {
    name: "Yonder"
  },
  {
    name: "Stack Overflow"
  },
  {
    name: "Bit defender"
  },
  {
    name: "Amazon"
  },
  {
    name: "Google"
  },
  {
    name: "Endava"
  }
];
var txt = "";
for (x in subs) {
  //console.log(type[x]);
  txt += '<div class="icoNested">';
  txt +=
    '<img class="bookmark" src="https://static.thenounproject.com/png/78795-200.png">';
  txt += '<div class="className">' + subs[x].name + "</div>";
  txt += "</div>";
}
txt += '<div class = "space" ></div>';
document.getElementById("subs").innerHTML = txt;
