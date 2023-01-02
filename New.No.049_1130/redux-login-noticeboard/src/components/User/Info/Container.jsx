import InfoComponent from "./Component";
import { connect } from "react-redux";
import store from "../../../modules/store";
import { action } from "../../../modules/userInfo";

const InfoContainer = ({ userName }) => {
  console.log(userName);

  const onClick = () => {
    store.dispatch(action.logOut());
  };
  return <InfoComponent userName={userName} onClick={onClick}></InfoComponent>;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(InfoContainer);
