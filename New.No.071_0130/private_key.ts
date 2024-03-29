// 개인키를 만들어보자
import cryptoJS from "crypto-js";
const privateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();
// random의 매개변수로 몇 byte를 사용할 것인지 전달한다.
//  자가 나와야하기 때문에 32byte를 사용한다.
// 외부에 공개되면 안된다.
console.log(privateKey);
console.log(privateKey.length);
// 0~F => F를 2진수로 바꾸면? 1111 -> 4bit -> 총 64자 -> 64 * 4 -> 256bit
// 1 byte =8 bit => 256 bits = 32bytes

// 쉽게 느낄 수 있는 node.js 기본 모듈 암호화
// import crypto from "crypto";
// const modulKey = crypto.randomBytes(32).toString("hex");
// console.log(modulKey);
// console.log(modulKey.length);
// 계속 crypto-js 라이브러리를 써왔으니 계속 쓰자

// console.log(Math.pow(2, 256)); // 1.157920892373162e+77 => 1.157920892373162 * (10^77)
// 나타내기 힘든 수 표기
// 1.157920892373162e -77 => 1.157920892373162 / (10^77)
// console.log(1 / Math.pow(2,256));
