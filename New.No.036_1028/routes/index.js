const router = require("express").Router(); // router를 서버의 라우터로 만들어준다

const user = require("./user.js"); // ./user.js를 로드해서 user에 담았다.
const board = require("./board.js"); // ./board.js를 로드해서 board에 담았다.

router.use("/user", user); // /user로 가는 클라이언트의 요청을 ./user.js로 보낸다.
router.use("/board", board); // /board로 가는 클라이언트의 요청을 ./board.js로 보낸다.

module.exports = router; // 없으면 안된다.
