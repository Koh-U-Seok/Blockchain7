const SHA256 = require("crypto-js").SHA256;
const merkle = require("merkle");
const { secondTreeRoot } = require("./merkle");

const data = [1, 2, 3];

const merkleRoot = merkle("SHA256").sync(data).root();

const firstTree = [];
for (let i = 0; i < data.length; i++) {
  firstTree.push(SHA256(data[i].toString()).toString().toUpperCase());
}

const secondTree = [];
for (let i = 0; i < firstTree.length; i += 2) {
  let temp = ""; // 이름 그대로 임시값을 준다. 아래에서 조건에 따라 값을 정의한다.
  if (i + 1 === firstTree.length) {
    // 홀수 갯수이며 다음 인덱스(아이템)이 없을 때
    temp = firstTree[i];
    // 기존의 아이템을 그대로 사용한다.
  } else {
    // 다음 아이템이 있을 때
    temp = SHA256(firstTree[i] + firstTree[i + 1])
      .toString()
      .toUpperCase();
  }
  secondTree.push(temp);
}

const oddThirdRoot = SHA256(secondTree[0] + secondTree[1])
  .toString()
  .toUpperCase();

// 트리를 만들고 root값을 반환하는 함수
const createMerkleRoot = (_data) => {
  // 매개변수에 _(언더바)를 붙이는 이유 : 매개변수 구분 << 이 변수는 매개변수이다 하고 알려준다.
  // 매개변수가 parameter라 앞에 p를 붙이는 경우도 있다. ex) pData
  if (!Array.isArray(_data)) return { isError: true, msg: "배열이 아닙니다." };
  // isArray : Array(배열 객체)의 메서드로 배열인지 아닌지를 판단한다.
  // 배열이라면 true 준다. (반환한다. return한다.)
  // return을 객체로 내보내는 이유 : 블록 생성후 해당 블록이 정상적인 블록인지 확인하기 위해서 객체로 내보낸다. isError를 통해서 생성 도중 문제가 발생했는지 먼저 파악할 수 있다.
  //    - jest에서 사용하는 것이 아닌 블록 생성 단계에서 사용한다.

  let merkleArr = data.map((item) => SHA256(item).toString().toUpperCase());

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
  return { isError: false, value: merkleArr[0] };
};

module.exports = {
  firstTree,
  secondTree,
  oddThirdRoot,
  oddMerkleRoot: merkleRoot,
};
