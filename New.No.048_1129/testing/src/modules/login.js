const TYPE = {
  LOGIN: "login",
};

const login = (loginId, loginPw) => ({
  type: TYPE.LOGIN,
  payload: { loginId: loginId, loginPw: loginPw },
});
export const action = { login };

export const initialize = { login: { loginId: "", loginPw: "" } };

export const reducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGIN:
      return { logonId: payload.loginId, logonPw: payload.loginPw };
    default:
      return state;
  }
};
