import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TransactionListComponent = ({ transacitonArr }) => {
  useEffect(() => {
    console.log("transacitonArr : ", transacitonArr);
  }, [transacitonArr]);
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

        {/* {transacitonArr.map((data) => {
          return (
            <ul key={`transactionListUl_${data.number}`}>
              <li>
                <span>
                  <Link to={`/transactionList/${data.hash}`}>{data.hash}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/transactionList/${data.from}`}>{data.from}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/transactionList/${data.to}`}>{data.to}</Link>
                </span>
              </li>
              <li>
                <span>
                  <Link to={`/transactionList/${data.value}`}>
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
        })} */}
      </div>
    </TransactionListPageBox>
  );
};

export default TransactionListComponent;

const TransactionListPageBox = styled.div``;
