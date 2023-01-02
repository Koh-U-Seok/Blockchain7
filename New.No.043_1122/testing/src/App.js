// React의 구조
// Component란 << 기능적인 최소 단위
// - 기능을 포함하는 HTML 구조 단위
// - 컴포넌트는 항상 HTML 구조를 return해야 한다.
// - 함수형에서는 함수 자체가 return한다.
// - 클래스형에서는 render메서드에서 return한다.
// 컴포넌트(root)
// App
// - UserBox
//   - Regist
//   - LogIn
//   - LogOut
// - BoardBox
//

import "./App.css";
import React from "react";

function App() {
  let test = "테스팅";
  let num = 1;
  let bool = true;
  let str = "문자열";
  let arr = [1, 2, 3, 4];
  let obj = { name: "객체" };
  let nul = null;
  let und = undefined;

  // console.log(if(){});
  // console.log(for(let i;i<10;i++){});
  // console.log(while(){});
  // '값을 내보낸다, 가져온다' 얘기할 수 있는 것들과 if, for, while의 차이가 무엇인가?
  // '값을 내보낸다, 가져온다' << 변수, 함수 << '수'이다.
  // if 조건문, for/ while 반복문 << '문장'일 뿐이다.

  function testing() {
    return "함수 테스팅";
  }

  function increase() {
    num = num + 1;
    console.log(num);
  }
  let arrDiv = [
    <div key={0}>1</div>,
    <div key={1}>2</div>,
    <div key={2}>3</div>,
    <div key={3}>4</div>,
  ];
  // document.getElementById().onclick = () => {
  //   num = num + 1;
  //   console.log(num);
  // };

  function arrFunc(arr) {
    const tempArr = [];
    // for (let i = 0; i < arr.length; ++i) {
    //   tempArr.push(<div key={`tempArr${i}`}>{arr[i]}</div>);
    // }
    arr.forEach((item, index) => {
      tempArr.push(<div key={index}>{item}</div>);
    });
    return tempArr;
  }

  console.log(bool ? "true" : "false");

  return (
    <div className="App">
      {/* { }는 값을 가져야만 출력할 수 있다.
      단, Object는 출력 방법이 모호하기 때문에 출력하지 못한다. */}
      <App1></App1>
      <div onClick={increase}>{num}</div>
      <div>{bool}</div>
      <div>{str}</div>
      <div>{arr}</div>
      <div>{obj.name}</div>
      <div>{nul}</div>
      <div>{und}</div>

      <div>{bool ? "true" : "false"}</div>
      {/* 삼항 연산자로 쓰는 이유? if로 안되는 이유 */}
      <div>{testing()}</div>
      <div>
        {arrDiv}
        <br />
        {arrFunc(arr)}
        <br />
        {arr.forEach((item, index) => (
          <div key={`key${index}`}>{item}</div>
        ))}
        {/* forEach는 map과 달리 return값이 없기 때문에 undefined가 된다. */}
        <br />
        {arr.map((item, index) => (
          <div key={`arr${index}`}>{item}</div>
        ))}
      </div>
    </div>
  );
  // HTMl 태그 내에서 { }를 사용하여 변수를 출력할 수 있다.
}

export default App;

class App1 extends React.Component {
  // 우리가 컴포넌트를 만들 때 컴포넌트의 모든 코드를 알고 있나? << 모른다. 그렇기 때문에 상속을 받도록 한다.

  num = 0;
  // 여기서 정의한 것은 this의 프로퍼티로 추가된다.

  constructor(props) {
    // 클래스를 생성할 때 실행되는 코드
    super(props);
    // 상속을 받았을 때 부모의 해당 메서드를 실행된다. << 부모의 constructor

    console.log("constructor");
    console.log(this);
    console.log(this.num);
    // this.num=0;
    this.state = { name: "상태값", num: 0, className: ["app3"] };
    // const [name] = useState("상태값");
  }

  divRef = React.createRef(); // useRef
  // ref로 값을 바꾸지 않고 다른 코드로 충분히 값을 변경할 수 있다.
  // 요소의 값을 가져올 때 ref를 쓸 수 있다.

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this);
    console.log(this.state.name);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    console.log(this);
  }

  increaseFunc() {
    console.log(this);
    console.log(this.state.num);
    // 여기서의 this는 increaseFunc 메서드이다.
    // 그렇기에 호출할 때 bind로 this를 App1으로 전달해야 한다,
  }
  increase = () => {
    // this.state.num = this.state.num + 1;
    this.setState({ num: this.state.num + 1 });
    console.log(this.state.num);

    // 여기서의 this는 App1이 된다.
    // 호출하는 곳에서 bind 메서드를 적지 않아도 된다.
  };
  changeName = () => {
    // this.state.name = this.state.name + "1"; // 권장하지 않는다. state를 변경하고 싶으면 setState사용해라.
    // '상태값' + '1' = '상태값1'
    this.setState({ name: this.state.name + "1" });
    console.log(this.state.name);
    console.log(this.divRef.current);
  };

  changeClass = () => {
    if (this.state.className.indexOf("app4") === -1)
      this.setState({ className: [...this.state.className, "app4"] });
    else this.setState({ className: [...this.state.className.slice(0, 1)] });
  };
  render() {
    console.log("render()");
    console.log(this);
    return (
      <>
        <div onClick={this.increaseFunc.bind(this)}>{this.state.num}</div>
        {/* this가 어디의 this인지 모르니 클래스를 가리키는 this라고 알려준다.*/}
        <div onClick={this.increase}>{this.state.num}</div>
        {/* 화살표 함수에서는 bind(this)가 필요없다. */}
        <div ref={this.divRef} onClick={this.changeName}>
          {this.state.name}
        </div>
        <div
          className={this.state.className.join(" ")}
          onClick={this.changeClass}
        >
          클래스 이름 설정 테스트 중
        </div>
      </>
    );
  }
}
// const app1 = new App1(props);
