import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchResultComponent = ({ searchResult, searchType, searchData }) => {
  function changeTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp + "000"));

    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "년 " + month + "월 " + day + " 일";
  }
  return (
    <SearchResultPageBox>
      <div className="SearchResultPageBox_innerBox">
        <div className="SearchResultPageBox_innerBox_title">
          search type : {searchType} / search Data : {searchData}
        </div>
        <div className="SearchResultPageBox_innerBox_itemBox">
          {searchResult != undefined ? (
            searchType == "블록 번호" ? (
              <ul className="SearchResultPageBox_innerBox_itemBox_title">
                <li>block number</li>
                <li>timestamp</li>
                <li>Gas Limit</li>
                <li>hash</li>
                <li>miner</li>
              </ul>
            ) : searchType == "해시" ? (
              <ul className="SearchResultPageBox_innerBox_itemBox_title">
                <li>hash</li>
                <li>block number</li>
                <li>miner</li>
              </ul>
            ) : searchType == "지갑" ? (
              <ul className="SearchResultPageBox_innerBox_itemBox_title">
                <li>account</li>
                <li>balance</li>
              </ul>
            ) : searchType == "트랜잭션" ? (
              <ul className="SearchResultPageBox_innerBox_itemBox_title">
                <li>transaction hash</li>
                <li>from</li>
                <li>to</li>
                <li>wei</li>
              </ul>
            ) : (
              <div></div>
            )
          ) : (
            <div>감사합니다</div>
          )}
          {searchResult != undefined ? (
            searchResult == -1 ? (
              <div>잘못된 블록 번호입니다.</div>
            ) : searchResult == -2 ? (
              <div>잘못된 해시입니다.</div>
            ) : searchResult == -3 ? (
              <div>잘못된 지갑 주소입니다.</div>
            ) : searchResult == -4 ? (
              <div>잘못된 트랜잭션입니다.</div>
            ) : (
              <ul className="SearchResultPageBox_innerBox_itemBox_item">
                {searchType == "블록 번호" ? (
                  <>
                    <li>
                      {/* height */}
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.number}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {changeTimestamp(searchResult.timestamp)}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.gasLimit}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.hash}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.miner}
                        </Link>
                      </span>
                    </li>
                  </>
                ) : searchType == "해시" ? (
                  <>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.hash}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.number}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/BlockList/${searchResult.number}`}>
                          {searchResult.miner}
                        </Link>
                      </span>
                    </li>
                  </>
                ) : searchType == "지갑" ? (
                  <>
                    <li>
                      <span>
                        <Link to={`/accountList/${searchResult.account}`}>
                          {searchResult.account}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/accountList/${searchResult.account}`}>
                          {searchResult.balance != undefined
                            ? searchResult.balance
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : 0}{" "}
                          wei / {searchResult.balance / Math.pow(10, 18)} Eth
                        </Link>
                      </span>
                    </li>
                  </>
                ) : searchType == "트랜잭션" ? (
                  <>
                    <li>
                      <span>
                        <Link to={`/transactionList/${searchResult.hash}`}>
                          {searchResult.hash}
                        </Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to={`/transactionList/${searchResult.hash}`}>
                          {searchResult.from}
                        </Link>
                      </span>
                    </li>{" "}
                    <li>
                      <span>
                        <Link to={`/transactionList/${searchResult.to}`}>
                          {searchResult.to}
                        </Link>
                      </span>
                    </li>{" "}
                    <li>
                      <span>
                        <Link to={`/transactionList/${searchResult.value}`}>
                          {searchResult.value != undefined
                            ? searchResult.value
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : 0}{" "}
                          wei / {searchResult.value / Math.pow(10, 18)} Eth
                        </Link>
                      </span>
                    </li>
                  </>
                ) : (
                  <div>검색에 오류가 있습니다.</div>
                )}
              </ul>
            )
          ) : (
            <div>사랑합니다</div>
          )}
        </div>
      </div>
    </SearchResultPageBox>
  );
};

export default SearchResultComponent;

const SearchResultPageBox = styled.div`
  display: flex;
  justify-content: center;

  .SearchResultPageBox_innerBox {
    width: 1024px;
    min-height: 600px;
    border-radius: 5px;

    margin-top: 20px;
    margin-bottom: 20px;

    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    border: 1px solid gainsboro;

    .SearchResultPageBox_innerBox_title {
      display: flex;
      justify-content: center;
      font-weight: bold;
    }

    .SearchResultPageBox_innerBox_itemBox_title {
      font-weight: bold;
    }
    ul {
      display: flex;
      justify-content: space-around;
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
