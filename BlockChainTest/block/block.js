const merkle = require("merkle");
// 머클 루트를 구하기 위한 라이브러리
const SHA256 = require("crypto-js").SHA256;
// 암호화를 위한 라이브러리
const hexToBinary = require("hex-to-binary");
// 16진수를 2진수로 변환하기 위한 라이브러리.
// 16진수로 구성된 해시를 2진수로 바꿔서 앞자리가 난이도에 맞는지 체크하는 용도다.

class BlockHeader {
  // 블록의 헤더
  version; // 이 블록의 버전이다.
  merkleRoot; // 머클 루트. 트랜잭션을 머클 라이브러리로 넣어서 나온 결과의 루트다.
  timestamp; // 타임스탬프. 이 블록이 언제 만들어졌는가?해시를 기준으로 한다.
  height; // 높이. 몇 번째 블록인지에 대한 정보.
  difficulty; // 난이도. 해시의 앞자리에 0이 난이도 수치 이상 있어야 통과한다.
  nonce; // 난이도를 통과할 때까지 몇 번 반복하였는가

  constructor(_data, _previousBlock) {
    // Block에서 보내준 변수들이다. _data는 새로이 만들 블록의 트랜잭션, _previousBlock은 이전 블록이다.
    // BlockHeader를 상속받을 Block에서 super()로 호출할 것이다.

    this.version = "1.0.0";
    // 현재 블록의 버전이다. 자동적으로 증가하는게 아니라 개발자가 무언가 업데이트한다면 수동으로 바꿔주는 것이다.

    const merkleRoot = this.createMerkleRoot(_data);
    // 머클 루트를 작성하는 메서드를 호출한다. 트랜잭션을 인자로 넣는다.

    if (merkleRoot.isError) {
      // createMerkleRoot의 반환값에 에러가 있는지 검사한다. 이하의 내용은 에러가 검출되었을 경우에 실행하는 코드다.

      this.merkleRoot = "";
      // 머클루트를 제거한다. 머클 루트는 64자리로 되있어야 하는데 0자리가 되었으니 이후의 코드에서도 문제가 생기고 블록이 만들어지지 않게 될 것이다.
    } else {
      // createMerkleRoot의 반환값에 에러가 없을 경우. 머클루트가 정상적으로 만들어 졌을 경우다.

      this.merkleRoot = merkleRoot.value;
      // createMerkleRoot로 만든 머클 루트를 이 클래스, 즉 블록의 머클 루트로 재정의했다. 이제 이후의 코드에서 머클루트를 정상적으로 호출할 수 있을 것이다.
    }

    this.setTimestamp();
    // 타임스탬프를 만들어주기 위해 호출했다. 직접 만들지 않고 따로 함수로 분리한 이유는 난이도를 조절하면 해시가 바뀌기 때문에 그 때도 호출해주려고 한 것이다.

    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    // 높이를 설정해 준다. 이전 블록이 있으면 제네시스 블록이 아니니 이전 블록보다 1높게 지정하고, 이전 블록이 없다면 제네시스 블록이라는 뜻이니 0으로 준다.

    this.difficulty = 0;
    // 난이도의 초기값을 0으로 준다.

    this.nonce = 0;
    // 논스의 초기값을 0으로 준다.
  }
  setTimestamp() {
    this.timestamp = Date.now();
    // 밀리초(ms, 0.001s) 기준이다.
    // 현재 블록의 타임스탬프를 만들어주었다.
  }

  createMerkleRoot(_data) {
    // 머클을 만들어주는 메서드다.

    if (!Array.isArray(_data) || !_data.length) {
      // 트랜잭션이 배열이 아니거나 길이가 0이라면 문제가 있으니 에러를 리턴한다.

      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
      // isError라는 프로퍼티에 true값을 주어 에러 발생을 알린다.
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
    // _data(트랜잭션)에 문제가 없는 것을 확인했으니 isError를 false로 지정해 에러가 없는 것을 알리고, value에 머클 루트를 넣는다.
    // 암호화 방식은 sha256을 선택하고 머클 트리에 _data를 넣어 그 결과물의 root를 머클 루트라고 하는 것이다.
  }

  getDifficulty({
    previousDifficulty,
    // 이전 블록의 난이도

    adjustmentDifficulty,
    // 이전 세대의 난이도.
    // 난이도 조절 단위 개수를 10개라고 지정해줬다면 블록 10개 마다 난이도를 조절한다.

    adjustmentTimestamp,
    // 이전 세대의 실제 생성 시간.
    // 만약 난이도 조절 단위 개수를 10개로 지정하였다고 예로 들면, 이제 20번째 블록을 만들려고 한다고 가정하겠다. 10~19번째 블록의 생성 시간을 의미하는 매개변수다.

    DAI,
    // 난이도 조절 단위 개수
    // 몇 블록을 한 세대로 취급하여 여러 블록의 난이도를 한 번에 정해줄지 정하는 수치.

    averageGenerationTime,
    // 블록 세대당 예상 생성 시간.
    // 난이도 조절 기능의 기준으로, 난이도 수치만큼 해시 앞자리에 0이 놓일 때까지 걸린 시간(문제풀이 시간)이 averageGenerationTime과 정도 이상으로 벗어나면 그에 맞춰 난이도를 조절할 것이다.
  }) {
    if (this.height < DAI) {
      // 현재 블록의 높이(몇 번째 블록)가 한 세대 보다 낮을 경우

      this.difficulty = 0;
      // 제네시스 블록의 난이도는 0이다. 제네시스 블록이 있는 세대의 난이도는 0이다. DAI의 수치에 따라 한 세대로 묶였기 때문이다.
    } else if (this.height < DAI * 2) {
      // 현재 블록의 높이가 한 세대의 범위 안에 들어갈 경우

      this.difficulty = 1;
      // DAI 수치 보다 낮을 때는 제네시스 블록 생성 시 설정한 난이도보다 하나 더 높은 난이도가 설정된다.
    } else if (this.height % DAI !== 0) {
      // 현재 블럭의 높이를 DAI로 정확히 나누어 떨어지지 않을 때
      // 블록이 제네시스 블록과 같은 세대도, 그 다음 세대도 아니며 난이도를 정정하는 각 세대의 첫 번째 블록도 아닐 때. 난이도는 각 세대의 첫 번째 블록이 만들어질 때만 바뀌며 한 세대가 공유하기 때문이다.

      this.difficulty = previousDifficulty;
      // 이전 블록의 난이도를 그대로 가져다 쓴다.
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      // timestamp는 현재 블록의 생성 시간이며 adjustmentTimestamp는 이전 세대의 생성 시간이다.
      // 현재 블록과 이전 세대의 생성 시간 차이를 구했다.
      // 현재 블록을 생성하는데 얼마나 걸렸는지를 알려주는 변수다.

      if (timeToken < averageGenerationTime * 0.9) {
        // 현재 블록을 생성하는데 걸린 시간이 예상 생성 시간보다 적게 걸렸을 때

        this.difficulty = adjustmentDifficulty + 1;
        // 예상 생성 시간보다 빨리 만들었으니 난이도를 1 올려준다.
      } else if (timeToken > averageGenerationTime * 1.1) {
        // 현재 블록을 생성하는데 걸린 시간이 예상 생성 시간보다 더 오래 걸렸을 때

        this.difficulty = adjustmentDifficulty - 1;
        // 예상 생성 시간보다 느리게 만들었으니 난이도를 1 낮춰준다.
      } else {
        // 현재 블록을 생성하는데 걸린 시간이 예상 생성 시간과 큰 차이가 없는 경우

        this.difficulty = adjustmentDifficulty;
        // 이전 세대의 난이도를 그대로 물려받는다.
      }
    }
  }
}

class Block extends BlockHeader {
  previousHash;
  // 이전 블록의 해시. "이전 블록의 해시"와 "이전 블록"의 해시는 다르다. 이후에 잘못된 블록인지 검사할 때 혼동할 수도 있으니 주의하자.
  hash;
  // 현재 블록의 해시
  data;
  // 현재 블록의 트랜잭션

  constructor(
    _data,
    // 블록 생성 시 인자로 넣은 트랜잭션
    _previousBlock,
    // 블록 생성 시 인자로 넣은 이전 블록
    _adjustmentBlock,
    // 블록 생성 시 인자로 넣은 이전 세대 블록
    _config
    // 설정. 난이도 조절 단위 갯수와 이번 세대 블록의 예상 생성 시간이 있다.
  ) {
    super(_data, _previousBlock);
    // 상속해준 BlockHeader의 constructor를 실행한다.

    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // 이전 블록이 없다면 제네시스 블록이라는 뜻이니 이전 블록의 해시를 64자리의 0으로 채운다.
    // 이전 블록이 있다면 이전 블록의 해시를 현재 블록의 이전 해쉬로 넣는다.

    if (this.merkleRoot) {
      // 현재 블록에 머클 루트가 있는지 검사한다. 없다면 배열이 아닌 데이터가 입력된 것이니 에러가 발생한 것이다.
      if (_adjustmentBlock && _config) {
        // 이전 세대 블록과 설정이 있다면 제네시스 블록이 아닌 것이니 난이도를 지정해 주어야 한다.
        this.getDifficulty({
          // 난이도를 구하는 함수를 호출한다.
          previousDifficulty: _previousBlock.difficulty,
          // 이전 블록의 난이도
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          // 이전 세대의 난이도
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          // 이전 세대의 타임스탬프
          DAI: _config.DAI,
          // 난이도 조절 단위 갯수
          averageGenerationTime: _config.averageGenerationTime,
          // 현재 블록의 예상 생성시간
        });
      }
      this.hash = Block.createHash(this);
      // 현재 블록의 정보를 담아 해시를 만드는 함수를 호출한다.
      if (_adjustmentBlock && _config) {
        // 이전 세대 블록과 설정이 있다면 제네시스 블록이 아닌 것이니 난이도를 지정해 주어야 한다.
        this.updateBlock({
          // 난이도에 따른 문제를 푸는 함수를 실행한다.
          previousDifficulty: _previousBlock.difficulty,
          // 이전 블록의 난이도
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          // 이전 세대의 난이도
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          // 이전 세대의 타임스탬프
          DAI: _config.DAI,
          // 난이도 조절 단위 갯수
          averageGenerationTime: _config.averageGenerationTime,
          // 현재 블록의 예상 생성시간
        });
      }
    } else {
      // 머클 루트가 없다면 배열이 아닌 데이터가 입력되었다는 뜻이다.

      this.hash = "";
      // 잘못된 머클 루트가 있으니 해시를 망가뜨려서 블록을 취소시키는 것이다.
    }
    this.data = _data;
    // 입력받은 데이터를 현재 블록의 데이터로 넣는다.
  }

  static createHash(_block) {
    // static은 this로 부르면 안된다.
    // static을 붙이면 Block.createHash()로 호출할 수 있다. 없으면 new Block();으로 정의하고 사용해야 하는데 그렇게 하면 메모리 낭비가 있다.
    // 함수를 외부에 놓아도 되자만 이 클래스 안에 두어 블록을 만들 때 한 번에 불러올려고 한 것이다.

    let tempStr = "";
    // 블록의 정보를 임시적으로 담을 문자열

    const keys = Object.keys(_block);
    // Block의 키들을 배열로 가져온다.

    for (let i = 0; i < keys.length; i++) {
      // Block의 키 숫자 만큼 반복한다.
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
        // 해시를 만드는 과정이다. 해시에는 해시가 들어갈 수 없으며 트랜잭션은 머클 루트에 들어가니 제외한다.
      }

      tempStr += _block[keys[i]];
      // 해시와 트랜잭션을 제외한 키들을 하나로 더한다.
    }
    return SHA256(tempStr).toString().toUpperCase();
    // 해시를 만든다. sha256으로 암호화한 것을 문자화한다.
    // sha256으로 암호화하면 소문자로 되어있기에 대문자로 바꿔주었다.
  }

  updateBlock(difficultyOptions) {
    // 난이도와 논스를 이용하여 문제를 푼다.
    // difficultyOptions는 난이도와 관련된 변수들이다.
    // 블록의 생성 시간을 조절하기 위해 푼다.

    let hashBinary = hexToBinary(this.hash);
    // sha256으로 암호화되면 16진수로 되어있다. 그것을 2진수로 바꾼다.

    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // 난이도(this.difficulty)만큼 0이 반복된 것으로 시작되었다면 참을 반환하는 것을 부정하였다.
      // 문제가 풀릴 때까지  반복할 것이라서 앞에 !를 붙였다.

      this.nonce += 1;
      // 문제를 못 풀 때 마다 논스를 1 증가시킨다.
      // 논스는 문제를 푸는 데 시도한 횟수다.

      this.setTimestamp();
      // 타임스탬프는 해시가 변경될 떄를 기준으로 한다. 해시를 바꿨으니 다시 바꿔준다.

      this.getDifficulty(difficultyOptions);
      // 난이도를 조정하는 메서드를 호출한다.

      this.hash = Block.createHash(this);
      // 해시를 최신화 한다.

      hashBinary = hexToBinary(this.hash);
      // 바꾼 해시를 다시 2진수로 변환한다.
    }
  }

  static isValidBlock(_newBlock, _previousBlock) {
    // static은 this로 부르면 안된다.
    // static을 붙이면 Block.isValidBlock()로 호출할 수 있다. 없으면 new Block();으로 정의하고 사용해야 하는데 그렇게 하면 메모리 낭비가 있다.
    // 함수를 외부에 놓아도 되자만 이 클래스 안에 두어 블록을 만들 때 한 번에 불러올려고 한 것이다.
    // 새로 만든 블록에 문제가 없나 확인하는 과정이다.

    if (_newBlock.height !== _previousBlock.height + 1) {
      // 현재 블록의 높이와 이전 블록의 높이+1이 다르면 에러가 발생한 것이다.

      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      // 현재 블록에 있는 이전 블록의 해시와 이전 블록의 해시가 다르면 에러가 발생한다.

      return {
        isError: true,
        msg: "이전 블록의 hash와 새로운 블록의 이전 hash가 다르다.",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      // 형재 블록의 해시와 현재 블록으로 새로 만든 해시가 다르면 에러가 발생한다.

      return { isError: true, msg: "hash 생성 중 오류 발생" };
    }
    return { isError: false, value: _newBlock };
    // 아무 문제가 없다면 에러도 발생하지 않고 현재 블록을 반환한다.
    // 호출은 chain에서 한다.
  }
}

module.exports = Block;
//외부에서 Block을 가져갈 수 있도록 방출한다.
