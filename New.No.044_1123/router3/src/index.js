import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Out from "./components/Log/Out";
import Log from "./components/Log/index";
import In from "./components/Log/In";

const router = createBrowserRouter([
  {
    // 이 안에서 라우터에 대한 설정을 구현한다.
    path: "", // root
    element: <App></App>, // component
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <LogIn></LogIn>,
      },
      {
        path: "log",
        element: <Log></Log>,
        children: [
          {
            path: "in",
            element: <In></In>,
          },
          {
            path: "out",
            element: <Out></Out>,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
