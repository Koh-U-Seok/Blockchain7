import axios from "axios";
import { useEffect, useState } from "react";
import BlockListComponent from "./BlockListComponent";

const BlockListContainer = () => {
  async function getBlockList({ offset, limit }) {
    try {
      console.log("limit :", limit);
      const data = Object.values(
        (
          await axios.post("http://localhost:8090/api/blockList", {
            offset: offset,
            limit: limit,
          })
        ).data.blockList
      );
      console.log(data);
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
    // if(parseInt())
    setOffset(offset + 1);
    console.log("offset : ", offset);
  };
  const PrevPage = () => {
    if (offset == 0) {
      return;
    }
    setOffset(offset - 1);
    console.log("offset : ", offset);
  };

  useEffect(() => {
    getBlockList({ offset, limit }).then((data) => setBlockArr(data));
  }, [offset]);

  return (
    <BlockListComponent
      blockArr={blockArr}
      NextPage={NextPage}
      PrevPage={PrevPage}
    ></BlockListComponent>
  );
};
export default BlockListContainer;
