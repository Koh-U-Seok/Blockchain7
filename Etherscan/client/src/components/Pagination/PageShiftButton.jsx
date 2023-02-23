import styled from "styled-components";

const PageShiftButton = ({ PrevPage, NextPage }) => {
  return (
    <PageShiftButtonBox>
      <button
        className="btnOutline prevBtn"
        onClick={() => {
          PrevPage();
        }}
      >
        Prev
      </button>
      <button
        className="btnOutline nextBtn"
        onClick={() => {
          NextPage();
        }}
      >
        Next
      </button>
    </PageShiftButtonBox>
  );
};

export default PageShiftButton;

const PageShiftButtonBox = styled.div`
  button {
    margin: 20px;
  }

  .btnOutline {
    position: relative;
    padding: 15px 30px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    cursor: pointer;
  }
  .prevBtn {
    border: 3px solid #519d9e;
    color: darkgray;
  }
  .prevBtn:hover {
    background-color: #519d9e;
    color: #9dc8c8;
  }

  .nextBtn {
    background-color: #f8e6e0;
    color: #6e6e6e;
  }
  .nextBtn:hover {
    background-color: #6aafe6;
  }
`;
