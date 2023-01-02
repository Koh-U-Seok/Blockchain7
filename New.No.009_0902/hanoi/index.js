let hanoiNumber;
let ringNumber;
let departure;
let count = 0;
// func();
// function func() {
//   hanoiNumber = parseInt(prompt("숫자를 입력하세요."));
//   console.log((2 ** hanoiNumber) - 1);
// }
// 하노이의 탑의 최소 이동횟수는 (2의 n제곱)-1이다.
// 처음에는 최소한으로 간략하게 만드는 것에 사고가 고정되어 제법 고민했다.
// n번째의 이동횟수는 n-1의 이동횟수에 2의 n-1제곱을 더한 것이라는 것에 생각이 닿아 아래와 같이 만들어졌다.

func();
function func() {
  num = parseInt(prompt("숫자를 입력하세요."));
  console.log(hanoi(num));
}
function hanoi(hanoiNumber) {
  if (hanoiNumber == 1) return 1;
  return hanoi(hanoiNumber - 1) + 2 ** (hanoiNumber - 1);
}

// func();

// function func() {
//   num = parseInt(prompt("숫자를 입력하세요."));
//   console.log(`입력된 숫자 : ${num}`);
//   console.log(`총 ${hanoi(num)}번 이동하였습니다.`);
// }

// function hanoi(hanoiNumber, departure) {
//   if (hanoiNumber == 1) {
//     console.log(`${hanoiNumber}를 3번 기둥에`);
//     console.log(`${++count} 번 이동하였다.`);
//     return count;
//   }
//   if (hanoiNumber % 2 == 0) {
//     console.log(`${hanoiNumber}번 고리를 ${departure}로`);
//     console.log(`${++count}번 이동하였다.`);
//     return hanoi(hanoiNumber - 1);
//   } else if (hanoiNumber % 2 == 1) {
//     console.log(`${hanoiNumber}번 고리를 ${departure}로`);
//     console.log(`${++count}번 이동하였다.`);
//   }
// }
