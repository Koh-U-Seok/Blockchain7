const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/index.js");

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

const app = express();

dotenv.config();

app.set("PORT", process.env.PORT || 8080);

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

app.use("/api", routes);

app.listen(8080, () => {
  console.log("http://localhost:8080");
  console.log("서버 연결되었다");
});
