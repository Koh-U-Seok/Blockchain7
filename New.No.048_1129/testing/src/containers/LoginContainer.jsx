import { connect } from "react-redux";
import LoginComp from "../components/LoginComponent";
import { action } from "../modules/regist";

const LoginContainer = ({ login }) => {
  return <LoginComp login={login}></LoginComp>;
};

const mapStateToProps = (state, props) => {
  return { login: state.login, ...props };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginId, loginPw) => {
      dispatch(action.login(loginId, loginPw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
