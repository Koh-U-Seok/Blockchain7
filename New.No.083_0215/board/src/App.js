import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import AddBoardContainer from "./containers/AddBoard";
import { BoardContainer } from "./containers/Board";

function App() {
  return (
    <div className="App">
      <div>
        <Link to={"/"}>Home</Link> | <Link to={"/new"}>new Board</Link> |{" "}
        <Link to={"/user/login"}>Log In</Link>
      </div>
      <Routes>
        <Route path="/" element={<BoardContainer />}></Route>
        <Route path="/new" element={<AddBoardContainer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
