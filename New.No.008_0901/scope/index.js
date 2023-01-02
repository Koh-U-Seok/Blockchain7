//scope라는 것이 있다.
//{}로 묶인 것이다.
//{}를 스코프라고 부른다.
// 지역을 나타낸다.
// 지역이라는 것은 일종의 구분이다.

let a = 0;
console.log(a);
{
  a = 2;
  let b = 1;
  // 안에서 선언된 변수를 지역 변수라 한다.
  //지역 변수는 해당 scope 내에서만 사용이 가능하다.
  console.log(a + b);
  console.log(b);
}
// {} 로 묶인 곳을 지역 스코프라 한다.
console.log(a);
// console.log(b);

//{}바깥은 전역 scope라 한다.

function addA(a) {
  a++;
  console.log(a);
}

let obj = {
  a: 1,
  func1: function () {
    console.log("돼");
  },
  func: (fn, sn) => {
    return fn + sn;
  },
};

obj.func1();

console.log(obj.func(1, 2));
// 객체 안에 포함된 함수는 Method라고 부릅니다.
// console 객체 안에 log Method
// Math 객체 안에 random Method
//obj 객체 안에 func1, func2 Method

alert("경고!");
