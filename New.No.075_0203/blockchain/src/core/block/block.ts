// const merkle = require("merkle");
// const SHA256 = require("crypto-js").SHA256;
// const hexToBinary = require("hex-to-binary");

import merkle from "merkle";
import { SHA256 } from "crypto-js";
import hexToBinary from "hex-to-binary";

class BlockHeader implements IBlockHeader {
  // implements : interface를 기준으로 타입을 확인한다.
  // class의 프로퍼티의 타입을 선언해주는 것이 아닌 정상적으로 타입이 정의되었나 확인한다.
  // Block 클래스가 이 클래스를 상속받기에 한 몸이라 생각해도 상관없다.

  version: string; // 버전. 프로그래머가 직접 건드는 것이고 프로그램이 수정해서는 안된다.
  merkleRoot: string; // 머클 루트. 트랜잭션들을 머클 트리에 넣고 나온 가장 위의 값이다.
  timestamp: number; // 타임스탬프. 만들어진 날짜다.
  height: number; // 높이. 이 블록이 몇 번째 블록인지 나타낸다.
  difficulty: number; // 난이도. 해시의 앞자리를 몇 자리나 0으로 돌려야 하는지에 대한 수치이다.
  nonce: number; // 난이도의 수치에 도달할 때까지 해시의 앞자리를 0으로 바꾸는 것을 반복한 횟수다.
  ip: string = "192.168.0.227";

  constructor(
    _data: Array<ITransaction>, // 트랜잭션. 거래내역이다.
    _previousBlock?: IBlock // 이전 블록. 만약 제네시스 블록이라면 이전 블록이 없을테니 ?를 붙인다.
  ) {
    console.log("7-14 블록 헤더 생성");
    this.version = "1.0.0";
    // 버전을 1.0.0 으로 손수 고정시켜주었다. 이 블록체인을 수정하지 않는 한 이것이 변경될 일이 있을까?

    const merkleRoot: TResult<string, string> = this.createMerkleRoot(_data);
    // 매개변수로 들어온 트랜잭션으로 머클 루트를 만들어 주었다.

    if (merkleRoot.isError == true) {
      // 머클 루트에 에러가 있다면?

      this.merkleRoot = "";
      // 머클 루트를 비워둔다.
      // 머클 루트 자릿수가 0이기 때문에 이후의 블록 생성에 문제가 생겨 체인에 추가되지 않을 것이다.

      console.error(merkleRoot.msg);
    } else if (merkleRoot.isError == false) {
      // 머클 루트에 에러가 없다면?

      this.merkleRoot = merkleRoot.value;
      // 만들어진 머클 루트의 값을 블록의 머클 루트로 지정한다.
      // 이제 이 블록의 머클 루트를 부르면 제대로 된 머클 루트가 나올 것이다.
    }

    this.setTimestamp();
    // 만든 시간을 기록하는 함수를 호출한다.

    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    //  이전 블록이 있다면 이전 블록의 높이보다 1 높게 주고, 없다면 제네시스 블록이니 0을 준다.

    this.difficulty = 0;
    // 블록을 처음 만들 때는 일단 난이도 0을 주고 시작한다.

    this.nonce = 0;
    // 블록을 갓 만들었을 때는 난이도에 따른 문제풀이를 하지 않았으니 논스 역시 0이다.
  }

  setTimestamp(): void {
    console.log("7-16 현재 시간으로 블록 생성 시간을 설정");
    this.timestamp = Date.now();
    // 블록의 타임스탬프에 블록을 만들 당시의 시간을 저장한다.
  }

  createMerkleRoot(
    _data: Array<ITransaction> // 트랜잭션이다.
  ): TResult<string, string> {
    // 머클 루트를 만들어주는 메서드

    console.log("7-15 머클 루트 생성");
    if (!Array.isArray(_data) || !_data.length) {
      // 블록을 만들 때 입력받은 트랜잭션이 배열이 아니거나 길이가 0이라면 오류가 있는 것이다.

      return { isError: true, msg: "data가 배열이 아니거나 빈 배열" };
      // 에러가 있다고 표시해주고 메세지와 함께 반환해준다.
    }
    // if문에서 걸리지 않았다면 트랜잭션은 이상이 없다는 뜻이다.

    return {
      isError: false,
      value: merkle("sha256")
        .sync(_data.map((item) => item.hash))
        .root(),
    };
    // 에러가 없다는 것을 표시해주고 SHA256 암호화 알고리즘을 사용한 머클 트리의 루트를 반환해준다.
  }

  getDifficulty({
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 이전 세대의 난이도
    adjustmentTimestamp, // 이전 세대의 실제 생성 시간
    DAI, // 한 세대에 몇 개의 블럭이 들어가는가?
    averageGenerationTime, // 이전 세대의 예상 생성 시간
  }: {
    // previousDifficulty: number;
    // adjustmentDifficulty: number;
    // adjustmentTimestamp: number;
    // DAI: number;
    // averageGenerationTime: number;
    [keys: string]: number;
    // string 타입의 키에 대해서 값은 number 타입을 가진다.
  }): void {
    // 난이도를 구하는 메서드다.
    console.log("7-17 난이도 설정");
    if (this.height < DAI) {
      // 현재 블록의 높이가 한 세대에 들어가는 블록의 갯수보다 낮은지 판별. 다시 말해, 제네시스 블록과 같은 세대인지 판별

      this.difficulty = 0;
      // 난이도를 0으로 놓는다.
    } else if (this.height < DAI * 2) {
      // 현재 블록의 높이가 제네시스 블록이 있는 세대의 다음 세대인가?

      this.difficulty = 1;
      // 난이도를 이전 세대보다 조금 더 높은 1로 놓는다.
    } else if (this.height % DAI !== 0) {
      // 현재 높이를 한 세대에 들어가는 블록의 갯수를 나눈 수치가 0이 아닌가? 다시 말해, 정상적으로 난이도를 배정해주어야 하면서도 새롭게 난이도를 지정하지 않는 순서인 블록인가 판별.

      this.difficulty = previousDifficulty;
      // 현재 블록의 난이도를 이전 블록의 난이도로 지정한다. 같은 세대이니 문제없다.
    } else {
      // 위 조건에 다 걸리지 않는다면 제네시스 블록과 같은 세대도, 다음 세대도, 새롭게 난이도를 지정하지 않는 순서인 블록도 아니기에 난이도를 새롭게 지정해야 하는 순서의 블록이다.

      const timeToken: number = this.timestamp - adjustmentTimestamp;
      // 블록이 만들어진 시간에서 실제로 걸린 시간을 빼면 난이도에 따른 문제풀이를 하는데 시간이 얼마나 걸렸는지 알 수 있다.

      if (timeToken < averageGenerationTime * 0.9) {
        // 문제 풀이 시간이 예상 시간보다 더 적게 걸렸다면

        this.difficulty = adjustmentDifficulty + 1;
        // 현재 블록의 난이도를 이전 세대의 난이도보다 1 늘린다.
      } else if (timeToken > averageGenerationTime * 1.1) {
        // 문제 풀이 시간이 예상 시간 보다 더 오래 걸렸다면

        this.difficulty = adjustmentDifficulty - 1;
        // 현재 블록의 난이도를 이전 세대의 난이도보다 1 줄였다.
      } else {
        // 이전 세대와 문제 풀이 시간이 별 차이가 없다.

        this.difficulty = adjustmentDifficulty;
        // 현재 블록의 난이도를 이전 세대의 난이도와 똑같이 놓는다.
      }
    }
  }
}

class Block extends BlockHeader implements IBlock {
  previousHash: string; // 이전 해시. 이전 블록(previousBlock.hash와 previousHash는 같아야 오류가 없지만 엄연히 다른 개념이다.).
  hash: string; // 현재 블록의 해시
  data: Array<ITransaction>; // 트랜잭션

  constructor(
    _data: Array<ITransaction>, // Block 클래스를 호출할 때 트랜잭션을 반드시 넣어주어야 한다.
    _previousBlock?: IBlock, // 이전 블록이다. 체인을 만들 때 제네시스 블록이 기본적으로 들어가는데 이 때는 첫 번째 블록이기에 이전 블록이 없을 수 있기에 ?를 붙인다.
    _adjustmentBlock?: IBlock, // 이전 세대의 블록 난이도 계산에 필요하다.
    _config?: IConfig // 난이도 관련 설정
    // 앞에 빈칸이 있을 수 없기 때문에 입력되지 않을 수도 있는 ?는 뒤로 빠져야 한다.
  ) {
    console.log("7-13 블록 생성 시 블록 헤더 생성");
    super(_data, _previousBlock);
    // BlockHeader의 constructor를 실행한다.

    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // 이전 블록이 있다면 이전 블록의 해시를 이전 해시 자리에 넣고 없다면 0으로 가득채운 64자리 문자열을 넣는다.
    // 이전 블록이 없다는 것은 제네시스 블록이라는 뜻이다.
    // 위의 코드는 제네시스 블록인지 아닌지 판별한다.

    if (this.merkleRoot) {
      // 머클 루트가 있는지 확인한다.
      // BlockHeader에서 머클 루트를 만들어주었기에 true가 나와야 한다.

      if (_adjustmentBlock && _config) {
        // 이전 세대의 블록 난이도와 난이도 관련 설정이 있는가?

        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty, // 이전 블록의 난이도
          adjustmentDifficulty: _adjustmentBlock.difficulty, // 이전 세대의 난이도
          adjustmentTimestamp: _adjustmentBlock.timestamp, // 이전 세대의 실제로 걸린 시간
          DAI: _config.DAI, // 난이도 관련 설정.
          averageGenerationTime: _config.averageGenerationTime, // 이전 세대의 문제풀이 예상 소요 시간
        });
        // 난이도를 책정하는 메서드를 실행한다. BlockHeader로부터 상속받은 메서드다.
      }

      this.hash = Block.createHash(this);
      // 해시를 만든다.

      if (_adjustmentBlock && _config) {
        // 이전 세대와 난이도 관련 설정이 있다면
        this.updateBlock({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
        });
        // getDifficulty로 이전 세대의 난이도를 계승하였고, 그 난이도를 가지고 문제풀이를 해야 한다. 이 블록만의 난이도를 새로 도출해야 한다.
      }
    } else {
      this.hash = "";
      // 머클 루트가 없다면 정상적이지 않은 블록이므로 일부러 터뜨리기 위해 해시를 비워둔다.
    }

    this.data = _data;
    // 입력받은 트랜잭션은 온전히 이 블록의 트랜잭션 자리에 놓는다.
    // console.log(this);
  }

  static createHash(
    _block: // 새로이 만들고 있는 블록 그 자체다.
    IBlock
  ): string {
    // 해시를 만드는 메서드
    console.log("7-18 해시 생성");
    let tempStr = "";
    // 해시로 들어갈 텍스트다.

    const keys = Object.keys(_block);
    // 블록의 요소들을 다 가져왔다.

    for (let i = 0; i < keys.length; i++) {
      // 블록의 요소들을 해시에 넣어야 하기 때문에 그 수만큼 반복한다.
      if (keys[i] === "hash" || keys[i] === "data") {
        // 해시를 만들 것이기에 해시 자신은 제외한다.
        // 트랜잭션은 머클루트에 포함되기에 마찬가지로 제외한다.
        continue;
      }
      tempStr += _block[keys[i]];
      // tempStr에는 블록의 텍스트가 문자열로 나란히 늘어서게 된다.
    }

    return SHA256(tempStr).toString().toUpperCase();
    // SHA256으로 암호화한뒤 문자열로 변환, 소문자를 대문자로 변환한 다음 반환한다.
  }

  updateBlock(difficultyOptions: { [keys: string]: number }): void {
    // 난이도를 통해 문제풀이를 한다.

    console.log("7-19 난이도에 따라 문제 풀이");
    let hashBinary = hexToBinary(this.hash);
    // 16진수인 해시를 2진수로 변환한다.

    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // getDifficulty로 구한 난이도 수치 만큼 0이 해시의 앞에 놓일 때까지 반복한다.

      this.nonce += 1;
      // 문제 풀이를 완료할 때까지 반복한 횟수를 1 증가시킨다.

      this.setTimestamp();
      // 문제풀이를 하는 도중에는 계속해서 만든 시간을 새로 갱신한다.

      this.getDifficulty(difficultyOptions);
      // 난이도를 새로 구한다.

      this.hash = Block.createHash(this);
      // 논스가 바뀌었으니 해시를 새로 갱신한다.

      hashBinary = hexToBinary(this.hash);
      //
    }
    console.log(hashBinary);
    console.log(hashBinary.slice(0, this.difficulty));
  }

  static isValidBlock(
    _newBlock: IBlock, // 만들고 있는 블록
    _previousBlock: IBlock // 이전  블록
  ): TResult<IBlock, string> {
    // 이 블록에 문제가 있는가 검사하는 과정이다.
    if (_newBlock.height !== _previousBlock.height + 1) {
      // 신규 블록의 높이와 이전 블록의 높이+1은 같아야 하는데 아니라면 오류가 있는 것이다.
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      // 신규 블록의 이전 해시와 이전 블록의 해시는 같아야 하는데 아니라면 오류가 있는 것이다.
      return {
        isError: true,
        msg: "이전 블록의 hash와 새로운 블록의 이전 hash가 다르다.",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      // 신규 블록의 해시와 신규 블록으로 만든 해시가 다르다면 오류가 있는 것이다.
      return { isError: true, msg: "hash 생성 중 오류 발생" };
    }
    return { isError: false, value: _newBlock };
  }
}

export default Block;
