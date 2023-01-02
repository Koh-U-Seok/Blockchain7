import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/board";
import AddComponent from "./Component";

const AddContainer = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);

  const onClick = (title, text) => {
    dispatch(action.add(title, text, userName));
  };
  return !userName || <AddComponent onClick={onClick}></AddComponent>;
};

export default AddContainer;
