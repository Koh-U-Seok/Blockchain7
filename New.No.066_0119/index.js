const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");

global.isJson = true;
global.board = ["asdf", "qwer", "1234"];
global.isStatic = true;
// app.use(express.static(path.join(...,...,...)))

if (global.isStatic) staticFunc();
// 파일 확인

const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    console.log(req.path);
    let isStatic = false;
    // static을 실행했는가?

    if (global.isStatic) {
      // static을 넣었다면
      // 파일이 있으면 해당 파일을 전송해라
      // const staticRoutes = staticFunc();
      if (req.method === "GET" && global.staticRoutes[req.path]) {
        isStatic = true;
        res.sendStaticFile(global.staticRoutes[req.path]);
      }
    }

    if (!isStatic) {
      if (req.method === "GET" && req.path === "/board/list") {
        res.send(JSON.stringify(global.board));
      } else if (req.method === "POST" && req.path === "/board/add") {
        global.board.unshift(req.body.value);
        res.send(JSON.stringify(global.board));
      } else {
        res.send("404");
      }
    }
  });

  client.on("close", () => {
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  console.log("4193 서버를 열었다.");
});

// if (req.method === "GET" && req.path === "/") {
//   res.sendFile("index.html");
// } else if (req.method === "GET" && req.path === "/index.css") {
//   res.sendFile("index.css");
// } else if (req.method === "GET" && req.path === "/index.js") {
//   res.sendFile("index.js");
// } else if (req.method === "GET" && req.path === "/board") {
//   res.sendFile("board/index.html");
// } else if (req.method === "GET" && req.path === "/board/index.js") {
//   res.sendFile("board/index.js");
// } else
