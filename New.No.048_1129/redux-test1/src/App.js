import logo from "./logo.svg";

import "./App.css";
import store from "./store";
import { useState } from "react";

import { COUNT1, actions as count1Actions } from "./action/count1";
//                            count1의 actions를 가져와서 count1Actions라는 이름으로 쓰겠다.

function App() {
  const [inputCount, setCount] = useState(0);
  const [_, setRender] = useState(false);
  // _란? 보통 사용하지 않을 변수의 이름으로 설정한다. 일종의 업계의 관례
  // _라는 라이브러리(lowbar)도 있으니 주의하자...

  return (
    <div className="App">
      <div>{store.getState().count1}</div>
      {/* store.getState()는 store를 가져온다. */}
      {/* store.getState()로 받아온 store의 객체는 React의 렌더링에 관여하지 않는다. 그래서 Class 컴포넌트에서는 forceupdate()를 사용해서 강제로 렌더링을 해준다. */}
      {/* Function 컴포넌트에서는 state를 하나 만들어서 setState를 통해 렌더링을 강제한다. */}
      <div>{store.getState().count2}</div>
      <input
        type={"number"}
        value={inputCount}
        onInput={(e) => {
          setCount(+e.target.value);
        }}
        placeholder="number"
      ></input>
      <button
        onClick={() => {
          store.dispatch(count1Actions.plus(inputCount));
          setRender((state) => !state);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: COUNT1.MINUS,
            payload: { input: inputCount },
          });
          setRender((state) => !state);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/plus",
            payload: {},
          });
          setRender((state) => !state);
        }}
      >
        2 +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/minus",
            payload: {},
          });
          setRender((state) => !state);
        }}
      >
        2 -
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
  );
}

export default App;
