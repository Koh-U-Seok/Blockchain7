import { useState, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  useEffect(() => {
    (async () => {
      if (!window.ethereum) return;
      // 메타마스크가 설치되지 않았으면 바로 종료

      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(address);

      const _web3 = new Web3(window.ethereum);
      setWeb3(_web3);
      // 메타마스크와 연결

      const _balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      // latest 붙여서 전부 잔액을 합친다. geth에서는 편의성을 위해 없앤 느낌
      setBalance(parseInt(_balance.slice(2), 16));
      // setBalance(
      //   Math.floor(
      //     (parseInt(_balance.slice(2), 16) / Math.pow(10, 18).toFixed()) *
      //       100000
      //   ) / 100000
      // );
    })();
    // (함수)() : 즉시 실행함수, 함수를 바로 실행한다.
  }, []);

  return [web3, account, balance];
};
// 컴포넌트가 아니다 => 커스텀 훅, Custom Hook : 보통 앞에 use를 붙인다.
export default useWeb3;
