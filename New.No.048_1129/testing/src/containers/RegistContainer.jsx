import { connect } from "react-redux";
import RegistComp from "../components/RegistComponent";
import { action } from "../modules/regist";

const RegistContainer = ({ regist }) => {
  return <RegistComp regist={regist}></RegistComp>;
};

const mapStateToProps = (state, props) => {
  return { regist: state.regist, ...props };
};

const mapDispatchToProps = (dispatch) => {
  return {
    regist: (registId, registPw) => {
      dispatch(action.regist(registId, registPw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistContainer);
