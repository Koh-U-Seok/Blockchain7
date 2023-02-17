import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./images/logo.png";

const HomeComponent = () => {
  return (
    <HomeBox>
      <div className="HomeBox_innerBox">
        <Link to="/">
          <img src={logo} />
        </Link>
        <div className="Menubar">
          <div className="Menubar_innerBox">
            <div className="Menubar_innerBox_item">
              <Link to="/BlockList"> 블록 리스트 조회</Link>
            </div>
            <div className="Menubar_innerBox_item">
              <Link to="/AccountList"> 지갑 리스트 조회</Link>
            </div>
            <div className="Menubar_innerBox_item">
              <Link to="/TransactionList"> 트랜잭션 리스트 조회</Link>
            </div>
          </div>
        </div>
      </div>
    </HomeBox>
  );
};

export default HomeComponent;

const HomeBox = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap");
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gainsboro;
  width: 100%;
  margin-bottom: 20px;

  .HomeBox_innerBox {
    width: 1024px;
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;

    .Menubar {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .Menubar_innerBox {
      display: flex;

      .Menubar_innerBox_item {
        width: 200px;

        a {
          color: black;
          text-decoration-line: none;
          font-family: "Noto Serif KR", serif;
        }
      }
    }
  }
`;
