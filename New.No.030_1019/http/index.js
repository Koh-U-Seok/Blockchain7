const http = require("http");
const fs = require("fs").promises;
// const app - express();
// app.use((req,res,next)=>{})
// 차이점은 생성하고 지정해주느냐, 생성할 때 지정해주느냐의 차이

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     res.write("<h1>헬로우</h1>");
//     res.end("<p>완료</p>");
//   })
//   .listen(8080, () => {
//     console.log("8080번 포트로 접속해봐");
//   });

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./web/index.html");
          return res.end(data);
        }
      } else if (req.method === "POST") {
        if (req.url === "/api/user") {
          const data = await fs.readFile("./web/index.html");
          return res.end(data);
        }
      } else if (req.method === "OPTIONS") {
      } else if (req.method === "PUT") {
      } else if (req.method === "DELETE") {
      }
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트");
  });
