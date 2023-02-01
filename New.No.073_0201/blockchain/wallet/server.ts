import express, { Express, Request, Response } from "express";
import axios from "axios";
import path from "path";
import Wallet from "./wallet";

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// 1-1 웹페이지에 접근 시 파일 있으면

app.post("/wallet/create", (req: Request, res: Response) => {
  // 2-2 post 통신으로 /wallet/create 라우터에 요청들어왔음
  console.log("2-2 /wallet/create 라우터에 post 메서드로 요청들어왔음");
  // 지갑을 생성하라

  res.json(
    new Wallet()
    // 지갑 생성
  );
  // 2-7 생성된 지갑을 json 형식으로 응답
  console.log("2-7 생성된 지갑을 json 형식으로 응답");
  console.log("");
});

app.get("/wallet/list", (req: Request, res: Response) => {
  // 3-2 GET 메서드, /wallet/list 라우터로 요청 들어옴
  console.log("3-2 GET 메서드, /wallet/list 라우터로 요청 들어옴");

  res.json(
    Wallet.getList()
    // static인 getList를 통해 지갑 목록을 가져오겠다
  );
  // 3-4 가져온 파일 목록으로 응답한다.
  console.log("3-4 가져온 파일 목록으로 응답한다.");
  console.log("");
});

app.get("/wallet/:address", (req: Request, res: Response) => {
  // 4-2 GET 메서드, /wallet/지갑주소 라우터로 요청받았다.
  console.log("4-2 GET 메서드, /wallet/지갑주소 라우터로 요청받았다.");

  const address: string = req.params.address;
  console.log(address);
  const privateKey: string = Wallet.getWalletPrivateKey(address);

  // 4-8 생성된 지갑을 json 형식으로 응답
  console.log("4-8 생성된 지갑을 json 형식으로 응답");
  res.json(new Wallet(privateKey));
});

app.post("/transaction/send", (req: Request, res: Response) => {
  // 5-3 POST 메서드, /transaction/send 라우터로 요 청받음
  console.log("5-3 POST 메서드, /transaction/send 라우터로 요청 받음");
  const signature = Wallet.createSign(req.body);
  console.log(signature);

  const txObj = {
    sender: req.body.sender.publicKey,
    received: req.body.received,
    amount: req.body.amount,
    signature,
  };

  // 5-7 생성한 서명과 hash를 만들기 위한 데이터를 가지고 http://localhost:8080/transaction/send에 요청을 보냄
  console.log(
    "5-7 생성한 서명과 hash를 만들기 위한 데이터를 가지고 http://localhost:8080/transaction/send에 요청을 보냄"
  );
  console.log("");
  axios.post("http://localhost:8080/transaction/send", txObj, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
      // HTTP 통신에서의 인증 방법
      // Authorization: Basic 방식은 base64 포맷을 기본으로 한다.
    },
  });
  res.json(signature);
});

app.listen(9514, () => {
  console.log("wallet server open 9514");
});
