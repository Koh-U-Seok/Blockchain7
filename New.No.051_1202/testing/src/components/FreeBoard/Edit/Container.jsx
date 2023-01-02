import EditComponent from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { action } from "../../../modules/board";

const EditContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(useLocation());
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );
  const onClick = (title, text) => {
    dispatch(action.edit(id, title, text));
    navigate(`/board/${id}`);
  };
  return <EditComponent onClick={onClick} item={item}></EditComponent>;
};

export default EditContainer;
