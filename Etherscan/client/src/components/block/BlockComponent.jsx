import styled from "styled-components";

const BlockComponent = ({ blockData }) => {
  function changeTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp + "000"));

    const year = date.getFullYear().toString();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    return (
      year +
      "년 " +
      month +
      "월 " +
      day +
      "일 " +
      hour +
      "시 " +
      minute +
      "분 " +
      second +
      "초"
    );
  }
  return (
    <BlockPageBox>
      <div className="BlockPageBox_innerBox">
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">Block Height : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.number}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">gasLimit : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.gasLimit}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">gasUsed : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.gasUsed}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">hash : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.hash}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">miner : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.miner}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">nonce : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.nonce}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">parentHash : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.parentHash}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">receiptsRoot</div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.receiptsRoot}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">size : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.size}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">stateRoot : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.stateRoot}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">timestamp : </div>
          <div className="BlockPageBox_innerBox_item_right">
            {changeTimestamp(blockData.timestamp)}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">
            totalDifficulty :{" "}
          </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.totalDifficulty}
          </div>
        </div>
        <div className="BlockPageBox_innerBox_item">
          <div className="BlockPageBox_innerBox_item_left">
            transactionsRoot :{" "}
          </div>
          <div className="BlockPageBox_innerBox_item_right">
            {blockData.transactionsRoot}
          </div>
        </div>
      </div>
    </BlockPageBox>
  );
};

export default BlockComponent;

const BlockPageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100%;

  .BlockPageBox_innerBox {
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

    .BlockPageBox_innerBox_item {
      display: flex;
      font-size: 20px;
      line-height: 50px;

      .BlockPageBox_innerBox_item_left {
        width: 300px;
        text-align: left;
      }

      .BlockPageBox_innerBox_item_right {
        text-align: left;
      }
    }
  }
`;
