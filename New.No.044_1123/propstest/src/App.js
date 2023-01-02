import React, { useState } from "react";

function App() {
  const [color, setColor] = useState(0);
  let num = 0;

  function increse() {
    num = num + 1;
    console.log(num);
  }
  return (
    <div className="App" onClick={increse}>
      <ChildComp
        text="string"
        num={num}
        color={color}
        setColor={setColor}
      ></ChildComp>
      <ChildFunc text="string" num={num} setColor={setColor}></ChildFunc>
    </div>
  );
}

export default App;

class ChildComp extends React.Component {
  constructor(props) {
    // props란 부모 컴포넌트가 전달한 데이터
    // 보통은 읽기 전용으로 쓴다. << 재정의를 하지 않는다.
    super(props);
    // 클래스형 컴포넌트에서는 constructor(생성자)에서 매개변수로 받아 상속 클래스(React.Component)의 constructor(super)를 호출한다.
    // 이후 this.props를 사용하여 호출할 수 있다.
    console.log(this.props);
    // this.props.color
  }

  render() {
    return (
      <div style={{ color: "#" + this.props.color.toString(16) }}>
        {/* 
          toString(여기에 숫자가 들어가면) 해당 진수로 바꿔준다.
          toString(16) <<< 16진수로 바꿔준다.
          #000000 / #FFFFFF
          CSS에서 색상을 구현할 때 rgb(255,255,255), rgba(255,255,255, opacity0~1) red green blue alpha(opacity)
          #00ff00 <<  green
        */}
        {this.props.text} {this.props.num}
      </div>
    );
  }
}

function ChildFunc(props) {
  // 함수형 매개변수에서는 매개변수로 바로 받는다.
  // { }를 사용하여 구조 분해 할당을 할 수 있다.
  // function ChildFunc({})
  // const {} = props <<와 같다.
  console.log(props);
  // props.setColor

  const changeColor = () => {
    // props.setColor((state) => state + 100); // state가 아니라 color 등 매개변수 이름은 자유롭게
    props.setColor((color) => {
      console.log(color);
      return color + 100;
    });
    props.setColor(props.color + 100);
    // props의 setColor 메서드를 호출한다.
    // state기 뭔가요?
    // setState(변경할 값
    // setState((state)=>{ << 여기서의 state는 기존의 값
    // return 변경된 값;
    //})
    // setState((state)=>변경할 값);
  };

  return (
    <div onClick={changeColor}>
      {props.text} {props.num}
    </div>
  );
}
