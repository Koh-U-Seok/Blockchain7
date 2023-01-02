let computerRsp;
let userRsp;
let rspImage = ["rspScissor.jpg", "rspRock.jpg", "rspPaper.jpg"];
let rspImageIndex = 0;
let coin = 1000;
let children = [...document.getElementById("rspOdds").children];
// 초기 지급 1000코인
let rspImageChangeInterval;

// 문서에서 태그 이름이 div인 노드를 찾아보자.

//게임 시작 레버 작동
function leverActuation() {
  document.getElementById("box1").style.backgroundColor = "pink";
  document.getElementById("box2").style.backgroundColor = "pink";
  document.getElementById("box3").style.backgroundColor = "greenyellow";
  document.getElementById("box4").style.backgroundColor = "skyblue";
  rspImageChange(500);
  document.getElementById("lever").onclick = () => {
    rspImageChange(250);
    coinRich();
    //100원 이상 소지하고 있는가?
  };
}
function rspImageChange(num) {
  clearInterval(rspImageChangeInterval);
  rspImageChangeInterval = setInterval(() => {
    document
      .getElementById("rspMainImage")
      .setAttribute("src", rspImage[rspImageIndex]);
    rspImageIndex >= 2 ? (rspImageIndex = 0) : rspImageIndex++;
  }, num);
}

// 100원 이상 소지 여부 판별
function coinRich() {
  document.getElementById("lever").onclick = null;
  // 코인을 이미 투입했으니 다시 투입 못하게 막기
  if (coin >= 100) {
    // 100보다 많으니 게임 플레이 가능
    coin -= 100;
    document.getElementById("rspCoin").innerText = coin;
    // 100원 투입
    userSelect();
    // 가위바위보를 선택할 차례.
  } else {
    alert("우리 카지노에서 나가");
    // 끝내기
  }
}

// 유저의 가위바위보를 감지. 감지 즉시
function userSelect() {
  // document.getElementById("rspScissor").onclick = () => {
  //   document.getElementById("rspScissor").style.backgroundColor = "red";
  //   rspImageChangeAccelAndDecel(0);

  //   // 가위바위보 승부하러 가기
  // };
  document.getElementById("rspScissor").addEventListener(
    "click",
    function () {
      document.getElementById("rspScissor").style.backgroundColor = "red";
      rspImageChangeAccelAndDecel(0);
    },
    { once: true }
    // onclick =null을 넣지 않고 once:true로 한번만 실행시킨다.
  );
  document.getElementById("rspRock").onclick = () => {
    document.getElementById("rspRock").style.backgroundColor = "red";
    rspImageChangeAccelAndDecel(1);
  };
  document.getElementById("rspPaper").onclick = () => {
    document.getElementById("rspPaper").style.backgroundColor = "red";
    rspImageChangeAccelAndDecel(2);
  };
}
function rspSeal() {
  // document.getElementById("rspScissor").onclick = null;
  document.getElementById("rspRock").onclick = null;
  document.getElementById("rspPaper").onclick = null;
}
function computerSelect() {
  computerRsp = parseInt(Math.random() * 3) + 1;
  return computerRsp;
}

//rsp 이미지 순간적으로 가속했다가 감속하다가 정지
function rspImageChangeAccelAndDecel(num) {
  setTimeout(() => {
    rspImageChange(100);
    setTimeout(() => {
      rspImageChange(200);
      setTimeout(() => {
        rspImageChange(400);
        setTimeout(() => {
          rspImageChange(800);
          setTimeout(() => {
            clearInterval(rspImageChangeInterval);
            let cS = computerSelect();
            document
              .getElementById("rspMainImage")
              .setAttribute("src", rspImage[cS - 1]);
            rspSeal();
            rspBattle(num + 1, cS);
          }, 100);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

//컴퓨터 가위바위보 패 선택

function coinDraw() {
  coin += 100;
}

function coinWin() {
  let coinBonus;
  let coinRandom;
  let i = 0;
  let coinLoop = setInterval(() => {
    if (i < 30) {
      coinRandom = parseInt(Math.random() * 16);
      document
        .getElementById(`rspOdds${coinRandom}`)
        .classList.add("rspOddsEffect");
      if (i != 29) {
        setTimeout(() => {
          document
            .getElementById(`rspOdds${coinRandom}`)
            .classList.remove("rspOddsEffect");
        }, 100);
      } else {
        setTimeout(() => {
          document
            .getElementById(`rspOdds${coinRandom}`)
            .classList.remove("rspOddsEffect");
        }, 1000);
      }
      coinBonus = parseInt(children[coinRandom].innerText);
      i++;
    } else {
      clearInterval(coinLoop);
    }
  }, 200);
  setTimeout(() => {
    coin += 100 * coinBonus;
  }, 6100);
}

function rspBattle(uS, cS) {
  if (uS == cS) {
    document.getElementById("box4").style.backgroundColor = "blue";
    setTimeout(() => {
      document.getElementById("box4").style.backgroundColor = "skyblue";
      coinDraw();
      rspEnd(1000);
    }, 2000);
  } else if (uS == cS + 1 || uS == cS - 2) {
    document.getElementById("box1").style.backgroundColor = "magenta";
    document.getElementById("box2").style.backgroundColor = "magenta";
    setTimeout(() => {
      document.getElementById("box1").style.backgroundColor = "pink";
      document.getElementById("box2").style.backgroundColor = "pink";
      coinWin();
      rspEnd(6500);
    }, 2000);
  } else if (uS + 1 == cS || uS - 2 == cS) {
    document.getElementById("box3").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("box3").style.backgroundColor = "greenyellow";
      rspEnd(1000);
    }, 2000);
  }

  // 한 차례의 게임을 마친 뒤 leverActuation()으로 돌아간다
}
function rspEnd(num) {
  setTimeout(() => {
    document.getElementById("rspCoin").innerText = coin;
    document.getElementById("rspScissor").style.backgroundColor = "#880000";
    document.getElementById("rspRock").style.backgroundColor = "#880000";
    document.getElementById("rspPaper").style.backgroundColor = "#880000";
    leverActuation();
  }, num);
}
//최초의 게임 시작
leverActuation();
