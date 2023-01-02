import React from "react";

export default class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    // props란 상위 컴포넌트에서 전달하는 데이터이다.
    // <ClassComp style={{width:'10px'}}></ClassComp>
    // style은 attribute인가? props인가?
    // attribute는 << HTML 태그에 적는 것
    // ClassComp는 컴포넌트이다. 때문에 props가 맞다.
    // 예제와 같이 style을 전달했다면 <div style={this.props.style}></div>와 같이 해야 한다.

    this.state = { count: 0 };
    // const [count, setCount] = useState(0);

    // this.state= {count:0, name:"우석"};
    // const [count,setCount] = useState(0);
    // const [name,setName] = useState("우석");
  }
  // 클래스 형
  render() {
    return (
      <div
        onClick={function () {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        {count}
      </div>
    );
  }
}
// export default function ClassComp(){
// 함수형
//     return <div></div>
// }
