const list = document.getElementById("todo-list");
// const로 list를 초기화한 이유 : 메서드(함수)를 호출할 때마다 Javascript는 해당 코드를 실행하기 때문에
// 실행을 최소화하기 위해 변수에 반환값(return)을 정의하여 이후 다시 찾지 않고 바로 쓸 수 있도록 한다.

function deleteItem(num) {
  //삭제를 위한 함수
  // list.children(num).classList.add("delete");
  // list의 자식들(Element) 중에 num번째 자식에 delete라는 클래스를 추가한다.
  // delete 클래스를 가진 엘리먼트는 css 스타일로 인해 가운데에 줄이 생기게 된다.

  // let startIdx = 0;
  // let endIdx = 0;
  // let tempHTML = list.innerHTML;
  // for (let i = 0; i < num; i++) {
  //   tempHTML.slice(startIdx + 4).indexOf("<li>");
  // }
  // emdHTML.slice(startIdx + 4).indexOf("<li>");
  // tempHTML = list.innerHTML;
  // list.innerHTML = tempHTML.slice(0, startIdx) + tempHTML.slice(endIdx);

  list.innerHTML = list.innerHTML.replace(list.children[num].outerHTML, "");
}

document.getElementById("todo-add").onclick = () => {
  // todo-add. 즉, 추가 버튼에 대한 코드를 정의한다.
  const input = document.getElementById("todo-input");
  // 입력된 값을 확인하기 위해 Element를 찾아 변수에 초기화 한다.
  if (!input.value) return;
  // 입력된 값이 없으면 return, 즉 메서드를 종료한다.
  list.innerHTML += `<li>${input.value}<button onclick="deleteItem(${list.children.length})">삭제</button</li>`;
  // 할일 목록에 li 엘리먼트를 추가한다.
  // 엘리먼트의 자식으로 버튼을 추가하여 list의 자식들의 길이(현재는 추가되지 않았기 때문에 index처럼 사용가능)를 매개변수로 전달한다.
  // list.children.length-1이 아니라 list.children.length인 이유는 list에 아직 추가하지 않았기 때문에 list의 자식들 길이가 새로 추가한 버튼의 번호와 일치하기 때문이다!
  input.value = "";
  // 입력된 값을 없앤다.
};
