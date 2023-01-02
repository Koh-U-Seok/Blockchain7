const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);
  io.on("connection", (ws) => {
    ws.on("userEnter", (data) => {
      io.emit("enter", data);
      // ws.broadcast.emit("enter", "data");
    });
    ws.on("sendText", (data) => {
      io.emit("order", data);
      // ws.broadcast.emit("order", "data");
    });
    ws.on("disconnect", (data) => {
      io.emit("end", data);
      // ws.broadcast.emit("end", "data");
    });
  });
};
