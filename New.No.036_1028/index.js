const express = require("express"); // 서버 생성을 위한 라이브러리.
//require() : 외부 묘듈을 가져오는 함수
const session = require("express-session"); // 세션을 위한 라이브러리
const cookieParser = require("cookie-parser"); // 쿠키를 위한 라이브러리
const path = require("path"); // 경로를 내장하는 모듈
const dotenv = require("dotenv"); // 환경 설정 파일을 가져오기 위한 라이브러리
const morgan = require("morgan"); // 로그를 위한 라이브러리

const { sequelize } = require("./models/index.js");
// ./models/index.js를 로드하고 requelize라는 변수에 구조 분해 할당하였다.

const routes = require("./routes/index.js"); // ./routes/index.js를 로드하고 routes에 담았다.

dotenv.config(); // 환경 설정 파일을 가져왔다.

const app = express(); // app을 서버에 대한 정보를 갖고 있는 객체로 만들었다.

app.set("port", process.env.PORT || 8080);
// process라는 객체 내에 있는 env라는 객체에 PORT라는 객체가 있다면 그 속성을 사용하고
// 없으면 8080번 포트를 사용한다

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  // morgan을 사용할 때 combined는 배포용으로 사용된다.
  else morgan("dev")(req, res, next);
  // dev는 개발 모드로 사용된다.
});
// 조건에 따라 다른 미들웨어를 쓰도록 하였다.

app.use("/", express.static(path.join(__dirname, "public")));
// 서버에 라우터가 없으면 public 폴더로 연결해준다.
app.use(express.json()); // 데이터를 주고 받을 때 JSON 형식을 사용한다.
app.use(express.urlencoded({ extended: false })); // queryString을 파싱할 때 사용하는 방법을 설정한다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 파싱한다.
app.use(
  session({
    // 세션 설정
    resave: false, // 요청마다 세션을 재설정하지 않는다
    saveUninitialized: false, // 요청에 대해 세션에 작업하지 않는다.
    secret: process.env.COOKIE_SECRET, // 암호화는 process의 env의 COOKIE_SECRET으로 한다.
    cookie: {
      // 쿠키를 어떻게 저장할 지 설정한다.
      httpOnly: true, // http에서만 사용한다.
      secure: false, // https인가?
    },
    name: "seed", // 쿠키에서의 이름
  })
);

sequelize // ./models/index.js를 구조분해할당한 객체인다.
  .sync({ force: false })
  // force : 테이블이 존재하는지 확인하고 true면 존재하지 않을 경우 테이블을 생성하고
  //          존재할 경우 테이블을 삭제한다. false로 놓았으니 옵션은 비활성화 되어있다.
  .then(() => {
    // sync()가 종료될 때 까지 기다렸다가 그 후에 실행한다.
    console.log("db connected");
  })
  .catch((err) => {
    // 위 명령이 실행될 때 에러가 발생할 경우 실행한다.
    console.error(err);
  });

app.use("/api", routes);
// 이 코드가 존재하는 행까지 실행하면서 /api를 호출하는 클라이언트의 통신을 받아주는 곳이 없을 경우
// routes로 보낸다.

app.listen(app.get("port"), () => {
  // 서버를 시작하며, 그 때 무엇을 할 지 결정한다.
  console.log("Express Server Open");
});
