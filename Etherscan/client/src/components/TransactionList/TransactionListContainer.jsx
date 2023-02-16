import axios from "axios";
import TransactionListComponent from "./TransactionListComponent";

const TransactionListContainer = () => {
  const request = axios.create({
    method: "POST",
    baseURL: "http://localhost:8080",
    headers: {
      "content-type": "application/json",
    },
  });

  // const web3 = new Web3("http://localhost:8080");

  return <TransactionListComponent></TransactionListComponent>;
};
export default TransactionListContainer;
