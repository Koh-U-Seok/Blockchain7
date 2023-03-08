import "./App.css";
import { BreadShop } from "./BreadShop";
import { useWeb3 } from "./useWeb3";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <h1>메타마스크와 연결하시오</h1>;
  return (
    <div className="App">
      <BreadShop web3={web3} account={account}></BreadShop>
    </div>
  );
}

export default App;
