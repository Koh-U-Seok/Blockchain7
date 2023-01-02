import { useState } from "react";

const LoginComp = ({ login }) => {
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  return (
    <div>
      <input
        type={"text"}
        value={loginId}
        onInput={(e) => {
          setLoginId(e.target.value);
        }}
        placeholder={"아이디를 입력하라우"}
      />
      <input
        type={"password"}
        value={loginPw}
        onInput={(e) => {
          setLoginPw(e.target.value);
        }}
      />
      <button
        onClick={() => {
          login(loginId, loginPw);
        }}
      >
        Login!
      </button>
    </div>
  );
};

export default LoginComp;
