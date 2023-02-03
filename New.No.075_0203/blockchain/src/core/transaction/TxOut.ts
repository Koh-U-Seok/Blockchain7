import Wallet from "@core/wallet";

class Txout implements ITxOut {
  address: string;
  amount: number;

  constructor(_address: string, _amount: number) {
    this.address = _address;
    this.amount = _amount;
  }

  static createTxOuts(sum: number, _receivedTx): Array<Txout> {
    console.log("6-25/8-20 txOuts(output) 생성");
    const { sender, received, amount } = _receivedTx;
    // sender : 보내는 사람
    // received : 받는 사람
    // amount : 수량
    const senderAddress = Wallet.getAddress(sender);

    const receivedTxOut = new Txout(received, amount);

    console.log("6-26/8-21 잔액을 다 썼으면 반환");

    if (sum - amount === 0) return [receivedTxOut];
    // 남은 금액이 0원이라면 받은 사람에게 잔액을 보내라.

    console.log("6-27/8-22 잔액이 남았으면 되돌려준다.");

    const senderTxOut = new Txout(senderAddress, sum - amount);
    // 남은 금액이 0원이 아니라면 잔액이 있을 테니 보낸 사람에게 잔액을 보내라

    return [receivedTxOut, senderTxOut];
  }
}

export default Txout;
