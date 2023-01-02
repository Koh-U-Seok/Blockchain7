import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TodoBtn } from "../setting";

export default function UserModal(props) {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  console.log(props.userInfo);
  console.log(useLocation());
  console.log(props.loginUser);
  return (
    <UserBox>
      <UserInnerBox>
        <div>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onInput={(e) => {
              setUserId(e.target.value);
            }}
          ></input>
          <input
            type="password"
            value={userPw}
            onInput={(e) => {
              setUserPw(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <Link to={"/"}>
            <TodoBtn
              onClick={() => {
                if (props.purpose === "signin") {
                  props.setLoginUser((loginUser) => [...loginUser, { userId }]);
                  props.setMyLogin(userId);
                } else if (props.purpose == "signup") {
                  props.setUserInfo((userInfo) => {
                    return [...userInfo, { userId, userPw }];
                  });
                }
              }}
            >
              {props.purpose}
            </TodoBtn>
          </Link>
          <Link to={"/"}>
            <TodoBtn>Cancel</TodoBtn>
          </Link>
        </div>
      </UserInnerBox>
    </UserBox>
  );
}

const UserBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInnerBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 50%;

  input {
    width: 100%;
    padding: 5px 10px;
  }

  & > div {
    margin: 10px 0;
    display: flex;
    justify-content: space-evenly;

    &:last-child {
      justify-content: space-between;
    }
  }
`;
