const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./models/index.js");
dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "web")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

// 테이블에 데이터 추가
db.sequelize
  .sync({ force: true }) // DB 서버와 연결한다. force는 설정된 테이블을 강제로 생성한다.
  // force : 우리가 express 서버에서 설정한 테이블 데이터와 실제 DB 서버의 테이블 데이터가 다를 경우에 서버의 테이블을 새로 생성하기 위해 사용한다.
  .then(() => {
    console.log("db connecte");
  })
  .catch((err) => {
    console.error(err);
  });
// INSERT INTO `testing`.`new_table1` (`idx`, `name`, `password`, `id`, `create_at`) VALUES ('1', '갈갈갈', '1234', 'zxcv', '2022-10-27');
// db.NewTable1.create({ idx: "11", name: "kus", password: "asdf", id: "qwerty" });

db.NewTable1.findOne({ where: { idx: 1 } })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
app.listen(8080, () => {
  console.log("http://localhost:8080");
});
