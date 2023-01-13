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

  constructor() {}

  get chain() {}

  get lastBlock() {}

  get config() {}

  get adjustmentBlock() {}

  addBlock(_data) {}

  add2Chain(_newBlock) {}
}

module.exports = Chain;
// 외부에서 Chain을 가져갈 수 있도록 방출한다.
