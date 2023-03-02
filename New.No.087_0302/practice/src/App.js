import logo from "./logo.svg";
import "./App.css";
import useWeb3 from "./useWeb3";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <h1>메타마스크 설치 및 계정 연결해</h1>;
  return (
    <div className="App">
      <h1>Account : {account}</h1>
    </div>
  );
}

export default App;
