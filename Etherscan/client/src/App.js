import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomeContainer from "./components/Home/HomeContainer";
import SearchContainer from "./components/Search/SearchContainer";
import MainContainer from "./components/Main/MainContainer";
import BlockListContainer from "./components/BlockList/BlockListContainer";
import BlockContainer from "./components/Block/BlockContainer";
import AccountListContainer from "./components/AccountList/AccountListContainer";
import AccountContainer from "./components/Account/AccountContainer";
import TransactionListContainer from "./components/TransactionList/TransactionListContainer";
import SearchResultContainer from "./components/SearchResult/SearchResultContainer";
import TransactionContainer from "./components/Transaction/TransactionContainer";

function App() {
  return (
    <div className="App">
      <div className="App_innerBox">
        <div>
          <HomeContainer></HomeContainer>
          <SearchContainer></SearchContainer>
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
              path="/AccountList/:account"
              element={<AccountContainer></AccountContainer>}
            ></Route>
            <Route
              path="/TransactionList"
              element={<TransactionListContainer></TransactionListContainer>}
            ></Route>
            <Route
              path="/TransactionList/:transactionHash"
              element={<TransactionContainer></TransactionContainer>}
            ></Route>
            <Route
              path="/Search"
              element={<SearchResultContainer></SearchResultContainer>}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
