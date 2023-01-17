const Block = require("../block/block.js");
// 체인을 쌓기 위해서는 블록을 호출해야 한다.

class Chain {
  // 체인은 배열로 이루어져 있다.
  // 외부에서 함부로 접근할 수 없도록 private로 설정하였다.
  #chain;
  //  퀴즈를 풀고(마이닝) 완전해진 블록을 chain에 추가하게 된다.

  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  // 난이도 조절을 결정하는 블록의 개수.
  // 한 세대를 생성할 때마다 난이도를 조절하게 된다.
  // block.js에서 DAI라는 이름으로 여러번 사용했다.

  #BLOCK_GENERATION_INTERVAL = 1;
  // 한 세대를 생성하는데 걸리는 시간
  // 시간에 관련된 단위는 설정하지 않았고, 이는 단순한 상수일 뿐이다.

  #TIME_UNIT = 1 * 1000;
  // 시간의 기본 단위 설정이다.

  // 대문자로 적는 이유는 변하지 않기 때문이다. 즉, 상수다.

  constructor() {
    this.#chain = [];
    // 체인을 최초에 만들 때는 제네시스 블록조차 없어야 하며, 여러 블록이 들어갈 장소를 마련해야 하기에 배열로 재정의해준다.

    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    // 제네시스 블록으로 사용할 블록이다. 트랜잭션말고는 어떠한 인자도 없기에 제네시스 블록으로 사용할 수 있다.

    this.#chain.push(genesis);
    // 체인은 배열이니 push로 제네시스 블록을 넣어준다. 이제 체인에는 제네시스 블록이 생겼다.
  }

  get chain() {
    return [...this.#chain];
    // 외부에서 #chain 접근 시 #chain 배열을 스프레드 연산자로 분리해서 반환해줬다.
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
    // 체인의 마지막 블록을 반환하는 메서드다.
    // 배열은 0부터 시작하기에 체인 길이보다 1 작은 높이를 가진 블록을 반환했다.
  }

  get config() {
    // 난이도 조절 관련 설정들을 한번에 가져가서 사용할 수 있게 config를 통해 가져갈 수 있게 하였다.

    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      // 난이도 조절을 결정하는 블록의 개수.

      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 한 세대를 생성하는데 걸리는 시간과 시간의 단위를 곱해 ms단위의 실제 시간을 정했다.
    };
  }

  get adjustmentBlock() {
    const length = this.#chain.length;
    // 현재 체인의 길이

    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 이전 세대의 인덱스

    if (interval < 0) return this.#chain[0];
    // 현재 체인의 길이에서 한 세대의 길이를 뺀 결과가 마이너스값이라면(= 제네시스 블록과 같은 세대라면) 에러가 생길테니 에러가 생기지 않도록 제네시스 블록을 최솟값으로 놓은 것이다.

    return this.#chain[interval];
    //이전 세대의 블록을 반환한다.
  }

  addBlock(_data) {
    // 블록을 추가하는 메서드
    const newBlock = new Block(
      // 블록을 생성한다. 트랜잭션 이외에도 다른 인자가 있으니 제네시스 블록이 아닌 그 이후의 블록을 추가한다.
      _data,
      // 트랜잭션이다.

      this.lastBlock,
      // 이전 블록이다.

      this.adjustmentBlock,
      // 이전 세대의 블록이다.

      this.config
      // 난이도 조절 관련 설정이다.
    );
    return this.add2Chain(newBlock);
    // 만들어진 블럭을 체인에 추가한다.
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    // addBlock에서 만든 블록을 받아 마지막 블록과 함께 isValidBlock 메서드로 인자로 보내 문제가 없는지 검사한다.
    if (isValid.isError) {
      // 문제가 있었을 경우
      console.error(isValid.msg);
      return null;
      // 아무것도 하지 않는다.
    } else {
      // 아무 문제가 없었을 경우
      this.#chain.push(_newBlock);
      // 체인에 새로 만든 블록을 추가한다.
      return _newBlock;
    }
  }
}

module.exports = Chain;
// 외부에서 Chain을 가져갈 수 있도록 방출한다.
