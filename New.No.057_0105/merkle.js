// 설치 명령어
// npm i merkle

const merkle = require("merkle");

// 머클 트리를 편하게 쓸 수 있게 도와주는 라이브러리
const data = ["15131", "fddsfas", "12312", "dsfsad"];
// 아무렇게 집어넣어준 데이터

// 머클 트리
const merkleTree = merkle("sha256").sync(data);
// 인자값 : 암호화 방법
// sync(data) 함수로 트리를 만들어 준다.

// 생성한 머클 트리의 root 값을 가져오는 함수
const root = merkleTree.root();

// SHA256(문자열)..toString().toUpperCase);
// 머클 라이브러리는 자동으로 대문자로 만들어 준다.
// 머클 트리에서 sha256 알고리즘을 사용하는데 문자열로 변환과 대문자로 변환을 둘다 해주고
// 값을 반환해준다.

console.log(root);
console.log(root);

// hash : 2c68318e352971113645cbc72861e1ec23f48d5baa5f9b405fed9dddca893eb4
// merkle : 05D2E9AE2812350BBD730831AA467C4321CFE70559201B5B40EF2CC6FBE6B59E
