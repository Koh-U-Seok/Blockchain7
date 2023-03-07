import "./App.css";
import useWeb3 from "./useWeb3.js";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [web3, account] = useWeb3();
  const [candidateList, setCandidateList] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "candidates",
      });
      // setCandidateList([...result.data.candidates, "놉"]);
      setCandidateList(result.data.candidates);
    })();
    // 함수를 즉시 실행하는 이름 그대로 즉시실행함수다.
    //  - 함수 전체를 ()로 묶고 끝에 ()를 붙여준다.
    // useEffect안에서 async await를 사용하고 싶어서 사용했다.
  }, []);
  return (
    <div className="App">
      <h1>오점머?</h1>
      <div className="vote-list">
        {candidateList.map((item, idx) => (
          <Candidate
            key={`candidate-${idx}`}
            item={item}
            account={account}
            web3={web3}
          ></Candidate>
        ))}
      </div>
    </div>
  );
}

export default App;

// 외부 파일로 빼던 컴포넌트를 같은 파일 내에서 정의
const Candidate = ({ item, account, web3 }) => {
  const [vote, setVote] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/send", {
        method: "totalVotesFor",
        item,
      });
      setVote(result.data.vote);

      web3.eth
        .subscribe("logs", { address: result.data.CA })
        .on("data", (log) => {
          const params = [
            { type: "string", name: "candidate" },
            { type: "uint", name: "votes" },
          ];
          const value = web3.eth.abi.decodeLog(params, log.data);

          console.log("투표한 품목 : ", value.candidate);
          console.log("현재 품목 : ", item);
          console.log("투표 수", value.votes);
          if (value.candidate == item) {
            console.log("투표했다.");
            setVote(value.votes);
          }
        });
    })();
  }, []);

  const onClick = async () => {
    const result = await axios.post("http://localhost:8080/api/send", {
      method: "voteForCandidate",
      candidate: item,
      from: account,
    });
    web3.eth.sendTransaction(result.data);
  };

  return (
    <div className="vote-item" onClick={onClick}>
      <h3>{item}</h3>
      <div>{vote}</div>
    </div>
  );
};
