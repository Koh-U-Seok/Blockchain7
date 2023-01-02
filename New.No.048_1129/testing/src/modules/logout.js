const TYPE = {
  LOGOUT: "LOGOUT",
};
const logout = (loginId) => ({
  type: TYPE.LOGOUT,
  payload: { loginId: loginId },
});
export const action = { logout };

export const initialize = { logout: { loginId: "" } };

export const reducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGOUT:
      return { loginId: "" };
    default:
      return state;
  }
};
