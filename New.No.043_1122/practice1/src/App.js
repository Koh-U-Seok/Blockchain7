import { useState } from "react";
import "./App.css";
import Rsp from "./components/Rsp";

function App() {
  const [money, setMoney] = useState(1000);
  return (
    <div className="App">
      <Rsp money={money} setMoney={setMoney}></Rsp>
    </div>
  );
}

export default App;
