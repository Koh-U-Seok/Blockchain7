import axios from "axios";
import { useEffect, useState } from "react";
import getMaxNum from "../Pagination/getMaxNum";
import BlockListComponent from "./BlockListComponent";

const BlockListContainer = () => {
  async function getBlockList({ offset, limit }) {
    try {
      const data = Object.values(
        (
          await axios.post("http://localhost:8090/api/blockList", {
            offset: offset,
            limit: limit,
          })
        ).data.blockList
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const [blockArr, setBlockArr] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [maxNum, setMaxNum] = useState(0);

  const NextPage = () => {
    if (parseInt(maxNum / limit) == parseInt(offset / limit)) return;
    setOffset(offset + 10);
    console.log("maxNum : ", maxNum);
    console.log("offset : ", offset);
    console.log("");
  };

  const PrevPage = () => {
    if (offset == 0) {
      return;
    }
    setOffset(offset - 10);
  };

  useEffect(() => {
    getBlockList({ offset, limit }).then((data) => setBlockArr(data));
  }, [offset]);

  useEffect(() => {
    getMaxNum("blockList").then((data) => setMaxNum(data));
  }, [maxNum]);

  return (
    <BlockListComponent
      blockArr={blockArr}
      NextPage={NextPage}
      PrevPage={PrevPage}
    ></BlockListComponent>
  );
};
export default BlockListContainer;
