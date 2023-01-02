import logo from "./logo.svg";
import "./App.css";
import store from "./store";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [removeNum, setRemoveNum] = useState(0);
  return (
    <div className="App">
      <input
        onInput={(e) => {
          setInputText(e.target.value);
        }}
        value={inputText}
        placeholder="입력하기"
      ></input>
      <button
        onClick={() => {
          store.dispatch({
            type: "btn/add",
            payload: { input: inputText },
          });
        }}
      >
        add
      </button>
      <input
        onInput={(e) => {
          setRemoveNum(e.target.value);
        }}
        value={removeNum}
        placeholder="removeNum"
      ></input>
      <button
        onClick={() => {
          store.dispatch({ type: "btn/remove", payload: { input: removeNum } });
        }}
      >
        remove
      </button>
    </div>
  );
}

export default App;
