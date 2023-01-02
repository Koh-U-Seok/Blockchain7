let firstNum = 0;
let secondNum = 0;

function firstNumPlus() {
  ++firstNum;
  console.log(`firstNum의 값이 1 증가하여 ${firstNum}이 되었습니다.`);
}
function firstNumMinus() {
  --firstNum;
  console.log(`firstNum의 값이 1 감소하여 ${firstNum}이 되었습니다.`);
}
function firstNumMul() {
  firstNum = firstNum ** 2;
  console.log(`firstNum의 값을 제곱하여 ${firstNum}이 되었습니다.`);
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

function secondNumPlus() {
  ++secondNum;
  console.log(`secondNum의 값이 1 증가하여 ${secondNum}이 되었습니다.`);
}
function secondNumMinus() {
  --secondNum;
  console.log(`secondNum의 값이 1 감소하여 ${secondNum}이 되었습니다.`);
}
function secondNumMul() {
  secondNum = secondNum ** 2;
  console.log(`secondNum의 값이 제곱 ${secondNum}이 되었습니다.`);
}

//  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function fsPlus() {
  console.log(firstNum + secondNum);
}

function fsMinus() {
  console.log(firstNum - secondNum);
}
function fsMul() {
  console.log(firstNum * secondNum);
}
function fsDivision() {
  console.log(firstNum / secondNum);
}

function examAddFN(firstNum) {
  //let firstNum;
  //매개변수는 위에 변수와 다른 변수로 본다,
  //1번 중에서 선언한 firstNum과 매개변수로 선언된 firstNum은 엄연히 다르다.
  console.log(firstNum);
  firstNum++;
  firstNum += 1;
  firstNum = firstNum + 1;
  console.log(firstNum);
}
examAddFN(firstNum);
//매개변수가 없어, 46번쨰 줄의 firstNum은 undefined
