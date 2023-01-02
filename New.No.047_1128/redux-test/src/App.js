// import { createStore } from "redux";
// createStore는 이름 그대로 store를 만드는 함수. Deprecated 됐다.
//  - Deprecated : 중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될 (컴퓨터 시스템 기능 등)
// createStore를 대신하는 함수가 @reduxjs/toolkit 라이브러리의 configureStroe 메서드이다.
// createStore가 다시 살아난 이유 << 기존에 사용했던 코드들이 너무 많아서 사용자가 너무 많다.

import { Provider } from "react-redux";
import { store } from "./reduxFunction";
// React에서 Redux를 사용하기 위한 Root 컴포넌트를 가져온다.(Provider)

// import { composeWithDevTools } from "redux-devtools-extension";
// 브라우저의 Redux DevTool과 연결해준다.(함수다.)

import logo from "./logo.svg";
import "./App.css";

// const reducer = (state, action) => {
//   // reducer 함수는 Reducs 내에서 dispatch가 보내준 action을 받아서 작업을 진행한 후 state를 변경(재정의)한다.
//   console.log(state, action);
//   // action.type, payload
//   console.log(state);
//   switch (action.type) {
//     case "plus":
//       // action의 type이 'plus'일 경우에 기존의 state에 '1'을 추가해라.
//       return { test: state.test + "1" };
//     // return된 값은 state에 그대로 저장된다.
//     default:
//       return state;
//   }
// };
// dispatch로 action을 전달받으면 reducer에 action으로 넣어준다.

// const store = createStore(
//   // store를 생성한다.
//   reducer, // 첫번째 매개 변수로 reducer 함수 자체를 전달한다.
//   { test: "testing" }, // 두번째 매개변수로 초기 상태를 전달한다. initialize / initializeState
//   // state로 들어간다.

//   composeWithDevTools() // 옵션으로 devtool에 연결한다.
// );

// 동사무소에 가서 주민등록등본을 신청했다.
//  - dispatch를 사용해 action의 type으로 '주민등록등본'을 보냈다.
// 접수원은 주민등록증과 500원을 받았다.
//  - dispatch의 payload의 pay로 500을 포함하며 idCard로 true를 포함했다. reducer는 dispatch가 보낸 액션을 받았다.
// 주민등록등본을 찾아 출력한다.
//  - reducer는 받은 action을 기준으로 작업을 실행했다.
//  - 주민임을 확인하기 위해 idCard를 받은 것을 확인헀다.
//  - 500원은 수수료로 챙겼다.
// 출력된 주민등록등본을 나에게 줬다.
//  - state에 주민등록등본이 정의되었으며 해당 내용은 View(컴포넌트)에서 받아 확인했다.

function App() {
  return (
    <Provider store={store}>
      {/* Redux를 사용하기 위해 Root 컴포넌트로 전체를 감싸준다.
        기존의 Root 컴포넌트는 Provider의 자식 컴포넌트가 된다.
        Provider의 props로 store를 전달한다.  
        index.js에서 <App />을 둘러싸는 형태로 해도 가능하다.
      */}
      <div className="App">
        <button
          onClick={() => {
            store.dispatch({ type: "plus", payload: {} });
            // dispatch 메서드는 createStore에 내장된 함수다.
            // dispatch 메서드를 사용해서 action({type : "plus", payload:{}})을 reducer에 전달한다.
            // 매개변수를 action으로 reducer에 보낸다.
          }}
        >
          분리해도 잘 돌아간다!!!!!!
        </button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  );
}

export default App;
