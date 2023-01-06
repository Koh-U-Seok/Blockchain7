// 설치 명령어-------------------------------------
// npm i --save-dev jest
// -----------------------------------------------

// 블록을 생성하기 위해 클래스를 가져온다.
const Block = require("./block2.js");

// 제네시스 블록 생성

const IBlock = require("./block.interface");

const genesis = new IBlock({
  // 기존 예제로 사용하기
  version: "1.0.0",
  height: 0,
  timestamp: Date.now(),
  previousHash: "0".repeat(64),
  hash: "0".repeat(64),
  merkleRoot: "0".repeat(64),
  nonce: 0,
  difficulty: 0,
  data: ["this is genesis block in my blockchain"],
});

const {
  lib: { hexToBinary },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GEMRATION_INTERVAL,
    TIME_UNIT,
  },
} = require("./config");

// 테스트 묶음
describe("최초의 블록 체크", () => {
  //테스트 내용
  it("오브젝트인지 체크", () => {
    // 첫블록이 객체인지 확인한다.
    // 같은지 확인하는 검사식 expect().toBe()
    expect(typeof genesis).toBe("object");
  });
  it("최처 블록의 값을 확인", () => {
    expect(genesis.version).toBe("1.0.0");
    expect(genesis.data).toEqual(["this is genesis block in my blockchain"]);
    // toEqual 객체의 내용이 같은지 확인할 수 있다.
    // 객체나 배열에서 사용가능
    // expect({a:0}).toEqual({a:0}); => true
  });
});

// 블록 테스트
describe("block check", () => {
  const block = new Block(genesis);
  // 블록을 생성해 준다.
  const adjustmentDifficulty = 0;
  // 난이도를 구하기 위해 이전 난이도를 정의한다.

  const adjustmentTimestamp = Date.now();
  // 난이도를 구하기 위한 이전 시간을 정의한다.

  // 난이도의 체크
  describe("난이도 체크", () => {
    let tempBlockData;

    beforeEach(() => {
      tempBlockData = {
        height: 10,
        timestamp: Date.now(),
      };
    });
    // beforeEach : 테스트를 실행하기 전에 실행
  });
});
