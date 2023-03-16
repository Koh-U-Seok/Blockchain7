import { List } from "./components/List";
import { Mint } from "./components/Mint";
import { useWeb3 } from "./modules/useWeb3";

function App() {
  const { chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account ? (
          // 메타마스크가 지갑을 들고 있으면
          <div>
            <div>ChainId : {chainId}</div>
            <div>Account : {account}</div>
            <Mint />
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
      <List />
    </div>
  );
}

export default App;
