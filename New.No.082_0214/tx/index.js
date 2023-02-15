// npm i ethereumjs-tx
//  - 트랜잭션 관련 라이브러리
const ethTx = require(`ethereumjs-tx`).Transaction;

const tx = new ethTx({
  from: "0x5E06c7F7B4De0814Ee9b6683573b51E1D9bE2c1a",
  to: "0x5cB1444399337d0068b781f340478B229AA921a4",
  value: "0x" + Math.pow(10, 18).toString(16),
});
console.log(tx);
console.log(tx.r);
console.log(tx.v);
console.log(tx.s);

tx.sign(
  Buffer.from(
    "863e9c85468006d46581bf6b13bfba056b240f494f26762d00a5a78b74541f35",
    "hex"
  )
);

console.log(tx);
console.log(tx.r);
console.log(tx.v);
console.log(tx.s);

console.log(tx.serialize().toString("hex"));
// 수동으로 사인을 주었긴 했는데 메타마스크와 Geth에서 알아서 사인을 해주니 이럴 필요는 없다.
