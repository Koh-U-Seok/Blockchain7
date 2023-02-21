import axios from "axios";
import { useEffect, useState } from "react";
import BlockListComponent from "./BlockListComponent";

const BlockListContainer = () => {
  async function getBlockList() {
    try {
      const data = await axios.post("http://localhost:8090/api/blockList");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const [blockArr, setBlockArr] = useState([]);

  useEffect(() => {
    getBlockList().then((data) => setBlockArr(data));
  }, []);

  return <BlockListComponent blockArr={blockArr}></BlockListComponent>;
};
export default BlockListContainer;
