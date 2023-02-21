import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchResultComponent = ({ searchResult, searchType, searchData }) => {
  return (
    <SearchResultDiv>
      <div className="SearchResultDiv_innerBox">
        <div className="SearchResultDiv_innerBox_title">
          search type : {searchType} / search Data : {searchData}
        </div>
        <div className="SearchResultDiv_itemBox">
          {searchResult.length > 0
            ? searchResult.map((data, index) => {
                return (
                  <ul key={`searchResult_${index}`}>
                    {searchType == "블록 번호" ? (
                      <>
                        <li>
                          {/* height */}
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.number}
                            </Link>
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.timestamp}
                            </Link>
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.gasLimit}
                            </Link>
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.hash}
                            </Link>
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.miner}
                            </Link>
                          </span>
                        </li>
                      </>
                    ) : searchType == "해시" ? (
                      <>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.hash}
                            </Link>
                          </span>
                        </li>
                        <span>aaaaaaa</span>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.number}
                            </Link>
                          </span>
                        </li>
                        <li>
                          <span>
                            <Link to={`/BlockList/${data.number}`}>
                              {data.miner}
                            </Link>
                          </span>
                        </li>
                      </>
                    ) : searchType == "지갑" ? (
                      <li>
                        <span>
                          <Link to={`/accountList/${data}`}>
                            {data.toUpperCase()}
                          </Link>
                        </span>
                      </li>
                    ) : searchType == "트랜잭션" ? (
                      <li></li>
                    ) : (
                      <div>검색에 오류가 있습니다.</div>
                    )}
                  </ul>
                );
              })
            : ""}
        </div>
      </div>
    </SearchResultDiv>
  );
};

export default SearchResultComponent;

const SearchResultDiv = styled.div`
  display: flex;
  justify-content: center;

  .BlockListPageBox_innerBox {
    width: 1024px;
    border-radius: 5px;

    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;

    .blockListTitle {
      justify-content: space-between;
      font-weight: bold;
    }

    ul {
      display: flex;
      justify-content: space-between;
      padding-inline-start: 0px;
      padding-top: 9px;
      padding-bottom: 9px;

      li {
        width: 150px;
        list-style: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;

        span {
          a {
            color: black;
            text-decoration-line: none;
          }
        }
      }
    }
  }
`;
