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

var output = document.getElementById("TYPES");
var txt = "";
for (x in type) {
  console.log(type[x]);
  txt += '<div class="icoNested">';
  txt +='<img class="bookmark" src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Bookmark-icon.png" >'
  txt += `<div class="className" onclick="categoryData('`+type[x].name+`','Type')">` + type[x].name + "</div>";
  txt += '</div>';
}
document.getElementById("TYPES").innerHTML = txt;
