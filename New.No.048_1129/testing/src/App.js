import "./App.css";
import RegistContainer from "./containers/RegistContainer";
import LoginContainer from "./containers/LoginContainer";
import LogoutContainer from "./containers/LogoutContainer";

function App() {
  return (
    <div className="App">
      <RegistContainer></RegistContainer>
      <LoginContainer></LoginContainer>
      <LogoutContainer></LogoutContainer>
    </div>
  );
}

export default App;
