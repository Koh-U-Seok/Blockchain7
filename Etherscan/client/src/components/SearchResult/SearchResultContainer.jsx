import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchResultComponent from "./SearchResultComponent";

const SearchResultContainer = () => {
  const getSearchList = async (searchType, searchData) => {
    const data = await axios.post("http://localhost:8090/api/search", {
      searchType:
        searchType == "블록 번호"
          ? "blockNumber"
          : searchType == "해시"
          ? "hash"
          : searchType == "지갑"
          ? "account"
          : searchType == "트랜잭션"
          ? "transaction"
          : "",
      searchData: searchData,
    });
    if (!data.data.isError) {
      console.log(data.data.result);
      return data.data.result;
    } else {
      alert("Error!");
      return data.data;
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState({});
  useEffect(() => {
    getSearchList(
      searchParams.get("searchType"),
      searchParams.get("searchData")
    ).then((data) => setSearchResult(data));
  }, []);
  return (
    <SearchResultComponent
      searchResult={searchResult}
      searchType={searchParams.get("searchType")}
      searchData={searchParams.get("searchData")}
    ></SearchResultComponent>
  );
};

export default SearchResultContainer;
