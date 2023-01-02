import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* Provider를 쓰는 이유는 store를 여기저기서 import하지 않고 전역으로 쓰게하기 위해서 */}
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
