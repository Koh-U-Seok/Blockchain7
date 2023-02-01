class TxIn implements ITxIn {
  txOutId: string;
  txOutIndex: number;
  signature?: string;
  constructor(_txOutId: string, _txOutIndex: number, _signature?: string) {
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
    this.signature = _signature;
  }
}

export default TxIn;
