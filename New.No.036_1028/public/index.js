async function getList() {
  // async  : 서버와 통신하는 시간때문에 생기는 딜레이 동안 다음 코드를 실행하지 않고 기다리기 위해 사용 function 앞에 async를 붙여서 사용
  try {
    // try{}catch{} : try{}에서 문제가 생길 경우 catch{} 내의 코드를 실행. 에러를 잡기 위한 용도.
    const result = (await axios.get("/api/board")).data; // axios : 프론트엔드와 백엔드가 통신을 하기 위해 사용하는 라이브러리. axios.get(), axios.post()와 같이 사용한다.
    // MySQL board table에서 정보를 가져와서 result에 담는다.
    boardList.innerHTML = ""; // 기존의 board 목록 깔끔하게 초기화
    result?.list?.forEach((item) => {
      // board 테이블의 행만큼 반복한다.
      // 객체의 속성에 접근할 때 그 속성이 없으면 에러가 발생한다. 옵셔널 체이닝(?)을 사용하면 객체에 접근하고 싶은 속성이 없더라도 에러가 발생하지 않고 undefined가 나온다.
      console.log(item);
      const boardItem = document.createElement("div"); // 게시글의 틀
      const boardTitle = document.createElement("div"); // 게시글의 제목
      const boardText = document.createElement("div"); // 게시글의 본문
      const boardBtnBox = document.createElement("div"); // 게시글 버튼을 담은 div
      const boardDelete = document.createElement("button"); // 게시글 삭제 버튼
      const boardUpdate = document.createElement("button"); // 게시글 수정 버튼
      const formCommentAdd = document.createElement("form"); // 게시글에 대한 댓글을 추가하기 위한 form
      const formCommentText = document.createElement("input"); // 게시글에 대한 댓글 입력하는 칸
      const formCommentAddBtn = document.createElement("button"); // 댓글 입력 버튼
      const commentList = document.createElement("div"); // 댓글 목록
      const commentText = document.createElement("div"); // 댓글 본문
      const commentBtnBox = document.createElement("div"); // 댓글 관련된 버튼을 담은 div
      const commentDelete = document.createElement("button"); // 댓글 삭제하는 버튼
      const commentUpdate = document.createElement("button"); // 댓글을 수정하는 버튼

      boardTitle.innerText = item.title; // board 테이블의 n번째 행의 title을 게시글 제목으로 입력한다. forEach로 반복하게 된다.
      boardText.innerText = item.text; // board 테이블의 n번째 행의 text을 게시글 제목으로 입력한다. forEach로 반복하게 된다.

      boardDelete.innerText = "Delete"; // boardDelete 내부의 텍스트 노드에 Delete를 입력
      boardDelete.onclick = async function () {
        try {
          await axios.delete("/api/board/delete?id=" + item.id); // /delete까지는 router에 의해 가야하는 경로가 되지만 ?id=~(쿼리스트링)은 전달되는 값이다.
          getList(); // getList() 자기자신을 호출하는 듯 하지만 onclick에 반응하는 메소드다. 게시글을 삭제한 뒤 게시글 목록을 갱신한다는 의미다.
        } catch (error) {
          // try{}에서 문제가 생겼을 경우
          console.log(error);
        }
      };

      boardUpdate.innerText = "Update"; // boardUpdate의 내부의 텍스트 노드에 Update를 입력
      boardUpdate.onclick = async function () {
        try {
          await axios.put("/api/board/update", {
            // put : 문서를 수정하거나 새로 업로드할 때 사용한다.
            id: item.id, // 이 게시판은 제목이 수정 불가능하게 해놓았다. id는 작성자를 뜻한다.
            text: item.text + "update/", // 수정된 게시글의 본문이다.
          });
          getList(); // 게시글을 수정했으니 게시글 목록을 갱신한다.
        } catch (error) {
          // try{}에서 문제가 생겼을 경우
          console.log(error);
        }
      };
      formCommentAddBtn.innerText = "댓글"; // 댓글 입력 버튼의 텍스트 노드에 "댓글" 입력
      commentDelete.innerText = "삭제"; // 댓글 삭제 버튼의 텍스트 노드에 삭제 입력
      commentUpdate.innerText = "수정"; // 댓글 수정 버튼의 텍스트 노드에 삭제 입력
      boardItem.append(boardTitle); // 게시글에 제목 넣기
      boardItem.append(boardText); // 게시글에 본문 넣기
      boardItem.append(boardBtnBox); // 게시글에 버튼 박스 넣기
      boardBtnBox.append(boardDelete); // 버튼 박스에 삭제 버튼 넣기
      boardBtnBox.append(boardUpdate); // 버튼 박스에 수정 버튼 넣기
      boardItem.append(formCommentAdd); // 게시글에 댓글 입력 버튼 넣기
      formCommentAdd.append(formCommentText); // 댓글을 추가하는 form에 text 부분을 추가
      formCommentAdd.append(formCommentAddBtn); // 댓글을 추가하는 form에 text를 보내줄 입력 버튼 추가
      boardItem.append(commentList); // 게시글에 댓글 목록 추가
      commentList.append(commentText); //  댓글 목록에 댓글 본문 추가
      commentList.append(commentBtnBox); //댓글 목록에 코멘트 버튼 박스 추가
      commentBtnBox.append(commentDelete); // 코멘트 버튼 박스에 댓글 삭제 버튼 추가
      commentBtnBox.append(commentUpdate); // 코멘트 버튼 박스에 댓글 수정 버튼 추가
      boardList.append(boardItem); // 게시글 목록에 게시글을 추가
    });
  } catch (error) {
    // try{}에서 문제가 생겼을 경우
    console.error(error.response.data.message);
  }
}
getList(); // 사이트 들어가면 게시글 목록이 드러나도록 실행해준다.

document.forms["sign-up"].onsubmit = async function (e) {
  // 회원가입 버튼이 있는 form이 작동되면
  e.preventDefault(); // form을 submit하면 웹 페이지가 새로고침되는 기능을 무력화
  if (
    !e.target["user-id"].value ||
    !e.target["user-pw"].value ||
    !e.target["user-name"].value ||
    !e.target["user-class"].value
    // 어느 것 하나라도 값이 없으면 즉시 종료하겠다.
  )
    return;
  try {
    await axios.post("/api/user/regist", {
      // 서버 측으로 회원가입하겠다고 axios로 post 통신을 한다.
      id: e.target["user-id"].value, // sign-up form 내부의 user-id의 값을 id에 놓는다.
      pw: e.target["user-pw"].value, // sign-up form 내부의 user-pw의 값을 pw에 놓는다.
      name: e.target["user-name"].value, // sign-up form 내부의 user-name의 값을 name에 놓는다.
      className: e.target["user-class"].value, // sign-up form 내부의 user-class의 값을 className에 놓는다.
    });
  } catch (error) {
    // try{}에서 문제가 생겼을 경우
    console.error(error.response.data.message);
  }
};

document.forms["sign-in"].onsubmit = async function (e) {
  // 로그인 버튼이 있는 form이 작동되면
  e.preventDefault();
  if (!e.target["user-id"].value || !e.target["user-pw"].value) return; // 아이디나 패스워드 어느 것 하나라도 비어있으면 즉시 종료한다.

  try {
    const result = await axios.post("/api/user/login", {
      // 서버 측으로 로그인하겠다고 axios로 post 통신을 한다. 서버 측에서 되돌려준 응답을 result 변수에 담는다.
      id: e.target["user-id"].value, // sign-in form 내부의 user-id의 값을 id에 놓는다.
      pw: e.target["user-pw"].value, // sign-in form 내부의 user-pw의 값을 pw에 놓는다.
    });
    console.log(result.data); // 서버 측에서 되돌려준 응답의 data를 콘솔 창에 출력한다.
    getList(); // 로그인을 마쳤으니 다시 게시글 리스트를 불러온다.
  } catch (error) {
    // try{}에서 문제가 생겼을 경우
    console.error(error.response.data.message);
  }
};

document.getElementById("sign-out-btn").onclick = async function (e) {
  // 로그아웃 버튼이 클릭되면
  try {
    await axios.get("/api/user/logout"); // 서버에 로그아웃을 하겠다고 axios로 get 통신을 한다.
    getList(); // 로그아웃을 하였으니 다시 게시글 리스트를 불러온다.
  } catch (error) {
    // try{}에서 문제가 생겼을 경우
    console.error(error.response.data.message);
  }
};

const boardList = document.getElementById("board-list"); // html 문서에서 board-list라는 id라는 객체를 찾아 그 정보를 boardlist에 담는다.

document.forms["board-add"].onsubmit = async function (e) {
  //  게시글 추가 버튼이 있는 form이 작동되면
  e.preventDefault(); // submit되면 새로고침되는 form의 기능을 무력화
  if (!e.target["board-title"].value || !e.target["board-text"].value) return; // 게시글을 추가하려는데 제목이나 본문 내용 중 어느 것하나라도 없으면 할 수 없게 즉시 종료를 해주었다.

  try {
    const result = await axios.post("/api/board/add", {
      // 서버 측에 게시글을 추가하겠다고 axios로 post 통신을 하고, 서버 측의 응답을 result에 담는다.
      title: e.target["board-title"].value, // board-add form 내부의 board-title의 값을 title에 놓는다.
      text: e.target["board-text"].value, // board-add form 내부의 board-text의 값을 text에 놓는다.
    });
    getList(); // 게시글을 추가했으니 게시글을 다시 불러와야 한다.
  } catch (error) {
    // try{}에서 문제가 생겼을 경우
    console.error(error.response.data.message);
  }
};
