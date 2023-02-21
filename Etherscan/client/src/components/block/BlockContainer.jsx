import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlockComponent from "./BlockComponent";

const BlockContainer = () => {
  async function getBlock(blockNumber) {
    try {
      const data = await axios.post("http://localhost:8090/api/block", {
        blockNumber: blockNumber,
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const [blockData, setBlockData] = useState({});
  const param = useParams();
  useEffect(() => {
    getBlock(param.blockNumber).then((data) => setBlockData(data));
  }, []);

  return <BlockComponent blockData={blockData}></BlockComponent>;
};
export default BlockContainer;
