const reducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "btn/add":
      // console.log(state, action);
      return { textList: [...state.textList, payload.input] };
    // createStore의 두번째 매개변수 자리(state)를 통째로 차지한다. 그 자리에 있던 매개변수의 변수명과 형식도 갖춰야한다.
    // return {...state, { text: payload.input } };
    case "btn/remove":
      console.log(typeof parseInt(payload.input));
      console.log(payload.input);
      return {
        textList: [
          ...state.textList.slice(0, parseInt(payload.input)),
          ...state.textList.slice(parseInt(payload.input) + 1),
        ],
      };
    default:
      return state;
  }
};
export default reducer;
