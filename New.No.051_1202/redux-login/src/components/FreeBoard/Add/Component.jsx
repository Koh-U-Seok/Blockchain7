import { useEffect, useState } from "react";
import styled from "styled-components";

const AddComponent = ({ onClick }) => {
  // 매개변수에 중괄호
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("가가가");
  }, [title, text]);
  return (
    <AddBox>
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
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Add Board
      </button>
    </AddBox>
  );
};

export default AddComponent;
const AddBox = styled.div``;
