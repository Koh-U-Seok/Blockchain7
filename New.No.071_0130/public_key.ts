// npm i elliptic
//  - 타원곡선 알고리즘 사용하는 암호화 라이브러리
// npm i @types/elliptic
//  - typescript 사용하니까 @types 붙여서 가져오자.
import cryptoJS from "crypto-js";
import elliptic from "elliptic";

const privateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();
// 개인키 만들어주었다.

const ec: elliptic.ec = new elliptic.ec("secp256k1");
// 타원 곡선을 생성한다.
// ec에 전달하는 매개변수 "secp256k1"은 elliptic에서 제공하는 사전 설정 중 하나이다.
//  - 사전 설정으로는 secp256k1, p192, p224 등이 있다.
//  - 그럼 왜 secp256k1 설정을 사용하는가? => 비트코인과 이더리움에서 사용하는 설정이다. => y² = x³ + 7, G = "02 ......"

const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey);
// 개인키를 사용해서 키페어를 생성한다.
//  - 즉, 공개키를 생성한다.
// keyFromPrivate(개인키) << 개인키를 사용하여 키페어(개인키 + 공개키)를 생성한다.
const publicKey: string = keyPair
  .getPublic()
  .encode("hex", true)
  .toString()
  .toUpperCase();
// 생성된 키페어에서 공개키를 가져온다.
// getPublic() << 키페어에서 공개키를 가져온다.
// encode(인코딩 형식, true) << 암호문을 저장하기 위해 객체 형식으로 되어있는 데이터를 문자열(hex)로 변환한다.
console.log("privateKey : ", privateKey);
console.log("privateKey.length : ", privateKey.length);
console.log("public Key : ", publicKey);
console.log("public Key.length : ", publicKey.length);
// 타원곡선에서 공개키는 찾은 점의 좌표이다. => x, y 두 수로 이루어져 있다.
// 공개키는 문자열로 나타낼 시 "x" + "y" = `${x}${y}` << 두 좌표를 문자로써 연결한 문자열(string)이다.
// x, y는 256 bits의 크기를 가진다. => 공개키는 512 bits의 크기를 가진다. => 128자가 나와야 한다.(64자 *2)
// 128자는 너무 길어서 압축을 하게 된다. => x의 값은 그대로 가져오고 y의 값은 짝수일 때는 "02", 홀수일 때는 "03"을 사용하게 된다. => 02XXXXXXXX || 03XXXXXXXX가 나오게 된다.

// => 020d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f8 => 02 / 0d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f8 => y는 짝수고 x는  0d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f8
// 타원곡선 알고리즘을 사용해서 공개키를 구했을 때
// => x, y 좌표가 공개키로 정의된다.
// => x, y를 모두 표기하면 128자(512bits)의 길이를 갖게 된다.
// => 너무 길어서 64자로 줄인다.(x만 사용한다.)
// => y를 버릴 수가 없어서 홀수와 짝수로 나누어 간단하게 추가한다. (짝수 : 02, 홀수 : 03) y에 대한 값은 앞에 붙인다.
// => 02XXXXXXX || 03XXXXXXX
// =>  020d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f8

// y가 짝수일 때 02를 앞에 추가하고 홀수일 때 03을 앞에 추가한다. => x + y를 모두 사용할 때 128자일까? => 앞에 04를 붙인다. 즉 130자가 된다.(520 bits / 65 bytes)
// 040d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f80d6fe289deeeae1c13ff27e08a6ee1c50f473b62fc0c70db328df7ea325ca4f8

const data: string = "checking data";
const hash: string = cryptoJS.SHA256(data).toString().toUpperCase();
// 전송할 데이터(입력된 값 : checking data), Hash로 암호화해두자.
console.log("hash : ", hash);
console.log("hash.length : ", hash.length);

const signature: elliptic.ec.Signature = keyPair.sign(hash, "hex");
// sign(데이터, 인코딩 형식) << 키페어를 사용해서 서명을 만든다.
console.log(signature);

// 위에서 만들어준 서명을 확인한다.
const verify: boolean = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(publicKey, "hex")
);
// verify(데이터, 서명, 키페어) << 서명을 키페어를 사용해서 복호화하여 데이터와 비교한다. 같은 데이터라면 true 반환된다. 아니면 false가 반환된다.
// keyFromPublic(공개키, ?인코딩 형식) << 공개키를 사용하여 키페어를 생성한다.
console.log("verify : ", verify);

const newPrivateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

const newkeyPair = ec.keyFromPrivate(newPrivateKey);
const newPublicKey = newkeyPair
  .getPublic()
  .encode("hex", true)
  .toString()
  .toUpperCase();
const newVerify = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(newPublicKey, "hex")
);
console.log("newVerify : ", newVerify);
// 새로운 공개키로 확인했기 때문에 false가 반환된다.
//  - keyFromPublic에서 "hex"없으면 터진다.
//  - hash(=데이터)와 signature(=서명)과 publicKey(=공개키)가 정확히 일치하지 않는다. => 상대가 보낸 것인지 확신할 수 없다. 해킹일 수도 있다.

// const myWallet: string = "0x08a26a10fe42741e25Fc018307bdf43ecED6D49a";
// 앞에 있는 0x는 16진수임을 알려주는 용도이다.
// console.log(myWallet);

const myWallet: string = publicKey.slice(26);
// 이더리움의 경우는 이렇게 사용한다.
// 공개키는 66글자다. 그래서 뒤에서부터 40글자를 가져가야 되니 66-26 = 40글자를 잘라간다.
console.log(myWallet.length);
console.log("myWallet : ", myWallet);
