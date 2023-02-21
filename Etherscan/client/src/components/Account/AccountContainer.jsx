import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountComponent from "./AccountComponent";

const AccountContainer = () => {
  async function getAccount(account) {
    try {
      const data = await axios.post("http://localhost:8090/api/account", {
        account: account,
      });
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const [accountData, setAccountData] = useState({});
  const param = useParams();

  useEffect(() => {
    getAccount(param.account).then((data) => setAccountData(data));
  }, []);

  return <AccountComponent accountData={accountData}></AccountComponent>;
};

export default AccountContainer;
