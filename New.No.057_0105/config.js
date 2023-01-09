// npm init -y

// 설치명령어
// ---------------------
// npm i merkle crypto-js hex-to-binary
// ---------------------

// 라이브러리들을 가져오고
const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

// 암호화
const hexToBinary = require("hex-to-binary");
// hex 방식(0~15)으로 지정된 데이터를 바이너리 방식의 (0~1)으로 변환시켜준다.

// 난이도 조절용 수치를 미리 정해놓자. 블록 생성 시간을 조절하기 위해서이다.

// 최초의 블럭에서 10번째 블록까지는 난이도가 0
// 생성되는 블록의 20번째 부터 난이도 수치가 조절될 수 있게

// 최초에 난이도를 조절할 때 최초 블록부터 이 수치까지는 난이도 증가 없이 0으로 주려고 만들어준 값
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

// 난이도 조절에 있어서 단위 개수, 난이도르 변경하기 위한 기준
// 0 ~ 9, 10 ~ 19, 20 ~ 29... 높이가 이것과 비교해서 난이도가 결정될 것이다.
const BLOCK_GEMRATION_INTERVAL = 10;

// 블록 하나당 걸리는 시간
const TIME_UNIT = 60 * 1000;

// 위의 세 개의 변수는 고정 값이다. 그렇기에 let이 아닌 const로 선언된 것이다.

// 블록 10개는 만드는데 필요한 시간
// 1에 대한 시간 단위(1분 = 60초 * 1000ms);

module.exports = {
  lib: {
    merkle,
    SHA256,
    hexToBinary,
  },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GEMRATION_INTERVAL,
    TIME_UNIT,
  },
};
