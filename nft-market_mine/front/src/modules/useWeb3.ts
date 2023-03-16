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

        const [_account]: Array<string> = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as Array<string>;
        // as : 이러한 타입으로 나올 것이라고 알려준다.

        if (_account) {
          setAccount(_account);
        }
        setChainId(window.ethereum.networkVersion);
      } else {
        // window.ethereum이 감지안된다. 메타마스크 자체가 없다.
        console.log("MetaMask is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // 대괄호 조건 따라 재정의한다. 안에 state 변수가 있으면 mount, state 변경할 때마다 함수 재정의.
  // 대괄호가 비어있으니 mount될 때만 함수를 정의한다.

  return { web3, account, chainId, logIn };
};
