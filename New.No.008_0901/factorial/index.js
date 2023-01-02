let calNum = 0;
let result = 0;
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

function buttonCancel() {
  calNum = 0;
  result = 0;
  console.log(calNum);
}

function buttonEqual() {
  result = buttonFactorial(calNum);
  console.log(`${result}`);
  alert(`${result}`);
}

function buttonFactorial(factorialNumber) {
  console.log(`${factorialNumber}`);
  if (factorialNumber == 1) {
    return 1;
  } else {
    return factorialNumber * buttonFactorial(factorialNumber - 1);
  }
}
