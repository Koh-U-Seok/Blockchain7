import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogInComponent from "./Component";
import { action } from "../../../modules/userInfo";
import store from "../../../modules/store";
import { useEffect } from "react";

const LogInContainer = ({ userName }) => {
  const navigate = useNavigate();
  // location.href

  const onClick = (userId, userPw) => {
    console.log(store.getState());
    store.dispatch(action.logIn(userId, userPw, store.getState().userDB));
  };

  useEffect(() => {
    if (userName) navigate("/");
  }, [userName]);

  return <LogInComponent onClick={onClick}></LogInComponent>;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(LogInContainer);
