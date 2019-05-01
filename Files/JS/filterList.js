var type = [
  {
    name: "Dos"
  },
  {
    name: "Local"
  },
  {
    name: "Remote"
  },
  {
    name: "Shellcode"
  },
  {
    name: "Papers"
  },
  {
    name: "Webapps"
  }
];

var output = document.getElementById("TYPES");
var txt = "";
for (x in type) {
  //console.log(type[x]);
  txt += '<div class="icoNested">';
  txt +='<img class="bookmark" src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Bookmark-icon.png">'
  txt += '<div class="className">' + type[x].name + "</div>";
  txt += '</div>';
}
document.getElementById("TYPES").innerHTML = txt;
