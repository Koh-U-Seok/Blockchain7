import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlockListComponent = ({ blockArr, NextPage, PrevPage }) => {
  useEffect(() => {
    console.log(blockArr);
  }, [blockArr]);
  return (
    <BlockListPageBox>
      <div className="BlockListPageBox_innerBox">
        <ul className="blockListTitle">
          <li>
            <span>block number</span>
          </li>
          <li>
            <span>timestamp</span>
          </li>
          <li>
            <span>Gas Limit</span>
          </li>
          <li>
            <span>hash</span>
          </li>
          <li>
            <span>miner</span>
          </li>
        </ul>

        {blockArr.map((data) => {
          return (
            <ul key={`blockListUl_${data.number}`}>
              <li>
                <span>
                  <Link to={`/BlockList/${data.number}`}>{data.number}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/BlockList/${data.number}`}>{data.timestamp}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/BlockList/${data.number}`}>{data.gasLimit}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/BlockList/${data.number}`}>{data.hash}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/BlockList/${data.number}`}>{data.miner}</Link>
                </span>
              </li>
            </ul>
          );
        })}

        <button
          onClick={() => {
            PrevPage();
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            NextPage();
          }}
        >
          Next
        </button>
      </div>
    </BlockListPageBox>
  );
};

export default BlockListComponent;

const BlockListPageBox = styled.div`
  display: flex;
  justify-content: center;

  .BlockListPageBox_innerBox {
    width: 1024px;
    border-radius: 5px;

    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;

    .blockListTitle {
      justify-content: space-between;
      font-weight: bold;
    }

    ul {
      display: flex;
      justify-content: space-between;
      padding-inline-start: 0px;
      padding-top: 9px;
      padding-bottom: 9px;

      li {
        width: 150px;
        list-style: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;

        span {
          a {
            color: black;
            text-decoration-line: none;
          }
        }
      }
    }
  }
`;
