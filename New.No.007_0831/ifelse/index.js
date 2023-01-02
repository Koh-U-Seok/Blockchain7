console.log("이것은 개발자 도구 콘솔 창에 로그를 남기는 것이다.");
console.log("fabicon 관련 오류는 지금은 무시해 둔다.");

console.log('1 === "1" : ' + (1 === "1"));

//조건문, if && else if && else
if (1 < 2) {
  // if()가 참이면 {}의 코드를 실행한다.
  console.log("1 < 2 는 true다.");
} else {
  // if()가 거짓이면 else{}의 코드를 실행한다. 없어도 된다.
  console.log("1 < 2 는 false다.");
}

if (1 < 2) console.log("1 < 2 는 true다.");
// if에서 조건이 참이어서 해당 코드가 실행되면 els eif, else 등
//아래의 코드를 건너뛴다. 즉, 아래의 코드는 실행되지 않는다.
else console.log("1 < 2 는 false다.");
// 위의 if, else if의 조건이 모두 충족되지 않았을 때 최후의 보루로
// 실행되는 코드다.
// 한줄의 코드면  {}가 없어도 된다.

// if(1<2) console.log("1 < 2 는 true다.");
// console.log('asdf');
// else console.log("1 < 2 는 false다.");
// if와 elseif, else는 함께 있어야 한다.

// elseif는 else와 if가 합쳐진 것이다.
if (1 > 2) {
  console.log("여기 조건이 거짓이면서");
} else if (1 < 2) {
  console.log("여기 조것이 참이면 else if의 {}코드가 실행된다.");
} else {
  console.log(
    "위의 if, else if의 모든 조건이 거짓이면 else{} 코드가 실행된다."
  );
}

console.log(1 < 2 ? "이건 참이다" : "이건 거짓이다.");
// 조건 ? 참일때 : 거짓일때;
// 삼항 연산자

let test1 = 510;
let test2 = 7;

if (test1 < test2) {
  console.log("보고 싶다.");
} else {
  console.log("보기 싫다.");
}

let inputData;
// const inputData = prompt("넣고 싶은 데이터를 입력 하세요.");
// prompt()로 받는 데이터는 전부 string으로 처리된다.
// 숫자로의 형변환 필요 Number(prompt()), +prompt(), parseInt(prompt()), parseFloat(prompt())로 대체해야 한다.

// switch는 여러 조건을 한 번에 확인한다.
switch (inputData) {
  // switch의 () 안에 있는 변수의 값을 확인한다.
  case "1":
    // case는 () 안에 있는 변수의 값이 같은지 확인한다.
    console.log("1을 넣었다");
    break;
  // break 해당 명령어가 있는 지점에서 코드를 정지한다.
  case "2":
    console.log("2을 넣었다");
    break;
  case "3":
    console.log("3을 넣었다");
    break;
  case "4":
    console.log("4을 넣었다");
    break;
  default:
    // if else에서 else와 같다. 즉, case에서 거르지 못하면 실행되는 마지막 보류다.
    console.log("1부터 4만 넣어라!");
}
