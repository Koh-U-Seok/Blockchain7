import { useState } from "react";

const RegistComp = ({ regist }) => {
  const [registId, setRegistId] = useState("");
  const [registPw, setRegistPw] = useState("");
  return (
    <div>
      <input
        type={"text"}
        value={registId}
        onInput={(e) => {
          setRegistId(e.target.value);
        }}
        placeholder={"아이디를 입력하라우"}
      />
      <input
        type={"password"}
        value={registPw}
        onInput={(e) => {
          setRegistPw(e.target.value);
        }}
      />
      <button
        onClick={() => {
          regist(registId, registPw);
        }}
      >
        Regist!
      </button>
    </div>
  );
};

export default RegistComp;
