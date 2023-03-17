import { List } from "./components/List";
import { Mint } from "./components/Mint";
import { useWeb3 } from "./modules/useWeb3";

function App() {
  const { web3, chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account && web3 ? (
          // 메타마스크가 지갑을 들고 있으면, 메타마스크와 연결이 되어있으면
          <div>
            <div>ChainId : {chainId}</div>
            <div>Account : {account}</div>
            <Mint web3={web3} account={account} />
            {/* Mint 컴포넌트에 web3와 account을 props로 전달 */}
          </div>
        ) : (
          // 메타마스크가 지갑을 들고 있지 않으면, 또는 메타마스크가 없다면
          <div>
            <button
              onClick={() => {
                logIn();
                // 버튼을 누르면 메타마스크에 로그인을 시도한다.
              }}
            >
              MetaMask Log In
            </button>
          </div>
        )}
      </div>
      <List account={account} />
    </div>
  );
}

export default App;
