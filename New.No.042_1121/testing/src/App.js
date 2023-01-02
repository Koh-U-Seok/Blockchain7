import logo from "./logo.svg";
import "./App.css";
import ClassComp from "./components/ClassComp";
import FuncComp from "./components/FuncComp";
import Additional from "./components/Additional";

function App() {
  return (
    <div className="App">
      <ClassComp
        text={"testing"}
        func={() => {
          console.log("testing ClassComp");
        }}
      ></ClassComp>
      <FuncComp
        text={"testing"}
        func={() => {
          console.log("testing FuncComp");
        }}
      ></FuncComp>
      <Additional></Additional>
    </div>
  );
}

export default App;
