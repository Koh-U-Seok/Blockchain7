declare interface IBlockHeader {
  version: string; // 버전. 프로그래머가 직접 건드는 것이고 프로그램이 수정해서는 안된다.
  merkleRoot: string; // 머클 루트. 트랜잭션들을 머클 트리에 넣고 나온 가장 위의 값이다.
  timestamp: number; // 타임스탬프. 만들어진 날짜다.
  height: number; // 높이. 이 블록이 몇 번째 블록인지 나타낸다.
  difficulty: number; // 난이도. 해시의 앞자리를 몇 자리나 0으로 돌려야 하는지에 대한 수치이다.
  nonce: number; // 난이도의 수치에 도달할 때까지 해시의 앞자리를 0으로 바꾸는 것을 반복한 횟수다.
}

declare interface IBlock extends IBlockHeader {
  previousHash: string; // 이전 해시. 이전 블록(previousBlock.hash와 previousHash는 같아야 오류가 없지만 엄연히 다른 개념이다.)
  hash: string; // 현재 블록의 해시
  data: Array<ITransaction>; // 트랜잭션
  // data: string[];
}
