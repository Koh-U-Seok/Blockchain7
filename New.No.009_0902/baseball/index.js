let computerNumber = [3];
let userNumber = [3];
let userWhile = 1;
let userWhileSwitch = 0;
let computerWhile = 1;
let computerWhileSwitch = 0;
let ball = [0, 0];
let count = 1;

func();
function func() {
  computer();
  challenge();
}
function computer() {
  while (computerWhile) {
    for (let i = 0; i < 3; i++) {
      computerNumber[i] = Math.floor(Math.random() * 9) + 1;
      console.log(`computerNumber[${i}] :${computerNumber[i]}`);
    }
    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        if (computerNumber[i] == computerNumber[j]) {
          computerWhileSwitch = 1;
          break;
        }
      }
    }
    if (computerWhileSwitch == 0) {
      computerWhile = 0;
    }
  }
  for (let i = 0; i < 3; i++) {
    console.log(`컴퓨터가 고른 숫자 ${i}번째`);
    console.log(`${computerNumber[i]}`);
  }
}
function challenge() {
  user();
  baseball();
  if (ball[1] == 3) {
    console.log(`${count} 번 만에 맞추었다!`);
    for (let i = 0; i < 2; i++) {
      console.log(`ball[${i}] =${ball[i]}`);
    }
  } else {
    console.log(`${ball[1]} 스트라이크!`);
    console.log(`${ball[0]} 볼!`);
    console.log(`${3 - ball[1] - ball[0]} 아웃!`);
    console.log(`${count++} 회째 도전 중!`);
    userWhile = 1;
    userWhileSwitch = 0;
    for (let i = 0; i < 2; i++) {
      ball[i] = 0;
    }
    challenge();
  }
}
function user() {
  while (userWhile) {
    for (let i = 0; i < 3; i++) {
      userNumber[i] = prompt("1~9 숫자를 입력하세요.");
      console.log(`도전자가 고른 숫자 ${i}번째 : ${userNumber[i]}`);
      console.log(`userNumber[${i}] :${userNumber[i]}`);
    }
    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        if (userNumber[i] == userNumber[j]) {
          console.log("야 겹치는거 있다 다시 해라!");
          userWhileSwitch = 1;
          break;
        } else {
          console.log("겹치는 것 없다!");
        }
      }
    }
    if (userWhileSwitch == 0) userWhile = 0;
  }
}
// c0 c1 c2
// 1  2  3
// u0 u1 u2
// 4  3  5
function baseball() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      console.log(`computerNumber[${i}] :${computerNumber[i]}`);

      console.log(`userNumber[${j}] :${userNumber[j]}`);
      if (computerNumber[i] == userNumber[j]) {
        if (
          computerNumber[i] == userNumber[j] &&
          computerNumber.indexOf(i) == userNumber.indexOf(j)
        ) {
          ++ball[1];
          console.log(
            `computerNumber[${i}] : ${computerNumber[i]}, userNumber${j} : ${userNumber[j]}  스트-라이크!`
          );
          console.log(
            `computerNumber[${i}]의 번호 : ${computerNumber.indexOf(
              i
            )}, userNumber[${i}]의 번호 : ${userNumber.indexOf(
              j
            )}  스트-라이크!`
          );
        }
        if (
          computerNumber[i] == userNumber[j] &&
          computerNumber.indexOf(i) != userNumber.indexOf(j)
        ) {
          ++ball[0];
          console.log(
            `computerNumber${i} : ${computerNumber[i]}, userNumber${j} : ${userNumber[j]}  보-올!`
          );
          console.log(
            `computerNumber${i}의 번호 : ${computerNumber.indexOf(
              j
            )}, userNumber${i}의 번호 : ${userNumber.indexOf(j)}  보-올!`
          );
        }
      }
    }
  }
}
