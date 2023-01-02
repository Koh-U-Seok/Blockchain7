import logo from "./logo.svg"; // IMG를 불러온다.
import "./App.css"; // CSS파일을 불러온다.
import Test from "./Test";

function App() {
  // 파스칼 표기법을 사용한다. Component이다.
  return (
    <div className="App">
      <Test test1="테스트 중입니다.">
        <button>갈갈갈~</button>
      </Test>
      {/* Component의 예시이다. */}
      {/* div나 span처럼 쓸 수 있는 태그를 하나 만든 것이다. */}
      {/* React에서는 class가 아닌 className이라고 한다. */}
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
