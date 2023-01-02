const TYPE = {
  REGIST: "regist",
};

const regist = (registId, registPw) => ({
  type: TYPE.REGIST,
  payload: { registId: registId, registPw: registPw },
});
export const action = { regist };

export const initialize = { regist: { registId: "", registPw: "" } };

export const reducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.REGIST:
      return { userId: payload.registId, userPw: payload.registPw };
    default:
      return state;
  }
};
