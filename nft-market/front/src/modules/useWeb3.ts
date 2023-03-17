import { useCallback, useState } from "react";
import Web3 from "web3";

export const useWeb3 = (): {
  web3: Web3 | undefined;
  // web?:Web3; 이렇게 써도 된다.
  account: string;
  chainId: string | null;
  logIn: () => void;
  // 반환값이다.
} => {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<string | null>("");

  const logIn = useCallback(async () => {
    try {
      if (window.ethereum) {
        // window.ethereum이 안되는 것은 typescript라 인식을 못한다.
        // react-app-env.d.ts 에서 import { MetaMaskInpageProvider } from "@metamask/providers"; 입력

        const _web3: Web3 = new Web3((window as any).ethereum);
        // window as any라고 쓰는 이유는 window가 있는지 없는지 모르기 때문에 as any를 붙여서 되는대로 다 갖고오라고 했다.
        // type을 지정하지 않아도 되는 이유는 new Web3를 써서 타입 자체가 클래스로 들어가기 때문이다.

        setWeb3(_web3);
        // state 변수 web3에 _web3를 넣는다.

        const [_account] = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>;
        // as : 이러한 타입으로 나올 것이라고 알려준다.
        // 메타마스크가 현재 들고 있는 지갑이 뭔지 가져온다.
        // undefined 내지는 null이 반환되었다면 메타마스크 로그인을 안했다는 것이다.

        if (_account) {
          // 현재 지갑을 들고 있다면

          setAccount(_account);
          // state 변수 account에 현재 들고 있는 지갑에 대한 데이터 객체를 넣는다.
        }

        window.ethereum.on("accountsChanged", async () => {
          // 메타마스크가 들고 있는 지갑이 바뀌었을 때 감지해서 실행

          if (window.ethereum) {
            // 메타마스크가 있다면

            const [_account] = (await window.ethereum.request({
              method: "eth_requestAccounts",
            })) as Array<string>;
            // 메타마스크가 들고 있는 지갑을 갖고 온다.

            setAccount(_account);
          }
        });

        setChainId(window.ethereum.networkVersion);
        // state 변수 setChainId에 메타마스크가 어느 이더리움 네트워크에 접속 중인지 가져온다.
      } else {
        // 메타마스크 정보가 없다면 애초에 메타마스크 설치가 안된 것이다.

        console.log("MetaMask is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // 대괄호 조건 따라 재정의한다. 안에 state 변수가 있으면 mount, state 변경할 때마다 함수 재정의.
  // 대괄호가 비어있으니 mount될 때만 함수를 정의한다.

  return { web3, account, chainId, logIn };
  // 메타마스크에 대한 정보인 web3, 현재 들고 있는 지갑 정보인 account, 어느 이더리움 네트워크에 접속 중인지 알려주는 chainId, 메타마스크는 있되 로그인이 안되어 있을 때 실행하는 함수 loginId를 반환한다.
};
