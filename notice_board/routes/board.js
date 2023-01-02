const router = require("express").Router();
const boardList = [
  { title: "arvserv1", writer: "qwerty1234", text: "9baresrsearvstb" },
  { title: "arvserv2", writer: "qwerty1234", text: "8baresrsearvstb" },
  { title: "arvserv3", writer: "qwerty1234", text: "7baresrsearvstb" },
  { title: "arvserv4", writer: "qwerty1234", text: "6baresrsearvstb" },
  { title: "arvserv5", writer: "qwerty1234", text: "5baresrsearvstb" },
  { title: "arvserv6", writer: "qwerty1234", text: "4baresrsearvstb" },
  { title: "arvserv7", writer: "qwerty1234", text: "3baresrsearvstb" },
  { title: "arvserv8", writer: "qwerty1234", text: "2baresrsearvstb" },
  { title: "arvserv9", writer: "qwerty1234", text: "1baresrsearvstb" },
];

router.get("/", (req, res) => {
  console.log(req.route);
  console.log(req.query);
  res.send({ status: 200, data: req.query, list: boardList });
});

router.post("/add", (req, res) => {
  boardList.unshift(req.body);
  console.log("/api/board/add boardList 추가 완료");
  res.send({ status: 200, data: "정상 입력 완료" });
});

router.post("/delete", (req, res) => {
  boardList.splice(+req.body.count * 5 + +req.body.num, 1);
  console.log();
  res.send({ status: 200, data: "delete" });
});

router.post("/update", (req, res) => {
  boardList[+req.body.count * 5 + +req.body.num].text = req.body.text;
  boardList[+req.body.count * 5 + +req.body.num].uptime = req.body.time;
  res.send({ status: 200, data: "update" });
});

module.exports = router;
