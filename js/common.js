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
let user = document.querySelectorAll('.user')[0];
let user2 = document.querySelectorAll('.user2')[0];
let a_user = document.querySelectorAll('.a_user')[0];
let a_user2 = document.querySelectorAll('.a_user2')[0];
let loginErroText = document.querySelectorAll('.loginErroText')[0];
let mcDel = document.querySelectorAll('.mcDel')[0];
let cout_btn = document.querySelectorAll('.cout_btn')[0];
let mcOuter = document.querySelectorAll('.mcOuter')[0];
let mcenter = document.querySelectorAll('.mcenter')[0];
let order_done = document.querySelectorAll('.order-done')[0];
let mcenter_ul = document.querySelectorAll('.mcenter ul')[0];

//  <======   longin_show & hide   ======>

function show() {
  hidebg.style.display = "block";
  hidebg.style.height = document.body.clientHeight + "px";
  flipout.style.display = "block";
  hidebox.classList.add('-on');
  setTimeout(() => {
    hidebox.classList.remove('-on');
    testP[0].classList.add('-on');
    testP[1].classList.add('-on');
  }, 1700);
}

function hide() {
  hidebg.style.display = "none";
  flipout.style.display = "none";
  testP[0].classList.remove('-on');
  testP[1].classList.remove('-on');
  user_password.type = 'password';
  let new_src = eye_img.src.replace(/invisible/, 'visibility');
  eye_img.src = new_src;
  if (flip.classList.contains('-on')) {
    flip.classList.remove('-on');
  }
}
//  <======   memberCenter_show & hide   ======>

function mcShow() {
  hidebg.style.display = "block";
  hidebg.style.height = document.body.clientHeight + "px";
  mcOuter.style.display = "block";
  mcenter.classList.add('-on');
  setTimeout(() => {
    mcenter.classList.remove('-on');
  }, 1400);
}

function mcHide() {
  hidebg.style.display = "none";
  mcOuter.style.display = "none";
}

//
signin1.addEventListener('click', function () {
  flip.classList.add('-on');
  testP[0].classList.remove('-on');
  testP[1].classList.remove('-on');
  setTimeout(() => {
    testP[2].classList.add('-on');
  }, 900);
});

login2.addEventListener('click', function () {
  flip.classList.remove('-on');

  testP[2].classList.remove('-on');
  setTimeout(() => {
    testP[0].classList.add('-on');
    testP[1].classList.add('-on');
  }, 900);
});
//

function listShow() {
  hidelist.style.display = "block";
  hidebg.style.height = document.body.clientHeight + "px";
  hidebg.style.display = "block";
};

function meau_hide() {
  if (hmeau.style.display == "none" || hmeau.style.display == "") {
    hmeau.style.display = 'block';
    hmeau.style.maxHeight = hmeau.scrollHeight + "px";
    setTimeout(function () {
      hmeau.style.zIndex = '0';
    }, 800);
  } else {
    hmeau.style.maxHeight = '0';
    hmeau.style.zIndex = '-1';
    setTimeout(function () {
      hmeau.style.display = 'none';
    }, 1000);
  }
};

//    <==========    foodlist    ==========>

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
    let food_card = e.target.closest('li');
    let item_id = Date.now();
    if (list_num === '0') {
      food_card.classList.add('-erro');
      setTimeout(() => {
        food_card.classList.remove('-erro');
      }, 150);
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
});

//  <==  numbtnl  ==>

wrap.addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('numbtn-l')) {
    let num = e.target.parentNode.parentNode.querySelectorAll('.num')[0];
    let list_pri = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].getAttribute('data-pri');
    let food_card = e.target.closest('li');
    if (parseInt(num.innerText) == 0) {
      food_card.classList.add('-erro');
      setTimeout(() => {
        food_card.classList.remove('-erro');
      }, 150);
    } else if (parseInt(num.innerText) <= 9 && parseInt(num.innerText) > 0) {
      let list_num = parseInt(num.innerText) - 1;
      num.innerText = list_num;
      let new_pri = list_pri.replace('$', '') * list_num;
      e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML = String(new_pri).replace(/^/, '$');
    }
  }
});

//  <==  numbtnr  ==>

wrap.addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('numbtn-r')) {
    let num = e.target.parentNode.parentNode.querySelectorAll('.num')[0];
    let list_pri = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].getAttribute('data-pri');
    let food_card = e.target.closest('li');
    let total = e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML;
    if (parseInt(num.innerText) == 9) {
      food_card.classList.add('-erro');
      setTimeout(() => {
        food_card.classList.remove('-erro');
      }, 150);
    } else if (parseInt(num.innerText) >= 0 && parseInt(num.innerText) < 9) {
      let list_num = parseInt(num.innerText) + 1;
      num.innerText = list_num;
      let new_pri = list_pri * list_num;
      e.target.closest('li').querySelectorAll('.food-card-r .price')[0].innerHTML = String(new_pri).replace(/^/, '$');
    }
  } else if (parseInt(e.target.closest('li').querySelectorAll('.num')[0].innerText) == 0) {
    e.target.closest('li').querySelector('.num').innerText = 0;
    e.target.closest('li').querySelector('.food-card-r .price').innerHTML = `$${e.target.closest('li').querySelectorAll('.food-card-r .price')[0].getAttribute('data-pri')}`;
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

//  <==  r_top_r.btn  ==>

r_top_r.addEventListener('click', function () {
  hidelist.style.display = "none";
  hidebg.style.display = "none";
  oderlist.style.display = "none";
  for (let i = 0; i < list_pri.length; i++) {
    list_pri[i].innerHTML = String(list_pri[i].getAttribute('data-pri')).replace(/^/, '$');
    select[i].innerHTML = '0';
  }
});

//  <==  r_top_l.btn  ==>

let receipt = document.querySelectorAll('.receipt')[0];

r_top_l.addEventListener('click', () => {
  let width = window.innerWidth
  if (width > 900) {
    if (oderlist.style.display === "none" || oderlist.style.display === "") {
      oderlist.style.display = "block";
      r_top_l.style.transform = 'scaleX(1)';
    } else {
      oderlist.style.display = "none";
      r_top_l.style.transform = 'scaleX(-1)';
    }
  } else {
    if (oderlist.style.display === "none" || oderlist.style.display === "") {
      oderlist.style.display = "block";
      receipt.style.display = "none";
    } else {
      oderlist.style.display = "none";
      receipt.style.display = "block";
    }
  }
});

//  <==  .header.button  ==>

let header_btn = document.querySelectorAll('.header button')[0];

header_btn.addEventListener('click', () => {
  if (receipt.style.display === "none" || receipt.style.display === "") {
    receipt.style.display = "block";
    oderlist.style.display = "none";
  }
});

//  <==  order_done  ==>

order_done.addEventListener('click', () => {
  if (mcenter_ul.style.opacity == '1') {
    oderwarn.innerText = '餐點準備中';
    receipt.classList.add('-erro');
    setTimeout(() => {
      receipt.classList.remove('-erro');
    }, 500);
  } else if (total_num.innerHTML !== '$0') {
    let x = confirm('是否確認完成點餐?')
    if (x) {
      r_list_ul.innerHTML = '';
      localStorage.clear();
      total_num.innerHTML = '$0';
      oderwarn.innerText = '';
      oderlist.style.display = "none";
      hidelist.style.display = "none";
      mcenter_ul.style.opacity = '1';
      mcShow();
    } else {
      return;
    }
  }
});

//    <==========    loginPage    ==========>


//  <==  passwordEye  ==>

let eye = document.querySelectorAll('.eye')[0];
let eye_img = document.querySelectorAll('.eye img')[0];
let user_id = document.querySelectorAll('#user_id')[0];
let user_id2 = document.querySelectorAll('#user_id2')[0];
let user_password = document.querySelectorAll('#user_password')[0];
let user_password2 = document.querySelectorAll('#user_password2')[0];
let loginbtn = document.querySelectorAll('.loginbtn')[0];
let signinbtn = document.querySelectorAll('.signinbtn')[0];
let phone = document.querySelectorAll('#phone')[0];
let group2p = document.querySelectorAll('.group2 p')[0];
let group1p = document.querySelectorAll('.group1 p')[0];
let group3p = document.querySelectorAll('.group3 p')[0];
let group4p = document.querySelectorAll('.group4 p')[0];
let group5p = document.querySelectorAll('.group5 p')[0];
let oderwarn = document.querySelectorAll('.oderwarn ')[0];

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

//  <==  id_blur  ==>

user_id.addEventListener('blur', () => {
  if (/.+@.+\..+/.test(`${user_id.value}`) != true && user_id.value != '') {
    user_id.classList.add('-erro');
    group1p.style.display = 'block';
    // setTimeout(() => {
    //   user_id.classList.remove('-erro');
    // }, 800);
  } else {
    user_id.classList.remove('-erro');
    group1p.style.display = 'none';
  }
});

//  <==  login_summit  ==>

loginbtn.addEventListener('click', () => {
  let mail = getCookie('id');
  let pas = getCookie('pas');
  if (user_id.value === mail && user_password.value === pas && user_id.value !== '' && user_password.value !== '') {
    user.style.display = 'none';
    user2.style.display = 'inline-block';
    loginErroText.innerText = '';
    a_user.style.display = 'none';
    a_user2.style.display = 'block';
    order_done.disabled = false;
    order_done.classList.add('-active');
    oderwarn.innerText = '';
    hide();
    // mcShow();
  } else if (user_id.value !== mail && user_id.value !== '') {
    hidebox.classList.add('-erro');
    loginErroText.innerText = '查無此帳號';
    setTimeout(() => {
      hidebox.classList.remove('-erro');
    }, 500);
  } else if (user_password.value !== pas && user_password.value !== '') {
    loginErroText.innerText = '帳號密碼錯誤';
    hidebox.classList.add('-erro');
    setTimeout(() => {
      hidebox.classList.remove('-erro');
    }, 500);
  } else if (user_id.value === '' && user_password.value === '') {
    loginErroText.innerText = '';
  }
});

//  <==  password_blur  ==>

user_password.addEventListener('blur', () => {
  let reg = /[^\w_]/;
  if (reg.test(user_password.value) === true) {
    user_password.classList.add('-erro');
    group2p.style.display = 'block';
    // setTimeout(() => {
    //   user_password.classList.remove('-erro');
    // }, 800);
  } else {
    user_password.classList.remove('-erro');
    group2p.style.display = 'none';
  }
});

//  <==  forInputTest  ==>

let testP = document.querySelectorAll('.flip span');

testP[0].addEventListener('click', () => {
  user_id.value = '大帥哥';
  user_password.value = '就是我';
})
testP[1].addEventListener('click', () => {
  user_id.value = 'saymyname@mail.com';
  user_password.value = 'heisenberg';
})
testP[2].addEventListener('click', () => {
  user_id2.value = 'helloWord';
  user_password2.value = '@@@';
  phone.value = '54088';
})

//    <==========    signinpage    ==========>

//  <==  id2_blur  ==>

user_id2.addEventListener('blur', () => {
  if (/.+@.+\..+/.test(`${user_id2.value}`) != true && user_id2.value != '') {
    user_id2.classList.add('-erro');
    group5p.style.display = 'block';
  } else {
    user_id2.classList.remove('-erro');
    group5p.style.display = 'none';
  }
});

//  <==  password_blur  ==>

user_password2.addEventListener('blur', () => {
  let reg = /[^\w_]/;
  if (reg.test(user_password2.value) === true) {
    user_password2.classList.add('-erro');
    group4p.style.display = 'block';
  } else {
    user_password2.classList.remove('-erro');
    group4p.style.display = 'none';
  }
});

//  <==  phone_blur  ==>

phone.addEventListener('blur', () => {
  if (/^09\d{8}/.test(`${phone.value}`) != true && phone.value != '') {
    phone.classList.add('-erro');
    group3p.style.display = 'block';
  } else {
    phone.classList.remove('-erro');
    group3p.style.display = 'none';
  }
});

//    <==========    menberCenter    ==========>

// <==  logOut  ==>

cout_btn.addEventListener('click', () => {
  let x = confirm('是否確認要登出');
  if (x == false) {
    return
  } else {
    a_user.style.display = 'block';
    a_user2.style.display = 'none';
    user.style.display = 'inline-block';
    user2.style.display = 'none';
    hidebg.style.display = "none";
    mcOuter.style.display = "none";
    order_done.disabled = true;
    order_done.classList.remove('-active');
    oderwarn.innerText = '請先登入';
    mcenter_ul.style.opacity = '0';
  }
})



//    <==========    cookie    ==========>

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