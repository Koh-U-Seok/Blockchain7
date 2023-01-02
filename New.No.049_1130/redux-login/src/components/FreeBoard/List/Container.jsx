import ListComponent from "./Component";
import { useSelector } from "react-redux";

const ListContainer = () => {
  const list = useSelector((state) => state.board);
  return <ListComponent list={list}></ListComponent>;
};

export default ListContainer;
