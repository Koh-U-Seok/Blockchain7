const heapArr = [];

function swap(idx1, idx2) {
  const temp = heapArr[idx1];
  heapArr[idx1] = heapArr[idx2];
  heapArr[idx2] = temp;
}
function heapInsert(item) {
  heapArr.push(item);
  let nowIdx = heapArr.length - 1;
  while (true) {
    if (nowIdx < 1) return heapArr.length; // root인지 확인
    const parentIdx = parseInt((nowIdx - 1) / 2);
    if (heapArr[parentIdx] > heapArr[nowIdx]) {
      // if (heapArr[parentIdx] * -1 > heapArr[nowIdx] * -1) {
      swap(parentIdx, nowIdx);
      nowIdx = parentIdx;
    } else {
      break;
    }
  }
  return heapArr.length;
}

function heapRemove() {
  const temp = heapArr.shift();
  heapArr.unshift(heapArr.pop());

  let nowIdx = 0;
  while (true) {
    const leftchild = nowIdx * 2 + 1;
    const rightchild = nowIdx * 2 + 2;
    if (
      heapArr[nowIdx] > heapArr[leftchild] ||
      heapArr[nowIdx] > heapArr[rightchild]
    ) {
      if (heapArr[leftchild] > heapArr[rightchild]) {
        swap(nowIdx, rightchild);
        nowIdx = rightchild;
      } else {
        swap(nowIdx, leftchild);
        nowIdx = leftchild;
      }
    } else {
      break;
    }
  }
  return temp;
}

heapInsert(10);
heapInsert(20);
heapInsert(67);
heapInsert(30);
heapInsert(7);
heapInsert(3);
heapInsert(48);
heapInsert(48);
heapInsert(1);
heapInsert(5);
heapInsert(48);
heapInsert(71);
heapInsert(88);
heapInsert(90);
heapInsert(68);
heapInsert(46);
heapInsert(15);
heapInsert(84);
heapInsert(91);
heapInsert(34);
console.log(heapArr);
console.log(heapRemove());
console.log(heapArr);
