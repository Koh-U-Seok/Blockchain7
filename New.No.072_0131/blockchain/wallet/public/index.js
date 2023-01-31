const addressLi = document.getElementById("wallet_address");
const publicKeyLi = document.getElementById("wallet_publicKey");
const privateKeyLi = document.getElementById("wallet_privateKey");
const balanceLi = document.getElementById("wallet_balance");

const info = (_wallet) => {
  // 2-9 전달받은 지갑 정보(data)를 웹페이지에 출력
  console.log("2-9/4-10 전달받은 지갑 정보(data)를 웹페이지에 출력");

  addressLi.innerHTML = _wallet.address;
  publicKeyLi.innerHTML = _wallet.publicKey;
  privateKeyLi.innerHTML = _wallet.privateKey;
  balanceLi.innerHTML = _wallet.balance;
};

document.getElementById("new_wallet_btn").onclick = () => {
  // 2-1 지갑 생성을 클릭했을 때
  console.log("2-1 지갑 생성 클릭했다.");
  axios.post("/wallet/create").then(({ data }) => {
    console.log(data);

    // 2-8 응답받은 지갑 정보(data)를 info 함수에 전달
    console.log("2-8 응답받은 지갑 정보(data)를 info 함수에 전달");
    info(data);
  });
};

const getInfo = async (_address) => {
  // 4-2 지갑 주소 목록 중 하나 클릭
  console.log("4-1 지갑 주소 목록 중 하나 클릭");

  const wallet = await axios.get("/wallet/" + _address);
  console.log("4-9 응답받은 지갑 정보(data)를 info 함수에 전달");
  info(wallet.data);
};

const listUl = document.getElementById("wallet_list");

document.getElementById("wallet_list_btn").onclick = () => {
  // 3-1 목록 가져오기 클릭
  console.log("3-1 목록 가져오기 클릭");
  axios.get("/wallet/list").then(({ data }) => {
    // 3-5 파일 목록을 응답받았다. ul 엘리먼트 내용(innerHTML)을 비우고, 받은 파일 목록으로 채운다
    console.log(
      "3-5 파일 목록을 응답받았다. ul 엘리먼트 내용(innerHTML)을 비우고, 받은 파일 목록으로 채운다."
    );

    console.log(data);
    listUl.innerHTML = "";
    data.forEach((item) => {
      listUl.innerHTML += `<li onclick="getInfo('${item}')">${item}</li>`;
      // 클릭 시 4-1 실행
    });
  });
};

document.getElementById("transaction_form").onsubmit = (e) => {
  e.preventDefault();
  // 5-1 전송 버튼 클릭
  console.log("5-1 전송 버튼 클릭");
  // 조건 : 위에 지갑 데이터 있어야함 && received 입력값이 있어야함 && amount 입력값이 있어야 함

  const publicKey = publicKeyLi.innerHTML;
  const address = addressLi.innerHTML;
  const received = e.target.received.value;
  const amount = e.target.amount.value;

  const req = {
    sender: {
      publicKey,
      address,
    },
    received,
    amount,
  };

  // 5-2 현재 지갑 정보와 입력된 값으로 /transaction/send에 요청보냄
  console.log(
    "5-2 현재 지갑 정보와 입력된 값으로 /transaction/send에 요청보냄"
  );
  axios.post("/transaction/send", req);
};
