import axios from "axios";
import { useEffect, useState } from "react";
import BlockListComponent from "./BlockListComponent";
const Web3 = require("web3");

const BlockListContainer = () => {
  async function getBlockList() {
    let tempArr = [];
    for (let i = 0; i < 10; i++) {
      tempArr.push(await web3.eth.getBlock(i));
    }
    return tempArr;
  }

  const [blockArr, setBlockArr] = useState([]);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8080")
  );
  useEffect(() => {
    getBlockList().then((data) => setBlockArr(data));
  }, []);

  return <BlockListComponent blockArr={blockArr}></BlockListComponent>;
};
export default BlockListContainer;
