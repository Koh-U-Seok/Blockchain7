// 오버로드, 오버라이드
class Parent {
  console(data) {
    console.log("parent : ", data);
  }
  console(data1, data2) {
    console.log(data1, "은 data1이고 ", data2, "은 data2이다.");
  }
}

class Child extends Parent {
  console(data) {
    console.log("Child : ", data);
  }
}

const parent = new Parent();
parent.console("갈갈갈");
const child = new Child();
child.console("드르륵");
child.console("고무고무", "기어 세컨드");

const wtf = (...data) => {
  data.forEach(console.log);
};
wtf(1, 2, 3, 4, "asd", "fgh", "jkl");
