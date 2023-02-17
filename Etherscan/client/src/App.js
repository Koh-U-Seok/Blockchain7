import "./App.css";
import { Route, Routes } from "react-router-dom";
import BlockListContainer from "./components/BlockList/BlockListContainer";
import AccountListContainer from "./components/AccountList/AccountListContainer";
import TransactionListContainer from "./components/TransactionList/TransactionListContainer";
import HomeContainer from "./components/Home/HomeContainer";
import BlockContainer from "./components/Block/BlockContainer";
import MainContainer from "./components/Main/MainContainer";

function App() {
  return (
    <div className="App">
      <div className="App_innerBox">
        <div>
          <HomeContainer></HomeContainer>
          <Routes>
            <Route path="/" element={<MainContainer></MainContainer>}></Route>
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
    </div>
  );
}

export default App;
