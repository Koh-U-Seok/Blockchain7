import React from "react";
import styled from "styled-components";

export default class Rsp extends React.Component {
  constructor(props) {
    super(props);
    this.setState({ currMoney: props.money });
  }
  rockScisssorPaper() {}
  render() {
    return (
      <RspBox>
        <div>{this.state.currMoney}</div>
        <button onClick={() => {}}></button>
      </RspBox>
    );
  }
}

const RspBox = styled.div`
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: 0 auto;
  width: min-content;
`;
