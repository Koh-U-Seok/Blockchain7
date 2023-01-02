import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/board";
import AddComponent from "./Component";

const AddContainer = () => {
  const dispatch = useDispatch();
  // useDispatch로 쉽게 reducer에 보낼 수 있다.
  const userName = useSelector((state) => state.userInfo.userName);
  // connect가 필요가 없다.
  // useSelector로 state에 있는 정보를 가져올 수 있다.

  const onClick = (title, text) => {
    dispatch(action.add(title, text, userName));
  };
  // username
  return !userName || <AddComponent onClick={onClick}></AddComponent>;
};

export default AddContainer;
