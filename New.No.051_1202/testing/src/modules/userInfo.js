const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};
// action의 종류. 따로 분류하는 이유는 action의 종류를 수정할 때 일괄적으로 관리하기 편하니까

const logIn = (userId, userPw, userDB) => ({
  type: TYPE.LOGIN,
  payload: { userId, userPw, userDB },
});
//  들어온 action을 reducer에서 처리하기 좋게 정리하여 변수에 담아 저장한다.

// const regist2 = (userId, userPw, userName) => {
//   return {
//      type: TYPE.REGIST,
//      payload: { userId, userPw, userName },
//   }
// };
// return을 쓰고 싶으면 이처럼 쓸 수 있다.

const logOut = () => ({
  type: TYPE.LOGOUT,
});
//  들어온 action을 reducer에서 처리하기 좋게 정리하여 변수에 담아 저장한다.
// 로그아웃하는데는 별다른 정보가 필요치 않으니 payload는 받지 않았다.

export const action = { logIn, logOut };
// 없어도 되긴 하나, 외부에서 접근할 때 action에 접근하면 그 밑에 있는 action에 접근할 수 있으니 보다 편리해진다.

export const initialize = { userId: "", userName: "" };
// 초기값.

export const reducer = (state = initialize, action) => {
  // state는 반드시 있어야 한다. state가 없더라도 에러가 발생하지 않도록 빈값이라도 넣어주기 위해 초기값을 설정한다.
  const { type, payload } = action;
  // action의 내용을 type(action의 종류로 실행할 명령을 구분한다.)과 payload(명령을 실행하는 데 쓰일 정보들)에 구조분해할당으로 나눠준다.
  // 이렇게 안쓰면 밑에서 type과 payload를 쓸 때 일일히 action.type, action.payload이라고 action을 적어줘야 한다.
  switch (type) {
    case TYPE.LOGIN:
      return state;
    case TYPE.LOGOUT:
      return state;
    default:
      return state;
  }
};
