const router = require("express").Router();
const web3 = require("./web.js");

router.post("/blockList", async (req, res) => {
  console.log("BlockList");
  try {
    let tempArr = [];

    for (let i = 0; i < 18; i++) {
      tempArr.push(await web3.eth.getBlock(i));
    }
    console.log(tempArr);
    res.send(tempArr);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
