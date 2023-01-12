const Block = require("../block/block.js");

class Chain {
  // 체인은 배열로 만든다.
  #chain;
  // 아무 데이터, 정보 등등을 체인에 넣지 못하도록 외부에서의 접근을 막기 위해 private로 설정
  // 난이도를 통해 문제(퀴즈)를 풀게 되고 문제 해결된 블록을 체인에 추가하게 된다. << 문제 풀이 과정을 마이닝이라고 한다.
  // 왜 문제 풀이를 하는가? 블록의 생성 시간을 조절학 ㅣ위해
  // 결국 난이도는 블록의 생성 시간을 조절하기 위해서 높아졌다가 낮아졌다가를 반복한다.
  // 난이도 조절에 대한 조건들을 설정하자
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  // 난이도 조절을 결정하는 블록의 갯수(난이도 조절 단위 갯수)
  // 블록이 10개 생성될 때마다 난이도를 조절한다.(재정의)

  #BLOCK_GENERATION_INTERVAL = 10;
  // 블록 10개당 생성에 걸리는 시간(블록당 생성 시간)
  // 10개인 이유는 #DIFFICULTY_ADJUSTMENT_INTERVAL을 10으로 정했기 때문.
  // 여기는 시간 단위는 없다.

  #TIME_UNIT = 60 * 1000;
  // 시간의 단위 설정
  // 60s* 1000ms => 1m(1분)

  // 전부 대문자로 변수명을 적어주는 이유 : 얘는 상수다. 즉, 앞으로 절대 변하지 않는다.
  // 상수라고 무조건적으로 모두 대문자로 적을 필요는 없다. << 일반적인 개발자들 사이에서의 관례

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블럭 ${new Date()}`]);
    this.#chain.push(genesis);
  }

  get chain() {
    return [...this.#chain];
    // 외부에서 #chain에 접근할 경우 새로운 배열을 만들어서 준다.(반환한다.)
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  get config() {
    // 난이도 조절 관련 설정들을 한번에 가져가서 사용할 수 있게 묶자.
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      //난이도 조절 단위 갯수
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 10개 블록이 생성되는 시간
    };
  }

  get adjustmentBlock() {
    const length = this.#chain.length;
    // 현재 체인의 길이
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 난이도 조절 단위 갯수 전 index
    if (interval < 0) {
      return this.#chain[0];
      // 1 index에 블록이 추가되었다. => 1이 추가되기 전의 체인의 길이는 1이다.(제네시스 블록이 있으니까)
      // >> 1 -10 = -9 => 배열에 -9 index는 없다. => 문제가 생기지 않도록 마이너스 인덱스가 나오면 제네시스 블록을 반환하도록 예외처리해준 것이다.
    } else return this.#chain[interval];
    // 현재 설정 기준
    // 0,1,2,3,4,5,6,7,8,9,
    // 제네시스 블록 후 9개가 추가되었다. << 0 << 체인의 길이가 10이다.
    // 10이 더해지면 난이도 조절 갯수를 넘었으니 난이도를 수정한다. << 0번 index의 블록과 비교한다. << 10 - 10 = 0
    // 10,11, ... , 19                  << 1
    // 20일 때 10 index의 블럭과 비교해서 난이도 조절
  }

  addBlock(_data) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    // 제네시스 블록만 있을 때 체인의 길이는? 1
    //  - 제네시스 블록의 인덱스는? 0
    // 블록 하나를 추가했다.[제네시스 블록, 하나 추가]
    //  - 체인의 길이 : 2
    //  - 제네시스 블록의 인덱스는? 0으로 고정
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? 2? << 터진다..
    //  - 마지막 블록의 인덱스는 1 << 길이가 2일 때 1을 구해야 한다.
    // 블록 하나를 더 추가했다.[제네시스 블록, 하나 추가, 하나 더 추가]
    //  - 체인의 길이 : 3
    //  - 제네시스 블록의 인덱스는? 0으로 고정
    //  - 제네시스 블록의 다음 블록의 인덱스는? 1
    //  - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? 2
    //  - 마지막 블록의 인덱스는 2 << 길이가 3일 때 2을 구해야 한다.
    // const isValid = Block.isValidBlock(newBlock, this.lastBlock);
    // if (isValid.isError) {
    //   console.error(isValid.msg);
    //   return null;
    // } else {
    //   this.#chain.push(newBlock);
    //   return newBlock;
    // }
    return this.add2Chain(newBlock);
  }
  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }

  // chain = [0,1,2] => 4번 블록을 추가할 것이라면 3번 블록을 알고 있어야 한다.(저장하는 키는 previousHash)
  // chain 기준으로 인덱스 2의 블록 => chain의 길이에서 1을 빼면 마지막 인덱스가 나온다. => 마지막 인덱스에 해당하는 블록을 가져와서 사용한다.
}

const chain = new Chain();

for (let i = 0; i < i < 32; i++) {
  chain.addBlock([`test block ${i}`]);
}

console.log(chain.chain);
// console.log(chain.chain);
// const block = new Block([`qwer`], chain.lastBlock);
// console.log("lastBlock :", chain.lastBlock);
// console.log(block);
// chain.addBlock(["asdf1"]);
// chain.addBlock(["asdf2"]);
// chain.addBlock(["asdf3"]);

// chain.add2Chain(block);

// console.log(chain.chain);
// const a = [];
// a => 어떤 위치에 [] 값을 넣었다. 그 어떤 위치의 이름이 a다.
// 어떤 위치는 메모리, 컴퓨터 상에서 어떤 용량
// const b = a;
// b.push("asdf");
// console.log(a);

module.exports = Chain;
