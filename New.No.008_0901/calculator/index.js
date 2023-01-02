let calNum = 0;

console.log(0);

function buttonNumber(buttonNumber) {
  if (calNum == 0) {
    calNum = buttonNumber;
    console.log(`${buttonNumber}`);
  } else {
    calNum = calNum + `${buttonNumber}`;
    console.log(calNum);
  }
}

function buttonCal(calculator) {
  if (calNum.length == 1) {
    calNum = calNum + `${calculator}`;
    console.log(calNum);
  } else if (isNaN(calNum.charAt(calNum.length - ))) {
    console.log("마지막이 숫자여야 합니다.");
  } else {
    calNum = calNum + `${calculator}`;
    console.log(calNum);
  }
}

function buttonCancel() {
  calNum = 0;
  console.log(calNum);
}

function buttonEqual() {
  calNum = eval(calNum);
  alert(calNum);
}
