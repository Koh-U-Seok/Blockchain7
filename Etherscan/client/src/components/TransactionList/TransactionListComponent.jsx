import { Link } from "react-router-dom";
import styled from "styled-components";
import PageShiftButton from "../Pagination/PageShiftButton";

const TransactionListComponent = ({ transactionArr, NextPage, PrevPage }) => {
  return (
    <TransactionListPageBox>
      <div className="TransactionListPageBox_innerBox">
        <ul className="TransactionListTitle">
          <li>
            <span>transaction hash</span>
          </li>
          <li>
            <span>from</span>
          </li>
          <li>
            <span>to</span>
          </li>
          <li>
            <span>Wei</span>
          </li>
        </ul>

        {transactionArr != undefined &&
          transactionArr.map((data, index) => {
            return (
              <ul key={`transactionListUl_${index}`}>
                <li>
                  <span>
                    <Link to={`/transactionList/${data.hash}`}>
                      {data.hash}
                    </Link>
                  </span>
                </li>
                <li>
                  <span>
                    <Link to={`/transactionList/${data.hash}`}>
                      {data.from}
                    </Link>
                  </span>
                </li>
                <li>
                  <span>
                    <Link to={`/transactionList/${data.hash}`}>{data.to}</Link>
                  </span>
                </li>
                <li>
                  <span>
                    <Link to={`/transactionList/${data.hash}`}>
                      {data.value != undefined
                        ? data.value
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : 0}{" "}
                      wei / {data.value / Math.pow(10, 18)} Eth
                    </Link>
                  </span>
                </li>
              </ul>
            );
          })}
        <PageShiftButton
          PrevPage={PrevPage}
          NextPage={NextPage}
        ></PageShiftButton>
      </div>
    </TransactionListPageBox>
  );
};

export default TransactionListComponent;

const TransactionListPageBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  height: 100vh;
  .TransactionListPageBox_innerBox {
    width: 1024px;
    border-radius: 5px;
    background-color: white;
    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;

    .TransactionListTitle {
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
