import axios from "axios";
import { useEffect } from "react";
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
            <span></span>
          </li>
          <li>
            <span>hash</span>
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
      </div>
    </TransactionListPageBox>
  );
};

export default TransactionListComponent;

const TransactionListPageBox = styled.div``;
