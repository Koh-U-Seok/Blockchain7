```bash
mkdir New.No.093_0310
cd New.No.093_0310
mkdir erc20
cd erc20
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
cd ..
mkdir erc721
cd erc721
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```

# ERC20 토큰을 라이브러리로 만들기

```solidity
// SPDX-Lisence-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// ERC20 토큰을 가져오기

contract B7Token is ERC20 {
// 상속
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _umount
  ) ERC20(_name, _symbol) {
    // ERC20(_name, _symbol)
    // ERC20에 constructor를 호출한다.
    // Javascript에서의 super와 같다.
    _mint(msg.sender, _amount * 10 ** 18);
  }
}

```
