import { useEffect, useState } from "react";
import styled from "styled-components";

export default function AddBoard({ boardList, setBoardList, user }) {
  const [boardInput, setBoardInput] = useState("");
  const [textAreaSpace, setTextAreaSpace] = useState(false);

  useEffect(() => {
    if (boardInput.length > 1) setTextAreaSpace(true);
    else setTextAreaSpace(false);
  }, [boardInput]);

  function addItem() {
    setBoardList([...boardList, { user, boardInput }]);
    console.log("boardList : ", boardList);
  }

  return (
    <AddBoardBox>
      <textarea
        onInput={(e) => {
          setBoardInput(e.target.value);
          console.log("boardInput : ", e.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          if (!user) {
            console.log("로그인하셈");
          } else if (textAreaSpace) addItem();
          else return;
        }}
      >
        추가
      </button>
    </AddBoardBox>
  );
}
const AddBoardBox = styled.div``;
