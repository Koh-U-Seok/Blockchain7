import "./App.css";
import useWeb3 from "./useWeb3";
import Counter from "./Counter";
import { useEffect } from "react";

// 0xaaFB63B609884d5a437377BEe4f6D47908af529e
function App() {
  const [web3, account, balance] = useWeb3();

  if (!account) return <h1>메타마스크 설치 및 계정 연결해</h1>;
  return (
    <div className="App">
      <h1>Account : {account}</h1>
      <h3>Balance : {balance} ETH</h3>
      <Counter web3={web3} account={account}></Counter>
    </div>
  );
}

export default App;
