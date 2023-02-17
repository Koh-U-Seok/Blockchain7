const router = require("express").Router();
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8081")
);

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    console.log(result);
  }
});

module.exports = web3;

// geth --datadir ~/myGeth --http --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8081 --ws.origins "*"

// node 16버전에선 addr가 맛이 갔다.
