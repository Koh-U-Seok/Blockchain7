const router = require("express").Router();
const db = require("../models/index.js");
const web3 = require("./web.js");

router.post("/blockList", async (req, res) => {
  console.log("BlockList");
  try {
    let tempArr = [];
    let latestBlockNumber = (await web3.eth.getBlock("latest")).number;

    for (let i = 0; i < latestBlockNumber + 1; i++) {
      tempArr.push(await web3.eth.getBlock(latestBlockNumber - i));
    }
    console.log(tempArr);
    res.send(tempArr);
  } catch (error) {
    console.error(error);
  }
});

router.post("/block", async (req, res) => {
  console.log("Block");
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
    let tempArr = [];
    // await web3.
  } catch (error) {
    console.error(error);
  }
});

router.post("/search", async (req, res) => {
  let result = {};
  console.log("req.body.searchType : ", req.body.searchType);
  console.log("req.body.searchType : ", req.body.searchType);
  switch (req.body.searchType) {
    case "blockNumber":
      result = await db.Block.findAll({
        where: { number: req.body.searchData },
      });
      console.log("result : ", result);
      res.json({ isError: false, result: result });
      break;
    case "hash":
      result = await db.Block.findAll({ where: { hash: req.body.searchData } });
      res.json({ isError: false, result: result });
      break;
    case "account":
      result = await db.Account.findAll({
        where: { hash: req.body.searchData },
      });
      res.json({ isError: false, result: result });
      break;
    case "transaction":
      result = await db.Transaction.findAll({
        where: { hash: req.body.searchData },
      });
      res.json({ isError: false, result: result });
      break;
    default:
      res.send({ isError: true });
  }
});
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let latestBlockNumber = 0;
let dBLatestBlockNumber = 0;
db.Block.max("number")
  .then((max) => {
    dBLatestBlockNumber = max == null ? 0 : max;
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
                let i = dBLatestBlockNumber;
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
                });
              }
            });
        }
      });
  });

module.exports = router;
