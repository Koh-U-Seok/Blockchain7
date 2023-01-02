const divs = document.getElementsByTagName("div");
// const, let, var 명령어로 이름짓는 것이 변수이다.
// 변수의 이름을 정하는 것을 선언이라고 한다.
// 변수에 데이터(값)을 지정하는 것을 정의라고 한다.
// 선언과 정의를 한번에 하는 것을 초기화라고 한다.
// const는 재정의가 불가능하기 때문에 초기화를 해야만 한다.
// 재정의가 불가능한 변수 divs를 선언하여 div라는 TagName(Tag)를 HTML, 구조(DOM, document) 내에서 검색하여 가져와서 정의한다.
// 즉, 상수 divs에 div 엘리먼트들을 초기화한다.
[...divs].forEach((elem) => {
  //  ...(스프레드, 전개 연산자)는 배열 등 데이터의 모음에 풀어서 변환한다.
  // 보통 [...***] 방식을 사용하여 유사 배열을 유사 배열 ***을 배열로 변환한다. <<< 해당 방법 사용 시 직전 코드 마지막에 ;(세미 코드)가 없으면
  // 하나의 코드로 인식하여 오류가 발생하는 경우가 있다.
  // forEach는 배열의 각 아이템을 매개변수 함수에 매개변수로 전달하여 함수를 실행한다.
  // elem은 내가 자주 사용하는 element의 약어
  elem.onclick = (e) => {
    //  onclick은 클릭 시 실행되는 이벤트 함수다.
    console.log(elem.classList.toString());
    //  classList는 엘리먼트의 class로 관리하는 프로퍼티 객체이다.
    console.log("버블링!  .");
    // console은 개발자 도구에 출력하기 위한 객체이다.
    // console.log()는 개발자 도구에 전달된 매개변수를 단순 출력한다.
    e.stopPropagation();
    // 버블링을 막아주는 메서드
    // e.preventDefault();
  };

  // elem.addEventListener(
  //   "click",
  //   () => {
  //     console.log("캡처링");
  //   },
  //   { capture: true }
  // );
});
// 이상 위의 코드는 버블링 기능을 볼 수 있다.
// 버블링은 클릭 등 이벤트 함수에 대해서 자식의 이벤트 함수 실행 후 그 부모의 이벤트 함수를 실행하는 것을 말한다.
// 캡처링은 버블링과 반대로 상위 부모에서부터 자식으로 내려와 이벤트 함수가 실행되는 것을 말한다.
// 캡처링은 addEventListener를 사용해서 확인할 수 있다.
// 이벤트 함수 실행 시 캡처링 진행 후 버블링이 진행된다. << 해당 방법은 각자 찾아서 해볼 것.
hoisting();
console.log(a);
var a = 1;
console.log(a);
// 선언(초기화)하기 전에 호출해도 사용이 되는 현상을 호이스팅이라고 한다.
// 공식적으로는 hoisting은 var를 사용할 경우 Javascript가 최상단에서 선언되어이다고 인식한다.
// var, funciton으로 가능하다.
// hoisting은 좋은 기능이 아니기 때문에 사용하지 않는 것을 권장한다.(var를 사용하지 말 것.)

hoisting();

function hoisting() {
  console.log(++a);
}
let expressionHoisting = function () {
  // 함수 표현식을 사용하면 호이스팅을 막을 수 있다.
  console.log(++a);
};
expressionHoisting();

const arrowHoisting = () => {
  // 화살표 함수로도 호이스팅을 막을 수 있다.
  console.log(++a);
};
arrowHoisting();

// 시험에 나올 확률이 높다...

// 구조분해할당

const tempArr = [1, 2, 3, 4, 5];
const [aa, bb, ...cc] = tempArr;
console.log(aa);
console.log(bb);
console.log(cc);
// 배열의 구조분해할당에 대한 예시

const tempObj = {
  aaa: 1,
  bbb: 2,
  ccc: 3,
};
const { aaa, bbb, ccc } = tempObj;
console.log(aaa);
console.log(bbb);
console.log(ccc);
// 객체의 구조분해할당에 대한 예시
// 객체든 배열이든 그 구조를 분해하고 대상에 할당해서 집어 넣는다.
