# EVM

- Ethereum Virtual Machine
- 스마트 컨트랙트를 실행하기 위한 가상 컴퓨터다.
- 블록체인 네트워크 노드(peer)에 포함되어 항상 실행된다.
  - 노드(peer)끼리의 합의에 사용된다.
  - ByteCode 실행에 사용된다.

# Solidity

- 스마트 컨트랙트 프로그래밍 언어
- 컴파일하여 ByteCode를 생성한다.
- ByteCode는 트랜잭션의 data로 저장되어 스마트 컨트랙트 실행 시 사용된다.

# geth 새롭게 개인 네트워크 생성

```json
{
  "difficulty": "200000",
  "gasLimit": "3100000",
  "alloc": {},
  "config": {
    "chainId": 19991112,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0
  }
}
```

- 추가된 2개의 옵션은 스마트 컨트랙트를 실행하기 위한 옵션이다.(byzatiumBlock, constantinopleBlock)
  - 합의 방법이 달라지면서 필요하게 되었다.

# 서버 만들기

```sh
geth --datadir newGeth init newGenesis.json
```

만들어준 newGenesis.json 파일을 토대로 이더리움 네트워크 서버를 myGeth라는 이름으로 만든다.

이더리움 네트워크 서버를 삭제하고 싶다면 myGeth 폴더를 삭제하면 사라진다.

```sh
geth --datadir ~/newGeth --http --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 19991112 --ws --ws.port 7777 --ws.origins "*" --nodiscover
```

- nodiscover : 남이 내 노드(peer)를 못 찾게 한다.
  - === maxpeers 0

# 계정 생성

```sh
geth --datadir ~/newGeth account new
```

0xc28FfC9C2adA02CdeDDe82c970b79D5a57026a9d
/home/kus/newGeth/keystore/UTC--2023-02-27T00-31-37.677643200Z--c28ffc9c2ada02cdedde82c970b79d5a57026a9d

# Geth 실행 시 unlock

```sh
echo 위에서 생성한 지갑 계정의 비밀번호 >> ~/newGeth/password
```

- 지정한 비밀번호 : 12345678910
- echo << cmd, bash, powershell에서 사용하는 console.log
- ">>" : 해당 파일에 출력값을 저장한다.

```sh
geth --datadir ~/newGeth --http --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 19991112 --ws --ws.port 7777 --ws.origins "*" --nodiscover --unlock "0" --password ./newGeth/password
```

- unlock : accounts에서의 인덱스. "0,1,2,..." 계정 잠금을 해제할 계정과 일치하는 password 파일의 줄이 번호.
- password : 비밀번호가 저장된 파일
  - 줄바꿈으로 입력된 unlock 인덱스들과 맞춰야 한다.

# Solidity 프리티어 설정

```sh
npm init -y
```

package.json 파일을 만들어준다.

```sh
npm i -D prettier-plugin-solidity
```

```json
{
  "prettier.documentSelectors": ["**/*.sol"],
  "prettier.semi": true
}
```

- "prettier.documentSelectors": ["**/*.sol"] : sol 파일 확장자명이 붙은 파일에 프리티어를 자동으로 설정하겠다는 설정이다.
- "prettier.semi": true : 세미 콜론(;)을 자동으로 붙여주는 옵션이다. 그러나 제대로 작동하지 않는다.

- setting.json에 해당 내용들을 추가한다.
- 왼쪽 툴바의 확장 프로그램 - 아무 확장 프로그램의 확장 설정 - 우측 상단의 설정 열기(왼쪽에서 첫번째 아이콘)

# Solidity 작성

```js
// SPDX-License-Identifier: MIT
// 라이선스 표기 << 어떤 라이선스를 사용하는가? 필요하다.

pragma solidity ^0.8.15;
// 솔리디티 버전 실행., cryptoZombie 0.5.15

contract Test {
    // contract : javascript에서의 class와 같다.
  string text;

  constructor() {
    text = "Hi Block7";
  }

  function getText() public view returns (string memory) {
    // public : 외부에서 사용 가능한 데이터
    // view : 읽기 전용 데이터 처리 / pure(없어도 됨)
    // returns : 반환하는 데이터
    // memory : 함수 내에서만 변수 사용, 데이터를 외부에 저장하지 않음(지역 변수 처리)

    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}

```

# 컴파일

```sh
npm i solc
npx solc --bin --abi ./test.sol
```

- solc : Solidity Compiler
- --bin : binary, transaction에 저장되는 실제 ByteCode
  - Solidity 등 우리가 작성한 코드를 EVM에서 실행할 수 있는 ByteCode로 변환(컴파일)한다.
  - 해당 ByteCode는 트랜잭션에 저장된다.
  - 해당 코드를 Receipt 내의 ContractAddress로 찾는다.
  - EVM이 알아서 코드를 실행
- --abi : Application Binary Interface, 스마트 컨트랙트 내의 함수와 매개변수 등을 json 형식으로 표기
  - abi는 데이터의 정확한 매칭(인코딩)을 위해서 사용
  - 어떤 데이터(변수, 함수, 메서드. 프로퍼티)가 있는지 미리 정해두고 맞춘다.

# 스마트 컨트랙트를 트랜잭션으로 보내기

1. 편의를 위해 변수 선언
   attach에서 해야한다.

```sh
data="0x60806040...08130033"
# solc로 생성된 bin 파일 내의 모든 데이터
txObj={from:eth.accounts[0],data,gas:1000000}
```

2. 트랜잭션 보내기

```sh
eth.sendTransaction(txObj)
# "0x564abab61e1b539776d3df2d0795b71b2e09ea8a4f1729b02028e650381b2cd0"
miner.start(1)
miner.stop()
```

3. 트랜잭션 확인하기

```sh
eth.getTransaction("0x564abab61e1b539776d3df2d0795b71b2e09ea8a4f1729b02028e650381b2cd0")

eth.getTransactionReceipt("0x564abab61e1b539776d3df2d0795b71b2e09ea8a4f1729b02028e650381b2cd0")
```

- getTransactionReceipt의 결과

  - getTransactionReceipt: mining하지않으면 null이 반환될 뿐 확인할 수 없다. miner.start() miner.stop()dm로 채굴해야 확인할 수 있다.

```js
{
  blockHash: "0x14856208fcd5d341c20522bc5f5130dc82bd2fe2e15195abfe8379a299a48e8c",
  blockNumber: 2566,
  contractAddress: "0x42adb4131c0df494f01cfab0fe781fe6319fd4d2",
  cumulativeGasUsed: 565399,
  effectiveGasPrice: 1000000000,
  from: "0xc28ffc9c2ada02cdedde82c970b79d5a57026a9d",
  gasUsed: 565399,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: null,
  transactionHash: "0x564abab61e1b539776d3df2d0795b71b2e09ea8a4f1729b02028e650381b2cd0",
  transactionIndex: 0,
  type: "0x0"
}
```

- contractAddress : CA
  - CA : 스마트 컨트랙트에 대한 주소
  - EOA : Externaly Owned Account, 지갑 주소, 메타마스크/Geth 내의 지갑 등을 뜻한다.
  - CA/EOA 둘 다 계정으로 분류된다.

4. 컨트랙트 생성(연결)

```sh
contract=eth.contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}])
```

- 매개변수로 abi로 추출된 데이터를 입력

5. 컨트랙트에 CA 연결

```sh
instance=contract.at("0x42adb4131c0df494f01cfab0fe781fe6319fd4d2")
```

- at 메서드를 호출하면 ContractAddress를 매개변수로 전달
- 앞으로 스마트 컨트랙트를 실행 시 instance 변수를 사용

6. 컨트랙트 실행하여 확인

```sh
instance.getText.call()
```

- Solidity에서 작성해둔 getText 메서드를 호출한다.

7. set 메서드 호출

```sh
instance.setText("Why so serious", {from:eth.accounts[0]})
```

- 첫 매개변수로 값을 보내고 두번째 매개변수로 트랜잭션의 내용을 전달한다.
- 데이터가 바뀌었기 때문에 채굴을 통해서 블록을 생성하여 적용한다.

# EVM은 무료일까?

- 유료이기 때문에 수수료(Gas)가 필요하다.
- EVM은 왜 유료일까? => 잦은 변경을 막기 위해서, 남의 컴퓨터 쓰는데 무료로 쓸 수 있을까?
- 이더리움 블록체인 네트워크에 노드(peer)가 하나일까?
  - 하나면 해킹이 참 쉬워진다...
