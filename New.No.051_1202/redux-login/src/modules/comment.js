const TYPE = {
  ADD: "comment/add",
  EDIT: "comment/edit",
  REMOVE: "comment/remove",
};
// 게시글에 직접 덧글을 추가할 수도 있으나 그런 방식은 상당히 비효율적이다.
// 이유는 댓글이 추가될 때마다 해당 게시글을 업데이트해야하기 때문이다.
const add = (text, userName, boardId) => ({
  type: TYPE.ADD,
  payload: { text, userName, boardId },
});

const edit = (id, text) => ({
  type: TYPE.EDIT,
  payload: { id, text },
});
const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: { id },
});

export const action = { add, edit, remove };

export const initialize = [];

let id = 0;

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.ADD:
      id++;
      return [
        { id, ...payload, createdAt: new Date().toLocaleString() },
        ...state,
      ];
    case TYPE.EDIT: {
      console.log("수정 comment.js switch 중");
      const index = state.findIndex((item) => item.id == payload.id);
      return [
        ...state.slice(0, index),
        { ...state[index], ...payload },
        ...state.slice(index + 1),
      ];
    }
    case TYPE.REMOVE: {
      const index = state.findIndex((item) => item.id == payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};
