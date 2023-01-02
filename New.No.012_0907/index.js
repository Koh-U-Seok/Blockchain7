// 기존의 odd, even 클릭과 달리 oddeven에서 호출받으며 전달받은 매개변수를 사용하기 위해 count를 매개변수로 선언한다.
// 괄호 안에 count << '123'
function odd(count) {
  // odd 클릭시 count는 값이 없기 때문에 undefined가 된다.
  // oddeven 함수에서 호출받았을 시에는 count에 oddeven함수에서 전달한 매개변수가 count에 정의된다.
  // '123' => true
  if (!count) count = parseInt(prompt("몇 까지 찍을까"));
  // undefined는 boolean 값으로 따졌을 때 false가 되기 때문에 매개변수가 있는지 확인하여 입력받도록 한다.
  count = parseInt(count);
  // oddeven 함수에서 전달받은 count는 문자열(string)이기 때문에 parseInt 함수를 호출하여 정수로 변환해준다.
  for (let i = 0; i <= count; i++) {
    if (i % 2) console.log("i :" + i);
    // i % 2 << 홀수 일 때 >> 홀수를 판단할 수 있다.
    // 위의 코드는 아래 코드들보다 안좋다.
    // 위 코드는 10을 넣으면 10번을 반복한다.
    // 아래 코드들은 10을 넣으면 5번만 반복한다.
    // 반복의 횟수 차이가 입력된 수에 대해 비례해서 늘어나게 된다.
  }
  for (let i = 0; i < count / 2; i++) {
    console.log("i :" + i * 2 + 1);
  }
  for (let i = 1; i < count + 1; i += 2) {
    console.log("i :" + i);
  }
}
const even = function (count) {
  if (!count) count = parseInt(prompt("몇 까지 찍을까"));
  count = parseInt(count);
  for (let i = 0; i <= count; i++) {
    if (!(i % 2)) console.log("짝수" + i);
    // i % 2 << 짝수 일 때 >> 짝수를 판단할 수 있다.
  }
  for (let i = 0; i < (count + 1) / 2; i++) {
    console.log(i * 2);
  }
  for (let i = 0; i < count + 1; i += 2) {
    console.log(i);
  }
};
const oddeven = () => {
  const count = prompt(
    "몇 까지 찍을까\n 홀일까 짝일까?\n 형식은 n&홀짝 의 형태로!"
  );
  // "123&홀" 형식의 문자열을 받는다.
  // split 메서드를 호출해서 &를 기준으로 분리
  // 문자열 아이템을 가진 배열을 변환(return)받는다.
  //[0]이면 &을 기준으로 나눈 배열의 0번 자리를 가져온다는 뜻이다.
  const number = count.split("&")[0];
  const isOdd = count.split("&")[1];
  // 숫자와 홀짝이 나뉘어졌다.

  if (isOdd == "홀") {
    odd(number);
    //isOdd가 홀이면 odd 함수를 호출
    // 함수를 호출하면서 받았던 숫자(number)를 매개변수로 전달한다.
  } else {
    even(number);
  }
};
