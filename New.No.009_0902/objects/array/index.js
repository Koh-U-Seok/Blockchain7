const obj = {
  a: 1,
  // a가 키고 1이 값
  // 키의 정식 명칭은 property
  b: function () {
    console.log("b");
  },
  // b와 c는 함수 => 메서드(method)
  c: () => {
    return "c";
  },
};

const arr = [1, 2, 3];

arr.push();
// 배열도 객체이다.
// arr.push();
// push.메서드로 호출
console.log(arr.length);

let tempReturn = arr.indexOf(3);
// 배열에 있는 아이템을 찾아서 그 위치를 알려준다. 즉, 위치를 리턴해 준다.
//없으면 -1, 첫번째에 있으면 0
tempReturn = arr.find((item) => {
  console.log("item : " + item);
  return item === 3;
});
// find는 검색할 코드를 넣어준다.
// 코드의 반환값이 true가 나오는 함수를 넣어야 한다.
// find의 반환값은 아이템의 순서가 아닌 아이템 그 자체다.
// find 메서드는 매개변수로 함수를 전달한다.
// 매개변수에 해당하는 함수의 매개변수(item)은 배열의 각 아이템을 적용한다.
// find 함수는 배열의 각 아이템을 순서대로 매개변수 함수에 전달하여 리턴값을 확인한다.
// 매개변수 함수에게서 받은 리턴 값이 true면 해당 아이템을 리턴하고 find 함수를 종료한다.

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
tempReturn = arr.find((item) => {
  return item[0] === "김";
});
// find()는 매개변수 함수가 true라면 아이템들 중 첫번째만 리턴해온다.
tempReturn = arr.findIndex((item) => {
  return item[0] === "김";
});

tempReturn = arr.filter((item) => {
  return item.length === 3;
});
// filter()는 매개변수 함수가 true라면 아이템들을 전부 배열로 묶어서 리턴한다.

console.log(tempReturn);

tempReturn = arr.map((item) => {
  return item[0] === "";
});
// map은 매개변수 함수의 return 값들을 배열로 리턴해준다.
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

arr.forEach((item) => console.log("forEach" + item));
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
//forEach 메서드는 아이템을 하나씩 함수에게 매개변수로 전달해 함수를호출한다.

arr.reverse();
//순서 거꾸로

console.log(arr.join(" / "));
//배열을 문자열로 변환해 준다. 매개변수로 아이템 사이에 넣을 문자를 입력해준다.

console.log(arr.toString());
//배열을 문자열로 변환해준다. 거의 모든 객체에 포함되어 있다.

console.log(arr.slice(1, 3));
//[1,2,3] 이라고 하면 1 앞이 0이고 각 , 마다 숫자가 늘어난다고 생각하면 편하다.
// [0'김선주',1'최원겸',2'김성진',3'최원겸',4'염예나',5'정재훈'] 1에서 시작해서 3에서 끝난다.
// 1'최원겸',2'김성진',3 이런 식으로
console.log(arr.slice(1, -1));
// -는 뒤에서 부터 확인한다. 즉, 5가 0이고 4가 -1이 되는것이다.
// 순서가 꼬이면 안된다.

// arr.splice(1,3); 1부터 3개를 짜른다. 단, 원본 arr을 수정해버린다...

console.log(
  arr.sort((curr, next) => {
    if (curr > next) return 1;
    else if (curr > next) return -1;
    else return 0;
    // sort 메소드는 정렬을 해주는 메서드이다.
    //1, 0, -1 로 정렬 방식을 선택한다.
    // 현재가 큰 것을 1로 주고 다음 것이 큰 것을 -1로 주면 오름차순으로 정렬한다.
  })
);

console.log(
  arr.sort((curr, next) => {
    if (curr > next) return -1;
    else if (curr > next) return 1;
    else return 0;
    // 위와 반대 조건 시 내림 차순.
  })
);
console.log(
  (1, 6, 2, 3, 5, 4).sort(function (curr, next) {
    return curr - next;
    // curr가 크면 오름차순
    // console.log(arr.sort());
    // consolr.log((1,6,2,3,5,4).sort((curr,next) =>{curr-next}));
    return next - curr;
    // next가 크면 내림차순
    //console.log(arr.sort().reverse());
    // consolr.log((1,6,2,3,5,4).sort((curr,next) =>{next-curr}));
  })
);

//////////////////////////////////////
const tempFind = (item) => {
  // item => arr[2] << item = 3
  console.log(`item : ${item}`);
  console.log(`item === "최원겸" : ${item === "최원겸"}`);
  return item === "최원겸";
  // item이 3과 같으면 true 리턴하고 아니면 false를 리턴한다.
};

const arrFind = function () {
  for (let i = 0; i < arr.length; i++) {
    console.log(`i : ${i}`);
    console.log(`arr[i] : ${arr[i]}`);
    //i는 0부터 arr의 길이까지 하나씩 증가하면서 반복한다.
    if (tempFind(arr[i])) return arr[i];
    // tempFind 함수를 호출하고 매개변수로 arr의 i번째의 아이템을 전달한다.
    // tempFind 함수를 true를 리턴(반환)하면 arr의 i번째 아이템을 리턴(반환)한다.
  }
};

const tempArr = [
  { name: "정재훈", age: 30, area: "대치동" },
  { name: "여예나", age: 22, area: "하남" },
  { name: "김성진", age: 27, area: "성남" },
];
console.log(tempArr.find((item) => item.area === "하남"));
console.log(tempArr.findIndex((item) => item.area === "하남"));
console.log(tempArr.filter((item) => item.area === "하남"));
console.log(tempArr.map((item) => item.area === "하남"));
// 수정하며 내용을 확인해 보아라.
