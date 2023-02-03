// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import Txout from "@core/transaction/TxOut";
import UnspentTxOut from "@core/transaction/UnspentTxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;
  // 보기 편하려고 #을 private로 변경. 보통 다른 언어에서 private라고 적는다.
  // private는 해당 클래스내에서만 사용할 수 있기 때문에 interface를 따로 사용하지 못한다.
  //  - private는 상속도 불가능하다.

  private utxos: Array<IUnspentTxOut>;

  private txPool: Array<ITransaction>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`우석이의 제네시스 블록 ${new Date()}`, 0)],
      []
    );
    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
    this.txPool = [];
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

  get getTxPool(): Array<ITransaction> {
    return [...this.txPool];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    console.log("7-12 블록 생성");
    console.log("addBlock");
    console.log("_data : ", _data);
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    console.log("7-20 생성된 블록을 체인에 추가하는 메서드 호출");
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    console.log("7-21/7-34 정상적인 마지막 블록인지 확인");
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log("_newBlock : ", _newBlock);

      console.log("7-22/7-35 체인에 블록을 추가");
      this.chain.push(_newBlock);

      console.log("7-23/7-36 블록의 트랜잭션을 기준으로 UTXO 목록을 수정한다.");
      _newBlock.data.forEach((_tx: Transaction) => this.updateUTXO(_tx));
      console.log("7-25/7-38 트랜잭션 수정 메서드에 블록 전달");
      this.updateTxPool(_newBlock);
      // 다른 peer가 추가되었다고 보냈을 때
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
    console.log("7-46 체인 교체를 위해 내 체인보다 긴지 확인한다.");
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

    console.log("7-47 체인 교체");
    this.chain = _chain;

    console.log("7-48 새로운 체인으로 트랜잭션 풀과 UTXO를 업데이트한다.");
    // 새로운 체인의 모든 블록을 가져다가
    this.chain.forEach((_block: IBlock, index) => {
      // 트랜잭션 풀을 업데이트하고(삭제할 것은 삭제, 추가할 것은 추가)
      console.log(`7-49-${index} 새로운 체인으로 트랜잭션 풀 업데이트`);
      this.updateTxPool(_block, index);
      _block.data.forEach((_tx: Transaction, index2) => {
        console.log(`7-49-${index}-${index2} 새로운 체인으로 UTXO 업데이트`);
        // 각 블록의 data(트랜잭션)을 하나하나 가져와서 UTXO를 업데이트한다.
        this.updateUTXO(_tx, index, index2);
      });
    });
    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    // 블록을 채굴하기

    console.log("7-7 블록 채굴 시작");

    console.log("7-8 txIns(input) 생성");
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    // 거래가 아닌 채굴이라 input의 address가 비어있고 번호만 넣어준다.

    console.log("7-9 txOuts(output) 생성");
    const txOut: ITxOut = new Txout(_address, 50);
    // 주소, 즉 누구의 것으로 할 것인가? 그리고 증가시킬 코인 갯수

    console.log("7-10 코인베이스 트랜잭션 생성");
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // 채굴로 증가한 블록이니 트랜잭션을 만들어준다. 거래를 할때도 new Transaction을 쓰는 것은 다르지 않을 것이다.

    // const utxo = coinbaseTransaction.createUTXO();
    // this.utxos.push(...utxo);

    console.log(
      "7-11 코인베이스 트랜잭션과 지금까지 쌓은 트랜잭션으로 블록을 생성"
    );
    return this.addBlock([...this.getTxPool, coinbaseTransaction]);
  }

  updateUTXO(_tx: Transaction, index?: number, index2?: number) {
    console.log(
      `6-34/7-24/7-37${`7-49-${index}-${index2}`}/8-27 UTXO 수정 시작`
    );
    const utxos = this.getUtxo;

    const newUTXO: Array<IUnspentTxOut> = [];
    for (let i = 0; i < _tx.txOuts.length; ++i) {
      newUTXO.push(
        new UnspentTxOut(
          _tx.txOuts[i].address,
          _tx.txOuts[i].amount,
          _tx.hash,
          i
        )
      );
    }

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
    const result = [...temp, ...newUTXO];
    this.utxos = result.reduce((prev, curr) => {
      const find = prev.find(
        ({ txOutId, txOutIndex }) =>
          txOutId === curr.txOutId && txOutIndex === curr.txOutIndex
      );
      if (!find) prev.push(curr);
      return prev;
    }, []);
  }

  addTxPool(_tx: ITransaction): void {
    console.log("8-25 트랜잭션 풀에 트랜잭션 추가");
    this.txPool.push(_tx);
  }
  updateTxPool(_newBlock: IBlock, index?: number): void {
    console.log(
      `7-26/7-39${
        index! == undefined ? `/7-49-${index} updateTxPool` : ""
      } 트랜잭션 수정 시작`
    );
    // 블록 생성 후 해당 블록에 사용된 트랜잭션을 삭제한다.
    let txPool: Array<ITransaction> = this.txPool; // 기존 트랜잭션의 풀
    const tempTx: Array<ITransaction> = _newBlock.data; // 새로운 블록의 트랜잭션이다. << 사용된 트랜잭션.

    console.log("7-27/7-40 기존 트랜잭션 풀과 새 블록의 데이터(트랜잭션");
    for (let i = 0; i < tempTx.length; ++i) {
      const tempTxPool: Array<ITransaction> = [];
      for (let j = 0; j < txPool.length; ++j) {
        if (txPool[j].hash !== tempTx[i].hash) tempTxPool.push(txPool[j]);
        // 기존 트랜잭션 풀과 사용된 트랜잭션들(블록 내의 트랜잭션)을 비교해서 사용되지 않은 트랜잭션을 새로운 배열에 넣어준다.
      }
      txPool = tempTxPool;

      // txPool = txPool.filter((_tx) => _tx.hash !== tempTx[i].hash);
      // 이것으로 대체 가능
    }

    console.log("7-28/7-41 새로운 트랜잭션 풀을 적용");
    this.txPool = txPool;
  }
}

export default Chain;
