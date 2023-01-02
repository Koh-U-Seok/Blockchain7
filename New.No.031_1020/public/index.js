const todoList = document.getElementById("list");
function getList() {
  todoList.innerHTML = "";
  axios.get("/api/list").then((resData) => {
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");
      tempElem.innerHTML = `${todo.text}`;
      todoList.append(tempElem);
    });
  });
}
getList();
document.forms["todo-form"].onsubmit = function (e) {
  e.preventDefault(); // 기본 이벤트를 막는다.

  // XMLHttpRequest => fetch/ajax => axios
  // http 모듈 => express

  axios
    .post("/api/list", {
      name: document.forms["todo-form"]["do-name"].value,
    })
    .then((data) => {
      getList();
    });
  axios.delete("/api/list", {}).then((data) => {});
  axios.put("/api/list", {}).then((data) => {});
};
