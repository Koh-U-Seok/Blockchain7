import { Link } from "react-router-dom";
import styled from "styled-components";

const AccountListComponent = ({ accountArr }) => {
  return (
    <AccountListPageBox>
      <div className="AccountListPageBox_innerBox">
        <ul className="accountListTitle">
          <li>account</li>
        </ul>
        {accountArr.map((data, index) => {
          return (
            <ul key={`accountListUl_${index}`}>
              <li>
                <span>
                  <Link to={`/accountList/${data}`}>{data.toUpperCase()}</Link>
                </span>
              </li>
            </ul>
          );
        })}
      </div>
    </AccountListPageBox>
  );
};

export default AccountListComponent;

const AccountListPageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100vh;

  .AccountListPageBox_innerBox {
    background-color: white;
    width: 1024px;

    border-radius: 5px;

    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;

    .accountListTitle {
      justify-content: space-between;
      font-weight: bold;

      li {
        width: 150px;
        font-size: 20px;
      }
    }

    ul {
      display: flex;
      justify-content: space-between;
      padding-inline-start: 0px;
      padding-top: 9px;
      padding-bottom: 9px;

      li {
        list-style: none;
        word-break: break-all;
        padding-left: 20px;

        span {
          a {
            color: black;
            text-decoration-line: none;
            font-size: 20px;
          }
        }
      }
    }
  }
`;
