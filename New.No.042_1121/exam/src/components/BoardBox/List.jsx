import styled from "styled-components";
export default function List({ boardList, setBoardList }) {
  console.log(boardList);
  const removeItem = (index) => {
    console.log(index);
    console.log(boardList.splice(index, 1));
    let result = boardList.filter((item) => {
      item != item[index];
    });
    console.log("result : ", result);
    // setBoardList(boardList.splice(index, 1));
  };
  return (
    <ListBox>
      <div>
        {boardList.map((item, index) => (
          <div key={`listlist${index}`}>
            {item.user} : {item.boardInput}{" "}
            <button
              onClick={() => {
                removeItem(index);
              }}
            >
              삭제~
            </button>
          </div>
        ))}
      </div>
    </ListBox>
  );
}
const ListBox = styled.div``;
