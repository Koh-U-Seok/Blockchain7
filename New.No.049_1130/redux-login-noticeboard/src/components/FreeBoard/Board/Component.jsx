import styled from "styled-components";
import { Link } from "react-router-dom";
const BoardComponent = ({ item, remove, isCreator }) => {
  return (
    <BoardBox>
      <h1>{item.title}</h1>
      <h3>
        userName : {item.userName} - {item.createdAt}
      </h3>
      {!isCreator || (
        <span>
          <Link to={`/edit/${item.id}`}>
            <button>Edit</button>
          </Link>

          <button
            onClick={() => {
              remove();
            }}
          >
            Delete
          </button>
        </span>
      )}
      <p>{item.text}</p>
      {/* 댓글을 여기에 넣어야 할지 index.jsx에 넣어야 할지 고민중... */}
    </BoardBox>
  );
};

export default BoardComponent;

const BoardBox = styled.div``;
