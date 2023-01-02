import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { action } from "../../../modules/board";
import CommentContainer from "../Comment/Container";
import BoardComponent from "./Component";

const BoardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(useLocation());
  // 구조 분해 할당.
  // useParams의 결과는 {id:***} 로 나온다.
  // 주소창에서 슬래쉬(/) 뒤에 있는 텍스트
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );

  const userName = useSelector((state) => state.userInfo.userName);

  const remove = () => {
    dispatch(action.remove(item.id));
    navigate("/");
  };

  return (
    <>
      <BoardComponent
        item={item}
        remove={remove}
        isCreator={userName == item.userName}
      ></BoardComponent>
      <CommentContainer userName={userName} boardId={id}></CommentContainer>
    </>
  );
};

export default BoardContainer;
