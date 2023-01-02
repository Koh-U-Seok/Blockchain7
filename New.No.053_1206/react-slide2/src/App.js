import "./App.css";
import React from "react";
import Slide from "./components/MainPage/slide/MainSlide";
import Menubar from "./components/MainPage/menubar/Menubar";
import { Routes, Route } from "react-router-dom";
import MainInfo from "./components/MainPage/mainInfo/MainInfo";
function App() {
  return (
    <div className="App">
      <Menubar></Menubar>
      <Slide></Slide>
      <MainInfo></MainInfo>
      {/* <Routes>
        <Route path="/" element={<Test></Test>}></Route>
        <Route path="test2" element={<Test2></Test2>}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
