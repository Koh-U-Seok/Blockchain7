const crypto = require("crypto-js");

console.log(crypto.SHA256("dfhjfrijjhkfdsxjhuxjhu").toString());
// fa046631fe8ef3e1abdfbb4e883e461be060c25d20f1c9db91c81d903c421885

// 어느 정도 길이가 길어 암호화도 잘되면서 너무 길지도 않아 중복도 적어서 많이 쓰인다.

console.log(crypto.MD5("dfhjfrijjhkfdsxjhuxjhu").toString());
// 9565609a31e800869fa9c3d23522d44e

console.log(crypto.SHA1().toString());
//da39a3ee5e6b4b0d3255bfef95601890afd80709

console.log(crypto.SHA512("1".toString()));

console.log(crypto.RIPEMD160("123klusdabf").toString());
//e1d2047d9663a99bcd8af82b8262abf2627bf153

const tempAES = crypto.AES.encrypt("ewtuyjkhbiouewj", "key").toString();
// 암호화

console.log(crypto.AES.decrypt(tempAES, "key").toString(crypto.enc.Utf8));
// 복호화. 사용자가 볼수 있게 toString()에 crypto.enc.Utf8을 넣어준다.
