const router = require("express").Router();
const userlist = { qwerty1234: "asdf1234", zxcv1234: "uiop5678" };

router.post("/login", async (req, res) => {
  console.log("로그인");
  try {
    if (!userlist.hasOwnProperty(req.body.id)) {
      res.send({ status: 500, message: "no ID" });
      return;
    }
    if (userlist[req.body.id] == req.body.pw) {
      console.log("second if");
      res.send({ status: 200, userInfo: { id: req.body.id } });
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("logout");
  res.send({ status: 200 });
});

module.exports = router;
