const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  #version;
  #merkleRoot;
  #timestamp;
  #difficulty;
  #nonce;
  #height;

  constructor(_data, _previousBlock) {
    this.#version = "1.0.0";
    this.#merkleRoot = _data
      ? merkle("SHA256").sync(_data).root()
      : "0".repeat(64);
    this.setTimestamp();
    // Date << 클래스 , now << static 정의된 메서드
    // 이후에 체인에 블록을 연결하는 시점으로 블록 생성 시간을 정의하기 위해서 메서드를 만들었다.
    this.#height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.#difficulty = 0;
    this.#nonce = 0;
  }

  get version() {
    return this.#version;
  }
  get merkleRoot() {
    return this.#merkleRoot;
  }
  get timestamp() {
    return this.#timestamp;
  }
  get difficulty() {
    return this.#difficulty;
  }
  get nonce() {
    return this.#nonce;
  }
  get height() {
    return this.#height;
  }
  setTimestamp() {
    this.#timestamp = Date.now();
  }
}

class Block extends BlockHeader {
  #previousHash;
  #hash;
  #data;

  constructor(_data, _previousBlock) {
    super(_data, _previousBlock);
    // super는 부모 클래스의 constructor를 호출한다.(실행)
    this.#previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    this.#hash = _previousBlock ? Block.createHash(this) : "0".repeat(64);
    this.#data = _data;
  }

  get previousHash() {
    return this.#previousHash;
  }
  get hash() {
    return this.#hash;
  }
  get data() {
    return this.#data;
  }

  static createHash(_block) {
    let tempStr = "";

    _block.setTimestamp();
    // 이 과정이 끝나며 체인에 연결하게 된다.

    tempStr += _block.version;
    tempStr += _block.merkleRoot;
    tempStr += _block.height;
    tempStr += _block.difficulty;
    tempStr += _block.nonce;
    tempStr += _block.previousHash;
    // hash는 현재 만들고 있는 키라서 추가하지 않는다.
    // data는 merkleRoot에 함쳐져 있기 때문에 merkleRoot로 대체한다.
    return SHA256(tempStr).toString().toUpperCase();
  }
}
const temp = new Block(["a", "b", "c"]);
console.log(temp);
Block.createHash(temp);
module.exports = Block;

const a = Symbol("a");
const b = Symbol("a");
console.log(a == b);
