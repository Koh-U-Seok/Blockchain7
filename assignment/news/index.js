function move() {
  let container = document.getElementById("stock_market_container");

  roop = setInterval(function () {
    let dolly = container.firstElementChild.cloneNode(true);
    let cnt = 1;
    container.append(dolly);
    [...document.querySelectorAll(".stock_market_content")].forEach((item) => {
      item.style.transition = " transform linear 2s";
      item.style.transform = "translateX(-" + cnt * 200 + "px)";
      item.style.transitio = "none";
    });
    container.firstElementChild.remove();
  }, 2000);
}
document.addEventListener("DOMContentLoaded", function () {
  move();
});
document.getElementById("stock_market_container").onmouseover = () => {
  console.log("마우스 올려졌다");
  [...document.getElementById("stock_market_container").children].forEach(
    (item) => ((item.style.animationPlayState = "paused"), console.log(item))
  );
};
document.getElementById("stock_market_container").onmouseout = () => {
  console.log("마우스 떠났다");
  [...document.getElementById("stock_market_container").children].forEach(
    (item) => ((item.style.animationPlayState = "running"), console.log(item))
  );
};
let currP = document.querySelector(
  ".news_body_2_right_1_top_right_center_left"
);
let allP = document.querySelector(
  ".news_body_2_right_1_top_right_center_right"
);
allP.innerText = document.getElementById("p_container").childElementCount;

let currPNum = 1;
let allPNum = allP.innerText;
let currPTranslate = 0;
document.querySelector("#planLeft").addEventListener("click", function () {
  if (currPNum > 1) {
    currP.innerText = --currPNum;
    currPTranslate += 100 / allPNum;
    document.querySelector(
      ".news_body_2_right_1_bottom_container"
    ).style.transform = `translate(${currPTranslate}%)`;
  }
});
document.querySelector("#planRight").addEventListener("click", function () {
  if (currPNum < allPNum) {
    currP.innerText = ++currPNum;
    currPTranslate -= 100 / allPNum;
    document.querySelector(
      ".news_body_2_right_1_bottom_container"
    ).style.transform = `translate(${currPTranslate}%)`;
  }
});

let currEp = document.querySelector(
  ".news_body_2_right_5_top_right_center_left"
);
let allEp = document.querySelector(
  ".news_body_2_right_5_top_right_center_right"
);
allEp.innerText = document.getElementById("ep_container").childElementCount;

let currEpNum = 1;
let allEpNum = allEp.innerText;
let currEpTranslate = 0;
document.querySelector("#eventPlanLeft").addEventListener("click", function () {
  if (currEpNum > 1) {
    currEp.innerText = --currEpNum;
    currEpTranslate += 100 / allEpNum;
    document.querySelector(
      ".news_body_2_right_5_bottom_container"
    ).style.transform = `translate(${currEpTranslate}%)`;
  }
});
document
  .querySelector("#eventPlanRight")
  .addEventListener("click", function () {
    if (currEpNum < allEpNum) {
      currEp.innerText = ++currEpNum;
      currEpTranslate -= 100 / allEpNum;
      document.querySelector(
        ".news_body_2_right_5_bottom_container"
      ).style.transform = `translate(${currEpTranslate}%)`;
    }
  });

let currE = document.querySelector(
  ".news_body_6_right_3_top_right_center_left"
);
let allE = document.querySelector(
  ".news_body_6_right_3_top_right_center_right"
);
allE.innerText = document.getElementById("e_container").childElementCount;

let currENum = 1;
let allENum = allE.innerText;
let currETranslate = 0;
document.querySelector("#eventLeft").addEventListener("click", function () {
  if (currENum > 1) {
    currE.innerText = --currENum;
    currETranslate += 100 / allENum;
    document.querySelector(
      ".news_body_6_right_3_bottom_container"
    ).style.transform = `translate(${currETranslate}%)`;
  }
});
document.querySelector("#eventRight").addEventListener("click", function () {
  if (currENum < allENum) {
    currE.innerText = ++currENum;
    currETranslate -= 100 / allENum;
    document.querySelector(
      ".news_body_6_right_3_bottom_container"
    ).style.transform = `translate(${currETranslate}%)`;
  }
});

document.querySelector(".news_scrollheader").style.display = "none";

window.onscroll = function () {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    document.querySelector(".news_scrollheader").style.display = "inline";
  } else {
    document.querySelector(".news_scrollheader").style.display = "none";
  }
};

let fold = document.getElementsByClassName("fold_button");
function foldUnfold(e) {
  let foldDiv = e.target.parentNode.nextElementSibling;
  if (foldDiv.style.display === "block") {
    foldDiv.style.display = "none";
  } else {
    foldDiv.style.display = "block";
  }
}

[...fold].forEach((item) => (item.onclick = (e) => foldUnfold(e)));
let newsCount = 2;
let articleArray = [
  "돈줄 말라붙는 기업들… 회사채 발행 5조원대 급감",
  "연필거지, 양파거지 이어 땅콩거지 등장할까",
  "아이폰14 사세요? 공시지원금 요금할인 비교해봤어요",
  "새만금 풍력으로 700억원 번 교수, 일가족이 '돈방석'",
  '"환율도 물가도 못 잡아" 비판받는 이창용 "말 바꾸기"',
  '"적금 금리 연 10%라더니…" 소비자 뒤통수 치는 은행들',
  '"美 반도체 제재, 韓 영향 없을 듯" 한숨 돌린 삼성·SK',
];

for (let i = 0; i < articleArray.length; i++) {
  let newDiv = document.createElement("div");
  let newText = document.createTextNode(articleArray[i]);
  newDiv.appendChild(newText);
  newDiv.classList.add(`news_body_2_left_2_right_${newsCount++}`);

  let newDivParent = document.querySelector(".news_body_2_left_2_right");
  newDivParent.appendChild(newDiv);
}
