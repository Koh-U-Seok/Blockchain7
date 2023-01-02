import { useState } from "react";
import styled from "styled-components";

const LogInComponent = ({ onClick }) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  return (
    <LogInBox>
      <LogInInnerBox>
        <LogInIdInputBox>
          <LogInIdInput
            type={"text"}
            value={userId}
            onInput={(e) => {
              setId(e.target.value);
            }}
            placeholder={"ID"}
          />
        </LogInIdInputBox>
        <LogInPwInputBox>
          <LogInPwInput
            type={"password"}
            value={userPw}
            onInput={(e) => {
              setPw(e.target.value);
            }}
            placeholder={"Pw"}
          />
        </LogInPwInputBox>
        <LogInButtonBox>
          <LogInButton
            onClick={() => {
              onClick(userId, userPw);
            }}
          >
            Log In
          </LogInButton>
        </LogInButtonBox>
      </LogInInnerBox>
    </LogInBox>
  );
};

export default LogInComponent;

const LogInBox = styled.div``;

const LogInInnerBox = styled.div`
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

const LogInIdInputBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LogInIdInput = styled.input``;

const LogInPwInputBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LogInPwInput = styled.input``;

const LogInButtonBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LogInButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ff7f00;
  color: #fff;
  padding: 20px;
`;
