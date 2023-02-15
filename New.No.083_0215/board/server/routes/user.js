const router = require("express").Router();
const { User } = require("../models");

router.post("/regist", async (req, res) => {
  const { id: userId, pw, name } = req.body;
  const tempUser = await User.findOne({
    where: {
      userId: id,
    },
  });

  if (tempUser) {
    res.send({ isError: true, msg: "exist ID" });
  } else {
    await User.create({ userId, pw, name });
    res.end();
  }

  res.end();
});

module.export = router;
