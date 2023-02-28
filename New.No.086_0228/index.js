const Compiler = require("./compiler");
const Client = require("./web3");

const {
  Test: { abi, bytecode },
} = Compiler.compile("Test.sol");

const client = new Client("http://127.0.0.1:8545");
const txObj = { data: bytecode };
console.log(txObj);
const contract = new client.web3.eth.Contract(abi);
console.log(contract);

async function init() {
  const instance = await contract.deploy(txObj).send({
    from: "0x63111Ee21ce7bC839c0068e35B29aAFdC3979994",
    gas: 1000000,
  });
  // console.log("instance : ", instance);
  console.log("instance.options.address : ", instance.options.address); // CA : 0x51021B9F42F809198FfcAF831fcB95c02F6fB112
}
init();

async function test() {
  const accounts = await client.web3.eth.getAccounts();

  const ca = "0x51021B9F42F809198FfcAF831fcB95c02F6fB112";
  const deployed = new client.web3.eth.Contract(abi, ca);

  let text = await deployed.methods.getText().call();

  await deployed.methods.setText("what is lunch").send({ from: accounts[1] });
  text = await deployed.methods.getText().call();

  const balance = await client.web3.eth.getBalance(accounts[1]);
  console.log(balance);
}
// test();
