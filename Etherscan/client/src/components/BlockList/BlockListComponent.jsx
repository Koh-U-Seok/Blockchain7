import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Web3 = require("web3");

const BlockListComponent = ({ blockArr }) => {
  return (
    <BlockListPageBox>
      <div className="BlockListPageBox_innerBox">
        <ul className="blockListTitle">
          <li>
            {/* height */}
            <span>block number</span>
          </li>
          <li>
            <span>time</span>
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
                {/* height */}
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

    .blockListTitle {
      justify-content: space-between;
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
