import "./App.css";
import FreeBoard from "./components/FreeBoard";
import UserComponent from "./components/User";

function App() {
  return (
    <div className="App">
      <UserComponent></UserComponent>
      <FreeBoard></FreeBoard>
    </div>
  );
}

export default App;
