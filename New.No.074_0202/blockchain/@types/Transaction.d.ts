declare interface ITxOut {
  // Transaction의 결과(output)
  address: string;
  amount: number;
}

declare interface ITxIn {
  // transaction에서 사용되는 잔액(input)
  txOutId: string; // transaction의 hash
  txOutIndex: number; // transaction의 몇 번째 output
  signature?: string;
  // signature : string | undefined;
  // undefined가 아닌 null이면 빈 칸 일 경우 에러가 발생한다.
  //    - undefined는 값이 정의되지 않은 빈 값
  //    - null은 값이 비어있다고 정의된 값
  // | 는 비트 연산자 중 or를 뜻한다.
  //    - 연산에 있어서 2진수로 바꿔서 연산한다.
  //    - 1011101 | 11011011
  //        - 01011101 | 11011011 => 결과 11011111값이 나온다.
  //    - 12341 || 124124 << 둘 중 하나가 참이면 전체가 참이다.
  //    - 어따 쓰느냐?
  //        - 게임에서 상태이상을 따질 때 기절, 출혈, 감전, 화상, 마비, 에어본, 중독, ..이 있을 때 기절은 1, 출혈은 10, 감전은 100, 화상은 1000,...
  //        - 000110 << 출혈과 감전인셈
  //        - 감전걸린 상태(000100) | 출혈이 추가(000010) => 000110, 감전과 출혈이 걸렸다.
  // 그동안 이걸 배우지 않았던 것은 게임에서나 쓰고 블록체인에서는 쓸 만한 곳이 없었다.
}

declare interface ITransaction {
  txIns: Array<ITxIn>;
  txOuts: Array<ITxOut>;
  hash: string; // TxHash || TxID 이 두개로 부르기도 한다.
}

declare interface IUnspentTxOut {
  address: string;
  amount: number;
  txOutId: string; // transaction의 hash
  txOutIndex: number; // transaction의 몇번째 output인지
}
