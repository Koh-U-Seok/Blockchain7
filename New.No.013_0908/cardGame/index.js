let cards = [];

for (let i = 0; i < 8; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}

cards = shuffle(cards, 100);
// cards를 섞어주는 함수

console.log(cards);

let firstCardIdx = -1;
let secondCardIdx = -1;

function selectNum(cardNum) {
  console.log("firstCardIdx : " + firstCardIdx);
  console.log("secondCardIdx : " + secondCardIdx);

  const tempElem = document.getElementById("card" + cardNum);
  const firstElem = document.getElementById("card" + firstCardIdx);
  // 첫번째 선택한 카드의 id를 읽어들여 그 태그가 저장된다.
  const secondElem = document.getElementById("card" + secondCardIdx);
  // 매개변수로 받은 cardNum은 id의 'card' 뒤에 붙은 숫자와 동일하게 붙어있으면 cardNum과 'card'를 붙여서 id를 찾아온다.
  if (tempElem.innerHTMl) return;
  // 선택한 div에 무언가 입력되어 있었는가? << 선택하거나 맞춘 카드인가?
  console.log(firstElem);
  if (firstCardIdx > -1 && secondCardIdx > -1) {
    //카드 두장이 선택받았는가?
    if (cards[firstCardIdx] != cards[secondCardIdx]) {
      // 카드 두장이 다른가?
      firstElem.innerHTML = "";
      secondElem.innerHTML = "";
      //카드를 다시 뒤집는다.
    } else {
      firstElem.style.backgroundColor = "green";
      secondElem.style.backgroundColor = "green";
    }
    firstCardIdx = -1;
    secondCardIdx = -1;
    // 선택한 카드들에 대한 위치 정보를 제거한다.
  }
  if (firstCardIdx < 0) {
    // 첫번째 카드를 선택하지 않았는가?
    firstCardIdx = cardNum;
    // 첫번째 카드의 index(card 기준)을 정의한다.
    tempElem.innerHTML = cards[cardNum];
  } else if (secondCardIdx < 0) {
    // 두번째 카드를 선택하지 않았는가?
    secondCardIdx = cardNum;
    tempElem.innerHTML = cards[cardNum];
  }
  //   else if (cards[firstCardIdx] != cards[secondCardIdx]) {
  //     // 두 카드가 다르면?
  //     firstCardIdx = -1;
  //     secondCardIdx = -1;
  //     firstElem.innerHTML = "";
  //     secondElem.innerHTML = "";
  //   } else {
  //     firstCardIdx = -1;
  //     secondCardIdx = -1;
  //   }
  // 찾은 클릭된 태그에 내용으로 cards(랜덤으로 배치된 카드들) 중에 (cardNum-1)번째(컴퓨터는 0부터 시작하기 때문)를 찾아 출력하도록 한다.
}
