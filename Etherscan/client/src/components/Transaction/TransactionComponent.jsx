import { useEffect } from "react";
import styled from "styled-components";

const TransactionComponent = ({ transactionData }) => {
  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);
  return (
    <TransactionPageBox>
      <div className="TransactionPageBox_innerBox">
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">
            blockHash :{" "}
          </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.blockHash}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">
            blockNumber :{" "}
          </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.blockNumber}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">
            chainId :{" "}
          </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.chainId}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">from : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.from}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">gas : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.gas}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">
            gasPrice :{" "}
          </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.gasPrice}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">hash : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.hash}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">input</div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.input}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">nonce : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.nonce}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">r : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.r}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">s : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.s}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">to : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.to}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">
            transactionIndex :{" "}
          </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.transactionIndex}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">type : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.type}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">v : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.v}
          </div>
        </div>
        <div className="TransactionPageBox_innerBox_item">
          <div className="TransactionPageBox_innerBox_item_left">value : </div>
          <div className="TransactionPageBox_innerBox_item_right">
            {transactionData.value}
          </div>
        </div>
      </div>
    </TransactionPageBox>
  );
};

export default TransactionComponent;

const TransactionPageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100%;

  .TransactionPageBox_innerBox {
    width: 1024px;
    max-width: 1024px;
    background-color: white;

    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;
    border-radius: 10px;

    .TransactionPageBox_innerBox_item {
      display: flex;
      font-size: 20px;
      line-height: 50px;

      .TransactionPageBox_innerBox_item_left {
        width: 300px;
        text-align: left;
      }

      .TransactionPageBox_innerBox_item_right {
        text-align: left;
      }
    }
  }
`;
