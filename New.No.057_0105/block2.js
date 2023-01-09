const IBlock = require("../New.No.057_0105/block.interface.js");
// 블록 인터페이스 들고왔다.

const {
  lib: { merkle, SHA256, hexToBinary },
  constant: {
    BLOCK_GEMRATION_INTERVAL,
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    TIME_UNIT,
  },
} = require("./config.js");

class Block extends IBlock {
  // IBlock 인터페이스를 상속받는다.
  constructor() {
    // 부모 함수를 사용한다.
    super();
    // 블록 생성 함수
  }

  create(_previousBlock, _adjustmentDifficulty, _adjustmentTimestamp, _data) {
    try {
      const { height, hash: previousHash } = _previousBlock;
      // 이전 블록을 불러와 구조 분해 할당으로 hash와 높이를 불러온다. 불러온 해시는 이전 블록의 해시이므로 previousHash라는 이름을 붙여준다.

      this.height = height + 1;
      // 기존 블록의 높이(개수)보다 하나 증가.(생성할 때 높이 증가시켜서 생성)

      this.previousHash = previousHash;
      // 기존 블록의 hash 값을 갖는다.(오류 확인을 위해)

      // 임시값 초기화
      const merkleRoot = this.getMerkleRoot(_data);
      // 정상적으로 Root 구하도록 호출

      if (merkleRoot.isError) throw new Error(merkleRoot.error);
      // throw 명령어를 사용해서 try문을 멈추고 catch로 입력값을 전달한다.
      // merkleRoot에서 오류 발생시 생성 멈춘다.
      this.merkleRoot = merkleRoot.value;

      // 임시값 초기화
      this.nonce = 0;
      this.timestamp = Date.now();
      // 현재 시간을 초기화

      this.difficulty = this.getDifficulty(
        // 난이도를 구하는 메서드를 호출한다.
        {
          height: this.height,
          timestamp: this.timestamp,
          previousDifficulty: _previousBlock.difficulty,
          _adjustmentDifficulty,
          _adjustmentTimestamp,
        }
      );
      // 메서드 만들기 전에 초기화
      this.hash = this.createHash(this);
      // createHash : 블록의 hash 구하는 메서드 호출

      this.data = _data;
      //데이터 저장(블록에 담을 데이터)

      this.updateBlock(
        // 블록 생성(마이닝을 거쳐서)
        _previousBlock,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );
    } catch (err) {
      console.error(err);
      // 에러 발생 시
      throw new Error(err.message);
      // 에러 던지고 종료
    }
  }

  // 머클 루트를 구하는 함수
  getMerkleRoot(_data) {
    return Array.isArray(_data)
      ? {
          isError: false,
          // 에러가 아니다.
          value: _data.length
            ? // _data의 길이가 있다면(= _data가 있다면 트랜잭션이 있으니 merkle root를 구해야 한다!)  merkle 라이브러리 사용
              merkle("sha256").sync(_data).root()
            : // merkle 라이브러리를 사용하며 sha256 방식의 hash 암호화를 사용, merkleRoot를 구한다.
              "0".repeat(64),
          // _data의 길이가 없으면 초기값을 반환
        }
      : {
          isError: true,
          error: "이것은 오류다!",
        };
    // 배열이 아니다.
  }

  // 해시 만들기
  createHash(_block) {
    // hash 생성 함수
    return SHA256(
      // SHA256 방식의 hash 암호화 사용
      // 여기서 256은 256bits를 뜻한ek.
      Object.entries(_block)
        // 객체의 키와 값을 배열로 변경한다. [[key.value],[key,value],[key,value]]
        .filter((item) => item[0] !== "hash" && item[0] !== "data")
        // hash 생성 메서드이기 때문에 hash를 제외, data는 merkleRoot로 대체된다.
        .join("")
      // 배열을 하나의 문자열로 연결
    );
  }

  // 난이도 구하는 메서드
  getDifficulty({
    height, // 높이
    timestamp, // 입력되는 시간
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절의 단위 개수 전의 난이도
    adjustmentTimestamp, //  난이도 조절의 단위 개수 전의 생성 시간()
  }) {
    // 높이가 난이도 조절 단위 갯수 미만일 경우 최초의 블록에서 현재까지
    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL) return 0;

    // 높이가 난이도 조절 단위 갯수의 2배 미만일 경우 최초 블록이 포함된 단위 개수 다음 개수
    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL * 2) return 0;

    // 높이의 난이도 조절 단위 개수 나머지가 0이 아니면 개수가 맞아 떨어지지 않아서
    if (height % DIFFICULTY_ADJUSTMENT_INTERVAL != 0)
      // 이전 난이도를 이용
      return previousDifficulty;
    // 만약 난이도 조절 단위 개수가 10이라면 10개 단위로 난이도 조절을 하게 된다.
    // 높이가 9까지는 0, 높이가 10~19까지는 1, 이후로는 각 10단위 마다 아래 코드로 난이도르 결정하게 될 것이다.

    const timeTaken = timestamp - adjustmentTimestamp;
    // 현재 시간과 난이도 조절 단위 갯수 이전의 시간의 차이를 확인
    // 블록이 생성된 시간 - 10개 이전의 생성 시간 = 시간차

    // 블록 생성 기준시간 10분에 블록 하나 생성
    // 10개 만들면 100분
    const timeExpected =
      TIME_UNIT * BLOCK_GEMRATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;

    // 난이도 증가
    if (timeTaken < timeExpected * 0.5) return adjustmentDifficulty + 1;
    // 설정된 블록 10개 생성 시간보다 0.5배 미만이라면 난이도를 증가시킨다.
    // =  300초보다 더 이르게 풀 경우

    // 난이도 감소
    if (timeTaken < timeExpected * 1.5) return adjustmentDifficulty - 1;
    // 설정된 블록 10개 생성 시간보다 1.5배 이상이라면 난이도를 감소시킨다.
    // = 900초보다 더 오래 걸릴 경우

    return adjustmentDifficulty;
  }

  // 블록 업데이트
  updateBlock() {
    // 난이도에 맞게 hash를 생성, 문제풀이
    let hashBinary = hexToBinary(this.hash);
    // 현재 hash를 bit 형식으로, binary 형식으로 바꾼다.
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // 0과 1로 이루어진 hash 문자의 시작된 0의 개수가 0의 난이도 개수와 일치하는지 확인
      // startWith : 특정 문자열로 시작하는지 확인
      // 난이도를 구해야 하니까 블록의 난이도를 전달해주고
      // 난이도가 2면 "00" 두 개인지 확인
      // 난이도의 갯수와 "0"이 반복횟수가 일치할 때까지 반복

      this.nonce++;
      // nonce를 증가시키고

      this.timestamp = Date.now();
      // 블록 생성 시점이 달라졌으니 현재 시점으로 재생성.

      this.difficulty = this.getDifficulty(
        // 난이도를 다시 구한다.
        // 이전 블록 시간과 높이는 추가해야 한다.
        _previousBlock.difficulty,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );

      // 생성할 블록의 해시값
      this.hash = this.createHash(this);
      hashBinary = hexToBinary(this.hash);
      // 비교를 위해 hash를 다시 bit 형식, binary 형식으로 변경
    }
  }
  // 블록의 검증 함수
  isValiNewBlock(_newBlock, _previousBlock) {
    // 생성된 블록이 문제가 없는지 확인하는 메서드

    if (_newBlock.height !== _previousBlock.height + 1) {
      // 생성된 블록이 이전 블록의 다음 개수를 가져오는지 확인
      return { isError: true, error: "'Block's height is incorrect. " };
    }

    if (_newBlock.previousHash !== _previousBlock.hash) {
      // 생성된 블록에 저장된 이전 블록의 해시가 이전 블록의 해시와 일치하는 지 확인
      return { isError: true, error: "Hash of previous Block is incorrect. " };
    }

    if (this.createHash(_newBlock) !== _newBlock.hash) {
      // hash를 다시 생성하여 생성된 블록의 hash와 맞는지 확인
      return { isError: true, error: "Hash of block is incorrect. " };
    }

    // 모두 통과해서 문제가 없다면 에러가 없다고 표기하고 블록을 반환
    return { isError: false, value: _newBlock };
  }
}

module.exports = Block;
