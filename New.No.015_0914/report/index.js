let todo = [];
todo.push("당신의 할 일을 기록하세요!");
document.getElementById("btnWrite").onclick = () => {
  // 작성 버튼을 클릭하였을 때
  let todoText = document.getElementById("textWrite");
  if (todoText.value.length != 0) {
    // textWrite가 공란인지 확인
    todo.push(todoText.value);
    console.log(todo[todo.length - 1]);
    console.log(todoText.value);
    document.getElementById(
      "section"
    ).innerHTML += `<div class="todo" id="todo${todo.length - 1}">
        ${todoText.value}<button class="deleteButton" onclick="deleteButton(${
      todo.length - 1
    })">X</button>
    </div>`;
    todoText.value = "";
    console.log(`deleteButton${todo.length - 1} : ${todo[todo.length - 1]}`);
    console.log(`todo[${todo.length - 1}] : ${todo[todo.length - 1]}`);
  } else {
    alert("빈 칸인 채로 입력을 할 순 없어용");
  }
};

function deleteButton(num) {
  console.log(num);
  document.getElementById(`todo${num}`).remove("todo");
  todo.splice(num, 1);
}
// document.getElementsByClassName("deleteButton").onclick = () => {
//   console.log("일단 클릭은 인식이 된다.");
//   let list = [...document.getElementById("section").children];
//   [...list].forEach(function (elem, index) {
//     console.log(index);
//     document.getElementById(`todo${index}`).remove("todo");
//     todo.splice(index, 1);
//   });
// };
