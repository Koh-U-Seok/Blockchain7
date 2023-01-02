// for를 써서 1부터 입력값까지 3/6/9이 아니면 숫자, 3/6/9 이면 "짝!"
// 콘솔 찍기(369 게임, 33일 경우 짝!짝!)

const three = function () {
  const count = prompt("3!6!9! 3!6!9! 숫자를 넣어라!");
  // map을 사용할까 %를 사용할까?
  for (let i = 1; i < count + 1; i++) {
    if (`${i}`.includes("3") || `${i}`.includes("6") || `${i}`.includes("9")) {
      let number = i.toString();
      // let number = ${i}; 위와 같은 의미다.
      // i를 문자열로 변환해준다.
      let text = "";
      // 짝을 입력해서 출력하기 위해 text를 빈 문자열로 초기화한다.
      for (let j = 0; j < number.length; j++) {
        if (parseInt(number[j]) % 3 == 0 && number[j] != "0") text += "짝!";
      }
      console.log(text);
    } else console.log(i);
  }
  console.log("끝");
};
const three1 = function () {
  const count = prompt("3!6!9! 3!6!9! 숫자를 넣어라!");
  for (let i = 0; i < count + 1; i++) {
    let numbers = `${i}`;
    if (numbers.match(/[3,6,9]/)) {
      console.log(
        numbers
          .split("")
          .map((item) => (!(parseInt(item) % 3) && item != "0" ? "짝!" : ""))
        //   .join("") + typeof numbers
      );
    } else console.log(i);
  }
};
