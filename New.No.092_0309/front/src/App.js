import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import Web3 from "web3";
import USeokCoinContract from "./USeokCoin.json";

function App() {
  useEffect(() => {
    (async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(USeokCoinContract.abi);
      console.log(window.ethereum);
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const txObj = {
        data: USeokCoinContract.bytecode,
        arguments: ["USeokCoin", "USeok", 10000],
      };
      const deployed = await contract
        .deploy(txObj)
        .send({ from: _account, gas: 2000000 });
      console.log(deployed.options.address);
    })();
  }, []);

  return <div className="App"></div>;
}

export default App;
