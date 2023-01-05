// merkle, crypto-js 라이브러리를 가져오고

const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// 트리를 만들고 root값을 반환하는 함수
const createMerkle = (_data) => {
  // _data = ["15131", "fddsfas", "12312", "dsfsad"];
  // 받은 매개변수 값이 배열인지 확인
  if (!Array.isArray(_data)) return "배열이 아닙니다.";

  // 배열의 값을 암홓화해서 merkleArr 변수에 반환한다.
  let merkleArr = data.map((item) => SHA256(item).toString().toUpperCase());

  // 중괄호를 쓰면 함수의 영역으로 취급되서 return으로 반환시켜주어야 한다.
  // 중괄호를 안쓰면 그 값 자체를 반환한다.

  // 조건 머클루트 한 개의 값이 나올 때까지
  // merkleArr 배열의 길이가 1이 될 때까지 반복
  while (merkleArr.length > 1) {
    const tempArr = [];
    for (let i = 0; i < merkleArr.length; i += 2) {
      if (i + 1 === merkleArr.length) {
        tempArr.push(merkleArr[i]);
      } else {
        tempArr.push(
          SHA256(merkleArr[i] + merkleArr[i + 1])
            .toString()
            .toUpperCase()
        );
      }
    }
    merkleArr = tempArr;
  }
  return merkleArr[0];
};

const libMerkle = (_data) => {
  // 암호화 방식은 sha256이고, 매개변수로 전달받은 배열을 트리구조로 만들어 주고, root 값을 가져오자.
  const merkleRoot = merkle("sha256").sync(_data).root();
  return merkleRoot;
};

const data = ["15131", "fddsfas", "12312", "dsfsad", "h987fj"];
console.log("createMerkle 중괄호 없음 : ", createMerkle(data));
console.log("libMerkle : ", libMerkle(data));
