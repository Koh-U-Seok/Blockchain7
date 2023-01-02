function Node(data) {
  this.data = data;
  this.next = undefined;
}

function CircularLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

CircularLinkedList.prototype.insert = function (data) {
  if (!this.head) {
    this.head = this.tail = new Node(data);
    this.head.next = this.head;
  } else {
    this.tail.next = new Node(data);
    this.tail.next.next = this.head;
    this.tail = this.tail.next;
  }
  this.size++;
};
CircularLinkedList.prototype.remove = function (data) {
  console.log("remove() 실행, 삭제할 데이터 : ", data);
  let curr = this.head;
  console.log("curr에 this.head 넣기");
  console.log("head의 데이터 : ", curr.data, "data : ", data);
  if (curr?.data === data) {
    // head의 데이터를 지울 경우
    console.log("head의 데이터와 data가 같다.");
    this.tail.next = this.head.next;
    console.log("새로운 this.tail.next : ", this.tail.next);
    this.head = this.head.next;
    console.log("새로운 this.head", this.head);
    delete curr;
    // 함수에선 delete가 먹힌다.
    this.size--;
    return curr.data;
  }
  while (curr !== this.tail) {
    // data가 head의 데이터가 아닐 경우 tail에 도달할 때 까지 반복한다.
    if (curr.next.data === data) {
      console.log("curr.next.data : ", curr.next.data);
      console.log("data : ", data);
      const tempNode = curr.next;
      curr.next = tempNode.next;
      console.log("curr.next : ", curr.next);
      if (curr.next == this.tail) {
        this.tail = curr;
        console.log("this.tail : ", this.tail);
      }
      this.size--;
      return tempNode.data;
    }
    curr = curr.next;
  }
};
CircularLinkedList.prototype.toString = function () {
  let curr = this.head;
  let text = `${this.head.data}`;
  while (curr !== this.tail) {
    text += ", ";
    text += curr.next.data.toString();
    curr = curr.next;
  }
  return text;
  //   if (!this.head) return "";
  //   // head가 없으면  빈 문자열 반환
  //   let curr = this.head;
  //   let tempStr = `${this.head.data}`;
  //   // 임시 문자열에 head의 data정의
  //   while (curr !== this.tail) {
  //     //curr가 tail이 아니면 실행
  //     tempStr += ",";
  //     // head의 data가 정의되었으니 한번 끊도록 ,를 추가
  //     tempStr += curr.next.data;
  //     // 임시 문자열에 다른 Node의 data를 추가
  //     curr = curr.next;
  //     // 현재 노드를 다음 노드로 정의
  //   }
  //   return tempStr;
  //   // 모든 문자열이 모인 tempStr을 변환;
};
let circle = new CircularLinkedList();

circle.insert("가");
circle.insert("나");
circle.insert("다");
circle.insert("라");
circle.insert("마");
circle.insert("바");
circle.insert("사");
circle.insert("아");
circle.insert("자");
circle.insert("차");
circle.insert("카");
circle.insert("타");
circle.insert("하");
console.log(circle);

circle.remove("나");
console.log(circle.toString());
