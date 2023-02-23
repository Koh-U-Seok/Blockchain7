import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";

const navigateToSearch = async (searchType, searchData, navigate) => {
  navigate(`/Search?searchType=${searchType}&searchData=${searchData}`);
  window.location.reload();
};

const SearchContainer = () => {
  const [searchType, setSearchType] = useState("블록 번호");
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  return (
    <SearchComponent
      searchType={searchType}
      searchData={searchData}
      setSearchType={setSearchType}
      setSearchData={setSearchData}
      navigateToSearch={navigateToSearch}
      navigate={navigate}
    ></SearchComponent>
  );
};

export default SearchContainer;
