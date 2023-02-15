const express = require("express");
const Web3 = require("web3");

const app = express();

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8081")
);

// geth에서 Websocket 열기
// --ws --ws.port 8081 --ws.addr "0.0.0.0" --ws.origins "*"
// ws 설정

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    console.log(result);
  }
});

app.listen(8000, () => {
  console.log("8000 server open");
});
