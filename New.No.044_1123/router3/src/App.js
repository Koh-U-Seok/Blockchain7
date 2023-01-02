import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
