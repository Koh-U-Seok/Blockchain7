import { Router } from "express";
import crypto from "crypto-js";

const router = Router();

const userArr = [];
const tempUser = [];
const user = [];

router.post("/regist", (req, res) => {
  console.log(req.body);
  if (!userArr.find((item) => item.userId == req.body.userId))
    userArr.push(req.body);
  res.end;
});

router.post("/login", (req, res) => {
  const tempUser = userArr.find((item) => item.userId == req.body.userId);
  if (
    tempUser &&
    tempUser.userPw == req.body.userPw &&
    !user[tempUser.userId]
    // 다른 곳에서 로그인이 되어있는지
  ) {
    user[tempUser.userId] = crypto
      .SHA256(tempUser.userId)
      .toString(crypto.enc.Base64);
    res.cookie("user", user[tempUser.userId], {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    setTimeout(() => {
      user[tempUser.userId] = undefined;
    }, 10 * 60 * 1000);
    res.send({ ...tempUser, userPw: undefined });
  } else res.send({ text: "아이디가 없습니다." });
});

router.post("/logout", (req, res) => {
  res.clearCookie("user");
  user[req.body.userId] = undefined;
  res.end();
});

router.get("/checked", (req, res) => {
  res.send({ userArr, user });
});
export default router;
