import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BlockListContainer from "./components/BlockList/BlockListContainer";
import AccountListContainer from "./components/AccountList/AccountListContainer";
import TransactionListContainer from "./components/TransactionList/TransactionListContainer";
import HomeContainer from "./components/Home/HomeContainer";
import BlockContainer from "./components/block/BlockContainer";
import MenubarContainer from "./components/Menubar/MenubarContainer";

function App() {
  return (
    <div className="App">
      <div className="App_innerBox">
        <HomeContainer></HomeContainer>
        <MenubarContainer></MenubarContainer>

        <Routes>
          <Route
            path="/BlockList"
            element={<BlockListContainer></BlockListContainer>}
          ></Route>
          <Route
            path="/BlockList/:blockNumber"
            element={<BlockContainer></BlockContainer>}
          ></Route>
          <Route
            path="/AccountList"
            element={<AccountListContainer></AccountListContainer>}
          ></Route>
          <Route
            path="/TransactionList"
            element={<TransactionListContainer></TransactionListContainer>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
