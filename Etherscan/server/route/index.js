const router = require("express").Router();
const db = require("../models/index.js");
const web3 = require("./web.js");

router.post("/blockList", async (req, res) => {
  try {
    const blockList = await db.Block.findAll({
      order: [["number", "DESC"]],
      offset: req.body.offset,
      limit: req.body.limit,
    });
    res.send({ blockList: blockList });
  } catch (error) {
    console.error(error);
  }
});

router.post("/block", async (req, res) => {
  let block = {};
  try {
    block = await web3.eth.getBlock(req.body.blockNumber);
    res.send(block);
  } catch (error) {
    console.error(error);
  }
});

router.post("/accountList", async (req, res) => {
  try {
    let tempArr = [];
    tempArr.push(await web3.eth.getAccounts());
    res.send(tempArr);
  } catch (error) {
    console.error(error);
  }
});

router.post("/account", async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(req.body.account);
    res.send({ account: req.body.account, balance: balance });
  } catch (error) {
    console.error(error);
  }
});

router.post("/transactionList", async (req, res) => {
  try {
    const transactionList = await db.Transaction.findAll({
      order: [["blockNumber", "DESC"]],
      offset: req.body.offset,
      limit: req.body.limit,
    });

    res.send({ transactionList: transactionList });
  } catch (error) {
    console.error(error);
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const transaction = await web3.eth.getTransaction(req.body.transactionHash);
    res.send({ msg: "갈갈", transaction: transaction });
  } catch (error) {
    console.error(error);
  }
});

router.post("/getMaxNum", async (req, res) => {
  let maxNum = 0;
  switch (req.body.list) {
    case "blockList":
      maxNum = await db.Block.count();
      res.send({ isError: false, maxNum: maxNum });
      break;
    case "accountList":
      maxNum = (await web3.eth.getAccounts()).length;
      res.send({ isError: false, maxNum: maxNum });
      break;
    case "transactionList":
      maxNum = await db.Transaction.count();
      res.send({ isError: false, maxNum: maxNum });
      break;
    default:
      res.send({ isError: true });
  }
});

router.post("/search", async (req, res) => {
  let result = {};
  switch (req.body.searchType) {
    case "blockNumber":
      if (Number.isInteger(parseInt(req.body.searchData))) {
        result = await db.Block.findOne({
          where: { number: req.body.searchData },
        });
        console.log("result:", result);
        if (result != undefined || result != null) {
          res.json({ isError: false, result: result });
          break;
        }
      }
      res.json({ isError: false, result: -1 });
      break;

    case "hash":
      result = await db.Block.findOne({ where: { hash: req.body.searchData } });
      if (result != undefined || result != null) {
        res.json({ isError: false, result: result });
        break;
      } else {
        res.json({ isError: false, result: -2 });
        break;
      }
    case "account":
      let accounts = await web3.eth.getAccounts();
      let newArr = [];
      for (let i = 0; i < accounts.length; i++) {
        newArr.push(accounts[i].toUpperCase());
      }
      if (newArr.indexOf(req.body.searchData.toUpperCase()) != -1) {
        const temp = newArr.indexOf(req.body.searchData.toUpperCase());
        result = {
          account: req.body.searchData,
          balance: await web3.eth.getBalance(accounts[temp]),
        };
        res.json({ isError: false, result: result });
        break;
      } else {
        res.json({ isError: false, result: -3 });
        break;
      }
    case "transaction":
      result = await db.Transaction.findOne({
        where: { hash: req.body.searchData },
      });
      if (result != undefined || result != null) {
        res.json({ isError: false, result: result });
        break;
      } else {
        res.json({ isError: false, result: -4 });
        break;
      }
    default:
      res.send({ isError: true });
  }
});
// ==========================================================

// let latestBlockNumber = 0;
// let dBLatestBlockNumber = 0;
// db.Block.max("number")
//   .then((max) => {
//     dBLatestBlockNumber = max == null ? 0 : max;
//   })
//   .then(() => {
//     web3.eth
//       .getBlock("latest")
//       .then((data) => {
//         latestBlockNumber = data.number;
//       })
//       .then(() => {
//         console.log("latestBlockNumber : ", latestBlockNumber);
//         console.log("dBLatestBlockNumber : ", dBLatestBlockNumber);
//         if (latestBlockNumber > dBLatestBlockNumber) {
//           web3.eth
//             .getBlock("latest")
//             .then((data) => {
//               latestBlockNumber = data.number;
//             })
//             .then(() => {
//               for (
//                 let i =
//                   dBLatestBlockNumber == 0
//                     ? dBLatestBlockNumber
//                     : dBLatestBlockNumber + 2;
//                 i < latestBlockNumber + 2;
//                 i++
//               ) {
//                 web3.eth.getBlock(i).then(async (data) => {
//                   await db.Block.create({
//                     difficulty: data.difficulty,
//                     extraData: data.extraData,
//                     gasLimit: data.gasLimit,
//                     gasUsed: data.gasUsed,
//                     hash: data.hash,
//                     miner: data.miner,
//                     mixHash: data.mixHash,
//                     nonce: data.nonce,
//                     number: data.number,
//                     parentHash: data.parentHash,
//                     receiptsRoot: data.receiptsRoot,
//                     sha3Uncles: data.sha3Uncles,
//                     size: data.size,
//                     stateRoot: data.stateRoot,
//                     timestamp: data.timestamp,
//                     totalDifficulty: data.totalDifficulty,
//                     transactions: data.transactions,
//                     transactionsRoot: data.transactionsRoot,
//                     uncles: data.uncles,
//                   });
//                   console.log(i, " 번째 블록 추가되었다.");
//                 });
//               }
//             });
//         }
//       });
//   });

module.exports = router;
