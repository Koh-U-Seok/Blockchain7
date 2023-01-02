export const COUNT1 = {
  PLUS: "count1/plus",
  MINUS: "count1/minus",
};

// 변수명이 전부 대문자다. 이유는?
// 수정하지 않고 가져다 쓸 변수 << 관례 중 하나

const plus = (input) => {
  console.log(input);
  return {
    type: COUNT1.PLUS,
    payload: { input },
  };
};

const minus = (input) => ({
  type: COUNT1.MINUS,
  payload: { input },
});
export const actions = { plus, minus };

// 이렇게 따로 분리하는 이유는 만약 type의 이름을 바꾸면 여기서 하나만 바꿔주면 되기 때문. 유지 보수에 용이하다.
