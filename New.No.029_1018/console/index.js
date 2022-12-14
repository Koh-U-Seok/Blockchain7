// ES6 이전 << Javascript의 버전
// Class가 대표적인 ES6, import export
console.log();
// Javascript가 갖고 있는 객체 => 내장 객체
console.log(global);
// global(브라우저의 window) => 전역 객체, js 파일에서 변수를 초기화하면 그 js 파일 내에서만 사용이 가능한데 전역으로 쓰고 싶으면 global의 프로퍼티로 추가한다.
// Node.js에 DOM이 있을까?
// HTML 파일의 구조를 저장한 객체 => DOM, document
// Node.js HTML 구조가 있나? => 없다. => document가 없다. HTML 구조가 아니니까!
// window => 브라우저의 정보를 갖고 있는 객체
// Node.js가 브라우저를 쓴다? => 안 쓴다.
// window 객체가 없다. => 대신하는 객체가 global
console.warn("경고");
// 경고 출력
console.dir({ data: "구조 출력" });
// 구조에 대해서 출력
// 브라우저 쪽에서도 사용
// <div> ~~</div> << console.log()  [Object]
console.time("시간 측정");
// 시간 확인? 출력? 에 대한 시작점
console.timeLog("시간");
// 시간 확인에 대한 중간점
console.timeEnd("시간 측정");
// 시간 확인 완료

console.assert(true, "참");
console.assert(false, "거짓");

console.count("몇번?");
console.count("몇번?");
console.countReset("몇번?");
console.count("몇번?");

console.table({ name: "표", data: "출력" });

console.error("에러 출력");

// let a = 12;
global.a = 12;
