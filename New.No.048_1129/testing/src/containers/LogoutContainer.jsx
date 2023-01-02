import { connect } from "react-redux";
import LogoutComp from "../components/LogoutComponent";
import { action } from "../modules/regist";

const LogoutContainer = ({ logout }) => {
  return <LogoutComp logout={logout}></LogoutComp>;
};

const mapStateToProps = (state, props) => {
  return { logout: state.logout, ...props };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (loginId) => {
      dispatch(action.login(loginId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
