let a = 1;
let b = 2;

function add() {
  a += b;
  // a는 외부의 값이다. 그런 a를 수정했기 때문에 순수 함수가 아니다.
}

function add1(a, b) {
  return a + b;
}
// 외부의 값을 변경시키지 않았으니 순수 함수다.
