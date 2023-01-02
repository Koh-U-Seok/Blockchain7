import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./modules/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// index.html의 root div를 DOM으로 삼겠다.
root.render(
  // 렌더링
  // <React.StrictMode>
  <Provider store={store}>
    {/* 여기저기서 store를 쓸 수 있게 한다. */}
    <BrowserRouter>
      {/* APP에서 라우터 기능을 쓸 수 있게 한다. */}
      {/* Provider가 위에 있든 BrowserRouter가 위에 있든 상관없다. */}
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
