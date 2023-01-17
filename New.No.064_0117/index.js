const net = require("net");
const reqParser = require("./lib/req.js");
const resParser = require("./lib/res.js");

global.isJson = true;
// app.use(express.json())

const server = net.createServer((client) => {
  client.on("data", (data) => {
    console.log(data);
    console.log(data.toString());
    const req = reqParser(data.toString());
    console.log("req : ", req);
    console.log("");

    const res = resParser(client, req);

    // res.send(data);
    // express 서버에서 응답을 보낼 때 => res.send(보낼 데이터)
    res.sendFile("index.html");
    console.log("");
    //     client.write(`HTTP/1.1 200 OK
    // Connection:Close
    // Content-Type:image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
    // Content-length:10

    // Hi Block 7`);
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
