// import Block from "@core/block/block";
// import Chain from "@core/chain";

// const genesis = new Block(["첫 블록"]);
// console.log("genesis : ", genesis);

// const second = new Block(["두 번째 블록"], genesis);
// console.log("second : ", second);

// const previousBlock = new Block(["이전 블록"]);
// previousBlock.height = 29;
// previousBlock.difficulty = 10;
// const adjustmentBlock = new Block(["단위 개수 전 블록"]);
// adjustmentBlock.height = 20;
// adjustmentBlock.difficulty = 11;

// const newBlock = new Block(["asdf"], previousBlock, adjustmentBlock, {
//   DAI: 10,
//   averageGenerationTime: 60 * 1000,
// });

// // console.log(newBlock);

// let chain = new Chain();

// for (let i = 0; i < 300; i++) {
//   chain.addBlock([`test block ${i}`]);
// }
// console.log("myChain : ", chain[0]);

import P2P from "./p2p";
import express, { Express, Request, Response } from "express";
import { json } from "stream/consumers";

const app: Express = express();
const ws: P2P = new P2P();
// P2P 클래스를 ws라는 이름으로 새로 선언한다. ws는 Chain 클래스를 상속받았다.

app.use(express.json());

// 체인 확인하는 용도
// PostMan으로 주소는 http://localhost:8080/chains,
// {
//    "data" : "체인 데이터 요청"
// }
// 다른 사람과 주고 받는게 아니라 나 자신의 것을 확인할 용도이기 때문에 자신에게 보낸다.
app.get("/chains", (req: Request, res: Response) => {
  console.log(ws.getChain);
  // get 메서드는 ()를 붙이지 않아도 된다.

  res.json(ws.getChain);
  // json()은 json의 형태로 데이터를 전송한다. res.send(JSON.stringify(ws.getChain))과 다르지 않다.
  // PostMan에서 요청을 보냈으니 getChain으로 체인을 가져와서 json 형태로 대답한다.
  // 객체를 보내면 터진다. 그렇기에 json으로 바꿔서 보낸다.
});

// 나 혼자 블록 생성하는 용도
// PostMan으로 주소는 http://localhost:8080/block/mine,
// {
//    "data" : ["블록쌓기"]
// }
// 체인에 블록을 쌓는 용도가 아니라 일단 나혼자 블록을 쌓는 용도이기 때문에 자신에게 보낸다.
//
app.post("/block/mine", (req: Request, res: Response) => {
  const { data }: { data: Array<string> } = req.body;
  // req.body, 즉 {"data" :"블록쌓기"}를 data에 넣는다.
  // {data}:{data:Array<string>}은 json을 객체의 형태로 넣겠다는 뜻이다.
  // 쉽게 말해 임시 채굴이다.

  const newBlock: IBlock | null = ws.addBlock(data);
  // P2P가 상속받은 Chain의 addBlock에 객체화된 req.body인 data를 인자로 넣어 실행한다.
  // IBlock | null 인 이유는 검사 용도의 메서드인 isValidBlock의 결과로 isError:true가 나오면 결과적으로 return값이 null이 나올 수 있기 때문이다.
  // 성공적으로 나온다면 IBlock의 형태로 새로운 블럭이 newBlock에 정의될 것이다.
  // 문제가 생겼다면 null의 형태로 newBlock이 정의될 것이다.

  if (newBlock === null) res.send("error data");
  // newBlock이 null이라면, 다시 말해 블록 생성에 실패했다면 "error data"를 전송한다.
  // send()를 실행하면 통신은 종료되니 아래의 res.json()은 실행하지 않는다.

  res.json(newBlock);
  // if문에 걸리지 않았다면 성공적으로 제작된 블록을 json의 형태로 전송(대답)한다.
});
// 이후에 GET /chains 로 요청을 보내면 제네시스 블록과 새로 만든 블록이 같이 응답으로 오는 것을 확인할 수 있다.

// 다른 사람의 체인과 비교해서(높이) 더 높은 것을 채택
//                          상대 IP주소   포트번호
// PostMan으로 주소는 http://192.168.0.227:8080/peer/add
//            내 IP 주소
// {
//   "peer":"ws://192.168.0.227:7545"
// }
app.post("/peer/add", (req: Request, res: Response) => {
  const { peer }: { peer: string } = req.body;
  // req.body, 즉 {"peer":"ws://192.168.0.227:7545"}를 peer에 넣는다.
  // {peer}:{peer:string}은 json의 형태로 온 req.body를 객체의 형태로 넣겠다는 뜻이다.
  ws.addToPeer(peer);
  // P2P 클래스로 선언된 ws의 addToPeer 메서드에 객체화한 req.body, 즉 {"peer":"ws://192.168.0.227:7545"}(보낸 사람의 IP. 내가 보내면 내 IP이며, 다른 사람이 나에게 통신을 시도하면 상대의 IP이다.)를 객체화 한것을 addToPeer 메서드의 인자로 담아 실행한다.
  res.end();
  // 통신을 종료한다.
});

// 나한테 접속한 다른 컴퓨터(== /peer/add를 했던 다른 컴퓨터)를 조회
// 내가 다른 컴퓨터를 조회해도 해당 컴퓨터가 기록된다.
app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSocket.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0;

app.listen(ports[idx][0], () => {
  console.log("server start ", ports[idx][0]);
  ws.listen(ports[idx][1]);
  // WebSocket(P2P) 서버 생성/배포
});
