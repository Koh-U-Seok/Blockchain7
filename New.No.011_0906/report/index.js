let oddNumber = false;
let evenNumber = false;
let game369 = false;
let arr369;
let result = "";
let sum;

function func() {
  let num = prompt("숫자를 입력하세요");
  let rule = prompt("홀수, 짝수, 3/6/9 여부를 입력하세요.");
  rule.indexOf("홀수") > -1 ? (oddNumber = true) : (oddNumber = false);
  rule.indexOf("짝수") > -1 ? (evenNumber = true) : (evenNumber = false);
  rule.indexOf("3/6/9") > -1 ? (game369 = true) : (game369 = false);
  pizza(num, oddNumber, evenNumber, game369);
}

function pizza(num, oddNumber, evenNumber, game369) {
  for (i = 1; i < num; i++) {
    arr369 = i.toString();
    if (game369 == true) {
      if (
        arr369.indexOf(3) > -1 ||
        arr369.indexOf(6) > -1 ||
        arr369.indexOf(9) > -1
      ) {
        for (let j = 0; j < arr369.length; j++) {
          if (arr369[j] == 3 || arr369[j] == 6 || arr369[j] == 9) {
            result += "짝!";
          }
        }
        console.log(result);
        result = "";
        // } else {
        //   console.log(i);
      }
    }
    if (i % 2 == 1 && oddNumber == true) {
      console.log(`홀수! ${i}`);
    }
    if (i % 2 == 0 && evenNumber == true) {
      console.log(`짝수! ${i}`);
    }
  }
}
