import styled from "styled-components";
import { useState } from "react";

// 3. onClick을 부모 컴포넌트(RegistContainer)로부터 props로 받는다.
const RegistComponent = ({ onClick }) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userName, setName] = useState("");

  console.log("3. RegistComponent", onClick);

  return (
    <RegistBox>
      <RegistInnerBox>
        <RegistIdInputBox>
          <RegistIdInput
            type={"text"}
            value={userId}
            onInput={(e) => {
              setId(e.target.value);
            }}
            placeholder={"아이디"}
          />
        </RegistIdInputBox>
        <RegistPwInputBox>
          <RegistPwInput
            type={"password"}
            value={userPw}
            onInput={(e) => {
              setPw(e.target.value);
            }}
            placeholder={"비밀번호"}
          />
        </RegistPwInputBox>
        <RegistNameInputBox>
          <RegistNameInput
            type={"text"}
            value={userName}
            onInput={(e) => {
              setName(e.target.value);
            }}
            placeholder={"이름"}
          />
        </RegistNameInputBox>
        <RegistButtonBox>
          <RegistButton
            onClick={() => {
              console.log("4. button onClick");
              // 4. 사용자가 Regist 버튼을 클릭했을 때 onClick 함수를 호출한다.
              // 매개변수로 userId, userPw, userName을 전달한다.
              onClick(userId, userPw, userName);
            }}
          >
            Regist
          </RegistButton>
        </RegistButtonBox>
      </RegistInnerBox>
    </RegistBox>
  );
};
export default RegistComponent;

const RegistBox = styled.div``;

const RegistInnerBox = styled.div`
  input {
    border: 1px solid gainsboro;
    border-radius: 3px;
    padding: 10px;
    outline: none;
    width: 50%;
  }
  button:hover {
    cursor: pointer;
  }
`;

const RegistIdInputBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const RegistIdInput = styled.input``;

const RegistPwInputBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const RegistPwInput = styled.input``;

const RegistNameInputBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const RegistNameInput = styled.input``;

const RegistButtonBox = styled.div``;

const RegistButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ff7f00;
  color: #fff;
  padding: 20px;
`;
