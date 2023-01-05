const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

// black Header 클래스
class Header {
  constructor(_height, _previousHash) {
    // 블록의 버전
    this.version = Header.getVersion();

    // 블록의 높이
    this.height = _height;

    // 블록의 생성 시간
    this.timeStamp = Header.getTimeStamp();

    // 이전 블록의 해시값
    // 최초의 블록은 이전 블록이 없으므로 값이 없으면
    // "0".repeat(64) : 0dmfh aksemffurh 문자열 넣어주었다.
    // || : 조건문. 앞의 값이 없으면 뒤의 값을 반환 있으면 앞의 값을 반환
    this.previousHash = _previousHash || "0".repeat(64);
  }

  // static으로 만들어서 전역으로 사용할 수 있는 함수
  // class 동적할당하는데 일반적인 함수로 만들면 생성된 객체의 함수
  // static으로 만들면 불필요한 데이터를 절약할 수 있다.

  static getVersion() {
    return "1.0.0";
  }

  static getTimeStamp() {
    return Date.now();
  }
}

// 예를 들어 일반적인 함수는 New로 동적할당할 때마다 C라는 함수가 있으면 동적할당한 A와 B에 둘 다 생성한 객체한에 함수가 들어있지만 static으로 선언하면 클래스에 전역 함수 하나만 있게 된다. 동적할 때마다 생성될 필요가 없는 함수들은 static으로 선언해 주는 것이 좋다.

// const A = new Header(0,0);
// const B = new Header(0,0);

// 그냥 블록 자체가 될 클래스
class Block {
  constructor(_header, _data) {
    // 받아온 헤더의 버전을 블록에게 주고
    this.version = _header.version;

    // 블록의 높이
    this.height = _header.height;

    // 블록의 생성시간
    this.timeStamp = _header.timeStamp;

    // 이전 블록의 해시
    this.previousHash = _header.previousHash;

    // 블록의 머클루트
    this.merkleRoot = Block.getMerkleRoot(_data);

    // 블록의 해시
    this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data));

    // 블록의 내용
    this.data = _data;
  }

  // 머클 루트를 반환해줄 함수
  static getMerkleRoot(_data) {
    // merkle 라이브러리를 사용해서 sha256 알고리즘으로 암호화, 트리구조를 만들고 루트값 반환
    const merkleRoot = merkle("sha256").sync(_data).root();
    return merkleRoot;
  }

  // 블록을 해시값 반환해줄 함수.
  static createBlockHash(_header, _merkleRoot) {
    // _ header의 vaule들을 QHqdktj ekarh
    const values = Object.values(_header);

    // join 배열을 문자열로 합쳐준다. 매개변수로 전달된 값이 구분점
    // ex) [1,2,3,4,5,6] => join("") => "123456"
    // ex) [1,2,3,4,5,6] => join(",") => "1,2,3,4,5,6"
    // ex) [1,2,3,4,5,6] => join("/") => "1/2/3/4/5/6"
    const data = values.join("") + _merkleRoot;
    // 데이터를 전부 더해서 값을해싱해서 반환해줌

    // 리턴값이 블록의 해시가 된다.
    return SHA256(data).toString().toUpperCase();
  }
}

// 데이터의 내용을 담고

const data = [
  "The Times 03/Jan/2009 Chanellor on brink of second bailout for banks",
];

// block Header 생성
// 첫 블록이라 이전 해시값은   넣지 않는다.
const header = new Header(0);

// 첫 번째 블록에 헤더와 데이터를 넣고 돌린다.
const block = new Block(header, data);

console.log(block);

// 두 번째 블록

const secondHeader = new Header(1, block.hash);
const secondBlock = new Block(secondHeader, ["난 두번째 블록"]);
//                                              이게 트랜잭션.. 머클 루트는 각 블록의 트랜잭션만 따진다.
console.log("secondBlock :", secondBlock);

module.exports = { Header, Block };
