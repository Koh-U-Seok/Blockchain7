import { useState } from "react";

export default function ({ Board, children }) {
  const boardList = [
    { title: "가가가", text: "111" },
    { title: "나나나", text: "222" },
    { title: "다다다", text: "333" },
    { title: "라라라", text: "444" },
    { title: "마마마", text: "555" },
    { title: "바바바", text: "666" },
    { title: "사사사", text: "777" },
  ];

  return (
    <>
      {Board}
      <ul>
        {boardList.map((item, index) => {
          return (
            <li key={`boardList_item_${index}`} className="boardList_item">
              <div className="boardList_item_title">{item.title}</div>
              <div className="boardList_item_text">{item.text}</div>
            </li>
          );
        })}
      </ul>
      <div key="inputDiv">
        <input type="text" key="inputTitle" id="inputTitle" />
        <input type="text" key="inputText" id="inputText" />
        <input
          type="button"
          value="input!"
          key="inputBtn"
          onClick={boardList.push(
            document.getElementById("inputTitle").value,
            document.getElementById("inputText").value
          )}
        />
      </div>
    </>
  );
}
