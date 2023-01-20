const net = require("net");
const reqParser = require("./lib/req.js");
const resParser = require("./lib/res.js");

global.isJson = true;
global.board = ["asdf", "qwer", "1234"];
// 게시판 목록

const server = net.createServer((client) => {
  client.on("data", (data) => {
    // 연결이 생성됐을 때 그 연결된 클라이언트에서 요청이 들어오는 것을 처리한다.
    const req = reqParser(data.toString());
    const res = resParser(client, req);

    // 라우터 구현
    // req, 요청으로 들어온 정보를 가져와서 path와 method에 따라 라우터를 구분하여 응답을 보낸다.
    if (req.method === "GET" && req.path === "/") {
      // app.get('/',(req,res)=>{})
      // GET 형식으로 / 라우터로 요청이 왔을 때 public 폴더의 index.html 파일로 응답한다.
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === "/index.css") {
      // app.get('/index.css',(req,res)=>{})
      // css 파일을 보내도록 설정
      res.sendFile("index.css");
    } else if (req.method === "GET" && req.path === "/index.js") {
      // app.get('/index.js',(req,res)=>{})
      // js 파일을 보내도록 설정
      res.sendFile("index.js");
    } else if (req.method === "GET" && req.path === "/board") {
      // app.get('/board',(req,res)=>{})
      // board html을 호출
      res.sendFile("board.html");
    } else if (req.method === "GET" && req.path === "/board/list") {
      // app.get('/board/list',(req,res)=>{})
      res.send(JSON.stringify(global.board));
      // JSON.stringify => Json 형식으로 변환한다.
      // string + -ify => string, 문자열로 -화한다. => 문자열로 변환한다.
    } else if (req.method === "POST" && req.path === "/board/add") {
      global.board.unshift(req.body.value);
      res.send(JSON.stringify(global.board));
    } else if (req.method === "GET" && req.path === "/board.js") {
      // app.get('/board.js',(req,res)=>{})
      // js 파일을 보내도록 설정
      res.sendFile("board.js");
    } else {
      // app.get('/*',(req,res)=>{})
      // 돌아온 요청의 형식과 라우터가 정해진 형식이 아닐 시 404를 응답한다.
      res.send("404");
    }

    // res.send("Hi Block 7 with res send");
  });

  client.on("close", () => {
    // 연결된 클라이언트가 연결을 끊었다.
    console.log("요청에 따른 응답 완료");
  });
});

server.on("close", () => {
  // 연결 자체가 끊겼을 때
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  // 클라이언트와 연결이 생성되었을 때, 핸드쉐이킹한다.
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  // 서버를 연다, 요청받을 준비를 해둔다.
  console.log("4193 서버를 열었다.");
});
