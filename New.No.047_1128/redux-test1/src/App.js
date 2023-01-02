import logo from "./logo.svg";

import "./App.css";
import store from "./store";
import { useState } from "react";

function App() {
  const [inputCount, setCount] = useState(0);

  return (
    <div className="App">
      <div>{store.getState().count1}</div>
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
          store.dispatch({
            type: "count1/plus",
            payload: { input: inputCount },
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/minus",
            payload: { input: inputCount },
          });
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
