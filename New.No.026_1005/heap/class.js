function Heap(type = "min") {
  this.items = [];
  this.type = type;
}
Heap.prototype.swap = function (idx1, idx2) {
  const temp = this.items[idx1];
  this.items[idx1] = this.items[idx2];
  this.items[idx2] = temp;
};

Heap.prototype.getParentIdx = function (idx) {
  return parseInt(idx - 1) / 2;
};

Heap.prototype.getLeftChildIndex = function (idx) {
  return idx * 2 + 1;
};

Heap.prototype.getRightChildIndex = function (idx) {
  return idx * 2 + 2;
};

Heap.prototype.getType = function () {
  return this.type == "max" ? -1 : 1;
};

Heap.prototype.insert = function (item) {
  this.items.push(item);
  this.nowIdx = this.items.length - 1;
  while (true) {
    if (this.nowIdx < 1) return this.items.length; // root인지 확인
    this.parentIdx = this.getParentIdx(this.nowIdx);
    if (
      this.items[this.parentIdx] * this.getType() >
      this.items[this.nowIdx] * this.getType()
    ) {
      this.swap(this.parentIdx, this.nowIdx);
      this.nowIdx = this.parentIdx;
    } else {
      break;
    }
  }
  return this.items.length;
};

Heap.prototype.remove = function () {
  const temp = this.items.shift();
  this.items.unshift(this.items.pop());

  this.nowIdx = 0;
  while (true) {
    this.leftchild = this.getLeftChildIndex(this.nowIdx);
    this.rightchild = this.getRightChildIndex(this.nowIdx);
    if (
      this.items[this.nowIdx] * this.getType() >
        this.items[this.leftchild] * this.getType() ||
      this.items[this.nowIdx] * this.getType() >
        this.items[this.rightchild] * this.getType()
    ) {
      if (
        this.items[this.leftchild] * this.getType() >
        this.items[this.rightchild] * this.getType()
      ) {
        this.swap(this.nowIdx, this.rightchild);
        this.nowIdx = this.rightchild;
      } else {
        this.swap(this.nowIdx, this.leftchild);
        this.nowIdx = this.leftchild;
      }
    } else {
      break;
    }
  }
  return temp;
};
let heap = new Heap("min");
heap.insert(10);
heap.insert(20);
heap.insert(67);
heap.insert(30);
heap.insert(7);
heap.insert(3);
heap.insert(48);
heap.insert(48);
heap.insert(1);
heap.insert(5);
heap.insert(48);
heap.insert(71);
heap.insert(88);
heap.insert(90);
heap.insert(68);
heap.insert(46);
heap.insert(15);
heap.insert(84);
heap.insert(91);
heap.insert(34);
console.log(heap.items);
console.log(heap.remove());
console.log(heap.items);
