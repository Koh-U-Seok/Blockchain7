import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<LogIn></LogIn>}></Route>
        <Route path="log/*" element={<Log></Log>}></Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
