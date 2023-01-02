// import logo from "./logo.svg";
// import "./App.css";
// import ClassComp from "./components/ClassComp";
// import React, { useState } from "react";

// function App() {
//   const [isMount, setMount] = useState(true);
//   function changeMount() {
//     setMount(!isMount);
//   }

//   const [count, setCount] = useState(0);

//   return (
//     <div className="App" onClick={changeMount}>
//       {isMount ? <ClassComp count={count} setCount={setCount} /> : <></>}
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from "react";
import "./App.css";
import BtnComp from "./components/BtnComp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: undefined,
      secondNum: undefined,
      result: undefined,
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  selNum(num) {
    if (this.state.firstNum == undefined) {
      this.setState({ ...this.state, firstNum: num });
    } else if (this.state.secondNum == undefined) {
      this.setState({ ...this.state, secondNum: num });
    }
  }

  render() {
    // 클래스 컴포넌트의 필수이다.(Virtual DOM에 그려지는 HTML 문법)
    // 클래스 컴포넌트에서만 render 메서드 사용
    // 함수형 컴포넌트에서는 return으로 바로 사용
    return (
      <div className="calculator">
        <div className="row">
          <BtnComp
            item={7}
            // onClick={function (e) {
            //   if (this.state.firstNum == undefined) {
            //     this.setState({ ...this.state, firstNum: 7 });
            //   } else if (this.state.secondNum == undefined) {
            //     this.setState({ ...this.state, secondNum: 7 });
            //   }
            // }.bind(this)}
            onClick={this.selNum.bind(this)}
            // bind 없으면 this를 인식못한다.
          ></BtnComp>
          <BtnComp item={8} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp item={9} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp
            item="+"
            onClick={function (e) {
              if (
                this.state.firstNum != undefined &&
                this.state.secondNum != undefined
              ) {
                this.setState({
                  firstNum: undefined,
                  secondNum: undefined,
                  result: this.state.firstNum + this.state.secondNum,
                });
              }
            }.bind(this)}
          ></BtnComp>
          {/* className은 결과물에 붙이지 말고 만들어주는 jsx에 붙여라 */}
        </div>
        <div className="row">
          <BtnComp item={4} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp item={5} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp item={6} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp
            item="/"
            onClick={function (e) {
              if (
                this.state.firstNum != undefined &&
                this.state.secondNum != undefined
              ) {
                this.setState({
                  firstNum: undefined,
                  secondNum: undefined,
                  result: this.state.firstNum / this.state.secondNum,
                });
              }
            }.bind(this)}
          ></BtnComp>
        </div>
        <div className="row">
          <BtnComp item={1} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp item={2} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp item={3} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp
            item="*"
            onClick={function (e) {
              if (
                this.state.firstNum != undefined &&
                this.state.secondNum != undefined
              ) {
                this.setState({
                  firstNum: undefined,
                  secondNum: undefined,
                  result: this.state.firstNum * this.state.secondNum,
                });
              }
            }.bind(this)}
          ></BtnComp>
        </div>
        <div className="row">
          <BtnComp item={this.state.result}></BtnComp>
          <BtnComp item={0} onClick={this.selNum.bind(this)}></BtnComp>
          <BtnComp
            item="/"
            onClick={function (e) {
              if (
                this.state.firstNum != undefined &&
                this.state.secondNum != undefined
              ) {
                this.setState({
                  firstNum: undefined,
                  secondNum: undefined,
                  result: this.state.firstNum / this.state.secondNum,
                });
              }
            }.bind(this)}
          ></BtnComp>
          <BtnComp item="="></BtnComp>
        </div>
      </div>
    );
  }
}
export default App;
