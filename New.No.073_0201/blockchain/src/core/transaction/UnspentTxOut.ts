class UnspentTxOut implements IUnspentTxOut {
  address: string;
  amount: number;
  txOutId: string;
  txOutIndex: number;
  constructor(
    _address: string,
    _amount: number,
    _txOutId: string,
    _txOutIndex: number
  ) {
    this.address = _address;
    this.amount = _amount;
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
  }
}
export default UnspentTxOut;
