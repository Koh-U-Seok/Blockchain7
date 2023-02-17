import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";

const BlockComponent = ({ blockData }) => {
  console.log(blockData);
  useEffect(() => {
    if (!blockData) {
      console.log(blockData.nonce);
      console.log(blockData.nonce.slice(2));
    }
  }, [blockData]);
  return (
    <BlockPageBox>
      <div className="BlockPageBox_innerBox">
        <div>{blockData.number}</div>
        difficulty
        <div>{blockData.extraData}</div>
        <div>{blockData.gasLimit}</div>
        <div>{blockData.gasUsed}</div>
        <div>{blockData.hash}</div>
        <div>{blockData.miner}</div>
        <div>{blockData.nonce}</div>
        <div>{blockData.number}</div>
        <div>{blockData.parentHash}</div>
        <div>{blockData.receiptsRoot}</div>
        <div>{blockData.size}</div>
        <div>{blockData.stateRoot}</div>
        <div>{blockData.timestamp}</div>
        <div>{blockData.totalDifficulty}</div>
        <div>{blockData.transactionsRoot}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </BlockPageBox>
  );
};

export default BlockComponent;

const BlockPageBox = styled.div`
  display: flex;
  justify-content: center;

  .BlockPageBox_innerBox {
    width: 1024px;
    max-width: 1024px;
    background-color: #f8f8f8;
  }
`;
