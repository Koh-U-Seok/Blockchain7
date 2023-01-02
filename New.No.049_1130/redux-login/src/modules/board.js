const TYPE = {
  ADD: "board/add",
  REMOVE: "board/remove",
  EDIT: "board/edit",
};
// 일거리들을 만들어 놨으니 해당 일거리에 대한 주문서(action)을 만들자

const add = (title, text, userName) => ({
  type: TYPE.ADD,
  payload: {
    title,
    text,
    userName,
  },
});
// payload : 들어오는 항목

const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: { id },
});

const edit = (id, title, text) => ({
  type: TYPE.EDIT,
  payload: {
    id,
    title,
    text,
  },
});

export const action = { add, remove, edit };

export const initialize = [];
// 초기화. 빈 배열을 할당하여 기존 값을 없애버리겠다.

let id = 0;
// 번호
export const reducer = (state = initialize, action) => {
  // dispatch로 보낸 인자들은 action에 들어간다.
  // dispatch의 action.add의 add 부분이 type으로 들어간다.
  // dispatch의 (title, text,userName) 인자 부분이 payload로 들어간다.

  const { type, payload } = action;
  switch (type) {
    // 어떤 작업이 들어오는지 종류를 확인
    case TYPE.ADD:
      const { title, text, userName } = payload;
      id++;
      return [
        { id, title, text, userName, createdAt: new Date().toLocaleString() },
        // {...payload, createdAt:new Date().toLocaleString()},
        // id가 있는 이유 : 수정 삭제 때문에
        ...state,
        // state가 아래에 있는 이유 : ...state를 뒤로 두어 최신 글이 가장 위에 올라오도록 한다.
      ];
    case TYPE.REMOVE: {
      const index = state.findIndex((item) => item.id === payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case TYPE.EDIT: {
      const index = state.findIndex((item) => item.id == payload.id);

      return [
        ...state.slice(0, index),
        { ...state[index], ...payload },
        ...state.slice(index + 1),
      ];
    }
    default:
      return state;
  }
};
