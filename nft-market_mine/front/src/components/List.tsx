import React, { useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = () => {
  const [list, setList] = useState<Array<nftData>>([]);

  // API Server에서 리스트 받아서 출력하기
  return (
    <ul>
      {list.map((item, idx) => (
        <Item item={item} key={`item-${idx}`}></Item>
      ))}
    </ul>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
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
