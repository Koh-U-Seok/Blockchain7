import { useEffect } from "react";
import styled from "styled-components";

const AccountComponent = ({ accountData }) => {
  useEffect(() => {
    console.log(typeof accountData.balance);
    if (accountData.balance) {
      console.log(
        accountData.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  }, [accountData]);
  return (
    <AccountPageBox>
      <div className="AccountPageBox_innerBox">
        <div className="AccountPageBox_innerBox_item">
          <div className="AccountPageBox_innerBox_item_left">Account : </div>
          <div className="AccountPageBox_innerBox_item_right">
            {accountData.account}
          </div>
        </div>
        <div className="AccountPageBox_innerBox_item">
          <div className="AccountPageBox_innerBox_item_left">
            Balance(wei) :{" "}
          </div>
          <div className="AccountPageBox_innerBox_item_right">
            {accountData.balance != undefined
              ? accountData.balance
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : 0}{" "}
            wei / {accountData.balance / Math.pow(10, 18)} Eth
          </div>
        </div>
      </div>
    </AccountPageBox>
  );
};

export default AccountComponent;

const AccountPageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100vh;

  .AccountPageBox_innerBox {
    background-color: white;
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

    .AccountPageBox_innerBox_item {
      display: flex;
      font-size: 20px;
      line-height: 50px;

      .AccountPageBox_innerBox_item_left {
        width: 300px;
        text-align: left;
      }

      .AccountPageBox_innerBox_item_right {
        text-align: left;
      }
    }
  }
`;
