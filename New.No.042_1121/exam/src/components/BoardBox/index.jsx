import { useEffect, useState } from "react";
import AddBoard from "./AddBoard";
import List from "./List";
import styled from "styled-components";

export default function BoardBox({ boardList, setBoardList, user }) {
  return (
    <BoardStyled>
      <AddBoard
        boardList={boardList}
        setBoardList={setBoardList}
        user={user}
      ></AddBoard>
      <List boardList={boardList} setBoardList={setBoardList}></List>
    </BoardStyled>
  );
}

const BoardStyled = styled.div``;
