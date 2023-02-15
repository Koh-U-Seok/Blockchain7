const { useState } = require("react");
const { useNavigate } = require("react-router-dom");

const RegistContainer = () => {
  const [registData, setRegistData] = useState({ id: "", pw: "" });
  const navigate = useNavigate();

  const changeId = (e) => {
    setRegistData((state) => ({
      ...state,
      id: e.target.value,
    }));
  };

  const changePw = (e) => {
    setRegistData((state) => ({
      ...state,
      pw: e.target.value,
    }));
  };

  const changeName = (e) => {
    setRegistData((state) => ({
      ...state,
      name: e.target.value,
    }));
  };

  const regist = async () => {
    if (!registData.id || !registData.pw || !registData.name) return;
    const result = await signIn(registData);
    if (!regist.isError) navigate("/");
  };

  return (
    <RegistComponent
      changeFuncs={{ changeId, changePw, changeName }}
      regist={regist}
    />
  );
};
