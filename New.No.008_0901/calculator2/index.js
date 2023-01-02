let calNum1;
let calNum2;
let calResult;

let calNum1Checked = false;
let calNum2Checked = false;
// 두개나 만들지 않아도 clickCount하나로 2개 미만일 경우에 즉시 반환시켜 처리하면 보다 짧게 만들 수 있다.
let calculate;
let buttonCalChecked = false;
console.log(0);

function buttonNumber(buttonNumber) {
  if (calNum1Checked == false) {
    calNum1 = buttonNumber;
    calNum1Checked = true;
    console.log(`calNum1 = ${buttonNumber}`);
  } else if (calNum1Checked == true && calNum2Checked == false) {
    calNum2 = buttonNumber;
    calNum2Checked = true;
    console.log(`calNum2 = ${buttonNumber}`);
  }
}

function buttonCal(buttonCal) {
  if (buttonCalChecked == false) {
    calculate = buttonCal;
    buttonCalChecked = true;
    console.log(calculate);
    console.log(buttonCalChecked);
  }
}

function buttonEqual() {
  if (
    calNum1Checked == true &&
    calNum2Checked == true &&
    buttonCalChecked == true
  ) {
    console.log("calculate!");
    calResult = eval(`calNum1${calculate}calNum2`);
    console.log(calResult);
  }
}

function buttonCancel() {
  calNum1 = 0;
  calNum2 = 0;
  calResult = 0;
  console.log(calResult);
  calNum1Checked = false;
  calNum2Checked = false;
  buttonCalChecked = false;
}
