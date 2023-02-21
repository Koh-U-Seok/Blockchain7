import axios from "axios";
import { useEffect, useState } from "react";
import AccountListComponent from "./AccountListComponent";

const AccountListContainer = () => {
  async function getAccountList() {
    try {
      const data = await axios.post("http://localhost:8090/api/accountList");
      return data.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  const [accountArr, setAccountArr] = useState([]);

  useEffect(() => {
    getAccountList().then((data) => setAccountArr(data));
  }, []);

  return <AccountListComponent accountArr={accountArr}></AccountListComponent>;
};

export default AccountListContainer;
