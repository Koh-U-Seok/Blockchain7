const router = require("express").Router();
const Web3 = require("web3");
const db = require("../models/index.js");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8081")
);

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  // console.log(result);
  // if (!error) {
  //   console.log(result);
  // }
});

web3.eth.subscribe("pendingTransactions", (error, result) => {
  console.log("거래 했다.");
  if (!error) {
    console.log("pendigTransaction : ", result);
    web3.eth.getTransaction(result).then(async (data) => {
      console.log("data : ", data);
      console.log("data.value :", data.value);
      console.log("typeof data.value : ", typeof data.value);
      for (let i = 0; i < Object.keys(data).length; i++) {
        console.log(Object.keys(data)[i], ", ", typeof Object.keys(data)[i]);
      }

      await db.Transaction.create({
        blockHash: data.blockHash,
        blockNumber: data.blockNumber,
        chainId: data.chainId,
        from: data.from,
        gas: data.gas,
        gasPrice: data.gasPrice,
        hash: data.hash,
        input: data.input,
        nonce: data.nonce,
        r: data.r,
        s: data.s,
        to: data.to,
        transactionIndex: data.transactionIndex,
        type: data.type,
        v: data.v,
        value: data.value,
      });
    });
  } else console.log("에러 발생 : ", error);
});

module.exports = web3;

// geth --datadir ~/myGeth --http --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8081 --ws.origins "*"

// node 16버전에선 addr가 맛이 갔다.
