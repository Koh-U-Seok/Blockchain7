// const a = 1;
// function func1() {
//   console.log("func1");
// }

// function func2() {
//   func1();
//   console.log("func2");
//   func4();
// }

// function func3() {
//   func2();
//   console.log("func3");
// }

// function func4() {
//   console.log("func4");
// }

// func3();

// const x = "x";
// function c() {
//   console.log("c", x);
// }

// function a() {
//   const x = "xx";
//   console.log("a", x);
//   function b() {
//     console.log("b", x);
//     c();
//   }
//   b();
// }

// a();

function recursive(a) {
  console.log(a);
  recursive(a + 1);
  // 재귀함수, 함수 스스로가 스스로를 호출한다.
}
recursive(1);
