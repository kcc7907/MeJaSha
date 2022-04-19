function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var cookie_value = getCookie(cname);
    if (cookie_value != "") {
        return true;
    } else {
        return false;
    }
}

if (checkCookie('open') == true) {
    location.href = "index.html";
}

let layer_1 = document.querySelector("#layer_1");
let layer2 = document.querySelector("#layer2");
let layer3 = document.querySelector("#layer3");
let boat = document.querySelectorAll(".boat")[0];
let sname = document.querySelectorAll(".sname")[0];
let ename = document.querySelectorAll(".ename")[0];
let wave = document.querySelectorAll(".wave");
let snamep = document.querySelectorAll(".sname p");
let sunholder = document.querySelectorAll(".sunholder")[0];
let shrimp = document.querySelectorAll(".shrimp")[0];
let snamespan = document.querySelectorAll(".sname span");

layer_1.addEventListener("animationend", () => {
    sname.classList.add('-on');
    textIn();
});

sname.addEventListener("animationstart", () => {
    waves();
    shrimp.classList.add('-on');
    boat.classList.add('-on');
    setTimeout(() => {
        sunholder.style.opacity = "1";
        ename.style.display = 'block';
    }, 2000)
});

ename.addEventListener("animationend", () => {
    setTimeout(() => {
        for (let i = 0; i < snamep.length; i++) {
            snamep[i].style.transform = "translateX(0px)";
            snamep[i].style.color = "transparent";
            snamep[i].classList.add('-test');
        }
        for (let i = 0; i < snamespan.length; i++) {
            snamespan[i].style.display = "block";
        }
        sname.style.cursor = 'pointer';
    }, 1700)
});

sname.addEventListener("click", () => {
    if (sname.style.cursor == 'pointer') {
        setCookie("open", "opening", 0.1);
        location.href = "index.html";
    }
});

function waves() {
    for (let i = 0; i < wave.length; i++) {
        wave[i].classList.add('waves');
    }
}

function textIn() {
    for (let i = 0; i < snamep.length; i++) {
        snamep[i].classList.add('-on');
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}