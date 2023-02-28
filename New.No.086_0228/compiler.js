const solc = require("solc");
const fs = require("fs");
const path = require("path");

// const contractPath = path.join(__dirname, "contracts", "Test.sol");

// fs.readFile(contractPath, { encoding: "utf-8" }, (err, data) =>
//   console.log("readFile : ", data)
// );
// console.log("readFileSync : ", fs.readFileSync(contractPath, "utf-8")); // 걍 이거 써라

// const data = JSON.stringify({
//   language: "Solidity",
//   sources: { "Test.sol": { content: fs.readFileSync(contractPath, "utf-8") } },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// });

// const compiled = JSON.parse(solc.compile(data));
// console.log(compiled);
// fs.writeFileSync(path.join(__dirname, "Test.json"), JSON.stringify(compiled));
// console.log(compiled.contracts["Test.sol"].abi);
// const {
//   abi,
//   evm: { bytecode },
// } = compiled.contracts["Test.sol"].Test;
// // const abi = bytecode.contracts["Test.sol"].Test.abi;
// const bin = bytecode.contracts["Test.sol"].Test.evm.bytecode.object;

// console.log(abi);
// console.log(bytecode.object);
// fs.writeFileSync(
//   path.join(__dirname, "bytecode.json"),
//   JSON.stringify(bytecode)
// );
// console.log();

class Compiler {
  /**
   *
   * @param {string} _filename 파일
   */
  static compile(_filename) {
    const contractPath = path.join(__dirname, "contracts", _filename);
    console.log("contractPath : ", contractPath);
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_filename]: { content: fs.readFileSync(contractPath, "utf-8") },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    });

    const compiled = solc.compile(data);

    return Compiler.writeOutput(JSON.parse(compiled));
  }
  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};

    for (const contractFileName in _compiled.contracts) {
      const [contractName] = contractFileName.split(".");
      console.log("contractName : ", contractName);
      const contract = _compiled.contracts[contractFileName][contractName];
      // const contract = _compiled.contracts["Test.sol"].Test;
      // 객체에서 키에 대한 값을 가져오는데 키를 변수로 입력할 경우 대괄호([])를 사용한다. 안쓰면 인식 못하고 변수의 이름을 찾아버린다.

      const abi = contract.abi;
      const bytecode = contract.evm.bytecode.object;
      const tempObj = { abi, bytecode };
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      fs.writeFileSync(buildPath, JSON.stringify(tempObj));
      fs.writeFileSync(
        path.join(__dirname, "build", `${contractName}.abi`),
        JSON.stringify(abi)
      );
      fs.writeFileSync(
        path.join(__dirname, "build", `${contractName}.bin`),
        bytecode
      );
      result[contractName] = tempObj;
    }
    return result;
  }
}

module.exports = Compiler;
