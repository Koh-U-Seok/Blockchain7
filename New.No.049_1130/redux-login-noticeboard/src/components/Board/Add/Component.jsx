import { useEffect, useState } from "react";
import styled from "styled-components";

const AddComponent = ({ onClick }) => {
  // 매개변수에 중괄호
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <AddBox>
      <input
        type={"text"}
        placeholder={"Title"}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        // 제목을 입력할 때마다 state에 제목을 등록한다.
      ></input>
      <textarea
        resize={"none"}
        placeholder={"Text"}
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        // 텍스트를 입력할 때마다 state에 텍스트를 등록한다.
      ></textarea>

      <button
        onClick={() => {
          onClick(title, text);
        }}
        // 클릭하면 state변수인 title과 text를 인자로 onClick함수를 실행한다.

        // 외부의 onClick은 button의 이벤트 함수인 onClick을 뜻하며,
        // onClick 내부의 onClick은 컴포넌트를 호출한 컨테이너가 props로 넘겨준 onClick이라는 이름의 함수를 의미한다.
      >
        Add Board
      </button>
    </AddBox>
  );
};

export default AddComponent;
// 방출한다. 다른 파일에서 import로 AddComponent를 호출할 수 있게한다.
// default가 없으면 import { AddComponent } from "파일 이름"으로 불러야 한다.
// 해당 파일에서 방출한 것들 중 AddComponent를 부른다는 뜻이다.
// default가 있으면 import AddComponent from "파일 이름"으로 부른다.
// 해당 파일에서 방출한 것을 부를 때는 기본적으로 AddComponent를 부른다는 뜻이다.

const AddBox = styled.div``;
//
