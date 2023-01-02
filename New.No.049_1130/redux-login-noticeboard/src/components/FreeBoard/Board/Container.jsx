import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { action } from "../../../modules/board";
import BoardComponent from "./Component";

const BoardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(useLocation());
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );
  const userName = useSelector((state) => state.userInfo.userName);

  const remove = () => {
    dispatch(action.remove(item.id));
    navigate("/");
  };

  return (
    <BoardComponent
      item={item}
      remove={remove}
      isCreator={userName == item.userName}
    ></BoardComponent>
  );
};

export default BoardContainer;
