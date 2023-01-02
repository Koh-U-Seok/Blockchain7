export const reducer = (state, action) => {
  console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case "inputPlus":
      console.log(state, action);
      return { ...state, count1: state.count1 + payload.input };
    // ...state << 기존의 state를 넣는다.
    // count1 : state.count1+payload.input << count1 프로퍼티에 payload로 받은 input 프로퍼티를 더한다.
    case "inputMinus":
      console.log(state, action);
      return { ...state, count1: state.count1 - payload.input };
    case "noInputPlus":
      console.log(state, action);
      return { ...state, count2: state.count2 + 1 };
    case "noInputMinus":
      console.log(state, action);
      return { ...state, count2: state.count2 - 1 };
    default:
      return state;
  }
};

// export default reducer;
