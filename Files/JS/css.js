
var profile = false;
var activeHead = false;
var active = false;
function change_filter() {
    const mq = window.matchMedia("(orientation: portrait)");
    if (mq.matches === true) {
        if (document.getElementById("filter") === null) {
            if (active === false) {
            document.getElementById("section2").style.display = "block";
            active = true;
            } else {
                document.getElementById("section2").style.display = "none";
                active = false;
            }
        } else {
            console.log("click")
            if (active === false) {
                document.getElementById("filter").style.display = "block";
                active = true;
            } else {
                active = false;
                document.getElementById("filter").style.display = "none";
            }
        }
    } else {
        active = false;
        activeHead = false;
        profile = false;
    }
}
function changeHeaderMenu() {
    const mq = window.matchMedia("(orientation: portrait)");
    if (mq.matches === true) {
        console.log("header");

        active = false;
        if(document.getElementById("filter")!=null){
        document.getElementById("filter").style.display = "none";
        }
        if (profile === false) {
            if (activeHead === false) {
                document.getElementById ("blackout").style.display  ="block";
                document.getElementById("headerMenu").style.display = "block";
                document.getElementById("headerUserContain").style.display = "block";
                activeHead = true;
            } else {
                document.getElementById ("blackout").style.display  ="none";
                document.getElementById("headerMenu").style.display = "none";
                document.getElementById("headerUserContain").style.display = "none";
                activeHead = false;
            }
        }
    } else {
        active = false;
        activeHead = false;
        profile = false;
    }
}

function userProfileTrigger() {
    const mq = window.matchMedia("(orientation: portrait)");
    if (mq.matches === true) {
        console.log(profile);
        console.log(activeHead);
        if (profile === false) {
            document.getElementById("menuUser").style.display = "block";
            profile = true;
        }
        else {
            document.getElementById("menuUser").style.display = "none";
            profile = false;
        }
    } else {
        active = false;
        activeHead = false;
        profile = false;
    }
}

function myFunction(x) {
    x.classList.toggle("change");
}