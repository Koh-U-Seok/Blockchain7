import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionComponent from "./TransactionComponent";

const TransactionContainer = () => {
  async function getTransaction(transactionHash) {
    try {
      console.log(transactionHash);
      const data = await axios.post("http://localhost:8090/api/transaction", {
        transactionHash: transactionHash,
      });
      console.log(data.data.msg);
      console.log(data.data.transaction);
      return data.data.transaction;
    } catch (error) {
      console.error(error);
    }
  }

  const [transactionData, setTransactionData] = useState({});
  const param = useParams();
  useEffect(() => {
    if (Object.keys(transactionData).length != 0) return;
    getTransaction(param.transactionHash).then((data) => {
      setTransactionData(data);
    });
  }, [transactionData]);

  return (
    <TransactionComponent
      transactionData={transactionData}
    ></TransactionComponent>
  );
};
export default TransactionContainer;
