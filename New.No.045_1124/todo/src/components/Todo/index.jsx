import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { TodoBtn } from "../setting";
import TodoModal from "./TodoModal";
import UserModal from "./UserModal";
import List from "./List/index";
import { useState } from "react";
// export 시 default를 쓰지 않으면 {}를 사용해 구조분해할당 형식으로 가져와야한다.

export default function Todo() {
  const [list, setList] = useState([
    {
      taskName: "sadfsadf",
      status: 0,
    },
    {
      taskName: "한글?",
      status: 1,
    },
    {
      taskName: "한글?",
      status: 2,
    },
  ]);
  const [userInfo, setUserInfo] = useState([
    { userId: "qwerty1234", userPw: "asdf1234" },
    { userId: "korea1234", userPw: "chosun1234" },
    { userId: "hongkilldong", userPw: "zxcv1234" },
  ]);
  const [myLogin, setMyLogin] = useState("");

  const [loginUser, setLoginUser] = useState([{}]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Todo List</h1>
        {myLogin ? (
          <div style={{ display: "flex" }}>
            {myLogin}님 어서오십시오.
            <div
              onClick={() => {
                const userNum = loginUser.indexOf(myLogin);
                setLoginUser((loginUser) => {
                  const before = loginUser.slice(0, userNum);
                  const after = loginUser.slice(userNum + 1);
                  return [...before, ...after];
                });
                setMyLogin("");
              }}
            >
              로그아웃
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <Link to={"signup"}>
              <div>회원가입</div>
            </Link>
            <Link to={"signin"}>
              <div>로그인</div>
            </Link>
          </div>
        )}
      </div>
      <AddBtnBox>
        <Link to={"add"}>
          <TodoBtn className="sky">Add Task</TodoBtn>
        </Link>
      </AddBtnBox>
      <List list={list} setList={setList}></List>
      <Routes>
        <Route
          path={"add"}
          element={<TodoModal setList={setList} func={"Add"}></TodoModal>}
        ></Route>
        <Route
          path={"edit"}
          element={<TodoModal setList={setList} func={"Edit"}></TodoModal>}
        ></Route>
        <Route
          path={"signup"}
          element={
            <UserModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              purpose="signup"
            ></UserModal>
          }
        ></Route>
        <Route
          path={"signin"}
          element={
            <UserModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              purpose="signin"
              loginUser={loginUser}
              setLoginUser={setLoginUser}
              myLogin={myLogin}
              setMyLogin={setMyLogin}
            ></UserModal>
          }
        ></Route>
      </Routes>
    </div>
  );
}

const AddBtnBox = styled.div`
  text-align: right;
`;
