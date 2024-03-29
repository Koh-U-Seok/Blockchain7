import TxIn from "./TxIn";
import TxOut from "./TxOut";
import UnspentTxOut from "./UnspentTxOut";
import { SHA256 } from "crypto-js";

class Transaction implements ITransaction {
  public txIns: Array<ITxIn>;
  public txOuts: ITxOut[];
  public hash: string;

  constructor(_txIns: ITxIn[], _txOuts: Array<ITxOut>) {
    this.txIns = _txIns;
    this.txOuts = _txOuts;
    this.hash = this.createHash();
  }
  createHash(): string {
    console.log("블록이 생성될 때 마다 실행한다.");
    // 서버를 실행했을 때 보이는 것은 제네시스 블록을 생성했기에 출력하는 것이다.
    console.log("6-29 트랜잭션의 해시 생성");
    let txOutStr = "";
    console.log("6-30 트랜잭션의 output에 대해서 값들을 전부 문자열로 합침");
    for (let i = 0; i < this.txOuts.length; ++i) {
      const tempTxOut: Array<string | number> = Object.values(this.txOuts[i]);
      // output 내용의 값들만 가져오자. 여러개이기 때문에 배열이다.
      for (let j = 0; j < tempTxOut.length; ++j) {
        txOutStr += tempTxOut[j];
      }
    }
    // const txOutStr: string = this.txOuts.reduce(
    //   (prev, curr) => prev + Object.values(curr).join(""),
    //   ""
    // );

    let txInStr = "";
    console.log("6-31 트랜잭션의 input에 대해서 값들을 전부 문자열로 합침");
    for (let i = 0; i < this.txIns.length; ++i) {
      const tempTxIn: Array<string | number> = Object.values(this.txIns[i]);
      // Input 내용의 값들만 가져오자. 여러개이기 때문에 배열이다.
      for (let j = 0; j < tempTxIn.length; ++j) {
        txInStr += tempTxIn[j];
      }
    }

    // const txInStr: string = this.txIns.reduce(
    //   (prev, curr) => prev + Object.values(curr).join(""),
    //   ""
    // );

    return SHA256(txInStr + txOutStr)
      .toString()
      .toUpperCase();
  }

  createUTXO(): Array<IUnspentTxOut> {
    console.log("6-35 트랜잭션의 output을 기준으로 추가될 UTXO를 반환");
    // transaction에서 utxo를 생성해서 내보내준다.
    const utxo: Array<IUnspentTxOut> = [];
    for (let i = 0; i < this.txOuts.length; ++i) {
      utxo.push(
        new UnspentTxOut(
          this.txOuts[i].address,
          this.txOuts[i].amount,
          this.hash,
          i
        )
      );
    }
    return utxo;
  }

  static createTx(_receivedTx, _myUTXO: Array<UnspentTxOut>): Transaction {
    console.log("6-23 트랜잭션 생성 함수 시작");
    const { sum, txIns } = TxIn.createTxIns(_receivedTx, _myUTXO);
    const txOuts = TxOut.createTxOuts(sum, _receivedTx);
    console.log("6-28 트랜잭션 생성");
    const tx = new Transaction(txIns, txOuts);
    return tx;
  }
}
export default Transaction;
