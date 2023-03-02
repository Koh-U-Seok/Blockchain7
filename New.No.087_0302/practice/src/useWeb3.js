import { useState, useEffect } from "react";

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  // web3를 저장하는 스테이트

  const [account, setAccount] = useState();
  // 계정 정보를 저장하는 스테이트
  useEffect(() => {
    (async () => {
      if (!window.ethereum) return;
      // 메타마스크 없으면 바로 종료한다.

      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // 메타마스크에 요청보낸다. 현재 활성화된 지갑을 보여달라고.

      setAccount(address);
      // 계정을 스테이트에 등록

      const _web3 = new web3(window.ethereum);
      // 메타마스크와 연결한다.

      setWeb3(_web3);
      // 메타마스크와의 연결 정보를 스테이트에 저장한다.
    })();
    // (함수)() : 즉시 실행하는 함수.
  }, []);

  return [web3, account];
  // 메타마스크와 연결 정보, 그리고 활성화된 지갑 정보를 반환한다.
};
// html을 반환시켜주지 않으면 컴포넌트가 아니다. 다시 말해, 커스텀 훅이다.

export default useWeb3;
