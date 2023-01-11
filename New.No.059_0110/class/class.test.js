const TestClass = require("./class");

describe("Class Test", () => {
  it("private test", () => {
    const test = new TestClass(5);
    expect(typeof test).toBe("object");

    expect(test.value).toBe(50);

    expect(test.add()).toBe(55);
    expect(TestClass.add(1, 2)).toBe(3);

    test.value = 100;
    expect(test.value).toBe(100);

    // test.#privateValue로는 사용할 수 없다.
    expect(test.privateValue).toBe(5); //** 접근하려면 이렇게 get에 접근

    test.privateValue = 200; // 수정하려면 이렇게 set 사용
    // test.privateValue(200)으로 쓰면 안된다. 직접 넣어주면 알아서 메서드를 호출해준다.
    expect(test.privateValue).toBe(200);
  });
});
