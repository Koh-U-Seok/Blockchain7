const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};

router.post("/regist", (req, res) => {
  console.log("regist 호출되었다.");
  console.log("req.body.id : " + req.body.id);
  console.log("req.body.pw : " + req.body.pw);
  console.log("req.body.name : " + req.body.name);
  console.log("req.body.gender : " + req.body.gender);
  console.log("req.body.age : " + req.body.age);
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = {
      pw: crypto.SHA256(req.body.pw).toString(),
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
    };
    res.send({ status: 200, data: "regist" });
  } else {
    res.send({ status: 402, data: "exist id" });
  }
});

router.post("/login", (req, res) => {
  console.log("req.body.id : " + req.body.id);
  console.log("req.body.pw : " + req.body.pw);
  if (!(req.body.id in userlist)) {
    console.log("not id");
    res.send({
      status: 401,
      data: "wrong password",
      id: req.body.id,
      pw: req.body.pw,
    });
  }
  if (userlist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
    res.cookie(
      "log_jwt",
      jwt.sign({ name: userlist[req.body.id].name }, "block7testing", {
        algorithm: "HS256",
        expiresIn: "10m",
        issuer: "KUS",
      })
    );
    console.log("req.body.id : " + req.body.id);
    res.send({ status: 200, data: "login", user: req.body.id });
  } else {
    res.send({ status: 401, data: "wrong password" });
  }
});

router.post("/logout", (req, res) => {
  console.log("logout 실행 중");
  console.log("log_jwt 쿠키 삭제");
  res.send({ status: 200, data: "logout" });
});
module.exports = router;
