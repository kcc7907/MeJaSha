let hidebg = document.querySelectorAll('.hidebg')[0];
let hidebox = document.querySelectorAll('.hidebox')[0];
let login2 = document.querySelectorAll('.login_2')[0];
let signin1 = document.querySelectorAll('.signin1')[0];
let flip = document.querySelectorAll('.flip')[0];
let hmeau = document.querySelectorAll(".hide_meau")[0];
let flipout = document.querySelectorAll(".flipout")[0];
let signin_page = document.querySelectorAll(".signin_page")[0];
let r_top_r = document.querySelectorAll(".r-top-r")[0];
let r_top_l = document.querySelectorAll(".r-top-l")[0];
let menu = document.querySelectorAll(".menu")[0];
let hidelist = document.querySelectorAll(".hidelist")[0];
let oderlist = document.querySelectorAll(".oderlist")[0];
let list_pri = document.querySelectorAll('.food-card-r .price');
let select = document.querySelectorAll('.num');

function show() {
  hidebg.style.display = "block";
  hidebg.style.height = document.body.clientHeight + "px";
  flipout.style.display = "block";
  hidebox.classList.add('-on');
}

function hide() {
  hidebg.style.display = "none";
  flipout.style.display = "none";
  if (flip.classList.contains('-on')) {
    flip.classList.remove('-on');
  }
}

signin1.addEventListener('click', function () {
  flip.classList.add('-on');
});

login2.addEventListener('click', function () {
  flip.classList.remove('-on');
});

menu.addEventListener('click', function () {
  hidelist.style.display = "block";
  hidebg.style.height = document.body.clientHeight + "px";
  hidebg.style.display = "block";
});

r_top_r.addEventListener('click', function () {
  hidelist.style.display = "none";
  hidebg.style.display = "none";
  for (let i = 0; i < list_pri.length; i++) {
    list_pri[i].innerHTML = String(list_pri[i].getAttribute('data-pri')).replace(/^/, '$');
    select[i].innerHTML = '0';
  }
  // localStorage.clear();String(vans).replace(/^/, '$')
});

r_top_l.addEventListener('click', function () {
  if (oderlist.style.display === "none" || oderlist.style.display === "") {
    oderlist.style.display = "block";
  } else {
    oderlist.style.display = "none";
  }
});

function meau_hide() {
  if (hmeau.style.display == "none" || hmeau.style.display == "") {
    hmeau.style.display = 'block';
    hmeau.style.maxHeight = hmeau.scrollHeight + "px";
  } else {
    hmeau.style.maxHeight = '0';
    setTimeout(function () {
      hmeau.style.display = 'none';;
    }, 1000);
  }
};

window.onscroll = function () {
  myFunction()
};

let qwe = document.querySelector("#calendar").scrollTop;
let qaz = document.querySelector("#process").getBoundingClientRect().top + window.scrollY;
let wsx = document.querySelector("#news").getBoundingClientRect().top + window.scrollY;
let edc = document.querySelector("#calendar").getBoundingClientRect().top + window.scrollY;
let edc1 = document.querySelector("#calendar").getBoundingClientRect().top;
let rfv = document.querySelector("#gotop").getBoundingClientRect().top + window.scrollY;
let iop = document.querySelector("#gotop");

function myFunction() {
  if (document.documentElement.scrollTop > (qaz - 300)) {
    document.getElementById("process").classList.add('-on');
  }
  if (document.documentElement.scrollTop > (wsx - 300)) {
    document.getElementById("news").classList.add('-on');
  }
  if (document.querySelector("#calendar").getBoundingClientRect().top < 300) {
    document.getElementById("calendar").classList.add('-on');
  }
  iop.classList.toggle('-on', window.scrollY > (wsx - 300));
}

iop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

//  <==========    foodlist    ==========>

let add_btn = document.querySelectorAll('.add-btn');
let wrap = document.querySelectorAll('ul.wrap')[0];
let r_list_ul = document.querySelectorAll(".r-list-ul")[0];
let total_num = document.querySelectorAll(".total-num")[0];

// <== addbtn ==>

wrap.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'add-btn') {
    let list_name = e.target.closest('li').querySelectorAll('.food-card-l h4')[0].innerHTML;
    let list_num = e.target.closest('li').querySelectorAll('.numbox .num')[0].innerHTML;
    let list_pri = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML;
    let item_id = Date.now();
    // if (parseInt(list_num) === 0) {
    if (list_num === '0') {
      return;
    } else {
      let task = {
        "item_id": item_id,
        "list_name": list_name,
        "num": list_num,
        "price": list_pri
      };

      //存ls
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks) {
        tasks.unshift(task);
      } else {
        tasks = [task];
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
      //
      //更新菜單
      if (tasks) {
        let list_html = "";
        tasks.forEach(function (item, i) {

          list_html += `
                        <li class="r-list-box" data-id="${item.item_id}">
                            <div class="list-name">${item.list_name}</div>
                            <div class="list-num">${item.num}</div>
                            <div class="list-pri">${item.price}</div>
                            <button type="button" class="list-del">X</button>
                        </li>
                    `;
        });
        // 更新total
        let ls = JSON.parse(localStorage.getItem("tasks"));
        var vans = 0;
        for (let i = 0; i < ls.length; i++) {
          vans = vans + parseInt(ls[i].price.replace('$', ''));
        }
        total_num.innerHTML = String(vans).replace(/^/, '$');
        //
        r_list_ul.innerHTML = list_html;
      }
    }
  }
  //
});

//  <==  numbtnl  ==>

wrap.addEventListener('click', (e) => {
  // console.log(e.target.parentNode);
  if (e.target.parentNode.classList.contains('numbtn-l')) {
    let num = e.target.parentNode.parentNode.querySelectorAll('.num')[0];
    let list_pri = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].getAttribute('data-pri');
    if (parseInt(num.innerText) <= 9 && parseInt(num.innerText) > 0) {
      let list_num = parseInt(num.innerText) - 1;
      num.innerText = list_num;
      let new_pri = list_pri.replace('$', '') * list_num;
      e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML = String(new_pri).replace(/^/, '$');
    }
  }
});

//  <==  numbtnr  ==>

wrap.addEventListener('click', (e) => {
  // console.log(e.target.parentNode);
  if (e.target.parentNode.classList.contains('numbtn-r')) {
    let num = e.target.parentNode.parentNode.querySelectorAll('.num')[0];
    let list_pri = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].getAttribute('data-pri');

    if (parseInt(num.innerText) >= 0 && parseInt(num.innerText) < 9) {
      let list_num = parseInt(num.innerText) + 1;
      num.innerText = list_num;
      let new_pri = list_pri * list_num;
      e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML = String(new_pri).replace(/^/, '$');
    }
  }
});

// <==  clearAll ==>

let total_box = document.querySelectorAll('.total-box')[0];

total_box.addEventListener('click', (e) => {
  if (e.target.classList.contains('clear-all')) {
    r_list_ul.innerHTML = '';
    localStorage.clear();
    total_num.innerHTML = '$0';
  }
});

//  <==  clearList  ==>

r_list_ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('list-del')) {
    e.target.closest('li').remove();
    let item_id = e.target.closest("li").getAttribute("data-id");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log(item_id);
    let updated_tasks = [];
    tasks.forEach(function (task, i) {
      if (item_id != task.item_id) {
        updated_tasks.push(task);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    // 更新total
    let ls = JSON.parse(localStorage.getItem("tasks"));
    var vans = 0;
    for (let i = 0; i < ls.length; i++) {
      vans = vans + parseInt(ls[i].price.replace('$', ''));
    }
    total_num.innerHTML = String(vans).replace(/^/, '$');
    //
  }
});

//  <==========    loginpage    ==========>

//  <==  password-eye  ==>

let eye = document.querySelectorAll('.eye')[0];
let eye_img = document.querySelectorAll('.eye img')[0];
let user_password = document.querySelectorAll('#user_password')[0];

eye.addEventListener('click', () => {
  if (user_password.type === 'password' || user_password.type === '') {
    user_password.type = 'text';
    let new_src = eye_img.src.replace(/visibility/, 'invisible');
    eye_img.src = new_src;
  } else {
    user_password.type = 'password';
    let new_src = eye_img.src.replace(/invisible/, 'visibility');
    eye_img.src = new_src;
  }
});

//  <==  id_blur  ==> saymyname@mail.com

let user_id = document.querySelectorAll('#user_id')[0];

user_id.addEventListener('blur', () => {
  let mail = getCookie('id');
  if (user_id.value !== mail && user_id.value !== '') {
    // console.log('erro');
    user_id.classList.add('-erro');
  } else {
    user_id.classList.remove('-erro');
  }

});
//  <==========    cookie    ==========>

// <==  設定 cookie  ==>

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//  <==  取得 cookie 的值  ==>

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

//  <==  檢查某 cookie 是否存在  ==>

function checkCookie(cname) {
  var cookie_value = getCookie(cname);
  if (cookie_value != "") {
    return true;
  } else {
    return false;
  }
}

//  <==  暫存登入資料  ==>

setCookie("id", "saymyname@mail.com ", 0.1);
setCookie("pas", "heisenberg", 0.1);