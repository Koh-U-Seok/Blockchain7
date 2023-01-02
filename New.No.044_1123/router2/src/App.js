import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Log from "./components/Log";
import In from "./components/Log/In";
import Out from "./components/Log/Out";
import { useState } from "react";

function App() {
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        {/* router를 나누기 위해서는 Routers 컴포넌트로 묶어줘야 한다. */}
        <Route path="/" element={<Home propsNum={num}></Home>}></Route>
        {/* Router는 각 라우터에 대한 구현이다. path는 라우터의 주소, element는 출력할 element(컴포넌트 포함) */}
        <Route path="login" element={<LogIn></LogIn>}></Route>
        <Route path="log" element={<Log></Log>}>
          <Route path="in" element={<In></In>}></Route>
          <Route path="out" element={<Out></Out>}></Route>
        </Route>
        {/* 뒤에 뭐가 붙건 log로 시작했으면 log로 가라 */}
      </Routes>
    </div>
  );
}

export default App;
