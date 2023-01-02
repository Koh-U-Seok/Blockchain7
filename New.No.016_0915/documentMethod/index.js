const root = document.getElementById("root");
// id가 root인 Element를 가져온다. 그리고 root 변수에 초기화한다.

// root.onload()
// onload() 메서드는 로드가 되었는가? 되었을 때 실행된다.
// 즉, dom이 생성되었을 때 실행된다.
// 따라서 root에 onload()를 적용해도 이미 root가 생성되고 난 후 이기에 실행되지 않는다.
root.onwheel = (e) => {
  // 마우스 휠에 대한 메서드
  console.log(e.target);
};

// e는 Event의 약자다. 실행된 Event에 대한 정보이다.
// 이 메서드들은 console.log(e.target)을 출력하기 위해 e를 매개변수로 넣었을 뿐
// 넣지 않아도 상관없다.
document.getElementById("name").onchange = (e) => {
  // 입력이 완료되었을 때
  console.log(e.target.value);
  // e.target은 해당 메서드가 어디서 실행되었는지, focus가 기준이 될 수도 있고,
  // 마우스가 기준이 될 수도 있다.
};

document.getElementById("name").oninput = (e) => {
  // 입력이 감지되었을 때
  console.log(e.target.value);
};
// on~ 메서드는 전부 이벤트 함수다.
//  클릭, 키다운, 휠업 등 사용자의 입력에 대해 이벤트가 발생했을 때 실행된다.

document.getElementById("name").addEventListener("click", (e) => {
  console.log(e.target);
});

document.getElementById("name").style.backgroundColor = "lightgray";
// html 문서에서 style 속성을 이용해서 inline 형식으로 설정된 스타일과 마찬가지로 적용된다.

console.log(document.getElementById("name").style.border);

for (let i = 0; i < 10; i++) {
  const tempElem = document.createElement("div");
  // div Element를 생성해서 tempElem 변수에 초기화한다.
  tempElem.innerHTML = i + "번째 div";
  // tempElem의 내용(innerHTML)을 "i번째 div"라고 정의한다.

  //   root.append(tempElem);
  // root Element에 tempElem 엘리먼트를 자식으로 추가한다.(마지막 자식으로)
  root.prepend(tempElem);
  // root Element에 tempElem 엘리먼트를 자식으로 추가한다.(첫 번째 자식으로)
}
