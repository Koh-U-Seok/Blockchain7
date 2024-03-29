import { useEffect, useState } from "react";
import CounterContract from "./contracts/Counter.json";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      const _deployed = new web3.eth.Contract(
        CounterContract.abi,
        "0xaafb63b609884d5a437377bee4f6d47908af529e"
      );
      setDeployed(_deployed);

      const _count = await _deployed.methods.getCount().call();
      setCount(parseInt(_count));
    })();
  }, []);

  const increment = async () => {
    const result = await deployed.methods.increment().send({ from: account });

    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    setCount(parseInt(_count));
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });

    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    setCount(parseInt(_count));
  };

  return (
    <div>
      <h2>Count : {count}</h2>
      <button
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          decrement();
        }}
      >
        -
      </button>
    </div>
  );
};
export default Counter;
