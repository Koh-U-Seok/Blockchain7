import axios from "axios";
import { useEffect, useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = ({ account }: { account: string }) => {
  const [list, setList] = useState<Array<nftData>>([]);
  // API Server에서 리스트 받아서 출력하자

  useEffect(() => {
    // mount 될 때 서버에 목록 리스트를 요청했다.
    (async () => {
      // console.log(
      //   await axios.get(
      //     "https://ipfs.io/ipfs/QmaJ9aqnqvsGrwAzpRNSiGZPZyM4w19UAZHYvQbbHeT9kV"
      //   )
      // );
      setList(
        (await axios.post("http://localhost:8080/api/list", { from: account }))
          .data
      );
      // 서버로부터 받아온 데이터를 state 배열 list에 넣었다.
    })();
  }, [account]);
  return (
    <ul>
      {list.map((item, idx) => (
        // nft 목록을 나열할 것이다.
        <Item item={item} key={`item-${idx}`} />
      ))}
    </ul>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
  // ㅈ같은 구조분해 할당 item은 결국 axios.get을 통해 받아온 nft 리스트 항목 중 하나다. 그것 들 중 name, description, image를 interface nftData의 요소로 구조분해 할당했다.
  return (
    <li>
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <img src={image} />
      </div>
    </li>
  );
};
