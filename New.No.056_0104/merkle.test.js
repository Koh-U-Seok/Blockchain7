const { Header, Block } = require("./block.js");

// 테스트 함수들을 실행하는데 묶어서 실행할 수 있다.
console.log("뭐가 문제");
// describe : 테스트의 묶음(그룹을 지어줄 수 있다고 보면 된다.)
describe("테스트들의 묶음 단위 내용", () => {
  // 각각의 테스트들을 여기에 작성해주면 된다.
  // 테스트 단위
  it("테스트의 내용1.", () => {
    console.log(header);
  });
  it("테스트의 내용2.", () => {
    console.log("나 처음써봄");
  });
  it("테스트의 내용3.", () => {
    console.log("나 처음써봄");
  });
  //   it("테스트의 내용4.", () => {
  //     // expect 함수로 비교 함수들을 사용할 수 있게 해준다.
  //     // expect의 매개변수로 비교할 값을 넣어주고
  //     // expect().toBe()의 toBe()의 매개변수로 앞의 값과 비교할 값을 넣어준다.
  //     // 단순히 데이터 비교 A와 B를 넣었다고 하면 A === B
  //     const newBlock = block(
  //       header(0),
  //       "The Times 03/Jan/2009 Chanellor on brink of second bailout for banks"
  //     );
  //     const newBlock2 = secondBlock(secondHeader(1, newBlock.hash), [
  //       "난 두번째 블록",
  //     ]);
  //     console.log(newBlock);
  //     console.log(newBlock2);
  //     expect(newBlock).toBe(newBlock);
  //   });
});
