let count = 0;
// 지금까지 카드를 몇 쌍이나 집어들었는지 알려주는 변수.
let selectedCardId = [];
// 중요하다.. 길이는 2여야 하며 0의 자리에 첫번째로 집어든 카드, 1의 자리에 두번째로 집어든 카드의 "id"가 들어간다.
let cardStack = 0;
// 지금 카드를 몇 장 집어들었는지 알려주는 변수. 아직 들지 않았으면 0, 한 장 집어들었으면 1의 상태이다. 두 장 집어들었으면 그 즉시 같은 카드인지 검토하므로 2의 상태는 필요치 않다.
let cardArr = [];
function cardShuffle() {
  cardArr = [];
  for (let i = 0; i < 8; i++) {
    cardArr.push(i + 1);
    cardArr.push(i + 1);
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < cardArr.length; j++) {
      const firstCard = parseInt(Math.random() * cardArr.length);
      const secondCard = parseInt(Math.random() * cardArr.length);
      const temp = cardArr[firstCard];
      cardArr[firstCard] = cardArr[secondCard];
      cardArr[secondCard] = temp;
    }
  }
  for (i = 0; i <= cardArr.length; i++) {
    let cardText = document.getElementById(`card${i + 1}`);
    cardText = cardArr[i];
    document.getElementById(`card${i + 1}`).style.color = "white";
  }
  for (i = 0; i <= cardArr.length; i++) {}
}
function cardSelect(idNo) {
  if (cardStack == 1) {
    ++cardStack;
    cardColorChange(idNo);
    setTimeout(() => {
      cardMatch();
    }, 1000);
  } else if (cardStack == 0) {
    ++cardStack;
    cardColorChange(idNo);
  }
  //   현재 집은 카드가 1장이면 2장 cardStack을 올리고, 0장이면 1장 cardStack을 올린다.
}

function cardColorChange(idNo) {
  console.log(idNo);
  // 카드의 색깔을 교환한다.
  if (cardStack < 3) {
    // 현재 집은 카드가 두 장 이하라면 이하의 코드를 실행한다.
    let cardIdNo = document.getElementById(`card${idNo}`);
    cardIdNo.innerHTML = `${cardArr[idNo - 1]}`;
    cardIdNo.style.color = "black";
    cardIdNo.style.backgroundColor = "blue";
    cardIdNo.style.fontSize = "80px";
    selectedCardId.push(idNo);
    console.log(`selectedCardId.push(idNo) : ${idNo}`);
  }
}

function cardMatch() {
  if (cardStack == 2) {
    let card1Id = document.getElementById(`card${selectedCardId[0]}`);
    console.log(
      `let card1Id = document.getElementById() :card${selectedCardId[0]}`
    );
    let card2Id = document.getElementById(`card${selectedCardId[1]}`);
    console.log(
      `let card1Id = document.getElementById() :card${selectedCardId[0]}`
    );
    if (card1Id.innerHTML == card2Id.innerHTML) {
      console.log("맞추었다!");
      card1Id.style.backgroundColor = "black";
      card2Id.style.backgroundColor = "black";
    } else {
      console.log("실패?!");
      card1Id.style.backgroundColor = "white";
      card1Id.style.color = "white";
      card2Id.style.backgroundColor = "white";
      card2Id.style.color = "white";
    }
    selectedCardId.fill(0);
    cardStack = 0;
    count++;
    pointCount();
  }
}

function pointCount() {
  let pointBox = document.getElementById("pointCount");
  pointBox.innerText = count;
}

function reset() {
  cardStack = 0;
  selectedCard;
}
