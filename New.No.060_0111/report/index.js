// 1. 10진수를 16진수로
function decToHex(num) {
  switch (num) {
    case 15:
      return "F";
    case 14:
      return "E";
    case 13:
      return "D";
    case 12:
      return "C";
    case 11:
      return "B";
    case 10:
      return "A";
    default:
      return num;
  }
}
function deciamlToHexadecimal(num) {
  let result = [];
  while (num > 0) {
    result.unshift(decToHex(num % 16));
    num = Math.floor(num / 16);
  }
  return result.join("");
}
console.log(deciamlToHexadecimal(72)); // 48
console.log(deciamlToHexadecimal(108)); // 6C

// 2. 10진수를 2진수로
function decimalToBinary(num) {
  let result = [];
  while (num > 0) {
    result.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return result.join("");
}
console.log(decimalToBinary(19)); // 10011
console.log(decimalToBinary(87)); // 1010111

// 3. 16진수를 2진수로
function HexTodec(num) {
  switch (num) {
    case "F":
      return 15;
    case "E":
      return 14;
    case "D":
      return 13;
    case "C":
      return 12;
    case "B":
      return 11;
    case "A":
      return 10;
    default:
      return num;
  }
}

function hexadecimalToBinary(num) {
  num = num.split("").reverse();
  let result = 0;
  for (let i = 0; i < num.length; i++) {
    result += HexTodec(num[i]) * Math.pow(16, i);
  }

  return decimalToBinary(result);
}
console.log(hexadecimalToBinary("46")); // 1000110
console.log(hexadecimalToBinary("AC")); // 10101100

// 4. 2진수를 10진수로
function binaryToDecimal(num) {
  num = num.split("").reverse();
  let result = 0;
  for (let i = 0; i < num.length; i++) {
    result += num[i] * Math.pow(2, i);
  }

  return result;
}
console.log(binaryToDecimal("1001")); // 9
console.log(binaryToDecimal("1110101")); // 117
