// 로그인한 유저의 정보

const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};
// 들어온 요청의 종류

const logIn = (userId, userPw, userDB) => ({
  type: TYPE.LOGIN,
  payload: {
    userId,
    userPw,
    userDB,
  },
  // === payload :{userId:userId,userPw,userPw.userDB:userDB}
});

const logOut = () => ({
  type: TYPE.LOGOUT,
});

export const action = { logIn, logOut };
// action 내보내기

export const initialize = { userId: "", userName: "" };
// 로그인했을 때 아이디와 이름을 저장하겠다.

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.LOGIN:
      const tempUser = payload.userDB.find(
        (item) => item.userId === payload.userId
      );
      if (tempUser && tempUser.userPw === payload.userPw) {
        return {
          userId: tempUser.userId,
          userName: tempUser.userName,
        };
      } else return state;
    case TYPE.LOGOUT:
      return initialize;
    default:
      return state;
  }
};
