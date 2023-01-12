// 어제 숙제에 대한 풀이

// Hex : 16진수 Hexadecimal
//  - 어제 그저께 암호화했을 때 나오는 수
// Dec : 10진수 Decimal
// Oct : 8진수 Octal
// Bin : 2진수 Binary
//  컴퓨터가 사용하는 수 << bit << byte == 8bit

function pow(x, n) {
  // x를 n승으로 제곱
  let value = 1;
  for (let i = 0; i < n; i++) {
    value *= x;
  }
  return value;
}

function changeInt(number) {
  // 숫자의 소수점을 버리기 위한 함수.
  // 굳이 거창하게 이렇게 쓸 필요 없다...
  let str = `${number}`;
  let value = 0;
  for (let i = 0; i < str.length; ++i) {
    let tempNumber = +str[i];
    if (tempNumber > -1 && tempNumber < 10) {
      value *= 10;
      value += tempNumber;
    } else {
      // NaN이 나왔다. 숫자가 아님
      break;
    }
  }
  return value;
}

function dec2hex(dec) {
  // 10진수를 16진수로
  let value = "";
  while (dec) {
    switch (dec) {
      // 10진수를 16으로 나눠서 그 나머지를 사용한다.
      // 0 ~ 15까지 사용한다. 0 ~ 9까진 그대로 사용한다.
      // 10 ~ 15 << 한자리로 나타내야 하기 때문에 영어의 A ~ F를 사용한다.
      case 10:
        "A" + value;
        break;
      case 11:
        "B" + value;
        break;
      case 12:
        "C" + value;
        break;
      case 13:
        "D" + value;
        break;
      case 14:
        "E" + value;
        break;
      case 15:
        "F" + value;
        break;
      default:
        value = (dec % 16) + value;
        break;
    }
    dec = +`${dec / 16}`.split(".")[0];
    dec = parseInt(dec / 16);
  }
  return value;
}

function hex2dec(hex) {
  // 보통 프로그래밍 상에서 Hex, 즉 16진수는 string(문자열, 문장)으로 저장(정의)되게 된다.
  let value = 0; // << 10진수 저장할 변수
  console.log(hex);
  for (let i = 0; i < hex.length; ++i) {
    let temp = 0;
    switch (hex[i]) {
      case "A":
        temp = 10;
        break;
      case "B":
        temp = 11;
        break;
      case "C":
        temp = 12;
        break;
      case "D":
        temp = 13;
        break;
      case "E":
        temp = 14;
        break;
      case "F":
        temp = 15;
        break;
      default:
        temp += +hex[i];
        break;
    }
    value += temp * 16 ** (hex.length - i - 1);
    // **는 제곱이다.
    // value += temp * pow(16 , hex.length-i-1);
    // hex = "123"
    // i == 0 / hex[i] =='1' / 1은 100의 자리 수이기 때문에 16의 제곱이다.
    // 10진수 바꿀 때 1에 16의 제곱을 곱해서 더해야 한다.
    // i == 1 / hex[i] =='2 / 2는 10의 자리 수이기 때문에 16의 1승이다.
    // i == 2 / hex[i] =='3 / 2는 1의 자리 수이기 때문에 16의 0승이다.
    // 각 자리수에 대해서 16의 n승 곱해야 한다. => 그 n을 어떻게 구할 것인가?
    // 각 자리수가 바뀔 때 함께 바뀌는 것은 i다, i를 이용해야 한다.
    // i가 증가할 때 마다 n은 감소한다.
    // hex를 기준으로 0의자리부터 16 제곱을 생각하면 0, 1, 2, 3, 4, 5, ... 식으로 된다.
    // 4            5           6           8
    // 16의 3승     16의 2승    16의 1승        16의 0승
    console.log(value);
  }
  return value;
}

function dec2bin(dec) {
  // 10진수를 2진수로 바꾼다.
  let value = "";
  while (dec) {
    value = (dec % 2) + value;
    dec = parseInt(dec / 2);
  }
  return value;
}

function bin2dec(bin) {
  // 2진수를 10진수로 바꾼다.
  let value = 0;
  for (let i = 0; i < bin.length; i++) {
    value += +bin[i] * 2 ** (bin.length - 1 - i);
  }
  return value;
}

console.log(dec2hex(4123));
console.log(hex2dec(dec2hex(4123)));
console.log(dec2bin(4123));
console.log(bin2dec(dec2bin(4123)));

// 10진수를 기준으로
// 1 <= 10의 0승
// 10 <= 10의 1승
// 100 <= 10의 2승
// 1000 <= 10의 3승

// 2진수를 기준으로
// 1 <= 2의 0승
// 10 <= 2의 1승
// 100 <= 2의 2승
// 100 <= 2의 3승

//          1           1           1           1           1           1
//          32          16          8           4           2           1
