import styled from "styled-components";
import UserBox from "./components/UserBox";
import BoardBox from "./components/BoardBox";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [boardList, setBoardList] = useState([]);
  return (
    <AppBox>
      <UserBox
        users={users}
        setUsers={setUsers}
        user={user}
        setUser={setUser}
      ></UserBox>
      <BoardBox
        boardList={boardList}
        setBoardList={setBoardList}
        user={user}
      ></BoardBox>
    </AppBox>
  );
}

const AppBox = styled.div``;
export default App;
