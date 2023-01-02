console.log(window.location);
// location은 현재 주소에 대한 내용을 담고 있다.
// window는 BOM(Browser Object Model)이다.
// 브라우저의 정보들을 갖고 있다.
console.log(location);
// window는 브라우저의 root 객체이다.
// root는 최상위 폴더/객체/클래스 등을 뜻한다.
console.log(window.navigator);
// 생각보다 자주 쓰일지도
console.log(window.navigator.userAgent);
// 브라우저와 OS 관련된 정보가 정리되어 있다.
// 즉 , 현재 브라우저와 OS를 확인할 수 있다.
// userAgent를 정규표현식을 사용해 원하는 정보만을 가져올 수도 있다.
// 다만, 라이브러리를 사용해 쉽게 처리할 수도 있다.
// PS. 애플 계열은 IOS, iPhone, iPad, Mac 으로만 나타난다.

console.log(document.head);
// 적혀있는 그대로 head의 정보를 받아온다.
// console.log(document.body);는 null값이 나오는데 이것은 script가 head에 있기 때문에 아직 body를 읽지 못했기 때문이다!
// document는 html 파일 구조에 대해서 정의한다.
// document는 DOM(Document Object Model)이다.
// html 구조의 root이다.

console.log(document);
console.dir(document);
// console.log로도 나오지 않는다면 console.dir을 사용해보자
// console.log 사용시 html 구조가 나온다면 dir로 확인되는 경우가 있다.
// console에 대해 상세한 것은 Node.js에서 다시..
// BOM / DOM feat.MVC(Model View Controller)

// Node, Tag, Element란 무엇인가!
// Tag는 HTML 에서 사용하는 명령어의 이름을 뜻한다. ex) html, head, body, div, ...
// Tag는 여는 Tag와 닫는 Tag로 사용한다.
// Element는 여는 Tag와 닫는 Tag를 모두 포함하는 내용이다.
// 더 정확히 표현하자면 DOM(Document) 내에서 정의되는 태그의 내용이다.
// ex) document.getElementById('name') >> name을 id로 갖는 Tag룰 찾는다.
// 정확히는 Element를 찾는다.
// Tag && Element의 차이는 Tag는 이름 그 자체다. Element는 객체다.
// 즉 Javascript에서 HTML 구조를 수정하거나 내용을 추가하거나 등등에서 사용하는 Tag에 대한 객체다.
// HTML 파일에서 Tag(여는 태그, 자식들 포함)에 사용된 내용들을 모두 포함하는 것이 Element이다.

// 객체 안에 있는 함수는 Method라고 부른다.
// 객체의 키는 Property라고 부른다.

console.log(document.getElementById("test").outerHTML);
// innerHTML은 여는 태그와 닫는 태그 사이의 데이터를 문자열로 받는다.
// outerHTML은 여는 태그와 닫는 태그 모두를 포함한 데이터를 문자열로 받는다. 쓸 일은 거의 없다.

console.log(document.getElementById("test").id);
console.log(document.getElementById("test").style.border);
// Element 에 직접 입력한 값이 아니면 출력되지 않는다...

document.getElementById("test").style.border = "10px solid red";
console.dir(document.getElementById("test"));
console.log(document.getElementById("test"));
// 상속 : 상속하는 객체의 정보(property, Method 모두 포함)을 갖는 다른 객체를 만드는 행위
// A = {a, b, c} => B가 A를 상속한다 => B = {a, b, c};

// const person = { name: "", age: 0, gender: 0 };
// const kim = { name: "김성진", age: 27, gender: 1 };
// const yeom = { name: "염예나", age: 22, gender: 4 };
// const jung = { name: "정재훈", age: 30, gender: 1 };
// person을 상속해서 kim, yeom, jung을  만들 수 있다.(생성할 수 있다.)
// Javascript 가 프로토타입 형태로 되어있다.
// Javascript는 기본적으로 Node를 기준으로 하고있다.
// Node를 이용하여 Element, document 등을 생성한다.
// 프로토타입은 상식적으로 생각했을 때 테스트를 위한 임시 기체이다.
// 프로토타입을 업그레이드, 즉 기능을 추가하거나 필요하지 않은 기능을 삭제하거나 등등 더 좋게 만들어서 다음 것을 만든다.
