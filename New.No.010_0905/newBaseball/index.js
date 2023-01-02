let comSel = [];
// 컴퓨터의 선택에 대한 배열 정의

let count = 0;
const comSet = new Set();
// 배열은 배열인데 중복을 처리해주는 배열(사실은 배열아님! 쉽게 설명하기 위해 배열이라 했을뿐...)
// 사용할 때는 new Set()을 변수에 정의하여 변수를 사용한다.(let adsasdf=[])
// clear(), add(), size

function reset() {
  comSel = [];
  comSet.clear();
  count = 0;
  // 컴퓨터 선택을 초기화(지우기)
  document.getElementById("player-sel").innerHTML = "<th>Player Select</th>";
  document.getElementById("count").innerHTML = "<th>Count</th>";
  document.getElementById("strike").innerHTML = "<th>Strike</th>";
  document.getElementById("ball").innerHTML = "<th>Ball</th>";
  document.getElementById("out").innerHTML = "<th>Out</th";

  while (comSet.size < 3) {
    //Set은 중복을 알아서 제거해 준다.
    comSet.add(parseInt(Math.random() * 10));
    // comSet에 0~9까지의 무작위의 정수를 추가한다.
    // 만일 중복되는 수가 있다면 알아서 중복되지 않게 처리해준다.
  }
  // console.log(comSet);
  comSel = [...comSet];
  // ...은 스프레드(전개 구문)라고 한다.
  // 배열, 객체 등 연속된 데이터들을 하나하나 분해한다.
  // [...comSet]은 comSet의 아이템 하나하나를 분해해서 배열 내에 넣어준다.
  // 만약에 comSet.size가 3이라면 [comSet[0], comSet[1], comSet[2]]와 같은 말이다.
  // 배열 comSel에 중복이 없도록 하고 싶은데 Set()은 배열이 아니라서 직접적으로 처리해줄 수 없다.
  // Set()이 적용된 comSet에 중복을 제거한 데이터 덩어리로 만든 뒤 comSel = [...comSet]으로 간접적으로 중복 제거를 해준 것이다!
  console.log(comSel);
  alert("컴퓨터는 준비를 마쳤다!");
}

function selectNum() {
  if (!comSel.length) return;
  // 컴퓨터가 준비되지 않은 상태에서(숫자가 선택되지 않음) 게임을 진행하지 않도록 함수 정지
  let playerSel = "";
  let strike = 0;
  let ball = 0;

  // html 찾아서 입력받아서 정의할 수 있도록 미리 정의해야한다.
  const playerSelTr = document.getElementById("player-sel");
  const countTr = document.getElementById("count");
  const strikeTr = document.getElementById("strike");
  const ballTr = document.getElementById("ball");
  const outTr = document.getElementById("out");

  console.log(playerSelTr);
  console.log(countTr);
  console.log(strikeTr);
  console.log(ballTr);
  console.log(outTr);
  while (playerSel.length != 3) {
    playerSel = prompt("세 개의 수를 입력해라! ");
    if (!playerSel) {
      return alert("포기는 안된당!");
    }
    const tempLength = playerSel.length;
    // 현재 입력된 숫자의 개수를 정의한다.
    playerSel = [...new Set(playerSel.split(""))]
      //플레이어가 입력한 수를 배열로 변환한 뒤 Set에 세팅하여 중복을 없앤다,
      .map((item) => parseInt(item))
      // 중복을 없앤 플레이어의 수를 배열로 변환한 뒤 map을 이용해 정수로 변환 시킨다.
      .join("");
    // 정수의 배열을 Join 메서드를 이용해 하나의 문자열로 변환시킨다.
    if (playerSel.length != tempLength || playerSel.indexOf("NaN") > -1)
      playerSel = "";
    // playerSel의 길이가 이전(tempLength)과 다르면 중복된 숫자가 있었던 것이다. 때문에 playerSel을 빈 값으로 재정의한다.
    // playerSeldp NaN이 있으면 중간에 숫자가 아닌 문자가 있기 때문에 마찬가지로 playerSel을 빈값으로 정의한다.
  }
  strike = ball = 0;
  //strike와 ball을 0으로 재정의한다.
  comSel.forEach((item, index) => {
    // forEach의 매개변수함수(배열/문자열의 아이템, 인덱스(순서) => {내용})
    if (item == playerSel[index]) strike++;
    // 아이템과 playerSel의 index 번째 아이템이 같으면 strike++;
    else if (playerSel.includes(item)) ball++;
    // 아이템이 playerSel에 포함되어 있으면 ball++;
  });
  // 각 tr태그에 td를 추가한다.
  playerSelTr.innerHTML += "<td>" + playerSel + "</td>";
  countTr.innerHTML += "<td>" + ++count + "</td>";
  strikeTr.innerHTML += "<td>" + strike + "</td>";
  ballTr.innerHTML += "<td>" + ball + "</td>";
  outTr.innerHTML += "<td>" + (3 - ball - strike) + "</td>";
  //   playerSel=""; << 굳이 안해도 된다.(지역변수이기 때문)
  // 플레이어의 선택 삭제
  if (strike === 3) {
    alert(`${count}번 만에 맞추셨어요!`);
  } else {
    alert(`strike : ${strike}, ball : ${ball}, out : ${3 - ball - strike}`);
  }
}
