const router = require("express").Router();
const Web3 = require("web3");
const db = require("../models/index.js");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8081")
);

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    db.Block.max("number")
      .then((max) => {
        dBLatestBlockNumber = max == null ? -1 : max;
      })
      .then(() => {
        web3.eth
          .getBlock("latest")
          .then((data) => {
            latestBlockNumber = data.number;
          })
          .then(() => {
            if (latestBlockNumber > dBLatestBlockNumber) {
              web3.eth
                .getBlock("latest")
                .then((data) => {
                  latestBlockNumber = data.number;
                })
                .then(() => {
                  for (
                    let i = dBLatestBlockNumber + 1;
                    i < latestBlockNumber + 1;
                    i++
                  ) {
                    web3.eth.getBlock(i).then(async (data) => {
                      await db.Block.create({
                        difficulty: data.difficulty,
                        extraData: data.extraData,
                        gasLimit: data.gasLimit,
                        gasUsed: data.gasUsed,
                        hash: data.hash,
                        miner: data.miner,
                        mixHash: data.mixHash,
                        nonce: data.nonce,
                        number: data.number,
                        parentHash: data.parentHash,
                        receiptsRoot: data.receiptsRoot,
                        sha3Uncles: data.sha3Uncles,
                        size: data.size,
                        stateRoot: data.stateRoot,
                        timestamp: data.timestamp,
                        totalDifficulty: data.totalDifficulty,
                        transactions: data.transactions,
                        transactionsRoot: data.transactionsRoot,
                        uncles: data.uncles,
                      });

                      for (let j = 0; j < data.transactions.length; j++) {
                        if (
                          (await web3.eth.getTransaction(
                            data.transactions[j]
                          )) != null
                        ) {
                          await web3.eth
                            .getTransaction(data.transactions[j])
                            .then(async (tx) => {
                              await db.Transaction.create({
                                blockHash: data.hash,
                                blockNumber: data.number,
                                chainId: tx.chainId,
                                from: tx.from,
                                gas: tx.gas,
                                gasPrice: tx.gasPrice,
                                hash: tx.hash,
                                input: tx.input,
                                nonce: tx.nonce,
                                r: tx.r,
                                s: tx.s,
                                to: tx.to,
                                transactionIndex: tx.transactionIndex,
                                type: tx.type,
                                v: tx.v,
                                value: tx.value,
                              });
                            });
                        }
                      }
                    });
                  }
                });
            }
          });
      });
  }
});

// web3.eth.subscribe("pendingTransactions", async (error, result) => {
//   if (!error) {
//     web3.eth.getTransaction(result).then(async (data) => {
//       await db.Transaction.create({
//         // blockHash: data.blockHash,
//         // blockNumber: data.blockNumber,
//         chainId: data.chainId,
//         from: data.from,
//         gas: data.gas,
//         gasPrice: data.gasPrice,
//         hash: data.hash,
//         input: data.input,
//         nonce: data.nonce,
//         r: data.r,
//         s: data.s,
//         to: data.to,
//         transactionIndex: data.transactionIndex,
//         type: data.type,
//         v: data.v,
//         value: data.value,
//       });
//     });
//   } else console.log("에러 발생 : ", error);
// });

module.exports = web3;

// geth --datadir ~/myGeth --http --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8081 --ws.origins "*"

// node 16버전에선 addr가 맛이 갔다.
