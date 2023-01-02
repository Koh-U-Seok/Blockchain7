// 회원가입한 유저들의 정보

const TYPE = {
  REGIST: "userDB/regist",
};

// action
const regist = (userId, userPw, userName) => {
  // 8. regist를 호출당했다. userId, userPw, userName을 매개변수로 받았다.
  console.log("action regist");
  // 9. {type : TYPE.REGIST, payload: { userId, userPw, userName } }를 반환했다.
  // << action.
  return {
    type: TYPE.REGIST,
    payload: { userId, userPw, userName },
  };
};

export const action = { regist };

export const initialize = [];
// 초기화값.

export const reducer = (state = initialize, action) => {
  // 12. dispatch가 action을 매개변수로 보내며 호출했다. state는 기존의 상태값이다.
  // state는 combineReducers의 사용 여부에 따라서 달라진다.
  console.log(action);
  const { type, payload } = action;
  console.log(state);

  // 13. type에 따라서 state를 재정의 한다. 재정의하고 싶은 정보를 return한다.
  // reducer에서 return해주면 state를 재정의한다. 실제로 return되는 곳은 redux깊숙한 곳 어딘가... 자세히 파진 말자
  switch (type) {
    case TYPE.REGIST:
      if (state.find((item) => item.userId === payload.userId)) return state;
      else return [...state, payload];
    default:
      return state;
  }
};

// 삼항 연산자 => 조건 ? 참 : 거짓
// isBool ? 'true' : 'false'
// 위를 if 문으로 쓰고자 한다면
// function check(isBool) {
//   if (isBool) return "true";
//   else "false";
// }
// const temp = check(isBool);
