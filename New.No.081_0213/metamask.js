const nowAccountElem = document.getElementById("now-account");
const balanceElem = document.getElementById("balance");
const toElem = document.getElementById("to");
const etherElem = document.getElementById("ether");
console.log(window.ethereum);

if (window.ethereum) {
  const isConnected = window.ethereum.isConnected();
  console.log("Javascript 읽자 마자 isConnected : ", isConnected);

  const getBalance = async (accounts) => {
    nowAccountElem.innerHTML = accounts[0];
    const balance = await ethereum.request({
      method: "eth_getBalance",
      // params: ["0x5DF232cfa8C3337C177944bf3717Ca145d32B885"],
      params: accounts,
    });

    balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
    console.log(parseInt(balance) / Math.pow(10, 18));
  }; // 이 함수가 if문 안쪽에 있는 이유는 window.ethereum이 있을 때만 실행하려고

  ethereum.on("connect", async (connectInfo) => {
    console.log(connectInfo);
    console.log(parseInt(connectInfo.chainId));

    const isConnected = window.ethereum.isConnected();
    console.log("connect 후 isConnected : ", isConnected);

    try {
      const account = await ethereum.request({
        // method: "eth_accounts", << 결과는 아래와 같으나 지금은 아래로 이름이 변경되었다.
        method: "eth_requestAccounts",
      });
      //   nowAccountElem.innerHTML = account[0];
      //   const balance = await ethereum.request({
      //     method: "eth_getBalance",
      //     // params: ["0x5DF232cfa8C3337C177944bf3717Ca145d32B885"],
      //     params: account,
      //   });

      //   balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
      //   console.log(parseInt(balance) / Math.pow(10, 18));
      await getBalance(account);
    } catch (error) {
      console.error(error);
    }
  });

  ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts);

    // nowAccountElem.innerHTML = accounts[0];

    // const balance = await ethereum.request({
    //   method: "eth_getBalance",
    //   // params: ["0x5DF232cfa8C3337C177944bf3717Ca145d32B885"],
    //   params: accounts,
    // });
    // balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
    // console.log(parseInt(balance) / Math.pow(10, 18));
    await getBalance(accounts);
  });
  // 사이트와 연결해줘야 뜬다.

  ethereum.on("chainChanged", (chainId) => {
    console.log(chainId);
  });

  ethereum.on("message", (message) => {
    console.log(message);
  });

  document.getElementById("sendTransaction").onclick = () => {
    const from = nowAccountElem.innerHTML;
    const to = toElem.value;
    const value = "0x" + (+etherElem.value * Math.pow(10, 18)).toString(16);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [{ from, to, value }],
      })
      .then((result) => {
        console.log(result);
        getBalance([from]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
