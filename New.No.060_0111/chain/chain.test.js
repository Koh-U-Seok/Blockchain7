// npx jest --verbose
// --verbose 무슨 테스트가 실행되었고 정상적을 끝났는지 표시된다.

const Chain = require("./chain.js");
const Block = require("../block/block.js");

describe("chain test", () => {
  let chain;
  beforeEach(() => {
    // 다른 테스트를 실행하기 전에 실행하는 메서드
    chain = new Chain();
  });

  describe("addBlock test", () => {
    it("데이터로 블록 추가 확인", () => {
      // 시작하기 전에 위에서 설정된 beforeEach가 실행된다.
      console.log(chain.chain); // 여기서의 체인은 새로 생성된 체인이다.
      chain.addBlock(["정상적인 데이터"]);
      console.log(chain.chgain); // addBlock으로 정상적인 데이터가 입력(전달)되어 chain에 추가된다.
      expect(chain.chain).toHaveLength(2);
    });

    it("잘못된 데이터로 블록 추가 확인", () => {
      // it이 시작하기 전에 위에서 설정된 beforeEach가 실행된다.
      console.log(chain.chain); // 여기서의 체인은 새로 생성된 체인이다.
      chain.addBlock("잘못된 데이터");
      console.log(chain.chgain); // 잘못된 데이터로 인해 chain에 추가되지 않는다.
      expect(chain.chain).toHaveLength(1);
    });
  });
  describe("add2chain", () => {
    it("블록 생성 후 추가 확인", () => {
      const newBlock = new Block(["asdf"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.chain).toHaveLength(2);
    });
    it("잘못된 블록 생성 후 추가 확인", () => {
      const newBlock = new Block(["asdf"]);
      // 제네시스 블록을 생성하려고 시도
      chain.add2Chain(newBlock);
      // chain의 constructor에서 이미 제네시스 블록을 생성했는데 다른 제네시스 블록을 추가하려고 했으니 박살났음 => previousHash와 이전 블록의 hash가 일치하지 않으니까
      expect(chain.chain).toHaveLength(1);
    });
  });

  describe("lastBlock check", () => {
    it("마지막 블록 확인", () => {
      chain.addBlock(["asdf"]);
      const newBlock = new Block(["qwer"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.lastBlock).toEqual(newBlock);
    });
  });
});
