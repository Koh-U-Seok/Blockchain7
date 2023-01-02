import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Slide from "./components/Slide/MainSlid";
import Menubar from "./components/Menubar/Menubar";
import { Routes, Route } from "react-router-dom";
import Test from "./components/test/Test";
import Test2 from "./components/test/Test2";
function App() {
  return (
    <div className="App">
      <Menubar></Menubar>
      <Slide></Slide>
      {/* <Routes>
        <Route path="/" element={<Test></Test>}></Route>
        <Route path="test2" element={<Test2></Test2>}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
