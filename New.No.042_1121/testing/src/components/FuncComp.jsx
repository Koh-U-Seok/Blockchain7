// export default function FuncComp(props) {
// // const (text, func) = props; << 위의 내용과 아래의 내용과 같다.
//   props.func();
//   return <div>FuncComp {props.text}</div>;
// }

import { useState, useEffect } from "react";

export default function FuncComp({ text, func }) {
  //함수형 컴포넌트에서 클래스형 컴포넌트의 기능들을 사용하기 위해 사용하는 것을 Hook이라고 한다.
  // Hook은 use로 시작한다.
  // useState, useEffect, usecallback, useMemo, useRef, useContext, useReducer 등등이 있다.
  // Hook은 사용자가 구현할 수도 있다. (커스텀 훅)
  //  - Custom Hook과 Component의 차이 => HTML 문법으로 return하는가? 안하는가?
  // useState와 useEffect는 뺄 수 없는 Hook이다. 단, 나머지는 사용하지 않아도 크게 상관없다.
  const [test, setTest] = useState("state test"); // state 선언 및 정의(초기화)
  // state가 변경(재정의)되면 컴포넌트를 다시 불러온다.(함수를 다시 부른다.)
  // 단, 다시 불러올 때 Hook으로 된 변수, 함수들은 다시 부르지 않는다.(useState 등등)
  // useState는 함수형 컴포넌트의 투톱 중 하나이다.(빠지면 안되는 것)

  const [study1] = useState("study1");
  func(); // 클릭할 때마다 func()가 실행되었던 것이 state가 변경되었기 때문이다.

  useEffect(() => {
    // useEffect는 렌더링 후에 실행되는 콜백함수이다.
    console.log("useEffect");
    // 아래가 componentWillUnmount와 같다.
    return () => {
      console.log("componentWillUnmount");
      // 빈 배열의 useEffect에서 함수를 return하면 componentWillUnmount와 같은 작동을 한다.
    }; // return 뒤에 바로 넣으면 mount될 때 실행되기에 함수 형태로 하여 바로 실행되지 않게 하였다.
  }, []);
  // useEffect의 두번째 매개변수는 state값의 배열을 넣는다.
  // 빈배열의 경우 componentDidMount와 같은 역할을 한다.
  // 즉, Mount되었을 때만 실행한다.
  // useEffect는 함수형 컴포넌트의 투톱 중 하나다.

  useEffect(() => {
    console.log("state change");
    // state값이 변화했을 때 실행되는 메서드
  }); // 클래스에서의 componentDidUpdate와 같은 역할이다.

  useEffect(() => {
    console.log("test change");
    // state 중 test 값이 변화했을 때 실행되는 메서드
  }, [test]);

  useEffect(() => {
    console.log("study1 change");
    // state 중 study1 값이 변화했을 때 실행되는 메서드
  }, [study1]);
  // 두번째 매개변수 배열의 아이템으로 프로그래머가 감지하고 싶은 state(상태값)을 넣는다.
  // study1이 변경(재정의)됐을 때만 실행된다.

  useEffect(() => {
    console.log("test || study1 change");
    // state 중 test 또는 study1값이 변화했을 때 실행되는 메서드
  }, [test, study1]);

  return (
    <div
      onClick={function () {
        setTest(test + "1"); // state 재정의
      }}
    >
      FuncComp {text} {test} {study1}
    </div>
  );
}
