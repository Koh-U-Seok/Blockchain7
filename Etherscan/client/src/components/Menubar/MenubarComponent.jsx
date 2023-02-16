import { Link } from "react-router-dom";
import styled from "styled-components";

const MenubarComponent = () => {
  return (
    <Menubar>
      <Link to="/">Home</Link>
      <Link to="/BlockList"> 블록 리스트 조회</Link>
      <Link to="/AccountList"> 지갑 리스트 조회</Link>
      <Link to="/TransactionList"> 트랜잭션 리스트 조회</Link>
    </Menubar>
  );
};

export default MenubarComponent;

const Menubar = styled.div`
  width: 1024px;
`;
