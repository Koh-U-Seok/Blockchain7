// npm i ws express
// npm i -D @types/ws @types/express
import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

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
  connectSocket(socket: WebSocket) {
    // 소켓을 연결한다.
    this.socket.push(socket);
    // 연결된 소켓을 소켓 목록에 추가한다. (peer 목록에 추가)
    //      - 후에 어디와 연결되었는지 확인할 때 사용한다.
    socket.on("message", (_data: string) => {
      // message 이벤트가 발새하면 로그로 남긴다.
      console.log(_data.toString());
    });
    socket.send(`메세지 전송`);
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
      //   socke을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    socket.on("open", () => {
      // 연결 성공 시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket);
      // 연결에 성공하면 소켓에 추가한다.
    });
  }
}

export default P2P;
