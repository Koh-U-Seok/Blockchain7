import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 라우터 구현 시 수정할 때만 사용하며, 그 외에는 기본적으로 조작할 일이 없음.

const root = ReactDOM.createRoot(document.getElementById("root"));
// root는 public의 id가 root인 Element를 가져와서 그 안에 React의 구조를 그리도록 한다.
root.render(
  <React.StrictMode>
    {/* { HTML 문법을 Javascript와 함께 사용한다.} */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
