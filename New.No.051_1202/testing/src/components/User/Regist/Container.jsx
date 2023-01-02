import axios from "axios";
import store from "../../../modules/store";
import RegistComponent from "./Component";
import { action } from "../../../modules/userDB";

const RegistContainer = () => {
  // 1. onClick를 선언한다.
  const onClick = (userId, userPw, userName) => {
    // 5. onClick을 호출당했다. 매개변수로 userId, userPw, userName을 받았다.
    console.log("5. RegistContainer onClick => 6. dispatch");

    // 6. store의 dispatch를 호출했다. 매개변수로 action의 regist를 호출해 return값을 전달했다. => dispatch 호출보다 action의 regist 호출이 먼저 실행된다.
    // 7. action의 regist를 호출했다. userId, userPw, username을 매개변수로 전달했다.
    // 10. dispatch를 호출했다. action.regist의 return 값(반환값== aciton)을 매개변수로 전달했다.
    // 11. dispatch는 reducer를 호출하며 action을 매개변수로 전달한다.
    store.dispatch(action.regist(userId, userPw, userName));
    axios.post("http://localhost:8080/api/user/regist", {
      userId,
      userPw,
      userName,
    });
    // action.regist를 보고 store에서 알맞는 reducer를 찾아간다.
  };

  console.log("1. RegistContainer", onClick);

  // 2. onClick을 RegistComponent에 props로 전달한다.
  return <RegistComponent onClick={onClick}></RegistComponent>;
};

export default RegistContainer;

// 화살표 함수
// () => ({}) << 왼쪽 () 안에 있는 것이 function()의 괄호 안에 있는 것과 같다. 즉 왼쪽() 안의 것이 매개변수다.
// - =>(화살표) 오른 쪽은 함수의 return 값이다. (현재는 {}, 객체를 반환한다.)
// () => [] << 왼쪽 ()는 받는 매개변수다. 오른쪽은 함수가 return하는 [] 배열이다.
// () => {} << 왼쪽 ()는 받는 매개변수다. 오른쪽 {}는 함수의 내용이다.
// )_ => { return {}} << 왼쪽 ()는 받는 매개변수다. 오른쪽 {}는 함수의 내용이며 return 다음의 {}, 객체를 반환한다.
// () => ({a:1}) === () => {return {a:1};} == function(){return{a:1};}
// () => [] === () => {return [];}
// (a) => {return a + 1;} == function(e){return a + 1};
