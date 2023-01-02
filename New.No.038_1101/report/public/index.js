function makeList(user, text) {
  const tempBox = document.createElement("div");
  const tempUser = document.createElement("div");
  const tempText = document.createElement("div");

  tempUser.innerText = user;
  tempText.innerText = text;

  tempBox.classList.add("talkBox");
  tempUser.classList.add("talkUser");
  tempText.classList.add("talkText");
  tempBox.append(tempUser);
  tempBox.append(" : ");
  tempBox.append(tempText);
  document.getElementById("board-list").append(tempBox);
}

const sendBtn = document.getElementById("send-msg");
const inputElem = document.getElementById("board-input-text");
function socket() {
  const socket = io();
  document.forms["sign-in"].onsubmit = async function (e) {
    e.preventDefault();
    console.log("버튼 눌림");
    if (!e.target["user-id"].value || !e.target["user-pw"]) return;
    try {
      const data = await axios.post("/api/user/login", {
        id: e.target["user-id"].value,
        pw: e.target["user-pw"].value,
      });
      console.log("data.data.userInfo.id : " + data.data.userInfo.id);
      document.getElementById("userInfo").innerText = e.target["user-id"].value;
      document.getElementById("user-id").value = "";
      document.getElementById("user-pw").value = "";
      document.getElementById("user-login").classList.add("on");
      document.getElementById("user-loggedin").classList.add("on");
      socket.emit("userEnter", {
        user: document.getElementById("userInfo").innerText,
      });
    } catch (error) {
      console.error("에러발생 : " + error);
    }
  };
  socket.on("enter", (data) => {
    const tempBox = document.createElement("div");
    tempBox.innerText = data + "님이 입장하셨습니다.";
    document;
  });
  socket.on("order", (data) => {
    makeList(data.user, data.text);
  });
  socket.on("ender", (data) => {
    const tempBox = document.createElement("div");
    tempBox.innerText = data + "님이 퇴장하셨습니다.";
  });

  sendBtn.onclick = () => {
    if (!document.getElementById("userInfo").innerText) {
      alert("날래날래 로그인하라우");
      return;
    } else if (!document.getElementById("board-input-text").value) {
      alert("최소 한 글자는 입력해야 돼용");
    } else {
      socket.emit("sendText", {
        user: document.getElementById("userInfo").innerText,
        text: inputElem.value,
      });
    }
  };
  document.forms["sign-out"].onsubmit = async function (e) {
    e.preventDefault();
    console.log("로그아웃 트라이직전");
    console.log(document.getElementById("userInfo").innerText);
    try {
      const data = await axios.post("/api/user/logout", {
        id: document.getElementById("userInfo").innerText,
      });
      socket.on("disconnect", (data) => {
        console.log(data);
      });
      console.log("로그아웃 트라이 통과");
      document.getElementById("userInfo").innerText = "";
      document.getElementById("user-login").classList.remove("on");
      document.getElementById("user-loggedin").classList.remove("on");
      console.log("logout");
    } catch (error) {
      console.error("에러발생 : " + error);
    }
  };
}
socket();
