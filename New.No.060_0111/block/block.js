const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  difficulty;
  nonce;
  height;
  // private 키로 정의(생성)할 경우 키들이 객체에서 보이지 않는다.
  // 이후에 통신할 때 다른 처리를 하려고 하였으나 쉽게 가기 위해서 private를 취소하겠다.

  constructor(_data, _previousBlock) {
    this.version = "1.0.0";
    // this.merkleRoot = _data
    //   ? merkle("SHA256").sync(_data).root()
    //   : "0".repeat(64);
    const merkleRoot = this.createMerkleRoot(_data);
    // 머클 루트 생성 메서드 호출
    if (merkleRoot.isError) {
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    // Date << 클래스 , now << static 정의된 메서드
    // 이후에 체인에 블록을 연결하는 시점으로 블록 생성 시간을 정의하기 위해서 메서드를 만들었다.
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }
  setTimestamp() {
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      // Array.isArray()는 매개변수가 배열인지 확인한다.
      return { isError: true, msg: "data가 배열이 아니거나 빈 배열이다." };
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock);
    // super는 부모 클래스의 constructor를 호출한다.(실행)
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // this.hash = _previousBlock ? Block.createHash(this) : "0".repeat(64);

    if (this.merkleRoot) {
      // merkleRoot가 있음 << 정상적인 배열로 이루어진 데이터가 입력되었다.
      this.hash = Block.createHash(this);
    } else {
      // merkleRoot가 없음 << 배열이 아닌 데이터가 입력(전달)되었다.
      this.hash = "";
      // 이후 오류 전달 발생 여부 확인용
    }
    this.data = _data;
  }

  static createHash(_block) {
    let tempStr = "";

    // _block.setTimestamp(); // 난이도 조절을 넣을 때 다시 활성화 하자
    // 이 과정이 끝나며 체인에 연결하게 된다.

    // tempStr += _block.version;
    // tempStr += _block.merkleRoot;
    // tempStr += _block.height;
    // tempStr += _block.difficulty;
    // tempStr += _block.nonce;
    // tempStr += _block.previousHash;

    // hash는 현재 만들고 있는 키라서 추가하지 않는다.
    // data는 merkleRoot에 함쳐져 있기 때문에 merkleRoot로 대체한다.

    const keys = Object.keys(_block);
    // Object.keys => 객체의 키들을 배열로 가져온다.

    for (let i = 0; i < keys.length - 1; i++) {
      if (keys[i] == "hash" || keys[i] == "data") {
        continue;
        // for, while 같은 반복문에서 아래의 코드를 실행하지 않고 위로 올라간다.
        // i가 0일 때 continue 일 경우 반복문 내의 코드를 실행하지 않고 i가 1일 때의 반복문을 실행한다.
      }
      tempStr += _block[keys[i]];
    }
    return SHA256(tempStr).toString().toUpperCase();
  }

  static isValidBlock(_newBlock, _previousBlock) {
    // 생성된 블록이 정상인지 확인해보자.
    if (_newBlock.height !== _previousBlock.height + 1) {
      console.log("_newBlock.height : ", _newBlock.height);
      console.log("_previousBlock.height + 1 : ", _previousBlock.height + 1);
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "현재 블록의 이전 블록의 해시와 이전 블록의 현재 해시가 불일치하다.",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return { isError: true, msg: "hash 생성 중 오류 발생" };
    }
    return { isError: false, value: _newBlock };
  }
}
// const temp = new Block(["a", "b", "c"]);
// Block.createHash(temp);
module.exports = Block;

// const a = Symbol("a");
// const b = Symbol("a");
// console.log(a == b);
