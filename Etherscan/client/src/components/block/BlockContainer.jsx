import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockComponent from "./BlockComponent";
const Web3 = require("web3");

const BlockContainer = () => {
  const [blockData, setBlockData] = useState({});
  const param = useParams();
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8080")
  );
  useEffect(() => {
    web3.eth.getBlock(param.blockNumber).then((data) => setBlockData(data));
  }, []);

  return <BlockComponent blockData={blockData}></BlockComponent>;
};
export default BlockContainer;
