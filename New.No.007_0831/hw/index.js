//원래 내주려고 했던 과제
//컴퓨터가 1~ 100 사이의 하나의 숫자를골라
// 사람이 하나의 숫자를 선택해
// 숫자를 맞추면 끝
// 못 맞추면 대소 비교해서 상승(내가 선택한 숫자가 크다)
// 하락(내가 선택한 숫자가 작다.)
// 총 몇번 입력했는지.
// 맞췄을 때 축하합니다 몇번 입력하셨습니다

const comSel = parseInt(Math.random() * 99 + 1);
//parseInt() << 정수형으로 변경한다.

//컴퓨터 선택 완료
let playerSel;
let count = 0;
let max = 100;
let min = 0;
let updown = "";
const maxCount = parseInt(prompt("몇번만에 맞추시겠소?"));
do {
  playerSel = prompt(
    `${updown}\n숫자를 선택해주세요. 컴퓨터가 선택한 숫자를 맞추시면 됩니다.\n 최소 : ${min} 최대 : ${max} 남은 횟수 : ${
      maxCount - count
    }\n 컴퓨터가 고른 숫자 ${comSel}`
  );
  //prompt는 string, parseInt 정수형으로 바꿔줌으로 number

  playerSel = parseInt(playerSel);
  if (playerSel > max || playerSel <= min) {
    // 최소와 최대 사이에 값만 확인하기 위해 최소 미만과 최대 초과를 먼저 처리한다.
    console.log("범위를 벗어나셨소.");
  } else if (playerSel === comSel) {
    console.log(`${++count} 번만에 맞추셨습니다.`);
    break;
  } else if (playerSel > comSel) {
    max = playerSel;
    // max가 현재 플레이어가 선택한 숫자가 된다.
    console.log("너무 크다!");
    updown = "UP!";
    count++;
    //카운트를 플레이어가 입력했을 때 하나씩 증가시킨다.
    //정상적인 숫자를 입력했을 때만 카운트를 늘리도록 UP, DOWN일때
    //카운트를 증가시킨다.
  } else if (playerSel < comSel) {
    min = playerSel;
    // min이 현재 플레이어가 선택한 숫자가 된다.
    console.log("너무 낮다!");
    updown = "DOWN!";
    count++;
  } else {
    console.log("오직 숫자만 입력할 수 있다!");
    updown = "NUMBER!";
  }
} while (playerSel !== comSel && count < maxCount);
if (count >= maxCount && playerSel !== comSel) {
  console.log("제한 횟수를 초과하셨소.");
}
//컴퓨터가 숫자 선택 후 플레이어가 선택하는 것은 계속 반복되어야 한다.
//플레이어가 컴퓨터의 숫자를 맞출떄까지
