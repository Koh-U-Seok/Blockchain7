// 회원가입을 위한 모달 창
document.getElementById("sign-up").onclick = function (e) {
  document.getElementById("modal").classList.add("on");
};

// 회원가입
document.getElementById("signupsubmit").onclick = async function (e) {
  e.preventDefault();
  try {
    const data = await axios.post("/api/user/regist", {
      id: document.forms["sign-up-form"].signupid.value,
      pw: document.forms["sign-up-form"].signuppw.value,
      name: document.forms["sign-up-form"].signupname.value,
      gender: document.forms["sign-up-form"].signupgender.value,
      age: document.forms["sign-up-form"].signupage.value,
    });
    document.forms["sign-up-form"].signupid.value =
      document.forms["sign-up-form"].signuppw.value =
      document.forms["sign-up-form"].signupname.value =
      document.forms["sign-up-form"].signupgender.value =
      document.forms["sign-up-form"].signupage.value =
        "";
    document.getElementById("modal").classList.remove("on");
  } catch (err) {
    console.log(err);
  }
};

// 로그인
document.getElementById("sign-in").onclick = async function (e) {
  e.preventDefault();
  if (
    !document.forms["notuser-info"].signinid.value ||
    !document.forms["notuser-info"].signinpw.value
  ) {
    console.log("뭔가 비어있는데~");
    return;
  }
  const data = await axios.post("/api/user/login", {
    id: document.forms["notuser-info"].signinid.value,
    pw: document.forms["notuser-info"].signinpw.value,
  });
  document.forms["notuser-info"].signinid.value = "";
  document.forms["notuser-info"].signinpw.value = "";
  if (data.data.status != 200) {
    console.log("data.data.status : " + data.data.status);
    console.log("잘못된 아이디나 비밀번호~");
    return;
  }
  const tempName = JSON.parse(
    window.atob(document.cookie.split("=")[1].split(".")[1])
  ).name;
  if (!tempName) console.log("tempName은 있다.");
  if (tempName) {
    document.getElementById("user-name").innerText =
      tempName + " 님 어서오세요";
    document.getElementById("userid").innerText = data.data.user;
    console.log("user : " + data.data.user);
    console.log("userid : " + document.getElementById("userid").innerText);
    document.getElementById("user-box").classList.add("on");
    document.getElementById("notuser-box").classList.add("on");
  }
  document.getElementById("board-add").classList.add("on");
};

// 로그아웃
document.getElementById("user-info").onsubmit = async function (e) {
  e.preventDefault();
  console.log("logout 버튼 눌림");
  console.log(
    "document.getElementById('userid').innerText : " +
      document.getElementById("userid").innerText
  );
  try {
    const data = await axios.post("/api/user/logout", {
      id: document.getElementById("userid").innerText,
    });
    console.log("data.data.status : " + data.data.status);
    document.cookie = "log_jwt" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.getElementById("user-name").innerText = "";
    document.getElementById("user-box").classList.remove("on");
    document.getElementById("notuser-box").classList.remove("on");
    document.getElementById("board-add").classList.remove("on");
  } catch (err) {
    console.log(err);
  }
};

// 게시글
document.getElementById("board-add").onsubmit = async function (e) {
  console.log("board-add onsubmit");
  e.preventDefault();
  if (!e.target["board-title"].value) {
    e.target["board-title"].focus();
    return;
  }
  console.log("board-title 있음");
  if (!e.target["board-text"].value) {
    e.target["board-text"].focus();
    return;
  }
  console.log("board-text도 있음");
  try {
    const data = await axios.post("/api/board/add", {
      title: e.target["board-title"].value,
      text: e.target["board-text"].value,
      uptime: Date.now(),
    });
    console.log("data.data.status : " + data.data.status);
    if (data.data.status == 200) {
      e.target["board-title"].value = e.target["board-text"].value = "";
      console.log("board-add 200결과");
    }
  } catch (err) {
    console.error(err);
  }
  getList();
};

let maxCount = 2; // 총 페이지 수
let count = 0; // 현재 페이지

const pageElem = document.getElementById("page");
const listElem = document.getElementById("list");

async function getList() {
  console.log("getList() 실행");
  try {
    const data = await axios.get("/api/board?count=" + count);
    // count = 0 => /api/board?count=0
    // console.log(data.data.maxCount);

    pageElem.innerHTML = "";
    maxCount = data.data.maxCount;
    for (let i = 0; i < maxCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerText = i + 1;
      tempLi.onclick = function (e) {
        count = i;
        pageElem.getElementsByClassName("now")[0].classList.remove("now");
        tempLi.classList.add("now");
        getList();
      };
      if (count === i) {
        tempLi.classList.add("now");
      }
      pageElem.append(tempLi);
    }
    console.log(data);
    listElem.innerHTML = "";
    console.log(data.data.list);
    data.data.list.forEach((data, index) => {
      const tempNum = index;
      // tempData[count].forEach((data) => {
      const tempLi = document.createElement("li");
      const tempTitle = document.createElement("div");
      const tempH3 = document.createElement("h3");
      const tempImg = document.createElement("img");
      const tempText = document.createElement("div");
      const tempWriter = document.createElement("h5");
      const tempP = document.createElement("p");

      const tempTextarea = document.createElement("textarea");
      const tempBtnBox = document.createElement("div");
      const tempDelBtn = document.createElement("img");
      const tempEditBtn = document.createElement("img");
      const tempCancelBtn = document.createElement("img");

      const tempComment = document.createElement("div");
      const tempCommentTextarea = document.createElement("textarea");
      const tempCommentAdd = document.createElement("button");
      const tempCommentList = document.createElement("div");
      const tempCommentText = document.createElement("div");
      tempTitle.classList.add("title");
      tempTitle.onclick = function (e) {
        tempText.classList.toggle("on");
        tempImg.classList.toggle("on");
        tempText.classList.remove("edit");
      };
      tempText.classList.add("text");
      tempImg.src = "./imgs/angle-up-solid.svg";
      tempImg.alt = "list-item-btn";
      tempH3.innerText = data.title;
      tempWriter.innnerText = data.writer;
      console.log(data.writer);
      tempP.innerText = data.text;
      tempTextarea.value = data.text;

      tempBtnBox.classList.add("list-btn-box");
      tempDelBtn.src = "./imgs/trash-solid.svg";
      tempDelBtn.alt = "delete-btn";
      tempDelBtn.classList.add("delete");
      tempDelBtn.onclick = async function (e) {
        try {
          const data = await axios.post("/api/board/delete", {
            count,
            num: index,
          });
          getList();
          console.log(data.data);
        } catch (err) {
          console.log(err);
        }
      };
      tempEditBtn.src = "./imgs/face-grin-tongue-squint-solid.svg";
      tempEditBtn.alt = "edit-btn";
      tempEditBtn.onclick = async function (e) {
        if (tempText.classList.contains("edit")) {
          try {
            const data = await axios.post("/api/board/update", {
              count,
              num: index,
              text: tempTextarea.value,
              time: Date.now(),
            });
            getList();
            console.log(data.data);
          } catch (err) {
            console.log(err);
          }
        } else {
          tempTextarea.value = data.text;
          tempText.classList.add("edit");
        }
      };

      tempCancelBtn.src = "./imgs/xmark-solid.svg";
      tempCancelBtn.alt = "cancel-btn";
      tempCancelBtn.classList.add("cancel");
      tempCancelBtn.onclick = function (e) {
        tempText.classList.remove("edit");
      };

      tempBtnBox.append(tempEditBtn);
      tempBtnBox.append(tempDelBtn);
      tempBtnBox.append(tempCancelBtn);

      tempTitle.append(tempH3);
      tempTitle.append(tempImg);
      tempText.append(tempWriter);
      tempText.append(tempP);
      tempText.append(tempTextarea);
      tempText.append(tempBtnBox);
      tempLi.append(tempTitle);
      tempLi.append(tempText);
      listElem.append(tempLi);
    });
  } catch (err) {
    console.error(err);
  }
}
getList();
