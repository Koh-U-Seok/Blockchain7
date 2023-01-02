import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import AddContainer from "./Add/Container";
import ListContainer from "./List/Container";
import BoardContainer from "./Board/Container";
import EditContainer from "./Edit/Container";

const BoardComponent = () => {
  return (
    <BoardBox>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ListContainer></ListContainer>
              <AddContainer></AddContainer>
            </>
          }
        ></Route>
        <Route
          path="/board/:id"
          element={<BoardContainer></BoardContainer>}
        ></Route>
        <Route
          path="/edit/:id"
          element={<EditContainer></EditContainer>}
        ></Route>
      </Routes>
    </BoardBox>
  );
};

export default BoardComponent;

const BoardBox = styled.div`
  // display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
`;

const MainBox = styled.div`
  display: block;
`;
