import styled from "styled-components";
import { connect } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import RegistContainer from "./Regist/Container";
import LogInContainer from "./LogIn/Container";
import InfoContainer from "./Info/Container";
const UserComponent = ({ userName }) => {
  return (
    <UserBox>
      <div>
        <Link to={"/"}>Home</Link>
        {userName ? (
          <></>
        ) : (
          <>
            {" "}
            | <Link to={"/regist"}>Regist</Link> |{" "}
            <Link to={"/login"}>Log In</Link>
          </>
        )}
      </div>
      {userName ? <InfoContainer></InfoContainer> : <></>}
      <Routes>
        <Route
          path="/regist"
          element={<RegistContainer></RegistContainer>}
        ></Route>
        <Route
          path="/login"
          element={<LogInContainer></LogInContainer>}
        ></Route>
      </Routes>
    </UserBox>
  );
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(UserComponent);

const UserBox = styled.div`
  border: 1px solid black;
  border-radis: 5px;
  padding: 10px;
`;
