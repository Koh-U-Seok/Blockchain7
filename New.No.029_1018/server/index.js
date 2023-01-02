const express = require("express");
// 서버 생성을 위한 라이브러리
// 라이브러리란 기능의 집합이다.
const session = require("express-session");
// 세션을 위한 라이브러리
const morgan = require("morgan");
// 로그를 위한 라이브러리
const dotenv = require("dotenv");
// 환경 설정 파일을 로드하기 위한 라이브러리
const path = require("path");
// 경로 내장 모듈
const cookieParser = require("cookie-parser");
// 쿠키를 위한 라이브러리 << 세션과 같이 나중에
dotenv.config();
// 환경 설정 파일 로드
const app = express();
// 서버생성
// app : 서버에 대한 정보를 갖고 있는 객체
app.set("port", process.env.PORT || 8080);
// 서버 내의 프로퍼티 초기화
// process는 프로그램에 대한 정보를 갖고 있다.
// process.env는 환경 변수이다.
console.log(app.get("port"));
app.use((req, res, next) => {
  // use << 미들 웨어 등록이다.
  // 서버에 접근하면 해당 코드가 실행된다.
  if (process.env.NODE_ENV == "production") morgan("combined")(req, res, next);
  // morgan을 사용할 때 combined는 배포용으로 사용된다.
  else morgan("dev")(req, res, next);
  // dev는 개발 모드로 사용된다.
});

app.use("/", express.static(path.join(__dirname, "web")));
// '/' : 서버의 root, 즉 서버에 접근 시 라우터가 없을 때
// 서버 내의 폴더
// 서버의 하위 페이지를 구현할 때 사용한다.
// *******/router 식으로 표현된다.
// static은 전역, 기본적으로 연결할 폴더를 설정한다.
// public 폴더로 연결한다.
app.use(express.json());
// 데이터를 주고 받을 때 json 형식을 사용한다.
// 안 넣으면 텍스트(String) 방식이 된다.

app.use(express.urlencoded({ extended: false }));
// querystring을 파싱할 때 사용하는 방법을 설정
// 모듈을 사용하지 않겠다.
app.use(cookieParser(process.env.COOKIE_SECRET));
// 쿠키 파싱
app.use(
  session({
    // 세션 설정
    resave: false,
    // 요청마다 세션을 재설정할 것인가
    saveUninitialized: false,
    // 요청에 대해 세션에 작업할 것인가
    secret: process.env.COOKIE_SECRET,
    // 암호화 << 후에 자세히 하 예정
    cookie: {
      // 쿠키는 어떻게 저장할 것인가?
      httpOnly: true,
      // http에서만 사용한다.
      secure: false,
      // https인가?
    },
    name: "session-cookie",
    // 쿠키에서의 이름
  })
);
app.listen(app.get("port"), () => {
  // 서버를 시작한다.
  // 요청을 받기 시작한다.
  console.log("서버를 열었다.");
});
// 여기까지가 서버의 기본 설정

// 쿠키란?
// 사용자의 정보를 임시 저장한다. << 허락의 이유. 법적인 이유로 물어보아야 한다.. ex)쿠키 수집을 허가하시겠습니까?
// 원래의 쿠키란? 데이터를 임시 저장하 공간
// 데이터란 간단한 텍스트 << 이미지, 영상 등등은 포함하지 않는다.
// 쿠키 vs 캐시
// cache 캐시 << 이미지, 영상 등을 임시 저장하는 공간
// 캐시는 파일로 저장된다.

// 세션이란?
// 쿠키와 같은 기능을 한다. << 텍스트를 임시로 저장한다.
// 쿠키는 로컬에 저장한다. 즉, 브라우저에서 관리한다.
// 세션은 서버에 저장한다. 즉, 서버에서 관리한다.

// 미들 웨어란?
// 프로그램 실행에 있어서 중간에 포함되는 작업

// const path = require("path");
// const cusMath = require("./cusMath");
//외부 모듈을 가져올때는 require를 사용한다.
// console.log(cusMath.sum(1, 2));
// console.log(cusMath.multiply(2, 4));
// path;
