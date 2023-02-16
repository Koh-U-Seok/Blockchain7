import axios from "axios";
import AccountListComponent from "./AccountListComponent";

const AccountListContainer = () => {
  const request = axios.create({
    method: "POST",
    baseURL: "http://localhost:8080",
    headers: {
      "content-type": "application/json",
    },
  });

  // const web3 = new Web3("http://localhost:8080");

  return <AccountListComponent></AccountListComponent>;
};
export default AccountListContainer;
