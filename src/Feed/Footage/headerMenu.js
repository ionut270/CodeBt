var page = [
  {
    name: "Feed",
    url: "/feed"
  },
  {
    name: "Dashboard",
    url: "/dash"
  },
  {
    name: "Security Flaws",
    url: "/dash"
  },
  {
    name: "Solutions",
    url: "/dash"
  },
  {
    name: "Forum",
    url: "/dash"
  },
  {
    name: "Info",
    url: "/dash"
  }
];
var user = {
  username: "ionut270",
  thumbnail:
    "https://scontent.fias1-1.fna.fbcdn.net/v/t1.0-9/48363109_1982973948438243_5096486795630084096_n.jpg?_nc_cat=101&_nc_ht=scontent.fias1-1.fna&oh=9d9f2c9c56688a2adfa543d554740397&oe=5D0482B6"
};

let status = "";
var txt = "";
for (x in page) {
  if (
    page[x].url === window.location.href.replace("http://localhost:3000", "")
  ) {
    status = "Active";
  } else {
    status = "";
  }
  txt +=
    '<div class="headerButton ' +
    status +
    '"><a href="' +
    page[x].url +
    '">' +
    page[x].name +
    "</a></div>";
    txt+='<div role="none" class="dropdown-divider"></div>';
}
document.getElementById("headerMenu").innerHTML = txt;
