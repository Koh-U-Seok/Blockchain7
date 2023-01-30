// npm i ws express
// npm i -D @types/ws @types/express

import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

// const TYPE = {
//   BLOCK: 1,
//   CHAIN: 2,
// };

// TYPE.BLOCK

enum MessageType {
  // enum : 배열과 비슷하게 순서가 있는 데이터이다.
  //    - 열거형 이라고 한다.
  //    - 위의 코드와 같은 역할을 한다.
  //    - 변수에 정의할 값을 미리 정의했다고 생각하자.
  // MessageTYPE << 왜 정의했느냐? << 어떤 메세지를 주고 받았는지 확인하기 위해서 타입으로 설정했다. 혹시나 모를 오타와 같은 오류를 배제하기 위함이다.
  lastBlock = 0,
  // 마지막 블록을 달라고 하고 준다.
  allBlock = 1,
  // 전체 체인 달라고 하고 준다.
  addBlock = 2,
  // 블록이 추가되었다고 알려주고 뭐가 추가되었는지 알려준다.
}
// 오타같은 오류를 줄이기 위해서 사용한다.

interface IMessage {
  // 주고 받을 메세지에 대한 타입
  type: MessageType;
  // 어떤 메세지를 주고 받았는지 확인
  payload: any;
  // 메세지에 담긴 데이터
}

class P2P extends Chain {
  //  Chain을 상속받는 이유 : 현재 P2P 서버에 기존의 체인을 상속함으로써 블록 추가 등에 있어서 편하다.

  private socket: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.socket = [];
  }

  get getSocket(): Array<WebSocket> {
    return [...this.socket];
  }
  connectSocket(socket: WebSocket, type?: MessageType): void {
    // POST /peer/add 통신을 보낸 상대와 소켓을 연결하는 메서드다.
    this.socket.push(socket);
    // socket은 연결 정보에 대한 객체. 간단하게 설명하면 ip
    // 연결된 소켓을 socket 배열에 추가한다. (peer 목록에 추가)
    // socket은 상대방의 socket 서버 객체다. 저장하기 위한 배열인 this.socket 배열에 저장한다.
    //    - 나중에 어디와 연결되었는지 확인할 때 사용한다.

    socket.on("message", (_data: string) => {
      // message 이벤트가 발생하면 로그로 남긴다.
      console.log(_data.toString());

      const data: IMessage = JSON.parse(_data.toString());
      // 받은 메세지를 문자열로 변환시킨 다음 JSON.parse() 메서드를 사용해 객체로 변환한다.
      // 변환되어 만들어진 객체는 IMessage의 형태로 data에 넣어진다.

      switch (data.type) {
        // 어떤 요청이 왔는가 data의 type을 확인한다.
        case MessageType.lastBlock: {
          // 마지막 블록을 달라고 했을 경우
          const message: IMessage = {
            type: MessageType.allBlock,
            payload: [this.lastBlock],
            // 마지막 블록을 배열에 담아 payload 키의 값으로 넣는다.
          };

          socket.send(JSON.stringify(message));
          // 보낸다.
          break;
        }
        case MessageType.allBlock: {
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);

          if (isValid !== null) break;
          //  isValid가 null이 아니다 >> 체인에 블록이 잘 들어갔다.

          // 체인에 블록이 정상적으로 추가되지 않았을때 전체 체인을 보내서 확인한다.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
          };
          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.addBlock:
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError == true) break;

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError == true) break;

          // 나와 연결된 peer들에게 내가 데이터 바뀌었음을 알린다.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };

          this.socket.forEach((item) => {
            item.send(JSON.stringify(message));
          });
          break;
      }
    });

    const message: IMessage = {
      // 처음 연결 시 요청을 보내자. 마지막 블럭을 원한다고
      type: type | MessageType.lastBlock,
      payload: type ? this.getChain : [],
    };

    socket.send(JSON.stringify(message));
    // 방금 연결한 Socket 서버에  message 이벤트를 보낸다.
  }

  listen(port: number): void {
    // 현재 로컬에서 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.
    /// 가나슈(Ganache)라는 개인용 블록체인이 있다. << 네트워크 없이 진행 가능하다.
    // 이 가나슈의 초기 port 설정이 7545이다.

    server.on("connection", (socket: WebSocket) => {
      // 서버에 연결이 들어왔을 때
      console.log("socket start");
      this.connectSocket(socket);
      //   socket을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    // listen()의 server.on("connection",()=>{})을 실행한다.
    // peer에 들어있는 주소는 보낸 사람의 IP다.
    // 내가 /peer/add로 Post 통신을 보내면 받는 서버의 입장에서 peer, 내 ip는 상대의 ip인 셈이다.
    socket.on("open", () => {
      // 상대의 socket 서버와 연결 성공 시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
      // socket 서버와, 체인에 블록을 추가하기 위해 통신을 하였기에 MessageType.addBlock의 유형으로 이 클래스의 connectSocket 메서드를 실행한다.
      // 연결에 성공하면 소켓에 추가한다.
    });
  }
}

export default P2P;
