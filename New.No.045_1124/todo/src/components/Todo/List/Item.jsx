import { Link } from "react-router-dom";
import styled from "styled-components";
import { TodoBtn } from "../../setting";
import star from "../List/star.svg";
import umbrella from "../List/umbrella.svg";
import { STATUSLIST } from "../../setting";

export default function Item({ item, index, setList }) {
  return (
    <ItemTr>
      <td>{index + 1}</td>
      <td>{item.taskName}</td>
      <td>
        <TodoBtn
          className={STATUSLIST[item.status].toLowerCase().replace(" ", "-")}
          style={{ cursor: "default" }}
        >
          {STATUSLIST[item.status]}
        </TodoBtn>
      </td>
      <td>
        <Link to={"/edit"} state={{ index, item }}>
          <TodoBtn>
            <img className="svg1" src={star} alt="star"></img>
          </TodoBtn>
        </Link>
      </td>
      <td>
        <TodoBtn className="todo">
          <img
            className="svg2"
            src={umbrella}
            alt="umbrella"
            onClick={() => {
              setList((list) => {
                const before = list.slice(0, index);
                const after = list.slice(index + 1);
                return [...before, ...after];
              });
            }}
          ></img>
        </TodoBtn>
      </td>
    </ItemTr>
  );
}

const ItemTr = styled.tr`
  text-align: center;
  height: 50px;
  td {
    border-bottom: 1px solid lightgray;
  }
  .svg1 {
    width: 15px;
    filter: invert(52%) sepia(97%) saturate(452%) hue-rotate(143deg)
      brightness(106%) contrast(90%);
  }
  .svg2 {
    width: 15px;
    filter: invert(13%) sepia(69%) saturate(5369%) hue-rotate(293deg)
      brightness(78%) contrast(112%);
  }
`;
// svg filter color 검색해서 나오는 사이트에서 #000000의 형식으로 서치하면 나오는 filter를 넣으면 svg의 색상을 변경할 수 있다.
