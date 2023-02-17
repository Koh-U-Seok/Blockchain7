import styled from "styled-components";
import html5 from "./images/html.png";
import css from "./images/css.png";
import javascript from "./images/javascript.png";
import react from "./images/react.png";
import nodejs from "./images/nodejs.png";
import mySQL from "./images/mySQL.png";
import metamask from "./images/metamask.png";
import web3 from "./images/web3.png";
import geth from "./images/ethereum.png";

const MainComponent = () => {
  return (
    <MainPageBox>
      <div className="MainPageBox_innerBox">
        <img src={html5} alt="html5" />
        <img src={css} alt="css3" />
        <img src={javascript} alt="javascript" />
        <img src={react} alt="react" />
        <img src={nodejs} alt="nodejs" />
        <img src={mySQL} alt="mySQL" />
        <img src={metamask} alt="metamask" />
        <img src={web3} alt="web3" />
        <img src={geth} alt="geth" />
      </div>
    </MainPageBox>
  );
};

export default MainComponent;

const MainPageBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;

  .MainPageBox_innerBox {
    width: 1024px;
    max-width: 1024px;

    img {
      width: 160px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;
