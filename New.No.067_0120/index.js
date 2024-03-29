const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");
const templateFunc = require("./lib/template");
global.isJson = true;
global.board = [];
global.isStatic = false;
// SSR 구현을 위해 static을 사용하지 않는다.
// app.use(express.static(path.join(...,...,...)))
// SSR, Server Side Rendering : 화면을 서버에서 구성해서 보낸다. (렌더링을 서버에서 처리한다.)
// - 쉽게 말하자면 HTML 파일을 서버에서 만들어서 응답한다.
// CSR, Client Side Rendering : 서버에서 응답한 데이터를 Client, 브라우저에서 엘리먼트 등을 생성해서 완성한다.

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
      if (req.method === "GET" && req.path === "/") {
        const temp = templateFunc(
          "index.html",
          {
            title: "SSR 테스트중",
            text: req.query.text || "처음 사용하는 SSR",
            link: "/board",
            linkName: "들어가면 404에요",
          },
          { styleName: "index.css", scriptName: "index.js" }
        );
        res.send(temp);
        // res.sendFile("index.html");
      } else if (req.method === "GET" && req.path === "/board") {
        const temp = templateFunc(
          "board/index.html",
          { li: global.board },
          { scriptName: "board/index.js" }
        );
        res.send(temp);
        // res.sendFile("index.html");
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
