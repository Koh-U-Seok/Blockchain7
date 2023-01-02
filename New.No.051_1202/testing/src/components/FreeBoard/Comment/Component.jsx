import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CommentComponent = ({ add, list, edit, remove }) => {
  const [addText, setAddText] = useState("");
  return (
    <CommentBox>
      <CommentAddBox>
        <input
          type={"text"}
          value={addText}
          onInput={(e) => {
            setAddText(e.target.value);
          }}
          placeholder={"comment"}
        ></input>
        <button
          onClick={() => {
            add(addText);
          }}
        >
          {" "}
          Add Comment
        </button>
      </CommentAddBox>
      {list.map((item, index) => (
        <CommentItemComponent
          key={`comment-${index}`}
          item={item}
          edit={edit}
          remove={remove}
        ></CommentItemComponent>
      ))}
    </CommentBox>
  );
};

export default CommentComponent;

const CommentBox = styled.div``;

const CommentAddBox = styled.div``;

const CommentItemComponent = ({ item, edit, remove }) => {
  // 아래 처럼 복잡하게 하는 이유는 버튼을 추가로 만들지 않기 위해서인다.
  const [isEdit, setIsEdit] = useState(false);
  // isEdit가 참이면 수정 가능 상태 / 거짓이면 수정 불가 상태
  const [editText, setEditText] = useState(item.text);
  const loggedonUser = useSelector((state) => state.userInfo.userId);
  return (
    <div>
      {isEdit ? (
        <input
          type="text"
          value={editText}
          onInput={(e) => {
            setEditText(e.target.value);
          }}
        ></input>
      ) : (
        item.text
      )}{" "}
      - {item.userName}
      {loggedonUser == item.user ? (
        <>
          <button
            onClick={() => {
              if (isEdit) {
                edit(item.id, editText);
                setIsEdit(false);
              } else {
                setIsEdit(true);
                setEditText(item.text);
              }
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              isEdit ? setIsEdit(false) : remove(item.id);
            }}
          >
            {isEdit ? "Cancel" : "Remove"}
          </button>
        </>
      ) : (
        loggedonUser
      )}
    </div>
  );
};
