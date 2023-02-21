import axios from "axios";
import { useEffect, useState } from "react";
import TransactionListComponent from "./TransactionListComponent";

const TransactionListContainer = () => {
  async function getTransactionList() {
    try {
      const data = await axios.post(
        "http://localhost:8090/api/transactionList"
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const [transactionArr, setTransactionArr] = useState([]);

  useEffect(() => {
    getTransactionList().then((data) => setTransactionArr(data));
  }, []);
  return (
    <TransactionListComponent
      transactionArr={transactionArr}
    ></TransactionListComponent>
  );
};
export default TransactionListContainer;
