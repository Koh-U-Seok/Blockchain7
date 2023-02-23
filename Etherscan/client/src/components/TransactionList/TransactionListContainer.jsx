import axios from "axios";
import { useEffect, useState } from "react";
import getMaxNum from "../Pagination/getMaxNum";

import TransactionListComponent from "./TransactionListComponent";

const TransactionListContainer = () => {
  async function getTransactionList() {
    try {
      const data = await axios.post(
        "http://localhost:8090/api/transactionList",
        { offset: offset, limit: limit }
      );
      console.log(data.data.transactionList);
      return data.data.transactionList;
    } catch (error) {
      console.log(error);
    }
  }

  const [transactionArr, setTransactionArr] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [maxNum, setMaxNum] = useState(0);

  const NextPage = () => {
    if (parseInt(maxNum / limit) == parseInt(offset / limit)) return;
    setOffset(offset + 10);
    console.log("maxNum : ", maxNum);
    console.log("offset : ", offset);
    console.log("");
  };

  const PrevPage = () => {
    if (offset == 0) {
      return;
    }
    setOffset(offset - 10);
  };

  useEffect(() => {
    getTransactionList().then((data) => {
      setTransactionArr(data);
    });
  }, [offset]);

  useEffect(() => {
    getMaxNum("transactionList").then((data) => setMaxNum(data));
  }, [maxNum]);

  return (
    <TransactionListComponent
      transactionArr={transactionArr}
      NextPage={NextPage}
      PrevPage={PrevPage}
    ></TransactionListComponent>
  );
};
export default TransactionListContainer;
