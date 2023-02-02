// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import Txout from "@core/transaction/TxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;
  // 보기 편하려고 #을 private로 변경. 보통 다른 언어에서 private라고 적는다.
  // private는 해당 클래스내에서만 사용할 수 있기 때문에 interface를 따로 사용하지 못한다.
  //  - private는 상속도 불가능하다.

  private utxos: Array<IUnspentTxOut>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`우석이의 제네시스 블록 ${new Date()}`, 0)],
      []
    );
    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
  }

  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  get getUtxo() {
    return [...this.utxos];
  }
  addBlock(_data: Array<ITransaction>): IBlock | null {
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log("_newBlock : ", _newBlock);
      this.chain.push(_newBlock);
      return _newBlock;
    }
  }
  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인을 받았을 때 정상적인 체인인지 확인한다.
    for (let i = 1; i < _chain.length; i++) {
      const nowBlock = _chain[i];
      const previousBlock = _chain[i - 1];
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      if (isValid.isError == true) return isValid;
      // 문제가 있는 체인이면 에러를 반환한다.
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체인임이 확인되었다.
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    const newLastBlock: IBlock = _chain[_chain.length - 1];
    const lastBlock: IBlock = this.lastBlock;
    if (newLastBlock.height == 0 && lastBlock.height != 0) {
      return { isError: true, msg: "받은 블록이 제네시스 블록이었다." };
    }
    if (newLastBlock.height < this.lastBlock.height) {
      return { isError: true, msg: "내 체인이 더 길다." };
    }
    if (newLastBlock.hash == lastBlock.hash) {
      return { isError: true, msg: "동기화 완료" };
    }

    this.chain = _chain;
    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    // 블록을 채굴하기
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    // 거래가 아닌 채굴이라 input의 address가 비어있고 번호만 넣어준다.

    const txOut: ITxOut = new Txout(_address, 50);
    // 주소, 즉 누구의 것으로 할 것인가? 그리고 증가시킬 코인 갯수

    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // 채굴로 증가한 블록이니 트랜잭션을 만들어준다. 거래를 할때도 new Transaction을 쓰는 것은 다르지 않을 것이다.

    const utxo = coinbaseTransaction.createUTXO();
    //

    this.utxos.push(...utxo);

    return this.addBlock([coinbaseTransaction]);
  }

  updateUTXO(_tx: Transaction) {
    console.log("6-34 UTXO 수정 시작");
    const utxos = this.getUtxo;
    const newUTXO = _tx.createUTXO();

    let temp = utxos.filter((item) => {
      const txIn = _tx.txIns.find(
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
        // 트랜잭션의 txIns에 들어갔다는 얘기는 input으로 넣어서 사용했다는 이야기다.
        // 그럼 기존의 utxos에서 사용한 utxo들을 빼야한다.
        // 그래서 txIns와 utxos를 비교, 검색해서 나오면 filter에서 걸러진다.
      );
      // 사용한 거 찾기
      return !txIn;
      // 있으면
    });
    console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");
    this.utxos = [...temp, ...newUTXO];
  }
}

export default Chain;
