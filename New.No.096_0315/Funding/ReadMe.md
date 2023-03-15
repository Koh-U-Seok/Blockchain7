```bash
mkdir New.No.095_0314
cd New.No.095_0314
npm init -y
npm i truffle @openzeppelin/contracts @remix-project/remixd
npm i -D prettier-plugin-solidity
npx truffle init
```

# Funding Contract

- 소규모 후원이나 다수의 개인으로부터 자금을 모집하는 행위
- 컨트랙트 기능

  - 후원 기간이 종료되면

    - 후원 금액이 원하는 이상 모였다면 주최자에게 후원금 전송
    - 후원 금액이 미달됐다면 기존 후원자에게 원금 돌려주기

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.19;

    contract Fundraising {
      uint256 public targetAmount;
      // 목표 금액

      address public owner;
      // 펀딩 주체자, 후원을 받는 사람(계정)

      mapping(address => uint256) public donations;
      // 후원자 => 후원한 돈, 후원한 목록

      uint256 raiseAmount;
      // 후원된 금액

      uint256 public finishTime;

      // 마감 기한(후원 받는 기간)

      constructor(
        uint256 _targetAmount,
        uint _week,
        uint _days,
        uint _hours,
        uint _minutes,
        uint _seconds
      ) {
        targetAmount = _targetAmount;
        owner = msg.sender;
        raiseAmount = 0;
        finishTime =
          block.timestamp +
          _week *
          1 weeks +
          _days *
          1 days +
          _hours *
          1 hours +
          _minutes *
          1 minutes +
          _seconds *
          1 seconds;
        // "컨트랙트가 저장된 트랜잭션"이 저장된 블록의 정보를 받아올 수 있다.
        // Block : {transactions : bytecode(컨트랙트)}
        // weeks : 주 단위의 시간
      }

      receive() external payable {
        // 익명 함수, data가 없이 value만 들어왔을 때 실행
        // transaction : {data,value}
        // 트랜잭션 내의 value(변수명) => 보내는 금액. 이더를 보내는 것(돈 관련된 것. 토큰 포함)은 value다.
        // 트랜잭션 내의 data(변수명) => 스마트 컨트랙트 사용으로 인한 데이터 변경의 데이터?
        //   - 스마트 컨트랙트로 발생한 데이터 변경(함수 호출)은 data 변수에 bytecode로 변환하여 담아서 보냈다.
        // 스마트 컨트랙트 CA 계정으로 돈(이더)를 보냈을 때 실행된다.

        require(block.timestamp < finishTime, "This funding is over");
        donations[msg.sender] += msg.value;
        // 후원자에 대한 후원금 추가

        raiseAmount += msg.value;
        // 총 후원한 금액에 추가
      }

      function withdrawDonations() external payable {
        // 주최자가 후원금을 받기 위해 실행하는 메서드

        require(
          msg.sender == owner,
          "Funds will only be released to the owner"
        );
        // 트랜잭션 보낸 계정이 주최자 계정인가?

        require(
          raisedAmount >= targetAmount,
          "The Funding did not reach the goal"
        );
        // 후원금 충분히 모였나?

        require(block.timestamp > finishTime, "This funding is not over yet");
        // 후원 기간이 종료되었나?

        payable(owner).transfer(raisedAmount);
        // 기간 만료되었고 후원금이 다 모였으면 주최자에게 후원금 전송
      }

      function refund() external payable {
        // 후원 기간이 끝났는데 후원금이 미달이면 투자자들에게 돈을 되돌려주기 위해 실행하는 메서드
        // - 단, 후원자가 챙겨가지 않을 수 있음.
        require(block.timestamp > finishTime, "This Funding is not over yet");
        // 후원 기간이 안 끝났다.

        require(raisedAmount < targetAmount, "The Funding did reach the goal");
        // 후원금이 충분히 모였다면 거른다.

        require(
          donations[msg.sender] > 0,
          "You did not donate to this funding"
        );
        // 후원한 적이 있는가?

        uint256 toRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        payable(msg.sender).transfer(toRefund);
      }
    }
    ```

```bash
npx remixd -s . --remix-ide https://remix.ethereum.org
```
