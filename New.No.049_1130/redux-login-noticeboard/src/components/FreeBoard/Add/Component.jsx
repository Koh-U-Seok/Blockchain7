import { useEffect, useState } from "react";
import styled from "styled-components";

const AddComponent = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <AddBox>
      <AddInnerBox>
        <input
          type={"text"}
          placeholder={"Title"}
          value={title}
          onInput={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <textarea
          resize={"none"}
          placeholder={"Text"}
          value={text}
          onInput={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <AddButtonBox>
          <AddButton
            onClick={() => {
              onClick(title, text);
            }}
          >
            Add Board
          </AddButton>
        </AddButtonBox>
      </AddInnerBox>
    </AddBox>
  );
};

export default AddComponent;
const AddBox = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  &:nth-child(1) {
    padding-bottom: 10px;
  }
`;

const AddInnerBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const AddButtonBox = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 10px;
`;

const AddButton = styled.button`
  width: 50px;
  background-color: #ff7f00;
  border: none;
  border-radius: 5px;
`;
