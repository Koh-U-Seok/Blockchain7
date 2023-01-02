class Node {
  constructor(data) {
    // 하나의 데이터(점)이다.
    this.data = data;
    // 노드의 데이터
    this.prev = undefined;
    this.next = undefined;
    // 다음 노드
  }
}
class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
DoubleLinkedList.prototype.insert = function (data) {
  // 데이터 입력
  console.log("입력된 데이터는 : ", data);
  if (!this.head) {
    console.log("헤드가 없다");
    this.head = this.tail = new Node(data);
    console.log("헤드는 ", this.head);
    console.log("테일은 ", this.tail);
  } else {
    console.log("헤드가 있다.");
    console.log("현재 테일의 기존의 다음 노트는 ", this.tail.next);
    this.tail.next = new Node(data);
    console.log("현재 테일의 변경된 다음 노트는 ", this.tail.next);
    // 끝에 다음 노드를 추가한다.
    this.tail.next.prev = this.tail;
    console.log("현재 테일의 다음 노드의 이전은 ", this.tail.next.prev);
    this.tail = this.tail.next;
    console.log("현재 테일은 ", this.tail);
  }
  this.size++;
};
DoubleLinkedList.prototype.remove = function (data) {
  // 제거하기
  let curr = this.head;
  // if(!curr) return;
  // 데이터가 없다는 뜻
  // if(curr.data === data){}
  // 아래 코드로 대체 가능
  if (curr?.data === data) {
    // ?.은 curr가 객체인지 확인하고 data property를 가져온다. 에러를 찾는 용도로 사용한다.
    // data가 head의 데이터 일 경우
    this.head = this.head.next;
    this.head.prev = undefined;
    this.size--;
    return curr.data;
  }
  while (curr !== this.tail) {
    // tail에 도달할 때 까지 데이터를 검색
    if (curr.next.data === data) {
      const tempNode = curr.next;
      curr.next = tempNode.next;
      if (curr.next) curr.next.prev = curr;
      // curr.next가 있으면 = curr가 tail이 아닐 것이라면
      else this.tail = curr;
      --this.size;
      return tempNode.data;
    }
    curr = curr.next;
  }
};
DoubleLinkedList.prototype.contains = function (data) {
  // 포함되어 있는지 확인
  let curr = this.head;
  while (true) {
    if (curr.data === data) return true;
    if (!curr.next) return false;
    curr = curr.next;
  }
};

const testDouble = new DoubleLinkedList();
testDouble.insert("테스팅");
testDouble.insert("테스팅1");
testDouble.insert("테스팅2");
testDouble.remove("테스팅");
console.log(testDouble);
